import type { Lesson } from '@/theory/types'

/** Book 23.1: enharmonic modulation, a pivot chord spelled right in only one key; G7 as V7 in C and Ger+6 in B minor. */
export default {
  id: 'enharmonic-pivot',
  title: { vi: 'Chuyển giọng trùng âm là gì', en: 'What enharmonic modulation is' },
  minutes: 4,
  sources: [{ section: '23.1', url: 'https://musictheory.pugetsound.edu/mt21c/EnharmonicModulationIntroduction.html' }],
  recap: [
    { vi: 'Chuyển giọng trùng âm: hợp âm trụ chỉ viết đúng được trong một giọng', en: 'Enharmonic modulation: the pivot chord is spelled correctly in only one key' },
    { vi: 'G7 là V7 trong {C} trưởng, và là Ger+6 trong {B} thứ', en: 'G7 is V7 in {C} major and Ger+6 in {B} minor' },
    { vi: 'V7 đi về chủ; Ger+6 đi xuống nửa cung đến hợp âm át', en: 'V7 goes to the tonic; Ger+6 moves down a half step to a dominant chord' },
    { vi: 'Hai hợp âm hay dùng: hợp âm bảy át và hợp âm bảy giảm', en: 'Two chords do it: the dominant seventh and the diminished seventh' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Một hợp âm, hai cách viết', en: 'One chord, two spellings' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi **chuyển giọng** (modulation) bằng **hợp âm trụ** (pivot chord), một hợp âm thuộc cả giọng cũ lẫn giọng mới. Ở **chuyển giọng trùng âm** (enharmonic modulation), hợp âm trụ chỉ viết đúng được trong một giọng; ở giọng kia, bạn phải hình dung cách viết trùng âm của nó.',
            en: 'In a **modulation** by **pivot chord**, one chord belongs to both the old key and the new one. In an **enharmonic modulation**, the pivot chord is spelled correctly in only one of the keys; in the other, you must imagine its enharmonic spelling.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nó giống một câu chơi chữ: cùng một âm thanh mà mang hai nghĩa. Hai hợp âm hay làm việc này là hợp âm bảy át và hợp âm bảy giảm.',
            en: 'It works like a pun: one sound with two meanings. Two chords are used this way: the dominant seventh and the diminished seventh.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Từ {C} trưởng sang {B} thứ', en: 'From {C} major to {B} minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm thứ ba là G7, tức V7 của giọng {C} trưởng. Nhưng nó không về {C}: nốt bass {G} đi xuống {F#}, và câu nhạc kết ở giọng {B} thứ.',
            en: 'The third chord is G7, which is V7 in {C} major. But it does not go to {C}: the bass {G} moves down to {F#}, and the phrase ends in {B} minor.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '3/4',
          notes: 'C3+E4+G4+C5:q F2+F4+A4+C5:q G2+F4+B4+D5:q | F#2+F#4+B4+D5:q F#2+F#4+A#4+C#5:q B2+F#4+B4+D5:q ||',
          labels: ['I', 'IV', 'V7\nGer+6', 'i\n6\n4', 'V', 'i'],
          highlight: [2],
        },
        {
          type: 'play',
          notes: 'C3+E4+G4+C5:q F2+F4+A4+C5:q G2+F4+B4+D5:q | F#2+F#4+B4+D5:q F#2+F#4+A#4+C#5:q B2+F#4+B4+D5:h ||',
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, G7 là V7. Nốt gốc {G} của nó muốn đi đến nốt nào?', en: 'In {C} major, G7 is V7. Where does its root {G} want to go?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5' }],
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'V7 muốn kết về I, nên nốt gốc đi xuống một quãng 5, từ {G} về {C}.',
        en: 'V7 wants to cadence on I, so its root moves down a 5th, from {G} to {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Cũng âm thanh ấy, trong {B} thứ', en: 'The same sound, in {B} minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng {B} thứ, âm thanh ấy là **hợp âm sáu tăng Đức** (German augmented sixth, Ger+6) trên bậc 6: {G} {B} {D} {E#}. Nốt {E#} bấm cùng phím với {F}, nhưng được viết khác.',
            en: 'In {B} minor, the same sound is a **German augmented sixth** (Ger+6) on scale degree 6: {G} {B} {D} {E#}. {E#} is the same key as {F}, but it is spelled differently.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ger+6 có nốt bass đi xuống nửa cung, từ {G} xuống {F#}, đến một hợp âm có chức năng át: ở đây là i6/4.',
            en: 'The Ger+6 bass moves down a half step, from {G} to {F#}, to a chord with dominant function: here, i6/4.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4+B4+D5+F5 G4+B4+D5+E#5', labels: ['G7', 'Ger+6'] },
        { type: 'play', notes: 'G4+B4+D5+F5 G4+B4+D5+E#5', label: { vi: 'Nghe hai cách viết', en: 'Hear both spellings' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {B} thứ, nốt bass {G} của Ger+6 đi đến nốt nào?', en: 'In {B} minor, where does the Ger+6 bass {G} go?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'G2+B2+D3+E#3' }],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Nốt bass của Ger+6 đi xuống nửa cung đến bậc 5: {G} xuống {F#}.',
        en: 'The Ger+6 bass moves down a half step to scale degree 5: {G} down to {F#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Vì sao gọi là chuyển giọng “trùng âm”?', en: 'Why is it called an “enharmonic” modulation?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm trụ chỉ viết đúng được trong một giọng, giọng kia cần cách viết trùng âm', en: 'The pivot chord is spelled correctly in only one key; the other needs an enharmonic spelling' }, correct: true },
          { text: { vi: 'Giọng cũ và giọng mới là hai giọng trùng âm', en: 'The old and new keys are enharmonic keys' } },
          { text: { vi: 'Nốt bass của hợp âm trụ trùng với chủ âm mới', en: 'The pivot chord’s bass is the new tonic' } },
        ],
      },
      reason: {
        vi: 'G7 cần {F} trong giọng {C} trưởng nhưng cần {E#} trong giọng {B} thứ: hai cách viết trùng âm của một hợp âm.',
        en: 'G7 needs {F} in {C} major but {E#} in {B} minor: two enharmonic spellings of one chord.',
      },
    },
  ],
} satisfies Lesson
