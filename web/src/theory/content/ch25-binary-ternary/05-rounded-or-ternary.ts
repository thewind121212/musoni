import type { Lesson } from '@/theory/types'
import { MINOR_HC, MINOR_PAC, PEDAL, hear } from './music'

/**
 * Book 24.8: telling rounded binary from ternary by proportion, the nature of
 * the contrasting section (motives from A; a dominant pedal or V alternating
 * with I6/4) and era; written-out repeats. The book's Beethoven figure
 * (Bagatelle Op. 119 No. 9) is replaced by our own rounded binary's b phrase.
 * No practice link.
 */
export default {
  id: 'rounded-or-ternary',
  title: { vi: 'Tái hiện hay ba đoạn', en: 'Rounded binary or ternary' },
  minutes: 5,
  sources: [{ section: '24.8', url: 'https://musictheory.pugetsound.edu/mt21c/DistinguishingBetweenRoundedBinaryAndTernary.html' }],
  recap: [
    { vi: 'Tỉ lệ: đoạn tương phản quá ngắn thì nghiêng về tái hiện', en: 'Proportion: a contrast too short to stand alone points to rounded binary' },
    { vi: 'Motif từ đoạn A, nốt giữ át, V xen I6/4: tái hiện', en: 'Motives from A, a dominant pedal, V with I6/4: rounded binary' },
    { vi: 'Baroque, cổ điển nghiêng về tái hiện; lãng mạn về ba đoạn', en: 'Baroque and Classical lean to rounded binary, Romantic to ternary' },
    { vi: 'Phần nhắc lại viết ra vẫn ghi vào sơ đồ', en: 'Written-out repeats still go in the diagram' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tỉ lệ', en: 'Proportion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một bản năm, sáu câu nhạc có thể là hai đoạn tái hiện hoặc ba đoạn. Hãy xét ba điều: tỉ lệ, tính chất của đoạn tương phản, và thời kỳ.',
            en: 'A piece five or six phrases long could be a rounded binary or a ternary. Consider three things: proportion, the nature of the contrasting section, and the era.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Tỉ lệ** (proportion): nếu đoạn tương phản quá ngắn để đứng riêng, nhiều khả năng đó là hai đoạn tái hiện.',
            en: '**Proportion**: if the contrasting section is too small to stand alone, the form is more likely a rounded binary.',
          },
        },
        { type: 'play', notes: PEDAL.play, bpm: 140, label: { vi: 'Câu b: 4 ô nhịp', en: 'Phrase b: 4 measures' } },
        { type: 'play', notes: hear(MINOR_HC, MINOR_PAC), bpm: 150, label: { vi: 'Đoạn B: 8 ô nhịp', en: 'Section B: 8 measures' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn A dài 8 ô nhịp, phần tương phản chỉ 4 ô nhịp. Tỉ lệ ấy nghiêng về hình thức nào?',
        en: 'The A section is 8 measures, the contrasting material only 4. Which form does that proportion point to?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' }, correct: true },
          { text: { vi: 'Ba đoạn', en: 'Ternary' } },
        ],
      },
      reason: {
        vi: 'Phần tương phản chỉ dài bằng nửa đoạn A, quá ngắn để là một đoạn riêng.',
        en: 'The contrast lasts half as long as the A section, too small to stand alone as a section.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tính chất của đoạn tương phản', en: 'The nature of the contrast' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giai điệu dựng từ **motif** (motive) của đoạn A thì nghiêng về hai đoạn tái hiện; ba đoạn có giai điệu mới. Câu b của chúng tôi dùng lại hợp âm rải đi lên của câu a.',
            en: 'A melody built from **motives** of the first section points to rounded binary; a ternary has a contrasting melody. Our phrase b reuses phrase a’s rising arpeggio.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hòa âm chủ yếu là **nốt giữ át** (dominant pedal), hoặc V xen với I6/4, cũng nghiêng về hai đoạn tái hiện.',
            en: 'Harmony that is mostly a **dominant pedal**, or V alternating with I6/4, also points to rounded binary.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '3/4',
          notes: 'G2+B3+D4+G4:h. | G2+C4+E4+G4:h. | G2+B3+D4+F4:h. | G2+B3+D4+G4:h. ||',
          labels: ['V', 'I\n6\n4', 'V7', 'V'],
        },
        { type: 'play', notes: PEDAL.play, bpm: 140, label: { vi: 'Nghe câu b', en: 'Hear phrase b' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn tương phản có giai điệu mới, ở giọng {A} thứ, không có nốt giữ át. Tính chất ấy nghiêng về hình thức nào?',
        en: 'The contrasting section has a new melody, in {A} minor, with no dominant pedal. Which form does that point to?',
      },
      blocks: [{ type: 'play', notes: hear(MINOR_HC, MINOR_PAC), bpm: 150 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' } },
          { text: { vi: 'Ba đoạn', en: 'Ternary' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ba đoạn có giai điệu tương phản ở đoạn giữa, không dựng từ motif của đoạn A.',
        en: 'A ternary has a contrasting melody in the middle section, not one built from the first section’s motives.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thời kỳ', en: 'Era' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Thời kỳ** (era): bản của Bach, Handel, Scarlatti, Couperin (Baroque) hay Haydn, Mozart, Beethoven (cổ điển) dễ là hai đoạn tái hiện hơn. Bản của Schubert, Schumann, Chopin, Mendelssohn, Brahms (lãng mạn) dễ là ba đoạn hơn.',
            en: '**Era**: a piece by Bach, Handel, Scarlatti or Couperin (Baroque) or by Haydn, Mozart or Beethoven (Classical) is more likely a rounded binary. One by Schubert, Schumann, Chopin, Mendelssohn or Brahms (Romantic) is more likely a ternary.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đó chỉ là xu hướng. Khi ba điều không thống nhất, bạn phải cân nhắc các bằng chứng để kết luận.',
            en: 'These are generalities. When the three criteria disagree, you weigh the evidence to reach a conclusion.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Đôi khi phần nhắc lại được viết hẳn ra thay cho dấu nhắc lại. Khi đó vẫn ghi dấu nhắc lại vào sơ đồ.',
            en: 'Sometimes the repeats are written out instead of using repeat signs. Put the repeats in your diagram anyway.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bản của Haydn: phần tương phản 4 ô nhịp, dựng từ motif mở đầu, trên nốt giữ át. Hình thức là gì?',
        en: 'A piece by Haydn: 4 measures of contrast, built from the opening motive, over a dominant pedal. What is the form?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai đoạn tái hiện', en: 'Rounded binary' }, correct: true },
          { text: { vi: 'Ba đoạn', en: 'Ternary' } },
          { text: { vi: 'Ba đoạn phức', en: 'Compound ternary' } },
        ],
      },
      reason: {
        vi: 'Cả tỉ lệ, tính chất lẫn thời kỳ cổ điển đều chỉ về hai đoạn tái hiện.',
        en: 'Proportion, nature and the Classical era all point to rounded binary.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn A được viết ra hai lần, giống hệt nhau, thay cho dấu nhắc lại. Sơ đồ ghi thế nào?',
        en: 'The A section is written out twice, note for note, instead of a repeat sign. How does the diagram show it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '||: A :||', en: '||: A :||' }, correct: true },
          { text: { vi: 'A A′', en: 'A A′' } },
          { text: { vi: 'A B', en: 'A B' } },
        ],
      },
      reason: {
        vi: 'Phần nhắc lại viết ra vẫn là nhắc lại, nên sơ đồ ghi dấu nhắc lại dù bản nhạc không có.',
        en: 'A written-out repeat is still a repeat, so the diagram shows it even though the score has no repeat sign.',
      },
    },
  ],
} satisfies Lesson
