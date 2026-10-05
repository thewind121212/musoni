import { motion, useReducedMotion } from 'motion/react'
import { ArrowClockwiseIcon, HouseIcon, PlayIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { getBest, getDailyMinutes, getRecentAverage, localDayKey } from '@/progress/progressStore'
import { Button } from '@/core/components/atoms'
import { ScoreCompare } from '@/core/components/molecules'
import { EarlyEndSummary, ResultSummary } from '@/core/components/organisms'
import { formatElapsed } from '@/core/i18n/formatDuration'
import { DAILY_GOAL_MINUTES } from '@/config/constants'
import { useKeySigStore } from '@/drills/key-sig/store'
import { MissedKeys } from '@/drills/key-sig/components/organisms'
import { keyName } from '@/drills/key-sig/rule'
import keySig from '@/drills/key-sig/drill'
import { levelKey } from '@/drills/key-sig/strings'

/**
 * Page: the last session against this week's average and the level's best,
 * the keys it missed (each signature on a small staff, with what was picked),
 * and what to do next. Same shape as the other drills' results; a session
 * ended early shows the time played and today's goal instead of a score.
 */
export function ResultPhase() {
  const result = useKeySigStore(s => s.lastResult)
  const misses = useKeySigStore(s => s.misses)
  const naming = useKeySigStore(s => s.settings.naming)
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  if (!result) return null

  const partial = result.partial === true
  const best = getBest(keySig.id, result.level)
  const isBest = best !== null && best.practiceScore === result.practiceScore
  const average = getRecentAverage(keySig.id, result.level, result.at)
  const bestScore = best?.practiceScore ?? result.practiceScore
  // Again plays the same session: a lesson's preset stays on, the saved setup stays as it was.
  const again = () => {
    const s = useKeySigStore.getState()
    s.start(s.settings)
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center gap-6 px-4 py-8 md:max-w-2xl md:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-5"
      >
        {partial ? (
          <EarlyEndSummary
            result={result}
            played={formatElapsed(result.durationSec, t)}
            todayMinutes={getDailyMinutes()[localDayKey(new Date())] ?? 0}
            dailyGoal={DAILY_GOAL_MINUTES}
            t={t}
          />
        ) : (
          <ResultSummary
            result={result}
            levelName={t(levelKey(result.level))}
            isBest={isBest} average={average} t={t} />
        )}

        {/* Nothing to set a first session against, so the bar waits for a second. */}
        {!partial && (average !== null || !isBest) && (
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

        <MissedKeys
          misses={misses.map(m => ({
            fifths: m.fifths, clef: m.clef, chosen: m.chosen,
            keyName: keyName(m.fifths, m.mode, naming, t),
          }))}
          t={t}
        />

        <div className="flex flex-col gap-2">
          <Button variant="cta" className="h-14 text-lg" onClick={again}>
            {partial
              ? <><PlayIcon size={20} weight="fill" /> {t('early.again')}</>
              : <><ArrowClockwiseIcon size={20} weight="bold" /> {t('result.again')}</>}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => useKeySigStore.getState().backToSetup()}>{t('result.changeSetup')}</Button>
            <Link to="/" onClick={backLink} className="contents">
              <Button className="w-full"><HouseIcon size={18} weight="bold" /> {t('result.home')}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
