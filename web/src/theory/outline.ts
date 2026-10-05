import type { Chapter, Lesson } from './types'

/** A lesson with the chapter it belongs to and its place there. */
export interface LessonRef {
  chapter: Chapter
  lesson: Lesson
  /** 0-based position in the chapter. */
  index: number
  /** `chapter/lesson`: the URL path under /theory and the saved progress key. */
  key: string
}

export const lessonKey = (chapter: Pick<Chapter, 'id'>, lesson: Pick<Lesson, 'id'>) => `${chapter.id}/${lesson.id}`

/** Every lesson in order: chapter by chapter, lesson by lesson. */
export function allLessons(chapters: readonly Chapter[]): LessonRef[] {
  return chapters.flatMap(chapter =>
    chapter.lessons.map((lesson, index) => ({ chapter, lesson, index, key: lessonKey(chapter, lesson) })))
}

export function findLesson(chapters: readonly Chapter[], chapterId: string, lessonId: string): LessonRef | null {
  return allLessons(chapters).find(r => r.chapter.id === chapterId && r.lesson.id === lessonId) ?? null
}

/** The lesson after this one in the suggested path, into the next chapter; null after the last. */
export function lessonAfter(chapters: readonly Chapter[], key: string): LessonRef | null {
  const all = allLessons(chapters)
  const at = all.findIndex(r => r.key === key)
  return at === -1 ? null : all[at + 1] ?? null
}

/**
 * Where the reader is on the suggested path: the first lesson, in order, not
 * yet finished. Nothing is locked, so lessons finished out of order are simply
 * skipped. Null once every lesson is done.
 */
export function nextLesson(chapters: readonly Chapter[], done: Readonly<Record<string, unknown>>): LessonRef | null {
  return allLessons(chapters).find(r => !(r.key in done)) ?? null
}

/** How many of a chapter's lessons are finished. */
export function doneInChapter(chapter: Chapter, done: Readonly<Record<string, unknown>>): number {
  return chapter.lessons.filter(l => lessonKey(chapter, l) in done).length
}

/** The chapter's review lesson, if it has one. */
export function reviewOf(chapter: Chapter): Lesson | null {
  return chapter.lessons.find(l => l.kind === 'review') ?? null
}

/** "1.2" for a lesson, the chapter number alone for a review. */
export function lessonNumber(ref: Pick<LessonRef, 'chapter' | 'lesson' | 'index'>): string {
  return ref.lesson.kind === 'review' ? String(ref.chapter.number) : `${ref.chapter.number}.${ref.index + 1}`
}
