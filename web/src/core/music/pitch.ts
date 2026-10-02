import type { Pitch, Letter, Accidental, Naming } from './types'

const LETTERS: Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const SEMIS: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const SOLFEGE: Record<Letter, string> = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' }

export function parsePitch(s: string): Pitch {
  return { letter: s[0] as Letter, accidental: '', octave: Number(s.slice(1)) }
}
export function diatonicIndex(p: Pitch): number {
  return p.octave * 7 + LETTERS.indexOf(p.letter)
}
export function pitchFromDiatonic(i: number): Pitch {
  return { letter: LETTERS[i % 7], accidental: '', octave: Math.floor(i / 7) }
}
export function midi(p: Pitch): number {
  const acc = p.accidental === '#' ? 1 : p.accidental === 'b' ? -1 : 0
  return (p.octave + 1) * 12 + SEMIS[p.letter] + acc
}
export function freq(p: Pitch): number {
  return 440 * Math.pow(2, (midi(p) - 69) / 12)
}
export function label(letter: Letter, accidental: Accidental, naming: Naming): string {
  return (naming === 'solfege' ? SOLFEGE[letter] : letter) + accidental
}
export function isExcluded(letter: Letter, accidental: Accidental): boolean {
  return (accidental === '#' && (letter === 'E' || letter === 'B')) ||
         (accidental === 'b' && (letter === 'C' || letter === 'F'))
}

/**
 * Places a note name at the octave nearest a reference note.
 *
 * Answer keys carry a name but no octave, so showing a wrong choice on the
 * staff needs one. The nearest octave is the one the reader meant: picking
 * "Mi" against a printed Mi in the next octave is a different mistake from
 * reading the line wrong, and drawing it far away would misrepresent it.
 */
export function nearestOctave(letter: Letter, accidental: Accidental, target: Pitch): Pitch {
  const targetIndex = diatonicIndex(target)
  let best = { letter, accidental, octave: target.octave }
  let bestDistance = Infinity
  for (const octave of [target.octave - 1, target.octave, target.octave + 1]) {
    const distance = Math.abs(diatonicIndex({ letter, accidental, octave }) - targetIndex)
    if (distance < bestDistance) {
      bestDistance = distance
      best = { letter, accidental, octave }
    }
  }
  return best
}

const SHARP_NAMES: [Letter, Accidental][] = [
  ['C', ''], ['C', '#'], ['D', ''], ['D', '#'], ['E', ''], ['F', ''],
  ['F', '#'], ['G', ''], ['G', '#'], ['A', ''], ['A', '#'], ['B', ''],
]
const FLAT_NAMES: [Letter, Accidental][] = [
  ['C', ''], ['D', 'b'], ['D', ''], ['E', 'b'], ['E', ''], ['F', ''],
  ['G', 'b'], ['G', ''], ['A', 'b'], ['A', ''], ['B', 'b'], ['B', ''],
]

/**
 * The note at a MIDI number, black keys spelled as sharps or as flats. It never
 * writes E#, B#, Cb or Fb, which spells every major key correctly except the
 * two that need them (F# and Gb).
 */
export function pitchFromMidi(m: number, spelling: Exclude<Accidental, ''>): Pitch {
  const [letter, accidental] = (spelling === '#' ? SHARP_NAMES : FLAT_NAMES)[((m % 12) + 12) % 12]
  return { letter, accidental, octave: Math.floor(m / 12) - 1 }
}
