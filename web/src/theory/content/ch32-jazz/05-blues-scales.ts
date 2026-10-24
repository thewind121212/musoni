import type { Lesson } from '@/theory/types'

/** Book 31.8.3-31.11: the jazz blues, the blues and bebop scales, chord-scale relationships, harmonizing the bebop scale. */
export default {
  id: 'blues-scales',
  title: { vi: 'Blues, gam jazz và quan hệ hợp âm–gam', en: 'Blues, jazz scales and chord-scale relationships' },
  minutes: 6,
  sources: [
    { section: '31.8', url: 'https://musictheory.pugetsound.edu/mt21c/StandardChordProgressions.html' },
    { section: '31.9', url: 'https://musictheory.pugetsound.edu/mt21c/JazzScales.html' },
    { section: '31.10', url: 'https://musictheory.pugetsound.edu/mt21c/HowToDetermineChord-ScaleRelationships.html' },
    { section: '31.11', url: 'https://musictheory.pugetsound.edu/mt21c/harmonizing-bebop-scale.html' },
  ],
  recap: [
    { vi: 'Gam blues: 1–♭3–4–♭5–5–♭7; ♭3 và ♭5 là nốt blue', en: 'Blues scale: 1–♭3–4–♭5–5–♭7; ♭3 and ♭5 are blue notes' },
    { vi: 'Gam bebop át là Mixolydian thêm nốt bảy trưởng làm nốt lướt', en: 'The bebop dominant is Mixolydian plus a passing major 7th' },
    { vi: 'Tìm gam cho hợp âm: viết các nốt, lấp chỗ trống, tránh quãng 2 tăng và hai nửa cung liền nhau', en: 'To find a chord’s scale: write its notes and fill the gaps, avoiding augmented 2nds and consecutive half steps' },
    { vi: 'Hòa âm gam bebop: hợp âm chủ xen hợp âm vii°7', en: 'Harmonizing the bebop scale: tonic chords between vii°7 chords' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Blues jazz', en: 'The jazz blues' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Blues là một vòng 12 ô nhịp. Đây là một bản blues jazz thường gặp ở giọng {F}: F7, B♭7, F7, Cm7 F7 | B♭7, B°7, F7, D7 | Gm7, C7, F7 D7, Gm7 C7.',
            en: 'The blues is a 12-measure form. Here is a common jazz blues in {F}: F7, B♭7, F7, Cm7 F7 | B♭7, B°7, F7, D7 | Gm7, C7, F7 D7, Gm7 C7.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nghe bản này với nốt gốc và nốt dẫn hướng: các bè trên đi liền bậc hoặc quãng 3, chỉ bè bass nhảy.',
            en: 'Hear it with roots and guide tones: the upper voices move by step or by 3rd; only the bass leaps.',
          },
        },
        {
          type: 'play',
          notes: 'F2+Eb3+A3:h Bb2+D3+Ab3:h F2+Eb3+A3:h C3+Eb3+Bb3:q F2+Eb3+A3:q Bb2+D3+Ab3:h B2+D3+Ab3:h F2+Eb3+A3:h D3+F#3+C4:h G2+F3+Bb3:h C3+E3+Bb3:h F2+Eb3+A3:q D3+F#3+C4:q G2+F3+Bb3:q C3+E3+Bb3:q F2+Eb3+A3:h',
          bpm: 110,
          label: { vi: 'Nghe blues ở {F}', en: 'Hear the blues in {F}' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Gam blues', en: 'The blues scale' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gam blues** (blues scale) là gam ngũ cung thứ (1–♭3–4–5–♭7) thêm nốt ♭5: 1–♭3–4–♭5–5–♭7. Nốt ♭3 và ♭5 là **nốt blue** (blue notes), vì chúng không thuộc hợp âm ba trưởng hay hợp âm bảy át.',
            en: 'The **blues scale** is the minor pentatonic (1–♭3–4–5–♭7) with an added ♭5: 1–♭3–4–♭5–5–♭7. The ♭3 and ♭5 are **blue notes**, because they are not chord tones of a major triad or dominant seventh.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C5 Bb4 G4 Gb4 F4 Eb4 C4', labels: ['1', '♭7', '5', '♭5', '4', '♭3', '1'], highlight: [3, 5] },
        { type: 'play', notes: 'C5 Bb4 G4 Gb4 F4 Eb4 C4', label: { vi: 'Nghe gam blues {C} đi xuống', en: 'Hear the {C} blues scale, descending' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt ♭3 của gam blues {A} là nốt gì?', en: 'What is the ♭3 of the {A} blues scale?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4', labels: ['1'] }],
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Nốt ba trưởng trên {A} là {C#}; hạ nửa cung thành {C}.',
        en: 'The major 3rd above {A} is {C#}; lowered a half step it is {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Gam bebop', en: 'The bebop scale' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gam bebop át** (bebop dominant scale) là gam Mixolydian thêm nốt bảy trưởng. Nốt thêm là nốt lướt nửa cung khi đi xuống, 8–7–♭7, và gam này hay dùng trên hợp âm bảy át.',
            en: 'The **bebop dominant scale** is the Mixolydian scale with an added major 7th. The added note is a chromatic passing tone in descending lines, 8–7–♭7, and the scale is used most over the dominant seventh.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Cách tập đơn giản nhất: chạy gam đi xuống bằng nốt móc đơn, bắt đầu ở phách mạnh, từ nốt gốc, nốt ba, nốt năm hay nốt bảy.',
            en: 'The simplest way to start: play it down in eighth notes from the downbeat, starting on the root, 3rd, 5th or 7th.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:8 B4:8 Bb4:8 A4:8 G4:8 F4:8 E4:8 D4:8 | C4:w', labels: ['8', '7', '♭7', '6', '5', '4', '3', '2', '1'], highlight: [1] },
        { type: 'play', notes: 'C5:8 B4:8 Bb4:8 A4:8 G4:8 F4:8 E4:8 D4:8 C4:w', bpm: 120, label: { vi: 'Nghe gam bebop {C}', en: 'Hear the {C} bebop scale' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm gam cho hợp âm', en: 'Finding a scale for a chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Viết mọi nốt của hợp âm thành gam trong một quãng tám, rồi lấp chỗ trống, tránh quãng 2 tăng và hai nửa cung liền nhau. Gmaj7(♯11) là {G} {B} {D} {F#} {A} {C#}; lấp {E} vào là được gam {G} Lydian.',
            en: 'Write all the chord’s notes as a scale within an octave, then fill the gaps, avoiding augmented 2nds and consecutive half steps. Gmaj7(♯11) is {G} {B} {D} {F#} {A} {C#}; fill in {E} and you have {G} Lydian.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Vài cặp thường gặp: Cmaj7 với gam trưởng hoặc Lydian; Cm7 với Dorian hoặc thứ tự nhiên; C7 với Mixolydian; C7(♭9) với gam bát âm nửa–nguyên; C7alt với gam altered.',
            en: 'Common pairs: Cmaj7 with major or Lydian; Cm7 with Dorian or natural minor; C7 with Mixolydian; C7(♭9) with the half-whole octatonic; C7alt with the altered (diminished-whole tone) scale.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4 A4 B4 C#5 D5 E5 F#5 G5', highlight: [5] },
        { type: 'play', notes: 'G4 A4 B4 C#5 D5 E5 F#5 G5', label: { vi: 'Nghe gam {G} Lydian', en: 'Hear {G} Lydian' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Gam nào hợp với C7?', en: 'Which scale fits C7?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C} Lydian', en: '{C} Lydian' } },
          { text: { vi: '{C} Mixolydian', en: '{C} Mixolydian' }, correct: true },
          { text: { vi: '{C} Dorian', en: '{C} Dorian' } },
        ],
      },
      reason: {
        vi: 'C7 có nốt ba trưởng {E} và nốt bảy thứ {Bb}; lấp chỗ trống bằng nốt thường cho gam {C} Mixolydian.',
        en: 'C7 has a major 3rd, {E}, and a minor 7th, {Bb}; filling the gaps with plain notes gives {C} Mixolydian.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hòa âm gam bebop', en: 'Harmonizing the bebop scale' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Gam bebop trưởng là 1–2–3–4–5–♯5–6–7. Hòa âm bốn bè cho nó: các nốt 1, 3, 5, 6 mang hợp âm chủ C6, mọi nốt còn lại mang hợp âm vii°7 ({B} {D} {F} {Ab}) ở các thế đảo khác nhau.',
            en: 'The bebop major scale is 1–2–3–4–5–♯5–6–7. In a four-part harmonization, degrees 1, 3, 5 and 6 carry the tonic C6, and every other note carries a vii°7 ({B} {D} {F} {Ab}) in various inversions.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4+A4+C5 F4+Ab4+B4+D5 G4+A4+C5+E5 Ab4+B4+D5+F5 A4+C5+E5+G5', labels: ['C6', 'B°7', 'C6', 'B°7', 'C6'] },
        { type: 'play', notes: 'E4+G4+A4+C5:q F4+Ab4+B4+D5:q G4+A4+C5+E5:q Ab4+B4+D5+F5:q A4+C5+E5+G5:q B4+D5+F5+G#5:q C5+E5+G5+A5:q D5+F5+Ab5+B5:q E5+G5+A5+C6:w', bpm: 100, label: { vi: 'Nghe cả gam', en: 'Hear the whole scale' } },
      ],
    },
  ],
} satisfies Lesson
