import type { Lesson } from '@/theory/types'

/**
 * Book 25.1.2-25.1.4: sonatina form, the sonata principle (after Charles
 * Rosen) and Haydn's monothematic sonata. The examples are our own small
 * themes, not quotations.
 */
export default {
  id: 'sonatina-principle',
  title: { vi: 'Sonatina, nguyên tắc sonata, sonata một chủ đề', en: 'Sonatina, sonata principle, monothematic sonata' },
  minutes: 4,
  sources: [{ section: '25.1', url: 'https://musictheory.pugetsound.edu/mt21c/SonataIntroduction.html' }],
  recap: [
    { vi: 'Hình thức sonatina là sonata không có phần phát triển', en: 'Sonatina form is sonata form without the development' },
    { vi: 'Nguyên tắc sonata: chủ đề phụ ngoài giọng chủ phải trở về giọng chủ', en: 'Sonata principle: a secondary theme outside the tonic must return in the tonic' },
    { vi: 'Sonata một chủ đề nhắc lại chủ đề chính ở giọng át', en: 'A monothematic sonata restates the primary theme in the dominant' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hình thức sonatina', en: 'Sonatina form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '“Sonatina” đôi khi chỉ một bản sonata ngắn hoặc dễ. Nhưng về hình thức, **hình thức sonatina** (sonatina form) là hình thức sonata không có phần phát triển: trình bày rồi tái hiện ngay.',
            en: '“Sonatina” sometimes means a short or easy sonata. But as a form, **sonatina form** is sonata form without the development: the exposition, then straight to the recapitulation.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ta gặp nó ở chương chậm thứ hai của giao hưởng và ở các khúc mở màn, như “Khúc mở màn nhỏ” trong vở Kẹp hạt dẻ của Tchaikovsky.',
            en: 'It turns up in the slow second movement of a symphony and in overtures, such as the “Miniature Overture” from Tchaikovsky’s The Nutcracker.',
          },
        },
        {
          type: 'play',
          notes: 'C5:q E5:q G5:q E5:q | D5:8 F5:8 B4:8 D5:8 C5:h | B4:h A4:8 B4:8 C5:8 A4:8 | F#4:q A4:q G4:h | C5:q E5:q G5:q E5:q | D5:8 F5:8 B4:8 D5:8 C5:h | E4:h D4:8 E4:8 F4:8 D4:8 | B3:q D4:q C4:h',
          bpm: 110,
          label: { vi: 'Nghe một sonatina nhỏ', en: 'Hear a tiny sonatina' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hình thức sonatina khác hình thức sonata ở chỗ nào?', en: 'How does sonatina form differ from sonata form?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Không có phần phát triển', en: 'It has no development' }, correct: true },
          { text: { vi: 'Không có phần tái hiện', en: 'It has no recapitulation' } },
          { text: { vi: 'Không có chủ đề phụ', en: 'It has no secondary theme' } },
        ],
      },
      reason: {
        vi: 'Sonatina đi thẳng từ phần trình bày sang phần tái hiện, bỏ phần phát triển.',
        en: 'A sonatina goes straight from the exposition to the recapitulation, leaving out the development.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nguyên tắc sonata', en: 'The sonata principle' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Theo Charles Rosen, phần trình bày đặt giọng chủ đối lập với giọng át. Chất liệu ngoài giọng chủ giống như một nghịch âm ở quy mô lớn.',
            en: 'For Charles Rosen, the exposition sets the tonic against the dominant. The material outside the tonic acts like a large-scale dissonance.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chỉ quay về giọng chủ thôi chưa đủ: cả đoạn ngoài giọng chủ phải được giải quyết. Đó là **nguyên tắc sonata** (sonata principle): chủ đề phụ trở lại ở giọng chủ.',
            en: 'Simply bringing back the tonic is not enough: the whole section outside the tonic must be resolved. This is the **sonata principle**: the secondary theme comes back in the tonic.',
          },
        },
        { type: 'play', notes: 'D5:h B4:q G4:q | A4:q B4:8 C5:8 D5:h | C5:q B4:q A4:q F#4:q | G4:h', label: { vi: 'Nghe chủ đề phụ ở giọng {G}', en: 'Hear the secondary theme in {G}' } },
        { type: 'play', notes: 'G4:h E4:q C4:q | D4:q E4:8 F4:8 G4:h | F4:q E4:q D4:q B3:q | C4:h', label: { vi: 'Nghe nó được giải quyết ở giọng {C}', en: 'Hear it resolved in {C}' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Theo nguyên tắc sonata, chủ đề phụ được giải quyết thế nào?', en: 'Under the sonata principle, how is the secondary theme resolved?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Lặp lại ở giọng át', en: 'It repeats in the dominant' } },
          { text: { vi: 'Trở lại ở giọng chủ trong phần tái hiện', en: 'It returns in the tonic in the recapitulation' }, correct: true },
          { text: { vi: 'Bị bỏ đi ở phần tái hiện', en: 'It is left out of the recapitulation' } },
        ],
      },
      reason: {
        vi: 'Chất liệu từng vang ngoài giọng chủ được giải quyết khi nó trở lại ở giọng chủ.',
        en: 'Material first heard outside the tonic is resolved when it returns in the tonic.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Sonata một chủ đề', en: 'The monothematic sonata' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Haydn rất thích nhắc lại chủ đề chính ở giọng át, đúng chỗ thường dành cho chủ đề phụ. Đó là **sonata một chủ đề** (monothematic sonata).',
            en: 'Haydn was especially fond of restating the primary theme in the dominant, where the secondary theme would normally occur. This is a **monothematic sonata**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Điều này cho thấy với sonata, kế hoạch giọng quan trọng không kém các chủ đề.',
            en: 'It shows that the tonal design of a sonata mattered as much as its thematic design.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', time: '4/4', notes: 'G4:q B4:q D5:q B4:q | C5:8 B4:8 A4:8 G4:8 F#4:h | E4:q G4:q C5:q E4:q | D4:q F#4:q G4:h ||' },
        { type: 'play', notes: 'C5:q E5:q G5:q E5:q | F5:8 E5:8 D5:8 C5:8 B4:h | A4:q C5:q F5:q A4:q | G4:q B4:q C5:h | G4:q B4:q D5:q B4:q | C5:8 B4:8 A4:8 G4:8 F#4:h | E4:q G4:q C5:q E4:q | D4:q F#4:q G4:h', bpm: 110, label: { vi: 'Nghe chủ đề chính ở {C}, rồi ở {G}', en: 'Hear the primary theme in {C}, then in {G}' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trong một sonata một chủ đề của Haydn, ở chỗ của chủ đề phụ ta nghe gì?',
        en: 'In one of Haydn’s monothematic sonatas, what do you hear where the secondary theme would be?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một chủ đề mới ở giọng chủ', en: 'A new theme in the tonic' } },
          { text: { vi: 'Chủ đề chính ở giọng át', en: 'The primary theme in the dominant' }, correct: true },
          { text: { vi: 'Phần phát triển', en: 'The development' } },
        ],
      },
      reason: {
        vi: 'Haydn giữ kế hoạch giọng (sang giọng át) nhưng dùng lại chủ đề chính thay cho chủ đề mới.',
        en: 'Haydn keeps the key plan (a move to the dominant) but reuses the primary theme instead of a new one.',
      },
    },
  ],
} satisfies Lesson
