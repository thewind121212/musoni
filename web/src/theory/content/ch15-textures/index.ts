import type { Chapter } from '@/theory/types'
import textureChorale from './01-texture-chorale'
import arpeggiosAlberti from './02-arpeggios-alberti'
import blockChords from './03-block-chords'
import afterbeatsOffbeats from './04-afterbeats-offbeats'
import claveBassLines from './05-clave-bass-lines'
import review from './06-review'

/**
 * Chapter 15: accompanimental textures. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 14.1-14.7 (GNU FDL 1.3, see
 * ../NOTICE.md). Notes: docs/theory/ch15-textures.md.
 */
export default {
  id: 'textures',
  number: 15,
  title: { vi: 'Kết cấu phần đệm', en: 'Accompanimental textures' },
  lessons: [textureChorale, arpeggiosAlberti, blockChords, afterbeatsOffbeats, claveBassLines, review],
} satisfies Chapter
