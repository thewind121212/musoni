import type { Lesson } from '@/theory/types'

/**
 * Book 22.7: direct (phrase) modulation, common-tone modulation, chromatic
 * mediants and sequential modulation. Every example is our own progression
 * following the harmonic plan the book describes (a half cadence in {C}
 * minor, then {Ab} major; {A} as the hinge from {D} minor to {F} major; an
 * idea repeated a step higher). The book's film and pop examples are left out.
 * No practice link: no drill fits.
 */
export default {
  id: 'without-pivot',
  title: { vi: 'Chuyển giọng không cần hợp âm trụ', en: 'Modulations without pivot chords' },
  minutes: 6,
  sources: [{ section: '22.7', url: 'https://musictheory.pugetsound.edu/mt21c/ModulationsWithoutPivotChords.html' }],
  recap: [
    { vi: 'Chuyển giọng trực tiếp nhảy sang giọng mới, không có hợp âm trụ', en: 'Direct modulation jumps to the new key, with no pivot chord' },
    { vi: 'Chuyển giọng qua nốt chung nối hai hợp âm bằng một nốt', en: 'Common-tone modulation links two chords through one note' },
    { vi: 'Trung âm biến âm: nốt gốc cách quãng 3, cùng tính chất, chung một nốt', en: 'Chromatic mediants: roots a third apart, same quality, one common tone' },
    { vi: 'Chuyển giọng bằng mô tiến lặp một ý nhạc ở cao độ mới', en: 'Sequential modulation repeats an idea at a new pitch level' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chuyển giọng trực tiếp', en: 'Direct modulation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chuyển giọng trực tiếp** (direct modulation), còn gọi là chuyển giọng theo câu (phrase modulation), nhảy thẳng sang giọng mới. Không có hợp âm trụ, cũng không có V của giọng mới dẫn vào. Đổi tông trong nhạc pop chủ yếu là kiểu này.',
            en: '**Direct modulation**, also called phrase modulation, moves suddenly to a new key. There is no pivot chord, and no dominant prepares the new tonic. Most key changes in popular music are of this kind.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây câu thứ nhất dừng ở kết lửng của giọng {C} thứ, câu sau bắt đầu ngay bằng hợp âm chủ của giọng {Ab} trưởng.',
            en: 'Here the first phrase stops on a half cadence in {C} minor, and the next begins right on the tonic of {Ab} major.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          key: 'Cm',
          notes: 'C3+Eb4+G4+C5 F2+F4+Ab4+C5 G2+D4+G4+B4 || Ab2+Eb4+Ab4+C5 Eb3+Eb4+G4+Db5 Ab2+Eb4+Ab4+C5 ||',
          labels: ['i', 'iv', 'V', 'I', 'V7', 'I'],
        },
        { type: 'play', notes: 'C3+Eb4+G4+C5:h F2+F4+Ab4+C5:h G2+D4+G4+B4:w Ab2+Eb4+Ab4+C5:h Eb3+Eb4+G4+Db5:h Ab2+Eb4+Ab4+C5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Chuyển giọng trực tiếp khác chuyển giọng có hợp âm trụ ở điểm nào?', en: 'How does direct modulation differ from pivot-chord modulation?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Không có hợp âm chung nối hai giọng', en: 'No common chord links the two keys' }, correct: true },
          { text: { vi: 'Luôn đi đến một giọng gần', en: 'It always goes to a closely related key' } },
          { text: { vi: 'Luôn có V7 của giọng mới dẫn vào', en: 'The new key’s V7 always leads in' } },
        ],
      },
      reason: {
        vi: 'Chuyển giọng trực tiếp không nối hai giọng bằng hợp âm trụ hay nốt chung; nhạc chỉ việc bắt đầu ở giọng mới.',
        en: 'Direct modulation links the keys through no pivot chord or common tone; the music simply starts in the new key.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chuyển giọng qua nốt chung', en: 'Common-tone modulation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong **chuyển giọng qua nốt chung** (common-tone modulation), hai hợp âm của hai giọng được nối bằng một **nốt chung** (common tone) duy nhất.',
            en: 'In **common-tone modulation**, two chords in two keys are linked through a single **common tone**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây {A} là bản lề: hợp âm A là V của giọng {D} thứ, hợp âm F là I của giọng {F} trưởng. Nốt {A4} ngân suốt qua chỗ chuyển.',
            en: 'Here {A} is the hinge: the A chord is V in {D} minor, and the F chord is I in {F} major. The note {A4} holds through the change.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'D3+F4+A4+D5 A2+E4+A4+C#5 F2+F4+A4+C5', labels: ['i', 'V', 'I'] },
        { type: 'play', notes: 'D3+F4+A4+D5:h A2+E4+A4+C#5:w F2+F4+A4+C5:w' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Trung âm biến âm', en: 'Chromatic mediants' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai hợp âm ấy thường là **trung âm biến âm** (chromatic mediants): nốt gốc cách nhau một quãng 3, cùng tính chất (cùng trưởng hoặc cùng thứ), và chỉ chung một nốt.',
            en: 'Those two chords are usually **chromatic mediants**: chords with roots a third apart, the same quality (both major or both minor), and only one common tone.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Mỗi hợp âm trưởng hay thứ có bốn trung âm biến âm. Với C, đó là E, A, E♭ và A♭.',
            en: 'Every major or minor triad has four chromatic mediants. For C they are E, A, E♭ and A♭.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 E4+G#4+B4 A4+C#5+E5 Eb4+G4+Bb4 Ab4+C5+Eb5', labels: ['C', 'E', 'A', 'E♭', 'A♭'] },
        { type: 'play', notes: 'C4+E4+G4:h E4+G#4+B4:h C4+E4+G4:h A4+C#5+E5:h C4+E4+G4:h Eb4+G4+Bb4:h C4+E4+G4:h Ab4+C5+Eb5:h', label: { vi: 'Nghe C với từng hợp âm', en: 'Hear C with each one' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào là trung âm biến âm của C?', en: 'Which chord is a chromatic mediant of C?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Em', en: 'Em' } },
          { text: { vi: 'E', en: 'E' }, correct: true },
          { text: { vi: 'F', en: 'F' } },
          { text: { vi: 'Am', en: 'Am' } },
        ],
      },
      reason: {
        vi: 'E có nốt gốc cách {C} một quãng 3, cùng là hợp âm trưởng, và chỉ chung nốt {E}; Em và Am chung hai nốt với C.',
        en: 'E has its root a third from {C}, is also major, and shares only {E}; Em and Am share two notes with C.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Chuyển giọng bằng mô tiến', en: 'Sequential modulation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong **chuyển giọng bằng mô tiến** (sequential modulation), một ý nhạc cùng hòa âm của nó được lặp lại ở cao độ mới để dẫn sang giọng mới.',
            en: 'In **sequential modulation**, a melody and its harmonies are repeated at a new pitch level to lead to a new key.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây cặp V7–I ở giọng {C} được lặp lên từng bậc: ở giọng {D}, rồi giọng {E} thứ. Hợp âm F♯° sau đó có chức năng át ở giọng {G} trưởng.',
            en: 'Here a V7–I pair in {C} is repeated a step higher each time: in {D}, then in {E} minor. The F♯° chord that follows has dominant function in {G} major.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'G2+F4+G4+B4 C3+E4+G4+C5 A2+G4+A4+C#5 D3+F#4+A4+D5 B2+A4+B4+D#5 E3+G4+B4+E5 F#2+F#4+A4+C5 G2+G4+B4+D5',
          labels: ['G7', 'C', 'A7', 'D', 'B7', 'Em', 'F♯°', 'G'],
        },
        { type: 'play', notes: 'G2+F4+G4+B4:q C3+E4+G4+C5:h A2+G4+A4+C#5:q D3+F#4+A4+D5:h B2+A4+B4+D#5:q E3+G4+B4+E5:h F#2+F#4+A4+C5:h G2+G4+B4+D5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Cặp V7–I ở giọng {C} được lặp lên một nguyên cung. Lần lặp ở giọng nào?', en: 'A V7–I pair in {C} is repeated a whole step higher. What key is the repetition in?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+F4+G4+B4 C3+E4+G4+C5 A2+G4+A4+C#5 D3+F#4+A4+D5' },
        { type: 'play', notes: 'G2+F4+G4+B4:q C3+E4+G4+C5:h A2+G4+A4+C#5:q D3+F#4+A4+D5:w' },
      ],
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'A7–D là V7–I của giọng {D}, cao hơn {C} một nguyên cung.',
        en: 'A7–D is V7–I in {D}, a whole step above {C}.',
      },
    },
  ],
} satisfies Lesson
