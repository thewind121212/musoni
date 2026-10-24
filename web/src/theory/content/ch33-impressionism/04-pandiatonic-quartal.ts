import type { Lesson } from '@/theory/types'

/** Book 32.2 pandiatonicism and 32.3 quartal, quintal and secundal harmony. */
export default {
  id: 'pandiatonic-quartal',
  title: { vi: 'Toàn thuận giọng và hợp âm chồng quãng 4', en: 'Pandiatonicism and quartal harmony' },
  minutes: 4,
  sources: [
    { section: '32.2', url: 'https://musictheory.pugetsound.edu/mt21c/Pandiatonicism.html' },
    { section: '32.3', url: 'https://musictheory.pugetsound.edu/mt21c/QuintalHarmony.html' },
  ],
  recap: [
    { vi: 'Toàn thuận giọng: mọi nốt của gam, không theo chức năng', en: 'Pandiatonicism: all the notes of the scale, without tonal function' },
    { vi: 'Hòa âm chồng quãng 3 là kiểu quen thuộc nhất', en: 'Tertian harmony, stacked in 3rds, is the familiar kind' },
    { vi: 'Chồng quãng 4, quãng 5 hay quãng 2 cho hợp âm mới', en: 'Stacking 4ths, 5ths or 2nds makes new chords' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Toàn thuận giọng', en: 'Pandiatonicism' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Toàn thuận giọng** (pandiatonicism) dùng mọi nốt của gam mà không cần chúng đi theo chức năng: V không cần về I, nốt 7 không cần lên nốt 8.',
            en: '**Pandiatonicism** uses all the diatonic notes without needing them to function tonally: V does not need to go to I, and 7 does not need to resolve to 8.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ta nghe nó như một làn nốt của gam trưởng, hay những hợp âm ghép nốt lạ, thường có ít nhất một quãng 2.',
            en: 'You often hear it as a wash of notes from the major scale, or as chords of unusual note combinations, often with at least one 2nd.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+D4+G4+E5 F4+G4+C5+D5 E4+A4+B4+D5 C4+D4+G4+E5', highlight: [0, 3] },
        { type: 'play', notes: 'C4+D4+G4+E5:h F4+G4+C5+D5:h E4+A4+B4+D5:h C4+D4+G4+E5:w', bpm: 72 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Toàn thuận giọng dùng những nốt nào?', en: 'Which notes does pandiatonicism use?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt của gam, không theo chức năng', en: 'The scale’s notes, without tonal function' }, correct: true },
          { text: { vi: 'Cả 12 nốt, nhiều nốt hóa', en: 'All 12 notes, highly chromatic' } },
          { text: { vi: 'Chỉ hợp âm I, IV và V', en: 'Only the I, IV and V chords' } },
        ],
      },
      reason: {
        vi: 'Toàn thuận giọng chỉ dùng nốt thuận giọng, nhưng không bắt V về I hay nốt 7 lên nốt 8.',
        en: 'Pandiatonicism keeps to diatonic notes but does not make V go to I or 7 go to 8.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chồng quãng 3 và chồng quãng 4', en: 'Tertian and quartal' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hầu hết hợp âm ta đã học là **hòa âm chồng quãng 3** (tertian harmony). **Hòa âm chồng quãng 4** (quartal harmony) xếp hợp âm hoàn toàn hay chủ yếu bằng quãng 4.',
            en: 'Most chords so far are **tertian harmony**, stacked in 3rds. **Quartal harmony** stacks chords entirely or mostly in 4ths.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+B4 D4+G4+C5+F5', labels: ['3+3+3', '4+4+4'] },
        { type: 'play', notes: 'C4+E4+G4+B4', label: { vi: 'Chồng quãng 3', en: 'Stacked in 3rds' } },
        { type: 'play', notes: 'D4+G4+C5+F5', label: { vi: 'Chồng quãng 4', en: 'Stacked in 4ths' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Chồng quãng 4 đúng từ {E}: {E} {A} {D}, rồi nốt gì?', en: 'Perfect 4ths up from {E}: {E} {A} {D}, then what?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'E4 A4 D5' },
        { type: 'play', notes: 'E4 A4 D5' },
      ],
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Quãng 4 đúng trên {D} là {G}, cao hơn năm nửa cung.',
        en: 'A perfect 4th above {D} is {G}, five half steps up.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chồng quãng 5 và quãng 2', en: 'Quintal and secundal' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hòa âm chồng quãng 5** (quintal harmony) xếp hợp âm bằng quãng 5. **Hòa âm chồng quãng 2** (secundal harmony) xếp bằng quãng 2, thành một chùm nốt sát nhau.',
            en: '**Quintal harmony** stacks chords in 5ths. **Secundal harmony** stacks them in 2nds, a tight cluster of notes.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Sau năm 1900, các nhà soạn nhạc tìm những cách chồng hợp âm mới để thoát khỏi lối cũ.',
            en: 'After 1900, composers looked for new ways to stack chords to break with the past.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+G4+D5+A5 C4+D4+E4+F4', labels: ['5+5+5', '2+2+2'] },
        { type: 'play', notes: 'C4+G4+D5+A5', label: { vi: 'Chồng quãng 5', en: 'Stacked in 5ths' } },
        { type: 'play', notes: 'C4+D4+E4+F4', label: { vi: 'Chồng quãng 2', en: 'Stacked in 2nds' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm {C} {G} {D} {A} chồng theo quãng nào?', en: 'The chord {C} {G} {D} {A} is stacked in what?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+G4+D5+A5' },
        { type: 'play', notes: 'C4+G4+D5+A5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 3', en: '3rds' } },
          { text: { vi: 'Quãng 4', en: '4ths' } },
          { text: { vi: 'Quãng 5', en: '5ths' }, correct: true },
          { text: { vi: 'Quãng 2', en: '2nds' } },
        ],
      },
      reason: {
        vi: 'Đếm năm tên nốt từ {C} là {G}, từ {G} là {D}, từ {D} là {A}: hòa âm chồng quãng 5.',
        en: 'Five letters up from {C} is {G}, from {G} is {D}, from {D} is {A}: quintal harmony.',
      },
    },
  ],
} satisfies Lesson
