import { create } from 'zustand'
import { accuracy, practiceScore } from '@/core/scoring'
import type { StepAnswer } from '@/core/components/organisms'
import {
  getLessonsDone, getReviewMarks, getSettings, recordReviewAnswer, recordSession, type SessionResult, type Settings,
} from '@/progress/progressStore'
import { keepLiveSession } from '@/app/liveSession'
import { CHAPTERS } from '@/theory/registry'
import { REVIEW_DIFFICULTY, REVIEW_NO_REPEAT } from '@/config/constants'
import review from './drill'
import { pickCheck, reviewPool, type ReviewCheck } from './select'

/** Setup, the timed session, and its result: store state, one route (see ReviewDrill). */
export type Phase = 'setup' | 'running' | 'finished'
export type PauseReason = 'menu' | 'away'

interface ReviewState {
  phase: Phase
  /** The settings this session runs on: the reader's (chapters, length). */
  settings: Settings
  /**
   * The check on screen, by id (`chapter/lesson/step`): the store keeps ids
   * only, so a session saved for a page load stays small. See `findCheck`.
   */
  checkId: string | null
  /** The answer to the check on screen, or null before it. */
  feedback: StepAnswer | null
  /** Checks asked this session, newest last: the last few are not asked again straight away. */
  recent: string[]
  endsAt: number | null
  askedAt: number
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  sumMs: number
  lastResult: SessionResult | null
  /** Check ids answered wrong this session, in order, for the result screen (kept with the live session, ids only). */
  misses: string[]
  /** When the clock was stopped, or null while it runs. Paused time is handed back on resume. */
  pausedAt: number | null
  pauseReason: PauseReason | null
  /** Starts a session on these settings; stays in setup when they leave nothing to ask. */
  start: (settings: Settings, now?: number) => void
  /** Records the answer to the check on screen (right or wrong, as the lesson judges it). */
  answer: (choice: number, correct: boolean, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: (now?: number) => void
  pause: (reason: PauseReason, now?: number) => void
  resume: (now?: number) => void
  /** Stops now: with answers, recorded as partial (its time counts); with none, back to setup. */
  endEarly: (now?: number) => void
}

/**
 * The checks a session asks from: finished lessons in the chosen chapters,
 * or in every chapter when none of the chosen ones has any left.
 */
export function sessionPool(settings: Pick<Settings, 'drills'>): ReviewCheck[] {
  const done = getLessonsDone()
  const chosen = reviewPool(CHAPTERS, done, review.of(settings).chapters)
  return chosen.length > 0 ? chosen : reviewPool(CHAPTERS, done, null)
}

/** Milliseconds actually played, paused time excluded. */
export function playedMs(s: Pick<ReviewState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return review.of(s.settings).durationSec * 1000 - left
}

/** The next check: weighted toward missed and long-unseen ones (see `pickCheck`). */
function next(settings: Settings, recent: readonly string[], now: number): string | null {
  return pickCheck(sessionPool(settings), getReviewMarks(), recent, now)?.id ?? null
}

function result(s: ReviewState, durationSec: number, now: number, partial: boolean): SessionResult {
  const total = s.correct + s.wrong
  return {
    drill: review.id, level: 1, accidentals: false, naming: s.settings.naming,
    durationSec,
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
    bestStreak: s.bestStreak, weight: REVIEW_DIFFICULTY,
    practiceScore: partial ? 0 : practiceScore(s.correct, s.wrong, REVIEW_DIFFICULTY, durationSec),
    at: new Date(now).toISOString(),
    ...(partial ? { partial: true as const } : {}),
  }
}

/** Records an unfinished session with answers as partial; returns it, or null when there were none. */
function recordPartial(s: ReviewState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const r = result(s, Math.max(1, Math.round(playedMs(s, now) / 1000)), now, true)
  recordSession(r)
  return r
}

const idle = { checkId: null, feedback: null, pausedAt: null, pauseReason: null } as const

export const useReviewStore = create<ReviewState>((set, get) => ({
  phase: 'setup',
  settings: getSettings(),
  checkId: null, feedback: null, recent: [],
  endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  lastResult: null, misses: [], pausedAt: null, pauseReason: null,

  start: (settings, now = Date.now()) => {
    // Starting over ends a session left paused; its played time still counts.
    recordPartial(get(), now)
    const checkId = next(settings, [], now)
    if (!checkId) {
      set({ phase: 'setup', ...idle })
      return
    }
    set({
      phase: 'running', settings, checkId, feedback: null, recent: [checkId],
      endsAt: now + review.of(settings).durationSec * 1000, askedAt: now,
      correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
      lastResult: null, misses: [], pausedAt: null, pauseReason: null,
    })
  },

  answer: (choice, correct, now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.checkId || s.feedback || s.pausedAt !== null) return
    recordReviewAnswer(s.checkId, correct, new Date(now))
    const streak = correct ? s.streak + 1 : 0
    set({
      feedback: { choice, correct },
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + (now - s.askedAt),
      misses: correct ? s.misses : [...s.misses, s.checkId],
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running') return
    const checkId = next(s.settings, s.recent, now)
    if (!checkId) return get().endEarly(now)
    set({
      checkId, feedback: null,
      recent: [...s.recent, checkId].slice(-REVIEW_NO_REPEAT),
      // A question that appears while paused is first seen on resume.
      askedAt: s.pausedAt ?? now,
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || s.pausedAt !== null || now < s.endsAt) return
    const r = result(s, review.of(s.settings).durationSec, now, false)
    recordSession(r)
    set({ phase: 'finished', lastResult: r, ...idle })
  },

  backToSetup: (now = Date.now()) => {
    recordPartial(get(), now)
    set({ phase: 'setup', ...idle })
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
    if (r) set({ phase: 'finished', lastResult: r, ...idle })
    else set({ phase: 'setup', ...idle })
  },
}))

// A running session survives a page load (refresh, a typed URL): see app/liveSession.
keepLiveSession(useReviewStore, review.id, review.route)
