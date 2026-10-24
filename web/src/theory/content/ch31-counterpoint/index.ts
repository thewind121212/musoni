import type { Chapter } from '@/theory/types'
import firstSpecies from './01-first-species'
import secondThirdSpecies from './02-second-third-species'
import fourthFifthSpecies from './03-fourth-fifth-species'
import invention from './04-invention'
import fugue from './05-fugue'
import review from './06-review'

/**
 * Chapter 31: Introduction to counterpoint. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 30.1-30.8 and the practice
 * exercises 30.9 (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch31-counterpoint.md.
 */
export default {
  id: 'counterpoint',
  number: 31,
  title: { vi: 'Nhập môn đối âm', en: 'Introduction to counterpoint' },
  lessons: [firstSpecies, secondThirdSpecies, fourthFifthSpecies, invention, fugue, review],
} satisfies Chapter
