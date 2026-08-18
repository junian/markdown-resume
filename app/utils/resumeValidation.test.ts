import { describe, expect, it } from 'vitest'
import { isResumeStyles, isValidResume } from './resumeValidation'
import type { ResumeStorageItem, ResumeStyles } from '~/types'

const validStyles: ResumeStyles = {
  marginV: 12,
  marginH: 16,
  lineHeight: 1.5,
  paragraphSpace: 8,
  themeColor: '#000000',
  fontSize: 12,
  paper: 'A4',
  fontCJK: { name: 'System CJK' },
  fontEN: { name: 'Arial' },
}

const validResume: ResumeStorageItem = {
  name: 'My Resume',
  markdown: '# Firstname Lastname',
  css: '',
  styles: validStyles,
  update: '1700000000000',
}

describe('isResumeStyles', () => {
  it('accepts a complete set of styles', () => {
    expect(isResumeStyles(validStyles)).toBe(true)
  })

  it('rejects a non-object', () => {
    expect(isResumeStyles(null)).toBe(false)
    expect(isResumeStyles(undefined)).toBe(false)
    expect(isResumeStyles('A4')).toBe(false)
    expect(isResumeStyles(42)).toBe(false)
  })

  it('rejects styles with a missing field', () => {
    const { fontSize: _omitted, ...partial } = validStyles
    expect(isResumeStyles(partial)).toBe(false)
  })

  it('rejects styles with a wrong value type', () => {
    expect(isResumeStyles({ ...validStyles, fontSize: '12' })).toBe(false)
    expect(isResumeStyles({ ...validStyles, paper: 4 })).toBe(false)
  })

  it('rejects styles with an invalid font object', () => {
    expect(isResumeStyles({ ...validStyles, fontEN: 'Arial' })).toBe(false)
    expect(isResumeStyles({ ...validStyles, fontCJK: { family: 'X' } })).toBe(false)
  })
})

describe('isValidResume', () => {
  it('accepts a complete resume', () => {
    expect(isValidResume(validResume)).toBe(true)
  })

  it('accepts a resume without an update timestamp', () => {
    const { update: _omitted, ...resume } = validResume
    expect(isValidResume(resume)).toBe(true)
  })

  it('rejects a non-object', () => {
    expect(isValidResume(null)).toBe(false)
    expect(isValidResume('resume')).toBe(false)
  })

  it('rejects a resume with a missing required field', () => {
    const { name: _omitted, ...resume } = validResume
    expect(isValidResume(resume)).toBe(false)
  })

  it('rejects a resume with a non-string field', () => {
    expect(isValidResume({ ...validResume, markdown: 123 })).toBe(false)
  })

  it('rejects a resume with a non-string update timestamp', () => {
    expect(isValidResume({ ...validResume, update: 1700000000000 })).toBe(false)
  })

  it('rejects a resume with invalid styles', () => {
    expect(isValidResume({ ...validResume, styles: {} })).toBe(false)
  })
})
