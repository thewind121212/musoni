import type { Lesson } from '@/theory/types'

/**
 * Book 10.6 double neighbor, 10.11 incomplete neighbor (moved up beside it:
 * both are neighbor figures), 10.7 anticipation, 10.8 pedal point. Our own
 * examples in place of the book's songs and score excerpts. No practice link.
 */
export default {
  id: 'anticipation-pedal',
  title: { vi: 'Thêu kép, đón trước và nốt giữ', en: 'Double neighbors, anticipations, pedal points' },
  minutes: 5,
  sources: [
    { section: '10.6', url: 'https://musictheory.pugetsound.edu/mt21c/DoubleNeighbor.html' },
    { section: '10.11', url: 'https://musictheory.pugetsound.edu/mt21c/IncompleteNeighbor.html' },
    { section: '10.7', url: 'https://musictheory.pugetsound.edu/mt21c/Anticipation.html' },
    { section: '10.8', url: 'https://musictheory.pugetsound.edu/mt21c/PedalPoint.html' },
  ],
  recap: [
    { vi: 'Thêu kép (DN): cả thêu trên và thêu dưới rồi mới về', en: 'Double neighbor (DN): both neighbors before the return' },
    { vi: 'Nốt đón trước (Ant): nốt của hợp âm sau vang lên sớm', en: 'Anticipation (Ant): a note of the next chord arrives early' },
    { vi: 'Nốt giữ (Ped): một nốt giữ nguyên khi hợp âm đổi', en: 'Pedal point (Ped): one note held while the chords change' },
    { vi: 'Xác định nốt trong hợp âm trước, rồi mới gọi tên', en: 'Find the chord tones first, then name the rest' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt thêu kép', en: 'The double neighbor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt thêu kép** (double neighbor), ghi tắt DN, có cả nốt thêu trên và thêu dưới trước khi quay về nốt ban đầu. Ở đây hai nốt trong hợp âm, {C} và {E}, đều được thêu kép.',
            en: 'A **double neighbor**, marked DN, has both the upper and the lower neighbor before the return to the starting note. Here the chord tones {C} and {E} each get one.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'C3+E3+G3+C5:8 C3+E3+G3+D5:8 C3+E3+G3+B4:8 C3+E3+G3+C5:8 | C3+E3+G3+E5:8 C3+E3+G3+F5:8 C3+E3+G3+D5:8 C3+E3+G3+E5:8 | C3+E3+G3+G5:h ||',
          labels: ['', 'DN', 'DN', '', '', 'DN', 'DN', '', ''],
        },
        { type: 'play', notes: 'C3+E3+G3+C5:8 C3+E3+G3+D5:8 C3+E3+G3+B4:8 C3+E3+G3+C5:8 C3+E3+G3+E5:8 C3+E3+G3+F5:8 C3+E3+G3+D5:8 C3+E3+G3+E5:8 C3+E3+G3+G5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Thêu kép dễ bị nhầm với nốt thoát và nốt dựa. Hãy xác định các nốt trong hợp âm trước.',
            en: 'A double neighbor is easily mistaken for an escape tone and an appoggiatura. Keep track of the chord tones first.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt thêu khuyết', en: 'The incomplete neighbor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhạc thật có những nốt không khớp hẳn kiểu nào, hoặc gọi được nhiều cách. **Nốt thêu khuyết** (incomplete neighbor), ghi tắt IN, là nốt thêu chỉ có một bước liền bậc: ở đây nó đến bằng bước nhảy, không nhấn, rồi đi liền bậc về.',
            en: 'Real music has notes that fit no pattern exactly, or can be named more than one way. An **incomplete neighbor**, marked IN, is a neighbor with only one step: here it is leapt to, unaccented, then steps back.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+E3+G3+C5:q. C3+E3+G3+F5:8 | C3+E3+G3+E5:h ||', labels: ['', 'IN', ''] },
        { type: 'play', notes: 'C3+E3+G3+C5:q. C3+E3+G3+F5:8 C3+E3+G3+E5:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai nốt {F5} và {D5} tạo thành gì?', en: 'What do the {F5} and the {D5} make?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+E3+G3+E5:8 C3+E3+G3+F5:8 C3+E3+G3+D5:8 C3+E3+G3+E5:8 | C3+E3+G3+C5:h ||' },
        { type: 'play', notes: 'C3+E3+G3+E5:8 C3+E3+G3+F5:8 C3+E3+G3+D5:8 C3+E3+G3+E5:8 C3+E3+G3+C5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai nốt lướt', en: 'Two passing tones' } },
          { text: { vi: 'Một nốt thêu kép', en: 'A double neighbor' }, correct: true },
          { text: { vi: 'Một nốt dựa và một nốt thoát', en: 'An appoggiatura and an escape tone' } },
        ],
      },
      reason: {
        vi: 'Từ {E5}, giai điệu lên thêu trên {F5}, xuống thêu dưới {D5}, rồi về {E5}: đó là thêu kép.',
        en: 'From {E5} the melody goes to the upper neighbor {F5}, then the lower neighbor {D5}, then back to {E5}: a double neighbor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt đón trước', en: 'The anticipation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt đón trước** (anticipation), ghi tắt Ant, là một nốt của hợp âm sau vang lên sớm, khi hợp âm cũ còn đang vang. Nó đến liền bậc và rời bằng chính nốt đó, và hay gặp ở kết.',
            en: 'An **anticipation**, marked Ant, is a note of the next chord that arrives early, while the old chord still sounds. It is approached by step, left by the same note, and is often found at cadences.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'G2+D3+G3+D5:q G2+D3+G3+B4:8 G2+D3+G3+C5:8 | C3+E3+G3+C5:h ||',
          labels: ['V', '', 'Ant', 'I'],
        },
        { type: 'play', notes: 'G2+D3+G3+D5:q G2+D3+G3+B4:8 G2+D3+G3+C5:8 C3+E3+G3+C5:h' },
        {
          type: 'tip',
          text: {
            vi: '**Nghịch phách** (syncopation) cũng hay tạo nốt đón trước: nốt của ô nhịp sau vang lên sớm ở cuối ô nhịp trước.',
            en: '**Syncopation** often makes anticipations too: a note of the next measure arrives early, at the end of the measure before.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {G} trưởng, câu nhạc kết V–I và giai điệu về {G5} trên hợp âm I. Nốt đón trước ngay trước đó là nốt gì?',
        en: 'In {G} major, a phrase ends V–I and the melody arrives on {G5} over I. What is the anticipation just before it?',
      },
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Nốt đón trước là nốt của hợp âm sau vang lên sớm, nên nó chính là {G}, rồi được giữ sang hợp âm I.',
        en: 'An anticipation is a note of the next chord sounding early, so it is {G} itself, then repeated over I.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt giữ', en: 'The pedal point' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt giữ** (pedal point), ghi tắt Ped, được giữ nguyên qua nhiều hợp âm. Nó bắt đầu là nốt trong hợp âm, rồi thành nốt ngoài hợp âm khi hợp âm đổi. Nốt giữ hay nằm ở bass, như bàn đạp của đàn organ.',
            en: 'A **pedal point**, marked Ped, is a note held through changing harmonies. It starts as a chord tone, then becomes a non-chord tone as the chords change. It is usually in the bass, like an organ’s foot pedals.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5:h C3+D4+F4+A4:h C3+F4+G4+B4+D5:h C3+E4+G4+C5:h ||',
          labels: ['I', 'ii\nPed', 'V7\nPed', 'I'],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:h C3+D4+F4+A4:h C3+F4+G4+B4+D5:h C3+E4+G4+C5:w' },
        {
          type: 'text',
          text: {
            vi: 'Khi nốt giữ ở bass, ta không cần ghi thế đảo của hợp âm. Nốt giữ cũng có thể ở bè cao, hoặc là **nốt giữ kép** (double pedal point), hai nốt thường cách nhau một quãng 5.',
            en: 'With a pedal point in the bass, the chord’s inversion need not be labeled. A pedal point can also be in a higher voice, or a **double pedal point**: two notes, often a fifth apart.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trên hợp âm ii ({D} {F} {A}), nốt bass {C3} là nốt gì?', en: 'Under the ii chord ({D} {F} {A}), what is the bass {C3}?' },
      blocks: [{ type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5:h C3+D4+F4+A4:h ||', labels: ['I', 'ii'] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt giữ', en: 'A pedal point' }, correct: true },
          { text: { vi: 'Nốt lướt', en: 'A passing tone' } },
          { text: { vi: 'Nốt trong hợp âm', en: 'A chord tone' } },
        ],
      },
      reason: {
        vi: '{C} không thuộc {D} {F} {A}, nhưng được giữ nguyên từ hợp âm I trước đó, nên nó là nốt giữ.',
        en: '{C} is not in {D} {F} {A} but is held over from the I chord before, so it is a pedal point.',
      },
    },
  ],
} satisfies Lesson
