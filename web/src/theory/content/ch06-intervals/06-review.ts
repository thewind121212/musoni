import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (5.6) on 5.1-5.5. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 6', en: 'Chapter 6 review' },
  minutes: 4,
  sources: [{ section: '5.6', url: 'https://musictheory.pugetsound.edu/mt21c/IntervalsPracticeExercises.html' }],
  practice: { drill: 'intervals', level: 4, durationSec: 120 },
  recap: [
    { vi: 'Cỡ quãng và quãng hòa âm, quãng giai điệu', en: 'Numeric size, harmonic and melodic intervals' },
    { vi: 'Quãng đúng, trưởng, thứ, tăng, giảm', en: 'Perfect, major, minor, augmented, diminished' },
    { vi: 'Tìm nốt phía trên, phía dưới, và đảo quãng', en: 'Finding the note above or below, and inversion' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Nghe: đây là quãng giai điệu hay quãng hòa âm?', en: 'Listen: is this a melodic or a harmonic interval?' },
      blocks: [{ type: 'play', notes: 'A3+E4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng giai điệu', en: 'Melodic' } },
          { text: { vi: 'Quãng hòa âm', en: 'Harmonic' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai nốt vang cùng lúc, nên đó là quãng hòa âm.',
        en: 'The two notes sound together, so it is a harmonic interval.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng mấy?', en: 'What size is this interval?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4 E5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5', en: '5th' } },
          { text: { vi: 'Quãng 6', en: '6th' }, correct: true },
          { text: { vi: 'Quãng 7', en: '7th' } },
        ],
      },
      reason: {
        vi: 'Từ dòng kẻ lên khe nên cỡ là số chẵn, và {G} {A} {B} {C} {D} {E} là sáu tên nốt.',
        en: 'Line to space means an even number, and {G} {A} {B} {C} {D} {E} is six letter names.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+B4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6 trưởng', en: 'Major 6th' }, correct: true },
          { text: { vi: 'Quãng 6 thứ', en: 'Minor 6th' } },
          { text: { vi: 'Quãng 7 thứ', en: 'Minor 7th' } },
        ],
      },
      reason: {
        vi: 'Gam {D} trưởng có {B}, nên {D}–{B} là quãng 6 trưởng.',
        en: 'The {D} major scale has {B}, so {D}–{B} is a major 6th.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'Eb3+Bb3' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 4 đúng', en: 'Perfect 4th' } },
          { text: { vi: 'Quãng 5 giảm', en: 'Diminished 5th' } },
          { text: { vi: 'Quãng 5 đúng', en: 'Perfect 5th' }, correct: true },
        ],
      },
      reason: {
        vi: 'Che hai dấu giáng thì {E}–{B} là quãng 5 đúng, và hạ cả hai nốt nửa cung không đổi quãng.',
        en: 'Cover both flats and {E}–{B} is a perfect 5th, and lowering both notes a half step leaves it the same.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F4+B4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 4 đúng', en: 'Perfect 4th' } },
          { text: { vi: 'Quãng 4 tăng', en: 'Augmented 4th' }, correct: true },
          { text: { vi: 'Quãng 5 giảm', en: 'Diminished 5th' } },
        ],
      },
      reason: {
        vi: '{F} lên {B} có 6 nửa cung và là quãng 4, nên đó là quãng 4 tăng, một quãng ba cung.',
        en: '{F} up to {B} spans 6 half steps and is a 4th, so it is an augmented 4th, a tritone.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào cao hơn {G4} một quãng 3 thứ?', en: 'Which note is a minor 3rd above {G4}?' },
      blocks: [{ type: 'keys', notes: 'G4' }],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Gam {G} trưởng có {B}, hạ xuống nửa cung được quãng 3 thứ {Bb}.',
        en: 'The {G} major scale has {B}, and a half step lower gives the minor 3rd, {Bb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào thấp hơn {D5} một quãng 6 thứ?', en: 'Which note is a minor 6th below {D5}?' },
      blocks: [{ type: 'keys', notes: 'D5', from: 'C4', octaves: 2 }],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Quãng 6 thứ đảo thành quãng 3 trưởng, mà trên {D} là {F#}, nên nốt phía dưới là {F#4}.',
        en: 'A minor 6th inverts to a major 3rd, which above {D} is {F#}, so the note below is {F#4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng 7 thứ đảo lại thành quãng gì?', en: 'A minor 7th inverts to what?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 2 thứ', en: 'Minor 2nd' } },
          { text: { vi: 'Quãng 2 trưởng', en: 'Major 2nd' }, correct: true },
          { text: { vi: 'Quãng 3 trưởng', en: 'Major 3rd' } },
        ],
      },
      reason: {
        vi: '7 cộng 2 bằng 9, và thứ đảo thành trưởng, nên đó là quãng 2 trưởng.',
        en: '7 plus 2 is 9, and minor inverts to major, so it is a major 2nd.',
      },
    },
  ],
} satisfies Lesson
