import { describe, expect, it } from 'vitest'
import { copy, isClient, storageToList } from './index'

describe('copy', () => {
  it('deep-clones nested objects and arrays', () => {
    const source = { a: 1, b: { c: [1, 2, { d: 'x' }] } }
    const clone = copy(source)

    expect(clone).toEqual(source)
    expect(clone).not.toBe(source)
    expect(clone.b).not.toBe(source.b)
    expect(clone.b.c).not.toBe(source.b.c)
  })

  it('clones arrays', () => {
    const source = [{ id: 1 }, { id: 2 }]
    const clone = copy(source)

    expect(clone).toEqual(source)
    expect(clone).not.toBe(source)
    expect(clone[0]).not.toBe(source[0])
  })

  it('returns primitives unchanged', () => {
    expect(copy(42)).toBe(42)
    expect(copy('text')).toBe('text')
  })
})

describe('storageToList', () => {
  it('converts a record keyed by id into a list with the id attached', () => {
    const storage = {
      1: { name: 'Resume A' },
      2: { name: 'Resume B' },
    }

    expect(storageToList(storage)).toEqual([
      { id: '1', name: 'Resume A' },
      { id: '2', name: 'Resume B' },
    ])
  })

  it('returns an empty list for an empty record', () => {
    expect(storageToList({})).toEqual([])
  })
})

describe('isClient', () => {
  it('is false in the node test environment', () => {
    expect(isClient).toBe(false)
  })
})
