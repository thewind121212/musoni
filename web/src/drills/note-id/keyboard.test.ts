import { describe, it, expect } from 'vitest'
import { optionIndexFromKey } from './keyboard'
import { buildOptions } from './generator'

const withAccidentals = buildOptions('letters', true, '#')
const naturalsOnly = buildOptions('letters', false, '#')

describe('optionIndexFromKey', () => {
  it('maps the number row to the natural keys', () => {
    expect(optionIndexFromKey('1', withAccidentals)).toBe(0)
    expect(withAccidentals[0].label).toBe('C')
    expect(optionIndexFromKey('7', withAccidentals)).toBe(6)
    expect(withAccidentals[6].label).toBe('B')
  })
  it('maps q w e r t to the accidental keys', () => {
    const q = optionIndexFromKey('q', withAccidentals)!
    expect(withAccidentals[q].label).toBe('C#')
    const t = optionIndexFromKey('t', withAccidentals)!
    expect(withAccidentals[t].label).toBe('A#')
  })
  it('is case insensitive', () => {
    expect(optionIndexFromKey('Q', withAccidentals)).toBe(optionIndexFromKey('q', withAccidentals))
  })
  it('rejects keys with no answer behind them (regression: NaN slipped a range check)', () => {
    for (const key of ['Shift', 'ArrowUp', 'a', 'F5', '0', '8', '9']) {
      expect(optionIndexFromKey(key, withAccidentals)).toBeNull()
    }
  })
  it('rejects the accidental keys when accidentals are off', () => {
    expect(optionIndexFromKey('q', naturalsOnly)).toBeNull()
    expect(optionIndexFromKey('1', naturalsOnly)).toBe(0)
  })
})
