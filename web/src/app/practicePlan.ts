import type { DrillEntry } from './drill'
import type { DrillPreset } from './drillPreset'
import type { Settings } from '@/progress/progressStore'
import { TODAY_SHORT_SECONDS, TODAY_LONG_SECONDS } from '@/config/constants'

/*
 * What Luyện shows: which drills are open, which just opened, and the one
 * session "Hôm nay" suggests. Pure: the page passes what it read from
 * progress. Rules: docs/fe/screens.md, Luyện.
 */

/** What the plan reads from progress. */
export interface PracticeHistory {
  /** Finished lessons by key (`chapter/lesson`). */
  done: Readonly<Record<string, unknown>>
  /** When each drill was last played, by id (ISO time). */
  lastPlayed: Readonly<Record<string, string>>
}

/**
 * A drill is open when it has no unlock lesson, its lesson is finished, or
 * the reader has played it anyway (from "Xem tất cả" or a lesson's link).
 * A lesson that does not exist yet is never finished, so it keeps the drill
 * closed until then.
 */
export function isUnlocked(drill: DrillEntry, h: PracticeHistory): boolean {
  return !drill.unlockedBy || drill.unlockedBy in h.done || drill.id in h.lastPlayed
}

export interface DrillCard {
  drill: DrillEntry
  /** Played at least once: Luyện shows its level, length and best. */
  played: boolean
  /** Opened by a lesson since the reader last saw Luyện, never played: "Mới mở". */
  isNew: boolean
}

/**
 * Luyện's drill list: the open drills (in registry order) and the ones still
 * to open. `drills` should be the listed ones; `seen` the drills Luyện has
 * already shown as open.
 */
export function practiceCards(drills: readonly DrillEntry[], h: PracticeHistory, seen: readonly string[]) {
  const open: DrillCard[] = []
  const locked: DrillEntry[] = []
  for (const drill of drills) {
    if (!isUnlocked(drill, h)) { locked.push(drill); continue }
    const played = drill.id in h.lastPlayed
    open.push({ drill, played, isNew: !!drill.unlockedBy && !played && !seen.includes(drill.id) })
  }
  return { open, locked }
}

/** Why Hôm nay picked this session; the page words it. */
export type TodayReason =
  /** The drill the last finished lesson links to, not practised since that lesson. */
  | { kind: 'lesson'; lesson: string }
  /** Never played: a gentle first session at level 1. */
  | { kind: 'new' }
  /** The open drill practised least recently, last played this many days ago (1 or more). */
  | { kind: 'rest'; days: number }
  /** Every open drill was practised today; this one longest ago. */
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
  history: PracticeHistory
  settings: Pick<Settings, 'drills'>
  /** The latest finished lesson (when, ISO time) and its practice link, if any. */
  lastLesson: { key: string; at: string; practice?: DrillPreset } | null
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
 * options at their defaults. Hôm nay's pick for a drill never played, and the
 * first-open question's start for a reader.
 */
export function starterPreset(drill: DrillEntry): DrillPreset {
  return { drill: drill.id, level: 1, durationSec: TODAY_SHORT_SECONDS, ...presetOptionsFrom(drill, drill.defaults) }
}

/**
 * Hôm nay's one suggestion. First the drill the last finished lesson links
 * to, until it is practised after that lesson; otherwise the open drill practised least
 * recently (a never-played one first). The length fills what is left of the
 * daily goal: two minutes when two or more are left, else one; a drill's first
 * session is always one minute, at level 1. Null with no drill open.
 */
export function pickToday(input: TodayInput): TodayPick | null {
  const { drills, history, settings, lastLesson, todayMinutes, dailyGoal, now } = input
  const fill = dailyGoal - todayMinutes >= 2 ? TODAY_LONG_SECONDS : TODAY_SHORT_SECONDS

  const linked = lastLesson?.practice && drills.find(d => d.id === lastLesson.practice!.drill)
  const playedSince = (id: string, iso: string) => id in history.lastPlayed && Date.parse(history.lastPlayed[id]) >= Date.parse(iso)
  if (lastLesson?.practice && linked && !playedSince(linked.id, lastLesson.at)) {
    return {
      drill: linked,
      preset: { ...lastLesson.practice, durationSec: fill },
      reason: { kind: 'lesson', lesson: lastLesson.key },
    }
  }

  const open = drills.filter(d => isUnlocked(d, history))
  if (open.length === 0) return null
  // Never played first (in registry order), then the longest ago.
  const at = (d: DrillEntry) => (d.id in history.lastPlayed ? Date.parse(history.lastPlayed[d.id]) : -Infinity)
  const drill = [...open].sort((a, b) => at(a) - at(b))[0]
  const last = history.lastPlayed[drill.id]

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

/** The finished lesson with the latest finish time, by key. */
export function latestLesson(done: Readonly<Record<string, { at: string }>>): string | null {
  let best: string | null = null
  for (const [key, r] of Object.entries(done)) {
    if (best === null || Date.parse(r.at) > Date.parse(done[best].at)) best = key
  }
  return best
}
