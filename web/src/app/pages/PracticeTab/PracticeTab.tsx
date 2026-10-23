import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MusicNoteIcon, TimerIcon, TrophyIcon } from '@phosphor-icons/react'
import { ActivityPanel, TodayCard } from '@/app/components/organisms'
import { LanguageToggle, type Stat } from '@/core/components/molecules'
import { DrillCard } from '@/core/components/organisms'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { allDrills, listedDrills } from '@/app/drills'
import type { DrillEntry } from '@/app/drill'
import { pickToday, type TodayPick } from '@/app/practicePlan'
import { loadDrill, loadLearnTab, loadLessonPlayer, prefetchWhenIdle } from '@/app/routes'
import {
  getActiveDayCount, getBest, getDailyMinutes, getLastPlayed, getLongestStreak, getStreak, hasHistory,
  localDayKey, type Settings,
} from '@/progress/progressStore'
import { formatDuration } from '@/core/i18n/formatDuration'
import type { Translate } from '@/core/i18n/translate'
import { DAILY_GOAL_MINUTES } from '@/config/constants'

/** A played drill's figures: its level (when it has levels to choose), length and best there. */
function drillStats(drill: DrillEntry, settings: Settings, t: Translate): Stat[] {
  const own = drill.of(settings)
  const best = getBest(drill.id, own.level)
  const level = drill.levels[own.level - 1] ?? drill.levels[0]
  return [
    ...(drill.levels.length > 1
      ? [{ icon: <MusicNoteIcon size={12} weight="fill" />, label: t('stat.level'), value: t(level.name) }]
      : []),
    { icon: <TimerIcon size={12} weight="bold" />, label: t('stat.length'), value: formatDuration(own.durationSec, t) },
    { icon: <TrophyIcon size={12} weight="fill" />, label: t('stat.best'), value: best ? String(best.practiceScore) : t('stat.none') },
  ]
}

/**
 * Page: Luyện, the default tab. The practice days first (once there are
 * some), then Hôm nay: today against the goal and the one session the app
 * suggests (`pickToday`), then every listed drill. Luyện never reads lessons.
 */
export function PracticeTab() {
  const { settings, updateSettings, markHomeIntroPlayed, pausedSession } = useAppStore()
  const t = useT()
  const reduce = useReducedMotion()
  // Read once at mount: the entrance plays on the first visit only.
  const [playIntro] = useState(() => !useAppStore.getState().homeIntroPlayed)
  useEffect(() => markHomeIntroPlayed(), [markHomeIntroPlayed])
  const drills = listedDrills()
  const lastPlayed = getLastPlayed()

  // Warm the drills' code (and Học's) while the reader looks at the list.
  useEffect(() => {
    for (const d of allDrills()) prefetchWhenIdle(() => loadDrill(d))
    prefetchWhenIdle(loadLearnTab)
    prefetchWhenIdle(loadLessonPlayer)
  }, [])

  const minutesByDay = getDailyMinutes()
  const todayMinutes = minutesByDay[localDayKey(new Date())] ?? 0
  const streak = getStreak()
  const pick = pickToday({ drills, lastPlayed, settings, todayMinutes, dailyGoal: DAILY_GOAL_MINUTES, now: new Date() })

  const reason = (p: TodayPick) => {
    switch (p.reason.kind) {
      case 'new': return t('today.reason.new', { starter: t(p.drill.starter ?? p.drill.description) })
      case 'rest': return t('today.reason.rest', { count: p.reason.days })
      case 'again': return t('today.reason.again')
    }
  }

  const enter = (delay: number) => ({
    initial: reduce || !playIntro ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  const card = (drill: DrillEntry) => {
    const played = drill.id in lastPlayed
    return (
      <div key={drill.id} data-drill={drill.id}>
        <DrillCard
          icon={<drill.icon size={22} weight="fill" />}
          title={t(drill.title)}
          description={t(drill.description)}
          to={drill.route}
          toState={{ setup: true }}
          chip={played ? undefined : { label: t('practice.notPlayed') }}
          stats={played ? drillStats(drill, settings, t) : undefined}
          action={played ? { label: t('practice.go'), to: drill.route, state: { autostart: true } } : undefined}
        />
      </div>
    )
  }

  return (
    // Room under the last card for the tab bar and the paused-session bar, which float over the page.
    <div className={'mx-auto w-full max-w-md px-4 pt-8 md:max-w-4xl md:px-8 md:pt-10 ' + (pausedSession ? 'pb-48 md:pb-32' : 'pb-28 md:pb-12')}>
      <motion.header {...enter(0)} className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t('tab.practice')}</h1>
        <LanguageToggle lang={settings.lang} onChange={lang => updateSettings({ lang })} className="-mr-1" />
      </motion.header>

      <div className="mt-5 flex flex-col gap-7 md:mt-8 md:gap-9">
        {hasHistory() && (
          <motion.section {...enter(0.06)} className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{t('practice.activity')}</h2>
            <ActivityPanel
              minutesByDay={minutesByDay}
              longestStreak={getLongestStreak()}
              activeDays={getActiveDayCount()}
              expanded={settings.activityExpanded}
              onToggle={() => updateSettings({ activityExpanded: !settings.activityExpanded })}
              lang={settings.lang}
              t={t}
            />
          </motion.section>
        )}

        <motion.div {...enter(0.12)}>
          <TodayCard
            todayMinutes={todayMinutes}
            dailyGoal={DAILY_GOAL_MINUTES}
            unit={t('goal.unit')}
            eyebrow={todayMinutes >= DAILY_GOAL_MINUTES
              ? t('today.eyebrow.done')
              : todayMinutes > 0 ? t('today.eyebrow.left', { count: DAILY_GOAL_MINUTES - todayMinutes }) : t('week.today')}
            streak={streak > 0 ? t('week.days', { count: streak }) : null}
            pick={pick && {
              title: `${t(pick.drill.title)} · ${formatDuration(pick.preset.durationSec, t)}`,
              reason: reason(pick),
              actionLabel: t('today.start'),
              to: pick.drill.route,
              state: { autostart: true, preset: pick.preset },
            }}
          />
        </motion.div>

        <motion.section {...enter(0.18)} className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{t('practice.yours')}</h2>
          <div className="grid gap-3 md:grid-cols-2">{drills.map(card)}</div>
        </motion.section>
      </div>
    </div>
  )
}
