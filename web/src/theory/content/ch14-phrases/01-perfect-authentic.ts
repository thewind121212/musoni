import type { Lesson } from '@/theory/types'

/**
 * Book 13.1: the authentic cadence split in two, perfect (V–I, both in root
 * position, the tonic on top) and imperfect (any of the three missing).
 * Our own four-part cadences. No practice link: no drill asks cadences.
 */
export default {
  id: 'perfect-authentic',
  title: { vi: 'Kết chính hoàn toàn', en: 'The perfect authentic cadence' },
  minutes: 4,
  sources: [{ section: '13.1', url: 'https://musictheory.pugetsound.edu/mt21c/PerfectAuthenticCadence.html' }],
  recap: [
    { vi: 'PAC: V–I, cả hai ở thế gốc, chủ âm ở bè cao nhất', en: 'PAC: V–I, both in root position, the tonic in the top voice' },
    { vi: 'Thiếu một trong ba điều đó là IAC', en: 'Missing any one of the three makes an IAC' },
    { vi: 'vii°–I luôn là IAC', en: 'vii°–I is always an IAC' },
    { vi: 'PAC nghe dứt khoát hơn IAC', en: 'A PAC sounds more final than an IAC' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Hai loại kết chính', en: 'Two kinds of authentic cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Kết chính (V–I) chia làm hai loại: **kết chính hoàn toàn** (perfect authentic cadence, PAC) và **kết chính không hoàn toàn** (imperfect authentic cadence, IAC).',
            en: 'The authentic cadence (V–I) comes in two kinds: the **perfect authentic cadence** (PAC) and the **imperfect authentic cadence** (IAC).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Kết chính hoàn toàn cần đủ ba điều: V đi đến I, cả hai hợp âm ở thế gốc, và chủ âm (bậc 1) ở bè cao nhất của hợp âm I.',
            en: 'A perfect authentic cadence must meet three requirements: V goes to I, both chords are in root position, and the tonic (scale degree 1) is in the highest voice of the I chord.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'G2+D4+G4+B4 C3+E4+G4+C5', labels: ['V', 'I'] },
        { type: 'play', notes: 'G2+D4+G4+B4:h C3+E4+G4+C5:w', label: { vi: 'Nghe kết chính hoàn toàn', en: 'Hear a PAC' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Kết chính hoàn toàn ở giọng {G} trưởng: nốt cao nhất của hợp âm cuối là nốt gì?',
        en: 'A PAC in {G} major: what is the highest note of the last chord?',
      },
      blocks: [
        { type: 'staff', clef: 'grand', key: 'G', notes: 'D3+A3+D4+F#4 G2+B3+D4+G4', labels: ['V', 'I'] },
        { type: 'play', notes: 'D3+A3+D4+F#4:h G2+B3+D4+G4:w' },
      ],
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Nốt cao nhất là {G4}, chủ âm của giọng {G} trưởng, đúng như kết chính hoàn toàn đòi hỏi.',
        en: 'The highest note is {G4}, the tonic of {G} major, just as a PAC requires.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Kết chính không hoàn toàn', en: 'The imperfect authentic cadence' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Thiếu một trong ba điều, ta có kết chính không hoàn toàn. Đó là khi bè cao nhất không phải chủ âm, khi một hợp âm ở thế đảo, hoặc khi vii° thay cho V.',
            en: 'If any one of the three requirements is missing, the cadence is an imperfect authentic cadence. That is when the top voice is not the tonic, when a chord is inverted, or when vii° takes the place of V.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'G2+G3+B3+D4 C3+G3+C4+E4 || B2+G3+D4+G4 C3+G3+E4+C5 || D3+F4+B4 C3+E4+G4+C5',
          labels: ['V', 'I', 'V', 'I', 'vii°', 'I'],
        },
        { type: 'play', notes: 'G2+G3+B3+D4:h C3+G3+C4+E4:h R:h B2+G3+D4+G4:h C3+G3+E4+C5:h R:h D3+F4+B4:h C3+E4+G4+C5:h' },
        {
          type: 'text',
          text: {
            vi: 'Cả ba vẫn về hợp âm I, nhưng nghe nhẹ hơn. Kết chính hoàn toàn nghe dứt khoát nhất.',
            en: 'All three still arrive on I, but they sound lighter. The perfect authentic cadence sounds the most final.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Kết này là kết gì?', en: 'Which cadence is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'G2+B3+D4+G4 C3+C4+E4+G4', labels: ['V', 'I'] },
        { type: 'play', notes: 'G2+B3+D4+G4:h C3+C4+E4+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính hoàn toàn (PAC)', en: 'Perfect authentic (PAC)' } },
          { text: { vi: 'Kết chính không hoàn toàn (IAC)', en: 'Imperfect authentic (IAC)' }, correct: true },
        ],
      },
      reason: {
        vi: 'Cả hai hợp âm ở thế gốc, nhưng bè cao nhất của I là {G4}, bậc 5, không phải chủ âm.',
        en: 'Both chords are in root position, but the top voice of I is {G4}, scale degree 5, not the tonic.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt bass của hợp âm V ở đây là {B2}. Đây là kết gì?', en: 'The bass note of V here is {B2}. Which cadence is this?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'B2+G3+D4+G4 C3+G3+E4+C5', labels: ['V', 'I'] },
        { type: 'play', notes: 'B2+G3+D4+G4:h C3+G3+E4+C5:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Kết chính hoàn toàn (PAC)', en: 'Perfect authentic (PAC)' } },
          { text: { vi: 'Kết chính không hoàn toàn (IAC)', en: 'Imperfect authentic (IAC)' }, correct: true },
          { text: { vi: 'Kết lửng', en: 'Half cadence' } },
        ],
      },
      reason: {
        vi: 'Bass {B} là nốt ba của V, nên V ở thế đảo 1: dù chủ âm ở trên cùng, kết vẫn không hoàn toàn.',
        en: 'The bass {B} is the third of V, so V is in first inversion: even with the tonic on top, the cadence is imperfect.',
      },
    },
  ],
} satisfies Lesson
