import type { Lesson } from '@/theory/types'

/** The chapter review, after the book's practice exercises (6.7) on 6.1-6.6. Our own chords throughout. */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 7', en: 'Chapter 7 review' },
  minutes: 4,
  sources: [{ section: '6.7', url: 'https://musictheory.pugetsound.edu/mt21c/TriadsPracticeExercises.html' }],
  practice: { drill: 'chords', level: 4, durationSec: 120 },
  recap: [
    { vi: 'Bốn tính chất của hợp âm ba và ký hiệu của chúng', en: 'The four triad qualities and their symbols' },
    { vi: 'Thế đảo và hợp âm gạch chéo', en: 'Inversions and slash chords' },
    { vi: 'Hợp âm sus2 và sus4', en: 'Sus2 and sus4 chords' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'C#5+E5+G5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'C♯m', en: 'C♯m' } },
          { text: { vi: 'C♯°', en: 'C♯°' }, correct: true },
          { text: { vi: 'C♯+', en: 'C♯+' } },
        ],
      },
      reason: {
        vi: '{C#}–{E} và {E}–{G} đều là quãng 3 thứ, nên đây là {C#} giảm, viết C♯°.',
        en: '{C#}–{E} and {E}–{G} are both minor 3rds, so this is {C#} diminished, written C♯°.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4+D5+E5' },
        { type: 'play', notes: 'A4+D5+E5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Asus2', en: 'Asus2' } },
          { text: { vi: 'Asus4', en: 'Asus4' }, correct: true },
          { text: { vi: 'Am', en: 'Am' } },
        ],
      },
      reason: {
        vi: '{A}–{D} là quãng 4 đúng thay cho nốt ba, {A}–{E} là quãng 5 đúng: Asus4.',
        en: '{A}–{D} is a perfect 4th in place of the third and {A}–{E} a perfect 5th: Asus4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Ab4+C5+E5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A♭', en: 'A♭' } },
          { text: { vi: 'A♭m', en: 'A♭m' } },
          { text: { vi: 'A♭+', en: 'A♭+' }, correct: true },
        ],
      },
      reason: {
        vi: '{Ab}–{C} và {C}–{E} đều là quãng 3 trưởng, nên hợp âm tăng: A♭+.',
        en: '{Ab}–{C} and {C}–{E} are both major 3rds, so the triad is augmented: A♭+.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt gốc của hợp âm này là nốt nào?', en: 'What is the root of this chord?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F#4+A4+D5' }],
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Xếp lại thành {D} {F#} {A}, nên nốt gốc là {D}; {F#} chỉ là nốt bass.',
        en: 'Restacked it is {D} {F#} {A}, so the root is {D}; {F#} is only the bass.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ký hiệu của hợp âm này là gì?', en: 'What is the symbol for this chord?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'E4+A4+C#5' },
        { type: 'play', notes: 'E4+A4+C#5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'A', en: 'A' } },
          { text: { vi: 'A/E', en: 'A/E' }, correct: true },
          { text: { vi: 'E/A', en: 'E/A' } },
        ],
      },
      reason: {
        vi: 'Xếp lại thành {A} {C#} {E}, hợp âm {A} trưởng, với nốt năm {E} ở dưới cùng: A/E.',
        en: 'Restacked it is {A} {C#} {E}, an {A} major triad with its fifth, {E}, at the bottom: A/E.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm Em gồm những nốt nào?', en: 'Which notes make up Em?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{E} {G} {B}', en: '{E} {G} {B}' }, correct: true },
          { text: { vi: '{E} {G#} {B}', en: '{E} {G#} {B}' } },
          { text: { vi: '{E} {G} {Bb}', en: '{E} {G} {Bb}' } },
        ],
      },
      reason: {
        vi: 'Em là {E} thứ: quãng 3 thứ {E}–{G}, rồi quãng 3 trưởng {G}–{B}.',
        en: 'Em is {E} minor: a minor 3rd {E}–{G}, then a major 3rd {G}–{B}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Cách viết nào đúng cho hợp âm {F#} trưởng?', en: 'Which is the correct spelling of {F#} major?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F#} {Bb} {C#}', en: '{F#} {Bb} {C#}' } },
          { text: { vi: '{F#} {A#} {C#}', en: '{F#} {A#} {C#}' }, correct: true },
          { text: { vi: '{F#} {A} {C#}', en: '{F#} {A} {C#}' } },
        ],
      },
      reason: {
        vi: 'Nốt ba cách nốt gốc hai tên nốt ({F}, {G}, {A}), nên phải là {A#}, không phải {Bb}; {A} thì thành hợp âm thứ.',
        en: 'The third is two letters above the root ({F}, {G}, {A}), so it is {A#}, not {Bb}; {A} would make it minor.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nghe: hợp âm này trưởng hay thứ?', en: 'Listen: is this triad major or minor?' },
      blocks: [{ type: 'play', notes: 'G4 Bb4 D5 G4+Bb4+D5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Trưởng', en: 'Major' } },
          { text: { vi: 'Thứ', en: 'Minor' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đó là {G} {Bb} {D}: quãng 3 thứ ở dưới, quãng 3 trưởng ở trên, nên là Gm.',
        en: 'It was {G} {Bb} {D}: a minor 3rd below and a major 3rd above, so it is Gm.',
      },
    },
  ],
} satisfies Lesson
