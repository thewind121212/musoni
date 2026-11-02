import { defineStrings } from '@/core/i18n/translate'

/** Đọc nốt's own strings (`drill.note-id.*`). Shared setup words stay in core/i18n. */
export const S = defineStrings('note-id', {
  title: 'Note reading',
  what: 'Name the note on the staff',
  short: 'Note reading',
  starter: 'name notes in the treble clef, white keys only',
  clef: 'Clef and range',
  'level.1': 'Treble',
  'level.1.detail': 'On the staff only',
  'level.2': 'Treble +',
  'level.2.detail': 'Adds ledger lines',
  'level.3': 'Bass',
  'level.3.detail': 'Bass clef range',
  'level.4': 'Both',
  'level.4.detail': 'Treble and bass mixed',
}, {
  title: 'Đọc nốt nhạc',
  what: 'Gọi tên nốt trên khuông nhạc',
  short: 'Đọc nốt',
  starter: 'gọi tên nốt khóa Sol, chỉ phím trắng',
  clef: 'Khóa nhạc và quãng',
  'level.1': 'Khóa Sol',
  'level.1.detail': 'Chỉ trong khuông nhạc',
  'level.2': 'Khóa Sol +',
  'level.2.detail': 'Thêm dòng kẻ phụ',
  'level.3': 'Khóa Fa',
  'level.3.detail': 'Quãng của khóa Fa',
  'level.4': 'Cả hai',
  'level.4.detail': 'Trộn khóa Sol và khóa Fa',
})

export type NoteIdLevel = 1 | 2 | 3 | 4
export const levelKey = (l: number) => S[`level.${l}` as 'level.1']
export const levelDetailKey = (l: number) => S[`level.${l}.detail` as 'level.1.detail']
