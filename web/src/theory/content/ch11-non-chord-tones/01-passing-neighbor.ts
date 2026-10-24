import type { Lesson } from '@/theory/types'

/**
 * Book 10.1: what a non-chord tone is, named by how it is approached and
 * left, and the accented / unaccented / chromatic qualifiers; 10.2 passing
 * tones; 10.3 neighbor tones. Our own examples over C major chords in place
 * of the book's songs. No practice link: no drill asks non-chord tones.
 */
export default {
  id: 'passing-neighbor',
  title: { vi: 'Nốt lướt và nốt thêu', en: 'Passing and neighbor tones' },
  minutes: 5,
  sources: [
    { section: '10.1', url: 'https://musictheory.pugetsound.edu/mt21c/NonChordTonesIntroduction.html' },
    { section: '10.2', url: 'https://musictheory.pugetsound.edu/mt21c/PassingTones.html' },
    { section: '10.3', url: 'https://musictheory.pugetsound.edu/mt21c/NeighborTones.html' },
  ],
  recap: [
    { vi: 'Nốt ngoài hợp âm không thuộc hợp âm đang vang', en: 'A non-chord tone does not belong to the chord that sounds' },
    { vi: 'Nốt lướt (P): liền bậc, rồi liền bậc cùng hướng', en: 'Passing tone (P): a step, then a step the same way' },
    { vi: 'Nốt thêu (N): liền bậc ra, rồi quay về nốt cũ', en: 'Neighbor tone (N): a step away, then back to the same note' },
    { vi: 'Có nhấn: rơi vào phách; không nhấn: giữa các phách', en: 'Accented: on the beat; unaccented: between beats' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt ngoài hợp âm', en: 'Non-chord tones' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt ngoài hợp âm** (non-chord tone) là nốt không thuộc hợp âm đang vang lên. Ở đây hợp âm là {C} {E} {G}, nên {D5} của giai điệu là nốt ngoài hợp âm.',
            en: 'A **non-chord tone** is a note that does not belong to the chord that sounds. Here the chord is {C} {E} {G}, so the melody’s {D5} is a non-chord tone.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ta gọi tên nó theo cách giai điệu đến và rời nó: giữ **cùng nốt** (same note), đi **liền bậc** (step) sang nốt kề bên, hoặc **nhảy** (leap) từ một quãng 3 trở lên.',
            en: 'It is named by how the melody approaches and leaves it: by the **same note**, by **step** to the next note, or by **leap**, a third or more.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E3+G3+C5:q C3+E3+G3+D5:q C3+E3+G3+E5:h', labels: ['{C}', '{D}', '{E}'] },
        { type: 'play', notes: 'C3+E3+G3+C5:q C3+E3+G3+D5:q C3+E3+G3+E5:h' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt lướt', en: 'Passing tones' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt lướt** (passing tone), ghi tắt P, đi liền bậc giữa hai nốt trong hợp âm, theo cùng một hướng. Nó lấp chỗ trống của một quãng 3.',
            en: 'A **passing tone**, marked P, moves by step between two chord tones, in the same direction. It fills in the gap of a third.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+E3+G3+E5:q C3+E3+G3+D5:q C3+E3+G3+C5:h', labels: ['', 'P', ''] },
        { type: 'play', notes: 'C3+E3+G3+E5:q C3+E3+G3+D5:q C3+E3+G3+C5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Đi xuống từ nốt gốc đến nốt năm, có thể có hai nốt lướt liền nhau: {C5}, {B4}, {A4}, {G4}.',
            en: 'In a scale going down from the root to the fifth there can be two passing tones in a row: {C5}, {B4}, {A4}, {G4}.',
          },
        },
        {
          type: 'play',
          notes: 'C3+E3+G3+C5:q C3+E3+G3+B4:q C3+E3+G3+A4:q C3+E3+G3+G4:q',
          label: { vi: 'Nghe hai nốt lướt liền nhau', en: 'Hear two passing tones in a row' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm là {G} {B} {D}. Nốt {C5} là nốt gì?', en: 'The chord is {G} {B} {D}. What is the {C5}?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+D3+G3+B4:q G2+D3+G3+C5:q G2+D3+G3+D5:h' },
        { type: 'play', notes: 'G2+D3+G3+B4:q G2+D3+G3+C5:q G2+D3+G3+D5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt lướt', en: 'A passing tone' }, correct: true },
          { text: { vi: 'Nốt thêu', en: 'A neighbor tone' } },
          { text: { vi: 'Nốt trong hợp âm', en: 'A chord tone' } },
        ],
      },
      reason: {
        vi: '{C5} không thuộc hợp âm và đi liền bậc từ {B4} lên {D5} theo một hướng, nên nó là nốt lướt.',
        en: '{C5} is not in the chord and moves by step from {B4} up to {D5} in one direction, so it is a passing tone.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nốt thêu', en: 'Neighbor tones' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nốt thêu** (neighbor tone), ghi tắt N, rời một nốt bằng một bước liền bậc rồi quay về chính nốt đó. Thêu trên đi lên rồi về, thêu dưới đi xuống rồi về.',
            en: 'A **neighbor tone**, marked N, steps away from a note and then returns to it. An upper neighbor steps up and back, a lower neighbor steps down and back.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '3/4',
          notes: 'C3+E3+G3+E5:q C3+E3+G3+F5:q C3+E3+G3+E5:q | C3+E3+G3+C5:q C3+E3+G3+B4:q C3+E3+G3+C5:q ||',
          labels: ['', 'N', '', '', 'N', ''],
        },
        { type: 'play', notes: 'C3+E3+G3+E5:q C3+E3+G3+F5:q C3+E3+G3+E5:q C3+E3+G3+C5:q C3+E3+G3+B4:q C3+E3+G3+C5:q' },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở giọng {C} trưởng, nốt thêu dưới của {C5} là nốt gì?',
        en: 'In {C} major, what is the lower neighbor of {C5}?',
      },
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Thêu dưới đi xuống một bậc của gam rồi quay về, và bậc ngay dưới {C} trong gam {C} trưởng là {B}.',
        en: 'A lower neighbor steps down one scale degree and back, and the degree just below {C} in {C} major is {B}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Có nhấn và không nhấn', en: 'Accented and unaccented' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt ngoài hợp âm **có nhấn** (accented) rơi vào phách. Nốt **không nhấn** (unaccented) rơi vào phần yếu giữa hai phách. Ô nhịp 1 có nốt lướt không nhấn, ô nhịp 2 có nốt lướt có nhấn.',
            en: 'An **accented** non-chord tone falls on the beat. An **unaccented** one falls on the weak part of the beat. Measure 1 has an unaccented passing tone, measure 2 an accented one.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '2/4',
          notes: 'C3+E3+G3+C5:8 C3+E3+G3+D5:8 C3+E3+G3+E5:q | F2+C3+A3+D5:8 F2+C3+A3+C5:8 F2+C3+A3+A4:q | C3+E3+G3+C5:h ||',
          labels: ['', 'P', '', 'P', '', '', ''],
        },
        { type: 'play', notes: 'C3+E3+G3+C5:8 C3+E3+G3+D5:8 C3+E3+G3+E5:q F2+C3+A3+D5:8 F2+C3+A3+C5:8 F2+C3+A3+A4:q C3+E3+G3+C5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Nốt không thuộc giọng là nốt **biến âm** (chromatic), như {C#} lướt giữa {C} và {D} ở giọng {C} trưởng.',
            en: 'A note outside the key is **chromatic**, like {C#} passing between {C} and {D} in {C} major.',
          },
        },
        {
          type: 'play',
          notes: 'C3+E3+G3+C5:q C3+E3+G3+C#5:q G2+D3+G3+D5:h',
          label: { vi: 'Nghe nốt lướt biến âm', en: 'Hear a chromatic passing tone' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt lướt {F5} ở đây có nhấn hay không nhấn?', en: 'Is the passing tone {F5} here accented or unaccented?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '2/4', notes: 'C3+E3+G3+C5:q C3+E3+G3+G5:q | A2+C3+E3+F5:8 A2+C3+E3+E5:8 A2+C3+E3+C5:q ||' },
        { type: 'play', notes: 'C3+E3+G3+C5:q C3+E3+G3+G5:q A2+C3+E3+F5:8 A2+C3+E3+E5:8 A2+C3+E3+C5:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có nhấn', en: 'Accented' }, correct: true },
          { text: { vi: 'Không nhấn', en: 'Unaccented' } },
        ],
      },
      reason: {
        vi: '{F5} rơi vào phách 1 của ô nhịp 2, ngay khi hợp âm {A} {C} {E} vang lên, nên nó có nhấn.',
        en: '{F5} falls on beat 1 of measure 2, just as the chord {A} {C} {E} sounds, so it is accented.',
      },
    },
  ],
} satisfies Lesson
