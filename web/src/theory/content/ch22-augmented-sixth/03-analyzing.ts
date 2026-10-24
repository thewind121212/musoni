import type { Lesson } from '@/theory/types'

/**
 * Book 21.3: stacked in thirds, every augmented sixth has a diminished third,
 * then the scale degrees give the type; 21.4: lead-sheet symbols read them as
 * a major-minor seventh chord on ♭6. No practice link: no drill asks them.
 */
export default {
  id: 'analyzing',
  title: { vi: 'Nhận ra và ghi ký hiệu', en: 'Analyzing and lead-sheet symbols' },
  minutes: 4,
  sources: [
    { section: '21.3', url: 'https://musictheory.pugetsound.edu/mt21c/AnalyzingAugmentedSixthChords.html' },
    { section: '21.4', url: 'https://musictheory.pugetsound.edu/mt21c/LeadSheetAnalysisOfAugmentedSixthChords.html' },
  ],
  recap: [
    { vi: 'Xếp chồng quãng 3, hợp âm sáu tăng có một quãng 3 giảm', en: 'Stacked in thirds, an augmented sixth chord has a diminished third' },
    { vi: 'Rồi xem các bậc: chỉ 1 là Ý, thêm 2 là Pháp, thêm ♭3 là Đức', en: 'Then read the degrees: 1 alone is Italian, plus 2 French, plus ♭3 German' },
    { vi: 'Ký hiệu hợp âm coi chúng là hợp âm bảy át trên bậc ♭6', en: 'Lead-sheet symbols treat them as a dominant seventh on ♭6' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Xếp chồng quãng 3', en: 'Stacked in thirds' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Xếp các nốt thành chồng quãng 3 như mọi hợp âm khác, ta thấy cả bốn hợp âm sáu tăng đều có một **quãng 3 giảm** (diminished third): {F#}–{Ab}. Chưa hợp âm nào ta đã học có quãng này.',
            en: 'Stack the notes in thirds as with any chord, and all four augmented sixth chords show a **diminished third**: {F#}–{Ab}. None of the chords studied so far has one.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'F#4+Ab4+C5 D4+F#4+Ab4+C5 F#4+Ab4+C5+Eb5 D#4+F#4+Ab4+C5',
          labels: ['It+6', 'Fr+6', 'Ger+6', 'EnGer\n+6'],
        },
        { type: 'play', notes: 'F#4+Ab4+C5:h D4+F#4+Ab4+C5:h F#4+Ab4+C5+Eb5:h D#4+F#4+Ab4+C5:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng {F#}–{Ab} là quãng gì?', en: 'What interval is {F#}–{Ab}?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'F#4+Ab4' },
        { type: 'play', notes: 'F#4+Ab4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 2 trưởng', en: 'Major second' } },
          { text: { vi: 'Quãng 3 thứ', en: 'Minor third' } },
          { text: { vi: 'Quãng 3 giảm', en: 'Diminished third' }, correct: true },
        ],
      },
      reason: {
        vi: 'Từ tên {F} đến {A} là quãng 3, nhưng chỉ có hai nửa cung, hẹp hơn quãng 3 thứ nửa cung: quãng 3 giảm.',
        en: '{F} to {A} is a third, but only two half steps, a half step smaller than a minor third: a diminished third.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Quy tắc nhận diện', en: 'The rule' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Gặp một hợp âm có quãng 3 giảm khi xếp chồng quãng 3, đó là hợp âm sáu tăng. Sau đó xem các bậc để biết là loại nào.',
            en: 'When a chord stacked in thirds has a diminished third, it is an augmented sixth chord. Then look at the scale degrees to tell which type.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'Ab2+C4+F#4+C5 Ab2+D4+F#4+C5 Ab2+Eb4+F#4+C5', labels: ['It+6', 'Fr+6', 'Ger+6'] },
        { type: 'play', notes: 'Ab2+C4+F#4+C5:h Ab2+D4+F#4+C5:h Ab2+Eb4+F#4+C5:h' },
        {
          type: 'tip',
          text: {
            vi: 'Chỉ có ♭6, ♯4 và 1: Ý. Thêm 2: Pháp. Thêm ♭3: Đức, hay ♯2 trong giọng trưởng: Đức trùng âm.',
            en: 'Only ♭6, ♯4 and 1: Italian. Add 2: French. Add ♭3: German, or ♯2 in major: enharmonic German.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong giọng {D} thứ, đây là hợp âm sáu tăng nào?', en: 'In {D} minor, which augmented sixth is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'Bb2+E4+G#4+D5' },
        { type: 'play', notes: 'Bb2+E4+G#4+D5:h A2+E4+A4+C#5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ý (It+6)', en: 'Italian (It+6)' } },
          { text: { vi: 'Pháp (Fr+6)', en: 'French (Fr+6)' }, correct: true },
          { text: { vi: 'Đức (Ger+6)', en: 'German (Ger+6)' } },
        ],
      },
      reason: {
        vi: '{Bb} là ♭6 và {G#} là ♯4; ngoài bậc 1 {D}, nốt {E} là bậc 2, nên đây là hợp âm Pháp.',
        en: '{Bb} is ♭6 and {G#} is ♯4; besides 1, {D}, the {E} is degree 2, so this is the French.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Ký hiệu hợp âm', en: 'Lead-sheet symbols' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi ghi **ký hiệu hợp âm** (lead-sheet symbol), ta coi hợp âm sáu tăng là hợp âm bảy át dựng trên bậc ♭6, vì chúng nghe giống hệt nhau. Hợp âm Đức {Ab} {C} {Eb} {F#} là A♭7 với nốt bảy viết khác: {F#} thay cho {Gb}.',
            en: 'For **lead-sheet symbols**, treat an augmented sixth chord as a dominant seventh chord on ♭6, since they sound the same. The German {Ab} {C} {Eb} {F#} is A♭7 with its seventh respelled: {F#} instead of {Gb}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hợp âm Ý là A♭7 thiếu nốt năm, hợp âm Pháp là A♭7♭5. Nhạc jazz và pop thường viết thẳng như vậy, chẳng hạn Am–F7–E trong giọng {A} thứ.',
            en: 'The Italian is A♭7 without its fifth, the French A♭7♭5. Jazz and pop often spell them that way, as in Am–F7–E in {A} minor.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'Ab4+C5+Eb5+F#5 Ab4+C5+Eb5+Gb5', labels: ['Ger+6', 'A♭7'] },
        { type: 'play', notes: 'Ab3+Ab4+C5+Eb5+F#5:h Ab3+Ab4+C5+Eb5+Gb5:h', label: { vi: 'Nghe: cùng một âm thanh', en: 'Hear: the same sound' } },
        {
          type: 'tip',
          text: {
            vi: 'Cách viết cổ điển cho thấy các nốt sẽ đi về đâu, còn ký hiệu hợp âm chỉ cho thấy nốt gốc và tính chất.',
            en: 'The classical spelling shows where the notes will go; the lead-sheet symbol shows only root and quality.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu hợp âm nào ghi hợp âm Đức trong giọng {E} thứ?', en: 'Which lead-sheet symbol fits the German in {E} minor?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C7', en: 'C7' }, correct: true },
          { text: { vi: 'A♯7', en: 'A♯7' } },
          { text: { vi: 'Cmaj7', en: 'Cmaj7' } },
        ],
      },
      reason: {
        vi: 'Bậc ♭6 của giọng {E} thứ là {C}, và {C} {E} {G} {A#} nghe như hợp âm bảy át C7.',
        en: '♭6 in {E} minor is {C}, and {C} {E} {G} {A#} sounds like the dominant seventh C7.',
      },
    },
  ],
} satisfies Lesson
