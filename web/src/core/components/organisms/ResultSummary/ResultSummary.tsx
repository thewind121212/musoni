import { TrophyIcon } from '@phosphor-icons/react'
import { Chip } from '@/core/components/atoms'
import { SessionStats } from '@/core/components/molecules'
import { enduranceBonus } from '@/core/scoring'
import type { Translate } from '@/core/i18n/translate'
import type { SessionResult } from '@/progress/progressStore'

interface Props {
  result: SessionResult
  /** The session's level as the drill names it ("Treble", "Do Mi Sol"). */
  levelName: string
  /** This session set the best score for its level. */
  isBest: boolean
  /** Recent average at this level, for the change chip; null hides it. */
  average?: number | null
  t: Translate
}

/** The finished session: its score and what went into it, then the four figures behind it. */
export function ResultSummary({ result, levelName, isBest, average = null, t }: Props) {
  const delta = average === null ? null : result.practiceScore - average
  return (
    <>
      <div>
        {isBest && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
            <TrophyIcon size={13} weight="fill" /> {t('result.personalBest')}
          </div>
        )}
        <div className="text-sm text-ink-soft">
          {t('result.session', { level: levelName })}
        </div>
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
          <div className="tnum text-6xl leading-none font-semibold tracking-tight md:text-7xl">{result.practiceScore}</div>
          {delta !== null && delta !== 0 && (
            <span
              className={
                'mb-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ' +
                (delta > 0 ? 'bg-correct/12 text-correct' : 'bg-line text-ink-soft')
              }
            >
              {t(delta > 0 ? 'result.aboveAverage' : 'result.belowAverage', { count: Math.abs(delta) })}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-ink-faint">
          <span>{t('result.scoreCaption')}</span>
          <Chip>{t('result.difficulty', { weight: result.weight.toFixed(2) })}</Chip>
          <Chip>{t('result.endurance', { bonus: enduranceBonus(result.durationSec).toFixed(2) })}</Chip>
        </div>
      </div>

      <SessionStats result={result} t={t} />
    </>
  )
}
