import { useAppStore } from '@/app/store'
import { useDrillStore } from '@/drills/note-id/store'
import { useEarStore } from '@/drills/hear-play/store'
import { getSettings, localDayKey, type SessionResult, type Settings } from '@/progress/progressStore'

/** Empties saved progress and puts the stores back to a fresh start, with optional settings. */
export function resetStores(settings: Partial<Settings> = {}) {
  localStorage.clear()
  useAppStore.setState({ settings: { ...getSettings(), ...settings }, pausedSession: null })
  useDrillStore.setState({
    phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
  })
  useEarStore.setState({
    phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null,
  })
}

/** A finished note-id session, played today unless `at` says otherwise. */
export function session(overrides: Partial<SessionResult> = {}): SessionResult {
  return {
    drill: 'note-id', level: 1, accidentals: false, naming: 'letters', durationSec: 60,
    correct: 20, wrong: 2, accuracy: 0.91, avgMs: 1200, bestStreak: 9, weight: 1,
    practiceScore: 30, at: `${localDayKey(new Date())}T09:00:00`,
    ...overrides,
  }
}
