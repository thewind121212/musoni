import type { Naming } from '../core/music/types'

export interface Settings { naming: Naming; accidentals: boolean; sound: boolean }
export interface SessionResult {
  drill: 'note-id'; level: number; accidentals: boolean; naming: Naming
  correct: number; wrong: number; accuracy: number; avgMs: number
  bestStreak: number; weight: number; practiceScore: number; at: string
}
interface Doc { version: 1; settings: Settings; days: Record<string, { sessions: SessionResult[] }> }

const KEY = 'musoni-progress-v1'
const DEFAULTS: Settings = { naming: 'letters', accidentals: false, sound: true }

function load(): Doc {
  const raw = localStorage.getItem(KEY)
  if (raw) return JSON.parse(raw) as Doc
  return { version: 1, settings: { ...DEFAULTS }, days: {} }
}
function save(doc: Doc): void { localStorage.setItem(KEY, JSON.stringify(doc)) }

export function getSettings(): Settings { return load().settings }
export function saveSettings(s: Settings): void { const d = load(); d.settings = s; save(d) }

export function recordSession(r: SessionResult): void {
  const d = load()
  const day = r.at.slice(0, 10)
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
export function getBest(drill: string, level: number): SessionResult | null {
  let best: SessionResult | null = null
  for (const v of Object.values(load().days)) {
    for (const s of v.sessions) {
      if (s.drill === drill && s.level === level && (!best || s.practiceScore > best.practiceScore)) best = s
    }
  }
  return best
}
