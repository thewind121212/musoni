import type { Lesson } from '@/theory/types'

/** Book 1.2: the staff, treble and bass clef, ledger lines, the grand staff. */
export default {
  id: 'staff-clefs',
  title: { vi: 'Khuông nhạc và khóa', en: 'The staff and clefs' },
  minutes: 4,
  sources: [{ section: '1.2', url: 'https://musictheory.pugetsound.edu/mt21c/Notation.html' }],
  practice: { drill: 'note-id', level: 1, durationSec: 60 },
  recap: [
    { vi: 'Khuông nhạc có 5 dòng và 4 khe', en: 'The staff has 5 lines and 4 spaces' },
    { vi: 'Khóa Sol đánh dấu {G4} ở dòng 2', en: 'The treble clef marks {G4} on line 2' },
    { vi: 'Khóa Fa đánh dấu {F3} ở dòng 4', en: 'The bass clef marks {F3} on line 4' },
    { vi: 'Dòng kẻ phụ cho nốt ngoài khuông', en: 'Ledger lines hold notes beyond the staff' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Khuông nhạc', en: 'The staff' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khuông nhạc** (staff) gồm năm **dòng kẻ** (lines) và bốn **khe** (spaces) xen giữa. Dòng 1 là dòng dưới cùng. Nốt càng nằm cao trên khuông, âm càng cao.',
            en: 'The **staff** has five **lines** with four **spaces** between them. Line 1 is the bottom line. The higher a note sits on the staff, the higher it sounds.',
          },
        },
        { type: 'staff', clef: 'none', notes: 'E4 G4 B4 D5 F5', labels: ['1', '2', '3', '4', '5'] },
        { type: 'play', notes: 'E4 G4 B4 D5 F5', label: { vi: 'Nghe dòng 1 đến dòng 5', en: 'Hear lines 1 to 5' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này nằm ở đâu?', en: 'Where is this note?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'A4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khe 2', en: 'Space 2' }, correct: true },
          { text: { vi: 'Dòng 2', en: 'Line 2' } },
          { text: { vi: 'Khe 3', en: 'Space 3' } },
        ],
      },
      reason: {
        vi: 'Nốt nằm giữa dòng 2 và dòng 3, tức là ở khe 2.',
        en: 'It sits between lines 2 and 3, which is space 2.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khóa Sol', en: 'The treble clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khóa** (clef) cho biết các dòng và khe mang tên gì. **Khóa Sol** (treble clef) cuộn quanh dòng 2, nên nốt trên dòng 2 là {G4}.',
            en: 'A **clef** tells you the names of the lines and spaces. The **treble clef** curls around line 2, so a note on line 2 is {G4}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4', labels: 'names', highlight: [0] },
        { type: 'play', notes: 'G4', label: { vi: 'Nghe {G}', en: 'Hear {G}' } },
        { type: 'keys', notes: 'G4', caption: { vi: '{G} trên phím đàn:', en: '{G} on the keys:' } },
        {
          type: 'tip',
          text: {
            vi: 'Từ {G}, đếm lên hoặc xuống từng dòng, từng khe để tìm các nốt khác.',
            en: 'From {G}, count up or down line by line and space by space to find the other notes.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E4' }],
      answer: { type: 'key', note: 'E' },
      reason: {
        vi: 'Đếm xuống từ {G4}: dòng 2 là {G}, khe 1 là {F}, dòng 1 là {E}.',
        en: 'Count down from {G4}: line 2 is {G}, space 1 is {F}, line 1 is {E}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khóa Fa', en: 'The bass clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khóa Fa** (bass clef) có hai chấm kẹp dòng 4, nên nốt trên dòng 4 là {F3}. Khóa Fa dùng cho các nốt thấp.',
            en: 'The **bass clef** has two dots either side of line 4, so a note on line 4 is {F3}. The bass clef is for low notes.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'F3', labels: 'names', highlight: [0] },
        { type: 'play', notes: 'F3', label: { vi: 'Nghe {F}', en: 'Hear {F}' } },
        { type: 'keys', notes: 'F3', from: 'C3', caption: { vi: '{F} trên phím đàn:', en: '{F} on the keys:' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Dòng kẻ phụ và khuông đôi', en: 'Ledger lines and the grand staff' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt nằm ngoài khuông được viết trên **dòng kẻ phụ** (ledger lines), những đoạn dòng ngắn thêm vào.',
            en: 'Notes beyond the staff are written on **ledger lines**, short lines added above or below.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Khuông đôi** (grand staff) ghép khuông khóa Sol ở trên với khuông khóa Fa ở dưới, như trong nhạc piano.',
            en: 'The **grand staff** joins a treble staff above a bass staff, as in piano music.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'F3 C4 G4 A5', labels: 'names', highlight: [1, 3] },
        { type: 'play', notes: 'F3 C4 G4 A5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'D3' }],
      answer: { type: 'key', note: 'D' },
      reason: {
        vi: 'Đếm xuống từ {F3}: dòng 4 là {F}, khe 3 là {E}, dòng 3 là {D}.',
        en: 'Count down from {F3}: line 4 is {F}, space 3 is {E}, line 3 is {D}.',
      },
    },
  ],
} satisfies Lesson
