import { XIcon } from '@phosphor-icons/react'

interface Props {
  /** The full sentence, e.g. "That was G, you picked A". */
  text: string
}

/**
 * Names a miss in words under the staff. Colour on the keys says that the
 * answer was wrong; this says what the note was, which is the part to learn.
 */
export function MissLine({ text }: Props) {
  return (
    <div
      role="status"
      className="inline-flex items-center gap-2 rounded-full bg-wrong/10 px-4 py-2 text-sm font-medium text-wrong md:text-base"
    >
      <XIcon size={16} weight="bold" aria-hidden />
      {text}
    </div>
  )
}
