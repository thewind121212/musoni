import type { Lesson } from '@/theory/types'

/**
 * Book 17.4 (analyzing: stack in thirds, then a perfect 5th below the root)
 * and 17.5 (writing: the tonicized root, a perfect 5th above, build, invert).
 * No practice link: no drill asks secondary dominants.
 */
export default {
  id: 'analyze-write',
  title: { vi: 'Phân tích và viết át phụ', en: 'Analyzing and writing secondary dominants' },
  minutes: 5,
  sources: [
    { section: '17.4', url: 'https://musictheory.pugetsound.edu/mt21c/AnalyzingSecondaryDominants.html' },
    { section: '17.5', url: 'https://musictheory.pugetsound.edu/mt21c/WritingSecondaryDominants.html' },
  ],
  recap: [
    { vi: 'Phân tích: xếp thành quãng 3, phải là hợp âm trưởng hoặc hợp âm bảy át', en: 'Analyzing: stack in thirds; it must be a major triad or major-minor seventh' },
    { vi: 'Quãng 5 đúng dưới nốt gốc là hợp âm được ly điệu', en: 'A perfect 5th below the root is the tonicized chord' },
    { vi: 'Viết: lấy nốt gốc của hợp âm sau gạch chéo, lên một quãng 5 đúng', en: 'Writing: take the root of the chord after the slash, go up a perfect 5th' },
    { vi: 'Dựng hợp âm trưởng hoặc hợp âm bảy át, rồi đảo theo ký hiệu', en: 'Build a major triad or major-minor seventh, then invert as marked' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Phân tích, bước 1', en: 'Analyzing, step 1' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Gặp một hợp âm có nốt biến âm, trước hết hãy xếp nó thành các quãng 3 để tìm nốt gốc và tính chất. Nếu là hợp âm trưởng hoặc hợp âm bảy át, đi tiếp bước 2; nếu không, nó không phải át phụ.',
            en: 'When you meet a chord with a chromatic note, first stack it in thirds to find its root and quality. If it is a major triad or a major-minor seventh chord, go on to step 2; if not, it is not a secondary dominant.',
          },
        },
        { type: 'staff', clef: 'bass', key: 'E', notes: 'A#2+F#3+C#4 F#3+A#3+C#4' },
        { type: 'play', notes: 'A#2+F#3+C#4 F#3+A#3+C#4' },
        {
          type: 'tip',
          text: {
            vi: 'Ở giọng {E} trưởng, {A#}–{F#}–{C#} xếp lại thành {F#}–{A#}–{C#}: hợp âm {F#} trưởng ở thế đảo 1.',
            en: 'In {E} major, {A#}–{F#}–{C#} stacks up as {F#}–{A#}–{C#}: an {F#} major triad in first inversion.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Phân tích, bước 2', en: 'Analyzing, step 2' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tìm nốt nằm một quãng 5 đúng dưới nốt gốc. Nếu nó là nốt gốc của một hợp âm thuận giọng, hợp âm đang xét là át phụ của hợp âm đó.',
            en: 'Find the note a perfect 5th below the root. If that note is the root of a diatonic chord, the chord you are analyzing is a secondary dominant of it.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Quãng 5 đúng dưới {F#} là {B}, bậc 5 của giọng {E} trưởng. Vậy hợp âm này là V6/V, với số 6 chỉ thế đảo 1: nó ly điệu V.',
            en: 'A perfect 5th below {F#} is {B}, degree 5 of {E} major. So the chord is V6/V, the 6 marking first inversion: it tonicizes V.',
          },
        },
        { type: 'staff', clef: 'bass', key: 'E', notes: 'A#2+F#3+C#4 B2+F#3+D#4', labels: ['V6/V', 'V'] },
        { type: 'play', notes: 'E2+G#3+B3+E4:h A#2+F#3+C#4:h B2+F#3+D#4:w', label: { vi: 'Nghe I–V6/V–V', en: 'Hear I–V6/V–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} trưởng, hợp âm thứ nhất đi tới A. Nó là gì?', en: 'In {D} major, the first chord goes to A. What is it?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'D', notes: 'E4+G#4+B4 A4+C#5+E5' },
        { type: 'play', notes: 'E4+G#4+B4:h A4+C#5+E5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'II', en: 'II' } },
          { text: { vi: 'V/V', en: 'V/V' }, correct: true },
          { text: { vi: 'V/ii', en: 'V/ii' } },
        ],
      },
      reason: {
        vi: 'Đây là hợp âm {E} trưởng; quãng 5 đúng dưới {E} là {A}, bậc 5 của giọng, nên nó là V/V.',
        en: 'This is an {E} major triad; a perfect 5th below {E} is {A}, degree 5 of the key, so it is V/V.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, {E}–{G}–{B}–{D} có phải là một hợp âm át phụ không?', en: 'In {C} major, is {E}–{G}–{B}–{D} a secondary dominant?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'C', notes: 'E4+G4+B4+D5' },
        { type: 'play', notes: 'E4+G4+B4+D5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có, V7/vi', en: 'Yes, V7/vi' } },
          { text: { vi: 'Không: đó là hợp âm bảy thứ', en: 'No: it is a minor seventh chord' }, correct: true },
          { text: { vi: 'Có, V7/V', en: 'Yes, V7/V' } },
        ],
      },
      reason: {
        vi: 'Em7 là hợp âm bảy thứ, không phải hợp âm bảy át, nên ta dừng ở bước 1: đây là iii7.',
        en: 'Em7 is a minor seventh chord, not a major-minor seventh, so we stop at step 1: it is iii7.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Viết một át phụ', en: 'Writing a secondary dominant' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Để viết V43/V ở giọng {Eb} trưởng: tìm nốt gốc của hợp âm sau gạch chéo (V là {Bb}), rồi lấy nốt một quãng 5 đúng trên nó ({F}). Dựng hợp âm bảy át trên {F}: {F}–{A}–{C}–{Eb}.',
            en: 'To write V43/V in {Eb} major: find the root of the chord after the slash (V is {Bb}), then the note a perfect 5th above it ({F}). Build a major-minor seventh chord on {F}: {F}–{A}–{C}–{Eb}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cuối cùng, đảo hợp âm theo ký hiệu: 43 nghĩa là nốt năm, {C}, nằm ở bass.',
            en: 'Last, invert the chord as marked: 43 means the fifth, {C}, is in the bass.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Eb', notes: 'C3+F4+A4+Eb5 Bb2+F4+Bb4+D5', labels: ['V43/V', 'V'] },
        { type: 'play', notes: 'C3+F4+A4+Eb5:h Bb2+F4+Bb4+D5:w', label: { vi: 'Nghe V43/V rồi V', en: 'Hear V43/V, then V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {Bb} trưởng, V7/ii có nốt gốc {G}. Nốt ba của nó là nốt nào?', en: 'In {Bb} major, V7/ii has root {G}. What is its third?' },
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'V7/ii là G7 = {G}–{B}–{D}–{F}, nên {Bb} của hóa biểu được nâng lên thành {Bn}, cảm âm của {C}.',
        en: 'V7/ii is G7 = {G}–{B}–{D}–{F}, so the key signature\'s {Bb} is raised to {Bn}, the leading tone of {C}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} trưởng, V7/IV là hợp âm nào?', en: 'In {A} major, which chord is V7/IV?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'D7', en: 'D7' } },
          { text: { vi: 'E7', en: 'E7' } },
          { text: { vi: 'A7', en: 'A7' }, correct: true },
        ],
      },
      reason: {
        vi: 'IV là {D}, quãng 5 đúng trên {D} là {A}, nên V7/IV là A7 = {A}–{C#}–{E}–{G}, với {Gn} hạ từ {G#}.',
        en: 'IV is {D} and a perfect 5th above {D} is {A}, so V7/IV is A7 = {A}–{C#}–{E}–{G}, with {Gn} lowered from {G#}.',
      },
    },
  ],
} satisfies Lesson
