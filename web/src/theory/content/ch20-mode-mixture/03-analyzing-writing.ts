import type { Lesson } from '@/theory/types'

/**
 * Book 19.3: a borrowed chord is analyzed by root, quality and inversion only
 * (the book's G major iiø6/5); writing ♭VI in A major (F♮ A C♮); a flat before
 * a numeral lowers the root a half step from the key signature.
 */
export default {
  id: 'analyzing-writing',
  title: { vi: 'Phân tích và viết hợp âm mượn', en: 'Analyzing and writing borrowed chords' },
  minutes: 4,
  sources: [{ section: '19.3', url: 'https://musictheory.pugetsound.edu/mt21c/AnalyzingAndWritingBorrowedChords.html' }],
  recap: [
    { vi: 'Ghi hợp âm mượn bằng nốt gốc, tính chất và thế đảo', en: 'Analyze a borrowed chord by root, quality and inversion' },
    { vi: '{A} {C} {Eb} {G}, {C} ở bass, trong giọng {G} trưởng là iiø6/5', en: '{A} {C} {Eb} {G} over {C} in {G} major is iiø6/5' },
    { vi: '♭ trước bậc La Mã: hạ nốt gốc nửa cung so với hóa biểu', en: 'A ♭ before a numeral lowers the root a half step from the key signature' },
    { vi: '♭VI ở giọng {A} trưởng là {Fn} {A} {Cn}', en: '♭VI in {A} major is {Fn} {A} {Cn}' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ghi như hợp âm thuận giọng', en: 'Analyzed like a diatonic chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm át phụ được ghi kèm hợp âm đích, như V/V. Hợp âm mượn thì không: bạn chỉ ghi nốt gốc, tính chất và thế đảo của nó.',
            en: 'A secondary chord is written with its target, as in V/V. A borrowed chord is not: you merely note its root, quality and inversion.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Xếp các nốt thành chồng quãng 3 để tìm nốt gốc. Nốt gốc là bậc mấy cho số La Mã; các quãng 3 cho tính chất; nốt bass cho thế đảo.',
            en: 'Stack the notes in thirds to find the root. The root\'s scale degree gives the numeral, the thirds give the quality, and the bass note gives the inversion.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+F#4+A4 Ab4+C5+Eb5', labels: ['V/V', '♭VI'] },
        { type: 'play', notes: 'D4+F#4+A4:h Ab4+C5+Eb5:h', label: { vi: 'Nghe V/V và ♭VI ở giọng {C} trưởng', en: 'Hear V/V and ♭VI in {C} major' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Ví dụ ở giọng {G} trưởng', en: 'An example in {G} major' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Xếp lại được {A}–{C}–{Eb}–{G}: nốt gốc {A} là bậc 2 của giọng {G} trưởng. Các quãng 3 là thứ, thứ, trưởng, tức hợp âm bảy nửa giảm iiø7. Nốt ba {C} ở bass, nên viết iiø6/5.',
            en: 'Stacked, the notes are {A}–{C}–{Eb}–{G}: the root {A} is degree 2 of {G} major. The thirds are minor, minor, major, a half-diminished iiø7. The third, {C}, is in the bass, so it is iiø6/5.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'G', notes: 'C3+A3+Eb4+G4 || A2+C4+Eb4+G4', labels: ['iiø\n6\n5', 'iiø7'] },
        { type: 'play', notes: 'C3+A3+Eb4+G4 A2+C4+Eb4+G4', label: { vi: 'Nghe thế đảo 1, rồi thế gốc', en: 'Hear first inversion, then root position' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, hợp âm này là gì?', en: 'In {D} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'D', notes: 'Bb4+D5+F5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi', en: 'vi' } },
          { text: { vi: '♭VI', en: '♭VI' }, correct: true },
          { text: { vi: '♭vi', en: '♭vi' } },
        ],
      },
      reason: {
        vi: 'Nốt gốc {Bb} là bậc 6 {B} hạ nửa cung, và {Bb}–{D}–{F} là hợp âm trưởng, nên viết ♭VI.',
        en: 'The root {Bb} is degree 6, {B}, lowered a half step, and {Bb}–{D}–{F} is a major triad, so it is ♭VI.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Viết ♭VI ở giọng {A} trưởng', en: 'Writing ♭VI in {A} major' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '♭VI dựng trên ♭6. Ở giọng {A} trưởng, bậc 6 là {F#}, hạ nửa cung thành {Fn}. Rồi chồng quãng 3 trưởng và quãng 3 thứ: {Fn}–{A}–{Cn}.',
            en: '♭VI is built on ♭6. In {A} major, degree 6 is {F#}, so ♭6 is {Fn}. Then stack a major third and a minor third: {Fn}–{A}–{Cn}.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'A', notes: 'F#4+A4+C#5 F4+A4+C5', labels: ['vi', '♭VI'], highlight: [1] },
        { type: 'play', notes: 'F#4+A4+C#5:h F4+A4+C5:h', label: { vi: 'Nghe vi rồi ♭VI', en: 'Hear vi, then ♭VI' } },
        {
          type: 'tip',
          text: {
            vi: 'Dấu ♭ trước bậc La Mã nghĩa là hạ nốt gốc nửa cung so với hóa biểu, không phải đặt dấu giáng trước nốt gốc. Ở đây nốt gốc mang dấu bình.',
            en: 'A flat before a Roman numeral means lowering the root a half step from the key signature, not literally putting a flat before it. Here the root takes a natural.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} trưởng, nốt gốc của ♭VI là nốt nào?', en: 'In {E} major, what is the root of ♭VI?' },
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Bậc 6 của giọng {E} trưởng là {C#}; hạ nửa cung được {Cn}, không phải một nốt giáng.',
        en: 'Degree 6 of {E} major is {C#}; a half step lower is {Cn}, not a flat note.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} trưởng, hợp âm iv mượn gồm những nốt nào?', en: 'In {A} major, which notes make the borrowed iv?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{D} {F#} {A}', en: '{D} {F#} {A}' } },
          { text: { vi: '{D} {Fn} {A}', en: '{D} {Fn} {A}' }, correct: true },
          { text: { vi: '{Db} {F} {Ab}', en: '{Db} {F} {Ab}' } },
        ],
      },
      reason: {
        vi: 'iv mượn hạ bậc 6 {F#} xuống {Fn}, nên {D}–{Fn}–{A} là hợp âm thứ trên bậc 4.',
        en: 'The borrowed iv lowers degree 6, {F#}, to {Fn}, so {D}–{Fn}–{A} is a minor triad on degree 4.',
      },
    },
  ],
} satisfies Lesson
