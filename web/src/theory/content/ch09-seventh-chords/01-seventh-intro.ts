import type { Lesson } from '@/theory/types'

/** Book 8.1: a seventh chord is a triad plus a third above the fifth; chord members are odd numbers. */
export default {
  id: 'seventh-intro',
  title: { vi: 'Hợp âm bảy là gì', en: 'What a seventh chord is' },
  minutes: 3,
  sources: [{ section: '8.1', url: 'https://musictheory.pugetsound.edu/mt21c/SeventhChordsIntroduction.html' }],
  recap: [
    { vi: 'Hợp âm bảy là hợp âm ba thêm một quãng 3 trên nốt năm', en: 'A seventh chord is a triad plus a third above the fifth' },
    { vi: 'Bốn nốt: nốt gốc, nốt ba, nốt năm, nốt bảy', en: 'Four members: root, third, fifth, seventh' },
    { vi: 'Nốt bảy cách nốt gốc một quãng 7', en: 'The seventh is a 7th above the root' },
    { vi: 'Xếp chồng quãng 3 nên các nốt mang số lẻ, cao nhất là 13', en: 'Stacked thirds give odd numbers, up to the 13th' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Thêm một quãng 3', en: 'One more third' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm bảy** (seventh chord) là một hợp âm ba được thêm một nốt nữa, cao hơn nốt năm một quãng 3. Hợp âm ba có ba nốt, hợp âm bảy có bốn.',
            en: 'A **seventh chord** adds to a triad one more note, a third above the fifth. A triad has three notes; a seventh chord has four.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 C4+E4+G4+B4', highlight: [1] },
        { type: 'play', notes: 'C4+E4+G4 C4+E4+G4+B4', label: { vi: 'Nghe hợp âm ba, rồi hợp âm bảy', en: 'Hear the triad, then the seventh chord' } },
        { type: 'keys', notes: 'C4 E4 G4 B4', labels: 'names' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt bảy', en: 'The seventh' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bốn nốt mang tên theo khoảng cách từ nốt gốc: nốt gốc, nốt ba, nốt năm và **nốt bảy** (seventh). Nốt bảy cao hơn nốt gốc một quãng 7.',
            en: 'The four members are named by their distance above the root: root, third, fifth and **seventh**. The seventh is a 7th above the root.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4 B4', labels: ['1', '3', '5', '7'], highlight: [3] },
        { type: 'play', notes: 'C4 E4 G4 B4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bảy của hợp âm này là nốt nào?', en: 'Which note is the seventh of this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5' }],
      answer: { type: 'key', note: 'F' },
      reason: {
        vi: 'Đếm lên từ nốt gốc {G}: {B} là nốt ba, {D} là nốt năm, {F} là nốt bảy.',
        en: 'Count up from the root {G}: {B} is the third, {D} the fifth, {F} the seventh.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Vì sao toàn số lẻ', en: 'Why odd numbers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm xếp chồng các quãng 3, nên các nốt mang số lẻ: 3, 5, 7, rồi 9, 11, 13 ở các chương sau. Nốt 15 trùng với nốt gốc cách hai quãng tám, nên hợp âm chỉ lên tới 13.',
            en: 'Chords are built in thirds, so their members are odd numbers: 3, 5, 7, and later the 9th, 11th and 13th. The 15th would be the root two octaves up, so chords stop at the 13th.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4 B4 D5 F5 A5', labels: ['1', '3', '5', '7', '9', '11', '13'], highlight: [3] },
        { type: 'play', notes: 'C4 E4 G4 B4 D5 F5 A5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào là hợp âm bảy?', en: 'Which chord is a seventh chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+F4+A4 | E4+G4+B4+D5 | F4+A4+C5', labels: ['1', '2', '3'] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm 1', en: 'Chord 1' } },
          { text: { vi: 'Hợp âm 2', en: 'Chord 2' }, correct: true },
          { text: { vi: 'Hợp âm 3', en: 'Chord 3' } },
        ],
      },
      reason: {
        vi: 'Hợp âm 2 có bốn nốt xếp chồng quãng 3: {E} {G} {B} {D}; hai hợp âm kia chỉ có ba nốt.',
        en: 'Chord 2 has four notes stacked in thirds, {E} {G} {B} {D}; the other two have only three.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Thêm một quãng 3 trên nốt bảy, ta được nốt thứ mấy?', en: 'Add a third above the seventh: which member is it?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt 8', en: 'The 8th' } },
          { text: { vi: 'Nốt 9', en: 'The 9th' }, correct: true },
          { text: { vi: 'Nốt 10', en: 'The 10th' } },
        ],
      },
      reason: {
        vi: 'Mỗi quãng 3 cộng thêm 2 vào số của nốt, nên sau 7 là 9.',
        en: 'Each third adds 2 to the member number, so after 7 comes 9.',
      },
    },
  ],
} satisfies Lesson
