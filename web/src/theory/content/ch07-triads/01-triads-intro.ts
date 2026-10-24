import type { Lesson } from '@/theory/types'

/** Book 6.1 (triads, root, third, fifth, the four qualities), with the quality rows of the summary 6.6. */
export default {
  id: 'triads-intro',
  title: { vi: 'Hợp âm ba', en: 'Triads' },
  minutes: 4,
  sources: [
    { section: '6.1', url: 'https://musictheory.pugetsound.edu/mt21c/TriadsIntroduction.html' },
    { section: '6.6', url: 'https://musictheory.pugetsound.edu/mt21c/SummaryOfTriadConstruction.html' },
  ],
  practice: { drill: 'chords', level: 1, durationSec: 120 },
  recap: [
    { vi: 'Hợp âm ba là ba nốt chồng lên nhau theo quãng 3', en: 'A triad is three notes stacked in thirds' },
    { vi: 'Từ dưới lên: nốt gốc, nốt ba, nốt năm', en: 'From the bottom up: root, third, fifth' },
    { vi: 'Trưởng: quãng 3 trưởng rồi quãng 3 thứ; thứ thì ngược lại', en: 'Major: a major 3rd, then a minor 3rd; minor is the other way round' },
    { vi: 'Giảm: hai quãng 3 thứ; tăng: hai quãng 3 trưởng', en: 'Diminished: two minor 3rds; augmented: two major 3rds' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ba nốt chồng quãng 3', en: 'Three notes in thirds' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm** (chord) là nhiều nốt vang lên cùng lúc. **Hợp âm ba** (triad) gồm ba nốt chồng lên nhau, nốt này cách nốt kia một quãng 3.',
            en: 'A **chord** is several notes sounding together. A **triad** is three notes stacked in consecutive thirds.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5' },
        { type: 'play', notes: 'C4 E4 G4 C4+E4+G4 F4+A4+C5', label: { vi: 'Nghe từng nốt, rồi cả hợp âm', en: 'Hear each note, then the chords' } },
        { type: 'keys', notes: 'C4 E4 G4', caption: { vi: 'Cách một phím trắng:', en: 'Every other white key:' } },
        {
          type: 'tip',
          text: {
            vi: 'Chồng theo quãng 3, ba nốt nằm trên ba dòng liền nhau, hoặc trong ba khe liền nhau.',
            en: 'Stacked in thirds, the three notes sit on three lines in a row, or in three spaces in a row.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt gốc, nốt ba, nốt năm', en: 'Root, third and fifth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi xếp chồng theo quãng 3, nốt thấp nhất là **nốt gốc** (root), nốt giữa là **nốt ba** (third), nốt cao nhất là **nốt năm** (fifth). Tên gọi theo quãng tính từ nốt gốc: quãng 3 và quãng 5.',
            en: 'Stacked in thirds, the lowest note is the **root**, the middle note is the **third** and the highest is the **fifth**. The names are the intervals above the root: a 3rd and a 5th.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4 B4 D5 G4+B4+D5', labels: ['1', '3', '5', ''] },
        { type: 'play', notes: 'G4 B4 D5 G4+B4+D5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt gốc của hợp âm này là nốt nào?', en: 'What is the root of this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4+C5+E5' }],
      answer: { type: 'key', note: 'A' },
      reason: {
        vi: 'Ba nốt đã xếp chồng theo quãng 3, nên nốt thấp nhất {A} là nốt gốc.',
        en: 'The notes are stacked in thirds, so the lowest one, {A}, is the root.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm trưởng và thứ', en: 'Major and minor triads' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai quãng 3 cho biết **tính chất** (quality) của hợp âm. **Hợp âm trưởng** (major triad) có quãng 3 trưởng (4 nửa cung) ở dưới, quãng 3 thứ (3 nửa cung) ở trên. **Hợp âm thứ** (minor triad) thì ngược lại.',
            en: 'The two thirds give the chord its **quality**. A **major triad** has a major 3rd (4 half steps) below and a minor 3rd (3 half steps) above. A **minor triad** is the other way round.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 C4+Eb4+G4' },
        { type: 'keys', notes: 'C4 E4 G4', caption: { vi: '{C} trưởng:', en: '{C} major:' } },
        { type: 'play', notes: 'C4+E4+G4' },
        { type: 'keys', notes: 'C4 Eb4 G4', caption: { vi: '{C} thứ:', en: '{C} minor:' } },
        { type: 'play', notes: 'C4+Eb4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này trưởng hay thứ?', en: 'Is this triad major or minor?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4+F4+A4' },
        { type: 'play', notes: 'D4+F4+A4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trưởng', en: 'Major' } },
          { text: { vi: 'Thứ', en: 'Minor' }, correct: true },
        ],
      },
      reason: {
        vi: '{D}–{F} là quãng 3 thứ (3 nửa cung) và {F}–{A} là quãng 3 trưởng, nên hợp âm thứ.',
        en: '{D}–{F} is a minor 3rd (3 half steps) and {F}–{A} a major 3rd, so the triad is minor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm giảm và tăng', en: 'Diminished and augmented triads' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm giảm** (diminished triad) có hai quãng 3 thứ, nên quãng 5 hẹp lại thành quãng 5 giảm. **Hợp âm tăng** (augmented triad) có hai quãng 3 trưởng, nên quãng 5 rộng ra thành quãng 5 tăng.',
            en: 'A **diminished triad** has two minor 3rds, so its fifth shrinks to a diminished 5th. An **augmented triad** has two major 3rds, so its fifth grows to an augmented 5th.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hợp âm trưởng và thứ rất hay gặp, hợp âm giảm ít hơn, còn hợp âm tăng thì hiếm.',
            en: 'Major and minor triads are common, diminished triads less so, and augmented triads are rare.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B4+D5+F5 C4+E4+G#4' },
        { type: 'play', notes: 'B4+D5+F5 C4+E4+G#4', label: { vi: 'Nghe {B} giảm, rồi {C} tăng', en: 'Hear {B} diminished, then {C} augmented' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm này có tính chất gì?', en: 'What is the quality of this triad?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F#4+A4+C5' },
        { type: 'play', notes: 'F#4+A4+C5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trưởng', en: 'Major' } },
          { text: { vi: 'Thứ', en: 'Minor' } },
          { text: { vi: 'Giảm', en: 'Diminished' }, correct: true },
          { text: { vi: 'Tăng', en: 'Augmented' } },
        ],
      },
      reason: {
        vi: '{F#}–{A} và {A}–{C} đều là quãng 3 thứ (3 nửa cung), nên hợp âm giảm.',
        en: '{F#}–{A} and {A}–{C} are both minor 3rds (3 half steps), so the triad is diminished.',
      },
    },
  ],
} satisfies Lesson
