import { describe, it, expect } from 'vitest'
import { doneInChapter, findLesson, lessonAfter, lessonNumber, nextLesson } from './outline'
import type { Chapter, Lesson } from '@/core/lesson/types'

const lesson = (id: string, kind?: 'review'): Lesson => ({
  id, kind, title: { vi: id, en: id }, minutes: 3, sources: [], recap: [], steps: [],
})
const chapters: Chapter[] = [
  { id: 'one', number: 1, title: { vi: '1', en: '1' }, lessons: [lesson('a'), lesson('b'), lesson('r', 'review')] },
  { id: 'two', number: 2, title: { vi: '2', en: '2' }, lessons: [lesson('c')] },
]

describe('outline', () => {
  it('suggests the first unfinished lesson, skipping ones finished out of order', () => {
    expect(nextLesson(chapters, {})?.key).toBe('one/a')
    expect(nextLesson(chapters, { 'one/a': 1, 'one/r': 1 })?.key).toBe('one/b')
    expect(nextLesson(chapters, { 'one/a': 1, 'one/b': 1, 'one/r': 1 })?.key).toBe('two/c')
    expect(nextLesson(chapters, { 'one/a': 1, 'one/b': 1, 'one/r': 1, 'two/c': 1 })).toBeNull()
  })

  it('follows the path into the next chapter and stops after the last lesson', () => {
    expect(lessonAfter(chapters, 'one/b')?.key).toBe('one/r')
    expect(lessonAfter(chapters, 'one/r')?.key).toBe('two/c')
    expect(lessonAfter(chapters, 'two/c')).toBeNull()
  })

  it('finds lessons by URL parts, counts a chapter and numbers lessons', () => {
    const ref = findLesson(chapters, 'one', 'b')!
    expect(lessonNumber(ref)).toBe('1.2')
    expect(lessonNumber(findLesson(chapters, 'one', 'r')!)).toBe('1')
    expect(findLesson(chapters, 'one', 'c')).toBeNull()
    expect(doneInChapter(chapters[0], { 'one/b': 1, 'two/c': 1 })).toBe(1)
  })
})
