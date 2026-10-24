import type { Lesson } from '@/theory/types'

/** Book 3.1: the harmonic minor and the melodic minor (up and down), against the major scale. */
export default {
  id: 'harmonic-melodic',
  title: { vi: 'Gam thứ hòa âm và giai điệu', en: 'Harmonic and melodic minor' },
  minutes: 4,
  sources: [{ section: '3.1', url: 'https://musictheory.pugetsound.edu/mt21c/MinorScales.html' }],
  recap: [
    { vi: 'Gam thứ hòa âm: gam thứ tự nhiên với bậc 7 nâng lên', en: 'Harmonic minor: the natural minor with a raised 7th' },
    { vi: 'Gam thứ giai điệu đi lên nâng bậc 6 và 7', en: 'Melodic minor raises the 6th and 7th going up' },
    { vi: 'Đi xuống, gam thứ giai điệu giống gam thứ tự nhiên', en: 'Going down, melodic minor is the natural minor' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Gam thứ hòa âm', en: 'The harmonic minor scale' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gam thứ hòa âm** (harmonic minor) giống gam thứ tự nhiên, nhưng bậc 7 được nâng lên nửa cung. So với gam {C} trưởng, nó chỉ hạ bậc 3 và 6.',
            en: 'The **harmonic minor** scale is the natural minor with its 7th degree raised a half step. Compared with {C} major, it lowers only the 3rd and 6th.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bn4 C5', labels: ['1', '2', '3', '4', '5', '6', '7', '1'], highlight: [6] },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', label: { vi: 'Nghe gam tự nhiên', en: 'Hear natural minor' } },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 B4 C5', label: { vi: 'Nghe gam hòa âm', en: 'Hear harmonic minor' } },
        {
          type: 'tip',
          text: {
            vi: 'Bậc 7 nâng lên chỉ còn cách {C5} nửa cung, nên gam như được kéo về {C}.',
            en: 'The raised 7th is only a half step below {C5}, so the scale pulls toward {C}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong gam {C} thứ hòa âm, bậc 7 là nốt nào?', en: 'In {C} harmonic minor, what is the 7th degree?' },
      answer: { type: 'key', note: 'B' },
      reason: {
        vi: 'Gam thứ tự nhiên có {Bb}; gam thứ hòa âm nâng nó lên nửa cung thành {Bn}.',
        en: 'The natural minor has {Bb}; the harmonic minor raises it a half step to {Bn}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Gam thứ giai điệu', en: 'The melodic minor scale' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gam thứ giai điệu** (melodic minor) có hai chiều. Đi lên, nó nâng cả bậc 6 và 7, nên chỉ khác gam {C} trưởng ở bậc 3.',
            en: 'The **melodic minor** scale has two versions. Going up, it raises both the 6th and the 7th, so it differs from {C} major only in the 3rd.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đi xuống, nó giống hệt gam thứ tự nhiên.',
            en: 'Going down, it is the same as the natural minor.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 Eb4 F4 G4 An4 Bn4 C5', highlight: [5, 6] },
        { type: 'staff', clef: 'treble', notes: 'C5 Bb4 Ab4 G4 F4 Eb4 D4 C4', highlight: [1, 2] },
        {
          type: 'play',
          notes: 'C4 D4 Eb4 F4 G4 A4 B4 C5 Bb4 Ab4 G4 F4 Eb4 D4 C4',
          label: { vi: 'Nghe đi lên rồi đi xuống', en: 'Hear it up and down' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Khi đi lên, gam thứ giai điệu khác gam trưởng cùng nốt đầu ở bậc nào?',
        en: 'Going up, where does the melodic minor differ from the major scale on the same note?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chỉ bậc 3', en: 'Only the 3rd' }, correct: true },
          { text: { vi: 'Bậc 3 và 6', en: 'The 3rd and 6th' } },
          { text: { vi: 'Bậc 3, 6 và 7', en: 'The 3rd, 6th and 7th' } },
        ],
      },
      reason: {
        vi: 'Đi lên, bậc 6 và 7 đã được nâng lại, nên chỉ còn bậc 3 thấp hơn gam trưởng.',
        en: 'Going up, the 6th and 7th are raised back, so only the 3rd is lower than in major.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'So sánh ba gam thứ', en: 'The three minor scales side by side' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'So với gam trưởng cùng nốt đầu: gam thứ tự nhiên hạ bậc 3, 6 và 7; gam thứ hòa âm hạ bậc 3 và 6; gam thứ giai điệu đi lên chỉ hạ bậc 3.',
            en: 'Against the major scale on the same note: the natural minor lowers the 3rd, 6th and 7th; the harmonic minor lowers the 3rd and 6th; the melodic minor, going up, lowers only the 3rd.',
          },
        },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', label: { vi: 'Tự nhiên', en: 'Natural' } },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 B4 C5', label: { vi: 'Hòa âm', en: 'Harmonic' } },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 A4 B4 C5', label: { vi: 'Giai điệu', en: 'Melodic' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là gam {A} thứ nào?', en: 'Which {A} minor scale is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4 B4 C5 D5 E5 F#5 G#5 A5' },
        { type: 'play', notes: 'A4 B4 C5 D5 E5 F#5 G#5 A5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tự nhiên', en: 'Natural' } },
          { text: { vi: 'Hòa âm', en: 'Harmonic' } },
          { text: { vi: 'Giai điệu (đi lên)', en: 'Melodic (ascending)' }, correct: true },
        ],
      },
      reason: {
        vi: '{A} thứ tự nhiên có {F} và {G}; ở đây cả hai được nâng thành {F#} và {G#}, đúng gam thứ giai điệu đi lên.',
        en: '{A} natural minor has {F} and {G}; here both are raised to {F#} and {G#}, the ascending melodic minor.',
      },
    },
  ],
} satisfies Lesson
