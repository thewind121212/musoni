import type { Lesson } from '@/theory/types'

/** The chapter review on 15.1-15.3 (the book has no practice exercises for this chapter). */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 16', en: 'Chapter 16 review' },
  minutes: 4,
  sources: [
    { section: '15.1', url: 'https://musictheory.pugetsound.edu/mt21c/The-Elements-of-Music.html' },
    { section: '15.2', url: 'https://musictheory.pugetsound.edu/mt21c/Eine-kleine-ii.html' },
    { section: '15.3', url: 'https://musictheory.pugetsound.edu/mt21c/CreatingContrast-5.html' },
  ],
  recap: [
    { vi: 'Tám yếu tố âm nhạc tạo tương phản giữa các đoạn', en: 'The eight elements of music create contrast between sections' },
    { vi: 'Rondo của Mozart đổi các yếu tố ở đoạn B và C', en: 'Mozart’s rondo varies the elements in its B and C sections' },
    { vi: 'Phiên khúc và điệp khúc tương phản qua kết cấu và âm khu', en: 'Verse and chorus contrast in texture and register' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Dòng nhạc này là giai điệu hay âm hình lặp?', en: 'Is this line a melody or an ostinato?' },
      blocks: [
        { type: 'staff', clef: 'bass', time: '4/4', notes: 'A2:q E3:q A3:q E3:q | A2:q E3:q A3:q E3:q ||' },
        { type: 'play', notes: 'A2:q E3:q A3:q E3:q | A2:q E3:q A3:q E3:q | A2:q E3:q A3:q E3:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giai điệu', en: 'A melody' } },
          { text: { vi: 'Âm hình lặp', en: 'An ostinato' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bốn nốt {A} {E} {A} {E} lặp đi lặp lại không đổi, nên đó là âm hình lặp.',
        en: 'The four notes {A} {E} {A} {E} repeat unchanged, so it is an ostinato.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn C của Mozart bắt đầu ở giọng {C} thứ. Hợp âm chủ của giọng này có nốt ba là nốt nào?',
        en: 'Mozart’s C section begins in {C} minor. What is the third of that key’s tonic chord?',
      },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Hợp âm i ở giọng {C} thứ là {C} {Eb} {G}, nên nốt ba là {Eb}.',
        en: 'The i chord in {C} minor is {C} {Eb} {G}, so its third is {Eb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Giá trị nốt nào gặp nhiều nhất trong đoạn này?', en: 'What is the most common note value in this section?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '2/4', notes: 'C5:16 B4:16 A4:16 G4:16 F4:16 E4:16 D4:16 C4:16 | E4:16 F4:16 G4:16 A4:16 G4:q ||' },
        { type: 'play', notes: 'C5:16 B4:16 A4:16 G4:16 F4:16 E4:16 D4:16 C4:16 | E4:16 F4:16 G4:16 A4:16 G4:q', bpm: 70 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt đen', en: 'The quarter note' } },
          { text: { vi: 'Nốt móc đơn', en: 'The eighth note' } },
          { text: { vi: 'Nốt móc kép', en: 'The sixteenth note' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đoạn có mười hai nốt móc kép và chỉ một nốt đen.',
        en: 'The section has twelve sixteenth notes and only one quarter note.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Mỗi phách ở đây có bao nhiêu bè vang cùng lúc?', en: 'How many voices sound at once on each beat here?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+E4+G4+C5:q F2+F4+A4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:q ||' },
        { type: 'play', notes: 'C3+E4+G4+C5:q F2+F4+A4+C5:q G2+D4+G4+B4:q C3+E4+G4+C5:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một', en: 'One' } },
          { text: { vi: 'Hai', en: 'Two' } },
          { text: { vi: 'Bốn', en: 'Four' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi hợp âm có bốn nốt: một ở khuông Fa, ba ở khuông Sol, nên kết cấu có bốn bè.',
        en: 'Each chord has four notes, one on the bass staff and three on the treble, so the texture has four voices.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc này được chơi thế nào?', en: 'How is this phrase played?' },
      blocks: [{ type: 'play', notes: 'E4:q F4:q G4:q A4:q | G4:q F4:q E4:h' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Liền tiếng', en: 'Legato' }, correct: true },
          { text: { vi: 'Ngắt tiếng', en: 'Staccato' } },
        ],
      },
      reason: {
        vi: 'Mỗi nốt vang cho đến nốt sau, không có khoảng lặng, nên đó là liền tiếng.',
        en: 'Each note sounds until the next, with no gaps, so it is legato.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Rondo năm phần có hình thức nào?', en: 'What is the form of a five-part rondo?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A B A B A', en: 'ABABA' } },
          { text: { vi: 'A B A C A', en: 'ABACA' }, correct: true },
          { text: { vi: 'A A B B C', en: 'AABBC' } },
        ],
      },
      reason: {
        vi: 'Đoạn A trở lại sau mỗi đoạn tương phản mới, B rồi C: A B A C A.',
        en: 'A returns after each new contrasting section, B and then C: ABACA.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn A của Mozart có cường độ thế nào?', en: 'What are the dynamics of Mozart’s A section?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nhỏ', en: 'Soft' }, correct: true },
          { text: { vi: 'To', en: 'Loud' } },
        ],
      },
      reason: {
        vi: 'Đoạn A nhỏ nhẹ, liền tiếng, ở âm khu trung.',
        en: 'The A section is soft and legato, in a middle register.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Muốn điệp khúc nổi bật hơn phiên khúc, cách nào giúp được?', en: 'Which change helps a chorus stand out from its verse?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đưa giai điệu lên cao và thêm bè', en: 'Move the melody higher and add voices' }, correct: true },
          { text: { vi: 'Giữ nguyên mọi yếu tố', en: 'Keep every element the same' } },
          { text: { vi: 'Bớt bè và hát nhỏ hơn', en: 'Drop voices and sing more softly' } },
        ],
      },
      reason: {
        vi: 'Âm khu cao hơn và kết cấu dày hơn làm điệp khúc nghe to, sáng hơn phiên khúc.',
        en: 'A higher register and a thicker texture make the chorus sound fuller and brighter than the verse.',
      },
    },
  ],
} satisfies Lesson
