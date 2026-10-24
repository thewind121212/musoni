import type { Lesson } from '@/theory/types'

/** Book 31.4-31.6: chord labels, writing a jazz chord from its symbol, analyzing a chord in four steps. */
export default {
  id: 'writing-analyzing',
  title: { vi: 'Viết và phân tích hợp âm jazz', en: 'Writing and analyzing jazz chords' },
  minutes: 5,
  sources: [
    { section: '31.4', url: 'https://musictheory.pugetsound.edu/mt21c/ChordLabels.html' },
    { section: '31.5', url: 'https://musictheory.pugetsound.edu/mt21c/HowToWriteJazzChords.html' },
    { section: '31.6', url: 'https://musictheory.pugetsound.edu/mt21c/HowToAnalyzeJazzChords.html' },
  ],
  recap: [
    { vi: 'Bắt đầu từ mọi nốt trưởng và đúng lên đến nốt 13', en: 'Start from all the major and perfect notes up to the 13th' },
    { vi: 'Đổi tên trùng âm để dấu hóa cùng kiểu với nốt bảy', en: 'Respell enharmonically so the accidentals agree with the 7th' },
    { vi: 'Phân tích: loại hợp âm bảy, nốt mở rộng, biến âm, tên trùng âm', en: 'Analyze: seventh chord quality, upper structure, alterations, respellings' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Mọi nốt trưởng đến nốt 13', en: 'All the major notes up to the 13th' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Muốn viết một hợp âm jazz từ ký hiệu, trước hết viết mọi nốt trưởng và đúng lên đến nốt 13: ba trưởng, năm đúng, bảy trưởng, chín trưởng, 11 đúng, 13 trưởng. Rồi sửa các nốt theo ký hiệu.',
            en: 'To write a jazz chord from its symbol, first write all the major and perfect notes up to the 13th: major 3rd, perfect 5th, major 7th, major 9th, perfect 11th, major 13th. Then change the notes the symbol asks for.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4 B4 D5 F5 A5', labels: ['1', '3', '5', '7', '9', '11', '13'] },
        { type: 'play', notes: 'C4 E4 G4 B4 D5 F5 A5', label: { vi: 'Nghe từ {C} lên nốt 13', en: 'Hear {C} up to the 13th' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Viết GmΔ11', en: 'Writing GmΔ11' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Gm là {G} {Bb} {D}. Δ11 nghĩa là nốt bảy trưởng, rồi nốt chín và nốt 11 thường, chứ không phải "nốt 11 trưởng". Vậy GmΔ11 là {G} {Bb} {D} {F#} {A} {C}.',
            en: 'Gm means {G} {Bb} {D}. Δ11 means a major 7th, then a regular 9th and 11th, not a "major 11th". So GmΔ11 is {G} {Bb} {D} {F#} {A} {C}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5+A5+C6 G4+Bb4+D5+F#5+A5+C6', labels: ['G11', 'GmΔ11'], highlight: [1] },
        { type: 'play', notes: 'G3+B3+D4+F4+A4+C5 G3+Bb3+D4+F#4+A4+C5', label: { vi: 'Nghe G11 rồi GmΔ11', en: 'Hear G11, then GmΔ11' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bảy của AmΔ9 là nốt gì?', en: 'What is the 7th of AmΔ9?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4+C5+E5', labels: ['Am'] }],
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Δ chỉ nốt bảy trưởng, và nốt bảy trưởng trên {A} là {G#}.',
        en: 'Δ means a major 7th, and the major 7th above {A} is {G#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Viết lại cho dễ đọc', en: 'Respelling for easy reading' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'A7(♯5♯9): A7 là {A} {C#} {E} {G}. ♯5 là {E#}, viết lại thành {F} cho hợp với nốt bảy {G}; ♯9 là {B#}, viết lại thành {C}.',
            en: 'A7(♯5♯9): A7 is {A} {C#} {E} {G}. The ♯5 is {E#}, respelled {F} to agree with the 7th, {G}; the ♯9 is {B#}, respelled {C}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A3+C#4+F4+G4+C5', highlight: [0] },
        { type: 'play', notes: 'A3+C#4+F4+G4+C5', label: { vi: 'Nghe A7(♯5♯9)', en: 'Hear A7(♯5♯9)' } },
        {
          type: 'tip',
          text: {
            vi: 'Người chơi jazz hay đổi tên nốt thăng kép, giáng kép, và cả {B#}, {Cb}, {E#}, {Fb}, sang tên trùng âm dễ đọc hơn.',
            en: 'Jazz musicians often respell double sharps and double flats, and sometimes {B#}, {Cb}, {E#} and {Fb}, as easier enharmonic notes.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Phân tích hợp âm: bốn bước', en: 'Analyzing a chord in four steps' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'So hợp âm với dãy nốt trưởng đến nốt 13 của nốt bass, rồi xác định: loại hợp âm bảy; **nốt mở rộng** (upper structure) 9, 11, 13; nốt nào bị biến âm; nốt nào được viết bằng tên trùng âm. Ở đây nốt bass luôn là nốt gốc.',
            en: 'Compare the chord with all the major notes up to the 13th above the bass, then find: the seventh chord quality; the **upper structure** (9, 11, 13); any altered notes; any enharmonic respellings. Here the bass note is always the root.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ví dụ {G} {B} {D} {F} {Bb}: ta có G7. {Bb} không thể là nốt ba thứ vì đã có {B}; nó là {A#}, tức ♯9. Hợp âm là G7(♯9).',
            en: 'Take {G} {B} {D} {F} {Bb}: that is a G7. The {Bb} cannot be a minor 3rd, since {B} is already there; it is an {A#}, the ♯9. The chord is G7(♯9).',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5+Bb5', labels: ['G7(♯9)'] },
        { type: 'play', notes: 'G3+B3+D4+F4+Bb4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong hợp âm {E} {G#} {B} {D} {G}, gọi {G} là gì?', en: 'In the chord {E} {G#} {B} {D} {G}, what is the {G}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'E4+G#4+B4+D5+G5' },
        { type: 'play', notes: 'E3+G#3+B3+D4+G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt ba thứ', en: 'A minor 3rd' } },
          { text: { vi: '♭11', en: '♭11' } },
          { text: { vi: '♯9', en: '♯9' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đã có nốt ba trưởng {G#}, nên {G} là {F##}, tức ♯9 viết lại; jazz không dùng ♭11.',
        en: 'The major 3rd, {G#}, is already there, so the {G} is a respelled {F##}, the ♯9; jazz does not use ♭11.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm {F} {Bb} {Eb} {G} gọi là gì?', en: 'What is the chord {F} {Bb} {Eb} {G}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F4+Bb4+Eb5+G5' },
        { type: 'play', notes: 'F3+Bb3+Eb4+G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'F9sus', en: 'F9sus' }, correct: true },
          { text: { vi: 'F11', en: 'F11' } },
          { text: { vi: 'Fm9', en: 'Fm9' } },
        ],
      },
      reason: {
        vi: 'Không có nốt ba {A}, nên {Bb} là sus chứ không phải 11; {Eb} là nốt bảy, {G} là nốt chín, nốt năm được bỏ.',
        en: 'There is no 3rd, {A}, so the {Bb} is the sus, not an 11; {Eb} is the 7th, {G} the 9th, and the 5th is left out.',
      },
    },
  ],
} satisfies Lesson
