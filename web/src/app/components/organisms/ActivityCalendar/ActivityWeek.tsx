import { localDayKey } from '@/progress/progressStore'
import { SHADE, shadeLevel, type CalendarProps } from './shade'

/** The short view: this week as a row, with the weekday under each square. */
export function ActivityWeek({ minutesByDay, lang, t }: CalendarProps) {
  const days: Date[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d)
  }

  return (
    <div className="flex gap-1.5">
      {days.map((date, i) => {
        const key = localDayKey(date)
        const minutes = minutesByDay[key]
        const isToday = i === days.length - 1
        const label = date.toLocaleDateString(lang, { day: 'numeric', month: 'short' })
        return (
          <div key={key} className="flex flex-1 flex-col items-center gap-1.5">
            <span
              title={
                minutes
                  ? t('activity.dayTitle', { date: label, count: minutes })
                  : t('activity.restDay', { date: label })
              }
              className={
                'h-9 w-full rounded-md ' + SHADE[shadeLevel(minutes)] +
                (isToday ? ' ring-2 ring-accent ring-offset-2 ring-offset-raised' : '')
              }
            />
            <span className={'text-[10px] ' + (isToday ? 'font-semibold text-ink' : 'text-ink-faint')}>
              {date.toLocaleDateString(lang, { weekday: 'narrow' })}
            </span>
          </div>
        )
      })}
    </div>
  )
}
