import type { Lesson } from '@/theory/types'

/** Book 26.1-26.2: voice leading, SATB in chorale and piano style, the four types of motion. */
export default {
  id: 'voices-motion',
  title: { vi: 'Bốn bè và các kiểu chuyển động', en: 'Four voices and types of motion' },
  minutes: 4,
  sources: [
    { section: '26.1', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeading.html' },
    { section: '26.2', url: 'https://musictheory.pugetsound.edu/mt21c/TypesOfMotion.html' },
  ],
  recap: [
    { vi: 'Dẫn bè là quy tắc cho đường đi của từng bè giữa các hợp âm', en: 'Voice leading is the rules for how each voice moves between chords' },
    { vi: 'SATB: soprano, alto, tenor, bass; kiểu hợp xướng chia hai bè mỗi khuông', en: 'SATB: soprano, alto, tenor, bass; chorale style puts two voices on each staff' },
    { vi: 'Hai bè đi ngược chiều, xiên, cùng chiều hoặc song song', en: 'Two voices move in contrary, oblique, similar or parallel motion' },
    { vi: 'Song song là cùng chiều và giữ nguyên quãng', en: 'Parallel motion is similar motion that keeps the same interval' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Dẫn bè và bốn bè', en: 'Voice leading and four voices' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dẫn bè** (voice leading) là các quy tắc cho đường đi giai điệu của từng **bè** (voice) khi hợp âm nối nhau. Mục đích: các bè độc lập, hợp âm xếp tốt, và mỗi bè đi gọn, dễ hát.',
            en: '**Voice leading** (also called part writing) is the rules for the melodic motion of each **voice** in a harmonic progression. The aims: independent parts, well-voiced chords, and smooth, singable lines.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Viết SATB là viết bốn bè: **bè soprano** (S), **bè alto** (A), **bè tenor** (T) và **bè bass** (B), từ cao xuống thấp.',
            en: 'SATB writing is in four parts: the **soprano** (S), **alto** (A), **tenor** (T) and **bass** (B) voices, from highest to lowest.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3 G3 E4 C5 C3+G3+E4+C5', labels: ['B', 'T', 'A', 'S', ''] },
        { type: 'play', notes: 'C3 G3 E4 C5 C3+G3+E4+C5', label: { vi: 'Nghe từng bè rồi cả hợp âm', en: 'Hear each voice, then the chord' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Kiểu hợp xướng và kiểu piano', en: 'Chorale style and piano style' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm 1 viết **kiểu hợp xướng** (chorale style): soprano và alto ở khuông trên, tenor và bass ở khuông dưới. Hợp âm 2 viết **kiểu piano** (piano style): ba bè trên ở khuông trên cho tay phải, chỉ bass ở khuông dưới.',
            en: 'Chord 1 is in **chorale style**: soprano and alto on the upper staff, tenor and bass on the lower. Chord 2 is in **piano style**: the three upper voices on the upper staff for the right hand, only the bass below.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+G3+E4+C5 C3+E4+G4+C5', labels: ['1', '2'] },
        { type: 'play', notes: 'C3+G3+E4+C5 C3+E4+G4+C5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm viết kiểu hợp xướng. Bè alto hát nốt nào?', en: 'This chord is in chorale style. Which note does the alto sing?' },
      blocks: [{ type: 'staff', clef: 'grand', notes: 'F2+A3+F4+C5' }],
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Alto là nốt thấp ở khuông trên: {F4}; nốt cao {C5} là soprano.',
        en: 'The alto is the lower note on the upper staff, {F4}; the higher one, {C5}, is the soprano.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ngược chiều và xiên', en: 'Contrary and oblique motion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở cặp 1, hai bè đi ngược hướng nhau: **chuyển động ngược chiều** (contrary motion). Ở cặp 2, một bè đứng yên còn bè kia đi lên hoặc xuống: **chuyển động xiên** (oblique motion).',
            en: 'In pair 1 the two voices move in opposite directions: **contrary motion**. In pair 2 one voice stays the same while the other moves up or down: **oblique motion**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4 D4+A4 | E4+G4 E4+A4 ||', labels: ['1', '', '2', ''] },
        { type: 'play', notes: 'E4+G4:h D4+A4:h E4+G4:h E4+A4:h' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Cùng chiều và song song', en: 'Similar and parallel motion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở cặp 1, hai bè cùng đi lên nhưng quãng giữa chúng đổi: **chuyển động cùng chiều** (similar motion). Ở cặp 2, hai bè cùng hướng và giữ nguyên quãng, ở đây là quãng 3: **chuyển động song song** (parallel motion).',
            en: 'In pair 1 both voices move up, but the interval between them changes: **similar motion**. In pair 2 both move the same way by the same interval, here a 3rd: **parallel motion**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4 F4+C5 | E4+G4 F4+A4 ||', labels: ['1', '', '2', ''] },
        { type: 'play', notes: 'E4+G4:h F4+C5:h E4+G4:h F4+A4:h' },
        {
          type: 'tip',
          text: {
            vi: 'Song song là một dạng riêng của cùng chiều.',
            en: 'Parallel motion is a special kind of similar motion.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai bè này chuyển động kiểu gì?', en: 'What type of motion is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+G4 E4+A4' },
        { type: 'play', notes: 'C4+G4:h E4+A4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ngược chiều', en: 'Contrary' } },
          { text: { vi: 'Cùng chiều', en: 'Similar' }, correct: true },
          { text: { vi: 'Song song', en: 'Parallel' } },
        ],
      },
      reason: {
        vi: 'Cả hai bè đi lên, nhưng quãng 5 thành quãng 4, nên là cùng chiều chứ không song song.',
        en: 'Both voices move up, but a 5th becomes a 4th, so it is similar, not parallel, motion.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Còn hai bè này?', en: 'And these two voices?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4+C5 A4+C5' },
        { type: 'play', notes: 'G4+C5:h A4+C5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Xiên', en: 'Oblique' }, correct: true },
          { text: { vi: 'Ngược chiều', en: 'Contrary' } },
          { text: { vi: 'Song song', en: 'Parallel' } },
        ],
      },
      reason: {
        vi: 'Bè trên đứng yên ở {C5} còn bè dưới đi lên: chuyển động xiên.',
        en: 'The upper voice stays on {C5} while the lower one moves up: oblique motion.',
      },
    },
  ],
} satisfies Lesson
