import { StopIcon } from '@phosphor-icons/react'
import { GoalRing } from '@/core/components/atoms'
import { SessionStats } from '@/drills/note-id/components/molecules'
import type { Translate } from '@/core/i18n/translate'
import type { SessionResult } from '@/progress/progressStore'

interface Props {
  result: SessionResult
  /** Time played, as words ("12 sec"). */
  played: string
  todayMinutes: number
  dailyGoal: number
  t: Translate
}

/**
 * A session ended part-way. There is no score to show, so it leads with the
 * time practised and where that leaves today's goal, then the same figures a
 * full session gets.
 */
export function EarlyEndSummary({ result, played, todayMinutes, dailyGoal, t }: Props) {
  const toGo = Math.max(0, dailyGoal - todayMinutes)
  return (
    <>
      <div>
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-line px-3 py-1 text-xs font-medium text-ink-soft">
          <StopIcon size={12} weight="fill" /> {t('early.badge')}
        </div>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
          {t('early.title', { time: played })}
        </h1>
        <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{t('early.body')}</p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-line bg-raised p-3">
        <GoalRing value={todayMinutes} goal={dailyGoal} unit={t('goal.unit')} />
        <div className="text-sm">
          <div className="font-semibold text-ink">{t('early.goal', { done: todayMinutes, goal: dailyGoal })}</div>
          <div className="text-ink-faint">{toGo > 0 ? t('goal.toGo', { count: toGo }) : t('goal.reached')}</div>
        </div>
      </div>

      <SessionStats result={result} t={t} />
    </>
  )
}
