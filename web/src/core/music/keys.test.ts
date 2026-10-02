import { describe, it, expect } from 'vitest'
import { cadence, keySpelling, MAJOR_SCALE, noteInKey, tonicOf, walkHome, type KeyName } from './keys'
import { label, midi } from './pitch'

const KEYS: KeyName[] = ['C', 'G', 'D', 'A', 'F', 'Bb', 'Eb']
const name = (key: KeyName, s: number) => {
  const p = noteInKey(key, s)
  return label(p.letter, p.accidental, 'letters')
}

describe('keys', () => {
  it('spells each key\'s scale with one of every letter, the way it is written', () => {
    expect(MAJOR_SCALE.map(s => name('D', s))).toEqual(['D', 'E', 'F#', 'G', 'A', 'B', 'C#'])
    expect(MAJOR_SCALE.map(s => name('Eb', s))).toEqual(['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'])
    for (const key of KEYS) {
      const letters = MAJOR_SCALE.map(s => noteInKey(key, s).letter)
      expect(new Set(letters).size).toBe(7)
    }
  })

  it('writes flat keys with flats and the rest with sharps', () => {
    expect(KEYS.filter(k => keySpelling(k) === 'b')).toEqual(['F', 'Bb', 'Eb'])
  })

  it('keeps every key\'s octave between G3 and E5', () => {
    for (const key of KEYS) {
      const low = midi(tonicOf(key))
      expect(low).toBeGreaterThanOrEqual(55)
      expect(low + 11).toBeLessThanOrEqual(76)
    }
  })

  it('plays I-IV-V-I, ending on the tonic chord', () => {
    const chords = cadence('G').map(c => c.map(p => label(p.letter, p.accidental, 'letters')))
    expect(chords).toEqual([['G', 'B', 'D'], ['C', 'C', 'E'], ['D', 'A', 'D', 'F#'], ['G', 'B', 'D', 'G']])
  })

  it('walks a low degree down to the tonic and a high one up to the next', () => {
    const walk = (s: number) => walkHome('C', s).map(p => label(p.letter, p.accidental, 'letters'))
    expect(walk(4)).toEqual(['E', 'D', 'C'])
    expect(walk(7)).toEqual(['G', 'A', 'B', 'C'])
    expect(walk(0)).toEqual(['C'])
    expect(walk(6)).toEqual(['F#', 'C'])
    expect(midi(walkHome('C', 7).at(-1)!)).toBe(72)
  })
})
