import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (34.7) on 34.1-34.6, with our own row. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 35', en: 'Chapter 35 review' },
  minutes: 5,
  sources: [{ section: '34.7', url: 'https://musictheory.pugetsound.edu/mt21c/SerialismExercises.html' }],
  recap: [
    { vi: 'Bốn dạng chuỗi và số chuyển vị', en: 'The four row forms and transposition numbers' },
    { vi: 'Nhận ra và viết dạng chuỗi', en: 'Determining and writing row forms' },
    { vi: 'Ma trận và chuỗi gối đầu', en: 'The matrix and overlapping rows' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'P₀ là 0 4 2 6 3 8 9 11 5 7 10 1. Dãy nào là I₈?', en: 'P₀ is 0 4 2 6 3 8 9 11 5 7 10 1. Which is I₈?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '8 0 10 2 11 4 5 7 1 3 6 9', en: '8 0 10 2 11 4 5 7 1 3 6 9' } },
          { text: { vi: '8 4 6 2 5 0 11 9 3 1 10 7', en: '8 4 6 2 5 0 11 9 3 1 10 7' }, correct: true },
          { text: { vi: '9 6 3 1 7 5 4 11 2 10 0 8', en: '9 6 3 1 7 5 4 11 2 10 0 8' } },
        ],
      },
      reason: {
        vi: 'I₈ bắt đầu từ 8 và đổi hướng mọi quãng: P₀ lên 4 thì I₈ xuống 4, từ 8 xuống 4.',
        en: 'I₈ starts on 8 and turns every interval around: P₀ goes up 4, so I₈ goes down 4, from 8 to 4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'RI₁₀ bắt đầu bằng nốt nào?', en: 'Which note does RI₁₀ start on?' },
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'RI₁₀ là I₁₀ đọc ngược, và I₀ kết thúc bằng 11, nên I₁₀ kết thúc bằng 11 + 10 − 12 = 9, tức {A}.',
        en: 'RI₁₀ is I₁₀ backward, and I₀ ends on 11, so I₁₀ ends on 11 + 10 − 12 = 9, which is {A}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là dạng chuỗi nào?', en: 'Which row form is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C#5 A4 B4 G4 Bb4 F4 E4 D4 Ab4 F#4 Eb4 Cn4' },
        { type: 'play', notes: 'C#5 A4 B4 G4 Bb4 F4 E4 D4 Ab4 F#4 Eb4 C4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'P₁', en: 'P₁' } },
          { text: { vi: 'I₁', en: 'I₁' }, correct: true },
          { text: { vi: 'I₀', en: 'I₀' } },
          { text: { vi: 'RI₀', en: 'RI₀' } },
        ],
      },
      reason: {
        vi: 'Nó xuống 4 rồi lên 2 nửa cung nên là I, và nốt đầu {C#} là 1.',
        en: 'It goes down 4, then up 2 half steps, so it is I, and its first note, {C#}, is 1.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là dạng chuỗi nào?', en: 'Which row form is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4 C5 Eb5 F5 B4 C#5 D5 G5 En5 Ab5 F#5 Bb5' },
        { type: 'play', notes: 'A4 C5 Eb5 F5 B4 C#5 D5 G5 E5 Ab5 F#5 Bb5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'RI₉', en: 'RI₉' } },
          { text: { vi: 'RI₁₀', en: 'RI₁₀' }, correct: true },
          { text: { vi: 'R₁₀', en: 'R₁₀' } },
          { text: { vi: 'I₉', en: 'I₉' } },
        ],
      },
      reason: {
        vi: 'Nó lên 3 rồi lên 3 nửa cung nên là RI, và nốt cuối {Bb} là 10.',
        en: 'It goes up 3 and up 3 again, so it is RI, and its last note, {Bb}, is 10.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dãy 6 3 0 10 4 2 1 8 11 7 9 5 là dạng chuỗi nào?', en: 'Which row form is 6 3 0 10 4 2 1 8 11 7 9 5?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'R₅', en: 'R₅' }, correct: true },
          { text: { vi: 'R₆', en: 'R₆' } },
          { text: { vi: 'RI₅', en: 'RI₅' } },
          { text: { vi: 'P₆', en: 'P₆' } },
        ],
      },
      reason: {
        vi: '6 3 0 giảm 3 rồi giảm 3, giống R, và số cuối là 5.',
        en: '6 3 0 drops by 3 twice, like R, and the last number is 5.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trong ma trận, một cột có {Bb} ở hàng trên cùng. Đọc từ trên xuống, cột đó là dạng nào?',
        en: 'In the matrix, one column has {Bb} in the top row. Read top to bottom, which form is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'P₁₀', en: 'P₁₀' } },
          { text: { vi: 'I₁₀', en: 'I₁₀' }, correct: true },
          { text: { vi: 'RI₁₀', en: 'RI₁₀' } },
        ],
      },
      reason: {
        vi: 'Mỗi cột đọc từ trên xuống là một dạng I, mang số của nốt đầu, {Bb} = 10.',
        en: 'Each column read downward is an I form, numbered by its first note, {Bb} = 10.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một đoạn nhạc chơi R₀, kết thúc bằng {C}. Chuỗi gối đầu ngay sau là một dạng P. Đó là dạng nào?',
        en: 'A passage plays R₀, which ends on {C}. The row that overlaps it is a P form. Which one?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'P₀', en: 'P₀' }, correct: true },
          { text: { vi: 'P₁', en: 'P₁' } },
          { text: { vi: 'P₁₁', en: 'P₁₁' } },
        ],
      },
      reason: {
        vi: 'Chuỗi sau bắt đầu từ chính nốt {C} = 0 đó, nên là P₀.',
        en: 'The next row starts on that same {C} = 0, so it is P₀.',
      },
    },
  ],
} satisfies Lesson
