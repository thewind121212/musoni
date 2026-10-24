import type { Chapter } from '@/theory/types'
import augSixthIntro from './01-aug-sixth-intro'
import threeTypes from './02-three-types'
import analyzing from './03-analyzing'
import chromaticContext from './04-chromatic-context'
import review from './05-review'

/**
 * Chapter 22: augmented sixth chords. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 21.1-21.8 and the practice
 * exercises 21.9 (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch22-augmented-sixth.md.
 */
export default {
  id: 'augmented-sixth',
  number: 22,
  title: { vi: 'Hợp âm sáu tăng', en: 'Augmented sixth chords' },
  lessons: [augSixthIntro, threeTypes, analyzing, chromaticContext, review],
} satisfies Chapter
