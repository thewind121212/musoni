import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretDownIcon, FireIcon, TrophyIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import {
  getDailyMinutes, getStreak, getLongestStreak, getActiveDayCount, localDayKey,
} from '../progress/progressStore'
import { ActivityGrid, ActivityWeek } from './ActivityGrid'
import { useAppStore } from './store'
import { useT } from './useT'

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <span className="shrink-0 text-ink-faint">{icon}</span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[10px] tracking-wide text-ink-faint uppercase">{label}</span>
        <span className="tnum text-sm font-semibold">{value}</span>
      </span>
    </div>
  )
}

/**
 * Where the reader stands: today first, then the streak, then either this week
 * or the full calendar of every practised day.
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

      {/*
        One box that resizes, rather than one view collapsing to nothing before
        the next grows. `layout` animates the height while popLayout takes the
        outgoing view out of flow, so the two cross-fade over each other and the
        panel is never briefly empty.

        The padding is not decoration: today's ring is drawn outside its square,
        and overflow-hidden would clip it without room to sit in.
      */}
      <motion.div
        layout={reduce ? false : 'size'}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3.5 -mx-1.5 overflow-hidden px-1.5 py-1.5"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={expanded ? 'calendar' : 'week'}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            {expanded ? (
              <>
                <ActivityGrid minutesByDay={minutesByDay} />
                <div className="mt-4 flex gap-2 border-t border-line pt-4">
                  <Stat
                    icon={<TrophyIcon size={15} weight="fill" />}
                    label={t('activity.longestStreak')}
                    value={t('week.days', { count: getLongestStreak() })}
                  />
                  <Stat
                    icon={<CalendarCheckIcon size={15} weight="fill" />}
                    label={t('activity.activeDays')}
                    value={String(getActiveDayCount())}
                  />
                </div>
              </>
            ) : (
              <ActivityWeek minutesByDay={minutesByDay} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <button
        onClick={() => updateSettings({ activityExpanded: !expanded })}
        aria-expanded={expanded}
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-xs
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
    </section>
  )
}
