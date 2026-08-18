export interface IconifyMigrationResult {
  text: string
  count: number
}

const getAttr = (attributes: string, name: string) => {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'))
  return match?.[2]
}

const extractIconifyOptions = (attributes: string) => {
  let size = ''
  let color = ''

  const styleAttribute = getAttr(attributes, 'style')
  if (styleAttribute) {
    const fontSize = styleAttribute.match(/\bfont-size\s*:\s*([^;]+)/i)
    const colorValue = styleAttribute.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i)
    if (fontSize) size = fontSize[1]!.trim()
    if (colorValue) color = colorValue[1]!.trim()
  }

  if (!size) {
    size = getAttr(attributes, 'width')
      ?? getAttr(attributes, 'height')
      ?? getAttr(attributes, 'data-width')
      ?? getAttr(attributes, 'data-height')
      ?? ''
  }

  return { size, color }
}

const toMarkdownIcon = (icon: string, attributes: string) => {
  const { size, color } = extractIconifyOptions(attributes)

  let markdown = `::${icon}`
  if (size) markdown += ` =${size}`
  if (color) markdown += ` /${color}`
  return `${markdown}::`
}

/**
 * Convert Iconify markup in a resume to Markdown icon syntax (`::icon::`).
 *
 * Handles both legacy Iconify v2 spans (`<span class="iconify" data-icon="...">`)
 * and Iconify web component tags (`<iconify-icon icon="...">`). Size and color
 * from `style`, `width`/`height`, or `data-width`/`data-height` attributes are
 * preserved using the `=size` and `/color` modifiers.
 */
export const migrateIconify = (markdown: string): IconifyMigrationResult => {
  let count = 0

  // Legacy Iconify v2 markup: <span class="iconify" data-icon="..."></span>
  let text = markdown.replace(
    /<span\b([^>]*)>\s*<\/span>/gi,
    (original, attributes: string) => {
      const classAttribute = attributes.match(/\bclass\s*=\s*(["'])(.*?)\1/i)
      const iconAttribute = attributes.match(/\bdata-icon\s*=\s*(["'])(.*?)\1/i)

      if (!classAttribute || !iconAttribute) return original

      const classes = classAttribute[2]!.split(/\s+/).filter(Boolean)
      if (!classes.includes('iconify')) return original

      count += 1
      return toMarkdownIcon(iconAttribute[2]!, attributes)
    },
  )

  // Iconify web component markup: <iconify-icon icon="..."></iconify-icon>
  text = text.replace(
    /<iconify-icon\b([^>]*)>\s*<\/iconify-icon>/gi,
    (original, attributes: string) => {
      const iconAttribute = attributes.match(/\bicon\s*=\s*(["'])(.*?)\1/i)
      if (!iconAttribute) return original

      count += 1
      return toMarkdownIcon(iconAttribute[2]!, attributes)
    },
  )

  return { text, count }
}
