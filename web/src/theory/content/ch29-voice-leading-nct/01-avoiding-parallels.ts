import type { Lesson } from '@/theory/types'

/**
 * Book 28.1 (non-chord tones in Bach's chorales, the model for voice leading)
 * and 28.2 (find the fifths and octaves first; no non-chord tone stepping into
 * them; two voices on one beat only in parallel thirds or sixths). Our own
 * four-part examples in C major in place of the book's two Bach chorales. The
 * other voices are struck again under each non-chord tone: a grand-staff event
 * has one duration.
 */
export default {
  id: 'avoiding-parallels',
  title: { vi: 'Nốt ngoài hợp âm và quãng song song', en: 'Non-chord tones and parallels' },
  minutes: 5,
  sources: [
    { section: '28.1', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingNCTsIntro.html' },
    { section: '28.2', url: 'https://musictheory.pugetsound.edu/mt21c/AvoidingObjectionableParallels.html' },
  ],
  recap: [
    { vi: 'Nốt ngoài hợp âm rất hay gặp trong các bài hợp xướng của Bach', en: 'Non-chord tones are common in Bach’s chorales' },
    { vi: 'Trước hết, tìm các quãng 5 và quãng 8 giữa các bè', en: 'First find the fifths and octaves between the voices' },
    { vi: 'Tránh nốt ngoài hợp âm đi liền bậc vào hai nốt cách quãng 5 hay quãng 8', en: 'Avoid non-chord tones that step into notes a fifth or an octave apart' },
    { vi: 'Hai bè cùng một phách: chỉ song song quãng 3 hoặc quãng 6', en: 'Two voices on one beat: only parallel thirds or sixths' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt ngoài hợp âm trong bốn bè', en: 'Non-chord tones in four parts' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '371 **bài hợp xướng** (chorales) của Bach, mẫu mực cho **dẫn bè** (voice leading), có rất nhiều nốt ngoài hợp âm. Ta thêm chúng vào một bè của tiến trình bốn bè: **bè soprano, alto, tenor, bass** (soprano, alto, tenor, bass voices).',
            en: 'Non-chord tones are common in Bach’s 371 **chorales**, our model for **voice leading**. We add them to one voice of a four-part progression: the **soprano, alto, tenor and bass voices**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây, bè soprano của tiến trình I–IV–V–I có thêm một nốt thêu (N) và một nốt đón trước (Ant). Các bè khác được đánh lại dưới mỗi nốt để bạn nghe rõ.',
            en: 'Here the soprano of a I–IV–V–I progression gets a neighbor tone (N) and an anticipation (Ant). The other voices are struck again under each note so you can hear it clearly.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+G3+E4+C5:8 C3+G3+E4+D5:8 F2+A3+F4+C5:q G2+G3+D4+B4:8 G2+G3+D4+C5:8 C3+G3+E4+C5:q ||',
          labels: ['I', 'N', 'IV', 'V', 'Ant', 'I'],
          highlight: [1, 4],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:q F2+A3+F4+C5:q G2+G3+D4+B4:q C3+G3+E4+C5:h', label: { vi: 'Nghe bản gốc', en: 'Hear the original' } },
        { type: 'play', notes: 'C3+G3+E4+C5:8 C3+G3+E4+D5:8 F2+A3+F4+C5:q G2+G3+D4+B4:8 G2+G3+D4+C5:8 C3+G3+E4+C5:h', label: { vi: 'Nghe có nốt ngoài hợp âm', en: 'Hear it with non-chord tones' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Bè nào có nốt ngoài hợp âm?', en: 'Which voice has a non-chord tone?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+C4@b+G4+E5:8 C3+C4@b+A4+E5:8 G2+B3+G4+D5:q ||', labels: ['I', '', 'V'] },
        { type: 'play', notes: 'C3+C4@b+G4+E5:8 C3+C4@b+A4+E5:8 G2+B3+G4+D5:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bè soprano', en: 'The soprano' } },
          { text: { vi: 'Bè alto', en: 'The alto' }, correct: true },
          { text: { vi: 'Bè tenor', en: 'The tenor' } },
          { text: { vi: 'Bè bass', en: 'The bass' } },
        ],
      },
      reason: {
        vi: 'Bè alto đi {G4}–{A4}–{G4}; {A4} không thuộc {C} {E} {G}, nên là nốt thêu trên.',
        en: 'The alto goes {G4}–{A4}–{G4}; {A4} is not in {C} {E} {G}, so it is an upper neighbor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm quãng 5 và quãng 8 trước', en: 'First find the fifths and octaves' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Thêm nốt ngoài hợp âm có thể tạo ra **quãng 5 song song** (parallel fifths) hay **quãng 8 song song** (parallel octaves). Vì vậy, trước hết hãy tìm các quãng 5 và quãng 8 giữa các bè trong phần dẫn bè gốc.',
            en: 'Adding non-chord tones can create **parallel fifths** or **parallel octaves**. So first find the fifths and octaves between the voices in your original voice leading.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở hợp âm IV dưới đây, alto {F4} và soprano {C5} cách nhau một quãng 5; bass {F2} và alto {F4} cách nhau hai quãng 8.',
            en: 'In the IV chord below, the alto {F4} and the soprano {C5} are a fifth apart; the bass {F2} and the alto {F4} are two octaves apart.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+E4+C5:h F2+A3+F4+C5:h ||', labels: ['I', 'IV'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+C5:h F2+A3+F4+C5:h' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Đi liền bậc vào quãng 5', en: 'Stepping into a fifth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tránh thêm nốt ngoài hợp âm đi liền bậc vào hai nốt cách nhau quãng 5 hay quãng 8.',
            en: 'Avoid adding non-chord tones that move by step into notes a fifth or an octave apart.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây, nốt thêu dưới {B4} cách alto {E4} một quãng 5. Rồi soprano lên {C5}, alto lên {F4}, lại một quãng 5: quãng 5 song song.',
            en: 'Here the lower neighbor {B4} is a fifth above the alto {E4}. Then the soprano moves up to {C5} and the alto to {F4}, another fifth: parallel fifths.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'C3+G3+E4+C5:8 C3+G3+E4+B4:8 F2+A3+F4+C5:q ||',
          labels: ['I', '5', '5'],
          highlight: [1, 2],
        },
        { type: 'play', notes: 'C3+G3+E4+C5:8 C3+G3+E4+B4:8 F2+A3+F4+C5:h', label: { vi: 'Nghe quãng 5 song song', en: 'Hear the parallel fifths' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt lướt {E4} ở bè alto tạo ra lỗi gì?', en: 'What fault does the alto’s passing tone {E4} create?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'F2+A3+F4+C5:8 F2+A3+E4+C5:8 G2+G3+D4+B4:q ||', labels: ['IV', 'P', 'V'] },
        { type: 'play', notes: 'F2+A3+F4+C5:8 F2+A3+E4+C5:8 G2+G3+D4+B4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 song song với bè tenor', en: 'Parallel fifths with the tenor' }, correct: true },
          { text: { vi: 'Quãng 8 song song với bè bass', en: 'Parallel octaves with the bass' } },
          { text: { vi: 'Không có lỗi', en: 'No fault' } },
        ],
      },
      reason: {
        vi: 'Tenor {A3} và alto {E4} cách quãng 5, rồi tenor xuống {G3}, alto xuống {D4}, lại một quãng 5.',
        en: 'The tenor {A3} and the alto {E4} are a fifth apart, then the tenor moves to {G3} and the alto to {D4}, another fifth.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hai bè cùng một phách', en: 'Two voices on the same beat' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tốt nhất đừng thêm nốt ngoài hợp âm vào hai bè trên cùng một phách, trừ khi chúng **chuyển động song song** (parallel motion) cách nhau quãng 3 hoặc quãng 6.',
            en: 'It is best not to add non-chord tones to two voices on the same beat, unless they move in **parallel motion** a third or a sixth apart.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở đây, alto {E4} và soprano {C5} cùng đón trước hợp âm I, cách nhau quãng 6.',
            en: 'Here the alto {E4} and the soprano {C5} both anticipate the I chord, a sixth apart.',
          },
        },
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'G2+G3+D4+B4:8 G2+G3+E4+C5:8 C3+G3+E4+C5:q ||', labels: ['V', 'Ant', 'I'], highlight: [1] },
        { type: 'play', notes: 'G2+G3+D4+B4:8 G2+G3+E4+C5:8 C3+G3+E4+C5:h' },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Nốt ngoài hợp âm ở hai bè, trên cùng một phách: chúng nên song song cách nhau quãng mấy?',
        en: 'Non-chord tones in two voices on the same beat: what interval apart should they move in parallel?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 3 hoặc quãng 6', en: 'A third or a sixth' }, correct: true },
          { text: { vi: 'Quãng 5 hoặc quãng 8', en: 'A fifth or an octave' } },
          { text: { vi: 'Quãng 2 hoặc quãng 7', en: 'A second or a seventh' } },
        ],
      },
      reason: {
        vi: 'Quãng 3 và quãng 6 song song nghe êm, còn quãng 5 và quãng 8 song song là lỗi dẫn bè.',
        en: 'Parallel thirds and sixths sound smooth, while parallel fifths and octaves are voice-leading faults.',
      },
    },
  ],
} satisfies Lesson
