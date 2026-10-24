import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (21.9): name an
 * augmented sixth and its lead-sheet symbol (exercise 1), build one from its
 * label in a key (exercise 2), plus 21.3, 21.6 and 21.7.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 22', en: 'Chapter 22 review' },
  minutes: 4,
  sources: [{ section: '21.9', url: 'https://musictheory.pugetsound.edu/mt21c/AugmentedSixthPracticeExercises.html' }],
  recap: [
    { vi: 'Ý, Pháp, Đức và Đức trùng âm: ♭6 và ♯4 cùng về bậc 5', en: 'Italian, French, German and enharmonic German: ♭6 and ♯4 both go to 5' },
    { vi: 'Quãng 3 giảm khi xếp chồng quãng 3 là dấu hiệu nhận ra', en: 'A diminished third when stacked in thirds gives them away' },
    { vi: 'Ký hiệu hợp âm: hợp âm bảy át trên bậc ♭6', en: 'Lead-sheet symbol: a dominant seventh on ♭6' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} thứ, đây là hợp âm sáu tăng nào?', en: 'In {G} minor, which augmented sixth is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Gm', notes: 'Eb3+G4+C#5+G5' },
        { type: 'play', notes: 'Eb3+G4+C#5+G5:h D3+F#4+D5+A5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ý (It+6)', en: 'Italian (It+6)' }, correct: true },
          { text: { vi: 'Pháp (Fr+6)', en: 'French (Fr+6)' } },
          { text: { vi: 'Đức (Ger+6)', en: 'German (Ger+6)' } },
        ],
      },
      reason: {
        vi: 'Chỉ có {Eb} (♭6), {C#} (♯4) và {G} (1) nhân đôi, không thêm bậc 2 hay ♭3: hợp âm Ý.',
        en: 'Only {Eb} (♭6), {C#} (♯4) and a doubled {G} (1), with no 2 or ♭3 added: the Italian.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} thứ, bậc ♯4 của hợp âm sáu tăng là nốt nào?', en: 'In {D} minor, which note is the ♯4 of an augmented sixth?' },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Bậc 4 của giọng {D} thứ là {G}; nâng lên thành {G#}, đi lên bậc 5 {A}.',
        en: 'Degree 4 of {D} minor is {G}; raised it is {G#}, which rises to 5, {A}.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Viết Fr+6 trong giọng {G} trưởng: {Eb}, {G}, {C#} và nốt nào nữa?',
        en: 'Write Fr+6 in {G} major: {Eb}, {G}, {C#} and which other note?',
      },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Hợp âm Pháp thêm bậc 2, và bậc 2 của giọng {G} trưởng là {A}.',
        en: 'The French adds 2, and degree 2 of {G} major is {A}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu hợp âm nào ghi Ger+6 trong giọng {D} thứ?', en: 'Which lead-sheet symbol is Ger+6 in {D} minor?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Dm', notes: 'Bb2+D4+F4+G#4' },
        { type: 'play', notes: 'Bb2+D4+F4+G#4:h A2+D4+F4+A4:h A2+C#4+E4+A4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'G♯7', en: 'G♯7' } },
          { text: { vi: 'B♭7', en: 'B♭7' }, correct: true },
          { text: { vi: 'B♭maj7', en: 'B♭maj7' } },
        ],
      },
      reason: {
        vi: 'Hợp âm Đức nghe như hợp âm bảy át trên bậc ♭6 {Bb}, với {G#} là nốt bảy {Ab} viết khác: B♭7.',
        en: 'The German sounds like a dominant seventh on ♭6, {Bb}, with {G#} as its seventh {Ab} respelled: B♭7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm sáu tăng Đức trùng âm dùng ở đâu?', en: 'Where is the enharmonic German used?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giọng trưởng, đi đến I6/4', en: 'In major, leading to I6/4' }, correct: true },
          { text: { vi: 'Giọng thứ, đi đến i6/4', en: 'In minor, leading to i6/4' } },
          { text: { vi: 'Cả hai, đi thẳng đến I', en: 'In both, going straight to I' } },
        ],
      },
      reason: {
        vi: 'Nốt ♯2 của nó đi lên bậc 3 trưởng của I6/4, nên nó chỉ có trong giọng trưởng.',
        en: 'Its ♯2 rises to the major third of I6/4, so it occurs only in major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Xếp chồng quãng 3, dấu hiệu nào cho biết đó là hợp âm sáu tăng?', en: 'Stacked in thirds, what shows a chord is an augmented sixth?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một quãng 3 tăng', en: 'An augmented third' } },
          { text: { vi: 'Một quãng 3 giảm', en: 'A diminished third' }, correct: true },
          { text: { vi: 'Hai quãng 3 thứ liền nhau', en: 'Two minor thirds in a row' } },
        ],
      },
      reason: {
        vi: 'Chỉ hợp âm sáu tăng có quãng 3 giảm, như {F#}–{Ab}; hai quãng 3 thứ là hợp âm giảm.',
        en: 'Only augmented sixth chords have a diminished third, like {F#}–{Ab}; two minor thirds make a diminished triad.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm {Db} {F} {Ab} là gì?', en: 'In {C} major, what is the chord {Db} {F} {Ab}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F4+Ab4+Db5' },
        { type: 'play', notes: 'F3+F4+Ab4+Db5:h G2+D4+G4+B4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm át phụ', en: 'Secondary dominant' } },
          { text: { vi: 'Hợp âm Napoli', en: 'Neapolitan' }, correct: true },
          { text: { vi: 'Hợp âm sáu tăng', en: 'Augmented sixth' } },
        ],
      },
      reason: {
        vi: 'Đó là hợp âm trưởng trên bậc ♭2 {Db}, có {F} ở bass: N6.',
        en: 'It is a major triad on ♭2, {Db}, with {F} in the bass: N6.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trong giọng {E} thứ, bass đi {E}, {D#}, {D}, {C#}. Nốt tiếp theo, nơi đặt hợp âm sáu tăng, là nốt nào?',
        en: 'In {E} minor the bass goes {E}, {D#}, {D}, {C#}. Which note comes next, where the augmented sixth sits?',
      },
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Sau bậc 6 {C#} là bậc ♭6 {C}, rồi bậc 5 {B}; hợp âm sáu tăng đứng trên {C}.',
        en: 'After 6, {C#}, comes ♭6, {C}, then 5, {B}; the augmented sixth sits on {C}.',
      },
    },
  ],
} satisfies Lesson
