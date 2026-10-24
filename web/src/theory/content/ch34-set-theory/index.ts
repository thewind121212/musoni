import type { Chapter } from '@/theory/types'
import integerNotation from './01-integer-notation'
import normalForm from './02-normal-form'
import primeForm from './03-prime-form'
import intervalVector from './04-interval-vector'
import transpositionInversion from './05-transposition-inversion'
import review from './06-review'

/**
 * Chapter 34: set theory. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 33.1-33.8 and the practice exercises 33.9
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch34-set-theory.md.
 */
export default {
  id: 'set-theory',
  number: 34,
  title: { vi: 'Lý thuyết tập hợp', en: 'Set theory' },
  lessons: [integerNotation, normalForm, primeForm, intervalVector, transpositionInversion, review],
} satisfies Chapter
