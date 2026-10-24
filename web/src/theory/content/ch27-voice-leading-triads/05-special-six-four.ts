import type { Lesson } from '@/theory/types'

/** Book 26.10-26.11: parallel fifths when roots are a 2nd apart, and the pedal, passing and cadential six-four. */
export default {
  id: 'special-six-four',
  title: { vi: 'Tình huống đặc biệt và hợp âm 6/4', en: 'Special situations and six-fours' },
  minutes: 5,
  sources: [
    { section: '26.10', url: 'https://musictheory.pugetsound.edu/mt21c/SpecialSituations.html' },
    { section: '26.11', url: 'https://musictheory.pugetsound.edu/mt21c/TypesOfSixFourChords.html' },
  ],
  recap: [
    { vi: 'Gốc cách nhau quãng 2 (ii6–I6/4, I–vii°6) dễ tạo quãng 5 song song', en: 'Roots a 2nd apart (ii6–I6/4, I–vii°6) invite parallel fifths' },
    { vi: 'Sửa: ở bè trên, đặt nốt năm thấp hơn nốt gốc', en: 'The fix: in the upper voices, put the fifth below the root' },
    { vi: 'Dùng hợp âm 6/4 ở ba chỗ: âm giữ, lướt và kết', en: 'Use six-fours in three places: pedal, passing and cadential' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Gốc cách nhau quãng 2', en: 'Roots a 2nd apart' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi gốc hai hợp âm cách nhau quãng 2, như ii6–I6/4 hay I–vii°6, rất dễ mắc quãng 5 song song. Ở cặp 1, tenor và alto đi từ {D}–{A} sang {C}–{G}.',
            en: 'When the roots of two chords are a 2nd apart, as in ii6–I6/4 or I–vii°6, parallel fifths come easily. In pair 1, the tenor and alto move from {D}–{A} to {C}–{G}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cách sửa: ở ba bè trên, đặt nốt năm của hợp âm thấp hơn nốt gốc. Ở cặp 2, quãng 5 đảo thành quãng 4, và quãng 4 song song thì được.',
            en: 'The fix: in the upper voices, voice each chord with its fifth below its root. In pair 2 the fifth turns into a fourth, and parallel fourths are fine.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'F2+D4@b+A4+D5 G2+C4@b+G4+E5 || F2+A3+D4+D5 G2+G3+E4+C5 ||',
          labels: ['1', '', '2', ''],
        },
        { type: 'play', notes: 'F2+D4+A4+D5:h G2+C4+G4+E5:h F2+A3+D4+D5:h G2+G3+E4+C5:h', label: { vi: 'Nghe cặp 1 rồi cặp 2', en: 'Hear pair 1, then pair 2' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, cách nối I–vii°6 nào tránh được quãng 5 song song?', en: 'In {C} major, which I–vii°6 avoids parallel fifths?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'C3+C4@b+G4+E5 D3+B3+F4+D5 || C3+G3+E4+C5 D3+F3+D4+B4 ||', labels: ['1', '', '2', ''] },
        { type: 'play', notes: 'C3+C4+G4+E5:h D3+B3+F4+D5:h C3+G3+E4+C5:h D3+F3+D4+B4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cách 1', en: 'Number 1' } },
          { text: { vi: 'Cách 2', en: 'Number 2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ở cách 1, tenor và alto đi {C}–{G} sang {B}–{F}, hai quãng 5 liền nhau; cách 2 đặt nốt năm {G} dưới nốt gốc {C} nên tránh được.',
        en: 'In number 1 the tenor and alto move {C}–{G} to {B}–{F}, fifth to fifth; number 2 puts the fifth, {G}, below the root, {C}, and avoids it.',
      },
    },
    {
      kind: 'explain',
      title: { vi: '6/4 âm giữ', en: 'The pedal six-four' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi viết nhạc, chỉ dùng hợp âm 6/4 ở ba chỗ: 6/4 âm giữ, 6/4 lướt và 6/4 kết. 6/4 âm giữ thường gặp trong mẫu I–IV6/4–I hoặc V–I6/4–V: bass giữ một nốt.',
            en: 'When writing music, use a six-four chord in three situations only: pedal, passing and cadential. The pedal six-four usually comes as I–IV6/4–I or V–I6/4–V: the bass holds one note.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+G3+E4+C5 C3+A3+F4+C5 C3+G3+E4+C5 || G2+G3+D4+B4 G2+G3+E4+C5 G2+G3+D4+B4 ||',
          labels: ['I', 'IV\n6\n4', 'I', 'V', 'I\n6\n4', 'V'],
          highlight: [1, 4],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:h C3+A3+F4+C5:h C3+G3+E4+C5:h G2+G3+D4+B4:h G2+G3+E4+C5:h G2+G3+D4+B4:h' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: '6/4 lướt và 6/4 kết', en: 'The passing and cadential six-four' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '6/4 lướt thường gặp trong mẫu I–V6/4–I6 hoặc IV–I6/4–IV6 (và hai mẫu đi ngược lại): bass đi liền bậc qua ba nốt.',
            en: 'The passing six-four usually comes as I–V6/4–I6 or IV–I6/4–IV6 (or their retrogrades): the bass moves by step through three notes.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '6/4 kết là I6/4 ngay trước V ở cuối câu, như bạn đã học.',
            en: 'The cadential six-four is the I6/4 just before V at a cadence, as you have learned.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+G3+E4+C5 D3+G3+D4+B4 E3+G3+C4+C5 || F2+A3+F4+C5 G2+G3+E4+C5 A2+F3+F4+C5 ||',
          labels: ['I', 'V\n6\n4', 'I\n6', 'IV', 'I\n6\n4', 'IV\n6'],
          highlight: [1, 4],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:h D3+G3+D4+B4:h E3+G3+C4+C5:h F2+A3+F4+C5:h G2+G3+E4+C5:h A2+F3+F4+C5:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {G} trưởng. Hợp âm 6/4 ở giữa thuộc loại nào?', en: 'This is in {G} major. Which kind is the six-four in the middle?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'G2+D3+B3@t+G4 A2+D3+A3@t+F#4 B2+D3+G3@t+G4', highlight: [1] },
        { type: 'play', notes: 'G2+D3+B3+G4:h A2+D3+A3+F#4:h B2+D3+G3+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '6/4 âm giữ', en: 'Pedal' } },
          { text: { vi: '6/4 lướt', en: 'Passing' }, correct: true },
          { text: { vi: '6/4 kết', en: 'Cadential' } },
        ],
      },
      reason: {
        vi: 'Bass đi liền bậc {G}–{A}–{B} và hợp âm giữa có nốt năm {A} ở bass: mẫu I–V6/4–I6.',
        en: 'The bass steps {G}–{A}–{B} and the middle chord has its fifth, {A}, in the bass: the pattern I–V6/4–I6.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Mẫu nào có 6/4 âm giữ?', en: 'Which pattern has a pedal six-four?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I–IV6/4–I', en: 'I–IV6/4–I' }, correct: true },
          { text: { vi: 'I–V6/4–I6', en: 'I–V6/4–I6' } },
          { text: { vi: 'IV–I6/4–IV6', en: 'IV–I6/4–IV6' } },
        ],
      },
      reason: {
        vi: 'Ở I–IV6/4–I, bass giữ nguyên nốt gốc của I; hai mẫu kia có bass đi liền bậc, là 6/4 lướt.',
        en: 'In I–IV6/4–I the bass holds the root of I; in the other two the bass steps, so they are passing six-fours.',
      },
    },
  ],
} satisfies Lesson
