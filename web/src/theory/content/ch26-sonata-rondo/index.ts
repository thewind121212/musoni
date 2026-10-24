import type { Chapter } from '@/theory/types'
import sonataForm from './01-sonata-form'
import sonatinaPrinciple from './02-sonatina-principle'
import structuralFunctions from './03-structural-functions'
import rondo from './04-rondo'
import rondoCharacter from './05-rondo-character'
import review from './06-review'

/**
 * Chapter 26: sonata and rondo forms. Adapted from Hutchinson, Music Theory
 * for the 21st-Century Classroom, sections 25.1-25.6 (GNU FDL 1.3, see
 * ../NOTICE.md). Notes: docs/theory/ch26-sonata-rondo.md.
 */
export default {
  id: 'sonata-rondo',
  number: 26,
  title: { vi: 'Hình thức sonata và rondo', en: 'Sonata and rondo forms' },
  lessons: [sonataForm, sonatinaPrinciple, structuralFunctions, rondo, rondoCharacter, review],
} satisfies Chapter
