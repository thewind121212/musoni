import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (22.8) on 22.1-22.7. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 23', en: 'Chapter 23 review' },
  minutes: 5,
  sources: [{ section: '22.8', url: 'https://musictheory.pugetsound.edu/mt21c/ModulationPracticeExercises.html' }],
  practice: { drill: 'chords', level: 6, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Giọng gần và giọng xa', en: 'Closely related and foreign keys' },
    { vi: 'Hợp âm trụ thuận giọng và biến âm', en: 'Diatonic and chromatic pivot chords' },
    { vi: 'Chuyển giọng trực tiếp, qua nốt chung, bằng mô tiến', en: 'Direct, common-tone and sequential modulation' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Giọng nào là giọng gần của {Db} trưởng?', en: 'Which key is closely related to {Db} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{Eb} thứ', en: '{Eb} minor' }, correct: true },
          { text: { vi: '{Eb} trưởng', en: '{Eb} major' } },
          { text: { vi: '{D} trưởng', en: '{D} major' } },
          { text: { vi: '{A} trưởng', en: '{A} major' } },
        ],
      },
      reason: {
        vi: '{Eb} thứ có 6 dấu giáng, hơn {Db} trưởng (5 dấu) đúng một dấu; {Eb} trưởng chỉ có 3.',
        en: '{Eb} minor has 6 flats, one more than {Db} major (5); {Eb} major has only 3.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng gần nào của {F} thứ có cùng hóa biểu với nó? Chọn chủ âm.', en: 'Which closely related key of {F} minor has the same key signature? Pick its tonic.' },
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Giọng song song của {F} thứ là {Ab} trưởng; cả hai có 4 dấu giáng.',
        en: 'The relative major of {F} minor is {Ab} major; both have 4 flats.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào thuộc cả {D} trưởng và {A} trưởng?', en: 'Which chord belongs to both {D} major and {A} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'G', en: 'G' } },
          { text: { vi: 'Em', en: 'Em' } },
          { text: { vi: 'F♯m', en: 'F♯m' }, correct: true },
          { text: { vi: 'E', en: 'E' } },
        ],
      },
      reason: {
        vi: 'F♯m là iii ở {D} trưởng và vi ở {A} trưởng; G và Em cần {G}, còn E cần {G#}.',
        en: 'F♯m is iii in {D} major and vi in {A} major; G and Em need {G}, and E needs {G#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Dm là hợp âm trụ từ {F} trưởng sang {C} trưởng. Ở giọng {C}, nó có chức năng gì?', en: 'Dm is the pivot from {F} major to {C} major. What function does it have in {C}?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          key: 'F',
          notes: 'F2+F4+A4+C5 Bb2+F4+Bb4+D5 D3+F4+A4+D5 G2+F4+B4+D5 C3+E4+G4+C5',
          labels: ['I', 'IV', 'vi\n?', 'V7', 'I'],
          highlight: [2],
        },
        { type: 'play', notes: 'F2+F4+A4+C5:h Bb2+F4+Bb4+D5:h D3+F4+A4+D5:h G2+F4+B4+D5:h C3+E4+G4+C5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ', en: 'Tonic' } },
          { text: { vi: 'Tiền át', en: 'Pre-dominant' }, correct: true },
          { text: { vi: 'Át', en: 'Dominant' } },
        ],
      },
      reason: {
        vi: 'Dm là ii ở giọng {C} trưởng, một hợp âm tiền át dẫn vào V7.',
        en: 'Dm is ii in {C} major, a pre-dominant chord leading to V7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn nhạc ở giọng {C} trưởng có {Bb} lặp lại. Giọng mới là giọng nào?', en: 'A passage in {C} major has a recurring {Bb}. What is the new key?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q Bb4:q A4:q G4:q | A4:q Bb4:q G4:q E4:q | F4:w ||' },
        { type: 'play', notes: 'C5:q Bb4:q A4:q G4:q A4:q Bb4:q G4:q E4:q F4:w', bpm: 100 },
      ],
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Dấu giáng thường tạo bậc 4: {Bb} là bậc 4 của gam {F} trưởng.',
        en: 'Flats usually make scale degree 4: {Bb} is degree 4 of {F} major.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Câu nhạc có V/V–V, rồi về I và kết ở giọng chính. Đó là gì?',
        en: 'A phrase has V/V–V, then returns to I and cadences in the home key. What is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ly điệu', en: 'Tonicization' }, correct: true },
          { text: { vi: 'Chuyển giọng', en: 'Modulation' } },
        ],
      },
      reason: {
        vi: 'V được làm nổi như chủ một lúc, nhưng không có kết ở giọng mới: đó là ly điệu.',
        en: 'V is made to sound like a tonic for a moment, but there is no cadence in a new key: that is tonicization.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào là trung âm biến âm của G?', en: 'Which chord is a chromatic mediant of G?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bm', en: 'Bm' } },
          { text: { vi: 'E♭', en: 'E♭' }, correct: true },
          { text: { vi: 'C', en: 'C' } },
          { text: { vi: 'Em', en: 'Em' } },
        ],
      },
      reason: {
        vi: 'E♭ có nốt gốc dưới {G} một quãng 3, cùng là hợp âm trưởng, và chỉ chung nốt {G}.',
        en: 'E♭ has its root a third below {G}, is also major, and shares only {G}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe: đây là kiểu chuyển giọng nào?', en: 'Listen: what kind of modulation is this?' },
      blocks: [{ type: 'play', notes: 'D3+F#4+A4+D5:h G2+G4+B4+D5:h A2+E4+A4+C#5:w Bb2+F4+Bb4+D5:h F2+F4+A4+Eb5:h Bb2+F4+Bb4+D5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chuyển giọng trực tiếp', en: 'Direct modulation' }, correct: true },
          { text: { vi: 'Chuyển giọng qua nốt chung', en: 'Common-tone modulation' } },
          { text: { vi: 'Chuyển giọng bằng mô tiến', en: 'Sequential modulation' } },
        ],
      },
      reason: {
        vi: 'Câu đầu dừng ở kết lửng của giọng {D}, câu sau bắt đầu ngay ở giọng {Bb}, không có nốt chung hay ý nhạc lặp lại.',
        en: 'The first phrase stops on a half cadence in {D}, and the next starts right in {Bb}, with no common tone or repeated idea.',
      },
    },
  ],
} satisfies Lesson
