import type { Lesson } from '@/theory/types'

/**
 * Book 17.3, major half: the secondary dominant triads and sevenths in C major,
 * raised notes as leading tones, and V7/IV's lowered note.
 * No practice link: no drill asks secondary dominants.
 */
export default {
  id: 'in-major',
  title: { vi: 'Át phụ ở giọng trưởng', en: 'Secondary dominants in major' },
  minutes: 5,
  sources: [{ section: '17.3', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDominantsInMajorAndMinor.html' }],
  recap: [
    { vi: 'Ở giọng trưởng: V/ii, V/iii, V/IV, V/V, V/vi và bản bảy của chúng', en: 'In major: V/ii, V/iii, V/IV, V/V, V/vi and their sevenths' },
    { vi: 'Nốt nâng lên là cảm âm của hợp âm được ly điệu', en: 'A raised note is the leading tone of the tonicized chord' },
    { vi: 'V/IV ba nốt trùng với I; V7/IV thêm một nốt hạ xuống', en: 'The V/IV triad is the same as I; V7/IV adds a lowered note' },
    { vi: 'Nốt hạ của V7/IV là bậc 4 của hợp âm đích', en: 'V7/IV\'s lowered note is degree 4 of the chord it goes to' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Bốn át phụ ba nốt', en: 'Four secondary dominant triads' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cả hợp âm trưởng lẫn hợp âm bảy át đều có thể làm át phụ. Ở giọng {C} trưởng, đặt một hợp âm trưởng một quãng 5 đúng trên nốt gốc của ii, iii, V và vi, ta có bốn át phụ ba nốt.',
            en: 'Both major triads and major-minor seventh chords can be secondary dominants. In {C} major, a major triad a perfect 5th above the root of ii, iii, V and vi gives four secondary dominant triads.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'C', notes: 'A4+C#5+E5 B4+D#5+F#5 D4+F#4+A4 E4+G#4+B4', labels: ['V/ii', 'V/iii', 'V/V', 'V/vi'] },
        {
          type: 'play',
          notes: 'A4+C#5+E5 D4+F4+A4 B4+D#5+F#5 E4+G4+B4 D4+F#4+A4 G4+B4+D5 E4+G#4+B4 A4+C5+E5',
          label: { vi: 'Nghe mỗi hợp âm về đích', en: 'Hear each one resolve' },
        },
        {
          type: 'tip',
          text: {
            vi: 'V/IV là {C}–{E}–{G}, chính là hợp âm I, nên chỉ nghe ra khi nó có thêm nốt bảy.',
            en: 'V/IV is {C}–{E}–{G}, the I chord itself, so it only stands out once it adds a seventh.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, V/vi có nốt gốc {E} và nốt năm {B}. Nốt ba của nó là nốt nào?', en: 'In {C} major, V/vi has root {E} and fifth {B}. What is its third?' },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'vi là hợp âm {A} thứ; át âm của {A} là {E}–{G#}–{B}, với {G#} là cảm âm của {A}.',
        en: 'vi is the {A} minor chord; the dominant of {A} is {E}–{G#}–{B}, with {G#} as the leading tone of {A}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt nâng lên là cảm âm', en: 'The raised note is a leading tone' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các nốt biến âm ở đây đều được nâng lên nửa cung. Mỗi nốt làm cảm âm cho nốt gốc của hợp âm được ly điệu: {C#} lên {D}, {D#} lên {E}, {F#} lên {G}, {G#} lên {A}.',
            en: 'The chromatic notes here are all raised a half step. Each one acts as the leading tone to the root of the tonicized chord: {C#} to {D}, {D#} to {E}, {F#} to {G}, {G#} to {A}.',
          },
        },
        { type: 'keys', notes: 'C#4 D4 D#4 E4 F#4 G4 G#4 A4', labels: 'names', caption: { vi: 'Bốn cặp nửa cung:', en: 'Four half-step pairs:' } },
        { type: 'play', notes: 'C#4 D4 D#4 E4 F#4 G4 G#4 A4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, V/vi là hợp âm nào?', en: 'In {G} major, which chord is V/vi?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'B', en: 'B' }, correct: true },
          { text: { vi: 'Bm', en: 'Bm' } },
          { text: { vi: 'D', en: 'D' } },
        ],
      },
      reason: {
        vi: 'vi là hợp âm {E} thứ, và át âm của {E} là hợp âm trưởng trên {B}: {B}–{D#}–{F#}.',
        en: 'vi is the {E} minor chord, and the dominant of {E} is the major triad on {B}: {B}–{D#}–{F#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm bảy át phụ', en: 'Secondary dominant sevenths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Thêm một quãng 7 thứ trên nốt gốc, ta có năm hợp âm bảy át phụ ở giọng {C} trưởng: A7, B7, C7, D7 và E7.',
            en: 'Add a minor 7th above the root and you have the five secondary dominant seventh chords in {C} major: A7, B7, C7, D7 and E7.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'C',
          notes: 'A4+C#5+E5+G5 B4+D#5+F#5+A5 C4+E4+G4+Bb4 D4+F#4+A4+C5 E4+G#4+B4+D5',
          labels: ['V7/ii', 'V7/iii', 'V7/IV', 'V7/V', 'V7/vi'],
        },
        { type: 'play', notes: 'A4+C#5+E5+G5 B4+D#5+F#5+A5 C4+E4+G4+Bb4 D4+F#4+A4+C5 E4+G#4+B4+D5', label: { vi: 'Nghe năm hợp âm bảy', en: 'Hear the five sevenths' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'V7/IV và nốt hạ xuống', en: 'V7/IV and its lowered note' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng trưởng, V7/IV là át phụ duy nhất có nốt biến âm hạ xuống. Trong C7, {Bb} đóng vai bậc 4 của {F}, giống như dấu giáng cuối cùng của hóa biểu là bậc 4 của giọng.',
            en: 'In major, V7/IV is the only secondary dominant with a lowered chromatic note. In C7 the {Bb} acts as degree 4 of {F}, the way the last flat of a key signature is degree 4 of the key.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', notes: 'C3+E4+Bb4+C5 F2+F4+A4+C5', labels: ['V7/IV', 'IV'], highlight: [0] },
        { type: 'play', notes: 'C3+E4+G4+C5:h C3+E4+Bb4+C5:h F2+F4+A4+C5:w', label: { vi: 'Nghe I–V7/IV–IV', en: 'Hear I–V7/IV–IV' } },
        {
          type: 'tip',
          text: {
            vi: '{Bb} đi xuống nửa cung về {A}, còn {E} đi lên nửa cung về {F}.',
            en: 'The {Bb} falls a half step to {A}, and the {E} rises a half step to {F}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, V7/IV là hợp âm nào?', en: 'In {G} major, which chord is V7/IV?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C7', en: 'C7' } },
          { text: { vi: 'G7', en: 'G7' }, correct: true },
          { text: { vi: 'D7', en: 'D7' } },
        ],
      },
      reason: {
        vi: 'IV của giọng {G} trưởng là {C}, và át âm của {C} là G7 = {G}–{B}–{D}–{F}, với {Fn} hạ từ {F#} của hóa biểu.',
        en: 'IV in {G} major is {C}, and the dominant of {C} is G7 = {G}–{B}–{D}–{F}, with {Fn} lowered from the key\'s {F#}.',
      },
    },
  ],
} satisfies Lesson
