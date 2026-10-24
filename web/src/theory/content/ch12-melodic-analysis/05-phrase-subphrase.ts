import type { Lesson } from '@/theory/types'

/**
 * Book 11.4-11.5: the phrase (a complete unit, usually four measures, ending
 * with a cadence) and the subphrase (usually two measures, labelled a, a', b).
 */
export default {
  id: 'phrase-subphrase',
  title: { vi: 'Câu nhạc và tiết nhạc', en: 'Phrase and subphrase' },
  minutes: 5,
  sources: [
    { section: '11.4', url: 'https://musictheory.pugetsound.edu/mt21c/PhraseSection.html' },
    { section: '11.5', url: 'https://musictheory.pugetsound.edu/mt21c/subphrase.html' },
  ],
  recap: [
    { vi: 'Câu nhạc là phần nhỏ nhất của hình thức, cho cảm giác trọn ý', en: 'A phrase is the smallest section of form, and feels complete' },
    { vi: 'Phần lớn câu nhạc dài bốn ô nhịp và khép lại bằng một kết', en: 'Most phrases are four measures long and end with a cadence' },
    { vi: 'Tiết nhạc thường dài hai ô nhịp, gọi tên a, b', en: 'A subphrase is usually two measures long, labelled a, b' },
    { vi: 'Lặp lại có đổi chút: a\'; chỉ mô tiến: vẫn là a', en: 'Repeated with a slight change: a\'; only sequenced: still a' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Câu nhạc', en: 'The phrase' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Câu nhạc** (phrase) là phần nhỏ nhất của **hình thức** (form) âm nhạc. Khác với motif, câu nhạc cho cảm giác một ý đã trọn.',
            en: 'The **phrase** is the smallest kind of section in musical **form**. Unlike a motive, a phrase gives the sense of completing a unit.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong nhạc cổ điển, câu nhạc luôn khép lại bằng một kết. Trong nhạc pop, câu có thể trọn khi giai điệu đủ bốn ô nhịp hay hết một dòng lời.',
            en: 'In classical music, phrases always end with cadences. In popular music, a phrase may be complete when the melody reaches four measures or a line of lyric ends.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'E4:q E4:q F4:q G4:q | G4:q F4:q E4:q D4:q | C4:q C4:q D4:q E4:q | E4:q. D4:8 D4:h',
          labels: ['1', '', '', '', '2', '', '', '', '3', '', '', '', '4', '', ''],
        },
        { type: 'play', notes: 'E4:q E4:q F4:q G4:q G4:q F4:q E4:q D4:q C4:q C4:q D4:q E4:q E4:q. D4:8 D4:h', bpm: 110 },
        {
          type: 'tip',
          text: {
            vi: 'Đây là câu đầu của giai điệu "Hoan ca" (Ode to Joy) trong Giao hưởng số 9 của Beethoven, viết ở giọng {C} trưởng.',
            en: 'This is the first phrase of the “Ode to Joy” tune from Beethoven’s Symphony No. 9, written in {C} major.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Độ dài và kết', en: 'Length and cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Phần lớn câu nhạc dài bốn ô nhịp và khép lại bằng một trong bốn loại kết: kết chính, kết lửng, kết đánh lừa, hiếm hơn là kết phụ. Câu tám ô nhịp cũng rất hay gặp; câu năm, sáu, bảy ô nhịp ít hơn, câu ba ô nhịp càng hiếm.',
            en: 'Most phrases are four measures long and end with one of the four cadences: authentic, half, deceptive, or less often plagal. Eight-measure phrases are common too; five, six and seven measures are less so, and three measures rarer still.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Câu trên dừng ở ô nhịp 4, trên {D4}, bậc 2 của giọng, nốt của hợp âm V.',
            en: 'The phrase above stops in measure 4 on {D4}, scale degree 2, a note of the V chord.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:q C4:q D4:q E4:q | E4:q. D4:8 D4:h ||',
          labels: ['I', '', 'V', 'I', 'I', 'V', ''],
        },
        { type: 'play', notes: 'C3+C4:q C4:q G2+D4:q C3+E4:q C3+E4:q. G2+D4:8 G2+B3+D4:h', bpm: 110 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc này khép lại bằng kết gì?', en: 'Which cadence ends this phrase?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic cadence' } },
          { text: { vi: 'Kết lửng', en: 'Half cadence' }, correct: true },
          { text: { vi: 'Kết phụ', en: 'Plagal cadence' } },
        ],
      },
      reason: {
        vi: 'Câu dừng trên V, hợp âm át, nên nghe chưa xong: đó là kết lửng.',
        en: 'The phrase stops on V, the dominant chord, so it sounds unfinished: a half cadence.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiết nhạc', en: 'Subphrases' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tiết nhạc** (subphrase) lớn hơn motif nhưng nhỏ hơn câu nhạc, thường dài hai ô nhịp. Ta gọi tên tiết nhạc bằng chữ cái a, b, c.',
            en: 'A **subphrase** is larger than a motive but smaller than a phrase, usually two measures long. We label subphrases with letters a, b, c.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Câu "Hoan ca" gồm tiết nhạc a (ô nhịp 1-2) và tiết nhạc b (ô nhịp 3-4).',
            en: 'The “Ode to Joy” phrase is subphrase a (measures 1-2) and subphrase b (measures 3-4).',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'E4:q E4:q F4:q G4:q | G4:q F4:q E4:q D4:q | C4:q C4:q D4:q E4:q | E4:q. D4:8 D4:h',
          labels: ['a', '', '', '', '', '', '', '', 'b', '', '', '', '', '', ''],
        },
        { type: 'play', notes: 'E4:q E4:q F4:q G4:q G4:q F4:q E4:q D4:q C4:q C4:q D4:q E4:q E4:q. D4:8 D4:h', bpm: 110 },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'a phẩy', en: 'a prime' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tiết nhạc lặp lại có đổi chút thì thêm dấu phẩy: a\' (a phẩy), đổi lần nữa là a\'\' (a hai phẩy). Nếu chỉ dịch lên hay xuống (mô tiến), ta vẫn gọi là a.',
            en: 'A subphrase repeated with slight changes gets an apostrophe: a\' (“a prime”), and another change makes a\'\' (“a double prime”). If it is only transposed (a sequence), we still call it a.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Câu thứ hai của "Hoan ca" lặp lại câu đầu nhưng đổi đoạn cuối để về {C}: tiết nhạc b trở lại thành b\'.',
            en: 'The second phrase of “Ode to Joy” repeats the first but changes the end to land on {C}: subphrase b comes back as b\'.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:q C4:q D4:q E4:q | E4:q. D4:8 D4:h || C4:q C4:q D4:q E4:q | D4:q. C4:8 C4:h ||',
          labels: ['b', '', '', '', '', '', '', "b'", '', '', '', '', '', ''],
          highlight: [11, 12, 13],
        },
        { type: 'play', notes: 'C4:q C4:q D4:q E4:q E4:q. D4:8 D4:h C4:q C4:q D4:q E4:q D4:q. C4:8 C4:h', bpm: 110 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 3-4 là tiết nhạc nào?', en: 'Which subphrase is measures 3-4?' },
      blocks: [
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:q E4:q G4:q E4:q | F4:q D4:q C4:h | D4:q F4:q A4:q F4:q | G4:q E4:q D4:h',
          labels: ['a', '', '', '', '', '', '', '?', '', '', '', '', '', ''],
        },
        { type: 'play', notes: 'C4:q E4:q G4:q E4:q F4:q D4:q C4:h D4:q F4:q A4:q F4:q G4:q E4:q D4:h', bpm: 110 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'a', en: 'a' }, correct: true },
          { text: { vi: 'a\'', en: 'a\'' } },
          { text: { vi: 'b', en: 'b' } },
        ],
      },
      reason: {
        vi: 'Ô nhịp 3-4 chỉ là ô nhịp 1-2 dịch lên một bậc (mô tiến), nên vẫn gọi là a.',
        en: 'Measures 3-4 are just measures 1-2 moved up a step (a sequence), so they are still a.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ý nhạc tám nốt, dài hai ô nhịp, lặp lại trong bài, nhiều khả năng là gì?',
        en: 'An idea of eight notes, two measures long, that repeats in a piece is most likely what?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'G4:8 A4:8 G4:8 E4:8 C4:q E4:q | D4:q. E4:8 D4:h' },
        { type: 'play', notes: 'G4:8 A4:8 G4:8 E4:8 C4:q E4:q D4:q. E4:8 D4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một motif', en: 'A motive' } },
          { text: { vi: 'Một tiết nhạc', en: 'A subphrase' }, correct: true },
          { text: { vi: 'Một câu nhạc', en: 'A phrase' } },
        ],
      },
      reason: {
        vi: 'Motif thường chỉ hai đến bảy nốt; tiết nhạc thường từ sáu nốt trở lên và chiếm hai ô nhịp, nửa câu bốn ô nhịp.',
        en: 'Motives are typically two to seven notes; subphrases usually hold six or more notes and fill two measures, half of a four-measure phrase.',
      },
    },
  ],
} satisfies Lesson
