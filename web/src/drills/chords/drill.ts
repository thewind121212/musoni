import { StackSimpleIcon } from '@phosphor-icons/react'
import { defineDrill, type DrillSettings } from '@/app/drill'
import { CHORD_DEFAULT_DURATION_SECONDS, CHORD_LEVELS, CHORD_ROMAN_FROM } from '@/config/constants'
import { S, levelDetailKey, levelKey } from './strings'

/** Name the chord (root and quality), or its Roman numeral in the key shown. */
export type ChordsMode = 'name' | 'roman'

// A type, not an interface: it must fit `DrillOptions` (a record).
export type ChordsOptions = {
  /** The setup toggle. Levels 5-7 are the Roman numeral mode; see `sessionLevel`. */
  mode: ChordsMode
  /** Play the chord after each answer (on a miss, the reader's chord first). */
  listen: boolean
}

const LEVEL_COUNT = Object.keys(CHORD_LEVELS).length
const NAME_LEVELS = CHORD_ROMAN_FROM - 1

/**
 * The level a session runs at, from the saved or preset settings. Levels 1-4
 * name the chord and 5-7 ask the numeral; `mode` and `level` normally agree,
 * because setup writes both. When they do not (a preset written as
 * `{ level: 2, mode: 'roman' }`), a Roman level wins, and the Roman mode with
 * a naming level takes the Roman level in the same place (2 → 6).
 */
export function sessionLevel(s: Pick<DrillSettings<ChordsOptions>, 'level' | 'mode'>): number {
  const level = Math.min(Math.max(1, Math.round(s.level) || 1), LEVEL_COUNT)
  if (level >= CHORD_ROMAN_FROM || s.mode !== 'roman') return level
  return Math.min(NAME_LEVELS + level, LEVEL_COUNT)
}

/** The mode a level belongs to. */
export function modeOf(level: number): ChordsMode {
  return level >= CHORD_ROMAN_FROM ? 'roman' : 'name'
}

/** Hợp âm: name the triad on the staff, or its numeral in a key. Design: docs/fe/drill-chords.md. */
export default defineDrill<ChordsOptions>({
  id: 'chords',
  page: () => import('./pages/ChordsDrill').then(m => m.ChordsDrill),
  icon: StackSimpleIcon,
  title: S.title,
  description: S.what,
  short: S.short,
  starter: S.starter,
  group: 'read',
  order: 40,
  levels: Array.from({ length: LEVEL_COUNT }, (_, i) => ({ name: levelKey(i + 1), detail: levelDetailKey(i + 1) })),
  defaults: { level: 1, durationSec: CHORD_DEFAULT_DURATION_SECONDS, mode: 'name', listen: true },
  // A lesson may ask for the Roman numeral mode; listening stays the reader's own.
  presetOptions: ['mode'],
  unlockedBy: 'triads/triads-intro',
})
