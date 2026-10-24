import type { Lesson } from '@/theory/types'

/**
 * Book 13.2: the sentence, a phrase whose idea is repeated or sequenced, then
 * followed by related or unrelated material to a cadence. Our own melodies in
 * place of the book's Mozart and Beethoven excerpts. No practice link.
 */
export default {
  id: 'sentence',
  title: { vi: 'Câu trình bày–phát triển', en: 'The sentence' },
  minutes: 4,
  sources: [{ section: '13.2', url: 'https://musictheory.pugetsound.edu/mt21c/SentenceStructure.html' }],
  recap: [
    { vi: 'Câu trình bày–phát triển: một ý nhạc được lặp lại hoặc mô tiến', en: 'A sentence: a melodic idea is repeated or sequenced' },
    { vi: 'Sau đó là phần dẫn đến kết', en: 'Then material leads to a cadence' },
    { vi: 'Phần đó có thể liên quan đến ý đầu hoặc là ý mới', en: 'That material may be related to the idea or unrelated' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ý nhạc, rồi mô tiến', en: 'An idea, then a sequence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Câu trình bày–phát triển** (sentence) là câu nhạc có cách dựng giai điệu riêng. Một ý nhạc ngắn (**motif**, motive) được lặp lại hoặc mô tiến, rồi phần sau đi tiếp đến chỗ kết.',
            en: 'A **sentence** is a phrase with a specific melodic construction. A short melodic idea (a **motive**) is repeated or sequenced, then more material leads on to a cadence.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây ô 1 trình bày ý nhạc, ô 2 mô tiến nó xuống một bậc. Ô 3 đi tiếp bằng chất liệu gần với ý đầu, ô 4 là kết.',
            en: 'Here measure 1 states the idea and measure 2 sequences it down a step. Measure 3 goes on with related material, and measure 4 is the cadence.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C5:q. B4:8 A4:q G4:q | B4:q. A4:8 G4:q F4:q | E4:8 F4:8 G4:8 A4:8 G4:q F4:q | E4:q D4:q C4:h ||',
          labels: ['1', '', '', '', '2', '', '', '', '3', '', '', '', '', '', '4', '', ''],
          highlight: [0, 1, 2, 3, 4, 5, 6, 7],
        },
        { type: 'play', notes: 'C5:q. B4:8 A4:q G4:q | B4:q. A4:8 G4:q F4:q | E4:8 F4:8 G4:8 A4:8 G4:q F4:q | E4:q D4:q C4:h', bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô 2 làm gì với ý nhạc của ô 1?', en: 'What does measure 2 do with the idea of measure 1?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q. B4:8 A4:q G4:q | B4:q. A4:8 G4:q F4:q |' },
        { type: 'play', notes: 'C5:q. B4:8 A4:q G4:q | B4:q. A4:8 G4:q F4:q', bpm: 100 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Lặp lại y nguyên', en: 'Repeats it exactly' } },
          { text: { vi: 'Mô tiến xuống một bậc', en: 'Sequences it down a step' }, correct: true },
          { text: { vi: 'Đưa vào một ý mới', en: 'Brings in a new idea' } },
        ],
      },
      reason: {
        vi: 'Ô 2 giữ nguyên tiết tấu và hình dáng của ô 1, nhưng mọi nốt thấp hơn một bậc: {C}–{B}–{A}–{G} thành {B}–{A}–{G}–{F}.',
        en: 'Measure 2 keeps the rhythm and shape of measure 1 with every note a step lower: {C}–{B}–{A}–{G} becomes {B}–{A}–{G}–{F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Lặp lại cho hợp hòa âm', en: 'Repeating to fit the harmony' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ý nhạc cũng có thể được lặp lại với vài quãng đổi đi cho hợp với hợp âm mới. Ở đây ô 1 nằm trên I, ô 2 lặp hình dáng ấy trên V.',
            en: 'The idea can also be repeated with some intervals changed to fit a new chord. Here measure 1 sits on I and measure 2 repeats its shape on V.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ô 3 cắt nhỏ ý nhạc thành một motif hai nốt và lặp nó. Ô 4 dẫn đến kết lửng.',
            en: 'Measure 3 breaks the idea into a two-note motive and repeats it. Measure 4 leads to a half cadence.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:q E4:q G4:h | B3:q D4:q G4:h | C4:q E4:q B3:q D4:q | C4:q E4:q D4:h ||',
          labels: ['1', '', '', '2', '', '', '3', '', '', '', '4', '', ''],
          highlight: [6, 7, 8, 9],
        },
        { type: 'play', notes: 'C3+C4:q E4:q G4:h | G2+B3:q D4:q G4:h | C3+C4:q E4:q G2+B3:q D4:q | C3+C4:q E4:q G2+D4:h', bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô 3 lấy gì từ ý nhạc?', en: 'What does measure 3 take from the idea?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4:q E4:q G4:h | B3:q D4:q G4:h | C4:q E4:q B3:q D4:q | C4:q E4:q D4:h ||', highlight: [6, 7, 8, 9] },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai nốt đầu của ý, cắt nhỏ ra', en: 'The first two notes of the idea, broken off' }, correct: true },
          { text: { vi: 'Cả ô 1, y nguyên', en: 'All of measure 1, unchanged' } },
          { text: { vi: 'Không gì, đó là ý mới', en: 'Nothing, it is a new idea' } },
        ],
      },
      reason: {
        vi: 'Ô 3 lặp hai nốt đi lên quãng 3 ({C}–{E}, rồi {B}–{D}), chính là phần đầu của ý nhạc ở ô 1 và ô 2.',
        en: 'Measure 3 repeats a rising third ({C}–{E}, then {B}–{D}), the start of the idea in measures 1 and 2.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phần sau là ý mới', en: 'Unrelated material' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Phần dẫn đến kết cũng có thể là chất liệu mới hẳn. Ở đây ô 1 được lặp y nguyên ở ô 2, rồi ô 3 và 4 đi một đường khác đến kết.',
            en: 'The material leading to the cadence can also be unrelated. Here measure 1 is repeated exactly in measure 2, then measures 3 and 4 take a new path to the cadence.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'G4:q E4:q C4:h | G4:q E4:q C4:h | A4:8 B4:8 C5:8 D5:8 E5:q C5:q | B4:q D5:q C5:h ||',
          labels: ['1', '', '', '2', '', '', '3', '', '', '', '', '', '4', '', ''],
          highlight: [0, 1, 2, 3, 4, 5],
        },
        { type: 'play', notes: 'G4:q E4:q C4:h | G4:q E4:q C4:h | A4:8 B4:8 C5:8 D5:8 E5:q C5:q | B4:q D5:q C5:h', bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc này có phải câu trình bày–phát triển không?', en: 'Is this phrase a sentence?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4:q D4:q E4:h | G4:8 G4:8 C5:q A4:h | E4:q G4:q C5:q B4:q | A4:q B4:q C5:h ||' },
        { type: 'play', notes: 'C4:q D4:q E4:h | G4:8 G4:8 C5:q A4:h | E4:q G4:q C5:q B4:q | A4:q B4:q C5:h', bpm: 100 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có', en: 'Yes' } },
          { text: { vi: 'Không', en: 'No' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ô 2 có tiết tấu và hướng đi khác hẳn ô 1, nên ý nhạc đầu không được lặp lại hay mô tiến.',
        en: 'Measure 2 has a different rhythm and direction from measure 1, so the opening idea is neither repeated nor sequenced.',
      },
    },
  ],
} satisfies Lesson
