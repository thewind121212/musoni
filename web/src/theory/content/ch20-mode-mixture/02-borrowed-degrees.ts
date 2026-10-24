import type { Lesson } from '@/theory/types'

/**
 * Book 19.2: ♭6 as root, third, fifth and seventh of a borrowed chord; ♭3 and
 * ♭7 as root, third and fifth; the point that a minor-mode degree changes the
 * quality of the diatonic chord. Figures are images: standard theory, in C major.
 */
export default {
  id: 'borrowed-degrees',
  title: { vi: 'Hòa âm cho bậc mượn', en: 'Harmonizing borrowed degrees' },
  minutes: 4,
  sources: [{ section: '19.2', url: 'https://musictheory.pugetsound.edu/mt21c/HarmonizationOfBorrowedScaleDegrees.html' }],
  recap: [
    { vi: '♭6 là nốt gốc của ♭VI, nốt ba của iv, nốt năm của ii°', en: '♭6 is the root of ♭VI, the third of iv, the fifth of ii°' },
    { vi: '♭6 cũng là nốt bảy của iiø7 và vii°7', en: '♭6 is also the seventh of iiø7 and vii°7' },
    { vi: '♭3 nằm trong ♭III, i, ♭VI; ♭7 nằm trong ♭VII, v, ♭III', en: '♭3 is in ♭III, i, ♭VI; ♭7 is in ♭VII, v, ♭III' },
    { vi: 'Bậc mượn đổi tính chất của hợp âm thuận giọng', en: 'A borrowed degree changes the quality of the diatonic chord' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: '♭6 trong hợp âm', en: '♭6 in a chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một **bậc mượn** (borrowed scale degree) có thể đứng ở mọi vị trí trong hợp âm. Ở giọng {C} trưởng, ♭6 là {Ab}: nốt gốc của ♭VI, nốt ba của iv, nốt năm của ii°.',
            en: 'A **borrowed scale degree** can take any place in a chord. In {C} major, ♭6 is {Ab}: the root of ♭VI, the third of iv, the fifth of ii°.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong hợp âm bảy, {Ab} là nốt bảy của iiø7 ({D} {F} {Ab} {C}) và của vii°7 ({B} {D} {F} {Ab}).',
            en: 'In seventh chords, {Ab} is the seventh of iiø7 ({D} {F} {Ab} {C}) and of vii°7 ({B} {D} {F} {Ab}).',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'Ab4+C5+Eb5 F4+Ab4+C5 D4+F4+Ab4 D4+F4+Ab4+C5 B3+D4+F4+Ab4',
          labels: ['♭VI', 'iv', 'ii°', 'iiø7', 'vii°7'],
        },
        { type: 'play', notes: 'Ab4+C5+Eb5 F4+Ab4+C5 D4+F4+Ab4 D4+F4+Ab4+C5 B3+D4+F4+Ab4', label: { vi: 'Nghe năm hợp âm có {Ab}', en: 'Hear five chords with {Ab}' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm mượn này là gì?', en: 'In {C} major, which borrowed chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4+F4+Ab4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii', en: 'ii' } },
          { text: { vi: 'ii°', en: 'ii°' }, correct: true },
          { text: { vi: 'iv', en: 'iv' } },
        ],
      },
      reason: {
        vi: '{D}–{F}–{Ab} là hai quãng 3 thứ trên bậc 2, tức hợp âm giảm ii°, với ♭6 là nốt năm.',
        en: '{D}–{F}–{Ab} is two minor thirds on degree 2, a diminished ii°, with ♭6 as its fifth.',
      },
    },
    {
      kind: 'explain',
      title: { vi: '♭3 và ♭7', en: '♭3 and ♭7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '♭3 ({Eb}) là nốt gốc của ♭III, nốt ba của i, nốt năm của ♭VI. ♭7 ({Bb}) là nốt gốc của ♭VII, nốt ba của v, nốt năm của ♭III.',
            en: '♭3 ({Eb}) is the root of ♭III, the third of i, the fifth of ♭VI. ♭7 ({Bb}) is the root of ♭VII, the third of v, the fifth of ♭III.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'Eb4+G4+Bb4 C4+Eb4+G4 Ab4+C5+Eb5 || Bb4+D5+F5 G4+Bb4+D5 Eb4+G4+Bb4',
          labels: ['♭III', 'i', '♭VI', '♭VII', 'v', '♭III'],
        },
        { type: 'play', notes: 'Eb4+G4+Bb4 C4+Eb4+G4 Ab4+C5+Eb5', label: { vi: 'Nghe ba hợp âm có {Eb}', en: 'Hear three chords with {Eb}' } },
        { type: 'play', notes: 'Bb4+D5+F5 G4+Bb4+D5 Eb4+G4+Bb4', label: { vi: 'Nghe ba hợp âm có {Bb}', en: 'Hear three chords with {Bb}' } },
        {
          type: 'tip',
          text: {
            vi: 'Một số hợp âm có mặt ở cả hai nhóm: ♭VI có cả ♭6 lẫn ♭3, ♭III có cả ♭3 lẫn ♭7.',
            en: 'Some chords appear twice: ♭VI holds both ♭6 and ♭3, ♭III both ♭3 and ♭7.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, nốt ba của hợp âm v mượn là nốt nào?', en: 'In {F} major, what is the third of the borrowed v chord?' },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'v mượn là {C}–{Eb}–{G}: nốt ba {Eb} là ♭7 của giọng {F} trưởng.',
        en: 'The borrowed v is {C}–{Eb}–{G}: its third, {Eb}, is ♭7 of {F} major.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tính chất đổi theo', en: 'The quality changes' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Không cần thuộc lòng từng hợp âm. Điều cần nhớ: khi một bậc của giọng thứ vào hợp âm, tính chất hợp âm thuận giọng đổi theo, như ii thứ thành ii° giảm, V trưởng thành v thứ.',
            en: 'There is no need to memorize every chord. What matters is that a degree from the minor mode alters the quality of the diatonic chord: the minor ii becomes a diminished ii°, the major V a minor v.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+F4+A4 D4+F4+Ab4 || G4+B4+D5 G4+Bb4+D5', labels: ['ii', 'ii°', 'V', 'v'], highlight: [1, 3] },
        { type: 'play', notes: 'D4+F4+A4:h D4+F4+Ab4:h G4+B4+D5:h G4+Bb4+D5:h', label: { vi: 'Nghe ii, ii°, V, v', en: 'Hear ii, ii°, V, v' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm {Bb}–{D}–{F} mượn bậc nào?', en: 'In {C} major, which degree does the chord {Bb}–{D}–{F} borrow?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Bb4+D5+F5' },
        { type: 'play', notes: 'Bb4+D5+F5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '♭3', en: '♭3' } },
          { text: { vi: '♭6', en: '♭6' } },
          { text: { vi: '♭7', en: '♭7' }, correct: true },
        ],
      },
      reason: {
        vi: '{Bb} là ♭7 của giọng {C} trưởng, và nó là nốt gốc, nên hợp âm là ♭VII.',
        en: '{Bb} is ♭7 of {C} major and it is the root, so the chord is ♭VII.',
      },
    },
  ],
} satisfies Lesson
