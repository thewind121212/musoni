import type { Lesson } from '@/theory/types'

/**
 * The C clefs (alto and tenor), from book 1.3, where middle C is shown in
 * them. No practice link: the note reading drill has no C clef level yet.
 */
export default {
  id: 'c-clefs',
  title: { vi: 'Khóa Do', en: 'C clefs' },
  minutes: 3,
  sources: [{ section: '1.3', url: 'https://musictheory.pugetsound.edu/mt21c/OctaveRegisters.html' }],
  recap: [
    { vi: 'Khóa Do chỉ vào dòng của {C4}', en: 'A C clef points to the line of {C4}' },
    { vi: 'Khóa Do dòng 3: {C4} ở dòng 3', en: 'Alto clef: {C4} is on line 3' },
    { vi: 'Khóa Do dòng 4: {C4} ở dòng 4', en: 'Tenor clef: {C4} is on line 4' },
    { vi: 'Đếm từ {C4} để tìm các nốt khác', en: 'Count from {C4} to find the other notes' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Khóa Do', en: 'The C clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khóa Do** (C clef) chỉ vào dòng mang tên {C4}, tức **Do giữa** (middle C). Khóa này có thể đặt ở những dòng khác nhau, nên hãy xem nó ôm dòng nào.',
            en: 'A **C clef** points to the line that is {C4}, **middle C**. It can sit on different lines, so check which line it centres on.',
          },
        },
        { type: 'staff', clef: 'alto', notes: 'C4', labels: 'pitches', highlight: [0] },
        { type: 'play', notes: 'C4', label: { vi: 'Nghe {C4}', en: 'Hear {C4}' } },
        { type: 'keys', notes: 'C4', from: 'C3', octaves: 2, caption: { vi: '{C4} trên phím đàn:', en: '{C4} on the keys:' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Khóa Do dòng 3', en: 'The alto clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **khóa Do dòng 3** (alto clef), {C4} nằm trên dòng 3, ngay giữa khuông. Đàn viola đọc nhạc bằng khóa này.',
            en: 'In the **alto clef**, {C4} is on line 3, the middle of the staff. The viola reads music in this clef.',
          },
        },
        { type: 'staff', clef: 'alto', notes: 'A3 B3 C4 D4 E4', labels: 'names', highlight: [2] },
        { type: 'play', notes: 'A3 B3 C4 D4 E4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'alto', notes: 'D4' }],
      answer: { type: 'key', note: 'D' },
      reason: {
        vi: '{C4} nằm ở dòng 3, nên khe ngay trên nó là {D4}.',
        en: '{C4} is on line 3, so the space just above it is {D4}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khóa Do dòng 4', en: 'The tenor clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **khóa Do dòng 4** (tenor clef), {C4} nằm trên dòng 4. Cello, bassoon và trombone dùng khóa này cho các nốt cao của chúng.',
            en: 'In the **tenor clef**, {C4} is on line 4. Cello, bassoon and trombone use it for their higher notes.',
          },
        },
        { type: 'staff', clef: 'tenor', notes: 'C4', labels: 'pitches', highlight: [0] },
        { type: 'play', notes: 'C4', label: { vi: 'Nghe {C4}', en: 'Hear {C4}' } },
        {
          type: 'tip',
          text: {
            vi: 'Hai khóa Do trông giống hệt nhau. Chỉ cần xem khóa ôm dòng nào: dòng đó là {C4}.',
            en: 'The two C clefs look exactly alike. Just see which line the clef centres on: that line is {C4}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở khóa Do dòng 4, {C4} nằm ở đâu?', en: 'In the tenor clef, where is {C4}?' },
      blocks: [{ type: 'staff', clef: 'tenor', notes: 'C4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Dòng 3', en: 'Line 3' } },
          { text: { vi: 'Dòng 4', en: 'Line 4' }, correct: true },
          { text: { vi: 'Khe 4', en: 'Space 4' } },
        ],
      },
      reason: {
        vi: 'Khóa Do dòng 4 ôm dòng 4, nên {C4} nằm trên dòng 4.',
        en: 'The tenor clef centres on line 4, so {C4} is on line 4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'tenor', notes: 'A3' }],
      answer: { type: 'key', note: 'A' },
      reason: {
        vi: 'Đếm xuống từ {C4} ở dòng 4: khe 3 là {B3}, dòng 3 là {A3}.',
        en: 'Count down from {C4} on line 4: space 3 is {B3}, line 3 is {A3}.',
      },
    },
  ],
} satisfies Lesson
