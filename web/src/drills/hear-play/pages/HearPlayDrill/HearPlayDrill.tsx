import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useDrillRoute, type DrillRouteControls } from '@/app/useDrillRoute'
import { useEarStore } from '@/drills/hear-play/store'
import { SetupPhase } from '../SetupPhase'
import { RunPhase } from '../RunPhase'
import { ResultPhase } from '../ResultPhase'

const controls: DrillRouteControls = {
  usePhase: () => useEarStore(s => s.phase),
  autostart: () => {
    const { settings } = useAppStore.getState()
    useEarStore.getState().start(settings.earLevel, settings)
  },
  backToSetup: () => useEarStore.getState().backToSetup(),
  resume: () => useEarStore.getState().resume(),
}

/**
 * Nghe & Đàn: one route, three phases, the same shape as the note-id drill
 * (see `useDrillRoute` for home's route state and back inside the drill).
 */
export function HearPlayDrill() {
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
