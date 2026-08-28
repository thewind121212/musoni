import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretDownIcon, FireIcon, TrophyIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import {
  getDailyMinutes, getStreak, getLongestStreak, getActiveDayCount, localDayKey,
} from '../progress/progressStore'
import { ActivityGrid, ActivityWeek } from './ActivityGrid'
import { useAppStore } from './store'
import { useT } from './useT'

/**
 * Where the reader stands: today first, then the streak, then the calendar of
 * every practised day. History earns its place by showing consistency, which is
 * the thing the training actually depends on.
 */
export function ActivityPanel() {
  const t = useT()
  const { settings, updateSettings } = useAppStore()
  const reduce = useReducedMotion()
  const expanded = settings.activityExpanded
  const minutesByDay = getDailyMinutes()
  const today = minutesByDay[localDayKey(new Date())] ?? 0
  const practisedToday = today > 0
  const streak = getStreak()
  const longest = getLongestStreak()
  const activeDays = getActiveDayCount()

  return (
    <section className="rounded-2xl border border-line bg-raised p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            {t('week.today')}
          </div>
          {practisedToday ? (
            <div className="tnum text-3xl leading-tight font-semibold">
              {t('week.minutes', { count: today })}
            </div>
          ) : (
            <>
              <div className="text-xl leading-tight font-semibold text-ink-soft">
                {t('week.notYet')}
              </div>
              <div className="text-xs text-ink-faint">{t('week.keepGoing')}</div>
            </>
          )}
        </div>

        {streak > 0 && (
          <div
            className={
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 ' +
              (practisedToday ? 'bg-accent text-accent-ink' : 'border border-line text-ink-soft')
            }
          >
            <FireIcon size={15} weight="fill" />
            <span className="tnum text-sm font-semibold">{t('week.days', { count: streak })}</span>
          </div>
        )}
      </div>

      <div className="mt-3.5">
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <motion.div
              key="calendar"
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden -mx-1.5 px-1.5 py-1.5"
            >
              <ActivityGrid minutesByDay={minutesByDay} />
            </motion.div>
          ) : (
            <motion.div
              key="week"
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduce ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden -mx-1.5 px-1.5 py-1.5"
            >
              <ActivityWeek minutesByDay={minutesByDay} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => updateSettings({ activityExpanded: !expanded })}
        aria-expanded={expanded}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-xs
                   font-medium text-ink-faint transition-colors duration-150 hover:bg-surface
                   hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-accent"
      >
        {expanded ? t('activity.collapse') : t('activity.expand')}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          <CaretDownIcon size={13} weight="bold" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-1 flex gap-2 border-t border-line pt-4">
        <div className="flex flex-1 items-center gap-2">
          <TrophyIcon size={15} weight="fill" className="shrink-0 text-ink-faint" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[10px] tracking-wide text-ink-faint uppercase">
              {t('activity.longestStreak')}
            </span>
            <span className="tnum text-sm font-semibold">
              {t('week.days', { count: longest })}
            </span>
          </span>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <CalendarCheckIcon size={15} weight="fill" className="shrink-0 text-ink-faint" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[10px] tracking-wide text-ink-faint uppercase">
              {t('activity.activeDays')}
            </span>
            <span className="tnum text-sm font-semibold">{activeDays}</span>
          </span>
        </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
