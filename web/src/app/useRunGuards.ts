import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppStore } from './store'

/** The parts of a drill's running session the guards read and act on. */
export interface GuardedSession {
  phase: string
  correct: number
  wrong: number
  endsAt: number | null
  pausedAt: number | null
  pause: (reason: 'away') => void
  backToSetup: () => void
}

// How many run screens are mounted. StrictMode unmounts and remounts every
// component once in development, so an unmount only means the reader left if
// nothing has mounted again by the next task.
let mountedCount = 0

/**
 * Keeps a running session from being lost or miscounted while its run screen
 * is open. Pass the drill store's `getState` (stable across renders).
 *
 * - Leaving the route (back, swipe) pauses the session and tells home, which
 *   offers the way back in. With nothing answered there is nothing to come
 *   back for, so the session is dropped instead.
 * - Hiding the page (switching apps, locking the phone) pauses it, and the
 *   drill welcomes the reader back.
 * - The run screen is one fixed surface: a stray drag must not bounce the page
 *   or pull it down to refresh. Browsers take this from `<html>` only.
 */
export function useRunGuards(getSession: () => GuardedSession) {
  const { pathname } = useLocation()

  useEffect(() => {
    mountedCount++
    return () => {
      mountedCount--
      setTimeout(() => {
        if (mountedCount > 0) return
        const s = getSession()
        if (s.phase !== 'running') return
        if (s.correct + s.wrong === 0) return s.backToSetup()
        s.pause('away')
        const left = getSession()
        useAppStore.getState().setPausedSession({
          to: pathname,
          secondsLeft: Math.ceil((left.endsAt! - left.pausedAt!) / 1000),
          correct: left.correct,
          wrong: left.wrong,
        })
      }, 0)
    }
  }, [pathname, getSession])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) getSession().pause('away')
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [getSession])

  useEffect(() => {
    const root = document.documentElement
    const before = root.style.overscrollBehavior
    root.style.overscrollBehavior = 'none'
    return () => { root.style.overscrollBehavior = before }
  }, [])
}
