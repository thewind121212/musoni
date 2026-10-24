import type { Lesson } from '@/theory/types'

/**
 * Book 17.1-17.2: tonicization, the secondary dominant and its slash label,
 * why V/V and not II, and why diminished chords are not tonicized. 17.1 is
 * only song excerpts; a phrase with and without V/V stands in for them.
 * No practice link: no drill asks secondary dominants.
 */
export default {
  id: 'tonicization',
  title: { vi: 'Ly điệu và hợp âm át phụ', en: 'Tonicization and secondary dominants' },
  minutes: 5,
  sources: [
    { section: '17.1', url: 'https://musictheory.pugetsound.edu/mt21c/ExamplesWithSecondaryDominants.html' },
    { section: '17.2', url: 'https://musictheory.pugetsound.edu/mt21c/Tonicization.html' },
  ],
  recap: [
    { vi: 'Ly điệu: đi tới một hợp âm khác I bằng át âm của nó', en: 'Tonicization: approaching a chord other than I with its own dominant' },
    { vi: 'Hợp âm át phụ là hợp âm trưởng hoặc hợp âm bảy át, ghi V/x hay V7/x', en: 'A secondary dominant is a major triad or dominant seventh, labeled V/x or V7/x' },
    { vi: 'Nốt biến âm thường là cảm âm của hợp âm được ly điệu', en: 'Its chromatic note is usually the leading tone of the tonicized chord' },
    { vi: 'Hợp âm giảm (vii°, ii° ở giọng thứ) không được ly điệu', en: 'Diminished chords (vii°, ii° in minor) are not tonicized' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Át âm của một hợp âm khác', en: 'A dominant for another chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong hòa âm thuận giọng, hợp âm V (át âm) giải quyết về hợp âm I (chủ âm). **Ly điệu** (tonicization) là làm cho một hợp âm khác I nghe như chủ âm, bằng cách đi tới nó từ át âm của chính nó.',
            en: 'In diatonic harmony, the V chord (the dominant) resolves to the I chord (the tonic). **Tonicization** means treating a chord other than I like a tonic by approaching it with its own dominant.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 D3+D4+F4+A4 G2+D4+G4+B4 C3+E4+G4+C5', labels: ['I', 'ii', 'V', 'I'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h D3+D4+F4+A4:h G2+D4+G4+B4:h C3+E4+G4+C5:w', label: { vi: 'Nghe I–ii–V–I', en: 'Hear I–ii–V–I' } },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 D3+D4+F#4+A4 G2+D4+G4+B4 C3+E4+G4+C5', labels: ['I', 'V/V', 'V', 'I'], highlight: [1] },
        { type: 'play', notes: 'C3+E4+G4+C5:h D3+D4+F#4+A4:h G2+D4+G4+B4:h C3+E4+G4+C5:w', label: { vi: 'Nghe I–V/V–V–I', en: 'Hear I–V/V–V–I' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm át phụ', en: 'The secondary dominant' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm át phụ** (secondary dominant) là một hợp âm trưởng hoặc hợp âm bảy át giải quyết về một hợp âm không phải I. Ta viết V/V hay V7/V và đọc là "V của V": bậc La Mã sau gạch chéo là hợp âm được ly điệu.',
            en: 'A **secondary dominant** is a major triad or dominant seventh chord that resolves to (tonicizes) a chord other than I. We write V/V or V7/V and say "V of V": the numeral after the slash is the chord being tonicized.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'D3+C4+F#4+A4 G2+B3+G4+D5', labels: ['V7/V', 'V'] },
        { type: 'play', notes: 'D3+C4+F#4+A4:h G2+B3+G4+D5:w', label: { vi: 'Nghe V7/V rồi V', en: 'Hear V7/V, then V' } },
        {
          type: 'tip',
          text: {
            vi: 'Đừng nhầm với V/3 ở chương 8: ở đó, thứ đứng sau gạch chéo là nốt bass, không phải một bậc La Mã.',
            en: 'Do not confuse this with V/3rd from chapter 8: there, what follows the slash is the bass note, not a Roman numeral.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, hợp âm thứ nhất đi tới V. Ghi bậc La Mã nào cho nó?', en: 'In {C} major, the first chord goes to V. Which Roman numeral does it get?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'C', notes: 'D3+D4+F#4+A4 G2+D4+G4+B4' },
        { type: 'play', notes: 'D3+D4+F#4+A4:h G2+D4+G4+B4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii', en: 'ii' } },
          { text: { vi: 'II', en: 'II' } },
          { text: { vi: 'V/V', en: 'V/V' }, correct: true },
        ],
      },
      reason: {
        vi: '{D}–{F#}–{A} là hợp âm trưởng đi tới V, nên tên đúng theo chức năng của nó là V/V.',
        en: '{D}–{F#}–{A} is a major triad that goes to V, so the label that shows its function is V/V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Vì sao không ghi II', en: 'Why not II' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ghi II cho thấy nốt gốc nhưng giấu chức năng: hợp âm này dẫn tới V. Ở giọng trưởng, ii là hợp âm thứ, nên II viết hoa là một hợp âm biến âm, và tên đúng của nó là V/V.',
            en: 'Writing II shows the root but hides the function: the chord leads to V. In a major key ii is minor, so an uppercase II is a chromatic chord, and its proper label is V/V.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt **biến âm** (chromatic) {F#} là cảm âm của {G}: nó đi lên nửa cung về nốt gốc của V. Nhờ nốt biến âm, hợp âm át phụ đẩy mạnh hơn về hợp âm sau.',
            en: 'The **chromatic** note {F#} is the leading tone of {G}: it rises a half step to the root of V. Through its chromatic note, a secondary dominant drives harder to the next chord.',
          },
        },
        { type: 'keys', notes: 'F#4 G4', labels: 'names', caption: { vi: '{F#} lên {G}:', en: '{F#} up to {G}:' } },
        { type: 'play', notes: 'F#4 G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, V/V có nốt gốc {G} và nốt năm {D}. Nốt ba của nó là nốt nào?', en: 'In {F} major, V/V has root {G} and fifth {D}. What is its third?' },
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'V/V là hợp âm {G} trưởng, {G}–{B}–{D}: {Bb} của giọng được nâng lên thành {Bn}, cảm âm của {C}.',
        en: 'V/V is the {G} major triad, {G}–{B}–{D}: the key\'s {Bb} is raised to {Bn}, the leading tone of {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Không ly điệu hợp âm giảm', en: 'Diminished chords are not tonicized' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm giảm như vii°, hay ii° ở giọng thứ, không được ly điệu. Hợp âm giảm không bền, nên không thể nghe như một chủ âm. Hãy nghe thử V/vii° ở giọng {C} trưởng.',
            en: 'Diminished chords such as vii°, or ii° in minor, are not tonicized. A diminished chord is unstable, so it cannot sound like a tonic. Listen to a V/vii° in {C} major.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'F#3+C#4+F#4+A#4 B2+D4+F4+B4', labels: ['V/vii°', 'vii°'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h F#3+C#4+F#4+A#4:h B2+D4+F4+B4:w', label: { vi: 'Nghe I–V/vii°–vii°', en: 'Hear I–V/vii°–vii°' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, hợp âm nào không thể được ly điệu?', en: 'In {C} major, which chord cannot be tonicized?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi', en: 'vi' } },
          { text: { vi: 'vii°', en: 'vii°' }, correct: true },
          { text: { vi: 'IV', en: 'IV' } },
        ],
      },
      reason: {
        vi: 'vii° ({B}–{D}–{F}) là hợp âm giảm, không bền, nên không thể làm chủ âm tạm thời.',
        en: 'vii° ({B}–{D}–{F}) is diminished and unstable, so it cannot act as a passing tonic.',
      },
    },
  ],
} satisfies Lesson
