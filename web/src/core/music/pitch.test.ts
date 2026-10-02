import { describe, it, expect } from 'vitest'
import {
  parsePitch, diatonicIndex, pitchFromDiatonic, pitchFromMidi, midi, freq, label, isExcluded, nearestOctave,
} from './pitch'

describe('pitch', () => {
  it('parses "E4"', () => expect(parsePitch('E4')).toEqual({ letter: 'E', accidental: '', octave: 4 }))
  it('diatonic round-trip', () => {
    const p = parsePitch('F5')
    expect(pitchFromDiatonic(diatonicIndex(p))).toEqual(p)
  })
  it('diatonic ordering', () =>
    expect(diatonicIndex(parsePitch('C5'))).toBe(diatonicIndex(parsePitch('B4')) + 1))
  it('midi: A4=69, C4=60, C#4=61, Bb3=58', () => {
    expect(midi({ letter: 'A', accidental: '', octave: 4 })).toBe(69)
    expect(midi({ letter: 'C', accidental: '', octave: 4 })).toBe(60)
    expect(midi({ letter: 'C', accidental: '#', octave: 4 })).toBe(61)
    expect(midi({ letter: 'B', accidental: 'b', octave: 3 })).toBe(58)
  })
  it('freq: A4=440', () => expect(freq({ letter: 'A', accidental: '', octave: 4 })).toBeCloseTo(440))
  it('labels', () => {
    expect(label('C', '#', 'letters')).toBe('C#')
    expect(label('C', '#', 'solfege')).toBe('Do#')
    expect(label('B', 'b', 'solfege')).toBe('Sib')
  })
  it('excludes E#, B#, Cb, Fb', () => {
    expect(isExcluded('E', '#')).toBe(true)
    expect(isExcluded('B', '#')).toBe(true)
    expect(isExcluded('C', 'b')).toBe(true)
    expect(isExcluded('F', 'b')).toBe(true)
    expect(isExcluded('F', '#')).toBe(false)
  })
})

describe('nearestOctave', () => {
  const at = (s: string) => parsePitch(s)

  it('keeps the same octave when that is nearest', () => {
    expect(nearestOctave('G', '', at('E4'))).toEqual({ letter: 'G', accidental: '', octave: 4 })
  })
  it('drops an octave when the name sits just below the reference', () => {
    // B is at the top of its octave, so against C4 the nearest B is B3.
    expect(nearestOctave('B', '', at('C4'))).toEqual({ letter: 'B', accidental: '', octave: 3 })
  })
  it('climbs an octave when the name sits just above', () => {
    // C is at the bottom of its octave, so against B4 the nearest C is C5.
    expect(nearestOctave('C', '', at('B4'))).toEqual({ letter: 'C', accidental: '', octave: 5 })
  })
  it('never lands more than a fourth away', () => {
    for (const letter of ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const) {
      for (const ref of ['C4', 'E4', 'G4', 'B4', 'F5', 'A3']) {
        const placed = nearestOctave(letter, '', at(ref))
        expect(Math.abs(diatonicIndex(placed) - diatonicIndex(at(ref)))).toBeLessThanOrEqual(3)
      }
    }
  })
})

describe('pitchFromMidi', () => {
  it('round-trips every note of two octaves in either spelling', () => {
    for (let m = 48; m < 72; m++) {
      expect(midi(pitchFromMidi(m, '#'))).toBe(m)
      expect(midi(pitchFromMidi(m, 'b'))).toBe(m)
    }
  })
  it('spells black keys the way it is asked', () => {
    expect(pitchFromMidi(61, '#')).toEqual({ letter: 'C', accidental: '#', octave: 4 })
    expect(pitchFromMidi(61, 'b')).toEqual({ letter: 'D', accidental: 'b', octave: 4 })
  })
  it('never writes E#, B#, Cb or Fb', () => {
    for (let m = 48; m < 72; m++) {
      for (const spelling of ['#', 'b'] as const) {
        const p = pitchFromMidi(m, spelling)
        expect(isExcluded(p.letter, p.accidental)).toBe(false)
      }
    }
  })
})

