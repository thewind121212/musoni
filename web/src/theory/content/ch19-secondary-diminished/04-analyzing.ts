import type { Lesson } from '@/theory/types'

/** Book 18.3: analysing a chromatic chord: stack it in thirds for root and quality, then look a minor 2nd above the root. */
export default {
  id: 'analyzing',
  title: { vi: 'Phân tích hợp âm giảm phụ', en: 'Analyzing secondary diminished chords' },
  minutes: 4,
  sources: [{ section: '18.3', url: 'https://musictheory.pugetsound.edu/mt21c/AnalyzingSecondaryDiminishedChords.html' }],
  recap: [
    { vi: 'Bước 1: xếp quãng 3 để tìm nốt gốc và tính chất', en: 'Step 1: stack in thirds to find the root and quality' },
    { vi: 'Chỉ °, ø7 hoặc °7 mới có thể là hợp âm giảm phụ', en: 'Only °, ø7 or °7 can be a secondary diminished chord' },
    { vi: 'Bước 2: nốt cao hơn nốt gốc quãng 2 thứ là nốt gốc của hợp âm đích', en: 'Step 2: the note a minor 2nd above the root is the root of the target chord' },
    { vi: 'Thế đảo ghi bằng số, như viiø65/V', en: 'Inversions take figures, as in viiø65/V' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bước 1: nốt gốc và tính chất', en: 'Step 1: root and quality' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Gặp một hợp âm có nốt ngoài giọng, trước hết hãy xếp nó thành các quãng 3 để tìm nốt gốc và tính chất. Nếu nó không phải hợp âm ba giảm, bảy nửa giảm hay bảy giảm, nó không phải hợp âm giảm phụ.',
            en: 'When a chord has a note from outside the key, first stack it in thirds to find its root and quality. If it is not a diminished triad, a half-diminished seventh or a fully-diminished seventh, it is not a secondary diminished chord.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', notes: 'E4+G4+B4+C#5 C#4+E4+G4+B4', labels: [{ vi: 'Viết', en: 'As is' }, { vi: 'Xếp', en: 'Stack' }] },
        { type: 'play', notes: 'E4+G4+B4+C#5 C#4+E4+G4+B4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Xếp hợp âm này thành các quãng 3. Nốt gốc là nốt nào?', en: 'Stack this chord in thirds. Which note is the root?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'G', notes: 'E4+G4+B4+C#5' }],
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'Xếp lại thành {C#} {E} {G} {B}: nốt gốc là {C#}, và đây là hợp âm bảy nửa giảm C♯ø7.',
        en: 'Restacked it is {C#} {E} {G} {B}: the root is {C#}, and this is the half-diminished seventh C♯ø7.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bước 2: nhìn lên quãng 2 thứ', en: 'Step 2: look a minor 2nd up' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tìm nốt cao hơn nốt gốc một quãng 2 thứ. Nếu đó là nốt gốc của một hợp âm thuận giọng, ta có hợp âm giảm phụ của hợp âm ấy.',
            en: 'Find the note a minor 2nd above the root. If it is the root of a diatonic chord, the chord is a secondary diminished chord of that chord.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trên {C#} là {D}, bậc V của giọng {G} trưởng: hợp âm là viiø7/V. Nốt ba {E} ở bass, nên ghi viiø65/V.',
            en: 'Above {C#} is {D}, the V of {G} major: the chord is viiø7/V. Its third, {E}, is in the bass, so it is written viiø65/V.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', notes: 'E4+G4+B4+C#5 D4+F#4+A4+D5', labels: ['viiø65\n/V', 'V'] },
        { type: 'play', notes: 'E4+G4+B4+C#5 D4+F#4+A4+D5', label: { vi: 'Nghe viiø65/V rồi V', en: 'Hear viiø65/V, then V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, what is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D#4+F#4+A4+C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vii°7/ii', en: 'vii°7/ii' } },
          { text: { vi: 'vii°7/iii', en: 'vii°7/iii' }, correct: true },
          { text: { vi: 'viiø7/iii', en: 'viiø7/iii' } },
        ],
      },
      reason: {
        vi: '{D#} {F#} {A} {C} là hợp âm bảy giảm, và quãng 2 thứ trên {D#} là {E}, nốt gốc của iii.',
        en: '{D#} {F#} {A} {C} is a fully-diminished seventh, and a minor 2nd above {D#} is {E}, the root of iii.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, hợp âm này là gì?', en: 'In {F} major, what is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'F', notes: 'Bn4+D5+F5+Ab5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vii°7/V', en: 'vii°7/V' }, correct: true },
          { text: { vi: 'viiø7/V', en: 'viiø7/V' } },
          { text: { vi: 'vii°7/IV', en: 'vii°7/IV' } },
        ],
      },
      reason: {
        vi: '{Bn} {D} {F} {Ab} là hợp âm bảy giảm; trên {Bn} một quãng 2 thứ là {C}, nốt gốc của V trong giọng {F} trưởng.',
        en: '{Bn} {D} {F} {Ab} is a fully-diminished seventh; a minor 2nd above {Bn} is {C}, the root of V in {F} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, {D} {F#} {A} {C} có phải hợp âm giảm phụ không?', en: 'In {C} major, is {D} {F#} {A} {C} a secondary diminished chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+F#4+A4+C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có, vii°7/V', en: 'Yes, vii°7/V' } },
          { text: { vi: 'Không, nó là hợp âm bảy át (V7/V)', en: 'No, it is a dominant seventh (V7/V)' }, correct: true },
        ],
      },
      reason: {
        vi: '{D} {F#} {A} là hợp âm ba trưởng, không phải giảm, nên bước 1 đã loại nó: đây là hợp âm át phụ V7/V.',
        en: '{D} {F#} {A} is major, not diminished, so step 1 rules it out: this is the secondary dominant V7/V.',
      },
    },
  ],
} satisfies Lesson
