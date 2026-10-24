import type { Lesson } from '@/theory/types'

/** Book 7.1: Roman numerals for chords in a key, case for quality, slash notation for inversions. */
export default {
  id: 'roman-numerals',
  title: { vi: 'Bậc La Mã', en: 'Roman numerals' },
  minutes: 4,
  sources: [{ section: '7.1', url: 'https://musictheory.pugetsound.edu/mt21c/RomanNumeralChordSymbols.html' }],
  practice: { drill: 'chords', level: 5, durationSec: 60, mode: 'roman' },
  recap: [
    { vi: 'Bậc La Mã là bậc của nốt gốc trong giọng', en: 'A Roman numeral is the scale degree of the root in the key' },
    { vi: 'Chữ hoa: trưởng; chữ thường: thứ', en: 'Uppercase is major; lowercase is minor' },
    { vi: '° là giảm, + là tăng', en: '° is diminished, + is augmented' },
    { vi: 'V/3: hợp âm V, nốt ba ở bass', en: 'V/3rd: the V chord with its third in the bass' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đánh số hợp âm', en: 'Numbering chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Bậc La Mã** (Roman numeral) gọi hợp âm theo bậc của nốt gốc trong giọng. I là hợp âm dựng trên bậc 1, V là hợp âm dựng trên bậc 5.',
            en: 'A **Roman numeral** names a chord by the scale degree of its root in the key. I is the triad built on scale degree 1, V the triad built on scale degree 5.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Số thay cho tên nốt giúp thấy cùng một khuôn mẫu ở mọi giọng, và dễ **dịch giọng** (transposition).',
            en: 'Numbers instead of note names show the same pattern in every key, and make **transposition** easy.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 G4+B4+D5', labels: ['I', 'V'] },
        { type: 'play', notes: 'C4+E4+G4 G4+B4+D5', label: { vi: 'Nghe I và V trong giọng {C} trưởng', en: 'Hear I and V in {C} major' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này dựng trên bậc mấy?', en: 'In {C} major, which scale degree is this chord built on?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F4+A4+C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bậc 3', en: 'Degree 3' } },
          { text: { vi: 'Bậc 4', en: 'Degree 4' }, correct: true },
          { text: { vi: 'Bậc 5', en: 'Degree 5' } },
        ],
      },
      reason: {
        vi: 'Nốt gốc {F} là bậc 4 của giọng {C} trưởng, nên đây là hợp âm IV.',
        en: 'The root {F} is scale degree 4 of {C} major, so this is the IV chord.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chữ hoa, chữ thường', en: 'Uppercase and lowercase' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chữ hoa là hợp âm trưởng (I), chữ thường là hợp âm thứ (ii). Hợp âm giảm viết chữ thường thêm ° (vii°), hợp âm tăng viết chữ hoa thêm + (III+).',
            en: 'Uppercase means a major triad (I), lowercase a minor triad (ii). A diminished triad is lowercase with ° (vii°), an augmented triad uppercase with + (III+).',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 D4+F4+A4 B4+D5+F5', labels: ['I', 'ii', 'vii°'] },
        { type: 'play', notes: 'C4+E4+G4 D4+F4+A4 B4+D5+F5', label: { vi: 'Nghe trưởng, thứ, giảm', en: 'Hear major, minor, diminished' } },
        {
          type: 'tip',
          text: {
            vi: 'Một bậc La Mã cho biết hai điều: nốt gốc ở bậc nào, và **tính chất** (quality) của hợp âm.',
            en: 'One numeral tells you two things: which scale degree the root is on, and the chord’s **quality**.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, hợp âm này là gì?', en: 'In {G} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'G', notes: 'B4+D5+F#5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'III', en: 'III' } },
          { text: { vi: 'iii', en: 'iii' }, correct: true },
          { text: { vi: 'iii°', en: 'iii°' } },
        ],
      },
      reason: {
        vi: '{B} là bậc 3 của giọng {G} trưởng, và {B}–{D}–{F#} là hợp âm thứ, nên viết chữ thường iii.',
        en: '{B} is scale degree 3 of {G} major and {B}–{D}–{F#} is a minor triad, so it is lowercase iii.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thế đảo', en: 'Inversions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm ở thế đảo vẫn giữ bậc La Mã của nốt gốc. Ta tạm ghi nốt ở bass sau dấu gạch chéo: V/3 là hợp âm V có nốt ba ở bass, V/5 có nốt năm ở bass.',
            en: 'An inverted chord keeps the numeral of its root. For now we add the bass after a slash: V/3rd is the V chord with its third in the bass, V/5th with its fifth.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', notes: 'D4+F#4+A4 F#4+A4+D5' },
        { type: 'play', notes: 'D4+F#4+A4 F#4+A4+D5', label: { vi: 'Nghe V rồi V/3 trong giọng {G} trưởng', en: 'Hear V, then V/3rd, in {G} major' } },
        {
          type: 'tip',
          text: {
            vi: 'Cả hai đều là {D}–{F#}–{A}, hợp âm V. Hợp âm thứ hai có {F#}, nốt ba, ở bass.',
            en: 'Both are {D}–{F#}–{A}, the V chord. The second has {F#}, the third, in the bass.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A3+C4+F4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi', en: 'vi' } },
          { text: { vi: 'IV/3', en: 'IV/3rd' }, correct: true },
          { text: { vi: 'IV/5', en: 'IV/5th' } },
        ],
      },
      reason: {
        vi: 'Các nốt {F}–{A}–{C} là hợp âm IV, và {A}, nốt ba của nó, nằm ở bass.',
        en: 'The notes {F}–{A}–{C} are the IV chord, and {A}, its third, is in the bass.',
      },
    },
  ],
} satisfies Lesson
