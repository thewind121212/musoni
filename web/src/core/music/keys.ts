import type { Accidental, Pitch } from './types'
import { midi, pitchFromMidi } from './pitch'

/** A major key by its tonic, as written: 'C', 'G', 'Bb'. */
export type KeyName = 'C' | 'G' | 'D' | 'A' | 'F' | 'Bb' | 'Eb'

/** Semitones above the tonic of each degree of the major scale. */
export const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11] as const

/** Flat keys write their black keys as flats, the rest as sharps. */
export function keySpelling(key: KeyName): Exclude<Accidental, ''> {
  return key === 'F' || key.endsWith('b') ? 'b' : '#'
}

/**
 * The key's home note, placed so the octave above it stays in a comfortable
 * treble range: C, D, Eb and F sit at octave 4, G, A and Bb at octave 3, so
 * no key's notes climb past E5.
 */
export function tonicOf(key: KeyName): Pitch {
  const letter = key[0] as Pitch['letter']
  const accidental = (key[1] ?? '') as Accidental
  const octave = 'CDEF'.includes(letter) ? 4 : 3
  return { letter, accidental, octave }
}

/** The note `semitones` above the tonic, spelled the key's way. */
export function noteInKey(key: KeyName, semitones: number): Pitch {
  return pitchFromMidi(midi(tonicOf(key)) + semitones, keySpelling(key))
}

/**
 * I-IV-V-I in the key, the cadence that tells the ear where home is. Each
 * chord is a bass note an octave under and three or four voices around the
 * tonic, the voicing a piano teacher would play.
 */
export function cadence(key: KeyName): Pitch[][] {
  const chords = [
    [-12, 4, 7],
    [-7, 5, 9],
    [-5, 2, 7, 11],
    [-12, 4, 7, 12],
  ]
  return chords.map(chord => chord.map(semitones => noteInKey(key, semitones)))
}

/**
 * The walk from a degree of the scale back to the tonic, the way the ear
 * hears a note resolve: Mi Re Do from below Sol, Sol La Si Do from above.
 * Starts on the note itself. A note outside the scale goes straight home.
 */
export function walkHome(key: KeyName, semitones: number): Pitch[] {
  const degree = MAJOR_SCALE.indexOf(semitones as (typeof MAJOR_SCALE)[number])
  if (degree === -1) return [noteInKey(key, semitones), noteInKey(key, 0)]
  const steps = degree <= 3
    ? MAJOR_SCALE.slice(0, degree + 1).reverse()
    : [...MAJOR_SCALE.slice(degree), 12]
  return steps.map(s => noteInKey(key, s))
}
