import type { Lesson } from '@/theory/types'

/**
 * Book 11.1: the motive, the smallest melodic idea, its development through
 * sequences, and a melody built from numbered motives.
 */
export default {
  id: 'motive',
  title: { vi: 'Motif', en: 'Motive' },
  minutes: 4,
  sources: [{ section: '11.1', url: 'https://musictheory.pugetsound.edu/mt21c/MotiveSection.html' }],
  recap: [
    { vi: 'Motif là ý giai điệu nhỏ nhất nhận ra được', en: 'A motive is the smallest recognizable melodic idea' },
    { vi: 'Nhà soạn nhạc phát triển motif, ví dụ bằng mô tiến', en: 'Composers develop motives, for example through sequences' },
    { vi: 'Một giai điệu ghép từ vài motif, đánh số 1, 2, 3', en: 'A melody is built from a few motives, numbered 1, 2, 3' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Motif', en: 'The motive' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Motif** (motive) là ý giai điệu nhỏ nhất mà tai nhận ra được. Bốn nốt mở đầu Giao hưởng số 5 của Beethoven là một motif: ba nốt ngắn cùng cao độ, rồi một nốt dài thấp hơn.',
            en: 'A **motive** (or motif) is the smallest melodic idea you can recognize. The four notes that open Beethoven’s Symphony No. 5 are a motive: three short notes on one pitch, then a long, lower one.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', time: '2/4', notes: 'R:8 G4:8 G4:8 G4:8 | Eb4:h' },
        { type: 'play', notes: 'R:8 G4:8 G4:8 G4:8 Eb4:h', bpm: 160 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Motif là gì?', en: 'What is a motive?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ý giai điệu nhỏ nhất nhận ra được', en: 'The smallest recognizable melodic idea' }, correct: true },
          { text: { vi: 'Một phần nhạc trọn vẹn, khép lại bằng một kết', en: 'A complete section that ends with a cadence' } },
          { text: { vi: 'Một hợp âm lặp lại nhiều lần', en: 'A chord repeated many times' } },
        ],
      },
      reason: {
        vi: 'Motif chỉ vài nốt; phần nhạc trọn vẹn khép lại bằng một kết là câu nhạc, lớn hơn nhiều.',
        en: 'A motive is only a few notes; a complete section ending with a cadence is a phrase, much larger.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phát triển motif', en: 'Developing a motive' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhà soạn nhạc tách motif ra và **phát triển** (develop) nó, ví dụ bằng mô tiến. Ngay sau bốn nốt đầu, Beethoven nhắc lại motif thấp hơn một bậc.',
            en: 'Composers take a motive out and **develop** it, for example through sequences. Right after the first four notes, Beethoven repeats the motive a step lower.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'Cm',
          time: '2/4',
          notes: 'R:8 G4:8 G4:8 G4:8 | Eb4:h | R:8 F4:8 F4:8 F4:8 | D4:h',
          highlight: [6, 7, 8, 9],
        },
        { type: 'play', notes: 'R:8 G4:8 G4:8 G4:8 Eb4:h R:8 F4:8 F4:8 F4:8 D4:h', bpm: 160 },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {C} trưởng, nhắc lại motif này cao hơn một bậc, bắt đầu từ {D4}. Nốt cuối là gì?',
        en: 'In {C} major, repeat this motive a step higher, starting on {D4}. What is its last note?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4:8 D4:8 E4:q G4:h' },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h' },
      ],
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'Mô tiến giữ hình dáng motif trên các nốt của giọng: {D} {E} {F} {A}, nốt cuối cao hơn {G} một bậc.',
        en: 'The sequence keeps the motive’s shape on the notes of the key: {D} {E} {F} {A}, the last note a step above {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Một giai điệu, vài motif', en: 'One melody, several motives' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một giai điệu thường ghép từ vài motif, đánh số 1, 2, 3 theo thứ tự xuất hiện. Chủ đề chính chương 1 Giao hưởng số 1 của Beethoven có bốn motif chỉ trong bốn ô nhịp.',
            en: 'A melody is usually built from a few motives, numbered 1, 2, 3 in the order they appear. The primary theme of the first movement of Beethoven’s Symphony No. 1 has four motives in just four measures.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây motif 1 đi lên từng bậc rồi nhảy, motif 2 dài-ngắn-dài và đi xuống.',
            en: 'Here motive 1 climbs by step and then leaps; motive 2 goes long-short-long and falls.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | A4:q. G4:8 E4:h',
          labels: ['1', '', '', '', '2', '', ''],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h A4:q. G4:8 E4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 4 là motif nào?', en: 'Which motive is measure 4?' },
      blocks: [
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | A4:q. G4:8 E4:h | D4:8 E4:8 F4:q A4:h | G4:q. F4:8 D4:h',
          labels: ['1', '', '', '', '2', '', '', '1', '', '', '', '?', '', ''],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h A4:q. G4:8 E4:h D4:8 E4:8 F4:q A4:h G4:q. F4:8 D4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Motif 1', en: 'Motive 1' } },
          { text: { vi: 'Motif 2', en: 'Motive 2' }, correct: true },
          { text: { vi: 'Một motif mới', en: 'A new motive' } },
        ],
      },
      reason: {
        vi: 'Ô nhịp 4 đi dài-ngắn-dài và đi xuống như motif 2, chỉ thấp hơn một bậc.',
        en: 'Measure 4 goes long-short-long and falls like motive 2, only a step lower.',
      },
    },
  ],
} satisfies Lesson
