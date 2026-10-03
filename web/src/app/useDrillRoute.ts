import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from './store'
import { isDrillStep, type DrillStepState } from './drillStep'

export type DrillPhase = 'setup' | 'running' | 'finished'

/**
 * What a drill route needs from its drill's store. Pass a module-level
 * constant built on the store's `getState()`, so it never changes between
 * renders.
 */
export interface DrillRouteControls {
  /** The drill store's phase, as a hook (`() => useStore(s => s.phase)`). */
  usePhase: () => DrillPhase
  /** Start a session on the saved setup (home's one-tap start). */
  autostart: () => void
  /** Show setup, ending whatever the store still holds. */
  backToSetup: () => void
  /** Carry on a session left paused (home's paused-session bar). */
  resume: () => void
}

/**
 * The route side of a drill: one route, phases held in the drill's store.
 *
 * Applies the route state home sends (`autostart`, `setup`, `resume`) before
 * the first read of the phase (which it returns), so the wrong phase never flashes on the way
 * in, then drops it so a refresh does not apply it again.
 *
 * Back goes where the reader came from. A session started from setup gets
 * one history entry of its own above setup's (see `drillStep`), and a step
 * back off it returns to setup (a session with answers is kept as played
 * time, as `backToSetup` does). A session started from home (`autostart`,
 * `resume`) sits on the drill's own entry, so back leaves for home, where
 * `useRunGuards` has paused it and home offers it back; ending it with
 * nothing to keep (✕ before any answer) goes home too.
 */
export function useDrillRoute(controls: DrillRouteControls): DrillPhase {
  const location = useLocation()
  const navigate = useNavigate()
  // Lazy state runs once per mount (twice under StrictMode in dev, which only
  // regenerates the first question).
  const [entry] = useState(() => {
    const state = location.state as { autostart?: boolean; setup?: boolean; resume?: boolean } | null
    if (state?.autostart) controls.autostart()
    else if (state?.setup) controls.backToSetup()
    else if (state?.resume) controls.resume()
    else return false
    return true
  })
  useEffect(() => {
    if (entry) navigate(location.pathname, { replace: true, state: null })
  }, [entry, navigate, location.pathname])

  // Read after the entry state above has been applied.
  const phase = controls.usePhase()

  // Back in a drill, home has nothing paused to offer: the session is here,
  // or was just replaced. Leaving mid-session again publishes it afresh.
  useEffect(() => useAppStore.getState().setPausedSession(null), [])

  const onStep = isDrillStep(location.state)
  const was = useRef({ onStep, phase })
  useEffect(() => {
    const before = was.current
    was.current = { onStep, phase }
    if (before.onStep && !onStep) {
      if (phase === 'setup') return
      controls.backToSetup()
      // Already back where the session began; don't read this as ending one from home.
      was.current = { onStep, phase: 'setup' }
    } else if (before.phase === 'setup' && phase !== 'setup' && !onStep) {
      const step: DrillStepState = { drillStep: true, baseIsFirst: location.key === 'default' }
      navigate(location.pathname, { state: step })
    } else if (phase === 'setup' && onStep) {
      navigate(-1)
    } else if (before.phase === 'running' && phase === 'setup') {
      // A session from home ended with nothing to keep (✕ before any answer):
      // back to home, where it was started, not to a setup the reader skipped.
      navigate(-1)
    }
  }, [phase, onStep, navigate, location.pathname, location.key, controls])

  return phase
}
