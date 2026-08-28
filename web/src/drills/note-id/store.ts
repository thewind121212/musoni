import { create } from 'zustand'
import { generateQuestion, type Question } from './generator'
import { difficultyWeight, practiceScore, accuracy } from '../../core/scoring'
import { recordSession, type Settings, type SessionResult } from '../../progress/progressStore'
import { SESSION_SECONDS } from '../../config/constants'

interface DrillState {
  status: 'idle' | 'running' | 'finished'
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
  feedback: { correctIndex: number; chosenIndex: number } | null
  lastResult: SessionResult | null
  start: (level: 1 | 2 | 3 | 4, settings: Settings, now?: number) => void
  answer: (index: number, now?: number) => void
  nextQuestion: (now?: number) => void
  tick: (now?: number) => void
}

export const useDrillStore = create<DrillState>((set, get) => ({
  status: 'idle', level: 1,
  settings: { naming: 'letters', accidentals: false, sound: true },
  question: null, endsAt: null, askedAt: 0,
  correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
  feedback: null, lastResult: null,

  start: (level, settings, now = Date.now()) => set({
    status: 'running', level, settings,
    question: generateQuestion(level, settings.accidentals, settings.naming),
    endsAt: now + SESSION_SECONDS * 1000, askedAt: now,
    correct: 0, wrong: 0, streak: 0, bestStreak: 0, sumMs: 0,
    feedback: null, lastResult: null,
  }),

  answer: (index, now = Date.now()) => {
    const s = get()
    if (s.status !== 'running' || !s.question || s.feedback) return
    const ok = index === s.question.correctIndex
    const streak = ok ? s.streak + 1 : 0
    set({
      correct: s.correct + (ok ? 1 : 0),
      wrong: s.wrong + (ok ? 0 : 1),
      streak, bestStreak: Math.max(s.bestStreak, streak),
      sumMs: s.sumMs + (now - s.askedAt),
      feedback: { correctIndex: s.question.correctIndex, chosenIndex: index },
    })
  },

  nextQuestion: (now = Date.now()) => {
    const s = get()
    if (s.status !== 'running') return
    set({
      feedback: null, askedAt: now,
      question: generateQuestion(s.level, s.settings.accidentals, s.settings.naming),
    })
  },

  tick: (now = Date.now()) => {
    const s = get()
    if (s.status !== 'running' || s.endsAt === null || now < s.endsAt) return
    const total = s.correct + s.wrong
    const weight = difficultyWeight(s.level, s.settings.accidentals)
    const result: SessionResult = {
      drill: 'note-id', level: s.level,
      accidentals: s.settings.accidentals, naming: s.settings.naming,
      correct: s.correct, wrong: s.wrong,
      accuracy: accuracy(s.correct, s.wrong),
      avgMs: total === 0 ? 0 : Math.round(s.sumMs / total),
      bestStreak: s.bestStreak, weight,
      practiceScore: practiceScore(s.correct, s.wrong, weight),
      at: new Date(now).toISOString(),
    }
    recordSession(result)
    set({ status: 'finished', lastResult: result, question: null, feedback: null })
  },
}))
