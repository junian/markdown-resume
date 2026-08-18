import { describe, expect, it } from 'vitest'
import { extractFrontMatter } from './index'

describe('extractFrontMatter', () => {
  it('extracts attributes from --- delimited front matter', () => {
    const result = extractFrontMatter('---\nname: Bruce Wayne\n---\n\n# Body')

    expect(result.attributes).toEqual({ name: 'Bruce Wayne' })
    expect(result.body).toContain('# Body')
  })

  it('extracts attributes from = yaml = delimited front matter', () => {
    const result = extractFrontMatter('= yaml =\nname: Bruce Wayne\n= yaml =\n\n# Body')

    expect(result.attributes).toEqual({ name: 'Bruce Wayne' })
    expect(result.body).toContain('# Body')
  })

  it('accepts ... as the closing delimiter', () => {
    const result = extractFrontMatter('---\nname: Bruce Wayne\n...\n\n# Body')

    expect(result.attributes).toEqual({ name: 'Bruce Wayne' })
    expect(result.body).toContain('# Body')
  })

  it('parses complex YAML attributes', () => {
    const result = extractFrontMatter(
      '---\nname: Bruce Wayne\nheader:\n  - text: example.com\n    link: https://example.com\n---\n\nBody',
    )

    expect(result.attributes).toEqual({
      name: 'Bruce Wayne',
      header: [{ text: 'example.com', link: 'https://example.com' }],
    })
  })

  it('returns empty attributes and the whole input when there is no front matter', () => {
    const input = '# Body\n\nJust text.'
    const result = extractFrontMatter(input)

    expect(result.attributes).toEqual({})
    expect(result.body).toBe(input)
  })

  it('handles an empty string', () => {
    const result = extractFrontMatter('')

    expect(result.attributes).toEqual({})
    expect(result.body).toBe('')
    expect(result.bodyBegin).toBe(1)
  })

  it('reports the body line offset', () => {
    const result = extractFrontMatter('---\nname: Bruce Wayne\n---\nBody')

    expect(result.bodyBegin).toBeGreaterThan(1)
  })
})
