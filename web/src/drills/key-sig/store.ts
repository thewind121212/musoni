import { create } from 'zustand'
import type { Clef } from '@/core/music/types'
import { accuracy, practiceScore } from '@/core/scoring'
import { getSettings, recordSession, type Settings, type SessionResult } from '@/progress/progressStore'
import { keepLiveSession } from '@/app/liveSession'
import { KEY_SIG_LEVELS } from '@/config/constants'
import keySig from './drill'
import { generateKeySigQuestion, type KeySigQuestion } from './generator'
import type { Mode } from './signatures'
import type { KeySigLevel } from './strings'

/** This drill's workout (level, length) from the settings a session runs on. */
const own = (s: Settings) => keySig.of(s)

/** One route, three phases held here, like the other drills: setup, the timed session, the result. */
export type Phase = 'setup' | 'running' | 'finished'
export type PauseReason = 'menu' | 'away'

/** One wrong answer, kept for the result screen's keys to review. */
export interface KeySigMiss {
  fifths: number
  mode: Mode
  clef: Clef
  /** The tonic's key and the picked key, labelled as the reader saw them. */
  answer: string
  chosen: string
}

interface KeySigState {
  phase: Phase
  level: KeySigLevel
  /** The settings this session runs on: the reader's, or a preset laid over them. */
  settings: Settings
  question: KeySigQuestion | null
  endsAt: number | null
  askedAt: number
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  sumMs: number
  feedback: { correctIndex: number; chosenIndex: number; correct: boolean } | null
  lastResult: SessionResult | null
  /** This session's misses, in order, for the result screen. Not saved with the progress. */
  misses: KeySigMiss[]
  /** When the clock was stopped, or null while it runs. Paused time is handed back on resume. */
  pausedAt: number | null
  pauseReason: PauseReason | null
  /** Starts a session on these settings (this drill's level and length are read from them). */
  start: (settings: Settings, now?: number) => void
  answer: (index: number, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: (now?: number) => void
  pause: (reason: PauseReason, now?: number) => void
  resume: (now?: number) => void
  /** Stops now: recorded as partial with answers, back to setup without. */
  endEarly: (now?: number) => void
}

/** Milliseconds the session has actually been played, paused time excluded. */
export function playedMs(s: Pick<KeySigState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return own(s.settings).durationSec * 1000 - left
}

function result(s: KeySigState, durationSec: number, now: number, partial: boolean): SessionResult {
  const total = s.correct + s.wrong
  const weight = KEY_SIG_LEVELS[s.level].weight
  return {
    drill: keySig.id, level: s.level,
    // Black keys are answers at every level (B♭, F♯ from level 1).
    accidentals: true, naming: s.settings.naming,
    durationSec,
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
    bestStreak: s.bestStreak, weight,
    practiceScore: partial ? 0 : practiceScore(s.correct, s.wrong, weight, durationSec),
    at: new Date(now).toISOString(),
    ...(partial ? { partial: true as const } : {}),
  }
}

/** Records an unfinished session with answers as partial; returns it, or null when there were none. */
function recordPartial(s: KeySigState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const r = result(s, Math.max(1, Math.round(playedMs(s, now) / 1000)), now, true)
  recordSession(r)
  return r
}

const cleared = { question: null, feedback: null, pausedAt: null, pauseReason: null }

export const useKeySigStore = create<KeySigState>((set, get) => ({
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
    const level = l as KeySigLevel
    set({
      phase: 'running', level, settings,
      question: generateKeySigQuestion(level, settings.naming, null),
      endsAt: now + durationSec * 1000, askedAt: now,
      correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
      feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
    })
  },

  answer: (index, now = Date.now()) => {
    const s = get()
    const q = s.question
    if (s.phase !== 'running' || !q || s.feedback || s.pausedAt !== null) return
    const ok = index === q.correctIndex
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + Math.max(0, now - s.askedAt),
      feedback: { correctIndex: q.correctIndex, chosenIndex: index, correct: ok },
      misses: ok ? s.misses : [...s.misses, {
        fifths: q.fifths, mode: q.mode, clef: q.clef,
        answer: q.options[q.correctIndex].label,
        chosen: q.options[index].label,
      }],
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running') return
    set({
      // A question that appears while paused is first seen on resume, which
      // shifts askedAt by the pause, so its clock starts at the pause.
      feedback: null, askedAt: s.pausedAt ?? now,
      question: generateKeySigQuestion(s.level, s.settings.naming, s.question),
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || s.pausedAt !== null || now < s.endsAt) return
    const r = result(s, own(s.settings).durationSec, now, false)
    recordSession(r)
    set({ phase: 'finished', lastResult: r, question: null, feedback: null })
  },

  backToSetup: (now = Date.now()) => {
    // Leaving for setup ends a session left paused; its played time still counts.
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
keepLiveSession(useKeySigStore, keySig.id, keySig.route)
