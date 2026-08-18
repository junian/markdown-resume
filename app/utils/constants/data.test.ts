import { describe, expect, it } from 'vitest'
import { getPaperPx, PAPER } from './data'

describe('getPaperPx', () => {
  it('converts A4 paper dimensions to pixels', () => {
    expect(getPaperPx('A4', 'w')).toBe(793)
    expect(getPaperPx('A4', 'h')).toBe(1130)
  })

  it('converts US Letter paper dimensions to pixels', () => {
    expect(getPaperPx('letter', 'w')).toBe(816)
    expect(getPaperPx('letter', 'h')).toBe(1067)
  })

  it('exposes paper sizes in millimeters', () => {
    expect(PAPER.A4.w).toBe(210)
    expect(PAPER.letter.w).toBe(215.9)
  })
})
