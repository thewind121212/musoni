interface Props {
  score: number
  /** Recent average to measure against, or null when there is none. */
  average: number | null
  best: number
  /** Already-translated captions, e.g. "Week average 172", "Best 219 · 33 to go". */
  averageLabel: string | null
  bestLabel: string
}

/**
 * A score placed between the reader's recent average (the tick) and their best
 * (the end of the track), so a number reads as better or worse than usual
 * rather than standing alone.
 */
export function ScoreCompare({ score, average, best, averageLabel, bestLabel }: Props) {
  const max = Math.max(score, best, average ?? 0, 1)
  const pct = (n: number) => `${(n / max) * 100}%`
  return (
    <div className="rounded-2xl border border-line bg-raised px-4 pt-4 pb-3">
      <div className="relative h-2.5 rounded-full bg-line">
        <div data-testid="score-fill" className="h-full rounded-full bg-accent" style={{ width: pct(score) }} />
        {average !== null && (
          <span
            data-testid="score-average"
            className="absolute -top-1.5 h-5.5 w-0.5 -translate-x-1/2 rounded-full bg-ink"
            style={{ left: pct(average) }}
          />
        )}
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3 text-xs text-ink-soft">
        <span>{averageLabel}</span>
        <span className="text-right">{bestLabel}</span>
      </div>
    </div>
  )
}
