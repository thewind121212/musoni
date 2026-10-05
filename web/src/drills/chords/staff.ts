import type { Pitch } from '@/core/music/types'
import type { StaffEvent } from '@/core/music/notation'

const ALTER = { '': 0, '#': 1, b: -1 } as const

/** A block chord as one whole-note event for the core NoteStaff. */
export function chordEvents(notes: readonly Pitch[]): StaffEvent[] {
  return [{
    kind: 'note',
    pitches: notes.map(p => ({ letter: p.letter, alter: ALTER[p.accidental], natural: false, octave: p.octave })),
    duration: 'w',
    dots: 0,
    timed: false,
    tie: false,
  }]
}
