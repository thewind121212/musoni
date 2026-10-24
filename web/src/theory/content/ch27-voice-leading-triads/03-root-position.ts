import type { Lesson } from '@/theory/types'

/**
 * Book 26.7: double the root of a root-position triad, then voice-lead by the
 * bass interval: a 3rd or 6th, a 4th or 5th, a 2nd (with the deceptive
 * progression), a repeated bass.
 */
export default {
  id: 'root-position',
  title: { vi: 'Nối hợp âm ba thế gốc', en: 'Root-position triads in four parts' },
  minutes: 5,
  sources: [{ section: '26.7', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingFourPartsRootPosition.html' }],
  recap: [
    { vi: 'Hợp âm thế gốc: luôn nhân đôi nốt gốc', en: 'Root position: always double the root' },
    { vi: 'Bass đi quãng 3 hoặc 6: giữ hai nốt chung, bè còn lại đi liền bậc', en: 'Bass by a 3rd or 6th: keep two common tones, move the other voice by step' },
    { vi: 'Bass đi quãng 4 hoặc 5: giữ nốt chung, hoặc ba bè trên cùng chiều', en: 'Bass by a 4th or 5th: keep the common tone, or move the upper voices the same way' },
    { vi: 'Bass đi quãng 2: ba bè trên ngược chiều bass, trừ V–vi', en: 'Bass by a 2nd: upper voices in contrary motion to the bass, except V–vi' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nhân đôi nốt gốc', en: 'Double the root' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm ba có ba nốt mà ta viết bốn bè, nên một nốt được **nhân đôi** (doubling). Với hợp âm ba thế gốc, luôn nhân đôi nốt gốc, tức nốt bass.',
            en: 'A triad has three notes but we write four parts, so one note is **doubled**. In a root-position triad, always double the root, which is the bass note.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Để nối sang hợp âm kế tiếp, hãy xem bass đi một quãng mấy.',
            en: 'To move to the next chord, look at the interval the bass moves by.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+G3+E4+C5 G2+G3+D4+B4', labels: ['I', 'V'] },
        { type: 'play', notes: 'C3+G3+E4+C5:h G2+G3+D4+B4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, hợp âm IV thế gốc nhân đôi nốt nào?', en: 'In {C} major, which note does a root-position IV chord double?' },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'IV là {F}–{A}–{C}; ở thế gốc ta nhân đôi nốt gốc {F}, cũng là nốt bass.',
        en: 'IV is {F}–{A}–{C}; in root position we double the root, {F}, which is also the bass.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bass đi quãng 3 hoặc 6', en: 'Bass by a 3rd or 6th' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai hợp âm có gốc cách nhau quãng 3 có chung hai nốt. Ở ba bè trên, giữ nguyên hai **nốt chung** (common tones) và cho bè còn lại đi liền bậc. Ở I–vi, soprano giữ {C}, alto giữ {E}, tenor đi {G}–{A}.',
            en: 'Chords whose roots are a 3rd apart share two notes. In the upper three parts, keep the two **common tones** and move the other voice by step. In I–vi, the soprano keeps {C}, the alto {E}, and the tenor moves {G}–{A}.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+G3+E4+C5 A2+A3+E4+C5', labels: ['I', 'vi'] },
        { type: 'play', notes: 'C3+G3+E4+C5:h A2+A3+E4+C5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Khi bass lặp lại một nốt, ba bè trên giữ nguyên hoặc chuyển sang nốt khác của hợp âm, vẫn nhân đôi nốt gốc.',
            en: 'When the bass repeats a note, the upper voices repeat or move to other chord members, still doubling the root.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Bass đi quãng 4 hoặc 5', en: 'Bass by a 4th or 5th' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Có hai cách. Cách 1 (I–IV): giữ nốt chung, hai bè kia đi liền bậc.',
            en: 'There are two ways. Way 1 (I–IV): keep the common tone and move the other two voices by step.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cách 2 (V–I): cả ba bè trên đi cùng một hướng, mỗi bè đi quãng 2 hoặc quãng 3 đến nốt gần nhất của hợp âm sau.',
            en: 'Way 2 (V–I): all three upper voices move the same direction, each by a 2nd or 3rd to the nearest member of the next chord.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+G3+E4+C5 F2+A3+F4+C5 || G2+D4@b+G4+B4 C3+C4@b+E4+G4 ||',
          labels: ['I', 'IV', 'V', 'I'],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:h F2+A3+F4+C5:h G2+D4+G4+B4:h C3+C4+E4+G4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, cách nối I–IV nào đúng?', en: 'In {G} major, which I–IV is voiced correctly?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          key: 'G',
          notes: 'G2+B3+D4+G4 C3+C4@b+E4+G4 || G2+D3+B3@t+G4 C3+G3+E4+C5 ||',
          labels: ['1', '', '2', ''],
        },
        { type: 'play', notes: 'G2+B3+D4+G4:h C3+C4+E4+G4:h G2+D3+B3+G4:h C3+G3+E4+C5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cách 1', en: 'Number 1' }, correct: true },
          { text: { vi: 'Cách 2', en: 'Number 2' } },
        ],
      },
      reason: {
        vi: 'Cách 1 giữ nốt chung {G} ở soprano; ở cách 2, mọi bè cùng đi lên quãng 4, tạo quãng 5 và quãng 8 song song với bass.',
        en: 'Number 1 keeps the common tone {G} in the soprano; in number 2 every voice moves up a 4th, making parallel fifths and octaves with the bass.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bass đi quãng 2', en: 'Bass by a 2nd' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi bass đi quãng 2, ba bè trên đi ngược chiều với bass (IV–V).',
            en: 'When the bass moves by a 2nd, the three upper parts move in contrary motion to the bass (IV–V).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ngoại lệ là V–vi: nốt ba của V đi lên liền bậc, nốt năm và nốt gốc nhân đôi đi ngược chiều bass, nên vi nhân đôi nốt ba. Ở giọng thứ (V–VI) luôn làm vậy; ở giọng trưởng, khi bậc 7 nằm ở soprano.',
            en: 'The exception is V–vi: the 3rd of V moves up by step, while the 5th and doubled root move against the bass, so vi doubles its 3rd. Always do this in minor (V–VI); in major, when 7 is in the soprano.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'F2+A3+F4+C5 G2+G3+D4+B4 A2+E3+C4+C5', labels: ['IV', 'V', 'vi'] },
        { type: 'play', notes: 'F2+A3+F4+C5:h G2+G3+D4+B4:h A2+E3+C4+C5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} trưởng, cách nối IV–V nào đúng?', en: 'In {D} major, which IV–V is voiced correctly?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          key: 'D',
          notes: 'G2+D3+B3@t+G4 A2+E3+C#4+A4 || G2+B3+G4+D5 A2+A3+E4+C#5 ||',
          labels: ['1', '', '2', ''],
        },
        { type: 'play', notes: 'G2+D3+B3+G4:h A2+E3+C#4+A4:h G2+B3+G4+D5:h A2+A3+E4+C#5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cách 1', en: 'Number 1' } },
          { text: { vi: 'Cách 2', en: 'Number 2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ở cách 2, ba bè trên đi xuống khi bass đi lên; ở cách 1, mọi bè cùng đi lên với bass, tạo quãng 5 và quãng 8 song song.',
        en: 'In number 2 the upper voices move down as the bass moves up; in number 1 every voice moves up with the bass, making parallel fifths and octaves.',
      },
    },
  ],
} satisfies Lesson
