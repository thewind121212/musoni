import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { CaretRightIcon, LockSimpleIcon, MusicNotesIcon, WaveformIcon } from '@phosphor-icons/react'
import { WeekStrip } from './WeekStrip'
import { useAppStore } from './store'
import { getBest } from '../progress/progressStore'
import { LEVEL_INFO } from '../config/constants'

export function HomeScreen() {
  const { level, settings } = useAppStore()
  const reduce = useReducedMotion()
  const best = getBest('note-id', level, settings.durationSec)

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-10 pb-12">
      <motion.header {...enter(0)}>
        <h1 className="text-3xl font-semibold tracking-tight">musoni</h1>
        <p className="mt-1 text-ink-soft">Read sheet music faster, a few minutes a day.</p>
      </motion.header>

      <motion.div {...enter(0.06)}><WeekStrip /></motion.div>

      <motion.div {...enter(0.12)} className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">Training</h2>

        <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
          <Link
            to="/train/note-id"
            className="group flex items-center gap-4 rounded-2xl border border-line bg-raised p-5
                       transition-colors duration-150 hover:border-accent
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
              <MusicNotesIcon size={24} weight="fill" />
            </span>
            <span className="flex-1">
              <span className="block font-medium">Note reading</span>
              <span className="block text-sm text-ink-faint">
                {LEVEL_INFO[level].name}
                {best ? ` · best ${best.practiceScore}` : ' · not played yet'}
              </span>
            </span>
            <CaretRightIcon
              size={18}
              className="text-ink-faint transition-transform duration-150 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line text-ink-faint">
            <WaveformIcon size={24} />
          </span>
          <span className="flex-1">
            <span className="block font-medium text-ink-soft">Complete the measure</span>
            <span className="block text-sm text-ink-faint">Rhythm training, coming next</span>
          </span>
          <LockSimpleIcon size={16} className="text-ink-faint" />
        </div>
      </motion.div>
    </div>
  )
}
