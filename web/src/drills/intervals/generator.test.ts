import { describe, it, expect } from 'vitest'
import { diatonicIndex, isExcluded, midi, parsePitch } from '@/core/music/pitch'
import { INTERVAL_LEVELS, INTERVAL_RANGE } from '@/config/constants'
import {
  answerKey, generateIntervalQuestion, intervalNotation, intervalSound, levelPool, type IntervalLevel,
} from './generator'
import { intervalBetween, intervalId, semitones } from './interval'
import { cellExists, isRight, rowOf } from './grid'

const LEVELS: IntervalLevel[] = [1, 2, 3, 4]
const PLAIN = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8']
/** A seeded generator, so a failing run can be replayed. */
function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

describe('levelPool, every spelling of every level', () => {
  for (const level of LEVELS) {
    it(`level ${level}: two real notes, correctly named, in range, answerable on the grid`, () => {
      const { clefs, accidentals, rows } = INTERVAL_LEVELS[level]
      let count = 0
      for (const [key, spellings] of levelPool(level)) {
        expect(spellings.length).toBeGreaterThan(0)
        for (const s of spellings) {
          count++
          expect(clefs).toContain(s.clef)
          for (const note of [s.lower, s.upper]) {
            expect(isExcluded(note.letter, note.accidental)).toBe(false)
            if (!accidentals) expect(note.accidental).toBe('')
            const at = diatonicIndex(note)
            expect(at).toBeGreaterThanOrEqual(diatonicIndex(parsePitch(INTERVAL_RANGE[s.clef].low)))
            expect(at).toBeLessThanOrEqual(diatonicIndex(parsePitch(INTERVAL_RANGE[s.clef].high)))
          }
          // The name the drill gives is the interval between the notes as printed.
          expect(intervalBetween(s.lower, s.upper)).toEqual(s.interval)
          expect(midi(s.upper) - midi(s.lower)).toBe(semitones(s.interval))
          expect(answerKey(level, s.interval)).toBe(key)
          // The answer's own cell exists on the level's rows and is marked right.
          const cell = { row: rowOf(s.interval, rows), size: s.interval.size }
          expect(rows).toContain(cell.row)
          expect(cellExists(cell)).toBe(true)
          expect(isRight(cell, s.interval)).toBe(true)
        }
      }
      expect(count).toBeGreaterThan(20)
    })
  }

  it('level 1 asks every size from 2 to 8 on white keys', () => {
    expect([...levelPool(1).keys()].sort()).toEqual(['2', '3', '4', '5', '6', '7', '8'])
  })

  it('levels 2 and 3 ask exactly the major, minor and perfect intervals, so no white-key tritone at level 2', () => {
    for (const level of [2, 3] as const) expect([...levelPool(level).keys()].sort()).toEqual([...PLAIN].sort())
    const tritones = [...levelPool(2).values()].flat()
      .filter(s => (s.lower.letter === 'F' && s.upper.letter === 'B') || (s.lower.letter === 'B' && s.upper.letter === 'F'))
    expect(tritones).toEqual([])
  })

  it('level 3 puts a sharp or flat on either note, in both clefs', () => {
    const all = [...levelPool(3).values()].flat()
    expect(all.some(s => s.lower.accidental !== '' && s.upper.accidental === '')).toBe(true)
    expect(all.some(s => s.lower.accidental === '' && s.upper.accidental !== '')).toBe(true)
    expect(new Set(all.map(s => s.clef))).toEqual(new Set(['treble', 'bass']))
  })

  it('level 4 adds its augmented and diminished intervals, each spelled in both clefs', () => {
    const pool = levelPool(4)
    expect([...pool.keys()].sort()).toEqual([...PLAIN, ...INTERVAL_LEVELS[4].augDim].sort())
    for (const id of INTERVAL_LEVELS[4].augDim) {
      expect(new Set(pool.get(id)!.map(s => s.clef))).toEqual(new Set(['treble', 'bass']))
    }
  })

  it('spells every major, minor and perfect interval in each clef from level 2 up', () => {
    for (const level of [2, 3, 4] as const) {
      for (const id of PLAIN) {
        expect(new Set(levelPool(level).get(id)!.map(s => s.clef))).toEqual(new Set(INTERVAL_LEVELS[level].clefs))
      }
    }
  })
})

describe('generateIntervalQuestion', () => {
  for (const level of LEVELS) {
    it(`level ${level}: never asks the same answer twice in a row, and reaches every answer`, () => {
      const rng = seeded(level * 7919)
      const seen = new Set<string>()
      let previous = null
      for (let i = 0; i < 3000; i++) {
        const q = generateIntervalQuestion(level, previous, rng)
        const key = answerKey(level, q.interval)
        if (previous) expect(key).not.toBe(answerKey(level, previous))
        expect(levelPool(level).get(key)).toContainEqual({ clef: q.clef, lower: q.lower, upper: q.upper, interval: q.interval })
        seen.add(key)
        previous = q.interval
      }
      expect([...seen].sort()).toEqual([...levelPool(level).keys()].sort())
    })
  }

  it('asks an augmented or diminished interval at level 4 about as often as configured', () => {
    const rng = seeded(42)
    let odd = 0
    let previous = null
    for (let i = 0; i < 4000; i++) {
      const q = generateIntervalQuestion(4, previous, rng)
      if (INTERVAL_LEVELS[4].augDim.includes(intervalId(q.interval))) odd++
      previous = q.interval
    }
    expect(odd / 4000).toBeGreaterThan(0.33)
    expect(odd / 4000).toBeLessThan(0.47)
  })

  it('writes both layouts', () => {
    const rng = seeded(3)
    const layouts = new Set(Array.from({ length: 50 }, () => generateIntervalQuestion(2, null, rng).layout))
    expect(layouts).toEqual(new Set(['melodic', 'harmonic']))
  })
})

describe('sound and notation', () => {
  const q = { lower: parsePitch('E4'), upper: { letter: 'C', accidental: '#', octave: 5 } as const }

  it('plays a melodic interval note by note, lower first, and a harmonic one together', () => {
    const melodic = intervalSound({ ...q, layout: 'melodic' })
    expect(melodic.map(e => e.pitches)).toEqual([[q.lower], [q.upper]])
    expect(melodic[1].at).toBeGreaterThan(melodic[0].at)
    expect(intervalSound({ ...q, layout: 'harmonic' }).map(e => e.pitches)).toEqual([[q.lower, q.upper]])
  })

  it('writes the notes side by side or stacked', () => {
    expect(intervalNotation({ ...q, layout: 'melodic' })).toBe('E4 C#5')
    expect(intervalNotation({ ...q, layout: 'harmonic' })).toBe('E4+C#5')
  })
})
