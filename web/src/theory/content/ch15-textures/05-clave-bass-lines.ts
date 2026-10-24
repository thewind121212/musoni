import type { Lesson } from '@/theory/types'

/**
 * Book 14.6 (the 3–2 son clave, 3+3+2 and tresillo, habanera and reggaeton,
 * the 3+3+3+3+2+2 and 3+3+4+3+3 expansions) and 14.7 (distinctive bass
 * lines and riffs). Every rhythm is written for the lesson; no song is quoted.
 * Tiết tấu level 3 trains the dotted quarters and ties these figures are made of.
 */
export default {
  id: 'clave-bass-lines',
  title: { vi: 'Clave 3–2 và đường bass', en: 'The 3–2 son clave and bass lines' },
  minutes: 5,
  sources: [
    { section: '14.6', url: 'https://musictheory.pugetsound.edu/mt21c/ThreeTwoClave.html' },
    { section: '14.7', url: 'https://musictheory.pugetsound.edu/mt21c/DistinctiveBassLines.html' },
  ],
  practice: { drill: 'rhythm', level: 3, durationSec: 60, tempo: 80 },
  recap: [
    { vi: 'Clave son 3–2: ba tiếng gõ, rồi hai', en: 'The 3–2 son clave: three attacks, then two' },
    { vi: '3+3+2: tám móc đơn chia 3, 3, 2; bản móc kép là tresillo', en: '3+3+2: eight eighths grouped 3, 3, 2; in sixteenths it is tresillo' },
    { vi: 'Habanera là tresillo thêm một tiếng ở phách 2', en: 'The habanera is tresillo plus an attack on beat 2' },
    { vi: 'Riff: mẫu ngắn lặp lại, hay nằm ở đường bass', en: 'A riff: a short repeated pattern, often in the bass line' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Clave son 3–2', en: 'The 3–2 son clave' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Clave son 3–2** (3–2 son clave) là mẫu tiết tấu cốt lõi của nhạc Afro-Cuba. Ô nhịp đầu có ba tiếng gõ, ô nhịp sau có hai.',
            en: 'The **3–2 son clave** is an essential rhythm of Afro-Cuban music. The first measure has three attacks and the second has two.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đổi chỗ hai ô nhịp, hai tiếng trước, ba tiếng sau, ta có clave son 2–3.',
            en: 'Swap the two measures, two attacks first and three after, and you have the 2–3 son clave.',
          },
        },
        {
          type: 'staff',
          clef: 'none',
          time: '4/4',
          notes: 'B4:q. B4:q. B4:q | R:q B4:q B4:q R:q ||',
          labels: ['1', '2 &', '4', '', '2', '3', ''],
        },
        { type: 'play', notes: 'B4:q. B4:q. B4:q | R:q B4:q B4:q R:q | B4:q. B4:q. B4:q | R:q B4:q B4:q R:q', bpm: 100 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là clave nào?', en: 'Which clave is this?' },
      blocks: [
        { type: 'staff', clef: 'none', time: '4/4', notes: 'R:q B4:q B4:q R:q | B4:q. B4:q. B4:q ||' },
        { type: 'play', notes: 'R:q B4:q B4:q R:q | B4:q. B4:q. B4:q | R:q B4:q B4:q R:q | B4:q. B4:q. B4:q', bpm: 100 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Clave son 3–2', en: 'The 3–2 son clave' } },
          { text: { vi: 'Clave son 2–3', en: 'The 2–3 son clave' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ô nhịp đầu có hai tiếng gõ, ô nhịp sau có ba: đó là clave 2–3.',
        en: 'The first measure has two attacks and the second has three: that is the 2–3 clave.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiết tấu 3+3+2', en: 'The 3+3+2 rhythm' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ô nhịp đầu của clave dựa trên tiết tấu **3+3+2** (3+3+2 rhythm): tám móc đơn chia thành nhóm 3, 3 và 2. Viết bằng móc kép, gọn trong hai phách, nó được gọi là **tresillo**.',
            en: 'The first measure of the clave rests on the **3+3+2 rhythm**: eight eighth notes grouped 3, 3 and 2. Written in sixteenth notes, within two beats, it is called **tresillo**.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q. B4:q. B4:q', labels: ['3', '3', '2'] },
        { type: 'play', notes: 'B4:q. B4:q. B4:q | B4:q. B4:q. B4:q', bpm: 100, label: { vi: 'Nghe bản móc đơn', en: 'Hear it in eighths' } },
        { type: 'staff', clef: 'none', time: '2/4', notes: 'B4:8. B4:8. B4:8', labels: ['3', '3', '2'] },
        { type: 'play', notes: 'B4:8. B4:8. B4:8 | B4:8. B4:8. B4:8 | B4:8. B4:8. B4:8 | B4:8. B4:8. B4:8', bpm: 90, label: { vi: 'Nghe tresillo', en: 'Hear tresillo' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong 3+3+2 móc đơn, tiếng gõ thứ hai rơi vào đâu?', en: 'In 3+3+2 in eighth notes, where does the second attack fall?' },
      blocks: [{ type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q. B4:q. B4:q' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phách 2', en: 'Beat 2' } },
          { text: { vi: 'Nửa sau phách 2', en: 'The upbeat after beat 2' }, correct: true },
          { text: { vi: 'Phách 3', en: 'Beat 3' } },
        ],
      },
      reason: {
        vi: 'Nhóm đầu dài ba móc đơn, tức một phách rưỡi, nên tiếng thứ hai vào ở nửa sau phách 2.',
        en: 'The first group lasts three eighths, a beat and a half, so the second attack comes on the upbeat after beat 2.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Habanera và các biến thể', en: 'Habanera and expansions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tiết tấu **habanera**, như trong bài Habanera của vở opera Carmen (Bizet), là tresillo thêm một tiếng ở phách 2. Nhịp **reggaeton** cũng dựng trên 3+3+2.',
            en: 'The **habanera** rhythm, as in the Habanera from Bizet\'s opera Carmen, is tresillo with an extra attack on beat 2. The **reggaeton** beat is also built on 3+3+2.',
          },
        },
        { type: 'staff', clef: 'none', time: '2/4', notes: 'B4:8. B4:16 B4:8 B4:8', labels: ['1', '', '2', '&'] },
        { type: 'play', notes: 'B4:8. B4:16 B4:8 B4:8 | B4:8. B4:16 B4:8 B4:8 | B4:8. B4:16 B4:8 B4:8 | B4:8. B4:16 B4:8 B4:8', bpm: 80, label: { vi: 'Nghe habanera', en: 'Hear the habanera' } },
        {
          type: 'text',
          text: {
            vi: 'Lặp mỗi nhóm hai lần ta có 3+3+3+3+2+2 móc kép, đủ một ô nhịp 4/4. Cũng có những cách ghép 3 và 2 khác, như 3+3+4+3+3.',
            en: 'Double each group and you get 3+3+3+3+2+2 in sixteenths, a full 4/4 measure. Other mixes of threes and twos occur too, such as 3+3+4+3+3.',
          },
        },
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:8. B4:8. B4:8. B4:8. B4:8 B4:8', labels: ['3', '3', '3', '3', '2', '2'] },
        { type: 'play', notes: 'B4:8. B4:8. B4:8. B4:8. B4:8 B4:8 | B4:8. B4:8. B4:8. B4:8. B4:8 B4:8', bpm: 90, label: { vi: 'Nghe 3+3+3+3+2+2', en: 'Hear 3+3+3+3+2+2' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Đường bass riêng', en: 'Distinctive bass lines' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đôi khi bản sắc của cả bài nằm ở **đường bass** (bass line) lặp lại. Mẫu ngắn lặp đi lặp lại như vậy gọi là **riff**, và guitar cũng hay chơi riff cùng với bass.',
            en: 'Sometimes the identity of a song is in its repeated **bass line**. Such a short repeated pattern is called a **riff**, and guitars often play riffs along with the bass.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          time: '4/4',
          notes: 'A2:8 R:8 A2:8 C3:8 D3:q E3:8 G3:8 | A2:8 R:8 A2:8 C3:8 D3:q C3:8 G2:8 ||',
        },
        {
          type: 'play',
          notes: 'A2:8 R:8 A2:8 C3:8 D3:q E3:8 G3:8 | A2:8 R:8 A2:8 C3:8 D3:q C3:8 G2:8 | A2:8 R:8 A2:8 C3:8 D3:q E3:8 G3:8 | A2:8 R:8 A2:8 C3:8 D3:q C3:8 G2:8 | A2:w',
          bpm: 100,
        },
        {
          type: 'tip',
          text: {
            vi: 'Chương này chỉ là gợi ý để làm hợp âm chuyển động: hãy nghe kỹ kết cấu và phần đệm trong nhạc bạn nghe hằng ngày.',
            en: 'This chapter only gives ideas for setting chords in motion: listen closely to texture and accompaniment in the music you hear every day.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Một mẫu ngắn lặp đi lặp lại, làm nên bản sắc của bài, gọi là gì?', en: 'What is a short repeated pattern that gives a song its identity called?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Riff', en: 'A riff' }, correct: true },
          { text: { vi: 'Bass Alberti', en: 'An Alberti bass' } },
          { text: { vi: 'Clave son', en: 'A son clave' } },
        ],
      },
      reason: {
        vi: 'Riff là một mẫu ngắn lặp lại; khi nằm ở bass, nó thường là thứ người nghe nhớ nhất.',
        en: 'A riff is a short repeated pattern; in the bass, it is often what listeners remember most.',
      },
    },
  ],
} satisfies Lesson
