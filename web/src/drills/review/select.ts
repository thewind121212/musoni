import type { Chapter, CheckStep } from '@/core/lesson/types'
import type { ReviewMark } from '@/progress/progressStore'
import { allLessons, type LessonRef } from '@/theory/outline'
import { REVIEW_NO_REPEAT, REVIEW_WEIGHT as W } from '@/config/constants'

/** One check from a finished lesson, as Ôn tập asks it. */
export interface ReviewCheck {
  /** `chapter/lesson/step`: the key of its history in progress. Step from 0. */
  id: string
  ref: LessonRef
  step: number
  check: CheckStep
}

/** A check's id: its lesson's key and the step's place in the lesson. */
export const checkId = (lessonKey: string, step: number) => `${lessonKey}/${step}`

/**
 * A check by its id, or null when its lesson or step is gone (the content
 * changed since the id was saved).
 */
export function findCheck(chapters: readonly Chapter[], id: string): ReviewCheck | null {
  const at = id.lastIndexOf('/')
  const key = id.slice(0, at)
  const step = Number(id.slice(at + 1))
  const ref = allLessons(chapters).find(r => r.key === key)
  const found = ref?.lesson.steps[step]
  return ref && found?.kind === 'check' ? { id, ref, step, check: found } : null
}

/** Chapters with at least one finished lesson, in book order: what setup offers. */
export function chaptersWithDone(chapters: readonly Chapter[], done: Readonly<Record<string, unknown>>): Chapter[] {
  return chapters.filter(c => allLessons([c]).some(r => r.key in done))
}

/**
 * Every check of the finished lessons in the chosen chapters (all chapters
 * with finished lessons when `chapterIds` is null), in course order.
 */
export function reviewPool(
  chapters: readonly Chapter[], done: Readonly<Record<string, unknown>>, chapterIds: readonly string[] | null,
): ReviewCheck[] {
  const out: ReviewCheck[] = []
  for (const ref of allLessons(chapters)) {
    if (!(ref.key in done) || (chapterIds && !chapterIds.includes(ref.chapter.id))) continue
    ref.lesson.steps.forEach((step, i) => {
      if (step.kind === 'check') out.push({ id: checkId(ref.key, i), ref, step: i, check: step })
    })
  }
  return out
}

/**
 * How likely a check is to be asked next, from its last answer. Never
 * answered: `unseen`. Otherwise `base`, plus a little for every day since
 * (capped), plus a lot when that answer was wrong. See `REVIEW_WEIGHT`.
 */
export function checkWeight(mark: ReviewMark | undefined, now: number): number {
  if (!mark) return W.unseen
  const days = Math.max(0, (now - Date.parse(mark.at)) / 86_400_000)
  return W.base + Math.min(days, W.staleDays) * W.perDay + (mark.missed ? W.missed : 0)
}

/**
 * The next check: a weighted random pick, leaving out the last few asked
 * (`recent`, newest last) so nothing comes straight back. Null for an empty pool.
 */
export function pickCheck(
  pool: readonly ReviewCheck[], marks: Readonly<Record<string, ReviewMark>>, recent: readonly string[],
  now: number, rand: () => number = Math.random,
): ReviewCheck | null {
  if (pool.length === 0) return null
  const skip = new Set(recent.slice(-Math.min(REVIEW_NO_REPEAT, pool.length - 1)))
  const options = pool.filter(c => !skip.has(c.id))
  const weights = options.map(c => checkWeight(marks[c.id], now))
  let r = rand() * weights.reduce((a, b) => a + b, 0)
  for (let i = 0; i < options.length; i++) {
    r -= weights[i]
    if (r < 0) return options[i]
  }
  return options[options.length - 1]
}

/**
 * The chapters a session asks from, of those offered (ids in book order):
 * the saved choice, or all of them when it is null or no longer matches any.
 */
export function chosenChapters(saved: readonly string[] | null, offered: readonly string[]): string[] {
  const kept = saved ? offered.filter(id => saved.includes(id)) : []
  return kept.length > 0 ? kept : [...offered]
}

/**
 * The saved choice after switching one chapter on or off. Never empty: the
 * last chapter on stays on. All of them on saves null, so a chapter finished
 * later joins the review without the reader turning it on.
 */
export function toggleChapter(saved: readonly string[] | null, offered: readonly string[], id: string): string[] | null {
  const now = chosenChapters(saved, offered)
  const next = now.includes(id) ? now.filter(c => c !== id) : offered.filter(c => c === id || now.includes(c))
  if (next.length === 0) return saved ? [...saved] : null
  return next.length === offered.length ? null : next
}
