import type { Chapter } from '@/theory/types'
import whatIsMinimalism from './01-what-is-minimalism'
import additiveProcess from './02-additive-process'
import phaseShifting from './03-phase-shifting'
import review from './04-review'

/**
 * Chapter 36: minimalism. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, chapter 35 (sections 35.1-35.2, the review after the
 * homework 35.3) (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch36-minimalism.md.
 */
export default {
  id: 'minimalism',
  number: 36,
  title: { vi: 'Âm nhạc tối giản', en: 'Minimalism' },
  lessons: [whatIsMinimalism, additiveProcess, phaseShifting, review],
} satisfies Chapter
