import type { Chapter } from '@/theory/types'
import twelveToneRows from './01-twelve-tone-rows'
import transpositionNumbers from './02-transposition-numbers'
import determiningRowForms from './03-determining-row-forms'
import writingRowForms from './04-writing-row-forms'
import rowFormsInMusic from './05-row-forms-in-music'
import review from './06-review'

/**
 * Chapter 35: Serialism. Adapted from Hutchinson, Music Theory for the
 * 21st-Century Classroom, sections 34.1-34.6 and the practice exercises 34.7
 * (GNU FDL 1.3, see ../NOTICE.md). The row is our own. Notes: docs/theory/ch35-serialism.md.
 */
export default {
  id: 'serialism',
  number: 35,
  title: { vi: 'Kỹ thuật mười hai âm và chủ nghĩa chuỗi', en: 'Serialism' },
  lessons: [twelveToneRows, transpositionNumbers, determiningRowForms, writingRowForms, rowFormsInMusic, review],
} satisfies Chapter
