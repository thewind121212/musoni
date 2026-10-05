import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useDrillRoute, type DrillRouteControls } from '@/app/useDrillRoute'
import { useReviewStore } from '@/drills/review/store'
import { SetupPhase } from '../SetupPhase'
import { RunPhase } from '../RunPhase'
import { ResultPhase } from '../ResultPhase'

const controls: DrillRouteControls = {
  usePhase: () => useReviewStore(s => s.phase),
  // No presets: Ôn tập has no levels and no lesson links to it.
  autostart: () => useReviewStore.getState().start(useAppStore.getState().settings),
  backToSetup: () => useReviewStore.getState().backToSetup(),
  resume: () => useReviewStore.getState().resume(),
}

/**
 * Ôn tập: one route, three phases, as every drill (see `useDrillRoute`). The
 * questions are the checks of finished lessons, shown as the lesson shows them.
 */
export function ReviewDrill() {
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
