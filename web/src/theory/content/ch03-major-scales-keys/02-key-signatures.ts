import type { Lesson } from '@/theory/types'

/** Book 2.3: what a key signature is, the 15 major key signatures, the order of sharps and flats. */
export default {
  id: 'key-signatures',
  title: { vi: 'Hóa biểu giọng trưởng', en: 'Major key signatures' },
  minutes: 5,
  sources: [{ section: '2.3', url: 'https://musictheory.pugetsound.edu/mt21c/MajorKeySignatures.html' }],
  practice: { drill: 'key-sig', level: 1, durationSec: 60 },
  recap: [
    { vi: 'Hóa biểu đứng sau khóa, ở đầu mỗi dòng nhạc', en: 'The key signature follows the clef at the start of every line' },
    { vi: '15 giọng trưởng: {C} không dấu, 7 giọng thăng, 7 giọng giáng', en: '15 major keys: {C} has none, 7 use sharps, 7 use flats' },
    { vi: 'Thứ tự dấu thăng: {F} {C} {G} {D} {A} {E} {B}', en: 'Order of sharps: {F} {C} {G} {D} {A} {E} {B}' },
    { vi: 'Thứ tự dấu giáng: {B} {E} {A} {D} {G} {C} {F}', en: 'Order of flats: {B} {E} {A} {D} {G} {C} {F}' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hóa biểu', en: 'The key signature' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hóa biểu** (key signature) là các dấu thăng hoặc giáng viết ngay sau khóa, ở đầu mỗi dòng nhạc. Nó nhắc người chơi những nốt nào luôn có dấu trong **giọng** (key) của bài, nên không phải viết lại dấu mỗi lần.',
            en: 'A **key signature** is the sharps or flats written just after the clef at the start of every line. It reminds the player which notes of the **key** always carry them, so they need not be written every time.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#4:q A4:q F#4:q D4:q | E4:q C#4:q D4:h' },
        { type: 'staff', clef: 'treble', key: 'D', notes: 'F#4:q A4:q F#4:q D4:q | E4:q C#4:q D4:h' },
        { type: 'play', notes: 'F#4:q A4:q F#4:q D4:q E4:q C#4:q D4:h', label: { vi: 'Nghe giai điệu ở giọng {D} trưởng', en: 'Hear the tune in {D} major' } },
        {
          type: 'tip',
          text: {
            vi: 'Hai dòng trên nghe giống hệt nhau. Ở dòng dưới, hóa biểu làm mọi {F} thành {F#} và mọi {C} thành {C#}.',
            en: 'The two lines sound exactly the same. In the lower one, the key signature makes every {F} an {F#} and every {C} a {C#}.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Giọng có dấu thăng', en: 'Keys with sharps' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hóa biểu chứa đúng các dấu của gam. Giọng {C} trưởng không có dấu nào. Giọng {G} trưởng có một dấu thăng ({F#}), giọng {D} trưởng có hai ({F#} và {C#}).',
            en: 'A key signature holds the scale\'s sharps or flats. {C} major has none. {G} major has one sharp ({F#}), {D} major has two ({F#} and {C#}).',
          },
        },
        { type: 'staff', clef: 'treble', key: 'D', notes: 'D4 E4 F#4 G4 A4 B4 C#5 D5', labels: 'names', highlight: [2, 6] },
        { type: 'play', notes: 'D4 E4 F#4 G4 A4 B4 C#5 D5', label: { vi: 'Nghe gam {D} trưởng', en: 'Hear {D} major' } },
        { type: 'staff', clef: 'treble', key: 'G', notes: 'G4 A4 B4 C5 D5 E5 F#5 G5', labels: 'names', highlight: [6] },
        { type: 'play', notes: 'G4 A4 B4 C5 D5 E5 F#5 G5', label: { vi: 'Nghe gam {G} trưởng', en: 'Hear {G} major' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'G', notes: '' }],
      answer: { type: 'key', note: 'G' },
      reason: {
        vi: 'Một dấu thăng, {F#}, là hóa biểu của giọng {G} trưởng.',
        en: 'One sharp, {F#}, is the key signature of {G} major.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giọng có dấu giáng', en: 'Keys with flats' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giọng {F} trưởng có một dấu giáng ({Bb}), giọng {Bb} trưởng có hai ({Bb} và {Eb}). Tổng cộng có 15 hóa biểu trưởng: {C} không dấu, bảy giọng dùng từ 1 đến 7 dấu thăng, bảy giọng dùng từ 1 đến 7 dấu giáng.',
            en: '{F} major has one flat ({Bb}), {Bb} major has two ({Bb} and {Eb}). There are 15 major key signatures: {C} with none, seven with 1 to 7 sharps, and seven with 1 to 7 flats.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'F', notes: 'F4 G4 A4 Bb4 C5 D5 E5 F5', labels: 'names', highlight: [3] },
        { type: 'play', notes: 'F4 G4 A4 Bb4 C5 D5 E5 F5', label: { vi: 'Nghe gam {F} trưởng', en: 'Hear {F} major' } },
        { type: 'staff', clef: 'treble', key: 'Bb', notes: 'Bb3 C4 D4 Eb4 F4 G4 A4 Bb4', labels: 'names', highlight: [0, 3, 7] },
        { type: 'play', notes: 'Bb3 C4 D4 Eb4 F4 G4 A4 Bb4', label: { vi: 'Nghe gam {Bb} trưởng', en: 'Hear {Bb} major' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Thứ tự dấu thăng và dấu giáng', en: 'The order of sharps and flats' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dấu thăng luôn được viết theo một **thứ tự dấu thăng** (order of sharps) cố định: {F} {C} {G} {D} {A} {E} {B}. Giọng có hai thăng dùng hai dấu đầu, giọng có ba thăng dùng ba dấu đầu.',
            en: 'Sharps are always written in a fixed **order of sharps**: {F} {C} {G} {D} {A} {E} {B}. A key with two sharps uses the first two, a key with three the first three.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#5 C#5 G#5 D#5 A#4 E#5 B#4', labels: 'names' },
        { type: 'play', notes: 'F#5 C#5 G#5 D#5 A#4 E#5 B#4', label: { vi: 'Nghe bảy dấu thăng', en: 'Hear the seven sharps' } },
        {
          type: 'text',
          text: {
            vi: '**Thứ tự dấu giáng** (order of flats) là thứ tự trên viết ngược lại: {B} {E} {A} {D} {G} {C} {F}.',
            en: 'The **order of flats** is the same order reversed: {B} {E} {A} {D} {G} {C} {F}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'Bb4 Eb5 Ab4 Db5 Gb4 Cb5 Fb4', labels: 'names' },
        { type: 'play', notes: 'Bb4 Eb5 Ab4 Db5 Gb4 Cb5 Fb4', label: { vi: 'Nghe bảy dấu giáng', en: 'Hear the seven flats' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng có ba dấu thăng thì dấu thăng thứ ba là nốt nào?', en: 'In a key with three sharps, which note is the third sharp?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'A', notes: '' }],
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Thứ tự dấu thăng là {F} {C} {G} {D} {A} {E} {B}, nên dấu thứ ba là {G#}.',
        en: 'The order of sharps is {F} {C} {G} {D} {A} {E} {B}, so the third is {G#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng có bốn dấu giáng thì dấu giáng thứ tư là nốt nào?', en: 'In a key with four flats, which note is the fourth flat?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Ab', notes: '' }],
      answer: { type: 'key', note: 'Db' },
      reason: {
        vi: 'Thứ tự dấu giáng là {B} {E} {A} {D} {G} {C} {F}, nên dấu thứ tư là {Db}.',
        en: 'The order of flats is {B} {E} {A} {D} {G} {C} {F}, so the fourth is {Db}.',
      },
    },
  ],
} satisfies Lesson
