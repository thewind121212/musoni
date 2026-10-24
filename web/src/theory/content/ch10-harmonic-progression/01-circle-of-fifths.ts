import type { Lesson } from '@/theory/types'

/**
 * Book 9.1: the circle of fifths progression in major and minor, its roots
 * falling by fifths, and the sequence that makes it feel inevitable.
 */
export default {
  id: 'circle-of-fifths',
  title: { vi: 'Tiến trình vòng quãng năm', en: 'The circle of fifths progression' },
  minutes: 4,
  sources: [{ section: '9.1', url: 'https://musictheory.pugetsound.edu/mt21c/CircleOfFifths.html' }],
  practice: { drill: 'chords', level: 5, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Vòng quãng năm: I–IV–vii°–iii–vi–ii–V–I', en: 'The circle of fifths: I–IV–vii°–iii–vi–ii–V–I' },
    { vi: 'Mỗi nốt gốc đi xuống một quãng 5 đến nốt gốc sau', en: 'Each root falls a fifth to the next root' },
    { vi: 'Giọng thứ: i–iv–VII–III–VI–ii°–V–i', en: 'In minor: i–iv–VII–III–VI–ii°–V–i' },
    { vi: 'Mô tiến: một ý nhạc lặp lại ở cao độ khác', en: 'A sequence: an idea repeated at another pitch level' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Vòng quãng năm', en: 'The circle of fifths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tiến trình hòa âm** (harmonic progression) là cách các hợp âm nối tiếp nhau. **Tiến trình vòng quãng năm** (circle of fifths progression) đi qua cả bảy hợp âm thuận giọng: I–IV–vii°–iii–vi–ii–V–I.',
            en: 'A **harmonic progression** is the way chords follow one another. The **circle of fifths progression** passes through all seven diatonic chords: I–IV–vii°–iii–vi–ii–V–I.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+E4+G4 F4+A4+C5 B4+D5+F5 E4+G4+B4 A4+C5+E5 D4+F4+A4 G4+B4+D5 C4+E4+G4',
          labels: ['I', 'IV', 'vii°', 'iii', 'vi', 'ii', 'V', 'I'],
        },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:h F3+F4+A4+C5:h B2+B4+D5+F5:h E3+E4+G4+B4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:w',
          label: { vi: 'Nghe ở giọng {C} trưởng', en: 'Hear it in {C} major' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt gốc đi xuống quãng năm', en: 'Roots falling by fifths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hãy nghe các nốt gốc: từ {C} xuống một quãng 5 là {F}, rồi {B}, {E}, {A}, {D}, {G} và về {C}. Để bass không xuống quá thấp, quãng 5 đi xuống có thể thay bằng quãng 4 đi lên.',
            en: 'Follow the roots: down a fifth from {C} is {F}, then {B}, {E}, {A}, {D}, {G} and back to {C}. To keep the bass from sinking too low, a fifth down can be a fourth up instead.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'C3 F3 B2 E3 A2 D3 G2 C3', labels: 'names' },
        { type: 'play', notes: 'C3 F3 B2 E3 A2 D3 G2 C3', label: { vi: 'Nghe bass', en: 'Hear the bass' } },
        {
          type: 'tip',
          text: {
            vi: 'Vòng này khác vòng quãng năm của hóa biểu: nó chỉ dùng nốt thuận giọng, nên {F} xuống {B} là quãng 5 giảm.',
            en: 'This circle differs from the circle of fifths for key signatures: it uses diatonic notes only, so {F} down to {B} is a diminished fifth.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong vòng quãng năm, hợp âm nào đi sau vi?', en: 'In the circle of fifths, which chord follows vi?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV', en: 'IV' } },
          { text: { vi: 'ii', en: 'ii' }, correct: true },
          { text: { vi: 'V', en: 'V' } },
        ],
      },
      reason: {
        vi: 'Nốt gốc đi xuống một quãng 5: ở giọng {C} trưởng, {A} xuống {D}, tức là vi sang ii.',
        en: 'The root falls a fifth: in {C} major, {A} goes down to {D}, so vi goes to ii.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ở giọng thứ', en: 'In minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng thứ, vòng này là i–iv–VII–III–VI–ii°–V–i. VII là hợp âm trên **bậc VII hạ** (subtonic) của gam thứ tự nhiên, còn V có cảm âm của gam thứ hòa âm.',
            en: 'In minor the circle is i–iv–VII–III–VI–ii°–V–i. VII is the chord on the **subtonic** of the natural minor scale, while V has the leading tone of the harmonic minor.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'A4+C5+E5 D4+F4+A4 G4+B4+D5 C4+E4+G4 F4+A4+C5 B4+D5+F5 E4+G#4+B4 A4+C5+E5',
          labels: ['i', 'iv', 'VII', 'III', 'VI', 'ii°', 'V', 'i'],
        },
        {
          type: 'play',
          notes: 'A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:h F2+F4+A4+C5:h B2+B4+D5+F5:h E2+E4+G#4+B4:h A2+A4+C5+E5:w',
          label: { vi: 'Nghe ở giọng {A} thứ', en: 'Hear it in {A} minor' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {A} thứ, hợp âm đi sau VII ({G}) có nốt gốc là gì?',
        en: 'In {A} minor, what is the root of the chord after VII ({G})?',
      },
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'VII sang III: {G} xuống một quãng 5 là {C}, hợp âm {C} trưởng.',
        en: 'VII goes to III: a fifth down from {G} is {C}, the {C} major chord.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Mô tiến', en: 'Sequences' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Mô tiến** (sequence) là một ý nhạc được lặp lại ở cao độ khác. Ở đây ba nốt đầu được nhắc lại, mỗi lần thấp hơn một bậc.',
            en: 'A **sequence** is a musical idea repeated at a different pitch level. Here the first three notes come back, a step lower each time.',
          },
        },
        { type: 'staff', clef: 'treble', time: '2/4', notes: 'E5:8 D5:8 C5:q | D5:8 C5:8 B4:q | C5:8 B4:8 A4:q', highlight: [0, 1, 2] },
        { type: 'play', notes: 'E5:8 D5:8 C5:q D5:8 C5:8 B4:q C5:8 B4:8 A4:q' },
        {
          type: 'text',
          text: {
            vi: 'Vòng quãng năm nghe như tất yếu vì nó là một mô tiến hòa âm: cặp "xuống quãng 5, lên quãng 4" của bass cứ lặp lại, mỗi lần thấp hơn một bậc.',
            en: 'The circle of fifths feels inevitable because it is a harmonic sequence: the bass pair "down a fifth, up a fourth" repeats, a step lower each time.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Mô tiến là gì?', en: 'What is a sequence?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một ý nhạc lặp lại ở cao độ khác', en: 'An idea repeated at a different pitch level' }, correct: true },
          { text: { vi: 'Một ý nhạc lặp lại y hệt', en: 'An idea repeated exactly' } },
          { text: { vi: 'Một hợp âm giữ suốt ô nhịp', en: 'A chord held for a whole measure' } },
        ],
      },
      reason: {
        vi: 'Mô tiến giữ nguyên hình dáng của ý nhạc nhưng chuyển nó lên hoặc xuống.',
        en: 'A sequence keeps the shape of the idea but moves it up or down.',
      },
    },
  ],
} satisfies Lesson
