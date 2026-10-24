import type { Lesson } from '@/theory/types'

/**
 * Book 15.2: Mozart, Eine kleine Nachtmusik K.525, second movement, a
 * five-part rondo. The book's score figures are not copied: the elements of
 * each section are described, and the short examples are our own, written
 * to show the same elements.
 */
export default {
  id: 'rondo',
  title: { vi: 'Tương phản trong một bản rondo', en: 'Contrast in a rondo' },
  minutes: 5,
  sources: [{ section: '15.2', url: 'https://musictheory.pugetsound.edu/mt21c/Eine-kleine-ii.html' }],
  recap: [
    { vi: 'Rondo năm phần: A B A C A', en: 'A five-part rondo: A B A C A' },
    { vi: 'Đoạn A: {C} trưởng, móc đơn, liền tiếng, nhỏ', en: 'The A section: {C} major, eighth notes, legato, soft' },
    { vi: 'Đoạn B: móc kép, bốn bè cùng tiết tấu, mở đầu ngắt tiếng', en: 'The B section: sixteenth runs, all four voices together, staccato openings' },
    { vi: 'Đoạn C: {C} thứ, bè đệm móc kép, mô phỏng', en: 'The C section: {C} minor, sixteenth-note accompaniment, imitation' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hình thức rondo', en: 'Rondo form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chương II của bản Eine kleine Nachtmusik (K.525) của Mozart có **hình thức rondo năm phần** (five-part rondo): A B A C A. Đoạn A trở lại sau mỗi đoạn tương phản B và C.',
            en: 'The second movement of Mozart’s Eine kleine Nachtmusik, K.525, is a **five-part rondo** (ABACA). The A section returns after each contrasting section, B and C.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Giữa các đoạn, Mozart viết **đoạn chuyển** (transition) để sự thay đổi mềm mại hơn.',
            en: 'Between sections, Mozart writes **transitional** material to smooth out the changes.',
          },
        },
        {
          type: 'play',
          notes: 'C5:q G4:8 A4:8 G4:q E4:q | C4:h R:h | G4:8 R:8 G4:8 R:8 D5:16 C5:16 B4:16 A4:16 G4:q | C5:q G4:8 A4:8 G4:q E4:q | C4:h R:h | C4:8 Eb4:8 G4:8 Eb4:8 C4:h | C5:q G4:8 A4:8 G4:q E4:q | C4:w',
          label: { vi: 'Nghe một rondo nhỏ tự viết', en: 'Hear a tiny rondo of our own' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong hình thức A B A C A, đoạn nào trở lại?', en: 'In the form ABACA, which section comes back?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn A', en: 'The A section' }, correct: true },
          { text: { vi: 'Đoạn B', en: 'The B section' } },
          { text: { vi: 'Đoạn C', en: 'The C section' } },
        ],
      },
      reason: {
        vi: 'A mở đầu, rồi trở lại sau B và sau C: ba lần trong năm phần.',
        en: 'A opens the movement and returns after B and after C: three times in five parts.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đoạn A', en: 'The A section' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn A ở giọng {C} trưởng. Nốt móc đơn gặp nhiều nhất, dù câu nhạc mở đầu bằng nốt đen.',
            en: 'The A section is in {C} major. The eighth note is the most common value, though the phrase begins with quarter notes.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hai bè trên đi cùng nhau trên một bè bass đơn giản. Nhìn chung liền tiếng, cường độ nhỏ, âm khu không quá cao cũng không quá thấp.',
            en: 'The top two instruments are grouped together against a simple bass part. It is generally legato and soft, in a register neither extremely high nor low.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+E4+G4:q C3+E4+G4:8 C3+F4+A4:8 C3+E4+G4:q C3+C4+E4:q | G2+B3@t+D4:8 G2+C4+E4:8 G2+D4+F4:8 G2+B3@t+D4:8 C3+C4+E4:h ||' },
        { type: 'play', notes: 'C3+E4+G4:q C3+E4+G4:8 C3+F4+A4:8 C3+E4+G4:q C3+C4+E4:q | G2+B3+D4:8 G2+C4+E4:8 G2+D4+F4:8 G2+B3+D4:8 C3+C4+E4:h', bpm: 72, label: { vi: 'Nghe một câu kiểu đoạn A', en: 'Hear a phrase in the style of A' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Đoạn B', en: 'The B section' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn B vẫn nhiều nốt móc đơn, nhưng có thêm những chuỗi nốt móc kép. Ở đầu mỗi **tiết nhạc** (subphrase), cả bốn bè đi cùng một tiết tấu.',
            en: 'The B section still has mostly eighth notes, now with some sixteenth-note runs. At the start of each **subphrase**, all four voices move in the same rhythm.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mỗi tiết nhạc mở đầu bằng bốn nốt ngắt tiếng.',
            en: 'Four staccato notes start each subphrase.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+D4+G4+B4:8 G2+D4+G4+B4:8 G2+D4+G4+B4:8 G2+D4+G4+B4:8 D5:16 C5:16 B4:16 A4:16 G4:16 F#4:16 E4:16 D4:16 | G2+B3@t+D4+G4:h R:h ||' },
        { type: 'play', notes: 'G2+D4+G4+B4:16 R:16 G2+D4+G4+B4:16 R:16 G2+D4+G4+B4:16 R:16 G2+D4+G4+B4:16 R:16 D5:16 C5:16 B4:16 A4:16 G4:16 F#4:16 E4:16 D4:16 | G2+B3+D4+G4:h R:h', bpm: 72, label: { vi: 'Nghe một câu kiểu đoạn B', en: 'Hear a phrase in the style of B' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở đoạn B, bốn nốt mở đầu mỗi tiết nhạc được chơi thế nào?',
        en: 'In the B section, how are the four notes that start each subphrase played?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Liền tiếng, chỉ một bè', en: 'Legato, in one voice' } },
          { text: { vi: 'Ngắt tiếng, cả bốn bè cùng tiết tấu', en: 'Staccato, all four voices in the same rhythm' }, correct: true },
          { text: { vi: 'Liền tiếng, cả bốn bè cùng tiết tấu', en: 'Legato, all four voices in the same rhythm' } },
        ],
      },
      reason: {
        vi: 'Đoạn B đổi kết cấu và cách phát âm so với đoạn A: bốn nốt ngắt tiếng, cả bốn bè cùng đi.',
        en: 'B changes texture and articulation from A: four staccato notes, with all four voices together.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đoạn C', en: 'The C section' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn C bắt đầu ở giọng {C} thứ. Bè đệm chạy nốt móc kép; nốt láy ở bè ngoài nghe như bốn nốt móc ba.',
            en: 'The C section begins in {C} minor. The accompaniment moves in sixteenth notes; the turn ornament in the outer parts sounds as four thirty-second notes.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hai bè giữa (vĩ cầm II, viola) đi thành cặp, chơi tách tiếng. Vĩ cầm I và bè bass **mô phỏng** (imitation) nhau: bè này nhắc lại motif của bè kia, mở đầu bằng một nốt ngắt tiếng.',
            en: 'The middle two parts (violin II and viola) are paired and played separated. Violin I and the cello and bass engage in **imitation**: one repeats the other’s motive, which starts with a staccato note.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G4:8 C5:8 Eb5:8 D5:8 C5:h | G2:8 C3:8 Eb3:8 D3:8 C3:h ||' },
        { type: 'play', notes: 'G4:16 R:16 C5:8 Eb5:8 D5:8 C5:h | G2:16 R:16 C3:8 Eb3:8 D3:8 C3:h', bpm: 72, label: { vi: 'Nghe mô phỏng ở giọng {C} thứ', en: 'Hear imitation in {C} minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn C bắt đầu ở giọng nào?', en: 'What key does the C section begin in?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C} trưởng', en: '{C} major' } },
          { text: { vi: '{C} thứ', en: '{C} minor' }, correct: true },
          { text: { vi: '{G} trưởng', en: '{G} major' } },
        ],
      },
      reason: {
        vi: 'Đoạn C đổi cả hòa âm: từ {C} trưởng của đoạn A sang {C} thứ, giọng cùng tên.',
        en: 'C also changes the harmony: from the A section’s {C} major to {C} minor, its parallel key.',
      },
    },
  ],
} satisfies Lesson
