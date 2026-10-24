import type { Lesson } from '@/theory/types'

/**
 * Book 16.1 and 16.2 (triads): what figured bass is, realizing it, the triad
 * figures 5/3, 6, 6/4, figures within the key signature, and (16.5) a ♯ alone
 * raising the third.
 */
export default {
  id: 'figured-bass',
  title: { vi: 'Bè trầm số', en: 'Figured bass' },
  minutes: 5,
  sources: [
    { section: '16.1', url: 'https://musictheory.pugetsound.edu/mt21c/FiguredBassHistoricalContext.html' },
    { section: '16.2', url: 'https://musictheory.pugetsound.edu/mt21c/FiguredBassInversionSymbols.html' },
  ],
  practice: { drill: 'chords', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Bè trầm số: nốt bass kèm con số chỉ quãng phía trên nó', en: 'Figured bass: a bass note with numbers for the intervals above it' },
    { vi: 'Thế gốc 5/3 (thường không ghi), thế đảo 1 ghi 6, thế đảo 2 ghi 6/4', en: 'Root position is 5/3 (usually left blank), first inversion 6, second inversion 6/4' },
    { vi: 'Con số đếm theo hóa biểu; dấu ♯ đứng riêng nâng nốt quãng 3', en: 'Figures count within the key signature; a ♯ alone raises the 3rd' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bè trầm số là gì', en: 'What figured bass is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Bè trầm số** (figured bass) là cách ghi hợp âm ngắn gọn từ thời Baroque, khoảng 1600–1750. Người ta chỉ viết **bè trầm** (bass line), kèm các con số bên dưới. Mỗi số là một quãng phía trên nốt bass.',
            en: '**Figured bass** is a shorthand for chords from the Baroque era, about 1600–1750. Only the **bass line** is written, with numbers below it. Each number is an interval above the bass note.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'C3 E3 F3 G3 C3', labels: ['', '6', '', '', ''] },
        {
          type: 'play',
          notes: 'C3+E4+G4+C5:h E3+C4+G4+C5:h F3+C4+F4+A4:h G3+D4+G4+B4:h C3+E4+G4+C5:w',
          label: { vi: 'Nghe bè trầm thành hợp âm', en: 'Hear the bass as chords' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Chơi thành hợp âm', en: 'Realizing the figures' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Người chơi đàn phím hay guitar đọc nốt bass và con số, rồi tự chọn cách xếp các nốt phía trên, như khi đọc ký hiệu hợp âm. Bản in ngày nay thường viết sẵn các hợp âm ấy ra.',
            en: 'A keyboard or guitar player reads the bass and the numbers, then chooses how to voice the notes above, much as with lead-sheet symbols. Modern editions often write these chords out, or "realize" them.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ngày nay, bè trầm số được học chủ yếu như **ký hiệu thế đảo** (inversion symbols) của hợp âm.',
            en: 'Today figured bass is taught mainly as a shorthand for chord **inversion symbols**.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 E3+C4+G4+C5 F3+C4+F4+A4 G3+D4+G4+B4 C3+E4+G4+C5',
          labels: ['', '6', '', '', ''],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:h E3+C4+G4+C5:h F3+C4+F4+A4:h G3+D4+G4+B4:h C3+E4+G4+C5:w' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Số của hợp âm ba', en: 'Triad figures' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi thế của hợp âm ba có con số riêng, đếm quãng từ nốt bass lên. Thế gốc là 5/3 (quãng 5 và quãng 3), thế đảo 1 là 6/3, thế đảo 2 là 6/4.',
            en: 'Each position of a triad has its own figures, counting intervals up from the bass. Root position is 5/3 (a 5th and a 3rd), first inversion 6/3, and second inversion 6/4.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'C3+E3+G3 E3+G3+C4 G2+C3+E3', labels: ['5\n3', '6\n3', '6\n4'] },
        { type: 'play', notes: 'C3+E3+G3 E3+G3+C4 G2+C3+E3' },
        {
          type: 'tip',
          text: {
            vi: 'Thường ghi gọn: thế gốc không ghi số, 6/3 chỉ ghi 6, còn 6/4 giữ đủ hai số. Trong chữ ta viết 6/4; trên khuông, số 6 nằm trên số 4.',
            en: 'They are usually shortened: root position gets no figure, 6/3 is written 6, and 6/4 keeps both numbers. In text we write 6/4; on the staff the 6 sits above the 4.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này ghi số gì?', en: 'Which figure does this chord get?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'A2+C4+F4' },
        { type: 'play', notes: 'A2+C4+F4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Không ghi (5/3)', en: 'None (5/3)' } },
          { text: { vi: '6', en: '6' }, correct: true },
          { text: { vi: '6/4', en: '6/4' } },
        ],
      },
      reason: {
        vi: 'Từ {A} lên {C} là quãng 3, lên {F} là quãng 6: hợp âm {F} trưởng ở thế đảo 1, ghi 6.',
        en: 'Above {A}, {C} is a 3rd and {F} a 6th: the {F} major triad in first inversion, figured 6.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đếm theo hóa biểu', en: 'Within the key signature' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các con số đếm theo hóa biểu. Ở giọng {G} trưởng, nốt bass {D} không ghi số cho {D} {F#} {A}, vì {F} đã thăng sẵn.',
            en: 'The figures count within the key signature. In {G} major, a bass {D} with no figure gives {D} {F#} {A}, because {F} is already sharp.',
          },
        },
        { type: 'staff', clef: 'bass', key: 'G', notes: 'D3+F#3+A3' },
        { type: 'play', notes: 'D3+F#3+A3' },
        {
          type: 'tip',
          text: {
            vi: 'Trong nhạc thật, con số có thể mang dấu hóa. Một dấu ♯ đứng riêng dưới nốt bass nâng nốt quãng 3 phía trên lên nửa cung.',
            en: 'In real music the figures can carry accidentals. A ♯ alone under a bass note raises the 3rd above it by a half step.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {A} thứ, nốt bass {E} có số ♯. Nốt quãng 3 phía trên nó là nốt nào?',
        en: 'In {A} minor, the bass {E} is figured ♯. Which note is the 3rd above it?',
      },
      blocks: [{ type: 'staff', clef: 'bass', key: 'Am', notes: 'E3', labels: ['♯'] }],
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Theo hóa biểu, quãng 3 trên {E} là {G}; dấu ♯ nâng nó lên {G#}, cảm âm của giọng {A} thứ.',
        en: 'In the key signature the 3rd above {E} is {G}; the ♯ raises it to {G#}, the leading tone of {A} minor.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này ghi số gì?', en: 'Which figure does this chord get?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'D3+G4+B4' },
        { type: 'play', notes: 'D3+G4+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Không ghi (5/3)', en: 'None (5/3)' } },
          { text: { vi: '6', en: '6' } },
          { text: { vi: '6/4', en: '6/4' }, correct: true },
        ],
      },
      reason: {
        vi: 'Từ {D} lên {G} là quãng 4, lên {B} là quãng 6: hợp âm {G} trưởng ở thế đảo 2, ghi 6/4.',
        en: 'Above {D}, {G} is a 4th and {B} a 6th: the {G} major triad in second inversion, figured 6/4.',
      },
    },
  ],
} satisfies Lesson
