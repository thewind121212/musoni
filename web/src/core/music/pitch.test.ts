import { describe, it, expect } from 'vitest'
import { parsePitch, diatonicIndex, pitchFromDiatonic, midi, freq, label, isExcluded } from './pitch'

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
