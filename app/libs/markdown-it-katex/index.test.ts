import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import MarkdownItKatex from './index'

const md = new MarkdownIt().use(MarkdownItKatex)

describe('MarkdownItKatex', () => {
  it('renders inline math with $...$', () => {
    const html = md.render('Euler: $e^{i\\pi} + 1 = 0$')

    expect(html).toContain('<span class="katex">')
    expect(html).not.toContain('$e^{i')
  })

  it('renders block math with $$...$$', () => {
    const html = md.render('$$\nx^2 + y^2 = z^2\n$$')

    expect(html).toContain('katex-display')
  })

  it('renders single-line block math', () => {
    const html = md.render('$$\\sum_{i=1}^{n} i$$')

    expect(html).toContain('katex-display')
  })

  it('leaves unmatched dollar signs as plain text', () => {
    const html = md.render('Cost: $5 and $10')

    expect(html).toContain('$5')
  })

  it('does not throw on invalid math when throwOnError is disabled', () => {
    expect(() => md.render('$\\notacommand{}$')).not.toThrow()
  })

  it('renders math alongside other content', () => {
    const html = md.render('A resume with $\\LaTeX$ support')

    expect(html).toContain('katex')
  })
})
