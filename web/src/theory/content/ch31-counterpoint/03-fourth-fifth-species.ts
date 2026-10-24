import type { Lesson } from '@/theory/types'

/**
 * Book 30.5-30.6: fourth species (ties across the bar line, suspensions that
 * resolve down by step, 4-3 and 7-6 only, syncopations, the 7-6 ending) and
 * fifth species, a free mix of the first four.
 *
 * As in lesson 2, counterpoint and cantus firmus are two staves; playback
 * strikes each pair together, so a tied note is struck again.
 */
export default {
  id: 'fourth-fifth-species',
  title: { vi: 'Đối âm loài 4 và loài 5', en: 'Fourth and fifth species' },
  minutes: 5,
  sources: [
    { section: '30.5', url: 'https://musictheory.pugetsound.edu/mt21c/FourthSpecies.html' },
    { section: '30.6', url: 'https://musictheory.pugetsound.edu/mt21c/FifthSpecies.html' },
  ],
  recap: [
    { vi: 'Loài 4: nốt ở phách 3 nối qua vạch nhịp', en: 'Fourth species: the beat-3 note is tied across the bar line' },
    { vi: 'Nốt treo là nghịch âm và giải quyết liền bậc xuống', en: 'A suspension is a dissonance that resolves down by step' },
    { vi: 'Bè trên dùng nốt treo 4–3 và 7–6, không dùng 9–8 hay 2–1', en: 'The upper voice uses 4–3 and 7–6, not 9–8 or 2–1' },
    { vi: 'Loài 5 trộn tự do bốn loài đầu', en: 'Fifth species mixes the first four freely' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đối âm loài 4', en: 'Fourth species' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đối âm loài 4** (fourth species) dạy viết nốt treo và nghịch phách; ở đây giai điệu định sẵn luôn ở bè dưới. Bắt đầu bằng một lặng trắng, rồi một nốt trắng cao hơn bè dưới một quãng 8.',
            en: '**Fourth species** teaches suspensions and syncopations; here the cantus firmus is always in the lower voice. Begin with a half rest, then a half note an octave above it.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt trắng ở phách 3 được nối qua vạch nhịp sang phách 1 của ô sau, trừ ở ô áp chót. Ô áp chót có nốt treo 7–6, và bài kết thúc bằng nốt tròn ở quãng 8.',
            en: 'The half note on beat 3 is tied across the bar line to beat 1 of the next measure, except in the next-to-last measure. That measure holds a 7–6 suspension, and the line ends on a whole note an octave above.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'R:h C4:h~ | C4:h D4:h~ | D4:h C4:h~ | C4:h B3:h | C4:w ||',
          labels: ['', '8', '5\nsync', '6', '7\nsus', '6', '7\nsus', '6', '8'],
          highlight: [4, 6],
        },
        { type: 'staff', clef: 'bass', notes: 'C3 | F3 | E3 | D3 | C3 ||' },
        {
          type: 'play',
          notes: 'C3:h C3+C4:h F3+C4:h F3+D4:h E3+D4:h E3+C4:h D3+C4:h D3+B3:h C3+C4:w',
          label: { vi: 'Nghe đối âm loài 4', en: 'Hear fourth species' },
          bpm: 100,
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt treo hay nghịch phách', en: 'Suspension or syncopation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu nốt sau dấu nối là nghịch âm (quãng 4 hay 7), đó là **nốt treo** (suspension, ghi sus) và phải giải quyết liền bậc xuống. Ở bè trên chỉ dùng nốt treo 4–3 và 7–6, không dùng 9–8 hay 2–1.',
            en: 'If the note after the tie is a dissonance (a 4th or 7th), it is a **suspension** (sus) and must resolve down by step. In the upper voice only 4–3 and 7–6 suspensions are allowed, not 9–8 or 2–1.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nếu nốt sau dấu nối là thuận âm, đó là **nghịch phách** (syncopation, ghi sync) và có thể rời đi bằng bất kỳ cách nào. Nốt trắng ở phách 3 luôn là thuận âm.',
            en: 'If the note after the tie is a consonance, it is a **syncopation** (sync) and may be left in any way. The half note on beat 3 is always a consonance.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4:h G4:h~ | G4:h F4:h ||', labels: ['8', '3', '4\nsus', '3'], highlight: [2] },
        { type: 'staff', clef: 'bass', notes: 'E3 | D3 ||' },
        { type: 'play', notes: 'E3+E4:h E3+G4:h D3+G4:h D3+F4:h', label: { vi: 'Nghe nốt treo 4–3', en: 'Hear a 4–3 suspension' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt {D4} sau dấu nối là gì?', en: 'What is the {D4} after the tie?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4:h D4:h~ | D4:h C4:h ||', labels: ['5', '6', '7', '6'], highlight: [2] },
        { type: 'staff', clef: 'bass', notes: 'F3 | E3 ||' },
        { type: 'play', notes: 'F3+C4:h F3+D4:h E3+D4:h E3+C4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt treo 7–6', en: 'A 7–6 suspension' }, correct: true },
          { text: { vi: 'Nghịch phách', en: 'A syncopation' } },
          { text: { vi: 'Nốt lướt', en: 'A passing tone' } },
        ],
      },
      reason: {
        vi: '{D4} trên {E3} là quãng 7, một nghịch âm sau dấu nối, nên là nốt treo; nó giải quyết liền bậc xuống {C4}, quãng 6.',
        en: '{D4} over {E3} is a 7th, a dissonance after the tie, so it is a suspension; it resolves down by step to {C4}, a 6th.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Nốt treo {E4} trên {F3} (quãng 7) giải quyết về nốt nào?',
        en: 'A suspended {E4} over {F3} (a 7th) resolves to which note?',
      },
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: 'Nốt treo giải quyết liền bậc xuống: {E4} xuống {D4}, quãng 6 trên {F3}, nên đây là nốt treo 7–6.',
        en: 'A suspension resolves down by step: {E4} down to {D4}, a 6th above {F3}, so this is a 7–6 suspension.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đối âm loài 5', en: 'Fifth species' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đối âm loài 5** (fifth species), còn gọi là **đối âm hoa mỹ** (florid counterpoint), trộn tự do cả bốn loài trước. Đoạn mở đầu bài Expectatio Justorum của Lasso có đủ mọi loài.',
            en: '**Fifth species**, also called **florid counterpoint**, is a free mix of the first four. The opening of Lasso’s Expectatio Justorum shows every species.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong ví dụ của ta, ô 1 như loài 2, ô 2 như loài 3, ô 3 có nốt treo 7–6 của loài 4 rồi một cặp nốt móc đơn, và ô cuối như loài 1.',
            en: 'In our example, measure 1 is like second species, measure 2 like third, measure 3 has a fourth-species 7–6 suspension and then a pair of eighth notes, and the last is like first species.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'R:h C5:h | B4:q A4:q G4:q C5:q~ | C5:h B4:8 A4:8 B4:q | C5:w ||',
          labels: ['', '8', '5', '4', '3', '6', '7\nsus', '6', '5', '6', '8'],
          highlight: [6],
        },
        { type: 'staff', clef: 'bass', notes: 'C3 | E3 | D3 | C3 ||' },
        {
          type: 'play',
          notes: 'C3:h C3+C5:h E3+B4:q E3+A4:q E3+G4:q E3+C5:q D3+C5:h D3+B4:8 D3+A4:8 D3+B4:q C3+C5:w',
          label: { vi: 'Nghe đối âm loài 5', en: 'Hear fifth species' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 của ví dụ (bốn nốt đen) mượn từ loài nào?', en: 'Which species does measure 2 of the example (four quarters) borrow from?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'B4:q A4:q G4:q C5:q ||', labels: ['5', '4', '3', '6'] },
        { type: 'staff', clef: 'bass', notes: 'E3 ||' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Loài 2', en: 'Second species' } },
          { text: { vi: 'Loài 3', en: 'Third species' }, correct: true },
          { text: { vi: 'Loài 4', en: 'Fourth species' } },
        ],
      },
      reason: {
        vi: 'Bốn nốt đen trên một nốt tròn là loài 3; {A4} ở phách 2 là một nốt lướt.',
        en: 'Four quarters against a whole note is third species; the {A4} on beat 2 is a passing tone.',
      },
    },
  ],
} satisfies Lesson
