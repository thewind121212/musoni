import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (10.12): the
 * "approached by / left by" table of exercise 1 as four checks, then our own
 * short examples to analyze in place of exercise 2's song and score excerpts.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 11', en: 'Chapter 11 review' },
  minutes: 4,
  sources: [{ section: '10.12', url: 'https://musictheory.pugetsound.edu/mt21c/NonChordTonesPracticeExercises.html' }],
  recap: [
    { vi: 'Gọi tên nốt ngoài hợp âm theo bước đến và bước rời', en: 'Name a non-chord tone by how it is approached and left' },
    { vi: 'Nốt treo đi xuống, nốt chậm đi lên', en: 'A suspension resolves down, a retardation up' },
    { vi: 'Số của nốt treo đo từ bass', en: 'Suspension numbers are measured from the bass' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào đến bằng cùng nốt và rời đi liền bậc lên?', en: 'Which is approached by the same tone and left by step up?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt treo', en: 'A suspension' } },
          { text: { vi: 'Nốt chậm', en: 'A retardation' }, correct: true },
          { text: { vi: 'Nốt đón trước', en: 'An anticipation' } },
        ],
      },
      reason: {
        vi: 'Nốt chậm giữ cùng nốt rồi đi lên; nốt treo cũng giữ cùng nốt nhưng đi xuống.',
        en: 'A retardation keeps the same tone and then rises; a suspension keeps it too but falls.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt thoát đến và rời đi thế nào?', en: 'How is an escape tone approached and left?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Liền bậc, rồi nhảy ngược hướng', en: 'By step, then by leap the other way' }, correct: true },
          { text: { vi: 'Nhảy, rồi liền bậc', en: 'By leap, then by step' } },
          { text: { vi: 'Liền bậc, rồi liền bậc cùng hướng', en: 'By step, then by step the same way' } },
        ],
      },
      reason: {
        vi: 'Nốt thoát đi liền bậc đến, rồi nhảy theo hướng ngược lại; nhảy rồi liền bậc là nốt dựa.',
        en: 'An escape tone is approached by step and left by leap the other way; leap then step is an appoggiatura.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào đến liền bậc và rời đi liền bậc theo cùng hướng?', en: 'Which is approached by step and left by step in the same direction?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt thêu', en: 'A neighbor tone' } },
          { text: { vi: 'Nốt lướt', en: 'A passing tone' }, correct: true },
          { text: { vi: 'Nốt giữ', en: 'A pedal point' } },
        ],
      },
      reason: {
        vi: 'Nốt lướt đi tiếp cùng hướng; nốt thêu đổi hướng để quay về nốt cũ.',
        en: 'A passing tone goes on the same way; a neighbor turns back to the note it left.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt dựa đến bằng bước nhảy. Nó rời đi bằng gì?', en: 'An appoggiatura is approached by leap. How is it left?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Liền bậc', en: 'By step' }, correct: true },
          { text: { vi: 'Bước nhảy', en: 'By leap' } },
          { text: { vi: 'Cùng nốt', en: 'By the same note' } },
        ],
      },
      reason: {
        vi: 'Nốt dựa nhảy đến rồi đi liền bậc, theo bất kỳ hướng nào.',
        en: 'An appoggiatura is leapt to and left by step, in either direction.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm là {G} {B} {D}. Nốt {E5} là nốt gì?', en: 'The chord is {G} {B} {D}. What is the {E5}?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+D3+G3+D5:q G2+D3+G3+E5:q G2+D3+G3+D5:h' },
        { type: 'play', notes: 'G2+D3+G3+D5:q G2+D3+G3+E5:q G2+D3+G3+D5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt thêu', en: 'A neighbor tone' }, correct: true },
          { text: { vi: 'Nốt lướt', en: 'A passing tone' } },
          { text: { vi: 'Nốt thoát', en: 'An escape tone' } },
        ],
      },
      reason: {
        vi: '{E5} đi liền bậc lên từ {D5} rồi quay về {D5}, nên nó là nốt thêu trên.',
        en: '{E5} steps up from {D5} and returns to {D5}, so it is an upper neighbor.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, đây là nốt treo nào?', en: 'In {G} major, which suspension is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', time: '2/4', notes: 'G2+D3+G3+G4:h | D3+A3+D4@b+G4:q D3+A3+D4@b+F#4:q ||' },
        { type: 'play', notes: 'G2+D3+G3+G4:h D3+A3+D4+G4:q D3+A3+D4+F#4:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '9–8', en: '9–8' } },
          { text: { vi: '7–6', en: '7–6' } },
          { text: { vi: '4–3', en: '4–3' }, correct: true },
        ],
      },
      reason: {
        vi: 'Trên bass {D}, {G} là quãng 4 (rút gọn từ quãng 11) và {F#} là quãng 3.',
        en: 'Over the bass {D}, {G} is a fourth (reduced from an 11th) and {F#} a third.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {F} trưởng, hợp âm I là {F} {A} {C}. Nốt lướt giữa {A4} và {C5} là nốt gì?',
        en: 'In {F} major the I chord is {F} {A} {C}. What is the passing tone between {A4} and {C5}?',
      },
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Bậc giữa {A} và {C} trong gam {F} trưởng là {Bb}, bậc 4 của giọng.',
        en: 'The degree between {A} and {C} in {F} major is {Bb}, the fourth degree.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, nốt {F4} cuối ô nhịp 1 là nốt gì?', en: 'In {F} major, what is the {F4} at the end of measure 1?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'F', time: '2/4', notes: 'C3+E3+G3+G4:q C3+E3+G3+E4:8 C3+E3+G3+F4:8 | F2+C3+A3+F4:h ||' },
        { type: 'play', notes: 'C3+E3+G3+G4:q C3+E3+G3+E4:8 C3+E3+G3+F4:8 F2+C3+A3+F4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt treo', en: 'A suspension' } },
          { text: { vi: 'Nốt thoát', en: 'An escape tone' } },
          { text: { vi: 'Nốt đón trước', en: 'An anticipation' }, correct: true },
        ],
      },
      reason: {
        vi: '{F4} không thuộc hợp âm V ({C} {E} {G}), đến liền bậc từ {E4} và được giữ sang hợp âm I: đó là nốt đón trước.',
        en: '{F4} is not in the V chord ({C} {E} {G}), is approached by step from {E4} and repeated over I: an anticipation.',
      },
    },
  ],
} satisfies Lesson
