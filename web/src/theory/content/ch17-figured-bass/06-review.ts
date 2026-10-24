import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (16.6) on 16.2-16.4. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 17', en: 'Chapter 17 review' },
  minutes: 5,
  sources: [{ section: '16.6', url: 'https://musictheory.pugetsound.edu/mt21c/FiguredBassPracticeExercises.html' }],
  recap: [
    { vi: 'Con số của hợp âm ba và hợp âm bảy', en: 'Triad and seventh-chord figures' },
    { vi: 'Bậc La Mã kèm con số', en: 'Roman numerals with figures' },
    { vi: 'Bốn trường hợp của hợp âm 6/4', en: 'The four situations of six-four chords' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+C4+E4+G4' },
        { type: 'play', notes: 'G2+C4+E4+G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I6', en: 'I6' } },
          { text: { vi: 'I6/4', en: 'I6/4' }, correct: true },
          { text: { vi: 'V', en: 'V' } },
        ],
      },
      reason: {
        vi: 'Đây là C/G: hợp âm I {C} {E} {G} với nốt năm {G} ở bass, nên ghi I6/4.',
        en: 'This is C/G: the I chord, {C} {E} {G}, with its fifth, {G}, in the bass, so it is I6/4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} thứ, hợp âm này là gì?', en: 'In {C} minor, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Cm', notes: 'F3+D4+Ab4' },
        { type: 'play', notes: 'F3+D4+Ab4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iv6', en: 'iv6' } },
          { text: { vi: 'ii°6', en: 'ii°6' }, correct: true },
          { text: { vi: 'ii°6/4', en: 'ii°6/4' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {D} {F} {Ab}, hợp âm ii° của giọng {C} thứ; nốt ba {F} ở bass nên ghi ii°6.',
        en: 'Restacked it is {D} {F} {Ab}, the ii° chord of {C} minor; its third, {F}, is in the bass, so it is ii°6.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {B} thứ, hợp âm này là gì?', en: 'In {B} minor, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', key: 'Bm', notes: 'G2+A#2+C#3+E3' },
        { type: 'play', notes: 'G2+A#2+C#3+E3' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vii°7', en: 'vii°7' } },
          { text: { vi: 'vii°6/5', en: 'vii°6/5' } },
          { text: { vi: 'vii°4/2', en: 'vii°4/2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Xếp lại là {A#} {C#} {E} {G}, hợp âm vii°7; nốt bảy {G} ở bass nên ghi vii°4/2.',
        en: 'Restacked it is {A#} {C#} {E} {G}, the vii°7 chord; its seventh, {G}, is in the bass, so it is vii°4/2.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, hợp âm này là gì?', en: 'In {F} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', key: 'F', notes: 'E3+G3+Bb3+D4' },
        { type: 'play', notes: 'E3+G3+Bb3+D4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'viiø7', en: 'viiø7' }, correct: true },
          { text: { vi: 'vii°7', en: 'vii°7' } },
          { text: { vi: 'viiø6/5', en: 'viiø6/5' } },
        ],
      },
      reason: {
        vi: '{E} là bậc 7 của giọng {F} trưởng; {E} {G} {Bb} {D} là hợp âm bảy nửa giảm ở thế gốc, viiø7.',
        en: '{E} is scale degree 7 of {F} major; {E} {G} {Bb} {D} is a half-diminished seventh chord in root position, viiø7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, hợp âm này là gì?', en: 'In {D} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', key: 'D', notes: 'F#2+A2+C#3+D3' },
        { type: 'play', notes: 'F#2+A2+C#3+D3' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I6/5', en: 'I6/5' } },
          { text: { vi: 'IM6/5', en: 'IM6/5' }, correct: true },
          { text: { vi: 'IM4/3', en: 'IM4/3' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {D} {F#} {A} {C#}, hợp âm IM7; nốt ba {F#} ở bass nên ghi IM6/5, giữ M.',
        en: 'Restacked it is {D} {F#} {A} {C#}, the IM7 chord; its third, {F#}, is in the bass, so it is IM6/5, keeping the M.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', notes: 'G2+B2+D3+E3' },
        { type: 'play', notes: 'G2+B2+D3+E3' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iii7', en: 'iii7' } },
          { text: { vi: 'iii6/5', en: 'iii6/5' }, correct: true },
          { text: { vi: 'iii4/3', en: 'iii4/3' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {E} {G} {B} {D}, hợp âm iii7; nốt ba {G} ở bass nên ghi iii6/5.',
        en: 'Restacked it is {E} {G} {B} {D}, the iii7 chord; its third, {G}, is in the bass, so it is iii6/5.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} trưởng, nốt bass của hợp âm 6/4 kết là nốt nào?', en: 'In {D} major, what is the bass note of the cadential six-four?' },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Hợp âm 6/4 kết là I6/4: {D} {F#} {A} với nốt năm {A}, bậc 5 của giọng, ở bass.',
        en: 'The cadential six-four is I6/4: {D} {F#} {A} with its fifth, {A}, scale degree 5, in the bass.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {D} trưởng. Hợp âm 6/4 ở giữa thuộc loại nào?', en: 'This is in {D} major. Which kind is the six-four in the middle?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'D', notes: 'F#3+A3+D4+F#4 E3+A3+C#4+E4 D3+A3+D4+F#4', highlight: [1] },
        { type: 'play', notes: 'F#3+A3+D4+F#4:h E3+A3+C#4+E4:h D3+A3+D4+F#4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '6/4 kết', en: 'Cadential' } },
          { text: { vi: '6/4 lướt', en: 'Passing' }, correct: true },
          { text: { vi: '6/4 âm giữ', en: 'Pedal' } },
          { text: { vi: '6/4 bè trầm giai điệu', en: 'Melodic bass' } },
        ],
      },
      reason: {
        vi: 'Bè trầm đi xuống liền bậc {F#} {E} {D}, và hợp âm giữa {A} {C#} {E} có nốt năm {E} ở bass: V6/4 lướt.',
        en: 'The bass steps down {F#} {E} {D}, and the middle chord, {A} {C#} {E}, has its fifth, {E}, in the bass: a passing V6/4.',
      },
    },
  ],
} satisfies Lesson
