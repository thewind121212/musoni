import { describe, it, expect } from 'vitest'
import { nearestSample, sampleFromName } from './piano'
import { LEVELS, PIANO_SAMPLES } from '../../config/constants'
import { midi, parsePitch } from '../music/pitch'

const samples = PIANO_SAMPLES.map(sampleFromName)

describe('sampleFromName', () => {
  it('reads MIDI numbers and spells sharps as s in file names', () => {
    expect(sampleFromName('C4')).toEqual({ midi: 60, file: 'C4.mp3' })
    expect(sampleFromName('D#2')).toEqual({ midi: 39, file: 'Ds2.mp3' })
  })
  it('rejects names it cannot read', () => {
    expect(() => sampleFromName('H4')).toThrow()
  })
})

describe('nearestSample', () => {
  it('plays a recorded note at its own speed', () => {
    const { sample, rate } = nearestSample(60, samples)
    expect(sample.file).toBe('C4.mp3')
    expect(rate).toBe(1)
  })
  it('shifts up and down by semitones from the nearest recording', () => {
    expect(nearestSample(61, samples).sample.file).toBe('C4.mp3')
    expect(nearestSample(61, samples).rate).toBeCloseTo(Math.pow(2, 1 / 12))
    expect(nearestSample(62, samples).sample.file).toBe('Ds4.mp3')
    expect(nearestSample(62, samples).rate).toBeCloseTo(Math.pow(2, -1 / 12))
  })
  it('never shifts a note any level can print by more than a semitone', () => {
    for (const level of [1, 2, 3, 4] as const) {
      for (const pool of LEVELS[level].pools) {
        // One semitone of headroom either side covers sharps and flats.
        for (let m = midi(parsePitch(pool.low)) - 1; m <= midi(parsePitch(pool.high)) + 1; m++) {
          const { sample } = nearestSample(m, samples)
          expect(Math.abs(sample.midi - m)).toBeLessThanOrEqual(1)
        }
      }
    }
  })
})
