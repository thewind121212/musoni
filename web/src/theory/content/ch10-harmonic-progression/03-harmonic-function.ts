import type { Lesson } from '@/theory/types'

/**
 * Book 9.4 (first half): the four harmonic functions and the harmonic
 * flowchart in major and minor.
 */
export default {
  id: 'harmonic-function',
  title: { vi: 'Chức năng hòa âm', en: 'Harmonic function' },
  minutes: 5,
  sources: [{ section: '9.4', url: 'https://musictheory.pugetsound.edu/mt21c/HarmonicFunction.html' }],
  practice: { drill: 'chords', level: 6, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Chủ: I, ổn định, không cần đi đâu', en: 'Tonic: I, stable, needs to go nowhere' },
    { vi: 'Át: V và vii°, đi về I', en: 'Dominant: V and vii°, which go to I' },
    { vi: 'Tiền át: IV và ii, đi đến hợp âm át', en: 'Pre-dominant: IV and ii, which go to a dominant chord' },
    { vi: 'Kéo dài chủ: vi và iii, đi sau I, trước tiền át', en: 'Tonic prolongation: vi and iii, after I and before a pre-dominant' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chủ và át', en: 'Tonic and dominant' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chức năng hòa âm** (harmonic function) là khuynh hướng của một hợp âm: muốn đi tiếp đến hợp âm khác, hay được nghỉ. Hợp âm I có **chức năng chủ** (tonic function): ổn định, không đòi đi đâu nữa.',
            en: '**Harmonic function** is a chord’s tendency to move on to other chords, or to stay at rest. The I chord has **tonic function**: stable, at rest, demanding no move.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'V và vii° có **chức năng át** (dominant function): chúng chứa cảm âm và bậc 2, nên muốn đi về I.',
            en: 'V and vii° have **dominant function**: they hold the leading tone and the supertonic, so they tend to go to I.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 G4+B4+D5 C4+E4+G4 B4+D5+F5 C5+E5+G5', labels: ['I', 'V', 'I', 'vii°', 'I'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h G2+G4+B4+D5:h C3+C4+E4+G4:w B2+B4+D5+F5:h C3+C5+E5+G5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm vii° có chức năng gì?', en: 'What function does vii° have?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chủ', en: 'Tonic' } },
          { text: { vi: 'Át', en: 'Dominant' }, correct: true },
          { text: { vi: 'Tiền át', en: 'Pre-dominant' } },
        ],
      },
      reason: {
        vi: 'vii° chứa cảm âm và bậc 2 như V, nên nó cũng muốn đi về I.',
        en: 'Like V, vii° holds the leading tone and the supertonic, so it too tends to go to I.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiền át', en: 'Pre-dominant' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'IV và ii có **chức năng tiền át** (pre-dominant function): chúng chứa bậc 4 và bậc 6, và thường đi đến một hợp âm át.',
            en: 'IV and ii have **pre-dominant function**: they hold scale degrees 4 and 6, and tend to go to a chord of dominant function.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4+A4+C5 G4+B4+D5 D4+F4+A4 G4+B4+D5', labels: ['IV', 'V', 'ii', 'V'] },
        { type: 'play', notes: 'F3+F4+A4+C5:h G2+G4+B4+D5:w D3+D4+F4+A4:h G2+G4+B4+D5:w' },
        { type: 'keys', notes: 'F4 A4', from: 'C4', labels: 'names', caption: { vi: 'Bậc 4 và bậc 6 ở giọng {C}:', en: 'Degrees 4 and 6 in {C}:' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Kéo dài chủ', en: 'Tonic prolongation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'vi và iii có chung hai nốt với hợp âm I, nên chúng kéo dài cảm giác chủ. Đó là **chức năng kéo dài chủ** (tonic prolongation function): đi sau I và trước hợp âm tiền át.',
            en: 'vi and iii share two notes with the I chord, so they stretch out its sound. That is **tonic prolongation function**: they come after I and lead to a pre-dominant chord.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A3+C4+E4 E4+G4+B4', labels: ['I', 'vi', 'iii'], highlight: [0] },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A3+C4+E4:h E3+E4+G4+B4:h' },
        { type: 'keys', notes: 'C4 E4 G4', from: 'C4', labels: 'names', caption: { vi: 'Hợp âm I:', en: 'The I chord:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm vi có chức năng gì?', en: 'What function does vi have?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'A4+C5+E5', labels: ['vi'] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kéo dài chủ', en: 'Tonic prolongation' }, correct: true },
          { text: { vi: 'Tiền át', en: 'Pre-dominant' } },
          { text: { vi: 'Át', en: 'Dominant' } },
        ],
      },
      reason: {
        vi: 'vi ({A} {C} {E}) có chung {C} và {E} với I, nên nó kéo dài chủ.',
        en: 'vi ({A} {C} {E}) shares {C} and {E} with I, so it prolongs the tonic.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Sơ đồ chức năng', en: 'The harmonic flowchart' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Sơ đồ chức năng** (harmonic flowchart) ở giọng trưởng: I → iii → vi → IV hoặc ii → V hoặc vii° → I. Hợp âm I có thể nhảy thẳng đến bất kỳ chức năng nào.',
            en: 'The **harmonic flowchart** in major: I → iii → vi → IV or ii → V or vii° → I. The I chord can jump straight to a chord of any function.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 E4+G4+B4 A4+C5+E5 D4+F4+A4 G4+B4+D5 C4+E4+G4', labels: ['I', 'iii', 'vi', 'ii', 'V', 'I'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h E3+E4+G4+B4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:w' },
        {
          type: 'tip',
          text: {
            vi: 'Giọng thứ có thêm VII trên bậc VII hạ: i → VII → III → VI → iv hoặc ii° → V hoặc vii° → i. VII chỉ có một việc là đi đến III.',
            en: 'Minor adds VII on the subtonic: i → VII → III → VI → iv or ii° → V or vii° → i. VII has one job: to go to III.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Theo sơ đồ chức năng, sau ii thường là hợp âm nào?', en: 'On the flowchart, which chord usually follows ii?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'vi', en: 'vi' } },
          { text: { vi: 'iii', en: 'iii' } },
          { text: { vi: 'V', en: 'V' }, correct: true },
        ],
      },
      reason: {
        vi: 'ii là tiền át, nên nó đi đến một hợp âm át: V hoặc vii°.',
        en: 'ii is a pre-dominant, so it goes to a dominant chord: V or vii°.',
      },
    },
  ],
} satisfies Lesson
