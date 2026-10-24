import type { Lesson } from '@/theory/types'

/** Book 7.3: diatonic triads in minor, the raised seventh (V, vii°), the subtonic VII. */
export default {
  id: 'diatonic-minor',
  title: { vi: 'Hợp âm thuận giọng thứ', en: 'Diatonic chords in minor' },
  minutes: 5,
  sources: [{ section: '7.3', url: 'https://musictheory.pugetsound.edu/mt21c/DiatonicChordsInMinor.html' }],
  practice: { drill: 'chords', level: 7, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Gam thứ tự nhiên: i ii° III iv v VI VII', en: 'Natural minor: i ii° III iv v VI VII' },
    { vi: 'Cảm âm nâng lên cho V trưởng và vii° giảm', en: 'The raised leading tone gives a major V and a diminished vii°' },
    { vi: 'Hay dùng nhất: i ii° III iv V VI, cùng VII và vii°', en: 'Most used: i ii° III iv V VI, with both VII and vii°' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Gam thứ tự nhiên', en: 'Natural minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dựng hợp âm ba trên gam {A} thứ tự nhiên, ta có i ii° III iv v VI VII. Hợp âm chủ là hợp âm thứ, nên viết chữ thường i.',
            en: 'Build triads on the {A} natural minor scale and you get i ii° III iv v VI VII. The tonic triad is minor, so it is lowercase i.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'Am',
          notes: 'A4+C5+E5 B4+D5+F5 C5+E5+G5 D4+F4+A4 E4+G4+B4 F4+A4+C5 G4+B4+D5',
          labels: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
        },
        {
          type: 'play',
          notes: 'A4+C5+E5 B4+D5+F5 C5+E5+G5 D4+F4+A4 E4+G4+B4 F4+A4+C5 G4+B4+D5',
          label: { vi: 'Nghe bảy hợp âm', en: 'Hear the seven chords' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nâng cảm âm', en: 'The raised leading tone' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bậc 6 và bậc 7 đổi theo dạng gam thứ, nên giọng thứ có tới 13 hợp âm thuận giọng. Hay gặp nhất là bậc 7 nâng lên của gam thứ hòa âm.',
            en: 'Scale degrees 6 and 7 change with the form of minor, so a minor key has 13 possible diatonic triads. Most common is the raised 7 of harmonic minor.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Với {G#}, hợp âm v thứ thành V trưởng, giống như ở giọng trưởng.',
            en: 'With {G#}, the minor v becomes a major V, as in a major key.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Am', notes: 'E4+G4+B4 E4+G#4+B4', labels: ['v', 'V'], highlight: [1] },
        { type: 'play', notes: 'E4+G4+B4 E4+G#4+B4 A4+C5+E5', label: { vi: 'Nghe v, V rồi i', en: 'Hear v, V, then i' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} thứ, hợp âm này là gì?', en: 'In {A} minor, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Am', notes: 'E4+G#4+B4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'v', en: 'v' } },
          { text: { vi: 'V', en: 'V' }, correct: true },
          { text: { vi: 'V+', en: 'V+' } },
        ],
      },
      reason: {
        vi: '{E}–{G#}–{B} có cảm âm {G#} nâng lên, nên là hợp âm trưởng, viết chữ hoa V.',
        en: '{E}–{G#}–{B} has the raised leading tone {G#}, so it is a major triad, uppercase V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'VII và vii°', en: 'VII and vii°' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giọng thứ dùng cả hai hợp âm trên bậc 7. **Hợp âm bậc VII hạ** (subtonic triad) VII dựng trên bậc 7 tự nhiên, không cần dấu hóa.',
            en: 'Minor keys use both triads on degree 7. The **subtonic triad** VII is built on the natural, lowered 7 and needs no accidental.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Hợp âm cảm âm** (leading-tone triad) vii° dựng trên bậc 7 nâng lên, và là hợp âm giảm.',
            en: 'The **leading-tone triad** vii° is built on the raised 7 and is diminished.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Am', notes: 'G4+B4+D5 G#4+B4+D5', labels: ['VII', 'vii°'] },
        { type: 'play', notes: 'G4+B4+D5 G#4+B4+D5', label: { vi: 'Nghe VII rồi vii°', en: 'Hear VII, then vii°' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} thứ, hợp âm này là gì?', en: 'In {C} minor, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Cm', notes: 'Eb4+G4+Bb4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iii', en: 'iii' } },
          { text: { vi: 'III', en: 'III' }, correct: true },
          { text: { vi: 'III+', en: 'III+' } },
        ],
      },
      reason: {
        vi: '{Eb} là bậc 3 của giọng {C} thứ, và {Eb}–{G}–{Bb} là hợp âm trưởng, nên viết III.',
        en: '{Eb} is scale degree 3 of {C} minor and {Eb}–{G}–{Bb} is a major triad, so it is III.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} thứ, hợp âm V cần nốt nào được nâng lên?', en: 'In {D} minor, which raised note does the V chord need?' },
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'V là {A}–{C#}–{E}: bậc 7 {C} được nâng lên thành cảm âm {C#}.',
        en: 'V is {A}–{C#}–{E}: scale degree 7, {C}, is raised to the leading tone {C#}.',
      },
    },
  ],
} satisfies Lesson
