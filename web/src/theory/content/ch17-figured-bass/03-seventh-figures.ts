import type { Lesson } from '@/theory/types'

/**
 * Book 16.2 (seventh chords) and 16.5: the figures 7, 6/5, 4/3, 4/2 and their
 * full forms; the "7" dropped once inverted; quality marks kept.
 */
export default {
  id: 'seventh-figures',
  title: { vi: 'Con số của hợp âm bảy', en: 'Seventh-chord figures' },
  minutes: 5,
  sources: [
    { section: '16.2', url: 'https://musictheory.pugetsound.edu/mt21c/FiguredBassInversionSymbols.html' },
    { section: '16.5', url: 'https://musictheory.pugetsound.edu/mt21c/FiguredBassAdditionalInformation.html' },
  ],
  recap: [
    { vi: 'Hợp âm bảy: 7, 6/5, 4/3, 4/2 cho thế gốc và ba thế đảo', en: 'Seventh chords: 7, 6/5, 4/3, 4/2 for root position and the three inversions' },
    { vi: 'Đó là dạng rút gọn của 7/5/3, 6/5/3, 6/4/3, 6/4/2', en: 'They abbreviate 7/5/3, 6/5/3, 6/4/3, 6/4/2' },
    { vi: 'Khi đảo, bỏ số 7: V6/5, V4/3, V4/2', en: 'Inverted, the "7" is dropped: V6/5, V4/3, V4/2' },
    { vi: 'Giữ M, ø, ° trước con số: IM6/5, viiø4/3', en: 'Keep M, ø, ° before the figures: IM6/5, viiø4/3' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bốn thế của hợp âm bảy', en: 'Four positions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm bảy có bốn nốt nên có bốn thế: thế gốc, thế đảo 1, thế đảo 2, và **thế đảo 3** (third inversion) với nốt bảy ở bass. Con số của chúng là 7, 6/5, 4/3 và 4/2.',
            en: 'A seventh chord has four notes, so it has four positions: root position, first and second inversion, and **third inversion**, with the seventh in the bass. Their figures are 7, 6/5, 4/3 and 4/2.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'G2+B2+D3+F3 B2+D3+F3+G3 D3+F3+G3+B3 F2+G2+B2+D3', labels: ['7', '6\n5', '4\n3', '4\n2'] },
        { type: 'play', notes: 'G2+B2+D3+F3 B2+D3+F3+G3 D3+F3+G3+B3 F2+G2+B2+D3', label: { vi: 'Nghe G7 ở bốn thế', en: 'Hear G7 in four positions' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Con số đầy đủ', en: 'The full figures' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các số ấy là dạng rút gọn. Số đầy đủ ghi mọi quãng phía trên bass: 7/5/3, 6/5/3, 6/4/3 và 6/4/2. Dạng rút gọn chỉ giữ những số đủ để phân biệt các thế.',
            en: 'These figures are abbreviations. The full figures list every interval above the bass: 7/5/3, 6/5/3, 6/4/3 and 6/4/2. The short forms keep just enough numbers to tell the positions apart.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          notes: 'G2+B2+D3+F3 B2+D3+F3+G3 D3+F3+G3+B3 F2+G2+B2+D3',
          labels: ['7\n5\n3', '6\n5\n3', '6\n4\n3', '6\n4\n2'],
        },
        { type: 'play', notes: 'G2+B2+D3+F3 B2+D3+F3+G3 D3+F3+G3+B3 F2+G2+B2+D3' },
        {
          type: 'tip',
          text: {
            vi: 'Bạn sẽ gặp số đầy đủ trong nhạc Baroque; khi phân tích, ta chỉ dùng dạng rút gọn.',
            en: 'You will meet the full figures in Baroque music; in analysis we use only the short forms.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm Fmaj7 này ghi số gì?', en: 'Which figure does this Fmaj7 get?' },
      blocks: [
        { type: 'staff', clef: 'bass', notes: 'A2+C3+E3+F3' },
        { type: 'play', notes: 'A2+C3+E3+F3' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '7', en: '7' } },
          { text: { vi: '6/5', en: '6/5' }, correct: true },
          { text: { vi: '4/3', en: '4/3' } },
          { text: { vi: '4/2', en: '4/2' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {F} {A} {C} {E}; nốt ba {A} ở bass, tức thế đảo 1, ghi 6/5.',
        en: 'Restacked it is {F} {A} {C} {E}; its third, {A}, is in the bass, first inversion, figured 6/5.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bỏ số 7 khi đảo', en: 'Dropping the 7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các số 6/5, 4/3 và 4/2 chỉ dùng cho hợp âm bảy, nên khi đảo ta bỏ số 7. Ở giọng {C} trưởng, V7 đảo thành V6/5, V4/3 và V4/2.',
            en: 'The figures 6/5, 4/3 and 4/2 are used only for seventh chords, so the "7" is left out when they are inverted. In {C} major, V7 becomes V6/5, V4/3 and V4/2.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          notes: 'G2+B2+D3+F3 B2+D3+F3+G3 D3+F3+G3+B3 F2+G2+B2+D3',
          labels: ['V\n7', 'V\n6\n5', 'V\n4\n3', 'V\n4\n2'],
        },
        { type: 'play', notes: 'G2+B2+D3+F3 B2+D3+F3+G3 D3+F3+G3+B3 F2+G2+B2+D3' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, hợp âm này là gì?', en: 'In {F} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', key: 'F', notes: 'Bb2+C3+E3+G3' },
        { type: 'play', notes: 'Bb2+C3+E3+G3' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V7', en: 'V7' } },
          { text: { vi: 'V6/5', en: 'V6/5' } },
          { text: { vi: 'V4/3', en: 'V4/3' } },
          { text: { vi: 'V4/2', en: 'V4/2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Xếp lại là {C} {E} {G} {Bb}, hợp âm V7; nốt bảy {Bb} ở bass nên ghi V4/2.',
        en: 'Restacked it is {C} {E} {G} {Bb}, the V7 chord; its seventh, {Bb}, is in the bass, so it is V4/2.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giữ dấu tính chất', en: 'Keeping the quality marks' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các dấu M, ø và ° vẫn phải giữ, đặt sau bậc La Mã và trước con số. Ở giọng {C} trưởng, IM7 đảo 1 thành IM6/5, viiø7 đảo 2 thành viiø4/3.',
            en: 'The marks M, ø and ° must stay, after the Roman numeral and before the figures. In {C} major, IM7 in first inversion is IM6/5, and viiø7 in second inversion is viiø4/3.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'E2+G2+B2+C3 F2+A2+B2+D3', labels: ['IM\n6\n5', 'viiø\n4\n3'] },
        { type: 'play', notes: 'E2+G2+B2+C3 F2+A2+B2+D3' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', notes: 'G2+B2+C3+E3' },
        { type: 'play', notes: 'G2+B2+C3+E3' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I4/3', en: 'I4/3' } },
          { text: { vi: 'IM4/3', en: 'IM4/3' }, correct: true },
          { text: { vi: 'IM6/5', en: 'IM6/5' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {C} {E} {G} {B}, hợp âm IM7; nốt năm {G} ở bass nên ghi 4/3, và phải giữ M.',
        en: 'Restacked it is {C} {E} {G} {B}, the IM7 chord; its fifth, {G}, is in the bass, so it is 4/3, keeping the M.',
      },
    },
  ],
} satisfies Lesson
