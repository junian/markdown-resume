import { describe, expect, it } from 'vitest'
import { migrateIconify } from './iconifyMigration'

describe('migrateIconify', () => {
  describe('legacy Iconify v2 span markup', () => {
    it('converts a legacy span to Markdown icon syntax', () => {
      const result = migrateIconify(
        '<span class="iconify" data-icon="mdi:home"></span>',
      )

      expect(result.text).toBe('::mdi:home::')
      expect(result.count).toBe(1)
    })

    it('ignores spans without the iconify class', () => {
      const input = '<span class="other" data-icon="mdi:home"></span>'
      const result = migrateIconify(input)

      expect(result.text).toBe(input)
      expect(result.count).toBe(0)
    })

    it('ignores spans without a data-icon attribute', () => {
      const input = '<span class="iconify"></span>'
      const result = migrateIconify(input)

      expect(result.text).toBe(input)
      expect(result.count).toBe(0)
    })

    it('converts spans using single-quoted attributes', () => {
      const result = migrateIconify(
        `<span class='iconify' data-icon='mdi:home'></span>`,
      )

      expect(result.text).toBe('::mdi:home::')
      expect(result.count).toBe(1)
    })

    it('preserves data-width as the icon size', () => {
      const result = migrateIconify(
        '<span class="iconify" data-icon="mdi:home" data-width="1.5em"></span>',
      )

      expect(result.text).toBe('::mdi:home =1.5em::')
    })
  })

  describe('Iconify web component markup', () => {
    it('converts a plain iconify-icon tag to Markdown icon syntax', () => {
      const result = migrateIconify(
        '<iconify-icon icon="tabler:brand-github"></iconify-icon>',
      )

      expect(result.text).toBe('::tabler:brand-github::')
      expect(result.count).toBe(1)
    })

    it('preserves font-size and color from the style attribute', () => {
      const result = migrateIconify(
        '<iconify-icon icon="mdi:home" style="font-size: 24px; color: red"></iconify-icon>',
      )

      expect(result.text).toBe('::mdi:home =24px /red::')
    })

    it('preserves color from a style with leading whitespace', () => {
      const result = migrateIconify(
        '<iconify-icon icon="mdi:home" style=" color: #1a73e8;"></iconify-icon>',
      )

      expect(result.text).toBe('::mdi:home /#1a73e8::')
    })

    it('prefers font-size over the width attribute', () => {
      const result = migrateIconify(
        '<iconify-icon icon="mdi:home" width="16" style="font-size: 2em"></iconify-icon>',
      )

      expect(result.text).toBe('::mdi:home =2em::')
    })

    it('falls back to width and height attributes for the size', () => {
      const width = migrateIconify(
        '<iconify-icon icon="mdi:home" width="1.2em"></iconify-icon>',
      )
      const height = migrateIconify(
        '<iconify-icon icon="mdi:home" height="16"></iconify-icon>',
      )

      expect(width.text).toBe('::mdi:home =1.2em::')
      expect(height.text).toBe('::mdi:home =16::')
    })

    it('leaves iconify-icon tags without an icon attribute untouched', () => {
      const input = '<iconify-icon style="color: red"></iconify-icon>'
      const result = migrateIconify(input)

      expect(result.text).toBe(input)
      expect(result.count).toBe(0)
    })
  })

  describe('combined input', () => {
    it('converts legacy spans and iconify-icon tags in one pass', () => {
      const result = migrateIconify(
        'a <span class="iconify" data-icon="mdi:home"></span>'
        + ' b <iconify-icon icon="mdi:heart"></iconify-icon> c',
      )

      expect(result.text).toBe('a ::mdi:home:: b ::mdi:heart:: c')
      expect(result.count).toBe(2)
    })

    it('does not double-convert already migrated Markdown syntax', () => {
      const input = '::mdi:home:: and <iconify-icon icon="mdi:heart"></iconify-icon>'
      const result = migrateIconify(input)

      expect(result.text).toBe('::mdi:home:: and ::mdi:heart::')
      expect(result.count).toBe(1)
    })

    it('returns the input unchanged when there are no icons', () => {
      const input = '# Firstname Lastname\n\nJust plain text.'
      const result = migrateIconify(input)

      expect(result.text).toBe(input)
      expect(result.count).toBe(0)
    })
  })
})
