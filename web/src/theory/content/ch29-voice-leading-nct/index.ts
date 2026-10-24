import type { Chapter } from '@/theory/types'
import avoidingParallels from './01-avoiding-parallels'
import repeatedStepDown from './02-repeated-step-down'
import stepUpLeaps from './03-step-up-leaps'
import review from './04-review'

/**
 * Chapter 29: voice leading with non-chord tones. Adapted from Hutchinson,
 * Music Theory for the 21st-Century Classroom, sections 28.1-28.3 and the
 * practice exercises 28.4 (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch29-voice-leading-nct.md.
 */
export default {
  id: 'voice-leading-nct',
  number: 29,
  title: { vi: 'Dẫn bè với nốt ngoài hợp âm', en: 'Voice leading with non-chord tones' },
  lessons: [avoidingParallels, repeatedStepDown, stepUpLeaps, review],
} satisfies Chapter
