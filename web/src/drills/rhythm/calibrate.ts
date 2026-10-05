import { RHYTHM_CALIBRATION } from '@/config/constants'

/*
 * Latency calibration. The reader taps along with a row of clicks; how late
 * their taps land, on the median, is what their screen, speakers and fingers
 * add, and the drill takes it off every tap it judges.
 */

export type Calibration =
  | { ok: true; latencyMs: number }
  /** `few`: not enough taps near the clicks; `uneven`: the taps spread too far to trust. */
  | { ok: false; reason: 'few' | 'uneven' }

const median = (xs: readonly number[]) => {
  const s = [...xs].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2
}

/**
 * The latency from click times and tap times (ms, one clock). Each click
 * takes the nearest tap within half the gap between clicks; a click with
 * none is skipped.
 */
export function latencyFrom(clicks: readonly number[], taps: readonly number[], c = RHYTHM_CALIBRATION): Calibration {
  if (clicks.length === 0) return { ok: false, reason: 'few' }
  const gap = clicks.length > 1 ? clicks[1] - clicks[0] : Infinity
  const offsets: number[] = []
  for (const click of clicks) {
    let best: number | null = null
    for (const t of taps) {
      const d = t - click
      if (Math.abs(d) < gap / 2 && (best === null || Math.abs(d) < Math.abs(best))) best = d
    }
    if (best !== null) offsets.push(best)
  }
  if (offsets.length < c.minTaps) return { ok: false, reason: 'few' }
  const mid = median(offsets)
  const spread = median(offsets.map(d => Math.abs(d - mid)))
  if (spread > c.maxSpreadMs) return { ok: false, reason: 'uneven' }
  return { ok: true, latencyMs: Math.round(Math.min(c.maxMs, Math.max(c.minMs, mid))) }
}
