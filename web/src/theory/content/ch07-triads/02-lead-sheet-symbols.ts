import type { Lesson } from '@/theory/types'

/**
 * Book 6.2: lead-sheet symbols for the four qualities. Symbols are written in
 * letters, as the chords drill shows them (F♯m, B°, C+), whatever the reader's
 * naming; note names around them are pitch tokens.
 */
export default {
  id: 'lead-sheet-symbols',
  title: { vi: 'Ký hiệu hợp âm', en: 'Lead-sheet symbols' },
  minutes: 4,
  sources: [{ section: '6.2', url: 'https://musictheory.pugetsound.edu/mt21c/LeadSheetSymbols.html' }],
  practice: { drill: 'chords', level: 3, durationSec: 120 },
  recap: [
    { vi: 'Ký hiệu hợp âm cho biết nốt gốc và tính chất', en: 'A lead-sheet symbol gives the root and the quality' },
    { vi: 'Trưởng: chỉ chữ cái (F); thứ: thêm m (Gm)', en: 'Major: the letter alone (F); minor: add m (Gm)' },
    { vi: 'Giảm: thêm ° (D°); tăng: thêm + (C+)', en: 'Diminished: add ° (D°); augmented: add + (C+)' },
    { vi: 'Dấu hóa của nốt gốc đứng sau chữ cái: F♯m', en: 'The root’s accidental follows the letter: F♯m' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Viết tắt một hợp âm', en: 'A shorthand for chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Ký hiệu hợp âm** (lead-sheet symbol) là cách viết tắt hợp âm, hay dùng trong nhạc nhẹ và jazz. Ký hiệu cho biết nốt gốc và tính chất. Người chơi guitar hay piano tự chọn cách sắp xếp các nốt.',
            en: '**Lead-sheet symbols** are a shorthand for chords, common in popular music and jazz. A symbol gives the root and the quality. The guitarist or pianist chooses how to voice the notes.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5', labels: ['C', 'F', 'G'] },
        { type: 'play', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5' },
        {
          type: 'tip',
          text: {
            vi: 'Ký hiệu hợp âm luôn dùng chữ cái C D E F G A B, kể cả khi bạn gọi nốt là Do Re Mi.',
            en: 'Lead-sheet symbols always use the letters C D E F G A B, even if you name notes Do Re Mi.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Bốn tính chất, bốn cách viết', en: 'Four qualities, four symbols' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm trưởng chỉ viết chữ cái của nốt gốc: F. Hợp âm thứ thêm chữ m viết thường: Gm. Hợp âm giảm thêm dấu °, hợp âm tăng thêm dấu +: D°, C+.',
            en: 'A major triad is just the root’s letter: F. A minor triad adds a lowercase m: Gm. A diminished triad adds °, an augmented triad adds +: D°, C+.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+A4+C5 G4+Bb4+D5 D4+F4+Ab4 C4+E4+G#4', labels: ['F', 'Gm', 'D°', 'C+'] },
        { type: 'play', notes: 'F4+A4+C5 G4+Bb4+D5 D4+F4+Ab4 C4+E4+G#4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4+C5+E5' },
        { type: 'play', notes: 'A4+C5+E5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A', en: 'A' } },
          { text: { vi: 'Am', en: 'Am' }, correct: true },
          { text: { vi: 'A°', en: 'A°' } },
          { text: { vi: 'A+', en: 'A+' } },
        ],
      },
      reason: {
        vi: '{A}–{C} là quãng 3 thứ, {C}–{E} là quãng 3 trưởng: hợp âm {A} thứ, viết Am.',
        en: '{A}–{C} is a minor 3rd and {C}–{E} a major 3rd: {A} minor, written Am.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt gốc có dấu hóa', en: 'Roots with accidentals' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dấu hóa của nốt gốc đứng ngay sau chữ cái: F♯m là {F#} thứ, B♭ là {Bb} trưởng. Dấu hóa của nốt ba hay nốt năm không hiện trong ký hiệu.',
            en: 'The root’s accidental comes right after the letter: F♯m is {F#} minor, B♭ is {Bb} major. Accidentals on the third or the fifth do not show in the symbol.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#4+A4+C#5 Bb4+D5+F5', labels: ['F♯m', 'B♭'] },
        { type: 'keys', notes: 'F#4 A4 C#5', caption: { vi: 'F♯m:', en: 'F♯m:' } },
        { type: 'play', notes: 'F#4+A4+C#5' },
        { type: 'keys', notes: 'Bb4 D5 F5', from: 'C4', octaves: 2, caption: { vi: 'B♭:', en: 'B♭:' } },
        { type: 'play', notes: 'Bb4+D5+F5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm Gm gồm những nốt nào?', en: 'Which notes make up Gm?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{G} {B} {D}', en: '{G} {B} {D}' } },
          { text: { vi: '{G} {Bb} {D}', en: '{G} {Bb} {D}' }, correct: true },
          { text: { vi: '{G} {Bb} {Db}', en: '{G} {Bb} {Db}' } },
        ],
      },
      reason: {
        vi: 'Gm là {G} thứ: quãng 3 thứ {G}–{Bb}, rồi quãng 3 trưởng {Bb}–{D}.',
        en: 'Gm is {G} minor: a minor 3rd {G}–{Bb}, then a major 3rd {Bb}–{D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Eb4+G4+B4' },
        { type: 'play', notes: 'Eb4+G4+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'E♭', en: 'E♭' } },
          { text: { vi: 'E♭m', en: 'E♭m' } },
          { text: { vi: 'E♭+', en: 'E♭+' }, correct: true },
        ],
      },
      reason: {
        vi: '{Eb}–{G} và {G}–{B} đều là quãng 3 trưởng: hợp âm tăng, viết E♭+.',
        en: '{Eb}–{G} and {G}–{B} are both major 3rds: an augmented triad, written E♭+.',
      },
    },
  ],
} satisfies Lesson
