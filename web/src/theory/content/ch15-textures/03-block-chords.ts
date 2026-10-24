import type { Lesson } from '@/theory/types'

/**
 * Book 14.4: block chord accompaniments: the "1 (2) &" rhythm, the
 * two-measure "1 2 3 (4) & (1) & (2) & 3" rhythm (the book names it after a
 * pop song; we use the count only), repeated eighth- and quarter-note chords.
 * Tiết tấu level 3 trains the same figures: dotted quarter + eighth, ties across beat 3.
 */
export default {
  id: 'block-chords',
  title: { vi: 'Đệm hợp âm khối', en: 'Block chord accompaniments' },
  minutes: 5,
  sources: [{ section: '14.4', url: 'https://musictheory.pugetsound.edu/mt21c/BlockChordAccompaniments.html' }],
  practice: { drill: 'rhythm', level: 3, durationSec: 60, tempo: 80 },
  recap: [
    { vi: 'Hợp âm khối: mọi nốt của hợp âm đánh cùng lúc', en: 'Block chords: all the notes of a chord struck together' },
    { vi: '"1 (2) &": phách 1 và nửa sau phách 2', en: '"1 (2) &": beat 1 and the upbeat after beat 2' },
    { vi: '"1 2 3 (4) & (1) & (2) & 3" trải dài hai ô nhịp', en: '"1 2 3 (4) & (1) & (2) & 3" spans two measures' },
    { vi: 'Hợp âm móc đơn hay móc đen lặp lại: kiểu đệm phổ biến', en: 'Repeated eighth- or quarter-note chords: common accompaniments' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Tiết tấu "1 (2) &"', en: 'The "1 (2) &" rhythm' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đệm **hợp âm khối** (block chords) là đánh mọi nốt của hợp âm cùng lúc. Tiết tấu "1 (2) &" có hai hợp âm mỗi ô nhịp: một ở phách 1, một ở **nửa sau phách** (upbeat) 2.',
            en: 'A **block chord** accompaniment strikes all the notes of a chord together. The "1 (2) &" rhythm has two chords a measure: one on beat 1, one on the **upbeat** after beat 2.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Đếm "1 & 2 & 3 & 4 &": hợp âm thứ hai vào ở chữ "&" sau số 2, rồi ngân qua phách 3.',
            en: 'Count "1 & 2 & 3 & 4 &": the second chord comes in on the "&" after 2 and holds through beat 3.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+E4+G4+C5:q. C3+E4+G4+C5:8~ C3+E4+G4+C5:h | F2+F4+A4+C5:q. F2+F4+A4+C5:8~ F2+F4+A4+C5:h ||',
          labels: ['1', '&', '', '1', '&', ''],
        },
        {
          type: 'play',
          notes: 'C3+E4+G4+C5:q. C3+E4+G4+C5:8~ C3+E4+G4+C5:h | F2+F4+A4+C5:q. F2+F4+A4+C5:8~ F2+F4+A4+C5:h | C3+E4+G4+C5:q. C3+E4+G4+C5:8~ C3+E4+G4+C5:h | F2+F4+A4+C5:q. F2+F4+A4+C5:8~ F2+F4+A4+C5:h',
          bpm: 90,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Trong tiết tấu "1 (2) &", hợp âm thứ hai bắt đầu ở đâu?', en: 'In the "1 (2) &" rhythm, where does the second chord start?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phách 2', en: 'Beat 2' } },
          { text: { vi: 'Nửa sau phách 2', en: 'The upbeat after beat 2' }, correct: true },
          { text: { vi: 'Phách 3', en: 'Beat 3' } },
        ],
      },
      reason: {
        vi: 'Phách 2 được bỏ qua: hợp âm thứ hai vào ở chữ "&" sau số 2, rồi ngân qua phách 3.',
        en: 'Beat 2 is skipped: the second chord comes in on the "&" after 2 and holds through beat 3.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Tiết tấu hai ô nhịp', en: 'A two-measure rhythm' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Một tiết tấu khác trải dài hai ô nhịp: "1 2 3 (4) & (1) & (2) & 3". Số trong ngoặc là phách không đánh, nốt trước đó ngân qua.',
            en: 'Another rhythm spans two measures: "1 2 3 (4) & (1) & (2) & 3". A number in brackets is a beat not struck: the note before it holds through.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Tiết tấu này có thể đánh bằng hợp âm khối, hoặc chỉ ở **đường bass** (bass line) như dưới đây.',
            en: 'It is played with block chords, or by the **bass line** alone, as below.',
          },
        },
        {
          type: 'staff',
          clef: 'bass',
          time: '4/4',
          notes: 'C3:q C3:q C3:q. G2:8~ | G2:8 E3:q F3:8 G3:h ||',
          labels: ['1', '2', '3', '&', '', '&', '&', '3'],
        },
        { type: 'play', notes: 'C3:q C3:q C3:q. G2:8~ | G2:8 E3:q F3:8 G3:h | C3:q C3:q C3:q. G2:8~ | G2:8 E3:q F3:8 G3:h', bpm: 100 },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm lặp lại', en: 'Repeated chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hợp âm móc đơn lặp lại hay gặp trong nhạc cổ điển, và là kiểu đệm chuẩn của nhạc rock. Ví dụ dưới đây chạy tiến trình I–vi–IV–V.',
            en: 'Repeated eighth-note chords are common in classical music and a standard accompaniment in rock. The example below runs the I–vi–IV–V progression.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+C4+E4+G4:8 C3+C4+E4+G4:8 C3+C4+E4+G4:8 C3+C4+E4+G4:8 A2+C4+E4+A4:8 A2+C4+E4+A4:8 A2+C4+E4+A4:8 A2+C4+E4+A4:8 | F2+C4+F4+A4:8 F2+C4+F4+A4:8 F2+C4+F4+A4:8 F2+C4+F4+A4:8 G2+B3@t+D4+G4:8 G2+B3@t+D4+G4:8 G2+B3@t+D4+G4:8 G2+B3@t+D4+G4:8 ||',
        },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:8 C3+C4+E4+G4:8 C3+C4+E4+G4:8 C3+C4+E4+G4:8 A2+C4+E4+A4:8 A2+C4+E4+A4:8 A2+C4+E4+A4:8 A2+C4+E4+A4:8 | F2+C4+F4+A4:8 F2+C4+F4+A4:8 F2+C4+F4+A4:8 F2+C4+F4+A4:8 G2+B3+D4+G4:8 G2+B3+D4+G4:8 G2+B3+D4+G4:8 G2+B3+D4+G4:8 | C3+C4+E4+G4:w',
          bpm: 120,
          label: { vi: 'Nghe móc đơn lặp lại', en: 'Hear repeated eighths' },
        },
        {
          type: 'text',
          text: {
            vi: 'Hợp âm móc đen lặp lại, mỗi phách một hợp âm, cũng phổ biến trong cả nhạc cổ điển lẫn nhạc pop.',
            en: 'Repeated quarter-note chords, one on every beat, are common in both classical and popular music.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C3+C4+E4+G4:q C3+C4+E4+G4:q A2+C4+E4+A4:q A2+C4+E4+A4:q | F2+C4+F4+A4:q F2+C4+F4+A4:q G2+B3@t+D4+G4:q G2+B3@t+D4+G4:q ||',
        },
        {
          type: 'play',
          notes: 'C3+C4+E4+G4:q C3+C4+E4+G4:q A2+C4+E4+A4:q A2+C4+E4+A4:q | F2+C4+F4+A4:q F2+C4+F4+A4:q G2+B3+D4+G4:q G2+B3+D4+G4:q | C3+C4+E4+G4:w',
          bpm: 100,
          label: { vi: 'Nghe móc đen lặp lại', en: 'Hear repeated quarters' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Phần đệm này dùng tiết tấu nào?', en: 'Which rhythm does this accompaniment use?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'G2+D4+G4+B4:q. G2+D4+G4+B4:8~ G2+D4+G4+B4:h | C3+E4+G4+C5:q. C3+E4+G4+C5:8~ C3+E4+G4+C5:h ||',
        },
        { type: 'play', notes: 'G2+D4+G4+B4:q. G2+D4+G4+B4:8~ G2+D4+G4+B4:h | C3+E4+G4+C5:q. C3+E4+G4+C5:8~ C3+E4+G4+C5:h', bpm: 90 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '"1 (2) &"', en: '"1 (2) &"' }, correct: true },
          { text: { vi: 'Hợp âm móc đơn lặp lại', en: 'Repeated eighth-note chords' } },
          { text: { vi: 'Hợp âm móc đen lặp lại', en: 'Repeated quarter-note chords' } },
        ],
      },
      reason: {
        vi: 'Mỗi ô nhịp có hai hợp âm: một ở phách 1, một ở nửa sau phách 2 ngân qua phách 3.',
        en: 'Each measure has two chords: one on beat 1, one on the upbeat after beat 2, held through beat 3.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đệm hợp âm móc đơn lặp lại: một ô nhịp 4/4 có mấy hợp âm?', en: 'Repeated eighth-note chords: how many chords in a 4/4 measure?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '4', en: '4' } },
          { text: { vi: '6', en: '6' } },
          { text: { vi: '8', en: '8' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi phách có hai móc đơn và 4/4 có bốn phách, nên có tám hợp âm.',
        en: 'Each beat holds two eighths and 4/4 has four beats, so there are eight chords.',
      },
    },
  ],
} satisfies Lesson
