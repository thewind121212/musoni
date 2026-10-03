import { motion, useReducedMotion } from 'motion/react'
import { ArrowClockwiseIcon, HouseIcon, PlayIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { useEarStore } from '@/drills/hear-play/store'
import { getBest, getDailyMinutes, getRecentAverage, localDayKey } from '@/progress/progressStore'
import { Button } from '@/core/components/atoms'
import { ScoreCompare } from '@/core/components/molecules'
import { EarlyEndSummary, MissedNotes, ResultSummary } from '@/core/components/organisms'
import { formatElapsed } from '@/core/i18n/formatDuration'
import { DAILY_GOAL_MINUTES } from '@/config/constants'

/**
 * Page: the last Nghe & Đàn session against this week's average and the
 * level's best, the notes it missed (on the staff, with what was played
 * instead), and what to do next. Same shape as the note-id result.
 */
export function ResultPhase() {
  const settings = useAppStore(s => s.settings)
  const result = useEarStore(s => s.lastResult)
  const misses = useEarStore(s => s.misses)
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  if (!result) return null

  const level = result.level as 1 | 2 | 3 | 4
  const partial = result.partial === true
  const best = getBest('hear-play', level)
  // An aided session never sets a best (see progressStore `aids`), so it is
  // measured only against plain bests, and draws no bar when there is none.
  const aided = result.aids === true
  const isBest = !aided && best !== null && best.practiceScore === result.practiceScore
  const average = getRecentAverage('hear-play', level, result.at)
  const bestScore = best?.practiceScore ?? (aided ? null : result.practiceScore)
  const again = () => useEarStore.getState().start(level, settings)

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
            levelName={t(`ear.level.${level}` as 'ear.level.1')}
            isBest={isBest}
            average={average}
            t={t}
          />
        )}

        {aided && <p className="text-center text-sm text-ink-soft">{t('result.ear.aids')}</p>}

        {!partial && bestScore !== null && (average !== null || !isBest) && (
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
            {partial
              ? <><PlayIcon size={20} weight="fill" /> {t('early.again')}</>
              : <><ArrowClockwiseIcon size={20} weight="bold" /> {t('result.again')}</>}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => useEarStore.getState().backToSetup()}>{t('result.changeSetup')}</Button>
            <Link to="/" onClick={backLink} className="contents">
              <Button className="w-full"><HouseIcon size={18} weight="bold" /> {t('result.home')}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
