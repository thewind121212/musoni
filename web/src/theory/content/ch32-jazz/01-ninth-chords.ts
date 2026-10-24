import type { Lesson } from '@/theory/types'

/** Book 31.1: ninth chords, what maj/Δ and m/– apply to, ø7 = m7(♭5), the minor-major seventh, add 9 and parentheses. */
export default {
  id: 'ninth-chords',
  title: { vi: 'Hợp âm chín', en: 'Ninth chords' },
  minutes: 5,
  sources: [{ section: '31.1', url: 'https://musictheory.pugetsound.edu/mt21c/JazzChordBasics.html' }],
  recap: [
    { vi: 'Nốt chín là nốt 2 cao hơn một quãng tám, lấy từ gam trưởng', en: 'The 9th is the 2nd an octave higher, taken from the major scale' },
    { vi: 'Số 9 trong ký hiệu nghĩa là có cả nốt bảy', en: 'A 9 in a symbol means the 7th is there too' },
    { vi: 'maj hay Δ chỉ nốt bảy; m hay – chỉ nốt ba', en: 'maj or Δ is about the 7th; m or – is about the 3rd' },
    { vi: 'Có nốt chín mà không có nốt bảy: viết add 9', en: 'A 9th without a 7th is written add 9' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Thêm nốt chín', en: 'Adding a ninth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc jazz hay thêm **nốt chín** (ninth) lên trên hợp âm bảy, thành **hợp âm chín** (ninth chord). Nốt chín là nốt 2 của gam, cao hơn một quãng tám, và luôn lấy từ gam trưởng nếu ký hiệu không nói khác.',
            en: 'Jazz often adds a **ninth** on top of a seventh chord, making a **ninth chord**. The 9th is scale degree 2 an octave higher, and it always comes from the major scale unless the symbol says otherwise.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4 C4+E4+G4+Bb4+D5', labels: ['C7', 'C9'], highlight: [1] },
        { type: 'play', notes: 'C4+E4+G4+Bb4 C4+E4+G4+Bb4+D5', label: { vi: 'Nghe C7 rồi C9', en: 'Hear C7, then C9' } },
        {
          type: 'tip',
          text: {
            vi: 'Số 9 trong ký hiệu hợp âm nghĩa là nốt bảy cũng có mặt: C9 là {C} {E} {G} {Bb} {D}.',
            en: 'A 9 in a lead-sheet symbol means the 7th is there as well: C9 is {C} {E} {G} {Bb} {D}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt chín của G9 là nốt gì?', en: 'What is the 9th of G9?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5', labels: ['G7'] }],
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Nốt chín là nốt 2 của gam {G} trưởng, tức {A}, đặt cao hơn một quãng tám.',
        en: 'The 9th is degree 2 of the {G} major scale, {A}, placed an octave higher.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'maj, m và dấu trừ', en: 'maj, m and the minus sign' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chữ maj hay dấu Δ đứng trước 7, 9, 11 hoặc 13 nghĩa là nốt bảy trưởng, không phải nốt chín trưởng. Chữ m hay dấu trừ (–) nghĩa là thứ và chỉ áp vào nốt ba.',
            en: '"maj" or "Δ" before 7, 9, 11 or 13 means the 7th of the chord is major, not the 9th. A lowercase "m" or a minus sign (–) means minor and applies to the 3rd.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+B4+D5 C4+E4+G4+Bb4+D5 C4+Eb4+G4+Bb4+D5', labels: ['Cmaj9', 'C9', 'Cm9'] },
        { type: 'play', notes: 'C4+E4+G4+B4+D5 C4+E4+G4+Bb4+D5 C4+Eb4+G4+Bb4+D5', label: { vi: 'Nghe Cmaj9, C9, Cm9', en: 'Hear Cmaj9, C9, Cm9' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm bảy nào nhận nốt chín', en: 'Which seventh chords take a ninth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong năm loại hợp âm bảy thường gặp, bốn loại hay được thêm nốt chín; hợp âm bảy giảm thì không. Jazz viết hợp âm bảy nửa giảm Cø7 là Cm7(♭5).',
            en: 'Of the five common seventh chord types, four often get a 9th added; the fully diminished seventh does not. Jazz also writes the half-diminished Cø7 as Cm7(♭5).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Jazz còn dùng **hợp âm bảy thứ-trưởng** (minor-major seventh chord): hợp âm ba thứ với nốt bảy trưởng, viết CmΔ7, thường kèm cả nốt chín.',
            en: 'Jazz also uses the **minor-major seventh chord**: a minor triad with a major 7th, written CmΔ7, often with a 9th as well.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+Eb4+Gb4+Bb4 C4+Eb4+G4+B4', labels: ['Cø7', 'CmΔ7'] },
        { type: 'play', notes: 'C4+Eb4+Gb4+Bb4 C4+Eb4+G4+B4', label: { vi: 'Nghe Cø7 rồi CmΔ7', en: 'Hear Cø7, then CmΔ7' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Loại hợp âm bảy nào không được thêm nốt chín?', en: 'Which seventh chord type does not get a 9th added?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm bảy át', en: 'The dominant seventh' } },
          { text: { vi: 'Hợp âm bảy nửa giảm', en: 'The half-diminished seventh' } },
          { text: { vi: 'Hợp âm bảy giảm', en: 'The fully diminished seventh' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bốn loại kia đều hay có nốt chín; chỉ hợp âm bảy giảm là ngoại lệ.',
        en: 'The other four often carry a 9th; the fully diminished seventh is the one exception.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'add 9 và dấu ngoặc', en: 'add 9 and parentheses' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Có nốt chín mà không có nốt bảy thì viết add 9: Cadd9 là {C} {E} {G} {D}. Nốt bị nâng hay hạ được đặt trong ngoặc, để rõ dấu hóa thuộc về nốt nào: C7(♭9) có {Db}.',
            en: 'A 9th with no 7th is called "add 9": Cadd9 is {C} {E} {G} {D}. Raised or lowered numbers go in parentheses, so it is clear what the accidental applies to: C7(♭9) has a {Db}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+D5 C4+E4+G4+Bb4+Db5', labels: ['Cadd9', 'C7(♭9)'] },
        { type: 'play', notes: 'C4+E4+G4+D5 C4+E4+G4+Bb4+Db5', label: { vi: 'Nghe Cadd9 rồi C7(♭9)', en: 'Hear Cadd9, then C7(♭9)' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Cmaj9 gồm những nốt nào?', en: 'Which notes make Cmaj9?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C} {E} {G} {Bb} {D}', en: '{C} {E} {G} {Bb} {D}' } },
          { text: { vi: '{C} {E} {G} {B} {D}', en: '{C} {E} {G} {B} {D}' }, correct: true },
          { text: { vi: '{C} {Eb} {G} {B} {D}', en: '{C} {Eb} {G} {B} {D}' } },
        ],
      },
      reason: {
        vi: 'maj chỉ nốt bảy, nên có {B}; nốt ba và nốt chín vẫn lấy từ gam trưởng: {E} và {D}.',
        en: '"maj" is about the 7th, so it is {B}; the 3rd and the 9th still come from the major scale: {E} and {D}.',
      },
    },
  ],
} satisfies Lesson
