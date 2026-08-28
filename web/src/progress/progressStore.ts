import type { Naming } from '../core/music/types'
import { DEFAULT_DURATION_SECONDS } from '../config/constants'

export interface Settings { naming: Naming; accidentals: boolean; sound: boolean; durationSec: number }
export interface SessionResult {
  drill: 'note-id'; level: number; accidentals: boolean; naming: Naming; durationSec: number
  correct: number; wrong: number; accuracy: number; avgMs: number
  bestStreak: number; weight: number; practiceScore: number; at: string
}
interface Doc { version: 1; settings: Settings; days: Record<string, { sessions: SessionResult[] }> }

const KEY = 'musoni-progress-v1'
const DEFAULTS: Settings = { naming: 'letters', accidentals: false, sound: true, durationSec: DEFAULT_DURATION_SECONDS }

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
 * Best session for a drill at a given level AND session length. Duration is part
 * of the key because practiceScore scales with how long you played: a 5-minute
 * score would permanently out-rank every 30-second one and the comparison would
 * stop meaning anything.
 */
export function getBest(drill: string, level: number, durationSec: number): SessionResult | null {
  let best: SessionResult | null = null
  for (const v of Object.values(load().days)) {
    for (const s of v.sessions) {
      if (s.drill === drill && s.level === level && s.durationSec === durationSec
        && (!best || s.practiceScore > best.practiceScore)) best = s
    }
  }
  return best
}
