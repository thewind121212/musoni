import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (28.4). Its three
 * exercises ask the reader to write non-chord tones into progressions; here
 * the same decisions become checks: spot a parallel, pick the right
 * non-chord tone for a voice's motion, name a suspension, in C, G and F major.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 29', en: 'Chapter 29 review' },
  minutes: 4,
  sources: [{ section: '28.4', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingNCTsPracticeExercises.html' }],
  recap: [
    { vi: 'Chọn nốt ngoài hợp âm theo cách bè đi: lặp, liền bậc, nhảy', en: 'Choose a non-chord tone by how the voice moves: repeat, step, leap' },
    { vi: 'Kiểm tra quãng 5 song song và quãng 8 song song', en: 'Check for parallel fifths and octaves' },
    { vi: 'Nhiều bè cùng một phách: song song quãng 3, 6, hoặc đi so le', en: 'Several voices on one beat: parallel thirds or sixths, or staggered' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Bè soprano có nốt thêu dưới {D5}. Có lỗi gì không?', en: 'The soprano has the lower neighbor {D5}. Is there a fault?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+C4@b+G4+E5:8 C3+C4@b+G4+D5:8 A2+C4@b+A4+E5:q ||', labels: ['I', 'N', 'vi'] },
        { type: 'play', notes: 'C3+C4@b+G4+E5:8 C3+C4@b+G4+D5:8 A2+C4@b+A4+E5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 song song với bè alto', en: 'Parallel fifths with the alto' }, correct: true },
          { text: { vi: 'Quãng 8 song song với bè bass', en: 'Parallel octaves with the bass' } },
          { text: { vi: 'Không có lỗi', en: 'No fault' } },
        ],
      },
      reason: {
        vi: 'Alto {G4} và soprano {D5} cách quãng 5, rồi alto lên {A4}, soprano lên {E5}, lại một quãng 5.',
        en: 'The alto {G4} and the soprano {D5} are a fifth apart, then the alto moves to {A4} and the soprano to {E5}, another fifth.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bè tenor đi xuống {A3}–{G3}, từ IV sang V. Nốt lướt biến âm ở giữa là nốt nào?',
        en: 'The tenor steps down {A3}–{G3}, from IV to V. Which chromatic passing tone goes between?',
      },
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Nguyên cung {A3}–{G3} có một nửa cung ở giữa: {Ab3}.',
        en: 'The whole step {A3}–{G3} has one half step between: {Ab3}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bè bass nhảy quãng 4, từ {G2} lên {C3}. Nên thêm gì?', en: 'The bass leaps up a fourth, from {G2} to {C3}. What should you add?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt lướt', en: 'A passing tone' } },
          { text: { vi: 'Nốt dựa', en: 'An appoggiatura' } },
          { text: { vi: 'Tạm để nguyên', en: 'Nothing, for now' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bước nhảy từ quãng 4 trở lên thì tạm thời không trang trí.',
        en: 'Leaps of a fourth or more are not embellished, for now.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt {G4} ở bè alto, nửa sau phách 1, là nốt gì?', en: 'What is the alto’s {G4} in the second half of beat 1?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', time: '2/4', notes: 'D3+A3+F#4+D5:8 D3+A3+G4+D5:8 G2+B3+G4+D5:q ||', labels: ['V', '', 'I'] },
        { type: 'play', notes: 'D3+A3+F#4+D5:8 D3+A3+G4+D5:8 G2+B3+G4+D5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt đón trước', en: 'An anticipation' }, correct: true },
          { text: { vi: 'Nốt dựa', en: 'An appoggiatura' } },
          { text: { vi: 'Nốt treo', en: 'A suspension' } },
        ],
      },
      reason: {
        vi: '{G4} thuộc hợp âm I và vang sớm trên V, rồi giữ nguyên khi I đến.',
        en: '{G4} belongs to the I chord and sounds early over V, then stays when I arrives.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {G} trưởng, bè soprano đi xuống {D5}–{C5}. Muốn thêm nốt thoát, nốt đó là nốt nào?',
        en: 'In {G} major, the soprano steps down {D5}–{C5}. To add an escape tone, which note is it?',
      },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Nốt thoát đi liền bậc ngược hướng, lên {E5}, rồi nhảy xuống {C5}.',
        en: 'The escape tone steps the other way, up to {E5}, then leaps down to {C5}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là nốt treo nào?', en: 'Which suspension is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'F', time: '2/4', notes: 'F3+C4@b+A4+F5:q C3+C4@b+G4+F5:8 C3+C4@b+G4+E5:8 ||', labels: ['I', 'V', ''] },
        { type: 'play', notes: 'F3+C4@b+A4+F5:q C3+C4@b+G4+F5:8 C3+C4@b+G4+E5:q.' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '4–3', en: '4–3' }, correct: true },
          { text: { vi: '9–8', en: '9–8' } },
          { text: { vi: '7–6', en: '7–6' } },
        ],
      },
      reason: {
        vi: 'Trên bass {C3}, {F5} là quãng 4 (đã rút gọn), rồi xuống {E5}, quãng 3.',
        en: 'Above the bass {C3}, {F5} is a fourth (reduced), then it steps down to {E5}, a third.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {G} trưởng, bè alto đi lên {F#4}–{G4} từ V sang I. Nốt dựa trên phách của I là nốt nào?',
        en: 'In {G} major, the alto steps up {F#4}–{G4} from V to I. Which appoggiatura goes on the beat of I?',
      },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Nốt dựa vượt nốt đích {G4} một bậc, tức {A4}, rồi đi xuống {G4} sau phách.',
        en: 'The appoggiatura goes one step past the goal {G4}, to {A4}, then steps down to {G4} after the beat.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Soprano và alto có nốt lướt trên cùng một phách, song song cách nhau quãng 3. Có ổn không?',
        en: 'The soprano and alto have passing tones on the same beat, moving in parallel thirds. Is that fine?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ổn', en: 'Yes' }, correct: true },
          { text: { vi: 'Không, phải đi so le', en: 'No, they must be staggered' } },
        ],
      },
      reason: {
        vi: 'Nốt ngoài hợp âm ở hai bè cùng một phách thì được, nếu chúng song song quãng 3 hoặc quãng 6.',
        en: 'Non-chord tones in two voices on one beat are fine when they move in parallel thirds or sixths.',
      },
    },
  ],
} satisfies Lesson
