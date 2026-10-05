import { useEffect, useRef, useState } from 'react'
import { ArrowClockwiseIcon, CheckIcon } from '@phosphor-icons/react'
import { Button, MissLine, ProgressBar } from '@/core/components/atoms'
import { AnswerPad, PausePanel, RunHeader } from '@/core/components/organisms'
import { ListenStage } from '@/drills/hear-play/components/organisms'
import { playedMs, useEarStore, type PauseReason } from '@/drills/hear-play/store'
import { answerSound, chosenPitch, questionSound, type EarQuestion } from '@/drills/hear-play/generator'
import { useRunGuards } from '@/app/useRunGuards'
import { useT } from '@/app/useT'
import hearPlay from '@/drills/hear-play/drill'
import { S } from '@/drills/hear-play/strings'
import { optionIndexFromKey } from '@/core/music/keyboard'
import { tonicOf } from '@/core/music/keys'
import { label } from '@/core/music/pitch'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import { playSequence, preloadPiano, stopSounds, type SoundEvent } from '@/core/audio/playPitch'
import { EAR_FEEDBACK_CORRECT_MS, EAR_FEEDBACK_WRONG_MS, TICK_MS } from '@/config/constants'

/** The ✕ button and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useEarStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/** How long a set of sound events runs, in ms. */
function lengthMs(events: SoundEvent[]) {
  return Math.max(0, ...events.map(e => (e.at + e.hold) * 1000))
}

/**
 * Plays the question (with its cadence when asked) and starts the answer
 * clock from the moment the note sounds. Returns when the sound ends.
 */
function playQuestion(question: EarQuestion, withCadence: boolean): number {
  stopSounds()
  const { events, noteAt } = questionSound(question, withCadence)
  const now = Date.now()
  playSequence(events)
  useEarStore.getState().heard(now + noteAt * 1000)
  return now + lengthMs(events)
}

/** Answers with pad index `i`, and plays what the answer teaches. */
function answer(i: number) {
  const s = useEarStore.getState()
  const q = s.question
  if (!q || s.feedback || s.pausedAt !== null) return
  stopSounds()
  s.answer(i)
  playSequence(answerSound(q, i === q.correctIndex ? null : chosenPitch(q, i)))
}

/**
 * Page: the hear-and-play session. Each question plays (the cadence first in
 * a new key), the reader answers on the pad, and the note is revealed on the
 * staff while its sound teaches the answer: a walk home when right, the pick
 * then the note when wrong. Space or the replay button plays the cadence and
 * note again, free.
 *
 * Leaving pauses, like the note-id sprint (see `useRunGuards`); pausing also
 * silences the sound, and resuming plays the cadence again, since the ear has
 * lost the key by then.
 */
export function RunPhase() {
  const { question, endsAt, correct, wrong, streak, feedback, settings, pausedAt, pauseReason } = useEarStore()
  const t = useT()
  const [now, setNow] = useState(() => Date.now())
  // When the current sound stops: the ear pulses until then.
  const [soundUntil, setSoundUntil] = useState(0)
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)

  useRunGuards(useEarStore.getState)

  useEffect(() => { void preloadPiano() }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useEarStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  // Play each question as it arrives: with the cadence in a new key, on
  // opening the screen (coming back to a session) and after a pause, since by
  // then the ear has lost the key. A pause or leaving silences it. With the
  // "key before every note" aid, the cadence plays before every question.
  const played = useRef<EarQuestion | null>(null)
  const paused = pausedAt !== null
  useEffect(() => {
    const s = useEarStore.getState()
    if (!question || paused || s.feedback) return
    const cadence = played.current === null || played.current === question || question.newKey
      || hearPlay.of(s.settings).cadenceEach
    played.current = question
    setSoundUntil(playQuestion(question, cadence))
    return stopSounds
  }, [question, paused])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(
      () => useEarStore.getState().nextQuestion(),
      feedback.correct ? EAR_FEEDBACK_CORRECT_MS : EAR_FEEDBACK_WRONG_MS,
    )
    return () => clearTimeout(id)
  }, [feedback])

  const replay = () => {
    const s = useEarStore.getState()
    if (!s.question || s.feedback || s.pausedAt !== null) return
    setSoundUntil(playQuestion(s.question, true))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Held keys auto-repeat; the pause sheet handles (and marks) its own Esc.
      if (e.repeat || e.defaultPrevented) return
      const s = useEarStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (!s.question || s.feedback || s.pausedAt !== null) return
      if (e.key === ' ') {
        e.preventDefault()
        setSoundUntil(playQuestion(s.question, true))
        return
      }
      const i = optionIndexFromKey(e, s.question.options)
      if (i !== null) answer(i)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (hearPlay.of(settings).durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10
  const tonic = tonicOf(question.key)
  const keyName = label(tonic.letter, tonic.accidental, settings.naming)
  const answerLabel = question.options[question.correctIndex].label

  return (
    <>
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

        {/* The key, which the cadence sets, and the streak: fixed height so nothing below jumps. */}
        <div className="mt-2 flex h-6 items-center justify-between gap-2 text-sm md:text-base">
          <span className="flex items-center gap-2">
            <span className="font-medium text-ink-soft">{t(S.key, { key: keyName })}</span>
            {question.keyChanged && !feedback && (
              <span className="rounded-full bg-accent/12 px-2 py-0.5 text-xs font-semibold text-accent">
                {t(S.newKey)}
              </span>
            )}
          </span>
          <span className="tnum text-accent">{streak > 2 && t('run.streak', { count: streak })}</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-4 md:py-8 [@media(max-height:900px)]:md:py-3 [@media(max-height:700px)]:gap-1 [@media(max-height:700px)]:py-1">
          <ListenStage
            pitch={question.pitch}
            revealed={feedback !== null}
            listening={now < soundUntil && !paused}
            tone={feedback ? (feedback.correct ? 'correct' : 'wrong') : 'neutral'}
            chosen={feedback && !feedback.correct ? chosenPitch(question, feedback.chosenIndex) : null}
            prompt={t(S.prompt)}
          />
          {/* Fixed height: the line under the stage swaps between replay and the verdict. */}
          <div className="flex h-11 items-center">
            {!feedback ? (
              <Button variant="ghost" className="min-h-10 px-4 text-sm" onClick={replay}>
                <ArrowClockwiseIcon size={16} weight="bold" /> {t(S.replay)}
                <kbd className="hidden rounded border border-line px-1 font-mono text-[11px] text-ink-faint md:inline">Space</kbd>
              </Button>
            ) : feedback.correct ? (
              <div role="status" className="inline-flex items-center gap-2 rounded-full bg-correct/10 px-4 py-2 text-sm font-medium text-correct md:text-base">
                <CheckIcon size={16} weight="bold" aria-hidden />
                {t(S.right, { answer: answerLabel })}
              </div>
            ) : (
              <MissLine text={t(S.missed, { answer: answerLabel, chosen: question.options[feedback.chosenIndex].label })} />
            )}
          </div>
        </div>

        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <AnswerPad
            options={question.options} feedback={feedback} onAnswer={answer}
            showLabels={settings.keyLabels}
            layout={settings.padStyle}
            home={{ index: question.tonicIndex, label: t(S.home) }}
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
        onResume={() => useEarStore.getState().resume()}
        onEnd={() => useEarStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
