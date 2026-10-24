import type { Lesson } from '@/theory/types'

/**
 * Book 29.2: borrowed chords are voiced like their diatonic versions, ♭6
 * resolves down by step, V–♭VI is handled like the deceptive cadence in
 * minor, and the other borrowed chords simply move smoothly.
 */
export default {
  id: 'borrowed-chords',
  title: { vi: 'Hợp âm mượn', en: 'Borrowed chords' },
  minutes: 4,
  sources: [{ section: '29.2', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingBorrowedChords.html' }],
  recap: [
    { vi: 'Hợp âm mượn được dẫn bè như bản thuận giọng: iiø7 như ii7', en: 'Borrowed chords are voiced like their diatonic versions: iiø7 like ii7' },
    { vi: 'Bậc 6 hạ đi xuống một bậc', en: 'The lowered sixth falls by step' },
    { vi: 'Kết V–♭VI: nốt ba của V đi lên, hai bè kia ngược chiều với bass', en: 'V–♭VI: the third of V rises, the other two voices move against the bass' },
    { vi: '♭III, ♭VII, i, v: dẫn bè mượt, tránh song song', en: '♭III, ♭VII, i, v: move smoothly, avoid parallels' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bậc 6 hạ đi xuống', en: 'The lowered sixth falls' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm mượn** (borrowed chord) được dẫn bè như bản thuận giọng của nó: iiø7 như ii7, iv như IV. Riêng bậc 6 hạ (♭6) là **nốt khuynh hướng** (tendency tone): hãy giải quyết nó đi xuống một bậc.',
            en: '**Borrowed chords** are voice-led like their diatonic versions: iiø7 like ii7, iv like IV. But the lowered sixth (♭6) is a **tendency tone**: resolve it down by step.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} trưởng, iv mượn {Ab}; bè tenor đưa {Ab} xuống {G} ở V7.',
            en: 'In {C} major, iv borrows {Ab}; the tenor takes {Ab} down to {G} in V7.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'C3+G3+E4+C5:q F2+Ab3+F4+C5:q G2+G3+F4+B4:q C3+G3+E4+C5:q ||', labels: ['I', 'iv', 'V7', 'I'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+C5:q F2+Ab3+F4+C5:q G2+G3+F4+B4:q C3+G3+E4+C5:h', label: { vi: 'Nghe I–iv–V7–I', en: 'Hear I–iv–V7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, iv là {C}–{Eb}–{G}. Đến V, {Eb} đi đến nốt nào?', en: 'In {G} major, iv is {C}–{Eb}–{G}. Going to V, where does {Eb} go?' },
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: '{Eb} là bậc 6 hạ của giọng {G} trưởng, nên nó đi xuống một bậc đến {D}, nốt năm của V.',
        en: '{Eb} is the lowered sixth of {G} major, so it falls by step to {D}, the fifth of V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Kết V–♭VI', en: 'The V–♭VI cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Kết V–♭VI dẫn bè như kết đánh lừa ở giọng thứ: nốt ba của V đi lên một bậc, hai bè trên còn lại đi **chuyển động ngược chiều** (contrary motion) với bass.',
            en: 'The V–♭VI cadence is voiced like the deceptive cadence in minor: the third of V rises by step, and the other two upper voices move in **contrary motion** to the bass.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} trưởng, {B} lên {C}, còn {G} và {D} đi xuống {Eb} và {C}, nên ♭VI nhân đôi nốt ba {C}.',
            en: 'In {C} major, {B} rises to {C}, while {G} and {D} fall to {Eb} and {C}, so ♭VI doubles its third, {C}.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'C3+G3+E4+C5:q F2+A3+F4+C5:q G2+G3+D4+B4:q Ab2+Eb3+C4+C5:q ||', labels: ['I', 'IV', 'V', '♭VI'], highlight: [3] },
        { type: 'play', notes: 'C3+G3+E4+C5:q F2+A3+F4+C5:q G2+G3+D4+B4:q Ab2+Eb3+C4+C5:h', label: { vi: 'Nghe V–♭VI', en: 'Hear V–♭VI' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong kết V–♭VI, nốt nào của V đi lên một bậc?', en: 'In the V–♭VI cadence, which note of V rises by step?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt gốc', en: 'The root' } },
          { text: { vi: 'Nốt ba (cảm âm)', en: 'The third (the leading tone)' }, correct: true },
          { text: { vi: 'Nốt năm', en: 'The fifth' } },
        ],
      },
      reason: {
        vi: 'Như kết đánh lừa ở giọng thứ, cảm âm đi lên chủ âm, còn hai bè kia đi ngược chiều với bass.',
        en: 'As in the deceptive cadence in minor, the leading tone rises to the tonic and the other two voices move against the bass.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Các hợp âm mượn khác', en: 'Other borrowed chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '♭III, ♭VII, i và v không có quy tắc riêng. Hãy dẫn bè càng mượt càng tốt và tránh quãng 5, quãng 8 song song. Ở đây bass đi xuống {Bb} còn ba bè trên đi lên.',
            en: '♭III, ♭VII, i and v have no special rules. Voice-lead them as smoothly as you can and avoid parallel fifths and octaves. Here the bass falls to {Bb} while the three upper voices rise.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'C3+G3+E4+C5:h Bb2+Bb3+F4+D5:h | C3+G3+E4+C5:w ||', labels: ['I', '♭VII', 'I'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+C5:h Bb2+Bb3+F4+D5:h C3+G3+E4+C5:w', label: { vi: 'Nghe I–♭VII–I', en: 'Hear I–♭VII–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} trưởng, iiø7 là {E}–{G}–{Bb}–{D}. Đến V, {Bb} đi đến nốt nào?', en: 'In {D} major, iiø7 is {E}–{G}–{Bb}–{D}. Going to V, where does {Bb} go?' },
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: '{Bb} là bậc 6 hạ mượn từ giọng {D} thứ, nên nó đi xuống một bậc đến {A}, nốt gốc của V.',
        en: '{Bb} is the lowered sixth borrowed from {D} minor, so it falls by step to {A}, the root of V.',
      },
    },
  ],
} satisfies Lesson
