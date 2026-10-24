import type { Lesson } from '@/theory/types'

/**
 * Book 13.4: the asymmetrical period; 13.5: the double period, its cadence
 * schemes, and the repeated period. Our own phrases and cadences in place of
 * the book's Chopin and Beethoven excerpts. No practice link.
 */
const IAC = 'G2+G3+B3+D4:h C3+G3+C4+E4:h'
const HC = 'C3+E4+G4+C5:h G2+D4+G4+B4:h'
const PAC = 'G2+D4+G4+B4:h C3+E4+G4+C5:h'
const A = 'E4:q G4:q C5:q B4:q | A4:q F4:q D4:h ||'
const B = 'C5:q A4:q F4:q D4:q | E4:q D4:q C4:h ||'

export default {
  id: 'longer-periods',
  title: { vi: 'Đoạn nhạc bất đối xứng và đoạn nhạc kép', en: 'Asymmetrical and double periods' },
  minutes: 4,
  sources: [
    { section: '13.4', url: 'https://musictheory.pugetsound.edu/mt21c/AsymmetricalPeriod.html' },
    { section: '13.5', url: 'https://musictheory.pugetsound.edu/mt21c/DoublePeriodForm.html' },
  ],
  recap: [
    { vi: 'Đoạn nhạc bất đối xứng có ba hoặc năm câu', en: 'An asymmetrical period has three or five phrases' },
    { vi: 'Đoạn nhạc kép: nhóm câu hỏi rồi nhóm câu đáp', en: 'A double period: an antecedent group, then a consequent group' },
    { vi: 'a b a b′ là đoạn nhạc kép song song', en: 'a b a b′ is a parallel double period' },
    { vi: 'Câu 2 kết trọn: đó là đoạn nhạc lặp lại', en: 'Phrase 2 ends conclusively: it is a repeated period' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đoạn nhạc bất đối xứng', en: 'The asymmetrical period' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đoạn nhạc bất đối xứng** (asymmetrical period) có ba hoặc năm câu, nên số câu hỏi và câu đáp không đều. Câu cuối vẫn kết trọn nhất.',
            en: 'An **asymmetrical period** has three or five phrases, so the antecedents and consequents are unequal in number. The last phrase still has the most conclusive cadence.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây có một câu hỏi a (HC) và hai câu đáp b (PAC): sơ đồ a b b. Câu b được nhắc lại.',
            en: 'Here there is one antecedent a (HC) and two consequents b (PAC): the scheme a b b. Phrase b is heard twice.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: A, labels: ['a', '', '', '', '', '', 'HC'] },
        { type: 'staff', clef: 'treble', time: '4/4', notes: B, labels: ['b', '', '', '', '', '', 'PAC'] },
        { type: 'play', notes: `${A} ${B} ${B}`, bpm: 100, label: { vi: 'Nghe a b b', en: 'Hear a b b' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Sơ đồ a (HC) b (PAC) b (PAC) có mấy câu hỏi và mấy câu đáp?',
        en: 'How many antecedents and consequents are in a (HC) b (PAC) b (PAC)?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '1 câu hỏi, 2 câu đáp', en: '1 antecedent, 2 consequents' }, correct: true },
          { text: { vi: '2 câu hỏi, 1 câu đáp', en: '2 antecedents, 1 consequent' } },
          { text: { vi: '1 câu hỏi, 1 câu đáp', en: '1 antecedent, 1 consequent' } },
        ],
      },
      reason: {
        vi: 'Chỉ câu a kết chưa trọn; cả hai câu b kết PAC và trả lời nó, nên số câu không cân.',
        en: 'Only phrase a ends inconclusively; both b phrases end with a PAC and answer it, so the numbers are unequal.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đoạn nhạc kép', en: 'The double period' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đoạn nhạc kép** (double period) có ít nhất bốn câu: hai câu đầu là nhóm câu hỏi, hai câu cuối là nhóm câu đáp. Kết cuối trả lời kết chưa trọn ở cuối nhóm câu hỏi.',
            en: 'A **double period** has at least four phrases: the first two are the antecedent group, the last two the consequent group. Its final cadence answers the less conclusive cadence that ends the antecedent group.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mẫu hay gặp là a b a b′, gọi là **đoạn nhạc kép song song** (parallel double period). Các mẫu kết thường gặp: HC–HC–HC–PAC, IAC–IAC–IAC–PAC, IAC–HC–IAC–PAC.',
            en: 'A common scheme is a b a b′, a **parallel double period**. Typical cadence schemes: HC–HC–HC–PAC, IAC–IAC–IAC–PAC, IAC–HC–IAC–PAC.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'G2+G3+B3+D4 C3+G3+C4+E4 | C3+E4+G4+C5 G2+D4+G4+B4 | G2+G3+B3+D4 C3+G3+C4+E4 | G2+D4+G4+B4 C3+E4+G4+C5 ||',
          labels: ['', 'IAC', '', 'HC', '', 'IAC', '', 'PAC'],
        },
        { type: 'play', notes: `${IAC} R:h ${HC} R:h ${IAC} R:h ${PAC}`, label: { vi: 'Nghe bốn kết', en: 'Hear the four cadences' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Mẫu kết nào hợp với một đoạn nhạc kép?', en: 'Which cadence scheme fits a double period?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IAC–PAC–IAC–HC', en: 'IAC–PAC–IAC–HC' } },
          { text: { vi: 'IAC–HC–IAC–PAC', en: 'IAC–HC–IAC–PAC' }, correct: true },
          { text: { vi: 'HC–HC–HC–HC', en: 'HC–HC–HC–HC' } },
        ],
      },
      reason: {
        vi: 'Nhóm câu hỏi kết bằng HC, và PAC ở cuối trả lời nó; hai mẫu kia không kết trọn ở cuối.',
        en: 'The antecedent group ends with a HC and the final PAC answers it; the other two do not end conclusively.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đoạn nhạc lặp lại', en: 'The repeated period' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bốn câu chưa chắc đã là đoạn nhạc kép. Nếu câu 2 đã kết trọn, thì đó là một đoạn nhạc hai câu được nhắc lại: **đoạn nhạc lặp lại** (repeated period).',
            en: 'Four phrases are not always a double period. If phrase 2 already ends conclusively, it is a two-phrase period heard twice: a **repeated period**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Lặp lại: HC–PAC–HC–PAC. Kép: IAC–HC–IAC–PAC. Hãy nhìn kết sau câu 2.',
            en: 'Repeated: HC–PAC–HC–PAC. Double: IAC–HC–IAC–PAC. Look at the cadence after phrase 2.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 G2+D4+G4+B4 | G2+D4+G4+B4 C3+E4+G4+C5 | C3+E4+G4+C5 G2+D4+G4+B4 | G2+D4+G4+B4 C3+E4+G4+C5 ||',
          labels: ['', 'HC', '', 'PAC', '', 'HC', '', 'PAC'],
          highlight: [3],
        },
        { type: 'play', notes: `${HC} R:h ${PAC} R:h ${HC} R:h ${PAC}`, label: { vi: 'Nghe bốn kết', en: 'Hear the four cadences' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bốn câu a (HC) a′ (PAC) a (HC) a′ (PAC) tạo thành gì?', en: 'What do the four phrases a (HC) a′ (PAC) a (HC) a′ (PAC) make?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc kép', en: 'A double period' } },
          { text: { vi: 'Đoạn nhạc lặp lại', en: 'A repeated period' }, correct: true },
          { text: { vi: 'Đoạn nhạc bất đối xứng', en: 'An asymmetrical period' } },
        ],
      },
      reason: {
        vi: 'Câu 2 đã kết PAC, nên a a′ là một đoạn nhạc trọn vẹn, rồi được nhắc lại.',
        en: 'Phrase 2 already ends with a PAC, so a a′ is a complete period, then heard again.',
      },
    },
  ],
} satisfies Lesson
