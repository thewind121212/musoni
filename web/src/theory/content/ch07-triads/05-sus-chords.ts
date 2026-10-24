import type { Lesson } from '@/theory/types'

/**
 * Book 6.5 (sus4 and sus2) with the whole summary table of 6.6. No practice
 * link: the chords drill asks only the four triad qualities.
 */
export default {
  id: 'sus-chords',
  title: { vi: 'Hợp âm sus', en: 'Sus chords' },
  minutes: 4,
  sources: [
    { section: '6.5', url: 'https://musictheory.pugetsound.edu/mt21c/SimpleSusChords.html' },
    { section: '6.6', url: 'https://musictheory.pugetsound.edu/mt21c/SummaryOfTriadConstruction.html' },
  ],
  recap: [
    { vi: 'Hợp âm sus thay nốt ba bằng một nốt khác', en: 'A sus chord replaces the third with another note' },
    { vi: 'Sus4: quãng 4 đúng thay nốt ba, Csus4 là {C} {F} {G}', en: 'Sus4: a perfect 4th replaces the third; Csus4 is {C} {F} {G}' },
    { vi: 'Sus2: quãng 2 trưởng thay nốt ba, Csus2 là {C} {D} {G}', en: 'Sus2: a major 2nd replaces the third; Csus2 is {C} {D} {G}' },
    { vi: 'Cả hai đều giữ quãng 5 đúng từ nốt gốc', en: 'Both keep a perfect 5th above the root' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Không có nốt ba', en: 'No third' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm sus** (sus chord) bỏ nốt ba, thay bằng một nốt khác. Sus là viết tắt của suspended (treo), loại hợp âm rất hay gặp trong nhạc nhẹ.',
            en: 'A **sus chord** leaves out the third and puts another note in its place. Sus is short for suspended; these chords are common in popular music.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 C4+F4+G4 C4+D4+G4', labels: ['C', 'Csus4', 'Csus2'] },
        { type: 'play', notes: 'C4+E4+G4 C4+F4+G4 C4+D4+G4' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm sus4', en: 'The sus4 chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **hợp âm sus4** (sus4 chord), quãng 4 đúng thay cho nốt ba: Csus4 là {C} {F} {G}. Ký hiệu này có khi viết gọn là Csus.',
            en: 'In a **sus4 chord**, a perfect 4th replaces the third: Csus4 is {C} {F} {G}. The symbol is sometimes written just Csus.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+F4+G4', labels: ['Csus4'] },
        { type: 'keys', notes: 'C4 F4 G4', caption: { vi: 'Csus4:', en: 'Csus4:' } },
        { type: 'play', notes: 'C4+F4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm Gsus4 gồm những nốt nào?', en: 'Which notes make up Gsus4?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{G} {B} {D}', en: '{G} {B} {D}' } },
          { text: { vi: '{G} {C} {D}', en: '{G} {C} {D}' }, correct: true },
          { text: { vi: '{G} {A} {D}', en: '{G} {A} {D}' } },
        ],
      },
      reason: {
        vi: 'Quãng 4 đúng trên {G} là {C}, nốt này thay cho nốt ba {B}.',
        en: 'A perfect 4th above {G} is {C}, which takes the place of the third, {B}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm sus2', en: 'The sus2 chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **hợp âm sus2** (sus2 chord), quãng 2 trưởng thay cho nốt ba: Csus2 là {C} {D} {G}. Cả sus2 và sus4 đều giữ quãng 5 đúng từ nốt gốc lên nốt năm.',
            en: 'In a **sus2 chord**, a major 2nd replaces the third: Csus2 is {C} {D} {G}. Both sus2 and sus4 keep a perfect 5th from the root to the fifth.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+D4+G4', labels: ['Csus2'] },
        { type: 'keys', notes: 'C4 D4 G4', caption: { vi: 'Csus2:', en: 'Csus2:' } },
        { type: 'play', notes: 'C4+D4+G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4+E4+A4' },
        { type: 'play', notes: 'D4+E4+A4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Dsus2', en: 'Dsus2' }, correct: true },
          { text: { vi: 'Dsus4', en: 'Dsus4' } },
          { text: { vi: 'Dm', en: 'Dm' } },
        ],
      },
      reason: {
        vi: '{D}–{E} là quãng 2 trưởng thay cho nốt ba, còn {D}–{A} vẫn là quãng 5 đúng: Dsus2.',
        en: '{D}–{E} is a major 2nd in place of the third, and {D}–{A} is still a perfect 5th: Dsus2.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tóm tắt: hai quãng từ dưới lên', en: 'Summary: two intervals, bottom up' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đếm nửa cung của quãng dưới rồi quãng trên: trưởng 4 và 3, thứ 3 và 4, giảm 3 và 3, tăng 4 và 4. Sus2 là 2 và 5 (quãng 2 trưởng, quãng 4 đúng), sus4 là 5 và 2.',
            en: 'Count the half steps of the lower interval, then the upper: major 4 and 3, minor 3 and 4, diminished 3 and 3, augmented 4 and 4. Sus2 is 2 and 5 (a major 2nd, a perfect 4th), sus4 is 5 and 2.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 C4+Eb4+G4 C4+Eb4+Gb4 C4+E4+G#4', labels: ['C', 'Cm', 'C°', 'C+'] },
        { type: 'play', notes: 'C4+E4+G4 C4+Eb4+G4 C4+Eb4+Gb4 C4+E4+G#4' },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Quãng dưới 5 nửa cung, quãng trên 2 nửa cung: đó là hợp âm gì?',
        en: 'Lower interval 5 half steps, upper 2: which chord is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Sus2', en: 'Sus2' } },
          { text: { vi: 'Sus4', en: 'Sus4' }, correct: true },
          { text: { vi: 'Tăng', en: 'Augmented' } },
        ],
      },
      reason: {
        vi: '5 nửa cung là quãng 4 đúng ở dưới, rồi quãng 2 trưởng lên tới quãng 5 đúng: sus4.',
        en: '5 half steps is a perfect 4th at the bottom, then a major 2nd up to the perfect 5th: sus4.',
      },
    },
  ],
} satisfies Lesson
