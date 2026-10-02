import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useDrillStore } from '@/drills/note-id/store'
import { SetupPhase } from '../SetupPhase'
import { RunPhase } from '../RunPhase'
import { ResultPhase } from '../ResultPhase'

/**
 * One route, three phases. Training never changes the URL: starting, finishing
 * and retrying a session are store transitions, so the back button belongs to
 * the app (home, and later account pages) rather than to the drill.
 *
 * Phases cross-fade so the jump from setup into a running sprint reads as one
 * continuous surface rather than a hard swap.
 *
 * Arriving with `autostart` in the route state (home's start button) opens
 * straight into a session on the saved setup, so practising what was done last
 * time is one tap rather than two. `setup` (home's change-setup link) opens the
 * setup phase even when the store still holds a finished or abandoned session.
 */
export function NoteIdDrill() {
  const location = useLocation()
  const navigate = useNavigate()
  // Applied before the first read of the phase, so the wrong phase never
  // flashes on the way in. Lazy state runs once per mount (twice under
  // StrictMode in dev, which only regenerates the first question).
  const [entry] = useState(() => {
    const state = location.state as { autostart?: boolean; setup?: boolean } | null
    if (state?.autostart) {
      const { settings } = useAppStore.getState()
      useDrillStore.getState().start(settings.level, settings)
      return true
    }
    if (state?.setup) {
      useDrillStore.getState().backToSetup()
      return true
    }
    return false
  })
  // Drop the flag, so a refresh does not apply it again.
  useEffect(() => {
    if (entry) navigate(location.pathname, { replace: true, state: null })
  }, [entry, navigate, location.pathname])

  const phase = useDrillStore(s => s.phase)
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={phase}
        initial={reduce ? false : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {phase === 'running' ? <RunPhase /> : phase === 'finished' ? <ResultPhase /> : <SetupPhase />}
      </motion.div>
    </AnimatePresence>
  )
}
