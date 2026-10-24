import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (18.5) on 18.1-18.4. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 19', en: 'Chapter 19 review' },
  minutes: 4,
  sources: [{ section: '18.5', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDiminishedPracticeExercises.html' }],
  recap: [
    { vi: 'Phân tích: xếp quãng 3, rồi nhìn lên quãng 2 thứ', en: 'Analyzing: stack in thirds, then look a minor 2nd up' },
    { vi: 'Viết: lấy nốt dưới nốt gốc hợp âm đích một quãng 2 thứ', en: 'Writing: start a minor 2nd below the target’s root' },
    { vi: 'Hợp âm thứ dùng vii°7, hợp âm trưởng dùng viiø7 hoặc vii°7', en: 'Minor triads take vii°7, major triads viiø7 or vii°7' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, hợp âm này là gì?', en: 'In {D} major, what is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'D', notes: 'G#4+B4+D5+F5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'viiø7/V', en: 'viiø7/V' } },
          { text: { vi: 'vii°7/V', en: 'vii°7/V' }, correct: true },
          { text: { vi: 'vii°7/vi', en: 'vii°7/vi' } },
        ],
      },
      reason: {
        vi: '{G#} {B} {D} {Fn} là ba quãng 3 thứ, và trên {G#} một quãng 2 thứ là {A}, bậc V của giọng {D} trưởng.',
        en: '{G#} {B} {D} {Fn} is three minor thirds, and a minor 2nd above {G#} is {A}, the V of {D} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {Bb} trưởng, hợp âm này là gì?', en: 'In {Bb} major, what is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Bb', notes: 'En4+G4+Bb4+D5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'viiø7/V', en: 'viiø7/V' }, correct: true },
          { text: { vi: 'vii°7/V', en: 'vii°7/V' } },
          { text: { vi: 'viiø7/IV', en: 'viiø7/IV' } },
        ],
      },
      reason: {
        vi: '{En} {G} {Bb} {D} là hợp âm bảy nửa giảm, và trên {En} là {F}, bậc V của giọng {Bb} trưởng.',
        en: '{En} {G} {Bb} {D} is half-diminished, and above {En} is {F}, the V of {Bb} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này mang ký hiệu nào?', en: 'In {C} major, which numeral and figures fit this chord?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'Bb2+C#3+E3+G3' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vii°42/ii', en: 'vii°42/ii' }, correct: true },
          { text: { vi: 'vii°65/ii', en: 'vii°65/ii' } },
          { text: { vi: 'vii°7/iii', en: 'vii°7/iii' } },
        ],
      },
      reason: {
        vi: 'Xếp lại là {C#} {E} {G} {Bb}, vii°7/ii; nốt bảy {Bb} ở bass nên ghi 42.',
        en: 'Restacked it is {C#} {E} {G} {Bb}, vii°7/ii; the seventh, {Bb}, is in the bass, so the figures are 42.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} thứ, nốt gốc của vii°7/iv là nốt nào?', en: 'In {D} minor, what is the root of vii°7/iv?' },
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'iv của giọng {D} thứ là {G} {Bb} {D}; dưới {G} một quãng 2 thứ là {F#}.',
        en: 'iv in {D} minor is {G} {Bb} {D}; a minor 2nd below {G} is {F#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bảy của vii°7/V trong giọng {A} thứ là nốt nào?', en: 'What is the seventh of vii°7/V in {A} minor?' },
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'vii°7/V là {D#} {F#} {A} {C}: ba quãng 3 thứ từ cảm âm của {E}.',
        en: 'vii°7/V is {D#} {F#} {A} {C}: three minor thirds up from the leading tone of {E}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, nốt nào ở bass của viiø65/V?', en: 'In {D} major, which note is in the bass of viiø65/V?' },
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: 'viiø7/V là {G#} {B} {D} {F#}, và 65 đặt nốt ba {B} ở bass.',
        en: 'viiø7/V is {G#} {B} {D} {F#}, and 65 puts the third, {B}, in the bass.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} thứ, viiø7/III có cùng các nốt với hợp âm thuận giọng nào?', en: 'In {E} minor, viiø7/III has the same notes as which diatonic chord?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iiø7', en: 'iiø7' }, correct: true },
          { text: { vi: 'vii°7', en: 'vii°7' } },
          { text: { vi: 'IVM7', en: 'IVM7' } },
        ],
      },
      reason: {
        vi: 'III là {G} {B} {D}, nên viiø7/III là {F#} {A} {C} {E}, đúng là iiø7 của giọng {E} thứ.',
        en: 'III is {G} {B} {D}, so viiø7/III is {F#} {A} {C} {E}, exactly the iiø7 of {E} minor.',
      },
    },
  ],
} satisfies Lesson
