import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CaretDownIcon, TrophyIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import { IconStat, Panel } from '@/core/components/atoms'
import type { Lang, Translate } from '@/core/i18n/translate'
import { ActivityGrid, ActivityWeek } from '../ActivityCalendar'

interface Props {
  /** Practice minutes keyed by local day (`YYYY-MM-DD`). */
  minutesByDay: Record<string, number>
  longestStreak: number
  activeDays: number
  /** Full calendar instead of this week. */
  expanded: boolean
  onToggle: () => void
  lang: Lang
  t: Translate
}

/**
 * The reader's practice history: this week, or the full calendar of every
 * practised day with the longest streak and the count of active days. Today
 * against the goal and the current streak are Luyện's Hôm nay card.
 */
export function ActivityPanel({
  minutesByDay, longestStreak, activeDays, expanded, onToggle, lang, t,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <Panel>
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
        className="-mx-1.5 -mt-1.5 overflow-hidden px-1.5 py-1.5"
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
