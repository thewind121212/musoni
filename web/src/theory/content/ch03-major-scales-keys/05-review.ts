import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (2.4) on 2.2-2.3. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 3', en: 'Chapter 3 review' },
  minutes: 4,
  sources: [{ section: '2.4', url: 'https://musictheory.pugetsound.edu/mt21c/MajorKeysPracticeExercises.html' }],
  practice: { drill: 'key-sig', level: 3, durationSec: 120 },
  recap: [
    { vi: 'Mẫu cung của gam trưởng', en: 'The major scale pattern' },
    { vi: 'Thứ tự dấu thăng và dấu giáng', en: 'The order of sharps and flats' },
    { vi: 'Vòng quãng năm và cách nhận ra giọng', en: 'The circle of fifths and naming a key' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Mẫu cung nào là của gam trưởng?', en: 'Which pattern makes a major scale?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nguyên, nửa, nguyên, nguyên, nửa, nguyên, nguyên', en: 'W–H–W–W–H–W–W' } },
          { text: { vi: 'Nguyên, nguyên, nửa, nguyên, nguyên, nguyên, nửa', en: 'W–W–H–W–W–W–H' }, correct: true },
          { text: { vi: 'Nguyên, nguyên, nguyên, nửa, nguyên, nguyên, nửa', en: 'W–W–W–H–W–W–H' } },
        ],
      },
      reason: {
        vi: 'Gam trưởng là hai tứ âm nguyên, nguyên, nửa, nối nhau bằng một nguyên cung.',
        en: 'A major scale is two W–W–H tetrachords joined by a whole step.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt 3 của gam {A} trưởng là nốt gì?', en: 'What is note 3 of the {A} major scale?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4 B4', labels: ['1', '2'] }],
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'Từ {B} đi lên một nguyên cung là {C#}, nên gam {A} trưởng bắt đầu {A} {B} {C#}.',
        en: 'A whole step up from {B} is {C#}, so {A} major begins {A} {B} {C#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt 4 của gam {Db} trưởng là nốt gì?', en: 'What is note 4 of the {Db} major scale?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Db4 Eb4 F4', labels: ['1', '2', '3'] }],
      answer: { type: 'key', note: 'Gb' },
      reason: {
        vi: 'Từ nốt 3 lên nốt 4 là nửa cung, và nửa cung trên {F} là {Gb}.',
        en: 'Note 3 to note 4 is a half step, and a half step above {F} is {Gb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'bass', key: 'Bb', notes: '' }],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Hai dấu giáng {Bb} {Eb}: dấu áp chót là {Bb}.',
        en: 'Two flats, {Bb} {Eb}: the second-to-last is {Bb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'A', notes: '' }],
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Ba dấu thăng, dấu cuối là {G#}: lên nửa cung là {A}.',
        en: 'Three sharps, the last one {G#}: a half step up is {A}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Cb', notes: '' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{Gb} trưởng', en: '{Gb} major' } },
          { text: { vi: '{B} trưởng', en: '{B} major' } },
          { text: { vi: '{Cb} trưởng', en: '{Cb} major' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bảy dấu giáng, dấu áp chót là {Cb}; {B} trưởng nghe giống nhưng viết bằng năm dấu thăng.',
        en: 'Seven flats, the second-to-last is {Cb}; {B} major sounds the same but is written with five sharps.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Có bao nhiêu hóa biểu giọng trưởng?', en: 'How many major key signatures are there?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '12', en: '12' } },
          { text: { vi: '14', en: '14' } },
          { text: { vi: '15', en: '15' }, correct: true },
        ],
      },
      reason: {
        vi: '{C} trưởng không dấu, cộng bảy giọng thăng và bảy giọng giáng là 15.',
        en: '{C} major with none, plus seven with sharps and seven with flats, makes 15.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Theo vòng quãng năm, giọng trưởng nào có bốn dấu thăng?', en: 'On the circle of fifths, which major key has four sharps?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Đi lên từng quãng 5 từ {C}: {G}, {D}, {A}, rồi {E} với bốn dấu thăng.',
        en: 'Up by fifths from {C}: {G}, {D}, {A}, then {E} with four sharps.',
      },
    },
  ],
} satisfies Lesson
