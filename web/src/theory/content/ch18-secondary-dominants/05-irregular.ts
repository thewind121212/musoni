import type { Lesson } from '@/theory/types'

/**
 * Book 17.6: irregular resolutions: V/V to IV and to ♭VII, V42/IV to V7/ii,
 * V7/vi to IV and its two readings. The book's song excerpts are replaced by
 * our own progressions in C and A major. No practice link: no drill fits.
 */
export default {
  id: 'irregular',
  title: { vi: 'Giải quyết bất thường', en: 'Irregular resolutions' },
  minutes: 5,
  sources: [{ section: '17.6', url: 'https://musictheory.pugetsound.edu/mt21c/IrregularResoltionsOfSecondaryDominants.html' }],
  recap: [
    { vi: 'Át phụ không phải lúc nào cũng đi tới hợp âm nó ly điệu', en: 'A secondary chord does not always resolve to the chord it tonicizes' },
    { vi: 'V/V tới IV hay ♭VII: cả hai đứng thay cho V', en: 'V/V to IV or ♭VII: both stand in for V' },
    { vi: 'V42/IV có thể đi tới V7/ii thay cho IV', en: 'V42/IV can go to V7/ii instead of IV' },
    { vi: 'V7/vi tới IV: iii–IV có biến âm, hoặc đánh lừa trong vùng vi', en: 'V7/vi to IV: a chromatic iii–IV, or deceptive within vi' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'V/V đi tới IV', en: 'V/V to IV' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt gốc của hợp âm át phụ không phải lúc nào cũng đi xuống một quãng 5 đúng: đó là **giải quyết bất thường** (irregular resolution). Trong nhạc pop, V/V hay đi tới IV, vì IV đôi khi đứng thay cho V.',
            en: 'The root of a secondary dominant does not always fall a perfect 5th: that is an **irregular resolution**. In popular music V/V often goes to IV, which sometimes stands in for V.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 D3+D4+F#4+A4 F2+C4+F4+A4 C3+C4+E4+G4', labels: ['I', 'V/V', 'IV', 'I'], highlight: [2] },
        { type: 'play', notes: 'C3+E4+G4+C5:h D3+D4+F#4+A4:h F2+C4+F4+A4:h C3+C4+E4+G4:w', label: { vi: 'Nghe I–V/V–IV–I', en: 'Hear I–V/V–IV–I' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'V/V đi tới ♭VII', en: 'V/V to ♭VII' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'V/V cũng có thể đi tới ♭VII, hợp âm bậc VII hạ. Trong nhạc pop ở giọng trưởng, ♭VII cũng hay đứng thay cho V.',
            en: 'V/V can also go to ♭VII, the subtonic triad. In major-key popular music, ♭VII can stand in for V as well.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'A', notes: 'A2+C#4+E4+A4 B2+D#4+F#4+B4 G2+D4+G4+B4 A2+C#4+E4+A4', labels: ['I', 'V/V', '♭VII', 'I'], highlight: [2] },
        { type: 'play', notes: 'A2+C#4+E4+A4:h B2+D#4+F#4+B4:h G2+D4+G4+B4:h A2+C#4+E4+A4:w', label: { vi: 'Nghe ở giọng {A} trưởng', en: 'Hear it in {A} major' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, D7 ở đây làm gì?', en: 'In {C} major, what does the D7 do here?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 D3+C4+F#4+A4 F2+C4+F4+A4 C3+C4+E4+G4' },
        { type: 'play', notes: 'C3+E4+G4+C5:h D3+C4+F#4+A4:h F2+C4+F4+A4:h C3+C4+E4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đi tới V như thường lệ', en: 'It goes to V as usual' } },
          { text: { vi: 'Đi tới IV, đứng thay cho V', en: 'It goes to IV, standing in for V' }, correct: true },
          { text: { vi: 'Đi tới vi', en: 'It goes to vi' } },
        ],
      },
      reason: {
        vi: 'Sau D7 là {F}–{A}–{C}, hợp âm IV: một giải quyết bất thường, IV đứng ở chỗ của V.',
        en: 'After D7 comes {F}–{A}–{C}, the IV chord: an irregular resolution, with IV in the place of V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Một chuỗi át phụ', en: 'A chain of secondary dominants' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} trưởng, C7/B♭ (V42/IV) có thể đi tới A7 (V7/ii) rồi về ii. Nốt {Bb} đi xuống nửa cung về {A} như dự đoán, nhưng {A} không làm nốt ba của IV mà làm nốt gốc của A7.',
            en: 'In {C} major, C7/B♭ (V42/IV) can go to A7 (V7/ii), then on to ii. The {Bb} falls a half step to {A} as expected, but that {A} is not the third of IV: it is the root of A7.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 Bb2+E4+G4+C5 A2+E4+G4+C#5 D3+D4+F4+D5', labels: ['I', 'V42/IV', 'V7/ii', 'ii'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h Bb2+E4+G4+C5:h A2+E4+G4+C#5:h D3+D4+F4+D5:w', label: { vi: 'Nghe chuỗi', en: 'Hear the chain' } },
        {
          type: 'tip',
          text: {
            vi: 'Số 42 cho biết nốt bảy của hợp âm nằm ở bass.',
            en: 'The 42 means the chord\'s seventh is in the bass.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong chuỗi đó, {Bb} đi xuống {A}. {A} là nốt gì của hợp âm mới?', en: 'In that chain, {Bb} falls to {A}. What is {A} in the new chord?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt ba của F', en: 'The third of F' } },
          { text: { vi: 'Nốt năm của Dm', en: 'The fifth of Dm' } },
          { text: { vi: 'Nốt gốc của A7', en: 'The root of A7' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hợp âm mới là A7 chứ không phải IV, nên {A} là nốt gốc của nó.',
        en: 'The new chord is A7, not IV, so {A} is its root.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'V7/vi đi tới IV', en: 'V7/vi to IV' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một giải quyết bất thường rất hay gặp là V7/vi đi tới IV, như E7 tới F ở giọng {C} trưởng. Beethoven cũng dùng nó trong sonata piano Waldstein.',
            en: 'A common irregular resolution is V7/vi to IV, such as E7 to F in {C} major. Beethoven uses it too, in his Waldstein piano sonata.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Có hai cách hiểu. iii–IV vốn thường gặp, nên E–F là iii–IV có biến âm; hoặc đó là V/vi đi tới VI/vi, một **giải quyết đánh lừa** (deceptive resolution) trong vùng của vi.',
            en: 'There are two ways to hear it. iii–IV is common, so E–F is a chromatic iii–IV; or it is V/vi going to VI/vi, a **deceptive resolution** within the area of vi.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 E3+D4+G#4+B4 F3+C4+A4+C5 G2+D4+G4+B4 C3+E4+G4+C5', labels: ['I', 'V7/vi', 'IV', 'V', 'I'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h E3+D4+G#4+B4:h F3+C4+A4+C5:h G2+D4+G4+B4:h C3+E4+G4+C5:w', label: { vi: 'Nghe I–V7/vi–IV–V–I', en: 'Hear I–V7/vi–IV–V–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nếu E7 là V7/vi, thì F là hợp âm gì trong giọng {A} thứ?', en: 'If E7 is V7/vi, which chord is F in {A} minor?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV', en: 'IV' } },
          { text: { vi: 'VI', en: 'VI' }, correct: true },
          { text: { vi: 'III', en: 'III' } },
        ],
      },
      reason: {
        vi: '{F} là bậc 6 của giọng {A} thứ, nên E7 tới F là V7–VI ở giọng {A} thứ: một giải quyết đánh lừa.',
        en: '{F} is degree 6 of {A} minor, so E7 to F is V7–VI in {A} minor: a deceptive resolution.',
      },
    },
  ],
} satisfies Lesson
