import { CheckIcon } from '@phosphor-icons/react'

export type LessonState = 'done' | 'current' | 'todo'

interface Props {
  state: LessonState
  /** What the dot shows when not done: the lesson's number, or a short mark for a review. */
  mark: string
  /** Spoken state, e.g. "Done" or "Up next"; omitted for a plain lesson. */
  label?: string
  size?: 'sm' | 'lg'
}

/** A lesson's place on the path: a green tick once done, a blue ring when up next, else its number. */
export function LessonDot({ state, mark, label, size = 'sm' }: Props) {
  const box = size === 'lg' ? 'size-8 text-[15px]' : 'size-[26px] text-xs'
  const tone = state === 'done'
    ? 'border-correct bg-correct text-white'
    : state === 'current' ? 'border-2 border-accent text-accent' : 'border-line text-ink-faint'
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full border-[1.5px] font-semibold ${box} ${tone}`}>
      {state === 'done' ? <CheckIcon size={size === 'lg' ? 16 : 13} weight="bold" aria-hidden /> : <span aria-hidden>{mark}</span>}
      {label && <span className="sr-only">{label}</span>}
    </span>
  )
}
