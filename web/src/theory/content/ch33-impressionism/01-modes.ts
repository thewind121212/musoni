import type { Lesson } from '@/theory/types'

/** Book 32.1 (first technique): Debussy and Ravel's use of the Dorian, Phrygian and Lydian modes. */
export default {
  id: 'modes',
  title: { vi: 'Điệu thức trong nhạc ấn tượng', en: 'Modes in Impressionism' },
  minutes: 4,
  sources: [{ section: '32.1', url: 'https://musictheory.pugetsound.edu/mt21c/Impressionism.html' }],
  recap: [
    { vi: 'Debussy và Ravel dùng điệu thức thay cho nhạc nhiều nốt hóa', en: 'Debussy and Ravel used modes instead of heavy chromaticism' },
    { vi: 'Dorian: gam thứ tự nhiên với nốt 6 nâng lên', en: 'Dorian: natural minor with a raised 6th' },
    { vi: 'Phrygian: gam thứ tự nhiên với nốt 2 hạ xuống', en: 'Phrygian: natural minor with a lowered 2nd' },
    { vi: 'Lydian: gam trưởng với nốt 4 nâng lên', en: 'Lydian: major with a raised 4th' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Trường phái ấn tượng', en: 'Impressionism' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Trường phái ấn tượng** (Impressionism) gắn với Debussy và Ravel ở Pháp. Chương này xem ba kỹ thuật của họ: điệu thức, nốt mở rộng trong hợp âm và hợp âm song song.',
            en: '**Impressionism** is linked with Debussy and Ravel in France. This chapter looks at three of their techniques: modes, upper extensions in chords, and parallelism.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Thay cho lối viết đầy nốt hóa của Wagner, họ đôi khi viết theo **điệu thức** (mode) nhà thờ. **Điệu thức Dorian** (Dorian mode) là gam thứ tự nhiên với nốt 6 nâng lên nửa cung, như phần đầu Tam tấu piano của Ravel.',
            en: 'Instead of the heavy chromaticism of Wagner, they sometimes wrote in the church **modes**. The **Dorian mode** is natural minor with the 6th raised a half step, as at the start of Ravel’s Piano Trio.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4 E4 F4 G4 A4 B4 C5 D5', labels: ['1', '2', '3', '4', '5', '6', '7', '8'], highlight: [5] },
        { type: 'play', notes: 'D4 E4 F4 G4 A4 B4 C5 D5', label: { vi: 'Nghe Dorian trên {D}', en: 'Hear {D} Dorian' } },
        { type: 'keys', notes: 'D4 E4 F4 G4 A4 B4 C5 D5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Điệu thức Dorian trên {A}: nốt 6 là nốt gì?', en: '{A} Dorian: what is the 6th note?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4 B4 C5 D5 E5', labels: ['1', '2', '3', '4', '5'] },
        { type: 'play', notes: 'A4 B4 C5 D5 E5' },
      ],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Gam {A} thứ tự nhiên có {F}; Dorian nâng nốt 6 lên nửa cung thành {F#}.',
        en: '{A} natural minor has {F}; Dorian raises the 6th a half step to {F#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Điệu thức Phrygian', en: 'The Phrygian mode' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Điệu thức Phrygian** (Phrygian mode) là gam thứ tự nhiên với nốt 2 hạ xuống nửa cung. Tứ tấu đàn dây giọng {G} thứ của Debussy mở đầu bằng Phrygian trên {G}.',
            en: 'The **Phrygian mode** is natural minor with the 2nd lowered a half step. Debussy’s String Quartet in {G} minor opens in {G} Phrygian.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4 Ab4 Bb4 C5 D5 Eb5 F5 G5', labels: ['1', '2', '3', '4', '5', '6', '7', '8'], highlight: [1] },
        { type: 'play', notes: 'G4 Ab4 Bb4 C5 D5 Eb5 F5 G5', label: { vi: 'Nghe Phrygian trên {G}', en: 'Hear {G} Phrygian' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm bậc 5 trong Phrygian', en: 'The chord on 5 in Phrygian' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng {G} thứ, hợp âm bảy trên bậc 5 thường là D7: {D} {F#} {A} {C}. Phrygian không có {F#}, và nốt 2 hạ thành {Ab}, nên hợp âm ấy thành Dø7, **hợp âm bảy nửa giảm** (half-diminished seventh chord).',
            en: 'In {G} minor, the seventh chord on 5 is usually D7: {D} {F#} {A} {C}. Phrygian has no {F#}, and its lowered 2nd is {Ab}, so that chord becomes Dø7, a **half-diminished seventh chord**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+F#4+A4+C5 D4+F4+Ab4+C5', labels: ['D7', 'Dø7'], highlight: [1] },
        { type: 'play', notes: 'D4+F#4+A4+C5', label: { vi: 'Nghe D7', en: 'Hear D7' } },
        { type: 'play', notes: 'D4+F4+Ab4+C5', label: { vi: 'Nghe Dø7', en: 'Hear Dø7' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Điệu thức Phrygian trên {E}: nốt 2 là nốt gì?', en: '{E} Phrygian: what is the 2nd note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E4', labels: ['1'] }],
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Gam {E} thứ tự nhiên có {F#}; Phrygian hạ nốt 2 xuống nửa cung thành {F}.',
        en: '{E} natural minor has {F#}; Phrygian lowers the 2nd a half step to {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Điệu thức Lydian', en: 'The Lydian mode' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Điệu thức Lydian** (Lydian mode) là gam trưởng với nốt 4 nâng lên nửa cung. Bản Danse profane của Debussy mở đầu bằng Lydian, và cuối chương 1 Tam tấu piano, Ravel đặt lại chủ đề vào Lydian.',
            en: 'The **Lydian mode** is major with the 4th raised a half step. Debussy’s Danse profane opens in Lydian, and at the end of his Piano Trio’s first movement Ravel recasts the theme in Lydian.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4 G4 A4 B4 C5 D5 E5 F5', labels: ['1', '2', '3', '4', '5', '6', '7', '8'], highlight: [3] },
        { type: 'play', notes: 'F4 G4 A4 B4 C5 D5 E5 F5', label: { vi: 'Nghe Lydian trên {F}', en: 'Hear {F} Lydian' } },
        { type: 'keys', notes: 'F4 G4 A4 B4 C5 D5 E5 F5', caption: { vi: '{F} trưởng có {Bb}; Lydian dùng {B}:', en: '{F} major has {Bb}; Lydian uses {B}:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Điệu thức Lydian trên {C}: nốt 4 là nốt gì?', en: '{C} Lydian: what is the 4th note?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4', labels: ['1', '2', '3'] },
        { type: 'play', notes: 'C4 D4 E4' },
      ],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Gam {C} trưởng có {F}; Lydian nâng nốt 4 lên nửa cung thành {F#}.',
        en: '{C} major has {F}; Lydian raises the 4th a half step to {F#}.',
      },
    },
  ],
} satisfies Lesson
