import type { Lesson } from '@/theory/types'

/**
 * Book 1.4: the double sharp, the double flat and the natural. No practice
 * link: Đọc nốt never shows a double sharp, double flat or natural sign.
 */
export default {
  id: 'doubles-naturals',
  title: { vi: 'Thăng kép, giáng kép, dấu bình', en: 'Double sharps, double flats, naturals' },
  minutes: 4,
  sources: [{ section: '1.4', url: 'https://musictheory.pugetsound.edu/mt21c/Accidentals.html' }],
  recap: [
    { vi: 'Thăng kép nâng nốt lên hai nửa cung', en: 'A double sharp raises a note two half steps' },
    { vi: 'Giáng kép hạ nốt xuống hai nửa cung', en: 'A double flat lowers a note two half steps' },
    { vi: 'Dấu bình xóa dấu hóa có trước đó trong ô nhịp', en: 'A natural cancels an earlier accidental in the measure' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Thăng kép', en: 'The double sharp' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Thăng kép** (double sharp) nâng nốt lên hai nửa cung, tức hai phím sang phải. Vì vậy {F##4} rơi vào cùng phím với {G4}.',
            en: 'A **double sharp** raises a note two half steps: two keys to the right. So {F##4} lands on the same key as {G4}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4 F##4', labels: 'names', highlight: [1] },
        { type: 'play', notes: 'F4 F#4 F##4', label: { vi: 'Nghe từng nửa cung', en: 'Hear each half step' } },
        { type: 'keys', notes: 'F4 F##4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này nằm trên phím nào?', en: 'Which key is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C##5' }],
      answer: { type: 'key', note: 'D' },
      reason: {
        vi: 'Hai nửa cung trên {C} là {C#} rồi đến {D}, nên {C##5} nằm trên phím {D5}.',
        en: 'Two half steps above {C} are {C#}, then {D}, so {C##5} is the key {D5}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giáng kép', en: 'The double flat' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Giáng kép** (double flat) hạ nốt xuống hai nửa cung, tức hai phím sang trái. Vì vậy {Bbb4} rơi vào cùng phím với {A4}.',
            en: 'A **double flat** lowers a note two half steps: two keys to the left. So {Bbb4} lands on the same key as {A4}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B4 Bbb4', labels: 'names', highlight: [1] },
        { type: 'play', notes: 'B4 Bb4 Bbb4', label: { vi: 'Nghe từng nửa cung', en: 'Hear each half step' } },
        { type: 'keys', notes: 'B4 Bbb4' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Dấu bình', en: 'The natural' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dấu hóa giữ hiệu lực đến hết **ô nhịp** (measure). **Dấu bình** (natural) xóa dấu hóa có trước đó, đưa nốt về lại tên gốc của nó.',
            en: 'An accidental lasts until the end of the **measure**. A **natural** cancels an earlier accidental and returns the note to its plain letter name.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'F#4:q G4:q Fn4:h', labels: ['{F#}', '{G}', '{Fn}'], highlight: [2] },
        { type: 'play', notes: 'F#4:q G4:q Fn4:h' },
        {
          type: 'tip',
          text: {
            vi: 'Dấu bình cũng xóa dấu thăng, dấu giáng của **hóa biểu** (key signature), phần sẽ học ở chương sau.',
            en: 'A natural also cancels a sharp or flat in the **key signature**, which comes in a later chapter.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt cuối là nốt gì?', en: 'What is the last note?' },
      blocks: [{ type: 'staff', clef: 'treble', time: '4/4', notes: 'C#5:q D5:q Cn5:h' }],
      answer: { type: 'key', note: 'C' },
      reason: {
        vi: 'Dấu bình xóa dấu thăng trước đó trong ô nhịp, nên nốt cuối là {C}.',
        en: 'The natural cancels the earlier sharp in the measure, so the last note is {C}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dấu nào hạ nốt xuống hai nửa cung?', en: 'Which sign lowers a note two half steps?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Thăng kép', en: 'Double sharp' } },
          { text: { vi: 'Giáng kép', en: 'Double flat' }, correct: true },
          { text: { vi: 'Dấu bình', en: 'Natural' } },
        ],
      },
      reason: {
        vi: 'Giáng kép hạ nốt hai nửa cung, còn thăng kép thì nâng lên hai nửa cung.',
        en: 'A double flat lowers a note two half steps, while a double sharp raises it two.',
      },
    },
  ],
} satisfies Lesson
