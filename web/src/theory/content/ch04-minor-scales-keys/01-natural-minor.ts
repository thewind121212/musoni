import type { Lesson } from '@/theory/types'

/** Book 3.1: the three minor scales, then the natural minor against the major scale. */
export default {
  id: 'natural-minor',
  title: { vi: 'Gam thứ tự nhiên', en: 'The natural minor scale' },
  minutes: 4,
  sources: [{ section: '3.1', url: 'https://musictheory.pugetsound.edu/mt21c/MinorScales.html' }],
  recap: [
    { vi: 'Có ba gam thứ: tự nhiên, hòa âm và giai điệu', en: 'There are three minor scales: natural, harmonic and melodic' },
    { vi: 'Gam thứ tự nhiên hạ bậc 3, 6 và 7 của gam trưởng', en: 'The natural minor lowers degrees 3, 6 and 7 of the major scale' },
    { vi: 'Gam {A} thứ tự nhiên chỉ dùng phím trắng', en: 'A natural minor uses only white keys' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ba loại gam thứ', en: 'Three minor scales' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Có ba loại **gam thứ** (minor scale): **gam thứ tự nhiên** (natural minor), **gam thứ hòa âm** (harmonic minor) và **gam thứ giai điệu** (melodic minor). Bài này bắt đầu với gam thứ tự nhiên.',
            en: 'There are three **minor scales**: the **natural minor**, the **harmonic minor** and the **melodic minor** scale. This lesson starts with the natural minor.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'So với gam {C} trưởng, gam {C} thứ tự nhiên hạ ba **bậc** (scale degrees) xuống nửa cung: bậc 3, 6 và 7. {E} thành {Eb}, {A} thành {Ab}, {B} thành {Bb}.',
            en: 'Compared with {C} major, {C} natural minor lowers three **scale degrees** by a half step: the 3rd, 6th and 7th. {E} becomes {Eb}, {A} becomes {Ab}, {B} becomes {Bb}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', labels: ['1', '2', '3', '4', '5', '6', '7', '1'], highlight: [2, 5, 6] },
        { type: 'play', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', label: { vi: 'Nghe {C} trưởng', en: 'Hear {C} major' } },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', label: { vi: 'Nghe {C} thứ tự nhiên', en: 'Hear {C} natural minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Gam thứ tự nhiên hạ những bậc nào của gam trưởng?',
        en: 'Which degrees of the major scale does the natural minor lower?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bậc 3 và 6', en: 'The 3rd and 6th' } },
          { text: { vi: 'Bậc 3, 6 và 7', en: 'The 3rd, 6th and 7th' }, correct: true },
          { text: { vi: 'Chỉ bậc 3', en: 'Only the 3rd' } },
        ],
      },
      reason: {
        vi: 'Gam thứ tự nhiên hạ cả ba bậc 3, 6 và 7 xuống nửa cung.',
        en: 'The natural minor lowers all three: the 3rd, 6th and 7th, each by a half step.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Gam {A} thứ tự nhiên', en: '{A} natural minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Gam {A} thứ tự nhiên chỉ dùng phím trắng, từ {A} lên {A}. Nửa cung nằm giữa bậc 2 và 3, và giữa bậc 5 và 6.',
            en: '{A} natural minor uses only the white keys, from {A} up to {A}. Its half steps fall between degrees 2 and 3, and between 5 and 6.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A3 B3 C4 D4 E4 F4 G4 A4', labels: 'names' },
        { type: 'play', notes: 'A3 B3 C4 D4 E4 F4 G4 A4' },
        { type: 'keys', notes: 'A3 B3 C4 D4 E4 F4 G4 A4', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bậc 6 của gam {C} thứ tự nhiên là nốt nào?', en: 'What is the 6th degree of {C} natural minor?' },
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Bậc 6 của {C} trưởng là {A}; gam thứ tự nhiên hạ nó nửa cung thành {Ab}.',
        en: 'The 6th of {C} major is {A}; the natural minor lowers it a half step to {Ab}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Từ gam trưởng sang gam thứ', en: 'From major to minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Muốn viết gam thứ tự nhiên trên một nốt, hãy viết gam trưởng trên nốt đó rồi hạ bậc 3, 6 và 7. Gam {D} trưởng có {F#}, {B} và {C#}, nên gam {D} thứ tự nhiên có {Fn}, {Bb} và {Cn}.',
            en: 'To write a natural minor scale on a note, write the major scale on that note, then lower degrees 3, 6 and 7. {D} major has {F#}, {B} and {C#}, so {D} natural minor has {Fn}, {Bb} and {Cn}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4 E4 Fn4 G4 A4 Bb4 Cn5 D5', labels: ['1', '2', '3', '4', '5', '6', '7', '1'], highlight: [2, 5, 6] },
        { type: 'play', notes: 'D4 E4 F#4 G4 A4 B4 C#5 D5', label: { vi: 'Nghe {D} trưởng', en: 'Hear {D} major' } },
        { type: 'play', notes: 'D4 E4 F4 G4 A4 Bb4 C5 D5', label: { vi: 'Nghe {D} thứ tự nhiên', en: 'Hear {D} natural minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bậc 3 của gam {G} thứ tự nhiên là nốt nào?', en: 'What is the 3rd degree of {G} natural minor?' },
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Bậc 3 của {G} trưởng là {B}; hạ nửa cung thành {Bb}.',
        en: 'The 3rd of {G} major is {B}; lowered a half step it is {Bb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là gam {F} trưởng hay gam {F} thứ tự nhiên?', en: 'Is this {F} major or {F} natural minor?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F4 G4 Ab4 Bb4 C5 Db5 Eb5 F5' },
        { type: 'play', notes: 'F4 G4 Ab4 Bb4 C5 Db5 Eb5 F5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F} trưởng', en: '{F} major' } },
          { text: { vi: '{F} thứ tự nhiên', en: '{F} natural minor' }, correct: true },
        ],
      },
      reason: {
        vi: '{F} trưởng có {A}, {D} và {E}; ở đây cả ba đều hạ thành {Ab}, {Db} và {Eb}.',
        en: '{F} major has {A}, {D} and {E}; here all three are lowered to {Ab}, {Db} and {Eb}.',
      },
    },
  ],
} satisfies Lesson
