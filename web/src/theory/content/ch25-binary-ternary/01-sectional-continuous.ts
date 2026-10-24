import type { Lesson } from '@/theory/types'
import { BAL_A, BAL_B, MINOR_HC, MINOR_PAC, OPEN_HC, OPEN_HOME, OPEN_TO_G, hear, tag } from './music'

/**
 * Book 24.1-24.2: binary and ternary forms, capital letters for sections and
 * small ones for phrases, sectional against continuous, two-reprise and
 * rounded as the other descriptors. The book's Brahms and Haydn figures are
 * replaced by our own phrases. No practice link: no drill trains form.
 */
export default {
  id: 'sectional-continuous',
  title: { vi: 'Khép kín hay liên tục', en: 'Sectional or continuous' },
  minutes: 5,
  sources: [
    { section: '24.1', url: 'https://musictheory.pugetsound.edu/mt21c/BinaryAndTernaryIntroduction.html' },
    { section: '24.2', url: 'https://musictheory.pugetsound.edu/mt21c/SectionalVersusContinuous.html' },
  ],
  recap: [
    { vi: 'Hai đoạn: A B hoặc A A′; ba đoạn: A B A', en: 'Binary: A B or A A′; ternary: A B A' },
    { vi: 'Khép kín: đoạn A kết trên hợp âm I', en: 'Sectional: the A section ends on the tonic chord' },
    { vi: 'Liên tục: đoạn A kết ở giọng mới hoặc kết lửng', en: 'Continuous: the A section ends in a new key or on a half cadence' },
    { vi: 'Nhắc lại cả hai đoạn: ||: A :||: B :||', en: 'Two-reprise: ||: A :||: B :||' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hai đoạn và ba đoạn', en: 'Binary and ternary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hình thức hai đoạn** (binary form) có hai **đoạn** (section): A rồi B, hoặc A rồi A′. **Hình thức ba đoạn** (ternary form) có ba: A, rồi B, rồi A quay lại.',
            en: 'A **binary form** has two **sections**: A then B, or A then A′. A **ternary form** has three: A, then B, then A again.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chữ in hoa (A, B) chỉ đoạn, chữ thường (a, b) chỉ **câu nhạc** (phrase).',
            en: 'Capital letters (A, B) name sections; small letters (a, b) name **phrases**.',
          },
        },
        { type: 'play', notes: hear(BAL_A, BAL_B), bpm: 140, label: { vi: 'Nghe hai đoạn: A B', en: 'Hear a binary: A B' } },
        {
          type: 'play',
          notes: hear(OPEN_HC, OPEN_HOME, MINOR_HC, MINOR_PAC, OPEN_HC, OPEN_HOME),
          bpm: 150,
          label: { vi: 'Nghe ba đoạn: A B A', en: 'Hear a ternary: A B A' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong sơ đồ "A: a a′", chữ a và a′ chỉ gì?', en: 'In the diagram "A: a a′", what do a and a′ name?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn', en: 'Two sections' } },
          { text: { vi: 'Hai câu nhạc', en: 'Two phrases' }, correct: true },
          { text: { vi: 'Hai giọng', en: 'Two keys' } },
        ],
      },
      reason: {
        vi: 'Chữ thường chỉ câu nhạc; ở đây đoạn A gồm hai câu, a và a′.',
        en: 'Small letters name phrases; here the A section holds two phrases, a and a′.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khép kín', en: 'Sectional' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hình thức hai đoạn hay ba đoạn là **khép kín** (sectional) khi đoạn A kết trên hợp âm chủ. Đoạn A dưới đây kết lửng ở câu a, rồi kết chính hoàn toàn ở giọng {C} trưởng.',
            en: 'A binary or ternary form is **sectional** when the A section ends on the tonic chord. The A section below ends phrase a with a half cadence, then ends with a PAC in {C} major.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: OPEN_HC.notes, labels: tag(OPEN_HC.notes, 'a', 'HC') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${OPEN_HOME.notes} ||`, labels: tag(OPEN_HOME.notes, 'a′', 'PAC') },
        { type: 'play', notes: hear(OPEN_HC, OPEN_HOME), bpm: 140, label: { vi: 'Nghe đoạn A', en: 'Hear the A section' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Liên tục', en: 'Continuous' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi đoạn A không kết trên hợp âm chủ, hình thức là **liên tục** (continuous). Thường đoạn A **chuyển giọng** (modulation) sang giọng mới; cũng có khi nó dừng ở kết lửng trên V.',
            en: 'When the A section does not end on the tonic chord, the form is **continuous**. Often the A section **modulates** to a new key; it can also stop on V with a half cadence.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '3/4',
          notes: `${OPEN_TO_G.notes} ||`,
          labels: tag(OPEN_TO_G.notes, 'a′', '{G}'),
          highlight: [8],
        },
        { type: 'play', notes: hear(OPEN_HC, OPEN_TO_G), bpm: 140, label: { vi: 'Nghe đoạn A', en: 'Hear the A section' } },
        {
          type: 'tip',
          text: {
            vi: 'Nốt {F#} đưa câu a′ sang giọng {G} trưởng, và đoạn A kết ở đó, không về {C}.',
            en: 'The {F#} takes phrase a′ into {G} major, and the A section ends there, not back in {C}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là đoạn A của một bản ở giọng {C} trưởng. Hình thức khép kín hay liên tục?', en: 'This is the A section of a piece in {C} major. Is the form sectional or continuous?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${BAL_A.notes} ||`, highlight: [8] },
        { type: 'play', notes: BAL_A.play, bpm: 140 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khép kín', en: 'Sectional' } },
          { text: { vi: 'Liên tục', en: 'Continuous' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nốt {F#} dẫn về {G}: đoạn A kết ở giọng {G} trưởng, không trên hợp âm I của {C}.',
        en: 'The {F#} leads to {G}: the A section ends in {G} major, not on the tonic chord of {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Gọi tên hình thức', en: 'Naming the form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đặt "khép kín" hay "liên tục" vào tên: hai đoạn khép kín, hai đoạn liên tục, ba đoạn khép kín, ba đoạn liên tục.',
            en: 'Put "sectional" or "continuous" before the name: sectional binary, continuous binary, sectional ternary, continuous ternary.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Nhắc lại cả hai đoạn** (two-reprise): đoạn A và đoạn B đều được chơi hai lần, ||: A :||: B :||. **Tái hiện** (rounded): ở hình thức hai đoạn, giai điệu mở đầu quay lại sau phần tương phản.',
            en: '**Two-reprise**: both the A and the B section are repeated, ||: A :||: B :||. **Rounded**: in a binary form, the opening melody returns after the contrasting material.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: '**Dấu nhắc lại** (repeat sign) ||: và :|| bao quanh phần cần chơi lại.',
            en: 'The **repeat signs** ||: and :|| enclose the music to be played again.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn A dừng ở kết lửng trên V. Hình thức khép kín hay liên tục?', en: 'The A section stops on V with a half cadence. Is the form sectional or continuous?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khép kín', en: 'Sectional' } },
          { text: { vi: 'Liên tục', en: 'Continuous' }, correct: true },
        ],
      },
      reason: {
        vi: 'Khép kín đòi đoạn A kết trên hợp âm I; kết lửng dừng trên V nên là liên tục.',
        en: 'Sectional needs the A section to end on the tonic chord; a half cadence stops on V, so the form is continuous.',
      },
    },
  ],
} satisfies Lesson
