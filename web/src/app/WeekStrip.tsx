import { getRange, localDayKey } from '../progress/progressStore'

/** Last 7 local days of practice score. Today is the rightmost column. */
export function WeekStrip() {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) days.push(localDayKey(new Date(Date.now() - i * 86_400_000)))

  const range = getRange(days[0], days[6])
  const totals = days.map(d => (range[d] ?? []).reduce((sum, s) => sum + s.practiceScore, 0))
  const max = Math.max(...totals, 1)
  const week = totals.reduce((a, b) => a + b, 0)
  const activeDays = totals.filter(t => t > 0).length

  return (
    <section className="rounded-2xl border border-line bg-raised p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-medium text-ink-soft">Last 7 days</h2>
        <div className="tnum text-sm text-ink-faint">
          {activeDays > 0 ? `${week} points over ${activeDays} ${activeDays === 1 ? 'day' : 'days'}` : 'No sessions yet'}
        </div>
      </div>

      <div className="mt-4 flex h-24 items-end gap-1.5">
        {days.map((day, i) => {
          const isToday = i === days.length - 1
          const height = totals[i] === 0 ? 3 : Math.max(6, Math.round((totals[i] / max) * 100))
          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className={
                    'w-full rounded-md ' +
                    (totals[i] === 0 ? 'bg-line' : isToday ? 'bg-accent' : 'bg-accent/45')
                  }
                  style={{ height: `${height}%` }}
                  title={`${day}: ${totals[i]}`}
                />
              </div>
              <span className={'text-[10px] ' + (isToday ? 'text-ink' : 'text-ink-faint')}>
                {new Date(day + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'narrow' })}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
