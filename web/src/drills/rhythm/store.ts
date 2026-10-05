import { create } from 'zustand'
import { generateMeasure, pulseOf, type RhythmLevel, type RhythmMeasure } from './generator'
import { judgeTaps, type Judgement } from './judge'
import { accuracy, practiceScore } from '@/core/scoring'
import { getSettings, recordSession, type Settings, type SessionResult } from '@/progress/progressStore'
import { RHYTHM_LEVELS } from '@/config/constants'
import { keepLiveSession } from '@/app/liveSession'
import rhythm from './drill'

/** This drill's workout (level, length, tempo, click, latency) from the settings a session runs on. */
const own = (s: Settings) => rhythm.of(s)

/**
 * Tiết tấu: one route, three phases, like the other drills. `setup` picks the
 * level, tempo and length, `running` is the timed session, `finished` the
 * result. Phases are store state, never routes.
 *
 * A measure is played in a **take**: the page shows it, counts in, and
 * collects the taps on the audio clock; `judge` closes the take. Pausing or
 * leaving mid-take drops it uncounted, and the same measure is played again
 * on resume. Time running out mid-take lets that measure finish and count:
 * the session ends between measures.
 */
export type Phase = 'setup' | 'running' | 'finished'
export type PauseReason = 'menu' | 'away'

/** A measure tapped wrong, kept for the result screen. */
export interface Miss {
  measure: RhythmMeasure
  judgement: Judgement
}

interface RhythmState {
  phase: Phase
  level: RhythmLevel
  /** The settings this session runs on: the reader's, or a preset laid over them. */
  settings: Settings
  question: RhythmMeasure | null
  endsAt: number | null
  /** When the current take began (wall clock), while it runs; null between takes. */
  takeAt: number | null
  /** Measures right (every note on time, no extra tap) and wrong. */
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  /** Sum of the paired taps' distance from their notes (ms), and how many, for the average. */
  offsetSum: number
  offsetCount: number
  /** The last measure's marks while they show, before the next measure. */
  feedback: Judgement | null
  lastResult: SessionResult | null
  /** This session's wrong measures, for the result screen. Not persisted. */
  misses: Miss[]
  pausedAt: number | null
  pauseReason: PauseReason | null
  /** Starts a session on these settings (this drill's level, tempo and length are read from them). */
  start: (settings: Settings, now?: number) => void
  /** The page starts playing the measure (count-in first). False when it should not: paused, judged, or time is up (which ends the session). */
  beginTake: (now?: number) => boolean
  /**
   * Closes the take with its taps, in ms from the downbeat on the audio
   * clock. The calibrated latency is taken off each before judging.
   */
  judge: (taps: readonly number[], now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: (now?: number) => void
  pause: (reason: PauseReason, now?: number) => void
  resume: (now?: number) => void
  /** Stops now: recorded as partial with measures judged, back to setup without. */
  endEarly: (now?: number) => void
}

/** Milliseconds the session has actually been played, paused time excluded. */
export function playedMs(s: Pick<RhythmState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return own(s.settings).durationSec * 1000 - left
}

/** The current measure's timing at the session's tempo: onsets and length in ms, the tolerance. */
export function measureTiming(measure: RhythmMeasure, settings: Settings, level: RhythmLevel) {
  const pulse = pulseOf(measure.meter, own(settings).tempo)
  return {
    pulse,
    onsetsMs: measure.onsets.map(t => t * pulse.tickMs),
    lengthMs: measure.length * pulse.tickMs,
    toleranceMs: RHYTHM_LEVELS[level].toleranceMs,
  }
}

function result(s: RhythmState, durationSec: number, score: number, now: number, partial: boolean): SessionResult {
  return {
    drill: rhythm.id, level: s.level, accidentals: false, naming: s.settings.naming,
    durationSec,
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    // For this drill: how far the taps landed from their notes, on average.
    avgMs: s.offsetCount === 0 ? 0 : Math.round(s.offsetSum / s.offsetCount),
    bestStreak: s.bestStreak, weight: RHYTHM_LEVELS[s.level].weight,
    practiceScore: score,
    at: new Date(now).toISOString(),
    ...(partial ? { partial: true as const } : {}),
  }
}

/** Records an unfinished session with measures judged as partial; returns it, or null when there were none. */
function recordPartial(s: RhythmState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const r = result(s, Math.max(1, Math.round(playedMs(s, now) / 1000)), 0, now, true)
  recordSession(r)
  return r
}

const cleared = { question: null, feedback: null, takeAt: null, pausedAt: null, pauseReason: null }

export const useRhythmStore = create<RhythmState>((set, get) => {
  /** The clock ran out: record the full session and show the result. */
  const finish = (now: number) => {
    const s = get()
    const duration = own(s.settings).durationSec
    const r = result(s, duration, practiceScore(s.correct, s.wrong, RHYTHM_LEVELS[s.level].weight, duration), now, false)
    recordSession(r)
    set({ phase: 'finished', lastResult: r, ...cleared })
  }
  const timeUp = (s: RhythmState, now: number) => s.endsAt !== null && s.pausedAt === null && now >= s.endsAt

  return {
    phase: 'setup',
    level: 1,
    settings: getSettings(),
    question: null, endsAt: null, takeAt: null,
    correct: 0, wrong: 0, streak: 0, bestStreak: 0, offsetSum: 0, offsetCount: 0,
    feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,

    start: (settings, now = Date.now()) => {
      // Starting over ends a session left paused; its played time still counts.
      recordPartial(get(), now)
      const { level: l, durationSec } = own(settings)
      const level = l as RhythmLevel
      set({
        phase: 'running', level, settings,
        question: generateMeasure(level), endsAt: now + durationSec * 1000, takeAt: null,
        correct: 0, wrong: 0, streak: 0, bestStreak: 0, offsetSum: 0, offsetCount: 0,
        feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
      })
    },

    beginTake: (now = Date.now()) => {
      const s = get()
      if (s.phase !== 'running' || !s.question || s.feedback || s.pausedAt !== null) return false
      if (timeUp(s, now)) {
        finish(now)
        return false
      }
      set({ takeAt: now })
      return true
    },

    judge: taps => {
      const s = get()
      if (s.phase !== 'running' || !s.question || s.feedback || s.pausedAt !== null || s.takeAt === null) return
      const latency = own(s.settings).latencyMs ?? 0
      const { onsetsMs, lengthMs, toleranceMs } = measureTiming(s.question, s.settings, s.level)
      const j = judgeTaps(onsetsMs, taps.map(t => t - latency), toleranceMs, lengthMs)
      const paired = j.notes.filter(n => n.offsetMs !== null)
      const streak = j.correct ? s.streak + 1 : 0
      set({
        takeAt: null,
        feedback: j,
        correct: s.correct + (j.correct ? 1 : 0),
        wrong: s.wrong + (j.correct ? 0 : 1),
        streak, bestStreak: Math.max(s.bestStreak, streak),
        offsetSum: s.offsetSum + paired.reduce((sum, n) => sum + Math.abs(n.offsetMs!), 0),
        offsetCount: s.offsetCount + paired.length,
        misses: j.correct ? s.misses : [...s.misses, { measure: s.question, judgement: j }],
      })
    },

    nextQuestion: (now = Date.now()) => {
      const s = get()
      if (s.phase !== 'running' || !s.question) return
      if (timeUp(s, now)) return finish(now)
      set({ feedback: null, takeAt: null, question: generateMeasure(s.level, s.question.notation) })
    },

    tick: (now = Date.now()) => {
      const s = get()
      // A measure being played or marked finishes first: the session ends between measures.
      if (s.phase !== 'running' || !timeUp(s, now) || s.takeAt !== null || s.feedback !== null) return
      finish(now)
    },

    backToSetup: (now = Date.now()) => {
      recordPartial(get(), now)
      set({ phase: 'setup', ...cleared })
    },

    pause: (reason, now = Date.now()) => {
      const s = get()
      if (s.phase !== 'running' || s.pausedAt !== null) return
      // A take cut off by the pause is dropped; the measure is played again on resume.
      set({ pausedAt: now, pauseReason: reason, takeAt: null })
    },

    resume: (now = Date.now()) => {
      const s = get()
      if (s.phase !== 'running' || s.pausedAt === null || s.endsAt === null) return
      set({ pausedAt: null, pauseReason: null, takeAt: null, endsAt: s.endsAt + (now - s.pausedAt) })
    },

    endEarly: (now = Date.now()) => {
      const s = get()
      if (s.phase !== 'running') return
      const r = recordPartial(s, now)
      if (r) set({ phase: 'finished', lastResult: r, ...cleared })
      else set({ phase: 'setup', ...cleared })
    },
  }
})

// A running session survives a page load (refresh, a typed URL): see app/liveSession.
keepLiveSession(useRhythmStore, rhythm.id, rhythm.route)
