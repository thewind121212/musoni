import { FireIcon } from '@phosphor-icons/react'
import { getRange, getStreak, localDayKey } from '../progress/progressStore'
import { useT } from './useT'

/**
 * Where the user stands right now, with the past week as context underneath.
 * Today's figure leads, because a history chart alone answers "what did I do"
 * and never "am I current".
 */
export function WeekStrip() {
  const t = useT()
  const days: string[] = []
  for (let i = 6; i >= 0; i--) days.push(localDayKey(new Date(Date.now() - i * 86_400_000)))

  const range = getRange(days[0], days[6])
  const totals = days.map(d => (range[d] ?? []).reduce((sum, s) => sum + s.practiceScore, 0))
  const max = Math.max(...totals, 1)
  const today = totals[totals.length - 1]
  const todaySessions = (range[days[6]] ?? []).length
  const streak = getStreak()
  const practisedToday = todaySessions > 0

  return (
    <section className="rounded-2xl border border-line bg-raised p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">{t('week.today')}</div>
          {practisedToday ? (
            <>
              <div className="tnum text-3xl leading-tight font-semibold">{today}</div>
              <div className="text-xs text-ink-faint">
                {t('week.points', { count: todaySessions })}
              </div>
            </>
          ) : (
            <>
              <div className="text-xl leading-tight font-semibold text-ink-soft">{t('week.notYet')}</div>
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
            <span className="text-sm font-semibold">
              <span className="tnum">{t('week.days', { count: streak })}</span>
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex h-20 items-end gap-1.5">
        {days.map((day, i) => {
          const isToday = i === days.length - 1
          const height = totals[i] === 0 ? 3 : Math.max(8, Math.round((totals[i] / max) * 100))
          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end">
                <div
                  className={
                    'w-full rounded-md ' +
                    (totals[i] === 0 ? 'bg-line' : isToday ? 'bg-accent' : 'bg-accent/40')
                  }
                  style={{ height: `${height}%` }}
                  title={`${day}: ${totals[i]} points`}
                />
              </div>
              <span className={'text-[10px] ' + (isToday ? 'font-semibold text-ink' : 'text-ink-faint')}>
                {new Date(day + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'narrow' })}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-1 text-[10px] text-ink-faint">{t('week.last7')}</div>
    </section>
  )
}
