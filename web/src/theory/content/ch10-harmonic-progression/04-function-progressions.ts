import type { Lesson } from '@/theory/types'

/**
 * Book 9.4 (second half): progressions built from functions (T–D–T,
 * T–PD–D–T, T–TP–PD–D) and the flowchart's exceptions; 9.5: exceptions
 * explained by sequences, with our own example in place of the book's songs.
 * No practice link: no drill asks progressions.
 */
export default {
  id: 'function-progressions',
  title: { vi: 'Tiến trình theo chức năng', en: 'Progressions by function' },
  minutes: 5,
  sources: [
    { section: '9.4', url: 'https://musictheory.pugetsound.edu/mt21c/HarmonicFunction.html' },
    { section: '9.5', url: 'https://musictheory.pugetsound.edu/mt21c/ExceptionsCreatedBySequences.html' },
  ],
  recap: [
    { vi: 'Chủ–át–chủ: I–V–I, tiến trình cơ bản nhất', en: 'Tonic–dominant–tonic: I–V–I, the most basic progression' },
    { vi: 'Chủ–tiền át–át–chủ: I–ii–V–I hoặc I–IV–V–I', en: 'Tonic–pre-dominant–dominant–tonic: I–ii–V–I or I–IV–V–I' },
    { vi: 'I–vi–IV–V thêm hợp âm kéo dài chủ', en: 'I–vi–IV–V adds a tonic prolongation chord' },
    { vi: 'Ngoại lệ: IV–I, V–vi, I/5th–V, và mô tiến', en: 'Exceptions: IV–I, V–vi, I/5th–V, and sequences' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chủ, tiền át, át, chủ', en: 'Tonic, pre-dominant, dominant, tonic' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tiến trình cơ bản nhất là chủ–át–chủ, thường là I–V–I. Thêm một hợp âm tiền át, ta có chủ–tiền át–át–chủ: I–ii–V–I hoặc I–IV–V–I.',
            en: 'The most basic progression is tonic–dominant–tonic, usually I–V–I. Add a pre-dominant chord and you have tonic–pre-dominant–dominant–tonic: I–ii–V–I or I–IV–V–I.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 G4+B4+D5 C4+E4+G4', labels: ['I', 'IV', 'V', 'I'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h F3+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w', label: { vi: 'Nghe I–IV–V–I', en: 'Hear I–IV–V–I' } },
        {
          type: 'tip',
          text: {
            vi: 'vii° cũng thay được V: I–vii°–I, I–IV–vii°–I, I–ii–vii°–I. Các cách này ít gặp hơn vì hợp âm giảm kém ổn định.',
            en: 'vii° can stand in for V too: I–vii°–I, I–IV–vii°–I, I–ii–vii°–I. These are less common, because diminished chords are unstable.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Tiến trình nào là chủ–tiền át–át–chủ?', en: 'Which progression is tonic–pre-dominant–dominant–tonic?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I–V–ii–I', en: 'I–V–ii–I' } },
          { text: { vi: 'I–ii–V–I', en: 'I–ii–V–I' }, correct: true },
          { text: { vi: 'I–vi–iii–I', en: 'I–vi–iii–I' } },
        ],
      },
      reason: {
        vi: 'ii là tiền át và V là át, nên I–ii–V–I đi đúng thứ tự chức năng.',
        en: 'ii is a pre-dominant and V a dominant, so I–ii–V–I takes the functions in order.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thêm kéo dài chủ', en: 'Adding tonic prolongation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chủ–kéo dài chủ–tiền át–át hay gặp nhất là I–vi–IV–V, còn gọi là **tiến trình thập niên 50** (’50s progression). Bass đi xuống từng quãng 3: {C}, {A}, {F}.',
            en: 'Tonic–tonic prolongation–pre-dominant–dominant is most often I–vi–IV–V, also called the **’50s progression**. The bass falls by thirds: {C}, {A}, {F}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A4+C5+E5 F4+A4+C5 G4+B4+D5', labels: ['I', 'vi', 'IV', 'V'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h F2+F4+A4+C5:h G2+G4+B4+D5:h', label: { vi: 'Nghe I–vi–IV–V', en: 'Hear I–vi–IV–V' } },
        {
          type: 'text',
          text: {
            vi: 'Nhạc cổ điển hay dùng I–vi–ii–V với ii có nốt 3 ở bass (ii/3rd): bass vẫn là {C}, {A}, {F}, {G}.',
            en: 'Classical music often uses I–vi–ii–V with ii’s third in the bass (ii/3rd): the bass is still {C}, {A}, {F}, {G}.',
          },
        },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h F2+D4+F4+A4:h G2+G4+B4+D5:h', label: { vi: 'Nghe I–vi–ii/3rd–V', en: 'Hear I–vi–ii/3rd–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bass của I–vi–IV–V ở giọng {C} trưởng là {C}, {A}, {F}, rồi nốt gì?',
        en: 'The bass of I–vi–IV–V in {C} major is {C}, {A}, {F}, then what?',
      },
      answer: { type: 'key', note: 'G' },
      reason: {
        vi: 'Hợp âm cuối là V, có nốt gốc là bậc 5 của gam {C} trưởng, tức {G}.',
        en: 'The last chord is V, whose root is the fifth degree of {C} major, {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ngoại lệ của sơ đồ', en: 'Exceptions to the flowchart' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Kết phụ IV–I và kết đánh lừa V–vi đi ngoài sơ đồ chức năng. Khi IV đi về I, ta coi IV là kéo dài chủ.',
            en: 'The plagal cadence IV–I and the deceptive cadence V–vi fall outside the flowchart. When IV goes to I, label IV as tonic prolongation.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+A4+C5 C4+E4+G4 || G4+B4+D5 A4+C5+E5', labels: ['IV', 'I', 'V', 'vi'] },
        { type: 'play', notes: 'F3+F4+A4+C5:h C3+C4+E4+G4:w G2+G4+B4+D5:h A2+A4+C5+E5:w' },
        {
          type: 'text',
          text: {
            vi: 'Ngoại lệ thứ hai: hợp âm I có nốt 5 ở bass (I/5th) mang chức năng át khi nó đi đến V.',
            en: 'The second exception: a I chord with its fifth in the bass (I/5th) has dominant function when it goes to V.',
          },
        },
        { type: 'play', notes: 'F2+F4+A4+C5:h G2+E4+G4+C5:h G2+D4+G4+B4:h C3+C4+E4+G4:w', label: { vi: 'Nghe IV–I/5th–V–I', en: 'Hear IV–I/5th–V–I' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Mô tiến tạo ngoại lệ', en: 'Exceptions made by sequences' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhiều tiến trình lạ được giải thích bằng **mô tiến** (sequence). Ở đây cặp I–V (nốt gốc xuống quãng 4) được lặp lại thấp dần: vi–iii, rồi IV–I.',
            en: 'Many unusual progressions are explained by **sequences**. Here the pair I–V (root down a fourth) is repeated lower and lower: vi–iii, then IV–I.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+E4+G4 G4+B4+D5 A4+C5+E5 E4+G4+B4 F4+A4+C5 C4+E4+G4 F4+A4+C5 G4+B4+D5',
          labels: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
          highlight: [0, 1, 2, 3],
        },
        { type: 'play', notes: 'C3+C4+E4+G4:h G2+G4+B4+D5:h A2+A4+C5+E5:h E2+E4+G4+B4:h F2+F4+A4+C5:h C3+C4+E4+G4:h F2+F4+A4+C5:h G2+G4+B4+D5:h' },
        {
          type: 'tip',
          text: {
            vi: 'vi–iii đi ngược sơ đồ, vì iii vốn đứng trước vi. Tai vẫn chấp nhận vì nó nghe theo mẫu đang lặp lại.',
            en: 'vi–iii runs against the flowchart, where iii comes before vi. The ear accepts it because it follows the repeating pattern.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong I–V–vi–iii, cặp nào lặp lại mẫu của I–V?', en: 'In I–V–vi–iii, which pair repeats the pattern of I–V?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V–vi', en: 'V–vi' } },
          { text: { vi: 'vi–iii', en: 'vi–iii' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ở vi–iii, nốt gốc cũng xuống một quãng 4 như I–V, chỉ bắt đầu thấp hơn một quãng 3.',
        en: 'In vi–iii the root also falls a fourth, as in I–V, starting a third lower.',
      },
    },
  ],
} satisfies Lesson
