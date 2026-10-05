import { describe, it, expect } from 'vitest'
import { chaptersWithDone, checkWeight, chosenChapters, findCheck, pickCheck, reviewPool, toggleChapter } from './select'
import type { Chapter, Lesson, Step } from '@/core/lesson/types'

const check = (n: number): Step => ({
  kind: 'check', prompt: { vi: `Câu ${n}`, en: `Q${n}` }, reason: { vi: 'Vì', en: 'Because' },
  answer: { type: 'choice', choices: [{ text: { vi: 'a', en: 'a' }, correct: true }, { text: { vi: 'b', en: 'b' } }] },
})
const explain: Step = { kind: 'explain', title: { vi: 'Ý', en: 'Idea' }, blocks: [] }
const lesson = (id: string, steps: Step[]): Lesson => ({
  id, title: { vi: id, en: id }, minutes: 3, sources: [], recap: [], steps,
})
const chapters: Chapter[] = [
  { id: 'one', number: 1, title: { vi: 'Một', en: 'One' }, lessons: [lesson('a', [explain, check(1), check(2)]), lesson('b', [check(3)])] },
  { id: 'two', number: 2, title: { vi: 'Hai', en: 'Two' }, lessons: [lesson('c', [explain, check(4)])] },
]
const NOW = Date.parse('2026-10-05T12:00:00Z')
const daysAgo = (n: number) => new Date(NOW - n * 86_400_000).toISOString()

describe('review pool', () => {
  it('holds the checks of finished lessons only, with their place in the lesson', () => {
    const pool = reviewPool(chapters, { 'one/a': {}, 'two/c': {} }, null)
    expect(pool.map(c => c.id)).toEqual(['one/a/1', 'one/a/2', 'two/c/1'])
    expect(pool[2].ref.chapter.id).toBe('two')
  })

  it('keeps to the chosen chapters', () => {
    expect(reviewPool(chapters, { 'one/a': {}, 'two/c': {} }, ['two']).map(c => c.id)).toEqual(['two/c/1'])
  })

  it('finds a check again by its id, and nothing once its step is no longer a check', () => {
    expect(findCheck(chapters, 'one/a/2')?.check.prompt.en).toBe('Q2')
    expect(findCheck(chapters, 'one/a/0')).toBeNull()
    expect(findCheck(chapters, 'gone/x/1')).toBeNull()
  })

  it('offers only chapters with a finished lesson', () => {
    expect(chaptersWithDone(chapters, { 'two/c': {} }).map(c => c.id)).toEqual(['two'])
  })
})

describe('weighting', () => {
  it('brings back a missed check soonest, then new ones, then ones not seen lately, then ones just answered right', () => {
    const missed = checkWeight({ at: daysAgo(0), missed: true }, NOW)
    const unseen = checkWeight(undefined, NOW)
    const stale = checkWeight({ at: daysAgo(12) }, NOW)
    const fresh = checkWeight({ at: daysAgo(0) }, NOW)
    expect(missed).toBeGreaterThan(stale)
    expect(stale).toBeGreaterThan(unseen)
    expect(unseen).toBeGreaterThan(fresh)
  })

  it('stops growing with age after a while', () => {
    expect(checkWeight({ at: daysAgo(200) }, NOW)).toBe(checkWeight({ at: daysAgo(30) }, NOW))
  })

  it('picks in proportion to weight', () => {
    const pool = reviewPool(chapters, { 'one/a': {} }, null)
    const marks = { 'one/a/1': { at: daysAgo(0) }, 'one/a/2': { at: daysAgo(0), missed: true as const } }
    let missedPicks = 0
    for (let i = 0; i < 200; i++) {
      if (pickCheck(pool, marks, [], NOW, () => i / 200)!.id === 'one/a/2') missedPicks++
    }
    // Weights 1 and 7: the missed one about 7 times in 8.
    expect(missedPicks).toBe(175)
  })

  it('never asks one of the last few checks again straight away, unless the pool is that small', () => {
    const pool = reviewPool(chapters, { 'one/a': {}, 'one/b': {}, 'two/c': {} }, null)
    for (let i = 0; i < 20; i++) {
      expect(pickCheck(pool, {}, ['one/a/1', 'one/a/2', 'one/b/0'], NOW, () => i / 20)!.id).toBe('two/c/1')
    }
    const two = reviewPool(chapters, { 'one/a': {} }, null)
    expect(pickCheck(two, {}, ['one/a/1', 'one/a/2'], NOW, () => 0.99)!.id).toBe('one/a/1')
  })

  it('has nothing to ask from an empty pool', () => {
    expect(pickCheck([], {}, [], NOW)).toBeNull()
  })
})

describe('choosing chapters', () => {
  const offered = ['one', 'two', 'three']

  it('asks from every chapter until the reader narrows it, and from all again when the choice no longer matches', () => {
    expect(chosenChapters(null, offered)).toEqual(offered)
    expect(chosenChapters(['two'], offered)).toEqual(['two'])
    expect(chosenChapters(['gone'], offered)).toEqual(offered)
  })

  it('switches one chapter at a time, in book order, keeping the last one on', () => {
    expect(toggleChapter(null, offered, 'two')).toEqual(['one', 'three'])
    expect(toggleChapter(['three'], offered, 'one')).toEqual(['one', 'three'])
    expect(toggleChapter(['two'], offered, 'two')).toEqual(['two'])
  })

  it('saves "all" rather than a list once every chapter is on, so later chapters join', () => {
    expect(toggleChapter(['one', 'three'], offered, 'two')).toBeNull()
  })
})
