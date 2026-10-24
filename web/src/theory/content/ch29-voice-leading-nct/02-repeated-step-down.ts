import type { Lesson } from '@/theory/types'

/**
 * Book 28.3, first half: how to embellish one voice of a four-part
 * progression when it repeats a note (upper or lower neighbor) or steps down
 * (suspension, escape tone, chromatic passing tone, anticipation). The book's
 * double neighbor on a step is left out (see the chapter doc). Our own
 * examples in C major.
 */
export default {
  id: 'repeated-step-down',
  title: { vi: 'Nốt lặp và đi xuống liền bậc', en: 'Repeated notes and steps down' },
  minutes: 5,
  sources: [{ section: '28.3', url: 'https://musictheory.pugetsound.edu/mt21c/AddingsNCTs.html' }],
  recap: [
    { vi: 'Xem bè đi thế nào: lặp nốt, liền bậc hay nhảy', en: 'Look at how the voice moves: repeat, step or leap' },
    { vi: 'Nốt lặp: thêm nốt thêu trên hoặc dưới', en: 'Repeated note: add an upper or lower neighbor' },
    { vi: 'Đi xuống liền bậc: nốt treo, nốt thoát, nốt đón trước', en: 'Step down: suspension, escape tone, anticipation' },
    { vi: 'Đi xuống nguyên cung: có thể thêm nốt lướt biến âm', en: 'A whole step down can take a chromatic passing tone' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Xem bè đi thế nào', en: 'How does the voice move?' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Muốn thêm nốt ngoài hợp âm, hãy xem một bè đi thế nào sang hợp âm sau: lặp nốt, đi xuống hay đi lên liền bậc, nhảy quãng 3, hay nhảy xa hơn. Mỗi kiểu có cách trang trí riêng.',
            en: 'To add non-chord tones, look at how one voice moves to the next chord: a repeated note, a step down or up, a leap of a third, or a larger leap. Each has its own embellishments.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt lặp: thêm **nốt thêu** (neighbor tone) trên hoặc dưới. Ở đây bè tenor lặp {G3} từ V sang I, có nốt thêu trên {A3}.',
            en: 'Repeated note: add an upper or lower **neighbor tone**. Here the tenor repeats {G3} from V to I, with the upper neighbor {A3}.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'G2+G3+D4+B4:8 G2+A3+D4+B4:8 C3+G3+E4+C5:q ||', labels: ['V', 'N', 'I'], highlight: [1] },
        { type: 'play', notes: 'G2+G3+D4+B4:q C3+G3+E4+C5:h', label: { vi: 'Nghe bản gốc', en: 'Hear the original' } },
        { type: 'play', notes: 'G2+G3+D4+B4:8 G2+A3+D4+B4:8 C3+G3+E4+C5:h', label: { vi: 'Nghe nốt thêu', en: 'Hear the neighbor' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bè soprano lặp {E5} ở giọng {C} trưởng. Nốt thêu dưới của nó là nốt nào?',
        en: 'The soprano repeats {E5} in {C} major. What is its lower neighbor?',
      },
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Nốt thêu dưới đi xuống liền bậc rồi quay về: dưới {E5} trong giọng là {D5}.',
        en: 'A lower neighbor steps down and back: the scale step below {E5} is {D5}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đi xuống liền bậc: nốt treo', en: 'Step down: the suspension' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi một bè đi xuống liền bậc, có thể làm chậm bước giải quyết: giữ nốt cũ sang hợp âm sau rồi mới đi xuống. Đó là **nốt treo** (suspension). Ở đây {C5} treo trên V thành nốt treo 4–3.',
            en: 'When a voice steps down, you can delay the resolution: hold the old note into the next chord, then step down. That is a **suspension**. Here {C5} is held over V as a 4–3 suspension.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'F2+A3+F4+C5:q G2+G3+D4+C5:8 G2+G3+D4+B4:8 ||', labels: ['IV', 'Sus\n4', '\n3'], highlight: [1] },
        { type: 'play', notes: 'F2+A3+F4+C5:q G2+G3+D4+B4:h', label: { vi: 'Nghe bản gốc', en: 'Hear the original' } },
        { type: 'play', notes: 'F2+A3+F4+C5:q G2+G3+D4+C5:8 G2+G3+D4+B4:q.', label: { vi: 'Nghe nốt treo', en: 'Hear the suspension' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt thoát và nốt đón trước', en: 'Escape tone and anticipation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt thoát** (escape tone) đi liền bậc ngược hướng, rồi nhảy về nốt đích. **Nốt đón trước** (anticipation) là nốt của hợp âm sau vang lên sớm.',
            en: 'An **escape tone** steps the other way, then leaps to the goal. An **anticipation** is a note of the next chord sounding early.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cả hai đều trang trí bước {C5}–{B4} của bè soprano, từ IV sang V.',
            en: 'Both decorate the soprano’s step {C5}–{B4}, from IV to V.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'F2+A3+F4+C5:8 F2+A3+F4+D5:8 G2+G3+D4+B4:q || F2+A3+F4+C5:8 F2+A3+F4+B4:8 G2+G3+D4+B4:q ||',
          labels: ['IV', 'ET', 'V', 'IV', 'Ant', 'V'],
          highlight: [1, 4],
        },
        { type: 'play', notes: 'F2+A3+F4+C5:8 F2+A3+F4+D5:8 G2+G3+D4+B4:h', label: { vi: 'Nghe nốt thoát', en: 'Hear the escape tone' } },
        { type: 'play', notes: 'F2+A3+F4+C5:8 F2+A3+F4+B4:8 G2+G3+D4+B4:h', label: { vi: 'Nghe nốt đón trước', en: 'Hear the anticipation' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bè soprano đi xuống {E5}–{D5} ở giọng {C} trưởng. Muốn thêm nốt thoát, nốt đó là nốt nào?',
        en: 'The soprano steps down {E5}–{D5} in {C} major. To add an escape tone, which note is it?',
      },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Nốt thoát đi liền bậc ngược hướng, lên {F5}, rồi nhảy xuống {D5}.',
        en: 'The escape tone steps the other way, up to {F5}, then leaps down to {D5}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt lướt biến âm', en: 'The chromatic passing tone' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi bè đi xuống một nguyên cung, có thể lấp nửa cung ở giữa bằng một **nốt lướt** (passing tone) **biến âm** (chromatic). Ở đây bè soprano đi {E5}–{Eb5}–{D5}, từ I sang V.',
            en: 'When a voice steps down a whole step, you can fill the half step between with a **chromatic** **passing tone**. Here the soprano goes {E5}–{Eb5}–{D5}, from I to V.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+C4@b+G4+E5:8 C3+C4@b+G4+Eb5:8 G2+B3+G4+D5:q ||', labels: ['I', 'P', 'V'], highlight: [1] },
        { type: 'play', notes: 'C3+C4@b+G4+E5:q G2+B3+G4+D5:h', label: { vi: 'Nghe bản gốc', en: 'Hear the original' } },
        { type: 'play', notes: 'C3+C4@b+G4+E5:8 C3+C4@b+G4+Eb5:8 G2+B3+G4+D5:h', label: { vi: 'Nghe nốt lướt biến âm', en: 'Hear the chromatic passing tone' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt {C5} trên phách 2 là nốt gì?', en: 'What is the {C5} on beat 2?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+G3+E4+C5:q G2+G3+D4+C5:8 G2+G3+D4+B4:8 ||', labels: ['I', 'V', ''] },
        { type: 'play', notes: 'C3+G3+E4+C5:q G2+G3+D4+C5:8 G2+G3+D4+B4:q.' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt treo', en: 'A suspension' }, correct: true },
          { text: { vi: 'Nốt đón trước', en: 'An anticipation' } },
          { text: { vi: 'Nốt thoát', en: 'An escape tone' } },
        ],
      },
      reason: {
        vi: '{C5} được giữ từ hợp âm I, vang trên phách của V, rồi đi xuống liền bậc đến {B4}: nốt treo 4–3.',
        en: '{C5} is held from the I chord, sounds on the beat of V, then steps down to {B4}: a 4–3 suspension.',
      },
    },
  ],
} satisfies Lesson
