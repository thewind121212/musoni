import { useEffect, useState } from 'react'
import { CheckIcon } from '@phosphor-icons/react'
import { MissLine, ProgressBar } from '@/core/components/atoms'
import { PausePanel, RunHeader } from '@/core/components/organisms'
import { IntervalGrid, IntervalStaff } from '@/drills/intervals/components/organisms'
import { playedMs, useIntervalsStore, type PauseReason } from '@/drills/intervals/store'
import { intervalSound } from '@/drills/intervals/generator'
import { cellFromKey, rowOf, type Cell } from '@/drills/intervals/grid'
import { verdict } from '@/drills/intervals/names'
import { S } from '@/drills/intervals/strings'
import intervals from '@/drills/intervals/drill'
import { useRunGuards } from '@/app/useRunGuards'
import { useT } from '@/app/useT'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import { playSequence, preloadPiano, stopSounds } from '@/core/audio/playPitch'
import {
  INTERVAL_FEEDBACK_CORRECT_MS, INTERVAL_FEEDBACK_WRONG_MS, INTERVAL_LEVELS, TICK_MS,
} from '@/config/constants'

/** The ✕ button and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useIntervalsStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/** Answers with a grid cell, and plays the interval as written when hearing is on. */
function answer(cell: Cell) {
  const s = useIntervalsStore.getState()
  const q = s.question
  if (!q || s.feedback || s.pausedAt !== null) return
  s.answer(cell)
  // A blank cell or a row the level hides is not an answer: nothing to play.
  if (!useIntervalsStore.getState().feedback) return
  if (intervals.of(s.settings).hear) {
    stopSounds()
    playSequence(intervalSound(q))
  }
}

/**
 * Page: the interval session. Two notes on the staff, "Quãng gì?" above them,
 * the grid below. One tap answers; the notes turn green, the line under the
 * staff names the interval in the reader's naming ("Quãng 6 thứ (Mi → Do)"),
 * the grid marks the right cell (and the pick, on a miss), and with "Nghe" on
 * the interval sounds as written. Then the next one comes by itself.
 *
 * Leaving pauses, like the other drills (see `useRunGuards`); a pause also
 * silences the sound.
 */
export function RunPhase() {
  const { question, level, endsAt, correct, wrong, streak, feedback, settings, pausedAt, pauseReason } = useIntervalsStore()
  const t = useT()
  const [now, setNow] = useState(() => Date.now())
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)
  const rows = INTERVAL_LEVELS[level].rows

  useRunGuards(useIntervalsStore.getState)

  useEffect(() => {
    if (intervals.of(useIntervalsStore.getState().settings).hear) void preloadPiano()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useIntervalsStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(
      () => useIntervalsStore.getState().nextQuestion(),
      feedback.correct ? INTERVAL_FEEDBACK_CORRECT_MS : INTERVAL_FEEDBACK_WRONG_MS,
    )
    return () => clearTimeout(id)
  }, [feedback])

  // A pause, or leaving the screen, silences what is still ringing.
  const paused = pausedAt !== null
  useEffect(() => {
    if (paused) stopSounds()
  }, [paused])
  useEffect(() => stopSounds, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Held keys auto-repeat; the pause sheet handles (and marks) its own Esc.
      if (e.repeat || e.defaultPrevented) return
      const s = useIntervalsStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (!s.question || s.feedback || s.pausedAt !== null) return
      const cell = cellFromKey(e, INTERVAL_LEVELS[s.level].rows)
      if (cell) answer(cell)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (intervals.of(settings).durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10
  const prompt = t(rows.includes('size') ? S['prompt.size'] : S['prompt.name'])
  const answerCell: Cell = { row: rowOf(question.interval, rows), size: question.interval.size }
  const line = feedback ? verdict(question, feedback, settings.naming, t) : null

  return (
    <>
      {/* Inert while paused: the sheet is the only thing to act on.
          touch-none: drags here never pan, pinch or double-tap zoom; taps still answer. */}
      <div
        inert={pausedAt !== null}
        className="mx-auto flex min-h-[100dvh] w-full touch-none max-w-md flex-col px-4 pb-6 md:max-w-3xl md:px-8 md:pb-10"
      >
        <RunHeader
          secondsLeft={secondsLeft}
          urgent={lastTen}
          correct={correct}
          wrong={wrong}
          onQuit={quit}
          t={t}
        />
        <div className="mt-3">
          <ProgressBar fraction={fraction} urgent={lastTen} transitionMs={TICK_MS} />
        </div>
        {/* Fixed height, so the staff does not jump when a streak appears. */}
        <div className="tnum mt-2 h-5 text-right text-sm text-accent md:text-base">
          {streak > 2 && t('run.streak', { count: streak })}
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-2 md:gap-4 md:py-6 [@media(max-height:900px)]:md:py-2 [@media(max-height:700px)]:gap-0 [@media(max-height:700px)]:py-0">
          <h2 className="text-lg font-semibold md:text-xl">{prompt}</h2>
          <IntervalStaff question={question} tone={feedback ? 'correct' : 'neutral'} />
          {/* Fixed height, so the staff does not jump when the verdict appears: two lines on a phone. */}
          <div className="flex h-14 items-center justify-center text-center md:h-11">
            {feedback && line && (feedback.correct ? (
              <div role="status" className="inline-flex items-center gap-2 rounded-full bg-correct/10 px-4 py-2 text-sm font-medium text-correct md:text-base">
                <CheckIcon size={16} weight="bold" aria-hidden />
                {line}
              </div>
            ) : (
              <MissLine text={line} />
            ))}
          </div>
        </div>

        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <IntervalGrid
            rows={rows}
            feedback={feedback ? { chosen: feedback.chosen, answer: answerCell } : null}
            onAnswer={answer}
            label={prompt}
            t={t}
          />
        </div>
      </div>
      <PausePanel
        open={pausedAt !== null}
        reason={shownReason}
        timeLeft={formatClock(secondsLeft)}
        played={formatElapsed(playedMs({ endsAt, pausedAt, settings }) / 1000, t)}
        correct={correct}
        wrong={wrong}
        onResume={() => useIntervalsStore.getState().resume()}
        onEnd={() => useIntervalsStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
