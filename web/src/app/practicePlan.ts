import type { DrillEntry } from './drill'
import type { DrillPreset } from './drillPreset'
import type { Settings } from '@/progress/progressStore'
import { TODAY_SHORT_SECONDS, TODAY_LONG_SECONDS } from '@/config/constants'

/*
 * The one session Luyện's "Hôm nay" suggests. Pure: the page passes what it
 * read from progress. Luyện stands on its own: every listed drill is open and
 * nothing here reads lessons. Rules: docs/fe/screens.md, Luyện.
 */

/** Why Hôm nay picked this session; the page words it. */
export type TodayReason =
  /** Never played: a gentle first session at level 1. */
  | { kind: 'new' }
  /** The drill practised least recently, last played this many days ago (1 or more). */
  | { kind: 'rest'; days: number }
  /** Every drill was practised today; this one longest ago. */
  | { kind: 'again' }

export interface TodayPick {
  drill: DrillEntry
  /** Started as a preset: for this session only, the reader's setup stays. */
  preset: DrillPreset
  reason: TodayReason
}

export interface TodayInput {
  /** Listed drills, in registry order. */
  drills: readonly DrillEntry[]
  /** When each drill was last played, by id (ISO time). */
  lastPlayed: Readonly<Record<string, string>>
  settings: Pick<Settings, 'drills'>
  todayMinutes: number
  dailyGoal: number
  now: Date
}

/** Days between two local calendar days. */
function daysBetween(fromIso: string, now: Date): number {
  const day = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
  return Math.round((day(now) - day(new Date(fromIso))) / 86_400_000)
}

/** The options a preset may carry, read from the given drill settings. */
function presetOptionsFrom(drill: DrillEntry, own: Record<string, unknown>) {
  return Object.fromEntries((drill.presetOptions ?? []).map(k => [k, own[k]])) as Record<string, DrillPreset[string]>
}

/**
 * A drill's gentle first session: one short minute at level 1, its preset
 * options at their defaults: Hôm nay's pick for a drill never played.
 */
export function starterPreset(drill: DrillEntry): DrillPreset {
  return { drill: drill.id, level: 1, durationSec: TODAY_SHORT_SECONDS, ...presetOptionsFrom(drill, drill.defaults) }
}

/**
 * Hôm nay's one suggestion: the drill practised least recently (a
 * never-played one first). The length fills what is left of the
 * daily goal: two minutes when two or more are left, else one; a drill's first
 * session is always one minute, at level 1. Null with no drill listed.
 */
export function pickToday(input: TodayInput): TodayPick | null {
  const { drills, lastPlayed, settings, todayMinutes, dailyGoal, now } = input
  const fill = dailyGoal - todayMinutes >= 2 ? TODAY_LONG_SECONDS : TODAY_SHORT_SECONDS
  if (drills.length === 0) return null
  // Never played first (in registry order), then the longest ago.
  const at = (d: DrillEntry) => (d.id in lastPlayed ? Date.parse(lastPlayed[d.id]) : -Infinity)
  const drill = [...drills].sort((a, b) => at(a) - at(b))[0]
  const last = lastPlayed[drill.id]

  if (last === undefined) {
    return {
      drill,
      preset: starterPreset(drill),
      reason: { kind: 'new' },
    }
  }
  const own = drill.of(settings)
  const days = daysBetween(last, now)
  return {
    drill,
    preset: { drill: drill.id, level: own.level, durationSec: fill, ...presetOptionsFrom(drill, own) },
    reason: days >= 1 ? { kind: 'rest', days } : { kind: 'again' },
  }
}
