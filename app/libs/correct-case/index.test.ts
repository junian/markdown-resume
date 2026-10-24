import { describe, expect, it } from 'vitest'
import { correctCase } from './index'

describe('correctCase', () => {
  it('corrects a mixed-case word to its dictionary form', () => {
    const result = correctCase('Github')

    expect(result.text).toBe('GitHub')
    expect(result.correctedWords).toEqual([{ before: 'Github', after: 'GitHub' }])
  })

  it('corrects multiple words in one pass', () => {
    const result = correctCase('Github and Javascript')

    expect(result.text).toBe('GitHub and JavaScript')
    expect(result.correctedWords).toHaveLength(2)
  })

  it('corrects words with common casing mistakes', () => {
    expect(correctCase('I use Node.js and Html').text).toBe('I use Node.js and HTML')
    expect(correctCase('Macos and Iphone').text).toBe('macOS and iPhone')
    expect(correctCase('Json Api and Sql').text).toBe('JSON API and SQL')
    expect(correctCase('OpenGl on Unix').text).toBe('OpenGL on UNIX')
  })

  it('leaves all-lowercase words untouched', () => {
    const result = correctCase('github')

    expect(result.text).toBe('github')
    expect(result.correctedWords).toBe(false)
  })

  it('leaves all-uppercase words untouched', () => {
    expect(correctCase('GITHUB').text).toBe('GITHUB')
  })

  it('leaves already-correct words untouched', () => {
    const result = correctCase('GitHub')

    expect(result.text).toBe('GitHub')
    expect(result.correctedWords).toBe(false)
  })

  it('does not correct words without word boundaries', () => {
    expect(correctCase('myGithub').text).toBe('myGithub')
  })

  it('does not correct words adjacent to CJK characters', () => {
    expect(correctCase('中文Github工具').text).toBe('中文Github工具')
  })

  it('respects the disable list', () => {
    const result = correctCase('Github', ['github'])

    expect(result.text).toBe('Github')
    expect(result.correctedWords).toBe(false)
  })

  it('respects the @correct-case-ignore directive', () => {
    const result = correctCase('@correct-case-ignore github Github')

    expect(result.text).toBe('@correct-case-ignore github Github')
    expect(result.correctedWords).toBe(false)
  })

  it('returns correctedWords as false when nothing changes', () => {
    const result = correctCase('plain text')

    expect(result.correctedWords).toBe(false)
  })
})
