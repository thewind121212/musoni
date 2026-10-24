import type { Lesson } from '@/theory/types'

/**
 * Book 25.1.1: the diagram of sonata form (exposition, development,
 * recapitulation), its key plan in major and minor, and its two repeats.
 * The book's diagram is an image; it is given here as text, and the themes
 * are our own.
 */
export default {
  id: 'sonata-form',
  title: { vi: 'Hình thức sonata', en: 'Sonata form' },
  minutes: 5,
  sources: [{ section: '25.1', url: 'https://musictheory.pugetsound.edu/mt21c/SonataIntroduction.html' }],
  recap: [
    { vi: 'Sonata có ba phần: trình bày, phát triển, tái hiện', en: 'A sonata has three parts: exposition, development, recapitulation' },
    { vi: 'Trình bày: chủ đề chính ở giọng chủ, chủ đề phụ ở V (trưởng) hoặc III (thứ)', en: 'Exposition: the primary theme in tonic, the secondary theme in V (major) or III (minor)' },
    { vi: 'Phát triển: phân mảnh, mô tiến, chuyển giọng nhiều lần', en: 'Development: fragmentation, sequences, many modulations' },
    { vi: 'Tái hiện: mọi chủ đề đều ở giọng chủ', en: 'Recapitulation: every theme in the tonic key' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Ba phần lớn', en: 'Three large sections' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hình thức sonata** (sonata form), còn gọi là hình thức chương đầu, là **hình thức** (form) quan trọng nhất từ thời Cổ điển đến thế kỷ 20.',
            en: '**Sonata form**, also called “first-movement form,” is the most important **form** from the Classical period well into the 20th century.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nó có ba **đoạn** (section) lớn: **phần trình bày** (exposition), **phần phát triển** (development) và **phần tái hiện** (recapitulation).',
            en: 'It has three large **sections**: the **exposition**, the **development** and the **recapitulation**.',
          },
        },
        {
          type: 'play',
          notes: 'C3+C5:q E5:q G5:q E5:q | G2+F5:8 E5:8 D5:8 C5:8 G2+B4:h | F2+A4:q C5:q F5:q A4:q | G2+G4:q B4:q C3+C5:h',
          bpm: 100,
          label: { vi: 'Nghe chủ đề mở đầu một sonata nhỏ', en: 'Hear the opening theme of a small sonata' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Phần trình bày', en: 'The exposition' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chủ đề chính** (primary theme) ở giọng chủ. Một **đoạn chuyển** (transition) **chuyển giọng** (modulation) sang giọng mới. **Chủ đề phụ** (secondary theme) ở giọng mới đó, đôi khi theo sau là **chủ đề kết** (closing theme).',
            en: 'The **primary theme** is in the tonic key. A **transition** makes a **modulation** to a new key. The **secondary theme** is in that new key, sometimes followed by a **closing theme**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở giọng trưởng, giọng mới là giọng át (V). Ở giọng thứ, đó là giọng trung âm (III), giọng song song trưởng.',
            en: 'In a major key the new key is the dominant (V). In a minor key it is the mediant (III), the relative major.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'G', time: '4/4', notes: 'D5:h B4:q G4:q | A4:q B4:8 C5:8 D5:h | C5:q B4:q A4:q F#4:q | G4:h R:h ||' },
        { type: 'play', notes: 'D5:h B4:q G4:q | A4:q B4:8 C5:8 D5:h | C5:q B4:q A4:q F#4:q | G4:h', label: { vi: 'Nghe chủ đề phụ ở giọng {G} trưởng (V)', en: 'Hear the secondary theme in {G} major (V)' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một sonata ở giọng {F} trưởng. Trong phần trình bày, chủ đề phụ ở giọng nào? Chọn chủ âm của giọng đó.',
        en: 'A sonata is in {F} major. In the exposition, what key is the secondary theme in? Pick that key’s tonic.',
      },
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: 'Ở giọng trưởng, chủ đề phụ ở giọng át, và át âm của {F} trưởng là {C}.',
        en: 'In a major key the secondary theme is in the dominant, and the dominant of {F} major is {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phần phát triển', en: 'The development' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Phần phát triển **phân mảnh** (fragmentation) các chủ đề đã nghe và đưa các mảnh vào **mô tiến** (sequence), chuyển giọng nhiều lần. Đôi khi nó có chất liệu mới.',
            en: 'The development uses **fragmentation** of the themes heard so far and puts the fragments in **sequences**, with many modulations. Sometimes it brings new material.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Cuối cùng, **đoạn chuyển trở về** (retransition) dừng trên **nốt giữ** (pedal point) ở át âm (V) để chuẩn bị cho giọng chủ trở lại.',
            en: 'At the end, a **retransition** rests on a **pedal point** on the dominant (V) to prepare the return of the tonic key.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'F5:8 E5:8 D5:8 C5:8 B4:h | Eb5:8 D5:8 C5:8 Bb4:8 A4:h | D5:8 C5:8 Bb4:8 A4:8 G4:h ||' },
        { type: 'play', notes: 'F5:8 E5:8 D5:8 C5:8 B4:h | Eb5:8 D5:8 C5:8 Bb4:8 A4:h | D5:8 C5:8 Bb4:8 A4:8 G4:h', bpm: 100, label: { vi: 'Nghe một mảnh đi mô tiến', en: 'Hear a fragment in sequence' } },
        { type: 'play', notes: 'G2+B3+D4+G4:q G2+C4+E4+G4:q G2+B3+D4+G4:q G2+C4+E4+G4:q | G2+B3+D4+F4:h. R:q | C3+C5:q E5:q G5:q E5:q', bpm: 100, label: { vi: 'Nghe nốt giữ ở V rồi chủ đề chính trở lại', en: 'Hear a V pedal, then the primary theme returns' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Phần nào của sonata thường chuyển qua nhiều giọng nhất?', en: 'Which part of a sonata usually passes through the most keys?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phần trình bày', en: 'The exposition' } },
          { text: { vi: 'Phần phát triển', en: 'The development' }, correct: true },
          { text: { vi: 'Phần tái hiện', en: 'The recapitulation' } },
        ],
      },
      reason: {
        vi: 'Phần trình bày chỉ đi từ giọng chủ sang một giọng mới, còn phần phát triển chuyển giọng nhiều lần.',
        en: 'The exposition moves from the tonic to one new key, while the development modulates many times.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phần tái hiện', en: 'The recapitulation' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các chủ đề trở lại theo thứ tự cũ, nhưng chủ đề phụ và chủ đề kết giờ ở giọng chủ. Đoạn chuyển không chuyển giọng nữa, chỉ có vài lần **ly điệu** (tonicization).',
            en: 'The themes return in the same order, but the secondary and closing themes are now in the tonic key. The transition no longer modulates; it has only a few **tonicizations**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong sonata Cổ điển, phần trình bày được nhắc lại, rồi phát triển và tái hiện nhắc lại cùng nhau. Sonata kết hợp **hình thức hai đoạn tái hiện** (rounded binary) và **hai đoạn cân bằng** (balanced binary).',
            en: 'In a Classical sonata the exposition repeats, then the development and recapitulation repeat as one unit. The sonata combines **rounded binary** and **balanced binary** form.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'G4:h E4:q C4:q | D4:q E4:8 F4:8 G4:h | F4:q E4:q D4:q B3:q | C4:h R:h ||' },
        { type: 'play', notes: 'G4:h E4:q C4:q | D4:q E4:8 F4:8 G4:h | F4:q E4:q D4:q B3:q | C4:h', label: { vi: 'Nghe chủ đề phụ ở giọng {C} trưởng', en: 'Hear the secondary theme in {C} major' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Sonata ở giọng {C} trưởng có chủ đề phụ ở giọng {G} trưởng trong phần trình bày. Ở phần tái hiện, chủ đề phụ ở giọng nào?',
        en: 'A sonata in {C} major has its secondary theme in {G} major in the exposition. In the recapitulation, what key is it in?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{G} trưởng', en: '{G} major' } },
          { text: { vi: '{C} trưởng', en: '{C} major' }, correct: true },
          { text: { vi: '{A} thứ', en: '{A} minor' } },
        ],
      },
      reason: {
        vi: 'Ở phần tái hiện, chủ đề phụ trở lại ở giọng chủ, ở đây là {C} trưởng.',
        en: 'In the recapitulation the secondary theme returns in the tonic key, here {C} major.',
      },
    },
  ],
} satisfies Lesson
