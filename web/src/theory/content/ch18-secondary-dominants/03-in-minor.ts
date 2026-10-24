import type { Lesson } from '@/theory/types'

/**
 * Book 17.3, minor half: the secondary dominants in C minor, the ones already
 * diatonic (V/III = VII, V/VI = III, B♭7 as V7/III or VII7), VII against vii°,
 * and the F chord as V/VII or IV. No practice link: no drill asks them.
 */
export default {
  id: 'in-minor',
  title: { vi: 'Át phụ ở giọng thứ', en: 'Secondary dominants in minor' },
  minutes: 5,
  sources: [{ section: '17.3', url: 'https://musictheory.pugetsound.edu/mt21c/SecondaryDominantsInMajorAndMinor.html' }],
  recap: [
    { vi: 'Giọng thứ ly điệu III, iv, V, VI và VII', en: 'Minor tonicizes III, iv, V, VI and VII' },
    { vi: 'V/III là VII và V/VI là III: không có nốt biến âm', en: 'V/III is VII and V/VI is III: no chromatic note' },
    { vi: 'B♭7 ở giọng {C} thứ ghi V7/III hay VII7 đều đúng', en: 'In {C} minor, B♭7 is correctly V7/III or VII7' },
    { vi: 'F ở giọng {C} thứ: V/VII nếu đi tới B♭, IV nếu đi tới V', en: 'F in {C} minor: V/VII if it goes to B♭, IV if it goes to V' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Năm hợp âm có thể ly điệu', en: 'Five chords to tonicize' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở giọng {C} thứ, các hợp âm thuận giọng là i, ii°, III, iv, V, VI, VII và vii°. Bỏ i và hai hợp âm giảm, còn năm hợp âm có thể ly điệu: III, iv, V, VI và VII.',
            en: 'In {C} minor the diatonic chords are i, ii°, III, iv, V, VI, VII and vii°. Leave out i and the two diminished chords and five chords can be tonicized: III, iv, V, VI and VII.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'Bb4+D5+F5 C4+E4+G4 D4+F#4+A4 Eb4+G4+Bb4 F4+A4+C5', labels: ['V/III', 'V/iv', 'V/V', 'V/VI', 'V/VII'] },
        {
          type: 'play',
          notes: 'Bb4+D5+F5 Eb4+G4+Bb4 C4+E4+G4 F4+Ab4+C5 D4+F#4+A4 G4+B4+D5 Eb4+G4+Bb4 Ab4+C5+Eb5 F4+A4+C5 Bb4+D5+F5',
          label: { vi: 'Nghe mỗi hợp âm về đích', en: 'Hear each one resolve' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} thứ, V/iv có nốt gốc {C} và nốt năm {G}. Nốt ba của nó là nốt nào?', en: 'In {C} minor, V/iv has root {C} and fifth {G}. What is its third?' },
      answer: { type: 'key', note: 'E', blackKeys: 'b' },
      reason: {
        vi: 'iv là hợp âm {F} thứ; át âm của {F} là {C}–{E}–{G}, nên {Eb} của giọng được nâng lên thành {En}, cảm âm của {F}.',
        en: 'iv is the {F} minor chord; the dominant of {F} is {C}–{E}–{G}, so the key\'s {Eb} is raised to {En}, the leading tone of {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Át phụ có sẵn trong giọng', en: 'Secondary dominants already in the key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai át phụ ba nốt ở giọng thứ không có nốt biến âm: V/III chính là VII (B♭) và V/VI chính là III (E♭). Ở bản bảy, V7/VI là E♭7 và cần nốt hạ {Db}.',
            en: 'Two secondary dominant triads in minor have no chromatic note: V/III is VII (B♭) and V/VI is III (E♭). As a seventh chord, V7/VI is E♭7 and needs a lowered {Db}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'B♭7 vẫn thuận giọng, nên ghi V7/III hay VII7 đều đúng: cả hai đều đi tới III.',
            en: 'B♭7 stays diatonic, so it can be labeled V7/III or VII7: both progress to III.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'Bb4+D5+F5+Ab5 Eb4+G4+Bb4 Eb4+G4+Bb4+Db5 Ab4+C5+Eb5', labels: ['V7/III', 'III', 'V7/VI', 'VI'] },
        { type: 'play', notes: 'Bb4+D5+F5+Ab5 Eb4+G4+Bb4 Eb4+G4+Bb4+Db5 Ab4+C5+Eb5' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'VII và vii°', en: 'VII and vii°' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giọng thứ có cả vii° (trên bậc 7 nâng) lẫn VII (trên bậc 7 tự nhiên). VII có thể được ly điệu bằng V7/VII, còn vii° là hợp âm giảm nên không.',
            en: 'Minor has both vii° (on the raised 7th degree) and the subtonic VII (on the lowered 7th). VII can be tonicized with V7/VII; vii°, being diminished, cannot.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Vì vậy hợp âm F ở giọng {C} thứ là V/VII khi nó đi tới B♭. Khi nó mang chức năng tiền át và đi tới G hay B°, ta ghi là IV.',
            en: 'So an {F} major chord in {C} minor is V/VII when it goes to B♭. When it has pre-dominant function and goes to G or B°, label it IV.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'F4+A4+C5 Bb4+D5+F5 | F4+A4+C5 G4+B4+D5', labels: ['V/VII', 'VII', 'IV', 'V'] },
        { type: 'play', notes: 'F4+A4+C5:q Bb4+D5+F5:h R:q F4+A4+C5:q G4+B4+D5:h', label: { vi: 'Nghe hai cách đi', en: 'Hear both paths' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} thứ, hợp âm F đi tới G rồi về Cm. Ghi F là gì?', en: 'In {C} minor, an F chord goes to G and then Cm. How is the F labeled?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'Cm', notes: 'F4+A4+C5 G4+B4+D5 G4+C5+Eb5' },
        { type: 'play', notes: 'F4+A4+C5:h G4+B4+D5:h G4+C5+Eb5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V/VII', en: 'V/VII' } },
          { text: { vi: 'IV', en: 'IV' }, correct: true },
          { text: { vi: 'iv', en: 'iv' } },
        ],
      },
      reason: {
        vi: 'Hợp âm {F} trưởng đi tới V với chức năng tiền át, nên ghi IV; nó chỉ là V/VII khi đi tới B♭.',
        en: 'The {F} major chord goes to V with pre-dominant function, so it is IV; it is V/VII only when it goes to B♭.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} thứ, hợp âm nào không thể được ly điệu?', en: 'In {C} minor, which chord cannot be tonicized?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'III', en: 'III' } },
          { text: { vi: 'VI', en: 'VI' } },
          { text: { vi: 'ii°', en: 'ii°' }, correct: true },
        ],
      },
      reason: {
        vi: 'ii° ({D}–{F}–{Ab}) là hợp âm giảm, nên không thể làm chủ âm tạm thời.',
        en: 'ii° ({D}–{F}–{Ab}) is diminished, so it cannot act as a passing tonic.',
      },
    },
  ],
} satisfies Lesson
