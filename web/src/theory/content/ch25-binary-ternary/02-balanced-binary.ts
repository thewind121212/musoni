import type { Lesson } from '@/theory/types'
import { BAL_A, BAL_B, hear, tag } from './music'

/** The last two measures of a phrase: its cadence figure. */
const ending = (notes: string) => notes.split(' | ').slice(-2).join(' | ')

/**
 * Book 24.3 and 24.6: the binary principle (taken first, since it explains
 * why a balanced binary's A section ends in a new key), then balanced binary,
 * always continuous, common in Baroque dance suites. The book's Bach figures
 * (Invention No. 8, French Suite No. 6) are replaced by a binary of our own.
 * No practice link.
 */
export default {
  id: 'balanced-binary',
  title: { vi: 'Hai đoạn cân bằng', en: 'Balanced binary' },
  minutes: 4,
  sources: [
    { section: '24.3', url: 'https://musictheory.pugetsound.edu/mt21c/BalancedBinary.html' },
    { section: '24.6', url: 'https://musictheory.pugetsound.edu/mt21c/BinaryPrinciple.html' },
  ],
  recap: [
    { vi: 'Nguyên tắc hai đoạn: A sang giọng mới, B về giọng đầu', en: 'Binary principle: A moves to a new key, B moves back' },
    { vi: 'Ở giọng trưởng, giọng mới thường là giọng át', en: 'In a major key the new key is usually the dominant' },
    { vi: 'Cân bằng: B kết bằng kết của A, dịch về giọng chủ', en: 'Balanced: B ends with A’s cadence, moved to the home key' },
    { vi: 'Hai đoạn cân bằng luôn là liên tục', en: 'A balanced binary is always continuous' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nguyên tắc hai đoạn', en: 'The binary principle' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nguyên tắc hai đoạn** (binary principle): đoạn A chuyển sang một giọng mới, đoạn B chuyển về giọng ban đầu. Phần lớn các bản hai đoạn thời Baroque theo nguyên tắc này.',
            en: 'The **binary principle**: the first section modulates to a new key and the second section modulates back to the first key. Most binary forms of the Baroque era follow it.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng trưởng, giọng mới thường là giọng át, trên bậc 5: giọng {C} trưởng sang giọng {G} trưởng.',
            en: 'In a major key the new key is usually the dominant, on scale degree 5: {C} major moves to {G} major.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${BAL_A.notes} ||`, labels: tag(BAL_A.notes, '{C}', '{G}') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${BAL_B.notes} ||`, labels: tag(BAL_B.notes, '{G}', '{C}') },
        { type: 'play', notes: hear(BAL_A, BAL_B), bpm: 140, label: { vi: 'Nghe {C} → {G} → {C}', en: 'Hear {C} → {G} → {C}' } },
        {
          type: 'tip',
          text: {
            vi: 'Ở giọng thứ, đoạn A thường sang giọng song song trưởng: giọng {A} thứ sang giọng {C} trưởng.',
            en: 'In a minor key the A section usually moves to the relative major: {A} minor moves to {C} major.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bản hai đoạn ở giọng {D} trưởng theo nguyên tắc hai đoạn. Đoạn A thường kết ở giọng nào?',
        en: 'A binary piece in {D} major follows the binary principle. In which key does the A section usually end?',
      },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Giọng mới thường là giọng át, và bậc 5 của giọng {D} trưởng là {A}.',
        en: 'The new key is usually the dominant, and scale degree 5 of {D} major is {A}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hai đoạn cân bằng', en: 'Balanced binary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hai đoạn cân bằng** (balanced binary): đoạn A kết ở giọng mới, và đoạn B kết bằng gần như cùng kết ấy, dịch về giọng ban đầu.',
            en: 'In a **balanced binary** the A section ends in a new key, and the B section ends with essentially the same cadence, transposed to the original key.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hình thức này hay gặp trong các tổ khúc vũ khúc thời Baroque, của Bach, Handel và những người khác.',
            en: 'It is found in Baroque dance suites by Bach, Handel and others.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${ending(BAL_A.notes)} ||`, labels: tag(ending(BAL_A.notes), '', '{G}') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${ending(BAL_B.notes)} ||`, labels: tag(ending(BAL_B.notes), '', '{C}') },
        { type: 'play', notes: `${ending(BAL_A.play)} | R:h. | ${ending(BAL_B.play)}`, bpm: 120, label: { vi: 'Nghe hai kết', en: 'Hear both endings' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'So với kết của đoạn A, kết của đoạn B là gì?', en: 'Compared with the A section’s ending, what is the B section’s ending?' },
      blocks: [{ type: 'play', notes: `${ending(BAL_A.play)} | R:h. | ${ending(BAL_B.play)}`, bpm: 120 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cùng kết ấy, thấp hơn một quãng 5', en: 'The same cadence, a fifth lower' }, correct: true },
          { text: { vi: 'Một kết hoàn toàn mới', en: 'A completely new cadence' } },
          { text: { vi: 'Đúng các nốt ấy, cùng giọng', en: 'The very same notes, in the same key' } },
        ],
      },
      reason: {
        vi: '{A} {C} {F#} {G} thành {D} {F} {B} {C}: mỗi nốt thấp hơn một quãng 5, từ giọng {G} về giọng {C}.',
        en: '{A} {C} {F#} {G} becomes {D} {F} {B} {C}: each note a fifth lower, from {G} back to {C}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai đoạn cân bằng là khép kín hay liên tục?', en: 'Is a balanced binary sectional or continuous?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Luôn khép kín', en: 'Always sectional' } },
          { text: { vi: 'Luôn liên tục', en: 'Always continuous' }, correct: true },
          { text: { vi: 'Tùy bản', en: 'It depends on the piece' } },
        ],
      },
      reason: {
        vi: 'Đoạn A của nó kết ở giọng mới, không trên hợp âm I, nên nó luôn là liên tục.',
        en: 'Its A section ends in a new key, not on the tonic chord, so it is always continuous.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Hai đoạn cân bằng ở giọng {F} trưởng: đoạn A kết trên {C}. Đoạn B kết trên nốt nào?',
        en: 'A balanced binary in {F} major: the A section ends on {C}. On which note does the B section end?',
      },
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Đoạn B lặp lại kết ấy ở giọng ban đầu, nên nó kết trên chủ âm {F}.',
        en: 'The B section repeats that cadence in the original key, so it ends on the tonic, {F}.',
      },
    },
  ],
} satisfies Lesson
