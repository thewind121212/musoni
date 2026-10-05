import { create } from 'zustand'
import { markLessonDone, recordLessonTime } from '@/progress/progressStore'
import { THEORY_IDLE_CAP_MS, THEORY_MIN_RECORD_SEC } from '@/config/constants'

/** How a check was answered: the choice index (or pad key index) and whether it was right. */
export interface Answer {
  choice: number
  correct: boolean
}

interface TheoryState {
  /** The open lesson's key (`chapter/lesson`), or null. */
  lesson: string | null
  /** Steps in the open lesson. */
  steps: number
  /** The step shown, from 0; equal to `steps` on the end screen. */
  step: number
  /** Answers to the checks so far, by step. */
  answers: Record<number, Answer>
  /** The last tap while the page is in view; null while hidden or closed. */
  activeAt: number | null
  /** Time in lessons not yet saved, in ms. */
  pendingMs: number
  /** The chapter expanded on the chapter list. */
  openChapter: string | null

  /**
   * Shows a lesson. The same lesson keeps its place: coming back from its
   * practice drill shows the end screen again, and reopening one left
   * mid-way resumes it. `fresh` (a new visit, not a step back) starts a
   * finished lesson over.
   */
  open: (key: string, steps: number, fresh: boolean, now?: number) => void
  /** Records the answer to the current step's check, once. */
  answer: (choice: number, correct: boolean, now?: number) => void
  /** Moves on; past the last step the lesson is finished and saved. */
  next: (now?: number) => void
  /** The page went out of view: stop the clock and save the time. */
  hide: (now?: number) => void
  show: (now?: number) => void
  /** Left the lesson (✕): save the time and forget the place. */
  close: (now?: number) => void
  /** Left the lesson another way (back, a link): save the time, keep the place. */
  leave: (now?: number) => void
  setOpenChapter: (id: string | null) => void
}

/** Time since the last tap, capped so a lesson left open does not count as study. */
function stretch(s: Pick<TheoryState, 'activeAt'>, now: number): number {
  return s.activeAt === null ? 0 : Math.min(Math.max(0, now - s.activeAt), THEORY_IDLE_CAP_MS)
}

/** Saves the pending time under the lesson when there is enough of it; returns what stays pending. */
function flush(lesson: string | null, pendingMs: number, now: number): number {
  const seconds = Math.round(pendingMs / 1000)
  if (!lesson || seconds < THEORY_MIN_RECORD_SEC) return pendingMs
  recordLessonTime({ lesson, seconds, at: new Date(now).toISOString() })
  return 0
}

/**
 * The theory module's store: the lesson player's place (step, answers) and
 * the time spent reading, which counts toward the day's minutes and streak.
 * Finished lessons and time are saved through progressStore.
 */
export const useTheoryStore = create<TheoryState>((set, get) => ({
  lesson: null, steps: 0, step: 0, answers: {}, activeAt: null, pendingMs: 0, openChapter: null,

  open: (key, steps, fresh, now = Date.now()) => {
    const s = get()
    const keep = s.lesson === key && s.steps === steps && !(fresh && s.step >= steps)
    set(keep
      ? { activeAt: now }
      : { lesson: key, steps, step: 0, answers: {}, activeAt: now })
  },

  answer: (choice, correct, now = Date.now()) => {
    const s = get()
    if (!s.lesson || s.step >= s.steps || s.answers[s.step]) return
    set({
      answers: { ...s.answers, [s.step]: { choice, correct } },
      pendingMs: s.pendingMs + stretch(s, now),
      activeAt: s.activeAt === null ? null : now,
    })
  },

  next: (now = Date.now()) => {
    const s = get()
    if (!s.lesson || s.step >= s.steps) return
    const step = s.step + 1
    let pendingMs = s.pendingMs + stretch(s, now)
    if (step === s.steps) {
      const answers = Object.values(s.answers)
      markLessonDone(s.lesson, { correct: answers.filter(a => a.correct).length, total: answers.length }, new Date(now))
      pendingMs = flush(s.lesson, pendingMs, now)
    }
    set({ step, pendingMs, activeAt: s.activeAt === null ? null : now })
  },

  hide: (now = Date.now()) => {
    const s = get()
    set({ pendingMs: flush(s.lesson, s.pendingMs + stretch(s, now), now), activeAt: null })
  },

  show: (now = Date.now()) => {
    if (get().lesson) set({ activeAt: now })
  },

  close: (now = Date.now()) => {
    const s = get()
    set({
      pendingMs: flush(s.lesson, s.pendingMs + stretch(s, now), now),
      activeAt: null, lesson: null, steps: 0, step: 0, answers: {},
    })
  },

  leave: (now = Date.now()) => {
    const s = get()
    set({ pendingMs: flush(s.lesson, s.pendingMs + stretch(s, now), now), activeAt: null })
  },

  setOpenChapter: openChapter => set({ openChapter }),
}))
