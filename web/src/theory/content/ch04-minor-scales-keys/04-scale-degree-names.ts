import type { Lesson } from '@/theory/types'

/** Book 3.3: the scale degree names, why some start with "sub-", leading tone and subtonic. */
export default {
  id: 'scale-degree-names',
  title: { vi: 'Tên các bậc', en: 'Scale degree names' },
  minutes: 5,
  sources: [{ section: '3.3', url: 'https://musictheory.pugetsound.edu/mt21c/ScaleDegreeNames.html' }],
  practice: { drill: 'hear-play', level: 3, durationSec: 120 },
  recap: [
    { vi: 'Chủ âm 1, át âm 5, trung âm 3 nằm giữa', en: 'Tonic 1, dominant 5, the mediant 3 between them' },
    { vi: 'Hạ át âm 4 và hạ trung âm 6 nằm phía dưới chủ âm', en: 'Subdominant 4 and submediant 6 mirror them below the tonic' },
    { vi: 'Thượng chủ âm là bậc 2, cảm âm là bậc 7', en: 'The supertonic is 2, the leading tone is 7' },
    { vi: 'Bậc 7 cách chủ âm một nguyên cung là bậc VII hạ', en: 'A 7th a whole step below the tonic is the subtonic' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chủ âm, át âm, trung âm', en: 'Tonic, dominant, mediant' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi **bậc** (scale degree) có một tên riêng. Bậc 1 là **chủ âm** (tonic); bậc 5, cao hơn chủ âm một quãng 5, là **át âm** (dominant). Bậc 3, nằm giữa hai nốt ấy, là **trung âm** (mediant).',
            en: 'Each **scale degree** has a name. Degree 1 is the **tonic**; degree 5, a 5th above the tonic, is the **dominant**. Degree 3, midway between them, is the **mediant**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4', labels: ['1', '3', '5'] },
        { type: 'play', notes: 'C4 E4 G4' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Phía dưới chủ âm', en: 'Below the tonic' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Phía dưới chủ âm lặp lại hình ấy. **Hạ át âm** (subdominant), bậc 4, thấp hơn chủ âm một quãng 5; **hạ trung âm** (submediant), bậc 6, nằm giữa hạ át âm và chủ âm.',
            en: 'Below the tonic the picture repeats. The **subdominant**, degree 4, is a 5th below the tonic; the **submediant**, degree 6, is midway between the subdominant and the tonic.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'F3 A3 C4 E4 G4', labels: ['4', '6', '1', '3', '5'], highlight: [2] },
        { type: 'play', notes: 'F3 A3 C4 E4 G4' },
        {
          type: 'tip',
          text: {
            vi: 'Chữ "hạ" (sub-) nghĩa là ở phía dưới chủ âm.',
            en: 'The "sub-" means below: below the tonic.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, át âm là nốt nào?', en: 'In {G} major, which note is the dominant?' },
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Át âm là bậc 5: {G}, {A}, {B}, {C}, {D}.',
        en: 'The dominant is degree 5: {G}, {A}, {B}, {C}, {D}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thượng chủ âm và cảm âm', en: 'Supertonic and leading tone' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bậc 2, ngay trên chủ âm, là **thượng chủ âm** (supertonic). Bậc 7 là **cảm âm** (leading tone): chỉ thấp hơn chủ âm nửa cung, nên nghe như muốn đi lên chủ âm.',
            en: 'Degree 2, just above the tonic, is the **supertonic**. Degree 7 is the **leading tone**: only a half step below the tonic, it leans up into it.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', labels: ['1', '2', '3', '4', '5', '6', '7', '1'], highlight: [1, 6] },
        { type: 'play', notes: 'C4 D4 E4 F4 G4 A4 B4 C5' },
        { type: 'keys', notes: 'B4 C5', from: 'C4', labels: 'names', caption: { vi: 'Cảm âm về chủ âm:', en: 'Leading tone to tonic:' } },
        { type: 'play', notes: 'B4 C5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, cảm âm là nốt nào?', en: 'In {F} major, which note is the leading tone?' },
      answer: { type: 'key', note: 'E', blackKeys: 'b' },
      reason: {
        vi: '{E} là bậc 7, thấp hơn chủ âm {F} nửa cung.',
        en: '{E} is degree 7, a half step below the tonic {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bậc VII hạ', en: 'The subtonic' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong gam thứ tự nhiên, bậc 7 thấp hơn chủ âm một nguyên cung. Khi đó nó gọi là **bậc VII hạ** (subtonic), không phải cảm âm.',
            en: 'In the natural minor, degree 7 is a whole step below the tonic. Then it is called the **subtonic**, not the leading tone.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Gam thứ hòa âm nâng bậc 7 lên, nên lại có cảm âm.',
            en: 'The harmonic minor raises the 7th, so it has a leading tone again.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4 A4 | G#4 A4', labels: ['7', '1', '7', '1'], highlight: [0, 2] },
        { type: 'play', notes: 'G4 A4', label: { vi: 'Nghe bậc VII hạ', en: 'Hear the subtonic' } },
        { type: 'play', notes: 'G#4 A4', label: { vi: 'Nghe cảm âm', en: 'Hear the leading tone' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong gam {D} thứ tự nhiên, {C} là bậc gì?', en: 'In {D} natural minor, what is {C} called?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cảm âm', en: 'Leading tone' } },
          { text: { vi: 'Bậc VII hạ', en: 'Subtonic' }, correct: true },
          { text: { vi: 'Hạ trung âm', en: 'Submediant' } },
        ],
      },
      reason: {
        vi: '{C} thấp hơn chủ âm {D} một nguyên cung, nên là bậc VII hạ.',
        en: '{C} is a whole step below the tonic {D}, so it is the subtonic.',
      },
    },
  ],
} satisfies Lesson
