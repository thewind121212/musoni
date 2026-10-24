import type { Lesson } from '@/theory/types'

/**
 * Book 10.4 appoggiatura (leap, then step; usually accented; either
 * direction) and 10.5 escape tone (step, then leap the other way), with the
 * four "approached by / left by" patterns side by side. Our own examples in
 * place of the book's songs and score excerpts. No practice link.
 */
export default {
  id: 'appoggiatura-escape',
  title: { vi: 'Nốt dựa và nốt thoát', en: 'Appoggiaturas and escape tones' },
  minutes: 4,
  sources: [
    { section: '10.4', url: 'https://musictheory.pugetsound.edu/mt21c/Appoggiatura.html' },
    { section: '10.5', url: 'https://musictheory.pugetsound.edu/mt21c/EscapeTone.html' },
  ],
  recap: [
    { vi: 'Nốt dựa (App): nhảy đến, rồi rời đi liền bậc', en: 'Appoggiatura (App): approached by leap, left by step' },
    { vi: 'Nốt dựa thường có nhấn, nên nghe rất tình cảm', en: 'An appoggiatura is usually accented, which makes it expressive' },
    { vi: 'Nốt thoát (ET): liền bậc đến, rồi nhảy theo hướng ngược lại', en: 'Escape tone (ET): approached by step, left by leap the other way' },
    { vi: 'Gọi tên theo hai bước: bước đến và bước rời', en: 'Name it by two moves: how it is approached and how it is left' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt dựa', en: 'The appoggiatura' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt dựa** (appoggiatura), ghi tắt App, đến bằng một bước nhảy và rời đi liền bậc. Nó thường có nhấn, rơi vào phách, nên nghe rất tình cảm.',
            en: 'An **appoggiatura**, marked App, is approached by leap and left by step. It is usually accented, on the beat, which makes it very expressive.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E3+G3+G4:h | G2+D3+G3+C5:q G2+D3+G3+B4:q | C3+E3+G3+C5:h ||', labels: ['', 'App', '', ''] },
        { type: 'play', notes: 'C3+E3+G3+G4:h G2+D3+G3+C5:q G2+D3+G3+B4:q C3+E3+G3+C5:h' },
        {
          type: 'text',
          text: {
            vi: 'Bước nhảy đến và bước liền bậc rời đi có thể theo bất kỳ hướng nào. Ở đây giai điệu nhảy xuống {A4}, rồi đi lên {B4}.',
            en: 'The leap to it and the step away can go either way. Here the melody leaps down to {A4}, then steps up to {B4}.',
          },
        },
        { type: 'play', notes: 'C3+E3+G3+E5:h G2+D3+G3+A4:q G2+D3+G3+B4:q C3+E3+G3+C5:h', label: { vi: 'Nghe nốt dựa đi lên', en: 'Hear an appoggiatura that resolves up' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm ở ô nhịp 2 là {F} {A} {C}. Nốt {G5} là nốt gì?', en: 'The chord in measure 2 is {F} {A} {C}. What is the {G5}?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'C3+E3+G3+C5:h | F2+C3+A3+G5:q F2+C3+A3+F5:q ||' },
        { type: 'play', notes: 'C3+E3+G3+C5:h F2+C3+A3+G5:q F2+C3+A3+F5:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt lướt', en: 'A passing tone' } },
          { text: { vi: 'Nốt dựa', en: 'An appoggiatura' }, correct: true },
          { text: { vi: 'Nốt thêu', en: 'A neighbor tone' } },
        ],
      },
      reason: {
        vi: 'Giai điệu nhảy từ {C5} lên {G5}, nốt ngoài hợp âm, rồi đi liền bậc xuống {F5}: đó là nốt dựa.',
        en: 'The melody leaps from {C5} up to {G5}, a non-chord tone, then steps down to {F5}: an appoggiatura.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt thoát', en: 'The escape tone' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt thoát** (escape tone), ghi tắt ET, đến bằng một bước liền bậc, rồi nhảy theo hướng ngược lại. Nó thường không nhấn, ngay trước phách sau.',
            en: 'An **escape tone**, marked ET, is approached by step and left by leap in the opposite direction. It is usually unaccented, just before the next beat.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'C3+E3+G3+E5:q C3+E3+G3+C5:8 C3+E3+G3+D5:8 | G2+D3+G3+B4:h | C3+E3+G3+C5:h ||',
          labels: ['', '', 'ET', '', ''],
        },
        { type: 'play', notes: 'C3+E3+G3+E5:q C3+E3+G3+C5:8 C3+E3+G3+D5:8 G2+D3+G3+B4:h C3+E3+G3+C5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Nốt dựa và nốt thoát như hai ảnh soi gương: nốt dựa nhảy rồi đi liền bậc, nốt thoát đi liền bậc rồi nhảy.',
            en: 'The appoggiatura and the escape tone mirror each other: an appoggiatura leaps then steps, an escape tone steps then leaps.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {C} trưởng, giai điệu đi liền bậc lên từ {C5} đến một nốt thoát, rồi nhảy xuống {B4}. Nốt thoát là nốt gì?',
        en: 'In {C} major, the melody steps up from {C5} to an escape tone, then leaps down to {B4}. What is the escape tone?',
      },
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Bậc ngay trên {C5} trong gam {C} trưởng là {D5}, và từ {D5} nhảy một quãng 3 xuống {B4}.',
        en: 'The degree just above {C5} in {C} major is {D5}, and from {D5} the melody leaps a third down to {B4}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bốn cách đi', en: 'Four patterns' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Muốn gọi đúng tên, hãy nhìn bước đến và bước rời: lướt là liền bậc rồi liền bậc cùng hướng, thêu là liền bậc rồi quay về. Dựa là nhảy rồi liền bậc, thoát là liền bậc rồi nhảy ngược hướng.',
            en: 'To name it, look at how it is approached and left: a passing tone steps and steps on, a neighbor steps and steps back. An appoggiatura leaps then steps, an escape tone steps then leaps the other way.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'E5:q D5:q C5:q || E5:q F5:q E5:q || G4:q D5:q C5:q || E5:q D5:q G5:q ||',
          labels: ['', 'P', '', '', 'N', '', '', 'App', '', '', 'ET', ''],
        },
        {
          type: 'play',
          notes: 'C3+E3+G3+E5:q C3+E3+G3+D5:q C3+E3+G3+C5:h C3+E3+G3+E5:q C3+E3+G3+F5:q C3+E3+G3+E5:h C3+E3+G3+G4:q C3+E3+G3+D5:q C3+E3+G3+C5:h C3+E3+G3+E5:q C3+E3+G3+D5:q C3+E3+G3+G5:h',
          label: { vi: 'Nghe cả bốn trên hợp âm {C} {E} {G}', en: 'Hear all four over the chord {C} {E} {G}' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào đến bằng bước nhảy và rời đi liền bậc?', en: 'Which is approached by leap and left by step?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt thoát', en: 'An escape tone' } },
          { text: { vi: 'Nốt lướt', en: 'A passing tone' } },
          { text: { vi: 'Nốt dựa', en: 'An appoggiatura' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nốt dựa nhảy đến rồi đi liền bậc; nốt thoát thì ngược lại, còn nốt lướt đi liền bậc cả hai phía.',
        en: 'An appoggiatura is leapt to and left by step; an escape tone is the reverse, and a passing tone steps on both sides.',
      },
    },
  ],
} satisfies Lesson
