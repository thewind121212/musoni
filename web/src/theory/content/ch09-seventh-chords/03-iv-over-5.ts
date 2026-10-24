import type { Lesson } from '@/theory/types'

/** Book 8.2: the IV/5 "sus" chord, a four-note chord that sounds and works like V7. Our own examples, not the book's songs. */
export default {
  id: 'iv-over-5',
  title: { vi: 'Hợp âm IV/5', en: 'The IV/5 chord' },
  minutes: 3,
  sources: [{ section: '8.2', url: 'https://musictheory.pugetsound.edu/mt21c/IVover5SusChord.html' }],
  recap: [
    { vi: 'IV/5 là hợp âm IV với bậc 5 ở bass', en: 'IV/5 is the IV triad over scale degree 5 in the bass' },
    { vi: 'Trong giọng {C} trưởng, IV/5 là F/G', en: 'In {C} major, IV/5 is F/G' },
    { vi: 'Nó nghe và dẫn về I giống V7', en: 'It sounds like V7 and leads to I like it' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm IV trên bậc 5', en: 'IV over degree 5' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Lấy hợp âm IV và đặt bậc 5 của giọng ở bass, ta có hợp âm bốn nốt **IV/5**. Trong giọng {C} trưởng, đó là {F} {A} {C} trên {G}, viết thành hợp âm gạch chéo F/G.',
            en: 'Take the IV chord and put scale degree 5 in the bass: that is the four-note **IV/5** chord. In {C} major it is {F} {A} {C} over {G}, the slash chord F/G.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'G2+F3+A3+C4', labels: ['IV/5'] },
        { type: 'play', notes: 'G2+F3+A3+C4' },
        { type: 'keys', notes: 'G2 F3 A3 C4', from: 'C2', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, nốt bass của IV/5 là nốt nào?', en: 'In {C} major, which note is the bass of IV/5?' },
      answer: { type: 'key', note: 'G' },
      reason: {
        vi: 'IV/5 đặt bậc 5 ở bass, và bậc 5 của giọng {C} trưởng là {G}.',
        en: 'IV/5 puts degree 5 in the bass, and degree 5 of {C} major is {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nghe như V7', en: 'It sounds like V7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'IV/5 có chung {G} ở bass và {F} với V7, nên nghe gần giống và làm cùng việc. Nhạc phổ thông hay dùng IV/5 thay cho V7.',
            en: 'IV/5 shares the bass {G} and the {F} with V7, so it sounds much the same and does the same job. Popular music often uses IV/5 in place of V7.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'G2+F3+B3+D4 G2+F3+A3+C4', labels: ['V7', 'IV/5'] },
        { type: 'play', notes: 'G2+F3+B3+D4 G2+F3+A3+C4', label: { vi: 'Nghe V7, rồi IV/5', en: 'Hear V7, then IV/5' } },
        {
          type: 'tip',
          text: {
            vi: 'Vì vậy nó còn được gọi là hợp âm sus: không có cảm âm {B}, thay vào đó là {C} treo phía trên.',
            en: 'That is why it is also called a sus chord: there is no leading tone {B}, and a {C} hangs above instead.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Về chủ âm', en: 'Going home to I' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giống V7, IV/5 muốn đi về hợp âm I. Nghe IV/5 rồi I trong giọng {C} trưởng.',
            en: 'Like V7, IV/5 wants to move to the I chord. Hear IV/5 then I in {C} major.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'G2+F3+A3+C4 C3+E3+G3+C4', labels: ['IV/5', 'I'] },
        { type: 'play', notes: 'G2+F3+A3+C4 C3+E3+G3+C4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, IV/5 là hợp âm nào?', en: 'In {G} major, which chord is IV/5?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C/D', en: 'C/D' }, correct: true },
          { text: { vi: 'D/C', en: 'D/C' } },
          { text: { vi: 'G/D', en: 'G/D' } },
        ],
      },
      reason: {
        vi: 'Hợp âm IV của giọng {G} trưởng có nốt gốc {C}, và bậc 5 là {D}, nên IV/5 là C/D.',
        en: 'The IV chord of {G} major has the root {C} and degree 5 is {D}, so IV/5 is C/D.',
      },
    },
  ],
} satisfies Lesson
