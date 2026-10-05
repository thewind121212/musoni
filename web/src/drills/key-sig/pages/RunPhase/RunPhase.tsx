import { useEffect, useState } from 'react'
import { ProgressBar } from '@/core/components/atoms'
import { AnswerPad, PausePanel, RunHeader } from '@/core/components/organisms'
import { useRunGuards } from '@/app/useRunGuards'
import { useT } from '@/app/useT'
import { optionIndexFromKey } from '@/core/music/keyboard'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import { playSequence, preloadPiano, stopSounds } from '@/core/audio/playPitch'
import { KEY_SIG_FEEDBACK_CORRECT_MS, KEY_SIG_FEEDBACK_WRONG_MS, KEY_SIG_STAFF_WIDTH, TICK_MS } from '@/config/constants'
import { playedMs, useKeySigStore, type PauseReason } from '@/drills/key-sig/store'
import { answerSound } from '@/drills/key-sig/generator'
import { ruleText } from '@/drills/key-sig/rule'
import { RuleLine } from '@/drills/key-sig/components/molecules'
import { SignatureStaff } from '@/drills/key-sig/components/organisms'
import keySig from '@/drills/key-sig/drill'
import { S } from '@/drills/key-sig/strings'

/** The ✕ button and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useKeySigStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/** Answers with pad index `i`, and plays the key's home chord (after the pick, on a miss). */
function answer(i: number) {
  const s = useKeySigStore.getState()
  const q = s.question
  if (!q || s.feedback || s.pausedAt !== null) return
  s.answer(i)
  if (s.settings.sound) {
    stopSounds()
    playSequence(answerSound(q, i))
  }
}

/**
 * Page: the key-signature session. The question names the mode ("Giọng
 * trưởng nào?", at level 4 sometimes "Giọng thứ nào?"), the staff shows a
 * signature with no notes, and the reader taps the key's home note on the
 * pad, spelled the key's way. The line under the staff then names the key and
 * the rule that finds it.
 *
 * Leaving pauses, like the other drills (see `useRunGuards`).
 */
export function RunPhase() {
  const { question, endsAt, correct, wrong, streak, feedback, settings, pausedAt, pauseReason } = useKeySigStore()
  const t = useT()
  // The clock lives in state, refreshed each tick, so render stays pure.
  const [now, setNow] = useState(() => Date.now())
  // The sheet keeps its last content while it slides away after resuming.
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)

  useRunGuards(useKeySigStore.getState)

  // Fetch the piano samples as the session opens, so the first chords are on the piano.
  useEffect(() => {
    if (useKeySigStore.getState().settings.sound) void preloadPiano()
    return stopSounds
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useKeySigStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(
      () => useKeySigStore.getState().nextQuestion(),
      feedback.correct ? KEY_SIG_FEEDBACK_CORRECT_MS : KEY_SIG_FEEDBACK_WRONG_MS,
    )
    return () => clearTimeout(id)
  }, [feedback])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Held keys auto-repeat; the pause sheet handles (and marks) its own Esc.
      if (e.repeat || e.defaultPrevented) return
      const s = useKeySigStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (!s.question || s.feedback || s.pausedAt !== null) return
      const i = optionIndexFromKey(e, s.question.options)
      if (i !== null) answer(i)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  // While paused the clock reads as it stood at the pause.
  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (keySig.of(settings).durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10
  // "Giọng {mode} nào?" with the mode word in colour: the one word that changes at level 4.
  const [before, after] = t(S.ask, { mode: '\u0000' }).split('\u0000')
  const mode = t(question.mode === 'major' ? S['mode.major'] : S['mode.minor'])

  return (
    <>
      {/* Inert while paused: the panel above is the only thing to act on.
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

        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-3 md:gap-5 md:py-6 [@media(max-height:900px)]:md:py-3 [@media(max-height:700px)]:gap-1.5 [@media(max-height:700px)]:py-1">
          <h2 className="text-center text-xl font-semibold md:text-2xl">
            {before}<span className="text-accent">{mode}</span>{after}
          </h2>
          <div className="mx-auto w-full max-w-sm md:max-w-md [@media(max-height:700px)]:max-w-[17rem]">
            <SignatureStaff fifths={question.fifths} clef={question.clef} width={KEY_SIG_STAFF_WIDTH} />
          </div>
          {/* Fixed height for two lines, so nothing jumps when the rule appears. */}
          <div className="flex h-16 w-full items-center justify-center md:h-14">
            {feedback && (
              <RuleLine
                correct={feedback.correct}
                text={ruleText(question.fifths, question.mode, settings.naming, t)}
              />
            )}
          </div>
        </div>

        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <AnswerPad
            options={question.options} feedback={feedback} onAnswer={answer}
            showLabels={settings.keyLabels}
            layout={settings.padStyle}
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
        onResume={() => useKeySigStore.getState().resume()}
        onEnd={() => useKeySigStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
