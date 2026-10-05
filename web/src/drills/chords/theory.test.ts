import { describe, expect, it } from 'vitest'
import { midi } from '@/core/music/pitch'
import { diatonicStep } from '@/core/music/notation'
import {
  NUMERALS, QUALITIES, ROOTS, TOP_STEP, chordSymbol, diatonicTriad, keyAccidentals, keySignatureSpec, nameOf,
  parseKey, pitchClass, qualityOf, spellAbove, symbolName, triadTones, voice, type NoteName, type Quality,
} from './theory'

const text = (n: NoteName) => n.letter + n.accidental
const spelled = (root: string, q: Quality) => triadTones(nameOf(root), q)?.map(text).join(' ') ?? null
const LETTERS = 'CDEFGAB'

describe('triad spelling', () => {
  it('spells triads by letter, the way theory writes them', () => {
    expect(spelled('A', 'minor')).toBe('A C E')
    expect(spelled('D', 'major')).toBe('D F# A')
    expect(spelled('C#', 'major')).toBe('C# E# G#')
    expect(spelled('Ab', 'minor')).toBe('Ab Cb Eb')
    expect(spelled('B', 'dim')).toBe('B D F')
    expect(spelled('F', 'dim')).toBe('F Ab Cb')
    expect(spelled('C', 'aug')).toBe('C E G#')
    expect(spelled('E', 'aug')).toBe('E G# B#')
    expect(spelled('Bb', 'minor')).toBe('Bb Db F')
  })

  it('refuses triads that would need a double sharp or flat', () => {
    for (const [root, q] of [
      ['D#', 'major'], ['A#', 'major'], ['Gb', 'minor'], ['Db', 'dim'], ['Eb', 'dim'], ['Gb', 'dim'],
      ['Ab', 'dim'], ['C#', 'aug'], ['D#', 'aug'], ['F#', 'aug'], ['G#', 'aug'], ['A#', 'aug'], ['B', 'aug'],
    ] as const) expect(spelled(root, q)).toBeNull()
  })

  it('every spellable triad on every root is a stack of thirds of its quality', () => {
    let count = 0
    for (const root of ROOTS) {
      for (const q of QUALITIES) {
        const tones = triadTones(root, q)
        if (!tones) continue
        count++
        expect(qualityOf(tones)).toBe(q)
        // Skip-letter spelling: root, third, fifth on every other letter.
        const at = tones.map(t => LETTERS.indexOf(t.letter))
        expect((at[1] - at[0] + 7) % 7).toBe(2)
        expect((at[2] - at[0] + 7) % 7).toBe(4)
      }
    }
    // 17 roots × 4 qualities, less the 13 that need a double accidental.
    expect(count).toBe(17 * 4 - 13)
  })

  it('never offers a root the answer pad cannot show', () => {
    for (const r of ROOTS) expect(['E#', 'B#', 'Cb', 'Fb']).not.toContain(text(r))
    expect(new Set(ROOTS.map(pitchClass)).size).toBe(12)
  })

  it('spells a note above another, or says it needs a double accidental', () => {
    expect(spellAbove(nameOf('E'), 2, 4)).toEqual(nameOf('G#'))
    expect(spellAbove(nameOf('D#'), 2, 4)).toBeNull()
  })
})

describe('voicing', () => {
  it('keeps every chord in close position, ascending, under the top line and above B3', () => {
    for (const root of ROOTS) {
      for (const q of QUALITIES) {
        const tones = triadTones(root, q)
        if (!tones) continue
        for (const inversion of [0, 1, 2] as const) {
          const notes = voice(tones, inversion)
          expect(text(notes[0])).toBe(text(tones[inversion]))
          const steps = notes.map(diatonicStep)
          expect(Math.max(...steps)).toBeLessThanOrEqual(TOP_STEP)
          expect(Math.min(...steps)).toBeGreaterThanOrEqual(diatonicStep({ letter: 'B', octave: 3 }))
          const midis = notes.map(midi)
          expect(midis[1]).toBeGreaterThan(midis[0])
          expect(midis[2]).toBeGreaterThan(midis[1])
          // Close position: inside an octave.
          expect(midis[2] - midis[0]).toBeLessThan(12)
        }
      }
    }
  })

  it('puts a root-position chord on its own octave-4 root, and drops a B inversion an octave', () => {
    expect(voice(triadTones(nameOf('C'), 'major')!, 0).map(p => text(p) + p.octave)).toEqual(['C4', 'E4', 'G4'])
    expect(voice(triadTones(nameOf('A'), 'minor')!, 1).map(p => text(p) + p.octave)).toEqual(['C4', 'E4', 'A4'])
    expect(voice(triadTones(nameOf('G'), 'major')!, 1).map(p => text(p) + p.octave)).toEqual(['B3', 'D4', 'G4'])
    // Cb sits on the C4 line and sounds as B3.
    const cb = voice(triadTones(nameOf('Ab'), 'minor')!, 1)
    expect(text(cb[0]) + cb[0].octave).toBe('Cb4')
    expect(midi(cb[0])).toBe(59)
  })
})

describe('symbols', () => {
  it('writes lead-sheet symbols, with a slash for an inversion', () => {
    expect(chordSymbol(nameOf('A'), 'minor', nameOf('C'))).toBe('Am/C')
    expect(chordSymbol(nameOf('F#'), 'minor')).toBe('F♯m')
    expect(chordSymbol(nameOf('B'), 'dim')).toBe('B°')
    expect(chordSymbol(nameOf('C'), 'aug')).toBe('C+')
    expect(chordSymbol(nameOf('Eb'), 'major', nameOf('Bb'))).toBe('E♭/B♭')
    expect(chordSymbol(nameOf('G'), 'major', nameOf('G'))).toBe('G')
    expect(symbolName(nameOf('Db'))).toBe('D♭')
  })
})

describe('keys and numerals', () => {
  const MAJOR: Quality[] = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim']
  const MINOR: Quality[] = ['minor', 'dim', 'major', 'minor', 'major', 'major', 'dim']
  const KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb',
    'a', 'e', 'b', 'f#', 'c#', 'd', 'g', 'c', 'f', 'bb']

  it('reads keys as capital major, small minor', () => {
    expect(parseKey('Bb')).toEqual({ tonic: nameOf('Bb'), mode: 'major' })
    expect(parseKey('f#')).toEqual({ tonic: nameOf('F#'), mode: 'minor' })
  })

  it('builds each degree\'s triad with the quality its numeral says', () => {
    for (const k of KEYS) {
      const key = parseKey(k)
      const want = key.mode === 'major' ? MAJOR : MINOR
      for (let d = 0; d < 7; d++) {
        const tones = diatonicTriad(key, d)
        expect(qualityOf(tones), `${k} ${NUMERALS[key.mode][d]}`).toBe(want[d])
      }
    }
  })

  it('raises the seventh degree in minor for V and vii° only', () => {
    const a = parseKey('a')
    expect(diatonicTriad(a, 4).map(text)).toEqual(['E', 'G#', 'B'])
    expect(diatonicTriad(a, 6).map(text)).toEqual(['G#', 'B', 'D'])
    expect(diatonicTriad(a, 2).map(text)).toEqual(['C', 'E', 'G'])
    expect(diatonicTriad(parseKey('f#'), 4).map(text)).toEqual(['C#', 'E#', 'G#'])
    // G# minor's leading tone is F double sharp: not a key the drill can ask.
    expect(() => diatonicTriad(parseKey('g#'), 4)).toThrow()
  })

  it('counts the key signature', () => {
    const count = (k: string) => keyAccidentals(parseKey(k))
    expect([count('C'), count('G'), count('E'), count('F'), count('Ab')]).toEqual([0, 1, 4, -1, -4])
    expect([count('a'), count('f#'), count('c#'), count('c'), count('f')]).toEqual([0, 3, 4, -3, -4])
  })

  it('names the key signature the way the staff renderer reads it', () => {
    expect(keySignatureSpec(parseKey('Bb'))).toBe('Bb')
    expect(keySignatureSpec(parseKey('f#'))).toBe('F#m')
  })
})
