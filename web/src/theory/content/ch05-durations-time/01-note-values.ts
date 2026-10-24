import type { Lesson } from '@/theory/types'

/** Book 4.2: durational symbols, from the whole note to the sixteenth, and their rests. */
export default {
  id: 'note-values',
  title: { vi: 'Trường độ nốt', en: 'Note values' },
  minutes: 4,
  sources: [{ section: '4.2', url: 'https://musictheory.pugetsound.edu/mt21c/DurationalSymbols.html' }],
  practice: { drill: 'rhythm', level: 1, durationSec: 60, tempo: 60 },
  recap: [
    { vi: 'Nốt tròn dài 4 phách, nốt trắng 2, nốt đen 1', en: 'A whole note lasts 4 beats, a half note 2, a quarter note 1' },
    { vi: 'Mỗi lần chia đôi: đen, móc đơn, móc kép', en: 'Each value halves: quarter, eighth, sixteenth' },
    { vi: 'Gạch nối gom các nốt móc đứng cạnh nhau', en: 'Beams join eighths and sixteenths side by side' },
    { vi: 'Mỗi nốt có một dấu lặng dài bằng nó', en: 'Every note value has a rest of the same length' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt tròn, trắng, đen', en: 'Whole, half and quarter notes' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Trường độ** (duration) là độ dài của một nốt, đếm bằng **phách** (beat): nhịp đều mà bạn gõ chân theo. Ta thường đếm **nốt đen** (quarter note) là một phách, **nốt trắng** (half note) hai phách, **nốt tròn** (whole note) bốn phách.',
            en: '**Duration** is how long a note lasts, counted in **beats**: the steady pulse you tap your foot to. We usually count a **quarter note** as one beat, a **half note** as two and a **whole note** as four.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q B4:q B4:q B4:q | B4:h B4:h | B4:w', labels: ['1', '2', '3', '4', '1', '3', '1'] },
        { type: 'play', notes: 'B4:q B4:q B4:q B4:q | B4:h B4:h | B4:w', bpm: 80, label: { vi: 'Nghe đen, trắng, tròn', en: 'Hear quarters, halves, a whole' } },
        {
          type: 'tip',
          text: {
            vi: 'Các vạch dọc chia nhạc thành từng nhóm bốn phách, đếm lại từ 1. Bài sau sẽ nói kỹ hơn.',
            en: 'The upright lines split the music into groups of four beats, counted from 1 again. The next lesson says more.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Một nốt tròn dài bằng mấy nốt đen?', en: 'A whole note lasts as long as how many quarter notes?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2', en: '2' } },
          { text: { vi: '4', en: '4' }, correct: true },
          { text: { vi: '8', en: '8' } },
        ],
      },
      reason: {
        vi: 'Nốt tròn dài bốn phách, nốt đen một phách, nên cần bốn nốt đen.',
        en: 'A whole note lasts four beats and a quarter note one, so it takes four quarters.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt móc đơn và móc kép', en: 'Eighth and sixteenth notes' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chia đôi nốt đen được hai **nốt móc đơn** (eighth notes), chia đôi nữa được bốn **nốt móc kép** (sixteenth notes). Nốt móc đơn có một **móc** (flag), nốt móc kép có hai. Đứng cạnh nhau, chúng được nối bằng **gạch nối** (beam) thay cho móc.',
            en: 'Split a quarter note in half and you get two **eighth notes**; split again and you get four **sixteenth notes**. An eighth note has one **flag**, a sixteenth two. Side by side, they are joined by **beams** instead of flags.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q B4:8 B4:8 B4:16 B4:16 B4:16 B4:16 B4:q', labels: ['1', '2', '', '3', '', '', '', '4'] },
        { type: 'play', notes: 'B4:q B4:8 B4:8 B4:16 B4:16 B4:16 B4:16 B4:q', bpm: 70 },
        {
          type: 'tip',
          text: {
            vi: 'Một nốt tròn bằng hai nốt trắng, bốn nốt đen, tám nốt móc đơn hay mười sáu nốt móc kép.',
            en: 'One whole note equals two half notes, four quarters, eight eighths or sixteen sixteenths.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bốn nốt này là nốt gì?', en: 'What are these four notes?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'B4:16 B4:16 B4:16 B4:16' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt đen', en: 'Quarter notes' } },
          { text: { vi: 'Nốt móc đơn', en: 'Eighth notes' } },
          { text: { vi: 'Nốt móc kép', en: 'Sixteenth notes' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai gạch nối là nốt móc kép, và bốn nốt móc kép dài bằng một nốt đen.',
        en: 'Two beams mean sixteenth notes, and four sixteenths last as long as one quarter.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dấu lặng', en: 'Rests' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Im lặng cũng có trường độ. Mỗi nốt có một **dấu lặng** (rest) dài bằng nó: lặng tròn, lặng trắng, lặng đen, lặng móc đơn và lặng móc kép.',
            en: 'Silence has duration too. Each note value has a **rest** of the same length: the whole, half, quarter, eighth and sixteenth rest.',
          },
        },
        { type: 'staff', clef: 'none', notes: 'R:w R:h R:q R:8 R:16' },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q R:q B4:q R:q | B4:h R:h', labels: ['1', '2', '3', '4', '1', '3'] },
        { type: 'play', notes: 'B4:q R:q B4:q R:q | B4:h R:h', bpm: 80, label: { vi: 'Nghe nốt và lặng', en: 'Hear notes and rests' } },
        {
          type: 'tip',
          text: {
            vi: 'Lặng tròn treo dưới dòng 4. Lặng trắng nằm trên dòng 3, như một chiếc mũ.',
            en: 'The whole rest hangs below line 4. The half rest sits on line 3, like a hat.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dấu lặng này dài mấy phách?', en: 'How many beats does this rest last?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'R:h' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '1', en: '1' } },
          { text: { vi: '2', en: '2' }, correct: true },
          { text: { vi: '4', en: '4' } },
        ],
      },
      reason: {
        vi: 'Nó nằm trên dòng 3 nên là lặng trắng, dài hai phách như nốt trắng.',
        en: 'It sits on line 3, so it is a half rest, two beats like a half note.',
      },
    },
  ],
} satisfies Lesson
