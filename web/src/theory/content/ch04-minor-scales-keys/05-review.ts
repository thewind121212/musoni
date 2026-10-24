import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (3.4) on 3.1-3.3. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 4', en: 'Chapter 4 review' },
  minutes: 4,
  sources: [{ section: '3.4', url: 'https://musictheory.pugetsound.edu/mt21c/MinorKeysPracticeExercises.html' }],
  practice: { drill: 'key-sig', level: 4, durationSec: 120 },
  recap: [
    { vi: 'Ba gam thứ: tự nhiên, hòa âm, giai điệu', en: 'Three minor scales: natural, harmonic, melodic' },
    { vi: 'Hóa biểu giọng thứ, giọng song song và giọng cùng tên', en: 'Minor key signatures, relative and parallel keys' },
    { vi: 'Tên các bậc', en: 'Scale degree names' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng thứ nào?', en: 'Which minor key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Bb', notes: '' }],
      answer: { type: 'key', note: 'G', blackKeys: 'b' },
      reason: {
        vi: 'Hai dấu giáng là {Bb} trưởng; đếm xuống ba nửa cung: {Bb}, {A}, {Ab}, {G}.',
        en: 'Two flats is {Bb} major; count down three half steps: {Bb}, {A}, {Ab}, {G}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng thứ nào?', en: 'Which minor key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'bass', key: 'E', notes: '' }],
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'Bốn dấu thăng là {E} trưởng; đếm xuống ba nửa cung: {E}, {D#}, {D}, {C#}.',
        en: 'Four sharps is {E} major; count down three half steps: {E}, {D#}, {D}, {C#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là gam {A} thứ nào?', en: 'Which {A} minor scale is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4 B4 C5 D5 E5 F5 G#5 A5' },
        { type: 'play', notes: 'A4 B4 C5 D5 E5 F5 G#5 A5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tự nhiên', en: 'Natural' } },
          { text: { vi: 'Hòa âm', en: 'Harmonic' }, correct: true },
          { text: { vi: 'Giai điệu (đi lên)', en: 'Melodic (ascending)' } },
        ],
      },
      reason: {
        vi: 'Chỉ bậc 7 được nâng thành {G#}, còn {F} giữ nguyên: đó là gam thứ hòa âm.',
        en: 'Only the 7th is raised, to {G#}, while {F} stays: that is the harmonic minor.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu của giọng {B} thứ có gì?', en: 'What is in the key signature of {B} minor?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai dấu thăng', en: 'Two sharps' }, correct: true },
          { text: { vi: 'Ba dấu thăng', en: 'Three sharps' } },
          { text: { vi: 'Hai dấu giáng', en: 'Two flats' } },
        ],
      },
      reason: {
        vi: '{B} trưởng có năm dấu thăng; bớt ba dấu thăng thì giọng {B} thứ còn hai.',
        en: '{B} major has five sharps; take away three and {B} minor has two.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Giọng thứ song song của {F} trưởng là giọng nào?', en: 'What is the relative minor of {F} major?' },
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: 'Đếm xuống ba nửa cung từ {F}: {E}, {Eb}, {D}, nên {D} thứ cũng có một dấu giáng.',
        en: 'Count down three half steps from {F}: {E}, {Eb}, {D}, so {D} minor also has one flat.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong một giọng thứ, {Ab} là trung âm. Đó là giọng nào?', en: 'In a minor key, {Ab} is the mediant. Which key is it?' },
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Trung âm là bậc 3, nên chủ âm thấp hơn hai bậc: {Ab}, {G}, {F}.',
        en: 'The mediant is degree 3, so the tonic is two degrees below: {Ab}, {G}, {F}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong một giọng trưởng, {B} là át âm. Đó là giọng nào?', en: 'In a major key, {B} is the dominant. Which key is it?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Át âm cao hơn chủ âm một quãng 5, và từ {E} lên quãng 5 là {B}.',
        en: 'The dominant is a 5th above the tonic, and a 5th above {E} is {B}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong một giọng trưởng, {C} là hạ trung âm. Đó là giọng nào?', en: 'In a major key, {C} is the submediant. Which key is it?' },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Hạ trung âm là bậc 6, và bậc 6 của {Eb} trưởng là {C}.',
        en: 'The submediant is degree 6, and the 6th degree of {Eb} major is {C}.',
      },
    },
  ],
} satisfies Lesson
