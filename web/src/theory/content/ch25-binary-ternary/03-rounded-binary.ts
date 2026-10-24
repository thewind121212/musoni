import type { Lesson } from '@/theory/types'
import { OPEN_HC, OPEN_HOME, OPEN_TO_G, PEDAL, SIM_A, SIM_B, hear, tag } from './music'

/**
 * Book 24.4-24.5: rounded binary (the opening returns after a contrasting
 * phrase in the second section), its full name (two-reprise continuous
 * rounded binary), where it is found; then "simple" binary, which has neither
 * a balanced ending nor a return. The book's Mozart (K. 284, III), Schubert
 * (D. 41 No. 18) and Bach (BWV 808) figures are replaced by pieces of our own.
 * No practice link.
 */
export default {
  id: 'rounded-binary',
  title: { vi: 'Hai đoạn tái hiện và hai đoạn đơn giản', en: 'Rounded and simple binary' },
  minutes: 5,
  sources: [
    { section: '24.4', url: 'https://musictheory.pugetsound.edu/mt21c/RoundedBinary.html' },
    { section: '24.5', url: 'https://musictheory.pugetsound.edu/mt21c/SimpleBinary.html' },
  ],
  recap: [
    { vi: 'Tái hiện: ||: a a′ :||: b a″ :||', en: 'Rounded: ||: a a′ :||: b a″ :||' },
    { vi: 'Giai điệu mở đầu quay lại sau câu tương phản, thường ngắn hơn', en: 'The opening returns after a contrasting phrase, often shortened' },
    { vi: 'Hay gặp thời cổ điển: chủ đề biến tấu, minuet và trio', en: 'Common in the Classical era: variation themes, minuet and trio' },
    { vi: 'Đơn giản: không kết giống nhau, không tái hiện', en: 'Simple: no matching endings, no return' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **hai đoạn tái hiện** (rounded binary), đoạn B mở đầu bằng một câu tương phản, rồi phần mở đầu của đoạn A quay lại, thường ngắn hơn. Sơ đồ: ||: a a′ :||: b a″ :||.',
            en: 'In a **rounded binary**, the second section begins with a contrasting phrase, then the opening material of the first section returns, often shortened. Diagram: ||: a a′ :||: b a″ :||.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đây là đoạn A của chúng tôi: câu a kết lửng, câu a′ chuyển sang giọng {G} trưởng.',
            en: 'Here is our A section: phrase a ends with a half cadence, phrase a′ modulates to {G} major.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: OPEN_HC.notes, labels: tag(OPEN_HC.notes, 'a', 'HC') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${OPEN_TO_G.notes} ||`, labels: tag(OPEN_TO_G.notes, 'a′', '{G}') },
        { type: 'play', notes: hear(OPEN_HC, OPEN_TO_G), bpm: 140, label: { vi: 'Nghe đoạn A', en: 'Hear the A section' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Câu tương phản, rồi tái hiện', en: 'Contrast, then the return' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Câu b khác hẳn và dừng trên V. Rồi câu a quay lại, lần này kết chính hoàn toàn ở giọng {C} trưởng.',
            en: 'Phrase b contrasts and stops on V. Then phrase a returns, this time ending with a PAC in {C} major.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: PEDAL.notes, labels: tag(PEDAL.notes, 'b', 'HC') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${OPEN_HOME.notes} ||`, labels: tag(OPEN_HOME.notes, 'a″', 'PAC') },
        { type: 'play', notes: hear(PEDAL, OPEN_HOME), bpm: 140, label: { vi: 'Nghe đoạn B', en: 'Hear the B section' } },
        {
          type: 'tip',
          text: {
            vi: 'Dấu ″ cho biết câu a xuất hiện lần thứ ba, với một kết khác nữa.',
            en: 'The double prime ″ marks a third appearance of phrase a, with yet another cadence.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe cả bản. Ở đoạn B, điều gì làm hình thức thành tái hiện?', en: 'Listen to the whole piece. What in the B section makes the form rounded?' },
      blocks: [{ type: 'play', notes: hear(OPEN_HC, OPEN_TO_G, PEDAL, OPEN_HOME), bpm: 150 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Câu mở đầu quay lại sau câu b', en: 'The opening phrase returns after phrase b' }, correct: true },
          { text: { vi: 'Đoạn B kết ở giọng {G} trưởng', en: 'The B section ends in {G} major' } },
          { text: { vi: 'Đoạn B lặp đúng đoạn A', en: 'The B section repeats the A section exactly' } },
        ],
      },
      reason: {
        vi: 'Sau câu tương phản b, câu a quay lại và kết ở giọng chủ: đó là phần tái hiện.',
        en: 'After the contrasting phrase b, phrase a returns and ends in the home key: that is the rounding.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tên đầy đủ', en: 'The full name' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cả hai đoạn đều nhắc lại, và đoạn A kết ở giọng {G} trưởng, không trên hợp âm I. Vậy tên đầy đủ là: hai đoạn tái hiện liên tục, nhắc lại cả hai đoạn.',
            en: 'Both sections repeat, and the A section ends in {G} major, not on the tonic chord. So the full name is two-reprise continuous rounded binary.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hình thức này rất hay gặp thời cổ điển (1750–1825), ở Haydn, Mozart và Beethoven: chủ đề của bản biến tấu, phần minuet hay phần trio trong minuet và trio.',
            en: 'It is common in the Classical era (1750–1825), in Haydn, Mozart and Beethoven: the theme of a theme and variations, and the minuet or trio of a minuet and trio.',
          },
        },
        { type: 'play', notes: hear(OPEN_HC, OPEN_TO_G, OPEN_HC, OPEN_TO_G, PEDAL, OPEN_HOME, PEDAL, OPEN_HOME), bpm: 160, label: { vi: 'Nghe cả bản, có nhắc lại', en: 'Hear it all, with repeats' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn A kết chính hoàn toàn ở giọng chủ, cả hai đoạn nhắc lại, phần mở đầu quay lại trong đoạn B. Tên hình thức là gì?',
        en: 'The A section ends with a PAC in the home key, both sections repeat, and the opening returns in the B section. What is the form?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện khép kín, nhắc lại cả hai đoạn', en: 'Two-reprise sectional rounded binary' }, correct: true },
          { text: { vi: 'Hai đoạn tái hiện liên tục, nhắc lại cả hai đoạn', en: 'Two-reprise continuous rounded binary' } },
          { text: { vi: 'Hai đoạn cân bằng liên tục', en: 'Continuous balanced binary' } },
        ],
      },
      reason: {
        vi: 'Đoạn A kết trên hợp âm I nên là khép kín; phần mở đầu quay lại nên là tái hiện.',
        en: 'The A section ends on the tonic chord, so it is sectional; the opening returns, so it is rounded.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hai đoạn đơn giản', en: 'Simple binary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hai đoạn đơn giản** ("simple" binary) không có kết giống nhau như hai đoạn cân bằng, cũng không có tái hiện như hai đoạn tái hiện. Thường người ta chỉ gọi là hai đoạn.',
            en: 'A **"simple" binary** has neither the matching endings of a balanced binary nor the return of a rounded binary. It is usually just called binary.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hai đoạn có thể mở đầu giống nhau, thành A A′. Đoạn sau thường phát triển ý chính của đoạn đầu.',
            en: 'Both sections can begin alike, giving A A′. The second section often develops the main idea of the first.',
          },
        },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${SIM_A.notes} ||`, labels: tag(SIM_A.notes, 'A', '{G}') },
        { type: 'staff', clef: 'treble', time: '3/4', notes: `${SIM_B.notes} ||`, labels: tag(SIM_B.notes, 'A′', '{C}') },
        { type: 'play', notes: hear(SIM_A, SIM_B), bpm: 140, label: { vi: 'Nghe A A′', en: 'Hear A A′' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bản A A′ ở trên là loại hai đoạn nào?', en: 'Which kind of binary is the A A′ piece above?' },
      blocks: [{ type: 'play', notes: hear(SIM_A, SIM_B), bpm: 140 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' } },
          { text: { vi: 'Hai đoạn cân bằng', en: 'Balanced binary' } },
          { text: { vi: 'Hai đoạn đơn giản', en: 'Simple binary' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai đoạn kết bằng hai kết khác nhau, và không có câu mở đầu quay lại sau phần tương phản.',
        en: 'The two sections end with different cadences, and no opening returns after contrasting material.',
      },
    },
  ],
} satisfies Lesson
