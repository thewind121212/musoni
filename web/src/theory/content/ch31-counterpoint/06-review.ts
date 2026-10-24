import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's practice exercises (30.9): find the
 * error in first-species fragments, the dissonances each species allows,
 * resolving a suspension, transposing an invention theme, and the fugue's answer.
 * The book's writing exercises and its Bach Mass fugue table become short checks.
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 31', en: 'Chapter 31 review' },
  minutes: 4,
  sources: [{ section: '30.9', url: 'https://musictheory.pugetsound.edu/mt21c/IntroductionToCounterpointExercises.html' }],
  recap: [
    { vi: 'Loài 1 chỉ dùng thuận âm', en: 'First species uses consonances only' },
    { vi: 'Nốt lướt, cambiata và nốt treo là những nghịch âm được dùng', en: 'Passing tones, the cambiata and suspensions are the allowed dissonances' },
    { vi: 'Invention và fugue nêu chủ đề lần lượt ở các bè', en: 'Inventions and fugues state the theme in each voice in turn' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp nào phạm luật loài 1?', en: 'Which measure breaks a first-species rule?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'C3+C5 | D3+B4 | E3+A4 ||' },
        { type: 'play', notes: 'C3+C5:h D3+B4:h E3+A4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Ô nhịp 1', en: 'Measure 1' } },
          { text: { vi: 'Ô nhịp 2', en: 'Measure 2' } },
          { text: { vi: 'Ô nhịp 3', en: 'Measure 3' }, correct: true },
        ],
      },
      reason: {
        vi: '{E3} lên {A4} là quãng 11 (quãng 4), một nghịch âm, mà loài 1 chỉ dùng thuận âm.',
        en: '{E3} up to {A4} is an 11th (a 4th), a dissonance, and first species uses consonances only.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai bè ở đây mắc lỗi gì?', en: 'What mistake do these voices make?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'D3+A4 | E3+B4 ||', labels: ['5', '5'] },
        { type: 'play', notes: 'D3+A4:h E3+B4:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 song song', en: 'Parallel fifths' }, correct: true },
          { text: { vi: 'Quãng 8 song song', en: 'Parallel octaves' } },
          { text: { vi: 'Nghịch âm ở phách 1', en: 'A dissonance on beat 1' } },
        ],
      },
      reason: {
        vi: 'Hai quãng 5 liền nhau, hai bè cùng đi lên một bậc: quãng 5 song song, bị cấm.',
        en: 'Two 5ths in a row, both voices rising a step: parallel fifths, which are forbidden.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở đối âm loài 2, nốt nào được là nghịch âm?', en: 'In second species, which note may be a dissonance?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Nốt trắng thứ hai, nếu là nốt lướt', en: 'The second half note, as a passing tone' }, correct: true },
          { text: { vi: 'Nốt trắng thứ nhất', en: 'The first half note' } },
          { text: { vi: 'Không nốt nào', en: 'Neither' } },
        ],
      },
      reason: {
        vi: 'Nốt trắng thứ nhất luôn là thuận âm; nốt thứ hai chỉ được là nghịch âm khi đến và rời đi liền bậc, cùng hướng.',
        en: 'The first half note is always consonant; the second may be dissonant only when approached and left by step in one direction.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở đối âm loài 3, phách nào luôn phải là thuận âm?', en: 'In third species, which beat must always be consonant?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Phách 1', en: 'Beat 1' }, correct: true },
          { text: { vi: 'Phách 2', en: 'Beat 2' } },
          { text: { vi: 'Phách 4', en: 'Beat 4' } },
        ],
      },
      reason: {
        vi: 'Phách 1 luôn là thuận âm; nốt lướt chỉ nằm ở phách 2, 3 hoặc 4.',
        en: 'Beat 1 is always consonant; passing tones fall only on beats 2, 3 or 4.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Ở loài 4, nốt treo {F4} trên {G3} (quãng 7) giải quyết về nốt nào?',
        en: 'In fourth species, a suspended {F4} over {G3} (a 7th) resolves to which note?',
      },
      answer: { type: 'key', note: 'E', blackKeys: 'b' },
      reason: {
        vi: 'Nốt treo giải quyết liền bậc xuống: {F4} xuống {E4}, quãng 6 trên {G3}, tức nốt treo 7–6.',
        en: 'A suspension resolves down by step: {F4} down to {E4}, a 6th above {G3}, so a 7–6 suspension.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bè trên của loài 4 được dùng những nốt treo nào?', en: 'Which suspensions may the upper voice use in fourth species?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '4–3 và 7–6', en: '4–3 and 7–6' }, correct: true },
          { text: { vi: '9–8 và 2–1', en: '9–8 and 2–1' } },
          { text: { vi: 'Cả bốn loại', en: 'All four' } },
        ],
      },
      reason: {
        vi: 'Ở bè trên chỉ dùng nốt treo 4–3 và 7–6; 9–8 và 2–1 không được dùng.',
        en: 'The upper voice uses only 4–3 and 7–6 suspensions; 9–8 and 2–1 are not allowed.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Chủ đề một invention ở giọng {F} trưởng bắt đầu bằng {F}. Ở ô 3, nó bắt đầu bằng nốt nào?',
        en: 'An invention theme in {F} major starts on {F}. Which note does it start on in measure 3?',
      },
      answer: { type: 'key', note: 'C', blackKeys: 'b' },
      reason: {
        vi: 'Ô 3 nêu chủ đề cao hơn quãng 5 đúng: {F} lên {C}, nốt gốc của hợp âm V.',
        en: 'Measure 3 states the theme a perfect 5th higher: {F} up to {C}, the root of the V chord.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Phúc đáp trong fugue là chủ đề ở giọng nào?', en: 'In a fugue, the answer is the subject in which key?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Giọng át', en: 'The dominant' }, correct: true },
          { text: { vi: 'Giọng hạ át', en: 'The subdominant' } },
          { text: { vi: 'Giọng song song', en: 'The relative key' } },
        ],
      },
      reason: {
        vi: 'Bè thứ hai vào nêu chủ đề ở giọng át; đó là phúc đáp, thực hoặc theo giọng.',
        en: 'The second voice to enter states the subject in the dominant key; that is the answer, real or tonal.',
      },
    },
  ],
} satisfies Lesson
