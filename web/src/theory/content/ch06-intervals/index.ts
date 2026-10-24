import type { Chapter } from '@/theory/types'
import intervalSize from './01-interval-size'
import intervalQuality from './02-interval-quality'
import identifyIntervals from './03-identify-intervals'
import writeInvert from './04-write-invert'
import augmentedDiminished from './05-augmented-diminished'
import review from './06-review'

/**
 * Chapter 6: intervals. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 5.1-5.5 and the practice exercises 5.6
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch06-intervals.md.
 */
export default {
  id: 'intervals',
  number: 6,
  title: { vi: 'Quãng', en: 'Intervals' },
  lessons: [intervalSize, intervalQuality, identifyIntervals, writeInvert, augmentedDiminished, review],
} satisfies Chapter
