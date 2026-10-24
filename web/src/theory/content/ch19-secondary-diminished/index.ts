import type { Chapter } from '@/theory/types'
import secondaryDiminished from './01-secondary-diminished'
import inMajor from './02-in-major'
import inMinor from './03-in-minor'
import analyzing from './04-analyzing'
import writing from './05-writing'
import review from './06-review'

/**
 * Chapter 19: secondary diminished chords. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 18.1-18.4 and the practice
 * exercises 18.5 (GNU FDL 1.3, see ../NOTICE.md). Notes:
 * docs/theory/ch19-secondary-diminished.md.
 */
export default {
  id: 'secondary-diminished',
  number: 19,
  title: { vi: 'Hợp âm giảm phụ', en: 'Secondary diminished chords' },
  lessons: [secondaryDiminished, inMajor, inMinor, analyzing, writing, review],
} satisfies Chapter
