import type { Chapter } from '@/theory/types'
import modes from './01-modes'
import extendedChords from './02-extended-chords'
import planing from './03-planing'
import pandiatonicQuartal from './04-pandiatonic-quartal'
import polychords from './05-polychords'
import review from './06-review'

/**
 * Chapter 33: Impressionism and extended tonality. Adapted from Hutchinson,
 * Music Theory for the 21st-Century Classroom, sections 32.1-32.4 and the
 * practice exercises 32.5 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch33-impressionism.md.
 */
export default {
  id: 'impressionism',
  number: 33,
  title: { vi: 'Trường phái ấn tượng và điệu tính mở rộng', en: 'Impressionism and extended tonality' },
  lessons: [modes, extendedChords, planing, pandiatonicQuartal, polychords, review],
} satisfies Chapter
