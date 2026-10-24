import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (9.9) on 9.1-9.8. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 10', en: 'Chapter 10 review' },
  minutes: 4,
  sources: [{ section: '9.9', url: 'https://musictheory.pugetsound.edu/mt21c/HarmonicProgressionExercises.html' }],
  practice: { drill: 'chords', level: 7, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Vòng quãng năm và các đoạn ngắn của nó', en: 'The circle of fifths and its shorter segments' },
    { vi: 'Bốn chức năng và sơ đồ chức năng', en: 'The four functions and the flowchart' },
    { vi: 'Các tiến trình hay gặp trong nhạc pop', en: 'Common progressions in popular music' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: {
        vi: 'Vòng quãng năm ở giọng {F} trưởng: hợp âm thứ hai (IV) có nốt gốc là gì?',
        en: 'The circle of fifths in {F} major: what is the root of the second chord (IV)?',
      },
      blocks: [{ type: 'staff', clef: 'treble', key: 'F', notes: 'F4+A4+C5', labels: ['I'] }],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Từ {F} xuống một quãng 5 là {Bb}, bậc 4 của gam {F} trưởng.',
        en: 'A fifth down from {F} is {Bb}, the fourth degree of {F} major.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Vòng quãng năm ở giọng {B} thứ: hợp âm VII có nốt gốc là gì?',
        en: 'The circle of fifths in {B} minor: what is the root of VII?',
      },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'VII nằm trên bậc VII hạ của gam {B} thứ tự nhiên, tức {A}: hợp âm {A} {C#} {E}.',
        en: 'VII sits on the subtonic of {B} natural minor, {A}: the chord {A} {C#} {E}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm iii có chức năng gì?', en: 'What function does iii have?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ', en: 'Tonic' } },
          { text: { vi: 'Kéo dài chủ', en: 'Tonic prolongation' }, correct: true },
          { text: { vi: 'Tiền át', en: 'Pre-dominant' } },
          { text: { vi: 'Át', en: 'Dominant' } },
        ],
      },
      reason: {
        vi: 'iii ({E} {G} {B} ở giọng {C}) có chung hai nốt với I, nên nó kéo dài chủ.',
        en: 'iii ({E} {G} {B} in {C}) shares two notes with I, so it prolongs the tonic.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào có chức năng tiền át?', en: 'Which chord has pre-dominant function?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV', en: 'IV' }, correct: true },
          { text: { vi: 'V', en: 'V' } },
          { text: { vi: 'vi', en: 'vi' } },
        ],
      },
      reason: {
        vi: 'IV và ii chứa bậc 4 và bậc 6, và đi đến hợp âm át.',
        en: 'IV and ii hold scale degrees 4 and 6, and go on to a dominant chord.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Kết lửng dừng trên hợp âm nào?', en: 'Which chord does a half cadence end on?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I', en: 'I' } },
          { text: { vi: 'IV', en: 'IV' } },
          { text: { vi: 'V', en: 'V' }, correct: true },
        ],
      },
      reason: {
        vi: 'Kết lửng dừng trên V, hợp âm át, nên câu nhạc nghe chưa xong.',
        en: 'A half cadence stops on V, the dominant chord, so the phrase sounds unfinished.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Tiết tấu hòa âm ở đây là bao nhiêu phách một hợp âm?', en: 'What is the harmonic rhythm here, in beats per chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4+E4+G4:w | A4+C5+E5:w | F4+A4+C5:w | G4+B4+D5:w' },
        { type: 'play', notes: 'C3+C4+E4+G4:w A2+A4+C5+E5:w F2+F4+A4+C5:w G2+G4+B4+D5:w', bpm: 120 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '1 phách', en: '1 beat' } },
          { text: { vi: '2 phách', en: '2 beats' } },
          { text: { vi: '4 phách', en: '4 beats' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi hợp âm là một nốt tròn, giữ cả bốn phách của ô nhịp 4/4.',
        en: 'Each chord is a whole note, holding all four beats of a 4/4 measure.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {E} trưởng, đây là tiến trình nào?', en: 'In {E} major, which progression is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'E', notes: 'C#5+E5+G#5 A4+C#5+E5 E4+G#4+B4 B4+D#5+F#5' },
        { type: 'play', notes: 'C#3+C#5+E5+G#5:h A2+A4+C#5+E5:h E3+E4+G#4+B4:h B2+B4+D#5+F#5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi–IV–I–V', en: 'vi–IV–I–V' }, correct: true },
          { text: { vi: 'I–V–vi–IV', en: 'I–V–vi–IV' } },
          { text: { vi: 'iii–vi–ii–V', en: 'iii–vi–ii–V' } },
        ],
      },
      reason: {
        vi: 'Các nốt gốc là {C#}, {A}, {E}, {B}: bậc 6, 4, 1 và 5 của gam {E} trưởng.',
        en: 'The roots are {C#}, {A}, {E}, {B}: degrees 6, 4, 1 and 5 of {E} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Tiến trình nào là tiến trình Best-Seller?', en: 'Which is the best-seller progression?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I–vi–IV–V', en: 'I–vi–IV–V' } },
          { text: { vi: 'I–V–vi–IV', en: 'I–V–vi–IV' }, correct: true },
          { text: { vi: 'i–VII–VI–VII', en: 'i–VII–VI–VII' } },
        ],
      },
      reason: {
        vi: 'Best-Seller là I–V–vi–IV; I–vi–IV–V là tiến trình thập niên 50.',
        en: 'The best-seller is I–V–vi–IV; I–vi–IV–V is the ’50s progression.',
      },
    },
  ],
} satisfies Lesson
