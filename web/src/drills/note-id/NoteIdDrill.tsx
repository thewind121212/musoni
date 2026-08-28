import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useDrillStore } from './store'
import { SetupPhase } from './phases/SetupPhase'
import { RunPhase } from './phases/RunPhase'
import { ResultPhase } from './phases/ResultPhase'

/**
 * One route, three phases. Training never changes the URL: starting, finishing
 * and retrying a session are store transitions, so the back button belongs to
 * the app (home, and later account pages) rather than to the drill.
 *
 * Phases cross-fade so the jump from setup into a running sprint reads as one
 * continuous surface rather than a hard swap.
 */
export function NoteIdDrill() {
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
