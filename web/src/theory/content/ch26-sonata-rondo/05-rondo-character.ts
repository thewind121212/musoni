import type { Lesson } from '@/theory/types'

/**
 * Book 25.4 (rondo character) and 25.5 (standard forms in a multimovement
 * Classical piece). The book's listening examples are recordings; the
 * phrases here are our own.
 */
export default {
  id: 'rondo-character',
  title: { vi: 'Tính chất rondo và tác phẩm nhiều chương', en: 'Rondo character and multimovement works' },
  minutes: 4,
  sources: [
    { section: '25.4', url: 'https://musictheory.pugetsound.edu/mt21c/RondoCharacter.html' },
    { section: '25.5', url: 'https://musictheory.pugetsound.edu/mt21c/SonataAndRondoForms-6.html' },
  ],
  recap: [
    { vi: 'Tính chất rondo: nhanh, nhịp hai (2/4 hoặc 6/8), nhẹ, ngắt tiếng', en: 'Rondo character: quick, duple meter (2/4 or 6/8), light, staccato' },
    { vi: 'Chương cuối của tác phẩm Cổ điển thường mang tính chất rondo', en: 'The last movement of a Classical work is often in rondo character' },
    { vi: 'Chương 1 sonata; chương 2 ba phần, sonatina hoặc rondo năm phần', en: 'Movement 1 sonata form; movement 2 ternary, sonatina or five-part rondo' },
    { vi: 'Chương 3 minuet và trio; chương 4 rondo, sonata hoặc sonata-rondo', en: 'Movement 3 minuet and trio; movement 4 rondo, sonata or sonata rondo' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tính chất rondo', en: 'Rondo character' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tính chất rondo** (rondo character) gồm **nhịp độ** (tempo) nhanh, **nhịp hai** (duple meter) và vẻ nhẹ nhàng, thường nhờ lối chơi **ngắt tiếng** (staccato).',
            en: '**Rondo character** means a quick **tempo** in **duple meter** with a light character, usually from **staccato** articulation.',
          },
        },
        { type: 'staff', clef: 'treble', time: '2/4', notes: 'C5:8 E5:8 G5:8 E5:8 | F5:8 D5:8 B4:8 G4:8 | C5:8 E5:8 G5:8 C6:8 | B5:8 G5:8 C6:q ||' },
        {
          type: 'play',
          notes: 'C5:16 R:16 E5:16 R:16 G5:16 R:16 E5:16 R:16 | F5:16 R:16 D5:16 R:16 B4:16 R:16 G4:16 R:16 | C5:16 R:16 E5:16 R:16 G5:16 R:16 C6:16 R:16 | B5:16 R:16 G5:16 R:16 C6:q',
          bpm: 132,
          label: { vi: 'Nghe nhanh, nhẹ, ngắt tiếng', en: 'Hear it quick, light, staccato' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nào mang tính chất rondo?', en: 'Which phrase is in rondo character?' },
      blocks: [
        { type: 'play', notes: 'E4:h F4:q | G4:h. | A4:q G4:q F4:q | E4:h.', bpm: 60, label: { vi: 'Nghe câu 1', en: 'Hear phrase 1' } },
        { type: 'play', notes: 'G4:16 R:16 C5:16 R:16 E5:16 R:16 C5:16 R:16 | D5:16 R:16 B4:16 R:16 G4:q | G4:16 R:16 C5:16 R:16 E5:16 R:16 G5:16 R:16 | F5:16 R:16 D5:16 R:16 C5:q', bpm: 132, label: { vi: 'Nghe câu 2', en: 'Hear phrase 2' } },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Câu 1', en: 'Phrase 1' } },
          { text: { vi: 'Câu 2', en: 'Phrase 2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Câu 2 nhanh, nhịp hai, ngắt tiếng; câu 1 chậm, nhịp ba, liền tiếng.',
        en: 'Phrase 2 is quick, duple and staccato; phrase 1 is slow, triple and legato.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nhịp hai đơn hoặc phức', en: 'Simple or compound duple' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhịp hai đó có thể là nhịp đơn (2/4) hoặc nhịp phức (6/8). Thời Cổ điển, chương cuối của sonata, tứ tấu hay giao hưởng thường mang tính chất rondo.',
            en: 'The duple meter can be simple (2/4) or compound (6/8). In the Classical era, the final movement of a sonata, quartet or symphony was often in rondo character.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Không phải bản nào có hình thức rondo cũng mang tính chất rondo: hình thức là cách sắp xếp các đoạn, tính chất là cảm giác khi nghe.',
            en: 'Not every piece in rondo form is in rondo character: form is how the sections are arranged, character is how it feels.',
          },
        },
        { type: 'staff', clef: 'treble', time: '6/8', notes: 'C5:8 E5:8 G5:8 E5:8 D5:8 C5:8 | D5:8 F5:8 B4:8 D5:q. | E5:8 G5:8 C6:8 G5:8 E5:8 C5:8 | D5:8 B4:8 G4:8 C5:q. ||' },
        { type: 'play', notes: 'C5:8 E5:8 G5:8 E5:8 D5:8 C5:8 | D5:8 F5:8 B4:8 D5:q. | E5:8 G5:8 C6:8 G5:8 E5:8 C5:8 | D5:8 B4:8 G4:8 C5:q.', bpm: 120, label: { vi: 'Nghe tính chất rondo ở nhịp 6/8', en: 'Hear rondo character in 6/8' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Số chỉ nhịp nào hợp với tính chất rondo?', en: 'Which time signature fits rondo character?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '3/4', en: '3/4' } },
          { text: { vi: '6/8', en: '6/8' }, correct: true },
          { text: { vi: '9/8', en: '9/8' } },
        ],
      },
      reason: {
        vi: '6/8 là nhịp phức hai, còn 3/4 và 9/8 là nhịp ba.',
        en: '6/8 is compound duple, while 3/4 and 9/8 are triple.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tác phẩm nhiều chương', en: 'Multimovement works' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giao hưởng, tứ tấu đàn dây và sonata Cổ điển thường có bốn chương. Chương 1: hình thức sonata. Chương 2: **hình thức ba đoạn** (ternary form, A B A), sonatina hoặc rondo năm phần.',
            en: 'Classical symphonies, string quartets and sonatas often have four movements. First movement: sonata form. Second movement: **ternary form** (ABA), sonatina form or a five-part rondo.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chương 3: **minuet và trio** (minuet and trio), một **hình thức ba đoạn phức** (compound ternary). Chương 4: rondo, sonata hoặc sonata-rondo.',
            en: 'Third movement: **minuet and trio**, a **compound ternary** form. Fourth movement: rondo, sonata or sonata rondo form.',
          },
        },
        {
          type: 'play',
          notes: 'C5:8 E5:8 G5:8 E5:8 F5:8 D5:8 B4:q | E4:h G4:h | F4:w | C5:q E5:q G5:q | F5:h. | C5:16 R:16 E5:16 R:16 G5:16 R:16 C6:16 R:16 | B5:16 R:16 G5:16 R:16 C6:q',
          bpm: 110,
          label: { vi: 'Nghe bốn chương thu nhỏ', en: 'Hear four movements in miniature' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Chương 3 của một giao hưởng Cổ điển thường có hình thức gì?', en: 'What form does the third movement of a Classical symphony usually have?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hình thức sonata', en: 'Sonata form' } },
          { text: { vi: 'Minuet và trio', en: 'Minuet and trio' }, correct: true },
          { text: { vi: 'Sonata-rondo', en: 'Sonata rondo' } },
        ],
      },
      reason: {
        vi: 'Chương 3 thường là minuet và trio, một hình thức ba đoạn phức.',
        en: 'The third movement is usually a minuet and trio, a compound ternary form.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Chương nào gần như luôn có hình thức sonata?', en: 'Which movement is almost always in sonata form?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chương 1', en: 'The first' }, correct: true },
          { text: { vi: 'Chương 2', en: 'The second' } },
          { text: { vi: 'Chương 3', en: 'The third' } },
        ],
      },
      reason: {
        vi: 'Hình thức sonata còn được gọi là hình thức chương đầu vì nó thường ở chương 1.',
        en: 'Sonata form is also called first-movement form because it is the usual form of the first movement.',
      },
    },
  ],
} satisfies Lesson
