import type { Lesson } from '@/theory/types'

/** Book 33.3: prime form (transpose to 0, invert, compare), T and E, its use, segmentation. Our own sets. */
export default {
  id: 'prime-form',
  title: { vi: 'Dạng nguyên mẫu', en: 'Prime form' },
  minutes: 5,
  sources: [{ section: '33.3', url: 'https://musictheory.pugetsound.edu/mt21c/PrimeForm.html' }],
  recap: [
    { vi: 'Dạng nguyên mẫu luôn bắt đầu bằng 0', en: 'Prime form always starts on 0' },
    { vi: 'Chuyển dạng chuẩn về 0, rồi đảo nó và chuyển về 0 lần nữa', en: 'Transpose the normal form to 0, then invert it and transpose that to 0 too' },
    { vi: 'Dạng có số áp chót nhỏ hơn là dạng nguyên mẫu', en: 'The one with the smaller second-to-last number is the prime form' },
    { vi: 'Viết trong ngoặc tròn, không dấu phẩy: (014), với T = 10, E = 11', en: 'Written in parentheses with no commas: (014), with T = 10 and E = 11' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Dạng cốt lõi của tập hợp', en: 'A set’s essential form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dạng chuẩn giữ đúng các nốt trong bản nhạc. **Dạng nguyên mẫu** (prime form) là dạng cốt lõi, giống như hợp âm {Eb} trưởng thế đảo 2 vẫn thuộc loại “hợp âm trưởng”.',
            en: 'Normal form keeps the exact notes of the music. **Prime form** is the essential form, much as an {Eb} major triad in second inversion still belongs to the category “major triad”.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mọi dạng nguyên mẫu đều bắt đầu bằng 0 ({C}). Nó viết trong ngoặc tròn, không dấu phẩy, như (014); 10 viết là T và 11 là E, như (013568T).',
            en: 'Every prime form starts on 0 ({C}). It is written in parentheses with no commas, like (014); 10 is written T and 11 is E, as in (013568T).',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Chuyển về 0', en: 'Transpose to 0' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Lấy dạng chuẩn, ví dụ [7, 10, 11] của {G} {Bb} {B}. Trừ số đầu khỏi mọi số để tập hợp bắt đầu bằng 0: 0, 3, 4.',
            en: 'Take the normal form, for example [7, 10, 11] for {G} {Bb} {B}. Subtract the first number from every number so the set starts on 0: 0, 3, 4.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4 Bb4 B4 | C4 Eb4 E4', labels: ['7', '10', '11', '0', '3', '4'] },
        { type: 'play', notes: 'G4 Bb4 B4 C4 Eb4 E4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Chuyển [10, 0, 3] về 0, ta được gì?', en: 'Transposed to 0, what does [10, 0, 3] become?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '0, 2, 5', en: '0, 2, 5' }, correct: true },
          { text: { vi: '0, 3, 5', en: '0, 3, 5' } },
          { text: { vi: '0, 2, 7', en: '0, 2, 7' } },
        ],
      },
      reason: {
        vi: 'Trừ 10 theo modulo 12: 10 thành 0, 0 thành 2, 3 thành 5.',
        en: 'Subtract 10 modulo 12: 10 becomes 0, 0 becomes 2 and 3 becomes 5.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đảo rồi so sánh', en: 'Invert, then compare' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đảo 0, 3, 4: hướng lên thành hướng xuống, mỗi số n thành 12 − n, được 0, 9, 8. Xếp gọn nhất là 8, 9, 0, chuyển về 0 được 0, 1, 4.',
            en: 'Invert 0, 3, 4: what went up now goes down, each n becomes 12 − n, giving 0, 9, 8. Its most compact ordering is 8, 9, 0, which transposed to 0 is 0, 1, 4.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'So hai dạng (034) và (014): dạng có số áp chót nhỏ hơn thì gọn hơn. Vậy dạng nguyên mẫu là (014).',
            en: 'Compare (034) and (014): the one with the smaller second-to-last number is more compact. So the prime form is (014).',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 Eb4 E4 | C4 C#4 E4', labels: ['0', '3', '4', '0', '1', '4'] },
        { type: 'play', notes: 'C4 Eb4 E4 C4 C#4 E4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng nguyên mẫu của tập hợp này là gì?', en: 'What is the prime form of this set?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4 Bb4 D5', labels: ['9', '10', '2'] },
        { type: 'play', notes: 'A4 Bb4 D5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '(015)', en: '(015)' }, correct: true },
          { text: { vi: '(045)', en: '(045)' } },
          { text: { vi: '(014)', en: '(014)' } },
        ],
      },
      reason: {
        vi: '[9, 10, 2] về 0 là (015); bản đảo cho (045), số áp chót 4 lớn hơn 1, nên chọn (015).',
        en: '[9, 10, 2] at 0 is (015); its inversion gives (045), whose second-to-last 4 is larger than 1, so (015) wins.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm mối liên hệ', en: 'Finding relationships' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai hợp âm này trông khác nhau, nhưng [7, 10, 11] và [10, 1, 2] đều có dạng nguyên mẫu (014). Dạng nguyên mẫu cho thấy những liên hệ khó nhìn ra trên bề mặt bản nhạc.',
            en: 'These two chords look different, but [7, 10, 11] and [10, 1, 2] both have the prime form (014). Prime form can show relationships that are hard to see on the surface of the music.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Phân đoạn** (segmentation) là chọn nốt nào gộp thành một tập hợp: thường là các nốt vang cùng lúc, hoặc các nốt của một nét giai điệu.',
            en: '**Segmentation** is choosing which notes to group into a set: usually notes sounding together as a chord, or the notes of a melodic line.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4+Bb4+B4 D4+Bb4+Db5' },
        { type: 'play', notes: 'G4+Bb4+B4 D4+Bb4+Db5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dạng nguyên mẫu 0, 2, 4, 6, 8, 10 viết thế nào?', en: 'How is the prime form 0, 2, 4, 6, 8, 10 written?' },
      blocks: [
        { type: 'keys', notes: 'C4 D4 E4 F#4 G#4 A#4' },
        { type: 'play', notes: 'C4 D4 E4 F#4 G#4 A#4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '[0, 2, 4, 6, 8, 10]', en: '[0, 2, 4, 6, 8, 10]' } },
          { text: { vi: '(0246810)', en: '(0246810)' } },
          { text: { vi: '(02468T)', en: '(02468T)' }, correct: true },
        ],
      },
      reason: {
        vi: 'Dạng nguyên mẫu viết trong ngoặc tròn, không dấu phẩy, và 10 viết là T.',
        en: 'Prime form goes in parentheses with no commas, and 10 is written T.',
      },
    },
  ],
} satisfies Lesson
