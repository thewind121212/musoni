import type { Chapter } from '@/theory/types'
import naturalMinor from './01-natural-minor'
import harmonicMelodic from './02-harmonic-melodic'
import minorKeySignatures from './03-minor-key-signatures'
import scaleDegreeNames from './04-scale-degree-names'
import review from './05-review'

/**
 * Chapter 4: minor scales and key signatures. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 3.1-3.3 and the practice
 * exercises 3.4 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch04-minor-scales-keys.md.
 */
export default {
  id: 'minor-scales-keys',
  number: 4,
  title: { vi: 'Gam thứ và hóa biểu giọng thứ', en: 'Minor scales and key signatures' },
  lessons: [naturalMinor, harmonicMelodic, minorKeySignatures, scaleDegreeNames, review],
} satisfies Chapter
