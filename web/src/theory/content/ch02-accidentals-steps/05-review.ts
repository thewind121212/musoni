import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises: 1.6 (enharmonic
 * notes) and the half and whole step parts of 2.4.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 2', en: 'Chapter 2 review' },
  minutes: 4,
  sources: [
    { section: '1.6', url: 'https://musictheory.pugetsound.edu/mt21c/BasicConceptsPracticeExercises.html' },
    { section: '2.4', url: 'https://musictheory.pugetsound.edu/mt21c/MajorKeysPracticeExercises.html' },
  ],
  practice: { drill: 'note-id', level: 4, durationSec: 60, accidentals: true },
  recap: [
    { vi: 'Dấu thăng, dấu giáng, thăng kép, giáng kép, dấu bình', en: 'Sharps, flats, double sharps, double flats, naturals' },
    { vi: 'Nốt trùng âm', en: 'Enharmonic notes' },
    { vi: 'Nửa cung và nguyên cung', en: 'Half steps and whole steps' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Eb4' }],
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Dòng 1 là {E4}, và dấu giáng hạ nó xuống phím đen sát bên trái: {Eb4}.',
        en: 'Line 1 is {E4}, and the flat lowers it to the black key just to its left: {Eb4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'F#3' }],
      answer: { type: 'key', note: 'F#' },
      reason: {
        vi: 'Ở khóa Fa, dòng 4 là {F3}, và dấu thăng nâng nó lên {F#3}.',
        en: 'In bass clef line 4 is {F3}, and the sharp raises it to {F#3}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Tên khác của {G#} là gì?', en: 'What is the other name for {G#}?' },
      blocks: [{ type: 'keys', notes: 'G#4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{Gb}', en: '{Gb}' } },
          { text: { vi: '{Ab}', en: '{Ab}' }, correct: true },
          { text: { vi: '{A#}', en: '{A#}' } },
        ],
      },
      reason: {
        vi: '{G#} là phím đen nằm giữa {G} và {A}, nên nó cũng là {Ab}.',
        en: '{G#} is the black key between {G} and {A}, so it is also {Ab}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này nằm trên phím nào?', en: 'Which key is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'B#4' }],
      answer: { type: 'key', note: 'C' },
      reason: {
        vi: '{B#} cao hơn {B} nửa cung, tức là phím trắng {C}.',
        en: '{B#} is a half step above {B}, which is the white key {C}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt cuối là nốt gì?', en: 'What is the last note?' },
      blocks: [{ type: 'staff', clef: 'treble', time: '4/4', notes: 'Bb4:q A4:q Bn4:h' }],
      answer: { type: 'key', note: 'B' },
      reason: {
        vi: 'Dấu bình xóa dấu giáng trước đó trong ô nhịp, nên nốt cuối là {B}.',
        en: 'The natural cancels the earlier flat in the measure, so the last note is {B}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai nốt này cách nhau bao xa?', en: 'How far apart are these notes?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'B4 C5' },
        { type: 'play', notes: 'B4 C5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nửa cung', en: 'A half step' }, correct: true },
          { text: { vi: 'Nguyên cung', en: 'A whole step' } },
        ],
      },
      reason: {
        vi: 'Không có phím đen giữa {B} và {C}, nên chúng cách nhau nửa cung.',
        en: 'There is no black key between {B} and {C}, so they are a half step apart.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bấm nốt cao hơn {D} một nguyên cung.', en: 'Tap the note a whole step above {D}.' },
      answer: { type: 'key', note: 'E' },
      reason: {
        vi: 'Từ {D} qua {D#} rồi đến {E}: hai nửa cung, tức một nguyên cung.',
        en: 'From {D} through {D#} to {E}: two half steps, which is a whole step.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào trùng âm với {D}?', en: 'Which note is enharmonic with {D}?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{C#}', en: '{C#}' } },
          { text: { vi: '{Eb}', en: '{Eb}' } },
          { text: { vi: '{C##}', en: '{C##}' }, correct: true },
        ],
      },
      reason: {
        vi: '{C##} cao hơn {C} hai nửa cung, tức là phím {D}.',
        en: '{C##} is two half steps above {C}, which is the key {D}.',
      },
    },
  ],
} satisfies Lesson
