import type { Chapter } from '@/theory/types'
import romanNumerals from './01-roman-numerals'
import diatonicMajor from './02-diatonic-major'
import diatonicMinor from './03-diatonic-minor'
import authenticPlagal from './04-authentic-plagal'
import halfDeceptive from './05-half-deceptive'
import review from './06-review'

/**
 * Chapter 8: Roman numerals and cadences. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 7.1-7.4 and the practice
 * exercises 7.5 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch08-roman-cadences.md.
 */
export default {
  id: 'roman-cadences',
  number: 8,
  title: { vi: 'Bậc La Mã và kết', en: 'Roman numerals and cadences' },
  lessons: [romanNumerals, diatonicMajor, diatonicMinor, authenticPlagal, halfDeceptive, review],
} satisfies Chapter
