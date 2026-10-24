import type { Lesson } from '@/theory/types'

/** Book 34.1.2: transposition numbers; P and I by their first note, R and RI by their last. */
export default {
  id: 'transposition-numbers',
  title: { vi: 'Số chuyển vị', en: 'Transposition numbers' },
  minutes: 4,
  sources: [{ section: '34.1', url: 'https://musictheory.pugetsound.edu/mt21c/TwelveToneTechnique.html' }],
  recap: [
    { vi: 'Mỗi dạng chuỗi có thể bắt đầu từ bất kỳ nốt nào', en: 'Each row form can be transposed to start on any note' },
    { vi: 'P và I mang số của nốt đầu', en: 'P and I take the number of their first note' },
    { vi: 'R và RI mang số của nốt cuối', en: 'R and RI take the number of their last note' },
    { vi: 'R₅ là P₅ đọc ngược, RI₅ là I₅ đọc ngược', en: 'R₅ is P₅ backward, RI₅ is I₅ backward' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chuỗi viết bằng số', en: 'The row in integers' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Như ở chương trước, ta ghi mỗi nốt bằng một số nguyên: {C} = 0, {C#} = 1, {D} = 2, đến {B} = 11. Chuỗi của chương này là 0 4 2 6 3 8 9 11 5 7 10 1.',
            en: 'As in the last chapter, each note is an integer: {C} = 0, {C#} = 1, {D} = 2, up to {B} = 11. This chapter’s row is 0 4 2 6 3 8 9 11 5 7 10 1.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4 E4 D4 F#4 Eb4 Ab4 An4 B4 Fn4 G4 Bb4 C#5',
          labels: ['0', '4', '2', '6', '3', '8', '9', '11', '5', '7', '10', '1'],
        },
        { type: 'play', notes: 'C4 E4 D4 F#4 Eb4 Ab4 A4 B4 F4 G4 Bb4 C#5', label: { vi: 'Nghe P₀', en: 'Hear P₀' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'P và I: số của nốt đầu', en: 'P and I: the first note’s number' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi dạng chuỗi có thể **chuyển vị** (transpose) để bắt đầu từ bất kỳ nốt nào. Với P và I, **số chuyển vị** (transposition number) là số của nốt đầu: P₀ bắt đầu bằng {C}, P₃ bắt đầu bằng {Eb}.',
            en: 'Each row form can be **transposed** to start on any note. For P and I, the **transposition number** is the first note’s integer: P₀ starts on {C}, P₃ on {Eb}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'Eb4 G4 F4 A4 F#4 B4 C5 D5 Ab4 Bb4 C#5 En5',
          labels: ['3', '7', '5', '9', '6', '11', '0', '2', '8', '10', '1', '4'],
          highlight: [0],
        },
        { type: 'play', notes: 'Eb4 G4 F4 A4 F#4 B4 C5 D5 Ab4 Bb4 C#5 E5', label: { vi: 'Nghe P₃', en: 'Hear P₃' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'I₅ bắt đầu bằng nốt nào?', en: 'Which note does I₅ start on?' },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Dạng I mang số của nốt đầu, và 5 là {F}.',
        en: 'An I form takes its first note’s number, and 5 is {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'R và RI: số của nốt cuối', en: 'R and RI: the last note’s number' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dạng R và RI mang số của nốt cuối. R₀ là P₀ đọc ngược nên kết thúc bằng {C}; R₁ kết thúc bằng {C#}, RI₇ kết thúc bằng {G}.',
            en: 'R and RI forms take the number of their last note. R₀ is P₀ backward, so it ends on {C}; R₁ ends on {C#}, and RI₇ on {G}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C#5 Bb4 G4 F4 Bn4 A4 Ab4 Eb4 F#4 D4 En4 Cn4',
          labels: ['1', '10', '7', '5', '11', '9', '8', '3', '6', '2', '4', '0'],
          highlight: [11],
        },
        { type: 'play', notes: 'C#5 Bb4 G4 F4 B4 A4 Ab4 Eb4 F#4 D4 E4 C4', label: { vi: 'Nghe R₀', en: 'Hear R₀' } },
        {
          type: 'tip',
          text: {
            vi: 'Nhờ vậy R₅ luôn là P₅ đọc ngược, và RI₅ là I₅ đọc ngược.',
            en: 'So R₅ is always P₅ backward, and RI₅ is I₅ backward.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng nghịch hành này là R mấy?', en: 'Which retrograde is this?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Ab5 F5 D5 C5 F#5 E5 Eb5 Bb4 C#5 An4 Bn4 G4' },
        { type: 'play', notes: 'Ab5 F5 D5 C5 F#5 E5 Eb5 Bb4 C#5 A4 B4 G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'R₈', en: 'R₈' } },
          { text: { vi: 'R₇', en: 'R₇' }, correct: true },
          { text: { vi: 'R₁', en: 'R₁' } },
        ],
      },
      reason: {
        vi: 'Dạng R mang số của nốt cuối, và {G} là 7.',
        en: 'An R form takes its last note’s number, and {G} is 7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'RI₃ kết thúc bằng nốt nào?', en: 'Which note does RI₃ end on?' },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Dạng RI mang số của nốt cuối, và 3 là {Eb}.',
        en: 'An RI form takes its last note’s number, and 3 is {Eb}.',
      },
    },
  ],
} satisfies Lesson
