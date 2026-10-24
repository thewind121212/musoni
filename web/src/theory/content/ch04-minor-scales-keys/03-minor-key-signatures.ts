import type { Lesson } from '@/theory/types'

/** Book 3.2: minor key signatures, parallel and relative keys, raising degrees with accidentals. */
export default {
  id: 'minor-key-signatures',
  title: { vi: 'Hóa biểu giọng thứ', en: 'Minor key signatures' },
  minutes: 5,
  sources: [{ section: '3.2', url: 'https://musictheory.pugetsound.edu/mt21c/MinorKeySignatures.html' }],
  practice: { drill: 'key-sig', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Hóa biểu giọng thứ khớp với gam thứ tự nhiên', en: 'A minor key signature matches the natural minor scale' },
    { vi: 'Giọng cùng tên: chung chủ âm, thêm ba dấu giáng', en: 'Parallel keys share a tonic: add three flats for the minor' },
    { vi: 'Giọng song song: chung hóa biểu, cách nhau ba nửa cung', en: 'Relative keys share a key signature, three half steps apart' },
    { vi: 'Gam hòa âm và giai điệu cần dấu hóa để nâng bậc', en: 'Harmonic and melodic minor need accidentals to raise degrees' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hóa biểu theo gam thứ tự nhiên', en: 'Signatures follow the natural minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hóa biểu** (key signature) của **giọng thứ** (minor key) khớp với gam thứ tự nhiên. Gam {C} thứ tự nhiên có {Eb}, {Ab} và {Bb}, nên giọng {C} thứ có ba dấu giáng, viết theo thứ tự {Bb} {Eb} {Ab}.',
            en: 'A **minor key** has the **key signature** of its natural minor scale. {C} natural minor has {Eb}, {Ab} and {Bb}, so {C} minor has three flats, written in the order of flats: {Bb} {Eb} {Ab}.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5' },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', label: { vi: 'Nghe {C} thứ', en: 'Hear {C} minor' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Giọng cùng tên', en: 'Parallel keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '{E} trưởng và {E} thứ là hai **giọng cùng tên** (parallel keys): chung **chủ âm** (tonic) {E}. Giọng thứ có bậc 3, 6 và 7 thấp hơn nửa cung.',
            en: '{E} major and {E} minor are **parallel keys**: they share the **tonic** {E}. The minor has its 3rd, 6th and 7th a half step lower.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nên muốn có hóa biểu giọng thứ cùng tên, hãy thêm ba dấu giáng vào hóa biểu giọng trưởng, tức là bớt ba dấu thăng. {E} trưởng có bốn thăng, nên {E} thứ có một thăng.',
            en: 'So to find the parallel minor\'s signature, add three flats to the major key signature, which is the same as taking away three sharps. {E} major has four sharps, so {E} minor has one.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'E', notes: 'E4 F#4 G#4 A4 B4 C#5 D#5 E5' },
        { type: 'play', notes: 'E4 F#4 G#4 A4 B4 C#5 D#5 E5', label: { vi: 'Nghe {E} trưởng', en: 'Hear {E} major' } },
        { type: 'staff', clef: 'treble', key: 'Em', notes: 'E4 F#4 G4 A4 B4 C5 D5 E5' },
        { type: 'play', notes: 'E4 F#4 G4 A4 B4 C5 D5 E5', label: { vi: 'Nghe {E} thứ', en: 'Hear {E} minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Giọng {D} trưởng có hai dấu thăng. Hóa biểu của giọng {D} thứ là gì?',
        en: '{D} major has two sharps. What is the key signature of {D} minor?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một dấu thăng', en: 'One sharp' } },
          { text: { vi: 'Một dấu giáng', en: 'One flat' }, correct: true },
          { text: { vi: 'Năm dấu thăng', en: 'Five sharps' } },
        ],
      },
      reason: {
        vi: 'Thêm ba dấu giáng: hai dấu đầu xóa hai dấu thăng, dấu thứ ba còn lại, nên {D} thứ có một dấu giáng.',
        en: 'Add three flats: the first two cancel the two sharps and the third remains, so {D} minor has one flat.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giọng song song', en: 'Relative keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một giọng trưởng và một giọng thứ có cùng hóa biểu là hai **giọng song song** (relative keys). {Eb} trưởng và {C} thứ đều có ba dấu giáng.',
            en: 'A major and a minor key with the same key signature are **relative keys**. {Eb} major and {C} minor both have three flats.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chủ âm giọng trưởng cao hơn chủ âm giọng thứ song song ba nửa cung: đếm xuống {Eb}, {D}, {Db}, {C}.',
            en: 'The relative major\'s tonic is three half steps above the relative minor\'s: count down {Eb}, {D}, {Db}, {C}.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Eb', notes: '' },
        { type: 'keys', notes: 'C4 Eb4', labels: 'names', caption: { vi: 'Ba nửa cung:', en: 'Three half steps:' } },
        { type: 'play', notes: 'Eb4 D4 Db4 C4' },
        {
          type: 'tip',
          text: {
            vi: 'Trên vòng quãng năm, mỗi giọng trưởng đi cặp với giọng thứ song song của nó.',
            en: 'On the circle of fifths, each major key pairs with its relative minor.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng thứ nào?', en: 'Which minor key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'D', notes: '' }],
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: 'Hai dấu thăng là {D} trưởng; đếm xuống ba nửa cung: {D}, {C#}, {C}, {B}.',
        en: 'Two sharps is {D} major; count down three half steps: {D}, {C#}, {C}, {B}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nâng bậc bằng dấu hóa', en: 'Raising degrees with accidentals' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hóa biểu chỉ cho gam thứ tự nhiên. Gam thứ hòa âm cần thêm **dấu hóa** (accidental) nâng bậc 7; gam thứ giai điệu đi lên nâng cả bậc 6 và 7.',
            en: 'The key signature gives only the natural minor. The harmonic minor needs an **accidental** to raise the 7th; the melodic minor, going up, raises the 6th and 7th.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Dm', notes: 'D4 E4 F4 G4 A4 Bb4 C#5 D5', highlight: [6] },
        { type: 'play', notes: 'D4 E4 F4 G4 A4 Bb4 C#5 D5', label: { vi: 'Nghe {D} thứ hòa âm', en: 'Hear {D} harmonic minor' } },
        { type: 'staff', clef: 'treble', key: 'Dm', notes: 'D4 E4 F4 G4 A4 B4 C#5 D5', highlight: [5, 6] },
        { type: 'play', notes: 'D4 E4 F4 G4 A4 B4 C#5 D5', label: { vi: 'Nghe {D} thứ giai điệu', en: 'Hear {D} melodic minor' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong nhạc thật, người soạn nhạc ít khi chỉ dùng một gam thứ: thường cả ba xen nhau trong một bản.',
            en: 'In real music, composers rarely keep to one minor scale: the three mix within a piece.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đây là hóa biểu giọng {G} thứ. Gam {G} thứ hòa âm cần thêm dấu hóa nào?',
        en: 'This is the {G} minor key signature. Which accidental does {G} harmonic minor add?',
      },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Gm', notes: '' }],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Bậc 7 của {G} thứ là {F}; gam thứ hòa âm nâng nó lên thành {F#}.',
        en: 'The 7th of {G} minor is {F}; the harmonic minor raises it to {F#}.',
      },
    },
  ],
} satisfies Lesson
