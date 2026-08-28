import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useDrillStore } from '../store'
import { AnswerGrid } from './AnswerGrid'
import { optionIndexFromKey } from '../keyboard'
import { Staff } from '../../../core/components/Staff'
import { playPitch } from '../../../core/audio/playPitch'
import { FEEDBACK_MS, TICK_MS } from '../../../config/constants'

export function RunPhase() {
  const { question, endsAt, correct, streak, feedback, settings } = useDrillStore()
  const reduce = useReducedMotion()
  const [, forceRender] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      useDrillStore.getState().tick()
      forceRender(n => n + 1)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(() => useDrillStore.getState().nextQuestion(), FEEDBACK_MS)
    return () => clearTimeout(id)
  }, [feedback])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useDrillStore.getState()
      if (!s.question || s.feedback) return
      const i = optionIndexFromKey(e.key, s.question.options.length)
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

  const answer = (i: number) => {
    const s = useDrillStore.getState()
    if (!s.question || s.feedback) return
    const pitch = s.question.pitch
    s.answer(i)
    if (s.settings.sound) playPitch(pitch)
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-6 md:max-w-3xl md:px-8 md:pb-10">
      <header className="flex items-baseline justify-between pt-5">
        <button
          onClick={() => useDrillStore.getState().backToSetup()}
          className="text-sm text-ink-faint hover:text-ink"
        >
          Quit
        </button>
        <div className={'tnum text-3xl font-semibold md:text-5xl ' + (lastTen ? 'text-wrong' : 'text-ink')}>
          {secondsLeft}
        </div>
        <div className="tnum text-sm text-ink-soft md:text-base">
          {correct} correct{streak > 2 && <span className="ml-2 text-accent">{streak} in a row</span>}
        </div>
      </header>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
        <div
          className={'h-full rounded-full ' + (lastTen ? 'bg-wrong' : 'bg-accent')}
          style={{ width: `${fraction * 100}%`, transition: `width ${TICK_MS}ms linear` }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center py-6 md:py-10">
        <div className="w-full rounded-2xl border border-line bg-raised px-3 py-6 md:mx-auto md:max-w-2xl md:px-10 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${question.pitch.letter}${question.pitch.accidental}${question.pitch.octave}${question.clef}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <Staff clef={question.clef} pitch={question.pitch} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="md:mx-auto md:w-full md:max-w-2xl">
        <AnswerGrid options={question.options} feedback={feedback} onAnswer={answer} />
      </div>
    </div>
  )
}
