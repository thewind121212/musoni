import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (1.6) on 1.1-1.3. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 1', en: 'Chapter 1 review' },
  minutes: 3,
  sources: [{ section: '1.6', url: 'https://musictheory.pugetsound.edu/mt21c/BasicConceptsPracticeExercises.html' }],
  practice: { drill: 'note-id', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Tên nốt và vị trí trên phím đàn', en: 'Note names and where they are on the keys' },
    { vi: 'Khóa Sol, khóa Fa và khóa Do', en: 'Treble, bass and C clefs' },
    { vi: 'Quãng tám và Do giữa', en: 'Octaves and middle C' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F5' }],
      answer: { type: 'key', note: 'F' },
      reason: {
        vi: 'Đếm lên từ {G4} ở dòng 2: dòng 3 là {B4}, dòng 4 là {D5}, dòng 5 là {F5}.',
        en: 'Count up from {G4} on line 2: line 3 is {B4}, line 4 is {D5}, line 5 is {F5}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'A2' }],
      answer: { type: 'key', note: 'A' },
      reason: {
        vi: 'Ở khóa Fa, dòng 1 là {G2}, nên khe 1 ngay trên nó là {A2}.',
        en: 'In bass clef line 1 is {G2}, so space 1 just above it is {A2}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Phím tô màu là nốt gì?', en: 'Which note is the coloured key?' },
      blocks: [{ type: 'keys', notes: 'D4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C}', en: '{C}' } },
          { text: { vi: '{D}', en: '{D}' }, correct: true },
          { text: { vi: '{E}', en: '{E}' } },
        ],
      },
      reason: {
        vi: '{D} là phím trắng nằm giữa hai phím đen của nhóm hai.',
        en: '{D} is the white key between the two black keys of a group of two.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A5' }],
      answer: { type: 'key', note: 'A' },
      reason: {
        vi: 'Dòng 5 là {F5}, khe trên nó là {G5}, và dòng kẻ phụ đầu tiên là {A5}.',
        en: 'Line 5 is {F5}, the space above it is {G5}, and the first ledger line is {A5}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'alto', notes: 'E4' }],
      answer: { type: 'key', note: 'E' },
      reason: {
        vi: 'Khóa Do dòng 3: {C4} ở dòng 3, khe 3 là {D4}, dòng 4 là {E4}.',
        en: 'Alto clef: {C4} is on line 3, space 3 is {D4}, line 4 is {E4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt nào?', en: 'Which note is this?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'C4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C3}', en: '{C3}' } },
          { text: { vi: '{C4}', en: '{C4}' }, correct: true },
          { text: { vi: '{C5}', en: '{C5}' } },
        ],
      },
      reason: {
        vi: 'Nốt trên dòng kẻ phụ ngay trên khuông khóa Fa là Do giữa, {C4}.',
        en: 'The note on the ledger line just above the bass staff is middle C, {C4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Khuông nhạc có bao nhiêu dòng kẻ?', en: 'How many lines does a staff have?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '4', en: '4' } },
          { text: { vi: '5', en: '5' }, correct: true },
          { text: { vi: '6', en: '6' } },
        ],
      },
      reason: {
        vi: 'Khuông nhạc có năm dòng kẻ và bốn khe xen giữa.',
        en: 'A staff has five lines with four spaces between them.',
      },
    },
  ],
} satisfies Lesson
