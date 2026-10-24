import type { Lesson } from '@/theory/types'

/**
 * Book 2.1: half steps and whole steps. No practice link: Quãng level 1
 * asks interval sizes 2 to 8, which come in chapter 5, and no drill asks
 * half step or whole step on its own.
 */
export default {
  id: 'half-whole-steps',
  title: { vi: 'Nửa cung và nguyên cung', en: 'Half steps and whole steps' },
  minutes: 4,
  sources: [{ section: '2.1', url: 'https://musictheory.pugetsound.edu/mt21c/HalfStepsAndWholeSteps.html' }],
  recap: [
    { vi: 'Nửa cung: từ một phím đến phím sát bên nó', en: 'A half step: from one key to the very next key' },
    { vi: '{E}–{F} và {B}–{C} là nửa cung giữa hai phím trắng', en: '{E}–{F} and {B}–{C} are half steps between white keys' },
    { vi: 'Nguyên cung gồm hai nửa cung, bỏ qua một phím', en: 'A whole step is two half steps, skipping one key' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nửa cung', en: 'The half step' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nửa cung** (half step) là khoảng cách từ một nốt đến nốt gần nhất ngay cạnh nó trên đàn piano, dù phím trắng hay phím đen. Đó là khoảng cách nhỏ nhất trên đàn.',
            en: 'A **half step** is the distance on the piano from one note to the next nearest note, white key or black. It is the smallest distance on the keyboard.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 C#4', labels: 'names' },
        { type: 'play', notes: 'C4 C#4' },
        { type: 'keys', notes: 'C4 C#4', labels: 'names' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Nửa cung giữa hai phím trắng', en: 'Half steps between white keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giữa {E} và {F}, giữa {B} và {C} không có phím đen. Vì vậy {E}–{F} và {B}–{C} là nửa cung, dù cả hai nốt đều là phím trắng.',
            en: 'There is no black key between {E} and {F}, or between {B} and {C}. So {E}–{F} and {B}–{C} are half steps, even though both notes are white keys.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4 F4 | B4 C5', labels: 'names' },
        { type: 'play', notes: 'E4 F4 B4 C5' },
        { type: 'keys', notes: 'E4 F4 B4 C5', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào cao hơn {E} nửa cung?', en: 'Which note is a half step above {E}?' },
      blocks: [{ type: 'keys', notes: 'E4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F#}', en: '{F#}' } },
          { text: { vi: '{D#}', en: '{D#}' } },
          { text: { vi: '{F}', en: '{F}' }, correct: true },
        ],
      },
      reason: {
        vi: 'Không có phím đen giữa {E} và {F}, nên phím ngay trên {E} là {F}.',
        en: 'There is no black key between {E} and {F}, so the key right above {E} is {F}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Nguyên cung', en: 'The whole step' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Nguyên cung** (whole step) gồm hai nửa cung, tức bỏ qua đúng một phím ở giữa. {C}–{D} là nguyên cung vì có {C#} ở giữa; {E}–{F#} cũng vậy, vì có {F} ở giữa.',
            en: 'A **whole step** is made of two half steps: it skips exactly one key in between. {C}–{D} is a whole step, with {C#} between; so is {E}–{F#}, with {F} between.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 | E4 F#4', labels: 'names' },
        { type: 'play', notes: 'C4 D4 E4 F#4' },
        { type: 'keys', notes: 'C4 D4 E4 F#4', labels: 'names' },
        {
          type: 'tip',
          text: {
            vi: 'Dấu thăng nâng nốt lên nửa cung, còn thăng kép nâng lên một nguyên cung.',
            en: 'A sharp raises a note a half step; a double sharp raises it a whole step.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai nốt này cách nhau bao xa?', en: 'How far apart are these notes?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'Bb4 C5' },
        { type: 'play', notes: 'Bb4 C5' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nửa cung', en: 'A half step' } },
          { text: { vi: 'Nguyên cung', en: 'A whole step' }, correct: true },
        ],
      },
      reason: {
        vi: 'Từ {Bb} lên {C} phải đi qua {B}, tức hai nửa cung, bằng một nguyên cung.',
        en: 'From {Bb} up to {C} passes {B}: two half steps, which is a whole step.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bấm nốt thấp hơn {C} nửa cung.', en: 'Tap the note a half step below {C}.' },
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Không có phím đen giữa {B} và {C}, nên phím ngay dưới {C} là {B}.',
        en: 'There is no black key between {B} and {C}, so the key right below {C} is {B}.',
      },
    },
  ],
} satisfies Lesson
