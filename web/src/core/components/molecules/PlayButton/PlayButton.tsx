import type { ReactNode } from 'react'
import { PlayIcon, SpeakerHighIcon } from '@phosphor-icons/react'

interface Props {
  /** "Nghe Sol", or just "Nghe". */
  children: ReactNode
  onPlay: () => void
  /** While its sound rings: the icon changes so a tap reads as heard. */
  playing?: boolean
}

/** The "Nghe" button: plays what the step shows. A quiet pill, never the amber start colour. */
export function PlayButton({ children, onPlay, playing = false }: Props) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-raised px-4
                 text-sm font-semibold text-ink transition-[border-color,transform] duration-150
                 hover:border-ink-faint active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-accent"
    >
      {playing
        ? <SpeakerHighIcon size={16} weight="fill" aria-hidden className="text-accent" />
        : <PlayIcon size={14} weight="fill" aria-hidden />}
      {/* One flex item, so the gap does not split "Nghe" from a note name. */}
      <span>{children}</span>
    </button>
  )
}
