import type { Lesson } from '@/theory/types'

/**
 * Book 12.2 (AABA form) and 12.3 (ABAC form). The book's songs are
 * copyrighted: replaced by our own chord charts in {C} major and by the
 * "Ode to Joy" theme of Beethoven's Ninth Symphony (1824, public domain), a
 * small AABA with 4-bar sections. No practice link: no drill trains form.
 */
export default {
  id: 'aaba-abac',
  title: { vi: 'Hình thức AABA và ABAC', en: 'AABA and ABAC forms' },
  minutes: 5,
  sources: [
    { section: '12.2', url: 'https://musictheory.pugetsound.edu/mt21c/AABAForm.html' },
    { section: '12.3', url: 'https://musictheory.pugetsound.edu/mt21c/ABACForm.html' },
  ],
  recap: [
    { vi: 'AABA: bốn đoạn 8 ô nhịp, 32 ô', en: 'AABA: four 8-bar sections, 32 bars' },
    { vi: 'Đoạn A mang giai điệu chính, B là cầu nối tương phản', en: 'The A sections hold the main melody, B is the contrasting bridge' },
    { vi: 'ABAC: A quay lại, đoạn cuối C là đoạn mới', en: 'ABAC: A comes back, the last section C is new' },
    { vi: 'ABAB′: B′ mở đầu như B nhưng kết khác', en: 'ABAB′: B′ begins like B but ends differently' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hình thức AABA', en: 'AABA form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hình thức AABA** (AABA form) gắn với nhạc kịch Broadway thập niên 1930 và phổ biến đến thập niên 1950. Mỗi đoạn thường dài 8 ô nhịp.',
            en: '**AABA form** is linked with Broadway musicals of the 1930s and stayed popular until the 1950s. Each section is usually 8 measures long.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đoạn A mang giai điệu chính của bài. Đoạn B tạo tương phản, gọi là **cầu nối** (bridge) hay **tám ô giữa** (middle eight).',
            en: 'The A sections hold the song’s main melody. The B section gives contrast and is called the **bridge** or the **middle eight**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 C4+E4+G4 || F4+A4+C5 C4+E4+G4 D4+F4+A4 G4+B4+D5', labels: ['I', 'IV', 'V', 'I', 'IV', 'I', 'ii', 'V'] },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h C3+C4+E4+G4:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          bpm: 132,
          label: { vi: 'Nghe A A B A', en: 'Hear A A B A' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bài AABA có mỗi đoạn 8 ô nhịp. Cả bài dài bao nhiêu ô nhịp?',
        en: 'An AABA song has 8 measures in each section. How many measures long is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '16', en: '16' } },
          { text: { vi: '24', en: '24' } },
          { text: { vi: '32', en: '32' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bốn đoạn, mỗi đoạn 8 ô, là 32 ô nhịp.',
        en: 'Four sections of 8 measures make 32 measures.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Một AABA nhỏ', en: 'A small AABA' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chủ đề "Hoan ca" (Ode to Joy) trong Giao hưởng số 9 của Beethoven là một AABA nhỏ, mỗi đoạn 4 ô nhịp. Hai đoạn A đầu chỉ khác nhau ở cuối: đoạn đầu dừng trên {D}, đoạn sau về {C}.',
            en: 'The "Ode to Joy" theme of Beethoven’s Ninth Symphony is a small AABA with 4-bar sections. The first two A sections differ only at the end: the first stops on {D}, the second comes home to {C}.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'E4:q E4:q F4:q G4:q | G4:q F4:q E4:q D4:q | C4:q C4:q D4:q E4:q | E4:q. D4:8 D4:h ||' },
        { type: 'play', notes: 'E4:q E4:q F4:q G4:q G4:q F4:q E4:q D4:q C4:q C4:q D4:q E4:q E4:q. D4:8 D4:h', bpm: 120, label: { vi: 'Nghe A', en: 'Hear A' } },
        { type: 'play', notes: 'D4:q D4:q E4:q C4:q D4:q E4:8 F4:8 E4:q C4:q D4:q E4:8 F4:8 E4:q D4:q C4:q D4:q G3:h', bpm: 120, label: { vi: 'Nghe B', en: 'Hear B' } },
        {
          type: 'tip',
          text: {
            vi: 'Một hay vài đoạn A thường do nhạc cụ chơi. Khi cả bài lặp lại, có thể bỏ bớt một đoạn A, thành AABAABA.',
            en: 'One or more A sections are often instrumental. When the whole form repeats, an A section may be dropped: AABAABA.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe hai đoạn. Đoạn thứ hai là A hay B?', en: 'Listen to two sections. Is the second one A or B?' },
      blocks: [
        {
          type: 'play',
          notes: 'E4:q E4:q F4:q G4:q G4:q F4:q E4:q D4:q C4:q C4:q D4:q E4:q E4:q. D4:8 D4:h E4:q E4:q F4:q G4:q G4:q F4:q E4:q D4:q C4:q C4:q D4:q E4:q D4:q. C4:8 C4:h',
          bpm: 120,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A, nhắc lại giai điệu chính', en: 'A, the main melody again' }, correct: true },
          { text: { vi: 'B, một giai điệu tương phản', en: 'B, a contrasting melody' } },
        ],
      },
      reason: {
        vi: 'Đoạn thứ hai lặp lại đoạn đầu, chỉ khác hai nốt cuối, nên vẫn là A.',
        en: 'The second section repeats the first except for its last two notes, so it is still A.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hình thức ABAC', en: 'ABAC form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhiều bài thập niên 1930 đến 1950 theo **hình thức ABAC** (ABAC form), cũng 32 ô nhịp. Đoạn A quay lại ở đoạn ba, nhưng đoạn cuối C là đoạn mới.',
            en: 'Many songs from the 1930s to the 1950s are in 32-bar **ABAC form**. A comes back as the third section, but the last section, C, is new.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'ABAC cũng có thể là ABAB′: đoạn B′ mở đầu giống B nhưng kết khác.',
            en: 'ABAC may also appear as ABAB′, where B′ begins like B but ends differently.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A4+C5+E5 D4+F4+A4 G4+B4+D5 || F4+A4+C5 E4+G4+B4 D4+F4+A4 G4+B4+D5 || F4+A4+C5 G4+B4+D5 C4+E4+G4 C4+E4+G4', labels: ['I', 'vi', 'ii', 'V', 'IV', 'iii', 'ii', 'V', 'IV', 'V', 'I', 'I'] },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h F2+F4+A4+C5:h E3+E4+G4+B4:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          bpm: 132,
          label: { vi: 'Nghe A B A C', en: 'Hear A B A C' },
        },
        {
          type: 'tip',
          text: {
            vi: 'Bài AABA hay ABAC đôi khi mở bằng một phiên khúc (verse). Khi đó 32 ô chính được gọi là điệp khúc (refrain hoặc chorus).',
            en: 'An AABA or ABAC song is sometimes preceded by a verse. The 32-bar form itself is then called the refrain or chorus.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bài có bốn đoạn 8 ô. Đoạn 1 và 3 giống nhau; đoạn 2 và 4 khác đoạn 1 và khác nhau. Đó là hình thức nào?',
        en: 'A song has four 8-bar sections. Sections 1 and 3 match; sections 2 and 4 differ from section 1 and from each other. Which form is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'AABA', en: 'AABA' } },
          { text: { vi: 'ABAC', en: 'ABAC' }, correct: true },
          { text: { vi: 'ABAB′', en: 'ABAB′' } },
        ],
      },
      reason: {
        vi: 'A quay lại ở đoạn 3, còn đoạn 4 là đoạn mới, nên đó là ABAC.',
        en: 'A returns as section 3 and section 4 is new material, so it is ABAC.',
      },
    },
  ],
} satisfies Lesson
