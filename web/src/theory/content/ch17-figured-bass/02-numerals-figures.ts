import type { Lesson } from '@/theory/types'

/** Book 16.2 (Roman numerals): inversion symbols after the numeral, compared with the earlier slash notation. */
export default {
  id: 'numerals-figures',
  title: { vi: 'Bậc La Mã kèm con số', en: 'Roman numerals with figures' },
  minutes: 4,
  sources: [{ section: '16.2', url: 'https://musictheory.pugetsound.edu/mt21c/FiguredBassInversionSymbols.html' }],
  recap: [
    { vi: 'Ký hiệu thế đảo đứng sau bậc La Mã: I, I6, I6/4', en: 'Inversion symbols go after the Roman numeral: I, I6, I6/4' },
    { vi: 'I/3 nay là I6, I/5 nay là I6/4', en: 'I/3rd is now I6, I/5th is now I6/4' },
    { vi: 'Bậc La Mã theo nốt gốc, con số theo nốt bass', en: 'The numeral comes from the root, the figures from the bass' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Con số sau bậc La Mã', en: 'Figures after the numeral' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi phân tích hòa âm, ký hiệu thế đảo đứng ngay sau bậc La Mã, chứ không chỉ nằm dưới nốt bass như thời Baroque. I là thế gốc, I6 là thế đảo 1, I6/4 là thế đảo 2.',
            en: 'In harmonic analysis, the inversion symbols go right after the Roman numeral, not just under the bass as in the Baroque era. I is root position, I6 first inversion, I6/4 second inversion.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5 E3+C4+G4+C5 G2+C4+E4+G4', labels: ['I', 'I\n6', 'I\n6\n4'] },
        { type: 'play', notes: 'C3+E4+G4+C5 E3+C4+G4+C5 G2+C4+E4+G4', label: { vi: 'Nghe ở giọng {C} trưởng', en: 'Hear it in {C} major' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'So với cách ghi gạch chéo', en: 'Compared with slash notation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở chương 8, ta tạm ghi nốt bass sau dấu gạch chéo: I/3 và I/5. Từ nay ta dùng bè trầm số: I/3 thành I6, I/5 thành I6/4.',
            en: 'In chapter 8 we wrote the bass after a slash for now: I/3rd and I/5th. From here on we use figured bass: I/3rd becomes I6, I/5th becomes I6/4.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 E3+C4+G4+C5 G2+C4+E4+G4',
          labels: ['I', { vi: 'I/3', en: 'I/3rd' }, { vi: 'I/5', en: 'I/5th' }],
        },
        { type: 'play', notes: 'C3+E4+G4+C5 E3+C4+G4+C5 G2+C4+E4+G4' },
        {
          type: 'tip',
          text: {
            vi: 'Ký hiệu hợp âm cũng nói đúng điều đó: ở giọng {C} trưởng, C/E là I6, còn C/G là I6/4.',
            en: 'Lead-sheet symbols say the same thing: in {C} major, C/E is I6 and C/G is I6/4.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'D3+F4+B4' },
        { type: 'play', notes: 'D3+F4+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii', en: 'ii' } },
          { text: { vi: 'vii°6', en: 'vii°6' }, correct: true },
          { text: { vi: 'vii°6/4', en: 'vii°6/4' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {B} {D} {F}, hợp âm vii°; nốt ba {D} ở bass nên ghi vii°6.',
        en: 'Restacked it is {B} {D} {F}, the vii° chord; its third, {D}, is in the bass, so it is vii°6.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'A2+D4+F4' },
        { type: 'play', notes: 'A2+D4+F4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi', en: 'vi' } },
          { text: { vi: 'ii6', en: 'ii6' } },
          { text: { vi: 'ii6/4', en: 'ii6/4' }, correct: true },
        ],
      },
      reason: {
        vi: 'Xếp lại là {D} {F} {A}, hợp âm ii; nốt năm {A} ở bass nên ghi ii6/4.',
        en: 'Restacked it is {D} {F} {A}, the ii chord; its fifth, {A}, is in the bass, so it is ii6/4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, hợp âm này là gì?', en: 'In {G} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'B2+D4+G4' },
        { type: 'play', notes: 'B2+D4+G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iii', en: 'iii' } },
          { text: { vi: 'I6', en: 'I6' }, correct: true },
          { text: { vi: 'I6/4', en: 'I6/4' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {G} {B} {D}, hợp âm I; nốt ba {B} ở bass nên ghi I6.',
        en: 'Restacked it is {G} {B} {D}, the I chord; its third, {B}, is in the bass, so it is I6.',
      },
    },
  ],
} satisfies Lesson
