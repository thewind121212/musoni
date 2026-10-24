import type { Lesson } from '@/theory/types'

/** Book 33.4 (interval class, interval vector), 33.5 (Forte numbers, Z-relations) and 33.6 (lists of set classes, as a reference). */
export default {
  id: 'interval-vector',
  title: { vi: 'Vectơ quãng và số Forte', en: 'Interval vectors and Forte numbers' },
  minutes: 5,
  sources: [
    { section: '33.4', url: 'https://musictheory.pugetsound.edu/mt21c/IntervalVector.html' },
    { section: '33.5', url: 'https://musictheory.pugetsound.edu/mt21c/ForteNumbers.html' },
    { section: '33.6', url: 'https://musictheory.pugetsound.edu/mt21c/ListsOfSetClasses.html' },
  ],
  recap: [
    { vi: 'Lớp quãng là khoảng ngắn nhất giữa hai nốt, từ 1 đến 6', en: 'An interval class is the shortest distance between two notes, 1 to 6' },
    { vi: 'Vectơ quãng đếm mọi lớp quãng trong tập hợp, luôn 6 chữ số', en: 'An interval vector counts every interval class in a set, always 6 digits' },
    { vi: 'Số Forte như 3–11: số nốt, rồi vị trí trong danh sách', en: 'A Forte number like 3–11: the number of notes, then the place in the list' },
    { vi: 'Chữ Z: khác dạng nguyên mẫu nhưng cùng vectơ quãng', en: 'A Z: different prime forms with the same interval vector' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Lớp quãng', en: 'Interval class' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Lớp quãng** (interval class, ic) là khoảng ngắn nhất giữa hai nốt, tính bằng nửa cung. Từ {C} lên {A} là 9, nhưng từ {C} xuống {A} chỉ 3, nên đó là ic3.',
            en: 'An **interval class** (ic) is the shortest distance between two notes, in half steps. {C} up to {A} is 9, but {C} down to {A} is only 3, so it is ic3.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Vì vậy lớp quãng lớn nhất là 6, quãng ba cung. Quãng 5 đúng {C}–{G} là ic5, vì từ {C} xuống {G} là quãng 4 đúng.',
            en: 'So the largest interval class is 6, the tritone. A perfect 5th {C}–{G} is ic5, since {C} down to {G} is a perfect 4th.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 A4 | C5 A4', labels: ['0', '9', '0', '9'] },
        { type: 'play', notes: 'C4 A4 C5 A4', label: { vi: 'Nghe lên 9, rồi xuống 3', en: 'Hear up 9, then down 3' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng 10 nửa cung thuộc lớp quãng nào?', en: 'Which interval class is an interval of 10 half steps?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 Bb4', labels: ['0', '10'] },
        { type: 'play', notes: 'C4 Bb4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ic2', en: 'ic2' }, correct: true },
          { text: { vi: 'ic4', en: 'ic4' } },
          { text: { vi: 'ic10', en: 'ic10' } },
        ],
      },
      reason: {
        vi: 'Đi theo chiều kia chỉ 12 − 10 = 2 nửa cung, và không có lớp quãng nào lớn hơn 6.',
        en: 'The other way round it is only 12 − 10 = 2 half steps, and no interval class is larger than 6.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Vectơ quãng', en: 'The interval vector' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Vectơ quãng** (interval vector) liệt kê mọi lớp quãng trong một tập hợp. Đo từ nốt đầu đến mọi nốt còn lại, rồi từ nốt thứ hai đến các nốt sau nó, cứ thế đến hết.',
            en: 'An **interval vector** lists every interval class in a set. Measure from the first note to all the others, then from the second note to the notes after it, and so on.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Với {C} {E} {G}: 0–4 là ic4, 0–7 là ic5, 4–7 là ic3. Đếm ic1 đến ic6 được 001110; vectơ luôn có 6 chữ số, ghi 0 cho lớp quãng không có.',
            en: 'For {C} {E} {G}: 0–4 is ic4, 0–7 is ic5 and 4–7 is ic3. Counting ic1 to ic6 gives 001110; a vector always has 6 digits, with 0 for a missing class.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4', labels: ['0', '4', '7'] },
        { type: 'keys', notes: 'C4 E4 G4', caption: { vi: 'Vectơ 001110:', en: 'Vector 001110:' } },
        { type: 'play', notes: 'C4+E4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Vectơ quãng của tập hợp này là gì?', en: 'What is the interval vector of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'B4 D5 F5', labels: ['11', '2', '5'] },
        { type: 'play', notes: 'B4+D5+F5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '001110', en: '001110' } },
          { text: { vi: '002001', en: '002001' }, correct: true },
          { text: { vi: '020100', en: '020100' } },
        ],
      },
      reason: {
        vi: '11–2 và 2–5 đều là ic3, còn 11–5 là ic6, nên vectơ là 002001.',
        en: '11–2 and 2–5 are both ic3 and 11–5 is ic6, so the vector is 002001.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Số Forte', en: 'Forte numbers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Allen Forte lập danh mục mọi tập hợp từ 3 đến 9 nốt và gắn cho mỗi dạng nguyên mẫu một **số Forte** (Forte number), như 3–11. Số đầu là số nốt, số sau là vị trí trong danh sách.',
            en: 'Allen Forte cataloged every set of 3 to 9 notes and gave each prime form a **Forte number**, such as 3–11. The first number is how many notes it has, the second its place in the list.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Danh sách các **lớp tập hợp** (set classes) ghi dạng nguyên mẫu, số Forte và vectơ quãng cạnh nhau. Hợp âm trưởng và thứ có chung (037), tức 3–11, vectơ 001110.',
            en: 'Lists of **set classes** show the prime form, Forte number and interval vector side by side. Major and minor triads share (037), which is 3–11, vector 001110.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 C4+Eb4+G4' },
        { type: 'play', notes: 'C4+E4+G4 C4+Eb4+G4' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Quan hệ Z', en: 'Z-relations' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chữ Z trong số Forte, như 4–Z29, viết tắt “zygotic” (sinh đôi). Nó đánh dấu **quan hệ Z** (Z-relation): hai dạng nguyên mẫu khác nhau nhưng có cùng vectơ quãng.',
            en: 'The Z in a Forte number such as 4–Z29 stands for “zygotic” (twinned). It marks a **Z-relation**: two different prime forms with the same interval vector.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '4–Z15 (0146) và 4–Z29 (0137) đều có vectơ 111111: mỗi lớp quãng xuất hiện đúng một lần.',
            en: '4–Z15 (0146) and 4–Z29 (0137) both have the vector 111111: each interval class occurs exactly once.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 C#4 E4 F#4 | C4 C#4 Eb4 G4', labels: ['0', '1', '4', '6', '0', '1', '3', '7'] },
        { type: 'play', notes: 'C4+C#4+E4+F#4 C4+C#4+Eb4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai tập hợp có quan hệ Z thì có gì giống nhau?', en: 'What do two Z-related sets share?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Dạng nguyên mẫu', en: 'The prime form' } },
          { text: { vi: 'Vectơ quãng', en: 'The interval vector' }, correct: true },
          { text: { vi: 'Dạng chuẩn', en: 'The normal form' } },
        ],
      },
      reason: {
        vi: 'Quan hệ Z nối hai dạng nguyên mẫu khác nhau có cùng vectơ quãng.',
        en: 'A Z-relation links two different prime forms that have the same interval vector.',
      },
    },
  ],
} satisfies Lesson
