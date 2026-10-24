import type { Chapter } from '@/theory/types'
import resolveSeventh from './01-resolve-seventh'
import successiveSevenths from './02-successive-sevenths'
import v7ToI from './03-v7-to-i'
import vii7Resolution from './04-vii7-resolution'
import review from './05-review'

/**
 * Chapter 28: Voice leading seventh chords. Adapted from Hutchinson, Music
 * Theory for the 21st-Century Classroom, sections 27.1-27.5 and the practice
 * exercises 27.6 (GNU FDL 1.3, see ../NOTICE.md). Notes:
 * docs/theory/ch28-voice-leading-sevenths.md.
 */
export default {
  id: 'voice-leading-sevenths',
  number: 28,
  title: { vi: 'Dẫn bè hợp âm bảy', en: 'Voice leading seventh chords' },
  lessons: [resolveSeventh, successiveSevenths, v7ToI, vii7Resolution, review],
} satisfies Chapter
