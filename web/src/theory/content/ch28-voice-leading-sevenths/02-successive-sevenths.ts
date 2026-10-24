import type { Lesson } from '@/theory/types'

/**
 * Book 27.2: a circle of fifths of seventh chords. Root position: alternate
 * complete and incomplete chords. Inverted: the sevenths fall, two voices hold
 * common tones and two step down.
 */
export default {
  id: 'successive-sevenths',
  title: { vi: 'Nhiều hợp âm bảy liền nhau', en: 'Successive seventh chords' },
  minutes: 4,
  sources: [{ section: '27.2', url: 'https://musictheory.pugetsound.edu/mt21c/SuccessiveSeventhChords.html' }],
  recap: [
    { vi: 'Hợp âm bảy liền nhau hay gặp trong tiến trình vòng quãng năm', en: 'Successive sevenths are common in circle of fifths progressions' },
    { vi: 'Thế gốc: xen kẽ hợp âm đầy đủ và hợp âm thiếu nốt năm', en: 'Root position: alternate complete chords and chords without the fifth' },
    { vi: 'Thế đảo: hai bè giữ nốt chung, hai bè đi xuống liền bậc', en: 'Inverted: two voices hold common tones, two step down' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đầy đủ, rồi thiếu', en: 'Complete, then incomplete' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm bảy hay đi liền nhau trong **tiến trình vòng quãng năm** (circle of fifths progression). Với hợp âm bảy thế gốc ở bốn bè, hãy xen kẽ **hợp âm đầy đủ** (complete chord) và **hợp âm thiếu** (incomplete chord), tức không có nốt năm.',
            en: 'Seventh chords often follow one another in a **circle of fifths progression**. With root-position sevenths in four parts, alternate **complete chords** and **incomplete chords**, which leave out the fifth.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây vi7 đầy đủ, ii7 thiếu {A}, V7 đầy đủ, rồi I thiếu nốt năm. Mỗi nốt bảy đều đi xuống.',
            en: 'Here vi7 is complete, ii7 has no {A}, V7 is complete, and I has no fifth. Every seventh falls.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'A2+G3+E4+C5:q D3+F3+D4+C5:q G2+F3+D4+B4:q C3+E3+C4+C5:q ||', labels: ['vi7', 'ii7', 'V7', 'I'] },
        { type: 'play', notes: 'A2+G3+E4+C5:q D3+F3+D4+C5:q G2+F3+D4+B4:q C3+E3+C4+C5:w', label: { vi: 'Nghe vi7–ii7–V7–I', en: 'Hear vi7–ii7–V7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong ví dụ trên, ii7 ({D}–{F}–{A}–{C}) thiếu nốt nào?', en: 'In the example above, which note is missing from ii7 ({D}–{F}–{A}–{C})?' },
      blocks: [{ type: 'staff', clef: 'grand', notes: 'D3+F3+D4+C5', labels: ['ii7'] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt năm {A}', en: 'The fifth, {A}' }, correct: true },
          { text: { vi: 'Nốt ba {F}', en: 'The third, {F}' } },
          { text: { vi: 'Nốt bảy {C}', en: 'The seventh, {C}' } },
        ],
      },
      reason: {
        vi: 'Hợp âm có {D}, {F}, {D}, {C}: nốt gốc được nhân đôi và nốt năm {A} bị bỏ.',
        en: 'It holds {D}, {F}, {D}, {C}: the root is doubled and the fifth, {A}, is left out.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm bảy thế đảo', en: 'Inverted seventh chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Với hợp âm bảy thế đảo, luôn giải quyết nốt bảy đi xuống liền bậc và cho các bè khác đi êm. Bạn sẽ thấy một khuôn mẫu: hai bè giữ **nốt chung** (common tone), hai bè đi xuống liền bậc.',
            en: 'With inverted seventh chords, always resolve each seventh down by step and move the other voices smoothly. You will see a pattern: two voices hold **common tones** while the other two step down.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+A3+E4+C5:q F2+A3+D4+C5:q F2+G3+D4+B4:q E2+G3+C4+C5:q ||', labels: ['vi\n4\n2', 'ii\n6\n5', 'V\n4\n2', 'I\n6'] },
        { type: 'play', notes: 'G2+A3+E4+C5:q F2+A3+D4+C5:q F2+G3+D4+B4:q E2+G3+C4+C5:w', label: { vi: 'Nghe vi4/2–ii6/5–V4/2–I6', en: 'Hear vi4/2–ii6/5–V4/2–I6' } },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm 4/2 xen với 6/5, hoặc 7 xen với 4/3, đều cho cùng khuôn mẫu này.',
            en: 'Alternating 4/2 with 6/5 chords, or 7 with 4/3 chords, gives the same pattern.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Từ ii6/5 sang V4/2 ở ví dụ trên, các bè làm gì?', en: 'From ii6/5 to V4/2 above, what do the voices do?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai bè giữ nốt chung, hai bè đi xuống liền bậc', en: 'Two hold common tones, two step down' }, correct: true },
          { text: { vi: 'Cả bốn bè đi lên liền bậc', en: 'All four step up' } },
          { text: { vi: 'Hai bè nhảy quãng 5, hai bè giữ nốt', en: 'Two leap a fifth, two hold' } },
        ],
      },
      reason: {
        vi: '{F} và {D} được giữ, còn {A} xuống {G} và nốt bảy {C} xuống {B}.',
        en: '{F} and {D} are held, while {A} falls to {G} and the seventh, {C}, falls to {B}.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {G} trưởng, ii6/5 là {C}–{E}–{G}–{A}. Đến V4/2, nốt bảy {G} đi đến nốt nào?',
        en: 'In {G} major, ii6/5 is {C}–{E}–{G}–{A}. Going to V4/2, where does the seventh, {G}, go?',
      },
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Nốt bảy đi xuống liền bậc: {G} xuống {F#}, nốt ba của V7 ở giọng {G} trưởng.',
        en: 'The seventh falls by step: {G} goes down to {F#}, the third of V7 in {G} major.',
      },
    },
  ],
} satisfies Lesson
