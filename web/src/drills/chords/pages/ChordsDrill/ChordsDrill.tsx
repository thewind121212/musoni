import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useDrillRoute, type DrillRouteControls } from '@/app/useDrillRoute'
import { withPreset } from '@/app/drillPreset'
import { useChordStore } from '@/drills/chords/store'
import chords from '@/drills/chords/drill'
import { SetupPhase } from '../SetupPhase'
import { RunPhase } from '../RunPhase'
import { ResultPhase } from '../ResultPhase'

const controls: DrillRouteControls = {
  usePhase: () => useChordStore(s => s.phase),
  autostart: preset => {
    const saved = useAppStore.getState().settings
    // A lesson's preset applies to this session only; the saved setup stays.
    const settings = preset?.drill === chords.id ? withPreset(saved, preset) : saved
    useChordStore.getState().start(settings)
  },
  backToSetup: () => useChordStore.getState().backToSetup(),
  resume: () => useChordStore.getState().resume(),
}

/**
 * Hợp âm: one route, three phases, the same shape as the other drills (see
 * `useDrillRoute` for the tabs' route state and back inside the drill).
 */
export function ChordsDrill() {
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
