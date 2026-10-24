import type { Lesson } from '@/theory/types'

/** Book 8.1: the five common seventh chords, by triad and seventh, their symbols and stacked thirds. */
export default {
  id: 'seventh-types',
  title: { vi: 'Năm loại hợp âm bảy', en: 'The five seventh chords' },
  minutes: 5,
  sources: [{ section: '8.1', url: 'https://musictheory.pugetsound.edu/mt21c/SeventhChordsIntroduction.html' }],
  recap: [
    { vi: 'Loại hợp âm bảy = hợp âm ba bên dưới + quãng 7 từ nốt gốc', en: 'A seventh chord’s type = its triad + the 7th above the root' },
    { vi: 'maj7: trưởng + 7 trưởng; 7: trưởng + 7 thứ', en: 'maj7: major + major 7th; 7: major + minor 7th' },
    { vi: 'm7: thứ + 7 thứ', en: 'm7: minor + minor 7th' },
    { vi: 'ø7: giảm + 7 thứ; °7: giảm + 7 giảm', en: 'ø7: diminished + minor 7th; °7: diminished + diminished 7th' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm ba và quãng 7', en: 'A triad and a seventh' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Loại hợp âm bảy do hai điều quyết định: hợp âm ba bên dưới, và quãng 7 từ nốt gốc lên nốt bảy. Có năm loại hay gặp, đây là cả năm trên nốt gốc {C}.',
            en: 'Two things set a seventh chord’s type: the triad underneath, and the 7th from the root up to the seventh. There are five common types; here are all five on {C}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+B4 C4+E4+G4+Bb4 C4+Eb4+G4+Bb4 C4+Eb4+Gb4+Bb4 C4+Eb4+Gb4+Bbb4', labels: ['maj7', '7', 'm7', 'ø7', '°7'] },
        { type: 'play', notes: 'C4+E4+G4+B4 C4+E4+G4+Bb4 C4+Eb4+G4+Bb4 C4+Eb4+Gb4+Bb4 C4+Eb4+Gb4+Bbb4' },
        {
          type: 'tip',
          text: {
            vi: 'Cách khác để phân biệt: xem các quãng 3 xếp từ dưới lên. Ví dụ maj7 là trưởng, thứ, trưởng; °7 là ba quãng 3 thứ.',
            en: 'Another way to tell them apart: look at the thirds stacked from the bottom. For example, maj7 is major, minor, major; °7 is three minor thirds.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Bảy trưởng và bảy át', en: 'Major seventh and dominant seventh' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm bảy trưởng** (major seventh chord): hợp âm ba trưởng thêm quãng 7 trưởng, ký hiệu maj7.',
            en: 'The **major seventh chord**: a major triad plus a major 7th, written maj7.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Hợp âm bảy át** (dominant seventh chord), còn gọi là bảy trưởng-thứ (major-minor seventh): hợp âm ba trưởng thêm quãng 7 thứ, ký hiệu 7.',
            en: 'The **dominant seventh chord**, also called the **major-minor seventh chord**: a major triad plus a minor 7th, written 7.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+B4 C4+E4+G4+Bb4', labels: ['maj7', '7'] },
        { type: 'play', notes: 'C4+E4+G4+B4 C4+E4+G4+Bb4', label: { vi: 'Nghe maj7, rồi 7', en: 'Hear maj7, then 7' } },
        {
          type: 'tip',
          text: {
            vi: 'Nó mang tên “át” vì trong giọng trưởng, hợp âm này có sẵn trên bậc át âm (V).',
            en: 'It is called “dominant” because in a major key it forms on the dominant (V).',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này là loại nào?', en: 'Which type is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F4+A4+C5+E5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bảy trưởng (maj7)', en: 'Major seventh (maj7)' }, correct: true },
          { text: { vi: 'Bảy át (7)', en: 'Dominant seventh (7)' } },
          { text: { vi: 'Bảy thứ (m7)', en: 'Minor seventh (m7)' } },
        ],
      },
      reason: {
        vi: '{F} {A} {C} là hợp âm ba trưởng, và từ {F} lên {E} là quãng 7 trưởng.',
        en: '{F} {A} {C} is a major triad, and {F} up to {E} is a major 7th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bảy thứ', en: 'Minor seventh' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm bảy thứ** (minor seventh chord): hợp âm ba thứ thêm quãng 7 thứ, ký hiệu m7.',
            en: 'The **minor seventh chord**: a minor triad plus a minor 7th, written m7.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+Eb4+G4+Bb4', labels: ['m7'] },
        { type: 'play', notes: 'C4+Eb4+G4+Bb4' },
        { type: 'keys', notes: 'C4 Eb4 G4 Bb4', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này là loại nào?', en: 'Which type is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+F4+A4+C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bảy át (7)', en: 'Dominant seventh (7)' } },
          { text: { vi: 'Bảy thứ (m7)', en: 'Minor seventh (m7)' }, correct: true },
          { text: { vi: 'Bảy nửa giảm (ø7)', en: 'Half-diminished seventh (ø7)' } },
        ],
      },
      reason: {
        vi: '{D} {F} {A} là hợp âm ba thứ, và từ {D} lên {C} là quãng 7 thứ.',
        en: '{D} {F} {A} is a minor triad, and {D} up to {C} is a minor 7th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hai loại bảy giảm', en: 'The two diminished sevenths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm bảy nửa giảm** (half-diminished seventh chord): hợp âm ba giảm thêm quãng 7 thứ, ký hiệu ø7.',
            en: 'The **half-diminished seventh chord**: a diminished triad plus a minor 7th, written ø7.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Hợp âm bảy giảm** (fully-diminished seventh chord): hợp âm ba giảm thêm quãng 7 giảm, ký hiệu °7. Nó gồm ba quãng 3 thứ chồng lên nhau.',
            en: 'The **fully-diminished seventh chord**, often just the diminished seventh: a diminished triad plus a diminished 7th, written °7. It is three minor thirds stacked up.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+Eb4+Gb4+Bb4 C4+Eb4+Gb4+Bbb4', labels: ['ø7', '°7'] },
        { type: 'play', notes: 'C4+Eb4+Gb4+Bb4 C4+Eb4+Gb4+Bbb4', label: { vi: 'Nghe ø7, rồi °7', en: 'Hear ø7, then °7' } },
        {
          type: 'tip',
          text: {
            vi: '{Bbb} bấm cùng phím với {A}, nhưng được viết là {Bbb} vì nó cách {C} một quãng 7.',
            en: '{Bbb} is the same key as {A}, but it is written {Bbb} because it is a 7th above {C}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này là loại nào?', en: 'Which type is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'B3+D4+F4+A4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bảy thứ (m7)', en: 'Minor seventh (m7)' } },
          { text: { vi: 'Bảy nửa giảm (ø7)', en: 'Half-diminished seventh (ø7)' }, correct: true },
          { text: { vi: 'Bảy giảm (°7)', en: 'Fully-diminished seventh (°7)' } },
        ],
      },
      reason: {
        vi: '{B} {D} {F} là hợp âm ba giảm, và từ {B} lên {A} là quãng 7 thứ.',
        en: '{B} {D} {F} is a diminished triad, and {B} up to {A} is a minor 7th.',
      },
    },
  ],
} satisfies Lesson
