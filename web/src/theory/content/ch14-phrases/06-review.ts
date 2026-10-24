import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (13.9) on 13.1-13.8:
 * label cadences, spot a sentence, read the melodic letters and name the form.
 * The exercises' excerpts are replaced by their answer schemes and our own phrases.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 14', en: 'Chapter 14 review' },
  minutes: 4,
  sources: [{ section: '13.9', url: 'https://musictheory.pugetsound.edu/mt21c/PhrasesInCombinationPracticeExercises.html' }],
  recap: [
    { vi: 'PAC và IAC, kết trọn và kết chưa trọn', en: 'PAC and IAC, conclusive and inconclusive cadences' },
    { vi: 'Câu trình bày–phát triển và đoạn nhạc', en: 'The sentence and the period' },
    { vi: 'Đoạn nhạc kép, nhóm câu, chuỗi câu, gối câu', en: 'Double periods, phrase groups, chains and elisions' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {F} trưởng này kết bằng kết gì?', en: 'This phrase is in {F} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'F', notes: 'C3+C4+E4+G4 F2+C4+F4+A4', labels: ['V', 'I'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h F2+C4+F4+A4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'PAC', en: 'PAC' } },
          { text: { vi: 'IAC', en: 'IAC' }, correct: true },
          { text: { vi: 'HC', en: 'HC' } },
        ],
      },
      reason: {
        vi: 'V–I ở thế gốc, nhưng bè cao nhất là {A4}, bậc 3, nên kết không hoàn toàn.',
        en: 'V–I in root position, but the top voice is {A4}, scale degree 3, so the cadence is imperfect.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Kết chính hoàn toàn ở giọng {D} trưởng: bè cao nhất của hợp âm cuối là nốt gì?',
        en: 'A PAC in {D} major: what note is in the top voice of the last chord?',
      },
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'PAC cần chủ âm ở bè cao nhất của hợp âm I, và chủ âm của giọng {D} trưởng là {D}.',
        en: 'A PAC needs the tonic in the top voice of the I chord, and the tonic of {D} major is {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc này có phải câu trình bày–phát triển không?', en: 'Is this phrase a sentence?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q F4:q G4:h | E4:q F4:q G4:h | A4:q G4:q F4:q E4:q | D4:q E4:q C4:h ||' },
        { type: 'play', notes: 'E4:q F4:q G4:h | E4:q F4:q G4:h | A4:q G4:q F4:q E4:q | D4:q E4:q C4:h', bpm: 100 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có', en: 'Yes' }, correct: true },
          { text: { vi: 'Không', en: 'No' } },
        ],
      },
      reason: {
        vi: 'Ý nhạc ở ô 1 được lặp lại ở ô 2, rồi ô 3 và 4 dẫn đến kết.',
        en: 'The idea in measure 1 is repeated in measure 2, then measures 3 and 4 lead to the cadence.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe đoạn nhạc. Câu 1 kết bằng kết gì?', en: 'Listen to the period. Which cadence ends phrase 1?' },
      blocks: [
        {
          type: 'play',
          notes: 'C3+E4:q G4:q C5:q G4:q | F3+A4:q F4:q G2+D4:h | C3+E4:q G4:q C5:q G4:q | F3+A4:q G2+B3:q C3+C4:h',
          bpm: 100,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết lửng (HC)', en: 'Half cadence (HC)' }, correct: true },
          { text: { vi: 'Kết chính hoàn toàn (PAC)', en: 'Perfect authentic (PAC)' } },
          { text: { vi: 'Kết phụ', en: 'Plagal cadence' } },
        ],
      },
      reason: {
        vi: 'Câu 1 dừng trên V, nghe còn lửng; câu 2 mở đầu như câu 1 rồi kết PAC trên {C}.',
        en: 'Phrase 1 stops on V and sounds unfinished; phrase 2 begins like phrase 1, then ends with a PAC on {C}.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Câu 1 kết I–V, câu 2 kết V–I (PAC), hai câu mở đầu khác nhau. Đây là gì?',
        en: 'Phrase 1 ends I–V, phrase 2 ends V–I (PAC), and they begin differently. What is this?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc song song', en: 'A parallel period' } },
          { text: { vi: 'Đoạn nhạc tương phản', en: 'A contrasting period' }, correct: true },
          { text: { vi: 'Chuỗi câu', en: 'A phrase chain' } },
        ],
      },
      reason: {
        vi: 'HC rồi PAC là câu hỏi và câu đáp; mở đầu khác nhau nên sơ đồ là a b, đoạn nhạc tương phản.',
        en: 'HC then PAC is an antecedent and a consequent; different openings make the scheme a b, a contrasting period.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'IAC, HC, IAC, PAC với giai điệu a b a b′. Đây là gì?', en: 'IAC, HC, IAC, PAC with the melodies a b a b′. What is this?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc kép song song', en: 'A parallel double period' }, correct: true },
          { text: { vi: 'Đoạn nhạc lặp lại', en: 'A repeated period' } },
          { text: { vi: 'Đoạn nhạc bất đối xứng', en: 'An asymmetrical period' } },
        ],
      },
      reason: {
        vi: 'Nhóm câu hỏi a b kết HC, nhóm câu đáp a b′ mở đầu giống nó và kết PAC.',
        en: 'The antecedent group a b ends with a HC; the consequent group a b′ begins the same way and ends with a PAC.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong sơ đồ a a a a′, dấu ′ ở câu 4 cho biết gì?', en: 'In the scheme a a a a′, what does the prime on phrase 4 tell you?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Câu 4 giống câu a nhưng kết khác', en: 'Phrase 4 is like a but ends with a different cadence' }, correct: true },
          { text: { vi: 'Câu 4 là giai điệu mới', en: 'Phrase 4 is a new melody' } },
          { text: { vi: 'Câu 4 được chơi cao hơn', en: 'Phrase 4 is played higher' } },
        ],
      },
      reason: {
        vi: 'Dấu ′ chỉ dùng cho câu giống câu trước nhưng kết khác, ở đây là PAC sau ba lần HC.',
        en: 'The prime marks a phrase like an earlier one but with a different cadence, here a PAC after three HCs.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'a (IAC) a′ (HC): đây là gì?', en: 'a (IAC), a′ (HC): what is this?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc song song', en: 'A parallel period' } },
          { text: { vi: 'Nhóm câu', en: 'A phrase group' }, correct: true },
          { text: { vi: 'Câu lặp lại', en: 'A repeated phrase' } },
        ],
      },
      reason: {
        vi: 'Hai câu mở đầu giống nhau nhưng câu cuối kết lửng, nên đó là nhóm câu, không phải đoạn nhạc.',
        en: 'Both phrases begin alike but the last ends with a half cadence, so it is a phrase group, not a period.',
      },
    },
  ],
} satisfies Lesson
