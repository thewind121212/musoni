import type { Lesson } from '@/theory/types'

/** Book 23.3: the fully diminished seventh as pivot: four respellings, four keys, and °7 to V7 by lowering one note. */
export default {
  id: 'diminished-pivot',
  title: { vi: 'Hợp âm bảy giảm làm hợp âm trụ', en: 'The diminished seventh as pivot chord' },
  minutes: 5,
  sources: [{ section: '23.3', url: 'https://musictheory.pugetsound.edu/mt21c/TheFullyDiminishedSeventhAsPivotChord.html' }],
  recap: [
    { vi: 'Hợp âm bảy giảm gồm bốn nốt cách đều nhau một quãng 3 thứ', en: 'A diminished seventh chord is four notes a minor 3rd apart' },
    { vi: 'Mỗi nốt có thể là cảm âm: một hợp âm, bốn giọng', en: 'Each note can be the leading tone: one chord, four keys' },
    { vi: 'Viết lại trùng âm vii°7 để sang giọng mới', en: 'Respell vii°7 enharmonically to reach a new key' },
    { vi: 'Hạ một nốt xuống nửa cung, bạn được một hợp âm bảy át', en: 'Lower one note a half step and you get a dominant seventh' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bốn cách viết', en: 'Four spellings' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm bảy giảm gồm ba quãng 3 thứ chồng lên nhau, và từ nốt trên cùng lên nốt gốc ở quãng tám trên cũng là một quãng 3 thứ. Viết lại trùng âm, nốt nào cũng có thể làm nốt gốc.',
            en: 'A diminished seventh chord is three minor 3rds stacked up, and from its top note up to the root an octave higher is one more minor 3rd. Respelled enharmonically, any of its notes can be the root.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B3+D4+F4+Ab4 D4+F4+Ab4+Cb5 E#4+G#4+B4+D5 G#4+B4+D5+F5', labels: ['B°7', 'D°7', 'E♯°7', 'G♯°7'] },
        { type: 'play', notes: 'B3+D4+F4+Ab4 D4+F4+Ab4+Cb5 E#4+G#4+B4+D5 G#4+B4+D5+F5', label: { vi: 'Nghe bốn cách viết', en: 'Hear the four spellings' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Một hợp âm, bốn giọng', en: 'One chord, four keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi nốt của hợp âm có thể là cảm âm, đi lên nửa cung về chủ âm. Vì vậy một hợp âm bảy giảm là vii°7 của bốn giọng: ở đây là {C}, {Eb}, {F#} và {A} thứ.',
            en: 'Each note of the chord can be the leading tone, rising a half step to the tonic. So one diminished seventh is vii°7 in four keys: here {C}, {Eb}, {F#} and {A} minor.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B3+D4+F4+Ab4 C4+Eb4+G4 | D4+F4+Ab4+Cb5 Eb4+Gb4+Bb4', labels: ['B°7', 'Cm', 'D°7', 'E♭m'] },
        { type: 'staff', clef: 'treble', notes: 'E#4+G#4+B4+D5 F#4+A4+C#5 | G#4+B4+D5+F5 A4+C5+E5', labels: ['E♯°7', 'F♯m', 'G♯°7', 'Am'] },
        { type: 'play', notes: 'B3+D4+F4+Ab4 C4+Eb4+G4 D4+F4+Ab4+Cb5 Eb4+Gb4+Bb4 E#4+G#4+B4+D5 F#4+A4+C#5 G#4+B4+D5+F5 A4+C5+E5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: '{E} {G} {Bb} {Db} là vii°7 của giọng nào? Chọn chủ âm.', en: '{E} {G} {Bb} {Db} is vii°7 of which key? Pick the tonic.' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E4+G4+Bb4+Db5' }],
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Nốt gốc {E} là cảm âm, đi lên nửa cung về {F}.',
        en: 'The root {E} is the leading tone, rising a half step to {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Từ {A} thứ sang {C} thứ', en: 'From {A} minor to {C} minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng {A} thứ, vii°7 là {G#} {B} {D} {F}. Viết {Ab} thay {G#}, nó thành {B} {D} {F} {Ab}, tức vii°7 của giọng {C} thứ, và nhạc đi về {C} thứ.',
            en: 'In {A} minor, vii°7 is {G#} {B} {D} {F}. Spelled with {Ab} instead of {G#}, it becomes {B} {D} {F} {Ab}, the vii°7 of {C} minor, and the music goes to {C} minor.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '3/4',
          notes: 'A2+E4+A4+C5:q D3+F4+A4+D5:q B2+F4+Ab4+D5:q | C3+Eb4+G4+C5:q G2+D4+G4+B4:q C3+Eb4+G4+C5:q ||',
          labels: ['i', 'iv', 'vii°7', 'i', 'V', 'i'],
          highlight: [2],
        },
        { type: 'play', notes: 'A2+E4+A4+C5:q D3+F4+A4+D5:q B2+F4+Ab4+D5:q | C3+Eb4+G4+C5:q G2+D4+G4+B4:q C3+Eb4+G4+C5:h ||' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở ví dụ trên, nốt nào được viết lại trùng âm?', en: 'In the example above, which note is respelled?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{G#} thành {Ab}', en: '{G#} becomes {Ab}' }, correct: true },
          { text: { vi: '{B} thành {Cb}', en: '{B} becomes {Cb}' } },
          { text: { vi: '{F} thành {E#}', en: '{F} becomes {E#}' } },
        ],
      },
      reason: {
        vi: 'Trong {A} thứ, cảm âm là {G#}; trong {C} thứ, cùng phím ấy là nốt bảy {Ab} của B°7.',
        en: 'In {A} minor the leading tone is {G#}; in {C} minor the same key is {Ab}, the seventh of B°7.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Từ bảy giảm sang bảy át', en: 'From diminished to dominant seventh' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Coi một nốt là nốt bảy của hợp âm và hạ nó xuống nửa cung: nó thành nốt gốc của một hợp âm bảy át. Hạ {Ab} của B°7 xuống {G}, bạn được {B} {D} {F} {G}, tức G7.',
            en: 'Treat one note as the chord’s seventh and lower it a half step: it becomes the root of a dominant seventh chord. Lower the {Ab} of B°7 to {G} and you get {B} {D} {F} {G}, which is G7.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B3+D4+F4+Ab4 B3+D4+F4+G4', labels: ['B°7', 'G7'] },
        { type: 'play', notes: 'B3+D4+F4+Ab4 B3+D4+F4+G4' },
        {
          type: 'tip',
          text: {
            vi: 'Hạ lần lượt từng nốt trong bốn nốt, bạn được bốn hợp âm bảy át: G7, E7, C♯7 và B♭7.',
            en: 'Lower each of the four notes in turn and you get four dominant sevenths: G7, E7, C♯7 and B♭7.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hạ {F} của B°7 ({B} {D} {F} {Ab}) xuống nửa cung. Hợp âm bảy át mới có nốt gốc nào?', en: 'Lower the {F} of B°7 ({B} {D} {F} {Ab}) a half step. What is the root of the new dominant seventh?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'B3+D4+F4+Ab4' }],
      answer: { type: 'key', note: 'E', blackKeys: 'b' },
      reason: {
        vi: '{F} xuống nửa cung là {E}, và {E} {G#} {B} {D} là E7 ({G#} trùng âm với {Ab}).',
        en: '{F} down a half step is {E}, and {E} {G#} {B} {D} is E7 ({G#} is enharmonic with {Ab}).',
      },
    },
  ],
} satisfies Lesson
