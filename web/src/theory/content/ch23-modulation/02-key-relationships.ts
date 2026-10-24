import type { Lesson } from '@/theory/types'

/**
 * Book 22.3: where music modulates by era, the five closely related keys
 * (the book's figure for {A} major), and foreign keys. Practice: Hóa biểu
 * level 4 (major and relative minor), since closeness is read from the key
 * signature.
 */
export default {
  id: 'key-relationships',
  title: { vi: 'Giọng gần và giọng xa', en: 'Closely related and foreign keys' },
  minutes: 4,
  sources: [{ section: '22.3', url: 'https://musictheory.pugetsound.edu/mt21c/KeyRelationships.html' }],
  practice: { drill: 'key-sig', level: 4, durationSec: 120 },
  recap: [
    { vi: 'Giọng trưởng hay chuyển sang giọng át, giọng thứ sang giọng song song trưởng', en: 'Major keys often move to the dominant, minor keys to the relative major' },
    { vi: 'Giọng gần có hóa biểu giống hệt hoặc hơn kém một dấu', en: 'Closely related keys have the same signature or one sharp or flat apart' },
    { vi: 'Mỗi giọng có năm giọng gần', en: 'Every key has five closely related keys' },
    { vi: 'Các giọng còn lại là giọng xa', en: 'All other keys are foreign keys' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chuyển sang đâu', en: 'Where music modulates' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Thời Baroque và Cổ điển, bản nhạc ở giọng trưởng thường chuyển sang giọng át, bản ở giọng thứ thường chuyển sang giọng song song trưởng. Thời Lãng mạn, nhà soạn nhạc thử cả những giọng xa hơn.',
            en: 'In the Baroque and Classical eras, a piece in major usually modulated to the dominant key, and a piece in minor to its relative major. Romantic composers tried more remote keys as well.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 G4+B4+D5 || A4+C5+E5 C5+E5+G5', labels: ['C', 'G', 'Am', 'C'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h G2+G4+B4+D5:w A2+A4+C5+E5:h C3+C5+E5+G5:w', label: { vi: 'Nghe {C} sang {G}, {A} thứ sang {C}', en: 'Hear {C} to {G}, {A} minor to {C}' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Năm giọng gần', en: 'Five closely related keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Giọng gần** (closely related keys) có hóa biểu giống hệt, hoặc hơn kém đúng một dấu thăng hay dấu giáng. Mỗi giọng có năm giọng gần, kể cả giọng song song của nó.',
            en: '**Closely related keys** have the same key signature, or one sharp or flat more or fewer. Every key has five closely related keys, including its relative major or minor.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Giọng {A} trưởng (3 dấu thăng) có: {F#} thứ (3 dấu), {E} trưởng và {C#} thứ (4 dấu), {D} trưởng và {B} thứ (2 dấu).',
            en: '{A} major (3 sharps) has: {F#} minor (3 sharps), {E} major and {C#} minor (4), {D} major and {B} minor (2).',
          },
        },
        { type: 'staff', clef: 'treble', key: 'A', notes: 'A4+C#5+E5 F#4+A4+C#5 E4+G#4+B4 C#5+E5+G#5 D4+F#4+A4 B4+D5+F#5', labels: ['A', 'F♯m', 'E', 'C♯m', 'D', 'Bm'] },
        { type: 'play', notes: 'A4+C#5+E5:h F#4+A4+C#5:h E4+G#4+B4:h C#5+E5+G#5:h D4+F#4+A4:h B4+D5+F#5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Mẹo: chủ âm của năm giọng gần chính là các hợp âm trưởng và thứ của giọng nhà, ở giọng trưởng là ii, iii, IV, V và vi.',
            en: 'A shortcut: the tonics of the five closely related keys are the home key’s own major and minor triads, in major ii, iii, IV, V and vi.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng nào là giọng gần của {A} trưởng?', en: 'Which key is closely related to {A} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{E} trưởng', en: '{E} major' }, correct: true },
          { text: { vi: '{E} thứ', en: '{E} minor' } },
          { text: { vi: '{C} trưởng', en: '{C} major' } },
          { text: { vi: '{F#} trưởng', en: '{F#} major' } },
        ],
      },
      reason: {
        vi: '{E} trưởng có 4 dấu thăng, hơn {A} trưởng đúng một dấu; {E} thứ chỉ có 1 dấu thăng.',
        en: '{E} major has 4 sharps, one more than {A} major; {E} minor has only 1 sharp.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giọng xa', en: 'Foreign keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giọng không gần được gọi là **giọng xa** (foreign keys, distantly related keys). Nhạc Lãng mạn dùng giọng xa để tạo kịch tính, chẳng hạn qua chuyển giọng qua nốt chung ở cuối chương.',
            en: 'Keys that are not closely related are **foreign**, or distantly related. Romantic music uses foreign keys for drama, for example through common-tone modulation, at the end of this chapter.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '{C} trưởng không có dấu hóa, {Ab} trưởng có 4 dấu giáng: hai giọng này xa nhau.',
            en: '{C} major has no sharps or flats and {Ab} major has four flats: these keys are foreign to each other.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 Ab4+C5+Eb5', labels: ['C', 'A♭'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h Ab2+Ab4+C5+Eb5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Từ giọng {D} thứ, nhạc Baroque thường chuyển sang giọng song song trưởng. Chủ âm của giọng ấy là gì?',
        en: 'From {D} minor, Baroque music usually modulates to the relative major. What is its tonic?',
      },
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: '{D} thứ và {F} trưởng cùng có một dấu giáng; {F} cao hơn {D} một quãng 3 thứ.',
        en: '{D} minor and {F} major both have one flat; {F} is a minor third above {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng nào không phải giọng gần của {D} thứ?', en: 'Which key is not closely related to {D} minor?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F} trưởng', en: '{F} major' } },
          { text: { vi: '{G} thứ', en: '{G} minor' } },
          { text: { vi: '{G} trưởng', en: '{G} major' }, correct: true },
          { text: { vi: '{Bb} trưởng', en: '{Bb} major' } },
        ],
      },
      reason: {
        vi: '{D} thứ có một dấu giáng, còn {G} trưởng có một dấu thăng: chênh nhau hai dấu.',
        en: '{D} minor has one flat and {G} major one sharp: they are two steps apart.',
      },
    },
  ],
} satisfies Lesson
