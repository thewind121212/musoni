import type { Lesson } from '@/theory/types'

/** Book 4.5 (tuplets: triplets, duplets, quadruplets) and syncopation from 4.6. */
export default {
  id: 'tuplets-syncopation',
  title: { vi: 'Liên ba và nghịch phách', en: 'Tuplets and syncopation' },
  minutes: 5,
  sources: [
    { section: '4.5', url: 'https://musictheory.pugetsound.edu/mt21c/Tuplets.html' },
    { section: '4.6', url: 'https://musictheory.pugetsound.edu/mt21c/CommonRhythmicNotationErrors.html' },
  ],
  practice: { drill: 'rhythm', level: 4, durationSec: 60, tempo: 80 },
  recap: [
    { vi: 'Liên ba: ba nốt trong thời gian của hai', en: 'A triplet: three notes in the time of two' },
    { vi: 'Phách chia ba suốt bài thì viết 6/8, 9/8 hoặc 12/8', en: 'Beats in three throughout: write 6/8, 9/8 or 12/8' },
    { vi: 'Liên hai: hai nốt trong một phách của nhịp phức', en: 'A duplet: two notes in one compound beat' },
    { vi: 'Nghịch phách nhấn chỗ yếu, làm mờ phách mạnh', en: 'Syncopation stresses weak spots over strong beats' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Liên ba', en: 'Triplets' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt đen thường chia thành hai nốt móc đơn. **Liên ba** (triplet) là ba nốt móc đơn chen vào thời gian của một nốt đen, có số 3 ghi bên trên.',
            en: 'A quarter note normally divides into two eighth notes. A **triplet** fits three eighth notes into the time of one quarter, marked with a 3.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Nhóm liên** (tuplet) là tên chung cho những nhóm nốt chia phách khác thường như vậy.',
            en: '**Tuplet** is the general name for such unusual groupings of a beat.',
          },
        },
        {
          type: 'staff',
          clef: 'none',
          time: '4/4',
          notes: 'B4:8 B4:8 3( B4:8 B4:8 B4:8 ) B4:8 B4:8 3( B4:8 B4:8 B4:8 )',
          labels: ['1', '', '2', '', '', '3', '', '4', '', ''],
        },
        { type: 'play', notes: 'B4:8 B4:8 3( B4:8 B4:8 B4:8 ) B4:8 B4:8 3( B4:8 B4:8 B4:8 )', bpm: 72 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Liên ba móc đơn này dài mấy phách?', en: 'How many beats does this eighth-note triplet last?' },
      blocks: [{ type: 'staff', clef: 'none', notes: '3( B4:8 B4:8 B4:8 )' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một phách', en: 'One beat' }, correct: true },
          { text: { vi: 'Một phách rưỡi', en: 'One and a half beats' } },
          { text: { vi: 'Ba phách', en: 'Three beats' } },
        ],
      },
      reason: {
        vi: 'Ba nốt liên ba chen vào thời gian của một nốt đen, tức một phách.',
        en: 'The three triplet notes fit into the time of one quarter note, which is one beat.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Liên ba hay 6/8', en: 'Triplets or 6/8' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu phách trong cả bài đều chia ba, hãy viết bằng nhịp phức như 6/8, 9/8 hoặc 12/8 thay vì liên ba khắp nơi. Hai ô nhịp dưới đây nghe giống hệt nhau.',
            en: 'If the beats of a whole piece divide in three, write it in a compound meter such as 6/8, 9/8 or 12/8 rather than triplets everywhere. These two measures sound the same.',
          },
        },
        { type: 'staff', clef: 'none', time: '2/4', notes: '3( B4:8 B4:8 B4:8 ) 3( B4:8 B4:8 B4:8 )', labels: ['1', '', '', '2', '', ''] },
        { type: 'play', notes: '3( B4:8 B4:8 B4:8 ) 3( B4:8 B4:8 B4:8 ) | 3( B4:8 B4:8 B4:8 ) 3( B4:8 B4:8 B4:8 )', bpm: 80, label: { vi: 'Nghe 2/4', en: 'Hear 2/4' } },
        { type: 'staff', clef: 'none', time: '6/8', notes: 'B4:8 B4:8 B4:8 B4:8 B4:8 B4:8', labels: ['1', '', '', '2', '', ''] },
        { type: 'play', notes: 'B4:8 B4:8 B4:8 B4:8 B4:8 B4:8 | B4:8 B4:8 B4:8 B4:8 B4:8 B4:8', bpm: 120, label: { vi: 'Nghe 6/8', en: 'Hear 6/8' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Liên hai', en: 'Duplets' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong nhịp phức thì ngược lại. **Liên hai** (duplet) là hai nốt móc đơn trong thời gian của một nốt đen chấm dôi, vốn chia ba. **Liên bốn** (quadruplet) là bốn nốt móc đơn trong cùng thời gian đó.',
            en: 'In compound meter it works the other way. A **duplet** puts two eighth notes in the time of a dotted quarter, which normally holds three. A **quadruplet** puts four eighths in that same time.',
          },
        },
        {
          type: 'staff',
          clef: 'none',
          time: '6/8',
          notes: 'B4:8 B4:8 B4:8 2( B4:8 B4:8 ) | 4( B4:8 B4:8 B4:8 B4:8 ) B4:q.',
          labels: ['1', '', '', '2', '', '1', '', '', '', '2'],
        },
        { type: 'play', notes: 'B4:8 B4:8 B4:8 2( B4:8 B4:8 ) | 4( B4:8 B4:8 B4:8 B4:8 ) B4:q.', bpm: 120 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Liên hai trong 6/8 lấp thời gian của nốt nào?', en: 'In 6/8, a duplet fills the time of which note?' },
      blocks: [{ type: 'staff', clef: 'none', time: '6/8', notes: 'B4:q. 2( B4:8 B4:8 )' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt đen', en: 'A quarter note' } },
          { text: { vi: 'Nốt đen chấm dôi', en: 'A dotted quarter note' }, correct: true },
          { text: { vi: 'Nốt trắng', en: 'A half note' } },
        ],
      },
      reason: {
        vi: 'Liên hai lấp đúng một phách của 6/8, tức một nốt đen chấm dôi.',
        en: 'A duplet fills exactly one beat of 6/8, which is a dotted quarter note.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nghịch phách', en: 'Syncopation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nghịch phách** (syncopation) là khi nốt ở phách yếu hay phần yếu của phách được nhấn, còn phách mạnh gần đó bị làm mờ.',
            en: '**Syncopation** stresses notes on weak beats or weak parts of beats and plays down the strong beats nearby.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mẫu móc đơn, đen, móc đơn dưới đây che mất phách 2 và 4. Nó vẫn được viết như vậy vì phổ biến và dễ đọc hơn bản dùng dấu nối bên dưới, dù hai bản nghe như nhau.',
            en: 'The eighth-quarter-eighth figure below hides beats 2 and 4. It is written this way anyway: it is common, and easier to read than the tied version under it, which sounds the same.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:8 B4:q B4:8 B4:8 B4:q B4:8' },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:8 B4:8~ B4:8 B4:8 B4:8 B4:8~ B4:8 B4:8', labels: ['1', '', '(2)', '', '3', '', '(4)', ''] },
        { type: 'play', notes: 'B4:8 B4:q B4:8 B4:8 B4:q B4:8 | B4:8 B4:q B4:8 B4:8 B4:q B4:8', bpm: 90 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt trắng ở đây che mất phách nào?', en: 'Which beat does the half note hide here?' },
      blocks: [{ type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q B4:h B4:q' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phách 2', en: 'Beat 2' } },
          { text: { vi: 'Phách 3', en: 'Beat 3' }, correct: true },
          { text: { vi: 'Phách 4', en: 'Beat 4' } },
        ],
      },
      reason: {
        vi: 'Nốt trắng bắt đầu ở phách 2 và ngân qua phách 3, một phách mạnh của 4/4.',
        en: 'The half note starts on beat 2 and holds through beat 3, a strong beat in 4/4.',
      },
    },
  ],
} satisfies Lesson
