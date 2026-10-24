import type { Lesson } from '@/theory/types'

/** Book 18.2 (minor): the secondary diminished chords of iv, V, VI, VII and III; viiø7/III is spelled like iiø7 but goes to III. */
export default {
  id: 'in-minor',
  title: { vi: 'Hợp âm giảm phụ trong giọng thứ', en: 'Secondary diminished chords in minor' },
  minutes: 4,
  sources: [{ section: '18.2', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDiminishedChordsInMajorAndMinor.html' }],
  recap: [
    { vi: 'Trong giọng thứ, iv, V, VI, VII và III có hợp âm giảm phụ', en: 'In minor, iv, V, VI, VII and III have secondary diminished chords' },
    { vi: 'Không có vii°/III: nó chính là ii°', en: 'There is no vii°/III: it is ii°' },
    { vi: 'viiø7/III viết giống iiø7 nhưng đi về III, không về V', en: 'viiø7/III is spelled like iiø7 but goes to III, not to V' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Trong giọng {A} thứ', en: 'In {A} minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong giọng thứ, hợp âm giảm phụ dẫn vào iv, V, VI, VII và III. Quy tắc vẫn vậy: hợp âm thứ dùng vii°7, hợp âm trưởng dùng viiø7 (hoặc vii°7).',
            en: 'In a minor key, secondary diminished chords lead to iv, V, VI, VII and III. The rule is the same: minor triads take vii°7, major triads take viiø7 (or vii°7).',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          key: 'Am',
          notes: 'C#4+E4+G4+Bb4 D#4+F#4+A4+C5 E4+G4+Bb4+D5 F#4+A4+C5+E5',
          labels: ['vii°7\n/iv', 'vii°7\n/V', 'viiø7\n/VI', 'viiø7\n/VII'],
        },
        { type: 'play', notes: 'C#4+E4+G4+Bb4 D#4+F#4+A4+C5 E4+G4+Bb4+D5 F#4+A4+C5+E5' },
        {
          type: 'tip',
          text: {
            vi: 'V trong giọng thứ là hợp âm trưởng, nhưng vii°7/V vẫn rất hay gặp, như ở đây.',
            en: 'V in minor is a major triad, but vii°7/V is still very common, as here.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} thứ, nốt gốc của vii°7/iv là nốt nào?', en: 'In {A} minor, what is the root of vii°7/iv?' },
      answer: { type: 'key', note: 'C#' },
      reason: {
        vi: 'iv của giọng {A} thứ là {D} {F} {A}; nửa cung dưới {D} là {C#}.',
        en: 'iv in {A} minor is {D} {F} {A}; a half step below {D} is {C#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm của III', en: 'The chord of III' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'III của giọng {A} thứ là {C} {E} {G}, nên cảm âm của nó là {B}. Không có vii°/III, vì {B} {D} {F} chính là ii° của giọng.',
            en: 'III in {A} minor is {C} {E} {G}, so its leading tone is {B}. There is no vii°/III, because {B} {D} {F} is simply the key’s ii°.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'viiø7/III là {B} {D} {F} {A}: không có dấu hóa nào, giống hệt iiø7. Khác nhau ở chức năng: iiø7 là tiền át và đi về V, còn viiø7/III đi về III.',
            en: 'viiø7/III is {B} {D} {F} {A}: no accidentals, the same as iiø7. The difference is function: iiø7 is pre-dominant and goes to V, while viiø7/III goes to III.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Am', notes: 'B3+D4+F4+A4 C4+E4+G4 || B3+D4+F4+A4 E4+G#4+B4', labels: ['viiø7\n/III', 'III', 'iiø7', 'V'] },
        { type: 'play', notes: 'B3+D4+F4+A4 C4+E4+G4 B3+D4+F4+A4 E4+G#4+B4', label: { vi: 'Nghe về III, rồi về V', en: 'Hear it go to III, then to V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {A} thứ, hợp âm này giải về {C} {E} {G}. Nó là gì?', en: 'In {A} minor, this chord resolves to {C} {E} {G}. What is it?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Am', notes: 'B3+D4+F4+A4 C4+E4+G4', highlight: [0] }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'iiø7', en: 'iiø7' } },
          { text: { vi: 'viiø7/III', en: 'viiø7/III' }, correct: true },
          { text: { vi: 'vii°7/V', en: 'vii°7/V' } },
        ],
      },
      reason: {
        vi: 'Cùng các nốt với iiø7, nhưng nó dẫn về III, nên ta gọi là viiø7/III.',
        en: 'It has the same notes as iiø7, but it leads to III, so we call it viiø7/III.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} thứ, nốt gốc của vii°7/V là nốt nào?', en: 'In {D} minor, what is the root of vii°7/V?' },
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'V của giọng {D} thứ là {A} {C#} {E}; nửa cung dưới {A} là {G#}.',
        en: 'V in {D} minor is {A} {C#} {E}; a half step below {A} is {G#}.',
      },
    },
  ],
} satisfies Lesson
