import { motion, useReducedMotion } from 'motion/react'
import { ArrowClockwiseIcon, HouseIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { useDrillStore } from '@/drills/note-id/store'
import { getBest, getRecentAverage } from '@/progress/progressStore'
import { Button } from '@/core/components/atoms'
import { ScoreCompare } from '@/core/components/molecules'
import { MissedNotes, ResultSummary } from '@/drills/note-id/components/organisms'

/**
 * Page: the last session from the drill store, set against this week's average
 * and the level's best from progress, the notes it missed, and what to do next.
 */
export function ResultPhase() {
  const settings = useAppStore(s => s.settings)
  const result = useDrillStore(s => s.lastResult)
  const misses = useDrillStore(s => s.misses)
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  if (!result) return null

  const best = getBest('note-id', result.level)
  const isBest = best !== null && best.practiceScore === result.practiceScore
  const average = getRecentAverage('note-id', result.level, result.at)
  const bestScore = best?.practiceScore ?? result.practiceScore
  const again = () => useDrillStore.getState().start(result.level as 1 | 2 | 3 | 4, settings)

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center gap-6 px-4 py-8 md:max-w-2xl md:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5"
      >
        <ResultSummary result={result} isBest={isBest} average={average} t={t} />

        {/* Nothing to set a first session against, so the bar waits for a second. */}
        {(average !== null || !isBest) && (
          <ScoreCompare
            score={result.practiceScore}
            average={average}
            best={bestScore}
            averageLabel={average === null ? null : t('result.weekAverage', { score: average })}
            bestLabel={
              bestScore > result.practiceScore
                ? t('result.bestToGo', { score: bestScore, count: bestScore - result.practiceScore })
                : t('result.best', { score: bestScore })
            }
          />
        )}

        <MissedNotes misses={misses} t={t} />

        <div className="flex flex-col gap-2">
          <Button variant="cta" className="h-14 text-lg" onClick={again}>
            <ArrowClockwiseIcon size={20} weight="bold" /> {t('result.again')}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => useDrillStore.getState().backToSetup()}>{t('result.changeSetup')}</Button>
            <Link to="/" onClick={backLink} className="contents">
              <Button className="w-full"><HouseIcon size={18} weight="bold" /> {t('result.home')}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
