import { describe, it, expect } from 'vitest'
import { optionIndexFromKey } from './keyboard'
import { buildOptions } from './generator'

const withAccidentals = buildOptions('letters', true, '#')
const withFlats = buildOptions('letters', true, 'b')
const naturalsOnly = buildOptions('letters', false, '#')

const press = (key: string) => ({ key, code: /^[a-z]$/i.test(key) ? `Key${key.toUpperCase()}` : key })
const labelFor = (key: string, options = withAccidentals) =>
  options[optionIndexFromKey(press(key), options)!].label

describe('optionIndexFromKey', () => {
  it('maps the home row A..J to the white keys C..B', () => {
    expect(['a', 's', 'd', 'f', 'g', 'h', 'j'].map(k => labelFor(k)))
      .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })
  it('maps W E T Y U to the black keys, with no key over the E-F gap', () => {
    expect(['w', 'e', 't', 'y', 'u'].map(k => labelFor(k)))
      .toEqual(['C#', 'D#', 'F#', 'G#', 'A#'])
    expect(['w', 'e', 't', 'y', 'u'].map(k => labelFor(k, withFlats)))
      .toEqual(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])
    expect(optionIndexFromKey(press('r'), withAccidentals)).toBeNull()
  })
  it('reads the physical key, so Caps Lock and IME input still answer', () => {
    expect(optionIndexFromKey({ key: 'A', code: 'KeyA' }, withAccidentals)).toBe(0)
    expect(optionIndexFromKey({ key: 'Process', code: 'KeyS' }, withAccidentals)).toBe(1)
  })
  it('falls back to the character when no physical code is reported', () => {
    expect(optionIndexFromKey({ key: 'D' }, withAccidentals)).toBe(2)
  })
  it('leaves shortcut chords to the browser', () => {
    expect(optionIndexFromKey({ key: 'a', code: 'KeyA', metaKey: true }, withAccidentals)).toBeNull()
    expect(optionIndexFromKey({ key: 't', code: 'KeyT', ctrlKey: true }, withAccidentals)).toBeNull()
  })
  it('rejects keys with no answer behind them (regression: NaN slipped a range check)', () => {
    for (const key of ['Shift', 'ArrowUp', 'q', 'k', 'F5', '1', '0', '8']) {
      expect(optionIndexFromKey(press(key), withAccidentals)).toBeNull()
    }
  })
  it('rejects the black keys when accidentals are off', () => {
    expect(optionIndexFromKey(press('w'), naturalsOnly)).toBeNull()
    expect(optionIndexFromKey(press('a'), naturalsOnly)).toBe(0)
  })
})
