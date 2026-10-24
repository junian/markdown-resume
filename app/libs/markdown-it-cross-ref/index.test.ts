import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import MarkdownItCrossRef from './index'

const md = new MarkdownIt().use(MarkdownItCrossRef)

describe('MarkdownItCrossRef', () => {
  it('renders a cross-reference definition as a list item', () => {
    const html = md.render('[~P1]: **Eating is All You Need**\n\n    *NeurIPS, 2099*\n')

    expect(html).toContain('<ul class="crossref-list">')
    expect(html).toContain('class="crossref-item" data-caption="P1"')
    expect(html).toContain('<strong>Eating is All You Need</strong>')
    expect(html).toContain('<em>NeurIPS, 2099</em>')
  })

  it('renders a reference to a defined label as a link', () => {
    const html = md.render(
      '[~P1]: **Eating is All You Need**\n\n    *NeurIPS, 2099*\n\nSee [~P1] for details.',
    )

    expect(html).toContain(
      '<sup class="crossref-ref"><a href="#crossref1" id="crossref-ref1">P1</a></sup>',
    )
  })

  it('assigns sequential ids to multiple definitions', () => {
    const html = md.render(
      '[~P1]: **First**\n\n    *2020*\n\n[~P2]: **Second**\n\n    *2021*\n\nSee [~P1] and [~P2].',
    )

    expect(html).toContain('id="crossref1"')
    expect(html).toContain('id="crossref2"')
    expect(html).toContain('href="#crossref1"')
    expect(html).toContain('href="#crossref2"')
  })

  it('reuses the same id for repeated references to one label', () => {
    const html = md.render(
      '[~P1]: **First**\n\n    *2020*\n\nA [~P1] and B [~P1].',
    )

    expect(html).toContain('href="#crossref1"')
    expect(html).toContain('id="crossref-ref1"')
    expect(html.match(/crossref-ref1/g)).toHaveLength(2)
    expect(html).not.toContain('crossref2')
  })

  it('leaves references to undefined labels as plain text', () => {
    const html = md.render('[~P1]: **First**\n\n    *2020*\n\nSee [~P2].')

    expect(html).toContain('[~P2]')
    expect(html).not.toContain('crossref-ref')
  })
})
