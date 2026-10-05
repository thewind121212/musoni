import { create } from 'zustand'
import { generateEarQuestion, type EarLevel, type EarQuestion } from './generator'
import type { Clef, Pitch } from '../../core/music/types'
import { accuracy, practiceScore } from '../../core/scoring'
import { getSettings, recordSession, type Settings, type SessionResult } from '../../progress/progressStore'
import { EAR_LEVELS } from '../../config/constants'
import { keepLiveSession } from '../../app/liveSession'
import hearPlay, { type HearPlayOptions } from './drill'
import type { DrillSettings } from '../../app/drill'

/** This drill's workout (level, length, listening aids) from the settings a session runs on. */
const own = (s: Settings) => hearPlay.of(s)

/**
 * Nghe & Đàn: one route, three phases, like the note-id drill. `setup` picks
 * the level and length, `running` is the timed session, `finished` the result.
 * Phases are store state, never routes.
 */
export type Phase = 'setup' | 'running' | 'finished'
export type PauseReason = 'menu' | 'away'

/** One wrong answer, kept for the result screen's notes to review. */
export interface Miss {
  clef: Clef
  pitch: Pitch
  /** Key labels as the reader saw them. */
  answer: string
  chosen: string
}

interface EarState {
  phase: Phase
  level: EarLevel
  /** The settings this session runs on: the reader's, or a preset laid over them. */
  settings: Settings
  question: EarQuestion | null
  /** Questions asked in the current key, the current one included. */
  inKey: number
  endsAt: number | null
  /** When the note to find sounds (after the cadence, if one plays). The answer clock starts here. */
  askedAt: number
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  sumMs: number
  feedback: { correctIndex: number; chosenIndex: number; correct: boolean } | null
  lastResult: SessionResult | null
  /** This session's misses, for the result screen. Not persisted. */
  misses: Miss[]
  /** When the clock was stopped, or null while it runs. */
  pausedAt: number | null
  pauseReason: PauseReason | null
  /** Starts a session on these settings (this drill's level and length are read from them). */
  start: (settings: Settings, now?: number) => void
  /** The page tells the store when the current note sounds, once it has scheduled it. */
  heard: (at: number) => void
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
export function playedMs(s: Pick<EarState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return own(s.settings).durationSec * 1000 - left
}

/** A listening aid is on. One key changes nothing at level 1, which is C only. */
export function aidsOn(s: Pick<DrillSettings<HearPlayOptions>, 'cadenceEach' | 'oneKey'>, level: EarLevel) {
  return s.cadenceEach || (s.oneKey && level > 1)
}

function result(s: EarState, durationSec: number, score: number, now: number, partial: boolean): SessionResult {
  const total = s.correct + s.wrong
  return {
    drill: 'hear-play', level: s.level,
    accidentals: EAR_LEVELS[s.level].blackKeys, naming: s.settings.naming,
    durationSec,
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
    bestStreak: s.bestStreak, weight: EAR_LEVELS[s.level].weight,
    practiceScore: score,
    at: new Date(now).toISOString(),
    ...(partial ? { partial: true as const } : {}),
    ...(aidsOn(own(s.settings), s.level) ? { aids: true as const } : {}),
  }
}

/** Records an unfinished session with answers as partial; returns it, or null when there were none. */
function recordPartial(s: EarState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const r = result(s, Math.max(1, Math.round(playedMs(s, now) / 1000)), 0, now, true)
  recordSession(r)
  return r
}

const cleared = { question: null, feedback: null, pausedAt: null, pauseReason: null }

export const useEarStore = create<EarState>((set, get) => ({
  phase: 'setup',
  level: 1,
  settings: getSettings(),
  question: null, inKey: 0, endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,

  start: (settings, now = Date.now()) => {
    // Starting over ends a session left paused; its played time still counts.
    recordPartial(get(), now)
    const { level: l, durationSec, oneKey } = own(settings)
    const level = l as EarLevel
    set({
      phase: 'running', level, settings,
      question: generateEarQuestion(level, settings.naming, null, Math.random, { oneKey }), inKey: 1,
      endsAt: now + durationSec * 1000, askedAt: now,
      correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
      feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
    })
  },

  heard: at => {
    if (get().phase === 'running') set({ askedAt: at })
  },

  answer: (index, now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.question || s.feedback || s.pausedAt !== null) return
    const q = s.question
    const ok = index === q.correctIndex
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      // Answering before the note has sounded (during the cadence) counts as instant.
      sumMs: s.sumMs + Math.max(0, now - s.askedAt),
      feedback: { correctIndex: q.correctIndex, chosenIndex: index, correct: ok },
      misses: ok ? s.misses : [...s.misses, {
        clef: 'treble',
        pitch: q.pitch,
        answer: q.options[q.correctIndex].label,
        chosen: q.options[index].label,
      }],
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.question) return
    const question = generateEarQuestion(s.level, s.settings.naming, {
      key: s.question.key, semitones: s.question.semitones, inKey: s.inKey,
    }, Math.random, { oneKey: own(s.settings).oneKey })
    // The page sets the real start once it schedules the note; until then
    // (or while paused) the clock starts here.
    set({ feedback: null, question, inKey: question.newKey ? 1 : s.inKey + 1, askedAt: s.pausedAt ?? now })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || s.pausedAt !== null || now < s.endsAt) return
    const duration = own(s.settings).durationSec
    const weight = EAR_LEVELS[s.level].weight
    const r = result(s, duration, practiceScore(s.correct, s.wrong, weight, duration), now, false)
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
keepLiveSession(useEarStore, hearPlay.id, hearPlay.route)
