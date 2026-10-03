import type { StoreApi } from 'zustand'
import { clearLiveSession, getLiveSession, saveLiveSession, type DrillId } from '@/progress/progressStore'
import { LIVE_SESSION_MAX_AGE_MS } from '@/config/constants'

/** What a drill's session store has, as far as keeping a session across page loads goes. */
export interface LiveFields {
  phase: string
  endsAt: number | null
  pausedAt: number | null
  pauseReason: string | null
  correct: number
  wrong: number
  feedback: unknown
  nextQuestion: (now?: number) => void
  backToSetup: (now?: number) => void
}

type Store<S> = Pick<StoreApi<S>, 'getState' | 'setState' | 'subscribe'>

/**
 * Brings back the session a page load (refresh, a typed URL, a crash) cut off,
 * paused as if the reader had left the page, so the drill greets them back.
 * Older than `LIVE_SESSION_MAX_AGE_MS`, it is ended as at the moment it
 * stopped (its played time counts) and forgotten.
 */
export function restoreLiveSession<S extends LiveFields>(store: Store<S>, drill: DrillId, now = Date.now()) {
  const live = getLiveSession<S>(drill)
  if (!live || live.state.phase !== 'running') return clearLiveSession(drill)
  // Leaving the page pauses first, so this is normally set. A page that died
  // without hiding saved a running clock: stop it where it was saved.
  const pausedAt = live.state.pausedAt ?? live.savedAt
  store.setState({ ...live.state, pausedAt, pauseReason: 'away' })
  const s = store.getState()
  if (now - pausedAt > LIVE_SESSION_MAX_AGE_MS) {
    clearLiveSession(drill)
    return s.backToSetup(pausedAt)
  }
  // An answered question was counted; showing it again would count it twice.
  if (s.feedback) s.nextQuestion(pausedAt)
}

/**
 * Keeps a drill's running session in storage (through progressStore) on every
 * change, and brings it back on load. Call once, right after creating the
 * drill's store; `to` is the drill's route, for home's paused-session bar.
 */
export function keepLiveSession<S extends LiveFields>(store: Store<S>, drill: DrillId, to: string) {
  restoreLiveSession(store, drill)
  store.subscribe(s => {
    if (s.phase !== 'running' || s.endsAt === null) return clearLiveSession(drill)
    const now = Date.now()
    saveLiveSession(drill, s, {
      to,
      secondsLeft: Math.max(0, Math.ceil((s.endsAt - (s.pausedAt ?? now)) / 1000)),
      correct: s.correct,
      wrong: s.wrong,
    }, now)
  })
}
