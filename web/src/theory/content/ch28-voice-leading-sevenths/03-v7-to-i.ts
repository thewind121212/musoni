import type { Lesson } from '@/theory/types'

/**
 * Book 27.3: V7–I in four parts, strict resolution (complete V7 to incomplete
 * I, or incomplete V7 to complete I) and free resolution (the leading tone
 * falls to 5 when not in the soprano); the piano exception; and 27.3.1, I6/4
 * to V7.
 */
export default {
  id: 'v7-to-i',
  title: { vi: 'Từ V7 đến I', en: 'From V7 to I' },
  minutes: 5,
  sources: [{ section: '27.3', url: 'https://musictheory.pugetsound.edu/mt21c/V7toIVoiceLeading.html' }],
  recap: [
    { vi: 'Giải quyết chặt: V7 đầy đủ đến I thiếu, hoặc V7 thiếu đến I đầy đủ', en: 'Strict: complete V7 to incomplete I, or incomplete V7 to complete I' },
    { vi: 'Giải quyết tự do: cảm âm không ở soprano được xuống bậc 5', en: 'Free: a leading tone not in the soprano may fall to 5' },
    { vi: 'I6/4–V7: nếu nốt năm ở trên nốt gốc, cho các bè trên đi lên', en: 'I6/4–V7: if the fifth is above the root, move the upper voices up' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Giải quyết chặt (1)', en: 'Strict resolution (1)' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Từ V7 đến I ở bốn bè, bạn chọn một trong vài cách. **Giải quyết chặt** (strict resolution): cảm âm (bậc 7) đi lên, bậc 4 và bậc 2 đi xuống.',
            en: 'From V7 to I in four parts, you choose one of a few methods. **Strict resolution**: the leading tone (scale degree 7) goes up, and 4 and 2 go down.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nếu V7 đầy đủ, hợp âm I sẽ thiếu: ba nốt gốc và một nốt ba, không có nốt năm.',
            en: 'From a complete V7, the I chord comes out incomplete: a tripled root and one third, no fifth.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+B3+F4+D5:h C3+C4@b+E4+C5:h ||', labels: ['V7', 'I'] },
        { type: 'play', notes: 'G2+B3+F4+D5:h C3+C4+E4+C5:w', label: { vi: 'Nghe V7 đầy đủ đến I thiếu', en: 'Hear complete V7 to incomplete I' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Giải quyết chặt (2)', en: 'Strict resolution (2)' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cách thứ hai: V7 thiếu nốt năm (nhân đôi nốt gốc) đi đến I đầy đủ. Cảm âm vẫn đi lên, nốt bảy vẫn đi xuống, còn nốt gốc {G} được giữ ở bè tenor.',
            en: 'The second method: an incomplete V7 (no fifth, doubled root) goes to a complete I. The leading tone still rises and the seventh still falls, while the tenor holds the root, {G}.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+G3+F4+B4:h C3+G3+E4+C5:h ||', labels: ['V7', 'I'] },
        { type: 'play', notes: 'G2+G3+F4+B4:h C3+G3+E4+C5:w', label: { vi: 'Nghe V7 thiếu đến I đầy đủ', en: 'Hear incomplete V7 to complete I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Giải quyết chặt từ V7 đầy đủ cho hợp âm I như thế nào?', en: 'Strictly resolved from a complete V7, what is the I chord like?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Thiếu nốt năm: ba nốt gốc, một nốt ba', en: 'No fifth: a tripled root and one third' }, correct: true },
          { text: { vi: 'Đầy đủ, nhân đôi nốt gốc', en: 'Complete, with a doubled root' } },
          { text: { vi: 'Thiếu nốt ba, nhân đôi nốt năm', en: 'No third, with a doubled fifth' } },
        ],
      },
      reason: {
        vi: 'Bậc 7 lên bậc 1, bậc 2 xuống bậc 1, cộng với bass, nên có ba nốt gốc; bậc 4 xuống bậc 3 cho nốt ba.',
        en: '7 rises to 1 and 2 falls to 1, with the bass that makes three roots; 4 falls to 3 for the third.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giải quyết tự do', en: 'Free resolution' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Giải quyết tự do** (free resolution): nếu cảm âm không ở bè soprano, nó có thể nhảy xuống quãng 3 đến bậc 5. Khi đó V7 đầy đủ đi đến I đầy đủ.',
            en: '**Free resolution**: if the leading tone is not in the soprano, it may drop a third to scale degree 5. Then a complete V7 goes to a complete I.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+B3+F4+D5:h C3+G3+E4+C5:h ||', labels: ['V7', 'I'] },
        { type: 'play', notes: 'G2+B3+F4+D5:h C3+G3+E4+C5:w', label: { vi: 'Nghe giải quyết tự do', en: 'Hear free resolution' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong nhạc piano, nốt bảy đôi khi không đi xuống cho vừa tay, như trong bài Caro mio ben của Giordani. Đó là ngoại lệ, không dùng trong bài tập dẫn bè.',
            en: 'In piano music the seventh sometimes does not fall, to fit the hand, as in Giordani’s Caro mio ben. That is an exception, not for voice-leading exercises.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Khi nào cảm âm được nhảy xuống bậc 5?', en: 'When may the leading tone drop to scale degree 5?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khi nó không ở bè soprano', en: 'When it is not in the soprano' }, correct: true },
          { text: { vi: 'Khi nó ở bè soprano', en: 'When it is in the soprano' } },
          { text: { vi: 'Không bao giờ', en: 'Never' } },
        ],
      },
      reason: {
        vi: 'Ở bè soprano, cảm âm phải lên chủ âm; ở bè trong, nó được xuống bậc 5 để hợp âm I đầy đủ.',
        en: 'In the soprano the leading tone must rise to the tonic; in an inner voice it may fall to 5 so the I chord is complete.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Từ I6/4 đến V7', en: 'From I6/4 to V7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi I6/4 đi đến V7, coi chừng **quãng 5 song song** (parallel fifths) nếu nốt năm {G} nằm trên nốt gốc {C}. Khi đó, hãy cho mọi bè trên đi lên nốt gần nhất của V7, hoặc đến V7 thiếu nốt năm.',
            en: 'When I6/4 goes to V7, beware of **parallel fifths** if the fifth, {G}, is above the root, {C}. If it is, move all upper voices up to the nearest notes of V7, or to an incomplete V7.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+C4@b+E4+G4:h G2+D4@b+F4+B4:h | C3+C4@b+E4+C5:w ||', labels: ['I\n6\n4', 'V7', 'I'] },
        { type: 'play', notes: 'G2+C4+E4+G4:h G2+D4+F4+B4:h C3+C4+E4+C5:w', label: { vi: 'Nghe I6/4–V7–I', en: 'Hear I6/4–V7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở đây các bè trên đi xuống. Cặp bè nào tạo hai quãng 5 liền nhau?', en: 'Here the upper voices move down. Which pair of voices makes fifths in a row?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+C4@b+E4+G4:h G2+B3+D4+F4:h ||', labels: ['I\n6\n4', 'V7'] },
        { type: 'play', notes: 'G2+C4+E4+G4:h G2+B3+D4+F4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tenor và soprano', en: 'Tenor and soprano' }, correct: true },
          { text: { vi: 'Bass và alto', en: 'Bass and alto' } },
          { text: { vi: 'Alto và soprano', en: 'Alto and soprano' } },
        ],
      },
      reason: {
        vi: 'Tenor {C} và soprano {G} cách quãng 5, rồi cùng đi xuống {B} và {F}, lại một quãng 5.',
        en: 'The tenor, {C}, and the soprano, {G}, are a fifth apart, then both fall to {B} and {F}, another fifth.',
      },
    },
  ],
} satisfies Lesson
