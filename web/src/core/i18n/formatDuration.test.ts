import { describe, it, expect } from 'vitest'
import { formatClock, formatDuration, formatElapsed } from './formatDuration'
import { translate } from './translate'
import { DURATIONS } from '../../config/constants'
import type { TranslationKey } from './translations'
import type { TranslationParams } from './translate'

const en = (key: TranslationKey, params?: TranslationParams) => translate('en', key, params)
const vi = (key: TranslationKey, params?: TranslationParams) => translate('vi', key, params)

describe('formatDuration', () => {
  it('never renders a raw translation key', () => {
    // Regression: an 8-minute custom session looked up `duration.480`, which
    // does not exist, and printed that key into the interface.
    for (const seconds of [30, 60, 120, 300, 480, 437, 1800]) {
      for (const t of [en, vi]) {
        expect(formatDuration(seconds, t)).not.toContain('duration.')
      }
    }
  })

  it('uses the offered phrasing for offered lengths', () => {
    for (const d of DURATIONS) {
      expect(formatDuration(d.seconds, en)).toBe(translate('en', `duration.${d.seconds}` as 'duration.60'))
    }
  })

  it('renders a custom length in minutes', () => {
    expect(formatDuration(480, en)).toBe('8 minutes')
    expect(formatDuration(480, vi)).toBe('8 phút')
    expect(formatDuration(60 * 1, en)).not.toBe('1 minute') // 60s is a preset: "1 min"
  })
})

describe('formatElapsed', () => {
  it('uses seconds under a minute, then minutes with any seconds left over', () => {
    expect(formatElapsed(12.4, en)).toBe('12 sec')
    expect(formatElapsed(60, en)).toBe('1 minute')
    expect(formatElapsed(125, en)).toBe('2 min 5 sec')
    expect(formatElapsed(125, vi)).toBe('2 phút 5 giây')
  })
})

describe('formatClock', () => {
  it('reads as minutes and seconds at any length, so it fits a narrow column', () => {
    expect(formatClock(18)).toBe('0:18')
    expect(formatClock(17.2)).toBe('0:18')
    expect(formatClock(580)).toBe('9:40')
    expect(formatClock(1800)).toBe('30:00')
    expect(formatClock(-3)).toBe('0:00')
  })
})
