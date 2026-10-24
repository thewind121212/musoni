import type { Lesson } from '@/theory/types'

/**
 * Book 29.4: ♯4 rises to 5 (to V and to the cadential six-four), ♯2 and ♯4
 * rise in the enharmonic German sixth, ♯4 falls to ♮4 when the chord goes to
 * V7, and any other resolution simply moves smoothly.
 */
export default {
  id: 'augmented-sixths',
  title: { vi: 'Hợp âm sáu tăng', en: 'Augmented sixth chords' },
  minutes: 5,
  sources: [{ section: '29.4', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingAugmentedSixthChords.html' }],
  recap: [
    { vi: '♯4 hầu như luôn đi lên bậc 5', en: '♯4 almost always rises to 5' },
    { vi: 'Đến hợp âm 6/4 kết, ♯4 cũng lên bậc 5', en: 'To the cadential six-four, ♯4 also rises to 5' },
    { vi: 'EnGer+6 ở giọng trưởng: ♯2 và ♯4 cùng đi lên', en: 'EnGer+6 in major: ♯2 and ♯4 both rise' },
    { vi: 'Đến V7: ♯4 xuống ♮4, nốt bảy của V7', en: 'To V7: ♯4 falls to ♮4, the seventh of V7' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: '♯4 đi lên bậc 5', en: '♯4 rises to 5' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cả ba hợp âm sáu tăng (**hợp âm sáu tăng Ý / Pháp / Đức**, Italian / French / German augmented sixth) đều có ♯4, dấu hóa nổi bật nhất. ♯4 hầu như luôn đi lên bậc 5.',
            en: 'All three augmented sixth chords (the **Italian / French / German augmented sixth**) hold ♯4, their most salient accidental. ♯4 almost always rises to 5.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} thứ, {F#} lên {G}, còn {Ab} ở bass xuống {G}: quãng 6 tăng mở ra thành quãng tám.',
            en: 'In {C} minor, {F#} rises to {G} while {Ab} in the bass falls to {G}: the augmented sixth opens out to an octave.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', time: '4/4', notes: 'Ab2+C4@b+F4+C5:q Ab2+C4@b+F#4+C5:q G2+D4@b+G4+B4:h ||', labels: ['iv6', 'It+6', 'V'], highlight: [1] },
        { type: 'play', notes: 'Ab2+C4+F4+C5:q Ab2+C4+F#4+C5:q G2+D4+G4+B4:h', label: { vi: 'Nghe iv6–It+6–V', en: 'Hear iv6–It+6–V' } },
        {
          type: 'tip',
          text: {
            vi: 'Hợp âm sáu tăng Ý chỉ có ba nốt, nên ở bốn bè hãy nhân đôi chủ âm, ở đây là {C}.',
            en: 'The Italian sixth has only three notes, so in four parts double the tonic, here {C}.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {A} thứ, hợp âm sáu tăng có ♯4 là {D#}. Đến V, {D#} đi đến nốt nào?', en: 'In {A} minor, the augmented sixth chord’s ♯4 is {D#}. Going to V, where does {D#} go?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: '♯4 đi lên bậc 5: {D#} lên {E}, nốt gốc của V.',
        en: '♯4 rises to 5: {D#} goes up to {E}, the root of V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đến hợp âm 6/4 kết', en: 'To the cadential six-four' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '♯4 cũng đi lên bậc 5 khi hợp âm sáu tăng đi đến **hợp âm 6/4 kết** (cadential six-four). Hợp âm sáu tăng Đức hay đi đường này, vì đi thẳng đến V dễ tạo quãng 5 song song.',
            en: '♯4 also rises to 5 when an augmented sixth chord goes to the **cadential six-four**. The German sixth often takes this path, since going straight to V easily makes parallel fifths.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', time: '4/4', notes: 'Ab2+Eb3+F#4+C5:q G2+Eb3+G4+C5:q G2+D3+G4+B4:h ||', labels: ['Ger+6', 'i\n6\n4', 'V'], highlight: [0] },
        { type: 'play', notes: 'Ab2+Eb3+F#4+C5:q G2+Eb3+G4+C5:q G2+D3+G4+B4:h', label: { vi: 'Nghe Ger+6–i6/4–V', en: 'Hear Ger+6–i6/4–V' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm Đức trùng âm', en: 'The enharmonic German sixth' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng trưởng, hợp âm sáu tăng Đức có thể viết trùng âm (EnGer+6): ♭6, 1, ♯2 và ♯4. Khi đến I6/4, cả ♯2 và ♯4 đều đi lên.',
            en: 'In a major key, the German sixth can be spelled enharmonically (EnGer+6): ♭6, 1, ♯2 and ♯4. Going to I6/4, both ♯2 and ♯4 rise.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} trưởng, {D#} lên {E} và {F#} lên {G}, hai nốt của I6/4.',
            en: 'In {C} major, {D#} rises to {E} and {F#} to {G}, both notes of I6/4.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'Ab2+C4@b+F#4+D#5:q G2+C4@b+G4+E5:q G2+B3+G4+D5:h ||', labels: ['EnGer\n+6', 'I\n6\n4', 'V'], highlight: [0] },
        { type: 'play', notes: 'Ab2+C4+F#4+D#5:q G2+C4+G4+E5:q G2+B3+G4+D5:h', label: { vi: 'Nghe EnGer+6–I6/4–V', en: 'Hear EnGer+6–I6/4–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, EnGer+6 là {Eb}–{G}–{A#}–{C#}. Đến I6/4, {A#} đi đến nốt nào?', en: 'In {G} major, EnGer+6 is {Eb}–{G}–{A#}–{C#}. Going to I6/4, where does {A#} go?' },
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: '{A#} là ♯2, nên nó đi lên {B}, nốt ba của I6/4 ({D}–{G}–{B}).',
        en: '{A#} is ♯2, so it rises to {B}, the third of I6/4 ({D}–{G}–{B}).',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ngoại lệ: đến V7', en: 'The exception: to V7' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ngoại lệ: khi hợp âm sáu tăng đi đến V7, ♯4 đi xuống ♮4, nốt bảy của V7. Ở đây {F#} xuống {F}.',
            en: 'The exception: when an augmented sixth chord goes to V7, ♯4 falls to ♮4, the seventh of V7. Here {F#} falls to {F}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nếu hợp âm sáu tăng đi đến hợp âm khác ngoài V, V7 hay i6/4, hãy dẫn mọi bè thật mượt, tránh quãng 5, quãng 8 song song và nhân đôi cho đúng.',
            en: 'If an augmented sixth chord goes anywhere other than V, V7 or i6/4, move every voice smoothly, avoid parallel fifths and octaves, and use proper doublings.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'Cm', time: '4/4', notes: 'Ab2+F#3+D4+C5:h G2+F3+D4+B4:h ||', labels: ['Fr+6', 'V7'], highlight: [1] },
        { type: 'play', notes: 'Ab2+F#3+D4+C5:h G2+F3+D4+B4:w', label: { vi: 'Nghe Fr+6–V7', en: 'Hear Fr+6–V7' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {E} thứ, hợp âm sáu tăng Pháp đi đến V7. ♯4 là {A#}; nó đi đến nốt nào?', en: 'In {E} minor, a French sixth goes to V7. Its ♯4 is {A#}; where does it go?' },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Đến V7, ♯4 đi xuống ♮4: {A#} xuống {A}, nốt bảy của V7 ({B}–{D#}–{F#}–{A}).',
        en: 'To V7, ♯4 falls to ♮4: {A#} goes down to {A}, the seventh of V7 ({B}–{D#}–{F#}–{A}).',
      },
    },
  ],
} satisfies Lesson
