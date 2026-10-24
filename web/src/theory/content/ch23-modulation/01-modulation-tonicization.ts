import type { Lesson } from '@/theory/types'

/**
 * Book 22.1: modulation and the pop "key change" (the book's song examples
 * replaced by a tune of our own); 22.2: tonicization against modulation, and
 * the cadential formula ii6–I64–V–I that confirms a new key. No practice
 * link: no drill asks keys of a passage or cadences.
 */
export default {
  id: 'modulation-tonicization',
  title: { vi: 'Chuyển giọng và chủ âm hóa', en: 'Modulation and tonicization' },
  minutes: 5,
  sources: [
    { section: '22.1', url: 'https://musictheory.pugetsound.edu/mt21c/ModulationIntroduction.html' },
    { section: '22.2', url: 'https://musictheory.pugetsound.edu/mt21c/TonicizationVersusModulation.html' },
  ],
  recap: [
    { vi: 'Chuyển giọng là đổi giọng ngay trong một bản nhạc', en: 'Modulation is a change of key within a piece' },
    { vi: 'Chủ âm hóa chỉ làm một hợp âm nghe như chủ trong chốc lát', en: 'Tonicization makes a chord sound like a tonic only for a moment' },
    { vi: 'Một kết ở giọng mới xác nhận lần chuyển giọng', en: 'A cadence in the new key confirms a modulation' },
    { vi: 'Công thức kết hay gặp: ii⁶–I⁶₄–V–I', en: 'A common cadential formula: ii⁶–I⁶₄–V–I' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chuyển giọng là gì', en: 'What modulation is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chuyển giọng** (modulation) là đổi giọng ngay trong một bản nhạc. Nhạc pop hay gọi đó là **đổi tông** (key change): cả đoạn nhạc nhảy lên giọng mới, thường ở gần cuối bài.',
            en: '**Modulation** is a change of key within a piece. Popular music often calls it a **key change**: the music jumps up to a new key, often near the end of a song.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4:q E4:q G4:q E4:q | F4:q D4:q C4:h || D4:q F#4:q A4:q F#4:q | G4:q E4:q D4:h ||' },
        {
          type: 'play',
          notes: 'C4:q E4:q G4:q E4:q F4:q D4:q C4:h D4:q F#4:q A4:q F#4:q G4:q E4:q D4:h',
          label: { vi: 'Nghe ở giọng {C}, rồi giọng {D}', en: 'Hear it in {C}, then in {D}' },
        },
        {
          type: 'tip',
          text: {
            vi: 'Nhạc cổ điển thường dành chữ chuyển giọng cho cách đổi giọng chậm và kín đáo hơn. Đổi tông kiểu pop gần với chuyển giọng trực tiếp, ở cuối chương này.',
            en: 'Classical theory usually keeps the word modulation for slower, subtler changes of key. The pop key change is close to direct modulation, at the end of this chapter.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc đi từ giọng {F} trưởng sang giọng nào?', en: 'The tune moves from {F} major to which key?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'F4:q A4:q C5:q A4:q | Bb4:q G4:q F4:h || G4:q B4:q D5:q B4:q | C5:q A4:q G4:h ||' },
        { type: 'play', notes: 'F4:q A4:q C5:q A4:q Bb4:q G4:q F4:h G4:q B4:q D5:q B4:q C5:q A4:q G4:h' },
      ],
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Lần hai, câu nhạc bắt đầu và dừng trên {G}, cao hơn một nguyên cung, với {B} thay cho {Bb}.',
        en: 'The second time the tune starts and ends on {G}, a whole step higher, with {B} in place of {Bb}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chủ âm hóa hay chuyển giọng', en: 'Tonicization or modulation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chủ âm hóa** (tonicization) dùng **hợp âm át phụ** (secondary dominant) để một hợp âm nghe như chủ trong chốc lát, như V/V–V. Nó có thể chỉ dài hai hợp âm hoặc vài ô nhịp, rồi nhạc quay về giọng cũ.',
            en: '**Tonicization** uses a **secondary dominant** to make a chord sound like a tonic for a moment, as in V/V–V. It can be as short as two chords or last several measures, and then the music returns to the home key.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+C5 D3+F#4+A4+D5 G2+G4+B4+D5 C3+G4+C5+E5', labels: ['I', 'V/V', 'V', 'I'] },
        { type: 'play', notes: 'C3+E4+G4+C5:h D3+F#4+A4+D5:h G2+G4+B4+D5:h C3+G4+C5+E5:w', label: { vi: 'Nghe I–V/V–V–I', en: 'Hear I–V/V–V–I' } },
        {
          type: 'text',
          text: {
            vi: 'Chuyển giọng thì khác: nhạc ở lại giọng mới, và một kết ở giọng mới xác nhận giọng ấy.',
            en: 'A modulation is different: the music stays in the new key, and a cadence in that key confirms it.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Công thức kết', en: 'The cadential formula' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Kết xác nhận giọng mới thường theo **công thức kết** (cadential formula) ii⁶–I⁶₄–V–I: tiền át, át, át, chủ. Công thức này xác lập giọng mạnh hơn một kết chính V–I đơn thuần.',
            en: 'The cadence that confirms a new key often follows the **cadential formula** ii⁶–I⁶₄–V–I: pre-dominant, dominant, dominant, tonic. It establishes a key more strongly than a plain V–I authentic cadence.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'G', notes: 'C3+E4+A4+C5 D3+D4+G4+B4 D3+D4+F#4+A4 G2+D4+G4+B4', labels: ['ii\n6', 'I\n6\n4', 'V', 'I'] },
        { type: 'play', notes: 'C3+E4+A4+C5:h D3+D4+G4+B4:h D3+D4+F#4+A4:h G2+D4+G4+B4:w', label: { vi: 'Nghe ở giọng {G} trưởng', en: 'Hear it in {G} major' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong các bài chorale của Bach, hợp âm đổi theo từng nốt đen. Vì vậy khó phân biệt chủ âm hóa với một lần chuyển giọng ngắn kết bằng V–I.',
            en: 'In Bach chorales the chords change every quarter note. So a tonicization and a short modulation ending on V–I can be hard to tell apart.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Điều gì xác nhận một lần chuyển giọng?', en: 'What confirms a modulation?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một hợp âm át phụ', en: 'A secondary dominant' } },
          { text: { vi: 'Một kết ở giọng mới', en: 'A cadence in the new key' }, correct: true },
          { text: { vi: 'Một dấu hóa xuất hiện một lần', en: 'An accidental that appears once' } },
        ],
      },
      reason: {
        vi: 'Hợp âm át phụ chỉ chủ âm hóa; chuyển giọng cần nhạc ở lại và kết ở giọng mới.',
        en: 'A secondary dominant only tonicizes; a modulation needs the music to stay and cadence in the new key.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc này chủ âm hóa hay chuyển giọng?', en: 'Does this phrase tonicize or modulate?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'F', notes: 'F3+F4+A4+C5 A2+E4+A4+C#5 G2+D4+Bb4+D5 C3+E4+Bb4+C5 F2+F4+A4+C5', labels: ['I', 'V/ii', 'ii', 'V7', 'I'] },
        { type: 'play', notes: 'F3+F4+A4+C5:h A2+E4+A4+C#5:h G2+D4+Bb4+D5:h C3+E4+Bb4+C5:h F2+F4+A4+C5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ âm hóa', en: 'It tonicizes' }, correct: true },
          { text: { vi: 'Chuyển giọng', en: 'It modulates' } },
        ],
      },
      reason: {
        vi: 'V/ii chỉ làm Gm nghe như chủ một lúc; câu nhạc kết V7–I ở giọng {F} trưởng.',
        en: 'V/ii makes Gm sound like a tonic for a moment only; the phrase cadences V7–I in {F} major.',
      },
    },
  ],
} satisfies Lesson
