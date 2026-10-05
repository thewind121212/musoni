import type { Chapter } from '@/theory/types'
import pitchNames from './01-pitch-names'
import staffClefs from './02-staff-clefs'
import cClefs from './03-c-clefs'
import octaves from './04-octaves'
import review from './05-review'

/**
 * Chapter 1: pitch and the staff. Adapted from Hutchinson, Music Theory for
 * the 21st-Century Classroom, sections 1.1-1.3 and the practice exercises 1.6
 * (GNU FDL 1.3, see ../NOTICE.md). Notes: docs/theory/ch01-pitch-staff.md.
 */
export default {
  id: 'pitch-staff',
  number: 1,
  title: { vi: 'Cao độ & khuông nhạc', en: 'Pitch and the staff' },
  lessons: [pitchNames, staffClefs, cClefs, octaves, review],
} satisfies Chapter
