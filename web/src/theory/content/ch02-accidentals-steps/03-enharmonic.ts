import type { Lesson } from '@/theory/types'

/**
 * Book 1.5: enharmonic notes. No practice link: Đọc nốt spells its answer
 * keys like the printed note, so it never asks for the other name.
 */
export default {
  id: 'enharmonic',
  title: { vi: 'Nốt trùng âm', en: 'Enharmonic notes' },
  minutes: 3,
  sources: [{ section: '1.5', url: 'https://musictheory.pugetsound.edu/mt21c/EnharmonicNotes.html' }],
  recap: [
    { vi: 'Nốt trùng âm nghe như nhau nhưng viết khác nhau', en: 'Enharmonic notes sound the same but are written differently' },
    { vi: 'Mỗi phím đen có hai tên, như {C#} và {Db}', en: 'Every black key has two names, like {C#} and {Db}' },
    { vi: 'Phím trắng cũng vậy: {B#} là {C}, {Fb} là {E}', en: 'White keys too: {B#} is {C}, {Fb} is {E}' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Một phím, hai tên', en: 'One key, two names' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '{C#4} và {Db4} là cùng một phím đen, nhưng được viết thành hai nốt khác nhau trên khuông. Hai nốt nghe như nhau mà viết khác nhau gọi là **nốt trùng âm** (enharmonic notes).',
            en: '{C#4} and {Db4} are the same black key, but they are written as two different notes on the staff. Notes that sound the same but are written differently are **enharmonic**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C#4 Db4', labels: 'names' },
        { type: 'keys', notes: 'C#4', caption: { vi: 'Cùng một phím:', en: 'One key:' } },
        { type: 'play', notes: 'C#4 Db4', label: { vi: 'Nghe cả hai', en: 'Hear both' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Mọi phím đen', en: 'Every black key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Phím đen nào cũng có hai tên: {C#} và {Db}, {D#} và {Eb}, {F#} và {Gb}, {G#} và {Ab}, {A#} và {Bb}. Tên thăng gọi từ phím trắng bên trái, tên giáng gọi từ phím trắng bên phải.',
            en: 'Every black key has two names: {C#} and {Db}, {D#} and {Eb}, {F#} and {Gb}, {G#} and {Ab}, {A#} and {Bb}. The sharp name comes from the white key on its left, the flat name from the one on its right.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'F#4 Gb4 | A#4 Bb4', labels: 'names' },
        { type: 'play', notes: 'F#4 Gb4 A#4 Bb4' },
        { type: 'keys', notes: 'F#4 A#4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Tên khác của {Eb} là gì?', en: 'What is the other name for {Eb}?' },
      blocks: [{ type: 'keys', notes: 'Eb4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{D#}', en: '{D#}' }, correct: true },
          { text: { vi: '{E#}', en: '{E#}' } },
          { text: { vi: '{Db}', en: '{Db}' } },
        ],
      },
      reason: {
        vi: '{Eb} là phím đen sát bên phải {D}, nên nó cũng là {D#}.',
        en: '{Eb} is the black key just right of {D}, so it is also {D#}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Phím trắng cũng vậy', en: 'White keys too' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Giữa {B} và {C}, giữa {E} và {F} không có phím đen. Vì vậy {B#} chính là phím {C}, còn {Fb} chính là phím {E}. Phím trắng nào cũng viết được bằng tên khác, như {C##} là {D}.',
            en: 'There is no black key between {B} and {C}, or between {E} and {F}. So {B#} is the key {C}, and {Fb} is the key {E}. Any white key can be written another way, like {C##} for {D}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B#3 C4 | E4 Fb4', labels: 'names' },
        { type: 'play', notes: 'B#3 C4 E4 Fb4' },
        { type: 'keys', notes: 'C4 E4', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này nằm trên phím nào?', en: 'Which key is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'Fb4' }],
      answer: { type: 'key', note: 'E' },
      reason: {
        vi: '{Fb} thấp hơn {F} nửa cung, và phím sát bên trái {F} là phím trắng {E}.',
        en: '{Fb} is a half step below {F}, and the key just left of {F} is the white key {E}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt nào trùng âm với {F}?', en: 'Which note is enharmonic with {F}?' },
      blocks: [{ type: 'keys', notes: 'F4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{F#}', en: '{F#}' } },
          { text: { vi: '{E#}', en: '{E#}' }, correct: true },
          { text: { vi: '{Gb}', en: '{Gb}' } },
        ],
      },
      reason: {
        vi: '{E#} cao hơn {E} nửa cung, tức là phím trắng {F}.',
        en: '{E#} is a half step above {E}, which is the white key {F}.',
      },
    },
  ],
} satisfies Lesson
