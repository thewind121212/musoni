import type { Lesson } from '@/theory/types'

/**
 * Book 30.8: the fugue's terms (exposition, subject, answer real and tonal,
 * countersubject, episode, bridge, fragmentation). The book analyzes Bach's
 * C minor fugue (Well-Tempered Clavier I); here a subject of our own shows each term.
 */
export default {
  id: 'fugue',
  title: { vi: 'Phân tích fugue', en: 'Fugue analysis' },
  minutes: 5,
  sources: [{ section: '30.8', url: 'https://musictheory.pugetsound.edu/mt21c/FugueAnalysis.html' }],
  recap: [
    { vi: 'Fugue gồm các phần trình bày và các đoạn xen', en: 'A fugue has expositions and episodes' },
    { vi: 'Phúc đáp là chủ đề ở giọng át, thực hoặc theo giọng', en: 'The answer is the subject in the dominant, real or tonal' },
    { vi: 'Đối đề luôn đi kèm chủ đề', en: 'A countersubject goes with every subject statement' },
    { vi: 'Đoạn xen tách mảnh và mô tiến chủ đề', en: 'Episodes fragment and sequence the subject' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Fugue là gì', en: 'What a fugue is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Fugue** (fuga) là một bài đối âm có các **phần trình bày** (exposition) và các **đoạn xen** (episode). Phần trình bày chứa ít nhất một lần nêu trọn **chủ đề** (subject), ý giai điệu chính của bài.',
            en: 'A **fugue** is a contrapuntal piece whose form has **expositions** and **episodes**. An exposition holds at least one full statement of the **subject**, the main melodic idea.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trong phần trình bày đầu tiên, mỗi bè lần lượt nêu chủ đề ít nhất một lần.',
            en: 'In the first exposition, each voice states the subject in turn, at least once.',
          },
        },
        { type: 'staff', clef: 'treble', time: '4/4', notes: 'C5:8 G4:8 A4:8 B4:8 C5:8 D5:8 E5:q ||' },
        { type: 'play', notes: 'C5:8 G4:8 A4:8 B4:8 C5:8 D5:8 E5:q', label: { vi: 'Nghe chủ đề', en: 'Hear the subject' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Phúc đáp', en: 'The answer' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Phúc đáp** (answer) là chủ đề ở giọng át, do bè thứ hai vào nêu. **Phúc đáp thực** (real answer) giữ nguyên mọi quãng; **phúc đáp theo giọng** (tonal answer) sửa vài quãng để bắt đầu ở chủ âm rồi mới sang giọng át.',
            en: 'The **answer** is the subject in the key of the dominant, stated by the second voice to enter. A **real answer** keeps every interval; a **tonal answer** alters a few so it starts in the tonic before moving to the dominant.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chủ đề của ta nhảy xuống quãng 4 ({C}–{G}); phúc đáp thực sẽ nhảy {G}–{D}, còn phúc đáp theo giọng nhảy xuống quãng 5: {G}–{C}.',
            en: 'Our subject leaps down a 4th ({C}–{G}); a real answer would leap {G}–{D}, while the tonal answer leaps down a 5th: {G}–{C}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4:8 C4:8 E4:8 F#4:8 G4:8 A4:8 B4:q ||', highlight: [0, 1] },
        { type: 'play', notes: 'G4:8 C4:8 E4:8 F#4:8 G4:8 A4:8 B4:q', label: { vi: 'Nghe phúc đáp theo giọng', en: 'Hear the tonal answer' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Khuông nào là phúc đáp thực?', en: 'Which staff is the real answer?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4:8 C4:8 E4:8 F#4:8 G4:8 A4:8 B4:q ||', labels: ['1', '', '', '', '', '', ''] },
        { type: 'play', notes: 'G4:8 C4:8 E4:8 F#4:8 G4:8 A4:8 B4:q', label: { vi: 'Nghe khuông 1', en: 'Hear staff 1' } },
        { type: 'staff', clef: 'treble', notes: 'G4:8 D4:8 E4:8 F#4:8 G4:8 A4:8 B4:q ||', labels: ['2', '', '', '', '', '', ''] },
        { type: 'play', notes: 'G4:8 D4:8 E4:8 F#4:8 G4:8 A4:8 B4:q', label: { vi: 'Nghe khuông 2', en: 'Hear staff 2' } },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khuông 1', en: 'Staff 1' } },
          { text: { vi: 'Khuông 2', en: 'Staff 2' }, correct: true },
        ],
      },
      reason: {
        vi: 'Khuông 2 giữ đúng bước nhảy quãng 4 của chủ đề ({G}–{D}); khuông 1 đổi thành quãng 5 ({G}–{C}) nên là phúc đáp theo giọng.',
        en: 'Staff 2 keeps the subject’s leap of a 4th ({G}–{D}); staff 1 changes it to a 5th ({G}–{C}), so it is the tonal answer.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đối đề', en: 'The countersubject' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đối đề** (countersubject) là bè đối âm luôn đi kèm mỗi lần chủ đề hay phúc đáp xuất hiện. Nếu mỗi lần nhà soạn nhạc viết một đối âm khác, sách ghi nó là CTRPT (đối âm).',
            en: 'A **countersubject** is counterpoint that goes with every statement of the subject or answer. If the composer writes different counterpoint each time instead, the book labels it CTRPT (counterpoint).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Ở ô 2 dưới đây, bè dưới vào với phúc đáp, còn bè trên đi tiếp bằng đối đề.',
            en: 'In measure 2 below, the lower voice enters with the answer while the upper voice goes on with the countersubject.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          time: '4/4',
          notes: 'C5:8 G4:8 A4:8 B4:8 C5:8 D5:8 E5:q | G3+D5:8 C3+E5:8 E3+C5:8 F#3+A4:8 G3+B4:8 A3+C5:8 B3+G4:q ||',
        },
        {
          type: 'play',
          notes: 'C5:8 G4:8 A4:8 B4:8 C5:8 D5:8 E5:q G3+D5:8 C3+E5:8 E3+C5:8 F#3+A4:8 G3+B4:8 A3+C5:8 B3+G4:q',
          label: { vi: 'Nghe chủ đề, rồi phúc đáp và đối đề', en: 'Hear the subject, then answer and countersubject' },
          bpm: 80,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Đối đề là gì?', en: 'What is a countersubject?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đối âm luôn đi kèm mỗi lần nêu chủ đề', en: 'Counterpoint that goes with every subject statement' }, correct: true },
          { text: { vi: 'Chủ đề ở giọng át', en: 'The subject in the dominant key' } },
          { text: { vi: 'Một đoạn không nêu trọn chủ đề', en: 'A section with no full subject statement' } },
        ],
      },
      reason: {
        vi: 'Đối đề đi cùng chủ đề và phúc đáp mỗi lần chúng xuất hiện; chủ đề ở giọng át là phúc đáp, còn đoạn không có chủ đề là đoạn xen.',
        en: 'A countersubject comes with the subject and answer each time; the subject in the dominant is the answer, and a section without it is an episode.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Đoạn xen và đoạn nối', en: 'Episodes and the bridge' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn xen không nêu trọn chủ đề mà phát triển chủ đề hay ý khác bằng cách tách **mảnh** (fragment) và **mô tiến** (sequence). Chủ đề, phúc đáp và đối đề đều có thể tách thành motif đầu và motif đuôi.',
            en: 'An episode has no full statement of the subject; it develops the subject or other ideas by **fragmentation** and **sequence**. Subjects, answers and countersubjects can be split into head and tail motives.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Đoạn nối** (bridge), nếu có, là một đoạn ngắn chuyển giọng chỉ có trong phần trình bày đầu, thường nối phúc đáp với lần nêu chủ đề tiếp theo.',
            en: 'The **bridge**, if there is one, is a short modulating passage found only in the first exposition, usually linking the answer to the next subject statement.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          time: '2/4',
          notes: 'C5:8 G4:8 A4:8 B4:8 | B4:8 F4:8 G4:8 A4:8 | A4:8 E4:8 F4:8 G4:8 ||',
          highlight: [0, 1, 2, 3],
        },
        { type: 'play', notes: 'C5:8 G4:8 A4:8 B4:8 B4:8 F4:8 G4:8 A4:8 A4:8 E4:8 F4:8 G4:8', label: { vi: 'Nghe motif đầu mô tiến xuống', en: 'Hear the head motive in sequence' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một đoạn chỉ dùng mảnh của chủ đề nối tiếp theo mô tiến, không nêu trọn chủ đề. Đó là gì?',
        en: 'A passage uses only fragments of the subject in sequence, with no full statement. What is it?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn xen', en: 'An episode' }, correct: true },
          { text: { vi: 'Phần trình bày', en: 'An exposition' } },
          { text: { vi: 'Phúc đáp theo giọng', en: 'A tonal answer' } },
        ],
      },
      reason: {
        vi: 'Phần trình bày luôn có ít nhất một lần nêu trọn chủ đề; đoạn xen thì không, nó phát triển các mảnh.',
        en: 'An exposition always holds at least one full statement of the subject; an episode does not, it develops fragments.',
      },
    },
  ],
} satisfies Lesson
