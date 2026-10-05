import { describe, it, expect } from 'vitest'
import { firstProblem, judgeTaps, meanOffset } from './judge'
import { allMeasures, pulseOf, type RhythmLevel } from './generator'
import { RHYTHM_LEVELS, RHYTHM_TEMPOS } from '@/config/constants'

const TOL = 100
// q q q q at ♩ = 60: onsets every second.
const FOUR = [0, 1000, 2000, 3000]
const LEN = 4000
const marks = (taps: number[], onsets = FOUR) => judgeTaps(onsets, taps, TOL, LEN).notes.map(n => n.mark)

describe('judgeTaps', () => {
  it('marks taps on time, early or late within twice the tolerance, and missed beyond it', () => {
    expect(marks([30, 880, 2150, 3400])).toEqual(['on', 'early', 'late', 'missed'])
    const j = judgeTaps(FOUR, [30, 880, 2150, 3400], TOL, LEN)
    expect(j.notes.map(n => n.offsetMs)).toEqual([30, -120, 150, null])
    // The far tap belongs to no note, inside the measure: extra.
    expect(j.extras).toEqual([3400])
    expect(j.correct).toBe(false)
  })

  it('is correct only with every note on time and no extra tap', () => {
    expect(judgeTaps(FOUR, [0, 1000, 2000, 3000], TOL, LEN).correct).toBe(true)
    expect(judgeTaps(FOUR, [0, 1000, 2000, 3000, 2500], TOL, LEN).correct).toBe(false)
    expect(judgeTaps(FOUR, [0, 1000, 2000], TOL, LEN).correct).toBe(false)
    expect(judgeTaps(FOUR, [0, 1000, 2000, 3150], TOL, LEN).correct).toBe(false)
  })

  it('pairs each tap with one note: a double tap leaves an extra, not two hits', () => {
    const j = judgeTaps(FOUR, [0, 20, 1000, 2000, 3000], TOL, LEN)
    expect(j.notes.every(n => n.mark === 'on')).toBe(true)
    expect(j.extras).toEqual([20])
  })

  it('finds the best pairing when the windows of close notes overlap', () => {
    // Sixteenths 125 ms apart, tapped all a little late: each still pairs with its own note.
    const onsets = [0, 125, 250, 375]
    const j = judgeTaps(onsets, [60, 185, 310, 435], 70, 500)
    expect(j.notes.map(n => n.mark)).toEqual(['on', 'on', 'on', 'on'])
    expect(j.extras).toEqual([])
    // One missing in the middle: that note is missed, not the run shifted.
    expect(judgeTaps(onsets, [0, 250, 375], 70, 500).notes.map(n => n.mark)).toEqual(['on', 'missed', 'on', 'on'])
  })

  it('ignores unpaired taps outside the measure: the count-in and the next downbeat', () => {
    const j = judgeTaps(FOUR, [-1000, 0, 1000, 2000, 3000, 4050], TOL, LEN)
    expect(j.correct).toBe(true)
    // But a slightly early first tap still counts for the first note.
    expect(judgeTaps(FOUR, [-60, 1000, 2000, 3000], TOL, LEN).notes[0].mark).toBe('on')
  })

  it('accepts exact taps on every measure of every level at every tempo', () => {
    for (const level of [1, 2, 3, 4] as RhythmLevel[]) {
      for (const tempo of RHYTHM_TEMPOS) {
        for (const m of allMeasures(level)) {
          const { tickMs } = pulseOf(m.meter, tempo)
          const onsets = m.onsets.map(t => t * tickMs)
          const j = judgeTaps(onsets, onsets, RHYTHM_LEVELS[level].toleranceMs, m.length * tickMs)
          expect(j.correct, `${m.notation} at ${tempo}`).toBe(true)
        }
      }
    }
  })
})

describe('firstProblem', () => {
  it('names the first note off, then extra taps, then nothing', () => {
    const late = judgeTaps(FOUR, [0, 1000, 2150, 3400], TOL, LEN)
    expect(firstProblem(late, FOUR)).toEqual({ kind: 'late', note: 3, ms: 150 })
    const missed = judgeTaps(FOUR, [0, 2000, 3000], TOL, LEN)
    expect(firstProblem(missed, FOUR)).toEqual({ kind: 'missed', note: 2 })
    const extra = judgeTaps(FOUR, [0, 500, 1000, 2000, 2500, 3000], TOL, LEN)
    expect(firstProblem(extra, FOUR)).toEqual({ kind: 'extra', count: 2 })
    expect(firstProblem(judgeTaps(FOUR, FOUR, TOL, LEN), FOUR)).toBeNull()
  })
})

describe('meanOffset', () => {
  it('averages how far the paired taps landed, leaving out missed notes', () => {
    expect(meanOffset(judgeTaps(FOUR, [20, 960, 2000], TOL, LEN))).toBe(20)
    expect(meanOffset(judgeTaps(FOUR, [], TOL, LEN))).toBeNull()
  })
})
