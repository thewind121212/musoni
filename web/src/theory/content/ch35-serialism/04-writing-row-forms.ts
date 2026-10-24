import type { Lesson } from '@/theory/types'

/** Book 34.3-34.4: write a row form by transposing its form on 0; the twelve-tone matrix. */
export default {
  id: 'writing-row-forms',
  title: { vi: 'Viết dạng chuỗi và ma trận', en: 'Writing row forms and the matrix' },
  minutes: 5,
  sources: [
    { section: '34.3', url: 'https://musictheory.pugetsound.edu/mt21c/WritingRowForms.html' },
    { section: '34.4', url: 'https://musictheory.pugetsound.edu/mt21c/Serialism-6.html' },
  ],
  recap: [
    { vi: 'Viết bốn dạng từ {C}, rồi chuyển vị dạng cần tìm', en: 'Write the four forms on {C}, then transpose the one you need' },
    { vi: 'Chuyển vị: cộng cùng một số vào mọi nốt, bớt 12 khi vượt 11', en: 'To transpose, add the same number to every note, taking away 12 past 11' },
    { vi: 'Ma trận: P₀ ở hàng đầu, I₀ ở cột đầu, cả 48 dạng', en: 'The matrix: P₀ across the top, I₀ down the side, all 48 forms' },
    { vi: 'Hàng đọc ngược là R, cột đọc từ dưới lên là RI', en: 'A row read backward is R, a column read upward is RI' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Viết một dạng chuỗi', en: 'Writing a row form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Muốn viết một dạng chuỗi, trước hết viết cả bốn dạng từ {C}: P₀, R₀, I₀, RI₀. Rồi chuyển vị dạng cần viết: P và I sao cho nốt đầu đúng số, R và RI sao cho nốt cuối đúng số.',
            en: 'To write a row form, first write all four forms on {C}: P₀, R₀, I₀ and RI₀. Then transpose the one you need: P and I so the first note matches the number, R and RI so the last note does.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ví dụ, I₀ là 0 8 10 6 9 4 3 1 7 5 2 11. Để có I₉, chuyển I₀ lên 9 nửa cung (quãng 6 trưởng): cộng 9 vào mỗi số, bớt 12 khi vượt quá 11.',
            en: 'For example, I₀ is 0 8 10 6 9 4 3 1 7 5 2 11. For I₉, transpose I₀ up 9 half steps (a major 6th): add 9 to each number, taking away 12 when it passes 11.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'A4 F4 G4 Eb4 F#4 C#4 Cn4 Bb3 En4 D4 Bn3 Ab3',
          labels: ['9', '5', '7', '3', '6', '1', '0', '10', '4', '2', '11', '8'],
          highlight: [0],
        },
        { type: 'play', notes: 'A4 F4 G4 Eb4 F#4 C#4 C4 Bb3 E4 D4 B3 Ab3', label: { vi: 'Nghe I₉', en: 'Hear I₉' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'P₀ là 0 4 2 6 3 8 9 11 5 7 10 1. Dãy nào là P₂?', en: 'P₀ is 0 4 2 6 3 8 9 11 5 7 10 1. Which is P₂?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2 6 4 8 5 10 11 1 7 9 0 3', en: '2 6 4 8 5 10 11 1 7 9 0 3' }, correct: true },
          { text: { vi: '2 10 0 8 11 6 5 3 9 7 4 1', en: '2 10 0 8 11 6 5 3 9 7 4 1' } },
          { text: { vi: '3 0 9 7 1 11 10 5 8 4 6 2', en: '3 0 9 7 1 11 10 5 8 4 6 2' } },
        ],
      },
      reason: {
        vi: 'Cộng 2 vào mỗi số của P₀, và 11 + 2 = 13 thành 1.',
        en: 'Add 2 to each number of P₀, and 11 + 2 = 13 becomes 1.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Viết RI₅', en: 'Writing RI₅' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'RI₀ là 11 2 5 7 1 3 4 9 6 10 8 0. Để có RI₅, chuyển RI₀ lên 5 nửa cung (quãng 4 đúng), để nốt cuối là {F}.',
            en: 'RI₀ is 11 2 5 7 1 3 4 9 6 10 8 0. For RI₅, transpose RI₀ up 5 half steps (a perfect 4th), so the last note is {F}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'E4 G4 Bb4 C5 F#4 Ab4 An4 D5 Bn4 Eb5 C#5 Fn5',
          labels: ['4', '7', '10', '0', '6', '8', '9', '2', '11', '3', '1', '5'],
          highlight: [11],
        },
        { type: 'play', notes: 'E4 G4 Bb4 C5 F#4 Ab4 A4 D5 B4 Eb5 C#5 F5', label: { vi: 'Nghe RI₅', en: 'Hear RI₅' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'R₄ bắt đầu bằng nốt nào?', en: 'Which note does R₄ start on?' },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'R₄ là P₄ đọc ngược, và P₄ kết thúc bằng 1 + 4 = 5, tức {F}.',
        en: 'R₄ is P₄ backward, and P₄ ends on 1 + 4 = 5, which is {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ma trận mười hai âm', en: 'The twelve-tone matrix' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Ma trận mười hai âm** (twelve-tone matrix) xếp cả 48 dạng chuỗi vào một lưới 12 × 12. Hàng trên cùng là P₀, đọc từ trái sang phải; cột đầu là I₀, đọc từ trên xuống.',
            en: 'A **twelve-tone matrix** shows all 48 row forms in a 12-by-12 grid. The top row is P₀, read left to right; the left column is I₀, read top to bottom.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mỗi nốt của cột đầu mở một hàng P: hàng thứ hai là P₈. Đọc một hàng từ phải sang trái được R, đọc một cột từ dưới lên được RI.',
            en: 'Each note of the left column starts a P row: the second row is P₈. A row read right to left is an R form; a column read bottom to top is an RI form.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C5 Ab4 Bb4 F#4 An4 E4 Eb4 C#4 G4 Fn4 D4 Bn3',
          labels: ['P₀', 'P₈', 'P₁₀', 'P₆', 'P₉', 'P₄', 'P₃', 'P₁', 'P₇', 'P₅', 'P₂', 'P₁₁'],
        },
        { type: 'play', notes: 'C5 Ab4 Bb4 F#4 A4 E4 Eb4 C#4 G4 F4 D4 B3', label: { vi: 'Nghe cột đầu, I₀', en: 'Hear the left column, I₀' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Hàng thứ hai của ma trận là P₈. Đọc hàng đó từ phải sang trái được dạng nào?',
        en: 'The matrix’s second row is P₈. Read right to left, which form is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'P₈', en: 'P₈' } },
          { text: { vi: 'R₈', en: 'R₈' }, correct: true },
          { text: { vi: 'RI₈', en: 'RI₈' } },
        ],
      },
      reason: {
        vi: 'P₈ đọc ngược là R₈, vì nốt cuối của nó là {Ab} = 8, nốt đầu của P₈.',
        en: 'P₈ backward is R₈, since its last note is {Ab} = 8, the first note of P₈.',
      },
    },
  ],
} satisfies Lesson
