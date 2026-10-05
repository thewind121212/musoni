import { CheckIcon, XIcon } from '@phosphor-icons/react'

interface Props {
  /** "La trưởng: 3 thăng, thăng cuối Sol# + nửa cung". */
  text: string
  correct: boolean
}

/**
 * The verdict under the staff: the key and the rule that finds it, green with
 * a check when right, red with a cross when wrong. On a phone it takes two
 * lines, so it is a centred box with the icon in the text, not a pill.
 */
export function RuleLine({ text, correct }: Props) {
  const Icon = correct ? CheckIcon : XIcon
  return (
    <p
      role="status"
      className={
        'max-w-full rounded-2xl px-4 py-2 text-center text-sm leading-snug font-medium text-balance md:text-base ' +
        (correct ? 'bg-correct/10 text-correct' : 'bg-wrong/10 text-wrong')
      }
    >
      <Icon size={15} weight="bold" aria-hidden className="mr-1.5 inline-block align-[-2px]" />
      {text}
    </p>
  )
}
