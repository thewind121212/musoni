import type { Lesson } from '@/theory/types'

/** Book 18.2 (major): the secondary diminished chords of ii, iii, IV, V and vi; vii°7 for minor triads, viiø7 (or vii°7) for major ones. */
export default {
  id: 'in-major',
  title: { vi: 'Hợp âm giảm phụ trong giọng trưởng', en: 'Secondary diminished chords in major' },
  minutes: 4,
  sources: [{ section: '18.2', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDiminishedChordsInMajorAndMinor.html' }],
  recap: [
    { vi: 'Trong giọng trưởng, ii, iii, IV, V và vi có hợp âm giảm phụ', en: 'In major, ii, iii, IV, V and vi have secondary diminished chords' },
    { vi: 'Hợp âm thứ được chủ âm hóa bằng vii°7', en: 'Minor triads are tonicized by vii°7' },
    { vi: 'Hợp âm trưởng thường dùng viiø7, cũng có thể dùng vii°7', en: 'Major triads usually take viiø7, but can also take vii°7' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Năm hợp âm được chủ âm hóa', en: 'Five chords to tonicize' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng trưởng, hợp âm giảm phụ dẫn vào ii, iii, IV, V và vi. Nốt gốc của nó luôn là cảm âm của hợp âm đó: nửa cung dưới nốt gốc. Trong giọng {C} trưởng, đó là {C#}, {D#}, {E}, {F#} và {G#}.',
            en: 'In a major key, secondary diminished chords lead to ii, iii, IV, V and vi. Each one’s root is the leading tone of its chord: a half step below that chord’s root. In {C} major these are {C#}, {D#}, {E}, {F#} and {G#}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C#4+E4+G4+Bb4 D#4+F#4+A4+C5 E4+G4+Bb4+D5 F#4+A4+C5+E5 G#4+B4+D5+F5',
          labels: ['vii°7\n/ii', 'vii°7\n/iii', 'viiø7\n/IV', 'viiø7\n/V', 'vii°7\n/vi'],
        },
        { type: 'play', notes: 'C#4+E4+G4+Bb4 D#4+F#4+A4+C5 E4+G4+Bb4+D5 F#4+A4+C5+E5 G#4+B4+D5+F5' },
        {
          type: 'tip',
          text: {
            vi: 'vii° trong giọng là hợp âm ba giảm, nên không được chủ âm hóa: một hợp âm giảm không làm chủ âm được.',
            en: 'The key’s own vii° is a diminished triad, so it is not tonicized: a diminished chord cannot act as a tonic.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, nốt gốc của vii°7/vi là nốt nào?', en: 'In {C} major, what is the root of vii°7/vi?' },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'vi là {A} {C} {E}; nốt nửa cung dưới {A} là {G#}.',
        en: 'vi is {A} {C} {E}; the note a half step below {A} is {G#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm thứ: vii°7', en: 'Minor triads: vii°7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm thứ (ii, iii, vi) được chủ âm hóa bằng hợp âm bảy giảm. Ví dụ vii°7/vi là {G#} {B} {D} {F}, giải về {A} {C} {E}.',
            en: 'Minor triads (ii, iii, vi) are tonicized by fully-diminished seventh chords. For example, vii°7/vi is {G#} {B} {D} {F}, resolving to {A} {C} {E}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G#4+B4+D5+F5 A4+C5+E5', labels: ['vii°7\n/vi', 'vi'] },
        { type: 'play', notes: 'G#4+B4+D5+F5 A4+C5+E5', label: { vi: 'Nghe vii°7/vi rồi vi', en: 'Hear vii°7/vi, then vi' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm trưởng: viiø7 hoặc vii°7', en: 'Major triads: viiø7 or vii°7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm trưởng (IV, V) theo truyền thống dùng hợp âm bảy nửa giảm, nhưng cũng có thể dùng hợp âm bảy giảm. Hai hợp âm chỉ khác nốt bảy: viiø7/V có {E}, vii°7/V có {Eb}.',
            en: 'Major triads (IV, V) traditionally take a half-diminished seventh chord, but can also take a fully-diminished one. The two differ only in the seventh: viiø7/V has {E}, vii°7/V has {Eb}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#4+A4+C5+E5 G4+B4+D5 F#4+A4+C5+Eb5 G4+B4+D5', labels: ['viiø7\n/V', 'V', 'vii°7\n/V', 'V'], highlight: [0, 2] },
        { type: 'play', notes: 'F#4+A4+C5+E5 G4+B4+D5 F#4+A4+C5+Eb5 G4+B4+D5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Loại hợp âm bảy nào chủ âm hóa ii (một hợp âm thứ)?', en: 'Which seventh chord tonicizes ii (a minor triad)?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bảy giảm: vii°7/ii', en: 'Fully-diminished: vii°7/ii' }, correct: true },
          { text: { vi: 'Bảy nửa giảm: viiø7/ii', en: 'Half-diminished: viiø7/ii' } },
          { text: { vi: 'Bảy át: V7/ii', en: 'Dominant seventh: V7/ii' } },
        ],
      },
      reason: {
        vi: 'Hợp âm thứ được chủ âm hóa bằng hợp âm bảy giảm; viiø7 dành cho hợp âm trưởng.',
        en: 'Minor triads are tonicized by fully-diminished sevenths; viiø7 is for major triads.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, nốt gốc của viiø7/V là nốt nào?', en: 'In {G} major, what is the root of viiø7/V?' },
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'V của giọng {G} trưởng là {D} {F#} {A}; nửa cung dưới {D} là {C#}.',
        en: 'V in {G} major is {D} {F#} {A}; a half step below {D} is {C#}.',
      },
    },
  ],
} satisfies Lesson
