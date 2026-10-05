const WHITE = [0, 2, 4, 5, 7, 9, 11]
/** Black keys by semitone, and the white-key boundary each sits on. */
const BLACK = [[1, 1], [3, 2], [6, 4], [8, 5], [10, 6]] as const
const W = 10
const BLACK_W = 6

interface Props {
  /** Semitones above the first C to mark (0 = C, 11 = B, 12 = the next C). */
  lit: readonly number[]
  /** Octaves drawn, from a C. */
  octaves?: number
  /**
   * `dot`: a small dot on each marked key, for a level's picture where many
   * keys are marked (filling them merged into one block). `fill`: the key
   * itself in the accent colour, for pointing at one or two keys.
   */
  mark?: 'dot' | 'fill'
  /** Key length in drawing units against a white key 10 wide. Shorter reads as a strip. */
  keyLength?: number
  /** Text under a key, by semitone (a note's name). */
  labels?: Readonly<Record<number, string>>
  className?: string
}

/**
 * A small drawn keyboard with some keys marked. The keys keep their own quiet
 * colours unless `fill` is asked for, so a picture with many marks still reads
 * as a piano. Dots take the action colour (`cta`), so they follow a drill's
 * own colour; fills take the accent. Decorative: the words beside it say what
 * it shows, so it is hidden from screen readers.
 */
export function MiniKeyboard({ lit, octaves = 1, mark = 'dot', keyLength = 34, labels, className = '' }: Props) {
  const on = (s: number) => lit.includes(s)
  const blackLength = Math.round(keyLength * 0.6)
  const whites = Array.from({ length: octaves }, (_, o) => WHITE.map((s, i) => ({ s: s + o * 12, i: i + o * 7 }))).flat()
  const blacks = Array.from({ length: octaves }, (_, o) => BLACK.map(([s, b]) => ({ s: s + o * 12, b: b + o * 7 }))).flat()
  const fill = mark === 'fill'
  const svg = (
    <svg
      viewBox={`0 0 ${W * 7 * octaves} ${keyLength}`}
      aria-hidden="true"
      className={'h-auto max-h-full w-full ' + (labels ? '' : className)}
    >
      {whites.map(({ s, i }) => (
        <rect
          key={s} data-lit={fill && on(s) ? s : undefined}
          x={i * W + 0.5} y={0.5} width={W - 1} height={keyLength - 1} rx={1.5}
          className={fill && on(s) ? 'fill-accent stroke-accent' : 'fill-raised stroke-line'}
        />
      ))}
      {blacks.map(({ s, b }) => (
        <rect
          key={s} data-lit={fill && on(s) ? s : undefined}
          x={b * W - BLACK_W / 2} y={0} width={BLACK_W} height={blackLength} rx={1}
          className={fill && on(s) ? 'fill-accent stroke-raised' : 'fill-ink-soft stroke-ink-soft'}
          strokeWidth={fill && on(s) ? 0.8 : undefined}
        />
      ))}
      {!fill && whites.map(({ s, i }) => on(s) && (
        <circle key={s} data-lit={s} cx={i * W + W / 2} cy={keyLength * 0.8} r={2.6} className="fill-cta" />
      ))}
      {/* Ringed in the paper colour so the dot stands off the grey key. */}
      {!fill && blacks.map(({ s, b }) => on(s) && (
        <circle
          key={s} data-lit={s} cx={b * W} cy={blackLength * 0.7} r={2}
          strokeWidth={0.9} className="fill-cta stroke-raised"
        />
      ))}
    </svg>
  )
  if (!labels) return svg

  // Labels in page text (not SVG) so they keep the reading size at any width.
  const total = W * 7 * octaves
  const centre = (s: number) => {
    const white = whites.find(w => w.s === s)
    if (white) return (white.i * W + W / 2) / total
    const black = blacks.find(k => k.s === s)
    return black ? (black.b * W) / total : null
  }
  return (
    <div className={className}>
      {svg}
      <div className="relative mt-1 h-6" aria-hidden="true">
        {Object.entries(labels).map(([s, text]) => {
          const x = centre(Number(s))
          return x === null ? null : (
            <span
              key={s}
              className="absolute top-0 -translate-x-1/2 text-sm font-semibold whitespace-nowrap text-accent"
              style={{ left: `${x * 100}%` }}
            >
              {text}
            </span>
          )
        })}
      </div>
    </div>
  )
}
