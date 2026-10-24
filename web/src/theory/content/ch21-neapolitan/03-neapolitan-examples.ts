import type { Lesson } from '@/theory/types'

/**
 * Book 20.2: the Moonlight Sonata's opening (chord plan, simplified), the
 * book's suggestion to swap N6 for another pre-dominant, and the Neapolitan in
 * a major key.
 */
export default {
  id: 'neapolitan-examples',
  title: { vi: 'Hợp âm Napoli trong âm nhạc', en: 'The Neapolitan in music' },
  minutes: 5,
  sources: [{ section: '20.2', url: 'https://musictheory.pugetsound.edu/mt21c/ExamplesOfTheNeapolitanChord.html' }],
  recap: [
    { vi: 'Sonata Ánh trăng của Beethoven mở đầu với VI–N6–V7–i', en: 'Beethoven’s Moonlight Sonata opens with VI–N6–V7–i' },
    { vi: 'iv, ii°6 và N6 có cùng bass, nhưng màu sắc khác nhau', en: 'iv, ii°6 and N6 share a bass but differ in colour' },
    { vi: 'Ở giọng trưởng, N mượn cả bậc 6 hạ từ giọng thứ', en: 'In a major key, N also borrows the lowered sixth from minor' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Sonata Ánh trăng', en: 'The Moonlight Sonata' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chương 1 Sonata Ánh trăng của Beethoven (1802), giọng {C#} thứ, mở đầu bằng các hợp âm này (đã rút gọn). N6 là {D}–{F#}–{A} với {F#} ở bass, ký hiệu D/F♯.',
            en: 'The first movement of Beethoven’s Moonlight Sonata (1802), in {C#} minor, opens with these chords (simplified). N6 is {D}–{F#}–{A} with {F#} in the bass, written D/F♯.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'C#m',
          time: '4/4',
          notes: 'C#3+G#3+C#4+E4:w | A2+A3+C#4+E4:h F#2+A3+D4+F#4:h | G#2+G#3+B#3+F#4:w | C#3+G#3+C#4+E4:w ||',
          labels: ['i', 'VI', 'N6', 'V7', 'i'],
          highlight: [2],
        },
        { type: 'play', notes: 'C#3+G#3+C#4+E4:w A2+A3+C#4+E4:h F#2+A3+D4+F#4:h G#2+G#3+B#3+F#4:w C#3+G#3+C#4+E4:w', bpm: 60 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C#} thứ, nốt gốc của hợp âm Napoli là nốt nào?', en: 'In {C#} minor, what is the root of the Neapolitan chord?' },
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Bậc 2 của giọng {C#} thứ là {D#}; hạ nửa cung thành {D}, nên N là {D}–{F#}–{A}.',
        en: 'Scale degree 2 of {C#} minor is {D#}; lowered a half step it is {D}, so N is {D}–{F#}–{A}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'So với tiền át khác', en: 'Against other pre-dominants' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Thử thay N6 bằng một hợp âm tiền át khác: iv (F♯m) hoặc ii°6 (D♯°/F♯). Cả ba có cùng bass {F#}, nhưng N6 nghe tối và lạ hơn hẳn.',
            en: 'Try another pre-dominant in place of N6: iv (F♯m) or ii°6 (D♯°/F♯). All three share the bass {F#}, but N6 sounds darker and stranger.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C#m', notes: 'F#2+A3+C#4+F#4 F#2+A3+D#4+F#4 F#2+A3+D4+F#4', labels: ['iv', 'ii°6', 'N6'], highlight: [2] },
        { type: 'play', notes: 'A2+A3+C#4+E4:h F#2+A3+C#4+F#4:h G#2+G#3+B#3+F#4:h C#3+G#3+C#4+E4:w', label: { vi: 'Nghe với iv', en: 'Hear it with iv' } },
        { type: 'play', notes: 'A2+A3+C#4+E4:h F#2+A3+D#4+F#4:h G#2+G#3+B#3+F#4:h C#3+G#3+C#4+E4:w', label: { vi: 'Nghe với ii°6', en: 'Hear it with ii°6' } },
        { type: 'play', notes: 'A2+A3+C#4+E4:h F#2+A3+D4+F#4:h G#2+G#3+B#3+F#4:h C#3+G#3+C#4+E4:w', label: { vi: 'Nghe với N6', en: 'Hear it with N6' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, hợp âm thứ hai là gì?', en: 'In {A} minor, what is the second chord?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Am', time: '4/4', notes: 'A2+C4+E4+A4:h D3+D4+F4+Bb4:h | E3+B3@t+E4+G#4:h A2+C4+E4+A4:h ||' },
        { type: 'play', notes: 'A2+C4+E4+A4:h D3+D4+F4+Bb4:h E3+B3+E4+G#4:h A2+C4+E4+A4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iv', en: 'iv' } },
          { text: { vi: 'N6', en: 'N6' }, correct: true },
          { text: { vi: 'ii°6', en: 'ii°6' } },
        ],
      },
      reason: {
        vi: 'Đó là {Bb}–{D}–{F} với {D} ở bass: ♭II ở thế đảo 1, tức N6.',
        en: 'It is {Bb}–{D}–{F} with {D} in the bass: ♭II in first inversion, which is N6.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ở giọng trưởng', en: 'In a major key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm Napoli cũng xuất hiện ở giọng trưởng. Khi đó bậc 6 cũng phải hạ, mượn từ giọng thứ cùng tên, nên N là một **hợp âm mượn** (borrowed chord). Ở giọng {C} trưởng, N vẫn là {Db}–{F}–{Ab}.',
            en: 'The Neapolitan appears in major keys too. There the sixth degree must be lowered as well, borrowed from the parallel minor, so N is a **borrowed chord**. In {C} major, N is still {Db}–{F}–{Ab}.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+E4+G4+C5:h F2+F4+Ab4+Db5:h | G2+D4+G4+B4:h C3+E4+G4+C5:h ||',
          labels: ['I', 'N6', 'V', 'I'],
          highlight: [1],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:h F2+F4+Ab4+Db5:h G2+D4+G4+B4:h C3+E4+G4+C5:w', label: { vi: 'Nghe I–N6–V–I', en: 'Hear I–N6–V–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, N6 gồm những nốt nào (từ bass lên)?', en: 'In {G} major, which notes make N6 (from the bass up)?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C}–{Eb}–{Ab}', en: '{C}–{Eb}–{Ab}' }, correct: true },
          { text: { vi: '{C}–{E}–{A}', en: '{C}–{E}–{A}' } },
          { text: { vi: '{C}–{Eb}–{A}', en: '{C}–{Eb}–{A}' } },
        ],
      },
      reason: {
        vi: 'Bậc 2 của {G} là {A}; hạ thành {Ab}, nên N là {Ab}–{C}–{Eb}, và N6 đặt {C} ở bass.',
        en: 'Scale degree 2 of {G} is {A}; lowered it is {Ab}, so N is {Ab}–{C}–{Eb}, and N6 puts {C} in the bass.',
      },
    },
  ],
} satisfies Lesson
