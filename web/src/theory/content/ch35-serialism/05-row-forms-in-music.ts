import type { Lesson } from '@/theory/types'

/** Book 34.5-34.6: overlap, tetrachords, melody and accompaniment; serialism beyond twelve tones. Our own examples. */
export default {
  id: 'row-forms-in-music',
  title: { vi: 'Chuỗi trong tác phẩm', en: 'Row forms in music' },
  minutes: 5,
  sources: [
    { section: '34.5', url: 'https://musictheory.pugetsound.edu/mt21c/RowFormsInMusic.html' },
    { section: '34.6', url: 'https://musictheory.pugetsound.edu/mt21c/NonTwelveToneSerialism.html' },
  ],
  recap: [
    { vi: 'Gối đầu: nốt cuối của chuỗi này mở chuỗi sau', en: 'Overlap: one row’s last note starts the next' },
    { vi: 'Chuỗi có thể chia thành tứ âm, đi ở nhiều bè hay thành hợp âm', en: 'A row can be split into tetrachords, in several voices or as chords' },
    { vi: 'Một dạng làm giai điệu, dạng khác làm hợp âm đệm', en: 'One form can be the melody, another the chords' },
    { vi: 'Chủ nghĩa chuỗi không cần đủ 12 nốt, chỉ cần giữ thứ tự', en: 'Serialism needs no twelve notes, only a fixed order' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Gối đầu', en: 'Overlap' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong tác phẩm, chuỗi không phải lúc nào cũng hiện rõ. Một cách viết là **gối đầu** (overlap): nốt cuối của chuỗi này cũng là nốt đầu của chuỗi sau.',
            en: 'In a piece, rows are not always clearly presented. One way is **overlap**: the last note of one row is also the first note of the next.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F4 G4 Bb4 C#5 F5 Eb5 G5 En5', highlight: [3] },
        { type: 'play', notes: 'F4 G4 Bb4 C#5 F5 Eb5 G5 E5', label: { vi: 'Nghe cuối P₀, đầu P₁', en: 'Hear the end of P₀, the start of P₁' } },
        {
          type: 'tip',
          text: {
            vi: 'Ở đây P₀ kết thúc bằng {C#}, và chính nốt {C#} đó mở đầu P₁.',
            en: 'Here P₀ ends on {C#}, and that same {C#} starts P₁.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'P₀ kết thúc bằng {C#}. Chuỗi gối đầu ngay sau nó là một dạng đảo. Đó là dạng nào?',
        en: 'P₀ ends on {C#}. The row that overlaps it is an inversion. Which one?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'I₀', en: 'I₀' } },
          { text: { vi: 'I₁', en: 'I₁' }, correct: true },
          { text: { vi: 'RI₁', en: 'RI₁' } },
        ],
      },
      reason: {
        vi: 'Chuỗi sau bắt đầu bằng {C#} = 1, và dạng I mang số của nốt đầu.',
        en: 'The next row starts on {C#} = 1, and an I form takes its first note’s number.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tứ âm và hợp âm', en: 'Tetrachords and chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chuỗi cũng có thể chia thành ba **tứ âm** (tetrachord), mỗi nhóm bốn nốt liền nhau: 0 4 2 6, 3 8 9 11, 5 7 10 1. Các tứ âm có thể đi ở những bè khác nhau theo lối **đối âm** (counterpoint), hoặc chồng lên thành hợp âm.',
            en: 'A row can also be split into three **tetrachords**, groups of four adjacent notes: 0 4 2 6, 3 8 9 11, 5 7 10 1. The tetrachords can be set in different voices, in **counterpoint**, or stacked as chords.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+D4+E4+F#4 Eb4+Ab4+An4+B4 F4+G4+Bb4+C#5' },
        { type: 'play', notes: 'C4+D4+E4+F#4:h Eb4+Ab4+A4+B4:h F4+G4+Bb4+C#5:w', label: { vi: 'Nghe ba tứ âm của P₀', en: 'Hear the three tetrachords of P₀' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Tứ âm cuối của P₀ gồm những nốt nào?', en: 'Which notes make up the last tetrachord of P₀?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4 E4 D4 F#4 Eb4 Ab4 An4 B4 Fn4 G4 Bb4 C#5' },
        { type: 'play', notes: 'C4 E4 D4 F#4 Eb4 Ab4 A4 B4 F4 G4 Bb4 C#5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C} {E} {D} {F#}', en: '{C} {E} {D} {F#}' } },
          { text: { vi: '{Eb} {Ab} {A} {B}', en: '{Eb} {Ab} {A} {B}' } },
          { text: { vi: '{F} {G} {Bb} {C#}', en: '{F} {G} {Bb} {C#}' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bốn nốt cuối của P₀ là 5 7 10 1, tức {F}, {G}, {Bb}, {C#}.',
        en: 'The last four notes of P₀ are 5 7 10 1: {F}, {G}, {Bb}, {C#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giai điệu và đệm', en: 'Melody and accompaniment' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hai dạng chuỗi có thể chia vai **giai điệu và đệm** (melody and accompaniment). Dưới đây P₀ là giai điệu, còn R₀ chia thành ba tứ âm và vang lên thành ba hợp âm.',
            en: 'Two row forms can share a **melody and accompaniment** texture. Below, P₀ is the melody, while R₀, in three tetrachords, sounds as three chords.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C4:q E4:q D4:q F#4:q | Eb4:q Ab4:q An4:q B4:q | Fn4:q G4:q Bb4:q C#5:q' },
        { type: 'staff', clef: 'bass', time: '4/4', notes: 'G2+Bb2+C#3+F3:w | Ab2+B2+Eb3+An3:w | C3+D3+E3+F#3:w' },
        {
          type: 'play',
          bpm: 80,
          notes:
            'G2+Bb2+C#3+F3+C4:q G2+Bb2+C#3+F3+E4:q G2+Bb2+C#3+F3+D4:q G2+Bb2+C#3+F3+F#4:q ' +
            'Ab2+B2+Eb3+A3+Eb4:q Ab2+B2+Eb3+A3+Ab4:q Ab2+B2+Eb3+A3+A4:q Ab2+B2+Eb3+A3+B4:q ' +
            'C3+D3+E3+F#3+F4:q C3+D3+E3+F#3+G4:q C3+D3+E3+F#3+Bb4:q C3+D3+E3+F#3+C#5:q',
          label: { vi: 'Nghe giai điệu trên hợp âm', en: 'Hear the melody over the chords' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Chuỗi không mười hai âm', en: 'Non-twelve-tone serialism' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Chủ nghĩa chuỗi** (serialism) rộng hơn kỹ thuật mười hai âm. Một chuỗi có thể ngắn hơn 12 nốt và lặp nốt, miễn là giữ nguyên thứ tự và vẫn dùng các dạng đảo, nghịch hành, đảo nghịch hành.',
            en: '**Serialism** is wider than twelve-tone technique. A series can be shorter than twelve notes and repeat notes, as long as it keeps its order and uses inversion, retrograde and retrograde inversion.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'A4 C5 B4 E4 G4 A4 F#4 G4',
          labels: ['9', '0', '11', '4', '7', '9', '6', '7'],
        },
        { type: 'play', notes: 'A4 C5 B4 E4 G4 A4 F#4 G4', label: { vi: 'Nghe chuỗi tám nốt', en: 'Hear the eight-note series' } },
        {
          type: 'tip',
          text: {
            vi: 'Chuỗi này chỉ có sáu nốt khác nhau, lặp lại {A} và {G}, và nghe như xoay quanh {A} hoặc {E}.',
            en: 'This series has only six different notes, repeats {A} and {G}, and could imply {A} or {E} as a tonal center.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Vì sao chuỗi tám nốt này vẫn là âm nhạc chuỗi?', en: 'Why is this eight-note series still serial?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4 C5 B4 E4 G4 A4 F#4 G4' },
        { type: 'play', notes: 'A4 C5 B4 E4 G4 A4 F#4 G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nó dùng đủ 12 nốt', en: 'It uses all twelve notes' } },
          { text: { vi: 'Nó giữ thứ tự nốt và dùng các dạng đảo, nghịch hành', en: 'It keeps its order and uses inversion and retrograde' }, correct: true },
          { text: { vi: 'Nó không lặp nốt nào', en: 'It never repeats a note' } },
        ],
      },
      reason: {
        vi: 'Chủ nghĩa chuỗi chỉ cần một chuỗi giữ thứ tự cùng các dạng của nó; đủ 12 nốt là luật riêng của kỹ thuật mười hai âm.',
        en: 'Serialism needs only a series in a fixed order with its forms; using all twelve notes is the rule of twelve-tone technique alone.',
      },
    },
  ],
} satisfies Lesson
