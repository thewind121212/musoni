import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  CaretRightIcon, LockSimpleIcon, MusicNoteIcon, MusicNotesIcon, TimerIcon,
  TrophyIcon, WaveformIcon,
} from '@phosphor-icons/react'
import { StatChip } from '../core/components/StatChip'
import { WeekStrip } from './WeekStrip'
import { useAppStore } from './store'
import { getBest } from '../progress/progressStore'
import { useT } from './useT'
import { formatDuration } from '../core/i18n/formatDuration'
import { LanguageToggle } from './LanguageToggle'

export function HomeScreen() {
  const settings = useAppStore(s => s.settings)
  const level = settings.level
  const reduce = useReducedMotion()
  const t = useT()
  const best = getBest('note-id', level)
  const durationLabel = formatDuration(settings.durationSec, t)

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-10 pb-12 md:max-w-4xl md:px-8 md:pt-16">
      <motion.header {...enter(0)} className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">musoni</h1>
          <p className="mt-1 text-ink-soft md:text-lg">{t('home.tagline')}</p>
        </div>
        <LanguageToggle className="-mr-1 mt-1" />
      </motion.header>

      <div className="mt-6 flex flex-col gap-6 md:mt-10 md:grid md:grid-cols-5 md:items-start md:gap-8">
      <motion.div {...enter(0.12)} className="flex flex-col gap-3 md:col-span-3 md:order-1">
        <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{t('home.training')}</h2>

        <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
          <Link
            to="/train/note-id"
            className="group block rounded-2xl border border-line bg-raised p-5
                       transition-colors duration-150 hover:border-accent
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
                <MusicNotesIcon size={24} weight="fill" />
              </span>
              <span className="flex-1">
                <span className="block font-medium">{t('home.noteReading')}</span>
                <span className="block text-sm text-ink-faint">{t('home.noteReading.what')}</span>
              </span>
              <CaretRightIcon
                size={18}
                className="text-ink-faint transition-transform duration-150 group-hover:translate-x-1"
              />
            </span>

            <span className="mt-4 flex gap-2">
              <StatChip
                icon={<MusicNoteIcon size={14} weight="fill" />}
                label={t('stat.level')} value={t(`level.${level}` as 'level.1')}
              />
              <StatChip
                icon={<TimerIcon size={14} weight="bold" />}
                label={t('stat.length')} value={durationLabel}
              />
              <StatChip
                icon={<TrophyIcon size={14} weight="fill" />}
                label={t('stat.best')} value={best ? String(best.practiceScore) : t('stat.none')}
              />
            </span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line text-ink-faint">
            <WaveformIcon size={24} />
          </span>
          <span className="flex-1">
            <span className="block font-medium text-ink-soft">{t('home.measure')}</span>
            <span className="block text-sm text-ink-faint">{t('home.measure.soon')}</span>
          </span>
          <LockSimpleIcon size={16} className="text-ink-faint" />
        </div>
      </motion.div>

      <motion.div {...enter(0.06)} className="md:col-span-2 md:order-2"><WeekStrip /></motion.div>
      </div>
    </div>
  )
}
