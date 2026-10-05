import { create } from 'zustand'
import { accuracy, practiceScore } from '@/core/scoring'
import { getSettings, recordSession, type SessionResult, type Settings } from '@/progress/progressStore'
import { keepLiveSession } from '@/app/liveSession'
import { INTERVAL_LEVELS } from '@/config/constants'
import { generateIntervalQuestion, type IntervalLevel, type IntervalQuestion } from './generator'
import { cellExists, isRight, type Cell } from './grid'
import intervals from './drill'

/** This drill's workout (level, length, hearing) from the settings a session runs on. */
const own = (s: Settings) => intervals.of(s)

/**
 * Quãng: one route, three phases, like the other drills. `setup` picks the
 * level and length, `running` is the timed session, `finished` the result.
 * Phases are store state, never routes.
 */
export type Phase = 'setup' | 'running' | 'finished'
export type PauseReason = 'menu' | 'away'

/** One wrong answer, kept for the result screen: the two notes as asked, and the cell picked. */
export interface IntervalMiss {
  question: IntervalQuestion
  chosen: Cell
}

interface IntervalsState {
  phase: Phase
  level: IntervalLevel
  /** The settings this session runs on: the reader's, or a preset laid over them. */
  settings: Settings
  question: IntervalQuestion | null
  endsAt: number | null
  askedAt: number
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  sumMs: number
  /** The answer just given, while it is shown. */
  feedback: { chosen: Cell; correct: boolean } | null
  lastResult: SessionResult | null
  /** This session's misses, in order. Not persisted. */
  misses: IntervalMiss[]
  /** When the clock was stopped, or null while it runs. */
  pausedAt: number | null
  pauseReason: PauseReason | null
  /** Starts a session on these settings (this drill's level and length are read from them). */
  start: (settings: Settings, now?: number) => void
  /** Answers with one grid cell; a blank cell or a second answer does nothing. */
  answer: (cell: Cell, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: (now?: number) => void
  pause: (reason: PauseReason, now?: number) => void
  resume: (now?: number) => void
  /** Stops now: recorded as partial with answers, back to setup without. */
  endEarly: (now?: number) => void
}

/** Milliseconds the session has actually been played, paused time excluded. */
export function playedMs(s: Pick<IntervalsState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return own(s.settings).durationSec * 1000 - left
}

function result(s: IntervalsState, durationSec: number, score: number, now: number, partial: boolean): SessionResult {
  const total = s.correct + s.wrong
  return {
    drill: intervals.id, level: s.level,
    accidentals: INTERVAL_LEVELS[s.level].accidentals, naming: s.settings.naming,
    durationSec,
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
    bestStreak: s.bestStreak, weight: INTERVAL_LEVELS[s.level].weight,
    practiceScore: score,
    at: new Date(now).toISOString(),
    ...(partial ? { partial: true as const } : {}),
  }
}

/** Records an unfinished session with answers as partial; returns it, or null when there were none. */
function recordPartial(s: IntervalsState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const r = result(s, Math.max(1, Math.round(playedMs(s, now) / 1000)), 0, now, true)
  recordSession(r)
  return r
}

const cleared = { question: null, feedback: null, pausedAt: null, pauseReason: null }

export const useIntervalsStore = create<IntervalsState>((set, get) => ({
  phase: 'setup',
  level: 1,
  settings: getSettings(),
  question: null, endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,

  start: (settings, now = Date.now()) => {
    // Starting over ends a session left paused; its played time still counts.
    recordPartial(get(), now)
    const { level: l, durationSec } = own(settings)
    const level = l as IntervalLevel
    set({
      phase: 'running', level, settings,
      question: generateIntervalQuestion(level, null),
      endsAt: now + durationSec * 1000, askedAt: now,
      correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
      feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
    })
  },

  answer: (cell, now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.question || s.feedback || s.pausedAt !== null) return
    if (!cellExists(cell) || !INTERVAL_LEVELS[s.level].rows.includes(cell.row)) return
    const ok = isRight(cell, s.question.interval)
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + Math.max(0, now - s.askedAt),
      feedback: { chosen: cell, correct: ok },
      misses: ok ? s.misses : [...s.misses, { question: s.question, chosen: cell }],
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running') return
    set({
      // A question that appears while paused is first seen on resume, and
      // resume shifts askedAt by the pause, so start its clock at the pause.
      feedback: null, askedAt: s.pausedAt ?? now,
      question: generateIntervalQuestion(s.level, s.question?.interval ?? null),
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || s.pausedAt !== null || now < s.endsAt) return
    const duration = own(s.settings).durationSec
    const r = result(s, duration, practiceScore(s.correct, s.wrong, INTERVAL_LEVELS[s.level].weight, duration), now, false)
    recordSession(r)
    set({ phase: 'finished', lastResult: r, question: null, feedback: null })
  },

  backToSetup: (now = Date.now()) => {
    recordPartial(get(), now)
    set({ phase: 'setup', ...cleared })
  },

  pause: (reason, now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.pausedAt !== null) return
    set({ pausedAt: now, pauseReason: reason })
  },

  resume: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.pausedAt === null || s.endsAt === null) return
    const away = now - s.pausedAt
    set({ pausedAt: null, pauseReason: null, endsAt: s.endsAt + away, askedAt: s.askedAt + away })
  },

  endEarly: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running') return
    const r = recordPartial(s, now)
    if (r) set({ phase: 'finished', lastResult: r, ...cleared })
    else set({ phase: 'setup', ...cleared })
  },
}))

// A running session survives a page load (refresh, a typed URL): see app/liveSession.
keepLiveSession(useIntervalsStore, intervals.id, intervals.route)
