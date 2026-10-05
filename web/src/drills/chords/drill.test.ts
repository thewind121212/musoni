import { describe, expect, it } from 'vitest'
import { presetError } from '@/app/drillPreset'
import chords, { modeOf, sessionLevel } from './drill'

describe('chords registry entry', () => {
  it('runs a naming level as itself and a Roman level as Roman, whatever the mode says', () => {
    expect(sessionLevel({ level: 3, mode: 'name' })).toBe(3)
    expect(sessionLevel({ level: 6, mode: 'name' })).toBe(6)
    expect(sessionLevel({ level: 6, mode: 'roman' })).toBe(6)
  })

  it('reads the Roman mode with a naming level as the Roman level in the same place', () => {
    expect(sessionLevel({ level: 1, mode: 'roman' })).toBe(5)
    expect(sessionLevel({ level: 3, mode: 'roman' })).toBe(7)
    expect(sessionLevel({ level: 4, mode: 'roman' })).toBe(7)
  })

  it('keeps an out-of-range level inside the levels', () => {
    expect(sessionLevel({ level: 0, mode: 'name' })).toBe(1)
    expect(sessionLevel({ level: 12, mode: 'name' })).toBe(chords.levels.length)
  })

  it('says which mode a level belongs to', () => {
    expect([1, 4, 5, 7].map(modeOf)).toEqual(['name', 'name', 'roman', 'roman'])
  })

  it('lets a lesson ask for the Roman numeral mode, but not for listening', () => {
    expect(presetError({ drill: 'chords', level: 5, durationSec: 60, mode: 'roman' })).toBeNull()
    expect(presetError({ drill: 'chords', level: 1, durationSec: 60, listen: false })).toMatch(/cannot set/)
  })
})
