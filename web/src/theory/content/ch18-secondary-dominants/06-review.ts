import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (17.7) on 17.2-17.6. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 18', en: 'Chapter 18 review' },
  minutes: 5,
  sources: [{ section: '17.7', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDominantPracticeExercises.html' }],
  recap: [
    { vi: 'Ly điệu và hợp âm át phụ', en: 'Tonicization and secondary dominants' },
    { vi: 'Át phụ ở giọng trưởng và giọng thứ', en: 'Secondary dominants in major and minor' },
    { vi: 'Phân tích, viết và giải quyết bất thường', en: 'Analyzing, writing and irregular resolutions' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} trưởng, hợp âm bảy át phụ nào dẫn tới ii (Em)?', en: 'In {D} major, which secondary dominant seventh leads to ii (Em)?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A7', en: 'A7' } },
          { text: { vi: 'B7', en: 'B7' }, correct: true },
          { text: { vi: 'F♯7', en: 'F♯7' } },
        ],
      },
      reason: {
        vi: 'Nốt gốc của V7/ii nằm một quãng 5 đúng trên {E}, tức là {B}: B7 = {B}–{D#}–{F#}–{A}.',
        en: 'The root of V7/ii lies a perfect 5th above {E}, which is {B}: B7 = {B}–{D#}–{F#}–{A}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, hợp âm thứ nhất là gì?', en: 'In {G} major, what is the first chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'G', notes: 'E4+G#4+B4+D5 A4+C5+E5' },
        { type: 'play', notes: 'E4+G#4+B4+D5:h A4+C5+E5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V7/ii', en: 'V7/ii' }, correct: true },
          { text: { vi: 'V7/vi', en: 'V7/vi' } },
          { text: { vi: 'iii7', en: 'iii7' } },
        ],
      },
      reason: {
        vi: 'E7 là hợp âm bảy át, và quãng 5 đúng dưới {E} là {A}, nốt gốc của ii, nên đây là V7/ii.',
        en: 'E7 is a major-minor seventh chord, and a perfect 5th below {E} is {A}, the root of ii, so it is V7/ii.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, A7 đi tới Dm. Ghi A7 là gì?', en: 'In {A} minor, A7 goes to Dm. How is A7 labeled?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I7', en: 'I7' } },
          { text: { vi: 'V7/VII', en: 'V7/VII' } },
          { text: { vi: 'V7/iv', en: 'V7/iv' }, correct: true },
        ],
      },
      reason: {
        vi: 'Dm là iv của giọng {A} thứ, và A7 nằm một quãng 5 đúng trên {D}, với {C#} là cảm âm của {D}.',
        en: 'Dm is iv in {A} minor, and A7 lies a perfect 5th above {D}, with {C#} as the leading tone of {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {Eb} trưởng, V/V là hợp âm {F}–?–{C}. Nốt biến âm của nó là nốt nào?', en: 'In {Eb} major, V/V is {F}–?–{C}. What is its chromatic note?' },
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'V là {Bb}, át âm của {Bb} là {F}–{A}–{C}, nên {Ab} của hóa biểu được nâng lên thành {An}.',
        en: 'V is {Bb}, and the dominant of {Bb} is {F}–{A}–{C}, so the key signature\'s {Ab} is raised to {An}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, {D}–{F}–{A} đi tới V. Đây có phải là át phụ không?', en: 'In {C} major, {D}–{F}–{A} goes to V. Is it a secondary dominant?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có: V/V', en: 'Yes: V/V' } },
          { text: { vi: 'Không: đó là ii', en: 'No: it is ii' }, correct: true },
        ],
      },
      reason: {
        vi: '{D}–{F}–{A} là hợp âm thứ, nên không thể là át phụ: đó là ii, hợp âm tiền át thuận giọng.',
        en: '{D}–{F}–{A} is a minor triad, so it cannot be a secondary dominant: it is ii, the diatonic pre-dominant.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, hợp âm có dấu ? là gì?', en: 'In {C} major, what is the chord marked ?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+G4+C5 A2+E4+G4+C#5 D3+D4+F4+D5 G2+D4+F4+B4 C3+C4+E4+G4', labels: ['I', '?', 'ii', 'V7', 'I'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h A2+E4+G4+C#5:h D3+D4+F4+D5:h G2+D4+F4+B4:h C3+C4+E4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi7', en: 'vi7' } },
          { text: { vi: 'V7/ii', en: 'V7/ii' }, correct: true },
          { text: { vi: 'V7/vi', en: 'V7/vi' } },
        ],
      },
      reason: {
        vi: 'A7 = {A}–{C#}–{E}–{G} là hợp âm bảy át, và quãng 5 đúng dưới {A} là {D}, nốt gốc của ii.',
        en: 'A7 = {A}–{C#}–{E}–{G} is a major-minor seventh chord, and a perfect 5th below {A} is {D}, the root of ii.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} thứ, B♭7 đi tới E♭. Ghi B♭7 thế nào?', en: 'In {C} minor, B♭7 goes to E♭. How is B♭7 labeled?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V7/VI', en: 'V7/VI' } },
          { text: { vi: 'V7/III hoặc VII7', en: 'V7/III or VII7' }, correct: true },
          { text: { vi: 'IV7', en: 'IV7' } },
        ],
      },
      reason: {
        vi: 'B♭7 vẫn thuận giọng và đi tới III, nên ghi V7/III hay VII7 đều đúng.',
        en: 'B♭7 is diatonic and goes to III, so V7/III and VII7 are both correct.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, E7 đi tới F. Đây là gì?', en: 'In {C} major, E7 goes to F. What is this?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V7/vi giải quyết như thường lệ', en: 'V7/vi resolving as usual' } },
          { text: { vi: 'V7/iii đi tới IV', en: 'V7/iii going to IV' } },
          { text: { vi: 'V7/vi giải quyết bất thường về IV', en: 'V7/vi resolving irregularly to IV' }, correct: true },
        ],
      },
      reason: {
        vi: 'V7/vi đáng lẽ về vi (Am); đi tới IV là một giải quyết bất thường rất hay gặp.',
        en: 'V7/vi would normally go to vi (Am); going to IV is a common irregular resolution.',
      },
    },
  ],
} satisfies Lesson
