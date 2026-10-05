import { describe, it, expect } from 'vitest'
import { midi } from '@/core/music/pitch'
import { KEY_SIG_LEVELS } from '@/config/constants'
import { answerSound, generateKeySigQuestion, homeChord, signaturesFor, type KeySigQuestion } from './generator'
import { keyPad, tonicOf } from './signatures'
import type { KeySigLevel } from './strings'

const LEVELS: KeySigLevel[] = [1, 2, 3, 4]

/** A small seeded generator, so a failing run can be replayed. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

/** A session's worth of questions in a row. */
function run(level: KeySigLevel, count: number, rng: () => number, naming: 'letters' | 'solfege' = 'letters') {
  const out: KeySigQuestion[] = []
  for (let i = 0; i < count; i++) out.push(generateKeySigQuestion(level, naming, out.at(-1) ?? null, rng))
  return out
}

describe('generateKeySigQuestion', () => {
  it('asks only what each level covers, with the answer always on the pad under the tonic\'s name', () => {
    for (const level of LEVELS) for (const naming of ['letters', 'solfege'] as const) {
      const { maxAccidentals, clefs, minor } = KEY_SIG_LEVELS[level]
      for (const q of run(level, 600, seeded(level * 7 + naming.length), naming)) {
        expect(Math.abs(q.fifths)).toBeLessThanOrEqual(maxAccidentals)
        expect(clefs).toContain(q.clef)
        if (!minor) expect(q.mode).toBe('major')
        expect(q.options).toHaveLength(12)
        const t = tonicOf(q.fifths, q.mode)
        expect(q.correctIndex).toBeGreaterThanOrEqual(0)
        expect(q.options[q.correctIndex]).toMatchObject({ letter: t.letter, accidental: t.accidental })
        expect(q.options.filter(o => o.letter === t.letter && o.accidental === t.accidental)).toHaveLength(1)
      }
    }
  })

  it('reaches every signature of the level, both clefs from level 3, both modes at level 4', () => {
    for (const level of LEVELS) {
      const qs = run(level, 1500, seeded(level))
      expect(new Set(qs.map(q => q.fifths))).toEqual(new Set(signaturesFor(level)))
      expect(new Set(qs.map(q => q.clef))).toEqual(new Set(KEY_SIG_LEVELS[level].clefs))
      expect(new Set(qs.map(q => q.mode))).toEqual(new Set(level === 4 ? ['major', 'minor'] : ['major']))
    }
    expect(signaturesFor(1)).toEqual([-2, -1, 0, 1, 2])
    expect(signaturesFor(2)).toHaveLength(9)
    expect(signaturesFor(3)).toHaveLength(15)
  })

  it('never shows the same signature twice in a row, even with a stuck random source', () => {
    for (const level of LEVELS) {
      for (const rng of [seeded(99), () => 0, () => 0.999999]) {
        const qs = run(level, 300, rng)
        for (let i = 1; i < qs.length; i++) expect(qs[i].fifths).not.toBe(qs[i - 1].fifths)
      }
    }
  })
})

describe('answer sounds', () => {
  it('plays a home chord built on the tonic: major or minor third, perfect fifth', () => {
    for (const fifths of signaturesFor(4)) for (const mode of ['major', 'minor'] as const) {
      const [root, third, fifth] = homeChord(fifths, mode).map(midi)
      const t = tonicOf(fifths, mode)
      expect(root).toBe(midi({ ...t, octave: 4 }))
      expect(third - root).toBe(mode === 'major' ? 4 : 3)
      expect(fifth - root).toBe(7)
    }
  })

  it('plays the chord on a right answer, and the pick before it on a miss', () => {
    const q = generateKeySigQuestion(1, 'letters', null, seeded(3))
    const right = answerSound(q, q.correctIndex)
    expect(right).toHaveLength(1)
    expect(right[0].pitches).toHaveLength(3)
    const wrong = q.correctIndex === 0 ? 1 : 0
    const miss = answerSound(q, wrong)
    expect(miss[0].pitches).toEqual([{ letter: q.options[wrong].letter, accidental: q.options[wrong].accidental, octave: 4 }])
    expect(miss[1].at).toBeGreaterThan(miss[0].at)
    expect(miss[1].pitches).toEqual(right[0].pitches)
  })

  it('plays a missed pick where its key sits on the pad, renamed keys included (B# low, Cb high)', () => {
    for (const fifths of signaturesFor(4)) {
      const options = keyPad(fifths, 'letters')
      const q: KeySigQuestion = { fifths, mode: 'major', clef: 'treble', options, correctIndex: -1 }
      const at = (o: KeySigQuestion['options'][number]) => options.indexOf(o)
      const sound = (i: number) => midi(answerSound(q, i)[0].pitches[0])
      const whites = q.options.filter(o => o.row === 'natural').map(o => sound(at(o)))
      expect(whites, `whites of ${q.fifths}`).toEqual([60, 62, 64, 65, 67, 69, 71])
      const blacks = q.options.filter(o => o.row === 'accidental').map(o => sound(at(o)))
      expect(blacks, `blacks of ${q.fifths}`).toEqual([61, 63, 66, 68, 70])
    }
  })
})
