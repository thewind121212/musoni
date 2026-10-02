import { StatTile } from '@/core/components/atoms'
import type { Translate } from '@/core/i18n/translate'
import type { SessionResult } from '@/progress/progressStore'

interface Props {
  result: Pick<SessionResult, 'correct' | 'accuracy' | 'avgMs' | 'bestStreak'>
  t: Translate
}

/**
 * A session's four figures in one row on every width: short facts read as a
 * single line, and keep the notes to review on a phone's first screen.
 */
export function SessionStats({ result, t }: Props) {
  return (
    <div className="grid grid-cols-4 divide-x divide-line rounded-2xl border border-line bg-raised">
      <StatTile compact value={String(result.correct)} label={t('result.correct')} />
      <StatTile compact value={`${Math.round(result.accuracy * 100)}%`} label={t('result.accuracy')} />
      <StatTile compact value={`${(result.avgMs / 1000).toFixed(1)}s`} label={t('result.avgAnswer')} />
      <StatTile compact value={String(result.bestStreak)} label={t('result.bestStreak')} />
    </div>
  )
}
