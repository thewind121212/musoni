import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after 25.6 Practice Exercises: name a passage's
 * structural function by ear, put a sonata's sections in order, find keys
 * from a key plan. The book's excerpts are recordings; ours are our own.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 26', en: 'Chapter 26 review' },
  minutes: 4,
  sources: [{ section: '25.6', url: 'https://musictheory.pugetsound.edu/mt21c/SonataAndRondoPracticeExercises.html' }],
  recap: [
    { vi: 'Sonata: trình bày, phát triển, tái hiện', en: 'Sonata: exposition, development, recapitulation' },
    { vi: 'Bốn chức năng: trình bày, chuyển tiếp, phát triển, kết thúc', en: 'Four functions: expository, transitional, developmental, terminative' },
    { vi: 'Rondo: đoạn điệp ở giọng chủ xen kẽ các đoạn xen', en: 'Rondo: a refrain in tonic alternating with episodes' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Đoạn này mang chức năng cấu trúc nào?', en: 'What structural function does this passage have?' },
      blocks: [
        { type: 'play', notes: 'C3+E4+G4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:q G2+D4+G4+B4:q | C3+E4+G4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:h | C3+E4+G4+C5:q R:q C3+E4+G4+C5:h', bpm: 110 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chuyển tiếp', en: 'Transitional' } },
          { text: { vi: 'Phát triển', en: 'Developmental' } },
          { text: { vi: 'Kết thúc', en: 'Terminative' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hợp âm I và V luân phiên dồn dập để khẳng định giọng: đó là chức năng kết thúc.',
        en: 'I and V alternate emphatically to affirm the key: that is terminative function.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Chuyển tiếp và phát triển đều chuyển giọng. Loại nào thường dài hơn và qua nhiều giọng hơn?',
        en: 'Transitional and developmental music both modulate. Which is usually longer, with more keys?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phát triển', en: 'Developmental' }, correct: true },
          { text: { vi: 'Chuyển tiếp', en: 'Transitional' } },
        ],
      },
      reason: {
        vi: 'Phần phát triển dài hơn đoạn chuyển, có nhiều đoạn nhỏ hơn và chuyển giọng nhiều lần hơn.',
        en: 'A development is longer than a transition, with more sections and more modulations.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Thứ tự nào đúng cho phần trình bày của sonata?', en: 'Which order is right for a sonata’s exposition?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ đề chính, chủ đề phụ, đoạn chuyển, chủ đề kết', en: 'Primary theme, secondary theme, transition, closing theme' } },
          { text: { vi: 'Chủ đề chính, đoạn chuyển, chủ đề phụ, chủ đề kết', en: 'Primary theme, transition, secondary theme, closing theme' }, correct: true },
          { text: { vi: 'Đoạn chuyển, chủ đề chính, chủ đề kết, chủ đề phụ', en: 'Transition, primary theme, closing theme, secondary theme' } },
        ],
      },
      reason: {
        vi: 'Đoạn chuyển nằm giữa hai chủ đề, đưa nhạc từ giọng của chủ đề chính sang giọng của chủ đề phụ.',
        en: 'The transition sits between the two themes, taking the music from the primary theme’s key to the secondary theme’s.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Sonata ở giọng {E} thứ. Trong phần trình bày, chủ đề phụ ở III. Chủ âm của giọng đó là nốt nào?',
        en: 'A sonata is in {E} minor. In the exposition the secondary theme is in III. What is that key’s tonic?',
      },
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Bậc III của {E} thứ là {G}, nên chủ đề phụ ở {G} trưởng, giọng song song trưởng.',
        en: 'The third degree of {E} minor is {G}, so the secondary theme is in {G} major, the relative major.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một chương có phần trình bày rồi tái hiện ngay, không có phần phát triển. Đó là hình thức gì?',
        en: 'A movement has an exposition followed straight by a recapitulation, with no development. What form is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hình thức sonatina', en: 'Sonatina form' }, correct: true },
          { text: { vi: 'Sonata một chủ đề', en: 'A monothematic sonata' } },
          { text: { vi: 'Rondo năm phần', en: 'A five-part rondo' } },
        ],
      },
      reason: {
        vi: 'Hình thức sonatina là hình thức sonata bỏ phần phát triển.',
        en: 'Sonatina form is sonata form without the development.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Rondo bảy phần thường có hình thức nào?', en: 'What form does a seven-part rondo typically have?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A B A C A', en: 'ABACA' } },
          { text: { vi: 'A B A C A B A', en: 'ABACABA' }, correct: true },
          { text: { vi: 'A B A B A', en: 'ABABA' } },
        ],
      },
      reason: {
        vi: 'Đoạn điệp A vang bốn lần, xen giữa là B, C rồi B: bảy phần.',
        en: 'The refrain A sounds four times, with B, C and B between: seven parts.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một rondo ở giọng {G} trưởng. Đoạn xen B thường ở giọng nào? Chọn chủ âm của giọng đó.',
        en: 'A rondo is in {G} major. What key is its B section usually in? Pick that key’s tonic.',
      },
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Ở giọng trưởng, đoạn B thường ở giọng át, và át âm của {G} trưởng là {D}.',
        en: 'In major the B section is usually in the dominant, and the dominant of {G} major is {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Chương nào nhiều khả năng mang tính chất rondo nhất?', en: 'Which movement is most likely in rondo character?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chương cuối, nhanh, nhịp 2/4, ngắt tiếng', en: 'A quick final movement in 2/4, staccato' }, correct: true },
          { text: { vi: 'Chương chậm, nhịp 3/4, liền tiếng', en: 'A slow movement in 3/4, legato' } },
          { text: { vi: 'Minuet và trio, nhịp 3/4', en: 'A minuet and trio in 3/4' } },
        ],
      },
      reason: {
        vi: 'Tính chất rondo là nhanh, nhịp hai, nhẹ nhàng, và hay gặp ở chương cuối.',
        en: 'Rondo character is quick, duple and light, and it is common in final movements.',
      },
    },
  ],
} satisfies Lesson
