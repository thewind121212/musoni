import type { Naming, Pitch } from '@/core/music/types'
import {
  midiOf, parseNotation, parsePitchName, toSounds, type NotePitch, type Sound, type StaffEvent,
} from '@/core/music/notation'
import { buildOptions, type NoteOption } from '@/core/music/pianoKeys'
import { optionIndexFromKey, type KeyPress } from '@/core/music/keyboard'
import { THEORY_PLAY, THEORY_STAFF_WIDTH } from '@/config/constants'
import { pitchLabel, plainText } from './text'
import type { Block, CheckStep, KeyAnswer, KeysBlock, PlayBlock, StaffBlock } from './types'

/** A note's name in the reader's naming: a chord's names joined, octave optional. */
function nameOf(pitches: NotePitch[], naming: Naming, octave: boolean): string {
  return pitches.map(p => pitchLabel({ ...p, octave: octave ? p.octave : null }, naming)).join(' ')
}

/** One label per note or rest (bars skipped), in the reader's naming; undefined for none. */
export function staffLabels(block: StaffBlock, events: readonly StaffEvent[], naming: Naming): (string | null)[] | undefined {
  if (!block.labels) return undefined
  const sounding = events.filter(e => e.kind !== 'bar')
  if (Array.isArray(block.labels)) return block.labels.map(l => (l ? plainText(l, naming) : null))
  const octave = block.labels === 'pitches'
  return sounding.map(e => (e.kind === 'note' ? nameOf(e.pitches, naming, octave) : null))
}

/** Notation width: room per note, so one note draws large and a long row still fits. */
export function staffWidth(block: StaffBlock, events: readonly StaffEvent[]): number {
  const W = THEORY_STAFF_WIDTH
  const notes = events.filter(e => e.kind !== 'bar').length + events.filter(e => e.kind === 'bar').length / 2
  const extra = (block.clef === 'grand' ? W.grand : 0) + (block.key ? 30 : 0) + (block.time ? 20 : 0)
  return Math.round(Math.min(W.max, Math.max(W.min, W.base + W.perNote * notes + extra)))
}

/** The keyboard a keys block draws: its first C (MIDI), how many octaves, and the keys to fill. */
export function keysLayout(block: KeysBlock): { from: number; octaves: number; lit: number[]; pitches: NotePitch[] } {
  const pitches = parseNotation(block.notes).flatMap(e => (e.kind === 'note' ? e.pitches : []))
  const midis = pitches.map(midiOf)
  let from = midis.length ? Math.floor(Math.min(...midis) / 12) * 12 : 60
  if (block.from) {
    const p = parsePitchName(block.from)
    if (p?.octave != null) from = midiOf({ ...p, octave: p.octave })
  }
  const octaves = block.octaves ?? Math.max(1, Math.ceil((Math.max(from, ...midis) - from + 1) / 12))
  return { from, octaves, lit: midis.map(m => m - from), pitches }
}

/** Key labels for a keys block, by key position. */
export function keyLabels(block: KeysBlock, naming: Naming): Record<number, string> | undefined {
  if (!block.labels) return undefined
  const { from, pitches } = keysLayout(block)
  return Object.fromEntries(pitches.map(p => [midiOf(p) - from, nameOf([p], naming, block.labels === 'pitches')]))
}

/** What a play block sounds, timed. */
export function playSounds(block: PlayBlock): Sound[] {
  return toSounds(parseNotation(block.notes), { ...THEORY_PLAY, bpm: block.bpm ?? THEORY_PLAY.bpm })
}

/**
 * The note a check is about, when its blocks show exactly one staff with one
 * single note: a wrong pick on the pad can then be drawn beside it.
 */
export function loneStaffNote(blocks: readonly Block[] | undefined): Pitch | null {
  const staffs = (blocks ?? []).filter((b): b is StaffBlock => b.type === 'staff')
  if (staffs.length !== 1 || staffs[0].clef === 'grand') return null
  const notes = parseNotation(staffs[0].notes).filter(e => e.kind !== 'bar')
  const [only] = notes
  if (notes.length !== 1 || only.kind !== 'note' || only.pitches.length !== 1) return null
  const p = only.pitches[0]
  if (Math.abs(p.alter) > 1) return null
  return { letter: p.letter, accidental: p.alter === 1 ? '#' : p.alter === -1 ? 'b' : '', octave: p.octave }
}

/** The pad for a key check: naturals, plus black keys spelled like the answer when it has one. */
export function padFor(answer: KeyAnswer, naming: Naming): { options: NoteOption[]; correctIndex: number } {
  const p = parsePitchName(answer.note)!
  const accidental = p.alter === 1 ? '#' : p.alter === -1 ? 'b' : ''
  const options = buildOptions(naming, accidental !== '', accidental === 'b' ? 'b' : '#')
  return { options, correctIndex: options.findIndex(o => o.letter === p.letter && o.accidental === accidental) }
}

/**
 * A check answered from the computer keyboard: the piano keys (A S D F...)
 * for a key answer, 1 to 4 for a choice. Null when the key answers nothing.
 */
export function answerFromKey(check: CheckStep, press: KeyPress, naming: Naming): { choice: number; correct: boolean } | null {
  if (check.answer.type === 'key') {
    const pad = padFor(check.answer, naming)
    const i = optionIndexFromKey(press, pad.options)
    return i === null ? null : { choice: i, correct: i === pad.correctIndex }
  }
  if (press.ctrlKey || press.metaKey || press.altKey) return null
  const i = Number(press.key) - 1
  const choices = check.answer.choices
  return Number.isInteger(i) && i >= 0 && i < choices.length ? { choice: i, correct: choices[i].correct === true } : null
}
