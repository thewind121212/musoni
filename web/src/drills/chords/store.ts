import { create } from 'zustand'
import { accuracy, practiceScore } from '@/core/scoring'
import { getSettings, recordSession, type Settings, type SessionResult } from '@/progress/progressStore'
import { CHORD_LEVELS } from '@/config/constants'
import { keepLiveSession } from '@/app/liveSession'
import { generateChordQuestion, isRight, type ChordAnswer, type ChordLevel, type ChordQuestion } from './generator'
import type { Quality } from './theory'
import chords, { sessionLevel } from './drill'

/** This drill's workout (level, length, mode, listening) from the settings a session runs on. */
const own = (s: Settings) => chords.of(s)

/**
 * Hợp âm: one route, three phases, like the other drills. `setup` picks the
 * mode, level and length, `running` is the timed session, `finished` the
 * result. Phases are store state, never routes.
 */
export type Phase = 'setup' | 'running' | 'finished'
export type PauseReason = 'menu' | 'away'

/** One wrong answer, kept for the result screen, which words it in the reader's language. */
export interface ChordMiss {
  question: ChordQuestion
  answer: ChordAnswer
}

export interface ChordFeedback {
  correct: boolean
  answer: ChordAnswer
}

interface ChordState {
  phase: Phase
  level: ChordLevel
  /** The settings this session runs on: the reader's, or a preset laid over them. */
  settings: Settings
  question: ChordQuestion | null
  /** Name mode: the root key picked, waiting for the quality (or the other way round). */
  pickedRoot: number | null
  pickedQuality: Quality | null
  endsAt: number | null
  /** When the current question appeared. The answer clock starts here. */
  askedAt: number
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  sumMs: number
  feedback: ChordFeedback | null
  lastResult: SessionResult | null
  /** This session's misses, for the result screen. Not persisted. */
  misses: ChordMiss[]
  /** When the clock was stopped, or null while it runs. */
  pausedAt: number | null
  pauseReason: PauseReason | null
  /** Starts a session on these settings (this drill's level, mode and length are read from them). */
  start: (settings: Settings, now?: number) => void
  /**
   * Name mode: picks the root on the pad. With a quality already picked this
   * answers; otherwise it waits, and picking again changes it.
   */
  pickRoot: (index: number, now?: number) => void
  /** Name mode: picks the quality; answers once a root is picked too. */
  pickQuality: (quality: Quality, now?: number) => void
  /** Roman mode: answers with a degree (0 = I). */
  pickDegree: (degree: number, now?: number) => void
  /** Settles the question with this answer. */
  answer: (answer: ChordAnswer, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: (now?: number) => void
  pause: (reason: PauseReason, now?: number) => void
  resume: (now?: number) => void
  /** Stops now: recorded as partial with answers, back to setup without. */
  endEarly: (now?: number) => void
}

/** Milliseconds the session has actually been played, paused time excluded. */
export function playedMs(s: Pick<ChordState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return own(s.settings).durationSec * 1000 - left
}

function result(s: ChordState, durationSec: number, score: number, now: number, partial: boolean): SessionResult {
  const total = s.correct + s.wrong
  return {
    drill: chords.id, level: s.level,
    accidentals: s.level !== 1, naming: s.settings.naming,
    durationSec,
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
    bestStreak: s.bestStreak, weight: CHORD_LEVELS[s.level].weight,
    practiceScore: score,
    at: new Date(now).toISOString(),
    ...(partial ? { partial: true as const } : {}),
  }
}

/** Records an unfinished session with answers as partial; returns it, or null when there were none. */
function recordPartial(s: ChordState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const r = result(s, Math.max(1, Math.round(playedMs(s, now) / 1000)), 0, now, true)
  recordSession(r)
  return r
}

/** Can the question on screen take an answer now? */
function open(s: ChordState): s is ChordState & { question: ChordQuestion } {
  return s.phase === 'running' && s.question !== null && s.feedback === null && s.pausedAt === null
}

const cleared = { question: null, feedback: null, pickedRoot: null, pickedQuality: null, pausedAt: null, pauseReason: null }

export const useChordStore = create<ChordState>((set, get) => ({
  phase: 'setup',
  level: 1,
  settings: getSettings(),
  question: null, pickedRoot: null, pickedQuality: null,
  endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,

  start: (settings, now = Date.now()) => {
    // Starting over ends a session left paused; its played time still counts.
    recordPartial(get(), now)
    const workout = own(settings)
    const level = sessionLevel(workout) as ChordLevel
    set({
      phase: 'running', level, settings,
      question: generateChordQuestion(level, settings.naming, null), pickedRoot: null, pickedQuality: null,
      endsAt: now + workout.durationSec * 1000, askedAt: now,
      correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
      feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
    })
  },

  pickRoot: (index, now = Date.now()) => {
    const s = get()
    if (!open(s) || s.question.kind !== 'name') return
    if (s.pickedQuality !== null) return s.answer({ root: index, quality: s.pickedQuality }, now)
    set({ pickedRoot: index })
  },

  pickQuality: (quality, now = Date.now()) => {
    const s = get()
    if (!open(s) || s.question.kind !== 'name' || !s.question.qualities.includes(quality)) return
    if (s.pickedRoot !== null) return s.answer({ root: s.pickedRoot, quality }, now)
    set({ pickedQuality: quality })
  },

  pickDegree: (degree, now = Date.now()) => {
    const s = get()
    if (!open(s) || s.question.kind !== 'roman' || degree < 0 || degree > 6) return
    s.answer({ degree }, now)
  },

  answer: (answer, now = Date.now()) => {
    const s = get()
    if (!open(s)) return
    const q = s.question
    const ok = isRight(q, answer)
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + Math.max(0, now - s.askedAt),
      feedback: { correct: ok, answer },
      pickedRoot: null, pickedQuality: null,
      misses: ok ? s.misses : [...s.misses, { question: q, answer }],
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.question) return
    set({
      feedback: null, pickedRoot: null, pickedQuality: null,
      question: generateChordQuestion(s.level, s.settings.naming, s.question),
      // While paused the clock starts once play resumes (resume moves askedAt on).
      askedAt: s.pausedAt ?? now,
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || s.pausedAt !== null || now < s.endsAt) return
    const duration = own(s.settings).durationSec
    const r = result(s, duration, practiceScore(s.correct, s.wrong, CHORD_LEVELS[s.level].weight, duration), now, false)
    recordSession(r)
    set({ phase: 'finished', lastResult: r, question: null, feedback: null, pickedRoot: null, pickedQuality: null })
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
keepLiveSession(useChordStore, chords.id, chords.route)
