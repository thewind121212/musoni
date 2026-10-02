import { describe, it, expect } from 'vitest'
import { shadeLevel } from './shade'

describe('shadeLevel', () => {
  it('leaves days without practice blank', () => {
    expect(shadeLevel(undefined)).toBe(0)
    expect(shadeLevel(0)).toBe(0)
  })

  it('steps up at 2, 5 and 10 minutes, each threshold inclusive', () => {
    expect([1, 2, 3, 5, 6, 10, 11, 90].map(shadeLevel)).toEqual([1, 1, 2, 2, 3, 3, 4, 4])
  })
})
