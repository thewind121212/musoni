import { describe, it, expect } from 'vitest'
import { optionIndexFromKey } from './keyboard'

describe('optionIndexFromKey', () => {
  it('maps digit keys to zero-based option indices', () => {
    expect(optionIndexFromKey('1', 8)).toBe(0)
    expect(optionIndexFromKey('8', 8)).toBe(7)
  })
  it('rejects non-digit keys (regression: De Morgan guard inversion)', () => {
    expect(optionIndexFromKey('Shift', 8)).toBeNull()
    expect(optionIndexFromKey('ArrowUp', 8)).toBeNull()
    expect(optionIndexFromKey('a', 8)).toBeNull()
    expect(optionIndexFromKey('F5', 8)).toBeNull()
  })
  it('rejects digits outside the option range', () => {
    expect(optionIndexFromKey('0', 8)).toBeNull()
    expect(optionIndexFromKey('9', 8)).toBeNull()
  })
})
