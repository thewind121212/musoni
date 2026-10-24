import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (20.3) on 20.1-20.2. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 21', en: 'Chapter 21 review' },
  minutes: 4,
  sources: [{ section: '20.3', url: 'https://musictheory.pugetsound.edu/mt21c/NeapolitanPracticeExercises.html' }],
  recap: [
    { vi: 'N là ♭II, hay gặp nhất ở thế đảo 1: N6', en: 'N is ♭II, most common in first inversion: N6' },
    { vi: 'Chức năng tiền át, đi đến V', en: 'Pre-dominant function, going to V' },
    { vi: 'Bậc 2 hạ đi xuống cảm âm', en: 'The lowered second falls to the leading tone' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} thứ, hợp âm này là gì?', en: 'In {D} minor, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Dm', notes: 'G4+Bb4+Eb5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iv', en: 'iv' } },
          { text: { vi: 'ii°6', en: 'ii°6' } },
          { text: { vi: 'N6', en: 'N6' }, correct: true },
        ],
      },
      reason: {
        vi: '{Eb}–{G}–{Bb} là ♭II của giọng {D} thứ, và {G} ở bass nên nó ở thế đảo 1: N6.',
        en: '{Eb}–{G}–{Bb} is ♭II of {D} minor, and {G} in the bass puts it in first inversion: N6.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} thứ, nốt gốc của hợp âm Napoli là nốt nào?', en: 'In {G} minor, what is the root of the Neapolitan chord?' },
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Bậc 2 của giọng {G} thứ là {A}; hạ nửa cung thành {Ab}, nên N là {Ab}–{C}–{Eb}.',
        en: 'Scale degree 2 of {G} minor is {A}; lowered a half step it is {Ab}, so N is {Ab}–{C}–{Eb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu hợp âm của N6 ở giọng {E} thứ là gì?', en: 'What is the lead-sheet symbol for N6 in {E} minor?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'F/A', en: 'F/A' }, correct: true },
          { text: { vi: 'F♯°/A', en: 'F♯°/A' } },
          { text: { vi: 'Am', en: 'Am' } },
        ],
      },
      reason: {
        vi: 'N ở giọng {E} thứ là {F}–{A}–{C}, hợp âm {F} trưởng; N6 đặt {A} ở bass, nên viết F/A.',
        en: 'N in {E} minor is {F}–{A}–{C}, an {F} major triad; N6 puts {A} in the bass, so it is F/A.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {B} thứ, nốt bass của N6 là nốt nào?', en: 'In {B} minor, what is the bass note of N6?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'N ở giọng {B} thứ là {C}–{E}–{G}; ở thế đảo 1, {E} nằm ở bass, bậc 4 của giọng.',
        en: 'N in {B} minor is {C}–{E}–{G}; in first inversion {E} is in the bass, scale degree 4 of the key.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Vì sao hợp âm Napoli có chức năng tiền át?', en: 'Why does the Neapolitan have pre-dominant function?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nó là ii đã biến âm', en: 'It is an altered ii chord' }, correct: true },
          { text: { vi: 'Nó chứa cảm âm', en: 'It holds the leading tone' } },
          { text: { vi: 'Nó dựng trên bậc 5', en: 'It is built on scale degree 5' } },
        ],
      },
      reason: {
        vi: '♭II là ii với nốt gốc hạ nửa cung, nên nó giữ chức năng tiền át của ii.',
        en: '♭II is ii with its root lowered a half step, so it keeps the pre-dominant function of ii.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} thứ, đây là tiến trình nào?', en: 'In {F} minor, which progression is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Fm', time: '4/4', notes: 'F2+C4+F4+Ab4:h Bb2+Db4+Gb4+Bb4:h | C3+C4+E4+G4:h F2+C4+F4+Ab4:h ||' },
        { type: 'play', notes: 'F2+C4+F4+Ab4:h Bb2+Db4+Gb4+Bb4:h C3+C4+E4+G4:h F2+C4+F4+Ab4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'i–iv–V–i', en: 'i–iv–V–i' } },
          { text: { vi: 'i–N6–V–i', en: 'i–N6–V–i' }, correct: true },
          { text: { vi: 'i–ii°6–V–i', en: 'i–ii°6–V–i' } },
        ],
      },
      reason: {
        vi: 'Hợp âm thứ hai là {Gb}–{Bb}–{Db} với {Bb} ở bass: N6, và {Gb} đi xuống cảm âm {E}.',
        en: 'The second chord is {Gb}–{Bb}–{Db} with {Bb} in the bass: N6, and {Gb} falls to the leading tone, {E}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Sau N6, hợp âm thường là gì?', en: 'What chord usually follows N6?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V, hoặc i6/4 rồi V', en: 'V, or i6/4 then V' }, correct: true },
          { text: { vi: 'iv', en: 'iv' } },
          { text: { vi: 'VI', en: 'VI' } },
        ],
      },
      reason: {
        vi: 'N6 là tiền át, nên nó đi đến V, thẳng hoặc qua i6/4.',
        en: 'N6 is a pre-dominant, so it goes to V, directly or through i6/4.',
      },
    },
  ],
} satisfies Lesson
