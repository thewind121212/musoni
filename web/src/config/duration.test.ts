import { describe, it, expect } from 'vitest'
import {
  DURATIONS, isPresetDuration, customOpeningSeconds, DEFAULT_CUSTOM_MINUTES,
} from './constants'

describe('custom session length', () => {
  it('opens on a length that is not a preset, from every preset', () => {
    // Regression: opening custom used to round the current length back to
    // itself, so from any preset the stepper stayed hidden and the option
    // did nothing at all.
    for (const d of DURATIONS) {
      const opened = customOpeningSeconds(d.seconds)
      expect(isPresetDuration(opened), `opening from ${d.seconds}s landed on a preset`).toBe(false)
    }
  })

  it('opens on the default custom length', () => {
    expect(customOpeningSeconds(60)).toBe(DEFAULT_CUSTOM_MINUTES * 60)
  })

  it('keeps an existing custom length instead of resetting it', () => {
    expect(customOpeningSeconds(437)).toBe(437)
  })

  it('recognises the offered lengths', () => {
    expect(isPresetDuration(30)).toBe(true)
    expect(isPresetDuration(300)).toBe(true)
    expect(isPresetDuration(600)).toBe(false)
  })
})
