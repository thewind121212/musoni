import { afterEach, describe, it, expect } from 'vitest'
import { presetError, presetRoute, presetSummary, withPreset } from './drillPreset'
import { addDrills } from './drills'
import { fakeDrill } from '@/test/fakeDrill'
import { getSettings, type Settings } from '@/progress/progressStore'
import { t } from '@/test/i18n'

const saved: Settings = {
  ...getSettings(),
  naming: 'letters',
  drills: {
    'note-id': { level: 3, durationSec: 300, accidentals: true },
    'hear-play': { level: 4, cadenceEach: true },
  },
}

// A drill no shared file knows about: presets must work for it through its registry entry alone.
const fake = fakeDrill({ defaults: { level: 1, durationSec: 60, mode: 'a', hints: false } })
let remove = () => {}
afterEach(() => { remove(); remove = () => {} })

describe('withPreset', () => {
  it("lays a note-reading preset over the reader's settings, keeping their preferences and other drills", () => {
    const s = withPreset(saved, { drill: 'note-id', level: 1, durationSec: 60 })
    expect(s.drills['note-id']).toEqual({ level: 1, durationSec: 60, accidentals: false })
    expect(s.drills['hear-play']).toEqual(saved.drills['hear-play'])
    expect(s.naming).toBe('letters')
  })

  it("sets Nghe & Đàn's own level and length, and leaves its listening aids the reader's", () => {
    const s = withPreset(saved, { drill: 'hear-play', level: 2, durationSec: 120 })
    expect(s.drills['hear-play']).toEqual({ level: 2, durationSec: 120, cadenceEach: true, oneKey: false })
    expect(s.drills['note-id']).toEqual(saved.drills['note-id'])
  })

  it('works for any registered drill: its preset options, its defaults for the rest', () => {
    remove = addDrills(fake)
    const s = withPreset(saved, { drill: 'fake', level: 2, durationSec: 120, mode: 'b' })
    expect(fake.of(s)).toEqual({ level: 2, durationSec: 120, mode: 'b', hints: false })
    expect(fake.of(withPreset(saved, { drill: 'fake', level: 1, durationSec: 60 })).mode).toBe('a')
  })

  it('leaves the settings alone for a drill that is not registered', () => {
    expect(withPreset(saved, { drill: 'nowhere', level: 1, durationSec: 60 })).toBe(saved)
  })

  it('names the route', () => {
    expect(presetRoute({ drill: 'hear-play', level: 1, durationSec: 60 })).toBe('/train/hear-play')
  })
})

describe('presetError', () => {
  it('accepts presets the drills can run', () => {
    expect(presetError({ drill: 'note-id', level: 4, durationSec: 120, accidentals: true })).toBeNull()
    expect(presetError({ drill: 'hear-play', level: 3, durationSec: 60 })).toBeNull()
  })

  it('rejects unknown drills, levels, lengths and fields', () => {
    expect(presetError({ drill: 'rhythm', level: 1, durationSec: 60 })).toMatch(/drill/)
    expect(presetError({ drill: 'note-id', level: 5, durationSec: 60 })).toMatch(/level/)
    expect(presetError({ drill: 'note-id', level: 1.5, durationSec: 60 })).toMatch(/level/)
    expect(presetError({ drill: 'note-id', level: 1, durationSec: 45 })).toMatch(/length/)
    expect(presetError({ drill: 'hear-play', level: 1, durationSec: 60, accidentals: true })).toMatch(/accidentals/)
    expect(presetError({ drill: 'hear-play', level: 1, durationSec: 60, oneKey: true })).toMatch(/cannot set/)
    expect(presetError({ drill: 'note-id', level: 1, durationSec: 60, accidentals: 'yes' })).toMatch(/boolean/)
    expect(presetError({ drill: 'note-id', level: 1, durationSec: 60, clef: 'alto' })).toMatch(/clef/)
    expect(presetError(null)).not.toBeNull()
  })

  it("checks a new drill against its own entry's levels and options", () => {
    remove = addDrills(fake)
    expect(presetError({ drill: 'fake', level: 2, durationSec: 60, mode: 'b' })).toBeNull()
    expect(presetError({ drill: 'fake', level: 3, durationSec: 60 })).toMatch(/level/)
    expect(presetError({ drill: 'fake', level: 1, durationSec: 60, hints: true })).toMatch(/cannot set/)
  })
})

describe('presetSummary', () => {
  it("names the level and length, and the drill's tags", () => {
    expect(presetSummary({ drill: 'note-id', level: 1, durationSec: 60 }, t)).toBe('Treble · 1 min')
    expect(presetSummary({ drill: 'note-id', level: 2, durationSec: 120, accidentals: true }, t)).toBe('Treble + · 2 min · ♯ ♭')
    expect(presetSummary({ drill: 'hear-play', level: 1, durationSec: 60 }, t)).toBe('Home chord · 1 min')
  })
})
