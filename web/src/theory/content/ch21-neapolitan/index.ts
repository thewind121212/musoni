import type { Chapter } from '@/theory/types'
import neapolitanChord from './01-neapolitan-chord'
import neapolitanToV from './02-neapolitan-to-v'
import neapolitanExamples from './03-neapolitan-examples'
import review from './04-review'

/**
 * Chapter 21: The Neapolitan chord. Adapted from Hutchinson, Music Theory for
 * the 21st-Century Classroom, sections 20.1-20.2 and the practice exercises
 * 20.3 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch21-neapolitan.md.
 */
export default {
  id: 'neapolitan',
  number: 21,
  title: { vi: 'Hợp âm Napoli', en: 'The Neapolitan chord' },
  lessons: [neapolitanChord, neapolitanToV, neapolitanExamples, review],
} satisfies Chapter
