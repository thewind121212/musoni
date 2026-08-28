import { create } from 'zustand'
import { generateQuestion, type Question } from './generator'
import { difficultyWeight, practiceScore, accuracy } from '../../core/scoring'
import { getSettings, recordSession, type Settings, type SessionResult } from '../../progress/progressStore'

/**
 * The note-id drill is a self-contained SPA: one route, three phases.
 * `setup` picks level + settings, `running` is the sprint, `finished` shows the
 * result. Phases are store state, not routes, so nothing about the training
 * flow touches the URL or the browser history.
 */
export type Phase = 'setup' | 'running' | 'finished'

interface DrillState {
  phase: Phase
  level: 1 | 2 | 3 | 4
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
  start: (level: 1 | 2 | 3 | 4, settings: Settings, now?: number) => void
  answer: (index: number, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
  backToSetup: () => void
}

export const useDrillStore = create<DrillState>((set, get) => ({
  phase: 'setup',
  level: 1,
  settings: getSettings(),
  question: null, endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  feedback: null, lastResult: null,

  start: (level, settings, now = Date.now()) => set({
    phase: 'running', level, settings,
    question: generateQuestion(level, settings.accidentals, settings.naming),
    endsAt: now + settings.durationSec * 1000, askedAt: now,
    correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
    feedback: null, lastResult: null,
  }),

  answer: (index, now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || !s.question || s.feedback) return
    const ok = index === s.question.correctIndex
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + (now - s.askedAt),
      feedback: { correctIndex: s.question.correctIndex, chosenIndex: index, correct: ok },
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running') return
    set({
      feedback: null, askedAt: now,
      question: generateQuestion(
        s.level, s.settings.accidentals, s.settings.naming, undefined, s.question?.pitch,
      ),
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.phase !== 'running' || s.endsAt === null || now < s.endsAt) return
    const total = s.correct + s.wrong
    const weight = difficultyWeight(s.level, s.settings.accidentals)
    const result: SessionResult = {
      drill: 'note-id', level: s.level,
      accidentals: s.settings.accidentals, naming: s.settings.naming,
      durationSec: s.settings.durationSec,
      correct: s.correct, wrong: s.wrong,
      accuracy: accuracy(s.correct, s.wrong),
      avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
      bestStreak: s.bestStreak, weight,
      practiceScore: practiceScore(s.correct, s.wrong, weight, s.settings.durationSec),
      at: new Date(now).toISOString(),
    }
    recordSession(result)
    set({ phase: 'finished', lastResult: result, question: null, feedback: null })
  },

  backToSetup: () => set({ phase: 'setup', question: null, feedback: null }),
}))
