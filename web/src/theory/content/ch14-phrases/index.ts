import type { Chapter } from '@/theory/types'
import perfectAuthentic from './01-perfect-authentic'
import sentence from './02-sentence'
import period from './03-period'
import longerPeriods from './04-longer-periods'
import groupsElision from './05-groups-elision'
import review from './06-review'

/**
 * Chapter 14: phrases in combination. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 13.1-13.8 and the practice
 * exercises 13.9 (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch14-phrases.md.
 */
export default {
  id: 'phrases',
  number: 14,
  title: { vi: 'Kết hợp các câu nhạc', en: 'Phrases in combination' },
  lessons: [perfectAuthentic, sentence, period, longerPeriods, groupsElision, review],
} satisfies Chapter
