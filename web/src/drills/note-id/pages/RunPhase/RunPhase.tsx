import { useEffect, useState } from 'react'
import { MissLine, ProgressBar } from '@/core/components/atoms'
import { OctaveStrip } from '@/core/components/molecules'
import { AnswerPad, PausePanel, QuestionStaff, RunHeader } from '@/core/components/organisms'
import { playedMs, useDrillStore, type PauseReason } from '@/drills/note-id/store'
import { useRunGuards } from '@/app/useRunGuards'
import { optionIndexFromKey } from '@/core/music/keyboard'
import { useT } from '@/app/useT'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import { nearestOctave } from '@/core/music/pitch'
import { playPitch, preloadPiano } from '@/core/audio/playPitch'
import noteId from '@/drills/note-id/drill'
import { levelOctaves } from '@/drills/note-id/generator'
import { S } from '@/drills/note-id/strings'
import { FEEDBACK_CORRECT_MS, FEEDBACK_WRONG_MS, TICK_MS } from '@/config/constants'

/** The ✕ button and Esc: pause to ask, or just leave when nothing was answered yet. */
function quit() {
  const s = useDrillStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/**
 * Answers with pad key `i` and plays it: the printed note, or with the
 * octave setting the note picked, at the octave the strip is on.
 */
function answerKey(i: number) {
  const s = useDrillStore.getState()
  if (!s.question || s.feedback || s.pausedAt !== null) return
  const { question, octave } = s
  s.answer(i)
  if (!s.settings.sound) return
  const key = question.options[i]
  playPitch(noteId.of(s.settings).octave ? { letter: key.letter, accidental: key.accidental, octave } : question.pitch)
}

/** The octave a digit key names (2-6, top row or keypad), or null. */
function digitOf(e: KeyboardEvent): number | null {
  const m = /^(?:Digit|Numpad)(\d)$/.exec(e.code) ?? /^(\d)$/.exec(e.key)
  return m ? Number(m[1]) : null
}

/**
 * Page: owns the sprint's timers and keyboard, and feeds the drill store into
 * the header, staff and pad.
 *
 * Leaving never runs the clock down unseen. ✕ and Esc pause and ask; hiding
 * the page or leaving the route pauses too (see `useRunGuards`).
 */
export function RunPhase() {
  const { question, endsAt, correct, wrong, streak, feedback, settings, pausedAt, pauseReason, level, octave, misses } = useDrillStore()
  const t = useT()
  // The clock lives in state, refreshed each tick, so render stays pure.
  const [now, setNow] = useState(() => Date.now())
  // The sheet keeps its last content while it slides away after resuming.
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)

  useRunGuards(useDrillStore.getState)

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
      // The pause sheet handles its own Esc (it resumes) and marks the event;
      // acting on it here as well would pause again straight away.
      if (e.repeat || e.defaultPrevented) return
      const s = useDrillStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (!s.question || s.pausedAt !== null) return
      // The octave strip: digits jump to an octave the level has, arrows step.
      // Free keys here, since notes answer on letters. Allowed during feedback.
      if (noteId.of(s.settings).octave && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const { min, max } = levelOctaves(s.level)
        const digit = digitOf(e)
        const step = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
        if (digit !== null) {
          if (digit >= min && digit <= max) s.setOctave(digit)
          return
        }
        if (step) {
          e.preventDefault()
          s.setOctave(s.octave + step)
          return
        }
      }
      const i = optionIndexFromKey(e, s.question.options)
      if (i !== null) answerKey(i)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  // While paused the clock reads as it stood at the pause.
  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (noteId.of(settings).durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10

  const octaveOn = noteId.of(settings).octave
  const octaves = levelOctaves(level)

  // On a miss, the note the reader picked: at the octave picked on the strip,
  // or without one at the octave nearest the printed note, so the staff
  // shows how far off the read was.
  const wrongPick = feedback && !feedback.correct ? question.options[feedback.chosenIndex] : null
  const wrongChoice = wrongPick
    ? feedback?.octave !== undefined
      ? { letter: wrongPick.letter, accidental: wrongPick.accidental, octave: feedback.octave }
      : nearestOctave(wrongPick.letter, wrongPick.accidental, question.pitch)
    : null
  // The store names the miss (with its octaves when asked).
  const miss = wrongPick ? misses.at(-1) : undefined

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

        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4 md:py-8 [@media(max-height:900px)]:md:py-3 [@media(max-height:700px)]:gap-1 [@media(max-height:700px)]:py-1">
          <QuestionStaff
            clef={question.clef}
            pitch={question.pitch}
            tone={feedback ? (feedback.correct ? 'correct' : 'wrong') : 'neutral'}
            chosen={wrongChoice}
          />
          {/* Fixed height, so the staff does not jump when a miss is named. */}
          <div className="flex h-10 items-center">
            {miss && <MissLine text={t('run.missed', { answer: miss.answer, chosen: miss.chosen })} />}
          </div>
        </div>

        <div className="md:mx-auto md:w-full md:max-w-2xl">
          {octaveOn && (
            <div className="mb-2">
              <OctaveStrip
                min={octaves.min} max={octaves.max} value={octave}
                onChange={n => useDrillStore.getState().setOctave(n)}
                label={t(S['octave.strip'])}
                valueText={t(S['octave.n'], { n: octave })}
              />
            </div>
          )}
          <AnswerPad
            options={question.options} feedback={feedback} onAnswer={answerKey}
            showLabels={settings.keyLabels}
            layout={settings.padStyle}
          />
          {octaveOn && (
            <p data-testid="octave-now" className="mt-2 text-center text-sm font-semibold text-ink-soft">
              {t(S['octave.n'], { n: octave })}
              <span className="hidden font-normal text-ink-faint md:inline"> · {octaves.min}–{octaves.max} ← →</span>
            </p>
          )}
        </div>
      </div>
      <PausePanel
        open={pausedAt !== null}
        reason={shownReason}
        timeLeft={formatClock(secondsLeft)}
        played={formatElapsed(playedMs({ endsAt, pausedAt, settings }) / 1000, t)}
        correct={correct}
        wrong={wrong}
        onResume={() => useDrillStore.getState().resume()}
        onEnd={() => useDrillStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
