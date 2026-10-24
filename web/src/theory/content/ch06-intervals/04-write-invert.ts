import type { Lesson } from '@/theory/types'

/**
 * Book 5.3 (writing an interval above a note) and 5.4 (inversion, and using it
 * to write below). The book's "write" exercises become checks: find the note.
 */
export default {
  id: 'write-invert',
  title: { vi: 'Viết quãng và đảo quãng', en: 'Writing and inverting intervals' },
  minutes: 5,
  sources: [
    { section: '5.3', url: 'https://musictheory.pugetsound.edu/mt21c/HowToWriteIntervals.html' },
    { section: '5.4', url: 'https://musictheory.pugetsound.edu/mt21c/InversionOfIntervals.html' },
  ],
  practice: { drill: 'intervals', level: 3, durationSec: 120 },
  recap: [
    { vi: 'Tìm nốt phía trên: dùng gam trưởng của nốt dưới, hoặc đếm nửa cung', en: 'The note above: use the lower note’s major scale, or count half steps' },
    { vi: 'Đảo quãng: nốt thấp chuyển lên cao hơn nốt kia', en: 'Inverting: the lower note moves above the other' },
    { vi: 'Cỡ cộng lại bằng 9; trưởng thành thứ, đúng vẫn là đúng', en: 'The numbers add to 9; major becomes minor, perfect stays perfect' },
    { vi: 'Quãng lớn phía dưới: đảo nó, tìm nốt phía trên, rồi hạ một quãng tám', en: 'A large interval below: invert it, find the note above, then drop it an octave' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tìm nốt phía trên', en: 'Finding the note above' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Muốn tìm nốt cao hơn {A} một quãng 6 thứ, hãy nghĩ đến gam {A} trưởng. Gam này có {F#}, cao hơn {A} một quãng 6 trưởng. Vậy quãng 6 thứ là {Fn}.',
            en: 'To find a minor 6th above {A}, start from the {A} major scale. It has {F#}, a major 6th above {A}. So the minor 6th is {Fn}.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hoặc đếm nửa cung: quãng 6 thứ có 8 nửa cung, và đi lên 8 nửa cung từ {A} là tới {F}.',
            en: 'Or count half steps: a minor 6th has 8, and 8 half steps up from {A} is {F}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4+F#5 A4+Fn5', labels: ['6', '6'], highlight: [1] },
        { type: 'play', notes: 'A4+F#5 A4+F5', label: { vi: 'Nghe trưởng rồi thứ', en: 'Hear major, then minor' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào cao hơn {E4} một quãng 3 trưởng?', en: 'Which note is a major 3rd above {E4}?' },
      blocks: [{ type: 'keys', notes: 'E4' }],
      answer: { type: 'key', note: 'G#' },
      reason: {
        vi: 'Gam {E} trưởng có {G#}, nên quãng 3 trưởng trên {E} là {G#}.',
        en: 'The {E} major scale has {G#}, so the major 3rd above {E} is {G#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đảo quãng', en: 'Inverting an interval' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một quãng chỉ có hai nốt, một thấp một cao. **Đảo quãng** (interval inversion) là đổi chỗ chúng: nốt thấp chuyển lên trên nốt kia, thường là nâng lên một quãng tám.',
            en: 'An interval has only two notes, one lower and one higher. To **invert** an interval, swap them so the lower note becomes the higher one, usually by moving it up an octave.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Hai cỡ quãng cộng lại luôn bằng 9: quãng 6 đảo thành quãng 3, quãng 2 thành quãng 7, quãng 4 thành quãng 5. Trưởng đảo thành thứ, thứ thành trưởng, còn đúng vẫn là đúng.',
            en: 'The two numbers always add up to 9: a 6th inverts to a 3rd, a 2nd to a 7th, a 4th to a 5th. Major becomes minor, minor becomes major, and perfect stays perfect.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+C5 C5+E5', labels: ['6', '3'] },
        { type: 'play', notes: 'E4+C5 C5+E5', label: { vi: 'Nghe quãng 6 thứ rồi quãng 3 trưởng', en: 'Hear a minor 6th, then a major 3rd' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng 2 trưởng đảo lại thành quãng gì?', en: 'A major 2nd inverts to what?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'D4+E4' },
        { type: 'play', notes: 'D4+E4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 7 trưởng', en: 'Major 7th' } },
          { text: { vi: 'Quãng 7 thứ', en: 'Minor 7th' }, correct: true },
          { text: { vi: 'Quãng 6 thứ', en: 'Minor 6th' } },
        ],
      },
      reason: {
        vi: '2 cộng 7 bằng 9, và trưởng đảo thành thứ, nên đó là quãng 7 thứ.',
        en: '2 plus 7 is 9, and major inverts to minor, so it is a minor 7th.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm nốt phía dưới', en: 'Finding the note below' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Quãng nhỏ, đến quãng 4 đúng, tìm xuống được bằng **nguyên cung** (whole step) và nửa cung. Quãng lớn hơn thì đảo nó: tìm nốt phía trên theo quãng đảo, rồi viết nốt đó thấp xuống một quãng tám.',
            en: 'Small intervals, up to a perfect 4th, can be found below with **whole steps** and half steps. For a larger one, invert it: find the note above by the inverted interval, then write that note an octave lower.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ví dụ quãng 6 trưởng dưới {C5}: đảo thành quãng 3 thứ, trên {C} là {Eb}. Vậy nốt cần tìm là {Eb4}.',
            en: 'Take a major 6th below {C5}: it inverts to a minor 3rd, which above {C} is {Eb}. So the note is {Eb4}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C5+Eb5 Eb4+C5', labels: ['3', '6'], highlight: [1] },
        { type: 'play', notes: 'C5+Eb5 Eb4+C5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào thấp hơn {F4} một quãng 6 trưởng?', en: 'Which note is a major 6th below {F4}?' },
      blocks: [{ type: 'keys', notes: 'F4', from: 'C3', octaves: 2 }],
      answer: { type: 'key', note: 'Ab' },
      reason: {
        vi: 'Quãng 6 trưởng đảo thành quãng 3 thứ, mà trên {F} là {Ab}, nên nốt phía dưới là {Ab3}.',
        en: 'A major 6th inverts to a minor 3rd, which above {F} is {Ab}, so the note below is {Ab3}.',
      },
    },
  ],
} satisfies Lesson
