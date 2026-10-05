import type { Naming } from '../core/music/types'
import { DEFAULT_LANG, type Lang } from '../core/i18n/translate'

export type PadStyle = 'piano' | 'boxes'

/** A drill's id (`note-id`, `hear-play`, ...): the key of its registry entry, its route and its saved settings. */
export type DrillId = string

/** One saved drill setting: a level, a length, a switch, a choice, a list of chapters. */
export type DrillSettingValue = boolean | number | string | string[] | null
/** One drill's saved workout settings. Its defaults live in the drill's registry entry, not here. */
export type StoredDrillSettings = Record<string, DrillSettingValue>

/** The first-run answer: new to notation (start with lesson 1) or reads some (start with a short drill). */
export type StartPoint = 'beginner' | 'reader'

export interface Settings {
  /** Preferences: how the user likes to work, shared by every drill and lesson. Presets never touch these. */
  naming: Naming
  sound: boolean
  /** Note names printed on the answer keys. Off trains finding the note on a bare keyboard. */
  keyLabels: boolean
  /** Answer keys drawn as a piano keyboard, or as two rows of boxes. */
  padStyle: PadStyle
  lang: Lang
  /** Whether the activity panel shows the full calendar or just this week. */
  activityExpanded: boolean
  /**
   * Each drill's own workout (level, length and its own options), by drill
   * id. Only what the reader changed is stored; the drill's registry entry
   * holds the defaults (`app/drills`). Presets lay over these for one session.
   */
  drills: Record<DrillId, StoredDrillSettings>
  /** The first-run answer; null until asked (a reader with history is never asked). */
  startPoint: StartPoint | null
}

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

/** When an Ôn tập check was last answered, and whether that answer was wrong. */
export interface ReviewMark {
  at: string
  missed?: true
}

/**
 * A local day. `lessons` was added with the theory lessons; days written
 * before it have none, and days with only lesson time have no sessions.
 */
interface Day { sessions: SessionResult[]; lessons?: LessonTime[] }
/**
 * The progress document. Version 2 moved each drill's workout settings into
 * `settings.drills` (see `migrate`). `theory`, `unlocksSeen` and `review` are
 * optional: a document without them reads as none.
 */
interface Doc {
  version: 2
  settings: Settings
  days: Record<string, Day>
  /** Finished lessons by key. */
  theory?: { done: Record<string, LessonResult> }
  /** Drills Luyện has shown as open, so a newly opened one is marked "Mới mở" on one visit only. */
  unlocksSeen?: DrillId[]
  /** Ôn tập: the last answer to each lesson check, by check id (`chapter/lesson/step`). */
  review?: Record<string, ReviewMark>
}
/** A document as found in storage: any version, checked only for its two required parts. */
type StoredDoc = { version?: number; settings: Record<string, unknown>; days: Record<string, Day> } & Record<string, unknown>

const KEY = 'musoni-progress-v1'
// Vietnamese market first, and Vietnamese music teaching leads with solfege,
// so the drill speaks Do Re Mi out of the box rather than C D E.
const DEFAULTS: Settings = {
  naming: 'solfege',
  sound: true,
  keyLabels: true,
  padStyle: 'piano',
  lang: DEFAULT_LANG,
  // Opens short: the week answers "am I current" in one glance, and the
  // calendar is there for anyone who wants the longer view.
  activityExpanded: false,
  drills: {},
  startPoint: null,
}

/**
 * Version 1 kept the two drills' workout settings as flat fields. Version 2
 * keeps each drill's under `settings.drills[id]`, so a new drill adds no
 * field here. Each old field moves to its drill under the drill's own name;
 * a field the document never had stays out (the drill's default applies).
 */
const V1_FIELDS: Record<string, [DrillId, string]> = {
  level: ['note-id', 'level'],
  durationSec: ['note-id', 'durationSec'],
  accidentals: ['note-id', 'accidentals'],
  earLevel: ['hear-play', 'level'],
  earDurationSec: ['hear-play', 'durationSec'],
  earCadenceEach: ['hear-play', 'cadenceEach'],
  earOneKey: ['hear-play', 'oneKey'],
}

/**
 * Brings a stored document up to the current version. Pure: the result is
 * written back with the next save. A document already at version 2 (or a
 * newer one) is read as it is.
 */
export function migrate(doc: StoredDoc): Doc {
  if (typeof doc.version === 'number' && doc.version >= 2) return doc as unknown as Doc
  const settings: Record<string, unknown> = { ...doc.settings }
  const drills: Record<DrillId, StoredDrillSettings> = {}
  for (const [field, [drill, name]] of Object.entries(V1_FIELDS)) {
    if (!(field in settings)) continue
    ;(drills[drill] ??= {})[name] = settings[field] as DrillSettingValue
    delete settings[field]
  }
  return { ...doc, version: 2, settings: { ...settings, drills } as unknown as Settings } as unknown as Doc
}

// Formats a Date as a LOCAL calendar-day key (YYYY-MM-DD), as opposed to
// Date#toISOString which is always UTC. Day buckets must use the viewer's
// local day so sessions aren't misattributed to the previous/next day for
// users outside UTC (e.g. a session at 1am in UTC+7 is still "today" locally).
export function localDayKey(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function isValidDoc(x: unknown): x is StoredDoc {
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
      if (isValidDoc(parsed)) return migrate(parsed)
      // valid JSON, wrong shape (e.g. 'null' or '{}') — fall through to defaults
    } catch { /* corrupted — fall through to defaults */ }
  }
  return { version: 2, settings: { ...DEFAULTS }, days: {} }
}
function save(doc: Doc): void { localStorage.setItem(KEY, JSON.stringify(doc)) }

export function getSettings(): Settings {
  const stored = load().settings
  return { ...DEFAULTS, ...stored, drills: { ...stored.drills } }
}
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

function loadLive(): Record<DrillId, LiveSession | undefined> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(LIVE_KEY) ?? '{}')
    return typeof parsed === 'object' && parsed !== null ? parsed as Record<DrillId, LiveSession | undefined> : {}
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

/** Whether the reader has done anything yet: a session, lesson time or a finished lesson. */
export function hasHistory(): boolean {
  const d = load()
  return Object.values(d.days).some(practised) || Object.keys(d.theory?.done ?? {}).length > 0
}

/** When each drill was last played (its latest session, partial ones included), by drill id. */
export function getLastPlayed(): Record<DrillId, string> {
  const out: Record<DrillId, string> = {}
  for (const day of Object.values(load().days)) {
    for (const s of day.sessions ?? []) {
      if (!out[s.drill] || Date.parse(s.at) > Date.parse(out[s.drill])) out[s.drill] = s.at
    }
  }
  return out
}

/** Drills Luyện has already shown as open. */
export function getUnlocksSeen(): DrillId[] { return load().unlocksSeen ?? [] }
/** Remembers drills as shown open, so "Mới mở" marks each one on the visit it opened only. */
export function markUnlocksSeen(drills: readonly DrillId[]): void {
  const d = load()
  const seen = d.unlocksSeen ?? []
  if (drills.every(x => seen.includes(x))) return
  d.unlocksSeen = [...new Set([...seen, ...drills])]
  save(d)
}

/** Ôn tập: the last answer to every check answered so far, by check id. */
export function getReviewMarks(): Record<string, ReviewMark> { return load().review ?? {} }
/**
 * Ôn tập: records an answer to a check. Only the latest answer is kept, so the
 * history is one small entry per check the reader has met.
 */
export function recordReviewAnswer(check: string, correct: boolean, now: Date = new Date()): void {
  const d = load()
  ;(d.review ??= {})[check] = correct ? { at: now.toISOString() } : { at: now.toISOString(), missed: true }
  save(d)
}
