import type { Lesson } from '@/theory/types'

/** Book 34.1: the twelve-tone row, its rules, and the four row forms P, R, I, RI. Our own row. */
export default {
  id: 'twelve-tone-rows',
  title: { vi: 'Chuỗi mười hai âm', en: 'Twelve-tone rows' },
  minutes: 5,
  sources: [{ section: '34.1', url: 'https://musictheory.pugetsound.edu/mt21c/TwelveToneTechnique.html' }],
  recap: [
    { vi: 'Chuỗi xếp cả 12 nốt theo một thứ tự cố định', en: 'A row puts all twelve notes in a fixed order' },
    { vi: 'Không nốt nào lặp lại trước khi đủ 12 nốt', en: 'No note returns before all twelve have sounded' },
    { vi: 'P là dạng gốc, R là dạng gốc đọc ngược', en: 'P is the prime, R the prime backward' },
    { vi: 'I đổi hướng mọi quãng, RI là I đọc ngược', en: 'I flips every interval, RI is I backward' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Chuỗi mười hai âm', en: 'The twelve-tone row' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Kỹ thuật mười hai âm** (twelve-tone technique) xếp cả 12 nốt, mọi phím trắng và đen trong một quãng tám, theo một thứ tự cố định gọi là **chuỗi** (row). Mọi nốt trong bài đều thuộc chuỗi này hoặc một dạng của nó, nên cả bài gắn kết với nhau.',
            en: '**Twelve-tone technique** puts all twelve notes of the chromatic scale in a fixed order, called a **row** (or series). Every note in the piece belongs to the row or one of its forms, which unifies the whole piece.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chuỗi phải có đủ 12 nốt, và không nốt nào lặp lại trước khi 11 nốt kia đã vang lên (trừ khi nhắc ngay nốt đó, láy hay vê). Thứ tự các nốt luôn giữ nguyên.',
            en: 'A row must use all twelve notes, and no note returns before the other eleven have sounded (except a direct repeat, a trill or a tremolo). The order of the notes stays fixed.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 E4 D4 F#4 Eb4 Ab4 An4 B4 Fn4 G4 Bb4 C#5' },
        { type: 'play', notes: 'C4 E4 D4 F#4 Eb4 Ab4 A4 B4 F4 G4 Bb4 C#5', label: { vi: 'Nghe chuỗi của chương này', en: 'Hear this chapter’s row' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Dãy nốt này có phải là một chuỗi mười hai âm không?', en: 'Is this a twelve-tone row?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 E4 D4 F#4 Eb4 Ab4 En4 B4 Fn4 G4 Bb4 C#5' },
        { type: 'play', notes: 'C4 E4 D4 F#4 Eb4 Ab4 E4 B4 F4 G4 Bb4 C#5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có, nó có 12 nốt', en: 'Yes, it has twelve notes' } },
          { text: { vi: 'Không: {E} lặp lại và thiếu {A}', en: 'No: {E} repeats and {A} is missing' }, correct: true },
          { text: { vi: 'Không: chuỗi không được bắt đầu bằng {C}', en: 'No: a row cannot start on {C}' } },
        ],
      },
      reason: {
        vi: '{E} vang lên lần thứ hai trước khi đủ 12 nốt, và {A} không hề có mặt.',
        en: '{E} sounds a second time before all twelve have occurred, and {A} never appears.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dạng gốc và dạng nghịch hành', en: 'Prime and retrograde' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một chuỗi có bốn **dạng chuỗi** (row form). **Dạng gốc** (prime, P) là chuỗi ban đầu. **Dạng nghịch hành** (retrograde, R) là dạng gốc đọc ngược, từ nốt cuối về nốt đầu.',
            en: 'A row has four **row forms**. The **prime** (P) is the original row. The **retrograde** (R) is the prime backward, from its last note to its first.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C#5 Bb4 G4 F4 Bn4 A4 Ab4 Eb4 F#4 D4 En4 Cn4' },
        { type: 'play', notes: 'C#5 Bb4 G4 F4 B4 A4 Ab4 Eb4 F#4 D4 E4 C4', label: { vi: 'Nghe dạng nghịch hành', en: 'Hear the retrograde' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là dạng gốc. Dạng nghịch hành của nó kết thúc bằng nốt nào?', en: 'This is the prime. Which note does its retrograde end on?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 E4 D4 F#4 Eb4 Ab4 An4 B4 Fn4 G4 Bb4 C#5' },
        { type: 'play', notes: 'C4 E4 D4 F#4 Eb4 Ab4 A4 B4 F4 G4 Bb4 C#5' },
      ],
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Đọc ngược thì nốt đầu của dạng gốc, {C}, thành nốt cuối.',
        en: 'Read backward, the prime’s first note, {C}, becomes the last.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Dạng đảo và dạng đảo nghịch hành', en: 'Inversion and retrograde inversion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dạng đảo** (inversion, I) đổi hướng mọi quãng của dạng gốc: dạng gốc đi lên quãng 3 trưởng thì dạng đảo đi xuống quãng 3 trưởng. Mỗi quãng giữ số nửa cung, chỉ đổi hướng.',
            en: 'The **inversion** (I) turns every interval of the prime the other way: where the prime goes up a major 3rd, the inversion goes down a major 3rd. Each interval keeps its number of half steps; only its direction changes.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C5 Ab4 Bb4 F#4 An4 E4 Eb4 C#4 G4 Fn4 D4 Bn3' },
        { type: 'play', notes: 'C5 Ab4 Bb4 F#4 A4 E4 Eb4 C#4 G4 F4 D4 B3', label: { vi: 'Nghe dạng đảo', en: 'Hear the inversion' } },
        {
          type: 'text',
          text: {
            vi: '**Dạng đảo nghịch hành** (retrograde inversion, RI) là dạng đảo đọc ngược. Tên gọi dễ gây nhầm: đây là dạng đảo đem đọc ngược, không phải dạng nghịch hành đem đảo.',
            en: 'The **retrograde inversion** (RI) is the inversion backward. The name can mislead: it is the inversion played backward, not the retrograde inverted.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B3 D4 F4 G4 C#4 Eb4 En4 A4 F#4 Bb4 Ab4 Cn5' },
        { type: 'play', notes: 'B3 D4 F4 G4 C#4 Eb4 E4 A4 F#4 Bb4 Ab4 C5', label: { vi: 'Nghe dạng đảo nghịch hành', en: 'Hear the retrograde inversion' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Dạng gốc đi từ {C4} lên {E4}. Dạng đảo bắt đầu từ {C5}: nốt thứ hai của nó là nốt nào?',
        en: 'The prime goes from {C4} up to {E4}. The inversion starts on {C5}: what is its second note?',
      },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 E4' },
        { type: 'play', notes: 'C4 E4' },
      ],
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Đi lên quãng 3 trưởng thành đi xuống quãng 3 trưởng: từ {C5} xuống {Ab4}.',
        en: 'Up a major 3rd becomes down a major 3rd: from {C5} down to {Ab4}.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Dạng đảo bắt đầu bằng {C5} và kết thúc bằng {B3}. Dạng đảo nghịch hành bắt đầu bằng nốt nào?',
        en: 'The inversion starts on {C5} and ends on {B3}. Which note does the retrograde inversion start on?',
      },
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Dạng đảo nghịch hành là dạng đảo đọc ngược, nên mở đầu bằng nốt cuối của dạng đảo, {B}.',
        en: 'The retrograde inversion is the inversion backward, so it opens on the inversion’s last note, {B}.',
      },
    },
  ],
} satisfies Lesson
