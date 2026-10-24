import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (31.12) on 31.1-31.11. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 32', en: 'Chapter 32 review' },
  minutes: 4,
  sources: [{ section: '31.12', url: 'https://musictheory.pugetsound.edu/mt21c/JazzExercises.html' }],
  recap: [
    { vi: 'Viết và gọi tên hợp âm chín, 11, 13 và hợp âm biến âm', en: 'Writing and naming 9th, 11th, 13th and altered chords' },
    { vi: 'Nốt dẫn hướng và thay thế quãng ba cung', en: 'Guide tones and tritone substitution' },
    { vi: 'Gam blues, gam bebop và quan hệ hợp âm–gam', en: 'The blues and bebop scales and chord-scale relationships' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Nốt 13 của F13 là nốt gì?', en: 'What is the 13th of F13?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F4+A4+C5+Eb5', labels: ['F7'] }],
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: 'Nốt 13 là nốt 6 của gam {F} trưởng, tức {D}, cao hơn một quãng tám.',
        en: 'The 13th is degree 6 of the {F} major scale, {D}, an octave higher.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này gọi là gì?', en: 'What is this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4+C5+E5+G5+B5' },
        { type: 'play', notes: 'A3+C4+E4+G4+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Am9', en: 'Am9' }, correct: true },
          { text: { vi: 'Amaj9', en: 'Amaj9' } },
          { text: { vi: 'A9', en: 'A9' } },
        ],
      },
      reason: {
        vi: 'Nốt ba thứ {C}, nốt bảy thứ {G}, thêm nốt chín {B}: Am9.',
        en: 'A minor 3rd, {C}, a minor 7th, {G}, and a 9th, {B}: Am9.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt ♭9 của D7(♭9) là nốt gì?', en: 'What is the ♭9 of D7(♭9)?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+F#4+A4+C5', labels: ['D7'] }],
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Nốt chín của D7 là {E}; hạ nửa cung thành {Eb}.',
        en: 'The 9th of D7 is {E}; lowered a half step it is {Eb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm {C} {F} {G} {Bb} {D} gọi là gì?', en: 'What is the chord {C} {F} {G} {Bb} {D}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+F4+G4+Bb4+D5' },
        { type: 'play', notes: 'C4+F4+G4+Bb4+D5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C11', en: 'C11' } },
          { text: { vi: 'C9sus', en: 'C9sus' }, correct: true },
          { text: { vi: 'Cadd9', en: 'Cadd9' } },
        ],
      },
      reason: {
        vi: 'Không có nốt ba {E}, nên {F} là sus; có nốt bảy {Bb} và nốt chín {D}: C9sus.',
        en: 'There is no 3rd, {E}, so the {F} is the sus; with the 7th, {Bb}, and the 9th, {D}, it is C9sus.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt dẫn hướng của B♭7 là những nốt nào?', en: 'What are the guide tones of B♭7?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F} và {Ab}', en: '{F} and {Ab}' } },
          { text: { vi: '{D} và {F}', en: '{D} and {F}' } },
          { text: { vi: '{D} và {Ab}', en: '{D} and {Ab}' }, correct: true },
        ],
      },
      reason: {
        vi: 'B♭7 là {Bb} {D} {F} {Ab}: nốt ba là {D}, nốt bảy là {Ab}.',
        en: 'B♭7 is {Bb} {D} {F} {Ab}: the 3rd is {D} and the 7th is {Ab}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm bảy át nào thay thế quãng ba cung cho C7? Chọn nốt gốc.', en: 'Which dominant seventh is the tritone substitute for C7? Pick its root.' },
      answer: { type: 'key', note: 'Gb' },
      reason: {
        vi: 'Cách {C} một quãng ba cung là {Gb}; G♭7 có chung nốt dẫn hướng {E}/{Fb} và {Bb} với C7.',
        en: 'A tritone from {C} is {Gb}; G♭7 shares the guide tones {E}/{Fb} and {Bb} with C7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là gam gì?', en: 'Which scale is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4 Bb4 C5 Db5 D5 F5 G5' },
        { type: 'play', notes: 'G4 Bb4 C5 Db5 D5 F5 G5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Gam blues {G}', en: '{G} blues scale' }, correct: true },
          { text: { vi: 'Gam bebop át {G}', en: '{G} bebop dominant' } },
          { text: { vi: 'Gam ngũ cung thứ {G}', en: '{G} minor pentatonic' } },
        ],
      },
      reason: {
        vi: '1–♭3–4–♭5–5–♭7 là gam blues: gam ngũ cung thứ thêm nốt ♭5 ({Db}).',
        en: '1–♭3–4–♭5–5–♭7 is the blues scale: the minor pentatonic plus the ♭5, {Db}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Gam nào hợp với Fmaj7(♯11)?', en: 'Which scale fits Fmaj7(♯11)?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F4+A4+C5+E5+G5+B5' },
        { type: 'play', notes: 'F3+A3+C4+E4+G4+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F} trưởng', en: '{F} major' } },
          { text: { vi: '{F} Mixolydian', en: '{F} Mixolydian' } },
          { text: { vi: '{F} Lydian', en: '{F} Lydian' }, correct: true },
        ],
      },
      reason: {
        vi: 'Các nốt {F} {A} {C} {E} {G} {B}, lấp thêm {D}, cho {F} {G} {A} {B} {C} {D} {E}: gam {F} Lydian.',
        en: 'The notes {F} {A} {C} {E} {G} {B}, filled in with {D}, give {F} {G} {A} {B} {C} {D} {E}: {F} Lydian.',
      },
    },
  ],
} satisfies Lesson
