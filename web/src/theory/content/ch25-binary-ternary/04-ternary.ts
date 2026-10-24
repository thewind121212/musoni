import type { Lesson } from '@/theory/types'
import { MINOR_HC, MINOR_PAC, OPEN_HC, OPEN_HOME, hear, tag } from './music'

/**
 * Book 24.7: ternary form (ABA, statement, digression, restatement), larger
 * ternaries in Romantic character pieces, and compound ternary (minuet and
 * trio, da capo aria). The book's Mozart (K. 15mm) and Rachmaninoff figures
 * are replaced by a small ternary of our own (the prelude is public domain
 * but far too long for a phone). No practice link.
 */
export default {
  id: 'ternary',
  title: { vi: 'Hình thức ba đoạn', en: 'Ternary form' },
  minutes: 5,
  sources: [{ section: '24.7', url: 'https://musictheory.pugetsound.edu/mt21c/TernaryForm.html' }],
  recap: [
    { vi: 'Ba đoạn: A B A, trình bày, đi xa, tái hiện', en: 'Ternary: A B A, statement, digression, restatement' },
    { vi: 'Đoạn B có giai điệu mới, thường ở giọng mới', en: 'The B section has a new melody, often in a new key' },
    { vi: 'Tiểu phẩm thời lãng mạn hay là ba đoạn lớn', en: 'Romantic character pieces are often large ternaries' },
    { vi: 'Ba đoạn phức: một đoạn tự nó là hai đoạn hay ba đoạn', en: 'Compound ternary: one section is itself a binary or ternary' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'A B A', en: 'A B A' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hình thức ba đoạn thường viết là A B A: trình bày, đi xa, rồi tái hiện. Đoạn A của chúng tôi ở giọng {C} trưởng; đoạn B dưới đây có giai điệu mới, chậm hơn.',
            en: 'Ternary form is usually diagrammed A B A: statement, digression, restatement. Our A section is in {C} major; the B section below has a new, slower melody.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: MINOR_HC.notes, labels: tag(MINOR_HC.notes, 'b', 'HC') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${MINOR_PAC.notes} ||`, labels: tag(MINOR_PAC.notes, 'b′', 'PAC') },
        {
          type: 'play',
          notes: hear(OPEN_HC, OPEN_HOME, MINOR_HC, MINOR_PAC, OPEN_HC, OPEN_HOME),
          bpm: 150,
          label: { vi: 'Nghe A B A', en: 'Hear A B A' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn B kết ở giọng nào?', en: 'In which key does the B section end?' },
      blocks: [{ type: 'play', notes: hear(MINOR_HC, MINOR_PAC), bpm: 150 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giọng {C} trưởng', en: '{C} major' } },
          { text: { vi: 'Giọng {A} thứ', en: '{A} minor' }, correct: true },
          { text: { vi: 'Giọng {G} trưởng', en: '{G} major' } },
        ],
      },
      reason: {
        vi: 'Nốt {G#} dẫn lên {A}, và đoạn B kết trên hợp âm Am: giọng {A} thứ, giọng song song của {C} trưởng.',
        en: 'The {G#} leads up to {A}, and the B section ends on an Am chord: {A} minor, the relative minor of {C} major.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ba đoạn khép kín', en: 'Sectional ternary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn A ở đây kết trọn ở giọng {C} trưởng, nên đây là ba đoạn khép kín. Mỗi đoạn có câu nhạc riêng và kết riêng.',
            en: 'The A section here ends conclusively in {C} major, so this is a sectional ternary. Each section has its own phrases and its own cadence.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Các **tiểu phẩm** (character pieces) thời lãng mạn, như nocturne, intermezzo hay "bài ca không lời" của Schubert, Chopin, Schumann, Brahms, thường là ba đoạn lớn hơn, mỗi đoạn dài hơn 8 ô nhịp.',
            en: 'Romantic **character pieces** titled nocturne, intermezzo or song without words, by Schubert, Chopin, Schumann and Brahms, are often larger ternaries, each section longer than eight measures.',
          },
        },
        { type: 'play', notes: hear(OPEN_HC, OPEN_HOME), bpm: 140, label: { vi: 'Nghe đoạn A', en: 'Hear the A section' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Một bản A B A có đoạn A dừng ở kết lửng. Tên hình thức là gì?', en: 'In an A B A piece, the A section stops on a half cadence. What is the form?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ba đoạn khép kín', en: 'Sectional ternary' } },
          { text: { vi: 'Ba đoạn liên tục', en: 'Continuous ternary' }, correct: true },
          { text: { vi: 'Hai đoạn liên tục', en: 'Continuous binary' } },
        ],
      },
      reason: {
        vi: 'A B A là ba đoạn, và đoạn A không kết trên hợp âm I nên là liên tục.',
        en: 'A B A is ternary, and the A section does not end on the tonic chord, so it is continuous.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ba đoạn phức', en: 'Compound ternary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Ba đoạn phức** (compound ternary) là hình thức ba đoạn mà một đoạn, A hoặc B, tự nó là hình thức hai đoạn hay ba đoạn.',
            en: 'A **compound ternary** is a ternary form in which one of the sections, the A or the B, is itself a binary or ternary form.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ví dụ quen thuộc là **minuet và trio** (minuet and trio): minuet, rồi trio, rồi minuet chơi lại từ đầu. Minuet và trio thường đều là hai đoạn tái hiện.',
            en: 'A familiar example is the **minuet and trio**: the minuet, then the trio, then the minuet again from the start. The minuet and the trio are often each a rounded binary.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Sơ đồ: minuet ||: a :||: b a′ :||, trio ||: c :||: d c′ :||, rồi minuet. Aria da capo (da capo aria) cũng là ba đoạn phức.',
            en: 'Diagram: minuet ||: a :||: b a′ :||, trio ||: c :||: d c′ :||, then the minuet. The da capo aria is a compound ternary too.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Minuet là hai đoạn tái hiện, trio cũng vậy, rồi minuet quay lại. Cả bản là hình thức gì?',
        en: 'The minuet is a rounded binary, so is the trio, then the minuet returns. What is the whole piece?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' } },
          { text: { vi: 'Ba đoạn phức', en: 'Compound ternary' }, correct: true },
          { text: { vi: 'Hai đoạn cân bằng', en: 'Balanced binary' } },
        ],
      },
      reason: {
        vi: 'Minuet, trio, minuet là A B A, và mỗi đoạn tự nó là hai đoạn, nên cả bản là ba đoạn phức.',
        en: 'Minuet, trio, minuet is A B A, and each section is itself a binary, so the whole is a compound ternary.',
      },
    },
  ],
} satisfies Lesson
