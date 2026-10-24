import type { Lesson } from '@/theory/types'

/** Book 1.4: accidentals, the sharp and the flat. */
export default {
  id: 'sharps-flats',
  title: { vi: 'Dấu thăng và dấu giáng', en: 'Sharps and flats' },
  minutes: 3,
  sources: [{ section: '1.4', url: 'https://musictheory.pugetsound.edu/mt21c/Accidentals.html' }],
  practice: { drill: 'note-id', level: 1, durationSec: 60, accidentals: true },
  recap: [
    { vi: 'Dấu hóa đặt trước nốt để nâng hoặc hạ nốt đó', en: 'An accidental, placed before a note, raises or lowers it' },
    { vi: 'Dấu thăng nâng lên nửa cung: phím sát bên phải', en: 'A sharp raises a half step: the very next key to the right' },
    { vi: 'Dấu giáng hạ xuống nửa cung: phím sát bên trái', en: 'A flat lowers a half step: the very next key to the left' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Dấu hóa và dấu thăng', en: 'Accidentals and the sharp' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dấu hóa** (accidental) là ký hiệu đặt trước nốt để nâng cao hoặc hạ thấp nốt đó. **Dấu thăng** (sharp) nâng nốt lên **nửa cung** (half step), tức sang phím sát bên phải, dù là phím trắng hay phím đen.',
            en: 'An **accidental** is a sign placed before a note to raise or lower it. A **sharp** raises a note a **half step**: to the very next key to the right, white or black.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4 G#4', labels: 'names', highlight: [1] },
        { type: 'play', notes: 'G4 G#4', label: { vi: 'Nghe {G} rồi {G#}', en: 'Hear {G}, then {G#}' } },
        { type: 'keys', notes: 'G4 G#4', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F#4' }],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Khe 1 là {F4}, và dấu thăng nâng nó lên phím đen sát bên phải: {F#4}.',
        en: 'Space 1 is {F4}, and the sharp raises it to the black key just to its right: {F#4}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dấu giáng', en: 'The flat' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dấu giáng** (flat) hạ nốt xuống nửa cung, tức sang phím sát bên trái. Dấu hóa luôn viết ngay trước nốt, trên cùng dòng kẻ hoặc khe với nốt.',
            en: 'A **flat** lowers a note a half step: to the very next key to the left. An accidental is always written just before the note, on the same line or space.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'Gb4 G4 G#4', labels: 'names', highlight: [0] },
        { type: 'play', notes: 'Gb4 G4 G#4', label: { vi: 'Nghe {Gb}, {G}, {G#}', en: 'Hear {Gb}, {G}, {G#}' } },
        { type: 'keys', notes: 'Gb4 G4 G#4', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Bb4' }],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Dòng 3 là {B4}, và dấu giáng hạ nó xuống phím đen sát bên trái: {Bb4}.',
        en: 'Line 3 is {B4}, and the flat lowers it to the black key just to its left: {Bb4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bấm phím {Ab}.', en: 'Tap {Ab}.' },
      answer: { type: 'key', note: 'Ab', labels: false },
      reason: {
        vi: '{Ab} thấp hơn {A} nửa cung, nên nó là phím đen sát bên trái {A}.',
        en: '{Ab} is a half step below {A}, so it is the black key just left of {A}.',
      },
    },
  ],
} satisfies Lesson
