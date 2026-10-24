import type { Lesson } from '@/theory/types'

/**
 * Book 12.4: the basic 12-bar blues, I I I I | IV IV I I | V IV I I. The
 * book's song examples are copyrighted; the progression itself is generic,
 * shown here in {C} and {G} major as block chords. The Roman numeral levels
 * of the chords drill train finding I, IV and V in a key.
 */
export default {
  id: 'twelve-bar-blues',
  title: { vi: 'Blues 12 ô nhịp', en: 'The 12-bar blues' },
  minutes: 4,
  sources: [{ section: '12.4', url: 'https://musictheory.pugetsound.edu/mt21c/TwelveBarBlues.html' }],
  practice: { drill: 'chords', level: 5, durationSec: 60, mode: 'roman' },
  recap: [
    { vi: 'Blues 12 ô nhịp: ba dòng, mỗi dòng 4 ô', en: 'The 12-bar blues: three lines of four bars' },
    { vi: 'I I I I, IV IV I I, V IV I I', en: 'I I I I, IV IV I I, V IV I I' },
    { vi: 'Chỉ dùng ba hợp âm I, IV và V', en: 'It uses only three chords: I, IV and V' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ba dòng, mười hai ô', en: 'Three lines, twelve bars' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Blues 12 ô nhịp** (12-bar blues) là một tiến trình 12 ô nhịp, chia ba dòng 4 ô, chỉ dùng I, IV và V. Dòng 1 giữ I, dòng 2 sang IV rồi về I, dòng 3 đi V, IV rồi về I.',
            en: 'The **12-bar blues** is a 12-measure progression in three lines of four bars, using only I, IV and V. Line 1 stays on I, line 2 moves to IV and back to I, line 3 goes V, IV, then back to I.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4+E4+G4:w | C4+E4+G4:w | C4+E4+G4:w | C4+E4+G4:w |', labels: ['I', 'I', 'I', 'I'] },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'F4+A4+C5:w | F4+A4+C5:w | C4+E4+G4:w | C4+E4+G4:w |', labels: ['IV', 'IV', 'I', 'I'] },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'G4+B4+D5:w | F4+A4+C5:w | C4+E4+G4:w | C4+E4+G4:w ||', labels: ['V', 'IV', 'I', 'I'] },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:w C3+C4+E4+G4:w C3+C4+E4+G4:w C3+C4+E4+G4:w F2+F4+A4+C5:w F2+F4+A4+C5:w C3+C4+E4+G4:w C3+C4+E4+G4:w G2+G4+B4+D5:w F2+F4+A4+C5:w C3+C4+E4+G4:w C3+C4+E4+G4:w',
          bpm: 200,
          label: { vi: 'Nghe blues 12 ô nhịp', en: 'Hear the 12-bar blues' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 5, đầu dòng hai, là hợp âm nào?', en: 'Which chord is bar 5, the start of line two?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I', en: 'I' } },
          { text: { vi: 'IV', en: 'IV' }, correct: true },
          { text: { vi: 'V', en: 'V' } },
        ],
      },
      reason: {
        vi: 'Dòng hai là IV IV I I, nên ô nhịp 5 là IV.',
        en: 'Line two is IV IV I I, so bar 5 is IV.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ở các giọng khác', en: 'In other keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Blues ra đời đầu thế kỷ 20, rồi phổ biến trong nhạc swing thập niên 1930–1940 và rock and roll thời đầu thập niên 1950.',
            en: 'The blues began in the early 1900s and was popular in the swing era of the 1930s and 1940s and in early rock and roll in the 1950s.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Bậc La Mã giữ nguyên ở mọi giọng. Ở giọng {G} trưởng, I, IV và V là G, C và D.',
            en: 'The Roman numerals stay the same in every key. In {G} major, I, IV and V are G, C and D.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', notes: 'G4+B4+D5 C5+E5+G5 D5+F#5+A5', labels: ['I', 'IV', 'V'] },
        {
          type: 'play',
          notes: 'G2+G4+B4+D5:w G2+G4+B4+D5:w G2+G4+B4+D5:w G2+G4+B4+D5:w C3+C5+E5+G5:w C3+C5+E5+G5:w G2+G4+B4+D5:w G2+G4+B4+D5:w D3+D5+F#5+A5:w C3+C5+E5+G5:w G2+G4+B4+D5:w G2+G4+B4+D5:w',
          bpm: 200,
          label: { vi: 'Nghe blues ở giọng {G}', en: 'Hear the blues in {G}' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Blues 12 ô nhịp ở giọng {F} trưởng: hợp âm ở ô nhịp 9 có nốt gốc là gì?',
        en: 'A 12-bar blues in {F} major: what is the root of the chord in bar 9?',
      },
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: 'Ô nhịp 9 là V, và bậc 5 của gam {F} trưởng là {C}.',
        en: 'Bar 9 is V, and the fifth degree of {F} major is {C}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe dòng cuối của một bài blues ở giọng {C}. Đó là tiến trình nào?', en: 'Listen to the last line of a blues in {C}. Which progression is it?' },
      blocks: [{ type: 'play', notes: 'G2+G4+B4+D5:w F2+F4+A4+C5:w C3+C4+E4+G4:w C3+C4+E4+G4:w', bpm: 160 }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV–V–I–I', en: 'IV–V–I–I' } },
          { text: { vi: 'V–IV–I–I', en: 'V–IV–I–I' }, correct: true },
          { text: { vi: 'V–V–I–I', en: 'V–V–I–I' } },
        ],
      },
      reason: {
        vi: 'Dòng cuối đi từ V xuống IV rồi về I, giữ I hai ô cuối.',
        en: 'The last line falls from V to IV and back to I, which holds for the last two bars.',
      },
    },
  ],
} satisfies Lesson
