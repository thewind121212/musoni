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
