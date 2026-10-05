import type { Lesson } from '@/theory/types'

/** Book 1.1 (pitch, the piano) and the letter names from 1.3. */
export default {
  id: 'pitch-names',
  title: { vi: 'Cao độ và tên nốt', en: 'Pitch and note names' },
  minutes: 3,
  sources: [
    { section: '1.1', url: 'https://musictheory.pugetsound.edu/mt21c/Pitch.html' },
    { section: '1.3', url: 'https://musictheory.pugetsound.edu/mt21c/OctaveRegisters.html' },
  ],
  recap: [
    { vi: 'Cao độ là độ cao thấp của âm; càng sang phải càng cao', en: 'Pitch is how high or low a sound is; further right is higher' },
    { vi: 'Bảy tên nốt {C} {D} {E} {F} {G} {A} {B}, rồi lặp lại', en: 'Seven note names, {C} {D} {E} {F} {G} {A} {B}, then they repeat' },
    { vi: '{C} nằm bên trái nhóm hai phím đen', en: '{C} sits left of a group of two black keys' },
    { vi: '{F} nằm bên trái nhóm ba phím đen', en: '{F} sits left of a group of three black keys' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Cao và thấp', en: 'High and low' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Cao độ** (pitch) là độ cao hay thấp của một âm. Đàn piano có 88 phím: càng sang phải âm càng cao, càng sang trái âm càng thấp.',
            en: '**Pitch** is how high or low a sound is. A piano has 88 keys: the further right, the higher the sound, and the further left, the lower.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3 G3 C4 G4 C5' },
        { type: 'play', notes: 'C3 G3 C4 G4 C5', label: { vi: 'Nghe từ thấp lên cao', en: 'Hear low to high' } },
        { type: 'keys', notes: 'C3 G3 C4 G4 C5', caption: { vi: 'Từ trái sang phải:', en: 'Left to right:' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Bảy tên nốt', en: 'Seven note names' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các phím trắng mang bảy **tên nốt** (note names): {C} {D} {E} {F} {G} {A} {B}. Sau {B}, các tên lại bắt đầu từ {C}.',
            en: 'The white keys carry seven **note names**: {C} {D} {E} {F} {G} {A} {B}. After {B}, the names start again from {C}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 D4 E4 F4 G4 A4 B4 C5', labels: 'names' },
        { type: 'play', notes: 'C4 D4 E4 F4 G4 A4 B4 C5' },
        {
          type: 'tip',
          text: {
            vi: 'Có hai cách gọi tên nốt: Do Re Mi, hoặc bằng chữ C D E. Bạn đổi cách gọi ở mục Tên nốt trong danh sách bài.',
            en: 'There are two ways to name notes: Do Re Mi, or the letters C D E. Switch between them under Note names on the lesson list.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Tìm nốt nhờ phím đen', en: 'Finding notes by the black keys' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Các **phím đen** (black keys) xếp thành nhóm hai và nhóm ba. {C} là **phím trắng** (white key) ngay bên trái nhóm hai phím đen. {F} nằm ngay bên trái nhóm ba.',
            en: 'The **black keys** come in groups of two and three. {C} is the **white key** just left of a group of two. {F} is just left of a group of three.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4 F4', labels: 'names' },
        { type: 'play', notes: 'C4 F4', label: { vi: 'Nghe {C} và {F}', en: 'Hear {C} and {F}' } },
        { type: 'keys', notes: 'C4 F4', labels: 'names' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Phím tô màu là nốt gì?', en: 'Which note is the coloured key?' },
      blocks: [{ type: 'keys', notes: 'E4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '{D}', en: '{D}' } },
          { text: { vi: '{E}', en: '{E}' }, correct: true },
          { text: { vi: '{F}', en: '{F}' } },
        ],
      },
      reason: {
        vi: 'Đếm phím trắng từ {C} bên trái nhóm hai phím đen: {C}, {D}, rồi {E}.',
        en: 'Count the white keys from {C}, left of the group of two: {C}, {D}, then {E}.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Bấm phím trắng ngay bên trái nhóm ba phím đen.',
        en: 'Tap the white key just left of the group of three black keys.',
      },
      answer: { type: 'key', note: 'F', labels: false },
      reason: {
        vi: '{F} luôn nằm ngay bên trái nhóm ba phím đen.',
        en: '{F} always sits just left of a group of three black keys.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đi sang phải trên bàn phím, âm thanh sẽ thế nào?', en: 'Moving right on the keyboard, the sound gets…' },
      blocks: [{ type: 'play', notes: 'C4 E4 G4 C5' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cao hơn', en: 'Higher' }, correct: true },
          { text: { vi: 'Thấp hơn', en: 'Lower' } },
        ],
      },
      reason: {
        vi: 'Càng sang phải, cao độ càng cao.',
        en: 'The further right on the keyboard, the higher the pitch.',
      },
    },
  ],
} satisfies Lesson
