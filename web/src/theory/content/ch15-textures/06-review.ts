import type { Lesson } from '@/theory/types'

/**
 * The chapter review over 14.1-14.7. Book chapter 14 has no practice
 * exercises section, so the checks mix the lessons' own questions.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 15', en: 'Chapter 15 review' },
  minutes: 4,
  sources: [
    { section: '14.1', url: 'https://musictheory.pugetsound.edu/mt21c/Texture.html' },
    { section: '14.3', url: 'https://musictheory.pugetsound.edu/mt21c/ArpeggiatedAccompaniments.html' },
    { section: '14.4', url: 'https://musictheory.pugetsound.edu/mt21c/BlockChordAccompaniments.html' },
    { section: '14.5', url: 'https://musictheory.pugetsound.edu/mt21c/AfterbeatsOffbeats.html' },
    { section: '14.6', url: 'https://musictheory.pugetsound.edu/mt21c/ThreeTwoClave.html' },
  ],
  practice: { drill: 'rhythm', level: 3, durationSec: 120, tempo: 80 },
  recap: [
    { vi: 'Kết cấu: chiều dọc và chiều ngang', en: 'Texture: the vertical and horizontal sides' },
    { vi: 'Hợp âm rải, hợp âm khối, sau phách, phách lệch', en: 'Arpeggios, block chords, afterbeats, offbeats' },
    { vi: 'Clave son, 3+3+2, tresillo và habanera', en: 'The son clave, 3+3+2, tresillo and habanera' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Số nốt vang cùng lúc thuộc chiều nào của kết cấu?', en: 'Which side of texture is how many notes sound at once?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Chiều dọc', en: 'The vertical side' }, correct: true },
          { text: { vi: 'Chiều ngang', en: 'The horizontal side' } },
        ],
      },
      reason: {
        vi: 'Chiều dọc là các nốt chồng lên nhau cùng lúc; chiều ngang là hoạt động tiết tấu.',
        en: 'The vertical side is the notes stacked at one moment; the horizontal side is rhythmic activity.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là kết cấu gì?', en: 'What texture is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'G2+B3+D4+G4:q C3+G3+E4+G4:q D3+A3+F#4+A4:q G2+B3+D4+G4:q ||' },
        { type: 'play', notes: 'G2+B3+D4+G4:q C3+G3+E4+G4:q D3+A3+F#4+A4:q G2+B3+D4+G4:q', bpm: 76 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết cấu hợp xướng', en: 'Chorale texture' }, correct: true },
          { text: { vi: 'Bass Alberti', en: 'An Alberti bass' } },
          { text: { vi: 'Hợp âm phách lệch', en: 'Offbeats' } },
        ],
      },
      reason: {
        vi: 'Mỗi nốt giai điệu có một hợp âm và mọi bè cùng tiết tấu: kết cấu hợp xướng.',
        en: 'Every melody note has a chord and all the parts share one rhythm: chorale texture.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bass Alberti trên hợp âm này: nốt thứ hai của mẫu là nốt nào?', en: 'An Alberti bass on this chord: which note comes second in the pattern?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'G2+B2+D3' }],
      answer: { type: 'key', note: 'D', blackKeys: '#' },
      reason: {
        vi: 'Thứ tự là thấp–cao–giữa–cao: {G}, {D}, {B}, {D}, nên nốt thứ hai là nốt cao {D}.',
        en: 'The order is low–high–middle–high: {G}, {D}, {B}, {D}, so the second note is the high one, {D}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bass là {C3}. Nốt nào cao hơn nó một quãng 10 trưởng?', en: 'The bass is {C3}. Which note is a major tenth above it?' },
      answer: { type: 'key', note: 'E', blackKeys: 'b' },
      reason: {
        vi: 'Quãng 10 trưởng là quãng tám cộng quãng 3 trưởng: {C3}, {C4}, rồi {E4}.',
        en: 'A major tenth is an octave plus a major third: {C3}, {C4}, then {E4}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Phần đệm này dùng tiết tấu nào?', en: 'Which rhythm does this accompaniment use?' },
      blocks: [
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'A2+E4+A4+C5:q. A2+E4+A4+C5:8~ A2+E4+A4+C5:h | D3+D4+F4+A4:q. D3+D4+F4+A4:8~ D3+D4+F4+A4:h ||',
        },
        { type: 'play', notes: 'A2+E4+A4+C5:q. A2+E4+A4+C5:8~ A2+E4+A4+C5:h | D3+D4+F4+A4:q. D3+D4+F4+A4:8~ D3+D4+F4+A4:h', bpm: 90 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm móc đen lặp lại', en: 'Repeated quarter-note chords' } },
          { text: { vi: '"1 (2) &"', en: '"1 (2) &"' }, correct: true },
          { text: { vi: 'Hợp âm sau phách', en: 'Afterbeats' } },
        ],
      },
      reason: {
        vi: 'Hai hợp âm khối mỗi ô nhịp: phách 1, rồi nửa sau phách 2 ngân qua phách 3.',
        en: 'Two block chords a measure: beat 1, then the upbeat after beat 2, held through beat 3.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là kiểu đệm nào?', en: 'What kind of accompaniment is this?' },
      blocks: [
        { type: 'staff', clef: 'bass', key: 'F', time: '2/4', notes: 'F2:8 A2+C3:8 C3:8 A2+C3:8 | C3:8 Bb2+E3:8 G2:8 Bb2+E3:8 ||' },
        { type: 'play', notes: 'F2:8 A2+C3:8 C3:8 A2+C3:8 | C3:8 Bb2+E3:8 G2:8 Bb2+E3:8 | F2:8 A2+C3:8 C3:8 A2+C3:8 | F2:q R:q', bpm: 112 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm rải', en: 'Arpeggios' } },
          { text: { vi: 'Kết cấu hợp xướng', en: 'Chorale texture' } },
          { text: { vi: 'Hợp âm phách lệch', en: 'Offbeats' }, correct: true },
        ],
      },
      reason: {
        vi: 'Bass ở đầu phách, hợp âm ở nửa sau mỗi phách: hợp âm phách lệch kiểu polka.',
        en: 'Bass on the downbeats, chords on every upbeat: polka-style offbeats.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là tiết tấu nào?', en: 'Which rhythm is this?' },
      blocks: [
        { type: 'staff', clef: 'none', time: '4/4', notes: 'B4:q. B4:q. B4:q | R:q B4:q B4:q R:q ||' },
        { type: 'play', notes: 'B4:q. B4:q. B4:q | R:q B4:q B4:q R:q | B4:q. B4:q. B4:q | R:q B4:q B4:q R:q', bpm: 100 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Clave son 3–2', en: 'The 3–2 son clave' }, correct: true },
          { text: { vi: 'Clave son 2–3', en: 'The 2–3 son clave' } },
          { text: { vi: 'Habanera', en: 'Habanera' } },
        ],
      },
      reason: {
        vi: 'Ba tiếng gõ ở ô nhịp đầu, hai tiếng ở ô nhịp sau: clave son 3–2.',
        en: 'Three attacks in the first measure and two in the second: the 3–2 son clave.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Đây là tresillo hay habanera?', en: 'Is this tresillo or the habanera?' },
      blocks: [
        { type: 'staff', clef: 'none', time: '2/4', notes: 'B4:8. B4:8. B4:8' },
        { type: 'play', notes: 'B4:8. B4:8. B4:8 | B4:8. B4:8. B4:8 | B4:8. B4:8. B4:8 | B4:8. B4:8. B4:8', bpm: 90 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Tresillo', en: 'Tresillo' }, correct: true },
          { text: { vi: 'Habanera', en: 'Habanera' } },
        ],
      },
      reason: {
        vi: 'Chỉ có ba tiếng 3+3+2, không có tiếng ở phách 2: đó là tresillo, còn habanera thêm tiếng ở phách 2.',
        en: 'Just three attacks, 3+3+2, with none on beat 2: that is tresillo; the habanera adds beat 2.',
      },
    },
  ],
} satisfies Lesson
