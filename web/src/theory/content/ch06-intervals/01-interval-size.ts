import type { Lesson } from '@/theory/types'

/** Book 5.1: what an interval is, harmonic and melodic, numeric size (5.1.1). */
export default {
  id: 'interval-size',
  title: { vi: 'Quãng và cỡ quãng', en: 'Intervals and their size' },
  minutes: 4,
  sources: [{ section: '5.1', url: 'https://musictheory.pugetsound.edu/mt21c/IntervalsIntroduction.html' }],
  practice: { drill: 'intervals', level: 1, durationSec: 60 },
  recap: [
    { vi: 'Quãng là khoảng cách giữa hai cao độ', en: 'An interval is the distance between two pitches' },
    { vi: 'Quãng hòa âm vang cùng lúc, quãng giai điệu vang lần lượt', en: 'A harmonic interval sounds together, a melodic one in turn' },
    { vi: 'Cỡ quãng: đếm tên nốt, tính cả hai đầu', en: 'Numeric size: count the letter names, both ends included' },
    { vi: 'Cỡ lẻ: dòng kẻ đến dòng kẻ, khe đến khe; cỡ chẵn: dòng kẻ đến khe', en: 'Odd: line to line or space to space; even: line to space' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Quãng là gì', en: 'What an interval is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Quãng** (interval) là khoảng cách giữa hai cao độ. Hai nốt vang cùng lúc, viết chồng lên nhau, tạo thành **quãng hòa âm** (harmonic interval). Hai nốt vang lần lượt, viết nối tiếp, tạo thành **quãng giai điệu** (melodic interval).',
            en: 'An **interval** is the distance between two pitches. Two notes that sound together, stacked on the staff, form a **harmonic interval**. Two notes that sound one after the other form a **melodic interval**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 G4 | C4+G4' },
        { type: 'play', notes: 'C4 G4 C4+G4', label: { vi: 'Nghe giai điệu rồi hòa âm', en: 'Hear melodic, then harmonic' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Cỡ quãng', en: 'Numeric size' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tên quãng có hai phần: tính chất và cỡ, như “quãng 6 trưởng”. Trước hết là **cỡ quãng** (numeric size): đếm tên nốt từ nốt dưới lên nốt trên, tính cả hai nốt.',
            en: 'An interval’s name has two parts, its quality and its number, as in “major sixth”. First the **numeric size**: count the letter names from the lower note up to the upper one, both included.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '{C} lên {E} là {C}, {D}, {E}: ba tên nốt, nên đó là quãng 3. Hai nốt giống nhau là **quãng đồng âm** (unison), còn {C} lên {C} kế tiếp là quãng 8, tức **quãng tám** (octave).',
            en: '{C} up to {E} is {C}, {D}, {E}: three letter names, so it is a 3rd. Two notes the same are a **unison**, and {C} up to the next {C} is an 8th, the **octave**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', labels: ['1', '2', '3', '4', '5', '6', '7', '8'], highlight: [0, 2] },
        { type: 'play', notes: 'C4 D4 E4 F4 G4 A4 B4 C5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng mấy?', en: 'What size is this interval?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4 A4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 4', en: '4th' } },
          { text: { vi: 'Quãng 5', en: '5th' }, correct: true },
          { text: { vi: 'Quãng 6', en: '6th' } },
        ],
      },
      reason: {
        vi: 'Đếm {D}, {E}, {F}, {G}, {A}: năm tên nốt, nên đó là quãng 5.',
        en: 'Count {D}, {E}, {F}, {G}, {A}: five letter names, so it is a 5th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dòng kẻ hay khe', en: 'Lines and spaces' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quãng cỡ lẻ (3, 5, 7) luôn đi từ dòng kẻ đến dòng kẻ, hoặc từ khe đến khe. Quãng cỡ chẵn (2, 4, 6, 8) luôn đi từ khe đến dòng kẻ, hoặc từ dòng kẻ đến khe.',
            en: 'Odd-numbered intervals (3rd, 5th, 7th) always go line to line or space to space. Even-numbered intervals (2nd, 4th, 6th, octave) always go space to line or line to space.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4 E4+B4 E4+F4 E4+A4', labels: ['3', '5', '2', '4'] },
        { type: 'play', notes: 'E4+G4 E4+B4 E4+F4 E4+A4' },
        {
          type: 'tip',
          text: {
            vi: 'Quãng 3 trông như từ một dòng kẻ lên dòng kẻ kế tiếp. Quãng 5 bỏ qua một dòng kẻ ở giữa.',
            en: 'A 3rd looks like one line up to the next line. A 5th skips a line in between.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng mấy?', en: 'What size is this interval?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F4+D5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5', en: '5th' } },
          { text: { vi: 'Quãng 6', en: '6th' }, correct: true },
          { text: { vi: 'Quãng 7', en: '7th' } },
        ],
      },
      reason: {
        vi: 'Từ khe lên dòng kẻ nên cỡ là số chẵn, và {F} {G} {A} {B} {C} {D} là sáu tên nốt.',
        en: 'Space to line means an even number, and {F} {G} {A} {B} {C} {D} is six letter names.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng mấy?', en: 'What size is this interval?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4 F5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6', en: '6th' } },
          { text: { vi: 'Quãng 7', en: '7th' }, correct: true },
          { text: { vi: 'Quãng 8', en: 'Octave' } },
        ],
      },
      reason: {
        vi: 'Từ dòng 2 lên dòng 5 nên cỡ là số lẻ, và {G} {A} {B} {C} {D} {E} {F} là bảy tên nốt.',
        en: 'Line 2 to line 5 means an odd number, and {G} {A} {B} {C} {D} {E} {F} is seven letter names.',
      },
    },
  ],
} satisfies Lesson
