import { describe, it, expect } from 'vitest'
import { answerSound, chosenPitch, generateEarQuestion, questionSound, type EarLevel, type EarQuestion } from './generator'
import { label, midi } from '@/core/music/pitch'
import { EAR_KEY_BLOCK, EAR_LEVELS } from '@/config/constants'

/** Plays through `count` questions at a level, each fed the one before. */
function run(level: EarLevel, count: number) {
  const out: EarQuestion[] = []
  let prev: Parameters<typeof generateEarQuestion>[2] = null
  for (let i = 0; i < count; i++) {
    const q = generateEarQuestion(level, 'letters', prev)
    out.push(q)
    prev = { key: q.key, semitones: q.semitones, inKey: q.newKey ? 1 : prev!.inKey + 1 }
  }
  return out
}

describe('generateEarQuestion', () => {
  it('always has the note and the tonic on the pad, at every level', () => {
    for (const level of [1, 2, 3, 4] as const) {
      for (const q of run(level, 120)) {
        expect(q.correctIndex).toBeGreaterThanOrEqual(0)
        expect(q.tonicIndex).toBeGreaterThanOrEqual(0)
        expect(EAR_LEVELS[level].notes).toContain(q.semitones)
        expect(EAR_LEVELS[level].keys).toContain(q.key)
      }
    }
  })

  it('stays on the home chord in C at level 1, with no black-key answers', () => {
    const qs = run(1, 40)
    expect(new Set(qs.map(q => label(q.pitch.letter, q.pitch.accidental, 'letters')))).toEqual(new Set(['C', 'E', 'G']))
    expect(qs.every(q => q.options.every(o => o.row === 'natural'))).toBe(true)
  })

  it('plays the cadence for a new key, then changes key every block, never to the same key', () => {
    const qs = run(2, EAR_KEY_BLOCK * 4)
    expect(qs.map(q => q.newKey)).toEqual(qs.map((_, i) => i % EAR_KEY_BLOCK === 0))
    for (let i = EAR_KEY_BLOCK; i < qs.length; i += EAR_KEY_BLOCK) expect(qs[i].key).not.toBe(qs[i - 1].key)
    for (let i = 1; i < qs.length; i++) if (!qs[i].newKey) expect(qs[i].key).toBe(qs[i - 1].key)
  })

  it('never asks the same note twice in a row within a key', () => {
    const qs = run(3, 200)
    for (let i = 1; i < qs.length; i++) if (!qs[i].newKey) expect(qs[i].semitones).not.toBe(qs[i - 1].semitones)
  })

  it('spells a flat key\'s black keys as flats', () => {
    const q = generateEarQuestion(3, 'letters', null, () => 0.99) // last key at L3: Bb
    expect(q.key).toBe('Bb')
    expect(q.options.filter(o => o.row === 'accidental').every(o => o.accidental === 'b')).toBe(true)
  })
})

describe('sounds', () => {
  const q = generateEarQuestion(3, 'letters', null, () => 0) // C major, Do
  it('plays the cadence before the note only when asked, and says when the note sounds', () => {
    const plain = questionSound(q, false)
    expect(plain.events).toHaveLength(1)
    const full = questionSound(q, true)
    expect(full.events).toHaveLength(5)
    expect(full.events.at(-1)!.at).toBe(full.noteAt)
    expect(full.noteAt).toBeGreaterThan(full.events[3].at)
  })
  it('walks home on a right answer, and plays the pick then the note on a miss', () => {
    expect(answerSound({ ...q, semitones: 4 }, null).map(e => e.pitches[0].letter)).toEqual(['E', 'D', 'C'])
    const miss = answerSound(q, { letter: 'D', accidental: '', octave: 4 })
    expect(miss.map(e => e.pitches[0].letter)).toEqual(['D', 'C'])
  })
  it('places a picked key in the octave nearest the note', () => {
    const b = q.options.findIndex(o => o.letter === 'B')
    expect(midi(chosenPitch(q, b))).toBe(midi(q.pitch) - 1)
  })
})
