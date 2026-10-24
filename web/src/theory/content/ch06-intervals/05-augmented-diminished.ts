import type { Lesson } from '@/theory/types'

/** Book 5.5 (augmented and diminished), with the tritone from 5.2 and their inversion from 5.4. */
export default {
  id: 'augmented-diminished',
  title: { vi: 'Quãng tăng và quãng giảm', en: 'Augmented and diminished intervals' },
  minutes: 5,
  sources: [
    { section: '5.5', url: 'https://musictheory.pugetsound.edu/mt21c/AugmentedAndDiminishedIntervals.html' },
    { section: '5.2', url: 'https://musictheory.pugetsound.edu/mt21c/HowToIdentifyIntervals.html' },
  ],
  practice: { drill: 'intervals', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Tăng: rộng hơn quãng đúng hoặc trưởng nửa cung', en: 'Augmented: a half step larger than perfect or major' },
    { vi: 'Giảm: hẹp hơn quãng đúng hoặc thứ nửa cung', en: 'Diminished: a half step smaller than perfect or minor' },
    { vi: 'Quãng 4 tăng và quãng 5 giảm là quãng ba cung, 6 nửa cung', en: 'The augmented 4th and diminished 5th are the tritone, 6 half steps' },
    { vi: 'Khi đảo, tăng thành giảm và giảm thành tăng', en: 'Inverted, augmented becomes diminished and diminished becomes augmented' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tăng và giảm', en: 'Augmented and diminished' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quãng **tăng** (augmented) rộng hơn quãng đúng hoặc trưởng nửa cung. Quãng **giảm** (diminished) hẹp hơn quãng đúng hoặc thứ nửa cung. Cỡ quãng nào cũng có thể tăng hoặc giảm.',
            en: '**Augmented** intervals are one half step larger than perfect or major ones. **Diminished** intervals are one half step smaller than perfect or minor ones. Any size of interval can be augmented or diminished.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+Gb4 C4+G4 C4+G#4', labels: ['5', '5', '5'] },
        { type: 'play', notes: 'C4+Gb4 C4+G4 C4+G#4', label: { vi: 'Nghe quãng 5 giảm, đúng, tăng', en: 'Hear a diminished, perfect, augmented 5th' } },
        {
          type: 'tip',
          text: {
            vi: 'Viết tắt: quãng tăng mang dấu +, quãng giảm mang dấu °. Bài luyện Quãng viết 5+ và 5° cho quãng 5 tăng và quãng 5 giảm.',
            en: 'Short forms: + marks augmented and ° diminished, as in +5 and °5. The Intervals drill writes A5 and d5 for the augmented and diminished 5th.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Từ hẹp đến rộng', en: 'From narrow to wide' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Với quãng 2, 3, 6, 7, từ hẹp đến rộng là: giảm, thứ, trưởng, tăng. Với quãng đồng âm, 4, 5, 8 là: giảm, đúng, tăng. Mỗi bậc cách bậc kế bên nửa cung.',
            en: 'For 2nds, 3rds, 6ths and 7ths, from narrow to wide: diminished, minor, major, augmented. For unisons, 4ths, 5ths and octaves: diminished, perfect, augmented. Each is a half step from the next.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+Abb4 C4+Ab4 C4+A4 C4+A#4', labels: ['6', '6', '6', '6'] },
        { type: 'play', notes: 'C4+Abb4 C4+Ab4 C4+A4 C4+A#4', label: { vi: 'Nghe quãng 6 giảm, thứ, trưởng, tăng', en: 'Hear a diminished, minor, major, augmented 6th' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4+F#4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 4 đúng', en: 'Perfect 4th' } },
          { text: { vi: 'Quãng 4 tăng', en: 'Augmented 4th' }, correct: true },
          { text: { vi: 'Quãng 5 giảm', en: 'Diminished 5th' } },
        ],
      },
      reason: {
        vi: '{C}–{F} là quãng 4 đúng, và {F#} rộng thêm nửa cung nên đó là quãng 4 tăng.',
        en: '{C}–{F} is a perfect 4th, and {F#} is a half step wider, so it is an augmented 4th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quãng ba cung', en: 'The tritone' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trên phím trắng, chỉ có quãng giữa {F} và {B} không đúng, trưởng hay thứ. {F} lên {B} là quãng 4 tăng, còn {B} lên {F} là quãng 5 giảm.',
            en: 'On the white keys, only the intervals between {F} and {B} are not perfect, major or minor. {F} up to {B} is an augmented 4th, and {B} up to {F} is a diminished 5th.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cả hai đều có 6 nửa cung và nghe giống hệt nhau: hai quãng này **trùng âm** (enharmonic). Tên chung của chúng là **quãng ba cung** (tritone).',
            en: 'Both span 6 half steps and sound the same: the two intervals are **enharmonic**. Their shared name is the **tritone**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+B4 B4+F5', labels: ['4', '5'] },
        { type: 'keys', notes: 'F4 B4', caption: { vi: '{F} lên {B}: 6 nửa cung', en: '{F} up to {B}: 6 half steps' } },
        { type: 'play', notes: 'F4+B4 B4+F5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+Ab4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 đúng', en: 'Perfect 5th' } },
          { text: { vi: 'Quãng 4 tăng', en: 'Augmented 4th' } },
          { text: { vi: 'Quãng 5 giảm', en: 'Diminished 5th' }, correct: true },
        ],
      },
      reason: {
        vi: '{D}–{A} là quãng 5 đúng, và {Ab} hẹp đi nửa cung nên đó là quãng 5 giảm, không phải quãng 4.',
        en: '{D}–{A} is a perfect 5th, and {Ab} is a half step narrower, so it is a diminished 5th, not a 4th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đảo quãng tăng và giảm', en: 'Inverting augmented and diminished' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi đảo quãng, tăng thành giảm và giảm thành tăng. Quãng 2 tăng {C}–{D#} đảo thành quãng 7 giảm {D#}–{C}, vì 2 cộng 7 bằng 9.',
            en: 'When an interval is inverted, augmented becomes diminished and diminished becomes augmented. The augmented 2nd {C}–{D#} inverts to the diminished 7th {D#}–{C}, since 2 plus 7 is 9.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+D#4 D#4+C5', labels: ['2', '7'] },
        { type: 'play', notes: 'C4+D#4 D#4+C5', label: { vi: 'Nghe quãng 2 tăng rồi quãng 7 giảm', en: 'Hear an augmented 2nd, then a diminished 7th' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng 6 tăng đảo lại thành quãng gì?', en: 'An augmented 6th inverts to what?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+A#4' },
        { type: 'play', notes: 'C4+A#4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 3 tăng', en: 'Augmented 3rd' } },
          { text: { vi: 'Quãng 3 giảm', en: 'Diminished 3rd' }, correct: true },
          { text: { vi: 'Quãng 3 thứ', en: 'Minor 3rd' } },
        ],
      },
      reason: {
        vi: '6 cộng 3 bằng 9, và tăng đảo thành giảm, nên đó là quãng 3 giảm.',
        en: '6 plus 3 is 9, and augmented inverts to diminished, so it is a diminished 3rd.',
      },
    },
  ],
} satisfies Lesson
