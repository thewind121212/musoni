import { create } from 'zustand'
import { generateQuestion, type Question } from './generator'
import type { Clef, Pitch } from '../../core/music/types'
import { difficultyWeight, practiceScore, accuracy } from '../../core/scoring'
import { getSettings, recordSession, type Settings, type SessionResult } from '../../progress/progressStore'
import { keepLiveSession } from '../../app/liveSession'
import noteId from './drill'
import type { NoteIdLevel } from './strings'

/** This drill's workout (level, length, accidentals) from the settings a session runs on. */
const own = (s: Settings) => noteId.of(s)

/**
 * The note-id drill is a self-contained SPA: one route, three phases.
 * `setup` picks level + settings, `running` is the sprint, `finished` shows the
 * result. Phases are store state, not routes, so the training flow never
 * touches the URL. (The drill page mirrors the session onto one history entry
 * so back works inside the drill; see NoteIdDrill.)
 */
export type Phase = 'setup' | 'running' | 'finished'

/** One wrong answer, kept for the result screen's notes-to-review list. */
export interface Miss {
  clef: Clef
  pitch: Pitch
  /** Key labels as the reader saw them, in their chosen naming. */
  answer: string
  chosen: string
}

interface DrillState {
  phase: Phase
  level: NoteIdLevel
  /** The settings this session runs on: the reader's, or a preset laid over them. */
  settings: Settings
  question: Question | null
  endsAt: number | null
  askedAt: number
  correct: number
  wrong: number
  streak: number
  bestStreak: number
  sumMs: number
  feedback: { correctIndex: number; chosenIndex: number; correct: boolean } | null
  lastResult: SessionResult | null
  /** This session's misses, in order. Kept after finishing for the result screen; not persisted. */
  misses: Miss[]
  /**
   * When the clock was stopped, or null while it runs. Paused time is handed
   * back on resume, so a session only ever counts time spent practising.
   */
  pausedAt: number | null
  /** `menu`: the reader asked (quit, Esc). `away`: the page was hidden or left. */
  pauseReason: PauseReason | null
  /** Starts a session on these settings (this drill's level and length are read from them). */
  start: (settings: Settings, now?: number) => void
  answer: (index: number, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: (now?: number) => void
  pause: (reason: PauseReason, now?: number) => void
  resume: (now?: number) => void
  /**
   * Stops the session now. With answers it is recorded as `partial` (its time
   * counts, its score does not) and shown as ended early; with none there is
   * nothing to keep, and it returns to setup.
   */
  endEarly: (now?: number) => void
}

export type PauseReason = 'menu' | 'away'

/** Milliseconds the session has actually been played, paused time excluded. */
export function playedMs(s: Pick<DrillState, 'endsAt' | 'pausedAt' | 'settings'>, now = Date.now()) {
  if (s.endsAt === null) return 0
  const left = Math.max(0, s.endsAt - (s.pausedAt ?? now))
  return own(s.settings).durationSec * 1000 - left
}

/** Records an unfinished session with answers as partial; returns it, or null when there were none. */
function recordPartial(s: DrillState, now: number): SessionResult | null {
  if (s.phase !== 'running' || s.correct + s.wrong === 0) return null
  const total = s.correct + s.wrong
  const result: SessionResult = {
    drill: 'note-id', level: s.level,
    accidentals: own(s.settings).accidentals, naming: s.settings.naming,
    durationSec: Math.max(1, Math.round(playedMs(s, now) / 1000)),
    correct: s.correct, wrong: s.wrong,
    accuracy: accuracy(s.correct, s.wrong),
    avgMs: Math.round(s.sumMs / total),
    bestStreak: s.bestStreak, weight: difficultyWeight(s.level, own(s.settings).accidentals),
    practiceScore: 0,
    at: new Date(now).toISOString(),
    partial: true,
  }
  recordSession(result)
  return result
}

export const useDrillStore = create<DrillState>((set, get) => ({
  phase: 'setup',
  level: 1,
  settings: getSettings(),
  question: null, endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,

  start: (settings, now = Date.now()) => {
    // Starting over ends a session left paused; its played time still counts.
    recordPartial(get(), now)
    const { level: l, durationSec, accidentals } = own(settings)
    const level = l as NoteIdLevel
    set({
      phase: 'running', level, settings,
      question: generateQuestion(level, accidentals, settings.naming),
      endsAt: now + durationSec * 1000, askedAt: now,
      correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
      feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
    })
  },

  answer: (index, now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.question || s.feedback || s.pausedAt !== null) return
    const ok = index === s.question.correctIndex
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + (now - s.askedAt),
      feedback: { correctIndex: s.question.correctIndex, chosenIndex: index, correct: ok },
      misses: ok ? s.misses : [...s.misses, {
        clef: s.question.clef,
        pitch: s.question.pitch,
        answer: s.question.options[s.question.correctIndex].label,
        chosen: s.question.options[index].label,
      }],
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running') return
    set({
      // A question that appears while paused is first seen on resume, and
      // resume shifts askedAt by the pause, so start its clock at the pause.
      feedback: null, askedAt: s.pausedAt ?? now,
      question: generateQuestion(
        s.level, own(s.settings).accidentals, s.settings.naming, undefined, s.question?.pitch,
      ),
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || s.pausedAt !== null || now < s.endsAt) return
    const total = s.correct + s.wrong
    const { accidentals, durationSec } = own(s.settings)
    const weight = difficultyWeight(s.level, accidentals)
    const result: SessionResult = {
      drill: 'note-id', level: s.level,
      accidentals, naming: s.settings.naming,
      durationSec,
      correct: s.correct, wrong: s.wrong,
      accuracy: accuracy(s.correct, s.wrong),
      avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
      bestStreak: s.bestStreak, weight,
      practiceScore: practiceScore(s.correct, s.wrong, weight, durationSec),
      at: new Date(now).toISOString(),
    }
    recordSession(result)
    set({ phase: 'finished', lastResult: result, question: null, feedback: null })
  },

  backToSetup: (now = Date.now()) => {
    // Leaving for setup ends a session left paused; its played time still counts.
    recordPartial(get(), now)
    set({ phase: 'setup', question: null, feedback: null, pausedAt: null, pauseReason: null })
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
    const result = recordPartial(s, now)
    if (result) {
      set({ phase: 'finished', lastResult: result, question: null, feedback: null, pausedAt: null, pauseReason: null })
    } else {
      set({ phase: 'setup', question: null, feedback: null, pausedAt: null, pauseReason: null })
    }
  },
}))

// A running session survives a page load (refresh, a typed URL): see app/liveSession.
keepLiveSession(useDrillStore, noteId.id, noteId.route)
