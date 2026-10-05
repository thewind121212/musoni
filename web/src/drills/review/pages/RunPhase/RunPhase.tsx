import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button, ProgressBar } from '@/core/components/atoms'
import { PausePanel, RunHeader, StepView } from '@/core/components/organisms'
import { useAppStore } from '@/app/store'
import { useRunGuards } from '@/app/useRunGuards'
import { useT } from '@/app/useT'
import { playPitch, preloadPiano, stopSounds } from '@/core/audio/playPitch'
import { answerFromKey, loneStaffNote } from '@/core/lesson/blocks'
import { plainText } from '@/core/lesson/text'
import { usePlayBlock } from '@/core/lesson/usePlayBlock'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import { CHAPTERS } from '@/theory/registry'
import { lessonNumber } from '@/theory/outline'
import { playedMs, useReviewStore, type PauseReason } from '@/drills/review/store'
import { findCheck } from '@/drills/review/select'
import review from '@/drills/review/drill'
import { REVIEW_FEEDBACK_CORRECT_MS, TICK_MS } from '@/config/constants'

/** ✕ and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useReviewStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/** Answers the check on screen and, for a key check, sounds the note it was about, as the lesson does. */
function answer(choice: number, correct: boolean) {
  const s = useReviewStore.getState()
  if (!s.checkId || s.feedback || s.pausedAt !== null) return
  const found = findCheck(CHAPTERS, s.checkId)
  s.answer(choice, correct)
  if (s.settings.sound && found?.check.answer.type === 'key') {
    const note = loneStaffNote(found.check.blocks)
    if (note) playPitch(note)
  }
}

const goOn = () => useReviewStore.getState().nextQuestion()

/**
 * Page: the timed review. Each question is a lesson's check, shown and judged
 * as the lesson shows it, with the lesson it comes from above. A right answer
 * moves on by itself; a wrong one waits on "Tiếp" so its reason can be read.
 * Owns the clock, the keyboard and the pause sheet, as every drill's run does.
 */
export function RunPhase() {
  const { checkId, feedback, endsAt, correct, wrong, settings, pausedAt, pauseReason } = useReviewStore()
  const prefs = useAppStore(s => s.settings)
  const t = useT()
  const reduce = useReducedMotion()
  const [now, setNow] = useState(() => Date.now())
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)
  const { playing, play } = usePlayBlock()
  const found = checkId ? findCheck(CHAPTERS, checkId) : null

  useRunGuards(useReviewStore.getState)

  useEffect(() => {
    if (useReviewStore.getState().settings.sound) void preloadPiano()
    return () => stopSounds()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useReviewStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  // A saved check whose lesson changed since: ask another.
  useEffect(() => {
    if (checkId && !found) goOn()
  }, [checkId, found])

  // Each question opens in silence; a right answer moves on by itself.
  useEffect(() => stopSounds(), [checkId])
  useEffect(() => {
    if (!feedback?.correct) return
    const id = setTimeout(goOn, REVIEW_FEEDBACK_CORRECT_MS)
    return () => clearTimeout(id)
  }, [feedback])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // The pause sheet handles its own Esc (it resumes) and marks the event.
      if (e.repeat || e.defaultPrevented) return
      const s = useReviewStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (s.pausedAt !== null || !s.checkId) return
      if (s.feedback) {
        if (e.key === 'Enter' && !(e.target instanceof HTMLButtonElement)) {
          e.preventDefault()
          goOn()
        }
        return
      }
      const check = findCheck(CHAPTERS, s.checkId)
      const picked = check && answerFromKey(check.check, e, s.settings.naming)
      if (picked) answer(picked.choice, picked.correct)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!found) return null

  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (review.of(settings).durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10
  const { ref } = found
  const eyebrow = t('theory.eyebrow', {
    number: lessonNumber(ref),
    title: plainText(ref.lesson.title[prefs.lang], settings.naming),
  })

  return (
    <>
      {/* Inert while paused: the sheet is the only thing to act on. */}
      <div inert={pausedAt !== null} className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col md:max-w-xl">
        <div className="px-4">
          <RunHeader secondsLeft={secondsLeft} urgent={lastTen} correct={correct} wrong={wrong} onQuit={quit} t={t} />
          <div className="mt-3">
            <ProgressBar fraction={fraction} urgent={lastTen} transitionMs={TICK_MS} />
          </div>
        </div>

        <main className="flex flex-1 flex-col px-4 pt-5 pb-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={checkId}
              initial={reduce ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -12, transition: { duration: 0.12 } }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-1 flex-col"
            >
              <StepView
                step={found.check}
                eyebrow={eyebrow}
                lang={prefs.lang} naming={settings.naming} t={t}
                answer={feedback} onAnswer={answer}
                onPlay={play} playing={playing}
                padLabels={settings.keyLabels} padLayout={settings.padStyle}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Always there, as in a lesson, so the answers never jump when it wakes. */}
        <div className="sticky bottom-0 z-10 border-t border-line bg-surface px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Button variant="primary" className="w-full text-base font-semibold" disabled={!feedback} onClick={goOn}>
            {t('theory.next')}
          </Button>
        </div>
      </div>
      <PausePanel
        open={pausedAt !== null}
        reason={shownReason}
        timeLeft={formatClock(secondsLeft)}
        played={formatElapsed(playedMs({ endsAt, pausedAt, settings }) / 1000, t)}
        correct={correct}
        wrong={wrong}
        onResume={() => useReviewStore.getState().resume()}
        onEnd={() => useReviewStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
