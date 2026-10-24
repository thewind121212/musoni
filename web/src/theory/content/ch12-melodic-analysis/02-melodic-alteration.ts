import type { Lesson } from '@/theory/types'

/**
 * Book 11.2.1-11.2.3: the first three melodic alterations, inversion (real
 * and tonal), intervallic change, augmentation and diminution.
 */
export default {
  id: 'melodic-alteration',
  title: { vi: 'Biến đổi giai điệu', en: 'Melodic alteration' },
  minutes: 5,
  sources: [{ section: '11.2', url: 'https://musictheory.pugetsound.edu/mt21c/MelodicAlteration.html' }],
  practice: { drill: 'intervals', level: 1, durationSec: 60 },
  recap: [
    { vi: 'Đảo chiều lật motif: đi lên thành đi xuống', en: 'Inversion mirrors a motive: up becomes down' },
    { vi: 'Đảo chiều theo giọng giữ cỡ quãng, dùng nốt của giọng', en: 'Tonal inversion keeps the sizes and uses the notes of the key' },
    { vi: 'Đổi quãng: giữ tiết tấu, đổi vài quãng', en: 'Intervallic change: same rhythm, some intervals changed' },
    { vi: 'Tăng / giảm trường độ: nhân đôi / chia đôi mọi trường độ', en: 'Augmentation / diminution: every duration doubled / halved' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đảo chiều', en: 'Inversion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Motif hiếm khi trở lại y nguyên. Có hơn chục cách **biến đổi giai điệu** (melodic alteration); chương này học bảy cách cơ bản.',
            en: 'A motive seldom comes back exactly the same. There are more than a dozen ways of **melodic alteration**; this chapter covers seven basic ones.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Đảo chiều** (inversion) lật motif lộn ngược, như núi soi bóng dưới hồ: mỗi bước đi lên thành đi xuống, cùng cỡ quãng.',
            en: '**Inversion** turns a motive upside down, like mountains reflected in a lake: each step up becomes a step down of the same size.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | G4:8 F4:8 E4:q C4:h',
          labels: ['1', '', '', '', { vi: 'Đảo', en: 'Inv.' }, '', '', ''],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h G4:8 F4:8 E4:q C4:h' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Thực và theo giọng', en: 'Real and tonal' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đảo chiều thực** (real inversion) giữ đúng cả tính chất từng quãng. **Đảo chiều theo giọng** (tonal inversion) chỉ giữ cỡ quãng và dùng nốt của giọng, nên quãng 2 trưởng có thể thành quãng 2 thứ.',
            en: '**Real inversion** keeps every interval’s exact quality. **Tonal inversion** keeps only the sizes and stays on the notes of the key, so a major 2nd may become a minor 2nd.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Motif {C} {D} {E} {G} đảo thực từ {G} cần {Eb}; đảo theo giọng ở {C} trưởng dùng {E}. Nhạc có giọng hầu như luôn đảo theo giọng.',
            en: 'The motive {C} {D} {E} {G} in real inversion from {G} needs {Eb}; in tonal inversion in {C} major it uses {E}. Tonal music almost always inverts tonally.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'G4:8 F4:8 Eb4:q C4:h | G4:8 F4:8 E4:q C4:h',
          labels: [{ vi: 'Thực', en: 'Real' }, '', '', '', { vi: 'Giọng', en: 'Tonal' }, '', '', ''],
          highlight: [2, 6],
        },
        { type: 'play', notes: 'G4:8 F4:8 Eb4:q C4:h G4:8 F4:8 E4:q C4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đảo chiều motif này theo giọng {C} trưởng, bắt đầu từ {C5}. Nốt cuối là gì?',
        en: 'Invert this motive tonally in {C} major, starting on {C5}. What is its last note?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:8 G4:8 F4:q A4:h' },
        { type: 'play', notes: 'E4:8 G4:8 F4:q A4:h' },
      ],
      answer: { type: 'key', note: 'G', blackKeys: 'b' },
      reason: {
        vi: 'Lật từng bước: lên quãng 3 thành xuống {A4}, xuống quãng 2 thành lên {B4}, lên quãng 3 thành xuống {G4}.',
        en: 'Flip each move: up a 3rd becomes down to {A4}, down a 2nd becomes up to {B4}, up a 3rd becomes down to {G4}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đổi quãng', en: 'Intervallic change' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đổi quãng** (intervallic change) kém chính xác hơn đảo chiều. Tiết tấu thường giữ nguyên và motif vẫn nhận ra được, nhưng vài quãng khác đi.',
            en: '**Intervallic change** is less exact than inversion. The rhythm usually stays and the motive is still recognizable, but some intervals are different.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây nốt xanh đổi: lần hai nhảy quãng 4 thay vì quãng 3, lần ba còn đổi hướng, đi xuống thay vì đi lên.',
            en: 'The blue notes change: the second time leaps a 4th instead of a 3rd, and the third time even changes direction, going down instead of up.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | C4:8 D4:8 E4:q A4:h | C4:8 D4:8 E4:q D4:h',
          highlight: [7, 11],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h C4:8 D4:8 E4:q A4:h C4:8 D4:8 E4:q D4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:8 F4:8 G4:q C5:h | E4:8 F4:8 A4:q C5:h' },
        { type: 'play', notes: 'E4:8 F4:8 G4:q C5:h E4:8 F4:8 A4:q C5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đảo chiều', en: 'Inversion' } },
          { text: { vi: 'Đổi quãng', en: 'Intervallic change' }, correct: true },
          { text: { vi: 'Tăng trường độ', en: 'Augmentation' } },
        ],
      },
      reason: {
        vi: 'Tiết tấu và hướng đi giữ nguyên, chỉ nốt thứ ba lên {A4} thay vì {G4}, nên hai quãng khác đi.',
        en: 'The rhythm and direction stay the same; only the third note goes up to {A4} instead of {G4}, so two intervals change.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tăng và giảm trường độ', en: 'Augmentation and diminution' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tăng trường độ** (augmentation) thường nhân đôi mọi trường độ của motif. **Giảm trường độ** (diminution) ngược lại: chia đôi mọi trường độ, hoặc nói chung là dùng nốt ngắn hơn.',
            en: '**Augmentation** usually doubles every duration in a motive. **Diminution** is the opposite: every duration halved, or more loosely, shorter note values.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:q G4:h | C4:q D4:q E4:h | G4:w | C4:16 D4:16 E4:8 G4:q C4:16 D4:16 E4:8 G4:q',
          labels: ['1', '', '', '', { vi: 'Tăng', en: 'Aug.' }, '', '', '', { vi: 'Giảm', en: 'Dim.' }, '', '', '', '', '', '', ''],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:q G4:h C4:q D4:q E4:h G4:w C4:16 D4:16 E4:8 G4:q C4:16 D4:16 E4:8 G4:q' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 2 biến đổi motif thế nào?', en: 'How does measure 2 alter the motive?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q G4:q F4:h | E4:8 G4:8 F4:q E4:8 G4:8 F4:q' },
        { type: 'play', notes: 'E4:q G4:q F4:h E4:8 G4:8 F4:q E4:8 G4:8 F4:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tăng trường độ', en: 'Augmentation' } },
          { text: { vi: 'Giảm trường độ', en: 'Diminution' }, correct: true },
          { text: { vi: 'Đổi quãng', en: 'Intervallic change' } },
        ],
      },
      reason: {
        vi: 'Cùng các nốt {E} {G} {F}, nhưng mọi trường độ chia đôi, nên motif vừa hai lần trong một ô nhịp.',
        en: 'The same notes {E} {G} {F}, but every duration is halved, so the motive fits twice in one measure.',
      },
    },
  ],
} satisfies Lesson
