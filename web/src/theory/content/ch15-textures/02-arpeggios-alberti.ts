import type { Lesson } from '@/theory/types'

/**
 * Book 14.3: arpeggiated accompaniments (arpeggios over a bass in octaves,
 * rising, falling, up and down; the tenth between bass and top voice) and
 * the Alberti bass. No practice link: no drill trains accompaniment patterns.
 */
export default {
  id: 'arpeggios-alberti',
  title: { vi: 'Hợp âm rải và bass Alberti', en: 'Arpeggios and the Alberti bass' },
  minutes: 5,
  sources: [{ section: '14.3', url: 'https://musictheory.pugetsound.edu/mt21c/ArpeggiatedAccompaniments.html' }],
  recap: [
    { vi: 'Hợp âm rải: các nốt của hợp âm vang lần lượt', en: 'An arpeggio: the notes of a chord one after another' },
    { vi: 'Rải đi lên, đi xuống, hoặc lên rồi xuống', en: 'Arpeggios rise, fall, or go up and down' },
    { vi: 'Bass và bè cao nhất hay cách nhau một quãng 10', en: 'The bass and the top voice are often a tenth apart' },
    { vi: 'Bass Alberti: thấp–cao–giữa–cao', en: 'Alberti bass: low–high–middle–high' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm rải', en: 'Arpeggios' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm rải** (arpeggio) chơi các nốt của hợp âm lần lượt, không cùng lúc. Một cách đệm hay gặp: hợp âm rải ở bè trên, **đường bass** (bass line) quãng tám ở bè dưới.',
            en: 'An **arpeggio** plays the notes of a chord one after another instead of together. A common accompaniment: arpeggios in one part over a **bass line** in octaves below.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C2+C3:8 G3:8 C4:8 E4:8 C2+C3:8 G3:8 C4:8 E4:8 | F2+F3:8 A3:8 C4:8 F4:8 F2+F3:8 A3:8 C4:8 F4:8 ||',
        },
        {
          type: 'play',
          notes: 'C2+C3:8 G3:8 C4:8 E4:8 C2+C3:8 G3:8 C4:8 E4:8 | F2+F3:8 A3:8 C4:8 F4:8 F2+F3:8 A3:8 C4:8 F4:8 | C2+C3+G3+C4+E4:w',
          bpm: 96,
          label: { vi: 'Nghe hợp âm rải đi lên', en: 'Hear rising arpeggios' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Đi xuống, lên rồi xuống', en: 'Falling, and up and down' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm rải cũng có thể đi xuống (ô nhịp 1), hoặc đi lên rồi xuống qua các nốt của hợp âm (ô nhịp 2).',
            en: 'Arpeggios can also descend (measure 1), or go up and then down through the chord (measure 2).',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          time: '4/4',
          notes: 'G3:8 E3:8 C3:8 G2:8 G3:8 E3:8 C3:8 G2:8 | F2:8 C3:8 F3:8 A3:8 C4:8 A3:8 F3:8 C3:8 ||',
        },
        { type: 'play', notes: 'G3:8 E3:8 C3:8 G2:8 G3:8 E3:8 C3:8 G2:8 | F2:8 C3:8 F3:8 A3:8 C4:8 A3:8 F3:8 C3:8 | C3+E3+G3:w', bpm: 96 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm rải này đi thế nào?', en: 'How does this arpeggio move?' },
      blocks: [
        { type: 'staff', clef: 'bass', time: '4/4', notes: 'G2:8 D3:8 G3:8 B3:8 D4:8 B3:8 G3:8 D3:8' },
        { type: 'play', notes: 'G2:8 D3:8 G3:8 B3:8 D4:8 B3:8 G3:8 D3:8', bpm: 96 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chỉ đi lên', en: 'Up only' } },
          { text: { vi: 'Chỉ đi xuống', en: 'Down only' } },
          { text: { vi: 'Đi lên rồi xuống', en: 'Up, then down' }, correct: true },
        ],
      },
      reason: {
        vi: 'Các nốt leo từ {G2} lên {D4}, rồi quay xuống {D3}.',
        en: 'The notes climb from {G2} to {D4}, then turn back down to {D3}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quãng 10', en: 'The tenth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giữa nốt bass và nốt cao nhất của phần đệm rải hay là một **quãng 10** (tenth): một quãng tám cộng một quãng 3. Quãng này nghe rất êm.',
            en: 'Between the bass and the top voice of an arpeggiated accompaniment there is often a **tenth**: an octave plus a third. It sounds very harmonious.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4', labels: ['10'] },
        { type: 'keys', notes: 'C3 E4', from: 'C3', octaves: 2, caption: { vi: '{C3} và {E4}:', en: '{C3} and {E4}:' } },
        { type: 'play', notes: 'C3 E4 C3+E4' },
        {
          type: 'tip',
          text: {
            vi: 'Trong ví dụ đầu bài, nốt cao nhất {E4} cách {C3} ở bass đúng một quãng 10.',
            en: 'In the first example, the top note {E4} is exactly a tenth above the {C3} in the bass.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào cao hơn {F2} một quãng 10 trưởng?', en: 'Which note is a major tenth above {F2}?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'F2' }],
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'Quãng 10 trưởng là quãng tám cộng quãng 3 trưởng, và quãng 3 trưởng trên {F} là {A}.',
        en: 'A major tenth is an octave plus a major third, and a major third above {F} is {A}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bass Alberti', en: 'The Alberti bass' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Bass Alberti** (Alberti bass) không rải thẳng lên hay xuống mà theo thứ tự thấp–cao–giữa–cao. Kiểu đệm này có khắp nơi trong sonata piano của Mozart.',
            en: 'An **Alberti bass** does not arpeggiate straight up or down but in a low–high–middle–high pattern. It is everywhere in Mozart\'s piano sonatas.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          time: '4/4',
          notes: 'C3:8 G3:8 E3:8 G3:8 C3:8 G3:8 E3:8 G3:8 | B2:8 G3:8 D3:8 G3:8 C3:8 G3:8 E3:8 G3:8 ||',
          labels: [
            { vi: 'thấp', en: 'low' }, { vi: 'cao', en: 'high' }, { vi: 'giữa', en: 'mid' }, { vi: 'cao', en: 'high' },
            '', '', '', '', '', '', '', '', '', '', '', '',
          ],
        },
        { type: 'play', notes: 'C3:8 G3:8 E3:8 G3:8 C3:8 G3:8 E3:8 G3:8 | B2:8 G3:8 D3:8 G3:8 C3:8 G3:8 E3:8 G3:8 | C3+E3+G3:w', bpm: 108 },
        {
          type: 'tip',
          text: {
            vi: 'Mẫu này dời được sang mọi giọng, kể cả giọng thứ, và mọi âm vực.',
            en: 'The pattern moves to any key, minor keys included, and to any register.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bass Alberti trên hợp âm này: nốt thứ ba của mẫu là nốt nào?', en: 'An Alberti bass on this chord: which note comes third in the pattern?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'F2+A2+C3' }],
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'Thứ tự là thấp–cao–giữa–cao: {F}, {C}, {A}, {C}, nên nốt thứ ba là nốt giữa {A}.',
        en: 'The order is low–high–middle–high: {F}, {C}, {A}, {C}, so the third note is the middle one, {A}.',
      },
    },
  ],
} satisfies Lesson
