import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useDrillRoute, type DrillRouteControls } from '@/app/useDrillRoute'
import { withPreset } from '@/app/drillPreset'
import { useRhythmStore } from '@/drills/rhythm/store'
import rhythm from '@/drills/rhythm/drill'
import { SetupPhase } from '../SetupPhase'
import { RunPhase } from '../RunPhase'
import { ResultPhase } from '../ResultPhase'

const controls: DrillRouteControls = {
  usePhase: () => useRhythmStore(s => s.phase),
  autostart: preset => {
    const saved = useAppStore.getState().settings
    // A lesson's preset applies to this session only; the saved setup stays.
    const settings = preset?.drill === rhythm.id ? withPreset(saved, preset) : saved
    useRhythmStore.getState().start(settings)
  },
  backToSetup: () => useRhythmStore.getState().backToSetup(),
  resume: () => useRhythmStore.getState().resume(),
}

/** Tiết tấu: one route, three phases, the same shape as the other drills (see `useDrillRoute`). */
export function RhythmDrill() {
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
