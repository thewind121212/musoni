import type { Lesson } from '@/theory/types'

/** Book 8.3: Roman numeral conventions for seventh chords, and the diatonic seventh chords in major and minor. */
export default {
  id: 'diatonic-sevenths',
  title: { vi: 'Bậc La Mã của hợp âm bảy', en: 'Roman numerals of seventh chords' },
  minutes: 5,
  sources: [{ section: '8.3', url: 'https://musictheory.pugetsound.edu/mt21c/RomanNumeralsOfDiatonicSeventhChords.html' }],
  recap: [
    { vi: 'Số 7 sau bậc La Mã nghĩa là quãng 7 thứ; M7 là quãng 7 trưởng', en: 'A 7 after the numeral means a minor 7th; M7 a major 7th' },
    { vi: 'ø7: hợp âm ba giảm + 7 thứ; °7: hợp âm ba giảm + 7 giảm', en: 'ø7: diminished triad + minor 7th; °7: diminished triad + diminished 7th' },
    { vi: 'Giọng trưởng: IM7 ii7 iii7 IVM7 V7 vi7 viiø7', en: 'Major: IM7 ii7 iii7 IVM7 V7 vi7 viiø7' },
    { vi: 'Giọng thứ: i7 iiø7 IIIM7 iv7 V7 VIM7 vii°7', en: 'Minor: i7 iiø7 IIIM7 iv7 V7 VIM7 vii°7' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Cách viết', en: 'How to write them' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Như với hợp âm ba, bậc La Mã viết hoa là hợp âm ba trưởng, viết thường là hợp âm ba thứ. Thêm “7” phía sau nghĩa là nốt bảy cách nốt gốc một quãng 7 thứ: V7 là hợp âm ba trưởng với quãng 7 thứ.',
            en: 'As with triads, an uppercase numeral means a major triad and a lowercase one a minor triad. Adding “7” means a minor 7th from root to seventh: V7 is a major triad with a minor 7th.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Viết “M7” cho quãng 7 trưởng (IM7). Dấu ø7 là hợp âm ba giảm với quãng 7 thứ; dấu °7 là hợp âm ba giảm với quãng 7 giảm.',
            en: 'Write “M7” for a major 7th (IM7). The ø7 sign means a diminished triad with a minor 7th; the °7 sign a diminished triad with a diminished 7th.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'C', notes: 'C4+E4+G4+B4 A4+C5+E5+G5 G4+B4+D5+F5', labels: ['IM7', 'vi7', 'V7'] },
        { type: 'play', notes: 'C4+E4+G4+B4 A4+C5+E5+G5 G4+B4+D5+F5' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Trong giọng trưởng', en: 'In a major key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Dựng một hợp âm bảy trên mỗi bậc, chỉ dùng nốt của giọng, ta có bảy hợp âm bảy thuận giọng. Đây là giọng {C} trưởng.',
            en: 'Build a seventh chord on every scale degree, using only the key’s notes, and you get the seven diatonic seventh chords. Here they are in {C} major.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'C',
          notes: 'C4+E4+G4+B4 D4+F4+A4+C5 E4+G4+B4+D5 F4+A4+C5+E5 G4+B4+D5+F5 A4+C5+E5+G5 B4+D5+F5+A5',
          labels: ['IM7', 'ii7', 'iii7', 'IVM7', 'V7', 'vi7', 'viiø7'],
          highlight: [4],
        },
        { type: 'play', notes: 'C4+E4+G4+B4 D4+F4+A4+C5 E4+G4+B4+D5 F4+A4+C5+E5 G4+B4+D5+F5 A4+C5+E5+G5 B4+D5+F5+A5' },
        {
          type: 'tip',
          text: {
            vi: 'Chỉ bậc V cho hợp âm bảy át, vì thế nó mang tên “át”.',
            en: 'Only V gives a dominant seventh chord, which is where the name comes from.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, hợp âm này mang bậc La Mã nào?', en: 'In {G} major, which Roman numeral is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'G', notes: 'F#4+A4+C5+E5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V7', en: 'V7' } },
          { text: { vi: 'viiø7', en: 'viiø7' }, correct: true },
          { text: { vi: 'vii°7', en: 'vii°7' } },
        ],
      },
      reason: {
        vi: '{F#} là bậc 7 của giọng {G} trưởng; {F#} {A} {C} là hợp âm ba giảm và {F#} lên {E} là quãng 7 thứ.',
        en: '{F#} is degree 7 of {G} major; {F#} {A} {C} is diminished and {F#} up to {E} is a minor 7th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Trong giọng thứ', en: 'In a minor key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giọng thứ dùng cảm âm nâng lên của gam thứ hòa âm cho V7 và vii°7, như với hợp âm ba. Đây là giọng {A} thứ, với {G#}.',
            en: 'Minor keys use the raised leading tone of the harmonic minor scale for V7 and vii°7, as with triads. Here is {A} minor, with {G#}.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'Am',
          notes: 'A3+C4+E4+G4 B3+D4+F4+A4 C4+E4+G4+B4 D4+F4+A4+C5 E4+G#4+B4+D5 F4+A4+C5+E5 G#4+B4+D5+F5',
          labels: ['i7', 'iiø7', 'IIIM7', 'iv7', 'V7', 'VIM7', 'vii°7'],
          highlight: [4, 6],
        },
        { type: 'play', notes: 'A3+C4+E4+G4 B3+D4+F4+A4 C4+E4+G4+B4 D4+F4+A4+C5 E4+G#4+B4+D5 F4+A4+C5+E5 G#4+B4+D5+F5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} thứ, hợp âm này mang bậc La Mã nào?', en: 'In {A} minor, which Roman numeral is this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Am', notes: 'E4+G#4+B4+D5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'v7', en: 'v7' } },
          { text: { vi: 'V7', en: 'V7' }, correct: true },
          { text: { vi: 'VM7', en: 'VM7' } },
        ],
      },
      reason: {
        vi: '{G#} làm {E} {G#} {B} thành hợp âm ba trưởng, và {E} lên {D} là quãng 7 thứ, nên là V7.',
        en: 'The {G#} makes {E} {G#} {B} a major triad, and {E} up to {D} is a minor 7th, so it is V7.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} thứ, nốt gốc của vii°7 là nốt nào?', en: 'In {A} minor, what is the root of vii°7?' },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'vii°7 dựng trên cảm âm nâng lên, và cảm âm của giọng {A} thứ là {G#}.',
        en: 'vii°7 is built on the raised leading tone, and the leading tone of {A} minor is {G#}.',
      },
    },
  ],
} satisfies Lesson
