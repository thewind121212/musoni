import type { Lesson } from '@/theory/types'

/**
 * Book 12.1: verse-chorus form, the hook, the pre-chorus, post-chorus and
 * bridge, and simple against contrasting verse-chorus form. The book's two
 * song timelines are copyrighted songs: replaced by our own short song in
 * {C} major, written as block chords. No practice link: no drill trains form.
 */
export default {
  id: 'verse-chorus',
  title: { vi: 'Phiên khúc và điệp khúc', en: 'Verse-chorus form' },
  minutes: 5,
  sources: [{ section: '12.1', url: 'https://musictheory.pugetsound.edu/mt21c/VerseChorusForm.html' }],
  recap: [
    { vi: 'Điệp khúc mang câu hook; phiên khúc ít đọng lại hơn', en: 'The chorus holds the hook; the verse is less memorable' },
    { vi: 'Tiền điệp khúc dẫn vào điệp khúc, hậu điệp khúc theo sau nó', en: 'The pre-chorus leads into the chorus, the post-chorus follows it' },
    { vi: 'Cầu nối là đoạn tương phản, thường chỉ có một lần', en: 'The bridge is a contrasting section, usually heard once' },
    { vi: 'Đơn giản: phiên khúc và điệp khúc chung tiến trình; tương phản: khác nhau', en: 'Simple: verse and chorus share a progression; contrasting: they differ' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Phiên khúc và điệp khúc', en: 'Verse and chorus' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hình thức** (form) là thứ tự các **đoạn** (sections) của một bài. **Hình thức phiên khúc–điệp khúc** (verse-chorus form) là hình thức phổ biến nhất của nhạc phổ thông ngày nay.',
            en: '**Form** is the order of a piece’s **sections**. **Verse-chorus form** is probably the most common form in popular music today.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Điệp khúc** (chorus) chứa **câu hook** (hook), câu nhạc dễ nhớ nhất bài. **Phiên khúc** (verse) thường có giai điệu ít đọng lại hơn.',
            en: 'The **chorus** holds the **hook**, the song’s most memorable line. The **verse** usually has less memorable melodic material.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A4+C5+E5 F4+A4+C5 G4+B4+D5 || C4+E4+G4 F4+A4+C5 G4+B4+D5 C4+E4+G4', labels: ['I', 'vi', 'IV', 'V', 'I', 'IV', 'V', 'I'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h F2+F4+A4+C5:h G2+G4+B4+D5:h', bpm: 120, label: { vi: 'Nghe phiên khúc', en: 'Hear the verse' } },
        { type: 'play', notes: 'C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w', bpm: 120, label: { vi: 'Nghe điệp khúc', en: 'Hear the chorus' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu hook của bài thường nằm ở đoạn nào?', en: 'Which section usually holds the hook?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phiên khúc', en: 'The verse' } },
          { text: { vi: 'Điệp khúc', en: 'The chorus' }, correct: true },
          { text: { vi: 'Dạo đầu', en: 'The introduction' } },
        ],
      },
      reason: {
        vi: 'Câu hook là câu dễ nhớ nhất, và nó nằm ở điệp khúc, đoạn được nhắc lại nhiều lần.',
        en: 'The hook is the most memorable line, and it sits in the chorus, the section that keeps coming back.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiền và hậu điệp khúc', en: 'Pre-chorus and post-chorus' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tiền điệp khúc** (pre-chorus) nằm giữa phiên khúc và điệp khúc, dẫn dắt vào điệp khúc. **Hậu điệp khúc** (post-chorus) là đoạn ngắn ngay sau điệp khúc.',
            en: 'The **pre-chorus** sits between the verse and the chorus and leads into the chorus. The **post-chorus** is a short section right after the chorus.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+F4+A4 E4+G4+B4 F4+A4+C5 G4+B4+D5', labels: ['ii', 'iii', 'IV', 'V'] },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h F2+F4+A4+C5:h G2+G4+B4+D5:h D3+D4+F4+A4:h E3+E4+G4+B4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          bpm: 120,
          label: { vi: 'Nghe phiên khúc, tiền điệp khúc, điệp khúc', en: 'Hear verse, pre-chorus, chorus' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Các đoạn khác', en: 'Other sections' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bài thường mở bằng **dạo đầu** (introduction). Giữa các đoạn có thể có **dạo giữa** (interlude) hay **đoạn solo** (solo) cho nhạc cụ.',
            en: 'A song often opens with an **introduction**. Between sections there may be an instrumental **interlude** or a **solo**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Cầu nối** (bridge) là đoạn tương phản, thường chỉ xuất hiện một lần, gần cuối bài. Ví dụ: Dạo đầu, Phiên khúc 1, Phiên khúc 2, Điệp khúc, Phiên khúc 3, Điệp khúc, Cầu nối, Điệp khúc.',
            en: 'The **bridge** is a contrasting section, usually heard once, late in the song. For example: Intro, Verse 1, Verse 2, Chorus, Verse 3, Chorus, Bridge, Chorus.',
          },
        },
        {
          type: 'play',
          notes: 'A2+A4+C5+E5:h E3+E4+G4+B4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          bpm: 120,
          label: { vi: 'Nghe cầu nối rồi điệp khúc', en: 'Hear a bridge, then the chorus' },
        },
        {
          type: 'tip',
          text: {
            vi: 'Tên đoạn có thể gây tranh cãi: đoạn người này gọi là tiền điệp khúc, người khác có thể gọi là phần hai của phiên khúc.',
            en: 'Section names can be argued over: what one person calls a pre-chorus, another may call the second part of the verse.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn nào nằm giữa phiên khúc và điệp khúc?', en: 'Which section sits between the verse and the chorus?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tiền điệp khúc', en: 'The pre-chorus' }, correct: true },
          { text: { vi: 'Hậu điệp khúc', en: 'The post-chorus' } },
          { text: { vi: 'Cầu nối', en: 'The bridge' } },
        ],
      },
      reason: {
        vi: 'Tiền điệp khúc đi sau phiên khúc và dẫn vào điệp khúc; hậu điệp khúc đi sau điệp khúc.',
        en: 'The pre-chorus follows the verse and leads into the chorus; the post-chorus comes after the chorus.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đơn giản hay tương phản', en: 'Simple or contrasting' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở hình thức phiên khúc–điệp khúc **đơn giản** (simple), phiên khúc và điệp khúc dùng chung một tiến trình hòa âm. Ở dạng **tương phản** (contrasting), hai đoạn có tiến trình khác nhau, như bài ở bước đầu.',
            en: 'In a **simple** verse-chorus form, the verse and the chorus share one harmonic progression. In a **contrasting** one, the two sections have different progressions, like the song in the first step.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 G4+B4+D5 A4+C5+E5 F4+A4+C5 || C4+E4+G4 G4+B4+D5 A4+C5+E5 F4+A4+C5', labels: ['I', 'V', 'vi', 'IV', 'I', 'V', 'vi', 'IV'] },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:h F2+F4+A4+C5:h C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:h F2+F4+A4+C5:h',
          bpm: 120,
          label: { vi: 'Nghe: cùng một vòng cho cả hai đoạn', en: 'Hear one loop under both sections' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trước vạch kép là phiên khúc, sau là điệp khúc. Đây là dạng nào?',
        en: 'Before the double bar is the verse, after it the chorus. Which kind is this?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4+C5+E5 F4+A4+C5 C4+E4+G4 G4+B4+D5 || F4+A4+C5 G4+B4+D5 C4+E4+G4 C4+E4+G4', labels: ['vi', 'IV', 'I', 'V', 'IV', 'V', 'I', 'I'] },
        { type: 'play', notes: 'A2+A4+C5+E5:h F2+F4+A4+C5:h C3+C4+E4+G4:h G2+G4+B4+D5:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w', bpm: 120 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đơn giản', en: 'Simple' } },
          { text: { vi: 'Tương phản', en: 'Contrasting' }, correct: true },
        ],
      },
      reason: {
        vi: 'Phiên khúc là vi–IV–I–V còn điệp khúc là IV–V–I–I, hai tiến trình khác nhau.',
        en: 'The verse is vi–IV–I–V and the chorus IV–V–I–I, two different progressions.',
      },
    },
  ],
} satisfies Lesson
