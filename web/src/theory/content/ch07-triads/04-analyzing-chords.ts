import type { Lesson } from '@/theory/types'

/**
 * Book 6.4: naming a spread-out chord by three questions (root, quality,
 * bass). The book spreads its chords over a grand staff; a lesson staff draws
 * a chord on one staff only, so ours are spread within the treble staff.
 */
export default {
  id: 'analyzing-chords',
  title: { vi: 'Phân tích hợp âm', en: 'Analyzing chords' },
  minutes: 5,
  sources: [{ section: '6.4', url: 'https://musictheory.pugetsound.edu/mt21c/AnalyzingChords.html' }],
  practice: { drill: 'chords', level: 4, durationSec: 120 },
  recap: [
    { vi: 'Ba câu hỏi: nốt gốc, tính chất, nốt bass', en: 'Three questions: root, quality, bass' },
    { vi: 'Xếp các nốt lên ba dòng (hoặc ba khe) liền nhau để tìm nốt gốc', en: 'Stack the notes on three lines (or spaces) in a row to find the root' },
    { vi: 'Đo hai quãng 3 để biết tính chất', en: 'Measure the two thirds to find the quality' },
    { vi: 'Nốt bass khác nốt gốc thì viết thêm dấu /', en: 'A bass other than the root adds a slash' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ba câu hỏi', en: 'Three questions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong bản nhạc, hợp âm ba thường có bốn nốt trở lên, vài nốt lặp lại, trải rộng trên khuông. Để đặt ký hiệu, hãy hỏi ba câu: nốt gốc là gì, tính chất là gì, và nốt bass là gì?',
            en: 'In real music a triad often has four or more notes, some of them repeats, spread out over the staff. To find its symbol, ask three questions: what is the root, what is the quality, and what is the bass?',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+A4+D5+F5' },
        { type: 'play', notes: 'D4+A4+D5+F5' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm nốt gốc', en: 'Find the root' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Viết lại các nốt, bỏ nốt lặp, sao cho chúng nằm trên ba dòng liền nhau (có thể thêm dòng kẻ phụ). Nốt thấp nhất lúc đó là nốt gốc, ở đây là {D}.',
            en: 'Rewrite the notes, leaving out repeats, so they sit on three lines in a row (ledger lines if needed). The lowest note is then the root, here {D}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+A4+D5+F5 || D5+F5+A5', highlight: [1] },
        { type: 'play', notes: 'D4+A4+D5+F5 D5+F5+A5' },
        {
          type: 'tip',
          text: {
            vi: 'Xếp cả ba nốt vào ba khe liền nhau cũng được, kết quả vẫn như nhau.',
            en: 'Three spaces in a row work just as well; the result is the same.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Tính chất và nốt bass', en: 'Quality and bass' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '{D}–{F} là 3 nửa cung (quãng 3 thứ), {F}–{A} là 4 nửa cung (quãng 3 trưởng), nên hợp âm thứ. Nốt bass là {D}, chính là nốt gốc, nên hợp âm ở thế gốc: Dm.',
            en: '{D}–{F} is 3 half steps (a minor 3rd) and {F}–{A} is 4 (a major 3rd), so the triad is minor. The bass is {D}, the root itself, so it is in root position: Dm.',
          },
        },
        { type: 'keys', notes: 'D4 F4 A4', caption: { vi: 'Dm:', en: 'Dm:' } },
        { type: 'play', notes: 'D4+F4+A4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt gốc của hợp âm này là nốt nào?', en: 'What is the root of this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4+Bb4+E5+G5' },
        { type: 'play', notes: 'G4+Bb4+E5+G5' },
      ],
      answer: { type: 'key', note: 'E', blackKeys: 'b' },
      reason: {
        vi: 'Xếp lại cho sát, {E4} {G4} {Bb4} nằm trên ba dòng liền nhau, nên {E} là nốt gốc.',
        en: 'Stacked close, {E4} {G4} {Bb4} sit on three lines in a row, so {E} is the root.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm {E} {G} {Bb} có tính chất gì?', en: 'What is the quality of {E} {G} {Bb}?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E4+G4+Bb4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trưởng', en: 'Major' } },
          { text: { vi: 'Thứ', en: 'Minor' } },
          { text: { vi: 'Giảm', en: 'Diminished' }, correct: true },
          { text: { vi: 'Tăng', en: 'Augmented' } },
        ],
      },
      reason: {
        vi: '{E}–{G} và {G}–{Bb} đều là 3 nửa cung, hai quãng 3 thứ, nên hợp âm giảm.',
        en: '{E}–{G} and {G}–{Bb} are both 3 half steps, two minor 3rds, so the triad is diminished.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Vậy ký hiệu đầy đủ của hợp âm là gì?', en: 'So what is the chord’s full symbol?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4+Bb4+E5+G5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'E°', en: 'E°' } },
          { text: { vi: 'E°/G', en: 'E°/G' }, correct: true },
          { text: { vi: 'G°/E', en: 'G°/E' } },
        ],
      },
      reason: {
        vi: 'Hợp âm {E} giảm, nhưng nốt thấp nhất là {G}, không phải nốt gốc, nên viết E°/G.',
        en: 'It is an {E} diminished triad, but the lowest note is {G}, not the root, so it is E°/G.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+A4+C5+F5' },
        { type: 'play', notes: 'C4+A4+C5+F5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'F', en: 'F' } },
          { text: { vi: 'F/C', en: 'F/C' }, correct: true },
          { text: { vi: 'Am/C', en: 'Am/C' } },
        ],
      },
      reason: {
        vi: 'Xếp lại thành {F} {A} {C}, hợp âm {F} trưởng; {C} nằm dưới cùng nên viết F/C.',
        en: 'Restacked it is {F} {A} {C}, an {F} major triad; {C} is at the bottom, so it is F/C.',
      },
    },
  ],
} satisfies Lesson
