import type { Lesson } from '@/theory/types'

/**
 * Book 28.3, second half: a step up (appoggiatura, chromatic passing tone,
 * anticipation; retardation, rarely), a leap of a third (passing tone or
 * appoggiatura), leaps of a fourth or more left alone, and non-chord tones in
 * several voices (consonant on the same beat, or staggered). Our own
 * I–vi–IV–V–I in place of the book's framework and solution figures.
 */
export default {
  id: 'step-up-leaps',
  title: { vi: 'Đi lên liền bậc và nhảy quãng', en: 'Steps up and leaps' },
  minutes: 5,
  sources: [{ section: '28.3', url: 'https://musictheory.pugetsound.edu/mt21c/AddingsNCTs.html' }],
  recap: [
    { vi: 'Đi lên liền bậc: nốt dựa, nốt lướt biến âm, nốt đón trước', en: 'Step up: appoggiatura, chromatic passing tone, anticipation' },
    { vi: 'Nhảy quãng 3: nốt lướt hoặc nốt dựa', en: 'Leap of a third: passing tone or appoggiatura' },
    { vi: 'Nhảy từ quãng 4 trở lên: tạm để nguyên', en: 'Leaps of a fourth or more: leave them alone for now' },
    { vi: 'Nhiều bè cùng một phách: tạo quãng thuận, hoặc đi so le', en: 'Several voices on one beat: make consonances, or stagger them' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đi lên liền bậc: nốt dựa', en: 'Step up: the appoggiatura' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi một bè đi lên liền bậc, có thể nhảy vượt nốt đích một bậc, đặt **nốt dựa** (appoggiatura) đúng phách, rồi mới đi xuống nốt đích sau phách. Ở đây bè soprano đi {B4}–{C5}, có nốt dựa {D5}.',
            en: 'When a voice steps up, you can leap one step past the goal, put an **appoggiatura** on the beat, and move the goal note after the beat. Here the soprano goes {B4}–{C5}, with the appoggiatura {D5}.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'G2+G3+D4+B4:q C3+G3+E4+D5:8 C3+G3+E4+C5:8 ||', labels: ['V', 'App', ''], highlight: [1] },
        { type: 'play', notes: 'G2+G3+D4+B4:q C3+G3+E4+C5:h', label: { vi: 'Nghe bản gốc', en: 'Hear the original' } },
        { type: 'play', notes: 'G2+G3+D4+B4:q C3+G3+E4+D5:8 C3+G3+E4+C5:q.', label: { vi: 'Nghe nốt dựa', en: 'Hear the appoggiatura' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bè alto đi lên {D4}–{E4} từ V sang I. Nốt dựa trên phách của I là nốt nào?',
        en: 'The alto steps up {D4}–{E4} from V to I. Which appoggiatura goes on the beat of I?',
      },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Nốt dựa vượt nốt đích {E4} một bậc, tức {F4}, rồi đi xuống {E4} sau phách.',
        en: 'The appoggiatura goes one step past the goal {E4}, to {F4}, then steps down to {E4} after the beat.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thêm cách cho bước đi lên', en: 'More ways to step up' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bước đi lên cũng nhận nốt lướt biến âm, như bè alto {D4}–{D#4}–{E4}, và nốt đón trước, như {C5} của bè soprano vang sớm trên V.',
            en: 'A step up also takes a chromatic passing tone, as in the alto’s {D4}–{D#4}–{E4}, and an anticipation, as in the soprano’s {C5} arriving early over V.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Nốt chậm** (retardation) giữ nốt cũ rồi mới đi lên, nhưng rất ít dùng.',
            en: 'A **retardation** holds the old note and then steps up, but it is rarely used.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'G2+G3+D4+B4:8 G2+G3+D#4+B4:8 C3+G3+E4+C5:q || G2+G3+D4+B4:8 G2+G3+D4+C5:8 C3+G3+E4+C5:q || G2+G3+D4+B4:q C3+G3+E4+B4:8 C3+G3+E4+C5:8 ||',
          labels: ['V', 'P', 'I', 'V', 'Ant', 'I', 'V', 'Ret', ''],
          highlight: [1, 4, 7],
        },
        { type: 'play', notes: 'G2+G3+D4+B4:8 G2+G3+D#4+B4:8 C3+G3+E4+C5:h', label: { vi: 'Nghe nốt lướt biến âm', en: 'Hear the chromatic passing tone' } },
        { type: 'play', notes: 'G2+G3+D4+B4:8 G2+G3+D4+C5:8 C3+G3+E4+C5:h', label: { vi: 'Nghe nốt đón trước', en: 'Hear the anticipation' } },
        { type: 'play', notes: 'G2+G3+D4+B4:q C3+G3+E4+B4:8 C3+G3+E4+C5:q.', label: { vi: 'Nghe nốt chậm', en: 'Hear the retardation' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nhảy quãng 3 và nhảy xa hơn', en: 'Leaps of a third and larger' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bè nhảy quãng 3 thì lấp khoảng giữa bằng nốt lướt, hoặc nhảy vượt một bậc tới nốt dựa. Ở đây bè bass đi {C3}–{A2}–{F2}, mỗi quãng 3 có một nốt lướt.',
            en: 'A leap of a third can be filled with a passing tone, or decorated with an appoggiatura one step past the goal. Here the bass goes {C3}–{A2}–{F2}, with a passing tone in each third.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Bè nhảy từ quãng 4 trở lên thì tạm thời để nguyên, như bass {G2}–{C3} ở cuối.',
            en: 'Leave leaps of a fourth or more alone for now, like the bass {G2}–{C3} at the end.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+G3+E4+C5:8 B2+G3+E4+C5:8 A2+A3+E4+C5:8 G2+A3+E4+C5:8 F2+A3+F4+C5:q G2+G3+D4+B4:q | C3+G3+E4+C5:w ||',
          labels: ['I', 'P', 'vi', 'P', 'IV', 'V', 'I'],
          highlight: [1, 3],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:q A2+A3+E4+C5:q F2+A3+F4+C5:q G2+G3+D4+B4:q C3+G3+E4+C5:w', label: { vi: 'Nghe bản gốc', en: 'Hear the original' } },
        { type: 'play', notes: 'C3+G3+E4+C5:8 B2+G3+E4+C5:8 A2+A3+E4+C5:8 G2+A3+E4+C5:8 F2+A3+F4+C5:q G2+G3+D4+B4:q C3+G3+E4+C5:w', label: { vi: 'Nghe nốt lướt', en: 'Hear the passing tones' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bè soprano nhảy lên quãng 3, từ {C5} đến {E5}. Muốn thêm nốt dựa, nốt đó là nốt nào?',
        en: 'The soprano leaps up a third, from {C5} to {E5}. To add an appoggiatura, which note is it?',
      },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Nốt dựa vượt nốt đích {E5} một bậc, tức {F5}, đặt trên phách, rồi đi xuống {E5}.',
        en: 'The appoggiatura goes one step past the goal {E5}, to {F5}, on the beat, then steps down to {E5}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thêm vào nhiều bè', en: 'Adding to several voices' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi nhiều bè có nốt ngoài hợp âm trên cùng một phách, chúng nên tạo **quãng thuận** (consonant intervals): quãng 3, 5, 6 hoặc 8. Nếu không được, hãy cho các bè đi **so le** (staggered): bè này đi trước, bè kia đi sau.',
            en: 'When non-chord tones in different voices fall on the same beat, they should make **consonant intervals**: thirds, fifths, sixths or octaves. If they can’t, **stagger** the voices rhythmically: one moves first, the other later.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây bass có nốt lướt ở phách 1 và 2, còn soprano có nốt treo 4–3 ở phách 4.',
            en: 'Here the bass has passing tones on beats 1 and 2, and the soprano a 4–3 suspension on beat 4.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+G3+E4+C5:8 B2+G3+E4+C5:8 A2+A3+E4+C5:8 G2+A3+E4+C5:8 F2+A3+F4+C5:q G2+G3+D4+C5:8 G2+G3+D4+B4:8 | C3+G3+E4+C5:w ||',
          labels: ['', 'P', '', 'P', '', 'Sus\n4', '\n3', ''],
          highlight: [1, 3, 5],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:8 B2+G3+E4+C5:8 A2+A3+E4+C5:8 G2+A3+E4+C5:8 F2+A3+F4+C5:q G2+G3+D4+C5:8 G2+G3+D4+B4:8 C3+G3+E4+C5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Hai nốt ngoài hợp âm ở hai bè, cùng một phách, cách nhau quãng 2. Nên làm gì?',
        en: 'Non-chord tones in two voices on the same beat are a second apart. What should you do?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cho hai bè đi so le', en: 'Stagger the two voices' }, correct: true },
          { text: { vi: 'Giữ nguyên cả hai', en: 'Keep both as they are' } },
          { text: { vi: 'Thêm nốt ngoài hợp âm vào bè thứ ba', en: 'Add a non-chord tone to a third voice' } },
        ],
      },
      reason: {
        vi: 'Quãng 2 không phải quãng thuận, nên cho một bè đi trước, bè kia đi sau.',
        en: 'A second is not consonant, so let one voice move first and the other later.',
      },
    },
  ],
} satisfies Lesson
