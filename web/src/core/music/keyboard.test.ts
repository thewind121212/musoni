import { describe, it, expect } from 'vitest'
import { BLACK_KEY_BOUNDARY, blackKeyPosition, optionIndexFromKey } from './keyboard'
import { buildOptions } from './pianoKeys'

const withAccidentals = buildOptions('letters', true, '#')
const withFlats = buildOptions('letters', true, 'b')
const naturalsOnly = buildOptions('letters', false, '#')

const press = (key: string, shiftKey = false) =>
  ({ key: shiftKey ? key.toUpperCase() : key, code: /^[a-z]$/i.test(key) ? `Key${key.toUpperCase()}` : key, shiftKey })
const labelFor = (key: string, options = withAccidentals, shift = false) =>
  options[optionIndexFromKey(press(key, shift), options)!].label

describe('optionIndexFromKey', () => {
  it('answers a white key with its letter, C to B', () => {
    expect(['c', 'd', 'e', 'f', 'g', 'a', 'b'].map(k => labelFor(k)))
      .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })
  it('answers a black key with Shift and the letter it is spelled with', () => {
    expect(['c', 'd', 'f', 'g', 'a'].map(k => labelFor(k, withAccidentals, true)))
      .toEqual(['C#', 'D#', 'F#', 'G#', 'A#'])
    expect(['d', 'e', 'g', 'a', 'b'].map(k => labelFor(k, withFlats, true)))
      .toEqual(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])
    // No E# or B# on a row of sharps, no Cb or Fb on a row of flats.
    expect(optionIndexFromKey(press('e', true), withAccidentals)).toBeNull()
    expect(optionIndexFromKey(press('c', true), withFlats)).toBeNull()
  })
  it('reads the physical key, so Caps Lock and IME input still answer', () => {
    expect(optionIndexFromKey({ key: 'C', code: 'KeyC' }, withAccidentals)).toBe(0)
    expect(optionIndexFromKey({ key: 'Process', code: 'KeyD' }, withAccidentals)).toBe(1)
  })
  it('falls back to the character when no physical code is reported', () => {
    expect(optionIndexFromKey({ key: 'E' }, withAccidentals)).toBe(2)
  })
  it('leaves shortcut chords to the browser', () => {
    expect(optionIndexFromKey({ key: 'a', code: 'KeyA', metaKey: true }, withAccidentals)).toBeNull()
    expect(optionIndexFromKey({ key: 't', code: 'KeyT', ctrlKey: true }, withAccidentals)).toBeNull()
  })
  it('rejects keys with no answer behind them (regression: NaN slipped a range check)', () => {
    for (const key of ['Shift', 'ArrowUp', 'q', 'h', 's', 'F5', '1', '0', '8']) {
      expect(optionIndexFromKey(press(key), withAccidentals)).toBeNull()
    }
  })
  it('rejects the black keys when accidentals are off', () => {
    expect(optionIndexFromKey(press('c', true), naturalsOnly)).toBeNull()
    expect(optionIndexFromKey(press('c'), naturalsOnly)).toBe(0)
  })
})

describe('blackKeyPosition', () => {
  it('centres a black key on the white-key boundary it straddles', () => {
    BLACK_KEY_BOUNDARY.forEach((boundary, slot) => {
      const { left, width } = blackKeyPosition(slot)
      expect(parseFloat(left) + parseFloat(width) / 2).toBeCloseTo((boundary / 7) * 100)
    })
  })
})
