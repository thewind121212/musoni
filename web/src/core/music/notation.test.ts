import { describe, it, expect } from 'vitest'
import { midiOf, notationError, parseNotation, parsePitchName, quarters, toSounds, type NoteEvent } from './notation'

const timing = { bpm: 60, stepSec: 0.5, holdSec: 1 }

describe('parsePitchName', () => {
  it('reads letters, every accidental and an optional octave', () => {
    expect(parsePitchName('G')).toEqual({ letter: 'G', alter: 0, natural: false, octave: null })
    expect(parsePitchName('F#4')).toMatchObject({ alter: 1, octave: 4 })
    expect(parsePitchName('Bbb2')).toMatchObject({ alter: -2, octave: 2 })
    expect(parsePitchName('Fn5')).toMatchObject({ alter: 0, natural: true })
  })

  it('rejects anything else', () => {
    for (const bad of ['H', 'g4', 'C#b', 'C10', '', 'Do']) expect(parsePitchName(bad)).toBeNull()
  })
})

describe('parseNotation', () => {
  it('defaults to whole notes and marks them untimed', () => {
    const [e] = parseNotation('E4') as NoteEvent[]
    expect(e).toMatchObject({ kind: 'note', duration: 'w', dots: 0, timed: false, tie: false })
  })

  it('reads chords, durations, dots, ties, rests, bars and staff marks', () => {
    const events = parseNotation('C4+E4+G4:h. R:q | D4:8~ D4:8 || C4@b')
    expect(events.map(e => e.kind)).toEqual(['note', 'rest', 'bar', 'note', 'note', 'bar', 'note'])
    expect((events[0] as NoteEvent).pitches.map(p => p.letter)).toEqual(['C', 'E', 'G'])
    expect(events[0]).toMatchObject({ duration: 'h', dots: 1, timed: true })
    expect(events[3]).toMatchObject({ tie: true })
    expect(events[5]).toEqual({ kind: 'bar', double: true })
    expect(events[6]).toMatchObject({ staff: 'bottom' })
  })

  it('groups a tuplet and checks its size', () => {
    const events = parseNotation('3( C4:8 D4:8 E4:8 ) F4:q')
    expect(events.slice(0, 3).every(e => e.kind === 'note' && e.tuplet?.count === 3)).toBe(true)
    expect(events[3]).not.toHaveProperty('tuplet')
    expect(notationError('3( C4:8 D4:8 )')).toMatch(/holds 2/)
    expect(notationError('3( C4:8 D4:8 E4:8')).toMatch(/not closed/)
  })

  it('names the bad token', () => {
    expect(notationError('C4 X4')).toMatch(/X4/)
    expect(notationError('C4:x')).toMatch(/duration/)
    expect(notationError('C')).toMatch(/octave/)
    expect(notationError('R~')).toMatch(/rest/)
    expect(notationError('C4 E4')).toBeNull()
  })
})

describe('durations and pitch numbers', () => {
  it('measures dots and tuplets in quarter notes', () => {
    const [half, dotted, trip] = parseNotation('C4:h C4:q.. 3( C4:8 C4:8 C4:8 )') as NoteEvent[]
    expect(quarters(half)).toBe(2)
    expect(quarters(dotted)).toBe(1.75)
    expect(quarters(trip)).toBeCloseTo(1 / 3)
  })

  it('numbers pitches as MIDI, accidentals included', () => {
    expect(midiOf({ letter: 'C', alter: 0, octave: 4 })).toBe(60)
    expect(midiOf({ letter: 'B', alter: 1, octave: 3 })).toBe(60)
    expect(midiOf({ letter: 'D', alter: -2, octave: 4 })).toBe(60)
  })
})

describe('toSounds', () => {
  it('spaces untimed notes evenly and strikes chords together', () => {
    const sounds = toSounds(parseNotation('C4 E4+G4'), timing)
    expect(sounds.map(s => s.at)).toEqual([0, 0.5])
    expect(sounds[1].pitches).toHaveLength(2)
    expect(sounds[0].hold).toBe(1)
  })

  it('times written durations by tempo, lets rests pass time and ties lengthen a note', () => {
    const sounds = toSounds(parseNotation('C4:q R:q D4:h~ D4:q E4:8'), timing)
    expect(sounds.map(s => s.at)).toEqual([0, 2, 5])
    expect(sounds[1].hold).toBeCloseTo(2 * 0.95 + 1)
  })

  it('respells double accidentals for playback', () => {
    const [s] = toSounds(parseNotation('C##4'), timing)
    expect(s.pitches[0]).toEqual({ letter: 'D', accidental: '', octave: 4 })
  })
})
