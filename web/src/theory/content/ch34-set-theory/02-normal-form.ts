import type { Lesson } from '@/theory/types'

/** Book 33.2: normal form, its steps and the two tie rules (Rahn's method, as the book uses). */
export default {
  id: 'normal-form',
  title: { vi: 'Dạng chuẩn', en: 'Normal form' },
  minutes: 5,
  sources: [{ section: '33.2', url: 'https://musictheory.pugetsound.edu/mt21c/NormalForm.html' }],
  recap: [
    { vi: 'Dạng chuẩn là cách xếp gọn nhất của một tập hợp', en: 'Normal form is the most compact ordering of a set' },
    { vi: 'Xếp các số tăng dần, bỏ số trùng, rồi thử bắt đầu từ mỗi số', en: 'Put the integers in ascending order, drop repeats, then try starting on each one' },
    { vi: 'Hòa thì so từ số đầu đến số áp chót; hòa nữa thì chọn số đầu nhỏ hơn', en: 'On a tie, compare first to second-to-last; still tied, pick the smaller first number' },
    { vi: 'Viết trong ngoặc vuông, có dấu phẩy: [9, 11, 2, 3]', en: 'Written in square brackets with commas: [9, 11, 2, 3]' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Xếp tăng dần', en: 'In ascending order' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dạng chuẩn** (normal form) viết các nốt của một tập hợp lớp cao độ theo cách gọn nhất. Bước 1: xếp các số tăng dần như một gam và bỏ những số trùng.',
            en: '**Normal form** writes the notes of a pitch-class set in their most compact form. Step 1: put the integers in ascending order, like a scale, and drop any repeats.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B3 D4 A4 D5 Eb5', labels: ['11', '2', '9', '2', '3'] },
        { type: 'play', notes: 'B3 D4 A4 D5 Eb5' },
        {
          type: 'tip',
          text: {
            vi: 'Các nốt này cho 11, 2, 9, 2, 3. Bỏ số 2 trùng và xếp lại: 2, 3, 9, 11.',
            en: 'These notes give 11, 2, 9, 2, 3. Drop the repeated 2 and sort: 2, 3, 9, 11.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm cách xếp gọn nhất', en: 'Find the most compact ordering' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bước 2: lần lượt bắt đầu từ mỗi số và đo khoảng từ số đầu đến số cuối. [2, 3, 9, 11] dài 9, [3, 9, 11, 2] dài 11, [9, 11, 2, 3] dài 6, [11, 2, 3, 9] dài 10.',
            en: 'Step 2: start on each integer in turn and measure from the first to the last. [2, 3, 9, 11] spans 9, [3, 9, 11, 2] spans 11, [9, 11, 2, 3] spans 6, [11, 2, 3, 9] spans 10.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cách xếp ngắn nhất, [9, 11, 2, 3], là dạng chuẩn. Dạng chuẩn viết trong ngoặc vuông, có dấu phẩy.',
            en: 'The shortest, [9, 11, 2, 3], is the normal form. Normal form is written in square brackets with commas.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4 B4 D5 Eb5', labels: ['9', '11', '2', '3'] },
        { type: 'keys', notes: 'A4 B4 D5 Eb5', caption: { vi: 'Bốn nốt nằm sát nhau:', en: 'Four notes close together:' } },
        { type: 'play', notes: 'A4 B4 D5 Eb5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng chuẩn của tập hợp này là gì?', en: 'What is the normal form of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 Eb4 Bb4', labels: ['0', '3', '10'] },
        { type: 'play', notes: 'C4 Eb4 Bb4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[0, 3, 10]', en: '[0, 3, 10]' } },
          { text: { vi: '[3, 10, 0]', en: '[3, 10, 0]' } },
          { text: { vi: '[10, 0, 3]', en: '[10, 0, 3]' }, correct: true },
        ],
      },
      reason: {
        vi: '[0, 3, 10] dài 10, [3, 10, 0] dài 9, còn [10, 0, 3] chỉ dài 5.',
        en: '[0, 3, 10] spans 10 and [3, 10, 0] spans 9, but [10, 0, 3] spans only 5.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khi hai cách xếp bằng nhau', en: 'When two orderings tie' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu hai cách xếp dài bằng nhau, chọn cách có khoảng từ số đầu đến số áp chót ngắn hơn. Với 0, 4, 7, 11, cả [4, 7, 11, 0] và [11, 0, 4, 7] đều dài 8, nhưng 4 đến 11 là 7, còn 11 đến 4 chỉ là 5.',
            en: 'If two orderings span the same, choose the one with the smaller span from the first to the second-to-last number. With 0, 4, 7, 11, both [4, 7, 11, 0] and [11, 0, 4, 7] span 8, but 4 to 11 is 7 while 11 to 4 is only 5.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Vậy dạng chuẩn là [11, 0, 4, 7]. Nếu vẫn hòa hoàn toàn, chọn cách bắt đầu bằng số nhỏ hơn: 0, 1, 6, 7 cho [0, 1, 6, 7], không phải [6, 7, 0, 1].',
            en: 'So the normal form is [11, 0, 4, 7]. If it is still a complete tie, choose the one that starts on the smaller number: 0, 1, 6, 7 gives [0, 1, 6, 7], not [6, 7, 0, 1].',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B3 C4 E4 G4', labels: ['11', '0', '4', '7'] },
        { type: 'play', notes: 'B3 C4 E4 G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng chuẩn của tập hợp này là gì?', en: 'What is the normal form of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F#4 B4 C#5', labels: ['6', '11', '1'] },
        { type: 'play', notes: 'F#4 B4 C#5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[6, 11, 1]', en: '[6, 11, 1]' } },
          { text: { vi: '[11, 1, 6]', en: '[11, 1, 6]' }, correct: true },
          { text: { vi: '[1, 6, 11]', en: '[1, 6, 11]' } },
        ],
      },
      reason: {
        vi: '[6, 11, 1] và [11, 1, 6] cùng dài 7, nhưng 11 đến 1 là 2, ngắn hơn 6 đến 11 là 5.',
        en: '[6, 11, 1] and [11, 1, 6] both span 7, but 11 to 1 is 2, smaller than 6 to 11, which is 5.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng chuẩn của 1, 2, 7, 8 là gì?', en: 'What is the normal form of 1, 2, 7, 8?' },
      blocks: [{ type: 'keys', notes: 'C#4 D4 G4 Ab4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[1, 2, 7, 8]', en: '[1, 2, 7, 8]' }, correct: true },
          { text: { vi: '[7, 8, 1, 2]', en: '[7, 8, 1, 2]' } },
          { text: { vi: '[2, 7, 8, 1]', en: '[2, 7, 8, 1]' } },
        ],
      },
      reason: {
        vi: '[1, 2, 7, 8] và [7, 8, 1, 2] hòa ở cả hai phép đo, nên chọn cách bắt đầu bằng số nhỏ hơn.',
        en: '[1, 2, 7, 8] and [7, 8, 1, 2] tie on both measures, so choose the one that starts on the smaller number.',
      },
    },
  ],
} satisfies Lesson
