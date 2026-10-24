import type { Chapter } from '@/theory/types'
import noteValues from './01-note-values'
import timeSignature from './02-time-signature'
import dotsTies from './03-dots-ties'
import meter from './04-meter'
import tupletsSyncopation from './05-tuplets-syncopation'
import review from './06-review'

/**
 * Chapter 5: the basics of rhythm. Adapted from Hutchinson, Music Theory for
 * the 21st-Century Classroom, sections 4.1-4.6 and the practice exercises 4.7
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch05-durations-time.md.
 */
export default {
  id: 'durations-time',
  number: 5,
  title: { vi: 'Trường độ và nhịp', en: 'Basics of rhythm' },
  lessons: [noteValues, timeSignature, dotsTies, meter, tupletsSyncopation, review],
} satisfies Chapter
