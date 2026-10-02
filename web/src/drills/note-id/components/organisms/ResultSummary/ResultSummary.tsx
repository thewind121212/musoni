import { TrophyIcon } from '@phosphor-icons/react'
import { Chip, StatTile } from '@/core/components/atoms'
import { enduranceBonus } from '@/core/scoring'
import type { Translate } from '@/core/i18n/translate'
import type { SessionResult } from '@/progress/progressStore'

interface Props {
  result: SessionResult
  /** This session set the best score for its level. */
  isBest: boolean
  t: Translate
}

/** The finished session: its score and what went into it, then the four figures behind it. */
export function ResultSummary({ result, isBest, t }: Props) {
  return (
    <>
      <div>
        {isBest && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
            <TrophyIcon size={13} weight="fill" /> {t('result.personalBest')}
          </div>
        )}
        <div className="text-sm text-ink-soft">
          {t('result.session', { level: t(`level.${result.level}` as 'level.1') })}
        </div>
        <div className="tnum text-6xl font-semibold tracking-tight md:text-7xl">{result.practiceScore}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
          <span>{t('result.scoreCaption')}</span>
          <Chip>{t('result.difficulty', { weight: result.weight.toFixed(2) })}</Chip>
          <Chip>{t('result.endurance', { bonus: enduranceBonus(result.durationSec).toFixed(2) })}</Chip>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <StatTile value={String(result.correct)} label={t('result.correct')} />
        <StatTile value={`${Math.round(result.accuracy * 100)}%`} label={t('result.accuracy')} />
        <StatTile value={`${(result.avgMs / 1000).toFixed(1)}s`} label={t('result.avgAnswer')} />
        <StatTile value={String(result.bestStreak)} label={t('result.bestStreak')} />
      </div>
    </>
  )
}
