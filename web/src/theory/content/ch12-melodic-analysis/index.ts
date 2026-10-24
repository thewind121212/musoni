import type { Chapter } from '@/theory/types'
import motive from './01-motive'
import melodicAlteration from './02-melodic-alteration'
import moreAlterations from './03-more-alterations'
import fragment from './04-fragment'
import phraseSubphrase from './05-phrase-subphrase'
import review from './06-review'

/**
 * Chapter 12: melodic analysis. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 11.1-11.5 and the practice exercises 11.6
 * (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch12-melodic-analysis.md.
 */
export default {
  id: 'melodic-analysis',
  number: 12,
  title: { vi: 'Phân tích giai điệu', en: 'Melodic analysis' },
  lessons: [motive, melodicAlteration, moreAlterations, fragment, phraseSubphrase, review],
} satisfies Chapter
