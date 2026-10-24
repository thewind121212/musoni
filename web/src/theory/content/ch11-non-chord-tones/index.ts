import type { Chapter } from '@/theory/types'
import passingNeighbor from './01-passing-neighbor'
import appoggiaturaEscape from './02-appoggiatura-escape'
import anticipationPedal from './03-anticipation-pedal'
import suspensionRetardation from './04-suspension-retardation'
import review from './05-review'

/**
 * Chapter 11: non-chord tones. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 10.1-10.11 and the practice exercises
 * 10.12 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch11-non-chord-tones.md.
 */
export default {
  id: 'non-chord-tones',
  number: 11,
  title: { vi: 'Nốt ngoài hợp âm', en: 'Non-chord tones' },
  lessons: [passingNeighbor, appoggiaturaEscape, anticipationPedal, suspensionRetardation, review],
} satisfies Chapter
