/**
 * Where a moment of the measure falls across the drawing (share of its
 * width), between the notes either side of it: notation is not spaced in
 * proportion to time, so an extra tap is placed by the notes around it.
 * `starts` are the events' start ticks, `xs` where they were drawn; the bar
 * ends at `length` ticks, drawn at `end`.
 */
export function placeAt(ticks: number, starts: readonly number[], xs: readonly number[], length: number, end: number): number {
  const points = starts.map((s, i) => [s, xs[i]] as const).concat([[length, end]])
  if (ticks <= points[0][0]) return points[0][1]
  for (let i = 1; i < points.length; i++) {
    const [t1, x1] = points[i]
    if (ticks <= t1) {
      const [t0, x0] = points[i - 1]
      return x0 + ((x1 - x0) * (ticks - t0)) / (t1 - t0)
    }
  }
  return end
}
