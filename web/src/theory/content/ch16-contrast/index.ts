import type { Chapter } from '@/theory/types'
import elements from './01-elements'
import moreElements from './02-more-elements'
import rondo from './03-rondo'
import verseChorus from './04-verse-chorus'
import review from './05-review'

/**
 * Chapter 16: creating contrast between sections. Adapted from Hutchinson,
 * Music Theory for the 21st-Century Classroom, sections 15.1-15.3
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch16-contrast.md.
 */
export default {
  id: 'contrast',
  number: 16,
  title: { vi: 'Tạo tương phản giữa các đoạn', en: 'Creating contrast between sections' },
  lessons: [elements, moreElements, rondo, verseChorus, review],
} satisfies Chapter
