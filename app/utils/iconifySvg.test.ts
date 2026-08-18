import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearIconifySvgCache,
  iconifyIconToSvg,
  replaceIconifyIconsInHtml,
} from './iconifySvg'

const baseSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>'
const sizedSvg = baseSvg.replace('width="1em" height="1em"', 'width="24" height="24"')

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  clearIconifySvgCache()
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
    fetchMock.mockRejectedValueOnce(new Error('offline'))

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
  })

  it('returns null when the API responds with an error', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false })

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
  })

  it('returns null when the response is not an SVG', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, text: async () => 'not svg' })

    expect(await iconifyIconToSvg('mdi:home')).toBeNull()
  })

  it('caches responses for repeated calls', async () => {
    await iconifyIconToSvg('mdi:home')
    await iconifyIconToSvg('mdi:home')

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})

describe('replaceIconifyIconsInHtml', () => {
  it('replaces iconify-icon tags with inline SVGs', async () => {
    const html = '<p>Hi ::mdi:home::</p>'
    // The rendered markdown emits <iconify-icon> tags
    const rendered = '<p>Hi <iconify-icon icon="mdi:home"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result).toContain('<svg')
    expect(result).not.toContain('<iconify-icon')
    expect(result).toBe('<p>Hi ' + baseSvg + '</p>')
  })

  it('replaces styled tags and preserves their size and color', async () => {
    const rendered
      = '<p><iconify-icon icon="mdi:home" style="font-size:24px;color:red"></iconify-icon></p>'

    const result = await replaceIconifyIconsInHtml(rendered)

    expect(result).toContain('width="24" height="24"')
    expect(result).toContain('color:red')
    expect(result).not.toContain('<iconify-icon')
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
    fetchMock.mockResolvedValueOnce({ ok: false })
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
