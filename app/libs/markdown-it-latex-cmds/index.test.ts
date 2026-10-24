import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import MarkdownItLatexCmds from './index'

const md = new MarkdownIt().use(MarkdownItLatexCmds)

describe('MarkdownItLatexCmds', () => {
  it('renders \\newpage as a new-page divider', () => {
    const html = md.render('Text before\n\n\\newpage\n\nText after')

    expect(html).toContain('<div class="md-it-newpage"></div>')
  })

  it('renders \\\\[n] as a line break with the given height', () => {
    const html = md.render('Line one\n\n\\\\[10px]\n\nLine two')

    expect(html).toContain(
      '<div class="md-it-line-break" style="margin-top:10px;"></div>',
    )
  })

  it('renders \\\\[n] with unitless or em heights', () => {
    expect(md.render('\\\\[24]')).toContain('margin-top:24;')
    expect(md.render('\\\\[2em]')).toContain('margin-top:2em;')
  })

  it('does not treat \\newpage mid-line as a command', () => {
    const html = md.render('inline \\newpage here')

    expect(html).not.toContain('md-it-newpage')
  })

  it('leaves malformed line breaks untouched', () => {
    const html = md.render('\\\\[10px')

    expect(html).not.toContain('md-it-line-break')
  })

  it('rejects line breaks containing unescaped spaces', () => {
    const html = md.render('\\\\[10 px]')

    expect(html).not.toContain('md-it-line-break')
  })

  it('allows escaped spaces and unescapes them in the height value', () => {
    const html = md.render('\\\\[10\\ px]')

    expect(html).toContain('margin-top:10 px;')
  })
})
