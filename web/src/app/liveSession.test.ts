import { beforeEach, describe, it, expect } from 'vitest'
import { create } from 'zustand'
import { keepLiveSession, restoreLiveSession } from './liveSession'
import { getLiveSession, saveLiveSession } from '@/progress/progressStore'
import { LIVE_SESSION_MAX_AGE_MS } from '@/config/constants'

interface Fake {
  phase: 'setup' | 'running' | 'finished'
  endsAt: number | null
  pausedAt: number | null
  pauseReason: 'menu' | 'away' | null
  correct: number
  wrong: number
  feedback: { correct: boolean } | null
  question: number
  setupAt: number | null
  nextQuestion: (now?: number) => void
  backToSetup: (now?: number) => void
}

const T0 = 1_000_000
const summary = { to: '/train/x', secondsLeft: 50, correct: 2, wrong: 1 }
const running = { phase: 'running' as const, endsAt: T0 + 60_000, pausedAt: null, pauseReason: null, correct: 2, wrong: 1, feedback: null, question: 7 }

const makeStore = () => create<Fake>((set, get) => ({
  phase: 'setup', endsAt: null, pausedAt: null, pauseReason: null, correct: 0, wrong: 0, feedback: null, question: 0, setupAt: null,
  nextQuestion: () => set({ feedback: null, question: get().question + 1 }),
  backToSetup: now => set({ phase: 'setup', setupAt: now ?? null }),
}))

beforeEach(() => localStorage.clear())

describe('keepLiveSession', () => {
  it('saves the session while it runs, with what home shows, and forgets it once it ends', () => {
    const store = makeStore()
    keepLiveSession(store, 'note-id', '/train/note-id')
    store.setState({ ...running, pausedAt: T0 + 10_000 })
    expect(getLiveSession('note-id')!.state).toMatchObject({ phase: 'running', correct: 2, question: 7 })
    expect(getLiveSession('note-id')!.summary).toEqual({ to: '/train/note-id', secondsLeft: 50, correct: 2, wrong: 1 })
    store.setState({ phase: 'finished' })
    expect(getLiveSession('note-id')).toBeNull()
  })
})

describe('restoreLiveSession', () => {
  it('brings a saved session back paused, as when the reader left the page', () => {
    saveLiveSession('note-id', { ...running, pausedAt: T0 + 5_000, pauseReason: 'away' }, summary, T0 + 5_000)
    const store = makeStore()
    restoreLiveSession(store, 'note-id', T0 + 60_000)
    expect(store.getState()).toMatchObject({ phase: 'running', correct: 2, question: 7, pausedAt: T0 + 5_000, pauseReason: 'away' })
  })

  it('stops a clock that was saved running (the page died without hiding) where it was saved', () => {
    saveLiveSession('note-id', running, summary, T0 + 8_000)
    const store = makeStore()
    restoreLiveSession(store, 'note-id', T0 + 60_000)
    expect(store.getState()).toMatchObject({ pausedAt: T0 + 8_000, pauseReason: 'away' })
  })

  it('moves on from a question already answered, so it is not answered twice', () => {
    saveLiveSession('note-id', { ...running, feedback: { correct: true } }, summary, T0)
    const store = makeStore()
    restoreLiveSession(store, 'note-id', T0 + 1_000)
    expect(store.getState()).toMatchObject({ feedback: null, question: 8 })
  })

  it('ends a session older than the limit as at the moment it stopped, and forgets it', () => {
    saveLiveSession('note-id', { ...running, pausedAt: T0 + 5_000 }, summary, T0 + 5_000)
    const store = makeStore()
    restoreLiveSession(store, 'note-id', T0 + 5_000 + LIVE_SESSION_MAX_AGE_MS + 1)
    expect(store.getState()).toMatchObject({ phase: 'setup', setupAt: T0 + 5_000 })
    expect(getLiveSession('note-id')).toBeNull()
  })

  it('does nothing without a saved session', () => {
    const store = makeStore()
    restoreLiveSession(store, 'note-id', T0)
    expect(store.getState().phase).toBe('setup')
  })
})
