import type { Chapter } from '@/theory/types'
import ninthChords from './01-ninth-chords'
import extendedAltered from './02-extended-altered'
import writingAnalyzing from './03-writing-analyzing'
import voicingsProgressions from './04-voicings-progressions'
import bluesScales from './05-blues-scales'
import review from './06-review'

/**
 * Chapter 32: introduction to jazz theory. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 31.1-31.11 and the practice
 * exercises 31.12 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch32-jazz.md.
 */
export default {
  id: 'jazz',
  number: 32,
  title: { vi: 'Nhập môn hòa âm jazz', en: 'Introduction to jazz theory' },
  lessons: [ninthChords, extendedAltered, writingAnalyzing, voicingsProgressions, bluesScales, review],
} satisfies Chapter
