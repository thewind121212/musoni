import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (26.13) on 26.1-26.12. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 27', en: 'Chapter 27 review' },
  minutes: 5,
  sources: [{ section: '26.13', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingTriadsPracticeExercises.html' }],
  recap: [
    { vi: 'Tránh quãng 5 và quãng 8 song song', en: 'Avoid parallel fifths and octaves' },
    { vi: 'Nối hợp âm theo quãng bass đi', en: 'Connect chords by the interval the bass moves' },
    { vi: 'Thế gốc và thế đảo 2 nhân đôi bass; thế đảo 1 thì không, trừ hợp âm giảm', en: 'Root position and second inversion double the bass; first inversion does not, except diminished triads' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Hai hợp âm này mắc lỗi gì?', en: 'What is wrong with these two chords?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+D3+B3@t+G4 A2+E3+C4+A4', labels: ['V', 'vi'] },
        { type: 'play', notes: 'G2+D3+B3+G4:h A2+E3+C4+A4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Lỗi khoảng cách giữa các bè', en: 'A spacing error' } },
          { text: { vi: 'Quãng 5 và quãng 8 song song', en: 'Parallel fifths and octaves' }, correct: true },
          { text: { vi: 'Không có lỗi', en: 'Nothing is wrong' } },
        ],
      },
      reason: {
        vi: 'Mọi bè cùng đi lên với bass: bass–tenor đi quãng 5 song song, bass–soprano đi quãng 8 song song.',
        en: 'Every voice moves up with the bass: bass and tenor in parallel fifths, bass and soprano in parallel octaves.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, bass đi quãng 3 từ I xuống vi. Ba bè trên nên làm gì?', en: 'In {G} major, the bass moves down a 3rd from I to vi. What should the upper voices do?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'G2+D3+B3@t+G4 E2+E3+B3@t+G4', labels: ['I', 'vi'] },
        { type: 'play', notes: 'G2+D3+B3+G4:h E2+E3+B3+G4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giữ hai nốt chung, bè còn lại đi liền bậc', en: 'Keep two common tones, move the other by step' }, correct: true },
          { text: { vi: 'Cả ba đi ngược chiều với bass', en: 'All three move against the bass' } },
          { text: { vi: 'Cả ba đi song song với bass', en: 'All three move parallel to the bass' } },
        ],
      },
      reason: {
        vi: 'I và vi có chung {G} và {B}: soprano và alto giữ chúng, tenor đi {D}–{E}.',
        en: 'I and vi share {G} and {B}: the soprano and alto keep them while the tenor moves {D}–{E}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, trong V–VI, hợp âm VI nhân đôi nốt nào?', en: 'In {A} minor, in V–VI, which note does VI double?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Am', notes: 'E3+B3+E4+G#4 F3+A3+C4+A4', labels: ['V', 'VI'] },
        { type: 'play', notes: 'E3+B3+E4+G#4:h F3+A3+C4+A4:w' },
      ],
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Cảm âm {G#} đi lên {A}, hai bè kia đi ngược chiều bass, nên VI ({F}–{A}–{C}) nhân đôi nốt ba {A}.',
        en: 'The leading tone {G#} moves up to {A} and the others move against the bass, so VI ({F}–{A}–{C}) doubles its 3rd, {A}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này mắc lỗi gì?', en: 'What is wrong with this chord?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+G3+B4+D5' },
        { type: 'play', notes: 'G2+G3+B4+D5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Lỗi khoảng cách giữa các bè', en: 'A spacing error' }, correct: true },
          { text: { vi: 'Một bè ra ngoài âm vực', en: 'A voice is out of range' } },
          { text: { vi: 'Nhân đôi sai nốt', en: 'The wrong note is doubled' } },
        ],
      },
      reason: {
        vi: 'Alto {B4} cách tenor {G3} một quãng 10, quá một quãng 8; âm vực và cách nhân đôi nốt gốc {G} thì đúng.',
        en: 'The alto {B4} is a 10th above the tenor {G3}, more than an octave; the ranges and the doubled root, {G}, are fine.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào nằm ngoài âm vực của bè soprano?', en: 'Which note is outside the soprano’s range?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{E4}', en: '{E4}' } },
          { text: { vi: '{F5}', en: '{F5}' } },
          { text: { vi: '{A5}', en: '{A5}' }, correct: true },
        ],
      },
      reason: {
        vi: 'Âm vực soprano là {C4}–{G5}, nên {A5} quá cao.',
        en: 'The soprano range is {C4}–{G5}, so {A5} is too high.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} trưởng, hợp âm vii°6 nhân đôi nốt nào?', en: 'In {D} major, which note does vii°6 double?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'vii° là {C#}–{E}–{G}, một hợp âm giảm; ở thế đảo 1 nó nhân đôi nốt ba {E} ở bass.',
        en: 'vii° is {C#}–{E}–{G}, a diminished triad; in first inversion it doubles its 3rd, {E}, in the bass.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {Bb} trưởng, hợp âm I6/4 nhân đôi nốt nào?', en: 'In {Bb} major, which note does I6/4 double?' },
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'I là {Bb}–{D}–{F}; ở thế đảo 2, nốt năm {F} ở bass và được nhân đôi.',
        en: 'I is {Bb}–{D}–{F}; in second inversion its fifth, {F}, is in the bass and is doubled.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai bè này chuyển động kiểu gì?', en: 'What type of motion is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'B4+D5 C5+E5' },
        { type: 'play', notes: 'B4+D5:h C5+E5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Song song', en: 'Parallel' }, correct: true },
          { text: { vi: 'Xiên', en: 'Oblique' } },
          { text: { vi: 'Ngược chiều', en: 'Contrary' } },
        ],
      },
      reason: {
        vi: 'Hai bè cùng đi lên liền bậc và giữ quãng 3: chuyển động song song.',
        en: 'Both voices move up by step and keep a 3rd between them: parallel motion.',
      },
    },
  ],
} satisfies Lesson
