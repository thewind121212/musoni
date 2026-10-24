import type { Chapter } from '@/theory/types'
import tonicization from './01-tonicization'
import inMajor from './02-in-major'
import inMinor from './03-in-minor'
import analyzeWrite from './04-analyze-write'
import irregular from './05-irregular'
import review from './06-review'

/**
 * Chapter 18: secondary dominant chords. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 17.1-17.6 and the practice
 * exercises 17.7 (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch18-secondary-dominants.md.
 */
export default {
  id: 'secondary-dominants',
  number: 18,
  title: { vi: 'Hợp âm át phụ', en: 'Secondary dominant chords' },
  lessons: [tonicization, inMajor, inMinor, analyzeWrite, irregular, review],
} satisfies Chapter
