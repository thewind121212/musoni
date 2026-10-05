import { useEffect, useState } from 'react'
import { ProgressBar } from '@/core/components/atoms'
import { AnswerPad, PausePanel, RunHeader } from '@/core/components/organisms'
import { AnswerChips, ChordVerdict } from '@/drills/chords/components/molecules'
import { ChordStage } from '@/drills/chords/components/organisms'
import { playedMs, useChordStore, type PauseReason } from '@/drills/chords/store'
import { answerSound, chosenChord } from '@/drills/chords/generator'
import { QUALITIES } from '@/drills/chords/theory'
import { answerText, chosenText, keyText } from '@/drills/chords/wording'
import { useRunGuards } from '@/app/useRunGuards'
import { useT } from '@/app/useT'
import chords from '@/drills/chords/drill'
import { S, qualityKey } from '@/drills/chords/strings'
import { optionIndexFromKey } from '@/core/music/keyboard'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import { playSequence, preloadPiano, stopSounds } from '@/core/audio/playPitch'
import { CHORD_FEEDBACK_CORRECT_MS, CHORD_FEEDBACK_WRONG_MS, TICK_MS } from '@/config/constants'

/** The ✕ button and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useChordStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/**
 * Runs one pick on the store; when it completes the answer and listening is
 * on, plays the chord (on a miss, the reader's chord first).
 */
function pick(act: () => void) {
  const before = useChordStore.getState()
  if (before.feedback) return
  act()
  const s = useChordStore.getState()
  if (!s.feedback || !s.question || !chords.of(s.settings).listen) return
  stopSounds()
  playSequence(answerSound(s.question, chosenChord(s.question, s.feedback.answer)))
}

const pickRoot = (i: number) => pick(() => useChordStore.getState().pickRoot(i))
const pickQuality = (i: number) => pick(() => useChordStore.getState().pickQuality(QUALITIES[i]))
const pickDegree = (d: number) => pick(() => useChordStore.getState().pickDegree(d))

/** "1 · Nốt gốc": which half of the answer the controls below it give. */
const STEP_LABEL = 'mt-1 text-xs font-semibold tracking-wide text-ink-faint uppercase md:text-sm'

/** The digit a key press stands for (top row or keypad), or null. */
function digitOf(e: KeyboardEvent): number | null {
  const m = /^(?:Digit|Numpad)(\d)$/.exec(e.code) ?? /^(\d)$/.exec(e.key)
  return m ? Number(m[1]) : null
}

/**
 * Page: the chord-reading session. A triad on the staff; by name, the reader
 * taps its root on the pad and its quality (either first), or in a key its
 * Roman numeral. The answer then shows as its symbol and name, and plays
 * when listening is on. Computer keys: A-J and W-U for the root, 1-4 for the
 * quality, 1-7 for a numeral.
 *
 * Leaving pauses, like the other drills (see `useRunGuards`); pausing also
 * silences the sound.
 */
export function RunPhase() {
  const {
    question, endsAt, correct, wrong, streak, feedback, settings, pausedAt, pauseReason, pickedRoot, pickedQuality,
  } = useChordStore()
  const t = useT()
  const [now, setNow] = useState(() => Date.now())
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)

  useRunGuards(useChordStore.getState)

  useEffect(() => {
    if (chords.of(useChordStore.getState().settings).listen) void preloadPiano()
    return stopSounds
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useChordStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(
      () => useChordStore.getState().nextQuestion(),
      feedback.correct ? CHORD_FEEDBACK_CORRECT_MS : CHORD_FEEDBACK_WRONG_MS,
    )
    return () => clearTimeout(id)
  }, [feedback])

  const paused = pausedAt !== null
  useEffect(() => {
    if (paused) stopSounds()
  }, [paused])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Held keys auto-repeat; the pause sheet handles (and marks) its own Esc.
      if (e.repeat || e.defaultPrevented) return
      const s = useChordStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (!s.question || s.feedback || s.pausedAt !== null || e.ctrlKey || e.metaKey || e.altKey) return
      const digit = digitOf(e)
      if (s.question.kind === 'roman') {
        if (digit !== null && digit >= 1 && digit <= 7) pickDegree(digit - 1)
        return
      }
      if (digit !== null && digit >= 1 && digit <= QUALITIES.length) return pickQuality(digit - 1)
      const i = optionIndexFromKey(e, s.question.options)
      if (i !== null) pickRoot(i)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (chords.of(settings).durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10
  const roman = question.kind === 'roman'

  const verdict = feedback && {
    correct: feedback.correct,
    answer: answerText(question, t, settings.naming),
    chosen: feedback.correct ? null : t('result.youPicked', { chosen: chosenText(question, feedback.answer, t) }),
  }

  return (
    <>
      {/* Inert while paused: the panel above is the only thing to act on.
          touch-none: drags here never pan, pinch or double-tap zoom; taps still answer. */}
      <div
        inert={paused}
        className="mx-auto flex min-h-[100dvh] w-full touch-none max-w-md flex-col px-4 pb-4 md:max-w-3xl md:px-8 md:pb-10"
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
        <div className="tnum mt-1 h-5 text-right text-sm text-accent md:text-base">
          {streak > 2 && t('run.streak', { count: streak })}
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-2 md:gap-2 md:py-6 [@media(max-height:900px)]:md:py-2">
          <ChordStage
            prompt={t(roman ? S['prompt.roman'] : S.prompt)}
            keyLine={roman ? keyText(question.key, t, settings.naming) : null}
            notes={question.notes}
            keySignature={roman ? question.keySignature : null}
            answered={feedback !== null}
          />
          <ChordVerdict verdict={verdict} />
        </div>

        <div className="flex flex-col gap-1.5 md:mx-auto md:w-full md:max-w-2xl md:gap-2">
          {question.kind === 'roman' ? (
            <AnswerChips
              size="tall"
              label={t(S['step.numeral'])}
              chips={question.numerals.map((n, i) => ({ label: n, keyHint: String(i + 1) }))}
              feedback={feedback && 'degree' in feedback.answer
                ? { correctIndex: question.degree, chosenIndex: feedback.answer.degree }
                : null}
              onPick={pickDegree}
            />
          ) : (
            <>
              <p className={STEP_LABEL}>{t(S['step.root'])}</p>
              <AnswerPad
                options={question.options}
                feedback={feedback && 'root' in feedback.answer
                  ? { correctIndex: question.correctIndex, chosenIndex: feedback.answer.root }
                  : null}
                onAnswer={pickRoot}
                showLabels={settings.keyLabels}
                layout={settings.padStyle}
                selected={pickedRoot}
              />
              <p className={STEP_LABEL}>{t(S['step.quality'])}</p>
              <AnswerChips
                label={t(S['step.quality'])}
                chips={QUALITIES.map((q, i) => {
                  const off = !question.qualities.includes(q)
                  return { label: t(qualityKey(q)), keyHint: String(i + 1), disabled: off, note: off ? t(S['quality.notAsked']) : undefined }
                })}
                selected={pickedQuality === null ? null : QUALITIES.indexOf(pickedQuality)}
                feedback={feedback && 'quality' in feedback.answer
                  ? { correctIndex: QUALITIES.indexOf(question.quality), chosenIndex: QUALITIES.indexOf(feedback.answer.quality) }
                  : null}
                onPick={pickQuality}
              />
            </>
          )}
        </div>
      </div>
      <PausePanel
        open={paused}
        reason={shownReason}
        timeLeft={formatClock(secondsLeft)}
        played={formatElapsed(playedMs({ endsAt, pausedAt, settings }) / 1000, t)}
        correct={correct}
        wrong={wrong}
        onResume={() => useChordStore.getState().resume()}
        onEnd={() => useChordStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
