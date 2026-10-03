const WHITE = [0, 2, 4, 5, 7, 9, 11]
/** Black keys by semitone, and the white-key boundary each sits on. */
const BLACK = [[1, 1], [3, 2], [6, 4], [8, 5], [10, 6]] as const
const W = 10
const BLACK_W = 6

interface Props {
  /** Semitones above C to mark (0 = C, 11 = B). */
  lit: readonly number[]
  className?: string
}

/**
 * One octave of a keyboard, drawn small, with a dot on each note a level uses.
 * The keys keep their own quiet colours, so the picture always reads as a
 * piano: filling lit keys instead merged them into one block. Dots take the
 * action colour (`cta`), so they follow a drill's own colour. Decorative; the
 * label beside it says it in words.
 */
export function MiniKeyboard({ lit, className = '' }: Props) {
  const on = (s: number) => lit.includes(s)
  return (
    <svg viewBox={`0 0 ${W * 7} 34`} aria-hidden="true" className={'h-auto max-h-full w-full ' + className}>
      {WHITE.map((s, i) => (
        <rect key={s} x={i * W + 0.5} y={0.5} width={W - 1} height={33} rx={1.5} className="fill-raised stroke-line" />
      ))}
      {BLACK.map(([s, boundary]) => (
        <rect
          key={s} x={boundary * W - BLACK_W / 2} y={0} width={BLACK_W} height={20} rx={1}
          className="fill-ink-soft stroke-ink-soft"
        />
      ))}
      {WHITE.map((s, i) => on(s) && (
        <circle key={s} data-lit={s} cx={i * W + W / 2} cy={27} r={2.6} className="fill-cta" />
      ))}
      {/* Ringed in the paper colour so the dot stands off the grey key. */}
      {BLACK.map(([s, boundary]) => on(s) && (
        <circle
          key={s} data-lit={s} cx={boundary * W} cy={14} r={2}
          strokeWidth={0.9} className="fill-cta stroke-raised"
        />
      ))}
    </svg>
  )
}
