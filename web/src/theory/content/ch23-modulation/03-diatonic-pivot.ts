import type { Lesson } from '@/theory/types'

/**
 * Book 22.4: diatonic pivot chords, the chords common to {G} and {D} major,
 * and the pivot's harmonic function; 22.2 (last part): how to find the pivot
 * by working back from the cadence. Our own progressions in place of the
 * book's Bach chorales. The pivot bracket is a stacked label: old key above,
 * new key below.
 */
export default {
  id: 'diatonic-pivot',
  title: { vi: 'Hợp âm trụ thuận giọng', en: 'Diatonic pivot chords' },
  minutes: 5,
  sources: [
    { section: '22.4', url: 'https://musictheory.pugetsound.edu/mt21c/ModulationsWithDiatonicPivotChords.html' },
    { section: '22.2', url: 'https://musictheory.pugetsound.edu/mt21c/TonicizationVersusModulation.html' },
  ],
  practice: { drill: 'chords', level: 6, durationSec: 120, mode: 'roman' },
  recap: [
    { vi: 'Hợp âm trụ thuộc cả giọng cũ lẫn giọng mới', en: 'A pivot chord belongs to both the old and the new key' },
    { vi: 'Hợp âm chung có cùng nốt gốc và cùng tính chất ở hai giọng', en: 'A common chord has the same root and quality in both keys' },
    { vi: 'Hợp âm trụ hay là chủ ở giọng cũ, tiền át ở giọng mới', en: 'The pivot is often tonic in the old key and pre-dominant in the new' },
    { vi: 'Tìm kết ở giọng mới trước, rồi lần ngược về hợp âm trụ', en: 'Find the cadence in the new key first, then work back to the pivot' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm trụ', en: 'Pivot chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nhiều lần chuyển giọng dùng **hợp âm trụ** (pivot chord), còn gọi là hợp âm chung: một hợp âm thuộc cả hai giọng. Khi phân tích, **ngoặc trụ** (pivot bracket) ghi cho nó hai bậc La Mã: giọng cũ ở trên, giọng mới ở dưới.',
            en: 'Many modulations use a **pivot chord**, or common chord: a chord that belongs to both keys. In analysis, a **pivot bracket** gives it two Roman numerals: the old key above, the new key below.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Để tìm hợp âm trụ, hãy tìm hợp âm thuận giọng ở cả hai giọng: cùng nốt gốc, cùng tính chất. {G} trưởng và {D} trưởng có chung bốn hợp âm.',
            en: 'To find pivot chords, look for chords diatonic in both keys: the same root and the same quality. {G} major and {D} major share four chords.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', notes: 'G4+B4+D5 B4+D5+F#5 D4+F#4+A4 E4+G4+B4', labels: ['I\nIV', 'iii\nvi', 'V\nI', 'vi\nii'] },
        { type: 'play', notes: 'G4+B4+D5:h B4+D5+F#5:h D4+F#4+A4:h E4+G4+B4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào thuộc cả {G} trưởng và {D} trưởng?', en: 'Which chord belongs to both {G} major and {D} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C', en: 'C' } },
          { text: { vi: 'Am', en: 'Am' } },
          { text: { vi: 'A', en: 'A' } },
          { text: { vi: 'Em', en: 'Em' }, correct: true },
        ],
      },
      reason: {
        vi: 'Em là vi ở {G} trưởng và ii ở {D} trưởng; ba hợp âm kia cần {C} hoặc {C#}, chỉ có ở một giọng.',
        en: 'Em is vi in {G} major and ii in {D} major; the other three need {C} or {C#}, found in only one of the keys.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chức năng của hợp âm trụ', en: 'The pivot’s function' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm trụ thường không mang chức năng át ở giọng mới, vì như vậy chuyển giọng nghe đột ngột. Nó hay có chức năng chủ hoặc kéo dài chủ ở giọng cũ, và tiền át ở giọng mới.',
            en: 'The pivot usually does not have dominant function in the new key, since that can sound abrupt and unconvincing. More often it has tonic or tonic prolongation function in the old key and pre-dominant function in the new one.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây hợp âm G là I (chủ) ở giọng {G} và IV (tiền át) ở giọng {D}, nên giọng mới đến thật liền mạch.',
            en: 'Here the G chord is I (tonic) in {G} and IV (pre-dominant) in {D}, so the new key arrives smoothly.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'G',
          notes: 'G2+D4+G4+B4 C3+E4+G4+C5 D3+D4+F#4+A4 G2+D4+G4+B4 A2+E4+G4+C#5 D3+D4+F#4+D5',
          labels: ['I', 'IV', 'V', 'I\nIV', 'V7', 'I'],
          highlight: [3],
        },
        { type: 'play', notes: 'G2+D4+G4+B4:h C3+E4+G4+C5:h D3+D4+F#4+A4:h G2+D4+G4+B4:h A2+E4+G4+C#5:h D3+D4+F#4+D5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Chuyển từ {C} trưởng sang {F} trưởng, nên tránh hợp âm trụ nào?', en: 'Moving from {C} major to {F} major, which pivot should you avoid?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C', en: 'C' }, correct: true },
          { text: { vi: 'Dm', en: 'Dm' } },
          { text: { vi: 'Am', en: 'Am' } },
        ],
      },
      reason: {
        vi: 'C là I ở {C} trưởng nhưng là V ở {F} trưởng: chức năng át ở giọng mới làm chuyển giọng nghe đột ngột.',
        en: 'C is I in {C} major but V in {F} major: dominant function in the new key makes the change sound abrupt.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm hợp âm trụ', en: 'Finding the pivot' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nghe để tìm kết ở giọng mới, rồi lần ngược: V của giọng mới có đi sau ii hay IV của giọng ấy không? Sau đó phân tích từ đầu câu ở giọng cũ cho đến khi gặp giọng mới.',
            en: 'Listen for the cadence in the new key, then work backward: is its V approached by ii or IV in the new key? Then analyze from the start of the phrase in the old key until you reach the new key.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hợp âm trụ nằm ở chỗ hai cách đọc gặp nhau. Nếu hai hợp âm liền nhau đều hợp lý, ngoặc trụ có thể ôm cả hai.',
            en: 'The pivot is where the two readings meet. If two chords in a row both work, the bracket can hold both.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+E4+G4+C5 F2+F4+A4+C5 C3+E4+G4+C5 A2+E4+A4+C5 D3+F#4+A4+C5 G2+G4+B4+D5',
          labels: ['I', 'IV', 'I', 'vi\nii', 'V7', 'I'],
          highlight: [3],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:h F2+F4+A4+C5:h C3+E4+G4+C5:h A2+E4+A4+C5:h D3+F#4+A4+C5:h G2+G4+B4+D5:w', label: { vi: 'Nghe {C} sang {G}', en: 'Hear {C} to {G}' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bm là vi ở giọng {D} trưởng. Ở giọng {A} trưởng, nó là bậc nào?', en: 'Bm is vi in {D} major. What is it in {A} major?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          key: 'D',
          notes: 'D3+F#4+A4+D5 G2+G4+B4+D5 D3+F#4+A4+D5 B2+F#4+B4+D5 E3+G#4+B4+D5 A2+A4+C#5+E5',
          labels: ['I', 'IV', 'I', '?', 'V7', 'I'],
          highlight: [3],
        },
        { type: 'play', notes: 'D3+F#4+A4+D5:h G2+G4+B4+D5:h D3+F#4+A4+D5:h B2+F#4+B4+D5:h E3+G#4+B4+D5:h A2+A4+C#5+E5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'ii', en: 'ii' }, correct: true },
          { text: { vi: 'vi', en: 'vi' } },
          { text: { vi: 'iii', en: 'iii' } },
        ],
      },
      reason: {
        vi: 'Bm có nốt gốc {B}, bậc 2 của gam {A} trưởng, và là hợp âm thứ: ii, một hợp âm tiền át.',
        en: 'Bm has its root on {B}, degree 2 of {A} major, and is minor: ii, a pre-dominant chord.',
      },
    },
  ],
} satisfies Lesson
