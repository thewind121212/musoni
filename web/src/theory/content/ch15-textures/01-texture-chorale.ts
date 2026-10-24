import type { Lesson } from '@/theory/types'

/**
 * Book 14.1 (texture: vertical and horizontal) and 14.2 (chorale texture,
 * homorhythmic). No practice link: no drill trains texture.
 */
export default {
  id: 'texture-chorale',
  title: { vi: 'Kết cấu và kết cấu hợp xướng', en: 'Texture and chorale texture' },
  minutes: 4,
  sources: [
    { section: '14.1', url: 'https://musictheory.pugetsound.edu/mt21c/Texture.html' },
    { section: '14.2', url: 'https://musictheory.pugetsound.edu/mt21c/ChoraleTexture.html' },
  ],
  recap: [
    { vi: 'Chiều dọc của kết cấu: số nốt vang cùng lúc', en: 'The vertical side of texture: how many notes sound at once' },
    { vi: 'Chiều ngang: hoạt động tiết tấu, chậm hay nhanh', en: 'The horizontal side: rhythmic activity, slow or fast' },
    { vi: 'Kết cấu hợp xướng: một hợp âm cho mỗi nốt giai điệu', en: 'Chorale texture: a chord for every melody note' },
    { vi: 'Mọi bè cùng một tiết tấu: đồng tiết tấu', en: 'All parts in the same rhythm: homorhythmic' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Kết cấu: chiều dọc', en: 'Texture: the vertical side' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết cấu** (texture) là cách các nốt đan vào nhau, xét theo chiều dọc và chiều ngang. Chiều dọc là số nốt vang cùng lúc, hoặc số **bè** (voices) cùng chơi giai điệu.',
            en: '**Texture** is how the notes are woven together, seen vertically and horizontally. The vertical side is how many notes sound at once, or how many **voices** play melodies at once.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'E4+G4 C2+C3+G3+E4+G4+C5', labels: ['2', '6'] },
        { type: 'play', notes: 'E4+G4:h C2+C3+G3+E4+G4+C5:h', label: { vi: 'Nghe 2 nốt, rồi 6 nốt', en: 'Hear 2 notes, then 6' } },
        {
          type: 'tip',
          text: {
            vi: 'Càng nhiều nốt vang cùng lúc, kết cấu càng dày.',
            en: 'The more notes sound at once, the thicker the texture.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này có bao nhiêu nốt vang cùng lúc?', en: 'How many notes sound at once in this chord?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'F2+C3+A3+F4+C5' },
        { type: 'play', notes: 'F2+C3+A3+F4+C5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '3 nốt', en: '3 notes' } },
          { text: { vi: '4 nốt', en: '4 notes' } },
          { text: { vi: '5 nốt', en: '5 notes' }, correct: true },
        ],
      },
      reason: {
        vi: 'Khuông dưới có ba nốt, khuông trên có hai nốt: tổng cộng năm nốt.',
        en: 'The bass staff has three notes and the treble staff two: five in all.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Kết cấu: chiều ngang', en: 'Texture: the horizontal side' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chiều ngang là hoạt động tiết tấu: trường độ hay gặp nhất là chậm hay nhanh. Hai ví dụ dưới đây cùng bốn bè, cùng hợp âm, nhưng ví dụ đầu chậm, ví dụ sau dày nốt hơn.',
            en: 'The horizontal side is rhythmic activity: is the most common value slow or fast? Both examples below have four voices and the same chords, but the first is slow and the second is busier.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+E4+C5:h F3+A3+F4+C5:h' },
        { type: 'play', notes: 'C3+G3+E4+C5:h F3+A3+F4+C5:h', label: { vi: 'Nghe bản chậm', en: 'Hear the slow one' } },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+G3+E4+C5:8 C3+G3+E4+C5:8 C3+G3+E4+C5:8 C3+G3+E4+C5:8 F3+A3+F4+C5:8 F3+A3+F4+C5:8 F3+A3+F4+C5:8 F3+A3+F4+C5:8',
        },
        {
          type: 'play',
          notes: 'C3+G3+E4+C5:8 C3+G3+E4+C5:8 C3+G3+E4+C5:8 C3+G3+E4+C5:8 F3+A3+F4+C5:8 F3+A3+F4+C5:8 F3+A3+F4+C5:8 F3+A3+F4+C5:8',
          label: { vi: 'Nghe bản nhanh', en: 'Hear the busy one' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Điều nào thuộc về chiều ngang của kết cấu?', en: 'Which belongs to the horizontal side of texture?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Số nốt vang cùng lúc', en: 'How many notes sound at once' } },
          { text: { vi: 'Trường độ hay gặp nhất chậm hay nhanh', en: 'Whether the most common value is slow or fast' }, correct: true },
          { text: { vi: 'Số bè cùng chơi giai điệu', en: 'How many voices play melodies at once' } },
        ],
      },
      reason: {
        vi: 'Chiều ngang là hoạt động tiết tấu; số nốt hay số bè vang cùng lúc là chiều dọc.',
        en: 'The horizontal side is rhythmic activity; how many notes or voices sound at once is the vertical side.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Kết cấu hợp xướng', en: 'Chorale texture' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong **kết cấu hợp xướng** (chorale texture), mỗi nốt giai điệu, hoặc gần như mỗi nốt, có một hợp âm. Giai điệu nằm ở bè trên cùng, ba bè dưới làm **phần đệm** (accompaniment).',
            en: 'In a **chorale texture** there is a chord for every melody note, or nearly every one. The melody is in the top voice and the three lower voices are the **accompaniment**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mọi bè đi cùng một tiết tấu, nên kết cấu này còn gọi là **đồng tiết tấu** (homorhythmic).',
            en: 'All the parts move in the same rhythm, so this texture is also called **homorhythmic**.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+G3+E4+C5:q F3+A3+F4+C5:q G2+B3+G4+D5:q C3+G3+G4+E5:q | F3+A3+F4+D5:q C3+G3+E4+C5:q G2+B3+D4+B4:q C3+G3+E4+C5:q ||',
        },
        {
          type: 'play',
          notes: 'C3+G3+E4+C5:q F3+A3+F4+C5:q G2+B3+G4+D5:q C3+G3+G4+E5:q | F3+A3+F4+D5:q C3+G3+E4+C5:q G2+B3+D4+B4:q C3+G3+E4+C5:q',
          bpm: 76,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong kết cấu hợp xướng, các bè đi theo tiết tấu nào?', en: 'In a chorale texture, what rhythm do the parts move in?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cùng một tiết tấu', en: 'The same rhythm' }, correct: true },
          { text: { vi: 'Mỗi bè một tiết tấu riêng', en: 'A different rhythm in each part' } },
          { text: { vi: 'Chỉ giai điệu chuyển động', en: 'Only the melody moves' } },
        ],
      },
      reason: {
        vi: 'Mỗi nốt giai điệu có một hợp âm, nên mọi bè đổi nốt cùng lúc: đó là đồng tiết tấu.',
        en: 'Every melody note has its own chord, so all the parts change notes together: that is homorhythmic.',
      },
    },
  ],
} satisfies Lesson
