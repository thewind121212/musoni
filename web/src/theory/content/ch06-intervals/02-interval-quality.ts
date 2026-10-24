import type { Lesson } from '@/theory/types'

/** Book 5.1: the intervals of the major scale and interval quality (5.1.2). */
export default {
  id: 'interval-quality',
  title: { vi: 'Quãng đúng, trưởng và thứ', en: 'Perfect, major and minor' },
  minutes: 4,
  sources: [{ section: '5.1', url: 'https://musictheory.pugetsound.edu/mt21c/IntervalsIntroduction.html' }],
  practice: { drill: 'intervals', level: 2, durationSec: 60 },
  recap: [
    { vi: 'Từ chủ âm lên, gam trưởng chỉ có quãng đúng và trưởng', en: 'From the tonic up, a major scale holds only perfect and major intervals' },
    { vi: 'Quãng đồng âm, 4, 5, 8: đúng, không bao giờ trưởng hay thứ', en: 'Unison, 4th, 5th, octave: perfect, never major or minor' },
    { vi: 'Quãng 2, 3, 6, 7: trưởng hoặc thứ, không bao giờ đúng', en: '2nd, 3rd, 6th, 7th: major or minor, never perfect' },
    { vi: 'Quãng thứ nhỏ hơn quãng trưởng nửa cung', en: 'A minor interval is a half step smaller than a major one' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Quãng trong gam trưởng', en: 'Intervals of the major scale' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ngoài cỡ, mỗi quãng còn có **tính chất quãng** (interval quality). Đo từ chủ âm lên từng bậc của gam trưởng, mọi quãng đều là **đúng** (perfect) hoặc **trưởng** (major).',
            en: 'Besides its number, every interval has an **interval quality**. Measured from the tonic up to each degree of a major scale, every interval is either **perfect** or **major**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Từ {C}: quãng 2, 3, 6, 7 là trưởng; quãng 4, 5, 8 là đúng. Gọi đủ hai phần: quãng 3 trưởng, quãng 5 đúng.',
            en: 'From {C}: the 2nd, 3rd, 6th and 7th are major; the 4th, 5th and octave are perfect. Say both parts: major 3rd, perfect 5th.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+D4 C4+E4 C4+F4 C4+G4 C4+A4 C4+B4 C4+C5', labels: ['2', '3', '4', '5', '6', '7', '8'] },
        { type: 'play', notes: 'C4+D4 C4+E4 C4+F4 C4+G4 C4+A4 C4+B4 C4+C5' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hai nhóm quãng', en: 'Two families' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quãng đồng âm, quãng 4, quãng 5 và quãng 8 có thể là quãng đúng, nhưng không bao giờ là trưởng hay thứ. Ngược lại, quãng 2, 3, 6, 7 có thể là trưởng hoặc **thứ** (minor), nhưng không bao giờ là đúng.',
            en: 'The unison, 4th, 5th and octave can be perfect, but never major or minor. The 2nd, 3rd, 6th and 7th can be major or **minor**, but never perfect.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+G4 D4+A4 D4+D5', labels: ['4', '5', '8'] },
        { type: 'play', notes: 'D4+G4 D4+A4 D4+D5', label: { vi: 'Nghe quãng 4, 5, 8 đúng', en: 'Hear a perfect 4th, 5th, octave' } },
        {
          type: 'tip',
          text: {
            vi: 'Quãng đúng nối nốt tự nhiên với nốt tự nhiên, thăng với thăng, giáng với giáng. Riêng quãng 4 và 5 giữa {B} và {F} thì dùng {B} với {F#}, hoặc {Bb} với {F}.',
            en: 'Perfect intervals go natural to natural, sharp to sharp, flat to flat. The exception is the 4ths and 5ths between {B} and {F}, which use {B} with {F#}, or {Bb} with {F}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng nào có thể là quãng đúng?', en: 'Which interval can be perfect?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 3', en: 'A 3rd' } },
          { text: { vi: 'Quãng 5', en: 'A 5th' }, correct: true },
          { text: { vi: 'Quãng 6', en: 'A 6th' } },
        ],
      },
      reason: {
        vi: 'Chỉ quãng đồng âm, 4, 5 và 8 mới có thể là quãng đúng.',
        en: 'Only the unison, 4th, 5th and octave can be perfect.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quãng thứ', en: 'Minor intervals' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quãng thứ nhỏ hơn quãng trưởng cùng cỡ một **nửa cung** (half step). {C} lên {E} là quãng 3 trưởng; hạ nốt trên xuống {Eb}, ta được quãng 3 thứ.',
            en: 'A minor interval is one **half step** smaller than the major interval of the same size. {C} up to {E} is a major 3rd; lower the top note to {Eb} and it becomes a minor 3rd.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4 C4+Eb4', labels: ['3', '3'], highlight: [1] },
        { type: 'play', notes: 'C4+E4 C4+Eb4', label: { vi: 'Nghe trưởng rồi thứ', en: 'Hear major, then minor' } },
        { type: 'keys', notes: 'C4 Eb4', caption: { vi: 'Quãng 3 thứ trên phím đàn:', en: 'The minor 3rd on the keys:' } },
        {
          type: 'tip',
          text: {
            vi: 'Bài luyện Quãng viết tắt: 3T là quãng 3 trưởng, 3t là quãng 3 thứ, 5Đ là quãng 5 đúng.',
            en: 'The Intervals drill writes them short: M3 is a major 3rd, m3 a minor 3rd, P5 a perfect 5th.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là quãng gì?', en: 'What interval is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4+Ab4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6 trưởng', en: 'Major 6th' } },
          { text: { vi: 'Quãng 6 thứ', en: 'Minor 6th' }, correct: true },
          { text: { vi: 'Quãng 5 đúng', en: 'Perfect 5th' } },
        ],
      },
      reason: {
        vi: '{C} lên {A} là quãng 6 trưởng, và {Ab} thấp hơn nửa cung nên đó là quãng 6 thứ.',
        en: '{C} up to {A} is a major 6th, and {Ab} is a half step lower, so it is a minor 6th.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào cao hơn {C4} một quãng 7 thứ?', en: 'Which note is a minor 7th above {C4}?' },
      blocks: [{ type: 'keys', notes: 'C4' }],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Quãng 7 trưởng trên {C} là {B}, hạ xuống nửa cung được {Bb}.',
        en: 'The major 7th above {C} is {B}, and a half step lower is {Bb}.',
      },
    },
  ],
} satisfies Lesson
