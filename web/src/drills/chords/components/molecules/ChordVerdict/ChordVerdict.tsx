import { CheckIcon, XIcon } from '@phosphor-icons/react'

interface Props {
  /** Null before the answer: the line keeps its height, empty. */
  verdict: { correct: boolean; answer: string; chosen: string | null } | null
}

/**
 * The answer in words under the staff: its symbol and name ("Am/C · La thứ,
 * thế đảo 1"), green when right; red when missed, with what was picked on a
 * second line. Fixed height, so the staff and keys never move when it shows.
 */
export function ChordVerdict({ verdict }: Props) {
  return (
    <div className="flex h-14 items-center justify-center md:h-16 [@media(max-height:640px)]:h-12">
      {verdict && (
        <div
          role="status"
          className={
            'flex max-w-full flex-col items-center rounded-2xl px-4 py-1.5 text-center max-[359px]:px-3 max-[359px]:py-1 '
            + (verdict.correct ? 'bg-correct/10 text-correct' : 'bg-wrong/10 text-wrong')
          }
        >
          <span className="flex items-center gap-1.5 text-sm leading-snug font-semibold max-[359px]:text-[13px] max-[359px]:leading-tight md:text-base">
            {verdict.correct
              ? <CheckIcon size={15} weight="bold" aria-hidden className="shrink-0" />
              : <XIcon size={15} weight="bold" aria-hidden className="shrink-0" />}
            {verdict.answer}
          </span>
          {verdict.chosen && <span className="text-xs leading-snug md:text-sm">{verdict.chosen}</span>}
        </div>
      )}
    </div>
  )
}
