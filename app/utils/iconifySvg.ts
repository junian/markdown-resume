import { extractIconifyOptions } from './iconifyMigration'

const ICONIFY_API_URL = 'https://api.iconify.design'

const VALID_ICON_REGEX = /^[\w-]+:[\w-]+$/

const svgCache = new Map<string, string | null>()

export const clearIconifySvgCache = () => {
  svgCache.clear()
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
 * Returns `null` when the icon cannot be resolved (offline, unknown icon, ...).
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
  const url = `${ICONIFY_API_URL}/${name}.svg${
    numericSize ? `?height=${numericSize}` : ''
  }`

  if (svgCache.has(url)) return svgCache.get(url)!

  let svg: string | null = null

  try {
    const response = await fetch(url)
    if (!response.ok) return null

    const text = (await response.text()).trim()
    if (text.startsWith('<svg')) svg = text
  }
  catch {
    svg = null
  }

  if (svg) {
    const styles: string[] = []
    if (color) styles.push(`color:${color}`)
    // em/percent sizes keep the default 1em width/height and scale via font-size
    if (size && !numericSize) styles.push(`font-size:${size}`)

    svg = applyStylesToSvg(svg, styles)
  }

  svgCache.set(url, svg)

  return svg
}

/**
 * Replace every `<iconify-icon icon="...">` tag in rendered HTML with an
 * inline SVG so the document renders without the iconify-icon web component.
 * Tags that cannot be resolved are left untouched.
 */
export const replaceIconifyIconsInHtml = async (html: string) => {
  const tags = Array.from(
    html.matchAll(/<iconify-icon\b([^>]*)>\s*<\/iconify-icon>/gi),
  )

  const results = await Promise.all(tags.map(async ([tag, attributes]) => {
    const icon = attributes.match(/\bicon\s*=\s*(["'])(.*?)\1/i)?.[2]
    if (!icon) return null

    const svg = await iconifyIconToSvg(icon, extractIconifyOptions(attributes))
    if (!svg) return null

    return { tag, svg }
  }))

  let result = html

  for (const replacement of results) {
    if (replacement) result = result.split(replacement.tag).join(replacement.svg)
  }

  return result
}
