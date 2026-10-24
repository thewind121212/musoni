import type { Chapter } from '@/theory/types'
import voicesMotion from './01-voices-motion'
import voiceRules from './02-voice-rules'
import rootPosition from './03-root-position'
import inversions from './04-inversions'
import specialSixFour from './05-special-six-four'
import review from './06-review'

/**
 * Chapter 27: Voice leading triads. Adapted from Hutchinson, Music Theory for
 * the 21st-Century Classroom, sections 26.1-26.12 and the practice exercises
 * 26.13 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch27-voice-leading-triads.md.
 */
export default {
  id: 'voice-leading-triads',
  number: 27,
  title: { vi: 'Dẫn bè hợp âm ba', en: 'Voice leading triads' },
  lessons: [voicesMotion, voiceRules, rootPosition, inversions, specialSixFour, review],
} satisfies Chapter
