import { localDayKey } from '@/progress/progressStore'
import { buildWeeks } from './activityWeeks'
import { SHADE, shadeLevel, type CalendarProps } from './shade'

const WEEKS = 20

/**
 * Practice minutes as a calendar heatmap, one square per day, weeks running
 * left to right and weekdays top to bottom.
 */
export function ActivityGrid({ minutesByDay, lang, t }: CalendarProps) {
  const today = new Date()
  const columns = buildWeeks(today, WEEKS)

  // A month label sits above the first column that opens that month.
  const monthLabels = columns.map((week, i) => {
    const first = week[0]
    const previous = i === 0 ? null : columns[i - 1][0]
    const isNewMonth = !previous || previous.getMonth() !== first.getMonth()
    return isNewMonth && i < WEEKS - 1
      ? first.toLocaleDateString(lang, { month: 'short' })
      : ''
  })

  const isFuture = (d: Date) => d > today

  return (
    <div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}>
        {monthLabels.map((label, i) => (
          <span key={`m${i}`} className="h-3 truncate text-[9px] leading-3 text-ink-faint">
            {label}
          </span>
        ))}
      </div>

      <div
        className="mt-1 grid grid-flow-col gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`, gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
      >
        {columns.map(week =>
          week.map(date => {
            const key = localDayKey(date)
            const minutes = minutesByDay[key]
            const date_ = date.toLocaleDateString(lang, { day: 'numeric', month: 'short' })
            return (
              <span
                key={key}
                title={
                  minutes
                    ? t('activity.dayTitle', { date: date_, count: minutes })
                    : t('activity.restDay', { date: date_ })
                }
                className={
                  'aspect-square w-full rounded-[2px] ' +
                  (isFuture(date) ? 'bg-transparent' : SHADE[shadeLevel(minutes)])
                }
              />
            )
          }),
        )}
      </div>

      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-ink-faint">
        <span>{t('activity.less')}</span>
        {([0, 1, 2, 3, 4] as const).map(l => (
          <span key={l} className={'size-2.5 rounded-[2px] ' + SHADE[l]} />
        ))}
        <span>{t('activity.more')}</span>
      </div>
    </div>
  )
}
