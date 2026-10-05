import type { Naming } from '../core/music/types'
import { DEFAULT_DURATION_SECONDS, EAR_DEFAULT_DURATION_SECONDS } from '../config/constants'
import { DEFAULT_LANG, type Lang } from '../core/i18n/translate'

export type PadStyle = 'piano' | 'boxes'

export interface Settings {
  /** Workout parameters: what is being practised. Presets set these. */
  level: 1 | 2 | 3 | 4
  durationSec: number
  accidentals: boolean
  /** Preferences: how the user likes to work. Presets never touch these. */
  naming: Naming
  sound: boolean
  /** Note names printed on the answer keys. Off trains finding the note on a bare keyboard. */
  keyLabels: boolean
  /** Answer keys drawn as a piano keyboard, or as two rows of boxes. */
  padStyle: PadStyle
  /** Nghe & Đàn's own workout: level and length. Naming, keys and labels are shared. */
  earLevel: 1 | 2 | 3 | 4
  earDurationSec: number
  /**
   * Nghe & Đàn listening aids. `earCadenceEach`: the key's cadence before every
   * question, not only when the key changes. `earOneKey`: C at every level.
   * Both make the drill easier, so a session with one on never sets a best.
   */
  earCadenceEach: boolean
  earOneKey: boolean
  lang: Lang
  /** Whether the activity panel shows the full calendar or just this week. */
  activityExpanded: boolean
}
export type DrillId = 'note-id' | 'hear-play'

export interface SessionResult {
  /**
   * Which drill. For `hear-play`, `level` is its own level and `accidentals`
   * says whether black keys were answers.
   */
  drill: DrillId; level: number; accidentals: boolean; naming: Naming; durationSec: number
  correct: number; wrong: number; accuracy: number; avgMs: number
  bestStreak: number; weight: number; practiceScore: number; at: string
  /**
   * Ended before its clock ran out. `durationSec` is the time actually played,
   * so it counts toward daily minutes and the streak, but its score is not a
   * comparable pace: bests and averages skip it. Absent on full sessions.
   */
  partial?: true
  /**
   * Played with a Nghe & Đàn listening aid on. Counts toward daily minutes
   * and the streak; bests and week averages skip it (the aids make the drill
   * easier, so it would skew both). Absent otherwise.
   */
  aids?: true
}
/**
 * Time spent in a theory lesson. It counts toward the day's minutes, the
 * streak and active days like a drill session, but it is not a session: no
 * score, no level, never a best.
 */
export interface LessonTime {
  /** The lesson's key, `chapter/lesson` (see theory/registry). */
  lesson: string
  seconds: number
  at: string
}

/** A finished theory lesson: when it was last finished and how its checks went. */
export interface LessonResult {
  at: string
  correct: number
  total: number
}

/**
 * A local day. `lessons` was added with the theory lessons; days written
 * before it have none, and days with only lesson time have no sessions.
 */
interface Day { sessions: SessionResult[]; lessons?: LessonTime[] }
/**
 * The progress document. `theory` was added with the theory lessons (additive,
 * so `version` stays 1): finished lessons by key.
 */
interface Doc {
  version: 1
  settings: Settings
  days: Record<string, Day>
  theory?: { done: Record<string, LessonResult> }
}

const KEY = 'musoni-progress-v1'
// Vietnamese market first, and Vietnamese music teaching leads with solfege,
// so the drill speaks Do Re Mi out of the box rather than C D E.
const DEFAULTS: Settings = {
  level: 1,
  durationSec: DEFAULT_DURATION_SECONDS,
  accidentals: false,
  naming: 'solfege',
  sound: true,
  keyLabels: true,
  padStyle: 'piano',
  earLevel: 1,
  earDurationSec: EAR_DEFAULT_DURATION_SECONDS,
  earCadenceEach: false,
  earOneKey: false,
  lang: DEFAULT_LANG,
  // Opens short: the week answers "am I current" in one glance, and the
  // calendar is there for anyone who wants the longer view.
  activityExpanded: false,
}

// Formats a Date as a LOCAL calendar-day key (YYYY-MM-DD), as opposed to
// Date#toISOString which is always UTC. Day buckets must use the viewer's
// local day so sessions aren't misattributed to the previous/next day for
// users outside UTC (e.g. a session at 1am in UTC+7 is still "today" locally).
export function localDayKey(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function isValidDoc(x: unknown): x is Doc {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return typeof o.settings === 'object' && o.settings !== null
    && typeof o.days === 'object' && o.days !== null
}

function load(): Doc {
  const raw = localStorage.getItem(KEY)
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw)
      if (isValidDoc(parsed)) return parsed
      // valid JSON, wrong shape (e.g. 'null' or '{}') — fall through to defaults
    } catch { /* corrupted — fall through to defaults */ }
  }
  return { version: 1, settings: { ...DEFAULTS }, days: {} }
}
function save(doc: Doc): void { localStorage.setItem(KEY, JSON.stringify(doc)) }

export function getSettings(): Settings { return { ...DEFAULTS, ...load().settings } }
export function saveSettings(s: Settings): void { const d = load(); d.settings = s; save(d) }

/** What home needs to offer a session back: where it is and how it stood. */
export interface LiveSummary {
  /** Route to return to. */
  to: string
  secondsLeft: number
  correct: number
  wrong: number
}

/**
 * A session still being played, kept under its own key so a page load
 * (refresh, a typed URL, a crash) can bring it back. `state` is the drill
 * store's data, which only the drill reads; `summary` is what home shows.
 */
export interface LiveSession<S = Record<string, unknown>> {
  drill: DrillId
  savedAt: number
  state: S
  summary: LiveSummary
}

const LIVE_KEY = 'musoni-live-v1'

function loadLive(): Partial<Record<DrillId, LiveSession>> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(LIVE_KEY) ?? '{}')
    return typeof parsed === 'object' && parsed !== null ? parsed as Partial<Record<DrillId, LiveSession>> : {}
  } catch { return {} /* corrupted: nothing to bring back */ }
}

/** Saves the drill's session as it stands now. Functions in `state` are dropped (JSON). */
export function saveLiveSession(drill: DrillId, state: object, summary: LiveSummary, now = Date.now()): void {
  const all = loadLive()
  all[drill] = { drill, savedAt: now, state: JSON.parse(JSON.stringify(state)), summary }
  localStorage.setItem(LIVE_KEY, JSON.stringify(all))
}
export function getLiveSession<S = Record<string, unknown>>(drill: DrillId): LiveSession<S> | null {
  return (loadLive()[drill] as LiveSession<S> | undefined) ?? null
}
export function getLiveSessions(): LiveSession[] {
  return Object.values(loadLive()).filter((l): l is LiveSession => l !== undefined)
}
export function clearLiveSession(drill: DrillId): void {
  const all = loadLive()
  if (!(drill in all)) return
  delete all[drill]
  localStorage.setItem(LIVE_KEY, JSON.stringify(all))
}

export function recordSession(r: SessionResult): void {
  const d = load()
  const day = localDayKey(new Date(r.at))
  ;((d.days[day] ??= { sessions: [] }).sessions ??= []).push(r)
  save(d)
}
export function getDay(date: string): SessionResult[] { return load().days[date]?.sessions ?? [] }
export function getRange(from: string, to: string): Record<string, SessionResult[]> {
  const out: Record<string, SessionResult[]> = {}
  for (const [day, v] of Object.entries(load().days)) {
    if (day >= from && day <= to) out[day] = v.sessions ?? []
  }
  return out
}

/** Adds time spent in a theory lesson to its local day. */
export function recordLessonTime(t: LessonTime): void {
  const d = load()
  const day = localDayKey(new Date(t.at))
  ;((d.days[day] ??= { sessions: [] }).lessons ??= []).push(t)
  save(d)
}

/** Marks a theory lesson finished, with its check score. Finishing again replaces the score. */
export function markLessonDone(lesson: string, result: Omit<LessonResult, 'at'>, now: Date = new Date()): void {
  const d = load()
  ;(d.theory ??= { done: {} }).done[lesson] = { ...result, at: now.toISOString() }
  save(d)
}

/** Finished theory lessons by key. Empty for a document written before theory existed. */
export function getLessonsDone(): Record<string, LessonResult> {
  return load().theory?.done ?? {}
}

/** A day counts as practised with a drill session or time in a lesson. */
function practised(day: Day | undefined): boolean {
  return (day?.sessions?.length ?? 0) > 0 || (day?.lessons?.length ?? 0) > 0
}
/**
 * Best session for a drill at a given level, across every session length.
 *
 * Length is deliberately not part of the key: practiceScore is a per-minute
 * pace, so a 30-second sprint and a 10-minute session are already on the same
 * scale. Keying by length would also fragment bests into a bucket per custom
 * duration, where almost every session is trivially a "personal best".
 */
export function getBest(drill: DrillId, level: number): SessionResult | null {
  let best: SessionResult | null = null
  for (const v of Object.values(load().days)) {
    for (const s of v.sessions ?? []) {
      if (s.drill === drill && s.level === level && !s.partial && !s.aids
        && (!best || s.practiceScore > best.practiceScore)) best = s
    }
  }
  return best
}

/**
 * Average practice score at a level over the last `days` local days, today
 * included, leaving out the session at `excludeAt` (the one being compared).
 * Null when there is nothing to compare against.
 */
export function getRecentAverage(
  drill: DrillId, level: number, excludeAt: string, days = 7, now: Date = new Date(),
): number | null {
  const from = new Date(now)
  from.setDate(from.getDate() - (days - 1))
  const scores: number[] = []
  for (const sessions of Object.values(getRange(localDayKey(from), localDayKey(now)))) {
    for (const s of sessions) {
      if (s.drill === drill && s.level === level && !s.partial && !s.aids && s.at !== excludeAt) scores.push(s.practiceScore)
    }
  }
  if (scores.length === 0) return null
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

/**
 * Consecutive days ending today that have at least one session.
 *
 * A day with no sessions yet does not break the streak until it is over, so an
 * unpractised today counts back from yesterday: the number shown is what the
 * user still has, not what they have already lost.
 */
export function getStreak(now: Date = new Date()): number {
  const doc = load()
  const hasSessions = (d: Date) => practised(doc.days[localDayKey(d)])

  const cursor = new Date(now)
  if (!hasSessions(cursor)) cursor.setDate(cursor.getDate() - 1)

  let streak = 0
  while (hasSessions(cursor)) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Minutes practised per local day (drill sessions and lesson time), for every day that has any. */
export function getDailyMinutes(): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [day, value] of Object.entries(load().days)) {
    const seconds = (value.sessions ?? []).reduce((sum, s) => sum + s.durationSec, 0)
      + (value.lessons ?? []).reduce((sum, l) => sum + l.seconds, 0)
    if (seconds > 0) out[day] = Math.round(seconds / 60)
  }
  return out
}

/**
 * The longest run of consecutive practised days on record.
 *
 * Walks the practised days in order rather than day by day from today, so the
 * cost is the number of days practised rather than the age of the account.
 */
export function getLongestStreak(): number {
  const all = load().days
  const days = Object.keys(all).filter(d => practised(all[d])).sort()
  if (days.length === 0) return 0

  const dayNumber = (key: string) => Math.round(new Date(key + 'T00:00:00').getTime() / 86_400_000)

  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    run = dayNumber(days[i]) - dayNumber(days[i - 1]) === 1 ? run + 1 : 1
    if (run > longest) longest = run
  }
  return longest
}

/** Number of days with at least one session or some lesson time. */
export function getActiveDayCount(): number {
  return Object.values(load().days).filter(practised).length
}
