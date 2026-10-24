import type { Lesson } from '@/theory/types'

/**
 * Book 21.2: the Italian, French and German augmented sixths and the
 * enharmonic German in major, with 21.5's point that the German often goes
 * through the cadential 6/4. No practice link: no drill asks these chords.
 */
export default {
  id: 'three-types',
  title: { vi: 'Ý, Pháp và Đức', en: 'Italian, French and German' },
  minutes: 5,
  sources: [
    { section: '21.2', url: 'https://musictheory.pugetsound.edu/mt21c/TypesOfAugmentedSixthChords.html' },
    { section: '21.5', url: 'https://musictheory.pugetsound.edu/mt21c/ExamplesWithAugmentedSixthChords.html' },
  ],
  recap: [
    { vi: 'Hợp âm Ý: ♭6, ♯4 và 1', en: 'Italian: ♭6, ♯4 and 1' },
    { vi: 'Hợp âm Pháp thêm bậc 2, hợp âm Đức thêm bậc ♭3', en: 'The French adds 2, the German adds ♭3' },
    { vi: 'Hợp âm Đức hay đi qua i6/4 rồi mới về V', en: 'The German often goes through i6/4 before V' },
    { vi: 'Hợp âm Đức trùng âm viết ♯2, chỉ có trong giọng trưởng', en: 'The enharmonic German spells ♯2, and only in major' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hợp âm sáu tăng Ý', en: 'The Italian augmented sixth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mọi hợp âm sáu tăng đều có bậc ♭6 và ♯4. **Hợp âm sáu tăng Ý** (Italian augmented sixth), viết It+6, thêm bậc 1. Khi viết bốn bè, bậc 1 được nhân đôi.',
            en: 'Every augmented sixth chord has ♭6 and ♯4. The **Italian augmented sixth**, written It+6, adds 1. In four parts, 1 is doubled.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab2+C4+F#4+C5 G2+D4+G4+B4', labels: ['It+6', 'V'] },
        { type: 'play', notes: 'Ab2+C4+F#4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe It+6–V', en: 'Hear It+6–V' } },
        {
          type: 'tip',
          text: {
            vi: 'Không ai biết vì sao ba hợp âm mang tên Ý, Pháp và Đức. Đó chỉ là những cái tên đã quen dùng.',
            en: 'No one knows why the three chords are called Italian, French and German. The names have simply stuck.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm sáu tăng Pháp', en: 'The French augmented sixth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm sáu tăng Pháp** (French augmented sixth), viết Fr+6, thêm bậc 2 vào ba nốt của hợp âm Ý. Trong giọng {C} thứ đó là {Ab}, {C}, {D} và {F#}.',
            en: 'The **French augmented sixth**, written Fr+6, adds 2 to the Italian’s three notes. In {C} minor that is {Ab}, {C}, {D} and {F#}.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab2+D4+F#4+C5 G2+D4+G4+B4', labels: ['Fr+6', 'V'], highlight: [0] },
        { type: 'play', notes: 'Ab2+D4+F#4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe Fr+6–V', en: 'Hear Fr+6–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trong giọng {A} thứ, hợp âm Pháp thêm nốt nào vào {F}, {D#} và {A}?',
        en: 'In {A} minor, which note does the French add to {F}, {D#} and {A}?',
      },
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: 'Hợp âm Pháp thêm bậc 2, và bậc 2 của giọng {A} thứ là {B}.',
        en: 'The French adds 2, and degree 2 of {A} minor is {B}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm sáu tăng Đức', en: 'The German augmented sixth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm sáu tăng Đức** (German augmented sixth), viết Ger+6, thêm bậc ♭3 vào hợp âm Ý: {Ab}, {C}, {Eb}, {F#}. Nó hay đi qua i6/4 rồi mới về V, để tránh hai quãng 5 song song.',
            en: 'The **German augmented sixth**, written Ger+6, adds ♭3 to the Italian: {Ab}, {C}, {Eb}, {F#}. It often moves through i6/4 before V, which avoids parallel fifths.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab2+Eb4+F#4+C5 G2+Eb4+G4+C5 G2+D4+G4+B4', labels: ['Ger+6', 'i\n6\n4', 'V'], highlight: [0] },
        { type: 'play', notes: 'Ab2+Eb4+F#4+C5:h G2+Eb4+G4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe Ger+6–i6/4–V', en: 'Hear Ger+6–i6/4–V' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong giọng trưởng cũng vậy: Rossini đưa Ger+6 đến I6/4 trong khúc mở màn vở William Tell (1829).',
            en: 'Major keys do the same: Rossini takes a Ger+6 to I6/4 in his William Tell Overture (1829).',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {E} thứ, đây là hợp âm sáu tăng nào?', en: 'In {E} minor, which augmented sixth is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'C3+E4+G4+A#4' },
        { type: 'play', notes: 'C3+E4+G4+A#4:h B2+E4+G4+B4:h B2+D#4+F#4+B4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ý (It+6)', en: 'Italian (It+6)' } },
          { text: { vi: 'Pháp (Fr+6)', en: 'French (Fr+6)' } },
          { text: { vi: 'Đức (Ger+6)', en: 'German (Ger+6)' }, correct: true },
        ],
      },
      reason: {
        vi: 'Ngoài {C} (♭6), {A#} (♯4) và {E} (1), hợp âm còn có {G}, bậc ♭3 của giọng {E} thứ.',
        en: 'Besides {C} (♭6), {A#} (♯4) and {E} (1), the chord has {G}, ♭3 in {E} minor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm Đức trùng âm', en: 'The enharmonic German' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng trưởng, hợp âm Đức thường viết bậc ♭3 thành bậc ♯2: {Eb} thành {D#}, vì {D#} đi lên {E}, nốt ba của I6/4. Hợp âm này gọi là **hợp âm sáu tăng Đức trùng âm** (enharmonic German augmented sixth), viết EnGer+6, và chỉ có trong giọng trưởng.',
            en: 'In major, the German often spells ♭3 as ♯2: {Eb} becomes {D#}, because {D#} rises to {E}, the third of I6/4. This is the **enharmonic German augmented sixth**, written EnGer+6, and it occurs only in major.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab2+D#4+F#4+C5 G2+E4+G4+C5 G2+D4+G4+B4', labels: ['EnGer\n+6', 'I\n6\n4', 'V'], highlight: [0] },
        { type: 'play', notes: 'Ab2+D#4+F#4+C5:h G2+E4+G4+C5:h G2+D4+G4+B4:h', label: { vi: 'Nghe EnGer+6–I6/4–V', en: 'Hear EnGer+6–I6/4–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Trong giọng {F} trưởng, hợp âm Đức trùng âm có bậc ♯2. Đó là nốt nào?',
        en: 'In {F} major, the enharmonic German has ♯2. Which note is it?',
      },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Bậc 2 của giọng {F} trưởng là {G}; nâng lên thành {G#}, đi lên {A}, nốt ba của I6/4.',
        en: 'Degree 2 of {F} major is {G}; raised it is {G#}, which rises to {A}, the third of I6/4.',
      },
    },
  ],
} satisfies Lesson
