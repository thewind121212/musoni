import { useEffect, useState } from 'react'
import { ProgressBar } from '@/core/components/atoms'
import { AnswerPad, QuestionStaff, RunHeader } from '@/drills/note-id/components/organisms'
import { useDrillStore } from '@/drills/note-id/store'
import { optionIndexFromKey } from '@/drills/note-id/keyboard'
import { useT } from '@/app/useT'
import { nearestOctave } from '@/core/music/pitch'
import { playPitch, preloadPiano } from '@/core/audio/playPitch'
import { FEEDBACK_CORRECT_MS, FEEDBACK_WRONG_MS, TICK_MS } from '@/config/constants'

/** Page: owns the sprint's timers and keyboard, and feeds the drill store into the header, staff and pad. */
export function RunPhase() {
  const { question, endsAt, correct, wrong, streak, feedback, settings } = useDrillStore()
  const t = useT()
  const [, forceRender] = useState(0)

  // Start fetching the piano samples as the sprint opens, so the first answers
  // are already on the piano rather than the sine fallback.
  useEffect(() => {
    if (useDrillStore.getState().settings.sound) void preloadPiano()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      useDrillStore.getState().tick()
      forceRender(n => n + 1)
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
      if (!s.question || s.feedback) return
      const i = optionIndexFromKey(e, s.question.options)
      if (i === null) return
      s.answer(i)
      if (s.settings.sound) playPitch(s.question.pitch)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null

  const msLeft = endsAt ? Math.max(0, endsAt - Date.now()) : 0
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
    if (!s.question || s.feedback) return
    const pitch = s.question.pitch
    s.answer(i)
    if (s.settings.sound) playPitch(pitch)
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-6 md:max-w-3xl md:px-8 md:pb-10">
      <RunHeader
        secondsLeft={secondsLeft}
        urgent={lastTen}
        correct={correct}
        wrong={wrong}
        onQuit={() => useDrillStore.getState().backToSetup()}
        t={t}
      />

      <div className="mt-3">
        <ProgressBar fraction={fraction} urgent={lastTen} transitionMs={TICK_MS} />
      </div>
      {/* Fixed height, so the staff does not jump when a streak appears. */}
      <div className="tnum mt-2 h-5 text-right text-sm text-accent md:text-base">
        {streak > 2 && t('run.streak', { count: streak })}
      </div>

      <div className="flex flex-1 items-center justify-center py-6 md:py-10">
        <QuestionStaff
          clef={question.clef}
          pitch={question.pitch}
          tone={feedback ? (feedback.correct ? 'correct' : 'wrong') : 'neutral'}
          chosen={wrongChoice}
        />
      </div>

      <div className="md:mx-auto md:w-full md:max-w-2xl">
        <AnswerPad options={question.options} feedback={feedback} onAnswer={answer} />
      </div>
    </div>
  )
}
