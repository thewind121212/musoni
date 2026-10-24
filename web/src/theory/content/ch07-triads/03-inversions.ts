import type { Lesson } from '@/theory/types'

/** Book 6.3: root and bass, root position and the two inversions, slash chords (6.3.1). */
export default {
  id: 'inversions',
  title: { vi: 'Thế đảo và hợp âm gạch chéo', en: 'Inversions and slash chords' },
  minutes: 4,
  sources: [{ section: '6.3', url: 'https://musictheory.pugetsound.edu/mt21c/InvertedTriads.html' }],
  practice: { drill: 'chords', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Nốt bass là nốt thấp nhất; nó không nhất thiết là nốt gốc', en: 'The bass is the lowest note; it need not be the root' },
    { vi: 'Thế gốc, thế đảo 1, thế đảo 2: nốt gốc, nốt ba, nốt năm ở dưới cùng', en: 'Root position, first and second inversion: the root, third or fifth at the bottom' },
    { vi: 'Hợp âm gạch chéo: hợp âm trước dấu /, nốt bass sau', en: 'Slash chord: the chord before the slash, the bass note after it' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt gốc và nốt bass', en: 'Root and bass' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt bass** (bass note) là nốt thấp nhất đang vang. Nốt gốc là nốt thấp nhất khi các nốt xếp chồng theo quãng 3. Hai nốt này không phải lúc nào cũng trùng nhau.',
            en: 'The **bass note** is the lowest note sounding. The root is the lowest note when the notes are stacked in thirds. The two are not always the same note.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 E4+G4+C5', highlight: [1] },
        { type: 'play', notes: 'C4+E4+G4 E4+G4+C5', label: { vi: 'Nghe bass {C}, rồi bass {E}', en: 'Hear {C} in the bass, then {E}' } },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm thứ hai vẫn là {C} {E} {G} với nốt gốc {C}, chỉ có {E} nằm dưới cùng.',
            en: 'The second chord is still {C} {E} {G} with {C} as its root; only {E} is at the bottom.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Thế gốc và hai thế đảo', en: 'Root position and two inversions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt gốc ở dưới cùng là **thế gốc** (root position). Nốt ba ở dưới cùng là **thế đảo 1** (first inversion). Nốt năm ở dưới cùng là **thế đảo 2** (second inversion).',
            en: 'With the root at the bottom, a triad is in **root position**. With the third at the bottom, it is in **first inversion**. With the fifth at the bottom, it is in **second inversion**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 E4+G4+C5 G4+C5+E5', labels: ['1', '3', '5'] },
        { type: 'play', notes: 'C4+E4+G4 E4+G4+C5 G4+C5+E5' },
        {
          type: 'tip',
          text: {
            vi: 'Số dưới mỗi hợp âm là nốt đang ở dưới cùng: 1 nốt gốc, 3 nốt ba, 5 nốt năm.',
            en: 'The number under each chord is the note at the bottom: 1 the root, 3 the third, 5 the fifth.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này ở thế nào?', en: 'Which position is this triad in?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4+D5+F5' },
        { type: 'play', notes: 'A4+D5+F5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Thế gốc', en: 'Root position' } },
          { text: { vi: 'Thế đảo 1', en: 'First inversion' } },
          { text: { vi: 'Thế đảo 2', en: 'Second inversion' }, correct: true },
        ],
      },
      reason: {
        vi: 'Xếp lại thành {D} {F} {A}: nốt gốc là {D}, còn nốt năm {A} đang nằm dưới cùng.',
        en: 'Restacked it is {D} {F} {A}: the root is {D}, and the fifth, {A}, is at the bottom.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm gạch chéo', en: 'Slash chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ký hiệu hợp âm viết thế đảo bằng **hợp âm gạch chéo** (slash chord): hợp âm đứng trước dấu /, nốt bass đứng sau. F/A là hợp âm F với {A} nằm dưới cùng.',
            en: 'Lead-sheet symbols write an inversion as a **slash chord**: the triad before the slash (/), the bass note after it. F/A means an F triad with {A} at the bottom.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chữ đầu tiên luôn là nốt gốc, chữ sau dấu / là nốt bass. Nốt bass thậm chí có thể không thuộc hợp âm, như C/F♯.',
            en: 'The first letter is always the root; the letter after the slash is the bass. The bass can even be a note outside the chord, as in C/F♯.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4+C5+F5 B4+D5+G5', labels: ['F/A', 'G/B'] },
        { type: 'play', notes: 'A4+C5+F5 B4+D5+G5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4+C5+E5' },
        { type: 'play', notes: 'G4+C5+E5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C', en: 'C' } },
          { text: { vi: 'C/G', en: 'C/G' }, correct: true },
          { text: { vi: 'G/C', en: 'G/C' } },
        ],
      },
      reason: {
        vi: 'Xếp lại thành {C} {E} {G}: hợp âm C với {G} nằm dưới cùng, nên viết C/G.',
        en: 'Restacked it is {C} {E} {G}: a C triad with {G} at the bottom, written C/G.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt gốc của hợp âm Am/C là nốt nào?', en: 'What is the root of Am/C?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C5+E5+A5' }],
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Chữ đầu tiên là nốt gốc: Am là {A} thứ, còn {C} chỉ là nốt bass.',
        en: 'The first letter is the root: Am is {A} minor, and {C} is only the bass.',
      },
    },
  ],
} satisfies Lesson
