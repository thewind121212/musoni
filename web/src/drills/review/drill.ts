import { CardsIcon } from '@phosphor-icons/react'
import { defineDrill } from '@/app/drill'
import { REVIEW_DEFAULT_DURATION_SECONDS } from '@/config/constants'
import { S } from './strings'

// A type, not an interface: it must fit `DrillOptions` (a record).
export type ReviewOptions = {
  /** Chapter ids to ask from; null for every chapter with a finished lesson (new ones included as they come). */
  chapters: string[] | null
}

/**
 * Ôn tập: the checks of finished lessons, asked again in a timed session.
 * Reached from Học, so not listed on Luyện, never Hôm nay's pick and not
 * counted among drills to open. No levels: one implicit level for bests.
 * Design: docs/fe/drill-review.md.
 */
export default defineDrill<ReviewOptions>({
  id: 'review',
  page: () => import('./pages/ReviewDrill').then(m => m.ReviewDrill),
  icon: CardsIcon,
  title: S.title,
  description: S.what,
  group: 'read',
  order: 90,
  levels: [{ name: S.title }],
  defaults: { level: 1, durationSec: REVIEW_DEFAULT_DURATION_SECONDS, chapters: null },
  listed: false,
})
