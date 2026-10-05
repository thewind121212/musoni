import type { Letter, Pitch } from './types'
import { pitchFromMidi } from './pitch'

/**
 * A small text notation for writing music into data (theory lessons): one
 * token per event, separated by spaces.
 *
 *   C4            a note (whole note unless a duration is given)
 *   F#4  Bb3  Fn4 C##4  Ebb4   accidentals: # b ## bb, n = a printed natural
 *   C4+E4+G4      a chord
 *   C4:q  D4:8.   a duration (w h q 8 16 32), each `.` a dot
 *   R:q           a rest
 *   C4:h~ C4:q    `~` ties a note to the next one
 *   |  ||         a bar line, a double bar line
 *   3( C4:8 D4:8 E4:8 )   a tuplet: N notes in the time of the usual number
 *   C4@b  C4@t    on a grand staff, force the bottom or top staff
 *
 * The parser is pure and strict: anything it does not understand is an error
 * naming the token, so a typo in lesson data fails a test, not a page.
 */

export type Duration = 'w' | 'h' | 'q' | '8' | '16' | '32'
const DURATIONS: readonly Duration[] = ['w', 'h', 'q', '8', '16', '32']
/** Length of each duration in quarter notes. */
const QUARTERS: Record<Duration, number> = { w: 4, h: 2, q: 1, '8': 0.5, '16': 0.25, '32': 0.125 }

/** A written pitch: letter, alteration in semitones, octave. `natural` is a printed natural sign. */
export interface NotePitch {
  letter: Letter
  alter: -2 | -1 | 0 | 1 | 2
  natural: boolean
  octave: number
}

/** A pitch class as written in text, with or without an octave (`{G}`, `{F#4}`). */
export interface PitchName {
  letter: Letter
  alter: -2 | -1 | 0 | 1 | 2
  natural: boolean
  octave: number | null
}

export interface Tuplet {
  /** Which tuplet on the staff this event belongs to (0, 1, ...). */
  group: number
  /** Notes in the group (3 for a triplet). */
  count: number
}

interface Timed {
  duration: Duration
  dots: number
  /** The duration was written, not defaulted. Playback times written durations by tempo. */
  timed: boolean
  tuplet?: Tuplet
  /** Grand staff only: the staff this event was forced onto. */
  staff?: 'top' | 'bottom'
}
export interface NoteEvent extends Timed { kind: 'note'; pitches: NotePitch[]; tie: boolean }
export interface RestEvent extends Timed { kind: 'rest' }
export interface BarEvent { kind: 'bar'; double: boolean }
export type StaffEvent = NoteEvent | RestEvent | BarEvent

export class NotationError extends Error {}

const LETTERS = 'CDEFGAB'
const SEMIS: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const ALTER: Record<string, NotePitch['alter']> = { '': 0, '#': 1, '##': 2, b: -1, bb: -2, n: 0 }
const PITCH = /^([A-G])(##|#|bb|b|n)?(\d)?$/
/** How many usual notes a tuplet of N replaces: a triplet takes the time of two, a duplet of three. */
export const TUPLET_OCCUPIES: Record<number, number> = { 2: 3, 3: 2, 4: 3, 5: 4, 6: 4, 7: 4 }

/** Parses a pitch name, octave optional (`G`, `F#`, `Bb3`). Null when it is not one. */
export function parsePitchName(text: string): PitchName | null {
  const m = PITCH.exec(text)
  if (!m) return null
  const [, letter, acc = '', octave] = m
  return { letter: letter as Letter, alter: ALTER[acc], natural: acc === 'n', octave: octave === undefined ? null : Number(octave) }
}

function parseNotePitch(text: string, token: string): NotePitch {
  const p = parsePitchName(text)
  if (!p) throw new NotationError(`not a pitch: "${text}" in "${token}"`)
  if (p.octave === null) throw new NotationError(`pitch needs an octave: "${text}" in "${token}"`)
  return { ...p, octave: p.octave }
}

function parseDuration(text: string | undefined, fallback: Duration, token: string) {
  if (text === undefined) return { duration: fallback, dots: 0, timed: false }
  const m = /^(w|h|q|8|16|32)(\.*)$/.exec(text)
  if (!m) throw new NotationError(`not a duration: "${text}" in "${token}" (use w h q 8 16 32, dots after)`)
  return { duration: m[1] as Duration, dots: m[2].length, timed: true }
}

/**
 * Parses a line of notation into events. `fallback` is the duration of a note
 * written without one: whole notes, the plain look for showing pitches.
 */
export function parseNotation(src: string, fallback: Duration = 'w'): StaffEvent[] {
  const events: StaffEvent[] = []
  let tuplet: Tuplet | null = null
  let groups = 0
  for (const token of src.trim().split(/\s+/).filter(Boolean)) {
    if (token === '|' || token === '||') {
      if (tuplet) throw new NotationError(`bar line inside a tuplet: "${token}"`)
      events.push({ kind: 'bar', double: token === '||' })
      continue
    }
    const open = /^(\d)\($/.exec(token)
    if (open) {
      const count = Number(open[1])
      if (tuplet) throw new NotationError(`tuplet inside a tuplet: "${token}"`)
      if (!(count in TUPLET_OCCUPIES)) throw new NotationError(`unsupported tuplet: "${token}" (2 to 7)`)
      tuplet = { group: groups++, count }
      continue
    }
    if (token === ')') {
      if (!tuplet) throw new NotationError('")" closes no tuplet')
      const inGroup = events.filter(e => e.kind !== 'bar' && e.tuplet?.group === tuplet!.group).length
      if (inGroup !== tuplet.count) {
        throw new NotationError(`a ${tuplet.count}-tuplet holds ${inGroup} notes`)
      }
      tuplet = null
      continue
    }

    const m = /^([^:~@]+)(?::([^~@]+))?(~)?(?:@([tb]))?$/.exec(token)
    if (!m) throw new NotationError(`cannot read "${token}"`)
    const [, body, dur, tie, staffMark] = m
    const timing = {
      ...parseDuration(dur, fallback, token),
      ...(tuplet ? { tuplet } : {}),
      ...(staffMark ? { staff: staffMark === 't' ? 'top' as const : 'bottom' as const } : {}),
    }
    if (body === 'R') {
      if (tie) throw new NotationError(`a rest cannot be tied: "${token}"`)
      events.push({ kind: 'rest', ...timing })
      continue
    }
    const pitches = body.split('+').map(p => parseNotePitch(p, token))
    events.push({ kind: 'note', pitches, tie: tie === '~', ...timing })
  }
  if (tuplet) throw new NotationError(`tuplet "${tuplet.count}(" is not closed`)
  return events
}

/** Throws nothing: the error message, or null when the line parses. */
export function notationError(src: string): string | null {
  try {
    parseNotation(src)
    return null
  } catch (e) {
    return e instanceof Error ? e.message : String(e)
  }
}

/** MIDI number of a written pitch (C4 = 60). */
export function midiOf(p: { letter: Letter; alter: number; octave: number }): number {
  return (p.octave + 1) * 12 + SEMIS[p.letter] + p.alter
}

/** The sounding pitch, respelled with at most one sharp or flat, for playback. */
export function soundingPitch(p: NotePitch): Pitch {
  return pitchFromMidi(midiOf(p), p.alter < 0 ? 'b' : '#')
}

/** Diatonic step number (C0 = 0, one per letter), for comparing heights on a staff. */
export function diatonicStep(p: { letter: Letter; octave: number }): number {
  return p.octave * 7 + LETTERS.indexOf(p.letter)
}

/** Length of an event in quarter notes, dots and tuplet included. */
export function quarters(e: Timed): number {
  let length = QUARTERS[e.duration]
  let add = length / 2
  for (let i = 0; i < e.dots; i++) {
    length += add
    add /= 2
  }
  if (e.tuplet) length *= TUPLET_OCCUPIES[e.tuplet.count] / e.tuplet.count
  return length
}

export function isDuration(x: string): x is Duration {
  return (DURATIONS as readonly string[]).includes(x)
}

/** A note or chord to sound `at` seconds from the start, ringing `hold` seconds. */
export interface Sound {
  pitches: Pitch[]
  at: number
  hold: number
}

export interface PlayTiming {
  /** Quarter notes per minute, for written durations. */
  bpm: number
  /** Spacing of notes written without a duration (pitch examples). */
  stepSec: number
  /** How long such a note rings. */
  holdSec: number
}

/**
 * Turns notation into timed sounds. Written durations follow the tempo; notes
 * without one (a row of pitches) are spaced evenly. A tie lengthens the first
 * note instead of striking the second. Bars take no time; rests do.
 */
export function toSounds(events: readonly StaffEvent[], timing: PlayTiming): Sound[] {
  const out: Sound[] = []
  let t = 0
  let tied: Sound | null = null
  for (const e of events) {
    if (e.kind === 'bar') continue
    const length = e.timed ? quarters(e) * (60 / timing.bpm) : timing.stepSec
    if (e.kind === 'note') {
      const hold = e.timed ? length * 0.95 : timing.holdSec
      if (tied) tied.hold += length
      else out.push({ pitches: e.pitches.map(soundingPitch), at: t, hold })
      tied = e.tie ? (tied ?? out[out.length - 1]) : null
    } else {
      tied = null
    }
    t += length
  }
  return out
}
