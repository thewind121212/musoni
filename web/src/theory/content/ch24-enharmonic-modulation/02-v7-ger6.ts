import type { Lesson } from '@/theory/types'

/** Book 23.2: V7 and Ger+6 as pivot chords, both directions, secondary dominants as Ger+6. */
export default {
  id: 'v7-ger6',
  title: { vi: 'V7 và Ger+6 làm hợp âm trụ', en: 'V7 and Ger+6 as pivot chords' },
  minutes: 5,
  sources: [{ section: '23.2', url: 'https://musictheory.pugetsound.edu/mt21c/TheV7andGer6asPivotChords.html' }],
  recap: [
    { vi: 'V7 và Ger+6 nghe như nhau; thường chỉ viết lại nốt trên cùng', en: 'V7 and Ger+6 sound the same; usually only the top note is respelled' },
    { vi: 'V7 nằm trên bậc 5 giọng trưởng; Ger+6 có bass trên bậc 6 hạ', en: 'V7 sits on degree 5 in major; Ger+6 has its bass on lowered degree 6' },
    { vi: 'Hợp âm át phụ như V7/IV cũng hiểu lại được thành Ger+6', en: 'Secondary dominants like V7/IV can be reinterpreted as Ger+6 too' },
    { vi: 'Ger+6 đi xuống nửa cung; V7 đi về chủ', en: 'Ger+6 moves down a half step; V7 goes to the tonic' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Viết lại nốt trên cùng', en: 'Respelling the top note' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'V7 có thể được hiểu lại thành Ger+6, và ngược lại. Thường chỉ cần viết lại nốt trên cùng: nốt bảy của V7 thành nốt sáu tăng của Ger+6.',
            en: 'A V7 can be reinterpreted as a Ger+6, and the other way round. Most often only the top note is respelled: the seventh of V7 becomes the augmented sixth of Ger+6.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cách viết cho biết giọng. Hợp âm bảy át có sẵn trên bậc 5 của giọng trưởng; Ger+6 thường có nốt bass trên **bậc 6 hạ** (lowered scale degree 6).',
            en: 'The spelling implies a key. A dominant seventh occurs diatonically on degree 5 in major; a Ger+6 most often has its bass on **lowered scale degree 6**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'Db4+F4+Ab4+Cb5 Db4+F4+Ab4+B4', labels: ['D♭7', 'Ger+6'] },
        { type: 'play', notes: 'Db4+F4+Ab4+Cb5 Db4+F4+Ab4+B4' },
        {
          type: 'tip',
          text: {
            vi: 'D♭7 là V7 của giọng {Gb} trưởng. Viết thành Ger+6, {Db} là bậc 6 hạ của giọng {F}.',
            en: 'D♭7 is V7 in {Gb} major. Spelled as a Ger+6, {Db} is lowered degree 6 of {F}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'A♭7 viết lại thành Ger+6: {Ab} {C} {Eb} {F#}. {Ab} là bậc 6 hạ của giọng nào? Chọn chủ âm.', en: 'A♭7 respelled as a Ger+6: {Ab} {C} {Eb} {F#}. {Ab} is lowered degree 6 of which key? Pick the tonic.' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Ab4+C5+Eb5+F#5' }],
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: '{Ab} nằm trên {C} một quãng 6 thứ, tức là bậc 6 hạ của giọng {C}.',
        en: '{Ab} is a minor 6th above {C}, which makes it lowered degree 6 in {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm át phụ cũng vậy', en: 'Secondary dominants too' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các **hợp âm át phụ** (secondary dominant) như V7/IV hay V7/V cũng được hiểu lại thành Ger+6. Ở đây F7 nghe như V7/IV của giọng {F} trưởng; viết {D#} thay {Eb}, nó là Ger+6 của giọng {A} thứ.',
            en: '**Secondary dominants** like V7/IV or V7/V are reinterpreted as Ger+6 chords too. Here F7 sounds like V7/IV in {F} major; spelled with {D#} instead of {Eb}, it is a Ger+6 in {A} minor.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'F2+F4+A4+C5:q C3+E4+G4+C5:q F2+F4+A4+C5:q F2+D#4+A4+C5:q | E2+E4+A4+C5:q E2+E4+G#4+B4:q A2+E4+A4+C5:h ||',
          labels: ['I', 'V', 'I', 'V7/IV\nGer+6', 'i\n6\n4', 'V', 'i'],
          highlight: [3],
        },
        { type: 'play', notes: 'F2+F4+A4+C5:q C3+E4+G4+C5:q F2+F4+A4+C5:q F2+D#4+A4+C5:q | E2+E4+A4+C5:q E2+E4+G#4+B4:q A2+E4+A4+C5:h ||' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} thứ, nốt bass {F} của Ger+6 đi đến nốt nào?', en: 'In {A} minor, where does the Ger+6 bass {F} go?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'F2+A2+C3+D#3' }],
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Nốt bass của Ger+6 đi xuống nửa cung đến bậc 5: {F} xuống {E}.',
        en: 'The Ger+6 bass moves down a half step to scale degree 5: {F} down to {E}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chiều ngược lại', en: 'The other way round' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng {E} thứ, Ger+6 là {C} {E} {G} {A#}. Viết {Bb} thay {A#}, nó thành C7, tức V7 của giọng {F} trưởng, và nhạc về {F}.',
            en: 'In {E} minor, the Ger+6 is {C} {E} {G} {A#}. Spelled with {Bb} instead of {A#}, it becomes C7, the V7 of {F} major, and the music goes to {F}.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'E3+G3+E4+B4:q B2+F#3+D#4+B4:q E3+G3+E4+B4:q C3+G3+E4+Bb4:q | F2+F3+F4+A4:h C3+G3+E4+Bb4:q F2+F3+F4+A4:q ||',
          labels: ['i', 'V', 'i', 'Ger+6\nV7', 'I', 'V7', 'I'],
          highlight: [3],
        },
        { type: 'play', notes: 'E3+G3+E4+B4:q B2+F#3+D#4+B4:q E3+G3+E4+B4:q C3+G3+E4+Bb4:q | F2+F3+F4+A4:h C3+G3+E4+Bb4:q F2+F3+F4+A4:q ||' },
        {
          type: 'tip',
          text: {
            vi: 'Ít gặp hơn: giữ nốt trên cùng và viết lại ba nốt dưới. Ví dụ Ger+6 {Ab} {C} {Eb} {F#} thành {G#} {B#} {D#} {F#}, tức G♯7.',
            en: 'Less often, the top note stays and the bottom three are respelled. For example, the Ger+6 {Ab} {C} {Eb} {F#} becomes {G#} {B#} {D#} {F#}, which is G♯7.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ger+6 {C} {E} {G} {A#} được nghe như C7. Nó đưa nhạc về chủ âm nào?', en: 'The Ger+6 {C} {E} {G} {A#} is heard as C7. Which tonic does it lead to?' },
      blocks: [{ type: 'play', notes: 'C3+G3+E4+A#4' }],
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'C7 là V7 của giọng {F} trưởng, nên nó kết về {F}.',
        en: 'C7 is V7 of {F} major, so it cadences on {F}.',
      },
    },
  ],
} satisfies Lesson
