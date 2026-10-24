import type { Lesson } from '@/theory/types'
import { BAL_A, OPEN_HC, OPEN_HOME, OPEN_TO_G, PEDAL, hear } from './music'

/**
 * The chapter review, after the book's practice exercises (24.9): diagram a
 * piece and name its form. The exercises' pieces (Handel, Mozart, Gretchaninoff,
 * Brahms) are not reproduced; their answer schemes (two-reprise sectional
 * rounded binary, sectional ternary, the balanced-or-rounded case) become
 * diagram questions, with our own pieces to read and hear.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 25', en: 'Chapter 25 review' },
  minutes: 4,
  sources: [{ section: '24.9', url: 'https://musictheory.pugetsound.edu/mt21c/BinaryAndTernaryPracticeExercises.html' }],
  recap: [
    { vi: 'Khép kín và liên tục, nhắc lại cả hai đoạn', en: 'Sectional and continuous, two-reprise' },
    { vi: 'Hai đoạn cân bằng, tái hiện, đơn giản', en: 'Balanced, rounded and simple binary' },
    { vi: 'Ba đoạn, ba đoạn phức, tái hiện hay ba đoạn', en: 'Ternary, compound ternary, rounded binary or ternary' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Nghe cả bản. Hình thức là gì?', en: 'Listen to the whole piece. What is the form?' },
      blocks: [{ type: 'play', notes: hear(OPEN_HC, OPEN_TO_G, PEDAL, OPEN_HOME), bpm: 150 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' }, correct: true },
          { text: { vi: 'Hai đoạn đơn giản', en: 'Simple binary' } },
          { text: { vi: 'Ba đoạn', en: 'Ternary' } },
        ],
      },
      reason: {
        vi: 'Sau câu tương phản ngắn trên nốt giữ át, câu mở đầu quay lại và kết ở giọng chủ.',
        en: 'After a short contrasting phrase over a dominant pedal, the opening phrase returns and ends in the home key.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là đoạn A của một bản ở giọng {C} trưởng. Bản này khép kín hay liên tục?', en: 'This is the A section of a piece in {C} major. Is the piece sectional or continuous?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${OPEN_HC.notes} | ${OPEN_HOME.notes} ||` },
        { type: 'play', notes: hear(OPEN_HC, OPEN_HOME), bpm: 140 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khép kín', en: 'Sectional' }, correct: true },
          { text: { vi: 'Liên tục', en: 'Continuous' } },
        ],
      },
      reason: {
        vi: 'Đoạn A kết {B3} lên {C4} trên hợp âm I của {C} trưởng, nên là khép kín.',
        en: 'The A section ends {B3} up to {C4} on the tonic chord of {C} major, so it is sectional.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bản hai đoạn ở giọng {Bb} trưởng theo nguyên tắc hai đoạn. Đoạn B mở đầu ở giọng nào?',
        en: 'A binary piece in {Bb} major follows the binary principle. In which key does the B section begin?',
      },
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Đoạn A sang giọng át, {F} trưởng, và đoạn B bắt đầu từ đó rồi chuyển về {Bb} trưởng.',
        en: 'The A section moves to the dominant, {F} major, and the B section starts there before moving back to {Bb} major.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Sơ đồ: ||: a (HC) a′ (PAC, giọng chủ) :||: b (HC) a′ (PAC) :||. Tên hình thức là gì?',
        en: 'Diagram: ||: a (HC) a′ (PAC, home key) :||: b (HC) a′ (PAC) :||. What is the form?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện khép kín, nhắc lại cả hai đoạn', en: 'Two-reprise sectional rounded binary' }, correct: true },
          { text: { vi: 'Hai đoạn tái hiện liên tục, nhắc lại cả hai đoạn', en: 'Two-reprise continuous rounded binary' } },
          { text: { vi: 'Ba đoạn khép kín', en: 'Sectional ternary' } },
        ],
      },
      reason: {
        vi: 'Hai đoạn đều nhắc lại, đoạn A kết PAC ở giọng chủ, và câu a quay lại sau câu b.',
        en: 'Both sections repeat, the A section ends with a PAC in the home key, and phrase a returns after phrase b.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn A kết ở giọng át; đoạn B kết bằng cùng kết ấy ở giọng chủ, và phần mở đầu quay lại giữa đoạn B. Gọi là "hai đoạn cân bằng" thì bỏ sót điều gì?',
        en: 'The A section ends in the dominant; the B section ends with the same cadence in the home key, and the opening returns within it. What does "balanced binary" leave out?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phần mở đầu quay lại: bản cũng là tái hiện', en: 'The return of the opening: it is also rounded' }, correct: true },
          { text: { vi: 'Đoạn A kết trên hợp âm I', en: 'The A section ends on the tonic chord' } },
          { text: { vi: 'Hai kết giống nhau', en: 'The matching endings' } },
        ],
      },
      reason: {
        vi: '"Cân bằng" chỉ nói về hai kết giống nhau, không nói đến phần mở đầu quay lại.',
        en: '"Balanced" describes the matching endings only, not the return of the opening material.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'A kết PAC ở giọng chủ; B có giai điệu mới ở giọng mới, dài bằng A; rồi A quay lại. Tên hình thức là gì?',
        en: 'A ends with a PAC in the home key; B has a new melody in a new key, as long as A; then A returns. What is the form?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ba đoạn khép kín', en: 'Sectional ternary' }, correct: true },
          { text: { vi: 'Ba đoạn liên tục', en: 'Continuous ternary' } },
          { text: { vi: 'Hai đoạn tái hiện khép kín', en: 'Sectional rounded binary' } },
        ],
      },
      reason: {
        vi: 'Đoạn B đủ dài và có giai điệu mới nên là ba đoạn; đoạn A kết trên I nên là khép kín.',
        en: 'B is long enough and has a new melody, so it is ternary; A ends on the tonic chord, so it is sectional.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn này kết ở giọng nào?', en: 'In which key does this section end?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${BAL_A.notes} ||` },
        { type: 'play', notes: BAL_A.play, bpm: 140 },
      ],
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Nốt {F#} dẫn lên {G}: đoạn A chuyển sang giọng át, {G} trưởng.',
        en: 'The {F#} leads up to {G}: the A section modulates to the dominant, {G} major.',
      },
    },
  ],
} satisfies Lesson
