import { FireIcon, TrophyIcon, CalendarCheckIcon } from '@phosphor-icons/react'
import {
  getDailyMinutes, getStreak, getLongestStreak, getActiveDayCount, localDayKey,
} from '../progress/progressStore'
import { ActivityGrid } from './ActivityGrid'
import { useT } from './useT'

/**
 * Where the reader stands: today first, then the streak, then the calendar of
 * every practised day. History earns its place by showing consistency, which is
 * the thing the training actually depends on.
 */
export function ActivityPanel() {
  const t = useT()
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

      <div className="mt-5">
        <ActivityGrid minutesByDay={minutesByDay} />
      </div>

      <div className="mt-4 flex gap-2 border-t border-line pt-4">
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
    </section>
  )
}
