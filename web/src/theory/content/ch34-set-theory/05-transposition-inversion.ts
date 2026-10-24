import type { Lesson } from '@/theory/types'

/** Book 33.7 (transposition Tn) and 33.8 (inversion TnI, and finding n for two inversionally related sets). Our own sets. */
export default {
  id: 'transposition-inversion',
  title: { vi: 'Chuyển vị và phép đảo', en: 'Transposition and inversion' },
  minutes: 5,
  sources: [
    { section: '33.7', url: 'https://musictheory.pugetsound.edu/mt21c/TranspositionTn.html' },
    { section: '33.8', url: 'https://musictheory.pugetsound.edu/mt21c/InversionTnI.html' },
  ],
  recap: [
    { vi: 'Tn cộng n vào mỗi số, rồi trừ 12 nếu vượt quá 11', en: 'Tn adds n to each integer, then subtracts 12 from any number above 11' },
    { vi: 'TnI đảo mỗi số qua {C} (n thành 12 − n), rồi cộng n', en: 'TnI inverts each integer around {C} (n becomes 12 − n), then adds n' },
    { vi: 'Tìm n: viết tập hợp thứ hai ngược lại rồi cộng từng cặp', en: 'To find n: write the second set backward and add the pairs' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chuyển vị Tn', en: 'Transposition, Tn' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chuyển vị** (transposition) viết là Tn, với n là số nửa cung dời lên. [0, 3, 7] ở T5 thành 5, 8, 12; trừ 12 khỏi số lớn hơn 11 được [5, 8, 0].',
            en: '**Transposition** is written Tn, where n is the number of half steps the set moves up. [0, 3, 7] at T5 becomes 5, 8, 12; subtracting 12 from any number above 11 gives [5, 8, 0].',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 Eb4 G4 | F4 Ab4 C5', labels: ['0', '3', '7', '5', '8', '0'] },
        { type: 'play', notes: 'C4+Eb4+G4 F4+Ab4+C5', label: { vi: 'Nghe [0, 3, 7], rồi T5', en: 'Hear [0, 3, 7], then T5' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: '[2, 5, 9] ở T4 là gì?', en: 'What is [2, 5, 9] at T4?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[6, 9, 1]', en: '[6, 9, 1]' }, correct: true },
          { text: { vi: '[6, 9, 11]', en: '[6, 9, 11]' } },
          { text: { vi: '[10, 1, 5]', en: '[10, 1, 5]' } },
        ],
      },
      reason: {
        vi: 'Cộng 4: 6, 9, 13, và 13 trừ 12 là 1.',
        en: 'Add 4: 6, 9, 13, and 13 minus 12 is 1.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phép đảo TnI', en: 'Inversion, TnI' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Phép đảo** (inversion) TnI có hai bước. Bước 1 lật mỗi nốt sang phía bên kia của {C}: {E} cao hơn {C} một quãng 3 trưởng, nên thành {Ab}, thấp hơn {C} một quãng 3 trưởng. Đó là T0I, mỗi số n thành 12 − n (0 vẫn là 0).',
            en: '**Inversion**, TnI, has two steps. Step 1 flips each note to the other side of {C}: {E} is a major 3rd above {C}, so it becomes {Ab}, a major 3rd below {C}. That is T0I: each n becomes 12 − n (0 stays 0).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Bước 2 chuyển vị lên n. [0, 4, 7] đảo thành 0, 8, 5; ở T7I cộng 7 được 7, 3, 0, tức [0, 3, 7]: {C} trưởng đảo thành {C} thứ.',
            en: 'Step 2 transposes up n. [0, 4, 7] inverts to 0, 8, 5; at T7I add 7 to get 7, 3, 0, which is [0, 3, 7]: {C} major inverts to {C} minor.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4 | C4 Eb4 G4', labels: ['0', '4', '7', '0', '3', '7'] },
        { type: 'play', notes: 'C4+E4+G4 C4+Eb4+G4', label: { vi: 'Nghe [0, 4, 7], rồi T7I', en: 'Hear [0, 4, 7], then T7I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: '[1, 2, 5] ở T0I là gì?', en: 'What is [1, 2, 5] at T0I?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[7, 10, 11]', en: '[7, 10, 11]' }, correct: true },
          { text: { vi: '[1, 4, 5]', en: '[1, 4, 5]' } },
          { text: { vi: '[5, 8, 9]', en: '[5, 8, 9]' } },
        ],
      },
      reason: {
        vi: 'Mỗi số n thành 12 − n: 11, 10, 7, xếp tăng dần là [7, 10, 11].',
        en: 'Each n becomes 12 − n: 11, 10, 7, which in ascending order is [7, 10, 11].',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm n của TnI', en: 'Finding n of TnI' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai tập hợp liên hệ qua phép đảo: viết tập hợp thứ hai ngược lại rồi cộng từng cặp số. Mỗi tổng (theo modulo 12) đều bằng n.',
            en: 'For two inversionally related sets, write the second set backward and add the pairs. Each sum (modulo 12) equals n.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '[0, 4, 7] và [0, 3, 7] viết ngược là 7, 3, 0. Cộng: 0 + 7, 4 + 3, 7 + 0 đều bằng 7, vậy hai tập hợp liên hệ ở T7I.',
            en: '[0, 4, 7] and [0, 3, 7] written backward is 7, 3, 0. Adding: 0 + 7, 4 + 3 and 7 + 0 all make 7, so the sets are related at T7I.',
          },
        },
        { type: 'keys', notes: 'C4 E4 G4', caption: { vi: '[0, 4, 7]:', en: '[0, 4, 7]:' } },
        { type: 'play', notes: 'C4+E4+G4' },
        { type: 'keys', notes: 'C4 Eb4 G4', caption: { vi: '[0, 3, 7]:', en: '[0, 3, 7]:' } },
        { type: 'play', notes: 'C4+Eb4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: '[1, 3, 4] đảo thành [5, 6, 8] ở TnI nào?', en: '[1, 3, 4] inverts to [5, 6, 8] at which TnI?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'T4I', en: 'T4I' } },
          { text: { vi: 'T7I', en: 'T7I' } },
          { text: { vi: 'T9I', en: 'T9I' }, correct: true },
        ],
      },
      reason: {
        vi: 'Viết ngược 8, 6, 5 rồi cộng: 1 + 8, 3 + 6, 4 + 5 đều bằng 9.',
        en: 'Written backward it is 8, 6, 5; adding, 1 + 8, 3 + 6 and 4 + 5 all make 9.',
      },
    },
  ],
} satisfies Lesson
