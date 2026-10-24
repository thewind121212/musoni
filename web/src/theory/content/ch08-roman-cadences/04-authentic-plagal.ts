import type { Lesson } from '@/theory/types'

/** Book 7.4, first half: what a cadence is; the authentic (V–I) and plagal (IV–I) cadences. */
export default {
  id: 'authentic-plagal',
  title: { vi: 'Kết chính và kết phụ', en: 'Authentic and plagal cadences' },
  minutes: 4,
  sources: [{ section: '7.4', url: 'https://musictheory.pugetsound.edu/mt21c/cadences.html' }],
  recap: [
    { vi: 'Kết là điểm dừng ở cuối câu nhạc', en: 'A cadence is the arrival point at the end of a phrase' },
    { vi: 'Kết chính: câu nhạc kết bằng V–I', en: 'Authentic cadence: the phrase ends V–I' },
    { vi: 'Kết phụ: câu nhạc kết bằng IV–I', en: 'Plagal cadence: the phrase ends IV–I' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Kết là gì', en: 'What a cadence is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết** (cadence) là điểm dừng của hòa âm ở cuối một **câu nhạc** (phrase), như dấu phẩy hay dấu chấm trong câu văn. Tai được nghỉ một chút, rồi nhạc đi tiếp.',
            en: 'A **cadence** is a harmonic arrival point at the end of a **phrase**, like a comma or a period in a sentence. The ear gets a moment to rest, then the music goes on.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Có bốn loại kết cơ bản, gọi tên theo các hợp âm cuối câu.',
            en: 'There are four basic cadences, named by the chords that end the phrase.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 C5+E5+G5', labels: ['I', 'IV', 'V', 'I'] },
        { type: 'play', notes: 'C4+E4+G4:h F4+A4+C5:h G4+B4+D5:h C5+E5+G5:w', label: { vi: 'Nghe câu nhạc', en: 'Hear the phrase' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Kết chính', en: 'The authentic cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết chính** (authentic cadence): câu nhạc kết bằng V–I. Cảm âm đi lên chủ âm, nên câu nghe đóng lại chắc chắn, như dấu chấm hết câu.',
            en: 'An **authentic cadence** ends the phrase with V–I. The leading tone rises to the tonic, so the phrase sounds firmly closed, like a period.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 C5+E5+G5', labels: ['I', 'IV', 'V', 'I'], highlight: [2, 3] },
        { type: 'play', notes: 'G4+B4+D5:h C5+E5+G5:w', label: { vi: 'Nghe V–I', en: 'Hear V–I' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Kết phụ', en: 'The plagal cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kết phụ** (plagal cadence): câu nhạc kết bằng IV–I. Nó cũng về chủ âm nhưng mềm hơn, vì không có cảm âm.',
            en: 'A **plagal cadence** ends the phrase with IV–I. It also comes home to the tonic, but more softly, because there is no leading tone.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 G4+B4+D5 F4+A4+C5 C5+E5+G5', labels: ['I', 'V', 'IV', 'I'], highlight: [2, 3] },
        { type: 'play', notes: 'C4+E4+G4:h G4+B4+D5:h F4+A4+C5:h C5+E5+G5:w', label: { vi: 'Nghe câu kết IV–I', en: 'Hear a phrase ending IV–I' } },
        {
          type: 'tip',
          text: {
            vi: 'Kết phụ là tiếng "A-men" quen thuộc ở cuối nhiều bài thánh ca.',
            en: 'The plagal cadence is the familiar "Amen" at the end of many hymns.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {G} trưởng này kết bằng kết gì?', en: 'This phrase is in {G} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'G', notes: 'G4+B4+D5 E4+G4+B4 D4+F#4+A4 G4+B4+D5' },
        { type: 'play', notes: 'G4+B4+D5:h E4+G4+B4:h D4+F#4+A4:h G4+B4+D5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' }, correct: true },
          { text: { vi: 'Kết phụ', en: 'Plagal' } },
        ],
      },
      reason: {
        vi: 'Hai hợp âm cuối là {D}–{F#}–{A} (V) rồi {G}–{B}–{D} (I), tức là V–I.',
        en: 'The last two chords are {D}–{F#}–{A} (V) and {G}–{B}–{D} (I): V–I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {F} trưởng này kết bằng kết gì?', en: 'This phrase is in {F} major. Which cadence ends it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'F', notes: 'F4+A4+C5 D4+F4+A4 Bb4+D5+F5 F4+A4+C5' },
        { type: 'play', notes: 'F4+A4+C5:h D4+F4+A4:h Bb4+D5+F5:h F4+A4+C5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' } },
          { text: { vi: 'Kết phụ', en: 'Plagal' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai hợp âm cuối là {Bb}–{D}–{F} (IV) rồi {F}–{A}–{C} (I), tức là IV–I.',
        en: 'The last two chords are {Bb}–{D}–{F} (IV) and {F}–{A}–{C} (I): IV–I.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe câu nhạc ở giọng {C} trưởng. Nó kết bằng kết gì?', en: 'Listen to this phrase in {C} major. Which cadence ends it?' },
      blocks: [{ type: 'play', notes: 'C4+E4+G4:h A4+C5+E5:h G4+B4+D5:h C5+E5+G5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính', en: 'Authentic' }, correct: true },
          { text: { vi: 'Kết phụ', en: 'Plagal' } },
        ],
      },
      reason: {
        vi: 'Câu nhạc là I–vi–V–I: hợp âm trước I là V, và cảm âm {B} đi lên {C}.',
        en: 'The phrase is I–vi–V–I: the chord before I is V, and the leading tone {B} rises to {C}.',
      },
    },
  ],
} satisfies Lesson
