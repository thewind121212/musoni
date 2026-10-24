import type { Lesson } from '@/theory/types'

/**
 * Book 12.5: harmonically closed sections (end on I) and open ones (end on V,
 * or IV), and where each sits in AABA and verse-chorus form. The book's song
 * example is copyrighted: replaced by the chord charts of lessons 1 and 2.
 * No practice link: no drill trains form.
 */
export default {
  id: 'closed-open',
  title: { vi: 'Đoạn khép kín và đoạn mở', en: 'Harmonically closed and open sections' },
  minutes: 4,
  sources: [{ section: '12.5', url: 'https://musictheory.pugetsound.edu/mt21c/HarmonicallyClosedAndOpenSections.html' }],
  recap: [
    { vi: 'Đoạn khép kín kết trên I, đoạn mở kết trên V (đôi khi IV)', en: 'A closed section ends on I, an open one on V (sometimes IV)' },
    { vi: 'AABA: đoạn A thường khép kín, cầu nối B thường mở', en: 'AABA: the A sections are usually closed, the B bridge open' },
    { vi: 'Đoạn dẫn vào điệp khúc thường mở; điệp khúc khép kín hoặc mở', en: 'Sections leading into the chorus are usually open; the chorus can be either' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Khép kín và mở', en: 'Closed and open' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đoạn khép kín** (harmonically closed section) kết trên hợp âm chủ I. **Đoạn mở** (harmonically open section) kết trên hợp âm khác, thường là V, đôi khi là IV.',
            en: 'A **harmonically closed section** ends on the tonic chord, I. A **harmonically open section** ends on another chord, usually V, sometimes IV.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 C4+E4+G4 || C4+E4+G4 A4+C5+E5 D4+F4+A4 G4+B4+D5', labels: ['I', 'IV', 'V', 'I', 'I', 'vi', 'ii', 'V'], highlight: [3, 7] },
        { type: 'play', notes: 'C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w', bpm: 120, label: { vi: 'Nghe đoạn khép kín', en: 'Hear a closed section' } },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:w', bpm: 120, label: { vi: 'Nghe đoạn mở', en: 'Hear an open section' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đoạn này khép kín hay mở?', en: 'Is this section closed or open?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'G', notes: 'G4+B4+D5 E4+G4+B4 C5+E5+G5 C5+E5+G5' },
        { type: 'play', notes: 'G2+G4+B4+D5:h E3+E4+G4+B4:h C3+C5+E5+G5:h C3+C5+E5+G5:w', bpm: 120 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khép kín', en: 'Closed' } },
          { text: { vi: 'Mở', en: 'Open' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ở giọng {G} trưởng, đoạn này là I–vi–IV–IV và kết trên IV, không phải I.',
        en: 'In {G} major the section is I–vi–IV–IV and ends on IV, not I.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Trong hình thức AABA', en: 'In AABA form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong AABA, các đoạn A thường khép kín, kết trên I. Cầu nối B thường mở, kết trên V, để dẫn về đoạn A cuối.',
            en: 'In AABA form the A sections are usually closed, ending on I. The B section, the bridge, is usually open, ending on V, which leads back to the last A.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 C4+E4+G4 || F4+A4+C5 C4+E4+G4 D4+F4+A4 G4+B4+D5', labels: ['I', 'IV', 'V', 'I', 'IV', 'I', 'ii', 'V'], highlight: [3, 7] },
        {
          type: 'play',
          notes: 'F2+F4+A4+C5:h C3+C4+E4+G4:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          bpm: 120,
          label: { vi: 'Nghe B mở rồi A khép kín', en: 'Hear the open B, then a closed A' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong hình thức AABA, đoạn nào thường mở?', en: 'In AABA form, which section is usually open?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn A đầu tiên', en: 'The first A' } },
          { text: { vi: 'Đoạn B', en: 'The B section' }, correct: true },
          { text: { vi: 'Đoạn A cuối', en: 'The last A' } },
        ],
      },
      reason: {
        vi: 'Cầu nối B thường kết trên V để dẫn về đoạn A, còn các đoạn A kết trên I.',
        en: 'The B bridge usually ends on V to lead back to A, while the A sections end on I.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Trong phiên khúc–điệp khúc', en: 'In verse-chorus form' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các đoạn dẫn vào điệp khúc (phiên khúc, tiền điệp khúc, cầu nối) thường mở. Điệp khúc có thể khép kín hoặc mở.',
            en: 'The sections that lead into the chorus (verse, pre-chorus, bridge) are usually open. The chorus can be closed or open.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A4+C5+E5 F4+A4+C5 G4+B4+D5 || C4+E4+G4 F4+A4+C5 G4+B4+D5 C4+E4+G4', labels: ['I', 'vi', 'IV', 'V', 'I', 'IV', 'V', 'I'], highlight: [3, 7] },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          bpm: 120,
          label: { vi: 'Nghe phiên khúc mở, điệp khúc khép kín', en: 'Hear an open verse, a closed chorus' },
        },
        {
          type: 'tip',
          text: {
            vi: 'Khi viết một bài, đặt đoạn khép kín và đoạn mở đúng chỗ giúp bài trôi chảy.',
            en: 'When you write a song, putting the closed and open sections in the right places keeps the music flowing.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Phiên khúc của một bài ở giọng {D} trưởng là đoạn mở, kết trên V. Hợp âm cuối có nốt gốc là gì?',
        en: 'The verse of a song in {D} major is open and ends on V. What is the root of its last chord?',
      },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Bậc 5 của gam {D} trưởng là {A}, nên V là hợp âm {A} {C#} {E}.',
        en: 'The fifth degree of {D} major is {A}, so V is the chord {A} {C#} {E}.',
      },
    },
  ],
} satisfies Lesson
