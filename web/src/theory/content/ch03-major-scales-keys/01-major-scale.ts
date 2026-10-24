import type { Lesson } from '@/theory/types'

/** Book 2.2: the major scale, its whole- and half-step pattern, two tetrachords, one note per letter. */
export default {
  id: 'major-scale',
  title: { vi: 'Gam trưởng', en: 'The major scale' },
  minutes: 4,
  sources: [{ section: '2.2', url: 'https://musictheory.pugetsound.edu/mt21c/TheMajorScale.html' }],
  practice: { drill: 'hear-play', level: 3, durationSec: 60 },
  recap: [
    { vi: 'Gam trưởng: nguyên, nguyên, nửa, nguyên, nguyên, nguyên, nửa', en: 'Major scale: W–W–H–W–W–W–H' },
    { vi: 'Hai tứ âm giống nhau, nối bằng một nguyên cung', en: 'Two matching tetrachords joined by a whole step' },
    { vi: 'Mỗi tên nốt xuất hiện đúng một lần', en: 'Each letter name appears exactly once' },
    { vi: 'Gam {D} trưởng có {F#} và {C#}', en: '{D} major has {F#} and {C#}' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Gam là gì', en: 'What a scale is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gam** (scale) là các nốt xếp lần lượt theo tên, từ một nốt lên đến nốt cùng tên cao hơn một quãng tám. Nốt đầu ấy là **chủ âm** (tonic) và đặt tên cho gam: gam {C} trưởng đi từ {C4} đến {C5}, chỉ trên phím trắng.',
            en: 'A **scale** is a row of notes in letter order, from one note up to the same letter an octave higher. That first note is the **tonic** and names the scale: {C} major runs from {C4} to {C5}, on white keys only.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', labels: 'names' },
        { type: 'play', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', label: { vi: 'Nghe gam {C} trưởng', en: 'Hear {C} major' } },
        { type: 'keys', notes: 'C4 D4 E4 F4 G4 A4 B4 C5' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Mẫu cung của gam trưởng', en: 'The major scale pattern' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gam trưởng** (major scale) đi theo một mẫu cố định: nguyên, nguyên, nửa, nguyên, nguyên, nguyên, nửa. Số dưới mỗi nốt là bước từ nốt trước: 1 là **nguyên cung** (whole step), ½ là **nửa cung** (half step).',
            en: 'A **major scale** follows a fixed pattern: W–W–H–W–W–W–H. The number under each note is the step from the note before: 1 is a **whole step**, ½ a **half step**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', labels: ['', '1', '1', '½', '1', '1', '1', '½'], highlight: [3, 7] },
        { type: 'play', notes: 'C4 D4 E4 F4 G4 A4 B4 C5' },
        { type: 'keys', notes: 'E4 F4 B4 C5', caption: { vi: 'Hai nửa cung, không có phím đen ở giữa:', en: 'The two half steps, no black key between:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong gam trưởng, nửa cung nằm ở đâu?', en: 'Where are the half steps in a major scale?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giữa nốt 2-3 và 6-7', en: 'Between notes 2-3 and 6-7' } },
          { text: { vi: 'Giữa nốt 3-4 và 7-8', en: 'Between notes 3-4 and 7-8' }, correct: true },
          { text: { vi: 'Giữa nốt 4-5 và 7-8', en: 'Between notes 4-5 and 7-8' } },
        ],
      },
      reason: {
        vi: 'Mẫu nguyên, nguyên, nửa, nguyên, nguyên, nguyên, nửa đặt nửa cung sau nốt 3 và sau nốt 7.',
        en: 'The pattern W–W–H–W–W–W–H puts the half steps after note 3 and after note 7.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hai tứ âm', en: 'Two tetrachords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tứ âm** (tetrachord) là một đoạn bốn nốt của gam. Gam trưởng gồm hai tứ âm giống nhau, mỗi tứ âm là nguyên, nguyên, nửa. Một nguyên cung nối tứ âm dưới với tứ âm trên.',
            en: 'A **tetrachord** is a four-note scale segment. A major scale is two matching tetrachords, each W–W–H. A whole step joins the lower tetrachord to the upper one.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 | G4 A4 B4 C5', labels: ['', '1', '1', '½', '1', '1', '1', '½'], highlight: [4, 5, 6, 7] },
        { type: 'play', notes: 'C4 D4 E4 F4', label: { vi: 'Tứ âm dưới', en: 'Lower tetrachord' } },
        { type: 'play', notes: 'G4 A4 B4 C5', label: { vi: 'Tứ âm trên', en: 'Upper tetrachord' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Gam {D} trưởng', en: '{D} major' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bắt đầu từ {D} và đi đúng mẫu ấy, ta cần hai phím đen: {F#} và {C#}. Mỗi tên nốt có mặt đúng một lần, không bỏ tên nào, không lặp tên nào.',
            en: 'Start on {D} and follow the same pattern, and you need two black keys: {F#} and {C#}. Each letter appears exactly once; none is skipped and none comes twice.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4 E4 F#4 G4 A4 B4 C#5 D5', labels: 'names', highlight: [2, 6] },
        { type: 'play', notes: 'D4 E4 F#4 G4 A4 B4 C#5 D5', label: { vi: 'Nghe gam {D} trưởng', en: 'Hear {D} major' } },
        { type: 'keys', notes: 'D4 E4 F#4 G4 A4 B4 C#5 D5' },
        {
          type: 'tip',
          text: {
            vi: 'Viết {D} {E} {F#} {G}, không viết {D} {E} {Gb} {G}: cách sau lặp tên {G} và bỏ mất {F}.',
            en: 'Write {D} {E} {F#} {G}, not {D} {E} {Gb} {G}: that would use {G} twice and skip {F}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt 7 của gam {G} trưởng là nốt gì?', en: 'What is note 7 of the {G} major scale?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4 A4 B4 C5 D5 E5', labels: ['1', '2', '3', '4', '5', '6'] },
        { type: 'play', notes: 'G4 A4 B4 C5 D5 E5' },
      ],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Từ {E} phải đi lên một nguyên cung đến nốt 7, rồi nửa cung đến {G}, nên nốt 7 là {F#}.',
        en: 'Note 6 to 7 is a whole step up from {E}, then a half step to {G}, so note 7 is {F#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Vì sao {D} {E} {Gb} {G} không phải là bốn nốt đầu của gam {D} trưởng?', en: 'Why is {D} {E} {Gb} {G} not the start of {D} major?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4 E4 Gb4 G4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tên {G} lặp lại và thiếu {F}', en: '{G} comes twice and {F} is skipped' }, correct: true },
          { text: { vi: '{Gb} nghe khác {F#}', en: '{Gb} sounds different from {F#}' } },
          { text: { vi: 'Gam trưởng không có phím đen', en: 'A major scale has no black keys' } },
        ],
      },
      reason: {
        vi: '{Gb} và {F#} là cùng một phím, nhưng gam phải dùng mỗi tên nốt một lần, nên viết là {F#}.',
        en: '{Gb} and {F#} are the same key, but a scale uses each letter once, so it is spelled {F#}.',
      },
    },
  ],
} satisfies Lesson
