import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (12.6). The book
 * asks for the sections of two copyrighted songs; here the song maps are our
 * own, followed by checks on the blues and on closed and open sections.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 13', en: 'Chapter 13 review' },
  minutes: 4,
  sources: [{ section: '12.6', url: 'https://musictheory.pugetsound.edu/mt21c/PopFormPracticeExercises.html' }],
  recap: [
    { vi: 'Phiên khúc–điệp khúc, AABA và ABAC', en: 'Verse-chorus, AABA and ABAC forms' },
    { vi: 'Blues 12 ô nhịp', en: 'The 12-bar blues' },
    { vi: 'Đoạn khép kín và đoạn mở', en: 'Harmonically closed and open sections' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: {
        vi: 'Một bài: dạo đầu 4 ô, A 8 ô, A 8 ô, B 8 ô, A 8 ô. Bài theo hình thức nào?',
        en: 'A song: intro 4 bars, A 8 bars, A 8 bars, B 8 bars, A 8 bars. Which form is it in?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'AABA', en: 'AABA' }, correct: true },
          { text: { vi: 'ABAC', en: 'ABAC' } },
          { text: { vi: 'Phiên khúc–điệp khúc', en: 'Verse-chorus' } },
        ],
      },
      reason: {
        vi: 'Sau dạo đầu là hai đoạn A, một cầu nối B rồi A quay lại: AABA.',
        en: 'After the intro come two A sections, a B bridge and A again: AABA.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bài: phiên khúc 1, phiên khúc 2, điệp khúc, phiên khúc 3, đoạn solo, điệp khúc, điệp khúc. Bài theo hình thức nào?',
        en: 'A song: verse 1, verse 2, chorus, verse 3, solo, chorus, chorus. Which form is it in?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'AABA', en: 'AABA' } },
          { text: { vi: 'ABAC', en: 'ABAC' } },
          { text: { vi: 'Phiên khúc–điệp khúc', en: 'Verse-chorus' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bài xen kẽ phiên khúc với điệp khúc, đoạn mang câu hook.',
        en: 'The song alternates verses with the chorus, the section that holds the hook.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Phiên khúc và điệp khúc của bài này dùng chung tiến trình. Đây là dạng nào?',
        en: 'This song’s verse and chorus share one progression. Which kind is it?',
      },
      blocks: [
        {
          type: 'play',
          notes: 'A2+A4+C5+E5:h F2+F4+A4+C5:h C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:h F2+F4+A4+C5:h C3+C4+E4+G4:h G2+G4+B4+D5:h',
          bpm: 120,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đơn giản', en: 'Simple' }, correct: true },
          { text: { vi: 'Tương phản', en: 'Contrasting' } },
        ],
      },
      reason: {
        vi: 'Phiên khúc và điệp khúc chung một tiến trình là dạng phiên khúc–điệp khúc đơn giản.',
        en: 'A verse and chorus on one shared progression make a simple verse-chorus form.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn thứ tư mở đầu giống đoạn B nhưng kết khác. Bài theo hình thức nào?',
        en: 'The fourth section begins like the B section but ends differently. Which form is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'AABA', en: 'AABA' } },
          { text: { vi: 'ABAB′', en: 'ABAB′' }, correct: true },
          { text: { vi: 'ABAC', en: 'ABAC' } },
        ],
      },
      reason: {
        vi: 'B′ là B được đổi phần kết, nên hình thức là ABAB′, một dạng của ABAC.',
        en: 'B′ is B with a new ending, so the form is ABAB′, a version of ABAC.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Blues 12 ô nhịp ở giọng {D} trưởng: hợp âm ở ô nhịp 5 có nốt gốc là gì?',
        en: 'A 12-bar blues in {D} major: what is the root of the chord in bar 5?',
      },
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Ô nhịp 5 là IV, và bậc 4 của gam {D} trưởng là {G}.',
        en: 'Bar 5 is IV, and the fourth degree of {D} major is {G}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong blues 12 ô nhịp, hợp âm IV nằm ở những ô nào?', en: 'In the 12-bar blues, which bars hold IV?' },
      blocks: [
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:w C3+C4+E4+G4:w C3+C4+E4+G4:w C3+C4+E4+G4:w F2+F4+A4+C5:w F2+F4+A4+C5:w C3+C4+E4+G4:w C3+C4+E4+G4:w G2+G4+B4+D5:w F2+F4+A4+C5:w C3+C4+E4+G4:w C3+C4+E4+G4:w',
          bpm: 200,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '5, 6 và 10', en: '5, 6 and 10' }, correct: true },
          { text: { vi: '5, 6 và 9', en: '5, 6 and 9' } },
          { text: { vi: '9 và 10', en: '9 and 10' } },
        ],
      },
      reason: {
        vi: 'Dòng hai mở bằng IV IV, còn dòng ba là V IV I I.',
        en: 'Line two opens IV IV, and line three is V IV I I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn này ở giọng {F} trưởng khép kín hay mở?', en: 'This section is in {F} major. Is it closed or open?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'F', notes: 'F4+A4+C5 D4+F4+A4 G4+Bb4+D5 C5+E5+G5', labels: ['I', 'vi', 'ii', 'V'] },
        { type: 'play', notes: 'F2+F4+A4+C5:h D3+D4+F4+A4:h G2+G4+Bb4+D5:h C3+C5+E5+G5:w', bpm: 120 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khép kín', en: 'Closed' } },
          { text: { vi: 'Mở', en: 'Open' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đoạn kết trên V, hợp âm {C} {E} {G}, chứ không về I.',
        en: 'It ends on V, the chord {C} {E} {G}, not on I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe đoạn này ở giọng {C} trưởng. Nó khép kín hay mở?', en: 'Listen to this section in {C} major. Is it closed or open?' },
      blocks: [{ type: 'play', notes: 'A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:w', bpm: 120 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khép kín', en: 'Closed' }, correct: true },
          { text: { vi: 'Mở', en: 'Open' } },
        ],
      },
      reason: {
        vi: 'Đoạn này là vi–ii–V–I và kết trên hợp âm chủ I.',
        en: 'The section is vi–ii–V–I and ends on the tonic chord, I.',
      },
    },
  ],
} satisfies Lesson
