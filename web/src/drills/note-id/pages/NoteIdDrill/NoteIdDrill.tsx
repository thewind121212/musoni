import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useDrillRoute, type DrillRouteControls } from '@/app/useDrillRoute'
import { useDrillStore } from '@/drills/note-id/store'
import { SetupPhase } from '../SetupPhase'
import { RunPhase } from '../RunPhase'
import { ResultPhase } from '../ResultPhase'

const controls: DrillRouteControls = {
  usePhase: () => useDrillStore(s => s.phase),
  autostart: () => {
    const { settings } = useAppStore.getState()
    useDrillStore.getState().start(settings.level, settings)
  },
  backToSetup: () => useDrillStore.getState().backToSetup(),
  resume: () => useDrillStore.getState().resume(),
  pause: () => useDrillStore.getState().pause('menu'),
}

/**
 * One route, three phases. Training never changes the URL: starting, finishing
 * and retrying a session are store transitions. Home's route state and back
 * inside the drill are handled by `useDrillRoute`: `autostart` opens straight
 * into a session on the saved setup, `setup` opens setup even when a finished
 * or abandoned session is still held, and `resume` carries on a session the
 * reader left mid-way.
 *
 * Phases cross-fade so the jump from setup into a running sprint reads as one
 * continuous surface rather than a hard swap.
 */
export function NoteIdDrill() {
  const phase = useDrillRoute(controls)
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
