import type { Lesson } from '@/theory/types'

/** Book 33.1: atonal music, integer notation for pitches and intervals, pitch-class sets. */
export default {
  id: 'integer-notation',
  title: { vi: 'Ký hiệu số nguyên', en: 'Integer notation' },
  minutes: 5,
  sources: [{ section: '33.1', url: 'https://musictheory.pugetsound.edu/mt21c/SetTheorySection.html' }],
  recap: [
    { vi: 'Nhạc phi điệu tính lấy quãng làm nền, không dựa vào gam và hợp âm', en: 'Atonal music is built from intervals, not scales and chords' },
    { vi: 'Mỗi lớp cao độ là một số: {C} = 0, {C#} = 1 … {B} = 11', en: 'Each pitch class is an integer: {C} = 0, {C#} = 1 … {B} = 11' },
    { vi: 'Quãng là số nửa cung, tính theo modulo 12 như mặt đồng hồ', en: 'An interval is a number of half steps, counted modulo 12 like a clock' },
    { vi: 'Tập hợp lớp cao độ là nhóm các lớp cao độ ta phân tích', en: 'A pitch-class set is the group of pitch classes we analyze' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nhạc phi điệu tính', en: 'Atonal music' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nhạc phi điệu tính** (atonal music) tránh các hợp âm và gam quen thuộc, nên quãng trở thành viên gạch xây nên bản nhạc. Để phân tích loại nhạc này, ta dùng **lý thuyết tập hợp** (set theory).',
            en: '**Atonal music** avoids traditional chords and scales, so intervals become its building blocks. To analyze it we use **set theory**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+G#4+B4 E4+C5+Eb5' },
        { type: 'play', notes: 'C4+G#4+B4 E4+C5+Eb5', label: { vi: 'Nghe hai hợp âm', en: 'Hear two chords' } },
        {
          type: 'tip',
          text: {
            vi: 'Hai hợp âm trông khác nhau trên khuông nhưng được xây từ cùng các quãng. Chương này chỉ bạn cách nhận ra điều đó.',
            en: 'The two chords look different on the staff but are built from the same intervals. This chapter shows how to see that.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Cao độ thành số', en: 'Pitches as integers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Lý thuyết tập hợp dùng **ký hiệu số nguyên** (integer notation): {C} là 0, mỗi nửa cung cộng thêm 1, đến {B} là 11. Hợp âm {C} trưởng {C} {E} {G} là 0, 4, 7.',
            en: 'Set theory uses **integer notation**: {C} is 0, each half step adds 1, up to {B} at 11. The {C} major triad {C} {E} {G} is 0, 4, 7.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4 C#4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4',
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
        },
        { type: 'play', notes: 'C4 C#4 D4 Eb4 E4 F4 F#4 G4 Ab4 A4 Bb4 B4', label: { vi: 'Nghe từ 0 đến 11', en: 'Hear 0 to 11' } },
        { type: 'keys', notes: 'C4 E4 G4', caption: { vi: '0, 4, 7 trên phím đàn:', en: '0, 4, 7 on the keys:' } },
        { type: 'play', notes: 'C4+E4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này mang số nào?', en: 'Which integer is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '8', en: '8' } },
          { text: { vi: '9', en: '9' }, correct: true },
          { text: { vi: '10', en: '10' } },
        ],
      },
      reason: {
        vi: '{A} cao hơn {C} chín nửa cung, nên {A} là 9.',
        en: '{A} is nine half steps above {C}, so {A} is 9.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Lớp cao độ', en: 'Pitch classes' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Số nguyên coi các nốt trùng âm là một: {D}, {C##} và {Ebb} đều là 2. Mọi quãng tám cũng như nhau: {D} nào cũng là 2. Mỗi số vì thế là một **lớp cao độ** (pitch class).',
            en: 'Integers treat enharmonic notes as one: {D}, {C##} and {Ebb} are all 2. Octaves are treated as one too: every {D} is 2. So each integer stands for a **pitch class**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Lý thuyết tập hợp phân tích **tập hợp lớp cao độ** (pitch-class set): một nhóm lớp cao độ lấy ra từ bản nhạc, như các nốt của một hợp âm.',
            en: 'Set theory analyzes **pitch-class sets**: groups of pitch classes taken from the music, such as the notes of a chord.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4 C##4 Ebb4 D5', labels: ['2', '2', '2', '2'] },
        { type: 'play', notes: 'D4 C##4 Ebb4 D5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Lớp cao độ 6 là phím nào?', en: 'Which key is pitch class 6?' },
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Đếm từ {C} = 0 lên sáu nửa cung: {C#} 1, {D} 2, {Eb} 3, {E} 4, {F} 5, {F#} 6.',
        en: 'Count six half steps up from {C} = 0: {C#} 1, {D} 2, {Eb} 3, {E} 4, {F} 5, {F#} 6.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quãng thành số', en: 'Intervals as integers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quãng cũng là một số: số nửa cung nó chứa. Quãng 5 tăng {C}–{G#} và quãng 6 thứ {E}–{C} đều là 8, vì nghe giống nhau và không phải giải quyết theo lối nào.',
            en: 'An interval is an integer too: the number of half steps it holds. The augmented 5th {C}–{G#} and the minor 6th {E}–{C} are both 8, since they sound the same and need not resolve in any particular way.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Các số chạy theo **hệ modulo 12** (modulo 12): sau 11 lại về 0, như mặt đồng hồ. Từ 11 lên 2 là 3 nửa cung, như từ 11 giờ đến 2 giờ là 3 tiếng.',
            en: 'The numbers run **modulo 12**: after 11 they start again at 0, like a clock. From 11 up to 2 is 3 half steps, just as 11 o’clock to 2 o’clock is 3 hours.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+G#4 E4+C5 B4 D5', labels: ['8', '8', '11', '2'] },
        { type: 'play', notes: 'C4+G#4 E4+C5 B4 D5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Từ 10 lên 1 là bao nhiêu nửa cung?', en: 'How many half steps is it from 10 up to 1?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Bb4 C#5', labels: ['10', '1'] },
        { type: 'play', notes: 'Bb4 C#5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '3', en: '3' }, correct: true },
          { text: { vi: '9', en: '9' } },
          { text: { vi: '11', en: '11' } },
        ],
      },
      reason: {
        vi: 'Đi lên 10, 11, 0, 1 là 3 bước, vì sau 11 lại về 0.',
        en: 'Going up 10, 11, 0, 1 takes 3 steps, since 0 follows 11.',
      },
    },
  ],
} satisfies Lesson
