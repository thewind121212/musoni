import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (33.9) on 33.1-33.8. Our own sets throughout. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 34', en: 'Chapter 34 review' },
  minutes: 5,
  sources: [{ section: '33.9', url: 'https://musictheory.pugetsound.edu/mt21c/Set-Theory-Practice-Exercises.html' }],
  recap: [
    { vi: 'Số nguyên cho lớp cao độ và quãng', en: 'Integers for pitch classes and intervals' },
    { vi: 'Dạng chuẩn, dạng nguyên mẫu và vectơ quãng', en: 'Normal form, prime form and interval vectors' },
    { vi: 'Chuyển vị Tn và phép đảo TnI', en: 'Transposition Tn and inversion TnI' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Lớp cao độ 10 là phím nào?', en: 'Which key is pitch class 10?' },
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: '{B} là 11, nên một nửa cung thấp hơn, {Bb}, là 10.',
        en: '{B} is 11, so a half step lower, {Bb}, is 10.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai nốt này cách nhau lớp quãng nào?', en: 'What interval class lies between these two notes?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'E4 C5', labels: ['4', '0'] },
        { type: 'play', notes: 'E4 C5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ic3', en: 'ic3' } },
          { text: { vi: 'ic4', en: 'ic4' }, correct: true },
          { text: { vi: 'ic8', en: 'ic8' } },
        ],
      },
      reason: {
        vi: '{E} lên {C} là 8 nửa cung, chiều kia là 12 − 8 = 4, nên là ic4.',
        en: '{E} up to {C} is 8 half steps and the other way is 12 − 8 = 4, so it is ic4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng chuẩn của tập hợp này là gì?', en: 'What is the normal form of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 Eb4 Ab4 B4', labels: ['0', '3', '8', '11'] },
        { type: 'play', notes: 'C4 Eb4 Ab4 B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[0, 3, 8, 11]', en: '[0, 3, 8, 11]' } },
          { text: { vi: '[8, 11, 0, 3]', en: '[8, 11, 0, 3]' }, correct: true },
          { text: { vi: '[11, 0, 3, 8]', en: '[11, 0, 3, 8]' } },
        ],
      },
      reason: {
        vi: '[8, 11, 0, 3] chỉ dài 7, ngắn hơn mọi cách xếp khác (11, 9 và 9).',
        en: '[8, 11, 0, 3] spans only 7, less than every other ordering (11, 9 and 9).',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng nguyên mẫu của tập hợp này là gì?', en: 'What is the prime form of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Eb4 F4 Bb4', labels: ['3', '5', '10'] },
        { type: 'play', notes: 'Eb4 F4 Bb4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '(025)', en: '(025)' } },
          { text: { vi: '(027)', en: '(027)' }, correct: true },
          { text: { vi: '(057)', en: '(057)' } },
        ],
      },
      reason: {
        vi: 'Dạng chuẩn [3, 5, 10] về 0 là (027), và bản đảo cũng cho (027); (057) chưa phải cách xếp gọn nhất.',
        en: 'The normal form [3, 5, 10] at 0 is (027), and its inversion gives (027) too; (057) is not the most compact ordering.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Vectơ quãng của tập hợp này là gì?', en: 'What is the interval vector of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4 E4 F4', labels: ['2', '4', '5'] },
        { type: 'play', notes: 'D4 E4 F4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '111000', en: '111000' }, correct: true },
          { text: { vi: '210000', en: '210000' } },
          { text: { vi: '101100', en: '101100' } },
        ],
      },
      reason: {
        vi: '2–4 là ic2, 2–5 là ic3, 4–5 là ic1: mỗi lớp quãng 1, 2, 3 một lần.',
        en: '2–4 is ic2, 2–5 is ic3 and 4–5 is ic1: one each of ic1, ic2 and ic3.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: '[4, 7, 11] ở T3 là gì?', en: 'What is [4, 7, 11] at T3?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[7, 10, 14]', en: '[7, 10, 14]' } },
          { text: { vi: '[1, 4, 8]', en: '[1, 4, 8]' } },
          { text: { vi: '[7, 10, 2]', en: '[7, 10, 2]' }, correct: true },
        ],
      },
      reason: {
        vi: 'Cộng 3 được 7, 10, 14, rồi 14 trừ 12 là 2.',
        en: 'Adding 3 gives 7, 10, 14, and 14 minus 12 is 2.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: '[2, 3, 7] đảo thành [4, 8, 9] ở TnI nào?', en: '[2, 3, 7] inverts to [4, 8, 9] at which TnI?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'T11I', en: 'T11I' }, correct: true },
          { text: { vi: 'T2I', en: 'T2I' } },
          { text: { vi: 'T7I', en: 'T7I' } },
        ],
      },
      reason: {
        vi: 'Viết ngược 9, 8, 4 rồi cộng: 2 + 9, 3 + 8, 7 + 4 đều bằng 11.',
        en: 'Written backward it is 9, 8, 4; adding, 2 + 9, 3 + 8 and 7 + 4 all make 11.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Vì sao 4–Z15 và 4–Z29 mang chữ Z?', en: 'Why do 4–Z15 and 4–Z29 carry a Z?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chúng có cùng dạng nguyên mẫu', en: 'They have the same prime form' } },
          { text: { vi: 'Chúng có cùng vectơ quãng', en: 'They have the same interval vector' }, correct: true },
          { text: { vi: 'Chúng đảo được thành nhau', en: 'They invert into each other' } },
        ],
      },
      reason: {
        vi: '(0146) và (0137) khác dạng nguyên mẫu nhưng cùng vectơ 111111.',
        en: '(0146) and (0137) are different prime forms with the same vector, 111111.',
      },
    },
  ],
} satisfies Lesson
