import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { useDrillStore } from '../store'
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
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-6">
      <header className="flex items-baseline justify-between pt-5">
        <button
          onClick={() => useDrillStore.getState().backToSetup()}
          className="text-sm text-ink-faint hover:text-ink"
        >
          Quit
        </button>
        <div className={'tnum text-3xl font-semibold ' + (lastTen ? 'text-wrong' : 'text-ink')}>
          {secondsLeft}
        </div>
        <div className="tnum text-sm text-ink-soft">
          {correct} correct{streak > 2 && <span className="ml-2 text-accent">{streak} in a row</span>}
        </div>
      </header>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
        <div
          className={'h-full rounded-full ' + (lastTen ? 'bg-wrong' : 'bg-accent')}
          style={{ width: `${fraction * 100}%`, transition: `width ${TICK_MS}ms linear` }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center py-6">
        <div className="w-full rounded-2xl border border-line bg-raised px-3 py-6">
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

      <div className="grid grid-cols-4 gap-2">
        {question.options.map((option, i) => {
          const isCorrect = !!feedback && i === feedback.correctIndex
          const isWrongPick = !!feedback && i === feedback.chosenIndex && !isCorrect
          const tone = isCorrect
            ? 'bg-correct text-white border-transparent'
            : isWrongPick
              ? 'bg-wrong text-white border-transparent'
              : 'border-line bg-raised text-ink'
          return (
            <button
              key={option.label}
              disabled={!!feedback}
              onClick={() => answer(i)}
              className={
                'relative flex min-h-16 items-center justify-center rounded-2xl border text-xl font-medium ' +
                'transition-[background-color,border-color,color] duration-150 active:scale-[0.97] ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' + tone
              }
            >
              {option.label}
              {isCorrect && <CheckIcon size={16} weight="bold" className="absolute top-1.5 right-1.5" />}
              {isWrongPick && <XIcon size={16} weight="bold" className="absolute top-1.5 right-1.5" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
