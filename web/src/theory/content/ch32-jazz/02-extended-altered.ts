import type { Lesson } from '@/theory/types'

/** Book 31.1-31.3: 11ths and 13ths, the 6 vs 13 and sus vs 11 rules, ♭5 vs ♯11, 6/9 chords, altered dominant sevenths. */
export default {
  id: 'extended-altered',
  title: { vi: 'Nốt 11, 13 và hợp âm át biến âm', en: 'Elevenths, thirteenths and altered dominants' },
  minutes: 5,
  sources: [
    { section: '31.1', url: 'https://musictheory.pugetsound.edu/mt21c/JazzChordBasics.html' },
    { section: '31.2', url: 'https://musictheory.pugetsound.edu/mt21c/ChordSymbolSpecifics.html' },
    { section: '31.3', url: 'https://musictheory.pugetsound.edu/mt21c/AlteredDominantSeventhChords.html' },
  ],
  recap: [
    { vi: 'Nốt 11 là nốt 4, nốt 13 là nốt 6, cao hơn một quãng tám', en: 'The 11th is the 4th and the 13th the 6th, an octave higher' },
    { vi: 'Có nốt bảy thì gọi nốt sáu là 13; không có nốt ba thì gọi nốt bốn là sus', en: 'With a 7th the 6th is a 13; with no 3rd the 4th is sus' },
    { vi: 'Hợp âm 6/9 có nốt sáu và nốt chín, không có nốt bảy', en: 'A 6/9 chord has a 6th and a 9th, no 7th' },
    { vi: 'Hợp âm át biến âm nâng hoặc hạ nốt năm, nốt chín', en: 'An altered dominant raises or lowers the 5th or the 9th' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt 11 và nốt 13', en: 'Elevenths and thirteenths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt 11** (eleventh) là nốt 4, **nốt 13** (thirteenth) là nốt 6, cùng cao hơn một quãng tám và lấy từ gam trưởng. Mọi số nhỏ hơn số cao nhất đều được hiểu là có: C13 là {C} {E} {G} {Bb} {D} {F} {A}.',
            en: 'The **eleventh** is the 4th and the **thirteenth** the 6th, each an octave higher and taken from the major scale. Every number up to the highest is assumed: C13 is {C} {E} {G} {Bb} {D} {F} {A}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt 11 thường bị bỏ vì nghịch với nốt ba trưởng. Ở đây ta ghi rõ: C9(13) là {C} {E} {G} {Bb} {D} {A}, không có {F}.',
            en: 'The plain 11th is usually left out because it clashes with the major 3rd. Here we spell it out: C9(13) is {C} {E} {G} {Bb} {D} {A}, with no {F}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4+D5+A5', labels: ['C9(13)'] },
        { type: 'play', notes: 'C4+E4+G4+Bb4+D5+A5', label: { vi: 'Nghe C9(13)', en: 'Hear C9(13)' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: '6 hay 13, sus hay 11', en: '6 or 13, sus or 11' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chỉ gọi nốt sáu là 6 khi không có nốt bảy; có nốt bảy thì gọi là 13. Chỉ gọi nốt bốn là sus khi không có nốt ba; có nốt ba thì gọi là 11.',
            en: 'Label the 6th "6" only if the 7th is not present; with a 7th, call it "13". Label the 4th "sus" only if the 3rd is not present; with a 3rd, call it "11".',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+A4 C4+F4+G4+Bb4', labels: ['C6', 'C7sus'] },
        { type: 'play', notes: 'C4+E4+G4+A4 C4+F4+G4+Bb4', label: { vi: 'Nghe C6 rồi C7sus', en: 'Hear C6, then C7sus' } },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm đã có nốt năm thường thì {F#} trên {C} là ♯11, vì một hợp âm không có cùng lúc nốt năm thường và nốt năm biến âm.',
            en: 'If the chord already has a normal 5th, an {F#} over {C} is a ♯11, because a chord never has a regular and an altered 5th at once.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm {C} {E} {G} {Bb} {A} gọi là gì?', en: 'What is the chord {C} {E} {G} {Bb} {A}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4+A5' },
        { type: 'play', notes: 'C4+E4+G4+Bb4+A5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C7(13)', en: 'C7(13)' }, correct: true },
          { text: { vi: 'C6', en: 'C6' } },
          { text: { vi: 'C7(11)', en: 'C7(11)' } },
        ],
      },
      reason: {
        vi: 'Hợp âm có nốt bảy {Bb}, nên nốt sáu {A} được gọi là 13.',
        en: 'The chord has a 7th, {Bb}, so the 6th, {A}, is labeled 13.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm 6/9', en: '6/9 chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm có nốt sáu và nốt chín, không có nốt bảy, gọi là **hợp âm 6/9** (6/9 chord). C6/9 dùng nốt ba trưởng, Cm6/9 dùng nốt ba thứ; nốt sáu vẫn lấy từ gam trưởng.',
            en: 'A chord with a 6th and a 9th but no 7th is a **6/9 chord**. C6/9 uses the major 3rd, Cm6/9 the minor 3rd; the 6th still comes from the major scale.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+A4+D5 C4+Eb4+G4+A4+D5', labels: ['C6/9', 'Cm6/9'] },
        { type: 'play', notes: 'C4+E4+G4+A4+D5 C4+Eb4+G4+A4+D5', label: { vi: 'Nghe C6/9 rồi Cm6/9', en: 'Hear C6/9, then Cm6/9' } },
        {
          type: 'tip',
          text: {
            vi: 'Ở đây 6/9 là hai con số đi cùng nhau, không phải hợp âm gạch chéo.',
            en: 'Here 6/9 is two numbers stacked together, not a slash chord.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm át biến âm', en: 'Altered dominant sevenths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm bảy át là **hợp âm át biến âm** (altered dominant) khi nốt năm hoặc nốt chín, hay cả hai, được nâng hoặc hạ nửa cung. Nốt gốc, nốt ba và nốt bảy giữ nguyên.',
            en: 'A dominant seventh chord is **altered** when its 5th or 9th, or both, is raised or lowered a half step. The root, 3rd and 7th stay the same.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Để dễ đọc, nốt biến âm thường viết cùng kiểu dấu với nốt bảy: ♯5 của C7 viết là {Ab} thay vì {G#}. ♯9 viết như nốt ♭10 ({Eb}), nên hợp âm trông như có cả nốt ba trưởng lẫn ba thứ.',
            en: 'For easy reading, the altered note is often spelled to agree with the 7th: the ♯5 of C7 is written {Ab}, not {G#}. The ♯9 is written as a ♭10 ({Eb}), so the chord seems to have both a major and a minor 3rd.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+Ab4+Bb4 C4+E4+G4+Bb4+Eb5', labels: ['C7(♯5)', 'C7(♯9)'] },
        { type: 'play', notes: 'C4+E4+Ab4+Bb4 C4+E4+G4+Bb4+Eb5', label: { vi: 'Nghe C7(♯5) rồi C7(♯9)', en: 'Hear C7(♯5), then C7(♯9)' } },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm át thường được biến âm khi có chức năng át, tức là sắp đi xuống một quãng 5.',
            en: 'Dominant sevenths are usually altered when they have dominant function, that is, when the root is about to move down a fifth.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt ♭9 của G7(♭9) là nốt gì?', en: 'What is the ♭9 of G7(♭9)?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5', labels: ['G7'] }],
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Nốt chín của G7 là {A}; hạ nửa cung thành {Ab}.',
        en: 'The 9th of G7 is {A}; lowered a half step it becomes {Ab}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong hợp âm {C} {E} {G} {Bb} {F#}, gọi {F#} là gì?', en: 'In the chord {C} {E} {G} {Bb} {F#}, what is the {F#}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4+F#5' },
        { type: 'play', notes: 'C4+E4+G4+Bb4+F#5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '♭5', en: '♭5' } },
          { text: { vi: '♯11', en: '♯11' }, correct: true },
          { text: { vi: '♯4', en: '♯4' } },
        ],
      },
      reason: {
        vi: 'Hợp âm đã có nốt năm thường {G}, nên {F#} không thể là ♭5 mà là ♯11.',
        en: 'The chord already has a normal 5th, {G}, so the {F#} cannot be a ♭5; it is a ♯11.',
      },
    },
  ],
} satisfies Lesson
