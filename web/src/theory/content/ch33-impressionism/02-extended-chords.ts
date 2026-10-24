import type { Lesson } from '@/theory/types'

/** Book 32.1 (second technique): 9ths, 11ths and 13ths above the seventh, and their chromatic alterations. */
export default {
  id: 'extended-chords',
  title: { vi: 'Nốt mở rộng trong hợp âm', en: 'Upper extensions' },
  minutes: 4,
  sources: [{ section: '32.1', url: 'https://musictheory.pugetsound.edu/mt21c/Impressionism.html' }],
  recap: [
    { vi: 'Chồng tiếp quãng 3 trên nốt 7: nốt 9, 11, 13', en: 'Keep stacking 3rds above the 7th: the 9th, 11th and 13th' },
    { vi: 'Nốt 9 là nốt 2 cao hơn một quãng tám', en: 'The 9th is the 2nd an octave higher' },
    { vi: 'Nốt mở rộng có thể nâng hay hạ: ♭9, ♯9, ♯11', en: 'Extensions can be raised or lowered: ♭9, ♯9, ♯11' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chồng quãng 3 qua nốt 7', en: 'Thirds above the 7th' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm ba và hợp âm bảy là chồng các quãng 3. Chồng thêm quãng 3 nữa, ta có các **nốt mở rộng** (upper extensions): nốt 9, nốt 11 và nốt 13, như trong chương nhạc jazz.',
            en: 'Triads and seventh chords are stacks of 3rds. Stack more 3rds and you get the **upper extensions**: the 9th, 11th and 13th, as in the jazz chapter.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Debussy và Ravel dùng nhiều hợp âm có nốt 9, 11, 13, đôi khi nâng hay hạ các nốt ấy nửa cung.',
            en: 'Debussy and Ravel used many chords with 9ths, 11ths and 13ths, sometimes raising or lowering those notes a half step.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 G4 Bb4 D5 F5 A5', labels: ['1', '3', '5', '7', '9', '11', '13'], highlight: [4, 5, 6] },
        { type: 'play', notes: 'C4 E4 G4 Bb4 D5 F5 A5', label: { vi: 'Nghe từng nốt', en: 'Hear note by note' } },
        { type: 'play', notes: 'C4+E4+G4+Bb4+D5+F5+A5', label: { vi: 'Nghe cả hợp âm', en: 'Hear the whole chord' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt 9 trên giai điệu', en: 'The 9th in the melody' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở ô nhịp 15 bản Clair de lune, Debussy dùng hợp âm E♭m9 và đặt nốt 9 lên giai điệu. E♭m9 là hợp âm bảy thứ {Eb} {Gb} {Bb} {Db} cộng nốt 9 là {F}.',
            en: 'In bar 15 of Clair de lune, Debussy uses an E♭m9 chord with its 9th in the melody. E♭m9 is the minor seventh chord {Eb} {Gb} {Bb} {Db} plus the 9th, {F}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'Eb4 Gb4 Bb4 Db5 F5', labels: ['1', '3', '5', '7', '9'], highlight: [4] },
        { type: 'play', notes: 'Eb4+Gb4+Bb4+Db5:h F5:h', label: { vi: 'Hợp âm, rồi nốt 9', en: 'The chord, then its 9th' } },
        { type: 'play', notes: 'Eb4+Gb4+Bb4+Db5+F5', label: { vi: 'Nghe E♭m9', en: 'Hear E♭m9' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt 9 của hợp âm Am9 là nốt gì?', en: 'What is the 9th of an Am9 chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A3 C4 E4 G4', labels: ['1', '3', '5', '7'] },
        { type: 'play', notes: 'A3 C4 E4 G4' },
      ],
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Nốt 9 là nốt 2 cao hơn một quãng tám; trên {A}, nốt 9 là {B}.',
        en: 'The 9th is the 2nd an octave higher; above {A}, the 9th is {B}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt mở rộng biến âm', en: 'Altered extensions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong La Puerta del Vino, Debussy để tay trái giữ D♭7 trong khi tay phải đổi qua lại giữa ♯9 và ♭9. Về sau ông thêm cả ♯11.',
            en: 'In La Puerta del Vino, Debussy keeps a D♭7 in the left hand while the right hand alternates between the ♯9 and the ♭9. Later he adds the ♯11 too.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trên C7 ({C} {E} {G} {Bb}): ♭9 là {Db}, ♯9 là {D#}, ♯11 là {F#}.',
            en: 'Over C7 ({C} {E} {G} {Bb}): the ♭9 is {Db}, the ♯9 is {D#}, the ♯11 is {F#}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+Bb4+Db5 C4+E4+Bb4+D#5 C4+E4+Bb4+F#5', labels: ['♭9', '♯9', '♯11'] },
        { type: 'play', notes: 'C4+E4+Bb4+Db5 C4+E4+Bb4+D#5 C4+E4+Bb4+F#5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm C7 có thêm ♯9. Nốt ♯9 là nốt gì?', en: 'A C7 chord adds the ♯9. What note is the ♯9?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4', labels: ['C7'] }],
      answer: { type: 'key', note: 'D#' },
      reason: {
        vi: 'Nốt 9 trên {C} là {D}; nâng lên nửa cung thành {D#}.',
        en: 'The 9th above {C} is {D}; raised a half step it is {D#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Còn nốt ♯11 của C7 là nốt gì?', en: 'And what note is the ♯11 of C7?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4', labels: ['C7'] }],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Nốt 11 trên {C} là {F}; nâng lên nửa cung thành {F#}.',
        en: 'The 11th above {C} is {F}; raised a half step it is {F#}.',
      },
    },
  ],
} satisfies Lesson
