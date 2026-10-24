import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (27.6) on 27.1-27.5. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 28', en: 'Chapter 28 review' },
  minutes: 4,
  sources: [{ section: '27.6', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeading7thChordsPracticeExercises.html' }],
  recap: [
    { vi: 'Nốt bảy đi xuống liền bậc, trừ trong I–V4/3–I6', en: 'The seventh falls by step, except in I–V4/3–I6' },
    { vi: 'V7–I: giải quyết chặt hoặc tự do', en: 'V7–I: strict or free resolution' },
    { vi: 'vii7 với nốt bảy trên nốt ba: bậc 2 đi lên', en: 'vii7 with the seventh above the third: 2 rises' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {D} trưởng, V7 là {A}–{C#}–{E}–{G}. Nốt bảy {G} đi đến nốt nào?',
        en: 'In {D} major, V7 is {A}–{C#}–{E}–{G}. Where does the seventh, {G}, go?',
      },
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Nốt bảy đi xuống liền bậc: {G} xuống {F#}, nốt ba của hợp âm I.',
        en: 'The seventh falls by step: {G} goes down to {F#}, the third of I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, đây là cách giải quyết nào?', en: 'In {F} major, which resolution is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'F', time: '4/4', notes: 'C3+E4@b+Bb4+G5:h F3+C4@b+A4+F5:h ||', labels: ['V7', 'I'] },
        { type: 'play', notes: 'C3+E4+Bb4+G5:h F3+C4+A4+F5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tự do: cảm âm xuống bậc 5', en: 'Free: the leading tone drops to 5' }, correct: true },
          { text: { vi: 'Chặt: V7 đầy đủ đến I thiếu', en: 'Strict: complete V7 to incomplete I' } },
          { text: { vi: 'Chặt: V7 thiếu đến I đầy đủ', en: 'Strict: incomplete V7 to complete I' } },
        ],
      },
      reason: {
        vi: 'Cảm âm {E} ở bè tenor nhảy xuống {C}, bậc 5, nên V7 đầy đủ đi đến I đầy đủ.',
        en: 'The leading tone, {E}, in the tenor drops to {C}, scale degree 5, so a complete V7 goes to a complete I.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {Bb} trưởng, ii7 là {C}–{Eb}–{G}–{Bb}. Nốt bảy {Bb} đi đến nốt nào?',
        en: 'In {Bb} major, ii7 is {C}–{Eb}–{G}–{Bb}. Where does the seventh, {Bb}, go?',
      },
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'Mọi nốt bảy đều đi xuống liền bậc: {Bb} xuống {A}, nốt ba của V7.',
        en: 'Every seventh falls by step: {Bb} goes down to {A}, the third of V7.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {G} trưởng, viiø7 là {F#}–{A}–{C}–{E}, với {E} nằm trên {A} cách quãng 5. Nốt {A} nên đi đến nốt nào?',
        en: 'In {G} major, viiø7 is {F#}–{A}–{C}–{E}, with {E} a fifth above {A}. Where should the {A} go?',
      },
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: 'Nốt bảy ở trên nốt ba, nên nốt ba {A} (bậc 2) đi lên {B} để tránh quãng 5 song song.',
        en: 'The seventh is above the third, so the third, {A} (scale degree 2), rises to {B} to avoid parallel fifths.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Với tiến trình vòng quãng năm gồm hợp âm bảy thế gốc ở bốn bè, bạn viết thế nào?',
        en: 'For a circle of fifths of root-position seventh chords in four parts, how do you voice them?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Xen kẽ hợp âm đầy đủ và hợp âm thiếu', en: 'Alternate complete and incomplete chords' }, correct: true },
          { text: { vi: 'Mọi hợp âm đều đầy đủ', en: 'Every chord complete' } },
          { text: { vi: 'Mọi hợp âm đều thiếu', en: 'Every chord incomplete' } },
        ],
      },
      reason: {
        vi: 'Xen kẽ đầy đủ và thiếu nốt năm giúp mỗi nốt bảy đi xuống liền bậc mà các bè vẫn đi êm.',
        en: 'Alternating complete chords with chords that lack the fifth lets each seventh fall by step while the voices move smoothly.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, đây là I–V4/3–I6. Nốt bảy làm gì?', en: 'In {C} major, this is I–V4/3–I6. What does the seventh do?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+C4+E4:q D3+G3+B3@t+F4:q E3+G3+C4+G4:h ||', labels: ['I', 'V\n4\n3', 'I\n6'] },
        { type: 'play', notes: 'C3+G3+C4+E4:q D3+G3+B3+F4:q E3+G3+C4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F} đi lên {G}: ngoại lệ được chấp nhận', en: '{F} rises to {G}: the accepted exception' }, correct: true },
          { text: { vi: '{F} đi lên {G}: một lỗi', en: '{F} rises to {G}: an error' } },
          { text: { vi: '{F} đi xuống {E}', en: '{F} falls to {E}' } },
        ],
      },
      reason: {
        vi: 'Khi bass đi lên {C}–{D}–{E}, nốt bảy {F} được đi lên {G}: đây là ngoại lệ duy nhất.',
        en: 'With the bass rising {C}–{D}–{E}, the seventh, {F}, may rise to {G}: it is the one exception.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bảy hay được thêm vào hợp âm có chức năng gì?', en: 'Sevenths are added most often to chords of which function?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Át và tiền át', en: 'Dominant and pre-dominant' }, correct: true },
          { text: { vi: 'Chủ', en: 'Tonic' } },
          { text: { vi: 'Kéo dài chủ', en: 'Tonic prolongation' } },
        ],
      },
      reason: {
        vi: 'Nốt bảy thêm căng thẳng khi sắp về chủ, nên hay ở V, vii°, ii và IV.',
        en: 'A seventh adds tension on the way to the tonic, so it sits most often on V, vii°, ii and IV.',
      },
    },
  ],
} satisfies Lesson
