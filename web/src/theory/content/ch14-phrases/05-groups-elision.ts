import type { Lesson } from '@/theory/types'

/**
 * Book 13.6: phrase groups and phrase chains (final cadence a half cadence);
 * 13.7: the elision; 13.8's summary table is the recap. Our own phrases in
 * place of the book's Couperin, Beethoven and Mozart excerpts. No practice link.
 */
const GROUP_A = 'C4:q E4:q G4:q E4:q | F4:q D4:q E4:h ||'
const GROUP_A2 = 'C4:q E4:q G4:q E4:q | F4:q A4:q G4:h ||'
const CHAIN_A = 'G4:q E4:q C4:q E4:q | D4:q B3:q C4:h ||'
const CHAIN_B = 'A4:q. G4:8 F4:q E4:q | D4:q F4:q B3:h ||'
const ELISION = 'E4:h G4:h | F4:q D4:q B3:h | C4:q E4:q G4:q E4:q | F4:q D4:q B3:q D4:q | C4:w ||'

export default {
  id: 'groups-elision',
  title: { vi: 'Nhóm câu, chuỗi câu, gối câu', en: 'Phrase groups, chains and elisions' },
  minutes: 4,
  sources: [
    { section: '13.6', url: 'https://musictheory.pugetsound.edu/mt21c/PhraseGroupsAndPhraseChains.html' },
    { section: '13.7', url: 'https://musictheory.pugetsound.edu/mt21c/Elision.html' },
    { section: '13.8', url: 'https://musictheory.pugetsound.edu/mt21c/SummaryOfPhrasesInCombination.html' },
  ],
  recap: [
    { vi: 'Đoạn nhạc: câu cuối kết trọn hơn câu đầu', en: 'A period: the last phrase is more conclusive than the first' },
    { vi: 'Nhóm câu a a′ kết lửng ở cuối', en: 'A phrase group a a′ ends with a half cadence' },
    { vi: 'Chuỗi câu a b (c) kết lửng ở cuối', en: 'A phrase chain a b (c) ends with a half cadence' },
    { vi: 'Gối câu: ô cuối của câu này là ô đầu của câu sau', en: 'An elision: the last measure of one phrase is the first of the next' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nhóm câu', en: 'The phrase group' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhóm câu và chuỗi câu không phải đoạn nhạc: câu cuối của chúng kết lửng. **Nhóm câu** (phrase group) gồm ít nhất hai câu mở đầu giống nhau, câu cuối kết lửng.',
            en: 'Phrase groups and phrase chains are not periods: their final cadence is a half cadence. A **phrase group** has at least two phrases that begin similarly, the last ending with a half cadence.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: GROUP_A, labels: ['a', '', '', '', '', '', 'IAC'] },
        { type: 'staff', clef: 'treble', time: '4/4', notes: GROUP_A2, labels: ['a′', '', '', '', '', '', 'HC'] },
        { type: 'play', notes: `${GROUP_A} ${GROUP_A2}`, bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Vì sao a (IAC) a′ (HC) không phải đoạn nhạc?', en: 'Why is a (IAC) a′ (HC) not a period?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Câu cuối kết lửng', en: 'The last phrase ends with a half cadence' }, correct: true },
          { text: { vi: 'Hai câu mở đầu giống nhau', en: 'Both phrases begin alike' } },
          { text: { vi: 'Chỉ có hai câu', en: 'There are only two phrases' } },
        ],
      },
      reason: {
        vi: 'Ở đoạn nhạc, câu cuối kết trọn hơn câu đầu; ở đây câu cuối kết lửng, kém trọn hơn IAC.',
        en: 'In a period the last phrase is more conclusive than the first; here it ends with a half cadence, less conclusive than the IAC.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chuỗi câu', en: 'The phrase chain' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chuỗi câu** (phrase chain) cũng kết lửng ở cuối, nhưng các câu có giai điệu tương phản: a b, hoặc a b c.',
            en: 'A **phrase chain** also ends with a half cadence, but its phrases have contrasting melodies: a b, or a b c.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: CHAIN_A, labels: ['a', '', '', '', '', '', 'PAC'] },
        { type: 'staff', clef: 'treble', time: '4/4', notes: CHAIN_B, labels: ['b', '', '', '', '', '', 'HC'] },
        { type: 'play', notes: `${CHAIN_A} ${CHAIN_B}`, bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'a (PAC) rồi b (HC): đây là gì?', en: 'a (PAC), then b (HC): what is this?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn nhạc tương phản', en: 'A contrasting period' } },
          { text: { vi: 'Nhóm câu', en: 'A phrase group' } },
          { text: { vi: 'Chuỗi câu', en: 'A phrase chain' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai câu mở đầu khác nhau và câu cuối kết lửng, nên đó là chuỗi câu, không phải đoạn nhạc.',
        en: 'The phrases begin differently and the last ends with a half cadence, so it is a phrase chain, not a period.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Gối câu', en: 'The elision' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Gối câu** (elision) nối hai câu chồng lên nhau: ô nhịp cuối của câu này cũng là ô nhịp đầu của câu sau.',
            en: 'An **elision** joins two phrases by overlapping them: the last measure of one phrase is also the first measure of the next.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt {C4} màu xanh vừa kết câu 1 bằng PAC, vừa mở đầu câu 2.',
            en: 'The blue {C4} ends phrase 1 with a PAC and begins phrase 2 at the same time.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: ELISION,
          labels: ['1', '', '', '', '', 'PAC\n2', '', '', '', '', '', '', '', 'PAC'],
          highlight: [5],
        },
        { type: 'play', notes: 'E4:h G4:h | F4:q D4:q G2+B3:h | C3+C4:q E4:q G4:q E4:q | F4:q D4:q G2+B3:q D4:q | C3+C4:w', bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở chỗ gối câu, ô nhịp cuối của câu 1 là gì?', en: 'In an elision, what is the last measure of phrase 1?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ô nhịp đầu của câu 2', en: 'The first measure of phrase 2' }, correct: true },
          { text: { vi: 'Một ô nhịp nghỉ', en: 'A measure of rest' } },
          { text: { vi: 'Ô nhịp đầu của câu 1, nhắc lại', en: 'The first measure of phrase 1, repeated' } },
        ],
      },
      reason: {
        vi: 'Hai câu chồng lên nhau ở đúng một ô nhịp: ô kết câu 1 cũng là ô mở câu 2.',
        en: 'The phrases overlap by one measure: the cadence measure of phrase 1 is also the opening measure of phrase 2.',
      },
    },
  ],
} satisfies Lesson
