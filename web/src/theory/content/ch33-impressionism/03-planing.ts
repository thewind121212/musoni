import type { Lesson } from '@/theory/types'

/** Book 32.1 (third technique): parallelism, or planing; exercise 32.5.2 (a melody in dominant ninths). */
export default {
  id: 'planing',
  title: { vi: 'Hợp âm song song', en: 'Parallelism (planing)' },
  minutes: 5,
  sources: [{ section: '32.1', url: 'https://musictheory.pugetsound.edu/mt21c/Impressionism.html' }],
  recap: [
    { vi: 'Hợp âm song song: mọi bè đi cùng hướng, cùng khoảng cách', en: 'Planing: every voice moves the same way by the same distance' },
    { vi: 'Đi theo nửa cung, hợp âm giữ nguyên tính chất', en: 'Moving by half steps, the chord keeps its quality' },
    { vi: 'Đi trên nốt của giọng, tính chất hợp âm đổi', en: 'Moving on the notes of the key, the quality changes' },
    { vi: 'Nốt 9 cao hơn nốt gốc một nguyên cung (và một quãng tám)', en: 'The 9th is a whole step (and an octave) above the root' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Mọi bè đi song song', en: 'All voices in parallel' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Hòa âm truyền thống cấm quãng 5 và quãng tám song song. Debussy và Ravel lại lấy một thế bấm hợp âm rồi cho mọi bè đi song song: đó là **hợp âm song song** (parallelism, planing).',
            en: 'Traditional voice leading forbids parallel fifths and octaves. Debussy and Ravel instead take one chord voicing and move every voice in parallel: this is **parallelism**, also called **planing**.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 D4+F#4+A4 E4+G#4+B4 D4+F#4+A4 C4+E4+G4', labels: ['C', 'D', 'E', 'D', 'C'] },
        { type: 'play', notes: 'C4+E4+G4:q D4+F#4+A4:q E4+G#4+B4:q D4+F#4+A4:q C4+E4+G4:h', bpm: 72 },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm bảy át đi theo nửa cung', en: 'Dominant sevenths by half steps' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong Khúc dạo đầu Buổi chiều của thần Faun, Debussy cho các **hợp âm bảy át** (dominant seventh chords) đi lên từng nửa cung. Mọi nốt đi cùng một nửa cung, nên hợp âm nào cũng là hợp âm bảy át.',
            en: 'In the Prelude to the Afternoon of a Faun, Debussy moves **dominant seventh chords** up by half steps. Every note moves the same half step, so each chord is still a dominant seventh.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+Bb4 C#4+E#4+G#4+B4 D4+F#4+A4+C5', labels: ['C7', 'C♯7', 'D7'] },
        { type: 'play', notes: 'C4+E4+G4+Bb4:h C#4+E#4+G#4+B4:h D4+F#4+A4+C5:w', bpm: 72 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Chuỗi C7, C♯7, D7 đi tiếp lên nửa cung. Hợp âm sau là gì?', en: 'The chain C7, C♯7, D7 moves up another half step. What comes next?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'E♭7', en: 'E♭7' }, correct: true },
          { text: { vi: 'E♭m7', en: 'E♭m7' } },
          { text: { vi: 'E7', en: 'E7' } },
        ],
      },
      reason: {
        vi: 'Mọi nốt lên cùng nửa cung nên tính chất giữ nguyên: sau D7 là E♭7.',
        en: 'Every note rises the same half step, so the quality stays: after D7 comes E♭7.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Song song trên nốt của giọng', en: 'Planing in the key' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở một đoạn khác của cùng tác phẩm, các hợp âm bảy đi song song nhưng không cùng tính chất. Khi hình hợp âm giữ nguyên mà chỉ dùng nốt của giọng, tính chất mỗi hợp âm tự đổi.',
            en: 'Elsewhere in the same piece, seventh chords move in parallel but are not all the same quality. When the shape stays but only notes of the key are used, each chord’s quality changes on its own.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4+B4 D4+F4+A4+C5 E4+G4+B4+D5 F4+A4+C5+E5', labels: ['Cmaj7', 'Dm7', 'Em7', 'Fmaj7'] },
        { type: 'play', notes: 'C4+E4+G4+B4:h D4+F4+A4+C5:h E4+G4+B4+D5:h F4+A4+C5+E5:h', bpm: 72 },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ba hợp âm này đi song song trên phím trắng. Chúng có cùng tính chất không?', en: 'These three chords plane on the white keys. Are they the same quality?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 D4+F4+A4 E4+G4+B4' },
        { type: 'play', notes: 'C4+E4+G4 D4+F4+A4 E4+G4+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có, mọi bè đi cùng một quãng', en: 'Yes, every voice moves the same interval' } },
          { text: { vi: 'Không, hợp âm đầu trưởng, hai hợp âm sau thứ', en: 'No, the first is major and the other two are minor' }, correct: true },
        ],
      },
      reason: {
        vi: 'Chỉ dùng phím trắng nên quãng 3 đổi lớn nhỏ: {C} {E} {G} là hợp âm trưởng, còn Dm và Em là hợp âm thứ.',
        en: 'With white keys only, the 3rds change size: {C} {E} {G} is major, while Dm and Em are minor.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Giai điệu trên hợp âm chín át', en: 'A melody in dominant ninths' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Trong Pavane pour une infante défunte, Ravel cho các **hợp âm chín át** (dominant ninth chords) đi song song. Ở đây mỗi nốt của bài dân ca London Bridge là nốt 9 của một hợp âm chín át.',
            en: 'In Pavane pour une infante défunte, Ravel moves **dominant ninth chords** in parallel. Here each note of the folk song London Bridge is the 9th of a dominant ninth chord.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'F4+A4+Eb5+G5:q. G4+B4+F5+A5:8 F4+A4+Eb5+G5:q Eb4+G4+Db5+F5:q | D4+F#4+C5+E5:q Eb4+G4+Db5+F5:q F4+A4+Eb5+G5:h',
          labels: ['F9', 'G9', 'F9', 'E♭9', 'D9', 'E♭9', 'F9'],
        },
        {
          type: 'play',
          notes: 'F4+A4+Eb5+G5:q. G4+B4+F5+A5:8 F4+A4+Eb5+G5:q Eb4+G4+Db5+F5:q | D4+F#4+C5+E5:q Eb4+G4+Db5+F5:q F4+A4+Eb5+G5:h',
          label: { vi: 'Nghe London Bridge', en: 'Hear London Bridge' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt giai điệu {E} là nốt 9 của một hợp âm chín át. Nốt gốc là gì?', en: 'The melody note {E} is the 9th of a dominant ninth chord. What is the root?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E5', labels: ['9'] }],
      answer: { type: 'key', note: 'D', blackKeys: 'b' },
      reason: {
        vi: 'Nốt 9 cao hơn nốt gốc một nguyên cung (và một quãng tám), nên nốt gốc là {D}.',
        en: 'The 9th is a whole step (and an octave) above the root, so the root is {D}.',
      },
    },
  ],
} satisfies Lesson
