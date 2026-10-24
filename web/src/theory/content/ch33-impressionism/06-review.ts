import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (32.5) on 32.1-32.4. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 33', en: 'Chapter 33 review' },
  minutes: 4,
  sources: [{ section: '32.5', url: 'https://musictheory.pugetsound.edu/mt21c/Impressionism-Practice-Exercises.html' }],
  recap: [
    { vi: 'Điệu thức, nốt mở rộng, hợp âm song song', en: 'Modes, upper extensions, planing' },
    { vi: 'Toàn thuận giọng và hợp âm chồng quãng 4, 5, 2', en: 'Pandiatonicism and quartal, quintal, secundal chords' },
    { vi: 'Đa hợp âm', en: 'Polychords' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Điệu thức Lydian trên {G}: nốt 4 là nốt gì?', en: '{G} Lydian: what is the 4th note?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4 A4 B4', labels: ['1', '2', '3'] },
        { type: 'play', notes: 'G4 A4 B4' },
      ],
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'Gam {G} trưởng có {C}; Lydian nâng nốt 4 lên nửa cung thành {C#}.',
        en: '{G} major has {C}; Lydian raises the 4th a half step to {C#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Điệu thức nào là gam thứ tự nhiên với nốt 2 hạ xuống?', en: 'Which mode is natural minor with a lowered 2nd?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Dorian', en: 'Dorian' } },
          { text: { vi: 'Phrygian', en: 'Phrygian' }, correct: true },
          { text: { vi: 'Lydian', en: 'Lydian' } },
        ],
      },
      reason: {
        vi: 'Phrygian hạ nốt 2; Dorian nâng nốt 6 của gam thứ, Lydian nâng nốt 4 của gam trưởng.',
        en: 'Phrygian lowers the 2nd; Dorian raises the 6th of minor, Lydian the 4th of major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong Phrygian trên {G}, hợp âm bảy trên bậc 5 là gì?', en: 'In {G} Phrygian, what is the seventh chord on 5?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4+F4+Ab4+C5' },
        { type: 'play', notes: 'D4+F4+Ab4+C5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'D7', en: 'D7' } },
          { text: { vi: 'Dm7', en: 'Dm7' } },
          { text: { vi: 'Dø7', en: 'Dø7' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nốt 2 hạ thành {Ab} làm nốt năm của hợp âm, nên {D} {F} {Ab} {C} là hợp âm bảy nửa giảm.',
        en: 'The lowered 2nd, {Ab}, is the chord’s fifth, so {D} {F} {Ab} {C} is half-diminished.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt 9 của hợp âm G9 là nốt gì?', en: 'What is the 9th of a G9 chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G3 B3 D4 F4', labels: ['1', '3', '5', '7'] }],
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'Nốt 9 là nốt 2 cao hơn một quãng tám; trên {G}, đó là {A}.',
        en: 'The 9th is the 2nd an octave higher; above {G}, that is {A}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Giai điệu {G} là nốt 9 của một hợp âm chín át. Nốt gốc là gì?', en: 'The melody note {G} is the 9th of a dominant ninth chord. What is the root?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G5', labels: ['9'] }],
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Nốt gốc thấp hơn nốt 9 một nguyên cung (và một quãng tám): {F}.',
        en: 'The root is a whole step (and an octave) below the 9th: {F}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Sáu nốt này là kiểu hòa âm nào?', en: 'What kind of harmony are these six notes?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+F4+Bb4+Eb5+Ab5+Db6' },
        { type: 'play', notes: 'C4+F4+Bb4+Eb5+Ab5+Db6' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chồng quãng 3', en: 'Tertian' } },
          { text: { vi: 'Chồng quãng 4', en: 'Quartal' }, correct: true },
          { text: { vi: 'Chồng quãng 5', en: 'Quintal' } },
          { text: { vi: 'Chồng quãng 2', en: 'Secundal' } },
        ],
      },
      reason: {
        vi: '{C} {F} {Bb} {Eb} {Ab} {Db}: mỗi nốt cao hơn nốt dưới một quãng 4 đúng.',
        en: '{C} {F} {Bb} {Eb} {Ab} {Db}: each note is a perfect 4th above the one below.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong toàn thuận giọng, hợp âm V có phải về I không?', en: 'In pandiatonicism, does V have to go to I?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có, như mọi khi', en: 'Yes, as always' } },
          { text: { vi: 'Không, nốt của gam không cần đi theo chức năng', en: 'No, the scale’s notes need not function tonally' }, correct: true },
        ],
      },
      reason: {
        vi: 'Toàn thuận giọng dùng nốt của gam như một làn âm, không bắt V về I.',
        en: 'Pandiatonicism uses the scale’s notes as a wash of sound, without making V go to I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đa hợp âm được viết thế nào?', en: 'How is a polychord written?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai ký hiệu cách nhau bằng gạch chéo', en: 'Two symbols with a slash between' } },
          { text: { vi: 'Hai ký hiệu, một trên một dưới gạch ngang', en: 'Two symbols, one above and one below a horizontal line' }, correct: true },
          { text: { vi: 'Một ký hiệu có số 13', en: 'One symbol with a 13' } },
        ],
      },
      reason: {
        vi: 'Gạch chéo dành cho hợp âm gạch chéo; đa hợp âm dùng gạch ngang.',
        en: 'The slash is for slash chords; a polychord uses a horizontal line.',
      },
    },
  ],
} satisfies Lesson
