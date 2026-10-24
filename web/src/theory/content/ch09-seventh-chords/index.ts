import type { Chapter } from '@/theory/types'
import seventhIntro from './01-seventh-intro'
import seventhTypes from './02-seventh-types'
import ivOver5 from './03-iv-over-5'
import diatonicSevenths from './04-diatonic-sevenths'
import review from './05-review'

/**
 * Chapter 9: seventh chords. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 8.1-8.3 and the practice exercises 8.4
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch09-seventh-chords.md.
 */
export default {
  id: 'seventh-chords',
  number: 9,
  title: { vi: 'Hợp âm bảy', en: 'Seventh chords' },
  lessons: [seventhIntro, seventhTypes, ivOver5, diatonicSevenths, review],
} satisfies Chapter
