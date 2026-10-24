import type { Lesson } from '@/theory/types'

/** Book 7.2: the seven diatonic triads of a major key and their pattern of qualities. */
export default {
  id: 'diatonic-major',
  title: { vi: 'Hợp âm thuận giọng trưởng', en: 'Diatonic chords in major' },
  minutes: 4,
  sources: [{ section: '7.2', url: 'https://musictheory.pugetsound.edu/mt21c/DiatonicChordsInMajor.html' }],
  practice: { drill: 'chords', level: 6, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Mỗi bậc của gam trưởng cho một hợp âm ba', en: 'Each scale degree of a major scale gives one triad' },
    { vi: 'I ii iii IV V vi vii°', en: 'I ii iii IV V vi vii°' },
    { vi: 'I, IV, V trưởng; ii, iii, vi thứ; vii° giảm', en: 'I, IV, V major; ii, iii, vi minor; vii° diminished' },
    { vi: 'Khuôn mẫu giống nhau ở mọi giọng trưởng', en: 'The pattern is the same in every major key' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bảy hợp âm của giọng', en: 'Seven chords in a key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm thuận giọng** (diatonic chord) chỉ dùng các nốt của giọng. Dựng một hợp âm ba trên mỗi bậc của gam {C} trưởng, ta có bảy hợp âm.',
            en: 'A **diatonic chord** uses only the notes of the key. Build a triad on each degree of the {C} major scale and you get seven chords.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+E4+G4 D4+F4+A4 E4+G4+B4 F4+A4+C5 G4+B4+D5 A4+C5+E5 B4+D5+F5',
          labels: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
        },
        {
          type: 'play',
          notes: 'C4+E4+G4 D4+F4+A4 E4+G4+B4 F4+A4+C5 G4+B4+D5 A4+C5+E5 B4+D5+F5',
          label: { vi: 'Nghe bảy hợp âm', en: 'Hear the seven chords' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Khuôn mẫu tính chất', en: 'The pattern of qualities' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Theo thứ tự bậc, tính chất là: trưởng, thứ, thứ, trưởng, trưởng, thứ, giảm. Ba hợp âm trưởng là I, IV và V.',
            en: 'In order of scale degree, the qualities are: major, minor, minor, major, major, minor, diminished. The three major triads are I, IV and V.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+E4+G4 D4+F4+A4 E4+G4+B4 F4+A4+C5 G4+B4+D5 A4+C5+E5 B4+D5+F5',
          labels: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
          highlight: [0, 3, 4],
        },
        { type: 'play', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5', label: { vi: 'Nghe I, IV, V', en: 'Hear I, IV, V' } },
        {
          type: 'tip',
          text: {
            vi: 'Khuôn mẫu này giống nhau ở mọi giọng trưởng, vì mọi gam trưởng có cùng thứ tự nửa cung và nguyên cung.',
            en: 'The pattern is the same in every major key, because every major scale has the same order of half and whole steps.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng trưởng, hợp âm trên bậc 6 có tính chất gì?', en: 'In a major key, what quality is the triad on scale degree 6?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trưởng', en: 'Major' } },
          { text: { vi: 'Thứ', en: 'Minor' }, correct: true },
          { text: { vi: 'Giảm', en: 'Diminished' } },
        ],
      },
      reason: {
        vi: 'Khuôn mẫu là trưởng, thứ, thứ, trưởng, trưởng, thứ, giảm, nên bậc 6 là hợp âm thứ vi.',
        en: 'The pattern runs major, minor, minor, major, major, minor, diminished, so degree 6 is the minor vi.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ở giọng khác', en: 'In another key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {G} trưởng, hóa biểu có {F#}, nên mọi hợp âm có nốt {F} đều dùng {F#}. Tên nốt đổi, nhưng các bậc La Mã vẫn y như ở giọng {C} trưởng.',
            en: 'In {G} major the key signature has {F#}, so every chord with an {F} uses {F#}. The note names change, but the numerals are just as in {C} major.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'G',
          notes: 'G4+B4+D5 A4+C5+E5 B4+D5+F#5 C4+E4+G4 D4+F#4+A4 E4+G4+B4 F#4+A4+C5',
          labels: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
        },
        {
          type: 'play',
          notes: 'G4+B4+D5 A4+C5+E5 B4+D5+F#5 C4+E4+G4 D4+F#4+A4 E4+G4+B4 F#4+A4+C5',
          label: { vi: 'Nghe bảy hợp âm của giọng {G} trưởng', en: 'Hear the seven chords of {G} major' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, hợp âm này là gì?', en: 'In {D} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'D', notes: 'E4+G4+B4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'II', en: 'II' } },
          { text: { vi: 'ii', en: 'ii' }, correct: true },
          { text: { vi: 'ii°', en: 'ii°' } },
        ],
      },
      reason: {
        vi: '{E} là bậc 2 của giọng {D} trưởng, và hợp âm trên bậc 2 của giọng trưởng là hợp âm thứ ii.',
        en: '{E} is scale degree 2 of {D} major, and the triad on degree 2 of a major key is the minor ii.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, nốt gốc của hợp âm V là nốt nào?', en: 'In {F} major, what is the root of the V chord?' },
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: 'Đếm lên từ {F}: bậc 5 là {C}, nên V là {C}–{E}–{G}.',
        en: 'Count up from {F}: scale degree 5 is {C}, so V is {C}–{E}–{G}.',
      },
    },
  ],
} satisfies Lesson
