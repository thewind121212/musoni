import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (4.7) on 4.1-4.6. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 5', en: 'Chapter 5 review' },
  minutes: 3,
  sources: [{ section: '4.7', url: 'https://musictheory.pugetsound.edu/mt21c/BasicsOfRhythmPracticeExercises.html' }],
  practice: { drill: 'rhythm', level: 4, durationSec: 120, tempo: 80 },
  recap: [
    { vi: 'Trường độ nốt, dấu lặng, chấm dôi và dấu nối', en: 'Note values, rests, dots and ties' },
    { vi: 'Số chỉ nhịp và tên của nhịp', en: 'Time signatures and meters' },
    { vi: 'Liên ba, liên hai và nghịch phách', en: 'Tuplets and syncopation' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Dấu lặng này là gì?', en: 'Which rest is this?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'R:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Lặng tròn', en: 'A whole rest' }, correct: true },
          { text: { vi: 'Lặng trắng', en: 'A half rest' } },
          { text: { vi: 'Lặng đen', en: 'A quarter rest' } },
        ],
      },
      reason: {
        vi: 'Nó treo dưới dòng 4, nên là lặng tròn; lặng trắng thì nằm trên dòng 3.',
        en: 'It hangs below line 4, so it is a whole rest; a half rest sits on line 3.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Cặp nốt nào vừa đủ một ô nhịp 4/4?', en: 'Which pair exactly fills a measure of 4/4?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt trắng chấm dôi và nốt trắng', en: 'A dotted half and a half note' } },
          { text: { vi: 'Nốt trắng chấm dôi và nốt đen', en: 'A dotted half and a quarter note' }, correct: true },
          { text: { vi: 'Nốt tròn và nốt đen', en: 'A whole and a quarter note' } },
        ],
      },
      reason: {
        vi: 'Nốt trắng chấm dôi ba phách cộng nốt đen một phách là bốn; hai cặp kia ra năm phách.',
        en: 'A dotted half (three beats) plus a quarter (one) makes four; the other pairs make five.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai nốt nối này bằng một nốt nào?', en: 'These two tied notes equal which single note?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'B4:8~ B4:16' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt móc đơn chấm dôi', en: 'A dotted eighth note' }, correct: true },
          { text: { vi: 'Nốt đen', en: 'A quarter note' } },
          { text: { vi: 'Nốt đen chấm dôi', en: 'A dotted quarter note' } },
        ],
      },
      reason: {
        vi: 'Móc kép là một nửa móc đơn, nên móc đơn nối móc kép bằng móc đơn chấm dôi.',
        en: 'A sixteenth is half an eighth, so an eighth tied to a sixteenth equals a dotted eighth.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: '4/2 là nhịp gì?', en: 'What meter is 4/2?' },
      blocks: [{ type: 'staff', clef: 'none', time: '4/2', notes: 'B4:h B4:h B4:h B4:h' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nhịp hai đơn', en: 'Simple duple' } },
          { text: { vi: 'Nhịp bốn đơn', en: 'Simple quadruple' }, correct: true },
          { text: { vi: 'Nhịp bốn phức', en: 'Compound quadruple' } },
        ],
      },
      reason: {
        vi: 'Số trên 4 là nhịp đơn với bốn phách, mỗi phách là một nốt trắng.',
        en: 'A top number of 4 is simple with four beats, each beat a half note.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe: phách chia hai hay chia ba?', en: 'Listen: do the beats divide in two or in three?' },
      blocks: [
        {
          type: 'play',
          notes: 'C4:8 E4:8 G4:8 C5:8 G4:8 E4:8 | F4:8 A4:8 C5:8 F5:8 C5:8 A4:8 | G4:8 B4:8 D5:8 G4:8 B4:8 D5:8 | C5:q. C4:q.',
          bpm: 120,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chia hai: nhịp đơn', en: 'In two: simple meter' } },
          { text: { vi: 'Chia ba: nhịp phức', en: 'In three: compound meter' }, correct: true },
        ],
      },
      reason: {
        vi: 'Các nốt đi theo từng nhóm ba trong mỗi phách, như trong 6/8.',
        en: 'The notes move in groups of three within each beat, as in 6/8.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: '12/8 là nhịp gì?', en: 'What meter is 12/8?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nhịp ba phức', en: 'Compound triple' } },
          { text: { vi: 'Nhịp bốn phức', en: 'Compound quadruple' }, correct: true },
          { text: { vi: 'Nhịp bốn đơn', en: 'Simple quadruple' } },
        ],
      },
      reason: {
        vi: '12 là số trên của nhịp phức, và 12 chia 3 được bốn phách.',
        en: '12 is a compound top number, and 12 divided by 3 gives four beats.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Số 3 trên nhóm nốt này nghĩa là gì?', en: 'What does the 3 over these notes mean?' },
      blocks: [{ type: 'staff', clef: 'none', time: '2/4', notes: '3( B4:8 B4:8 B4:8 ) B4:q' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ba nốt trong thời gian của hai', en: 'Three notes in the time of two' }, correct: true },
          { text: { vi: 'Mỗi nốt dài ba phách', en: 'Each note lasts three beats' } },
          { text: { vi: 'Chơi nhóm này ba lần', en: 'Play the group three times' } },
        ],
      },
      reason: {
        vi: 'Đó là liên ba: ba nốt móc đơn chen vào thời gian của hai, tức một nốt đen.',
        en: 'It is a triplet: three eighths in the time of two, which is one quarter note.',
      },
    },
  ],
} satisfies Lesson
