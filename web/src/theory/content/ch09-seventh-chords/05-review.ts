import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (8.4) on 8.1-8.3. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 9', en: 'Chapter 9 review' },
  minutes: 3,
  sources: [{ section: '8.4', url: 'https://musictheory.pugetsound.edu/mt21c/SeventhChordsExercises.html' }],
  recap: [
    { vi: 'Năm loại hợp âm bảy và ký hiệu của chúng', en: 'The five seventh chords and their symbols' },
    { vi: 'Bậc La Mã của hợp âm bảy trong giọng trưởng và thứ', en: 'Roman numerals of seventh chords in major and minor' },
    { vi: 'Hợp âm IV/5 thay cho V7', en: 'The IV/5 chord in place of V7' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này là loại nào?', en: 'Which type is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+F#4+A4+C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bảy trưởng (maj7)', en: 'Major seventh (maj7)' } },
          { text: { vi: 'Bảy át (7)', en: 'Dominant seventh (7)' }, correct: true },
          { text: { vi: 'Bảy thứ (m7)', en: 'Minor seventh (m7)' } },
        ],
      },
      reason: {
        vi: '{D} {F#} {A} là hợp âm ba trưởng, và từ {D} lên {C} là quãng 7 thứ.',
        en: '{D} {F#} {A} is a major triad, and {D} up to {C} is a minor 7th.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng Re trưởng, hợp âm này mang bậc La Mã nào?', en: 'In D major, which Roman numeral is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'D', notes: 'G4+B4+D5+F#5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV7', en: 'IV7' } },
          { text: { vi: 'IVM7', en: 'IVM7' }, correct: true },
          { text: { vi: 'iv7', en: 'iv7' } },
        ],
      },
      reason: {
        vi: '{G} là bậc 4 của giọng Re trưởng; {G} {B} {D} là hợp âm ba trưởng và {G} lên {F#} là quãng 7 trưởng.',
        en: '{G} is degree 4 of D major; {G} {B} {D} is major and {G} up to {F#} is a major 7th.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bảy của hợp âm này là nốt nào?', en: 'Which note is the seventh of this chord?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'B2+D3+F#3+A3' }],
      answer: { type: 'key', note: 'A' },
      reason: {
        vi: 'Đếm lên từ nốt gốc {B}: {D} là nốt ba, {F#} là nốt năm, {A} là nốt bảy.',
        en: 'Count up from the root {B}: {D} is the third, {F#} the fifth, {A} the seventh.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là V7 trong giọng Do thứ. Nốt nào là cảm âm được nâng lên?', en: 'This is V7 in C minor. Which note is the raised leading tone?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Cm', notes: 'G4+Bn4+D5+F5' }],
      answer: { type: 'key', note: 'B' },
      reason: {
        vi: 'Gam thứ hòa âm nâng {Bb} lên {Bn}, để V7 có hợp âm ba trưởng {G} {B} {D}.',
        en: 'The harmonic minor raises {Bb} to {Bn}, so V7 has the major triad {G} {B} {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm bảy giảm (°7) xếp những quãng 3 nào?', en: 'Which thirds stack up a fully-diminished seventh (°7)?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ba quãng 3 thứ', en: 'Three minor thirds' }, correct: true },
          { text: { vi: 'Thứ, thứ, trưởng', en: 'Minor, minor, major' } },
          { text: { vi: 'Thứ, trưởng, thứ', en: 'Minor, major, minor' } },
        ],
      },
      reason: {
        vi: 'Thứ, thứ, trưởng là ø7 và thứ, trưởng, thứ là m7; °7 gồm ba quãng 3 thứ.',
        en: 'Minor, minor, major is ø7 and minor, major, minor is m7; °7 is three minor thirds.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng trưởng, hợp âm bảy trên bậc vii là gì?', en: 'In a major key, which seventh chord forms on vii?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'viiø7', en: 'viiø7' }, correct: true },
          { text: { vi: 'vii°7', en: 'vii°7' } },
          { text: { vi: 'vii7', en: 'vii7' } },
        ],
      },
      reason: {
        vi: 'Trong giọng trưởng, nốt bảy của nó cách nốt gốc quãng 7 thứ, nên là nửa giảm; vii°7 thuộc giọng thứ.',
        en: 'In major its seventh is a minor 7th above the root, so it is half-diminished; vii°7 belongs to minor.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng Fa trưởng, IV/5 là hợp âm nào?', en: 'In F major, which chord is IV/5?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C}/{Bb}', en: '{C}/{Bb}' } },
          { text: { vi: '{Bb}/{C}', en: '{Bb}/{C}' }, correct: true },
          { text: { vi: '{F}/{C}', en: '{F}/{C}' } },
        ],
      },
      reason: {
        vi: 'Hợp âm IV của giọng Fa trưởng là {Bb}, và bậc 5 là {C}, nên IV/5 là {Bb}/{C}.',
        en: 'The IV chord of F major is {Bb} and degree 5 is {C}, so IV/5 is {Bb}/{C}.',
      },
    },
  ],
} satisfies Lesson
