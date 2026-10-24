import type { Lesson } from '@/theory/types'

/** Book 4.3: ties (and slurs, which look like them), dots and double dots. */
export default {
  id: 'dots-ties',
  title: { vi: 'Chấm dôi và dấu nối', en: 'Dots and ties' },
  minutes: 4,
  sources: [{ section: '4.3', url: 'https://musictheory.pugetsound.edu/mt21c/DotsAndTies.html' }],
  practice: { drill: 'rhythm', level: 3, durationSec: 60, tempo: 60 },
  recap: [
    { vi: 'Dấu nối gộp hai nốt cùng cao độ thành một âm', en: 'A tie joins two notes of the same pitch into one sound' },
    { vi: 'Chấm dôi làm nốt dài thêm một nửa', en: 'A dot makes a note half as long again' },
    { vi: 'Chấm thứ hai thêm một nửa của chấm đầu', en: 'A second dot adds half of what the first adds' },
    { vi: 'Dấu luyến nối các nốt khác cao độ', en: 'A slur joins notes of different pitches' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Dấu nối', en: 'Ties' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt trắng dài hai phách, nốt tròn bốn phách, nhưng không có nốt nào dài ba phách. **Dấu nối** (tie) là đường cong nối hai nốt cùng cao độ thành một âm, dài bằng cả hai nốt cộng lại.',
            en: 'A half note lasts two beats and a whole note four, but no note lasts three. A **tie** is a curve joining two notes of the same pitch into one sound, as long as both together.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Dấu nối còn kéo một nốt qua vạch nhịp. Phách trong ngoặc là phách không đánh lại.',
            en: 'Ties also carry a note across a bar line. A beat in brackets is not struck again.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:h~ B4:q B4:q | B4:q B4:q B4:h~ | B4:h B4:h', labels: ['1', '(3)', '4', '1', '2', '3', '(1)', '3'] },
        { type: 'play', notes: 'B4:h~ B4:q B4:q | B4:q B4:q B4:h~ | B4:h B4:h', bpm: 80 },
        {
          type: 'tip',
          text: {
            vi: '**Dấu luyến** (slur) trông giống dấu nối nhưng nối các nốt khác cao độ, nghĩa là chơi liền tiếng.',
            en: 'A **slur** looks like a tie but joins notes of different pitches; it means play them smoothly connected.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Âm này dài mấy phách?', en: 'How many beats does this sound last?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'B4:h~ B4:q' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2', en: '2' } },
          { text: { vi: '3', en: '3' }, correct: true },
          { text: { vi: '4', en: '4' } },
        ],
      },
      reason: {
        vi: 'Nốt trắng hai phách nối với nốt đen một phách thành một âm ba phách.',
        en: 'A half note (two beats) tied to a quarter (one) makes one sound of three beats.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chấm dôi', en: 'Dots' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chấm dôi** (dot) đặt sau một nốt làm nốt dài thêm một nửa. Nốt trắng chấm dôi dài 2 + 1 = 3 phách, bằng nốt trắng nối nốt đen.',
            en: 'A **dot** after a note makes it half as long again. A dotted half note lasts 2 + 1 = 3 beats, the same as a half note tied to a quarter.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt đen chấm dôi dài một phách rưỡi và hay đi cùng một nốt móc đơn.',
            en: 'A dotted quarter lasts one and a half beats and often comes with an eighth note.',
          },
        },
        { type: 'staff', clef: 'none', time: '3/4', notes: 'B4:h. | B4:h~ B4:q | B4:q. B4:8 B4:q', labels: ['1', '1', '(3)', '1', '', '3'] },
        { type: 'play', notes: 'B4:h. | B4:h~ B4:q | B4:q. B4:8 B4:q', bpm: 80 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt đen chấm dôi dài bằng mấy nốt móc đơn?', en: 'A dotted quarter note lasts as long as how many eighth notes?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'B4:q.' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2', en: '2' } },
          { text: { vi: '3', en: '3' }, correct: true },
          { text: { vi: '4', en: '4' } },
        ],
      },
      reason: {
        vi: 'Nốt đen bằng hai nốt móc đơn, chấm dôi thêm một nửa của nó là một móc đơn nữa, thành ba.',
        en: 'A quarter equals two eighths, and the dot adds half of that, one more eighth, making three.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chấm dôi kép', en: 'Double dots' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một nốt có thể mang hai chấm. Chấm thứ hai thêm một nửa của chấm thứ nhất, tức một phần tư nốt gốc. Nốt trắng **chấm dôi kép** (double-dotted) dài 2 + 1 + ½ = 3½ phách.',
            en: 'A note can carry two dots. The second dot adds half of what the first adds, a quarter of the note. A **double-dotted** half note lasts 2 + 1 + ½ = 3½ beats.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:h.. B4:8 | B4:q.. B4:16 B4:h', labels: ['1', '', '1', '', '3'] },
        { type: 'play', notes: 'B4:h.. B4:8 | B4:q.. B4:16 B4:h', bpm: 70 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai nốt nối này bằng một nốt nào?', en: 'These two tied notes equal which single note?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'B4:q~ B4:8' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt đen chấm dôi', en: 'A dotted quarter note' }, correct: true },
          { text: { vi: 'Nốt trắng', en: 'A half note' } },
          { text: { vi: 'Nốt trắng chấm dôi', en: 'A dotted half note' } },
        ],
      },
      reason: {
        vi: 'Một phách cộng nửa phách là một phách rưỡi, đúng bằng nốt đen chấm dôi.',
        en: 'One beat plus half a beat is one and a half, exactly a dotted quarter.',
      },
    },
  ],
} satisfies Lesson
