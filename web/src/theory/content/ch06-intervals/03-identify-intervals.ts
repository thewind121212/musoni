import type { Lesson } from '@/theory/types'

/** Book 5.2: two ways to name perfect, major and minor intervals. */
export default {
  id: 'identify-intervals',
  title: { vi: 'Nhận ra quãng', en: 'Identifying intervals' },
  minutes: 5,
  sources: [{ section: '5.2', url: 'https://musictheory.pugetsound.edu/mt21c/HowToIdentifyIntervals.html' }],
  practice: { drill: 'intervals', level: 3, durationSec: 60 },
  recap: [
    { vi: 'Coi nốt dưới là chủ âm: nốt trên thuộc gam trưởng thì quãng trưởng hoặc đúng', en: 'Lower note as tonic: an upper note in its major scale makes a major or perfect interval' },
    { vi: 'Thấp hơn nốt của gam nửa cung: quãng thứ', en: 'A half step below the scale note: minor' },
    { vi: 'Nốt dưới có dấu hóa: che đi, tìm quãng, rồi tính lại', en: 'An accidental on the lower note: cover it, find the interval, then put it back' },
    { vi: 'Hoặc đếm nửa cung: 4 là quãng 3 trưởng, 7 là quãng 5 đúng', en: 'Or count half steps: 4 is a major 3rd, 7 a perfect 5th' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt dưới là chủ âm', en: 'The lower note as tonic' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Coi nốt dưới là **chủ âm** (tonic) của một gam trưởng. Nếu nốt trên thuộc gam đó, quãng là trưởng hoặc đúng. Nếu nốt trên thấp hơn nốt của gam nửa cung ở quãng 2, 3, 6 hay 7, quãng là thứ.',
            en: 'Think of the lower note as the **tonic** of a major scale. If the upper note is in that scale, the interval is major or perfect. If it is a half step below the scale note on a 2nd, 3rd, 6th or 7th, the interval is minor.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Gam {E} trưởng có {G#}, nên {E}–{G#} là quãng 3 trưởng và {E}–{G} là quãng 3 thứ.',
            en: 'The {E} major scale has {G#}, so {E}–{G#} is a major 3rd and {E}–{G} is a minor 3rd.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G#4 E4+G4', labels: ['3', '3'], highlight: [1] },
        { type: 'play', notes: 'E4+G#4 E4+G4', label: { vi: 'Nghe trưởng rồi thứ', en: 'Hear major, then minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4+F5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6 trưởng', en: 'Major 6th' } },
          { text: { vi: 'Quãng 6 thứ', en: 'Minor 6th' }, correct: true },
          { text: { vi: 'Quãng 5 đúng', en: 'Perfect 5th' } },
        ],
      },
      reason: {
        vi: 'Gam {A} trưởng có {F#}, và {F} thấp hơn nửa cung nên đó là quãng 6 thứ.',
        en: 'The {A} major scale has {F#}, and {F} is a half step lower, so it is a minor 6th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt dưới có dấu hóa', en: 'An accidental on the lower note' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu nốt dưới mang **dấu hóa** (accidental), hãy tạm che nó đi, tìm quãng, rồi tính lại dấu hóa. Ví dụ {Eb}–{G}: {E}–{G} là quãng 3 thứ. Hạ nốt dưới làm quãng rộng thêm nửa cung, nên {Eb}–{G} là quãng 3 trưởng.',
            en: 'If the lower note has an **accidental**, cover it up, find the interval, then put the accidental back. Take {Eb}–{G}: {E}–{G} is a minor 3rd. Lowering the bottom note widens it by a half step, so {Eb}–{G} is a major 3rd.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4 Eb4+G4', labels: ['3', '3'], highlight: [1] },
        { type: 'play', notes: 'E4+G4 Eb4+G4', label: { vi: 'Nghe thứ rồi trưởng', en: 'Hear minor, then major' } },
        { type: 'keys', notes: 'Eb4 G4', caption: { vi: '{Eb} lên {G}:', en: '{Eb} up to {G}:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F#4+D5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6 trưởng', en: 'Major 6th' } },
          { text: { vi: 'Quãng 6 thứ', en: 'Minor 6th' }, correct: true },
          { text: { vi: 'Quãng 7 thứ', en: 'Minor 7th' } },
        ],
      },
      reason: {
        vi: 'Che dấu thăng thì {F}–{D} là quãng 6 trưởng, và nâng nốt dưới làm quãng hẹp lại nửa cung thành quãng 6 thứ.',
        en: 'Cover the sharp and {F}–{D} is a major 6th, and raising the bottom note narrows it by a half step to a minor 6th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đếm nửa cung', en: 'Counting half steps' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cách thứ hai là nhớ mỗi quãng có bao nhiêu nửa cung. Quãng 2 thứ có 1, quãng 2 trưởng 2, quãng 3 thứ 3, quãng 3 trưởng 4, quãng 4 đúng 5, quãng 5 đúng 7.',
            en: 'The second method is to memorize how many half steps each interval holds. m2 has 1, M2 2, m3 3, M3 4, P4 5, P5 7.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Quãng 6 thứ có 8, quãng 6 trưởng 9, quãng 7 thứ 10, quãng 7 trưởng 11, quãng 8 đúng 12. Quãng có 6 nửa cung là **quãng ba cung** (tritone), sẽ học ở cuối chương.',
            en: 'm6 has 8, M6 9, m7 10, M7 11, P8 12. An interval of 6 half steps is a **tritone**, which comes at the end of the chapter.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+G4', labels: ['5'] },
        { type: 'keys', notes: 'C4 G4', caption: { vi: '{C} lên {G}: 7 nửa cung', en: '{C} up to {G}: 7 half steps' } },
        { type: 'play', notes: 'C4 G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đếm nửa cung: đây là quãng gì?', en: 'Count the half steps: what interval is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4+C5' },
        { type: 'keys', notes: 'D4 C5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 7 thứ', en: 'Minor 7th' }, correct: true },
          { text: { vi: 'Quãng 7 trưởng', en: 'Major 7th' } },
          { text: { vi: 'Quãng 6 trưởng', en: 'Major 6th' } },
        ],
      },
      reason: {
        vi: 'Từ {D} lên {C} có 10 nửa cung, đó là quãng 7 thứ.',
        en: 'From {D} up to {C} is 10 half steps, which is a minor 7th.',
      },
    },
  ],
} satisfies Lesson
