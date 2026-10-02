import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretDownIcon, FireIcon, TrophyIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import { IconStat, Panel } from '@/core/components/atoms'
import type { Lang, Translate } from '@/core/i18n/translate'
import { ActivityGrid, ActivityWeek } from '../ActivityCalendar'

interface Props {
  /** Practice minutes keyed by local day (`YYYY-MM-DD`). */
  minutesByDay: Record<string, number>
  todayMinutes: number
  /** Current run of practised days; the pill hides at 0. */
  streak: number
  longestStreak: number
  activeDays: number
  /** Full calendar instead of this week. */
  expanded: boolean
  onToggle: () => void
  lang: Lang
  t: Translate
}

/**
 * Where the reader stands: today first, then the streak, then either this week
 * or the full calendar of every practised day.
 */
export function ActivityPanel({
  minutesByDay, todayMinutes, streak, longestStreak, activeDays, expanded, onToggle, lang, t,
}: Props) {
  const reduce = useReducedMotion()
  const practisedToday = todayMinutes > 0

  return (
    <Panel>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            {t('week.today')}
          </div>
          {practisedToday ? (
            <div className="tnum text-3xl leading-tight font-semibold">
              {t('week.minutes', { count: todayMinutes })}
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
                <ActivityGrid minutesByDay={minutesByDay} lang={lang} t={t} />
                <div className="mt-4 flex gap-2 border-t border-line pt-4">
                  <IconStat
                    icon={<TrophyIcon size={15} weight="fill" />}
                    label={t('activity.longestStreak')}
                    value={t('week.days', { count: longestStreak })}
                  />
                  <IconStat
                    icon={<CalendarCheckIcon size={15} weight="fill" />}
                    label={t('activity.activeDays')}
                    value={String(activeDays)}
                  />
                </div>
              </>
            ) : (
              <ActivityWeek minutesByDay={minutesByDay} lang={lang} t={t} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <button
        onClick={onToggle}
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
    </Panel>
  )
}
