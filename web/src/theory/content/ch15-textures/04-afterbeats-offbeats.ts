import type { Lesson } from '@/theory/types'

/**
 * Book 14.5: afterbeats (Schoenberg's term) and offbeats, in polka and reggae.
 * No practice link: no drill level reads eighth rests on the beat.
 */
export default {
  id: 'afterbeats-offbeats',
  title: { vi: 'Hợp âm sau phách và phách lệch', en: 'Afterbeats and offbeats' },
  minutes: 4,
  sources: [{ section: '14.5', url: 'https://musictheory.pugetsound.edu/mt21c/AfterbeatsOffbeats.html' }],
  recap: [
    { vi: 'Hợp âm sau phách: hợp âm lặp lại vang sau đầu phách', en: 'Afterbeats: repeated chords that sound after the downbeat' },
    { vi: 'Hợp âm phách lệch: rơi đều vào nửa sau phách', en: 'Offbeats: chords regularly on the upbeats' },
    { vi: 'Polka: bass ở đầu phách, hợp âm ở nửa sau', en: 'Polka: bass on the downbeats, chords on the upbeats' },
    { vi: 'Reggae: đầu phách để trống, hợp âm ngắn ở nửa sau', en: 'Reggae: empty downbeats, short chords on the upbeats' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm sau phách', en: 'Afterbeats' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm sau phách** (afterbeats) là tên nhà soạn nhạc Arnold Schoenberg đặt cho các hợp âm lặp lại vang sau **đầu phách** (downbeat). Bass đánh ở đầu phách, các hợp âm, thường là móc đơn, theo ngay sau.',
            en: '**Afterbeats** is the composer Arnold Schoenberg\'s term for repeated chords that sound after the **downbeat**. The bass plays on the downbeat and the chords, usually eighth notes, follow right after.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hợp âm sau phách đôi khi là móc đen. Cũng có khi chúng không phải hợp âm lặp lại mà là những nét ngắn đi song song quãng 3.',
            en: 'Afterbeats are sometimes quarter notes. Sometimes they are not repeated chords but short figures moving in thirds.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          time: '4/4',
          notes: '3( C3:8 E3+G3:8 E3+G3:8 ) 3( C3:8 E3+G3:8 E3+G3:8 ) 3( B2:8 D3+G3:8 D3+G3:8 ) 3( B2:8 D3+G3:8 D3+G3:8 ) | C3+E3+G3:w ||',
          highlight: [0, 3, 6, 9],
        },
        {
          type: 'play',
          notes: '3( C3:8 E3+G3:8 E3+G3:8 ) 3( C3:8 E3+G3:8 E3+G3:8 ) 3( B2:8 D3+G3:8 D3+G3:8 ) 3( B2:8 D3+G3:8 D3+G3:8 ) | C3+E3+G3:w',
          bpm: 100,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong kiểu đệm sau phách, nốt bass rơi vào đâu?', en: 'In an afterbeat accompaniment, where does the bass note fall?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ở đầu phách, trước các hợp âm', en: 'On the downbeat, before the chords' }, correct: true },
          { text: { vi: 'Sau các hợp âm', en: 'After the chords' } },
          { text: { vi: 'Cùng lúc với mọi hợp âm', en: 'With every chord' } },
        ],
      },
      reason: {
        vi: 'Bass đánh ở đầu phách, rồi các hợp âm lặp lại vang theo sau nó.',
        en: 'The bass plays on the downbeat, and the repeated chords sound after it.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm phách lệch: polka', en: 'Offbeats: the polka' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm phách lệch** (offbeats) rơi đều vào nửa sau phách và tránh đầu phách. Điệu **polka**, ra đời ở xứ Bohemia, cho thấy rõ điều này: bass ở đầu phách, hợp âm ở nửa sau.',
            en: '**Offbeats** are chords that fall regularly on the upbeats and avoid the downbeats. The **polka**, born in Bohemia, shows this clearly: bass on the downbeats, chords on the upbeats.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          time: '2/4',
          notes: 'C3:8 E3+G3:8 G2:8 E3+G3:8 | G2:8 F3+B3:8 D3:8 F3+B3:8 | C3:8 E3+G3:8 G2:8 E3+G3:8 | C3:q R:q ||',
        },
        {
          type: 'play',
          notes: 'C3:8 E3+G3:8 G2:8 E3+G3:8 | G2:8 F3+B3:8 D3:8 F3+B3:8 | C3:8 E3+G3:8 G2:8 E3+G3:8 | C3:q R:q',
          bpm: 112,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở điệu polka, các hợp âm rơi vào đâu?', en: 'In a polka, where do the chords fall?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đầu phách', en: 'On the downbeats' } },
          { text: { vi: 'Nửa sau phách', en: 'On the upbeats' }, correct: true },
          { text: { vi: 'Chỉ ở phách 1', en: 'Only on beat 1' } },
        ],
      },
      reason: {
        vi: 'Bass giữ đầu phách, còn hợp âm rơi đều vào nửa sau mỗi phách: đó là hợp âm phách lệch.',
        en: 'The bass keeps the downbeats and the chords fall on the upbeat of every beat: those are offbeats.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm phách lệch: reggae', en: 'Offbeats: reggae' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc **reggae** của đảo Jamaica cũng dựa vào hợp âm phách lệch, thường do guitar điện chơi ngắn và gọn. Đầu phách để trống, hợp âm chỉ vang ở nửa sau phách.',
            en: '**Reggae**, from the island of Jamaica, is also built on offbeats, often played short on an electric guitar. The downbeats are left empty and the chords sound only on the upbeats.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'R:8 A4+C5+E5:8 R:8 A4+C5+E5:8 R:8 A4+C5+E5:8 R:8 A4+C5+E5:8 | R:8 G4+B4+D5:8 R:8 G4+B4+D5:8 R:8 G4+B4+D5:8 R:8 G4+B4+D5:8 ||',
        },
        {
          type: 'play',
          notes: 'R:8 A4+C5+E5:16 R:16 R:8 A4+C5+E5:16 R:16 R:8 A4+C5+E5:16 R:16 R:8 A4+C5+E5:16 R:16 | R:8 G4+B4+D5:16 R:16 R:8 G4+B4+D5:16 R:16 R:8 G4+B4+D5:16 R:16 R:8 G4+B4+D5:16 R:16 | R:8 A4+C5+E5:16 R:16 R:8 A4+C5+E5:16 R:16 R:8 A4+C5+E5:16 R:16 R:8 A4+C5+E5:16 R:16',
          bpm: 80,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là kiểu đệm nào?', en: 'What kind of accompaniment is this?' },
      blocks: [
        {
          type: 'staff',
          clef: 'bass',
          key: 'G',
          time: '4/4',
          notes: '3( G2:8 B2+D3:8 B2+D3:8 ) 3( G2:8 B2+D3:8 B2+D3:8 ) 3( F#2:8 A2+D3:8 A2+D3:8 ) 3( F#2:8 A2+D3:8 A2+D3:8 )',
        },
        {
          type: 'play',
          notes: '3( G2:8 B2+D3:8 B2+D3:8 ) 3( G2:8 B2+D3:8 B2+D3:8 ) 3( F#2:8 A2+D3:8 A2+D3:8 ) 3( F#2:8 A2+D3:8 A2+D3:8 ) | G2+B2+D3:w',
          bpm: 100,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm sau phách', en: 'Afterbeats' }, correct: true },
          { text: { vi: 'Hợp âm khối "1 (2) &"', en: 'Block chords in "1 (2) &"' } },
          { text: { vi: 'Bass Alberti', en: 'An Alberti bass' } },
        ],
      },
      reason: {
        vi: 'Bass đánh ở đầu mỗi phách, rồi hai hợp âm lặp lại vang ngay sau nó.',
        en: 'The bass plays on each downbeat and two repeated chords sound right after it.',
      },
    },
  ],
} satisfies Lesson
