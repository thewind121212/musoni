import { describe, it, expect } from 'vitest'
import type { Pitch } from '@/core/music/types'
import { canExist, intervalBetween, intervalId, noteAbove, parseIntervalId, semitones, SIZES, type Quality } from './interval'

const p = (s: string): Pitch => {
  const m = /^([A-G])(#|b)?(\d)$/.exec(s)!
  return { letter: m[1] as Pitch['letter'], accidental: (m[2] ?? '') as Pitch['accidental'], octave: Number(m[3]) }
}
const name = (a: string, b: string) => {
  const i = intervalBetween(p(a), p(b))
  return i && intervalId(i)
}

describe('intervalBetween', () => {
  it('names intervals from the letters and the semitones', () => {
    expect(name('E4', 'C5')).toBe('m6')
    expect(name('C4', 'E4')).toBe('M3')
    expect(name('D4', 'F4')).toBe('m3')
    expect(name('C4', 'G4')).toBe('P5')
    expect(name('C4', 'C5')).toBe('P8')
    expect(name('F4', 'B4')).toBe('A4')
    expect(name('B4', 'F5')).toBe('d5')
    expect(name('E4', 'F4')).toBe('m2')
    expect(name('B3', 'C4')).toBe('m2')
    expect(name('C4', 'B4')).toBe('M7')
  })

  it('reads the size from the letters, so enharmonic spellings are different intervals', () => {
    expect(name('C4', 'Eb4')).toBe('m3')
    expect(name('C4', 'D#4')).toBe('A2')
    expect(name('C#4', 'F4')).toBe('d4')
    expect(name('C#4', 'Bb4')).toBe('d7')
    expect(name('Ab3', 'F#4')).toBe('A6')
    expect(name('C4', 'G#4')).toBe('A5')
    expect(name('Bb3', 'Ab4')).toBe('m7')
    expect(name('F#4', 'C5')).toBe('d5')
  })

  it('names every quality of every size from one lower note', () => {
    for (const size of SIZES) {
      for (const quality of ['m', 'M', 'P', 'A', 'd'] as Quality[]) {
        const interval = { size, quality }
        if (!canExist(interval)) continue
        // D has room for a sharp or flat above it in every direction, so every quality is spellable.
        const upper = noteAbove(p('D4'), interval)
        if (!upper) continue
        expect(intervalBetween(p('D4'), upper)).toEqual(interval)
      }
    }
  })

  it('has no name for a unison, a compound interval, a downward pair or a doubly augmented one', () => {
    expect(name('C4', 'C4')).toBeNull()
    expect(name('C4', 'D5')).toBeNull()
    expect(name('G4', 'C4')).toBeNull()
    expect(name('Cb4', 'G#4')).toBeNull()
  })
})

describe('semitones and canExist', () => {
  it('counts semitones for each quality', () => {
    expect(semitones({ size: 3, quality: 'M' })).toBe(4)
    expect(semitones({ size: 3, quality: 'm' })).toBe(3)
    expect(semitones({ size: 3, quality: 'd' })).toBe(2)
    expect(semitones({ size: 2, quality: 'A' })).toBe(3)
    expect(semitones({ size: 5, quality: 'd' })).toBe(6)
    expect(semitones({ size: 4, quality: 'A' })).toBe(6)
    expect(semitones({ size: 7, quality: 'd' })).toBe(9)
  })

  it('has no perfect 3rd and no minor 5th', () => {
    expect(canExist({ size: 3, quality: 'P' })).toBe(false)
    expect(canExist({ size: 5, quality: 'm' })).toBe(false)
    expect(canExist({ size: 8, quality: 'M' })).toBe(false)
    expect(canExist({ size: 4, quality: 'A' })).toBe(true)
  })
})

describe('noteAbove', () => {
  it('spells the upper note on the right letter', () => {
    expect(noteAbove(p('E4'), { size: 6, quality: 'm' })).toEqual(p('C5'))
    expect(noteAbove(p('Bb3'), { size: 2, quality: 'A' })).toEqual(p('C#4'))
    expect(noteAbove(p('G#4'), { size: 7, quality: 'd' })).toEqual(p('F5'))
  })

  it('refuses a double accidental and the spellings the drill never prints', () => {
    expect(noteAbove(p('C#4'), { size: 3, quality: 'M' })).toBeNull() // E#
    expect(noteAbove(p('Eb4'), { size: 3, quality: 'd' })).toBeNull() // Gbb
  })
})

describe('parseIntervalId', () => {
  it('reads an id back, and refuses one that names nothing', () => {
    expect(parseIntervalId('A4')).toEqual({ size: 4, quality: 'A' })
    expect(() => parseIntervalId('P3')).toThrow()
    expect(() => parseIntervalId('M9')).toThrow()
  })
})
