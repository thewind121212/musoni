import { describe, it, expect } from 'vitest'
import { presetError, presetRoute, presetSummary, withPreset } from './drillPreset'
import { getSettings } from '@/progress/progressStore'
import { t } from '@/test/i18n'

describe('withPreset', () => {
  const saved = { ...getSettings(), level: 3 as const, durationSec: 300, accidentals: true, earLevel: 4 as const, naming: 'letters' as const }

  it("lays a note-reading preset over the reader's settings, keeping their preferences", () => {
    const s = withPreset(saved, { drill: 'note-id', level: 1, durationSec: 60 })
    expect([s.level, s.durationSec, s.accidentals, s.naming, s.earLevel]).toEqual([1, 60, false, 'letters', 4])
  })

  it("sets Nghe & Đàn's own level and length, not note reading's", () => {
    const s = withPreset(saved, { drill: 'hear-play', level: 2, durationSec: 120 })
    expect([s.earLevel, s.earDurationSec, s.level, s.durationSec]).toEqual([2, 120, 3, 300])
  })

  it('names the route', () => expect(presetRoute({ drill: 'hear-play', level: 1, durationSec: 60 })).toBe('/train/hear-play'))
})

describe('presetError', () => {
  it('accepts presets the drills can run', () => {
    expect(presetError({ drill: 'note-id', level: 4, durationSec: 120, accidentals: true })).toBeNull()
    expect(presetError({ drill: 'hear-play', level: 3, durationSec: 60 })).toBeNull()
  })

  it('rejects unknown drills, levels, lengths and fields', () => {
    expect(presetError({ drill: 'rhythm', level: 1, durationSec: 60 })).toMatch(/drill/)
    expect(presetError({ drill: 'note-id', level: 5, durationSec: 60 })).toMatch(/level/)
    expect(presetError({ drill: 'note-id', level: 1, durationSec: 45 })).toMatch(/length/)
    expect(presetError({ drill: 'hear-play', level: 1, durationSec: 60, accidentals: true })).toMatch(/accidentals/)
    expect(presetError({ drill: 'note-id', level: 1, durationSec: 60, clef: 'alto' })).toMatch(/clef/)
    expect(presetError(null)).not.toBeNull()
  })
})

describe('presetSummary', () => {
  it('names the level and length, and sharps and flats when on', () => {
    expect(presetSummary({ drill: 'note-id', level: 1, durationSec: 60 }, t)).toBe('Treble · 1 min')
    expect(presetSummary({ drill: 'note-id', level: 2, durationSec: 120, accidentals: true }, t)).toBe('Treble + · 2 min · ♯ ♭')
    expect(presetSummary({ drill: 'hear-play', level: 1, durationSec: 60 }, t)).toBe('Home chord · 1 min')
  })
})
