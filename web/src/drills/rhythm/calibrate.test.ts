import { describe, it, expect } from 'vitest'
import { latencyFrom } from './calibrate'
import { RHYTHM_CALIBRATION } from '@/config/constants'

const clicks = Array.from({ length: 8 }, (_, i) => 1000 + i * 600)

describe('latencyFrom', () => {
  it('takes the median offset of the taps from their clicks', () => {
    const taps = clicks.map((c, i) => c + 80 + (i % 2 ? 10 : -10))
    expect(latencyFrom(clicks, taps)).toEqual({ ok: true, latencyMs: 80 })
  })

  it('skips clicks without a tap and pairs each click with its nearest tap', () => {
    const taps = [clicks[0] + 50, clicks[2] + 55, clicks[3] + 45, clicks[5] + 50, clicks[6] + 52, clicks[7] + 48, 99999]
    expect(latencyFrom(clicks, taps)).toEqual({ ok: true, latencyMs: 50 })
  })

  it('refuses too few taps, and taps too uneven to trust', () => {
    expect(latencyFrom(clicks, clicks.slice(0, 3))).toEqual({ ok: false, reason: 'few' })
    const wild = clicks.map((c, i) => c + (i % 2 ? 200 : -150))
    expect(latencyFrom(clicks, wild)).toEqual({ ok: false, reason: 'uneven' })
  })

  it('keeps the result within bounds', () => {
    const early = clicks.map(c => c - 280)
    expect(latencyFrom(clicks, early)).toEqual({ ok: true, latencyMs: RHYTHM_CALIBRATION.minMs })
  })
})
