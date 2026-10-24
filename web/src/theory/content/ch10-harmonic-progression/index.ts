import type { Chapter } from '@/theory/types'
import circleOfFifths from './01-circle-of-fifths'
import circleSegments from './02-circle-segments'
import harmonicFunction from './03-harmonic-function'
import functionProgressions from './04-function-progressions'
import popProgressions from './05-pop-progressions'
import review from './06-review'

/**
 * Chapter 10: harmonic progression and function. Adapted from Hutchinson,
 * Music Theory for the 21st-Century Classroom, sections 9.1-9.8 and the
 * practice exercises 9.9 (GNU FDL 1.3, see ../NOTICE.md).
 * Notes: docs/theory/ch10-harmonic-progression.md.
 */
export default {
  id: 'harmonic-progression',
  number: 10,
  title: { vi: 'Tiến trình hòa âm và chức năng', en: 'Harmonic progression and function' },
  lessons: [circleOfFifths, circleSegments, harmonicFunction, functionProgressions, popProgressions, review],
} satisfies Chapter
