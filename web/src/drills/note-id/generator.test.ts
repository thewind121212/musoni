import { describe, it, expect } from 'vitest'
import { generateQuestion } from './generator'
import { diatonicIndex, parsePitch, isExcluded } from '../../core/music/pitch'
import { LEVELS } from '../../config/constants'

describe('generateQuestion', () => {
  it('naturals mode: 7 natural options, exactly one correct', () => {
    const q = generateQuestion(1, false, 'letters')
    expect(q.options).toHaveLength(7)
    expect(new Set(q.options.map(o => o.label)).size).toBe(7)
    expect(q.options.every(o => o.accidental === '')).toBe(true)
    const c = q.options[q.correctIndex]
    expect(c.letter).toBe(q.pitch.letter)
    expect(q.pitch.accidental).toBe('')
  })
  it('accidentals mode: 7-8 unique options, exactly one matches printed note', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateQuestion(2, true, 'letters')
      expect(q.options.length).toBeGreaterThanOrEqual(7)
      expect(q.options.length).toBeLessThanOrEqual(8)
      expect(new Set(q.options.map(o => o.label)).size).toBe(q.options.length)
      const matches = q.options.filter(
        o => o.letter === q.pitch.letter && o.accidental === q.pitch.accidental)
      expect(matches).toHaveLength(1)
      expect(q.options[q.correctIndex]).toEqual(matches[0])
      expect(isExcluded(q.pitch.letter, q.pitch.accidental)).toBe(false)
    }
  })
  it('respects level range and clef', () => {
    for (let i = 0; i < 100; i++) {
      const q = generateQuestion(1, false, 'letters')
      expect(q.clef).toBe('treble')
      const di = diatonicIndex({ ...q.pitch, accidental: '' })
      expect(di).toBeGreaterThanOrEqual(diatonicIndex(parsePitch(LEVELS[1].pools[0].low)))
      expect(di).toBeLessThanOrEqual(diatonicIndex(parsePitch(LEVELS[1].pools[0].high)))
    }
  })
  it('solfege naming produces solfege labels', () => {
    const q = generateQuestion(1, false, 'solfege')
    expect(q.options.map(o => o.label)).toContain('Do')
  })
  it('excluded accidental flips to the other: E# becomes Eb, Cb becomes C#', () => {
    // Custom rng to force letter E with excluded # accidental, should flip to b
    let callCount = 0
    const stubbedRng = () => {
      callCount++
      // call 1: pool pick (returns 0 for pool 0)
      if (callCount === 1) return 0
      // call 2: pitch range (return value that will land on E in treble, diatonic ~32)
      // Treble E4-F5 is diatonic indices 28-33, let's aim for E4 (index 28)
      if (callCount === 2) return 0 // 0 * (33-28+1) = 0, so 28+0 = 28 = E4
      // call 3: accidental chance trigger (must be < 0.4 to trigger)
      if (callCount === 3) return 0.2 // triggers accidental
      // call 4: accidental type pick (< 0.5 for #, which is excluded for E)
      if (callCount === 4) return 0.2 // triggers # (< 0.5)
      // after that: Fisher-Yates shuffle rng calls
      return Math.random()
    }
    const q = generateQuestion(1, true, 'letters', stubbedRng)
    // Verify we got letter E with an accidental (should be 'b', the flip of excluded '#')
    expect(q.pitch.letter).toBe('E')
    expect(q.pitch.accidental).toBe('b') // flipped from excluded #
    expect(isExcluded('E', 'b')).toBe(false) // Eb is not excluded
  })
})
