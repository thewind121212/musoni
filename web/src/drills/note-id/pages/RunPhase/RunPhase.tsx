import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ProgressBar } from '@/core/components/atoms'
import { AnswerPad, PausePanel, QuestionStaff, RunHeader } from '@/drills/note-id/components/organisms'
import { MissLine } from '@/drills/note-id/components/atoms'
import { playedMs, useDrillStore } from '@/drills/note-id/store'
import { useAppStore } from '@/app/store'
import { optionIndexFromKey } from '@/drills/note-id/keyboard'
import { useT } from '@/app/useT'
import { formatElapsed } from '@/core/i18n/formatDuration'
import { nearestOctave } from '@/core/music/pitch'
import { playPitch, preloadPiano } from '@/core/audio/playPitch'
import { FEEDBACK_CORRECT_MS, FEEDBACK_WRONG_MS, TICK_MS } from '@/config/constants'

// How many RunPhase instances are mounted. StrictMode unmounts and remounts
// every component once in development, so an unmount only means the reader
// left if nothing has mounted again by the next task.
let mountedCount = 0

/** The ✕ button and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useDrillStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/**
 * Page: owns the sprint's timers and keyboard, and feeds the drill store into
 * the header, staff and pad.
 *
 * Leaving never runs the clock down unseen. ✕ and Esc pause and ask; hiding
 * the page (switching apps, locking the phone) pauses and welcomes the reader
 * back; leaving the route (back, swipe) pauses and tells home, which offers
 * the way back in.
 */
export function RunPhase() {
  const { question, endsAt, correct, wrong, streak, feedback, settings, pausedAt, pauseReason } = useDrillStore()
  const t = useT()
  const { pathname } = useLocation()
  // The clock lives in state, refreshed each tick, so render stays pure.
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    mountedCount++
    return () => {
      mountedCount--
      setTimeout(() => {
        if (mountedCount > 0) return
        const s = useDrillStore.getState()
        if (s.phase !== 'running') return
        // Nothing answered means nothing to come back for.
        if (s.correct + s.wrong === 0) return s.backToSetup()
        s.pause('away')
        const left = useDrillStore.getState()
        useAppStore.getState().setPausedSession({
          to: pathname,
          secondsLeft: Math.ceil((left.endsAt! - left.pausedAt!) / 1000),
          correct: left.correct,
          wrong: left.wrong,
        })
      }, 0)
    }
  }, [pathname])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) useDrillStore.getState().pause('away')
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  // Start fetching the piano samples as the sprint opens, so the first answers
  // are already on the piano rather than the sine fallback.
  useEffect(() => {
    if (useDrillStore.getState().settings.sound) void preloadPiano()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useDrillStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(
      () => useDrillStore.getState().nextQuestion(),
      feedback.correct ? FEEDBACK_CORRECT_MS : FEEDBACK_WRONG_MS,
    )
    return () => clearTimeout(id)
  }, [feedback])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // A held key auto-repeats; without this it would answer the next
      // question too, the moment the feedback flash clears.
      if (e.repeat) return
      const s = useDrillStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        else s.resume()
        return
      }
      if (!s.question || s.feedback || s.pausedAt !== null) return
      const i = optionIndexFromKey(e, s.question.options)
      if (i === null) return
      s.answer(i)
      if (s.settings.sound) playPitch(s.question.pitch)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  // While paused the clock reads as it stood at the pause.
  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (settings.durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10

  // On a miss, the note the reader picked, placed at the octave nearest the
  // printed one so the staff shows how far off the read was.
  const wrongPick = feedback && !feedback.correct ? question.options[feedback.chosenIndex] : null
  const wrongChoice = wrongPick
    ? nearestOctave(wrongPick.letter, wrongPick.accidental, question.pitch)
    : null

  const answer = (i: number) => {
    const s = useDrillStore.getState()
    if (!s.question || s.feedback || s.pausedAt !== null) return
    const pitch = s.question.pitch
    s.answer(i)
    if (s.settings.sound) playPitch(pitch)
  }

  return (
    <>
      {/* Inert while paused: the panel above is the only thing to act on. */}
      <div
        inert={pausedAt !== null}
        className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-6 md:max-w-3xl md:px-8 md:pb-10"
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

        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4 md:py-8">
          <QuestionStaff
            clef={question.clef}
            pitch={question.pitch}
            tone={feedback ? (feedback.correct ? 'correct' : 'wrong') : 'neutral'}
            chosen={wrongChoice}
          />
          {/* Fixed height, so the staff does not jump when a miss is named. */}
          <div className="flex h-10 items-center">
            {feedback && !feedback.correct && (
              <MissLine
                text={t('run.missed', {
                  answer: question.options[feedback.correctIndex].label,
                  chosen: question.options[feedback.chosenIndex].label,
                })}
              />
            )}
          </div>
        </div>

        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <AnswerPad options={question.options} feedback={feedback} onAnswer={answer} />
        </div>
      </div>
      {pausedAt !== null && (
        <PausePanel
          reason={pauseReason ?? 'menu'}
          secondsLeft={secondsLeft}
          timeLeft={formatElapsed(secondsLeft, t)}
          played={formatElapsed(playedMs({ endsAt, pausedAt, settings }) / 1000, t)}
          correct={correct}
          wrong={wrong}
          onResume={() => useDrillStore.getState().resume()}
          onEnd={() => useDrillStore.getState().endEarly()}
          t={t}
        />
      )}
    </>
  )
}
