import type { Lesson } from '@/theory/types'

/**
 * Book 27.1: the one general rule (resolve the seventh down by step, other
 * voices to the nearest chord tone) and its one exception, I–V4/3–I6.
 */
export default {
  id: 'resolve-seventh',
  title: { vi: 'Nốt bảy đi xuống', en: 'The seventh resolves down' },
  minutes: 4,
  sources: [{ section: '27.1', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingSeventhChordsIntro.html' }],
  recap: [
    { vi: 'Nốt bảy của hợp âm bảy đi xuống liền bậc', en: 'The seventh of a seventh chord resolves down by step' },
    { vi: 'Các bè khác đi đến nốt gần nhất của hợp âm sau', en: 'The other voices move to the nearest tone of the next chord' },
    { vi: 'Quy tắc đúng cho mọi hợp âm bảy, không chỉ V7', en: 'The rule holds for every seventh chord, not just V7' },
    { vi: 'Ngoại lệ: trong I–V4/3–I6, nốt bảy đi lên', en: 'The exception: in I–V4/3–I6 the seventh rises' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Một quy tắc chung', en: 'One general rule' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi **dẫn bè** (voice leading) hợp âm bảy, chỉ có một quy tắc chung: **giải quyết** (resolve) nốt bảy đi xuống liền bậc. Các bè khác đi êm đến nốt gần nhất của hợp âm sau, với cách **nhân đôi** (doubling) phù hợp.',
            en: 'In **voice leading** a seventh chord there is one general rule: **resolve** the seventh down by step. The other voices move smoothly to the nearest tone of the next chord, with the right **doubling**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} trưởng, nốt bảy của V7 là {F}: nó đi xuống {E}. Bốn bè **soprano**, **alto**, **tenor**, **bass** được viết trên khuông đôi.',
            en: 'In {C} major, the seventh of V7 is {F}: it falls to {E}. The four voices, **soprano**, **alto**, **tenor** and **bass**, are written on a grand staff.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+D4@b+F4+B4:h C3+C4@b+E4+C5:h ||', labels: ['V7', 'I'] },
        { type: 'play', notes: 'G2+D4+F4+B4:h C3+C4+E4+C5:w', label: { vi: 'Nghe V7–I', en: 'Hear V7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {G} trưởng, V7 là {D}–{F#}–{A}–{C}. Nốt bảy {C} đi đến nốt nào?',
        en: 'In {G} major, V7 is {D}–{F#}–{A}–{C}. Where does the seventh, {C}, go?',
      },
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: 'Nốt bảy đi xuống liền bậc: {C} xuống {B}, nốt ba của hợp âm I.',
        en: 'The seventh falls by step: {C} goes down to {B}, the third of I.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Mọi hợp âm bảy', en: 'Every seventh chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quy tắc này đúng cho mọi hợp âm bảy, không chỉ V7. Trong ii7–V7–I, nốt bảy {C} của ii7 xuống {B}, rồi nốt bảy {F} của V7 xuống {E}.',
            en: 'The rule holds for every seventh chord, not just V7. In ii7–V7–I, the seventh of ii7, {C}, falls to {B}, then the seventh of V7, {F}, falls to {E}.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'D3+A3+F4+C5:q G2+G3+F4+B4:q C3+G3+E4+C5:h ||', labels: ['ii7', 'V7', 'I'] },
        { type: 'play', notes: 'D3+A3+F4+C5:q G2+G3+F4+B4:q C3+G3+E4+C5:w', label: { vi: 'Nghe ii7–V7–I', en: 'Hear ii7–V7–I' } },
        {
          type: 'tip',
          text: {
            vi: 'Nốt {F} được giữ nguyên từ ii7 sang V7, nên nốt bảy của V7 đã có sẵn trước đó.',
            en: 'The {F} is held from ii7 into V7, so the seventh of V7 is already sounding before it.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, lỗi dẫn bè ở đây là gì?', en: 'In {C} major, what is the voice-leading error here?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+B3+D4+F4:h C3+C4@b+E4+G4:h ||', labels: ['V7', 'I'] },
        { type: 'play', notes: 'G2+B3+D4+F4:h C3+C4+E4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt bảy {F} đi lên {G}', en: 'The seventh, {F}, rises to {G}' }, correct: true },
          { text: { vi: 'Cảm âm {B} đi lên {C}', en: 'The leading tone, {B}, rises to {C}' } },
          { text: { vi: 'Bass nhảy từ {G} lên {C}', en: 'The bass leaps from {G} up to {C}' } },
        ],
      },
      reason: {
        vi: '{F} ở bè soprano là nốt bảy của V7, nên nó phải đi xuống {E}, không đi lên {G}.',
        en: 'The {F} in the soprano is the seventh of V7, so it must fall to {E}, not rise to {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Một ngoại lệ', en: 'The one exception' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ngoại lệ duy nhất là I–V4/3–I6, khi bass đi lên {C}–{D}–{E}. Nốt bảy {F} đi lên {G} cùng bass, như ở cuối chủ đề chương 1 Sonata piano K.331 của Mozart.',
            en: 'The one exception is I–V4/3–I6, with the bass rising {C}–{D}–{E}. The seventh, {F}, rises to {G} along with the bass, as at the close of the theme in the first movement of Mozart’s Piano Sonata K.331.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Khi đó {B}–{F} (quãng 5 giảm) đi đến {C}–{G} (quãng 5 đúng). Hai **quãng 5 không đều** (unequal fifths) này được chấp nhận.',
            en: 'Then {B}–{F} (a diminished fifth) moves to {C}–{G} (a perfect fifth). These **unequal fifths** are accepted.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+C4+E4:q D3+G3+B3@t+F4:q E3+G3+C4+G4:h ||', labels: ['I', 'V\n4\n3', 'I\n6'] },
        { type: 'play', notes: 'C3+G3+C4+E4:q D3+G3+B3+F4:q E3+G3+C4+G4:w', label: { vi: 'Nghe I–V4/3–I6', en: 'Hear I–V4/3–I6' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong I–V4/3–I6, nốt bảy của V4/3 đi thế nào?', en: 'In I–V4/3–I6, how does the seventh of V4/3 move?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đi lên liền bậc', en: 'Up by step' }, correct: true },
          { text: { vi: 'Đi xuống liền bậc', en: 'Down by step' } },
          { text: { vi: 'Nhảy xuống quãng 3', en: 'Down a third' } },
        ],
      },
      reason: {
        vi: 'Đây là ngoại lệ duy nhất: bass đi lên {D}–{E}, nên nốt bảy {F} đi lên {G} theo bass.',
        en: 'It is the one exception: the bass rises {D}–{E}, so the seventh, {F}, rises with it to {G}.',
      },
    },
  ],
} satisfies Lesson
