import type { Chapter } from '@/theory/types'
import figuredBass from './01-figured-bass'
import numeralsFigures from './02-numerals-figures'
import seventhFigures from './03-seventh-figures'
import cadentialSixFour from './04-cadential-six-four'
import otherSixFours from './05-other-six-fours'
import review from './06-review'

/**
 * Chapter 17: figured bass. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 16.1-16.5 and the practice exercises 16.6
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch17-figured-bass.md.
 */
export default {
  id: 'figured-bass',
  number: 17,
  title: { vi: 'Bè trầm số', en: 'Figured bass' },
  lessons: [figuredBass, numeralsFigures, seventhFigures, cadentialSixFour, otherSixFours, review],
} satisfies Chapter
