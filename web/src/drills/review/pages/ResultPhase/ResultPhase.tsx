import { motion, useReducedMotion } from 'motion/react'
import { ArrowClockwiseIcon, BookOpenIcon, PlayIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { getBest, getDailyMinutes, getRecentAverage, localDayKey } from '@/progress/progressStore'
import { Button } from '@/core/components/atoms'
import { ScoreCompare } from '@/core/components/molecules'
import { EarlyEndSummary, ResultSummary } from '@/core/components/organisms'
import { formatElapsed } from '@/core/i18n/formatDuration'
import { plainText } from '@/core/lesson/text'
import { CHAPTERS } from '@/theory/registry'
import { FROM_LIST, lessonNumber } from '@/theory/outline'
import { useReviewStore } from '@/drills/review/store'
import { findCheck } from '@/drills/review/select'
import { MissedChecks, type MissedCheck } from '@/drills/review/components/organisms'
import review from '@/drills/review/drill'
import { S } from '@/drills/review/strings'
import { DAILY_GOAL_MINUTES } from '@/config/constants'

/**
 * Page: the last review session: its pace score against this week's average
 * and the best, the questions it missed with the way back to their lessons,
 * and what to do next. Ended early, the time played and today's goal instead.
 */
export function ResultPhase() {
  const result = useReviewStore(s => s.lastResult)
  const missIds = useReviewStore(s => s.misses)
  const { lang, naming } = useAppStore(s => s.settings)
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  if (!result) return null

  const partial = result.partial === true
  const best = getBest(review.id, result.level)
  const isBest = best !== null && best.practiceScore === result.practiceScore
  const average = getRecentAverage(review.id, result.level, result.at)
  const bestScore = best?.practiceScore ?? result.practiceScore

  // One row per missed question, in the order first missed.
  const misses: MissedCheck[] = []
  for (const id of missIds) {
    const row = misses.find(m => m.id === id)
    if (row) { row.count++; continue }
    const found = findCheck(CHAPTERS, id)
    if (!found) continue
    misses.push({
      id,
      prompt: plainText(found.check.prompt[lang], naming),
      lesson: t('theory.eyebrow', { number: lessonNumber(found.ref), title: plainText(found.ref.lesson.title[lang], naming) }),
      to: `/theory/${found.ref.key}`,
      count: 1,
    })
  }

  const again = () => {
    const s = useReviewStore.getState()
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
          <ResultSummary result={result} levelName={t(review.title)} isBest={isBest} average={average} t={t} />
        )}

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

        {/* A lesson opened from here closes back to this result. */}
        <MissedChecks
          heading={t(S.missed)}
          countLabel={t(S['missed.count'], { count: missIds.length })}
          misses={misses}
          linkState={FROM_LIST}
        />

        <div className="flex flex-col gap-2">
          <Button variant="cta" className="h-14 text-lg" onClick={again}>
            {partial
              ? <><PlayIcon size={20} weight="fill" /> {t('early.again')}</>
              : <><ArrowClockwiseIcon size={20} weight="bold" /> {t('result.again')}</>}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => useReviewStore.getState().backToSetup()}>{t('result.changeSetup')}</Button>
            <Link to="/learn" onClick={backLink} className="contents">
              <Button className="w-full"><BookOpenIcon size={18} weight="bold" /> {t(S.lessons)}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
