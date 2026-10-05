import { SparkleIcon } from '@phosphor-icons/react'

interface Props {
  /** "3 bài luyện nữa mở dần khi bạn học." */
  text: string
  /** "Xem tất cả" or, once shown, "Thu gọn". */
  actionLabel: string
  /** Whether the drills still to open are shown below. */
  expanded: boolean
  onToggle: () => void
}

/**
 * The quiet line under Luyện's drills: how many are still to open as the
 * reader learns, and the way to see (and play) them all now. Nothing is
 * hard-locked; this only keeps a beginner's first list short.
 */
export function MoreDrills({ text, actionLabel, expanded, onToggle }: Props) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-dashed border-line px-4 py-3.5 text-sm text-ink-soft">
      <SparkleIcon size={16} weight="fill" className="mt-0.5 shrink-0 text-ink-faint" aria-hidden />
      <p className="min-w-0 leading-snug">
        {text}{' '}
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          className="rounded font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink-faint
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {actionLabel}
        </button>
      </p>
    </div>
  )
}
