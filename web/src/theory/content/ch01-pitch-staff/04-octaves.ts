import type { Lesson } from '@/theory/types'

/** Book 1.3: octaves, octave registers, middle C. */
export default {
  id: 'octaves',
  title: { vi: 'Quãng tám và Do giữa', en: 'Octaves and middle C' },
  minutes: 4,
  sources: [{ section: '1.3', url: 'https://musictheory.pugetsound.edu/mt21c/OctaveRegisters.html' }],
  practice: { drill: 'note-id', level: 2, durationSec: 60 },
  recap: [
    { vi: 'Quãng tám: từ một nốt đến nốt cùng tên gần nhất', en: 'An octave: from a note to the next note with the same name' },
    { vi: 'Số quãng tám tăng ở {C}: {B3} rồi đến {C4}', en: 'The register number goes up at {C}: {B3}, then {C4}' },
    { vi: 'Do giữa là {C4}', en: 'Middle C is {C4}' },
    { vi: '{C4} nằm trên dòng kẻ phụ ở cả khóa Sol và khóa Fa', en: '{C4} sits on a ledger line in both treble and bass clef' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Quãng tám', en: 'The octave' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bảy tên nốt lặp lại dọc bàn phím. Từ một nốt đến nốt cùng tên gần nhất là một **quãng tám** (octave). Hai nốt cách nhau một quãng tám nghe rất giống nhau.',
            en: 'The seven note names repeat along the keyboard. From one note to the next note with the same name is an **octave**. Two notes an octave apart sound very alike.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3 C4 C5', labels: 'names' },
        { type: 'play', notes: 'C3 C4 C5' },
        { type: 'keys', notes: 'C3 C4 C5' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Ký hiệu quãng tám', en: 'Octave registers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi nốt có thể mang thêm một con số, gọi là **ký hiệu quãng tám** (octave register), cho biết nó thuộc quãng tám nào. Con số tăng lên ở {C}: ngay sau {B3} là {C4}.',
            en: 'A note can carry a number, its **octave register**, which tells which octave it belongs to. The number goes up at {C}: right after {B3} comes {C4}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A3 B3 C4 D4', labels: 'pitches', highlight: [2] },
        { type: 'play', notes: 'A3 B3 C4 D4' },
        { type: 'keys', notes: 'A3 B3 C4 D4', labels: 'pitches' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt ngay trên {B4} là nốt nào?', en: 'Which note comes right above {B4}?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'B4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C4}', en: '{C4}' } },
          { text: { vi: '{C5}', en: '{C5}' }, correct: true },
          { text: { vi: '{A4}', en: '{A4}' } },
        ],
      },
      reason: {
        vi: 'Con số tăng lên ở {C}, nên ngay sau {B4} là {C5}.',
        en: 'The number goes up at {C}, so right after {B4} comes {C5}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Do giữa', en: 'Middle C' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Do giữa** (middle C) là {C4}, nằm gần giữa đàn piano. Ở khóa Sol, nó nằm trên một dòng kẻ phụ dưới khuông. Ở khóa Fa, nó nằm trên một dòng kẻ phụ trên khuông.',
            en: '**Middle C** is {C4}, near the middle of the piano. In treble clef it sits on a ledger line below the staff. In bass clef it sits on a ledger line above the staff.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C4@t C4@b', labels: 'pitches', highlight: [0, 1] },
        { type: 'play', notes: 'C4', label: { vi: 'Nghe {C4}', en: 'Hear {C4}' } },
        { type: 'keys', notes: 'C4', from: 'C2', octaves: 4, caption: { vi: '{C4} trên phím đàn:', en: '{C4} on the keys:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt nào?', en: 'Which note is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C4}', en: '{C4}' } },
          { text: { vi: '{C5}', en: '{C5}' }, correct: true },
          { text: { vi: '{C6}', en: '{C6}' } },
        ],
      },
      reason: {
        vi: 'Khe 3 của khóa Sol là {C}, cao hơn {C4} một quãng tám, nên đó là {C5}.',
        en: 'Space 3 in treble clef is {C}, an octave above {C4}, so it is {C5}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt nào?', en: 'Which note is this?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'C3' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C2}', en: '{C2}' } },
          { text: { vi: '{C3}', en: '{C3}' }, correct: true },
          { text: { vi: '{C4}', en: '{C4}' } },
        ],
      },
      reason: {
        vi: 'Khe 2 của khóa Fa là {C}, thấp hơn {C4} một quãng tám, nên đó là {C3}.',
        en: 'Space 2 in bass clef is {C}, an octave below {C4}, so it is {C3}.',
      },
    },
  ],
} satisfies Lesson
