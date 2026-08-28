import { useAppStore } from './store'
import { useT } from './useT'
import { localDayKey } from '../progress/progressStore'

/**
 * Practice minutes as a calendar heatmap, one square per day, weeks running
 * left to right and weekdays top to bottom.
 *
 * Thresholds are absolute minutes rather than quantiles of the reader's own
 * history, so the shades mean the same thing forever: reaching the third shade
 * is reaching the daily practice the drill is built around, and a light week
 * cannot quietly redefine what "a lot" looks like.
 */
const LEVEL_MINUTES = [0, 2, 5, 10] as const

function level(minutes: number | undefined): 0 | 1 | 2 | 3 | 4 {
  if (!minutes) return 0
  if (minutes <= LEVEL_MINUTES[1]) return 1
  if (minutes <= LEVEL_MINUTES[2]) return 2
  if (minutes <= LEVEL_MINUTES[3]) return 3
  return 4
}

const SHADE: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-line/60',
  1: 'bg-accent/25',
  2: 'bg-accent/50',
  3: 'bg-accent/75',
  4: 'bg-accent',
}

const WEEKS = 20

interface Props {
  minutesByDay: Record<string, number>
}

export function ActivityGrid({ minutesByDay }: Props) {
  const t = useT()
  const lang = useAppStore(s => s.settings.lang)

  // Columns are weeks ending today, so the last column always holds the current
  // week and today is the final filled square.
  const today = new Date()
  const start = new Date(today)
  start.setDate(start.getDate() - (WEEKS * 7 - 1))
  start.setDate(start.getDate() - start.getDay()) // back to the Sunday that opens the range

  const columns: Date[][] = []
  const cursor = new Date(start)
  for (let w = 0; w < WEEKS; w++) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    columns.push(week)
  }

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
                  (isFuture(date) ? 'bg-transparent' : SHADE[level(minutes)])
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
