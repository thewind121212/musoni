const WHITE = [0, 2, 4, 5, 7, 9, 11]
/** Black keys by semitone, and the white-key boundary each sits on. */
const BLACK = [[1, 1], [3, 2], [6, 4], [8, 5], [10, 6]] as const
const W = 10
const BLACK_W = 6

interface Props {
  /** Semitones above C to light up (0 = C, 11 = B). */
  lit: readonly number[]
  className?: string
}

/**
 * One octave of a keyboard, drawn small, with some keys lit: a picture of
 * which notes a level uses. Decorative; the label beside it says it in words.
 */
export function MiniKeyboard({ lit, className = '' }: Props) {
  const on = (s: number) => lit.includes(s)
  return (
    <svg viewBox={`0 0 ${W * 7} 34`} aria-hidden="true" className={'h-auto max-h-full w-full ' + className}>
      {WHITE.map((s, i) => (
        <rect
          key={s} data-lit={on(s) || undefined}
          x={i * W + 0.5} y={0.5} width={W - 1} height={33} rx={1.5}
          className={on(s) ? 'fill-accent stroke-accent' : 'fill-raised stroke-line'}
        />
      ))}
      {BLACK.map(([s, boundary]) => (
        <rect
          key={s} data-lit={on(s) || undefined}
          x={boundary * W - BLACK_W / 2} y={0} width={BLACK_W} height={20} rx={1}
          className={on(s) ? 'fill-accent stroke-raised' : 'fill-ink stroke-ink'}
        />
      ))}
    </svg>
  )
}
