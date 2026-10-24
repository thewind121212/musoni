import type { Lesson } from '@/theory/types'

/*
 * Book 35.2: phase shifting from tape loops to live voices, rotation, one
 * voice out of phase, and the gradual and sudden ways to shift. Our own
 * five-note pattern {E4} {G4} {D5} {B4} {A4}; two staff rows are the two
 * voices, and the play blocks sound them together as two-note chords.
 */
const ROT1 = 'E4+G4:8 G4+D5:8 D5+B4:8 B4+A4:8 A4+E4:8'

export default {
  id: 'phase-shifting',
  title: { vi: 'Dịch pha', en: 'Phase shifting' },
  minutes: 5,
  sources: [{ section: '35.2', url: 'https://musictheory.pugetsound.edu/mt21c/PhaseShifting.html' }],
  recap: [
    { vi: 'Dịch pha bắt đầu từ hai vòng băng dài khác nhau', en: 'Phase shifting began with two tape loops of different lengths' },
    { vi: 'Bè trên giữ mẫu, bè dưới xoay sang trái từng nốt', en: 'The upper voice keeps the pattern; the lower rotates one note left at a time' },
    { vi: 'Mẫu năm nốt cần năm lần xoay để đồng pha lại', en: 'A five-note pattern needs five rotations to be in phase again' },
    { vi: 'Dịch dần bằng cách tăng tốc, hoặc đổi ngay ở phách đầu', en: 'Shift gradually by speeding up, or suddenly on the downbeat' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Dịch pha', en: 'Phase shifting' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dịch pha** (phase shifting) bắt đầu từ băng thu âm. Steve Reich cho hai vòng băng dài hơi khác nhau phát cùng một đoạn: chúng trôi dần **lệch pha** (out of phase), rồi rất chậm khớp lại.',
            en: '**Phase shifting** began with tape. Steve Reich played the same idea on two tape loops of slightly different lengths: they slowly drifted **out of phase**, then very gradually came back together.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Sau đó Reich đưa quá trình này vào nhạc chơi trực tiếp. Hai **bè** (voices) chơi cùng một mẫu; khi khớp nhau từng nốt, hai bè **đồng pha** (in phase).',
            en: 'Reich then brought the process to live performance. Two **voices** play the same pattern; when they match note for note, they are **in phase**.',
          },
        },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'E4:8 G4:8 D5:8 B4:8 A4:8', labels: ['1', '2', '3', '4', '5'] },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'E4:8 G4:8 D5:8 B4:8 A4:8', labels: ['1', '2', '3', '4', '5'] },
        {
          type: 'play',
          notes: 'E4:8 G4:8 D5:8 B4:8 A4:8 E4:8 G4:8 D5:8 B4:8 A4:8 E4:8 G4:8 D5:8 B4:8 A4:8',
          label: { vi: 'Nghe hai bè đồng pha', en: 'Hear the voices in phase' },
          bpm: 150,
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Xoay vòng', en: 'Rotation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi lệch pha, bè dưới đi qua **xoay vòng** (rotation): mẫu dời sang trái một nốt. Nốt 2 lên đầu, nốt 1 xuống cuối; lần sau nốt 3 lên đầu, cứ thế.',
            en: 'As the voices go out of phase, the lower one goes through **rotation**: the pattern moves one note to the left. Note 2 comes first and note 1 goes to the end; next time note 3 comes first, and so on.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'E4:8 G4:8 D5:8 B4:8 A4:8 | G4:8 D5:8 B4:8 A4:8 E4:8 | D5:8 B4:8 A4:8 E4:8 G4:8 ||',
          labels: ['1', '2', '3', '4', '5', '2', '3', '4', '5', '1', '3', '4', '5', '1', '2'],
        },
        {
          type: 'play',
          notes: 'E4:8 G4:8 D5:8 B4:8 A4:8 G4:8 D5:8 B4:8 A4:8 E4:8 D5:8 B4:8 A4:8 E4:8 G4:8',
          label: { vi: 'Nghe hai lần xoay', en: 'Hear two rotations' },
          bpm: 150,
        },
        {
          type: 'tip',
          text: {
            vi: 'Sau năm lần xoay, mẫu năm nốt trở lại như cũ, và hai bè lại đồng pha.',
            en: 'After five rotations, a five-note pattern is back where it began, and the voices are in phase again.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Xoay mẫu này sang trái hai nốt. Nốt nào đứng đầu?', en: 'Rotate this pattern two notes to the left. Which note comes first?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4:8 F4:8 A4:8 C5:8 E5:8', labels: ['1', '2', '3', '4', '5'] }],
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Xoay hai nốt thì nốt 3, {A4}, lên đầu.',
        en: 'Two rotations put note 3, {A4}, first.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hai bè lệch pha', en: 'Voices out of phase' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bè trên giữ nguyên mẫu gốc. Bè dưới chơi mẫu đã xoay một nốt, nên mỗi nốt ở bè trên giờ vang cùng một nốt khác ở bè dưới.',
            en: 'The upper voice keeps the original pattern. The lower voice plays it rotated one note, so each note above now sounds with a different note below.',
          },
        },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'E4:8 G4:8 D5:8 B4:8 A4:8', labels: ['1', '2', '3', '4', '5'] },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'G4:8 D5:8 B4:8 A4:8 E4:8', labels: ['2', '3', '4', '5', '1'], highlight: [0, 1, 2, 3, 4] },
        {
          type: 'play',
          notes: `${ROT1} ${ROT1} ${ROT1}`,
          label: { vi: 'Nghe hai bè lệch một nốt', en: 'Hear the voices one note apart' },
          bpm: 150,
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Với mẫu sáu nốt này, bè dưới phải xoay bao nhiêu lần thì hai bè lại đồng pha?',
        en: 'With this six-note pattern, how many rotations does the lower voice need to be in phase again?',
      },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4:8 D4:8 E4:8 G4:8 A4:8 C5:8', labels: ['1', '2', '3', '4', '5', '6'] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '5 lần', en: '5' } },
          { text: { vi: '6 lần', en: '6' }, correct: true },
          { text: { vi: '12 lần', en: '12' } },
        ],
      },
      reason: {
        vi: 'Mỗi lần xoay dời một nốt, nên sau sáu lần mẫu sáu nốt về lại như cũ.',
        en: 'Each rotation moves one note, so after six a six-note pattern is back where it began.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dịch dần hay đổi ngay', en: 'Gradual or sudden' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Có hai cách dịch pha. Bè dưới có thể chơi nhanh hơn một chút để trượt dần khỏi bè trên, như vòng băng. Hoặc nó đổi sang lần xoay tiếp theo ngay phách đầu ô nhịp, không tăng tốc.',
            en: 'There are two ways to shift phase. The lower voice can play a little faster and slide slowly away from the upper one, as the tape loops did. Or it can switch to the next rotation right on the downbeat of a measure, with no speeding up.',
          },
        },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'E4:8 G4:8 D5:8 B4:8 A4:8 | E4:8 G4:8 D5:8 B4:8 A4:8 ||' },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'E4:8 G4:8 D5:8 B4:8 A4:8 | G4:8 D5:8 B4:8 A4:8 E4:8 ||', highlight: [5, 6, 7, 8, 9] },
        {
          type: 'play',
          notes: `E4:8 G4:8 D5:8 B4:8 A4:8 E4:8 G4:8 D5:8 B4:8 A4:8 ${ROT1} ${ROT1}`,
          label: { vi: 'Nghe cách đổi ngay', en: 'Hear the sudden switch' },
          bpm: 150,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong cách đổi ngay, bè dưới sang lần xoay mới khi nào?', en: 'In the sudden way, when does the lower voice move to the next rotation?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khi nó chơi nhanh dần', en: 'As it gradually speeds up' } },
          { text: { vi: 'Ngay phách đầu của một ô nhịp', en: 'Right on the downbeat of a measure' }, correct: true },
          { text: { vi: 'Khi bè trên dừng lại', en: 'When the upper voice stops' } },
        ],
      },
      reason: {
        vi: 'Cách đổi ngay không tăng tốc: bè dưới nhảy sang lần xoay tiếp theo ở phách đầu ô nhịp.',
        en: 'The sudden way does not speed up: the lower voice jumps to the next rotation on a downbeat.',
      },
    },
  ],
} satisfies Lesson
