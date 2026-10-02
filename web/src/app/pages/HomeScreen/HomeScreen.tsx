import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { EarIcon, MusicNoteIcon, MusicNotesIcon, TimerIcon, TrophyIcon, WaveformIcon } from '@phosphor-icons/react'
import { ActivityPanel, PracticeCard } from '@/app/components/organisms'
import { ComingSoonCard, LanguageToggle, PausedNotice } from '@/app/components/molecules'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { loadHearPlayDrill, loadNoteIdDrill, prefetchWhenIdle } from '@/app/routes'
import {
  getActiveDayCount, getBest, getDailyMinutes, getLongestStreak, getStreak, localDayKey,
} from '@/progress/progressStore'
import { formatClock, formatDuration } from '@/core/i18n/formatDuration'
import { DAILY_GOAL_MINUTES } from '@/config/constants'

/** Page: reads the app store and progress, and hands plain values to the components below. */
export function HomeScreen() {
  const { settings, updateSettings, markHomeIntroPlayed, pausedSession } = useAppStore()
  // Read once at mount: the entrance plays on the first visit only. Returning
  // from a drill remounts this page, and replaying the stagger blanked every
  // block and slid it in again.
  const [playIntro] = useState(() => !useAppStore.getState().homeIntroPlayed)
  useEffect(() => markHomeIntroPlayed(), [markHomeIntroPlayed])
  // Warm the drills' code while the reader looks at home, so Practice opens at once.
  useEffect(() => {
    prefetchWhenIdle(loadNoteIdDrill)
    prefetchWhenIdle(loadHearPlayDrill)
  }, [])
  const level = settings.level
  const reduce = useReducedMotion()
  const t = useT()
  const best = getBest('note-id', level)
  const earBest = getBest('hear-play', settings.earLevel)
  const minutesByDay = getDailyMinutes()

  const enter = (delay: number) => ({
    initial: reduce || !playIntro ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    // Room under the last card for the paused-session bar, which floats over the page.
    <div className={'mx-auto w-full max-w-md px-4 pt-10 md:max-w-4xl md:px-8 md:pt-16 ' + (pausedSession ? 'pb-32' : 'pb-12')}>
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
            dailyGoal={DAILY_GOAL_MINUTES}
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
            actionLabel={t('home.practiceNow')}
            setupLabel={t('home.changeSetup')}
            stats={[
              {
                icon: <MusicNoteIcon size={12} weight="fill" />,
                label: t('stat.level'), value: t(`level.${level}` as 'level.1'),
              },
              {
                icon: <TimerIcon size={12} weight="bold" />,
                label: t('stat.length'), value: formatDuration(settings.durationSec, t),
              },
              {
                icon: <TrophyIcon size={12} weight="fill" />,
                label: t('stat.best'), value: best ? String(best.practiceScore) : t('stat.none'),
              },
            ]}
          />

          <PracticeCard
            to="/train/hear-play"
            icon={<EarIcon size={24} weight="fill" />}
            title={t('home.hearPlay')}
            description={t('home.hearPlay.what')}
            actionLabel={t('home.practiceNow')}
            setupLabel={t('home.changeSetup')}
            stats={[
              {
                icon: <MusicNoteIcon size={12} weight="fill" />,
                label: t('stat.level'), value: t(`ear.level.${settings.earLevel}` as 'ear.level.1'),
              },
              {
                icon: <TimerIcon size={12} weight="bold" />,
                label: t('stat.length'), value: formatDuration(settings.earDurationSec, t),
              },
              {
                icon: <TrophyIcon size={12} weight="fill" />,
                label: t('stat.best'), value: earBest ? String(earBest.practiceScore) : t('stat.none'),
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

      {pausedSession && (
        <PausedNotice
          to={pausedSession.to}
          title={t('home.paused')}
          detail={t('home.paused.detail', {
            left: formatClock(pausedSession.secondsLeft),
            correct: pausedSession.correct,
            wrong: pausedSession.wrong,
          })}
          actionLabel={t('home.paused.resume')}
        />
      )}
    </div>
  )
}
