import type { Chapter } from '@/theory/types'
import verseChorus from './01-verse-chorus'
import aabaAbac from './02-aaba-abac'
import twelveBarBlues from './03-twelve-bar-blues'
import closedOpen from './04-closed-open'
import review from './05-review'

/**
 * Chapter 13: form in popular music. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 12.1-12.5 and the practice
 * exercises 12.6 (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch13-pop-form.md.
 */
export default {
  id: 'pop-form',
  number: 13,
  title: { vi: 'Hình thức trong nhạc phổ thông', en: 'Form in popular music' },
  lessons: [verseChorus, aabaAbac, twelveBarBlues, closedOpen, review],
} satisfies Chapter
