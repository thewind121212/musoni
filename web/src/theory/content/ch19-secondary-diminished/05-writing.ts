import type { Lesson } from '@/theory/types'

/** Book 18.4: writing a secondary diminished chord: the target's root, a minor 2nd below it, build the chord, then invert. */
export default {
  id: 'writing',
  title: { vi: 'Viết hợp âm giảm phụ', en: 'Writing secondary diminished chords' },
  minutes: 4,
  sources: [{ section: '18.4', url: 'https://musictheory.pugetsound.edu/mt21c/WritingSecondaryDiminishedChords.html' }],
  recap: [
    { vi: 'Tìm nốt gốc của hợp âm sau dấu gạch chéo', en: 'Find the root of the chord after the slash' },
    { vi: 'Nốt gốc của vii nằm dưới nó một quãng 2 thứ', en: 'The root of vii is a minor 2nd below it' },
    { vi: 'Dựng hợp âm, thêm dấu hóa mà hóa biểu không có', en: 'Build the chord, adding accidentals the key signature lacks' },
    { vi: 'Đảo theo số: 42 là nốt bảy ở bass', en: 'Invert by the figures: 42 puts the seventh in the bass' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tìm nốt gốc', en: 'Find the root' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Để viết vii°7/ii trong giọng {F} trưởng, trước hết tìm nốt gốc của hợp âm sau dấu gạch chéo. ii của giọng {F} trưởng là {G} {Bb} {D}, nốt gốc {G}.',
            en: 'To write vii°7/ii in {F} major, first find the root of the chord after the slash. ii in {F} major is {G} {Bb} {D}, with root {G}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt gốc của vii°7 nằm dưới nốt đó một quãng 2 thứ: {F#}.',
            en: 'The root of vii°7 is a minor 2nd below it: {F#}.',
          },
        },
        { type: 'keys', notes: 'F#4 G4', labels: 'names', caption: { vi: '{F#} dẫn lên {G}:', en: '{F#} leads up to {G}:' } },
        { type: 'play', notes: 'F#4 G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, nốt gốc của vii°7/vi là nốt nào?', en: 'In {F} major, what is the root of vii°7/vi?' },
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'vi của giọng {F} trưởng là {D} {F} {A}; dưới {D} một quãng 2 thứ là {C#}.',
        en: 'vi in {F} major is {D} {F} {A}; a minor 2nd below {D} is {C#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dựng hợp âm', en: 'Build the chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dựng hợp âm bảy giảm trên {F#}: {F#} {A} {C} {Eb}, ba quãng 3 thứ. Hóa biểu {F} trưởng chỉ có {Bb}, nên phải tự viết dấu thăng cho {F#} và dấu giáng cho {Eb}.',
            en: 'Build a fully-diminished seventh on {F#}: {F#} {A} {C} {Eb}, three minor thirds. The {F} major key signature has only {Bb}, so you write the sharp on {F#} and the flat on {Eb} yourself.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'F', notes: 'F#4+A4+C5+Eb5 G4+Bb4+D5', labels: ['vii°7\n/ii', 'ii'] },
        { type: 'play', notes: 'F#4+A4+C5+Eb5 G4+Bb4+D5', label: { vi: 'Nghe vii°7/ii rồi ii', en: 'Hear vii°7/ii, then ii' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bảy của vii°7/ii trong giọng {F} trưởng là nốt nào?', en: 'What is the seventh of vii°7/ii in {F} major?' },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Xếp quãng 3 thứ từ {F#}: {A}, {C}, rồi {Eb}, một quãng 7 giảm trên {F#}.',
        en: 'Stack minor thirds from {F#}: {A}, {C}, then {Eb}, a diminished 7th above {F#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đảo hợp âm', en: 'Invert it' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cuối cùng, đảo hợp âm theo số. vii°42/ii đặt nốt bảy {Eb} ở bass, các nốt khác xếp lên trên.',
            en: 'Last, invert the chord to match the figures. vii°42/ii puts the seventh, {Eb}, in the bass, with the other notes above it.',
          },
        },
        { type: 'staff', clef: 'bass', key: 'F', notes: 'F#3+A3+C4+Eb4 Eb3+F#3+A3+C4', labels: ['vii°7\n/ii', 'vii°42\n/ii'], highlight: [1] },
        { type: 'play', notes: 'F#3+A3+C4+Eb4 Eb3+F#3+A3+C4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, nốt nào ở bass của viiø43/V?', en: 'In {G} major, which note is in the bass of viiø43/V?' },
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'viiø7/V là {C#} {E} {G} {B}, và 43 đặt nốt năm {G} ở bass.',
        en: 'viiø7/V is {C#} {E} {G} {B}, and 43 puts the fifth, {G}, in the bass.',
      },
    },
  ],
} satisfies Lesson
