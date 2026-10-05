import type { Settings } from '@/progress/progressStore'
import type { Translate } from '@/core/i18n/translate'
import { formatDuration } from '@/core/i18n/formatDuration'
import { EAR_LEVELS, LEVELS, PRESET_SECONDS } from '@/config/constants'

/**
 * A drill session set up from outside the drill (a theory lesson's "Practise
 * now"): which drill, its level and length, and for note reading whether
 * sharps and flats are in. Only settings the drills already have.
 */
export type DrillPreset =
  | { drill: 'note-id'; level: 1 | 2 | 3 | 4; durationSec: number; accidentals?: boolean }
  | { drill: 'hear-play'; level: 1 | 2 | 3 | 4; durationSec: number }

/** The drill's route. */
export function presetRoute(p: DrillPreset): string {
  return `/train/${p.drill}`
}

/**
 * The settings a preset session runs on: the reader's own, with the preset's
 * workout parameters laid over them. Preferences (naming, keys, sound, the
 * listening aids) stay the reader's. Nothing is saved: the drill takes these
 * for this one session, and the reader's setup is untouched.
 */
export function withPreset(settings: Settings, p: DrillPreset): Settings {
  if (p.drill === 'note-id') {
    return { ...settings, level: p.level, durationSec: p.durationSec, accidentals: p.accidentals ?? false }
  }
  return { ...settings, earLevel: p.level, earDurationSec: p.durationSec }
}

/** What is wrong with a preset, or null. Lesson data is checked against the drills' real settings. */
export function presetError(p: unknown): string | null {
  if (typeof p !== 'object' || p === null) return 'not an object'
  const o = p as Record<string, unknown>
  if (o.drill !== 'note-id' && o.drill !== 'hear-play') return `unknown drill "${String(o.drill)}"`
  const levels = o.drill === 'note-id' ? LEVELS : EAR_LEVELS
  if (!(typeof o.level === 'number' && o.level in levels)) return `unknown ${o.drill} level ${String(o.level)}`
  if (!(PRESET_SECONDS as readonly unknown[]).includes(o.durationSec)) {
    return `length ${String(o.durationSec)}s is not one of ${PRESET_SECONDS.join(', ')}`
  }
  if (o.drill === 'hear-play' && 'accidentals' in o) return 'hear-play has no accidentals setting'
  if ('accidentals' in o && typeof o.accidentals !== 'boolean') return 'accidentals must be true or false'
  const known = ['drill', 'level', 'durationSec', 'accidentals']
  const extra = Object.keys(o).find(k => !known.includes(k))
  return extra ? `unknown field "${extra}"` : null
}

/** One line naming the session: "Khóa Sol · 1 phút", with "♯ ♭" when sharps and flats are on. */
export function presetSummary(p: DrillPreset, t: Translate): string {
  const level = p.drill === 'note-id' ? t(`level.${p.level}` as 'level.1') : t(`ear.level.${p.level}` as 'ear.level.1')
  const parts = [level, formatDuration(p.durationSec, t)]
  if (p.drill === 'note-id' && p.accidentals) parts.push('♯ ♭')
  return parts.join(' · ')
}
