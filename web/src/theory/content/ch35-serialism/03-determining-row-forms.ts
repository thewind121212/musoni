import type { Lesson } from '@/theory/types'

/** Book 34.2: tell the row form by its opening intervals, then read its transposition number. */
export default {
  id: 'determining-row-forms',
  title: { vi: 'Nhận ra dạng chuỗi', en: 'Determining row forms' },
  minutes: 4,
  sources: [{ section: '34.2', url: 'https://musictheory.pugetsound.edu/mt21c/DeterminingRowForms.html' }],
  recap: [
    { vi: 'So vài quãng đầu với bốn dạng chuỗi', en: 'Compare the first few intervals with the four forms' },
    { vi: 'Đếm quãng bằng số nửa cung, lên hay xuống', en: 'Count intervals in half steps, up or down' },
    { vi: 'Rồi đọc số: nốt đầu cho P, I; nốt cuối cho R, RI', en: 'Then read the number: first note for P, I; last note for R, RI' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nhìn các quãng đầu', en: 'Look at the opening intervals' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Để biết một đoạn nhạc dùng dạng chuỗi nào, so vài quãng đầu của nó với bốn dạng. Đếm mỗi quãng bằng số nửa cung, lên hay xuống.',
            en: 'To find which row form a passage uses, compare its first few intervals with the four forms. Count each interval in half steps, up or down.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Với chuỗi của ta: P lên 4 rồi xuống 2, I xuống 4 rồi lên 2, R xuống 3 hai lần, RI lên 3 hai lần.',
            en: 'For our row: P goes up 4 then down 2, I down 4 then up 2, R down 3 twice, RI up 3 twice.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4 E4 D4 || C5 Ab4 Bb4 || C#5 Bb4 G4 || B3 D4 F4',
          labels: ['P', '', '', 'I', '', '', 'R', '', '', 'RI', '', ''],
        },
        { type: 'play', notes: 'C4 E4 D4 R C5 Ab4 Bb4 R C#5 Bb4 G4 R B3 D4 F4', label: { vi: 'Nghe ba nốt đầu của mỗi dạng', en: 'Hear the first three notes of each form' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là dạng chuỗi nào?', en: 'Which row form is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Eb4 F#4 A4 B4 Fn4 G4 Ab4 C#5 Bb4 D5 Cn5 En5' },
        { type: 'play', notes: 'Eb4 F#4 A4 B4 F4 G4 Ab4 C#5 Bb4 D5 C5 E5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'P', en: 'P' } },
          { text: { vi: 'I', en: 'I' } },
          { text: { vi: 'R', en: 'R' } },
          { text: { vi: 'RI', en: 'RI' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nó đi lên 3 nửa cung rồi lên 3 nữa ({Eb4}, {F#4}, {A4}), giống RI.',
        en: 'It goes up 3 half steps, then up 3 again ({Eb4}, {F#4}, {A4}), like RI.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Rồi tìm số chuyển vị', en: 'Then find the transposition number' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Biết dạng rồi, xem nốt đầu (với P, I) hoặc nốt cuối (với R, RI) để có số chuyển vị. Đoạn dưới đây xuống 3 rồi xuống 3, nên là R; nốt cuối {Ab} là 8, vậy đó là R₈.',
            en: 'Once you know the form, read the first note (P, I) or the last note (R, RI) for the transposition number. The passage below goes down 3 and down 3 again, so it is R; its last note, {Ab}, is 8, so it is R₈.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A5 F#5 Eb5 C#5 G5 Fn5 En5 B4 D5 Bb4 Cn5 Ab4', highlight: [11] },
        { type: 'play', notes: 'A5 F#5 Eb5 C#5 G5 F5 E5 B4 D5 Bb4 C5 Ab4', label: { vi: 'Nghe R₈', en: 'Hear R₈' } },
        {
          type: 'tip',
          text: {
            vi: 'Với chuỗi này, hai quãng đầu là đủ để phân biệt. Với chuỗi khác, đôi khi phải xem thêm vài quãng.',
            en: 'For this row the first two intervals are enough. With other rows you may need a few more.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là dạng chuỗi nào?', en: 'Which row form is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G5 Eb5 F5 C#5 En5 B4 Bb4 Ab4 D5 Cn5 An4 F#4' },
        { type: 'play', notes: 'G5 Eb5 F5 C#5 E5 B4 Bb4 Ab4 D5 C5 A4 F#4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I₇', en: 'I₇' }, correct: true },
          { text: { vi: 'I₆', en: 'I₆' } },
          { text: { vi: 'P₇', en: 'P₇' } },
          { text: { vi: 'RI₆', en: 'RI₆' } },
        ],
      },
      reason: {
        vi: 'Nó xuống 4 rồi lên 2 nửa cung nên là I, và nốt đầu {G} là 7.',
        en: 'It goes down 4, then up 2 half steps, so it is I, and its first note, {G}, is 7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là dạng chuỗi nào?', en: 'Which row form is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'B5 Ab5 F5 Eb5 An5 G5 F#5 C#5 En5 Cn5 D5 Bb4' },
        { type: 'play', notes: 'B5 Ab5 F5 Eb5 A5 G5 F#5 C#5 E5 C5 D5 Bb4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'R₁₁', en: 'R₁₁' } },
          { text: { vi: 'R₁₀', en: 'R₁₀' }, correct: true },
          { text: { vi: 'RI₁₀', en: 'RI₁₀' } },
          { text: { vi: 'P₁₁', en: 'P₁₁' } },
        ],
      },
      reason: {
        vi: 'Nó xuống 3 rồi xuống 3 nên là R, và nốt cuối {Bb} là 10.',
        en: 'It goes down 3 and down 3 again, so it is R, and its last note, {Bb}, is 10.',
      },
    },
  ],
} satisfies Lesson
