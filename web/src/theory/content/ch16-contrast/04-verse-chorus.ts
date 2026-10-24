import type { Lesson } from '@/theory/types'

/**
 * Book 15.3: contrast between the sections of a popular song. The book
 * analyses a copyrighted song; this lesson uses a verse and chorus of our own
 * over one progression (I-vi-IV-V) to show the same ideas: a thin verse, a
 * thicker and higher chorus, a 3+3+2 post-chorus, and a progression that
 * does not change.
 */
export default {
  id: 'verse-chorus',
  title: { vi: 'Phiên khúc và điệp khúc', en: 'Verse and chorus' },
  minutes: 5,
  sources: [{ section: '15.3', url: 'https://musictheory.pugetsound.edu/mt21c/CreatingContrast-5.html' }],
  recap: [
    { vi: 'Phiên khúc mỏng hơn; điệp khúc dày hơn, cao hơn', en: 'The verse is thinner; the chorus thicker and higher' },
    { vi: 'Thêm hay bớt nhạc cụ làm kết cấu dày hay mỏng', en: 'Adding or dropping instruments thickens or thins the texture' },
    { vi: 'Một tiết tấu mới, như 3+3+2, cũng tạo được đoạn mới', en: 'A new rhythm, like 3+3+2, can mark a new section too' },
    { vi: 'Tiến trình hợp âm có thể gần như giữ nguyên', en: 'The chord progression can change very little' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Phiên khúc', en: 'The verse' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bài hát phổ thông thường xen **phiên khúc** (verse) với **điệp khúc** (chorus). Đây là phiên khúc của một bài tự viết, trên tiến trình I–vi–IV–V.',
            en: 'Popular songs often alternate a **verse** with a **chorus**. Here is the verse of a song of our own, over the progression I–vi–IV–V.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Phiên khúc chỉ có giai điệu ở âm khu trung và một bè bass: kết cấu mỏng, nhẹ.',
            en: 'The verse has only a melody in the middle register and a bass line: a thin, light texture.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+E4:q C3+G4:q A2+A4:q A2+E4:q | F2+F4:q F2+A4:q G2+G4:h ||', labels: ['I', '', 'vi', '', 'IV', '', 'V'] },
        { type: 'play', notes: 'C3+E4:q C3+G4:q A2+A4:q A2+E4:q | F2+F4:q F2+A4:q G2+G4:h', label: { vi: 'Nghe phiên khúc', en: 'Hear the verse' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Điệp khúc', en: 'The chorus' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Điệp khúc giữ nguyên tiến trình, nhưng giai điệu lên âm khu cao hơn và mỗi hợp âm có thêm bè. Kết cấu dày hơn, và ca sĩ thường hát to hơn.',
            en: 'The chorus keeps the progression, but the melody moves to a higher register and every chord gains voices. The texture is thicker, and the singer is usually louder.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+E4+G4+C5:q C3+G3+E4+G4+E5:q A2+E3+C4+A4+E5:q A2+E3+C4+E4+C5:q | F2+C3+C4+F4+A4:q F2+C3+F4+A4+C5:q G2+D3+D4+G4+B4:h ||', labels: ['I', '', 'vi', '', 'IV', '', 'V'] },
        { type: 'play', notes: 'C3+G3+E4+G4+C5:q C3+G3+E4+G4+E5:q A2+E3+C4+A4+E5:q A2+E3+C4+E4+C5:q | F2+C3+C4+F4+A4:q F2+C3+F4+A4+C5:q G2+D3+D4+G4+B4:h', label: { vi: 'Nghe điệp khúc', en: 'Hear the chorus' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Từ phiên khúc sang điệp khúc, những yếu tố nào thay đổi?', en: 'From verse to chorus, which elements change?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Âm khu và kết cấu', en: 'Register and texture' }, correct: true },
          { text: { vi: 'Giọng và điệu thức', en: 'Key and mode' } },
          { text: { vi: 'Tiết tấu và cách phát âm', en: 'Rhythm and articulation' } },
        ],
      },
      reason: {
        vi: 'Cả hai vẫn ở {C} trưởng, nốt đen, liền tiếng; điệp khúc chỉ cao hơn và có thêm bè.',
        en: 'Both stay in {C} major, in quarter notes, legato; the chorus is just higher, with more voices.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thêm và bớt bè', en: 'Adding and dropping voices' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Kết cấu thường đổi theo từng đoạn. Phiên khúc đầu có thể chỉ có giọng hát và guitar; phiên khúc sau thêm bass và trống, làm kết cấu dày lên.',
            en: 'Texture often changes from section to section. A first verse may hold only the voice and guitars; a second verse adds bass and drums, thickening the texture.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trước điệp khúc, nhạc cụ có thể bớt đi để kết cấu nhẹ lại. Sau điệp khúc, cả ban nhạc có thể cùng nhấn một tiết tấu mới, như 3+3+2.',
            en: 'Before the chorus, instruments may drop out to lighten the texture. After the chorus, the whole band may stress a new rhythm together, like 3+3+2.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+E4+G4+C5:q. C3+E4+G4+C5:q. C3+E4+G4+C5:q | A2+E4+A4+C5:q. A2+E4+A4+C5:q. A2+E4+A4+C5:q ||', labels: ['3', '3', '2', '3', '3', '2'] },
        { type: 'play', notes: 'C3+E4+G4+C5:q. C3+E4+G4+C5:q. C3+E4+G4+C5:q | A2+E4+A4+C5:q. A2+E4+A4+C5:q. A2+E4+A4+C5:q', bpm: 100, label: { vi: 'Nghe 3+3+2', en: 'Hear 3+3+2' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp này nhấn theo nhóm nốt móc đơn nào?', en: 'How does this measure group its eighth notes?' },
      blocks: [
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q. B4:q. B4:q ||' },
        { type: 'play', notes: 'B4:q. B4:q. B4:q | B4:q. B4:q. B4:q', bpm: 100 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2+2+2+2', en: '2+2+2+2' } },
          { text: { vi: '3+3+2', en: '3+3+2' }, correct: true },
          { text: { vi: '4+4', en: '4+4' } },
        ],
      },
      reason: {
        vi: 'Nốt đen chấm dôi bằng ba móc đơn, nốt đen bằng hai: 3+3+2 = 8.',
        en: 'A dotted quarter lasts three eighths and a quarter two: 3+3+2 = 8.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Điều gì giữ nguyên', en: 'What stays the same' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong bài của chúng ta, tiến trình hợp âm gần như không đổi qua các đoạn; ranh giới các đoạn được vạch bằng kết cấu, âm khu, tiết tấu và cường độ.',
            en: 'In our song the chord progression changes very little; the sections are marked out by texture, register, rhythm and dynamics.',
          },
        },
        {
          type: 'tip',
          text: {
            vi: 'Khi tự soạn hay phối khí, hãy chọn yếu tố nào đổi và yếu tố nào giữ ở mỗi đoạn.',
            en: 'When you compose or arrange, choose which elements change in each section and which stay.',
          },
        },
        { type: 'play', notes: 'C3+E4:q C3+G4:q A2+A4:q A2+E4:q | F2+F4:q F2+A4:q G2+G4:h', label: { vi: 'Nghe phiên khúc', en: 'Hear the verse' } },
        { type: 'play', notes: 'C3+G3+E4+G4+C5:q C3+G3+E4+G4+E5:q A2+E3+C4+A4+E5:q A2+E3+C4+E4+C5:q | F2+C3+C4+F4+A4:q F2+C3+F4+A4+C5:q G2+D3+D4+G4+B4:h', label: { vi: 'Nghe điệp khúc', en: 'Hear the chorus' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Yếu tố nào gần như giữ nguyên suốt bài ví dụ?', en: 'Which element changes least in our song?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết cấu', en: 'Texture' } },
          { text: { vi: 'Âm khu', en: 'Register' } },
          { text: { vi: 'Tiến trình hợp âm', en: 'The chord progression' }, correct: true },
        ],
      },
      reason: {
        vi: 'Các đoạn đều dựa trên I–vi–IV–V; các yếu tố khác mới là thứ thay đổi.',
        en: 'The sections all rest on I–vi–IV–V; it is the other elements that change.',
      },
    },
  ],
} satisfies Lesson
