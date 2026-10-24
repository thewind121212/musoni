import type { Lesson } from '@/theory/types'

/**
 * Book chapter 35 intro: minimalism in the 1960s, its four composers, the two
 * processes of the chapter. The intro page has no section number, so the
 * lesson cites the two sections it previews.
 */
export default {
  id: 'what-is-minimalism',
  title: { vi: 'Âm nhạc tối giản là gì', en: 'What is minimalism' },
  minutes: 3,
  sources: [
    { section: '35.1', url: 'https://musictheory.pugetsound.edu/mt21c/AdditiveMinimalism.html' },
    { section: '35.2', url: 'https://musictheory.pugetsound.edu/mt21c/PhaseShifting.html' },
  ],
  recap: [
    { vi: 'Âm nhạc tối giản ra đời vào thập niên 1960', en: 'Minimalism arose in the 1960s' },
    { vi: 'Một mẫu ngắn lặp lại nhiều lần và đổi rất chậm', en: 'A short pattern repeats many times and changes slowly' },
    { vi: 'Nhạc quá trình đi theo một quy tắc, từng bước', en: 'Process music follows a rule, step by step' },
    { vi: 'Hai quá trình: cộng thêm (Glass) và dịch pha (Reich)', en: 'Two processes: additive (Glass) and phase shifting (Reich)' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Âm nhạc tối giản', en: 'Minimalism' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Âm nhạc tối giản** (minimalism) ra đời vào thập niên 1960. Nó dựng bản nhạc từ một **mẫu** (pattern) ngắn, lặp đi lặp lại trên một nhịp đều, và thay đổi rất chậm.',
            en: '**Minimalism** arose in the 1960s. It builds a piece from a short **pattern** repeated again and again over a steady pulse, and it changes very slowly.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Bốn nhạc sĩ thường gắn với nó là La Monte Young, Terry Riley, Philip Glass và Steve Reich.',
            en: 'Four composers are usually linked with it: La Monte Young, Terry Riley, Philip Glass and Steve Reich.',
          },
        },
        { type: 'staff', clef: 'treble', time: '2/4', notes: 'A4:8 C5:8 E5:8 C5:8 | A4:8 C5:8 E5:8 C5:8 ||' },
        {
          type: 'play',
          notes: 'A4:8 C5:8 E5:8 C5:8 A4:8 C5:8 E5:8 C5:8 A4:8 C5:8 E5:8 C5:8 A4:8 C5:8 E5:8 C5:8',
          label: { vi: 'Nghe mẫu lặp bốn lần', en: 'Hear the pattern four times' },
          bpm: 132,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Mẫu lặp lại trong dòng nhạc này dài mấy nốt?', en: 'How many notes long is the repeating pattern here?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4:8 F4:8 A4:8 D4:8 F4:8 A4:8 D4:8 F4:8 A4:8' },
        { type: 'play', notes: 'D4:8 F4:8 A4:8 D4:8 F4:8 A4:8 D4:8 F4:8 A4:8', bpm: 132 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '2 nốt', en: '2 notes' } },
          { text: { vi: '3 nốt', en: '3 notes' }, correct: true },
          { text: { vi: '9 nốt', en: '9 notes' } },
        ],
      },
      reason: {
        vi: 'Ba nốt {D} {F} {A} lặp lại ba lần, nên mẫu dài ba nốt.',
        en: 'The three notes {D} {F} {A} repeat three times, so the pattern is three notes long.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nhạc quá trình', en: 'Process music' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhiều bản nhạc tối giản là **nhạc quá trình** (process music): nhạc sĩ đặt ra một quy tắc, rồi bản nhạc đi theo quy tắc đó từng bước. Người nghe nghe được sự thay đổi diễn ra.',
            en: 'Many minimalist pieces are **process music**: the composer sets a rule, and the piece follows it step by step. You can hear the change happen.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chương này học hai quá trình: **quá trình cộng thêm** (additive process), gắn với Philip Glass, và **dịch pha** (phase shifting), gắn với Steve Reich. Dưới đây, nhóm nốt lớn dần từng nốt.',
            en: 'This chapter covers two processes: the **additive process**, linked with Philip Glass, and **phase shifting**, linked with Steve Reich. Below, a group of notes grows one note at a time.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4:8 G4:8 | E4:8 G4:8 B4:8 | E4:8 G4:8 B4:8 D5:8 ||', highlight: [4, 8] },
        {
          type: 'play',
          notes: 'E4:8 G4:8 E4:8 G4:8 E4:8 G4:8 B4:8 E4:8 G4:8 B4:8 E4:8 G4:8 B4:8 D5:8 E4:8 G4:8 B4:8 D5:8',
          label: { vi: 'Nghe mỗi bước hai lần', en: 'Hear each stage twice' },
          bpm: 150,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong nhạc quá trình, bản nhạc thay đổi thế nào?', en: 'In process music, how does the piece change?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đột ngột, mỗi ô nhịp một kiểu', en: 'Suddenly, with something new every measure' } },
          { text: { vi: 'Từ từ, theo một quy tắc', en: 'Gradually, following a rule' }, correct: true },
          { text: { vi: 'Không thay đổi gì', en: 'It does not change at all' } },
        ],
      },
      reason: {
        vi: 'Nhạc sĩ đặt một quy tắc, và bản nhạc đổi dần theo quy tắc đó, từng bước một.',
        en: 'The composer sets a rule, and the piece changes gradually by that rule, one step at a time.',
      },
    },
  ],
} satisfies Lesson
