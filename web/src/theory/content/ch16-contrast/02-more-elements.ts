import type { Lesson } from '@/theory/types'

/**
 * Book 15.1 (second half): timbre, texture, articulation (staccato and
 * legato), dynamics and register.
 */
export default {
  id: 'more-elements',
  title: { vi: 'Âm sắc, kết cấu, cách phát âm', en: 'Timbre, texture, articulation' },
  minutes: 5,
  sources: [{ section: '15.1', url: 'https://musictheory.pugetsound.edu/mt21c/The-Elements-of-Music.html' }],
  recap: [
    { vi: 'Âm sắc là màu tiếng của nhạc cụ', en: 'Timbre is the tone color of an instrument' },
    { vi: 'Kết cấu: số bè và độ hoạt động của từng bè', en: 'Texture: how many voices, and how active each is' },
    { vi: 'Ngắt tiếng thì ngắn, tách; liền tiếng thì dài, nối', en: 'Staccato is short and clipped; legato long and connected' },
    { vi: 'Cường độ là to hay nhỏ; âm khu là cao, trung hay thấp', en: 'Dynamics are loud or soft; register is high, middle or low' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Âm sắc', en: 'Timbre' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Âm sắc** (timbre) là màu tiếng. Sáo, vĩ cầm và kèn trumpet chơi cùng một nốt vẫn nghe khác nhau.',
            en: '**Timbre** is tone color. A flute, a violin and a trumpet playing the same note still sound different.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Một nhạc cụ cũng có nhiều âm sắc: vĩ cầm kéo bằng cung nghe khác hẳn khi gảy bằng ngón tay. Đổi nhạc cụ chơi giai điệu là một cách tạo tương phản.',
            en: 'One instrument can make several tone colors too: a bowed violin sounds quite unlike a plucked one. Handing the melody to another instrument is one way to make contrast.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Các ví dụ ở đây đều là tiếng piano, nên hãy nghe âm sắc trong những bản thu của dàn nhạc thật.',
            en: 'The examples here are all piano, so listen for timbre in recordings of real ensembles.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Kết cấu', en: 'Texture' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết cấu** (texture) có hai chiều. Chiều dọc là số **bè** (voices) vang cùng lúc; chiều ngang là độ hoạt động tiết tấu của từng bè.',
            en: '**Texture** has two planes. The vertical plane is the number of **voices** sounding at once; the horizontal plane is the rhythmic activity of each voice.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Một giai điệu đứng một mình nghe mỏng, nhẹ. Thêm bè đệm, cùng giai điệu ấy nghe dày hơn hẳn.',
            en: 'A melody on its own sounds thin and light. Add accompanying voices and the same melody sounds much thicker.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'E5:q D5:q C5:q B4:q | C5:w ||' },
        { type: 'play', notes: 'E5:q D5:q C5:q B4:q | C5:w', label: { vi: 'Nghe một bè', en: 'Hear one voice' } },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G4+C5+E5:q G2+G4+B4+D5:q A2+E4+A4+C5:q G2+D4+G4+B4:q | C3+E4+G4+C5:w ||' },
        { type: 'play', notes: 'C3+G4+C5+E5:q G2+G4+B4+D5:q A2+E4+A4+C5:q G2+D4+G4+B4:q | C3+E4+G4+C5:w', label: { vi: 'Nghe bốn bè', en: 'Hear four voices' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn nào có kết cấu dày hơn?', en: 'Which section has the thicker texture?' },
      blocks: [
        { type: 'play', notes: 'G4:q A4:q B4:q G4:q | C5:w', label: { vi: 'Nghe đoạn 1', en: 'Hear section 1' } },
        { type: 'play', notes: 'C3+E4+G4:q F2+F4+A4:q G2+D4+B4:q C3+E4+G4:q | C3+E4+G4+C5:w', label: { vi: 'Nghe đoạn 2', en: 'Hear section 2' } },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn 1', en: 'Section 1' } },
          { text: { vi: 'Đoạn 2', en: 'Section 2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đoạn 1 chỉ có một bè; đoạn 2 có ba, bốn bè vang cùng lúc, nên dày hơn.',
        en: 'Section 1 has a single voice; section 2 has three or four sounding at once, so it is thicker.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Cách phát âm', en: 'Articulation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Cách phát âm** (articulation) là cách nốt được nhả ra. **Ngắt tiếng** (staccato): nốt ngắn, tách rời. **Liền tiếng** (legato): nốt dài, nối liền vào nhau.',
            en: '**Articulation** is how notes are released. **Staccato**: short, clipped notes. **Legato**: long, sustained, connected notes.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q B4:q A4:q G4:q | F4:q E4:q D4:q C4:q ||' },
        { type: 'play', notes: 'C5:q B4:q A4:q G4:q | F4:q E4:q D4:q C4:q', label: { vi: 'Nghe liền tiếng', en: 'Hear it legato' } },
        { type: 'play', notes: 'C5:16 R:16 R:8 B4:16 R:16 R:8 A4:16 R:16 R:8 G4:16 R:16 R:8 | F4:16 R:16 R:8 E4:16 R:16 R:8 D4:16 R:16 R:8 C4:16 R:16 R:8', label: { vi: 'Nghe ngắt tiếng', en: 'Hear it staccato' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong bản nhạc, ngắt tiếng được ghi bằng một chấm nhỏ trên hoặc dưới đầu nốt.',
            en: 'In a score, staccato is marked by a small dot above or below the notehead.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc này được chơi thế nào?', en: 'How is this phrase played?' },
      blocks: [
        { type: 'play', notes: 'G4:16 R:16 R:8 G4:16 R:16 R:8 E4:16 R:16 R:8 C4:16 R:16 R:8 | D4:16 R:16 R:8 E4:16 R:16 R:8 C4:16 R:16 R:8 R:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Liền tiếng', en: 'Legato' } },
          { text: { vi: 'Ngắt tiếng', en: 'Staccato' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi nốt tắt ngay, để lại khoảng lặng trước nốt sau, nên đó là ngắt tiếng.',
        en: 'Each note stops at once, leaving a gap before the next, so it is staccato.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Cường độ và âm khu', en: 'Dynamics and register' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Cường độ** (dynamics) là to hay nhỏ: một đoạn nhỏ nhẹ rồi một đoạn to là tương phản rất dễ nghe.',
            en: '**Dynamics** are loud versus soft: a soft section followed by a loud one is an easy contrast to hear.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Âm khu** (register) là cao, trung hay thấp. Cùng một giai điệu đặt ở âm khu thấp rồi lên âm khu cao nghe như hai đoạn khác nhau.',
            en: '**Register** is high versus middle versus low. The same melody set low, then high, sounds like two different sections.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3:q E3:q G3:q E3:q | C3:h R:h@b || C5:q E5:q G5:q E5:q | C5:h R:h ||' },
        { type: 'play', notes: 'C3:q E3:q G3:q E3:q | C3:h R:h', label: { vi: 'Nghe âm khu thấp', en: 'Hear it low' } },
        { type: 'play', notes: 'C5:q E5:q G5:q E5:q | C5:h R:h', label: { vi: 'Nghe âm khu cao', en: 'Hear it high' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Muốn đoạn mới ở âm khu cao hơn một quãng tám, nốt {E4} phải chuyển thành nốt nào?',
        en: 'To set a new section an octave higher, what does {E4} become?',
      },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{E3}', en: '{E3}' } },
          { text: { vi: '{E5}', en: '{E5}' }, correct: true },
          { text: { vi: '{F4}', en: '{F4}' } },
        ],
      },
      reason: {
        vi: 'Lên một quãng tám vẫn là nốt {E}, ở quãng tám trên: {E5}.',
        en: 'An octave up is still {E}, in the octave above: {E5}.',
      },
    },
  ],
} satisfies Lesson
