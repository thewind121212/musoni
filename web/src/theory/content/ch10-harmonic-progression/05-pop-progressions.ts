import type { Lesson } from '@/theory/types'

/**
 * Book 9.6 (the subtonic ♭VII in major), 9.7 (the best-seller I–V–vi–IV)
 * and 9.8 (i–VII–VI–VII). The book's song examples are left out: the
 * progressions are shown in our own voicings. No practice link: no drill
 * asks progressions, and the chords drill's minor keys use V, not VII.
 */
export default {
  id: 'pop-progressions',
  title: { vi: 'Tiến trình trong nhạc pop', en: 'Progressions in popular music' },
  minutes: 5,
  sources: [
    { section: '9.6', url: 'https://musictheory.pugetsound.edu/mt21c/SubtonicVIIinPopMusic.html' },
    { section: '9.7', url: 'https://musictheory.pugetsound.edu/mt21c/BestsellerProgression.html' },
    { section: '9.8', url: 'https://musictheory.pugetsound.edu/mt21c/i-VII-VI-VII.html' },
  ],
  recap: [
    { vi: '♭VII trong giọng trưởng đứng trước mọi chức năng trừ chủ', en: '♭VII in major can come before every function except tonic' },
    { vi: 'Best-Seller: I–V–vi–IV, xoay thành vi–IV–I–V', en: 'The best-seller: I–V–vi–IV, rotated to vi–IV–I–V' },
    { vi: 'vi–IV–I–V nghe ở giọng thứ là i–VI–III–VII', en: 'Heard in minor, vi–IV–I–V is i–VI–III–VII' },
    { vi: 'i–VII–VI–VII gần giống tiến trình Andalusia', en: 'i–VII–VI–VII is close to the Andalusian progression' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: '♭VII trong giọng trưởng', en: '♭VII in major' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc rock và pop hay mượn hợp âm trên **bậc VII hạ** (subtonic) vào giọng trưởng, viết là ♭VII. Ở giọng {C} trưởng đó là {Bb} {D} {F}.',
            en: 'Rock and popular music often bring the **subtonic** chord into a major key, written ♭VII. In {C} major it is {Bb} {D} {F}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '♭VII có thể đứng trước hợp âm chủ, át và tiền át, tức thay được mọi chức năng trừ chủ. Một kết thường gặp là ♭VII–IV–I.',
            en: '♭VII can come before tonic, dominant and pre-dominant chords, so it can stand in for any function except tonic. A common ending is ♭VII–IV–I.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'Bb4+D5+F5 F4+A4+C5 C4+E4+G4', labels: ['♭VII', 'IV', 'I'] },
        { type: 'play', notes: 'Bb2+Bb4+D5+F5:h F2+F4+A4+C5:h C3+C4+E4+G4:w', label: { vi: 'Nghe ♭VII–IV–I', en: 'Hear ♭VII–IV–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, hợp âm ♭VII có nốt gốc là gì?', en: 'In {G} major, what is the root of ♭VII?' },
      answer: { type: 'key', note: 'F' },
      reason: {
        vi: 'Cảm âm của {G} trưởng là {F#}; hạ nửa cung ta được bậc VII hạ {F}, hợp âm {F} trưởng.',
        en: 'The leading tone of {G} major is {F#}; a half step lower is the subtonic {F}, the {F} major chord.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiến trình Best-Seller', en: 'The best-seller progression' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'I–V–vi–IV có mặt trong rất nhiều bài pop, nên được gọi là **tiến trình Best-Seller** (best-seller progression). Nó hay được xoay thành vi–IV–I–V hoặc IV–I–V–vi.',
            en: 'I–V–vi–IV turns up in a great many popular songs, so it is called the **best-seller progression**. It is often rotated to vi–IV–I–V or IV–I–V–vi.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 G4+B4+D5 A4+C5+E5 F4+A4+C5', labels: ['I', 'V', 'vi', 'IV'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:h F2+F4+A4+C5:h C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:h F2+F4+A4+C5:h', label: { vi: 'Nghe I–V–vi–IV', en: 'Hear I–V–vi–IV' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Trưởng hay thứ?', en: 'Major or minor?' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'vi–IV–I–V cũng có thể nghe ở giọng thứ song song: i–VI–III–VII. Bạn nghe nó trưởng hay thứ tùy hợp âm nào nghe như chủ: hợp âm đầu, hay hợp âm thứ ba.',
            en: 'vi–IV–I–V can also be heard in the relative minor: i–VI–III–VII. Whether you hear major or minor depends on which chord sounds like the tonic: the first, or the third.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4+C5+E5 F4+A4+C5 C4+E4+G4 G4+B4+D5', labels: ['vi', 'IV', 'I', 'V'] },
        { type: 'play', notes: 'A2+A4+C5+E5:h F2+F4+A4+C5:h C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:w', label: { vi: 'Nghe ở giọng {A} thứ', en: 'Hear it in {A} minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Nếu nghe tiến trình này ở giọng {A} thứ, hợp âm {C} trưởng mang bậc La Mã nào?',
        en: 'If you hear this progression in {A} minor, which Roman numeral does the {C} major chord get?',
      },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4+C5+E5 F4+A4+C5 C4+E4+G4 G4+B4+D5', highlight: [2] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I', en: 'I' } },
          { text: { vi: 'III', en: 'III' }, correct: true },
          { text: { vi: 'VI', en: 'VI' } },
        ],
      },
      reason: {
        vi: '{C} là bậc 3 của gam {A} thứ, nên hợp âm {C} trưởng là III.',
        en: '{C} is the third degree of {A} minor, so the {C} major chord is III.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'i–VII–VI–VII', en: 'i–VII–VI–VII' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng thứ, i–VII–VI–VII có bass đi xuống {A}, {G}, {F} như **tiến trình Andalusia** (Andalusian progression) của nhạc flamenco. Khác ở hợp âm cuối: tiến trình Andalusia kết bằng V.',
            en: 'In minor, i–VII–VI–VII has a bass that falls {A}, {G}, {F}, like the **Andalusian progression** of flamenco. The difference is the last chord: the Andalusian progression ends on V.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4+C5+E5 G4+B4+D5 F4+A4+C5 G4+B4+D5', labels: ['i', 'VII', 'VI', 'VII'] },
        { type: 'play', notes: 'A2+A4+C5+E5:h G2+G4+B4+D5:h F2+F4+A4+C5:h G2+G4+B4+D5:h A2+A4+C5+E5:w', label: { vi: 'Nghe i–VII–VI–VII', en: 'Hear i–VII–VI–VII' } },
        { type: 'play', notes: 'A2+A4+C5+E5:h G2+G4+B4+D5:h F2+F4+A4+C5:h E2+E4+G#4+B4:w', label: { vi: 'Nghe tiến trình Andalusia', en: 'Hear the Andalusian progression' } },
        {
          type: 'tip',
          text: {
            vi: 'Nó cũng xoay được thành VI–VII–i–VII, và nghe ở giọng trưởng song song thì là vi–V–IV–V.',
            en: 'It also rotates to VI–VII–i–VII, and heard in the relative major it is vi–V–IV–V.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Tiến trình Andalusia ở giọng {A} thứ kết bằng hợp âm có nốt gốc nào?',
        en: 'In {A} minor, what is the root of the chord that ends the Andalusian progression?',
      },
      blocks: [{ type: 'play', notes: 'A2+A4+C5+E5:h G2+G4+B4+D5:h F2+F4+A4+C5:h E2+E4+G#4+B4:w' }],
      answer: { type: 'key', note: 'E' },
      reason: {
        vi: 'Tiến trình Andalusia kết bằng V, và bậc 5 của gam {A} thứ là {E}.',
        en: 'The Andalusian progression ends on V, and the fifth degree of {A} minor is {E}.',
      },
    },
  ],
} satisfies Lesson
