import type { Lesson } from '@/theory/types'

/**
 * Book 19.1: mode mixture as borrowing chords from the parallel minor in a
 * major key; the lowered degrees ♭6 (most common), ♭3 and ♭7; I straight to i;
 * the bass line 1–♭7–6–♭6 with IV turning into iv. Our own examples.
 */
export default {
  id: 'borrowed-chords',
  title: { vi: 'Hợp âm mượn', en: 'Borrowed chords' },
  minutes: 4,
  sources: [{ section: '19.1', url: 'https://musictheory.pugetsound.edu/mt21c/ModeMixtureSection.html' }],
  recap: [
    { vi: 'Pha trộn điệu thức: mượn hợp âm từ giọng thứ cùng tên', en: 'Mode mixture: borrowing chords from the parallel minor' },
    { vi: 'Hợp âm mượn mang ♭3, ♭6 hoặc ♭7; ♭6 hay gặp nhất', en: 'Borrowed chords carry ♭3, ♭6 or ♭7; ♭6 is the most common' },
    { vi: 'I sang i: chỉ nốt ba hạ nửa cung, màu nhạc tối đi', en: 'I to i: only the third falls a half step, and the mood darkens' },
    { vi: 'Bass 1–♭7–6–♭6 đưa IV sang iv mượn', en: 'The bass 1–♭7–6–♭6 turns IV into a borrowed iv' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Mượn từ giọng thứ', en: 'Borrowing from minor' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Pha trộn điệu thức** (mode mixture) là mượn hợp âm từ giọng thứ cùng tên trong một đoạn nhạc ở giọng trưởng. Hợp âm mượn như vậy gọi là **hợp âm mượn** (borrowed chord); hai tên cùng chỉ một việc.',
            en: '**Mode mixture** is borrowing chords from the parallel minor during a passage in a major key. Such a chord is a **borrowed chord**; the two names mean the same thing.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Giọng {C} trưởng mượn từ giọng {C} thứ, giọng cùng tên có chung chủ âm {C}. Nghe IV và I bên cạnh iv và i.',
            en: '{C} major borrows from {C} minor, the parallel key with the same tonic, {C}. Hear IV and I beside iv and i.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 F4+A4+C5 || C4+Eb4+G4 F4+Ab4+C5', labels: ['I', 'IV', 'i', 'iv'], highlight: [2, 3] },
        { type: 'play', notes: 'C4+E4+G4:h F4+A4+C5:h C4+Eb4+G4:h F4+Ab4+C5:h', label: { vi: 'Nghe trưởng rồi thứ', en: 'Hear major, then minor' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Các bậc hạ thấp', en: 'The lowered degrees' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm mượn mang các bậc của giọng thứ: bậc 3, 6 và 7 hạ nửa cung, viết ♭3, ♭6 và ♭7. Hay gặp nhất là ♭6; ♭3 và ♭7 cũng có.',
            en: 'Borrowed chords carry the degrees of the minor key: 3, 6 and 7 lowered a half step, written ♭3, ♭6 and ♭7. The ♭6 is the most common; ♭3 and ♭7 also occur.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', labels: ['1', '2', '♭3', '4', '5', '♭6', '♭7', '1'], highlight: [2, 5, 6] },
        { type: 'play', notes: 'C4 D4 Eb4 F4 G4 Ab4 Bb4 C5', label: { vi: 'Nghe gam {C} thứ tự nhiên', en: 'Hear {C} natural minor' } },
        { type: 'keys', notes: 'Eb4 Ab4 Bb4', from: 'C4', octaves: 1, labels: 'names', caption: { vi: '♭3, ♭6, ♭7 của {C}:', en: '♭3, ♭6, ♭7 of {C}:' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {G} trưởng, bậc ♭6 là nốt nào?', en: 'In {G} major, which note is ♭6?' },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Bậc 6 của giọng {G} trưởng là {E}; hạ nửa cung được {Eb}, bậc 6 của giọng {G} thứ.',
        en: 'Scale degree 6 of {G} major is {E}; lowered a half step it is {Eb}, degree 6 of {G} minor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Từ I sang i', en: 'From I to i' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Cách mượn rõ nhất là đi thẳng từ I trưởng sang i thứ. Chỉ một nốt đổi, {E} xuống {Eb}, mà màu nhạc tối hẳn đi.',
            en: 'The plainest borrowing goes straight from the major I to the minor i. Only one note changes, {E} down to {Eb}, yet the mood turns dark.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+G3+E4+G4+C5:h C3+G3+Eb4+G4+C5:h ||', labels: ['I', 'i'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+G4+C5:h C3+G3+Eb4+G4+C5:h', label: { vi: 'Nghe I rồi i', en: 'Hear I, then i' } },
        {
          type: 'tip',
          text: {
            vi: 'Richard Strauss mở đầu Also sprach Zarathustra (1896) bằng đúng bước I–i này.',
            en: 'Richard Strauss opens Also sprach Zarathustra (1896) with this very I–i move.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Câu nhạc ở giọng {C} trưởng này có hợp âm mượn không?', en: 'This phrase is in {C} major. Does it use a borrowed chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', key: 'C', notes: 'C4+E4+G4 C4+F4+Ab4 C4+E4+G4' },
        { type: 'play', notes: 'C4+E4+G4:h C4+F4+Ab4:h C4+E4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Không, cả ba là hợp âm thuận giọng', en: 'No, all three are diatonic' } },
          { text: { vi: 'Có, hợp âm giữa là iv mượn', en: 'Yes, the middle chord is a borrowed iv' }, correct: true },
          { text: { vi: 'Có, hợp âm đầu là i mượn', en: 'Yes, the first chord is a borrowed i' } },
        ],
      },
      reason: {
        vi: 'Hợp âm giữa là {F}–{Ab}–{C}, có {Ab} là bậc ♭6, nên là iv mượn từ giọng {C} thứ.',
        en: 'The middle chord is {F}–{Ab}–{C}, with {Ab} as ♭6, so it is iv borrowed from {C} minor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bass 1–♭7–6–♭6', en: 'The bass 1–♭7–6–♭6' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một mẫu hay gặp trong nhạc pop: bass đi xuống {C}–{Bb}–{A}–{Ab}, tức 1–♭7–6–♭6. Đến {Ab}, IV trưởng (F/A) thành iv thứ (Fm/A♭): hợp âm mượn đứng ngay sau hợp âm thuận giọng của nó.',
            en: 'A common pattern in popular music: the bass falls {C}–{Bb}–{A}–{Ab}, that is 1–♭7–6–♭6. On {Ab}, the major IV (F/A) becomes the minor iv (Fm/A♭): the borrowed chord follows its diatonic twin.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+E4+G4+C5:q Bb2+E4+G4+C5:q A2+F4+A4+C5:q Ab2+F4+Ab4+C5:q | G2+D4+G4+B4:h C3+E4+G4+C5:h ||',
          labels: ['C', 'C/B♭', 'F/A', 'Fm/A♭', 'G', 'C'],
          highlight: [3],
        },
        { type: 'play', notes: 'C3+E4+G4+C5:q Bb2+E4+G4+C5:q A2+F4+A4+C5:q Ab2+F4+Ab4+C5:q G2+D4+G4+B4:h C3+E4+G4+C5:h', label: { vi: 'Nghe bass đi xuống', en: 'Hear the falling bass' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe câu nhạc ở giọng {C} trưởng: I–IV–?–I. Hợp âm thứ ba là gì?', en: 'Listen to this phrase in {C} major: I–IV–?–I. What is the third chord?' },
      blocks: [{ type: 'play', notes: 'C3+E4+G4+C5:h F2+F4+A4+C5:h F2+F4+Ab4+C5:h C3+E4+G4+C5:w' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'IV lần nữa', en: 'IV again' } },
          { text: { vi: 'iv mượn', en: 'A borrowed iv' }, correct: true },
          { text: { vi: 'V', en: 'V' } },
        ],
      },
      reason: {
        vi: 'Bass vẫn ở {F} nhưng {A} hạ xuống {Ab}, nên IV trưởng thành iv thứ, nghe tối hơn.',
        en: 'The bass stays on {F} but {A} falls to {Ab}, so the major IV becomes a darker minor iv.',
      },
    },
  ],
} satisfies Lesson
