import type { Lesson } from '@/theory/types'

/**
 * Book 25.2: the four structural functions (after Temko and Spencer). The
 * book's Mozart, Haydn and Beethoven excerpts are images and recordings; each
 * function is shown here with a short passage of our own.
 */
export default {
  id: 'structural-functions',
  title: { vi: 'Bốn chức năng cấu trúc', en: 'The four structural functions' },
  minutes: 5,
  sources: [{ section: '25.2', url: 'https://musictheory.pugetsound.edu/mt21c/FourStructuralFunctions.html' }],
  recap: [
    { vi: 'Trình bày: một giọng vững, giai điệu rõ, câu nhạc rõ ràng', en: 'Expository: a stable key, clear melodies, well-defined phrases' },
    { vi: 'Chuyển tiếp: đi sang giọng khác, phần đệm sôi động, thường dừng ở kết lửng', en: 'Transitional: moves to another key, active accompaniment, often ends on a half cadence' },
    { vi: 'Phát triển: mô tiến, phân mảnh, chuyển qua nhiều giọng', en: 'Developmental: sequences, fragmentation, many keys' },
    { vi: 'Kết thúc: I và V luân phiên để khẳng định giọng', en: 'Terminative: I and V alternate to affirm the key' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chức năng trình bày', en: 'Expository function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Temko và Spencer nêu bốn **chức năng cấu trúc** (structural functions): trình bày, chuyển tiếp, phát triển và kết thúc.',
            en: 'Temko and Spencer list four **structural functions**: expository, transitional, developmental and terminative.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nhạc mang **chức năng trình bày** (expository function) giữ một giọng vững, giai điệu rõ, **câu nhạc** (phrase) rõ ràng. Chủ đề chính và chủ đề phụ thường mang chức năng này, và **kết** (cadence) đánh dấu ranh giới của chúng.',
            en: 'Music with **expository function** keeps a stable tonal center and clear melodies, with well-defined **phrases**. Primary and secondary themes usually have it, and **cadences** mark their edges.',
          },
        },
        {
          type: 'play',
          notes: 'C3+C5:q E5:q G5:q E5:q | G2+F5:8 E5:8 D5:8 C5:8 G2+B4:h | F2+A4:q C5:q F5:q A4:q | G2+G4:q B4:q C3+C5:h',
          bpm: 100,
          label: { vi: 'Nghe một chủ đề kết bằng kết chính hoàn toàn', en: 'Hear a theme closed by a perfect authentic cadence' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn này giữ một giọng và kết bằng kết chính hoàn toàn. Nó mang chức năng gì?', en: 'This passage stays in one key and ends with a perfect authentic cadence. What is its function?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'G', time: '4/4', notes: 'D5:h B4:q G4:q | A4:q B4:8 C5:8 D5:h | C5:q B4:q A4:q F#4:q | G4:h R:h ||' },
        { type: 'play', notes: 'G3+D5:h B4:q G4:q | D3+A4:q B4:8 C5:8 G3+D5:h | A3+C5:q B4:q D3+A4:q F#4:q | G3+G4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trình bày', en: 'Expository' }, correct: true },
          { text: { vi: 'Chuyển tiếp', en: 'Transitional' } },
          { text: { vi: 'Phát triển', en: 'Developmental' } },
        ],
      },
      reason: {
        vi: 'Một giọng vững, giai điệu rõ và một câu nhạc khép bằng kết là dấu hiệu của chức năng trình bày.',
        en: 'A stable key, a clear melody and a phrase closed by a cadence mark expository function.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chức năng chuyển tiếp', en: 'Transitional function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc mang **chức năng chuyển tiếp** (transitional function) đi từ giọng này sang giọng khác, thường với phần đệm sôi động hơn. Trong đó có thể có **ly điệu** (tonicization).',
            en: 'Music with **transitional function** moves from one tonal center to another, often with a more rhythmically active accompaniment. **Tonicizations** may occur in it.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đoạn chuyển còn gọi là cầu nối. Mozart và Haydn hay dừng nó ở **kết lửng** (half cadence) kèm một dấu lặng, báo hiệu chủ đề phụ sắp vào.',
            en: 'Transitions are sometimes called bridges. Mozart and Haydn often end one with a **half cadence** and a rest, to signal that the secondary theme is about to begin.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:8 E5:8 G5:8 E5:8 C5:8 E5:8 G5:8 E5:8 | C5:8 E5:8 A5:8 E5:8 C5:8 F#5:8 A5:8 F#5:8 | D5+F#5+A5:q R:q R:h ||' },
        { type: 'play', notes: 'C3+C5:8 E5:8 G5:8 E5:8 C5:8 E5:8 G5:8 E5:8 | A2+C5:8 E5:8 A5:8 E5:8 D3+C5:8 F#5:8 A5:8 F#5:8 | D3+D5+F#5+A5:q', bpm: 110, label: { vi: 'Nghe đoạn chuyển dừng ở V của {G}', en: 'Hear a transition stop on V of {G}' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Chức năng phát triển', en: 'Developmental function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc mang **chức năng phát triển** (developmental function) có **mô tiến** (sequence) và **phân mảnh** (fragmentation) giai điệu cũ, chuyển qua nhiều giọng. Câu nhạc có thể dài ngắn bất thường, có **gối câu** (elision) khiến người nghe chênh vênh.',
            en: 'Music with **developmental function** uses **sequences** and **fragmentation** of earlier melodies and modulates through several keys. Phrase lengths may be irregular, and **elisions** keep the listener off balance.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chuyển tiếp và phát triển đôi khi khó phân biệt. Phần phát triển thường dài hơn, nhiều đoạn nhỏ hơn và chuyển giọng nhiều lần hơn.',
            en: 'Transitional and developmental music can be hard to tell apart. A development is usually longer, with more varied sections and more modulations.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'F5:8 E5:8 D5:8 C5:8 B4:h | Eb5:8 D5:8 C5:8 Bb4:8 A4:h | D5:8 C5:8 Bb4:8 A4:8 G4:h ||' },
        { type: 'play', notes: 'G2+F5:8 E5:8 D5:8 C5:8 G2+B4:h | F2+Eb5:8 D5:8 C5:8 Bb4:8 F2+A4:h | G2+D5:8 C5:8 Bb4:8 A4:8 G2+G4:h', bpm: 100, label: { vi: 'Nghe một mảnh đi mô tiến', en: 'Hear a fragment in sequence' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn này đi từ {C} sang giọng mới rồi dừng ở kết lửng, kèm dấu lặng. Nó mang chức năng gì?', en: 'This passage leaves {C} for a new key and stops on a half cadence and a rest. What is its function?' },
      blocks: [
        { type: 'play', notes: 'C3+C5:8 E5:8 G5:8 E5:8 C5:8 E5:8 G5:8 E5:8 | A2+C5:8 E5:8 A5:8 E5:8 D3+C5:8 F#5:8 A5:8 F#5:8 | D3+D5+F#5+A5:q R:q R:h', bpm: 110 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trình bày', en: 'Expository' } },
          { text: { vi: 'Chuyển tiếp', en: 'Transitional' }, correct: true },
          { text: { vi: 'Kết thúc', en: 'Terminative' } },
        ],
      },
      reason: {
        vi: 'Đoạn ngắn này chuyển một lần sang giọng mới và dừng ở kết lửng, đúng kiểu đoạn chuyển của Mozart và Haydn.',
        en: 'This short passage moves once to a new key and stops on a half cadence, just like a Mozart or Haydn transition.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chức năng kết thúc', en: 'Terminative function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc mang **chức năng kết thúc** (terminative function) cho hợp âm I và V luân phiên dồn dập để khẳng định giọng. Chủ đề kết của sonata mang chức năng này.',
            en: 'Music with **terminative function** uses an emphatic alternation of I and V to affirm the key. The closing theme of a sonata has this function.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+E4+G4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:q G2+D4+G4+B4:q | C3+E4+G4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:h | C3+E4+G4+C5:q R:q C3+E4+G4+C5:h ||',
          labels: ['I', 'V', 'I', 'V', 'I', 'V', 'I', 'I', '', 'I'],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:q G2+D4+G4+B4:q | C3+E4+G4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:h | C3+E4+G4+C5:q R:q C3+E4+G4+C5:h', bpm: 110 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Một mảnh giai điệu được nhắc lại ở các cao độ khác nhau, qua nhiều giọng. Đó là chức năng gì?', en: 'A melodic fragment is restated at different pitch levels, through several keys. Which function is that?' },
      blocks: [
        { type: 'play', notes: 'C5:8 D5:8 E5:8 C5:8 G5:q R:q | Bb4:8 C5:8 D5:8 Bb4:8 F5:q R:q | Ab4:8 Bb4:8 C5:8 Ab4:8 Eb5:q R:q', bpm: 110 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phát triển', en: 'Developmental' }, correct: true },
          { text: { vi: 'Kết thúc', en: 'Terminative' } },
          { text: { vi: 'Trình bày', en: 'Expository' } },
        ],
      },
      reason: {
        vi: 'Phân mảnh, mô tiến và chuyển qua nhiều giọng là dấu hiệu của chức năng phát triển.',
        en: 'Fragmentation, sequence and a string of keys mark developmental function.',
      },
    },
  ],
} satisfies Lesson
