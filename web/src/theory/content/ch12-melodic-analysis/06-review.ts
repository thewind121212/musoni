import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (11.6) on 11.1-11.5. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 12', en: 'Chapter 12 review' },
  minutes: 4,
  sources: [{ section: '11.6', url: 'https://musictheory.pugetsound.edu/mt21c/MelodicAnalysisPracticeExercises.html' }],
  recap: [
    { vi: 'Motif, mảnh và bảy cách biến đổi giai điệu', en: 'Motives, fragments and the seven melodic alterations' },
    { vi: 'Câu nhạc khép lại bằng một kết', en: 'A phrase ends with a cadence' },
    { vi: 'Tiết nhạc a, a\', b', en: 'Subphrases a, a\', b' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'D4:8 E4:8 F4:q A4:h | A4:8 G4:8 F4:q D4:h' },
        { type: 'play', notes: 'D4:8 E4:8 F4:q A4:h A4:8 G4:8 F4:q D4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đảo chiều', en: 'Inversion' }, correct: true },
          { text: { vi: 'Đi ngược', en: 'Retrograde' } },
          { text: { vi: 'Đổi tiết tấu', en: 'Rhythmic change' } },
        ],
      },
      reason: {
        vi: 'Mỗi bước đi lên thành đi xuống cùng cỡ quãng; đi ngược thì phải là {A} {F} {E} {D}.',
        en: 'Each step up becomes a step down of the same size; retrograde would be {A} {F} {E} {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:8 F4:8 G4:q R:h | E4:q F4:q G4:h' },
        { type: 'play', notes: 'E4:8 F4:8 G4:q R:h E4:q F4:q G4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tăng trường độ', en: 'Augmentation' }, correct: true },
          { text: { vi: 'Giảm trường độ', en: 'Diminution' } },
          { text: { vi: 'Đổi tiết tấu', en: 'Rhythmic change' } },
        ],
      },
      reason: {
        vi: 'Mọi trường độ đều nhân đôi: móc đơn thành nốt đen, nốt đen thành nốt trắng.',
        en: 'Every duration is doubled: eighths become quarters, the quarter becomes a half note.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đảo chiều motif này theo giọng {C} trưởng, bắt đầu từ {E4}. Nốt cuối là gì?',
        en: 'Invert this motive tonally in {C} major, starting on {E4}. What is its last note?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:8 B4:8 A4:q F4:h' },
        { type: 'play', notes: 'C5:8 B4:8 A4:q F4:h' },
      ],
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Motif đi xuống quãng 2, quãng 2, quãng 3, nên bản đảo đi lên: {F4}, {G4}, rồi {B4}.',
        en: 'The motive falls a 2nd, a 2nd and a 3rd, so the inversion rises: {F4}, {G4}, then {B4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q A4:q G4:h | C5:8 B4:8 A4:q G4:h' },
        { type: 'play', notes: 'C5:q A4:q G4:h C5:8 B4:8 A4:q G4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đổi quãng', en: 'Intervallic change' } },
          { text: { vi: 'Trang trí', en: 'Ornamentation' }, correct: true },
          { text: { vi: 'Nối dài', en: 'Extension' } },
        ],
      },
      reason: {
        vi: '{B4} chen vào là nốt lướt từ {C5} xuống {A4}, các nốt của motif vẫn còn nguyên.',
        en: 'The added {B4} is a passing tone from {C5} down to {A4}, and the motive’s notes all remain.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Mảnh (fragment) là gì?', en: 'What is a fragment?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một phần nhỏ tách ra từ motif ghép', en: 'A smaller part broken out of a compound motive' }, correct: true },
          { text: { vi: 'Nửa đầu của một câu nhạc', en: 'The first half of a phrase' } },
          { text: { vi: 'Motif viết theo lối đi ngược', en: 'A motive written in retrograde' } },
        ],
      },
      reason: {
        vi: 'Motif ghép tách được thành các mảnh, mỗi mảnh có thể phát triển riêng.',
        en: 'A compound motive breaks into fragments, and each can be developed on its own.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Phần lớn câu nhạc dài bao nhiêu ô nhịp?', en: 'How many measures long are most phrases?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2', en: '2' } },
          { text: { vi: '4', en: '4' }, correct: true },
          { text: { vi: '16', en: '16' } },
        ],
      },
      reason: {
        vi: 'Phần lớn câu nhạc dài bốn ô nhịp; hai ô nhịp thường là một tiết nhạc.',
        en: 'Most phrases are four measures long; two measures is usually a subphrase.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 3-4 là tiết nhạc nào?', en: 'Which subphrase is measures 3-4?' },
      blocks: [
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'E4:q G4:q A4:q G4:q | E4:q C4:q D4:h | E4:q G4:q A4:q G4:q | E4:q D4:q C4:h',
          labels: ['a', '', '', '', '', '', '', '?', '', '', '', '', '', ''],
        },
        { type: 'play', notes: 'E4:q G4:q A4:q G4:q E4:q C4:q D4:h E4:q G4:q A4:q G4:q E4:q D4:q C4:h', bpm: 110 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'a', en: 'a' } },
          { text: { vi: 'a\'', en: 'a\'' }, correct: true },
          { text: { vi: 'b', en: 'b' } },
        ],
      },
      reason: {
        vi: 'Năm nốt đầu giống hệt a, chỉ đoạn cuối đổi để về {C}, nên đó là a\'.',
        en: 'The first five notes are the same as a and only the end changes to land on {C}, so it is a\'.',
      },
    },
  ],
} satisfies Lesson
