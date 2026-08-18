import * as localForage from 'localforage'
import { isClient } from '~/libs/utils'
import { extractIconifyOptions } from './iconifyMigration'

const ICONIFY_API_HOSTS = [
  'https://api.iconify.design',
  'https://api.simplesvg.com',
  'https://api.unisvg.com',
]
const ICONIFY_SVG_CACHE_PREFIX = 'MARKDOWN_RESUME_iconify_svg:'

const VALID_ICON_REGEX = /^[\w-]+:[\w-]+$/

const svgCache = new Map<string, string | null>()

const svgCacheKey = (url: string) => `${ICONIFY_SVG_CACHE_PREFIX}${url}`

export const getCachedSvgCount = async () => {
  if (!isClient) return 0

  const keys = await localForage.keys()
  return keys.filter(key => key.startsWith(ICONIFY_SVG_CACHE_PREFIX)).length
}

export const clearIconifySvgCache = async () => {
  svgCache.clear()
  if (!isClient) return

  const keys = await localForage.keys()
  await Promise.all(
    keys
      .filter(key => key.startsWith(ICONIFY_SVG_CACHE_PREFIX))
      .map(key => localForage.removeItem(key)),
  )
}

const applyStylesToSvg = (svg: string, styles: string[]) => {
  if (styles.length === 0) return svg

  return svg.replace(/<svg\b([^>]*)>/i, (tag, attrs: string) => {
    const existing = attrs.match(/\sstyle="([^"]*)"/i)?.[1]
    const combined = [existing, ...styles].filter(Boolean).join(';')
    const cleaned = attrs.replace(/\sstyle="[^"]*"/i, '')

    return `<svg${cleaned} style="${combined}">`
  })
}

/**
 * Resolve an Iconify icon name (e.g. `mdi:home`) to an inline SVG string.
 *
 * Fetches the raw icon SVG from the Iconify API so exported documents are
 * fully self-contained and do not need the iconify-icon web component script.
 * Hosts are tried in order and fall back to the next one on failure.
 * Successful results are cached in localForage (and an in-memory Map) so
 * offline exports can reuse previously resolved icons. Returns `null` when
 * the icon cannot be resolved (offline, unknown icon, ...).
 */
export const iconifyIconToSvg = async (
  icon: string,
  options: { size?: string, color?: string } = {},
): Promise<string | null> => {
  const name = icon.trim()
  if (!VALID_ICON_REGEX.test(name)) return null

  const { size, color } = options
  // Numeric sizes (px or unitless) map to the API height parameter, which
  // returns the SVG with correctly proportioned width/height attributes.
  const numericSize = size && /^\d+(\.\d+)?(px)?$/i.test(size)
    ? size.replace(/px$/i, '')
    : null

  // Icon names only contain URL-safe characters (letters, digits, -, :)
  // The SVG is identical across hosts, so the primary host URL is used as
  // the cache key even when the icon was resolved from a backup host.
  const iconPath = `${name}.svg${
    numericSize ? `?height=${numericSize}` : ''
  }`
  const url = `${ICONIFY_API_HOSTS[0]}/${iconPath}`

  if (svgCache.has(url)) return svgCache.get(url)!

  // Reuse icons persisted by a previous session
  if (isClient) {
    const cached = await localForage.getItem<string>(svgCacheKey(url))
    if (cached) {
      svgCache.set(url, cached)
      return cached
    }
  }

  let svg: string | null = null

  for (const host of ICONIFY_API_HOSTS) {
    try {
      const response = await fetch(`${host}/${iconPath}`)
      if (!response.ok) continue

      const text = (await response.text()).trim()
      if (text.startsWith('<svg')) {
        svg = text
        break
      }
    }
    catch {
      // try the next host
    }
  }

  if (svg) {
    const styles: string[] = []
    if (color) styles.push(`color:${color}`)
    // em/percent sizes keep the default 1em width/height and scale via font-size
    if (size && !numericSize) styles.push(`font-size:${size}`)

    svg = applyStylesToSvg(svg, styles)
  }

  svgCache.set(url, svg)

  // Only successful lookups are persisted; failed lookups (null) stay in
  // memory so transient network errors are not cached permanently.
  if (svg && isClient) await localForage.setItem(svgCacheKey(url), svg)

  return svg
}

/**
 * Replace every `<iconify-icon icon="...">` tag in rendered HTML with an
 * inline SVG so the document renders without the iconify-icon web component.
 *
 * The original tag (as rendered from Markdown) is kept untouched and the
 * resolved SVG is injected as its child. When the iconify-icon web component
 * is loaded it renders through its shadow root (hiding the light-DOM SVG);
 * otherwise the inline SVG is used as a self-contained fallback. Tags that
 * cannot be resolved are left untouched.
 */
export const replaceIconifyIconsInHtml = async (html: string) => {
  const tags = Array.from(
    html.matchAll(/<iconify-icon\b([^>]*)>\s*<\/iconify-icon>/gi),
  )

  const results = await Promise.all(tags.map(async ([tag, attributes]) => {
    const icon = attributes?.match(/\bicon\s*=\s*(["'])(.*?)\1/i)?.[2]
    if (!icon) return null

    const svg = await iconifyIconToSvg(icon, extractIconifyOptions(attributes ?? ''))
    if (!svg) return null

    const replacement = tag.replace(
      />\s*<\/iconify-icon>$/i,
      `>${svg}</iconify-icon>`,
    )

    return { tag, replacement }
  }))

  let result = html

  for (const replacement of results) {
    if (replacement) result = result.split(replacement.tag).join(replacement.replacement)
  }

  return result
}
