import type { Lesson } from '@/theory/types'

/** Book 2.3: the circle of fifths for major keys, and the enharmonic keys where it overlaps. */
export default {
  id: 'circle-of-fifths',
  title: { vi: 'Vòng quãng năm', en: 'The circle of fifths' },
  minutes: 4,
  sources: [{ section: '2.3', url: 'https://musictheory.pugetsound.edu/mt21c/MajorKeySignatures.html' }],
  practice: { drill: 'key-sig', level: 2, durationSec: 60 },
  recap: [
    { vi: 'Quãng 5: đếm năm tên nốt, như {C} lên {G}', en: 'A fifth: count five letters, as {C} up to {G}' },
    { vi: 'Đi lên quãng 5, giọng thêm một dấu thăng', en: 'Up a fifth, the key gains a sharp' },
    { vi: 'Đi xuống quãng 5, giọng thêm một dấu giáng', en: 'Down a fifth, the key gains a flat' },
    { vi: 'Giọng trùng âm: {B} và {Cb}, {F#} và {Gb}, {C#} và {Db}', en: 'Enharmonic keys: {B} and {Cb}, {F#} and {Gb}, {C#} and {Db}' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Quãng 5', en: 'A fifth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Từ {C} đếm lên năm tên nốt: {C} là 1, {D} là 2, {E} là 3, {F} là 4, {G} là 5. Vậy từ {C} lên {G} là một **quãng 5** (fifth).',
            en: 'Count five letters up from {C}: {C} is 1, {D} 2, {E} 3, {F} 4 and {G} 5. So {C} up to {G} is a **fifth**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 G4', labels: ['1', '2', '3', '4', '5'], highlight: [0, 4] },
        { type: 'play', notes: 'C4 G4', label: { vi: 'Nghe {C} lên {G}', en: 'Hear {C} up to {G}' } },
        { type: 'keys', notes: 'C4 G4', labels: 'names' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Đi lên: thêm dấu thăng', en: 'Going up: one more sharp' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Vòng quãng năm** (circle of fifths) xếp các giọng thành một vòng. Đi theo chiều kim đồng hồ là đi lên quãng 5, và mỗi bước giọng có thêm một dấu thăng: {C} {G} {D} {A} {E} {B} {F#} {C#}.',
            en: 'The **circle of fifths** sets the keys in a ring. Going clockwise is going up a fifth, and each step the key gets one more sharp: {C} {G} {D} {A} {E} {B} {F#} {C#}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 G4 D4 A4 E4 B4 F#4 C#5', labels: ['0', '1♯', '2♯', '3♯', '4♯', '5♯', '6♯', '7♯'] },
        { type: 'play', notes: 'C4 G4 D4 A4 E4 B4 F#4 C#5', label: { vi: 'Nghe các chủ âm', en: 'Hear the tonics' } },
        {
          type: 'tip',
          text: {
            vi: 'Số dưới mỗi nốt là số dấu thăng của giọng đó. Có nốt được viết thấp xuống một quãng tám cho gọn trên khuông, tên nốt vẫn vậy.',
            en: 'The number under each note is how many sharps its key has. Some notes are written an octave lower to stay on the staff; the letter is the same.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng {D} trưởng có hai dấu thăng. Giọng trưởng nào có ba dấu thăng?', en: '{D} major has two sharps. Which major key has three?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'D', notes: '' }],
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Từ {D} đi lên quãng 5 ({D} {E} {F#} {G} {A}) là {A}, nên giọng {A} trưởng có ba dấu thăng.',
        en: 'A fifth up from {D} ({D} {E} {F#} {G} {A}) is {A}, so {A} major has three sharps.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đi xuống: thêm dấu giáng', en: 'Going down: one more flat' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đi ngược chiều kim đồng hồ là đi xuống quãng 5, và mỗi bước giọng có thêm một dấu giáng: {C} {F} {Bb} {Eb} {Ab} {Db} {Gb} {Cb}.',
            en: 'Going counterclockwise is going down a fifth, and each step the key gets one more flat: {C} {F} {Bb} {Eb} {Ab} {Db} {Gb} {Cb}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C5 F4 Bb4 Eb4 Ab4 Db4 Gb4 Cb4', labels: ['0', '1♭', '2♭', '3♭', '4♭', '5♭', '6♭', '7♭'] },
        { type: 'play', notes: 'C5 F4 Bb4 Eb4 Ab4 Db4 Gb4 Cb4', label: { vi: 'Nghe các chủ âm', en: 'Hear the tonics' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng {Bb} trưởng có hai dấu giáng. Giọng trưởng nào có ba dấu giáng?', en: '{Bb} major has two flats. Which major key has three?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Bb', notes: '' }],
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Từ {Bb} đi xuống quãng 5 ({Bb} {A} {G} {F} {Eb}) là {Eb}, nên giọng {Eb} trưởng có ba dấu giáng.',
        en: 'A fifth down from {Bb} ({Bb} {A} {G} {F} {Eb}) is {Eb}, so {Eb} major has three flats.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giọng trùng âm', en: 'Enharmonic keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở đáy vòng, hai chiều gặp nhau. Giọng {B} trưởng và {Cb} trưởng là **giọng trùng âm** (enharmonic keys): cùng phím đàn, khác tên. Tương tự, {F#} trưởng trùng âm với {Gb} trưởng, {C#} trưởng với {Db} trưởng.',
            en: 'At the bottom of the circle the two directions overlap. {B} major and {Cb} major are **enharmonic keys**: the same keys on the piano, spelled differently. Likewise {F#} major matches {Gb} major, and {C#} major matches {Db} major.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'B', notes: 'B3 C#4 D#4 E4 F#4 G#4 A#4 B4' },
        { type: 'staff', clef: 'treble', key: 'Cb', notes: 'Cb4 Db4 Eb4 Fb4 Gb4 Ab4 Bb4 Cb5' },
        { type: 'play', notes: 'B3 C#4 D#4 E4 F#4 G#4 A#4 B4', label: { vi: 'Hai gam nghe như nhau', en: 'Both scales sound alike' } },
        { type: 'keys', notes: 'B3 C#4 D#4 E4 F#4 G#4 A#4 B4', from: 'C3' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng {Gb} trưởng trùng âm với giọng nào?', en: 'Which key is enharmonic with {Gb} major?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Gb', notes: '' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{G} trưởng', en: '{G} major' } },
          { text: { vi: '{F#} trưởng', en: '{F#} major' }, correct: true },
          { text: { vi: '{Db} trưởng', en: '{Db} major' } },
        ],
      },
      reason: {
        vi: '{Gb} và {F#} là cùng một phím đen, nên hai giọng này nghe như nhau.',
        en: '{Gb} and {F#} are the same black key, so the two keys sound the same.',
      },
    },
  ],
} satisfies Lesson
