import type { Chapter } from '@/theory/types'
import modulationTonicization from './01-modulation-tonicization'
import keyRelationships from './02-key-relationships'
import diatonicPivot from './03-diatonic-pivot'
import chromaticPivot from './04-chromatic-pivot'
import withoutPivot from './05-without-pivot'
import review from './06-review'

/**
 * Chapter 23: Modulation. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 22.1-22.7 and the practice exercises 22.8
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch23-modulation.md.
 */
export default {
  id: 'modulation',
  number: 23,
  title: { vi: 'Chuyển giọng', en: 'Modulation' },
  lessons: [modulationTonicization, keyRelationships, diatonicPivot, chromaticPivot, withoutPivot, review],
} satisfies Chapter
