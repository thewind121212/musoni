import type { Lesson } from '@/theory/types'

/**
 * Book 30.7: a four-measure invention exposition after Bach's two-part
 * inventions (I-I-V-V-I; theme, an octave lower, a 5th higher, an octave
 * lower again, ending on a 10th), altering the theme, and counterpoint that
 * brings out the harmony. The theme and its counterpoint are our own; the
 * counterpoint moves note against note with the theme, since a staff event
 * has one rhythm.
 */
export default {
  id: 'invention',
  title: { vi: 'Phần trình bày của invention', en: 'Invention expositions' },
  minutes: 5,
  sources: [{ section: '30.7', url: 'https://musictheory.pugetsound.edu/mt21c/InventionExpositions.html' }],
  recap: [
    { vi: 'Phần trình bày invention đi theo I–I–V–V–I', en: 'An invention exposition follows I–I–V–V–I' },
    { vi: 'Chủ đề ở ô 1, rồi thấp một quãng 8 ở bè dưới ở ô 2', en: 'The theme in measure 1, then an octave lower in the bass in measure 2' },
    { vi: 'Ô 3 cao hơn quãng 5 đúng, ô 4 là ô 3 thấp một quãng 8', en: 'Measure 3 a perfect 5th higher, measure 4 is measure 3 an octave lower' },
    { vi: 'Kết thúc bằng quãng 10; đối âm làm rõ hòa âm', en: 'End on a 10th; the counterpoint brings out the harmony' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Invention của Bach', en: 'Bach’s inventions' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các **invention** (khúc phát minh) hai bè của Bach vừa là bài tập phím đàn, vừa là mẫu dạy sáng tác. Ta viết **phần trình bày** (exposition) bốn ô nhịp của một invention, theo mẫu invention số 1 giọng {C} trưởng và số 7 giọng {E} thứ.',
            en: 'Bach’s two-part **inventions** were keyboard studies and also models of how to compose. We write a four-measure invention **exposition**, modelled on his invention number 1 in {C} major and number 7 in {E} minor.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Phần trình bày ghép đối âm với hòa âm theo tiến trình I–I–V–V–I. Ô 1 là **chủ đề** (theme) một mình ở bè trên.',
            en: 'The exposition joins counterpoint to harmony, following I–I–V–V–I. Measure 1 is the **theme** alone in the upper voice.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4:8 D4:8 E4:8 C4:8 F4:q E4:q ||' },
        { type: 'play', notes: 'C4:8 D4:8 E4:8 C4:8 F4:q E4:q', label: { vi: 'Nghe chủ đề', en: 'Hear the theme' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Ô 2: chủ đề ở bè dưới', en: 'Measure 2: the theme in the bass' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở ô 2, chủ đề xuống một quãng 8, sang bè dưới. Bè trên viết đối âm cho nó; khác đối âm loài, đối âm ở đây phải làm rõ hòa âm của ô nhịp, ở đây là hợp âm I.',
            en: 'In measure 2 the theme moves down an octave into the lower voice. The upper voice writes counterpoint against it; unlike species counterpoint, it must bring out the measure’s harmony, here the I chord.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C4:8 D4:8 E4:8 C4:8 F4:q E4:q | C3+G4:8 D3+F4:8 E3+E4:8 C3+G4:8 F3+A4:q E3+C5:q ||',
        },
        {
          type: 'play',
          notes: 'C4:8 D4:8 E4:8 C4:8 F4:q E4:q C3+G4:8 D3+F4:8 E3+E4:8 C3+G4:8 F3+A4:q E3+C5:q',
          label: { vi: 'Nghe ô 1 và ô 2', en: 'Hear measures 1 and 2' },
          bpm: 80,
        },
        {
          type: 'tip',
          text: {
            vi: 'Một ô có thể chứa **hòa âm nhỏ** (microharmonies) như I–IV–I hay I–vii°6–I, dù hợp âm chính của ô vẫn là I.',
            en: 'A measure may hold **microharmonies** such as I–IV–I or I–vii°6–I, even though its main chord is still I.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở ô 3, chủ đề cao hơn ô 1 một quãng 5 đúng. Chủ đề ô 3 bắt đầu bằng nốt nào?',
        en: 'In measure 3 the theme is a perfect 5th higher than in measure 1. Which note does it start on?',
      },
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Chủ đề bắt đầu bằng {C4}; cao hơn quãng 5 đúng là {G4}, nốt gốc của hợp âm V.',
        en: 'The theme starts on {C4}; a perfect 5th higher is {G4}, the root of the V chord.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ô 3 đến ô 5', en: 'Measures 3 to 5' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ô 3: chủ đề cao hơn quãng 5 đúng, trên hợp âm V. Ô 4: chép ô 3 thấp một quãng 8, sang bè dưới. Ô 5 kết thúc bằng quãng 10: chủ âm ở bè dưới, bậc 3 ở bè trên.',
            en: 'Measure 3: the theme a perfect 5th higher, over the V chord. Measure 4: measure 3 an octave lower, in the lower voice. Measure 5 ends on a 10th: the tonic in the bass and degree 3 on top.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'G3+G4:8 F3+A4:8 G3+B4:8 B2+G4:8 A2+C5:q G2+B4:q | G3+G4:8 A3+C5:8 B3+B4:8 G3+D5:8 C4@b+E5:q B3+D5:q | C4@b+E5:w ||',
        },
        {
          type: 'play',
          notes: 'C4:8 D4:8 E4:8 C4:8 F4:q E4:q C3+G4:8 D3+F4:8 E3+E4:8 C3+G4:8 F3+A4:q E3+C5:q G3+G4:8 F3+A4:8 G3+B4:8 B2+G4:8 A2+C5:q G2+B4:q G3+G4:8 A3+C5:8 B3+B4:8 G3+D5:8 C4+E5:q B3+D5:q C4+E5:w',
          label: { vi: 'Nghe cả phần trình bày', en: 'Hear the whole exposition' },
          bpm: 80,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Phần trình bày kết thúc bằng quãng nào giữa hai bè?', en: 'Which interval between the voices ends the exposition?' },
      blocks: [{ type: 'staff', clef: 'grand', notes: 'B3+D5:q | C4@b+E5:w ||' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 10: chủ âm ở dưới, bậc 3 ở trên', en: 'A 10th: tonic below, degree 3 on top' }, correct: true },
          { text: { vi: 'Quãng 8: chủ âm ở cả hai bè', en: 'An octave: tonic in both voices' } },
          { text: { vi: 'Quãng 5: chủ âm ở dưới, bậc 5 ở trên', en: 'A 5th: tonic below, degree 5 on top' } },
        ],
      },
      reason: {
        vi: 'Ô cuối là {C4} ở bè dưới và {E5} ở bè trên: một quãng 10, chủ âm và bậc 3.',
        en: 'The last measure has {C4} in the lower voice and {E5} on top: a 10th, tonic and degree 3.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Sửa chủ đề cho hợp hòa âm', en: 'Altering the theme to fit' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một chủ đề đi tự nhiên từ I đến V có khi phải sửa đường nét ở ô 4 sang ô 5, để cuối ô 4 nhấn vào V. Sửa càng ít nốt càng tốt.',
            en: 'A theme that leads naturally from I to V may need its contour changed from measure 4 to 5, so the end of measure 4 stresses V. Change as few notes as possible.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng thứ, khi chủ đề có bậc 2 và bậc 3 hạ được dịch lên quãng 5, chúng thành bậc 6 và bậc 7 nâng, như gam thứ giai điệu. Bậc 7 nâng là nốt ba của V.',
            en: 'In minor, when a theme with degrees 2 and ♭3 is moved up a 5th, they become raised 6 and raised 7, as in the melodic minor scale. Raised 7 is the third of V.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4:8 B4:8 C5:q || E5:8 F#5:8 G#5:q ||', labels: ['1', '2', '♭3', '5', '↑6', '↑7'], highlight: [4, 5] },
        { type: 'play', notes: 'A4:8 B4:8 C5:q R:q E5:8 F#5:8 G#5:q', label: { vi: 'Nghe ở giọng {A} thứ', en: 'Hear it in {A} minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {E} thứ, chủ đề có nốt {G} (bậc 3 hạ). Ở ô 3, lên quãng 5, nốt ấy thành nốt nào?',
        en: 'In {E} minor, a theme has {G} (♭3). In measure 3, up a 5th, which note does it become?',
      },
      answer: { type: 'key', note: 'D#' },
      reason: {
        vi: 'Bậc 3 hạ lên quãng 5 thành bậc 7 nâng: {D#}, nốt ba của hợp âm V ({B}–{D#}–{F#}).',
        en: 'The ♭3 moved up a 5th becomes raised 7: {D#}, the third of the V chord ({B}–{D#}–{F#}).',
      },
    },
  ],
} satisfies Lesson
