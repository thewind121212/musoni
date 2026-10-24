import type { Lesson } from '@/theory/types'

/**
 * Book 27.4: vii°7 and viiø7 are all tendency tones; with the seventh above
 * the third, the third (2) rises to avoid parallel fifths. Book 27.5: where
 * seventh chords belong (dominant and pre-dominant chords).
 */
export default {
  id: 'vii7-resolution',
  title: { vi: 'Giải quyết vii°7 và viiø7', en: 'Resolving vii°7 and viiø7' },
  minutes: 5,
  sources: [
    { section: '27.4', url: 'https://musictheory.pugetsound.edu/mt21c/SpecialResolutionOfVII7.html' },
    { section: '27.5', url: 'https://musictheory.pugetsound.edu/mt21c/WhenToUseSeventhChords.html' },
  ],
  recap: [
    { vi: 'vii°7 và viiø7 chỉ gồm nốt xu hướng: bậc 7, 2, 4, 6', en: 'vii°7 and viiø7 are all tendency tones: 7, 2, 4, 6' },
    { vi: 'Nốt bảy ở trên nốt ba: cho nốt ba (bậc 2) đi lên', en: 'Seventh above the third: move the third (2) up' },
    { vi: 'Nốt bảy ở dưới nốt ba: giải quyết như thường', en: 'Seventh below the third: resolve as usual' },
    { vi: 'Hợp âm bảy hay dùng nhất ở V, vii°, ii và IV', en: 'Sevenths are used most on V, vii°, ii and IV' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Toàn nốt xu hướng', en: 'All tendency tones' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'vii°7 và viiø7 chỉ gồm **nốt xu hướng** (tendency tones): bậc 7, 2, 4 và 6. Mỗi nốt có đường đi riêng: 7 lên 1, 2 xuống 1, 4 xuống 3, 6 xuống 5.',
            en: 'vii°7 and viiø7 consist entirely of **tendency tones**: scale degrees 7, 2, 4 and 6. Each has its own path: 7 up to 1, 2 down to 1, 4 down to 3, 6 down to 5.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} trưởng, viiø7 là {B}–{D}–{F}–{A}. Ở đây nốt bảy {A} nằm dưới nốt ba {D}, nên mọi nốt đi theo đường của nó.',
            en: 'In {C} major, viiø7 is {B}–{D}–{F}–{A}. Here the seventh, {A}, lies below the third, {D}, so every note takes its usual path.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'B2+A3+D4+F4:h C3+G3+C4+E4:h ||', labels: ['viiø7', 'I'] },
        { type: 'play', notes: 'B2+A3+D4+F4:h C3+G3+C4+E4:w', label: { vi: 'Nghe viiø7–I', en: 'Hear viiø7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, nốt {F} (bậc 4) của viiø7 đi đến nốt nào?', en: 'In {C} major, where does the {F} (scale degree 4) of viiø7 go?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Bậc 4 là nốt xu hướng đi xuống bậc 3: {F} xuống {E}.',
        en: 'Scale degree 4 is a tendency tone that falls to 3: {F} goes down to {E}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt bảy ở trên nốt ba', en: 'Seventh above the third' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nếu nốt bảy nằm trên nốt ba cách quãng 5, như {D}–{A}, thì {D} xuống {C} và {A} xuống {G} tạo quãng 5 song song. Vì vậy hãy cho nốt ba (bậc 2) đi lên bậc 3, các nốt khác đi như thường.',
            en: 'If the seventh lies a fifth above the third, as in {D}–{A}, then {D} down to {C} and {A} down to {G} make parallel fifths. So move the third (scale degree 2) up to 3, and the other notes as usual.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'B2+F3+D4+A4:h C3+E3+E4+G4:h ||', labels: ['viiø7', 'I'] },
        { type: 'play', notes: 'B2+F3+D4+A4:h C3+E3+E4+G4:w', label: { vi: 'Nghe {D} đi lên {E}', en: 'Hear {D} rise to {E}' } },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm I khi đó nhân đôi nốt ba. Một cách khác là xếp lại hợp âm để nốt bảy nằm dưới nốt ba; quãng 4 song song thì không sao.',
            en: 'The I chord then has a doubled third. Another way is to revoice the chord with the seventh below the third; parallel fourths are fine.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, lỗi dẫn bè ở đây là gì?', en: 'In {C} major, what is the voice-leading error here?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'B2+F3+D4+A4:h C3+E3+C4+G4:h ||', labels: ['viiø7', 'I'] },
        { type: 'play', notes: 'B2+F3+D4+A4:h C3+E3+C4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 song song giữa alto và soprano', en: 'Parallel fifths between alto and soprano' }, correct: true },
          { text: { vi: 'Nốt bảy {A} đi lên', en: 'The seventh, {A}, rises' } },
          { text: { vi: 'Cảm âm {B} đi xuống', en: 'The leading tone, {B}, falls' } },
        ],
      },
      reason: {
        vi: 'Alto {D} và soprano {A} cách quãng 5, rồi đi xuống {C} và {G}, lại quãng 5 đúng; {D} nên đi lên {E}.',
        en: 'The alto, {D}, and soprano, {A}, are a fifth apart and fall to {C} and {G}, another perfect fifth; {D} should rise to {E}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khi nào dùng hợp âm bảy', en: 'When to use seventh chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi phối hòa âm cho giai điệu, hãy dùng hợp âm bảy để thêm căng thẳng khi sắp về chức năng chủ. Vì vậy nốt bảy hay được thêm vào hợp âm chức năng át (V, vii°) và tiền át (ii, ít hơn là IV).',
            en: 'When harmonizing a melody, use seventh chords to add tension as you approach tonic function. So sevenths are added most often to dominant chords (V and vii°) and pre-dominant chords (ii and, less often, IV).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Các hợp âm như iii7, vi7, IVM7 và IM7 ít gặp hơn.',
            en: 'Chords like iii7, vi7, IVM7 and IM7 are less common.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+E4+C5:q F2+A3+D4+C5:q G2+G3+F4+B4:q C3+G3+E4+C5:q ||', labels: ['I', 'ii\n6\n5', 'V7', 'I'] },
        { type: 'play', notes: 'C3+G3+E4+C5:q F2+A3+D4+C5:q G2+G3+F4+B4:q C3+G3+E4+C5:w', label: { vi: 'Nghe I–ii6/5–V7–I', en: 'Hear I–ii6/5–V7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm bảy nào ít gặp nhất?', en: 'Which seventh chord is the least common?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V7', en: 'V7' } },
          { text: { vi: 'ii7', en: 'ii7' } },
          { text: { vi: 'IM7', en: 'IM7' }, correct: true },
        ],
      },
      reason: {
        vi: 'Nốt bảy tạo căng thẳng dẫn về chủ, nên hợp với V và ii; IM7 đã là chủ nên ít được dùng.',
        en: 'A seventh adds tension leading to the tonic, so it suits V and ii; IM7 is already the tonic, so it is used less.',
      },
    },
  ],
} satisfies Lesson
