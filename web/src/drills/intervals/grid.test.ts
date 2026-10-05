import { describe, it, expect } from 'vitest'
import { cellExists, cellFromKey, cellInterval, isRight, keyHint, rowOf, type Cell, type Row } from './grid'
import { SIZES } from './interval'

const FULL: Row[] = ['m', 'MP', 'A', 'd']

describe('answer grid', () => {
  it('leaves out the minor 4th, 5th and octave, and nothing else', () => {
    const blank = FULL.flatMap(row => SIZES.map(size => ({ row, size })))
      .filter(c => !cellExists(c)).map(c => `${c.row}${c.size}`)
    expect(blank).toEqual(['m4', 'm5', 'm8'])
  })

  it('names major or perfect on the shared row by size', () => {
    expect(cellInterval({ row: 'MP', size: 5 })).toEqual({ size: 5, quality: 'P' })
    expect(cellInterval({ row: 'MP', size: 6 })).toEqual({ size: 6, quality: 'M' })
    expect(cellInterval({ row: 'size', size: 6 })).toBeNull()
  })

  it('accepts any quality on a size-only answer, and only the exact interval otherwise', () => {
    expect(isRight({ row: 'size', size: 6 }, { size: 6, quality: 'm' })).toBe(true)
    expect(isRight({ row: 'size', size: 5 }, { size: 6, quality: 'm' })).toBe(false)
    expect(isRight({ row: 'm', size: 6 }, { size: 6, quality: 'm' })).toBe(true)
    expect(isRight({ row: 'MP', size: 6 }, { size: 6, quality: 'm' })).toBe(false)
    expect(isRight({ row: 'MP', size: 4 }, { size: 4, quality: 'P' })).toBe(true)
    expect(isRight({ row: 'A', size: 4 }, { size: 4, quality: 'P' })).toBe(false)
  })

  it('puts each interval on its row, and its own cell is the right answer', () => {
    for (const quality of ['m', 'M', 'P', 'A', 'd'] as const) {
      const interval = { size: quality === 'P' ? 5 : 3, quality } as const
      const cell: Cell = { row: rowOf(interval, FULL), size: interval.size }
      expect(cellExists(cell)).toBe(true)
      expect(isRight(cell, interval)).toBe(true)
    }
    expect(rowOf({ size: 3, quality: 'm' }, ['size'])).toBe('size')
  })
})

describe('grid keys', () => {
  it('maps each row to a keyboard row, each size under its digit', () => {
    expect(cellFromKey({ key: '6', code: 'Digit6' }, ['m', 'MP'])).toEqual({ row: 'm', size: 6 })
    expect(cellFromKey({ key: 'y', code: 'KeyY' }, ['m', 'MP'])).toEqual({ row: 'MP', size: 6 })
    expect(cellFromKey({ key: 'g', code: 'KeyG' }, FULL)).toEqual({ row: 'A', size: 5 })
    expect(cellFromKey({ key: ',', code: 'Comma' }, FULL)).toEqual({ row: 'd', size: 8 })
    expect(cellFromKey({ key: '2', code: 'Digit2' }, ['size'])).toEqual({ row: 'size', size: 2 })
  })

  it('reads the physical key, so Shift and input modes do not matter', () => {
    expect(cellFromKey({ key: '^', code: 'Digit6' }, ['m', 'MP'])).toEqual({ row: 'm', size: 6 })
    expect(cellFromKey({ key: 'Y', code: 'KeyY' }, ['m', 'MP'])).toEqual({ row: 'MP', size: 6 })
  })

  it('ignores rows the level does not use, blank cells and shortcut chords', () => {
    expect(cellFromKey({ key: 'g', code: 'KeyG' }, ['m', 'MP'])).toBeNull()
    expect(cellFromKey({ key: '5', code: 'Digit5' }, ['m', 'MP'])).toBeNull()
    expect(cellFromKey({ key: 'r', code: 'KeyR', metaKey: true }, ['m', 'MP'])).toBeNull()
    expect(cellFromKey({ key: '9', code: 'Digit9' }, ['size'])).toBeNull()
  })

  it('advertises the key each cell answers to', () => {
    for (const row of FULL) {
      for (const size of SIZES) {
        const cell = { row, size }
        if (!cellExists(cell)) continue
        const hint = keyHint(cell)
        const code = /\d/.test(hint) ? `Digit${hint}` : hint === ',' ? 'Comma' : `Key${hint.toUpperCase()}`
        expect(cellFromKey({ key: hint, code }, FULL)).toEqual(cell)
      }
    }
  })
})
