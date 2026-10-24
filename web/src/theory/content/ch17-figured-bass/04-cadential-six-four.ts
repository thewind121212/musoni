import type { Lesson } from '@/theory/types'

/** Book 16.3: the cadential six-four, I6/4 before V, with dominant function (formerly I/5th). */
export default {
  id: 'cadential-six-four',
  title: { vi: 'Hợp âm 6/4 kết', en: 'The cadential six-four' },
  minutes: 4,
  sources: [{ section: '16.3', url: 'https://musictheory.pugetsound.edu/mt21c/TheCadentialSixFourChord.html' }],
  recap: [
    { vi: 'Hợp âm 6/4 kết là I6/4 đứng ngay trước V ở chỗ kết', en: 'The cadential six-four is the I6/4 just before V at a cadence' },
    { vi: 'Nó có chức năng át, như hợp âm V theo sau', en: 'It has dominant function, like the V that follows it' },
    { vi: 'Bass đứng yên trên bậc 5; phía trên, 6 xuống 5 và 4 xuống 3', en: 'The bass holds scale degree 5; above it, 6 falls to 5 and 4 to 3' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'I6/4 trước V', en: 'I6/4 before V' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm 6/4 kết** (cadential six-four) là hợp âm I6/4 hay đứng ngay trước V ở chỗ kết. Nó rất thường gặp trong nhạc cổ điển.',
            en: 'The **cadential six-four** is the I6/4 that regularly comes just before V in a cadence. It is very common in classical music.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 F2+F4+A4+C5 G2+E4+G4+C5 G2+D4+G4+B4 C3+E4+G4+C5',
          labels: ['I', 'IV', 'I\n6\n4', 'V', 'I'],
          highlight: [2],
        },
        {
          type: 'play',
          notes: 'C3+E4+G4+C5:h F2+F4+A4+C5:h G2+E4+G4+C5:h G2+D4+G4+B4:h C3+E4+G4+C5:w',
          label: { vi: 'Nghe ở giọng {C} trưởng', en: 'Hear it in {C} major' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Chức năng át', en: 'Dominant function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dù mang tên I, hợp âm 6/4 kết có chức năng át, như hợp âm V theo sau nó. Bass đứng yên trên bậc 5; phía trên, quãng 6 xuống quãng 5 và quãng 4 xuống quãng 3.',
            en: 'Although it is labelled I, the cadential six-four has dominant function, just like the V that follows it. The bass holds scale degree 5; above it, the 6th falls to a 5th and the 4th to a 3rd.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'G2+E4+G4+C5 G2+D4+G4+B4', labels: ['6\n4', '5\n3'] },
        { type: 'play', notes: 'G2+E4+G4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe 6/4 sang 5/3', en: 'Hear 6/4 move to 5/3' } },
        {
          type: 'tip',
          text: {
            vi: 'Ở chương 8, ta gọi hợp âm này là I/5. Từ nay ta gọi nó là hợp âm 6/4 kết.',
            en: 'In chapter 8 we called this chord I/5th. From now on we call it the cadential six-four.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {G} trưởng. Hợp âm thứ ba là gì?', en: 'This phrase is in {G} major. What is the third chord?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          key: 'G',
          notes: 'G2+B3+D4+G4 C3+C4+E4+G4 D3+B3+D4+G4 D3+A3+D4+F#4 G2+B3+D4+G4',
          highlight: [2],
        },
        { type: 'play', notes: 'G2+B3+D4+G4:h C3+C4+E4+G4:h D3+B3+D4+G4:h D3+A3+D4+F#4:h G2+B3+D4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I6/4', en: 'I6/4' }, correct: true },
          { text: { vi: 'I6', en: 'I6' } },
          { text: { vi: 'V', en: 'V' } },
        ],
      },
      reason: {
        vi: 'Các nốt {G} {B} {D} là hợp âm I, với nốt năm {D} ở bass, ngay trước V: hợp âm 6/4 kết.',
        en: 'The notes {G} {B} {D} are the I chord with its fifth, {D}, in the bass, right before V: the cadential six-four.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm 6/4 kết có chức năng gì?', en: 'Which function does the cadential six-four have?' },
      blocks: [{ type: 'play', notes: 'C3+E4+G4+C5:h F2+F4+A4+C5:h G2+E4+G4+C5:h G2+D4+G4+B4:h C3+E4+G4+C5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ', en: 'Tonic' } },
          { text: { vi: 'Tiền át', en: 'Pre-dominant' } },
          { text: { vi: 'Át', en: 'Dominant' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nó đứng trên bậc 5 và dẫn thẳng vào V, nên có chức năng át dù mang tên I.',
        en: 'It sits on scale degree 5 and leads straight into V, so it has dominant function although it is labelled I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, nốt bass của hợp âm 6/4 kết là nốt nào?', en: 'In {F} major, what is the bass note of the cadential six-four?' },
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: 'Hợp âm 6/4 kết là I6/4: {F} {A} {C} với nốt năm {C}, bậc 5 của giọng, ở bass.',
        en: 'The cadential six-four is I6/4: {F} {A} {C} with its fifth, {C}, scale degree 5, in the bass.',
      },
    },
  ],
} satisfies Lesson
