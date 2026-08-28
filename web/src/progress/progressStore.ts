import type { Naming } from '../core/music/types'
import { DEFAULT_DURATION_SECONDS } from '../config/constants'
import { DEFAULT_LANG, type Lang } from '../core/i18n/translate'

export interface Settings {
  /** Workout parameters: what is being practised. Presets set these. */
  level: 1 | 2 | 3 | 4
  durationSec: number
  accidentals: boolean
  /** Preferences: how the user likes to work. Presets never touch these. */
  naming: Naming
  sound: boolean
  lang: Lang
  /** Whether the activity panel shows the full calendar or just this week. */
  activityExpanded: boolean
}
export interface SessionResult {
  drill: 'note-id'; level: number; accidentals: boolean; naming: Naming; durationSec: number
  correct: number; wrong: number; accuracy: number; avgMs: number
  bestStreak: number; weight: number; practiceScore: number; at: string
}
interface Doc { version: 1; settings: Settings; days: Record<string, { sessions: SessionResult[] }> }

const KEY = 'musoni-progress-v1'
// Vietnamese market first, and Vietnamese music teaching leads with solfege,
// so the drill speaks Do Re Mi out of the box rather than C D E.
const DEFAULTS: Settings = {
  level: 1,
  durationSec: DEFAULT_DURATION_SECONDS,
  accidentals: false,
  naming: 'solfege',
  sound: true,
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

export function recordSession(r: SessionResult): void {
  const d = load()
  const day = localDayKey(new Date(r.at))
  ;(d.days[day] ??= { sessions: [] }).sessions.push(r)
  save(d)
}
export function getDay(date: string): SessionResult[] { return load().days[date]?.sessions ?? [] }
export function getRange(from: string, to: string): Record<string, SessionResult[]> {
  const out: Record<string, SessionResult[]> = {}
  for (const [day, v] of Object.entries(load().days)) {
    if (day >= from && day <= to) out[day] = v.sessions
  }
  return out
}
/**
 * Best session for a drill at a given level, across every session length.
 *
 * Length is deliberately not part of the key: practiceScore is a per-minute
 * pace, so a 30-second sprint and a 10-minute session are already on the same
 * scale. Keying by length would also fragment bests into a bucket per custom
 * duration, where almost every session is trivially a "personal best".
 */
export function getBest(drill: string, level: number): SessionResult | null {
  let best: SessionResult | null = null
  for (const v of Object.values(load().days)) {
    for (const s of v.sessions) {
      if (s.drill === drill && s.level === level
        && (!best || s.practiceScore > best.practiceScore)) best = s
    }
  }
  return best
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
  const hasSessions = (d: Date) => (doc.days[localDayKey(d)]?.sessions.length ?? 0) > 0

  const cursor = new Date(now)
  if (!hasSessions(cursor)) cursor.setDate(cursor.getDate() - 1)

  let streak = 0
  while (hasSessions(cursor)) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Minutes practised per local day, for every day that has sessions. */
export function getDailyMinutes(): Record<string, number> {
  const out: Record<string, number> = {}
  for (const [day, value] of Object.entries(load().days)) {
    const seconds = value.sessions.reduce((sum, s) => sum + s.durationSec, 0)
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
  const days = Object.keys(load().days)
    .filter(d => (load().days[d]?.sessions.length ?? 0) > 0)
    .sort()
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

/** Number of days with at least one session. */
export function getActiveDayCount(): number {
  return Object.values(load().days).filter(d => d.sessions.length > 0).length
}
