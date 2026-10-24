import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (29.5) on 29.1-29.4. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 30', en: 'Chapter 30 review' },
  minutes: 5,
  sources: [{ section: '29.5', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingChromaticHarmoniesExercises.html' }],
  recap: [
    { vi: 'Nốt bảy và bậc 6 hạ đi xuống một bậc', en: 'Sevenths and the lowered sixth fall by step' },
    { vi: 'N6 nhân đôi bass; bậc 2 hạ đi xuống', en: 'N6 doubles its bass; the lowered second falls' },
    { vi: '♯4 đi lên bậc 5, trừ khi đến V7', en: '♯4 rises to 5, except going to V7' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, V7/IV là {F}–{A}–{C}–{Eb}. Đến IV, {Eb} đi đến nốt nào?', en: 'In {F} major, V7/IV is {F}–{A}–{C}–{Eb}. Going to IV, where does {Eb} go?' },
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: '{Eb} là nốt bảy, nên nó đi xuống một bậc đến {D}, nốt ba của IV ({Bb}–{D}–{F}).',
        en: '{Eb} is the seventh, so it falls by step to {D}, the third of IV ({Bb}–{D}–{F}).',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} thứ, N6 này nhân đôi đúng chưa?', en: 'In {C} minor, is this N6 doubled correctly?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Cm', notes: 'F2+Db4@b+Ab4+Db5', labels: ['N6'] },
        { type: 'play', notes: 'F2+Db4+Ab4+Db5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đúng, nó nhân đôi bass', en: 'Yes, it doubles the bass' } },
          { text: { vi: 'Chưa, nó nhân đôi bậc 2 hạ', en: 'No, it doubles the lowered second' }, correct: true },
        ],
      },
      reason: {
        vi: 'Hai nốt {Db} là bậc 2 hạ, một nốt khuynh hướng; N6 nên nhân đôi bass {F}.',
        en: 'The two {Db}s are the lowered second, a tendency tone; N6 should double its bass, {F}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {F} trưởng, iv là {Bb}–{Db}–{F}. Đến V, {Db} đi đến nốt nào?', en: 'In {F} major, iv is {Bb}–{Db}–{F}. Going to V, where does {Db} go?' },
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: '{Db} là bậc 6 hạ mượn từ giọng {F} thứ, nên nó đi xuống một bậc đến {C}, nốt gốc của V.',
        en: '{Db} is the lowered sixth borrowed from {F} minor, so it falls by step to {C}, the root of V.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {E} thứ, hợp âm sáu tăng Ý là {C}–{E}–{A#}. Đến V, {A#} đi đến nốt nào?', en: 'In {E} minor, the Italian sixth is {C}–{E}–{A#}. Going to V, where does {A#} go?' },
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: '{A#} là ♯4, nên nó đi lên bậc 5 {B}, nốt gốc của V.',
        en: '{A#} is ♯4, so it rises to scale degree 5, {B}, the root of V.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {D} thứ, hợp âm đầu tiên là gì?', en: 'In {D} minor, what is the first chord?' },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'Dm', time: '4/4', notes: 'Bb2+F3+G#4+D5:q A2+F3+A4+D5:q A2+E3+A4+C#5:h ||' },
        { type: 'play', notes: 'Bb2+F3+G#4+D5:q A2+F3+A4+D5:q A2+E3+A4+C#5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'It+6', en: 'It+6' } },
          { text: { vi: 'Fr+6', en: 'Fr+6' } },
          { text: { vi: 'Ger+6', en: 'Ger+6' }, correct: true },
        ],
      },
      reason: {
        vi: '{Bb}–{D}–{F}–{G#} có ♭3 là {F}: hợp âm sáu tăng Đức, và nó đi qua i6/4 trước khi đến V.',
        en: '{Bb}–{D}–{F}–{G#} holds ♭3, {F}: it is a German sixth, and it passes through i6/4 before V.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'vii°7/V đến V, nốt bảy nằm trên nốt ba. Cách nào bị coi là kém hơn?', en: 'vii°7/V to V, with the seventh above the third. Which choice is less acceptable?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 không đều', en: 'Unequal fifths' } },
          { text: { vi: 'Nhân đôi cảm âm', en: 'A doubled leading tone' }, correct: true },
        ],
      },
      reason: {
        vi: 'Sách chọn quãng 5 giảm sang quãng 5 đúng, vì nhân đôi cảm âm bị coi là kém hơn.',
        en: 'The book prefers a diminished fifth moving to a perfect fifth, since a doubled leading tone is less acceptable.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} thứ, hợp âm sáu tăng đi đến V7. Nốt {F#} đi đến nốt nào?', en: 'In {C} minor, an augmented sixth chord goes to V7. Where does {F#} go?' },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Đến V7, ♯4 đi xuống ♮4: {F#} xuống {F}, nốt bảy của V7.',
        en: 'To V7, ♯4 falls to ♮4: {F#} goes down to {F}, the seventh of V7.',
      },
    },
  ],
} satisfies Lesson
