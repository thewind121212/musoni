import { CaretLeftIcon, CaretRightIcon, CheckIcon, XIcon } from '@phosphor-icons/react'

/** How a note was tapped, or a tap that belongs to no note (`extra`). */
export type MarkKind = 'on' | 'early' | 'late' | 'missed' | 'extra'

/**
 * Amber for early and late. The app has no warning token (amber `--cta` is
 * for start buttons only); this one reads on white and on the dark surface.
 */
const AMBER = 'bg-[oklch(0.7_0.15_65)]'

const LOOK: Record<MarkKind, string> = {
  on: 'bg-correct text-raised',
  early: `${AMBER} text-raised`,
  late: `${AMBER} text-raised`,
  missed: 'bg-wrong text-raised',
  extra: 'text-wrong',
}

interface Props {
  kind: MarkKind
  /** Its name for screen readers ("đúng nhịp", "trễ"); without one it is decoration (a legend's swatch). */
  label?: string
  small?: boolean
}

/**
 * One timing mark: a dot over a note (green on time, amber early or late,
 * red missed) or a red cross where an extra tap landed. Colour always comes
 * with a sign (check, arrow back or forward, cross), never alone.
 */
export function MarkDot({ kind, label, small = false }: Props) {
  const size = small ? 9 : 11
  const Icon = kind === 'on' ? CheckIcon : kind === 'early' ? CaretLeftIcon : kind === 'late' ? CaretRightIcon : XIcon
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      title={label || undefined}
      data-mark={kind}
      className={
        'inline-flex shrink-0 items-center justify-center rounded-full ' +
        (kind === 'extra' ? '' : small ? 'size-3.5 ' : 'size-[18px] ') + LOOK[kind]
      }
    >
      <Icon size={kind === 'extra' ? size + 5 : size} weight="bold" aria-hidden />
    </span>
  )
}
