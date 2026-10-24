import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearIconifySvgCache,
  getCachedSvgCount,
  iconifyIconToSvg,
  replaceIconifyIconsInHtml,
} from './iconifySvg'

const mockStore = vi.hoisted(() => new Map<string, unknown>())

vi.mock('~/libs/utils', () => ({
  isClient: true,
}))

vi.mock('localforage', () => {
  const getItem = async (key: string) => mockStore.get(key) ?? null
  const setItem = async (key: string, value: unknown) => {
    mockStore.set(key, value)
    return value
  }
  const removeItem = async (key: string) => {
    mockStore.delete(key)
  }
  const keys = async () => Array.from(mockStore.keys())

  const impl = { getItem, setItem, removeItem, keys }
  return { default: impl, ...impl }
})

const baseSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>'
const sizedSvg = baseSvg.replace('width="1em" height="1em"', 'width="24" height="24"')

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(async () => {
  await clearIconifySvgCache()
  mockStore.clear()
  fetchMock = vi.fn(async (url: string) => {
    if (url.includes('?height=24')) {
      return { ok: true, text: async () => sizedSvg }
    }
    return { ok: true, text: async () => baseSvg }
  })
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('iconifyIconToSvg', () => {
  it('fetches the icon SVG from the Iconify API', async () => {
    const svg = await iconifyIconToSvg('mdi:home')

    expect(fetchMock).toHaveBeenCalledWith('https://api.iconify.design/mdi:home.svg')
    expect(svg).toContain('<svg')
    expect(svg).toContain('viewBox="0 0 24 24"')
  })

  it('passes a numeric size as the API height parameter', async () => {
    const svg = await iconifyIconToSvg('mdi:home', { size: '24px' })

    expect(fetchMock).toHaveBeenCalledWith('https://api.iconify.design/mdi:home.svg?height=24')
    expect(svg).toContain('width="24" height="24"')
  })

  it('scales em sizes via font-size on the SVG', async () => {
    const svg = await iconifyIconToSvg('mdi:home', { size: '1.5em' })

    expect(fetchMock).toHaveBeenCalledWith('https://api.iconify.design/mdi:home.svg')
    expect(svg).toContain('style="font-size:1.5em"')
  })

  it('applies the color via the SVG style attribute', async () => {
    const svg = await iconifyIconToSvg('mdi:home', { color: 'red' })

    expect(svg).toContain('style="color:red"')
  })

  it('merges size and color into a single style attribute', async () => {
    const svg = await iconifyIconToSvg('mdi:home', { size: '1.5em', color: '#1a73e8' })

    expect(svg).toContain('style="color:#1a73e8;font-size:1.5em"')
  })

  it('rejects invalid icon names without fetching', async () => {
    expect(await iconifyIconToSvg('not-an-icon')).toBeNull()
    expect(await iconifyIconToSvg('mdi')).toBeNull()
    expect(await iconifyIconToSvg('mdi:home:extra')).toBeNull()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('returns null when the request fails', async () => {
    fetchMock.mockRejectedValue(new Error('offline'))

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
  })

  it('returns null when the API responds with an error', async () => {
    fetchMock.mockResolvedValue({ ok: false })

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
  })

  it('returns null when the response is not an SVG', async () => {
    fetchMock.mockResolvedValue({ ok: true, text: async () => 'not svg' })

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
  })

  it('falls back to backup hosts when the primary fails', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false })
    fetchMock.mockResolvedValueOnce({ ok: true, text: async () => baseSvg })

    const svg = await iconifyIconToSvg('mdi:home')

    expect(svg).toBe(baseSvg)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://api.iconify.design/mdi:home.svg')
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://api.simplesvg.com/mdi:home.svg')
  })

  it('tries every host before giving up', async () => {
    fetchMock.mockRejectedValueOnce(new Error('offline'))
    fetchMock.mockResolvedValueOnce({ ok: true, text: async () => 'not svg' })
    fetchMock.mockResolvedValueOnce({ ok: false })

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })

  it('caches responses for repeated calls', async () => {
    await iconifyIconToSvg('mdi:home')
    await iconifyIconToSvg('mdi:home')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('svg cache', () => {
  it('persists successful lookups to localForage', async () => {
    expect(await getCachedSvgCount()).toBe(0)

    await iconifyIconToSvg('mdi:home')

    expect(await getCachedSvgCount()).toBe(1)
    expect(mockStore.has('MARKDOWN_RESUME_iconify_svg:https://api.iconify.design/mdi:home.svg')).toBe(true)
  })

  it('reuses persisted icons without fetching again', async () => {
    mockStore.set(
      'MARKDOWN_RESUME_iconify_svg:https://api.iconify.design/mdi:home.svg',
      baseSvg,
    )

    expect(await iconifyIconToSvg('mdi:home')).toBe(baseSvg)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('does not persist failed lookups', async () => {
    fetchMock.mockResolvedValue({ ok: false })

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
    expect(await getCachedSvgCount()).toBe(0)
  })

  it('counts only cached SVG entries', async () => {
    await iconifyIconToSvg('mdi:home')
    await iconifyIconToSvg('tabler:mail')

    expect(await getCachedSvgCount()).toBe(2)
  })

  it('clears the in-memory and persisted caches', async () => {
    await iconifyIconToSvg('mdi:home')
    expect(await getCachedSvgCount()).toBe(1)

    await clearIconifySvgCache()

    expect(await getCachedSvgCount()).toBe(0)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    await iconifyIconToSvg('mdi:home')
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})

describe('replaceIconifyIconsInHtml', () => {
  it('replaces the tag with a span wrapper containing the inline SVG', async () => {
    // The rendered markdown emits <iconify-icon> tags
    const rendered = '<p>Hi <iconify-icon icon="mdi:home"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result).toContain('<svg')
    expect(result).toContain('data-icon="mdi:home"')
    expect(result).toBe(`<p>Hi <span class="iconify mdi:home" data-icon="mdi:home">${baseSvg}</span></p>`)
  })

  it('preserves the icon identity and applies size and color to the SVG', async () => {
    const rendered
      = '<p><iconify-icon icon="mdi:home" style="font-size:24px;color:red"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result).toContain('data-icon="mdi:home"')
    expect(result).toContain('width="24" height="24"')
    expect(result).toContain('color:red')
    expect(result).toContain('<span class="iconify mdi:home"')
  })

  it('replaces multiple distinct icons in one document', async () => {
    const rendered
      = '<p><iconify-icon icon="mdi:home"></iconify-icon> and <iconify-icon icon="tabler:mail"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result.match(/<svg/g)).toHaveLength(2)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('leaves tags without an icon attribute untouched', async () => {
    const rendered = '<p><iconify-icon style="color:red"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result).toBe(rendered)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('leaves unresolved icons untouched', async () => {
    fetchMock.mockResolvedValue({ ok: false })
    const rendered = '<p><iconify-icon icon="mdi:home"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result).toBe(rendered)
  })

  it('leaves non-icon markup untouched', async () => {
    const rendered = '<p>plain <strong>text</strong></p>'

    expect(await replaceIconifyIconsInHtml(rendered)).toBe(rendered)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
