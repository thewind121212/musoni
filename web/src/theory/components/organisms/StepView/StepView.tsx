import { useMemo } from 'react'
import type { Naming } from '@/core/music/types'
import type { Lang, Translate } from '@/core/i18n/translate'
import { nearestOctave } from '@/core/music/pitch'
import { AnswerPad } from '@/core/components/organisms'
import { RichText } from '../../atoms'
import { CheckVerdict, ChoiceList } from '../../molecules'
import { LessonBlocks } from '../LessonBlocks'
import { loneStaffNote, padFor } from '@/theory/blocks'
import type { CheckStep, PlayBlock, Step } from '@/theory/types'

export interface StepAnswer {
  choice: number
  correct: boolean
}

interface Props {
  step: Step
  /** Small caps over the title: "Bài 1.2 · Khuông nhạc và khóa" (explain) or "Thử nhé" (check). */
  eyebrow: string
  lang: Lang
  naming: Naming
  t: Translate
  /** This check's answer, or null before it. */
  answer: StepAnswer | null
  onAnswer: (choice: number, correct: boolean) => void
  onPlay: (block: PlayBlock) => void
  playing?: PlayBlock | null
  /** The reader's answer-pad settings: names on keys, piano or boxes. */
  padLabels: boolean
  padLayout: 'piano' | 'boxes'
}

/**
 * One step of a lesson. An explain step is a title over its blocks. A check
 * asks, shows what to look at, takes one answer (the piano pad at the bottom,
 * or a list of choices) and then says right or not and why. Pure: the page
 * holds the answer and plays the sound.
 */
export function StepView({ step, eyebrow, lang, naming, t, answer, onAnswer, onPlay, playing, padLabels, padLayout }: Props) {
  const text = (s: { vi: string; en: string }) => <RichText text={s[lang]} naming={naming} />
  if (step.kind === 'explain') {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{eyebrow}</p>
        <h1 className="text-[26px] leading-tight font-bold tracking-tight md:text-3xl">{text(step.title)}</h1>
        <LessonBlocks blocks={step.blocks} lang={lang} naming={naming} t={t} onPlay={onPlay} playing={playing} />
      </div>
    )
  }
  return <Check {...{ step, eyebrow, lang, naming, t, answer, onAnswer, onPlay, playing, padLabels, padLayout }} />
}

function Check({ step, eyebrow, lang, naming, t, answer, onAnswer, onPlay, playing, padLabels, padLayout }: Props & { step: CheckStep }) {
  const text = (s: { vi: string; en: string }) => <RichText text={s[lang]} naming={naming} />
  const key = step.answer.type === 'key' ? step.answer : null
  const pad = useMemo(() => (key ? padFor(key, naming) : null), [key, naming])
  const lone = useMemo(() => loneStaffNote(step.blocks), [step.blocks])

  let verdict: string | null = null
  let chosen = null
  if (answer && pad) {
    const right = pad.options[pad.correctIndex].label
    verdict = t(answer.correct ? 'theory.rightIs' : 'theory.wrongIs', { answer: right })
    const pick = pad.options[answer.choice]
    if (!answer.correct && lone && pick) chosen = nearestOctave(pick.letter, pick.accidental, lone)
  } else if (answer) {
    verdict = t(answer.correct ? 'theory.right' : 'theory.wrong')
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{eyebrow}</p>
      <h2 className="text-xl leading-snug font-semibold tracking-tight md:text-2xl">{text(step.prompt)}</h2>
      {step.blocks && (
        <LessonBlocks
          blocks={step.blocks} lang={lang} naming={naming} t={t} onPlay={onPlay} playing={playing}
          tone={answer ? 'correct' : 'neutral'} chosen={chosen}
        />
      )}
      {answer && verdict && <CheckVerdict correct={answer.correct} title={verdict} reason={text(step.reason)} />}
      {step.answer.type === 'choice' && (
        <div className="mt-auto pt-2">
          <ChoiceList
            options={step.answer.choices.map(c => text(c.text))}
            correctIndex={step.answer.choices.findIndex(c => c.correct)}
            chosen={answer?.choice ?? null}
            onChoose={i => onAnswer(i, step.answer.type === 'choice' && step.answer.choices[i].correct === true)}
          />
        </div>
      )}
      {pad && (
        <div className="mt-auto pt-2">
          <AnswerPad
            options={pad.options}
            feedback={answer ? { correctIndex: pad.correctIndex, chosenIndex: answer.choice } : null}
            onAnswer={i => onAnswer(i, i === pad.correctIndex)}
            showLabels={key?.labels === false ? false : padLabels}
            layout={padLayout}
          />
        </div>
      )}
    </div>
  )
}
