import type { Lesson } from '@/theory/types'

/** Book 29.3: in four parts, N6 doubles its bass (the third), and ♭2 falls to the nearest note of the next chord. */
export default {
  id: 'neapolitan',
  title: { vi: 'Hợp âm Napoli', en: 'The Neapolitan chord' },
  minutes: 4,
  sources: [{ section: '29.3', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingNeapolitanChord.html' }],
  recap: [
    { vi: 'N6 nhân đôi nốt bass, tức nốt ba của hợp âm', en: 'N6 doubles its bass, the third of the chord' },
    { vi: 'Bậc 2 hạ đi xuống nốt gần nhất của hợp âm sau', en: 'The lowered second falls to the nearest note of the next chord' },
    { vi: 'Đến V: xuống cảm âm; đến i6/4: xuống chủ âm', en: 'To V: down to the leading tone; to i6/4: down to the tonic' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nhân đôi bass', en: 'Double the bass' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dẫn bè **hợp âm Napoli** (Neapolitan chord) N6 ở bốn bè có hai quy tắc. Thứ nhất: nhân đôi nốt bass, tức nốt ba của hợp âm.',
            en: 'There are two rules for voice leading the **Neapolitan chord**, N6, in four parts. First: double the bass, which is the third of the chord.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} thứ, N6 là {Db}–{F}–{Ab} với {F} ở bass, nên {F} có hai lần. Không nhân đôi bậc 2 hạ {Db}, vì nó là nốt khuynh hướng.',
            en: 'In {C} minor, N6 is {Db}–{F}–{Ab} with {F} in the bass, so {F} appears twice. Do not double the lowered second, {Db}: it is a tendency tone.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', notes: 'F2+Ab3+F4+Db5', labels: ['N6'] },
        { type: 'play', notes: 'F2+Ab3+F4+Db5', label: { vi: 'Nghe N6', en: 'Hear N6' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, N6 là {Bb}–{D}–{F} với {D} ở bass. Nên nhân đôi nốt nào?', en: 'In {A} minor, N6 is {Bb}–{D}–{F} with {D} in the bass. Which note should be doubled?' },
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: 'N6 nhân đôi nốt bass {D}, nốt ba của hợp âm; bậc 2 hạ {Bb} không được nhân đôi.',
        en: 'N6 doubles its bass, {D}, the third of the chord; the lowered second, {Bb}, is not doubled.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bậc 2 hạ đi xuống', en: 'The lowered second falls' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Thứ hai: bậc 2 hạ đi xuống nốt gần nhất của hợp âm sau. Đến V, {Db} đi xuống cảm âm {B}, còn bass đi lên ngược chiều với các bè trên.',
            en: 'Second: the lowered second falls to the nearest note of the next chord. Going to V, {Db} falls to the leading tone, {B}, while the bass rises against the upper voices.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', time: '4/4', notes: 'C3+G3+Eb4+C5:q F2+Ab3+F4+Db5:q G2+G3+D4+B4:q C3+G3+Eb4+C5:q ||', labels: ['i', 'N6', 'V', 'i'], highlight: [1, 2] },
        { type: 'play', notes: 'C3+G3+Eb4+C5:q F2+Ab3+F4+Db5:q G2+G3+D4+B4:q C3+G3+Eb4+C5:h', label: { vi: 'Nghe i–N6–V–i', en: 'Hear i–N6–V–i' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} thứ, N6 đi đến V. Bậc 2 hạ {Eb} đi đến nốt nào?', en: 'In {D} minor, N6 goes to V. Where does the lowered second, {Eb}, go?' },
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'Nốt gần nhất bên dưới {Eb} trong V ({A}–{C#}–{E}) là cảm âm {C#}.',
        en: 'The nearest note below {Eb} in V ({A}–{C#}–{E}) is the leading tone, {C#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Qua i6/4', en: 'Through i6/4' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu sau N6 là hợp âm 6/4 kết (i6/4), nốt gần nhất là chủ âm: {Db} chỉ đi xuống nửa cung đến {C}. Rồi {C} đi xuống {B} ở V.',
            en: 'If N6 goes to the cadential six-four (i6/4), the nearest note is the tonic: {Db} falls just a half step to {C}. Then {C} falls to {B} in V.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', time: '4/4', notes: 'F2+Ab3+F4+Db5:q G2+G3+Eb4+C5:q G2+G3+D4+B4:q C3+G3+Eb4+C5:q ||', labels: ['N6', 'i\n6\n4', 'V', 'i'], highlight: [0, 1] },
        { type: 'play', notes: 'F2+Ab3+F4+Db5:q G2+G3+Eb4+C5:q G2+G3+D4+B4:q C3+G3+Eb4+C5:h', label: { vi: 'Nghe N6–i6/4–V–i', en: 'Hear N6–i6/4–V–i' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {E} thứ, N6 đi đến i6/4. Bậc 2 hạ {F} đi đến nốt nào?', en: 'In {E} minor, N6 goes to i6/4. Where does the lowered second, {F}, go?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'i6/4 là {B}–{E}–{G}, nên nốt gần nhất bên dưới {F} là chủ âm {E}, cách nửa cung.',
        en: 'i6/4 is {B}–{E}–{G}, so the nearest note below {F} is the tonic, {E}, a half step down.',
      },
    },
  ],
} satisfies Lesson
