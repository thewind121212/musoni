import type { Chapter } from '@/theory/types'
import triadsIntro from './01-triads-intro'
import leadSheetSymbols from './02-lead-sheet-symbols'
import inversions from './03-inversions'
import analyzingChords from './04-analyzing-chords'
import susChords from './05-sus-chords'
import review from './06-review'

/**
 * Chapter 7: triads. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 6.1-6.6 and the practice exercises 6.7
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch07-triads.md.
 */
export default {
  id: 'triads',
  number: 7,
  title: { vi: 'Hợp âm ba', en: 'Triads' },
  lessons: [triadsIntro, leadSheetSymbols, inversions, analyzingChords, susChords, review],
} satisfies Chapter
