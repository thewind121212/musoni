import { motion, useReducedMotion } from 'motion/react'
import { MusicNoteIcon, MusicNotesIcon, TimerIcon, TrophyIcon, WaveformIcon } from '@phosphor-icons/react'
import { ActivityPanel, PracticeCard } from '@/app/components/organisms'
import { ComingSoonCard, LanguageToggle } from '@/app/components/molecules'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import {
  getActiveDayCount, getBest, getDailyMinutes, getLongestStreak, getStreak, localDayKey,
} from '@/progress/progressStore'
import { formatDuration } from '@/core/i18n/formatDuration'

/** Page: reads the app store and progress, and hands plain values to the components below. */
export function HomeScreen() {
  const { settings, updateSettings } = useAppStore()
  const level = settings.level
  const reduce = useReducedMotion()
  const t = useT()
  const best = getBest('note-id', level)
  const durationLabel = formatDuration(settings.durationSec, t)
  const minutesByDay = getDailyMinutes()

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
        <LanguageToggle
          lang={settings.lang}
          onChange={lang => updateSettings({ lang })}
          className="-mr-1 mt-1"
        />
      </motion.header>

      <div className="mt-6 flex flex-col gap-6 md:mt-10 md:gap-8">
        <motion.div {...enter(0.06)}>
          <ActivityPanel
            minutesByDay={minutesByDay}
            todayMinutes={minutesByDay[localDayKey(new Date())] ?? 0}
            streak={getStreak()}
            longestStreak={getLongestStreak()}
            activeDays={getActiveDayCount()}
            expanded={settings.activityExpanded}
            onToggle={() => updateSettings({ activityExpanded: !settings.activityExpanded })}
            lang={settings.lang}
            t={t}
          />
        </motion.div>

        <motion.div {...enter(0.12)} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{t('home.training')}</h2>

          <PracticeCard
            to="/train/note-id"
            icon={<MusicNotesIcon size={24} weight="fill" />}
            title={t('home.noteReading')}
            description={t('home.noteReading.what')}
            stats={[
              {
                icon: <MusicNoteIcon size={12} weight="fill" />,
                label: t('stat.level'), value: t(`level.${level}` as 'level.1'),
              },
              {
                icon: <TimerIcon size={12} weight="bold" />,
                label: t('stat.length'), value: durationLabel,
              },
              {
                icon: <TrophyIcon size={12} weight="fill" />,
                label: t('stat.best'), value: best ? String(best.practiceScore) : t('stat.none'),
              },
            ]}
          />

          <ComingSoonCard
            icon={<WaveformIcon size={24} />}
            title={t('home.measure')}
            description={t('home.measure.soon')}
          />
        </motion.div>
      </div>
    </div>
  )
}
