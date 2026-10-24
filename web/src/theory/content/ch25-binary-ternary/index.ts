import type { Chapter } from '@/theory/types'
import sectionalContinuous from './01-sectional-continuous'
import balancedBinary from './02-balanced-binary'
import roundedBinary from './03-rounded-binary'
import ternary from './04-ternary'
import roundedOrTernary from './05-rounded-or-ternary'
import review from './06-review'

/**
 * Chapter 25: binary and ternary forms. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 24.1-24.8 and the practice
 * exercises 24.9 (GNU FDL 1.3, see ../NOTICE.md). The example pieces are our
 * own (music.ts). Notes: docs/theory/ch25-binary-ternary.md.
 */
export default {
  id: 'binary-ternary',
  number: 25,
  title: { vi: 'Hình thức hai đoạn và ba đoạn', en: 'Binary and ternary forms' },
  lessons: [sectionalContinuous, balancedBinary, roundedBinary, ternary, roundedOrTernary, review],
} satisfies Chapter
