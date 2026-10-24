import type { Lesson } from '@/theory/types'

/**
 * Book 21.1: augmented sixth chords as pre-dominants whose ♭6 and ♯4 close in
 * on 5 by half step; the augmented sixth itself; ♭6 already in the minor key
 * signature. The link from iv6 is standard theory, not in the book's text.
 * Practice: Quãng level 4 asks the augmented sixth among its intervals.
 */
export default {
  id: 'aug-sixth-intro',
  title: { vi: 'Hợp âm sáu tăng là gì', en: 'What augmented sixth chords are' },
  minutes: 4,
  sources: [{ section: '21.1', url: 'https://musictheory.pugetsound.edu/mt21c/AugmentedSixthIntroduction.html' }],
  practice: { drill: 'intervals', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Hợp âm sáu tăng là hợp âm tiền át', en: 'Augmented sixth chords are pre-dominant chords' },
    { vi: 'Bậc ♭6 đi xuống, bậc ♯4 đi lên, cùng về bậc 5', en: '♭6 moves down and ♯4 moves up, both to 5' },
    { vi: '♭6 lên ♯4 là quãng 6 tăng, mở ra thành quãng tám', en: '♭6 up to ♯4 is an augmented sixth, opening out to an octave' },
    { vi: 'Trong giọng thứ, ♭6 đã có sẵn trong hóa biểu', en: 'In minor, ♭6 is already in the key signature' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hai nốt cùng kẹp bậc 5', en: 'Closing in on the dominant' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm sáu tăng** (augmented sixth chord) là một nhóm hợp âm tiền át đặc biệt. Hai nốt của nó cùng tiến về bậc 5 theo nửa cung: **bậc ♭6** (lowered 6) đi xuống, **bậc ♯4** (raised 4) đi lên.',
            en: '**Augmented sixth chords** are a special class of pre-dominant chords. Two of their notes approach scale degree 5 by half step at once: **♭6** from above and **♯4** from below.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab2+F#4 G2+G4', labels: ['♯4\n♭6', '5\n5'] },
        { type: 'play', notes: 'Ab2+F#4:h G2+G4:h', label: { vi: 'Nghe {Ab} và {F#} về {G}', en: 'Hear {Ab} and {F#} move to {G}' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong giọng {C}, bậc 5 là {G}: {Ab} xuống {G}, {F#} lên {G}.',
            en: 'In {C}, scale degree 5 is {G}: {Ab} falls to {G} and {F#} rises to {G}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} thứ, bậc ♯4 là nốt nào?', en: 'In {E} minor, which note is ♯4?' },
      answer: { type: 'key', note: 'A#' },
      reason: {
        vi: 'Bậc 4 của giọng {E} thứ là {A}; nâng lên nửa cung thành {A#}, ngay dưới bậc 5 {B}.',
        en: 'Degree 4 of {E} minor is {A}; raised a half step it is {A#}, just below 5, {B}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quãng 6 tăng', en: 'The augmented sixth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Từ {Ab} lên {F#} là quãng 6, rộng hơn quãng 6 trưởng nửa cung: một **quãng 6 tăng** (augmented sixth). Hai nốt mở ra hai phía thành quãng tám trên bậc 5. Hợp âm mang tên theo quãng này.',
            en: '{Ab} up to {F#} is a sixth, a half step wider than a major sixth: an **augmented sixth**. Its two notes open outward to an octave on 5. The chords take their name from this interval.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab3+F#4 G3+G4', labels: ['+6', '8'] },
        { type: 'keys', notes: 'Ab3 F#4', from: 'C3', octaves: 2, caption: { vi: 'Quãng 6 tăng trên phím đàn:', en: 'The augmented sixth on the keys:' } },
        { type: 'play', notes: 'Ab3+F#4:h G3+G4:h' },
        {
          type: 'tip',
          text: {
            vi: 'Trong giọng thứ, bậc 6 vốn đã hạ trong hóa biểu, nên ♭6 không cần thêm dấu giáng. Ở giọng {C} thứ, chỉ {F#} mang dấu hóa.',
            en: 'In minor, 6 is already lowered by the key signature, so ♭6 needs no flat. In {C} minor only the {F#} carries an accidental.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', notes: 'Ab3+F#4 G3+G4', labels: ['+6', '8'] },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Từ {Bb} lên {G#} là quãng gì?', en: 'What interval is {Bb} up to {G#}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Bb4+G#5' },
        { type: 'play', notes: 'Bb4+G#5:h A4+A5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6 tăng', en: 'Augmented sixth' }, correct: true },
          { text: { vi: 'Quãng 6 trưởng', en: 'Major sixth' } },
          { text: { vi: 'Quãng 7 thứ', en: 'Minor seventh' } },
        ],
      },
      reason: {
        vi: '{Bb} lên {G} là quãng 6 trưởng, và {G#} nới rộng thêm nửa cung, nên là quãng 6 tăng.',
        en: '{Bb} up to {G} is a major sixth, and {G#} widens it by a half step, so it is an augmented sixth.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Một hợp âm tiền át', en: 'A pre-dominant chord' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm iv6 trong giọng thứ cũng có bậc ♭6 ở bass đi xuống bậc 5. Nâng nốt {F} của nó lên {F#}, ta có hợp âm sáu tăng: giờ có hai nốt cùng kéo về V.',
            en: 'In minor, iv6 also has ♭6 in the bass, falling to 5. Raise its {F} to {F#} and you have an augmented sixth chord: now two notes pull toward V.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'Ab2+C4+F4+C5 G2+D4+G4+B4 || Ab2+C4+F#4+C5 G2+D4+G4+B4',
          labels: ['iv\n6', 'V', '+6', 'V'],
          highlight: [2],
        },
        { type: 'play', notes: 'Ab2+C4+F4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe iv6–V', en: 'Hear iv6–V' } },
        { type: 'play', notes: 'Ab2+C4+F#4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe hợp âm sáu tăng–V', en: 'Hear augmented sixth–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm sáu tăng thường đi đến hợp âm nào?', en: 'Which chord does an augmented sixth chord usually lead to?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV', en: 'IV' } },
          { text: { vi: 'V', en: 'V' }, correct: true },
          { text: { vi: 'vi', en: 'vi' } },
        ],
      },
      reason: {
        vi: 'Nó là hợp âm tiền át: bậc ♭6 và ♯4 cùng về bậc 5, nốt gốc của V.',
        en: 'It is a pre-dominant: ♭6 and ♯4 both move to 5, the root of V.',
      },
    },
  ],
} satisfies Lesson
