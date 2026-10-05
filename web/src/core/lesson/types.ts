import type { Clef } from '@/core/music/types'

/*
 * The lesson content format. Lessons are data: typed objects of steps and
 * blocks, Vietnamese and English side by side, so every chapter looks the same
 * and the content validator (theory/validate) can check them all.
 * Writing guide with a full example: docs/theory/port-guide.md section 7.
 */

/**
 * Lesson text in both languages. Inside it:
 * - `{G4}` a note, `{G}` a pitch class, `{F#}` / `{Bb3}` with accidentals:
 *   printed in the reader's naming (Sol4 / G4). Never write a note name as a word.
 * - `**term**` bold, for a glossary term's first use.
 */
export interface Localized {
  vi: string
  en: string
}

/** One or more sentences of explanation. At most three short sentences. */
export interface TextBlock {
  type: 'text'
  text: Localized
}

/** A soft blue box with a practical hint. */
export interface TipBlock {
  type: 'tip'
  text: Localized
}

/**
 * Notes on a staff, written in the notation of `core/music/notation`
 * (`C4 E4 G4`, `C4+E4+G4:h`, `R:q`, `|` ...). Notes without a duration are
 * whole notes, the plain look for showing pitches.
 */
export interface StaffBlock {
  type: 'staff'
  /** A clef, `grand` (treble over bass, notes from middle C up on top), or `none` (bare lines). */
  clef: Clef | 'grand' | 'none'
  notes: string
  /** Key signature (`G`, `Bb`, `F#m`); accidentals then follow the key. */
  key?: string
  /** Time signature (`4/4`, `6/8`). */
  time?: string
  /**
   * Under each note or rest (bars skipped): `names` (Sol), `pitches` (Sol4),
   * or one short label each (`'1'`, `'I'`, `'{C}'`; '' for none).
   */
  labels?: 'names' | 'pitches' | string[]
  /** Notes or rests (bars skipped, from 0) drawn in blue. */
  highlight?: number[]
}

/** A "Nghe" button that plays notes: untimed notes evenly, written durations at `bpm`. */
export interface PlayBlock {
  type: 'play'
  notes: string
  /** Button text; default "Nghe" / "Listen". */
  label?: Localized
  /** Quarter notes per minute for written durations; default in config. */
  bpm?: number
}

/** A small piano keyboard with keys filled in blue. */
export interface KeysBlock {
  type: 'keys'
  /** The keys to fill, as pitches with octaves (`C4 E4`). Empty for a plain keyboard. */
  notes: string
  /** The C the keyboard starts on (`C3`); default the C at or below the lowest note. */
  from?: string
  /** Octaves drawn, 1 to 4; default enough to reach the highest note. */
  octaves?: number
  /** Name the filled keys under the keyboard: `names` (Sol) or `pitches` (Sol4). */
  labels?: 'names' | 'pitches'
  /** A short line beside the play button, or above the keyboard. */
  caption?: Localized
}

export type Block = TextBlock | TipBlock | StaffBlock | PlayBlock | KeysBlock

/** One idea: a title and up to two text blocks, shown on the staff and heard. */
export interface ExplainStep {
  kind: 'explain'
  title: Localized
  blocks: Block[]
}

/** Answered on the piano pad: the pitch class (`E`, `F#`, `Bb`). */
export interface KeyAnswer {
  type: 'key'
  note: string
  /** Names on the pad's keys. Off when the question is where a key is; the answer still shows its name. Default on. */
  labels?: boolean
}

/** Two to four choices, exactly one with `correct: true`. */
export interface ChoiceAnswer {
  type: 'choice'
  choices: { text: Localized; correct?: true }[]
}

/** A quick question. The reason shows after the answer, right or wrong. */
export interface CheckStep {
  kind: 'check'
  prompt: Localized
  /** What to look at or listen to (staff, play, keys). */
  blocks?: Block[]
  answer: KeyAnswer | ChoiceAnswer
  /** One sentence: why the answer is what it is. */
  reason: Localized
}

export type Step = ExplainStep | CheckStep

/** Where a lesson comes from in the book. */
export interface Source {
  /** Book section number, e.g. `1.2`. */
  section: string
  url: string
}

/**
 * A lesson's practice link: a registered drill's id, its level and a length
 * of 60 or 120 s, plus any option the drill lets a preset set (Đọc nốt's
 * `accidentals`). Checked against the drill registry by the content validator;
 * the app side is `app/drillPreset`.
 */
export interface PracticePreset {
  drill: string
  level: number
  durationSec: number
  [option: string]: boolean | number | string | string[] | null
}

export interface Lesson {
  /** Stable slug: part of the URL and of the saved progress key. Never rename. */
  id: string
  /** `review`: the chapter review, all checks. */
  kind?: 'lesson' | 'review'
  title: Localized
  /** About how long it takes, shown on the chapter list and the home card. */
  minutes: number
  sources: Source[]
  /** The drill that trains what the lesson taught, set up for one session. */
  practice?: PracticePreset
  /** End-screen bullets: what the lesson taught, 3 to 4. */
  recap: Localized[]
  steps: Step[]
}

export interface Chapter {
  /** Stable slug: the folder is `chNN-<id>`. Never rename. */
  id: string
  number: number
  title: Localized
  lessons: Lesson[]
}
