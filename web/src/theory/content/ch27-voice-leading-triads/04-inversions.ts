import type { Lesson } from '@/theory/types'

/** Book 26.8, 26.9 and 26.12: doubling in first- and second-inversion triads, and the summary of doubling rules. */
export default {
  id: 'inversions',
  title: { vi: 'Nhân đôi ở thế đảo', en: 'Doubling in inversions' },
  minutes: 5,
  sources: [
    { section: '26.8', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingFirstInversionTriads.html' },
    { section: '26.9', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingSecondInversionTriads.html' },
    { section: '26.12', url: 'https://musictheory.pugetsound.edu/mt21c/SummaryOfDoublingRules.html' },
  ],
  practice: { drill: 'chords', level: 4, durationSec: 60 },
  recap: [
    { vi: 'Thế gốc: nhân đôi nốt bass', en: 'Root position: double the bass' },
    { vi: 'Thế đảo 1: không nhân đôi nốt bass, trừ vii°6 và ii°6', en: 'First inversion: do not double the bass, except vii°6 and ii°6' },
    { vi: 'Không bao giờ nhân đôi cảm âm, nốt ba của V', en: 'Never double the leading tone, the 3rd of V' },
    { vi: 'Thế đảo 2: nhân đôi nốt bass, tức nốt năm', en: 'Second inversion: double the bass, the fifth' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Thế đảo 1', en: 'First inversion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khác với thế gốc, ở hợp âm ba thế đảo 1 đừng nhân đôi nốt bass (nốt ba). Hãy nhân đôi nốt gốc hoặc nốt năm, chọn nốt nào đến và đi êm hơn.',
            en: 'Unlike root position, do not double the bass note (the 3rd) of a first-inversion triad. Double the root or the fifth, whichever can be approached and left more smoothly.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cả hai đều là I6: hợp âm 1 nhân đôi nốt gốc {C}, hợp âm 2 nhân đôi nốt năm {G}.',
            en: 'Both are I6: chord 1 doubles the root, {C}; chord 2 doubles the fifth, {G}.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'E3+G3+C4+C5 E3+G3+C4+G4', labels: ['1', '2'] },
        { type: 'play', notes: 'E3+G3+C4+C5:h E3+G3+C4+G4:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, hợp âm IV6 không nên nhân đôi nốt nào?', en: 'In {C} major, which note should IV6 not double?' },
      answer: { type: 'key', note: 'A', blackKeys: 'b' },
      reason: {
        vi: 'IV6 là {F}–{A}–{C} với nốt ba {A} ở bass; ở thế đảo 1 không nhân đôi nốt bass.',
        en: 'IV6 is {F}–{A}–{C} with its 3rd, {A}, in the bass; a first-inversion chord does not double its bass.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khi nào nhân đôi nốt ba', en: 'When to double the third' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Với hợp âm giảm thế đảo 1 (vii°6, ii°6), luôn nhân đôi nốt ba, tức nốt bass, chứ không nhân đôi nốt gốc hay nốt năm. Ở I–vii°6–I6 này, vii°6 nhân đôi {D}.',
            en: 'In a diminished triad in first inversion (vii°6, ii°6), always double the 3rd, the bass, not the root or fifth. In this I–vii°6–I6, vii°6 doubles {D}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Không bao giờ nhân đôi nốt ba của V, vì đó là cảm âm (bậc 7).',
            en: 'Never double the 3rd of V, because it is the leading tone (7).',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+G3+E4+C5 D3+F3+D4+B4 E3+G3+C4+C5', labels: ['I', 'vii°\n6', 'I\n6'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+C5:h D3+F3+D4+B4:h E3+G3+C4+C5:w' },
        {
          type: 'tip',
          text: {
            vi: 'Khi nhiều hợp âm thế đảo 1 đi liền nhau, xen kẽ: một hợp âm nhân đôi nốt ba, hợp âm sau thì không. Nốt ba cũng có thể nhân đôi khi hai bè đến nó theo hai hướng ngược nhau.',
            en: 'In a row of first-inversion chords, alternate: one doubles the 3rd, the next does not. The 3rd may also be doubled when the two parts approach it from opposite directions.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, hợp âm V6 không được nhân đôi nốt nào?', en: 'In {G} major, which note must V6 never double?' },
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'V là {D}–{F#}–{A}; {F#} vừa là nốt bass của V6 vừa là cảm âm, nên không bao giờ nhân đôi.',
        en: 'V is {D}–{F#}–{A}; {F#} is both the bass of V6 and the leading tone, so it is never doubled.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Thế đảo 2 và tóm tắt', en: 'Second inversion and a summary' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở hợp âm ba thế đảo 2, nhân đôi nốt năm, tức nốt bass. Ở I6/4 này, bass và tenor cùng hát {G}.',
            en: 'In a second-inversion triad, double the fifth, the bass note. In this I6/4, the bass and tenor both sing {G}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Tóm lại: thế gốc nhân đôi nốt bass. Thế đảo 1 không nhân đôi nốt bass, trừ vii°6 và ii°6. Thế đảo 2 nhân đôi nốt bass.',
            en: 'In short: root position, double the bass. First inversion, do not double the bass, except vii°6 and ii°6. Second inversion, double the bass.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'G2+G3+E4+C5 G2+G3+D4+B4 C3+G3+E4+C5', labels: ['I\n6\n4', 'V', 'I'], highlight: [0] },
        { type: 'play', notes: 'G2+G3+E4+C5:h G2+G3+D4+B4:h C3+G3+E4+C5:w' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, hợp âm IV6/4 nhân đôi nốt nào?', en: 'In {F} major, which note does IV6/4 double?' },
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'IV là {Bb}–{D}–{F}; ở thế đảo 2, nốt năm {F} ở bass và được nhân đôi.',
        en: 'IV is {Bb}–{D}–{F}; in second inversion its fifth, {F}, is in the bass and is doubled.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào nhân đôi nốt bass?', en: 'Which chord doubles its bass note?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV6', en: 'IV6' } },
          { text: { vi: 'ii°6', en: 'ii°6' }, correct: true },
          { text: { vi: 'V6', en: 'V6' } },
        ],
      },
      reason: {
        vi: 'ii°6 là hợp âm giảm thế đảo 1, nên nhân đôi nốt ba ở bass; IV6 và V6 thì không.',
        en: 'ii°6 is a diminished triad in first inversion, so it doubles the 3rd in the bass; IV6 and V6 do not.',
      },
    },
  ],
} satisfies Lesson
