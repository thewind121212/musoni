import type { Lesson } from '@/theory/types'

/**
 * Book 11.3: a compound motive (the opening of Bach's Invention No. 1)
 * broken into two overlapping fragments, each developed on its own.
 */
export default {
  id: 'fragment',
  title: { vi: 'Mảnh motif', en: 'Fragments' },
  minutes: 4,
  sources: [{ section: '11.3', url: 'https://musictheory.pugetsound.edu/mt21c/FragmentSection.html' }],
  recap: [
    { vi: 'Motif ghép tách được thành các mảnh', en: 'A compound motive can be broken into fragments' },
    { vi: 'Hai mảnh có thể gối lên nhau, chung một nốt', en: 'Two fragments may overlap, sharing a note' },
    { vi: 'Mỗi mảnh được phát triển riêng bằng các cách biến đổi', en: 'Each fragment is developed on its own with the alterations' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Motif ghép', en: 'Compound motives' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Motif thường là ý nhỏ nhất, nhưng một **motif ghép** (compound motive) có thể tách thành các **mảnh** (fragments), có sách gọi là "mầm" (germ).',
            en: 'A motive is usually the smallest idea, but a **compound motive** can be broken into **fragments**, which some authors call “germs”.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Bảy nốt mở đầu Invention số 1 giọng {C} trưởng của Bach là một motif ghép.',
            en: 'The seven notes that open Bach’s Invention No. 1 in {C} major are a compound motive.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'R:16 C4:16 D4:16 E4:16 F4:16 D4:16 E4:16 C4:16' },
        { type: 'play', notes: 'R:16 C4:16 D4:16 E4:16 F4:16 D4:16 E4:16 C4:16', bpm: 60 },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hai mảnh gối nhau', en: 'Two overlapping fragments' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Motif này tách thành hai mảnh bốn nốt gối lên nhau. Mảnh a ({C} {D} {E} {F}) đi lên từng bậc, mảnh b ({F} {D} {E} {C}) đi vòng xuống, và {F4} thuộc cả hai.',
            en: 'This motive breaks into two overlapping four-note fragments. Fragment a ({C} {D} {E} {F}) climbs by step, fragment b ({F} {D} {E} {C}) turns back down, and {F4} belongs to both.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'R:16 C4:16 D4:16 E4:16 F4:16 D4:16 E4:16 C4:16',
          labels: ['', 'a', '', '', 'b', '', '', ''],
          highlight: [4, 5, 6, 7],
        },
        { type: 'play', notes: 'C4:16 D4:16 E4:16 F4:16', bpm: 60, label: { vi: 'Nghe mảnh a', en: 'Hear fragment a' } },
        { type: 'play', notes: 'F4:16 D4:16 E4:16 C4:16', bpm: 60, label: { vi: 'Nghe mảnh b', en: 'Hear fragment b' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Mảnh b gồm những nốt nào?', en: 'Which notes make fragment b?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C} {D} {E} {F}', en: '{C} {D} {E} {F}' } },
          { text: { vi: '{F} {D} {E} {C}', en: '{F} {D} {E} {C}' }, correct: true },
          { text: { vi: '{D} {E} {F} {G}', en: '{D} {E} {F} {G}' } },
        ],
      },
      reason: {
        vi: 'Mảnh b là bốn nốt cuối, bắt đầu từ {F4}, nốt cuối của mảnh a.',
        en: 'Fragment b is the last four notes, starting on {F4}, the last note of fragment a.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phát triển từng mảnh', en: 'Developing each fragment' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Về sau Bach phát triển từng mảnh riêng bằng các cách đã học: mảnh a ở dạng tăng trường độ, mảnh b ở dạng đảo chiều, dẫn đến một kết ở giọng {G} trưởng.',
            en: 'Later Bach develops each fragment on its own with the alterations you know: fragment a in augmentation, and fragment b in inversion, leading to a cadence in {G} major.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Dưới đây là hai cách đó, minh họa bằng nốt của chúng ta, không chép từ bản nhạc của Bach.',
            en: 'Here are those two, shown with our own notes, not copied from Bach’s score.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4:8 D4:8 E4:8 F4:8 | G4:16 B4:16 A4:16 C5:16',
          labels: [{ vi: 'a tăng', en: 'a aug.' }, '', '', '', { vi: 'b đảo', en: 'b inv.' }, '', '', ''],
        },
        { type: 'play', notes: 'C4:8 D4:8 E4:8 F4:8 G4:16 B4:16 A4:16 C5:16', bpm: 60 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là mảnh nào, biến đổi thế nào?', en: 'Which fragment is this, and how is it altered?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4:16 F4:16 E4:16 D4:16' },
        { type: 'play', notes: 'G4:16 F4:16 E4:16 D4:16', bpm: 60 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Mảnh a, đảo chiều', en: 'Fragment a, inverted' }, correct: true },
          { text: { vi: 'Mảnh a, đi ngược', en: 'Fragment a, in retrograde' } },
          { text: { vi: 'Mảnh b, đảo chiều', en: 'Fragment b, inverted' } },
        ],
      },
      reason: {
        vi: 'Bốn nốt đi xuống từng bậc là mảnh a lật ngược; đi ngược thì phải là {F} {E} {D} {C}.',
        en: 'Four notes falling by step are fragment a turned upside down; in retrograde it would be {F} {E} {D} {C}.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Nhắc lại mảnh a theo mô tiến, bắt đầu từ {G4}. Nốt cuối là gì?',
        en: 'Repeat fragment a in sequence, starting on {G4}. What is its last note?',
      },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C4:16 D4:16 E4:16 F4:16' }],
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Mảnh a đi lên ba bậc liền: {G4} {A4} {B4} {C5}.',
        en: 'Fragment a climbs three steps in a row: {G4} {A4} {B4} {C5}.',
      },
    },
  ],
} satisfies Lesson
