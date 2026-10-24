import type { Localized } from '@/theory/types'

/*
 * The chapter's example pieces, all written for these lessons, in 3/4 and
 * {C} major. Each phrase is four measures of melody; `play` adds a bass note on
 * each downbeat so the cadences and keys can be heard.
 */

interface Phrase {
  /** The melody, for a treble staff. */
  notes: string
  /** Melody with a bass note on each downbeat, for a play block. */
  play: string
}

function phrase(notes: string, bass: string[]): Phrase {
  return { notes, play: notes.split(' | ').map((bar, i) => `${bass[i]}+${bar}`).join(' | ') }
}

/** The phrases played one after another. */
export const hear = (...phrases: Phrase[]) => phrases.map(p => p.play).join(' | ')

/** Labels for a staff: `first` under the first note, `last` under the last, none between. */
export function tag(notes: string, first: string | Localized, last: string | Localized) {
  const n = notes.split(' ').filter(t => t !== '|' && t !== '||').length
  return [first, ...Array<string>(n - 2).fill(''), last]
}

/** a: the opening phrase, a half cadence on V. */
export const OPEN_HC = phrase('E4:q G4:q C5:q | B4:q A4:q G4:q | A4:q F4:q D4:q | G4:h.', ['C3', 'G2', 'D3', 'G2'])
/** The opening again, now modulating to {G} major: {F#} and a PAC in {G}. */
export const OPEN_TO_G = phrase('E4:q G4:q C5:q | B4:q A4:q G4:q | A4:q C5:q F#4:q | G4:h.', ['C3', 'E3', 'D3', 'G2'])
/** The opening once more, with a PAC in {C}. */
export const OPEN_HOME = phrase('E4:q G4:q C5:q | B4:q A4:q G4:q | F4:q D4:q B3:q | C4:h.', ['C3', 'G2', 'G2', 'C3'])
/** b: the rounded binary's contrasting phrase, the opening's rising arpeggio over a dominant pedal (V, I6/4, V7, V). */
export const PEDAL = phrase('B3:q D4:q G4:q | C4:q E4:q G4:q | D4:q F4:q B4:q | G4:h.', ['G2', 'G2', 'G2', 'G2'])

/** The ternary's B section in {A} minor: a new, slower melody, HC then PAC. */
export const MINOR_HC = phrase('E5:h C5:q | D5:h A4:q | B4:h G#4:q | E4:h.', ['A2', 'D3', 'E3', 'E3'])
export const MINOR_PAC = phrase('E5:h C5:q | D5:h A4:q | C5:q B4:q G#4:q | A4:h.', ['A2', 'D3', 'E3', 'A2'])

/** Balanced binary: A ends in {G}, B ends with the same cadence a fifth lower, in {C}. */
export const BAL_A = phrase('G4:q C5:q E5:q | D5:q C5:q B4:q | A4:q C5:q F#4:q | G4:h.', ['C3', 'G2', 'D3', 'G2'])
export const BAL_B = phrase('D5:q B4:q G4:q | A4:q F4:q D4:q | D4:q F4:q B3:q | C4:h.', ['G2', 'D3', 'G2', 'C3'])

/** "Simple" binary: both sections begin alike, the endings differ and nothing returns. */
export const SIM_A = phrase('C5:q G4:q E4:q | F4:q A4:q C5:q | B4:q A4:q F#4:q | G4:h.', ['C3', 'F2', 'D3', 'G2'])
export const SIM_B = phrase('C5:q G4:q E4:q | F4:q A4:q D5:q | G4:q B4:q D5:q | C5:h.', ['C3', 'F2', 'G2', 'C3'])
