import type { Lesson } from '@/theory/types'

/**
 * Book 21.6: telling the chromatic harmonies apart; 21.8: the chromatic
 * pre-dominants; 21.7: the descending chromatic bass line, harmonized in our
 * own voicing (the book's examples are pop songs and long scores).
 * No practice link: no drill asks chromatic chords.
 */
export default {
  id: 'chromatic-context',
  title: { vi: 'Giữa các hợp âm biến âm', en: 'Among the chromatic harmonies' },
  minutes: 5,
  sources: [
    { section: '21.6', url: 'https://musictheory.pugetsound.edu/mt21c/DistinguishingBetweenChromaticHarmonies.html' },
    { section: '21.8', url: 'https://musictheory.pugetsound.edu/mt21c/ChromaticPreDominantChords.html' },
    { section: '21.7', url: 'https://musictheory.pugetsound.edu/mt21c/DescendingChromaticBassLines.html' },
  ],
  recap: [
    { vi: 'Át phụ, giảm phụ, mượn, Napoli, sáu tăng: mỗi loại có dấu hiệu riêng', en: 'Secondary dominant, secondary diminished, borrowed, Neapolitan, augmented sixth: each has its sign' },
    { vi: 'Quãng 3 giảm là dấu hiệu của hợp âm sáu tăng', en: 'A diminished third marks an augmented sixth chord' },
    { vi: 'Tiền át biến âm: iv, iiø7, V/V, vii°/V, N6 và hợp âm sáu tăng', en: 'Chromatic pre-dominants: iv, iiø7, V/V, vii°/V, N6 and the augmented sixths' },
    { vi: 'Bass 1–7–♭7–6–♭6–5: hợp âm sáu tăng đứng trên ♭6', en: 'Bass 1–7–♭7–6–♭6–5: the augmented sixth sits on ♭6' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Phân biệt hợp âm biến âm', en: 'Telling chromatic chords apart' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi loại **hòa âm biến âm** (chromatic harmony) có một dấu hiệu riêng. Hợp âm trưởng hay bảy át ngoài giọng là **hợp âm át phụ** (secondary dominant), V/. Hợp âm giảm, ø7 hay °7 ngoài giọng là **hợp âm giảm phụ** (secondary diminished chord), vii°/.',
            en: 'Each kind of **chromatic harmony** has its own sign. A major triad or Mm7 outside the key is a **secondary dominant**, V/. A diminished triad, ø7 or °7 outside the key is a **secondary diminished chord**, vii°/.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Có nốt bị hạ, như {Ab} hay {Eb} trong giọng {C} trưởng, là **hợp âm mượn** (borrowed chord) do **pha trộn điệu thức** (mode mixture). Hợp âm trưởng trên bậc ♭2 là **hợp âm Napoli** (Neapolitan), N. Có quãng 3 giảm là hợp âm sáu tăng.',
            en: 'Lowered notes, such as {Ab} or {Eb} in {C} major, mean a **borrowed chord** from **mode mixture**. A major triad on ♭2 is the **Neapolitan**, N. A diminished third means an augmented sixth.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+F#4+A4+C5 F4+Ab4+C5 F4+Ab4+Db5 F#4+Ab4+C5+Eb5', labels: ['V7/V', 'iv', 'N6', 'Ger+6'] },
        { type: 'play', notes: 'D4+F#4+A4+C5:h F4+Ab4+C5:h F4+Ab4+Db5:h F#4+Ab4+C5+Eb5:h', label: { vi: 'Nghe bốn loại', en: 'Hear the four' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này thuộc loại nào?', en: 'In {C} major, what kind of chord is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4+F#4+A4+C5' },
        { type: 'play', notes: 'D4+F#4+A4+C5:h D4+G4+B4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm át phụ', en: 'Secondary dominant' }, correct: true },
          { text: { vi: 'Hợp âm mượn', en: 'Borrowed chord' } },
          { text: { vi: 'Hợp âm Napoli', en: 'Neapolitan' } },
          { text: { vi: 'Hợp âm sáu tăng', en: 'Augmented sixth' } },
        ],
      },
      reason: {
        vi: '{D} {F#} {A} {C} là hợp âm bảy át ngoài giọng, không có nốt hạ, không có quãng 3 giảm: V7/V.',
        en: '{D} {F#} {A} {C} is a dominant seventh outside the key, with no lowered note and no diminished third: V7/V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiền át biến âm', en: 'Chromatic pre-dominants' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bên cạnh IV và ii, nhóm tiền át giờ có thêm các **hợp âm tiền át biến âm** (chromatic pre-dominant chords): iv và iiø7 mượn từ giọng thứ, V/V và vii°/V, N6, và ba hợp âm sáu tăng. Tất cả đều dẫn đến V.',
            en: 'Beside IV and ii, the pre-dominant group now holds the **chromatic pre-dominant chords**: iv and iiø7 borrowed from minor, V/V and vii°/V, N6, and the three augmented sixths. All of them lead to V.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'F2+F4+Ab4+C5 G2+D4+G4+B4 || F2+F4+Ab4+Db5 G2+D4+G4+B4 || Ab2+C4+F#4+C5 G2+D4+G4+B4',
          labels: ['iv', 'V', 'N6', 'V', 'It+6', 'V'],
        },
        { type: 'play', notes: 'F2+F4+Ab4+C5:h G2+D4+G4+B4:h F2+F4+Ab4+Db5:h G2+D4+G4+B4:h Ab2+C4+F#4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe ba hợp âm tiền át', en: 'Hear three pre-dominants' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào là hợp âm át, không phải tiền át?', en: 'Which chord is a dominant, not a pre-dominant?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'N6', en: 'N6' } },
          { text: { vi: 'Ger+6', en: 'Ger+6' } },
          { text: { vi: 'V7', en: 'V7' }, correct: true },
          { text: { vi: 'iiø7', en: 'iiø7' } },
        ],
      },
      reason: {
        vi: 'V7 là hợp âm át; N6, Ger+6 và iiø7 là tiền át, chúng dẫn đến V.',
        en: 'V7 is a dominant; N6, Ger+6 and iiø7 are pre-dominants that lead to V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bass đi xuống từng nửa cung', en: 'The descending chromatic bass' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một mẫu rất hay gặp là **đường bass nửa cung đi xuống** (descending chromatic bass line): bậc 1–7–♭7–6–♭6–5 trong giọng thứ. Bậc 7 và bậc 6 xuất hiện cả dạng nâng lẫn dạng tự nhiên.',
            en: 'A common pattern is the **descending chromatic bass line**: 1–7–♭7–6–♭6–5 in minor. Degrees 7 and 6 appear both raised and natural.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'C3 B2 Bb2 A2 Ab2 G2', labels: ['1', '7', '♭7', '6', '♭6', '5'] },
        { type: 'play', notes: 'C3 B2 Bb2 A2 Ab2 G2', label: { vi: 'Nghe đường bass', en: 'Hear the bass line' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hòa âm cho đường bass', en: 'Harmonizing the line' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bốn thế kỷ qua, nhạc sĩ phối hòa âm cho đường bass này bằng đủ loại hợp âm: át phụ, mượn, sáu tăng. Bậc ♭6 rồi bậc 5 ở bass chính là chỗ của hợp âm sáu tăng đi đến V.',
            en: 'For four centuries composers have harmonized this line with every kind of chord: secondary, borrowed, augmented sixth. ♭6 then 5 in the bass is just where an augmented sixth goes to V.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+Eb4+G4+C5 B2+D4+G4+D5 Bb2+Eb4+G4+C5 A2+F4+A4+C5 Ab2+F#4+C5+D5 G2+G4+B4+D5',
          labels: ['i', 'V\n6', 'i\n4\n2', 'IV\n6', 'Fr+6', 'V'],
          highlight: [4],
        },
        { type: 'play', notes: 'C3+Eb4+G4+C5:h B2+D4+G4+D5:h Bb2+Eb4+G4+C5:h A2+F4+A4+C5:h Ab2+F#4+C5+D5:h G2+G4+B4+D5:w' },
        {
          type: 'tip',
          text: {
            vi: 'Purcell (Dido’s Lament, 1688) và Bach (Crucifixus, 1733) đều dựng nhạc trên đường bass này.',
            en: 'Purcell (Dido’s Lament, 1688) and Bach (Crucifixus, 1733) both build music on this line.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trong giọng {A} thứ, bass đi {A}, {G#}, {G}, {F#}. Nốt tiếp theo, nơi đặt hợp âm sáu tăng, là nốt nào?',
        en: 'In {A} minor the bass goes {A}, {G#}, {G}, {F#}. Which note comes next, where the augmented sixth sits?',
      },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Sau bậc 6 {F#} là bậc ♭6 {F}, rồi bậc 5 {E}; hợp âm sáu tăng đứng trên {F}.',
        en: 'After 6, {F#}, comes ♭6, {F}, then 5, {E}; the augmented sixth sits on {F}.',
      },
    },
  ],
} satisfies Lesson
