import type { Lesson } from '@/theory/types'

/** Book 7.4, second half: the half cadence (ends on V) and the deceptive cadence (V to not-I, usually vi). */
export default {
  id: 'half-deceptive',
  title: { vi: 'Kết lửng và kết đánh lừa', en: 'Half and deceptive cadences' },
  minutes: 4,
  sources: [{ section: '7.4', url: 'https://musictheory.pugetsound.edu/mt21c/cadences.html' }],
  recap: [
    { vi: 'Kết lửng: câu nhạc dừng trên V', en: 'Half cadence: the phrase stops on V' },
    { vi: 'Kết đánh lừa: V đi tới vi thay vì I', en: 'Deceptive cadence: V goes to vi instead of I' },
    { vi: 'Nói đúng hơn, kết đánh lừa là V đi tới hợp âm không phải I', en: 'Strictly, a deceptive cadence is V going to anything but I' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Kết lửng', en: 'The half cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết lửng** (half cadence): câu nhạc dừng trên hợp âm V. Nghe như dấu phẩy: chưa xong, còn chờ câu sau.',
            en: 'A **half cadence** is a phrase that stops on the V chord. It sounds like a comma: not finished, waiting for the next phrase.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A4+C5+E5 F4+A4+C5 G4+B4+D5', labels: ['I', 'vi', 'IV', 'V'], highlight: [3] },
        { type: 'play', notes: 'C4+E4+G4:h A4+C5+E5:h F4+A4+C5:h G4+B4+D5:w', label: { vi: 'Nghe câu dừng trên V', en: 'Hear a phrase stop on V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {G} trưởng này kết bằng kết gì?', en: 'This phrase is in {G} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'G', notes: 'G4+B4+D5 D4+F#4+A4 G4+B4+D5 C5+E5+G5 G4+B4+D5 D4+F#4+A4' },
        { type: 'play', notes: 'G4+B4+D5:q D4+F#4+A4:q G4+B4+D5:h C5+E5+G5:q G4+B4+D5:q D4+F#4+A4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết phụ', en: 'Plagal' } },
          { text: { vi: 'Kết lửng', en: 'Half' }, correct: true },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–V–I–IV–I–V, và dừng trên {D}–{F#}–{A}, hợp âm V.',
        en: 'The phrase is I–V–I–IV–I–V and stops on {D}–{F#}–{A}, the V chord.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Kết đánh lừa', en: 'The deceptive cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết đánh lừa** (deceptive cadence): câu nhạc kết bằng V–vi. Tai chờ V về I, nên nghe bất ngờ.',
            en: 'A **deceptive cadence** ends the phrase with V–vi. The ear expects V to go to I, so it comes as a surprise.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 A4+C5+E5', labels: ['I', 'IV', 'V', 'vi'], highlight: [2, 3] },
        { type: 'play', notes: 'C4+E4+G4:h F4+A4+C5:h G4+B4+D5:h A4+C5+E5:w', label: { vi: 'Nghe câu kết V–vi', en: 'Hear a phrase ending V–vi' } },
        {
          type: 'tip',
          text: {
            vi: 'Nói đúng hơn, kết đánh lừa là V đi tới bất kỳ hợp âm nào không phải I. V–vi chỉ là cách hay gặp nhất.',
            en: 'Strictly, a deceptive cadence is V going to anything but I. V–vi is just the most common way.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'So sánh V–I và V–vi', en: 'V–I beside V–vi' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cả hai đều bắt đầu từ V. Ở kết chính, {B} đi lên {C} trong hợp âm I; ở kết đánh lừa, {B} cũng đi lên {C} nhưng bass đi tới {A}, hợp âm vi.',
            en: 'Both start on V. In the authentic cadence {B} rises to {C} in the I chord; in the deceptive cadence {B} also rises to {C}, but the bass moves to {A}, the vi chord.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4+B4+D5 C5+E5+G5 || G4+B4+D5 A4+C5+E5', labels: ['V', 'I', 'V', 'vi'] },
        { type: 'play', notes: 'G4+B4+D5:h C5+E5+G5:w', label: { vi: 'Nghe V–I', en: 'Hear V–I' } },
        { type: 'play', notes: 'G4+B4+D5:h A4+C5+E5:w', label: { vi: 'Nghe V–vi', en: 'Hear V–vi' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {D} trưởng này kết bằng kết gì?', en: 'This phrase is in {D} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'D', notes: 'D4+F#4+A4 G4+B4+D5 A4+C#5+E5 B4+D5+F#5' },
        { type: 'play', notes: 'D4+F#4+A4:h G4+B4+D5:h A4+C#5+E5:h B4+D5+F#5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết lửng', en: 'Half' } },
          { text: { vi: 'Kết đánh lừa', en: 'Deceptive' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai hợp âm cuối là {A}–{C#}–{E} (V) rồi {B}–{D}–{F#} (vi), tức là V–vi.',
        en: 'The last two chords are {A}–{C#}–{E} (V) and {B}–{D}–{F#} (vi): V–vi.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe câu nhạc ở giọng {F} trưởng. Nó kết bằng kết gì?', en: 'Listen to this phrase in {F} major. Which cadence ends it?' },
      blocks: [{ type: 'play', notes: 'F4+A4+C5:h Bb4+D5+F5:h G4+Bb4+D5:h C5+E5+G5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết lửng', en: 'Half' }, correct: true },
          { text: { vi: 'Kết đánh lừa', en: 'Deceptive' } },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–IV–ii–V và dừng trên V, nghe chưa xong.',
        en: 'The phrase is I–IV–ii–V and stops on V, so it sounds unfinished.',
      },
    },
  ],
} satisfies Lesson
