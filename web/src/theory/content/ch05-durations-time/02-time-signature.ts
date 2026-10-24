import type { Lesson } from '@/theory/types'

/** Book 4.1 (the time signature) with measures and tempo from 4.4. */
export default {
  id: 'time-signature',
  title: { vi: 'Ô nhịp và số chỉ nhịp', en: 'Measures and time signatures' },
  minutes: 5,
  sources: [
    { section: '4.1', url: 'https://musictheory.pugetsound.edu/mt21c/TimeSignature.html' },
    { section: '4.4', url: 'https://musictheory.pugetsound.edu/mt21c/meter.html' },
  ],
  practice: { drill: 'rhythm', level: 2, durationSec: 60, tempo: 60 },
  recap: [
    { vi: 'Vạch nhịp chia nhạc thành các ô nhịp', en: 'Bar lines split music into measures' },
    { vi: 'Số trên: bao nhiêu; số dưới: nốt gì', en: 'Top number: how many; bottom number: of what' },
    { vi: '4/4 viết tắt là C, 2/2 là C có gạch dọc', en: '4/4 can be written C, and 2/2 as cut time' },
    { vi: 'Nhịp độ là tốc độ của phách, tính bằng bpm', en: 'Tempo is the speed of the beat, in bpm' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ô nhịp', en: 'Measures' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các phách được gom thành từng nhóm đều nhau gọi là **ô nhịp** (measure). **Vạch nhịp** (bar line) là đường dọc ngăn cách các ô nhịp. Phách đầu tiên của mỗi ô nhịp là phách 1.',
            en: 'Beats are grouped into equal **measures**, also called bars. A **bar line** is the upright line between measures. The first beat of each measure is beat 1.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:h B4:q B4:q | B4:q B4:q B4:h | B4:w', labels: ['1', '3', '4', '1', '2', '3', '1'] },
        { type: 'play', notes: 'B4:h B4:q B4:q | B4:q B4:q B4:h | B4:w', bpm: 80 },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Số chỉ nhịp', en: 'The time signature' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Số chỉ nhịp** (time signature) đứng ở đầu bản nhạc. Số trên cho biết bao nhiêu, số dưới cho biết nốt gì: 4 là nốt đen, 2 là nốt trắng, 8 là nốt móc đơn.',
            en: 'The **time signature** stands at the start of the music. The top number tells you how many, and the bottom number tells you of what: 4 is a quarter note, 2 a half note, 8 an eighth note.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Vậy 3/4 là ba nốt đen trong mỗi ô nhịp.',
            en: 'So 3/4 means three quarter notes in each measure.',
          },
        },
        { type: 'staff', clef: 'none', time: '3/4', notes: 'B4:q B4:q B4:q | B4:h B4:q | B4:q B4:h', labels: ['1', '2', '3', '1', '3', '1', '2'] },
        { type: 'play', notes: 'B4:q B4:q B4:q | B4:h B4:q | B4:q B4:h', bpm: 90 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Số chỉ nhịp 2/4 nghĩa là gì?', en: 'What does the time signature 2/4 mean?' },
      blocks: [{ type: 'staff', clef: 'none', time: '2/4', notes: 'B4:q B4:q | B4:h' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai nốt đen mỗi ô nhịp', en: 'Two quarter notes per measure' }, correct: true },
          { text: { vi: 'Hai nốt trắng mỗi ô nhịp', en: 'Two half notes per measure' } },
          { text: { vi: 'Bốn nốt đen mỗi ô nhịp', en: 'Four quarter notes per measure' } },
        ],
      },
      reason: {
        vi: 'Số trên 2 là bao nhiêu, số dưới 4 là nốt đen: hai nốt đen mỗi ô nhịp.',
        en: 'The top 2 is how many and the bottom 4 is a quarter note: two quarters per measure.',
      },
    },
    {
      kind: 'explain',
      title: { vi: '4/4 và chữ C', en: 'Common time and cut time' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '4/4 là số chỉ nhịp hay gặp nhất, nên còn gọi là common time và có thể viết bằng chữ C. Chữ C có gạch dọc là 2/2: hai nốt trắng mỗi ô nhịp.',
            en: '4/4 is the most common time signature, so it is called common time and can be written as a C. A C with a line through it is 2/2, cut time: two half notes per measure.',
          },
        },
        { type: 'staff', clef: 'none', time: 'C', notes: 'B4:q B4:q B4:h | B4:w', labels: ['1', '2', '3', '1'] },
        { type: 'play', notes: 'B4:q B4:q B4:h | B4:w', bpm: 80, label: { vi: 'Nghe 4/4', en: 'Hear 4/4' } },
        { type: 'staff', clef: 'none', time: 'C|', notes: 'B4:h B4:h | B4:w', labels: ['1', '2', '1'] },
        { type: 'play', notes: 'B4:h B4:h | B4:w', bpm: 160, label: { vi: 'Nghe 2/2', en: 'Hear 2/2' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Cần thêm nốt gì để đủ ô nhịp 4/4 này?', en: 'What note completes this measure of 4/4?' },
      blocks: [{ type: 'staff', clef: 'none', time: '4/4', notes: 'B4:h B4:q' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một nốt đen', en: 'A quarter note' }, correct: true },
          { text: { vi: 'Một nốt trắng', en: 'A half note' } },
          { text: { vi: 'Một nốt tròn', en: 'A whole note' } },
        ],
      },
      reason: {
        vi: 'Nốt trắng hai phách cộng nốt đen một phách là ba, nên còn thiếu một phách: một nốt đen.',
        en: 'A half note (two beats) plus a quarter (one) makes three, so one beat is missing: a quarter note.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nhịp độ', en: 'Tempo' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nhịp độ** (tempo) là tốc độ của phách, thường ghi bằng số phách mỗi phút (bpm). Ở 60 bpm, mỗi phách dài đúng một giây.',
            en: '**Tempo** is the speed of the beat, often given in beats per minute (bpm). At 60 bpm, each beat lasts exactly one second.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q B4:q B4:h | B4:q B4:q B4:h' },
        { type: 'play', notes: 'B4:q B4:q B4:h | B4:q B4:q B4:h', bpm: 60, label: { vi: 'Nghe ở 60 bpm', en: 'Hear at 60 bpm' } },
        { type: 'play', notes: 'B4:q B4:q B4:h | B4:q B4:q B4:h', bpm: 120, label: { vi: 'Nghe ở 120 bpm', en: 'Hear at 120 bpm' } },
        {
          type: 'tip',
          text: {
            vi: 'Nhạc cổ điển ghi nhịp độ bằng chữ Ý, như Adagio (chậm), Andante (vừa phải) và Allegro (nhanh).',
            en: 'Classical music names tempos in Italian, such as Adagio (slow), Andante (walking pace) and Allegro (fast).',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở 120 bpm, mỗi phách dài bao lâu?', en: 'At 120 bpm, how long is each beat?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nửa giây', en: 'Half a second' }, correct: true },
          { text: { vi: 'Một giây', en: 'One second' } },
          { text: { vi: 'Hai giây', en: 'Two seconds' } },
        ],
      },
      reason: {
        vi: '120 phách trong 60 giây là hai phách mỗi giây, nên mỗi phách dài nửa giây.',
        en: '120 beats in 60 seconds is two beats a second, so each beat lasts half a second.',
      },
    },
  ],
} satisfies Lesson
