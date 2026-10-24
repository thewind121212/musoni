import type { Lesson } from '@/theory/types'

/**
 * Book 15.1 (first half): contrast between sections, the eight elements of
 * music; melody (and ostinato), harmony as key and mode, rhythm.
 */
export default {
  id: 'elements',
  title: { vi: 'Các yếu tố âm nhạc', en: 'The elements of music' },
  minutes: 5,
  sources: [{ section: '15.1', url: 'https://musictheory.pugetsound.edu/mt21c/The-Elements-of-Music.html' }],
  recap: [
    { vi: 'Đổi một vài yếu tố âm nhạc là tạo được tương phản', en: 'Changing some elements of music creates contrast' },
    { vi: 'Giai điệu có biến hóa; âm hình lặp chỉ lặp lại', en: 'A melody has variety; an ostinato only repeats' },
    { vi: 'Hòa âm ở đây là giọng và điệu thức: trưởng hay thứ', en: 'Harmony here means key and mode: major or minor' },
    { vi: 'Tiết tấu: giá trị nốt nào gặp nhiều nhất', en: 'Rhythm: which note value is most common' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tương phản giữa các đoạn', en: 'Contrast between sections' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một bản nhạc thường gồm nhiều **đoạn** (section). Để đoạn mới nghe khác đoạn cũ, người soạn nhạc thay đổi một hay nhiều **yếu tố âm nhạc** (elements of music).',
            en: 'A piece of music is usually made of several **sections**. To make a new section sound different, a composer or arranger varies one or more of the **elements of music**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Có tám yếu tố: giai điệu, hòa âm, tiết tấu, âm sắc, kết cấu, cách phát âm, cường độ và âm khu. Bài này xem ba yếu tố đầu.',
            en: 'There are eight: melody, harmony, rhythm, timbre, texture, articulation, dynamics and register. This lesson looks at the first three.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q G4:8 A4:8 G4:q E4:q | F4:q D4:q C4:h ||' },
        { type: 'play', notes: 'C5:q G4:8 A4:8 G4:q E4:q | F4:q D4:q C4:h', label: { vi: 'Nghe đoạn 1', en: 'Hear section 1' } },
        { type: 'play', notes: 'C4:8 R:8 G3:8 Ab3:8 G3:8 R:8 Eb3:8 R:8 | F3:8 R:8 D3:8 R:8 C3:q R:q', bpm: 110, label: { vi: 'Nghe đoạn 2, tương phản', en: 'Hear section 2, in contrast' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Giai điệu và âm hình lặp', en: 'Melody and ostinato' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Giai điệu** (melody) là dòng nhạc chính. Giai điệu có sức sống và biến hóa: lên, xuống, nốt dài, nốt ngắn.',
            en: 'A **melody** is the main musical line. A melody lives and breathes and has variety: it rises and falls, with long and short notes.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đừng nhầm giai điệu với **âm hình lặp** (ostinato): một mẫu nhạc ngắn lặp đi lặp lại, như dòng dưới đây.',
            en: 'Don’t confuse melody with **ostinato**: a short pattern repeated over and over, like the line below.',
          },
        },
        { type: 'staff', clef: 'bass', time: '4/4', notes: 'C3:8 G3:8 C4:8 G3:8 C3:8 G3:8 C4:8 G3:8 | C3:8 G3:8 C4:8 G3:8 C3:8 G3:8 C4:8 G3:8 ||' },
        { type: 'play', notes: 'C3:8 G3:8 C4:8 G3:8 C3:8 G3:8 C4:8 G3:8 | C3:8 G3:8 C4:8 G3:8 C3:8 G3:8 C4:8 G3:8', label: { vi: 'Nghe âm hình lặp', en: 'Hear the ostinato' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dòng nhạc này là giai điệu hay âm hình lặp?', en: 'Is this line a melody or an ostinato?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q G4:8 F4:8 E4:q D4:q | C4:8 D4:8 E4:8 G4:8 A4:h ||' },
        { type: 'play', notes: 'E4:q G4:8 F4:8 E4:q D4:q | C4:8 D4:8 E4:8 G4:8 A4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giai điệu', en: 'A melody' }, correct: true },
          { text: { vi: 'Âm hình lặp', en: 'An ostinato' } },
        ],
      },
      reason: {
        vi: 'Dòng nhạc lên xuống, có nốt dài nốt ngắn và không lặp lại một mẫu, nên đó là giai điệu.',
        en: 'It rises and falls, mixes long and short notes and repeats no pattern, so it is a melody.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hòa âm: giọng và điệu thức', en: 'Harmony: key and mode' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở chương này, **hòa âm** (harmony) gắn với giọng và **điệu thức** (mode): trưởng hay thứ. Chuyển cùng một giai điệu từ {C} trưởng sang {C} thứ, đoạn nhạc đổi hẳn màu.',
            en: 'In this chapter, **harmony** means key and **mode**: major versus minor. Move the same melody from {C} major to {C} minor and the section changes color.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q G4:8 A4:8 G4:q E4:q | F4:q D4:q C4:h ||', highlight: [2, 4] },
        { type: 'play', notes: 'C5:q G4:8 A4:8 G4:q E4:q | F4:q D4:q C4:h', label: { vi: 'Nghe ở {C} trưởng', en: 'Hear it in {C} major' } },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:q G4:8 Ab4:8 G4:q Eb4:q | F4:q D4:q C4:h ||', highlight: [2, 4] },
        { type: 'play', notes: 'C5:q G4:8 Ab4:8 G4:q Eb4:q | F4:q D4:q C4:h', label: { vi: 'Nghe ở {C} thứ', en: 'Hear it in {C} minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Chuyển giai điệu từ {C} trưởng sang {C} thứ tự nhiên: nốt {B} thành nốt nào?',
        en: 'Moving a melody from {C} major to {C} natural minor: what does {B} become?',
      },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'B4' }],
      answer: { type: 'key', note: 'Bb' },
      reason: {
        vi: 'Gam {C} thứ tự nhiên hạ bậc 3, 6 và 7, nên {B} thành {Bb}.',
        en: '{C} natural minor lowers degrees 3, 6 and 7, so {B} becomes {Bb}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiết tấu', en: 'Rhythm' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Với **tiết tấu** (rhythm), hãy hỏi: trong đoạn này, giá trị nốt nào gặp nhiều nhất? Đoạn toàn nốt đen nghe thong thả; đoạn nhiều nốt móc đơn nghe rộn ràng hơn, dù nhịp độ không đổi.',
            en: 'For **rhythm**, ask: what is the most common note value in this section? A section of quarter notes sounds calm; one full of eighth notes sounds busier, at the same tempo.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q G4:q E4:q C4:q | D4:q F4:q E4:h ||' },
        { type: 'play', notes: 'E4:q G4:q E4:q C4:q | D4:q F4:q E4:h', label: { vi: 'Nghe nốt đen', en: 'Hear quarter notes' } },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:8 F4:8 G4:8 F4:8 E4:8 D4:8 C4:8 D4:8 | E4:8 G4:8 F4:8 D4:8 E4:h ||' },
        { type: 'play', notes: 'E4:8 F4:8 G4:8 F4:8 E4:8 D4:8 C4:8 D4:8 | E4:8 G4:8 F4:8 D4:8 E4:h', label: { vi: 'Nghe nốt móc đơn', en: 'Hear eighth notes' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giá trị nốt nào gặp nhiều nhất trong đoạn này?', en: 'What is the most common note value in this section?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'G4:8 A4:8 G4:8 E4:8 C5:q G4:8 E4:8 | D4:8 E4:8 F4:8 D4:8 C4:h ||' },
        { type: 'play', notes: 'G4:8 A4:8 G4:8 E4:8 C5:q G4:8 E4:8 | D4:8 E4:8 F4:8 D4:8 C4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt trắng', en: 'The half note' } },
          { text: { vi: 'Nốt đen', en: 'The quarter note' } },
          { text: { vi: 'Nốt móc đơn', en: 'The eighth note' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đoạn có mười nốt móc đơn, chỉ một nốt đen và một nốt trắng.',
        en: 'The section has ten eighth notes, only one quarter note and one half note.',
      },
    },
  ],
} satisfies Lesson
