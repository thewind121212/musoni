import { defineStrings } from '@/core/i18n/translate'

/** Ôn tập's own strings (`drill.review.*`). Shared setup, run and result words stay in core/i18n. */
export const S = defineStrings('review', {
  title: 'Review',
  what: 'Questions from the lessons you have finished',
  'setup.hint': 'Questions from the lessons you have finished, answered as in the lesson. The ones you miss come back sooner.',
  'setup.chapters': 'Chapters',
  'setup.checks': '{count} questions',
  'setup.checks_one': '{count} question',
  'setup.empty': 'Finish a lesson first: its questions come here to review.',
  'setup.toLessons': 'Go to the lessons',
  missed: 'Worth another look',
  'missed.count': '{count} missed',
  'missed.open': 'Open lesson {number}',
  lessons: 'Lessons',
}, {
  title: 'Ôn tập',
  what: 'Câu hỏi từ các bài bạn đã học',
  'setup.hint': 'Câu hỏi từ các bài bạn đã học, trả lời như trong bài. Câu nào sai sẽ quay lại sớm hơn.',
  'setup.chapters': 'Chương',
  'setup.checks': '{count} câu hỏi',
  'setup.checks_one': '{count} câu hỏi',
  'setup.empty': 'Học xong một bài trước: câu hỏi của bài sẽ có ở đây để ôn.',
  'setup.toLessons': 'Tới phần Học',
  missed: 'Nên xem lại',
  'missed.count': '{count} câu sai',
  'missed.open': 'Mở bài {number}',
  lessons: 'Học',
})
