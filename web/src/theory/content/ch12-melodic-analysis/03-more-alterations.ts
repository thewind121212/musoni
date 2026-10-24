import type { Lesson } from '@/theory/types'

/**
 * Book 11.2.4-11.2.7: the other four melodic alterations, rhythmic change,
 * ornamentation, extension and retrograde; a sequence is not labelled.
 */
export default {
  id: 'more-alterations',
  title: { vi: 'Thêm cách biến đổi', en: 'More melodic alterations' },
  minutes: 5,
  sources: [{ section: '11.2', url: 'https://musictheory.pugetsound.edu/mt21c/MelodicAlteration.html' }],
  recap: [
    { vi: 'Đổi tiết tấu: vài trường độ đổi, không phải tất cả', en: 'Rhythmic change: some durations vary, not all' },
    { vi: 'Trang trí: thêm nốt lướt, nốt thêu vào motif', en: 'Ornamentation: passing and neighbor tones added to a motive' },
    { vi: 'Nối dài: thêm nhạc vào cuối motif', en: 'Extension: material added to the end of a motive' },
    { vi: 'Đi ngược: các nốt theo thứ tự ngược lại', en: 'Retrograde: the notes in reverse order' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đổi tiết tấu', en: 'Rhythmic change' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đổi tiết tấu** (rhythmic change) giống đổi quãng nhưng ở trường độ: vài trường độ của motif đổi, không phải tất cả. Nếu mọi trường độ cùng nhân đôi hay chia đôi, đó là tăng hay giảm trường độ.',
            en: '**Rhythmic change** is like intervallic change, but for durations: some, not all, of the motive’s rhythmic values vary. If every duration is doubled or halved, that is augmentation or diminution.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | C4:q D4:8 E4:8 G4:h',
          highlight: [4, 5, 6],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h C4:q D4:8 E4:8 G4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q G4:q F4:h | E4:q. G4:8 F4:h' },
        { type: 'play', notes: 'E4:q G4:q F4:h E4:q. G4:8 F4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đổi tiết tấu', en: 'Rhythmic change' }, correct: true },
          { text: { vi: 'Tăng trường độ', en: 'Augmentation' } },
          { text: { vi: 'Đổi quãng', en: 'Intervallic change' } },
        ],
      },
      reason: {
        vi: 'Các nốt giữ nguyên; hai nốt đầu đổi trường độ, còn nốt cuối thì không, nên đó là đổi tiết tấu.',
        en: 'The pitches stay; the first two notes change duration but the last does not, so it is rhythmic change.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Trang trí', en: 'Ornamentation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Trang trí** (ornamentation) thêm vào motif các nốt ngoài hợp âm như **nốt lướt** (passing tone) và **nốt thêu** (neighbor tone). Các nốt chính của motif vẫn còn đó.',
            en: '**Ornamentation** embellishes a motive with non-chord tones such as **passing tones** and **neighbor tones**. The motive’s main notes are still there.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở ô nhịp 2, {F4} là nốt lướt từ {E4} lên {G4}, còn {A4} là nốt thêu quanh {G4}.',
            en: 'In measure 2, {F4} is a passing tone from {E4} up to {G4}, and {A4} is a neighbor tone around {G4}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | C4:8 D4:8 E4:8 F4:8 G4:q A4:8 G4:8',
          highlight: [7, 9],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h C4:8 D4:8 E4:8 F4:8 G4:q A4:8 G4:8' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nối dài', en: 'Extension' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nối dài** (extension) là khi motif trở lại và có thêm nhạc nối vào cuối nó. Ở đây motif giữ nguyên, rồi đi tiếp lên {C5}.',
            en: 'In **extension**, a motive comes back with extra material added to its end. Here the motive stays the same, then carries on up to {C5}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | C4:8 D4:8 E4:q G4:h | A4:8 B4:8 C5:h.',
          highlight: [8, 9, 10],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h C4:8 D4:8 E4:q G4:h A4:8 B4:8 C5:h.' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q G4:q F4:h | E4:8 F4:8 G4:q F4:h' },
        { type: 'play', notes: 'E4:q G4:q F4:h E4:8 F4:8 G4:q F4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nối dài', en: 'Extension' } },
          { text: { vi: 'Đảo chiều', en: 'Inversion' } },
          { text: { vi: 'Trang trí', en: 'Ornamentation' }, correct: true },
        ],
      },
      reason: {
        vi: '{F4} chen vào là nốt lướt từ {E4} lên {G4}, còn các nốt của motif vẫn giữ nguyên.',
        en: 'The added {F4} is a passing tone from {E4} up to {G4}, and the motive’s own notes all stay.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đi ngược', en: 'Retrograde' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đi ngược** (retrograde) đọc motif từ nốt cuối về nốt đầu, đảo hẳn thứ tự các nốt. Cách này hiếm gặp trong nhạc có giọng.',
            en: '**Retrograde** reads the motive from its last note back to its first, an exact reversal of the order of the notes. It is rare in tonal music.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | G4:h E4:q D4:8 C4:8',
          labels: ['1', '', '', '', { vi: 'Ngược', en: 'Retr.' }, '', '', ''],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h G4:h E4:q D4:8 C4:8' },
        {
          type: 'tip',
          text: {
            vi: 'Nhắc lại motif ở cao độ khác (mô tiến) phổ biến đến mức ta không gọi tên nó như một cách biến đổi.',
            en: 'Repeating a motive at another pitch (a sequence) is so common that we do not label it as an alteration.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Viết motif này theo lối đi ngược. Nốt thứ hai là gì?',
        en: 'Write this motive in retrograde. What is the second note?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:8 G4:8 F4:q C5:h' },
        { type: 'play', notes: 'E4:8 G4:8 F4:q C5:h' },
      ],
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Đi ngược đọc từ cuối về đầu: {C5}, {F4}, {G4}, {E4}, nên nốt thứ hai là {F4}.',
        en: 'Retrograde reads from the end back: {C5}, {F4}, {G4}, {E4}, so the second note is {F4}.',
      },
    },
  ],
} satisfies Lesson
