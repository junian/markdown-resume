import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { renderMarkdown } from './markdown'

describe('renderMarkdown ::icon:: syntax', () => {
  it('renders an iconify icon from Markdown syntax', () => {
    const html = renderMarkdown('::mdi:home::')

    expect(html).toContain('<iconify-icon icon="mdi:home"></iconify-icon>')
  })

  it('renders icon size and color modifiers', () => {
    const html = renderMarkdown('::mdi:home =24 /red::')

    expect(html).toContain(
      '<iconify-icon icon="mdi:home" style="font-size:24px;color:red"></iconify-icon>',
    )
  })

  it('renders an icon with a size modifier only', () => {
    const html = renderMarkdown('::mdi:home =1.5em::')

    expect(html).toContain(
      '<iconify-icon icon="mdi:home" style="font-size:1.5em"></iconify-icon>',
    )
  })

  it('renders icons next to links', () => {
    const html = renderMarkdown(
      '::eva:people-outline:: [example.com](https://example.com/)',
    )

    expect(html).toContain(
      '<iconify-icon icon="eva:people-outline"></iconify-icon> <a href="https://example.com/"',
    )
    expect(html).toContain('>example.com</a>')
  })

  it('renders icons inside definition lists', () => {
    const html = renderMarkdown(
      '::eva:people-outline:: [example.com](https://example.com/)\n'
      + '  : ::tabler:phone:: [(+1) 123-456-7890](https://wa.me/11234567890)',
    )

    expect(html).toContain('<dl>')
    expect(html).toContain(
      '<dt><iconify-icon icon="eva:people-outline"></iconify-icon>',
    )
    expect(html).toContain(
      '<dd><iconify-icon icon="tabler:phone"></iconify-icon>',
    )
  })

  it('does not leave literal :: delimiters in the output', () => {
    const html = renderMarkdown('::mdi:home:: ::tabler:mail::')

    expect(html).not.toContain('::')
  })

  it('leaves escaped syntax with a space after the delimiters untouched', () => {
    const html = renderMarkdown(':: not-an-icon ::')

    expect(html).toContain(':: not-an-icon ::')
    expect(html).not.toContain('<iconify-icon')
  })

  it('renders icons after front matter', () => {
    const html = renderMarkdown('---\n---\n\n::mdi:home::')

    expect(html).toContain('<iconify-icon icon="mdi:home"></iconify-icon>')
  })

  it('renders icons embedded in bold text', () => {
    const html = renderMarkdown(
      '**Programming Languages:** ::vscode-icons:file-type-python:: Python',
    )

    expect(html).toContain(
      '<strong>Programming Languages:</strong> <iconify-icon icon="vscode-icons:file-type-python"></iconify-icon> Python',
    )
  })

  it('renders every icon of the default resume', () => {
    const source = readFileSync(new URL('../assets/default-resume.md', import.meta.url), 'utf8')
    const html = renderMarkdown(source)

    const iconNames = [
      'eva:people-outline',
      'tabler:brand-github',
      'tabler:phone',
      'ic:outline-location-on',
      'tabler:brand-linkedin',
      'tabler:mail',
      'vscode-icons:file-type-python',
      'vscode-icons:file-type-js-official',
      'vscode-icons:file-type-typescript-official',
      'vscode-icons:file-type-html',
      'vscode-icons:file-type-css',
      'logos:java',
    ]

    for (const name of iconNames) {
      expect(html).toContain(`<iconify-icon icon="${name}"></iconify-icon>`)
    }

    expect(html).not.toContain('::')
  })
})
