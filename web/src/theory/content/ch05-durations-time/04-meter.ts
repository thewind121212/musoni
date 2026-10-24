import type { Lesson } from '@/theory/types'

/** Book 4.4 (meter: beats per measure, simple and compound) and beaming by the beat from 4.6. */
export default {
  id: 'meter',
  title: { vi: 'Nhịp đơn và nhịp phức', en: 'Simple and compound meter' },
  minutes: 5,
  sources: [
    { section: '4.4', url: 'https://musictheory.pugetsound.edu/mt21c/meter.html' },
    { section: '4.6', url: 'https://musictheory.pugetsound.edu/mt21c/CommonRhythmicNotationErrors.html' },
  ],
  practice: { drill: 'rhythm', level: 4, durationSec: 60, tempo: 80 },
  recap: [
    { vi: 'Nhịp hai, ba, bốn: số phách trong ô nhịp', en: 'Duple, triple, quadruple: beats in a measure' },
    { vi: 'Nhịp đơn chia phách làm hai, nhịp phức làm ba', en: 'Simple meter divides the beat in two, compound in three' },
    { vi: 'Số trên 6, 9, 12 là nhịp phức; chia cho 3 ra số phách', en: 'Top numbers 6, 9, 12 are compound; divide by 3 for the beats' },
    { vi: 'Gạch nối gom nốt theo từng phách', en: 'Beams group notes by the beat' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nhịp hai, ba, bốn', en: 'Duple, triple, quadruple' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nhịp** (meter) cho biết mỗi ô nhịp có mấy phách và mỗi phách chia ra sao. Hai phách một ô là **nhịp hai** (duple), ba phách là **nhịp ba** (triple), bốn phách là **nhịp bốn** (quadruple).',
            en: '**Meter** tells you how many beats are in a measure and how each beat is divided. Two beats a measure is **duple**, three is **triple** and four is **quadruple**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Phách 1 là **phách mạnh** (strong beat); trong 4/4, phách 3 cũng mạnh. Các phách còn lại là **phách yếu** (weak beats).',
            en: 'Beat 1 is a **strong beat**; in 4/4, beat 3 is strong too. The other beats are **weak beats**.',
          },
        },
        { type: 'staff', clef: 'treble', time: '2/4', notes: 'C4:q G4:q | C4:q G4:q' },
        { type: 'play', notes: 'C4:q G4:q | C4:q G4:q | C4:q G4:q | C4:q G4:q', bpm: 100, label: { vi: 'Nghe nhịp hai', en: 'Hear duple' } },
        { type: 'staff', clef: 'treble', time: '3/4', notes: 'C4:q G4:q G4:q | C4:q G4:q G4:q' },
        { type: 'play', notes: 'C4:q G4:q G4:q | C4:q G4:q G4:q | C4:q G4:q G4:q', bpm: 100, label: { vi: 'Nghe nhịp ba', en: 'Hear triple' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe và đếm: đây là nhịp hai hay nhịp ba?', en: 'Listen and count: is this duple or triple?' },
      blocks: [
        {
          type: 'play',
          notes: 'C3:q E4+G4:q E4+G4:q | G2:q D4+F4:q D4+F4:q | G2:q D4+F4:q D4+F4:q | C3:q E4+G4:q E4+G4:q',
          bpm: 110,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nhịp hai', en: 'Duple' } },
          { text: { vi: 'Nhịp ba', en: 'Triple' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nốt trầm trở lại sau mỗi ba phách: một phách mạnh rồi hai phách yếu.',
        en: 'The low note comes back every three beats: one strong beat, then two weak ones.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phách chia hai hay chia ba', en: 'Beats in two or in three' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu mỗi phách thường chia làm hai, đó là **nhịp đơn** (simple meter). Nếu mỗi phách chia làm ba, đó là **nhịp phức** (compound meter).',
            en: 'If each beat normally divides into two, the meter is **simple**. If each beat divides into three, it is **compound**.',
          },
        },
        { type: 'staff', clef: 'treble', time: '2/4', notes: 'C5:8 G4:8 C5:8 G4:8 | C5:8 G4:8 C5:8 G4:8', labels: ['1', '', '2', '', '1', '', '2', ''] },
        { type: 'play', notes: 'C5:8 G4:8 C5:8 G4:8 | C5:8 G4:8 C5:8 G4:8', bpm: 80, label: { vi: 'Nghe chia hai', en: 'Hear beats in two' } },
        { type: 'staff', clef: 'treble', time: '6/8', notes: 'C5:8 G4:8 G4:8 C5:8 G4:8 G4:8', labels: ['1', '', '', '2', '', ''] },
        { type: 'play', notes: 'C5:8 G4:8 G4:8 C5:8 G4:8 G4:8 | C5:8 G4:8 G4:8 C5:8 G4:8 G4:8', bpm: 120, label: { vi: 'Nghe chia ba', en: 'Hear beats in three' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Số chỉ nhịp phức', en: 'Compound time signatures' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong nhịp phức, phách là một nốt chấm dôi và số dưới chỉ phần chia của phách. 6/8 có sáu nốt móc đơn gom thành hai phách nốt đen chấm dôi, nên là **nhịp hai phức** (compound duple); còn 2/4 là nhịp hai đơn.',
            en: 'In compound meter the beat is a dotted note, and the bottom number shows its division. 6/8 has six eighth notes grouped into two dotted-quarter beats, so it is **compound duple**; 2/4 is simple duple.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Số trên 2, 3, 4 là nhịp đơn; 6, 9, 12 là nhịp phức. Chia số trên của nhịp phức cho 3 để ra số phách: 9/8 có ba phách, 12/8 có bốn.',
            en: 'Top numbers 2, 3 and 4 are simple; 6, 9 and 12 are compound. Divide a compound top number by 3 to get the beats: 9/8 has three, 12/8 four.',
          },
        },
        { type: 'staff', clef: 'treble', time: '6/8', notes: 'C4:q. C4:q. | C4:q D4:8 E4:q. | E4:q D4:8 E4:q F4:8 | G4:h.' },
        { type: 'play', notes: 'C4:q. C4:q. | C4:q D4:8 E4:q. | E4:q D4:8 E4:q F4:8 | G4:h.', bpm: 120, label: { vi: 'Nghe một bài dân ca 6/8', en: 'Hear a folk tune in 6/8' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: '9/8 là nhịp gì?', en: 'What meter is 9/8?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nhịp ba đơn', en: 'Simple triple' } },
          { text: { vi: 'Nhịp ba phức', en: 'Compound triple' }, correct: true },
          { text: { vi: 'Nhịp bốn phức', en: 'Compound quadruple' } },
        ],
      },
      reason: {
        vi: '9 là một trong 6, 9, 12 nên là nhịp phức, và 9 chia 3 được ba phách.',
        en: '9 is one of 6, 9 and 12, so it is compound, and 9 divided by 3 gives three beats.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Gạch nối cho thấy phách', en: 'Beams show the beat' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi viết **tiết tấu** (rhythm), hãy gom các nốt móc theo từng phách để người đọc thấy ngay phách bắt đầu ở đâu. Cùng sáu nốt móc đơn: 3/4 gom thành ba nhóm hai, 6/8 gom thành hai nhóm ba.',
            en: 'When writing a **rhythm**, beam notes by the beat so the reader sees at once where each beat begins. The same six eighth notes: 3/4 beams them in three pairs, 6/8 in two groups of three.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: 'C5:8 G4:8 C5:8 G4:8 C5:8 G4:8', labels: ['1', '', '2', '', '3', ''] },
        { type: 'play', notes: 'C5:8 G4:8 C5:8 G4:8 C5:8 G4:8 | C5:8 G4:8 C5:8 G4:8 C5:8 G4:8', bpm: 100, label: { vi: 'Nghe 3/4', en: 'Hear 3/4' } },
        { type: 'staff', clef: 'treble', time: '6/8', notes: 'C5:8 G4:8 G4:8 C5:8 G4:8 G4:8', labels: ['1', '', '', '2', '', ''] },
        { type: 'play', notes: 'C5:8 G4:8 G4:8 C5:8 G4:8 G4:8 | C5:8 G4:8 G4:8 C5:8 G4:8 G4:8', bpm: 100, label: { vi: 'Nghe 6/8', en: 'Hear 6/8' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong 6/8, gạch nối gom mấy nốt móc đơn một nhóm?', en: 'In 6/8, how many eighth notes does each beam group hold?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2', en: '2' } },
          { text: { vi: '3', en: '3' }, correct: true },
          { text: { vi: '6', en: '6' } },
        ],
      },
      reason: {
        vi: 'Phách của 6/8 là nốt đen chấm dôi, bằng ba nốt móc đơn, nên mỗi nhóm có ba.',
        en: 'The beat in 6/8 is a dotted quarter, three eighth notes, so each group holds three.',
      },
    },
  ],
} satisfies Lesson
