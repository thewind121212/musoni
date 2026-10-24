import type { Lesson } from '@/theory/types'

/**
 * Book 35.1: the additive process (a group grows a note at a time), Glass's
 * version (repeat the pattern minus its final note), and, from the homework
 * (35.3), the subtractive process and the changing time signature.
 */
export default {
  id: 'additive-process',
  title: { vi: 'Quá trình cộng thêm', en: 'The additive process' },
  minutes: 4,
  sources: [{ section: '35.1', url: 'https://musictheory.pugetsound.edu/mt21c/AdditiveMinimalism.html' }],
  recap: [
    { vi: 'Cộng thêm: mỗi bước thêm một nốt và lặp vài lần', en: 'Additive: each stage adds a note and repeats' },
    { vi: 'Cách của Glass: lặp mẫu nhưng bỏ nốt cuối', en: "Glass's way: repeat the pattern minus its final note" },
    { vi: 'Bớt dần: mỗi bước bỏ nốt cuối', en: 'Subtractive: each stage drops the final note' },
    { vi: 'Số chỉ nhịp đổi theo độ dài mỗi bước', en: 'The time signature changes with each stage' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Quá trình cộng thêm', en: 'The additive process' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong **quá trình cộng thêm** (additive process), một nhóm nốt ngắn lớn dần: mỗi bước thêm một nốt vào cuối nhóm. Mỗi bước được lặp lại vài lần rồi mới sang bước sau.',
            en: 'In an **additive process**, a short group of notes grows: each stage adds one note to the end of the group. Each stage repeats several times before the next one starts.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4:8 D4:8 | C4:8 D4:8 E4:8 | C4:8 D4:8 E4:8 F4:8 | C4:8 D4:8 E4:8 F4:8 G4:8 ||', highlight: [4, 8, 13] },
        {
          type: 'play',
          notes: 'C4:8 D4:8 C4:8 D4:8 C4:8 D4:8 E4:8 C4:8 D4:8 E4:8 C4:8 D4:8 E4:8 F4:8 C4:8 D4:8 E4:8 F4:8 C4:8 D4:8 E4:8 F4:8 G4:8 C4:8 D4:8 E4:8 F4:8 G4:8',
          label: { vi: 'Nghe mỗi bước hai lần', en: 'Hear each stage twice' },
          bpm: 160,
        },
        {
          type: 'tip',
          text: {
            vi: 'Mỗi bước dài thêm một nốt móc đơn, nên số chỉ nhịp đổi theo: 2/8, 3/8, 4/8, 5/8.',
            en: 'Each stage is one eighth note longer, so the time signature changes with it: 2/8, 3/8, 4/8, 5/8.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bước cuối thêm nốt nào?', en: 'Which note does the last stage add?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'E4:8 G4:8 | E4:8 G4:8 A4:8 | E4:8 G4:8 A4:8 C5:8 ||' },
        { type: 'play', notes: 'E4:8 G4:8 E4:8 G4:8 E4:8 G4:8 A4:8 E4:8 G4:8 A4:8 E4:8 G4:8 A4:8 C5:8 E4:8 G4:8 A4:8 C5:8', bpm: 160 },
      ],
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Bước cuối lặp lại {E4} {G4} {A4} rồi thêm {C5} vào cuối.',
        en: 'The last stage repeats {E4} {G4} {A4}, then adds {C5} to the end.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Cách của Glass', en: "Glass's version" },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Philip Glass còn dùng một cách khác: thêm một lần lặp của mẫu nhưng bỏ nốt cuối. Mẫu 1 2 3 4 thành 1 2 3 4 1 2 3, rồi 1 2 3 4 1 2 3 1 2.',
            en: 'Philip Glass also used another way: add a repetition of the pattern, minus its final note. The pattern 1 2 3 4 becomes 1 2 3 4 1 2 3, then 1 2 3 4 1 2 3 1 2.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4:8 E4:8 G4:8 A4:8 C4:8 E4:8 G4:8 C4:8 E4:8',
          labels: ['1', '2', '3', '4', '1', '2', '3', '1', '2'],
          highlight: [4, 5, 6, 7, 8],
        },
        {
          type: 'play',
          notes: 'C4:8 E4:8 G4:8 A4:8 C4:8 E4:8 G4:8 A4:8 C4:8 E4:8 G4:8 C4:8 E4:8 G4:8 A4:8 C4:8 E4:8 G4:8 C4:8 E4:8',
          label: { vi: 'Nghe ba bước', en: 'Hear three stages' },
          bpm: 160,
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Mẫu 1 2 3 4 5 đã thành 1 2 3 4 5 1 2 3 4. Theo cách của Glass, bước sau thêm nhóm nào?',
        en: 'The pattern 1 2 3 4 5 has become 1 2 3 4 5 1 2 3 4. In Glass’s version, which group does the next stage add?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '1 2 3 4 5', en: '1 2 3 4 5' } },
          { text: { vi: '1 2 3', en: '1 2 3' }, correct: true },
          { text: { vi: '2 3 4', en: '2 3 4' } },
        ],
      },
      reason: {
        vi: 'Mỗi lần lặp mới bỏ nốt cuối của lần lặp trước: sau 1 2 3 4 là 1 2 3.',
        en: 'Each new repetition drops the final note of the one before: after 1 2 3 4 comes 1 2 3.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quá trình bớt dần', en: 'The subtractive process' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Làm ngược lại là **quá trình bớt dần** (subtractive process): bắt đầu từ cả nhóm, mỗi bước bỏ nốt cuối, cho tới khi chỉ còn nhóm đầu tiên.',
            en: 'The reverse is a **subtractive process**: start with the whole group and drop the final note at each stage, until only the first group is left.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4:8 A4:8 B4:8 D5:8 E5:8 | G4:8 A4:8 B4:8 D5:8 | G4:8 A4:8 B4:8 | G4:8 A4:8 ||' },
        {
          type: 'play',
          notes: 'G4:8 A4:8 B4:8 D5:8 E5:8 G4:8 A4:8 B4:8 D5:8 E5:8 G4:8 A4:8 B4:8 D5:8 G4:8 A4:8 B4:8 D5:8 G4:8 A4:8 B4:8 G4:8 A4:8 B4:8 G4:8 A4:8 G4:8 A4:8',
          label: { vi: 'Nghe mỗi bước hai lần', en: 'Hear each stage twice' },
          bpm: 160,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Một bước có năm nốt móc đơn. Số chỉ nhịp nào hợp với nó?', en: 'A stage has five eighth notes. Which time signature fits it?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4:8 D4:8 E4:8 G4:8 A4:8' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '5/4', en: '5/4' } },
          { text: { vi: '4/8', en: '4/8' } },
          { text: { vi: '5/8', en: '5/8' }, correct: true },
        ],
      },
      reason: {
        vi: '5/8 nghĩa là năm nốt móc đơn trong một ô nhịp.',
        en: '5/8 means five eighth notes in a measure.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dòng nhạc này là quá trình gì?', en: 'Which process is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4:8 E4:8 G4:8 A4:8 | D4:8 E4:8 G4:8 | D4:8 E4:8 ||' },
        { type: 'play', notes: 'D4:8 E4:8 G4:8 A4:8 D4:8 E4:8 G4:8 A4:8 D4:8 E4:8 G4:8 D4:8 E4:8 G4:8 D4:8 E4:8 D4:8 E4:8', bpm: 160 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cộng thêm', en: 'Additive' } },
          { text: { vi: 'Bớt dần', en: 'Subtractive' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi bước mất nốt cuối nên nhóm ngắn dần: đó là quá trình bớt dần.',
        en: 'Each stage loses its final note, so the group shrinks: that is a subtractive process.',
      },
    },
  ],
} satisfies Lesson
