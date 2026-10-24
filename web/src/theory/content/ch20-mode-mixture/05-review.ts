import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (19.6) on 19.1-19.5:
 * naming borrowed chords (symbol, numeral, inversion), writing them from a
 * numeral, and hearing V–♭VI and the Picardy 3rd. The Chopin excerpt is left out.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 20', en: 'Chapter 20 review' },
  minutes: 5,
  sources: [{ section: '19.6', url: 'https://musictheory.pugetsound.edu/mt21c/ModeMixturePracticeExercises.html' }],
  recap: [
    { vi: 'Hợp âm mượn từ giọng thứ cùng tên', en: 'Chords borrowed from the parallel minor' },
    { vi: 'Phân tích và viết hợp âm mượn', en: 'Analyzing and writing borrowed chords' },
    { vi: 'V–♭VI và quãng ba Picardy', en: 'V–♭VI and the Picardy 3rd' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm mượn hay gặp nhất mang bậc nào của giọng thứ?', en: 'Which minor-mode degree do borrowed chords carry most often?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '♭3', en: '♭3' } },
          { text: { vi: '♭6', en: '♭6' }, correct: true },
          { text: { vi: '♭7', en: '♭7' } },
        ],
      },
      reason: {
        vi: '♭3 và ♭7 cũng có, nhưng ♭6 là bậc mượn hay gặp nhất, như trong iv và ♭VI.',
        en: '♭3 and ♭7 occur too, but ♭6 is the most common borrowed degree, as in iv and ♭VI.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {C} trưởng, hợp âm này là gì?', en: 'In {C} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Ab4+C5+Eb5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A♭, ♭VI', en: 'A♭, ♭VI' }, correct: true },
          { text: { vi: 'A♭m, ♭vi', en: 'A♭m, ♭vi' } },
          { text: { vi: 'Am, vi', en: 'Am, vi' } },
        ],
      },
      reason: {
        vi: '{Ab}–{C}–{Eb} là hợp âm trưởng A♭ trên ♭6, nên viết ♭VI.',
        en: '{Ab}–{C}–{Eb} is an A♭ major triad on ♭6, so it is ♭VI.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {Eb} trưởng, hợp âm này là gì?', en: 'In {Eb} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Eb', notes: 'F4+Ab4+Cb5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii', en: 'ii' } },
          { text: { vi: 'ii°', en: 'ii°' }, correct: true },
          { text: { vi: 'vii°', en: 'vii°' } },
        ],
      },
      reason: {
        vi: '{Cb} là ♭6 của giọng {Eb} trưởng, nên {F}–{Ab}–{Cb} là hợp âm giảm ii° mượn.',
        en: '{Cb} is ♭6 of {Eb} major, so {F}–{Ab}–{Cb} is a borrowed diminished ii°.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {F} trưởng, hợp âm này là gì?', en: 'In {F} major, which chord is this?' },
      blocks: [{ type: 'staff', clef: 'grand', key: 'F', notes: 'Db3+F4+Bb4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iv6', en: 'iv6' }, correct: true },
          { text: { vi: '♭VI', en: '♭VI' } },
          { text: { vi: 'IV6', en: 'IV6' } },
        ],
      },
      reason: {
        vi: 'Xếp lại được {Bb}–{Db}–{F}, hợp âm thứ trên bậc 4 với nốt ba {Db} ở bass, nên là iv6.',
        en: 'Stacked, it is {Bb}–{Db}–{F}, a minor triad on degree 4 with its third, {Db}, in the bass: iv6.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, nốt gốc của ♭III là nốt nào?', en: 'In {G} major, what is the root of ♭III?' },
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Bậc 3 của giọng {G} trưởng là {B}; hạ nửa cung được {Bb}, nên ♭III là {Bb}–{D}–{F}.',
        en: 'Degree 3 of {G} major is {B}; a half step lower is {Bb}, so ♭III is {Bb}–{D}–{F}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, hợp âm v mượn gồm những nốt nào?', en: 'In {D} major, which notes make the borrowed v?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{A} {C#} {E}', en: '{A} {C#} {E}' } },
          { text: { vi: '{A} {Cn} {E}', en: '{A} {Cn} {E}' }, correct: true },
          { text: { vi: '{Ab} {C} {Eb}', en: '{Ab} {C} {Eb}' } },
        ],
      },
      reason: {
        vi: 'v mượn hạ bậc 7 {C#} xuống {Cn}, nên {A}–{Cn}–{E} là hợp âm thứ trên bậc 5.',
        en: 'The borrowed v lowers degree 7, {C#}, to {Cn}, so {A}–{Cn}–{E} is a minor triad on degree 5.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe câu nhạc ở giọng {F} trưởng. Nó kết bằng gì?', en: 'Listen to this phrase in {F} major. How does it end?' },
      blocks: [{ type: 'play', notes: 'F2+F4+A4+C5:h G2+F4+Bb4+D5:h C3+E4+G4+C5:h Db3+F4+Ab4+Db5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính, V–I', en: 'Authentic, V–I' } },
          { text: { vi: 'Kết đánh lừa, V–vi', en: 'Deceptive, V–vi' } },
          { text: { vi: 'Kết đánh lừa, V–♭VI', en: 'Deceptive, V–♭VI' }, correct: true },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–ii–V–♭VI: V đi tới {Db}–{F}–{Ab}, hợp âm trưởng trên ♭6.',
        en: 'The phrase is I–ii–V–♭VI: V moves to {Db}–{F}–{Ab}, a major triad on ♭6.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {A} thứ này kết bằng gì?', en: 'This phrase is in {A} minor. How does it end?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Am', time: '4/4', notes: 'A2+E4+A4+C5:h D3+D4+F4+A4:h | E3+E4+G#4+B4:h A2+E4+A4+C#5:h ||' },
        { type: 'play', notes: 'A2+E4+A4+C5:h D3+D4+F4+A4:h E3+E4+G#4+B4:h A2+E4+A4+C#5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết đánh lừa, V–♭VI', en: 'Deceptive, V–♭VI' } },
          { text: { vi: 'V–I với quãng ba Picardy', en: 'V–I with a Picardy 3rd' }, correct: true },
          { text: { vi: 'V–i thứ', en: 'V to a minor i' } },
        ],
      },
      reason: {
        vi: 'Hợp âm cuối có {C#}, quãng ba trưởng trên chủ âm {A}, nên bản giọng thứ kết bằng I trưởng.',
        en: 'The last chord has {C#}, a major third above the tonic {A}, so the minor-key phrase ends on a major I.',
      },
    },
  ],
} satisfies Lesson
