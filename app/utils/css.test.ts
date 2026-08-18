import { describe, expect, it } from 'vitest'
import { getDynamicCss } from './css'
import type { ResumeStyles } from '~/types'

const styles: ResumeStyles = {
  marginV: 12,
  marginH: 16,
  lineHeight: 1.5,
  paragraphSpace: 8,
  themeColor: '#377bb5',
  fontSize: 12,
  paper: 'A4',
  fontCJK: { name: 'System CJK', fontFamily: 'system-ui' },
  fontEN: { name: 'Arial' },
}

describe('getDynamicCss', () => {
  it('scopes rules to the preview element id', () => {
    const css = getDynamicCss(styles, 'preview')

    expect(css).toContain('#vue-smart-pages-preview { font-size: 12px }')
    expect(css).toContain('#vue-smart-pages-preview { font-family: Arial, system-ui }')
  })

  it('emits theme color rules', () => {
    const css = getDynamicCss(styles, 'preview')

    expect(css).toContain(
      '#vue-smart-pages-preview :not(.resume-header-item) > a { color: #377bb5 }',
    )
    expect(css).toContain(
      '#vue-smart-pages-preview h1, #vue-smart-pages-preview h2, #vue-smart-pages-preview h3 { color: #377bb5 }',
    )
  })

  it('emits paragraph spacing rules', () => {
    const css = getDynamicCss(styles, 'preview')

    expect(css).toContain('#vue-smart-pages-preview h2 { margin-top: 8px }')
  })

  it('emits line height rules scaled for headings and definition lists', () => {
    const css = getDynamicCss(styles, 'preview')

    expect(css).toContain('#vue-smart-pages-preview p, #vue-smart-pages-preview li { line-height: 1.50 }')
    expect(css).toContain('#vue-smart-pages-preview h2, #vue-smart-pages-preview h3 { line-height: 1.73 }')
    expect(css).toContain('#vue-smart-pages-preview dl { line-height: 1.56 }')
  })

  it('scopes rules to a custom element id', () => {
    const css = getDynamicCss(styles, 'thumbnail')

    expect(css).toContain('#vue-smart-pages-thumbnail { font-size: 12px }')
    expect(css).not.toContain('#vue-smart-pages-preview {')
  })

  it('includes the print paper rule only when requested', () => {
    const withoutPaper = getDynamicCss(styles, 'preview')
    const withPaper = getDynamicCss(styles, 'preview', true)

    expect(withoutPaper).not.toContain('@media print')
    expect(withPaper).toContain('@media print { @page { size: A4; } }')
  })
})
