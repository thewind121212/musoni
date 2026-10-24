import type { Lesson } from '@/theory/types'

/**
 * Book 10.9 suspension (preparation, suspension, resolution; 9–8, 7–6, 4–3,
 * with 2–3 and 6–5 in a tip; compound intervals reduced) and 10.10
 * retardation. Our own examples in place of the book's score excerpts. The
 * suspended note is struck again rather than tied: a tie in a chord token
 * would silence the whole next chord in playback. No practice link.
 */
export default {
  id: 'suspension-retardation',
  title: { vi: 'Nốt treo và nốt chậm', en: 'Suspensions and retardations' },
  minutes: 5,
  sources: [
    { section: '10.9', url: 'https://musictheory.pugetsound.edu/mt21c/Suspension.html' },
    { section: '10.10', url: 'https://musictheory.pugetsound.edu/mt21c/Retardation.html' },
  ],
  recap: [
    { vi: 'Nốt treo (Sus): giữ từ hợp âm trước, có nhấn, rồi đi xuống liền bậc', en: 'Suspension (Sus): held from the chord before, accented, then down by step' },
    { vi: 'Ba phần: chuẩn bị, treo, giải quyết', en: 'Three parts: preparation, suspension, resolution' },
    { vi: 'Hai số đo từ bass: 9–8, 7–6, 4–3', en: 'Two numbers measured from the bass: 9–8, 7–6, 4–3' },
    { vi: 'Nốt chậm (Ret): như nốt treo nhưng đi lên', en: 'Retardation (Ret): like a suspension, but it resolves up' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt treo', en: 'The suspension' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt treo** (suspension), ghi tắt Sus, là nốt có nhấn, rơi vào phách mạnh. Nó đến bằng cùng nốt, giữ từ hợp âm trước, rồi đi xuống liền bậc.',
            en: 'A **suspension**, marked Sus, is an accented non-chord tone on a downbeat. It is approached by the same note, held from the chord before, and resolves down by step.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nó có ba phần: **nốt chuẩn bị** (preparation), **nốt treo** và **nốt giải quyết** (resolution). Nốt chuẩn bị có khi được nối sang nốt treo bằng dấu nối, có khi được đánh lại như ở đây.',
            en: 'It has three parts: the **preparation**, the **suspension** and the **resolution**. Sometimes the preparation is tied to the suspension, sometimes it is struck again, as here.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'C3+E3+G3+C5:h | G2+D3+G3+C5:q G2+D3+G3+B4:q | C3+E3+G3+C5:h ||',
          labels: ['', 'Sus\n4', '\n3', ''],
        },
        { type: 'play', notes: 'C3+E3+G3+C5:h G2+D3+G3+C5:q G2+D3+G3+B4:q C3+E3+G3+C5:h' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Số của nốt treo', en: 'Suspension numbers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt treo được gọi bằng hai số: quãng từ bass lên nốt treo, rồi lên nốt giải quyết. Hay gặp nhất là 9–8, 7–6 và 4–3. Quãng lớn hơn quãng 8 được rút gọn, nên quãng 11–10 vẫn gọi là 4–3.',
            en: 'A suspension is named by two numbers: the interval from the bass to the suspended note, then to its resolution. The common ones are 9–8, 7–6 and 4–3. Intervals larger than an octave are reduced, so an 11–10 is still a 4–3.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'G2+D3+G3+D5:h | C3+E3+G3+D5:q C3+E3+G3+C5:q || G2+D3+G3+D5:h | E3+G3+D5:q E3+G3+C5:q ||',
          labels: ['', 'Sus\n9', '\n8', '', 'Sus\n7', '\n6'],
        },
        { type: 'play', notes: 'G2+D3+G3+D5:h C3+E3+G3+D5:q C3+E3+G3+C5:q', label: { vi: 'Nghe 9–8', en: 'Hear 9–8' } },
        { type: 'play', notes: 'G2+D3+G3+D5:h E3+G3+D5:q E3+G3+C5:q', label: { vi: 'Nghe 7–6', en: 'Hear 7–6' } },
        {
          type: 'tip',
          text: {
            vi: 'Nốt treo 2–3 nằm ở bass và được đo với một bè trên. Đôi khi còn gặp 6–5, hoặc 5–4 và 3–2 khi hợp âm ở thế đảo.',
            en: 'The 2–3 is a bass suspension, measured against an upper voice. You may also meet 6–5, or 5–4 and 3–2 when the chord is inverted.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt treo 4–3 trên bass {G}: nốt treo là nốt gì?', en: 'A 4–3 suspension over a bass {G}: what is the suspended note?' },
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Quãng 4 trên {G} là {C}; nó đi xuống liền bậc về {B}, quãng 3 trên bass.',
        en: 'A fourth above {G} is {C}; it steps down to {B}, a third above the bass.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là nốt treo nào?', en: 'Which suspension is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'G2+D3+G3+B4:h | A2+C3+E3+B4:q A2+C3+E3+A4:q ||' },
        { type: 'play', notes: 'G2+D3+G3+B4:h A2+C3+E3+B4:q A2+C3+E3+A4:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '9–8', en: '9–8' }, correct: true },
          { text: { vi: '7–6', en: '7–6' } },
          { text: { vi: '4–3', en: '4–3' } },
        ],
      },
      reason: {
        vi: 'Bass là {A}: {B} trên nó là quãng 9 (rút gọn), rồi về {A}, quãng 8.',
        en: 'The bass is {A}: the {B} above it is a ninth (reduced), resolving to {A}, an octave.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt chậm', en: 'The retardation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt chậm** (retardation), ghi tắt Ret, giống nốt treo nhưng đi lên. Nó thường có nhấn, đến bằng cùng nốt, rồi đi lên liền bậc.',
            en: 'A **retardation**, marked Ret, is like a suspension that goes up. It is usually accented, approached by the same note, and resolves up by step.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'G2+D3+G3+B4:h | C3+E3+G3+B4:q C3+E3+G3+C5:q ||', labels: ['V', 'Ret', 'I'] },
        { type: 'play', notes: 'G2+D3+G3+B4:h C3+E3+G3+B4:q C3+E3+G3+C5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Các nhà soạn nhạc cổ điển như Mozart hay dùng nốt chậm và nốt treo ở kết, trong các chương chậm.',
            en: 'Classical composers like Mozart often used retardations and suspensions at cadences in slow movements.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt {E5} ở ô nhịp 2 là nốt gì?', en: 'What is the {E5} in measure 2?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+E3+G3+E5:h | F2+C3+A3+E5:q F2+C3+A3+F5:q ||' },
        { type: 'play', notes: 'C3+E3+G3+E5:h F2+C3+A3+E5:q F2+C3+A3+F5:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt treo', en: 'A suspension' } },
          { text: { vi: 'Nốt chậm', en: 'A retardation' }, correct: true },
          { text: { vi: 'Nốt thêu', en: 'A neighbor tone' } },
        ],
      },
      reason: {
        vi: '{E5} được giữ từ hợp âm I, không thuộc {F} {A} {C}, rồi đi lên liền bậc đến {F5}: đó là nốt chậm.',
        en: '{E5} is held from the I chord, is not in {F} {A} {C}, and steps up to {F5}: a retardation.',
      },
    },
  ],
} satisfies Lesson
