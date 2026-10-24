import type { Chapter } from '@/theory/types'
import borrowedChords from './01-borrowed-chords'
import borrowedDegrees from './02-borrowed-degrees'
import analyzingWriting from './03-analyzing-writing'
import deceptivePicardy from './04-deceptive-picardy'
import review from './05-review'

/**
 * Chapter 20: mode mixture. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 19.1-19.5 and the practice exercises 19.6
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch20-mode-mixture.md.
 */
export default {
  id: 'mode-mixture',
  number: 20,
  title: { vi: 'Pha trộn điệu thức', en: 'Mode mixture' },
  lessons: [borrowedChords, borrowedDegrees, analyzingWriting, deceptivePicardy, review],
} satisfies Chapter
