import type { Lesson } from '@/theory/types'

/**
 * Book 9.3: the short progressions cut from the circle of fifths (ii–V–I,
 * vi–ii–V–I and its rotations, iii–vi–ii–V), and 9.2: harmonic rhythm.
 * No practice link: no drill plays or asks progressions.
 */
export default {
  id: 'circle-segments',
  title: { vi: 'Đoạn ngắn từ vòng quãng năm', en: 'Shorter progressions from the circle' },
  minutes: 4,
  sources: [
    { section: '9.3', url: 'https://musictheory.pugetsound.edu/mt21c/ShorterProgressionsFromTheCircleOfFifths.html' },
    { section: '9.2', url: 'https://musictheory.pugetsound.edu/mt21c/HarmonicRhythm.html' },
  ],
  recap: [
    { vi: 'ii–V–I: ba hợp âm cuối của vòng quãng năm', en: 'ii–V–I: the last three chords of the circle of fifths' },
    { vi: 'vi–ii–V–I xoay vòng thành I–vi–ii–V và ii–V–I–vi', en: 'vi–ii–V–I rotates to I–vi–ii–V and ii–V–I–vi' },
    { vi: 'iii–vi–ii–V hay được lặp lại thành vòng', en: 'iii–vi–ii–V is often looped' },
    { vi: 'Tiết tấu hòa âm: mỗi hợp âm kéo dài bao lâu', en: 'Harmonic rhythm: how long each chord lasts' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'ii–V–I', en: 'ii–V–I' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Lấy ba hợp âm cuối của vòng quãng năm, ta có ii–V–I. Tiến trình này có trong mọi phong cách, nhất là nhạc jazz.',
            en: 'Take the last three chords of the circle of fifths and you have ii–V–I. It turns up in every style, above all in jazz.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D4+F4+A4 G4+B4+D5 C4+E4+G4', labels: ['ii', 'V', 'I'] },
        { type: 'play', notes: 'D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:w', label: { vi: 'Nghe ii–V–I', en: 'Hear ii–V–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, hợp âm ii có nốt gốc là gì?', en: 'In {G} major, what is the root of ii?' },
      answer: { type: 'key', note: 'A', blackKeys: '#' },
      reason: {
        vi: 'Bậc 2 của gam {G} trưởng là {A}, nên ii là hợp âm {A} thứ.',
        en: 'The second degree of {G} major is {A}, so ii is the {A} minor chord.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'vi–ii–V–I và xoay vòng', en: 'vi–ii–V–I and its rotations' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bốn hợp âm cuối của vòng là vi–ii–V–I. Giữ nguyên thứ tự mà bắt đầu từ hợp âm khác, ta có hai cách **xoay vòng** (rotation): I–vi–ii–V và ii–V–I–vi.',
            en: 'The last four chords of the circle are vi–ii–V–I. Keep the order but start on another chord and you get two **rotations**: I–vi–ii–V and ii–V–I–vi.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+E4+G4 A4+C5+E5 D4+F4+A4 G4+B4+D5', labels: ['I', 'vi', 'ii', 'V'] },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h C3+C4+E4+G4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h', label: { vi: 'Nghe I–vi–ii–V', en: 'Hear I–vi–ii–V' } },
        {
          type: 'tip',
          text: {
            vi: 'Trong ii–V–I–vi, hợp âm vi nối kết V–I với hợp âm ii của câu sau.',
            en: 'In ii–V–I–vi, the vi links the V–I cadence to the ii that starts the next phrase.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Tiến trình nào là một cách xoay vòng của vi–ii–V–I?', en: 'Which is a rotation of vi–ii–V–I?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'V–I–vi–ii', en: 'V–I–vi–ii' }, correct: true },
          { text: { vi: 'I–V–ii–vi', en: 'I–V–ii–vi' } },
          { text: { vi: 'vi–V–ii–I', en: 'vi–V–ii–I' } },
        ],
      },
      reason: {
        vi: 'V–I–vi–ii giữ nguyên thứ tự vi, ii, V, I, chỉ bắt đầu từ V.',
        en: 'V–I–vi–ii keeps the order vi, ii, V, I and just starts on V.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'iii–vi–ii–V', en: 'iii–vi–ii–V' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn iii–vi–ii–V hay được lặp lại nhiều lần thành một vòng. Đôi khi nó được xoay thành ii–V–iii–vi.',
            en: 'The segment iii–vi–ii–V is often repeated over and over as a loop. Sometimes it is rotated to ii–V–iii–vi.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'E4+G4+B4 A4+C5+E5 D4+F4+A4 G4+B4+D5', labels: ['iii', 'vi', 'ii', 'V'] },
        { type: 'play', notes: 'E3+E4+G4+B4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h E3+E4+G4+B4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h', label: { vi: 'Nghe vòng lặp', en: 'Hear the loop' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Tiết tấu hòa âm', en: 'Harmonic rhythm' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Tiết tấu hòa âm** (harmonic rhythm) là độ dài của mỗi hợp âm. Cùng một tiến trình có thể đổi hợp âm sau bốn phách, hoặc nhanh hơn, sau hai phách.',
            en: '**Harmonic rhythm** is how long each chord lasts. The same progression can change chords every four beats, or faster, every two beats.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4+E4+G4:w | A4+C5+E5:w | D4+F4+A4:w | G4+B4+D5:w',
          labels: ['I', 'vi', 'ii', 'V'],
        },
        { type: 'play', notes: 'C3+C4+E4+G4:w A2+A4+C5+E5:w D3+D4+F4+A4:w G2+G4+B4+D5:w', bpm: 120, label: { vi: 'Nghe: bốn phách một hợp âm', en: 'Hear: four beats a chord' } },
        {
          type: 'staff',
          clef: 'treble',
          time: '4/4',
          notes: 'C4+E4+G4:h A4+C5+E5:h | D4+F4+A4:h G4+B4+D5:h',
          labels: ['I', 'vi', 'ii', 'V'],
        },
        { type: 'play', notes: 'C3+C4+E4+G4:h A2+A4+C5+E5:h D3+D4+F4+A4:h G2+G4+B4+D5:h', bpm: 120, label: { vi: 'Nghe: hai phách một hợp âm', en: 'Hear: two beats a chord' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở đây mỗi hợp âm kéo dài bao lâu?', en: 'How long does each chord last here?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'F4+A4+C5:h G4+B4+D5:h | C4+E4+G4:w' },
        { type: 'play', notes: 'F3+F4+A4+C5:h G2+G4+B4+D5:h C3+C4+E4+G4:w', bpm: 120 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hai phách, rồi bốn phách', en: 'Two beats, then four' }, correct: true },
          { text: { vi: 'Lúc nào cũng bốn phách', en: 'Always four beats' } },
          { text: { vi: 'Lúc nào cũng hai phách', en: 'Always two beats' } },
        ],
      },
      reason: {
        vi: 'Hai nốt trắng chiếm hai phách mỗi hợp âm, rồi nốt tròn giữ cả bốn phách: tiết tấu hòa âm chậm lại ở cuối.',
        en: 'The two half notes take two beats each, then the whole note holds all four: the harmonic rhythm slows at the end.',
      },
    },
  ],
} satisfies Lesson
