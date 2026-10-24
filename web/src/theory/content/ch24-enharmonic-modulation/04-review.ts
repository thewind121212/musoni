import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (23.4) on 23.1-23.3. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 24', en: 'Chapter 24 review' },
  minutes: 3,
  sources: [{ section: '23.4', url: 'https://musictheory.pugetsound.edu/mt21c/EnharmonicModulationPracticeExercises.html' }],
  recap: [
    { vi: 'V7 và Ger+6: một âm thanh, hai cách viết', en: 'V7 and Ger+6: one sound, two spellings' },
    { vi: 'Hợp âm bảy giảm: bốn cách viết, bốn giọng', en: 'The diminished seventh: four spellings, four keys' },
    { vi: 'Hạ một nốt của hợp âm bảy giảm ra hợp âm bảy át', en: 'Lowering one note of a diminished seventh gives a dominant seventh' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'E♭7 ({Eb} {G} {Bb} {Db}) là V7 của giọng nào? Chọn chủ âm.', en: 'E♭7 ({Eb} {G} {Bb} {Db}) is V7 of which key? Pick the tonic.' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Eb4+G4+Bb4+Db5' }],
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: '{Eb} là bậc 5 của giọng {Ab} trưởng, nên E♭7 là V7 và đi về {Ab}.',
        en: '{Eb} is degree 5 of {Ab} major, so E♭7 is its V7 and goes to {Ab}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Viết E♭7 thành Ger+6: {Eb} {G} {Bb} {C#}. {Eb} là bậc 6 hạ của giọng nào? Chọn chủ âm.', en: 'Spell E♭7 as a Ger+6: {Eb} {G} {Bb} {C#}. {Eb} is lowered degree 6 of which key? Pick the tonic.' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Eb4+G4+Bb4+C#5' }],
      answer: { type: 'key', note: 'G', blackKeys: 'b' },
      reason: {
        vi: '{Eb} nằm trên {G} một quãng 6 thứ, nên Ger+6 này thuộc giọng {G} và nốt bass đi xuống {D}.',
        en: '{Eb} is a minor 6th above {G}, so this Ger+6 belongs to {G} and its bass moves down to {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Khi hiểu lại V7 thành Ger+6, thường phải viết lại nốt nào?', en: 'When a V7 is reinterpreted as a Ger+6, which note is usually respelled?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt bass', en: 'The bass note' } },
          { text: { vi: 'Nốt trên cùng: nốt bảy thành nốt sáu tăng', en: 'The top note: the seventh becomes the augmented sixth' }, correct: true },
          { text: { vi: 'Cả bốn nốt', en: 'All four notes' } },
        ],
      },
      reason: {
        vi: 'Ba nốt dưới giữ nguyên; chỉ nốt bảy của V7 đổi thành nốt sáu tăng trùng âm với nó.',
        en: 'The bottom three notes stay; only the seventh of V7 changes into its enharmonic augmented sixth.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} thứ, Ger+6 là {Bb} {D} {F} {G#}. Viết {Ab} thay {G#}, nó là V7 của giọng nào?', en: 'In {D} minor, the Ger+6 is {Bb} {D} {F} {G#}. Spelled with {Ab} instead of {G#}, it is V7 of which key?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Bb3+D4+F4+G#4' }],
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: '{Bb} {D} {F} {Ab} là B♭7, tức V7 của giọng {Eb} trưởng.',
        en: '{Bb} {D} {F} {Ab} is B♭7, the V7 of {Eb} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: '{F#} {A} {C} {Eb} là vii°7 của giọng nào? Chọn chủ âm.', en: '{F#} {A} {C} {Eb} is vii°7 of which key? Pick the tonic.' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F#4+A4+C5+Eb5' }],
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Nốt gốc {F#} là cảm âm, đi lên nửa cung về {G}.',
        en: 'The root {F#} is the leading tone, rising a half step to {G}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Một hợp âm bảy giảm có thể là vii°7 của bao nhiêu chủ âm khác nhau?', en: 'How many different tonics can one diminished seventh chord be vii°7 of?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2', en: '2' } },
          { text: { vi: '3', en: '3' } },
          { text: { vi: '4', en: '4' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi nốt trong bốn nốt đều có thể làm cảm âm, nên có bốn chủ âm, cách nhau quãng 3 thứ.',
        en: 'Each of its four notes can be the leading tone, so there are four tonics, a minor 3rd apart.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hạ {Bb} của C♯°7 ({C#} {E} {G} {Bb}) xuống nửa cung. Bạn được hợp âm nào?', en: 'Lower the {Bb} of C♯°7 ({C#} {E} {G} {Bb}) a half step. Which chord do you get?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C#4+E4+G4+Bb4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A7', en: 'A7' }, correct: true },
          { text: { vi: 'B♭7', en: 'B♭7' } },
          { text: { vi: 'C♯7', en: 'C♯7' } },
        ],
      },
      reason: {
        vi: '{Bb} xuống nửa cung là {A}, và {A} {C#} {E} {G} là A7.',
        en: '{Bb} down a half step is {A}, and {A} {C#} {E} {G} is A7.',
      },
    },
  ],
} satisfies Lesson
