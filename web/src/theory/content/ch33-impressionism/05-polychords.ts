import type { Lesson } from '@/theory/types'

/** Book 32.4: polychords, how they are written (a line, not a slash), inversions not specified. */
export default {
  id: 'polychords',
  title: { vi: 'Đa hợp âm', en: 'Polychords' },
  minutes: 3,
  sources: [{ section: '32.4', url: 'https://musictheory.pugetsound.edu/mt21c/polychords.html' }],
  recap: [
    { vi: 'Đa hợp âm: thường là hai hợp âm ba vang cùng lúc', en: 'A polychord is usually two triads sounding at once' },
    { vi: 'Viết hai ký hiệu cách nhau bằng gạch ngang, không phải gạch chéo', en: 'It is written with a horizontal line between the symbols, not a slash' },
    { vi: 'Không cần ghi thế đảo của từng hợp âm', en: 'Each chord’s inversion need not be shown' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hai hợp âm cùng lúc', en: 'Two chords at once' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đa hợp âm** (polychord) thường gồm hai hợp âm ba vang cùng lúc. Nó cũng có thể là hai hợp âm bảy, một hợp âm bảy với một hợp âm ba, hay hơn hai hợp âm, vì "đa" nghĩa là nhiều.',
            en: 'A **polychord** usually consists of two triads sounding at once. It can also be two seventh chords, a seventh chord and a triad, or more than two chords, since "poly" means many.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 D5+F#5+A5 C4+E4+G4+D5+F#5+A5', labels: ['C', 'D', ''], highlight: [2] },
        { type: 'play', notes: 'C4+E4+G4', label: { vi: 'Hợp âm dưới', en: 'Lower chord' } },
        { type: 'play', notes: 'D5+F#5+A5', label: { vi: 'Hợp âm trên', en: 'Upper chord' } },
        { type: 'play', notes: 'C4+E4+G4+D5+F#5+A5', label: { vi: 'Cả hai cùng lúc', en: 'Both at once' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Cách viết', en: 'How it is written' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đa hợp âm viết hợp âm trên ở trên, hợp âm dưới ở dưới, cách nhau bằng một gạch ngang. Gạch chéo dành cho **hợp âm gạch chéo** (slash chord): C/E là hợp âm {C} trưởng với nốt bass {E}.',
            en: 'A polychord puts the upper chord above the lower one, with a horizontal line between them. The slash is for **slash chords**: C/E is a {C} major chord with {E} in the bass.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Không cần ghi thế đảo của từng hợp âm trong đa hợp âm.',
            en: 'It is not necessary to show the inversion of each chord in a polychord.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4+C5', labels: ['C/E'] },
        { type: 'play', notes: 'E4+G4+C5', label: { vi: 'Nghe C/E', en: 'Hear C/E' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu D/C nghĩa là gì?', en: 'What does the symbol D/C mean?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm {D} trưởng với nốt bass {C}', en: 'A {D} major chord with {C} in the bass' }, correct: true },
          { text: { vi: 'Đa hợp âm: {D} trưởng trên {C} trưởng', en: 'A polychord: {D} major over {C} major' } },
        ],
      },
      reason: {
        vi: 'Gạch chéo là hợp âm gạch chéo; đa hợp âm viết bằng gạch ngang.',
        en: 'A slash makes a slash chord; a polychord is written with a horizontal line.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong đa hợp âm này, hợp âm trên có nốt gốc là gì?', en: 'In this polychord, what is the root of the upper chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F4+A4+C5+G5+B5+D6' },
        { type: 'play', notes: 'F4+A4+C5+G5+B5+D6' },
      ],
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Ba nốt trên {G} {B} {D} là hợp âm {G} trưởng, đặt trên {F} trưởng.',
        en: 'The top three notes {G} {B} {D} are a {G} major chord, over {F} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm trên ở thế đảo. Nốt gốc của nó là gì?', en: 'The upper chord is inverted. What is its root?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'E4+G4+C5+F5+Bb5+D6' },
        { type: 'play', notes: 'E4+G4+C5+F5+Bb5+D6' },
      ],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Ba nốt trên {F} {Bb} {D} xếp lại thành {Bb} {D} {F}: hợp âm {Bb} trưởng ở thế đảo 2.',
        en: 'The top notes {F} {Bb} {D} restack as {Bb} {D} {F}: a {Bb} major chord in second inversion.',
      },
    },
  ],
} satisfies Lesson
