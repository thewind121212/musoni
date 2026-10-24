import type { Lesson } from '@/theory/types'

/** Book 16.4: the four situations of six-four chords; the passing, pedal and melodic bass six-four. */
export default {
  id: 'other-six-fours',
  title: { vi: 'Các hợp âm 6/4 khác', en: 'Other six-four chords' },
  minutes: 5,
  sources: [{ section: '16.4', url: 'https://musictheory.pugetsound.edu/mt21c/OtherOccurrencesofSixFourChords.html' }],
  recap: [
    { vi: 'Hợp âm 6/4 chỉ gặp trong bốn trường hợp: kết, lướt, âm giữ, bè trầm giai điệu', en: 'Six-fours occur in only four situations: cadential, passing, pedal, melodic bass' },
    { vi: '6/4 lướt: bè trầm đi liền bậc qua ba nốt', en: 'Passing six-four: the bass moves by step through three notes' },
    { vi: '6/4 âm giữ: bè trầm lặp lại một nốt ba lần', en: 'Pedal six-four: the bass repeats one note three times' },
    { vi: '6/4 bè trầm giai điệu: bè trầm mang giai điệu và chạm nốt năm', en: 'Melodic bass six-four: the bass has the melody and lands on the fifth' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bốn trường hợp', en: 'Four situations' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm 6/4 là thế đảo 2, nốt năm ở bass. Trong nhạc cổ điển, nó chỉ xuất hiện trong bốn trường hợp: 6/4 kết, **6/4 lướt** (passing six-four), **6/4 âm giữ** (pedal six-four) và **6/4 bè trầm giai điệu** (melodic bass six-four).',
            en: 'A six-four chord is a second-inversion chord, with the fifth in the bass. In classical music it appears in only four situations: the cadential six-four, the **passing six-four**, the **pedal six-four** and the **melodic bass six-four**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở 6/4 lướt, bè trầm đi liền bậc qua ba nốt, đi lên hoặc đi xuống, và hợp âm ở giữa là hợp âm 6/4.',
            en: 'In a passing six-four, the bass moves by step through three notes, up or down, and the middle chord is a six-four.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5 D3+D4+G4+B4 E3+C4+G4+C5', labels: ['I', 'V\n6\n4', 'I\n6'], highlight: [1] },
        { type: 'play', notes: 'C3+E4+G4+C5:h D3+D4+G4+B4:h E3+C4+G4+C5:w', label: { vi: 'Nghe 6/4 lướt', en: 'Hear a passing six-four' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {G} trưởng. Hợp âm 6/4 ở giữa thuộc loại nào?', en: 'This is in {G} major. Which kind is the six-four in the middle?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'G2+B3+D4+G4 A2+A3+D4+F#4 B2+G3+D4+G4', highlight: [1] },
        { type: 'play', notes: 'G2+B3+D4+G4:h A2+A3+D4+F#4:h B2+G3+D4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '6/4 kết', en: 'Cadential' } },
          { text: { vi: '6/4 lướt', en: 'Passing' }, correct: true },
          { text: { vi: '6/4 âm giữ', en: 'Pedal' } },
        ],
      },
      reason: {
        vi: 'Bè trầm đi liền bậc {G} {A} {B}, và hợp âm giữa {D} {F#} {A} có nốt năm {A} ở bass: V6/4 lướt.',
        en: 'The bass steps {G} {A} {B}, and the middle chord, {D} {F#} {A}, has its fifth, {A}, in the bass: a passing V6/4.',
      },
    },
    {
      kind: 'explain',
      title: { vi: '6/4 âm giữ', en: 'The pedal six-four' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở 6/4 âm giữ, bè trầm lặp lại một nốt ba lần, và hợp âm ở giữa là hợp âm 6/4. Hay gặp nhất là I–IV6/4–I.',
            en: 'In a pedal six-four, the bass repeats one note three times, and the middle chord is a six-four. The most common is I–IV6/4–I.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5 C3+F4+A4+C5 C3+E4+G4+C5', labels: ['I', 'IV\n6\n4', 'I'], highlight: [1] },
        { type: 'play', notes: 'C3+E4+G4+C5:h C3+F4+A4+C5:h C3+E4+G4+C5:w', label: { vi: 'Nghe 6/4 âm giữ', en: 'Hear a pedal six-four' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {G} trưởng. Hợp âm 6/4 ở giữa thuộc loại nào?', en: 'This is in {G} major. Which kind is the six-four in the middle?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'G2+B3+D4+G4 G2+C4+E4+G4 G2+B3+D4+G4', highlight: [1] },
        { type: 'play', notes: 'G2+B3+D4+G4:h G2+C4+E4+G4:h G2+B3+D4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '6/4 kết', en: 'Cadential' } },
          { text: { vi: '6/4 lướt', en: 'Passing' } },
          { text: { vi: '6/4 âm giữ', en: 'Pedal' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bè trầm giữ {G} suốt ba hợp âm, và hợp âm giữa {C} {E} {G} có nốt năm {G} ở bass: IV6/4 âm giữ.',
        en: 'The bass holds {G} through all three chords, and the middle chord, {C} {E} {G}, has its fifth, {G}, in the bass: a pedal IV6/4.',
      },
    },
    {
      kind: 'explain',
      title: { vi: '6/4 bè trầm giai điệu', en: 'The melodic bass six-four' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở 6/4 bè trầm giai điệu, chính bè trầm mang giai điệu. Khi giai điệu ấy chạm vào nốt năm của hợp âm, ta có một hợp âm 6/4.',
            en: 'In a melodic bass six-four, the bass voice has the melody. When that melody reaches the fifth of the chord, the result is a six-four chord.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4 E3+E4+G4 G3+E4+G4 E3+E4+G4 C3+E4+G4',
          labels: ['I', 'I\n6', 'I\n6\n4', 'I\n6', 'I'],
          highlight: [2],
        },
        { type: 'play', notes: 'C3+E4+G4:q E3+E4+G4:q G3+E4+G4:q E3+E4+G4:q C3+E4+G4:h', label: { vi: 'Nghe bè trầm rải hợp âm', en: 'Hear the bass arpeggiate' } },
        {
          type: 'tip',
          text: {
            vi: 'Khi bè trầm rải các nốt của một hợp âm như ở đây, kiểu này còn được gọi là 6/4 rải.',
            en: 'When the bass arpeggiates one chord, as here, it is also called an arpeggiated six-four.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {F} trưởng. Hợp âm cuối thuộc loại 6/4 nào?', en: 'This is in {F} major. Which kind of six-four is the last chord?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'F', notes: 'F2+A3+C4+F4 A2+A3+C4+F4 C3+A3+C4+F4', highlight: [2] },
        { type: 'play', notes: 'F2+A3+C4+F4:q A2+A3+C4+F4:q C3+A3+C4+F4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '6/4 lướt', en: 'Passing' } },
          { text: { vi: '6/4 âm giữ', en: 'Pedal' } },
          { text: { vi: '6/4 bè trầm giai điệu', en: 'Melodic bass' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bè trầm rải {F} {A} {C}, các nốt của hợp âm I; khi nó chạm nốt năm {C}, hợp âm thành I6/4.',
        en: 'The bass arpeggiates {F} {A} {C}, the notes of the I chord; when it reaches the fifth, {C}, the chord becomes I6/4.',
      },
    },
  ],
} satisfies Lesson
