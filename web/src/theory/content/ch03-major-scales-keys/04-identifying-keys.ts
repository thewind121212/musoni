import type { Lesson } from '@/theory/types'

/** Book 2.3.1: naming a major key from its signature (last sharp + half step; second-to-last flat). */
export default {
  id: 'identifying-keys',
  title: { vi: 'Nhận ra giọng từ hóa biểu', en: 'Identifying key signatures' },
  minutes: 3,
  sources: [{ section: '2.3', url: 'https://musictheory.pugetsound.edu/mt21c/MajorKeySignatures.html#MajorKeySignatures-3' }],
  practice: { drill: 'key-sig', level: 3, durationSec: 60 },
  recap: [
    { vi: 'Dấu thăng: lên nửa cung từ dấu thăng cuối', en: 'Sharps: a half step up from the last sharp' },
    { vi: 'Dấu giáng: dấu giáng áp chót là tên giọng', en: 'Flats: the second-to-last flat names the key' },
    { vi: 'Một dấu giáng là {F} trưởng; không dấu là {C} trưởng', en: 'One flat is {F} major; none is {C} major' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hóa biểu có dấu thăng', en: 'Signatures with sharps' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Tốt nhất là thuộc lòng các hóa biểu, nhưng có một mẹo để tìm giọng trưởng. Với dấu thăng: đi lên nửa cung từ dấu thăng cuối cùng là ra tên giọng.',
            en: 'It is best to know key signatures by heart, but there is a quick way to find the major key. With sharps: go up a half step from the last sharp to find the key.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'A', notes: 'G#4 A4', labels: 'names', highlight: [1] },
        { type: 'play', notes: 'G#4 A4', label: { vi: 'Nghe {G#} lên {A}', en: 'Hear {G#} up to {A}' } },
        { type: 'keys', notes: 'G#4 A4' },
        {
          type: 'tip',
          text: {
            vi: 'Ba dấu thăng là {F#} {C#} {G#}. Dấu cuối là {G#}, lên nửa cung là {A}: giọng {A} trưởng.',
            en: 'Three sharps are {F#} {C#} {G#}. The last is {G#}, and a half step up is {A}: {A} major.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'E', notes: '' }],
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Bốn dấu thăng {F#} {C#} {G#} {D#}: lên nửa cung từ {D#} là {E}.',
        en: 'Four sharps, {F#} {C#} {G#} {D#}: a half step up from {D#} is {E}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hóa biểu có dấu giáng', en: 'Signatures with flats' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Với dấu giáng: dấu giáng áp chót (đứng trước dấu cuối) chính là tên giọng. Bốn dấu giáng là {Bb} {Eb} {Ab} {Db}, dấu áp chót là {Ab}: giọng {Ab} trưởng.',
            en: 'With flats: the second-to-last flat is the key. Four flats are {Bb} {Eb} {Ab} {Db}; the second-to-last is {Ab}, so the key is {Ab} major.',
          },
        },
        { type: 'staff', clef: 'treble', key: 'Ab', notes: 'Ab4', labels: 'names', highlight: [0] },
        { type: 'play', notes: 'Ab4 Bb4 C5 Db5 Eb5 F5 G5 Ab5', label: { vi: 'Nghe gam {Ab} trưởng', en: 'Hear {Ab} major' } },
        {
          type: 'tip',
          text: {
            vi: 'Một dấu giáng không có dấu áp chót: hãy nhớ đó là {F} trưởng. Không dấu nào là {C} trưởng.',
            en: 'One flat has no second-to-last flat: remember it as {F} major. No sharps or flats is {C} major.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'Eb', notes: '' }],
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Ba dấu giáng {Bb} {Eb} {Ab}: dấu áp chót là {Eb}.',
        en: 'Three flats, {Bb} {Eb} {Ab}: the second-to-last is {Eb}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'bass', key: 'F', notes: '' }],
      answer: { type: 'key', note: 'F', blackKeys: 'b' },
      reason: {
        vi: 'Chỉ một dấu giáng, {Bb}, là hóa biểu của giọng {F} trưởng.',
        en: 'A single flat, {Bb}, is the key signature of {F} major.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hóa biểu này là của giọng trưởng nào?', en: 'Which major key has this key signature?' },
      blocks: [{ type: 'staff', clef: 'treble', key: 'B', notes: '' }],
      answer: { type: 'key', note: 'B', blackKeys: '#' },
      reason: {
        vi: 'Năm dấu thăng, dấu cuối là {A#}: lên nửa cung là {B}.',
        en: 'Five sharps, the last one {A#}: a half step up is {B}.',
      },
    },
  ],
} satisfies Lesson
