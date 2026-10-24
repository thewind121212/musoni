import type { Chapter } from '@/theory/types'
import sharpsFlats from './01-sharps-flats'
import doublesNaturals from './02-doubles-naturals'
import enharmonic from './03-enharmonic'
import halfWholeSteps from './04-half-whole-steps'
import review from './05-review'

/**
 * Chapter 2: accidentals, enharmonic notes, half and whole steps. Adapted
 * from Hutchinson, Music Theory for the 21st-Century Classroom, sections 1.4,
 * 1.5 and 2.1, with the review after the practice exercises 1.6 and 2.4
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch02-accidentals-steps.md.
 */
export default {
  id: 'accidentals-steps',
  number: 2,
  title: { vi: 'Dấu hóa, nửa cung, nguyên cung', en: 'Accidentals and steps' },
  lessons: [sharpsFlats, doublesNaturals, enharmonic, halfWholeSteps, review],
} satisfies Chapter
