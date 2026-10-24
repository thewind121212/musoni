import type { Lesson } from '@/theory/types'

/**
 * Book 13.3: conclusive and inconclusive cadences, the period, antecedent and
 * consequent, parallel and contrasting periods, the repeated phrase. The
 * parallel period is the opening of Beethoven's "Ode to Joy" (Symphony No. 9,
 * 1824, public domain), moved to C major; the contrasting one is our own.
 * No practice link.
 */
const ODE_A = 'E4:q E4:q F4:q G4:q | G4:q F4:q E4:q D4:q | C4:q C4:q D4:q E4:q | E4:q. D4:8 D4:h ||'
const ODE_B = 'E4:q E4:q F4:q G4:q | G4:q F4:q E4:q D4:q | C4:q C4:q D4:q E4:q | D4:q. C4:8 C4:h ||'
/** One label per note of a 15-note phrase: its number under the first, its cadence under the last. */
const PHRASE_LABELS = (first: string, cadence: string) => [first, ...Array<string>(13).fill(''), cadence]

export default {
  id: 'period',
  title: { vi: 'Đoạn nhạc', en: 'The period' },
  minutes: 5,
  sources: [{ section: '13.3', url: 'https://musictheory.pugetsound.edu/mt21c/PeriodForm.html' }],
  recap: [
    { vi: 'Đoạn nhạc: câu cuối kết trọn hơn câu đầu', en: 'A period: the last phrase ends with a more conclusive cadence' },
    { vi: 'Câu hỏi kết chưa trọn, câu đáp kết trọn hơn', en: 'The antecedent ends less conclusively, the consequent more' },
    { vi: 'Song song a a′, tương phản a b', en: 'Parallel a a′, contrasting a b' },
    { vi: 'Câu lặp lại a a không phải đoạn nhạc', en: 'A repeated phrase a a is not a period' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Kết trọn và kết chưa trọn', en: 'Conclusive and inconclusive cadences' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết trọn** (conclusive cadence) dừng trên hợp âm I: kết chính và kết phụ. **Kết chưa trọn** (inconclusive cadence) thì không: kết lửng dừng trên V, kết đánh lừa đi V–vi.',
            en: 'A **conclusive cadence** ends on the tonic chord: the authentic and plagal cadences. An **inconclusive cadence** does not: the half cadence stops on V, the deceptive cadence goes V–vi.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong kết chính, kết chính hoàn toàn (PAC) trọn hơn kết chính không hoàn toàn (IAC).',
            en: 'Among authentic cadences, the PAC is more conclusive than the IAC.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5 G2+D4+G4+B4 || G2+D4+G4+B4 C3+E4+G4+C5', labels: ['I', 'V', 'V', 'I'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h G2+D4+G4+B4:h R:h G2+D4+G4+B4:h C3+E4+G4+C5:w', label: { vi: 'Nghe kết lửng, rồi PAC', en: 'Hear a HC, then a PAC' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Kết nào là kết trọn?', en: 'Which cadence is conclusive?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết lửng', en: 'Half cadence' } },
          { text: { vi: 'Kết đánh lừa', en: 'Deceptive cadence' } },
          { text: { vi: 'Kết phụ', en: 'Plagal cadence' }, correct: true },
        ],
      },
      reason: {
        vi: 'Kết phụ IV–I dừng trên hợp âm I; kết lửng và kết đánh lừa thì không.',
        en: 'The plagal cadence IV–I ends on the tonic chord; the half and deceptive cadences do not.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Câu hỏi và câu đáp', en: 'Antecedent and consequent' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đoạn nhạc** (period) gồm ít nhất hai câu nhạc, câu cuối kết trọn hơn câu đầu. Thường là kết lửng (HC) rồi kết chính (IAC hoặc PAC), hoặc IAC rồi PAC.',
            en: 'A **period** has at least two phrases, the last ending with a more conclusive cadence than the first. Usually a half cadence (HC) is followed by an authentic cadence (IAC or PAC), or an IAC by a PAC.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Câu kết chưa trọn hơn là **câu hỏi** (antecedent), câu kết trọn hơn là **câu đáp** (consequent). Đây là Khúc hoan ca của Beethoven: HC rồi PAC.',
            en: 'The phrase with the less conclusive cadence is the **antecedent**, the one with the more conclusive cadence the **consequent**. Here is Beethoven’s Ode to Joy: HC, then PAC.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: ODE_A, labels: PHRASE_LABELS('1', 'HC') },
        { type: 'staff', clef: 'treble', time: '4/4', notes: ODE_B, labels: PHRASE_LABELS('2', 'PAC') },
        { type: 'play', notes: `${ODE_A} ${ODE_B}`, bpm: 120, label: { vi: 'Nghe cả đoạn', en: 'Hear the period' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Câu 1 kết lửng, câu 2 kết chính hoàn toàn. Câu 2 là gì?',
        en: 'Phrase 1 ends with a HC, phrase 2 with a PAC. What is phrase 2?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Câu hỏi', en: 'The antecedent' } },
          { text: { vi: 'Câu đáp', en: 'The consequent' }, correct: true },
        ],
      },
      reason: {
        vi: 'Câu 2 kết trọn hơn, nên nó là câu đáp, trả lời câu hỏi kết lửng.',
        en: 'Phrase 2 has the more conclusive cadence, so it is the consequent, answering the half cadence.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Song song và tương phản', en: 'Parallel and contrasting' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai câu mở đầu giống nhau: **đoạn nhạc song song** (parallel period), viết a a′. Hai câu mở đầu khác nhau: **đoạn nhạc tương phản** (contrasting period), viết a b.',
            en: 'When both phrases begin alike, it is a **parallel period**, written a a′. When they begin differently, it is a **contrasting period**, written a b.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Dấu ′ (đọc là "phẩy") cho biết câu giống câu trước nhưng kết khác. Đoạn tương phản dưới đây do chúng tôi viết.',
            en: 'The mark ′ (“prime”) shows a phrase like an earlier one but with a different cadence. The contrasting period below is our own.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C5:q G4:q E4:q G4:q | F4:q E4:q D4:h | A4:q F4:q D4:q F4:q | E4:q D4:q C4:h ||',
          labels: ['a', '', '', '', '', '', 'HC', 'b', '', '', '', '', '', 'PAC'],
        },
        { type: 'play', notes: 'C5:q G4:q E4:q G4:q | F4:q E4:q D4:h | A4:q F4:q D4:q F4:q | E4:q D4:q C4:h', bpm: 100 },
        {
          type: 'tip',
          text: {
            vi: 'Cùng một câu xuất hiện hai lần với cùng một kết là **câu lặp lại** (repeated phrase), viết a a.',
            en: 'The same phrase heard twice, with the same cadence, is a **repeated phrase**, written a a.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn Khúc hoan ca ở trên là loại nào?', en: 'Which kind is the Ode to Joy period above?' },
      blocks: [{ type: 'play', notes: `${ODE_A} ${ODE_B}`, bpm: 120 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc song song (a a′)', en: 'Parallel period (a a′)' }, correct: true },
          { text: { vi: 'Đoạn nhạc tương phản (a b)', en: 'Contrasting period (a b)' } },
        ],
      },
      reason: {
        vi: 'Hai câu mở đầu bằng cùng ba ô nhịp, chỉ khác ở kết: HC rồi PAC.',
        en: 'Both phrases begin with the same three measures and differ only at the cadence: HC, then PAC.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một câu kết PAC, rồi đúng câu ấy lại kết PAC. Đây là gì?',
        en: 'A phrase ends with a PAC, then the same phrase ends with a PAC again. What is this?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc song song', en: 'A parallel period' } },
          { text: { vi: 'Câu lặp lại', en: 'A repeated phrase' }, correct: true },
          { text: { vi: 'Đoạn nhạc tương phản', en: 'A contrasting period' } },
        ],
      },
      reason: {
        vi: 'Câu sau không kết trọn hơn câu đầu, nên đây không phải đoạn nhạc mà là câu lặp lại, a a.',
        en: 'The second phrase is no more conclusive than the first, so it is not a period but a repeated phrase, a a.',
      },
    },
  ],
} satisfies Lesson
