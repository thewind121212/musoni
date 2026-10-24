import type { Lesson } from '@/theory/types'

/**
 * Book 20.1 (its special character, after the Beethoven figure) with the
 * standard way N6 moves to V: the lowered second falls to the leading tone,
 * often through i6/4.
 */
export default {
  id: 'neapolitan-to-v',
  title: { vi: 'Từ Napoli đến V', en: 'From the Neapolitan to V' },
  minutes: 4,
  sources: [{ section: '20.1', url: 'https://musictheory.pugetsound.edu/mt21c/NeapolitanIntroduction.html' }],
  recap: [
    { vi: 'Bậc 2 hạ đi xuống cảm âm, cách một quãng 3 giảm', en: 'The lowered second falls to the leading tone, a diminished third' },
    { vi: 'N6 đi thẳng đến V, hoặc qua i6/4 rồi đến V', en: 'N6 goes straight to V, or through i6/4 to V' },
    { vi: 'Ở hợp âm Napoli, kết cấu, âm khu hoặc cường độ hay đổi', en: 'Texture, register or dynamics often change at the Neapolitan' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bậc 2 hạ đi xuống', en: 'The lowered second falls' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Từ N6 đến V, bậc 2 hạ ({Db} ở giọng {C} thứ) thường đi xuống cảm âm {B}. Hai nốt cách nhau một quãng 3 giảm, một bước rất đặc trưng của hợp âm Napoli.',
            en: 'From N6 to V, the lowered second ({Db} in {C} minor) usually falls to the leading tone, {B}. The two notes are a diminished third apart, a move typical of the Neapolitan.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'Db5 B4 C5', labels: ['♭2', '7', '1'], highlight: [0, 1] },
        { type: 'play', notes: 'Db5 B4 C5', label: { vi: 'Nghe {Db}–{B}–{C}', en: 'Hear {Db}–{B}–{C}' } },
        { type: 'play', notes: 'F2+F4+Ab4+Db5:h G2+D4+G4+B4:h C3+Eb4+G4+C5:w', label: { vi: 'Nghe N6–V–i', en: 'Hear N6–V–i' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, từ N6 đến V, bậc 2 hạ đi xuống nốt nào?', en: 'In {A} minor, from N6 to V, which note does the lowered second fall to?' },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Bậc 2 hạ là {Bb}; nó đi xuống cảm âm {G#}, cách một quãng 3 giảm.',
        en: 'The lowered second is {Bb}; it falls to the leading tone, {G#}, a diminished third below.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Qua i6/4', en: 'Through i6/4' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'N6 cũng hay đi qua i6/4, hợp âm i ở thế đảo 2, rồi mới đến V. Bass giữ bậc 5 dưới cả i6/4 và V, còn các nốt trên đi xuống từng bậc.',
            en: 'N6 also often passes through i6/4, the i chord in second inversion, on its way to V. The bass holds scale degree 5 under both i6/4 and V while the upper notes step down.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'Cm',
          time: '4/4',
          notes: 'F2+F4+Ab4+Db5:h G2+Eb4+G4+C5:h | G2+D4+F4+B4:h C3+C4+Eb4+C5:h ||',
          labels: ['N6', 'i\n6\n4', 'V7', 'i'],
        },
        { type: 'play', notes: 'F2+F4+Ab4+Db5:h G2+Eb4+G4+C5:h G2+D4+F4+B4:h C3+C4+Eb4+C5:w', label: { vi: 'Nghe N6–i6/4–V7–i', en: 'Hear N6–i6/4–V7–i' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Một màu sắc riêng', en: 'A special character' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm Napoli có màu sắc rất riêng. Khi nó xuất hiện, nhà soạn nhạc đôi khi đổi **kết cấu** (texture), **âm khu** (register) hoặc **cường độ** (dynamics), như Beethoven ở chương 1 Giao hưởng số 7.',
            en: 'The Neapolitan has a special character. When it arrives, composers sometimes change the **texture**, **register** or **dynamics**, as Beethoven does in the first movement of his Seventh Symphony.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong ví dụ của chúng ta ở giọng {D} thứ, N6 nhảy vọt lên âm khu cao.',
            en: 'In our own example in {D} minor, N6 leaps up into a higher register.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'Dm',
          time: '4/4',
          notes: 'D2+D3+F3+A3:h G3+G4+Bb4+Eb5:h | A2+E4+A4+C#5:h D3+F4+A4+D5:h ||',
          labels: ['i', 'N6', 'V', 'i'],
          highlight: [1],
        },
        { type: 'play', notes: 'D2+D3+F3+A3:h G3+G4+Bb4+Eb5:h A2+E4+A4+C#5:h D3+F4+A4+D5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Khi hợp âm Napoli xuất hiện, nhà soạn nhạc đôi khi đổi điều gì?', en: 'When the Neapolitan arrives, what do composers sometimes change?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết cấu, âm khu, cường độ', en: 'Texture, register, dynamics' }, correct: true },
          { text: { vi: 'Số chỉ nhịp', en: 'The time signature' } },
          { text: { vi: 'Hóa biểu', en: 'The key signature' } },
        ],
      },
      reason: {
        vi: 'Màu sắc riêng của hợp âm Napoli thường được làm nổi bật bằng kết cấu, âm khu hoặc cường độ mới.',
        en: 'The Neapolitan’s special character is often set off by a new texture, register or dynamic.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe tiến trình ở giọng {D} thứ. Hợp âm thứ hai là gì?', en: 'Listen to this progression in {D} minor. What is the second chord?' },
      blocks: [{ type: 'play', notes: 'D3+F4+A4+D5:h G2+G4+Bb4+Eb5:h A2+E4+A4+C#5:h D3+F4+A4+D5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iv', en: 'iv' } },
          { text: { vi: 'N6', en: 'N6' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hợp âm thứ hai có {Eb}, bậc 2 hạ của giọng {D} thứ, và nốt này đi xuống {C#} ở V: đó là N6.',
        en: 'The second chord has {Eb}, the lowered second of {D} minor, which falls to {C#} in V: it is N6.',
      },
    },
  ],
} satisfies Lesson
