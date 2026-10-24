import type { Lesson } from '@/theory/types'

/**
 * Book 22.5: reading the new key from recurring accidentals; 22.6: chromatic
 * pivot chords (secondary, borrowed and Neapolitan common chords). Our own
 * progressions follow the relations the book describes in its Schubert and
 * Beethoven examples. The augmented sixth pivot is only named, as the book
 * leaves it to the next chapter. No practice link: no drill fits.
 */
export default {
  id: 'chromatic-pivot',
  title: { vi: 'Giọng mới và hợp âm trụ biến âm', en: 'The new key and chromatic pivots' },
  minutes: 6,
  sources: [
    { section: '22.5', url: 'https://musictheory.pugetsound.edu/mt21c/HowToRecognizeAKeyAfterAModulation.html' },
    { section: '22.6', url: 'https://musictheory.pugetsound.edu/mt21c/ModulationsWithChromaticPivotChords.html' },
  ],
  recap: [
    { vi: 'Cộng dấu hóa lặp lại vào hóa biểu để tìm giọng mới', en: 'Add recurring accidentals to the key signature to find the new key' },
    { vi: 'Dấu giáng thường tạo bậc 4, dấu thăng thường tạo cảm âm', en: 'Flats usually make degree 4, sharps often the leading tone' },
    { vi: 'Hợp âm trụ biến âm không thuận giọng ở ít nhất một giọng', en: 'A chromatic pivot is not diatonic in at least one key' },
    { vi: 'Hợp âm át phụ, hợp âm mượn và hợp âm Napoli đều làm trụ được', en: 'Secondary dominants, borrowed chords and the Neapolitan can all be pivots' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Dấu hóa lặp lại', en: 'Recurring accidentals' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Để nhận ra giọng mới, hãy tìm dấu hóa lặp lại và cộng nó vào hóa biểu. Dấu giáng thường tạo bậc 4, như dấu giáng cuối của hóa biểu. Dấu thăng thường tạo bậc 7, tức cảm âm.',
            en: 'To find the new key, look for recurring accidentals and add them to the key signature. Flats usually make scale degree 4, as the last flat of a key signature does. Sharps often make scale degree 7, the leading tone.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'G4:q A4:q B4:q C5:q | D5:q C5:q B4:q A4:q | G4:q F#4:q A4:q F#4:q | G4:w ||', highlight: [9, 11] },
        { type: 'play', notes: 'G4:q A4:q B4:q C5:q D5:q C5:q B4:q A4:q G4:q F#4:q A4:q F#4:q G4:w', bpm: 100, label: { vi: 'Nghe: {F#} dẫn về {G}', en: 'Hear {F#} lead to {G}' } },
        {
          type: 'text',
          text: {
            vi: 'Nhiều dấu thăng cùng lúc: dấu thăng đứng sau cùng trong thứ tự dấu thăng là cảm âm. Dấu hóa bị xóa ngay sau đó chỉ báo chủ âm hóa hoặc **nốt ngoài hợp âm** (non-chord tone) biến âm.',
            en: 'With several sharps, the one that comes last in the order of sharps is the leading tone. Accidentals that are soon canceled point to a tonicization or a chromatic non-chord tone.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn nhạc ở giọng {C} trưởng có {F#} và {C#} lặp lại. Giọng mới là giọng nào?',
        en: 'A passage in {C} major has recurring {F#} and {C#}. What is the new key?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'A4:q F#4:q D4:q F#4:q | E4:q G4:q C#5:q E5:q | D5:w ||' },
        { type: 'play', notes: 'A4:q F#4:q D4:q F#4:q E4:q G4:q C#5:q E5:q D5:w', bpm: 100 },
      ],
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: '{C#} đứng sau {F#} trong thứ tự dấu thăng, nên {C#} là cảm âm: giọng mới là {D} trưởng.',
        en: '{C#} comes after {F#} in the order of sharps, so {C#} is the leading tone: the new key is {D} major.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm át phụ làm trụ', en: 'A secondary chord as pivot' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đôi khi hợp âm trụ là **hợp âm trụ biến âm** (chromatic pivot chord): nó không thuận giọng ở ít nhất một giọng. Có khi nó là hợp âm át phụ ở cả hai giọng.',
            en: 'Sometimes the pivot is a **chromatic pivot chord**: it is not diatonic in at least one of the keys. It can even be a secondary chord in both keys.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây hợp âm E là V/vi ở giọng {C} trưởng và V/ii ở giọng {G} trưởng. Nó dẫn đến Am, rồi V7–I ở giọng {G}.',
            en: 'Here the E chord is V/vi in {C} major and V/ii in {G} major. It leads to Am, then to V7–I in {G}.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 E3+E4+G#4+B4 A2+E4+A4+C5 D3+F#4+A4+C5 G2+G4+B4+D5',
          labels: ['I', 'V/vi\nV/ii', 'vi\nii', 'V7', 'I'],
          highlight: [1],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:h E3+E4+G#4+B4:h A2+E4+A4+C5:h D3+F#4+A4+C5:h G2+G4+B4+D5:w' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm mượn làm trụ', en: 'A borrowed chord as pivot' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm trụ cũng có thể là **hợp âm mượn** (borrowed chord) ở một trong hai giọng. Fm là iv mượn ở giọng {C} trưởng, nhưng là ii thuận giọng ở giọng {Eb} trưởng.',
            en: 'The pivot can also be a **borrowed chord** in one of the keys. Fm is a borrowed iv in {C} major, but a diatonic ii in {Eb} major.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5 F2+F4+Ab4+C5 Bb2+F4+Ab4+D5 Eb3+Eb4+G4+Eb5', labels: ['I', 'iv\nii', 'V7', 'I'], highlight: [1] },
        { type: 'play', notes: 'C3+E4+G4+C5:h F2+F4+Ab4+C5:h Bb2+F4+Ab4+D5:h Eb3+Eb4+G4+Eb5:w', label: { vi: 'Nghe {C} sang {Eb}', en: 'Hear {C} to {Eb}' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'A♭ là ♭VI mượn ở giọng {C} trưởng. Ở giọng {Eb} trưởng, nó là bậc nào?', en: 'A♭ is a borrowed ♭VI in {C} major. What is it in {Eb} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV', en: 'IV' }, correct: true },
          { text: { vi: 'VI', en: 'VI' } },
          { text: { vi: 'ii', en: 'ii' } },
        ],
      },
      reason: {
        vi: 'Nốt gốc {Ab} là bậc 4 của gam {Eb} trưởng, và {Ab} {C} {Eb} là hợp âm trưởng: IV.',
        en: 'The root {Ab} is degree 4 of {Eb} major, and {Ab} {C} {Eb} is a major triad: IV.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm Napoli làm trụ', en: 'A Neapolitan pivot' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm Napoli** (Neapolitan) làm trụ có thể nối hai giọng xa. Ở giọng {D} thứ, hợp âm Napoli là {Eb} {G} {Bb}.',
            en: 'A **Neapolitan** pivot can bridge two foreign keys. In {D} minor the Neapolitan is {Eb} {G} {Bb}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Thêm {Db}, nó mang tính chất hợp âm bảy át và chính là V⁶₅ của giọng {Ab} thứ, cách {D} một quãng ba cung.',
            en: 'Add {Db} and it takes on dominant-seventh quality: it is V⁶₅ in {Ab} minor, a tritone away from {D}.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'D3+F4+A4+D5 G2+Bb4+Db5+Eb5 Ab2+Ab4+Cb5+Eb5', labels: ['i', 'N⁶₅\nV⁶₅', 'i'], highlight: [1] },
        { type: 'play', notes: 'D3+F4+A4+D5:h G2+Bb4+Db5+Eb5:h Ab2+Ab4+Cb5+Eb5:w' },
        {
          type: 'tip',
          text: {
            vi: '**Hợp âm sáu tăng** (augmented sixth) cũng làm trụ được, qua **chuyển giọng trùng âm** (enharmonic modulation), học sau.',
            en: '**Augmented sixth** chords can be pivots too, through **enharmonic modulation**, which comes later.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm Napoli làm trụ thường nối hai giọng như thế nào?', en: 'What kind of keys does a Neapolitan pivot often connect?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai giọng gần', en: 'Two closely related keys' } },
          { text: { vi: 'Hai giọng xa', en: 'Two foreign keys' }, correct: true },
          { text: { vi: 'Hai giọng cùng tên', en: 'Two parallel keys' } },
        ],
      },
      reason: {
        vi: 'Hợp âm Napoli không thuận giọng, nên nó dẫn được đến giọng xa như {Ab} thứ từ {D} thứ.',
        en: 'The Neapolitan is not diatonic, so it can lead to a foreign key, such as {Ab} minor from {D} minor.',
      },
    },
  ],
} satisfies Lesson
