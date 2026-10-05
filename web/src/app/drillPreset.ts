import type { DrillSettingValue, Settings } from '@/progress/progressStore'
import type { Translate } from '@/core/i18n/translate'
import { formatDuration } from '@/core/i18n/formatDuration'
import { PRESET_SECONDS } from '@/config/constants'
import { findDrill } from './drills'
import type { DrillEntry } from './drill'

/**
 * A drill session set up from outside the drill (a theory lesson's "Luyện
 * ngay", Luyện's "Hôm nay", the first-open question): which drill, its level
 * and length, and any of the options its registry entry lets a preset set
 * (`presetOptions`, e.g. Đọc nốt's `accidentals`).
 */
export interface DrillPreset {
  drill: string
  level: number
  durationSec: number
  [option: string]: DrillSettingValue
}

/** The drill's route. */
export function presetRoute(p: DrillPreset): string {
  return findDrill(p.drill)?.route ?? `/train/${p.drill}`
}

/** The preset's own options: each option the drill lets a preset set, from the preset or else its default. */
function presetOptions(entry: DrillEntry, p: DrillPreset) {
  return Object.fromEntries((entry.presetOptions ?? []).map(k => [k, p[k] ?? entry.defaults[k]]))
}

/**
 * The settings a preset session runs on: the reader's own, with the preset's
 * level, length and options laid over that drill's. Preferences (naming, keys,
 * sound) and options a preset may not set (Nghe & Đàn's listening aids) stay
 * the reader's. Nothing is saved: the drill takes these for this one session,
 * and the reader's setup is untouched.
 */
export function withPreset(settings: Settings, p: DrillPreset): Settings {
  const entry = findDrill(p.drill)
  if (!entry) return settings
  const own = { ...entry.of(settings), level: p.level, durationSec: p.durationSec, ...presetOptions(entry, p) }
  return { ...settings, drills: { ...settings.drills, [p.drill]: own } }
}

/** What is wrong with a preset, or null. Lesson data is checked against the drills' real settings. */
export function presetError(p: unknown): string | null {
  if (typeof p !== 'object' || p === null) return 'not an object'
  const o = p as Record<string, unknown>
  const entry = typeof o.drill === 'string' ? findDrill(o.drill) : undefined
  if (!entry) return `unknown drill "${String(o.drill)}"`
  if (!(Number.isInteger(o.level) && (o.level as number) >= 1 && (o.level as number) <= entry.levels.length)) {
    return `unknown ${entry.id} level ${String(o.level)}`
  }
  if (!(PRESET_SECONDS as readonly unknown[]).includes(o.durationSec)) {
    return `length ${String(o.durationSec)}s is not one of ${PRESET_SECONDS.join(', ')}`
  }
  const options: readonly string[] = entry.presetOptions ?? []
  for (const [k, v] of Object.entries(o)) {
    if (k === 'drill' || k === 'level' || k === 'durationSec') continue
    if (!options.includes(k)) {
      return k in entry.defaults ? `a preset cannot set ${entry.id}'s ${k}` : `unknown field "${k}"`
    }
    const want = typeof entry.defaults[k]
    if (typeof v !== want) return `${k} must be a ${want}`
  }
  return null
}

/** One line naming the session: "Khóa Sol · 1 phút", with the drill's tags ("♯ ♭") when it has any. */
export function presetSummary(p: DrillPreset, t: Translate): string {
  const entry = findDrill(p.drill)
  if (!entry) return formatDuration(p.durationSec, t)
  const s = { ...entry.defaults, level: p.level, durationSec: p.durationSec, ...presetOptions(entry, p) }
  return sessionSummary(entry, s, t)
}

/** "Khóa Sol · 1 phút · ♯ ♭": a drill's level name, length and tags. */
export function sessionSummary(entry: DrillEntry, s: { level: number; durationSec: number } & Record<string, DrillSettingValue>, t: Translate): string {
  const level = entry.levels[s.level - 1]
  return [
    ...(level && entry.levels.length > 1 ? [t(level.name)] : []),
    formatDuration(s.durationSec, t),
    ...(entry.tags?.(s, t) ?? []),
  ].join(' · ')
}
