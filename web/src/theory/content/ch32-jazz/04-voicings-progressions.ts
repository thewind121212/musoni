import type { Lesson } from '@/theory/types'

/** Book 31.7-31.8.2: guide tones, spread and close voicings, II–V–I in major and minor, the turnaround, tritone substitution. */
export default {
  id: 'voicings-progressions',
  title: { vi: 'Nốt dẫn hướng, cách xếp và vòng II–V–I', en: 'Guide tones, voicings and II–V–I' },
  minutes: 5,
  sources: [
    { section: '31.7', url: 'https://musictheory.pugetsound.edu/mt21c/JazzChordVoicings.html' },
    { section: '31.8', url: 'https://musictheory.pugetsound.edu/mt21c/StandardChordProgressions.html' },
  ],
  recap: [
    { vi: 'Nốt dẫn hướng là nốt ba và nốt bảy; trong II–V–I chúng đi liền bậc', en: 'Guide tones are the 3rd and 7th; in II–V–I they move by step' },
    { vi: 'Xếp rộng: nốt gốc, ba, bảy ở dưới; xếp hẹp: bốn nốt sát nhau trên nốt bass', en: 'Spread: root, 3rd, 7th at the bottom; close: four notes together over the bass' },
    { vi: 'II–V–I trưởng: Dm9–G9(13)–Cmaj9; thứ: Dø7–G7alt–Cm6/9', en: 'II–V–I in major: Dm9–G9(13)–Cmaj9; in minor: Dø7–G7alt–Cm6/9' },
    { vi: 'Hai hợp âm át cách nhau quãng ba cung có chung nốt dẫn hướng', en: 'Two dominant sevenths a tritone apart share their guide tones' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt dẫn hướng', en: 'Guide tones' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt dẫn hướng** (guide tones) là nốt ba và nốt bảy của hợp âm. Trong các tiến trình đi theo vòng quãng năm, như II–V–I, nốt dẫn hướng chỉ đi liền bậc.',
            en: '**Guide tones** are the 3rd and the 7th of a chord. In any circle-of-fifths progression, such as II–V–I, the guide tones move by step.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+C5 F4+B4 E4+B4', labels: ['Dm7', 'G7', 'Cmaj7'] },
        { type: 'play', notes: 'D3+F4+C5:h G2+F4+B4:h C3+E4+B4:w', bpm: 80, label: { vi: 'Nghe với nốt gốc ở bass', en: 'Hear them over the roots' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt dẫn hướng của A7 là những nốt nào?', en: 'What are the guide tones of A7?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C#} và {G}', en: '{C#} and {G}' }, correct: true },
          { text: { vi: '{E} và {G}', en: '{E} and {G}' } },
          { text: { vi: '{A} và {E}', en: '{A} and {E}' } },
        ],
      },
      reason: {
        vi: 'A7 là {A} {C#} {E} {G}: nốt ba là {C#}, nốt bảy là {G}.',
        en: 'A7 is {A} {C#} {E} {G}: the 3rd is {C#} and the 7th is {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Xếp rộng và xếp hẹp', en: 'Spread and close voicings' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Xếp rộng** (spread voicing): năm nốt, nốt gốc, nốt ba và nốt bảy nằm dưới cùng, các nốt khác ở trên, thường cách nhau quãng 4 hoặc quãng 5. **Xếp hẹp** (close voicing): nốt bass ở tay trái, bốn nốt sát nhau ở tay phải, thấp nhất thường là nốt bảy hoặc nốt ba.',
            en: 'A **spread voicing** has five notes, with the root, 3rd and 7th at the bottom and the rest above, often a 4th or 5th apart. A **close voicing** has the bass in the left hand and four notes close together in the right, usually with the 7th or 3rd lowest.',
          },
        },
        { type: 'keys', notes: 'C3 E3 Bb3 D4 A4', from: 'C3', caption: { vi: 'C9(13) xếp rộng:', en: 'C9(13), spread:' } },
        { type: 'play', notes: 'C3+E3+Bb3+D4+A4' },
        { type: 'keys', notes: 'C3 Bb3 D4 E4 A4', from: 'C3', caption: { vi: 'C9(13) xếp hẹp:', en: 'C9(13), close:' } },
        { type: 'play', notes: 'C3+Bb3+D4+E4+A4' },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm sus: xếp nốt bốn như nốt ba. Hợp âm 6 hay 6/9: xếp nốt sáu như nốt bảy. Cần thì bỏ nốt năm để giữ đủ năm nốt.',
            en: 'In a sus chord, voice the 4th like the 3rd; in a 6 or 6/9 chord, voice the 6th like the 7th. Leave out the 5th when needed to keep five parts.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Vòng II–V–I', en: 'The II–V–I' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'II–V–I là một trong những **tiến trình hợp âm** (chord progression) phổ biến nhất của jazz. Ở giọng {C} trưởng: Dm9–G9(13)–Cmaj9. Ở giọng {C} thứ: Dø7–G7alt–Cm6/9.',
            en: 'The II–V–I is one of the most common **chord progressions** in jazz. In {C} major it is Dm9–G9(13)–Cmaj9. In {C} minor it is Dø7–G7alt–Cm6/9.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+A4+C5+E5 F4+A4+B4+E5 E4+G4+B4+D5', labels: ['Dm9', 'G9(13)', 'Cmaj9'] },
        { type: 'play', notes: 'D3+F4+A4+C5+E5:h G2+F4+A4+B4+E5:h C3+E4+G4+B4+D5:w', bpm: 80, label: { vi: 'Nghe II–V–I ở {C} trưởng', en: 'Hear II–V–I in {C} major' } },
        { type: 'play', notes: 'D3+F4+Ab4+C5:h G2+F4+Ab4+B4+Eb5:h C3+Eb4+G4+A4+D5:w', bpm: 80, label: { vi: 'Nghe II–V–I ở {C} thứ', en: 'Hear II–V–I in {C} minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, II–V–I là gì?', en: 'What is II–V–I in {F} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Dm7–G7–Cmaj7', en: 'Dm7–G7–Cmaj7' } },
          { text: { vi: 'Gm7–C7–Fmaj7', en: 'Gm7–C7–Fmaj7' }, correct: true },
          { text: { vi: 'Gm7–C7–B♭maj7', en: 'Gm7–C7–B♭maj7' } },
        ],
      },
      reason: {
        vi: 'Ở giọng {F} trưởng, bậc II là {G}, bậc V là {C}, bậc I là {F}.',
        en: 'In {F} major, II is {G}, V is {C} and I is {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Vòng quay về và thay thế quãng ba cung', en: 'Turnarounds and tritone substitution' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'III–VI–II–V là một **vòng quay về** (turnaround): nó thay hợp âm I đứng yên ở hai ô nhịp cuối, dẫn về hợp âm I khi bài trở lại từ đầu. Đổi cả bốn thành hợp âm bảy át, ở giọng {C}: E7–A7–D7–G7.',
            en: 'III–VI–II–V is a **turnaround**: it replaces the static I chord in the last two measures with motion that leads back to I when the tune repeats from the top. Make all four dominant sevenths, and in {C} you get E7–A7–D7–G7.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hai hợp âm bảy át cách nhau **quãng ba cung** (tritone) có chung nốt dẫn hướng, nên hợp âm này thay được hợp âm kia: đó là **thay thế quãng ba cung** (tritone substitution). E7–A7–D7–G7 thành E7–E♭7–D7–D♭7.',
            en: 'Two dominant sevenths a **tritone** apart share their guide tones, so one can replace the other: a **tritone substitution**. E7–A7–D7–G7 becomes E7–E♭7–D7–D♭7.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+B4 F4+Cb5', labels: ['G7', 'D♭7'] },
        { type: 'play', notes: 'G2+F4+B4:h Db3+F4+Cb5:h C3+E4+B4:w', bpm: 80, label: { vi: 'Nghe G7, D♭7 rồi về Cmaj7', en: 'Hear G7, D♭7, then Cmaj7' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm bảy át nào thay thế quãng ba cung cho D7? Chọn nốt gốc.', en: 'Which dominant seventh is the tritone substitute for D7? Pick its root.' },
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Cách {D} một quãng ba cung là {Ab}; A♭7 có chung nốt dẫn hướng {F#}/{Gb} và {C} với D7.',
        en: 'A tritone from {D} is {Ab}; A♭7 shares the guide tones {F#}/{Gb} and {C} with D7.',
      },
    },
  ],
} satisfies Lesson
