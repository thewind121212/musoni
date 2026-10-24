import type { Lesson } from '@/theory/types'

/**
 * Book 19.4: the deceptive cadence V–♭VI and the ♭VI–♭VII–I ending (the book's
 * anthem performances replaced by our own progressions). Book 19.5: borrowing
 * from major in minor is rare (major I as V/iv, raised 6 and 7 in melodic
 * minor); the Picardy 3rd at the end of a minor piece.
 */
export default {
  id: 'deceptive-picardy',
  title: { vi: 'Kết đánh lừa với ♭VI, quãng ba Picardy', en: 'The deceptive cadence with ♭VI, the Picardy 3rd' },
  minutes: 5,
  sources: [
    { section: '19.4', url: 'https://musictheory.pugetsound.edu/mt21c/TheDeceptiveCadenceWithFlatSix.html' },
    { section: '19.5', url: 'https://musictheory.pugetsound.edu/mt21c/Picardy3rd.html' },
  ],
  recap: [
    { vi: 'V–♭VI: kết đánh lừa với hợp âm mượn', en: 'V–♭VI: a deceptive cadence with a borrowed chord' },
    { vi: '♭VI thường đi tiếp ♭VII rồi về I', en: '♭VI often moves on to ♭VII and then I' },
    { vi: 'Ở giọng thứ, I trưởng giữa bản thường là V/iv', en: 'In minor, a major I mid-piece usually acts as V/iv' },
    { vi: 'Quãng ba Picardy: bản giọng thứ kết bằng I trưởng', en: 'Picardy 3rd: a minor piece ends on a major I' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Kết V–♭VI', en: 'The V–♭VI cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Kết đánh lừa thường là V–vi. Thay vi bằng ♭VI mượn, cú bất ngờ còn lớn hơn: tai chờ I mà nghe một hợp âm trưởng xa lạ.',
            en: 'The deceptive cadence is usually V–vi. Put the borrowed ♭VI in place of vi and the surprise is even bigger: the ear expects I and hears an unfamiliar major chord.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'G2+D4+G4+B4:h A2+C4+E4+C5:h | G2+D4+G4+B4:h Ab2+C4+Eb4+C5:h ||',
          labels: ['V', 'vi', 'V', '♭VI'],
          highlight: [3],
        },
        { type: 'play', notes: 'G2+D4+G4+B4:h A2+C4+E4+C5:w', label: { vi: 'Nghe V–vi', en: 'Hear V–vi' } },
        { type: 'play', notes: 'G2+D4+G4+B4:h Ab2+C4+Eb4+C5:w', label: { vi: 'Nghe V–♭VI', en: 'Hear V–♭VI' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {C} trưởng này kết bằng gì?', en: 'This phrase is in {C} major. How does it end?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+E4+G4+C5:q F2+F4+A4+C5:q G2+D4+G4+B4:h | Ab2+C4+Eb4+C5:w ||' },
        { type: 'play', notes: 'C3+E4+G4+C5:q F2+F4+A4+C5:q G2+D4+G4+B4:h Ab2+C4+Eb4+C5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính, V–I', en: 'Authentic, V–I' } },
          { text: { vi: 'Kết đánh lừa, V–vi', en: 'Deceptive, V–vi' } },
          { text: { vi: 'Kết đánh lừa, V–♭VI', en: 'Deceptive, V–♭VI' }, correct: true },
        ],
      },
      reason: {
        vi: 'V đi tới {Ab}–{C}–{Eb}, hợp âm trưởng trên ♭6, tức ♭VI mượn.',
        en: 'V moves to {Ab}–{C}–{Eb}, a major triad on ♭6: the borrowed ♭VI.',
      },
    },
    {
      kind: 'explain',
      title: { vi: '♭VI–♭VII–I', en: '♭VI–♭VII–I' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Sau V–♭VI, nhạc thường đi tiếp ♭VII rồi về I, ba hợp âm trưởng nối nhau. Lối kết này nghe hoành tráng, có phần quen nhàm, và hay gặp ở cuối các màn trình diễn lớn hay phim hoạt hình.',
            en: 'After V–♭VI, the music often moves on to ♭VII and then I, three major chords in a row. The ending sounds epic, if somewhat clichéd, and is common at the close of big performances and animated films.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'G2+D4+G4+B4:h Ab2+C4+Eb4+C5:h | Bb2+D4+F4+Bb4:h C3+E4+G4+C5:h ||',
          labels: ['V', '♭VI', '♭VII', 'I'],
          highlight: [1, 2],
        },
        { type: 'play', notes: 'G2+D4+G4+B4:h Ab2+C4+Eb4+C5:h Bb2+D4+F4+Bb4:h C3+E4+G4+C5:w', label: { vi: 'Nghe V–♭VI–♭VII–I', en: 'Hear V–♭VI–♭VII–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} trưởng, nốt gốc của ♭VII là nốt nào?', en: 'In {D} major, what is the root of ♭VII?' },
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Bậc 7 của giọng {D} trưởng là {C#}; hạ nửa cung được {Cn}, nên ♭VII là {Cn}–{E}–{G}.',
        en: 'Degree 7 of {D} major is {C#}; a half step lower is {Cn}, so ♭VII is {Cn}–{E}–{G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Mượn từ giọng trưởng?', en: 'Borrowing from major?' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng thứ, hiếm khi mượn từ giọng trưởng. Hợp âm I trưởng giữa bản thường làm V/iv, hợp âm át phụ dẫn tới iv. Còn bậc 6 và 7 nâng lên thì đã có sẵn trong gam thứ giai điệu.',
            en: 'It is rare to borrow from major in a minor key. A major I mid-piece usually acts as V/iv, a secondary dominant leading to iv. And the raised 6 and 7 already belong to the melodic minor scale.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Dm', time: '4/4', notes: 'D3+D4+F#4+A4:h G2+D4+G4+Bb4:h ||', labels: ['V/iv', 'iv'] },
        { type: 'play', notes: 'D3+D4+F#4+A4:h G2+D4+G4+Bb4:w', label: { vi: 'Nghe V/iv–iv ở giọng {D} thứ', en: 'Hear V/iv–iv in {D} minor' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Quãng ba Picardy', en: 'The Picardy 3rd' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chỗ mượn từ giọng trưởng là hợp âm cuối của một bản giọng thứ: I trưởng thay cho i thứ. Quãng ba trưởng trên chủ âm đó gọi là **quãng ba Picardy** (Picardy 3rd).',
            en: 'The one place to borrow from major is the last chord of a piece in minor: a major I instead of the minor i. That major third above the tonic is the **Picardy 3rd**.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'Dm',
          time: '4/4',
          notes: 'D3+D4+F4+A4:h G2+D4+G4+Bb4:h | A2+C#4+E4+A4:h D3+D4+F#4+A4:h ||',
          labels: ['i', 'iv', 'V', 'I'],
          highlight: [3],
        },
        { type: 'play', notes: 'D3+D4+F4+A4:h G2+D4+G4+Bb4:h A2+C#4+E4+A4:h D3+D4+F#4+A4:w', label: { vi: 'Nghe kết bằng I trưởng', en: 'Hear the ending on a major I' } },
        {
          type: 'tip',
          text: {
            vi: 'Quãng ba Picardy phổ biến nhất thời Baroque, như ở cuối Sarabande trong French Suite số 1 giọng {D} thứ của Bach, và vẫn được dùng đến nay.',
            en: 'The Picardy 3rd was most common in the Baroque era, as at the end of the Sarabande of Bach\'s French Suite No. 1 in {D} minor, and is still used today.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {E} thứ này kết bằng hợp âm gì?', en: 'This phrase is in {E} minor. Which chord ends it?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Em', time: '4/4', notes: 'E3+E4+G4+B4:h A2+E4+A4+C5:h | B2+D#4+F#4+B4:h E3+E4+G#4+B4:h ||' },
        { type: 'play', notes: 'E3+E4+G4+B4:h A2+E4+A4+C5:h B2+D#4+F#4+B4:h E3+E4+G#4+B4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'i thứ', en: 'The minor i' } },
          { text: { vi: 'I trưởng, quãng ba Picardy', en: 'The major I, a Picardy 3rd' }, correct: true },
          { text: { vi: '♭VI mượn', en: 'The borrowed ♭VI' } },
        ],
      },
      reason: {
        vi: 'Hợp âm cuối là {E}–{G#}–{B}: nốt ba {G#} nâng lên làm I trưởng, quãng ba Picardy.',
        en: 'The last chord is {E}–{G#}–{B}: the raised third, {G#}, makes a major I, a Picardy 3rd.',
      },
    },
  ],
} satisfies Lesson
