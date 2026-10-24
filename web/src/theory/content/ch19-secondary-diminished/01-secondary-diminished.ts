import type { Lesson } from '@/theory/types'

/** Book 18.1: vii° has dominant function, so vii°, viiø7 and vii°7 tonicize other chords; the chromatic note is part of the chord. */
export default {
  id: 'secondary-diminished',
  title: { vi: 'Hợp âm giảm phụ là gì', en: 'What a secondary diminished chord is' },
  minutes: 4,
  sources: [{ section: '18.1', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDiminishedChordSection.html' }],
  recap: [
    { vi: 'vii° có chức năng át, nên nó chủ âm hóa được hợp âm khác', en: 'vii° has dominant function, so it can tonicize other chords' },
    { vi: 'vii°/x, viiø7/x, vii°7/x: hợp âm cảm âm của hợp âm x', en: 'vii°/x, viiø7/x, vii°7/x: the leading-tone chord of chord x' },
    { vi: 'Nốt gốc nằm nửa cung dưới nốt gốc của x', en: 'Its root is a half step below the root of x' },
    { vi: 'Dấu hóa là một phần của chính hợp âm', en: 'The accidental belongs to the chord itself' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Cảm âm của một hợp âm khác', en: 'The leading tone of another chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm vii° có chức năng át, như V: nó muốn giải về chủ. Vì vậy, giống **hợp âm át phụ** (secondary dominant), nó cũng **chủ âm hóa** (tonicization) được một hợp âm khác ngoài I.',
            en: 'The vii° chord has dominant function, like V: it wants to resolve to the tonic. So, like a **secondary dominant**, it can also bring about **tonicization** of a chord other than I.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đó là **hợp âm giảm phụ** (secondary diminished chord). Trong giọng {C} trưởng, vii°7/V là {F#} {A} {C} {Eb}: hợp âm cảm âm của V, giải về {G} {B} {D}.',
            en: 'That is a **secondary diminished chord**. In {C} major, vii°7/V is {F#} {A} {C} {Eb}: the leading-tone chord of V, resolving to {G} {B} {D}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#4+A4+C5+Eb5 G4+B4+D5', labels: ['vii°7\n/V', 'V'] },
        { type: 'play', notes: 'F#4+A4+C5+Eb5 G4+B4+D5', label: { vi: 'Nghe vii°7/V rồi V', en: 'Hear vii°7/V, then V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt gốc {F#} của vii°7/V cách nốt gốc {G} của V bao xa?', en: 'How far is the root {F#} of vii°7/V from the root {G} of V?' },
      blocks: [{ type: 'keys', notes: 'F#4 G4', labels: 'names' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nửa cung dưới', en: 'A half step below' }, correct: true },
          { text: { vi: 'Nguyên cung dưới', en: 'A whole step below' } },
          { text: { vi: 'Quãng 5 trên', en: 'A 5th above' } },
        ],
      },
      reason: {
        vi: '{F#} là cảm âm của {G}: nó nằm nửa cung (quãng 2 thứ) dưới {G}.',
        en: '{F#} is the leading tone of {G}: it sits a half step (a minor 2nd) below {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ba loại hợp âm giảm phụ', en: 'Three kinds' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm giảm phụ có ba loại: hợp âm ba giảm (vii°/x), hợp âm bảy nửa giảm (viiø7/x) và hợp âm bảy giảm (vii°7/x). Chữ sau dấu gạch chéo là hợp âm được chủ âm hóa.',
            en: 'Secondary diminished chords come in three kinds: a diminished triad (vii°/x), a half-diminished seventh (viiø7/x) and a fully-diminished seventh (vii°7/x). The numeral after the slash is the chord being tonicized.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#4+A4+C5 F#4+A4+C5+E5 F#4+A4+C5+Eb5 G4+B4+D5', labels: ['vii°\n/V', 'viiø7\n/V', 'vii°7\n/V', 'V'] },
        { type: 'play', notes: 'F#4+A4+C5 G4+B4+D5 F#4+A4+C5+E5 G4+B4+D5 F#4+A4+C5+Eb5 G4+B4+D5', label: { vi: 'Nghe cả ba, mỗi hợp âm giải về V', en: 'Hear all three, each resolving to V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, what is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F#4+A4+C5+E5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vii°/V', en: 'vii°/V' } },
          { text: { vi: 'viiø7/V', en: 'viiø7/V' }, correct: true },
          { text: { vi: 'vii°7/V', en: 'vii°7/V' } },
        ],
      },
      reason: {
        vi: '{F#} {A} {C} là hợp âm ba giảm, {F#} lên {E} là quãng 7 thứ, nên đây là bảy nửa giảm trên cảm âm của {G}.',
        en: '{F#} {A} {C} is diminished and {F#} up to {E} is a minor 7th, so this is a half-diminished seventh on the leading tone of {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dấu hóa thuộc về hợp âm', en: 'The accidental belongs to the chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm giảm phụ luôn có nốt ngoài giọng, và nốt đó là thành phần của hợp âm, không phải nốt lướt qua. Ở đây bass đi lên từng nửa cung: mỗi hợp âm vii°7 dẫn vào hợp âm ngay sau nó.',
            en: 'A secondary diminished chord always has a note from outside the key, and that note is a member of the chord, not a passing note. Here the bass climbs by half steps: each vii°7 leads into the chord right after it.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 C#3+E4+G4+Bb4 D3+D4+F4+A4 D#3+C4+F#4+A4 E3+E4+G4+B4',
          labels: ['I', 'vii°7\n/ii', 'ii', 'vii°7\n/iii', 'iii'],
          highlight: [1, 3],
        },
        { type: 'play', notes: 'C3+E4+G4+C5 C#3+E4+G4+Bb4 D3+D4+F4+A4 D#3+C4+F#4+A4 E3+E4+G4+B4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm vii°7/ii trong giọng {C} trưởng giải về hợp âm nào?', en: 'In {C} major, which chord does vii°7/ii resolve to?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii: {D} {F} {A}', en: 'ii: {D} {F} {A}' }, correct: true },
          { text: { vi: 'V: {G} {B} {D}', en: 'V: {G} {B} {D}' } },
          { text: { vi: 'I: {C} {E} {G}', en: 'I: {C} {E} {G}' } },
        ],
      },
      reason: {
        vi: 'Chữ sau dấu gạch chéo là hợp âm được chủ âm hóa: vii°7/ii dẫn về ii.',
        en: 'The numeral after the slash is the chord being tonicized: vii°7/ii leads to ii.',
      },
    },
  ],
} satisfies Lesson
