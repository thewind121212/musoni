import type { Chapter } from '@/theory/types'
import majorScale from './01-major-scale'
import keySignatures from './02-key-signatures'
import circleOfFifths from './03-circle-of-fifths'
import identifyingKeys from './04-identifying-keys'
import review from './05-review'

/**
 * Chapter 3: major scales and key signatures. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 2.2-2.3 and the practice
 * exercises 2.4 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch03-major-scales-keys.md.
 */
export default {
  id: 'major-scales-keys',
  number: 3,
  title: { vi: 'Gam trưởng và hóa biểu', en: 'Major scales and key signatures' },
  lessons: [majorScale, keySignatures, circleOfFifths, identifyingKeys, review],
} satisfies Chapter
