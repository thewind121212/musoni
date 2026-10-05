import { describe, expect, it } from 'vitest'
import { midi } from '@/core/music/pitch'
import { diatonicStep } from '@/core/music/notation'
import { CHORD_LEVELS, CHORD_ROMAN_KEY_BLOCK } from '@/config/constants'
import {
  answerSound, chosenChord, generateChordQuestion, isRight, nameQuestion, namePool, padSpelling, romanQuestion,
  type ChordLevel, type ChordQuestion, type NameQuestion, type RomanQuestion,
} from './generator'
import {
  QUALITIES, TOP_STEP, degreeName, diatonicTriad, keyAccidentals, parseKey, qualityOf, sameName, triadTones,
  type NoteName,
} from './theory'

const NAME_LEVELS: ChordLevel[] = [1, 2, 3, 4]
const ROMAN_LEVELS: ChordLevel[] = [5, 6, 7]
const text = (n: NoteName) => n.letter + n.accidental

/** A small seeded generator, so a long run is the same run every time. */
function seeded(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function run(level: ChordLevel, count: number, seed = 1): ChordQuestion[] {
  const rng = seeded(seed)
  const out: ChordQuestion[] = []
  let q: ChordQuestion | null = null
  for (let i = 0; i < count; i++) {
    q = generateChordQuestion(level, 'letters', q, rng)
    out.push(q)
  }
  return out
}

/** Checks a question is answerable and written as theory writes it. */
function expectValid(q: ChordQuestion) {
  expect(q.notes).toHaveLength(3)
  const steps = q.notes.map(diatonicStep)
  expect(Math.max(...steps)).toBeLessThanOrEqual(TOP_STEP)
  expect(midi(q.notes[0])).toBeLessThan(midi(q.notes[1]))
  expect(midi(q.notes[1])).toBeLessThan(midi(q.notes[2]))
  const tones = triadTones(q.root, q.quality)
  expect(tones).not.toBeNull()
  // The notes are the triad's tones, the bass the inversion's.
  expect(q.notes.map(text).sort()).toEqual(tones!.map(text).sort())
  expect(text(q.notes[0])).toBe(text(tones![q.inversion]))
}

describe('name levels', () => {
  it('level 1 asks exactly the seven triads of C major, in root position', () => {
    const pool = namePool(1)
    expect(pool.map(s => text(s.root) + s.quality)).toEqual(
      ['Cmajor', 'Dminor', 'Eminor', 'Fmajor', 'Gmajor', 'Aminor', 'Bdim'],
    )
    expect(pool.every(s => s.inversion === 0)).toBe(true)
  })

  it('every chord of every name level is valid, spelled, and answerable on its pad', () => {
    for (const level of NAME_LEVELS) {
      const cfg = CHORD_LEVELS[level]
      const pool = namePool(level)
      expect(pool.length).toBeGreaterThan(1)
      for (const spec of pool) {
        const q = nameQuestion(level, 'solfege', spec)
        expectValid(q)
        // The root is a key of the pad, in the pad's spelling, and its quality a live chip.
        expect(q.correctIndex).toBeGreaterThanOrEqual(0)
        expect(sameName(q.options[q.correctIndex], q.root)).toBe(true)
        expect(q.qualities).toContain(q.quality)
        expect(q.options.some(o => o.row === 'accidental')).toBe(cfg.blackKeys)
        // Exactly one key carries the root's name: no second spelling to tap.
        expect(q.options.filter(o => sameName(o, q.root))).toHaveLength(1)
        if (!cfg.inversions) expect(q.inversion).toBe(0)
      }
    }
  })

  it('gives each quality of a level the same share, and inverts all but augmented at level 4', () => {
    for (const level of [2, 3, 4] as ChordLevel[]) {
      const pool = namePool(level)
      for (const quality of CHORD_LEVELS[level].qualities!) {
        const share = pool.filter(s => s.quality === quality).reduce((sum, s) => sum + s.weight, 0)
        expect(share).toBeCloseTo(1 / CHORD_LEVELS[level].qualities!.length)
      }
    }
    const l4 = namePool(4)
    for (const quality of ['major', 'minor', 'dim'] as const) {
      expect(new Set(l4.filter(s => s.quality === quality).map(s => s.inversion))).toEqual(new Set([0, 1, 2]))
    }
    expect(l4.filter(s => s.quality === 'aug').every(s => s.inversion === 0)).toBe(true)
  })

  it('asks every major and minor root at level 2, and adds diminished and augmented at level 3', () => {
    const roots = (level: ChordLevel, q: string) => namePool(level).filter(s => s.quality === q).map(s => text(s.root))
    expect(roots(2, 'major')).toEqual(['C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'Bb', 'B'])
    expect(roots(2, 'minor')).toEqual(['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'])
    expect(roots(2, 'dim')).toEqual([])
    expect(roots(3, 'dim').length).toBeGreaterThan(0)
    expect(roots(3, 'aug').length).toBeGreaterThan(0)
  })

  it('spells the pad to the chord', () => {
    expect(padSpelling(triadTones({ letter: 'F', accidental: '' }, 'minor')!)).toBe('b')
    expect(padSpelling(triadTones({ letter: 'D', accidental: '' }, 'major')!)).toBe('#')
    expect(padSpelling(triadTones({ letter: 'C', accidental: '#' }, 'minor')!)).toBe('#')
    expect(padSpelling(triadTones({ letter: 'G', accidental: 'b' }, 'major')!)).toBe('b')
  })
})

describe('roman levels', () => {
  it('asks only keys within the level\'s accidentals, minor keys only at level 7', () => {
    const limit: Record<number, number> = { 5: 2, 6: 4, 7: 4 }
    for (const level of ROMAN_LEVELS) {
      for (const k of CHORD_LEVELS[level].keys!) {
        expect(Math.abs(keyAccidentals(parseKey(k)))).toBeLessThanOrEqual(limit[level])
        if (level < 7) expect(parseKey(k).mode).toBe('major')
      }
    }
    expect(CHORD_LEVELS[7].keys!.some(k => parseKey(k).mode === 'minor')).toBe(true)
  })

  it('every degree of every key is a valid diatonic triad in root position', () => {
    for (const level of ROMAN_LEVELS) {
      for (const k of CHORD_LEVELS[level].keys!) {
        const key = parseKey(k)
        for (let d = 0; d < 7; d++) {
          const q = romanQuestion(k, d, 1)
          expectValid(q)
          expect(q.inversion).toBe(0)
          expect(q.numerals).toHaveLength(7)
          // Each tone is a degree of the key's scale, but for minor's raised seventh in V and vii°.
          q.notes.forEach((n, i) => {
            const degree = (d + i * 2) % 7
            const raised = key.mode === 'minor' && degree === 6 && (d === 4 || d === 6)
            if (!raised) expect(text(n)).toBe(text(degreeName(key, degree)))
          })
          expect(qualityOf(diatonicTriad(key, d))).toBe(q.quality)
        }
      }
    }
  })
})

describe('a session of questions', () => {
  it('never repeats a chord back to back, at any level', () => {
    for (const level of [...NAME_LEVELS, ...ROMAN_LEVELS]) {
      const qs = run(level, 1500, level)
      qs.forEach(expectValid)
      for (let i = 1; i < qs.length; i++) {
        const [a, b] = [qs[i - 1], qs[i]]
        const same = a.kind === 'roman' && b.kind === 'roman'
          ? a.key === b.key && a.degree === b.degree
          : sameName(a.root, b.root) && a.quality === b.quality && a.inversion === b.inversion
        expect(same, `level ${level} question ${i}`).toBe(false)
      }
    }
  })

  it('reaches every chord of a name level and every quality and inversion it has', () => {
    for (const level of NAME_LEVELS) {
      const qs = run(level, 4000, 10 + level) as NameQuestion[]
      const seen = new Set(qs.map(q => text(q.root) + q.quality + q.inversion))
      expect(seen.size).toBe(namePool(level).length)
      expect(new Set(qs.map(q => q.quality))).toEqual(new Set(CHORD_LEVELS[level].qualities))
    }
  })

  it('holds a key for a block of questions, then moves to another key of the level', () => {
    for (const level of ROMAN_LEVELS) {
      const qs = run(level, 600, 20 + level) as RomanQuestion[]
      let block = 1
      for (let i = 1; i < qs.length; i++) {
        if (qs[i].key === qs[i - 1].key) {
          block++
          expect(qs[i].inKey).toBe(block)
        } else {
          expect(block).toBe(CHORD_ROMAN_KEY_BLOCK)
          expect(qs[i].inKey).toBe(1)
          block = 1
        }
        expect(block).toBeLessThanOrEqual(CHORD_ROMAN_KEY_BLOCK)
      }
      expect(new Set(qs.map(q => q.key))).toEqual(new Set(CHORD_LEVELS[level].keys))
      expect(new Set(qs.map(q => q.degree)).size).toBe(7)
    }
  })

  it('starts a new key after a level change', () => {
    const l7 = romanQuestion('f#', 2, 1)
    expect((generateChordQuestion(5, 'letters', l7, () => 0) as RomanQuestion).inKey).toBe(1)
  })
})

describe('answers', () => {
  const am = nameQuestion(4, 'letters', { root: { letter: 'A', accidental: '' }, quality: 'minor', inversion: 1, weight: 1 })

  it('needs both the root and the quality right', () => {
    expect(am.symbol).toBe('Am/C')
    expect(isRight(am, { root: am.correctIndex, quality: 'minor' })).toBe(true)
    expect(isRight(am, { root: am.correctIndex, quality: 'major' })).toBe(false)
    // The bass is not the root: tapping C is wrong.
    const c = am.options.findIndex(o => o.letter === 'C' && o.accidental === '')
    expect(isRight(am, { root: c, quality: 'minor' })).toBe(false)
    expect(isRight(am, { degree: 0 })).toBe(false)
  })

  it('checks a numeral by its degree', () => {
    const v = romanQuestion('a', 4, 1)
    expect(v.symbol).toBe('E')
    expect(v.numerals[v.degree]).toBe('V')
    expect(isRight(v, { degree: 4 })).toBe(true)
    expect(isRight(v, { degree: 6 })).toBe(false)
  })

  it('voices the chord the reader named, near the question, and nothing when right', () => {
    expect(chosenChord(am, { root: am.correctIndex, quality: 'minor' })).toBeNull()
    const major = chosenChord(am, { root: am.correctIndex, quality: 'major' })!
    expect(major.map(midi)).toEqual([69, 73, 76])
    const c = am.options.findIndex(o => o.letter === 'C' && o.accidental === '')
    expect(chosenChord(am, { root: c, quality: 'dim' })!.map(midi)).toEqual([72, 75, 78])
    const vi = chosenChord(romanQuestion('C', 0, 1), { degree: 5 })!
    expect(vi.map(p => p.letter)).toEqual(['A', 'C', 'E'])
  })

  it('plays the chord when right, the pick and then the chord when wrong', () => {
    expect(answerSound(am, null)).toHaveLength(1)
    const miss = answerSound(am, chosenChord(am, { root: am.correctIndex, quality: 'major' }))
    expect(miss).toHaveLength(2)
    expect(miss[1].pitches).toBe(am.notes)
    expect(miss[1].at).toBeGreaterThan(miss[0].at)
  })

  it('names quality chips the level does not use as not asked', () => {
    for (const level of NAME_LEVELS) {
      const q = nameQuestion(level, 'letters', namePool(level)[0])
      expect(QUALITIES.filter(x => q.qualities.includes(x))).toEqual(CHORD_LEVELS[level].qualities)
    }
  })
})
