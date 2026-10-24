import type { Chapter } from '@/theory/types'
import secondaryChords from './01-secondary-chords'
import borrowedChords from './02-borrowed-chords'
import neapolitan from './03-neapolitan'
import augmentedSixths from './04-augmented-sixths'
import review from './05-review'

/**
 * Chapter 30: Voice leading chromatic harmonies. Adapted from Hutchinson,
 * Music Theory for the 21st-Century Classroom, sections 29.1-29.4 and the
 * practice exercises 29.5 (GNU FDL 1.3, see ../NOTICE.md). Notes:
 * docs/theory/ch30-voice-leading-chromatic.md.
 */
export default {
  id: 'voice-leading-chromatic',
  number: 30,
  title: { vi: 'Dẫn bè hợp âm biến âm', en: 'Voice leading chromatic harmonies' },
  lessons: [secondaryChords, borrowedChords, neapolitan, augmentedSixths, review],
} satisfies Chapter
