import { describe, it, expect } from 'vitest'
import { keyPad, majorRule, signatureNotes, tonicOf, vexKeyName, MAX_FIFTHS, type NoteName } from './signatures'

const name = (n: NoteName) => n.letter + n.accidental
const ALL = Array.from({ length: 2 * MAX_FIFTHS + 1 }, (_, i) => i - MAX_FIFTHS)
const SEMIS: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const pc = (n: NoteName) => (SEMIS[n.letter] + (n.accidental === '#' ? 1 : n.accidental === 'b' ? -1 : 0) + 12) % 12

// The standard table, written out by hand: signature → major key, relative minor, accidentals in order.
const TABLE: Record<number, [string, string, string]> = {
  [-7]: ['Cb', 'Ab', 'Bb Eb Ab Db Gb Cb Fb'],
  [-6]: ['Gb', 'Eb', 'Bb Eb Ab Db Gb Cb'],
  [-5]: ['Db', 'Bb', 'Bb Eb Ab Db Gb'],
  [-4]: ['Ab', 'F', 'Bb Eb Ab Db'],
  [-3]: ['Eb', 'C', 'Bb Eb Ab'],
  [-2]: ['Bb', 'G', 'Bb Eb'],
  [-1]: ['F', 'D', 'Bb'],
  0: ['C', 'A', ''],
  1: ['G', 'E', 'F#'],
  2: ['D', 'B', 'F# C#'],
  3: ['A', 'F#', 'F# C# G#'],
  4: ['E', 'C#', 'F# C# G# D#'],
  5: ['B', 'G#', 'F# C# G# D# A#'],
  6: ['F#', 'D#', 'F# C# G# D# A# E#'],
  7: ['C#', 'A#', 'F# C# G# D# A# E# B#'],
}

describe('key signatures', () => {
  it('names every signature\'s major key, relative minor and accidentals as the standard table does', () => {
    for (const f of ALL) {
      const [major, minor, notes] = TABLE[f]
      expect(name(tonicOf(f, 'major')), `major of ${f}`).toBe(major)
      expect(name(tonicOf(f, 'minor')), `minor of ${f}`).toBe(minor)
      expect(signatureNotes(f).map(name).join(' '), `notes of ${f}`).toBe(notes)
      expect(vexKeyName(f)).toBe(major)
    }
  })

  it('puts every relative minor a minor third (three semitones) below its major', () => {
    for (const f of ALL) {
      expect((pc(tonicOf(f, 'major')) - pc(tonicOf(f, 'minor')) + 12) % 12).toBe(3)
    }
  })

  it('never needs E#, B#, Fb or a double accidental as a tonic', () => {
    for (const f of ALL) for (const mode of ['major', 'minor'] as const) {
      expect(['E#', 'B#', 'Fb']).not.toContain(name(tonicOf(f, mode)))
    }
  })

  it('states a rule that lands on the major tonic for every signature', () => {
    for (const f of ALL) {
      const rule = majorRule(f)
      const t = tonicOf(f, 'major')
      if (rule.kind === 'none') expect(name(t)).toBe('C')
      else if (rule.kind === 'oneFlat') expect(name(t)).toBe('F')
      else if (rule.kind === 'sharps') {
        // A half step above the last sharp: the next letter, one semitone up.
        const letters = 'CDEFGAB'
        expect(t.letter).toBe(letters[(letters.indexOf(rule.last.letter) + 1) % 7])
        expect(pc(t)).toBe((pc(rule.last) + 1) % 12)
        expect(rule.count).toBe(f)
      } else {
        expect(name(rule.penultimate)).toBe(name(t))
        expect(rule.count).toBe(-f)
      }
    }
    expect(majorRule(0).kind).toBe('none')
    expect(majorRule(-1).kind).toBe('oneFlat')
    expect(majorRule(-2).kind).toBe('flats')
    expect(majorRule(1).kind).toBe('sharps')
  })
})

describe('keyPad', () => {
  it('holds the twelve keys once each, every name unique, with both tonics on it under their own names', () => {
    for (const f of ALL) for (const naming of ['letters', 'solfege'] as const) {
      const pad = keyPad(f, naming)
      expect(pad).toHaveLength(12)
      expect(new Set(pad.map(pc)).size).toBe(12)
      expect(new Set(pad.map(o => o.label)).size).toBe(12)
      for (const mode of ['major', 'minor'] as const) {
        const t = tonicOf(f, mode)
        expect(pad.filter(o => o.letter === t.letter && o.accidental === t.accidental), `${mode} of ${f}`).toHaveLength(1)
      }
    }
  })

  it('spells the black keys as flats for flat keys and as sharps otherwise', () => {
    const blacks = (f: number) => keyPad(f, 'letters').filter(o => o.row === 'accidental').map(o => o.label).join(' ')
    expect(blacks(-1)).toBe('Db Eb Gb Ab Bb')
    expect(blacks(0)).toBe('C# D# F# G# A#')
    expect(blacks(3)).toBe('C# D# F# G# A#')
  })

  it('renames a white key the signature alters: Cb and Fb in flats, E# and B# in sharps', () => {
    const whites = (f: number) => keyPad(f, 'letters').filter(o => o.row === 'natural').map(o => o.label).join(' ')
    expect(whites(5)).toBe('C D E F G A B')
    expect(whites(6)).toBe('C D E E# G A B')
    expect(whites(7)).toBe('B# D E E# G A B')
    expect(whites(-5)).toBe('C D E F G A B')
    expect(whites(-6)).toBe('C D E F G A Cb')
    expect(whites(-7)).toBe('C D Fb F G A Cb')
    // Cb major is answered on the key where B sits, named Dob in solfège.
    const cb = keyPad(-7, 'solfege').find(o => o.letter === 'C' && o.accidental === 'b')!
    expect(cb).toMatchObject({ label: 'Dob', row: 'natural', slot: 6, keyHint: 'j' })
  })

  it('shows all seven notes of the key under the names the signature gives them', () => {
    for (const f of ALL) {
      const altered = new Map(signatureNotes(f).map(n => [n.letter, n.accidental]))
      const names = keyPad(f, 'letters').map(o => o.letter + o.accidental)
      for (const letter of 'CDEFGAB') expect(names, `${letter} in ${f}`).toContain(letter + (altered.get(letter as 'C') ?? ''))
    }
  })
})
