import type { Lesson } from '@/theory/types'

/** Book 20.1: the Neapolitan is ♭II, labelled N, most often in first inversion (N6), with pre-dominant function. */
export default {
  id: 'neapolitan-chord',
  title: { vi: 'Hợp âm Napoli là gì', en: 'What the Neapolitan is' },
  minutes: 4,
  sources: [{ section: '20.1', url: 'https://musictheory.pugetsound.edu/mt21c/NeapolitanIntroduction.html' }],
  recap: [
    { vi: 'Hợp âm Napoli là ♭II: hợp âm ba trưởng trên bậc 2 hạ', en: 'The Neapolitan is ♭II: a major triad on the lowered second degree' },
    { vi: 'Nó được ghi là N, hay gặp nhất ở thế đảo 1: N6', en: 'It is labelled N, and is most common in first inversion: N6' },
    { vi: 'Bass của N6 là bậc 4 của giọng', en: 'The bass of N6 is scale degree 4' },
    { vi: 'Nó là ii biến âm, nên có chức năng tiền át', en: 'It is an altered ii, so it has pre-dominant function' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm trên bậc 2 hạ', en: 'A chord on the lowered second' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng thứ, hạ bậc 2 xuống nửa cung rồi dựng trên đó một hợp âm ba trưởng: đó là **hợp âm Napoli** (Neapolitan chord), viết ♭II. Ở giọng {C} thứ, ii° là {D}–{F}–{Ab}, còn ♭II là {Db}–{F}–{Ab}.',
            en: 'In a minor key, lower scale degree 2 by a half step and build a major triad on it: that is the **Neapolitan chord**, written ♭II. In {C} minor, ii° is {D}–{F}–{Ab}, and ♭II is {Db}–{F}–{Ab}.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'D4+F4+Ab4 Db4+F4+Ab4', labels: ['ii°', '♭II'], highlight: [1] },
        { type: 'play', notes: 'D4+F4+Ab4 Db4+F4+Ab4', label: { vi: 'Nghe ii° rồi ♭II', en: 'Hear ii° then ♭II' } },
        { type: 'keys', notes: 'Db4 F4 Ab4', from: 'C4', labels: 'names', caption: { vi: '♭II ở giọng {C} thứ:', en: '♭II in {C} minor:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, nốt gốc của hợp âm Napoli là nốt nào?', en: 'In {A} minor, what is the root of the Neapolitan chord?' },
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Bậc 2 của giọng {A} thứ là {B}; hạ nửa cung thành {Bb}, nên hợp âm là {Bb}–{D}–{F}.',
        en: 'Scale degree 2 of {A} minor is {B}; lowered a half step it is {Bb}, so the chord is {Bb}–{D}–{F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'N và N6', en: 'N and N6' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong nhạc cổ điển, ♭II được ghi là N. Hợp âm Napoli hay gặp nhất ở thế đảo 1, ghi là N6: nốt ba {F} nằm ở bass, và {F} là bậc 4 của giọng {C} thứ.',
            en: 'In classical music, ♭II is labelled N. The Neapolitan is most common in first inversion, labelled N6: its third, {F}, is in the bass, and {F} is scale degree 4 of {C} minor.',
          },
        },
        { type: 'staff', clef: 'bass', key: 'Cm', notes: 'Db3+F3+Ab3 F3+Ab3+Db4', labels: ['N', 'N6'], highlight: [1] },
        { type: 'play', notes: 'Db3+F3+Ab3 F3+Ab3+Db4', label: { vi: 'Nghe N rồi N6', en: 'Hear N then N6' } },
        {
          type: 'tip',
          text: {
            vi: 'Ký hiệu hợp âm của N6 ở giọng {C} thứ là D♭/F: hợp âm {Db} trưởng với {F} ở bass.',
            en: 'The lead-sheet symbol for N6 in {C} minor is D♭/F: a {Db} major triad with {F} in the bass.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {E} thứ, nốt bass của N6 là nốt nào?', en: 'In {E} minor, what is the bass note of N6?' },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'N ở giọng {E} thứ là {F}–{A}–{C}; ở thế đảo 1, nốt ba {A} nằm ở bass, đúng bậc 4 của giọng.',
        en: 'N in {E} minor is {F}–{A}–{C}; in first inversion its third, {A}, is in the bass, scale degree 4 of the key.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chức năng tiền át', en: 'Pre-dominant function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm Napoli là hợp âm ii đã **biến âm** (chromatically altered): nốt gốc được hạ nửa cung. Vì vậy nó giữ **chức năng tiền át** (pre-dominant function) của ii và thường đi đến V.',
            en: 'The Neapolitan is a **chromatically altered** ii chord: its root is lowered a half step. So it keeps the **pre-dominant function** of ii and usually goes to V.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'Cm',
          time: '4/4',
          notes: 'C3+Eb4+G4+C5:h F2+F4+Ab4+Db5:h | G2+D4+G4+B4:h C3+Eb4+G4+C5:h ||',
          labels: ['i', 'N6', 'V', 'i'],
        },
        { type: 'play', notes: 'C3+Eb4+G4+C5:h F2+F4+Ab4+Db5:h G2+D4+G4+B4:h C3+Eb4+G4+C5:w', label: { vi: 'Nghe i–N6–V–i', en: 'Hear i–N6–V–i' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm Napoli có chức năng gì?', en: 'What function does the Neapolitan chord have?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ', en: 'Tonic' } },
          { text: { vi: 'Tiền át', en: 'Pre-dominant' }, correct: true },
          { text: { vi: 'Át', en: 'Dominant' } },
        ],
      },
      reason: {
        vi: 'Nó là ii được biến âm, nên giữ chức năng tiền át của ii và đi đến V.',
        en: 'It is an altered ii, so it keeps the pre-dominant function of ii and goes to V.',
      },
    },
  ],
} satisfies Lesson
