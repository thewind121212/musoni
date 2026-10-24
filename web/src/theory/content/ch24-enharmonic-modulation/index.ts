import type { Chapter } from '@/theory/types'
import enharmonicPivot from './01-enharmonic-pivot'
import v7Ger6 from './02-v7-ger6'
import diminishedPivot from './03-diminished-pivot'
import review from './04-review'

/**
 * Chapter 24: enharmonic modulation. Adapted from Hutchinson, Music Theory for
 * the 21st-Century Classroom, sections 23.1-23.3 and the practice exercises
 * 23.4 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch24-enharmonic-modulation.md.
 */
export default {
  id: 'enharmonic-modulation',
  number: 24,
  title: { vi: 'Chuyển giọng trùng âm', en: 'Enharmonic modulation' },
  lessons: [enharmonicPivot, v7Ger6, diminishedPivot, review],
} satisfies Chapter
