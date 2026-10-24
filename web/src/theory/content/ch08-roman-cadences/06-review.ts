import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (7.5) on 7.1-7.4. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 8', en: 'Chapter 8 review' },
  minutes: 4,
  sources: [{ section: '7.5', url: 'https://musictheory.pugetsound.edu/mt21c/RomanNumeralPracticeExercises.html' }],
  practice: { drill: 'chords', level: 7, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Bậc La Mã và thế đảo', en: 'Roman numerals and inversions' },
    { vi: 'Hợp âm thuận giọng trưởng và thứ', en: 'Diatonic chords in major and minor' },
    { vi: 'Bốn loại kết', en: 'The four cadences' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} trưởng, hợp âm này là gì?', en: 'In {E} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'E', notes: 'F#4+A4+C#5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'II', en: 'II' } },
          { text: { vi: 'ii', en: 'ii' }, correct: true },
          { text: { vi: 'iii', en: 'iii' } },
        ],
      },
      reason: {
        vi: '{F#} là bậc 2 của giọng {E} trưởng, và {F#}–{A}–{C#} là hợp âm thứ, nên viết ii.',
        en: '{F#} is scale degree 2 of {E} major and {F#}–{A}–{C#} is a minor triad, so it is ii.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} trưởng, hợp âm này là gì?', en: 'In {E} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'E', notes: 'F#4+A4+D#5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii', en: 'ii' } },
          { text: { vi: 'vii°', en: 'vii°' } },
          { text: { vi: 'vii°/3', en: 'vii°/3rd' }, correct: true },
        ],
      },
      reason: {
        vi: 'Các nốt {D#}–{F#}–{A} là hợp âm vii°, và {F#}, nốt ba của nó, nằm ở bass.',
        en: 'The notes {D#}–{F#}–{A} are the vii° chord, and {F#}, its third, is in the bass.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {B} thứ, hợp âm này là gì?', en: 'In {B} minor, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Bm', notes: 'A4+C#5+E5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vii°', en: 'vii°' } },
          { text: { vi: 'VII', en: 'VII' }, correct: true },
          { text: { vi: 'V', en: 'V' } },
        ],
      },
      reason: {
        vi: 'Nốt gốc {A} là bậc 7 tự nhiên của giọng {B} thứ, nên đây là hợp âm bậc VII hạ, VII.',
        en: 'The root {A} is the natural 7 of {B} minor, so this is the subtonic triad, VII.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} thứ, nốt ba của hợp âm V là nốt nào?', en: 'In {E} minor, what is the third of the V chord?' },
      answer: { type: 'key', note: 'D#' },
      reason: {
        vi: 'V là {B}–{D#}–{F#}: bậc 7 {D} được nâng lên thành cảm âm {D#}.',
        en: 'V is {B}–{D#}–{F#}: scale degree 7, {D}, is raised to the leading tone {D#}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {F} trưởng này kết bằng kết gì?', en: 'This phrase is in {F} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'F', notes: 'F4+A4+C5 C5+E5+G5 F4+A4+C5 Bb4+D5+F5 F4+A4+C5 C5+E5+G5' },
        { type: 'play', notes: 'F4+A4+C5:q C5+E5+G5:q F4+A4+C5:h Bb4+D5+F5:q F4+A4+C5:q C5+E5+G5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết phụ', en: 'Plagal' } },
          { text: { vi: 'Kết lửng', en: 'Half' }, correct: true },
          { text: { vi: 'Kết đánh lừa', en: 'Deceptive' } },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–V–I–IV–I–V và dừng trên {C}–{E}–{G}, hợp âm V.',
        en: 'The phrase is I–V–I–IV–I–V and stops on {C}–{E}–{G}, the V chord.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {D} trưởng này kết bằng kết gì?', en: 'This phrase is in {D} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'D', notes: 'D4+F#4+A4 B4+D5+F#5 G4+B4+D5 D5+F#5+A5' },
        { type: 'play', notes: 'D4+F#4+A4:h B4+D5+F#5:h G4+B4+D5:h D5+F#5+A5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết phụ', en: 'Plagal' }, correct: true },
          { text: { vi: 'Kết lửng', en: 'Half' } },
          { text: { vi: 'Kết đánh lừa', en: 'Deceptive' } },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–vi–IV–I: hai hợp âm cuối là IV–I.',
        en: 'The phrase is I–vi–IV–I: it ends IV–I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe câu nhạc ở giọng {C} trưởng. Nó kết bằng kết gì?', en: 'Listen to this phrase in {C} major. Which cadence ends it?' },
      blocks: [{ type: 'play', notes: 'C4+E4+G4:h D4+F4+A4:h G4+B4+D5:h A4+C5+E5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết phụ', en: 'Plagal' } },
          { text: { vi: 'Kết lửng', en: 'Half' } },
          { text: { vi: 'Kết đánh lừa', en: 'Deceptive' }, correct: true },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–ii–V–vi: V không về I mà đi tới vi.',
        en: 'The phrase is I–ii–V–vi: V goes to vi instead of I.',
      },
    },
  ],
} satisfies Lesson
