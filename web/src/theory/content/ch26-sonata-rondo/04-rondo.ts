import type { Lesson } from '@/theory/types'

/**
 * Book 25.3 and 25.3.1: rondo form, the seven-part rondo's key plan (the
 * book's diagram, an image, given here as a staff of key chords), Beethoven's
 * Pathétique finale as a key plan only (no score), and sonata rondo. The
 * little rondos are our own.
 */
export default {
  id: 'rondo',
  title: { vi: 'Hình thức rondo', en: 'Rondo form' },
  minutes: 5,
  sources: [{ section: '25.3', url: 'https://musictheory.pugetsound.edu/mt21c/RondoForm.html' }],
  recap: [
    { vi: 'Rondo: đoạn điệp A xen kẽ các đoạn xen B, C', en: 'Rondo: a refrain (A) alternating with episodes (B, C)' },
    { vi: 'Rondo năm phần A B A C A hoặc A B A B A; bảy phần A B A C A B A', en: 'Five-part rondo ABACA or ABABA; seven-part ABACABA' },
    { vi: 'Đoạn điệp luôn ở giọng chủ; B ở V (trưởng) hoặc III (thứ)', en: 'The refrain is always in tonic; B is in V (major) or III (minor)' },
    { vi: 'Sonata-rondo thay đoạn C bằng phần phát triển', en: 'Sonata rondo replaces C with a development' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đoạn điệp và đoạn xen', en: 'Refrain and episodes' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Rondo** mở đầu bằng **đoạn điệp** (refrain, đoạn A), rồi đoạn điệp xen kẽ với các **đoạn xen** (episode, đoạn B và C).',
            en: 'A **rondo** begins with a **refrain** (an A section) that alternates with **episodes** (B and C).',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Hình thức rondo năm phần** (five-part rondo) là A B A C A hoặc A B A B A. **Rondo bảy phần** (seven-part rondo) thường là A B A C A B A.',
            en: 'The **five-part rondo** has ABACA or ABABA form. The **seven-part rondo** typically has ABACABA form.',
          },
        },
        {
          type: 'play',
          notes: 'E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q | D5:q B4:8 G4:8 A4:8 F#4:8 G4:q | E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q | C5:q A4:8 E4:8 B4:8 G#4:8 A4:q | E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q',
          bpm: 110,
          label: { vi: 'Nghe một rondo nhỏ A B A C A', en: 'Hear a tiny rondo, ABACA' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Kế hoạch giọng', en: 'The key plan' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Đoạn điệp luôn ở giọng chủ. Đoạn xen B ở giọng gần: V nếu ở giọng trưởng, III nếu ở giọng thứ. Đoạn xen C đa dạng hơn: giọng chủ thứ, vi hoặc IV (ở giọng thứ: I, VI hoặc iv).',
            en: 'The refrain is always in tonic. The first episode (B) is in a closely related key: V in major, III in minor. The second episode (C) varies more: tonic minor, vi or IV (in minor: I, VI or iv).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Trước mỗi lần đoạn điệp trở lại có một **đoạn chuyển trở về** (retransition).',
            en: 'A **retransition** leads back to each return of the refrain.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+E4+G4 G4+B4+D5 C4+E4+G4 A4+C5+E5 C4+E4+G4 C4+E4+G4 C4+E4+G4',
          labels: ['A\nI', 'B\nV', 'A\nI', 'C\nvi', 'A\nI', 'B\nI', 'A\nI'],
        },
        { type: 'play', notes: 'C4+E4+G4 G4+B4+D5 C4+E4+G4 A4+C5+E5 C4+E4+G4 C4+E4+G4 C4+E4+G4', label: { vi: 'Nghe giọng của từng đoạn trong {C} trưởng', en: 'Hear each section’s key in {C} major' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một rondo ở giọng {C} thứ có đoạn xen B ở giọng III. Chủ âm của giọng đó là nốt nào?',
        en: 'A rondo in {C} minor has its B section in III. What is that key’s tonic?',
      },
      answer: { type: 'key', note: 'Eb' },
      reason: {
        vi: 'Bậc III của {C} thứ là {Eb}, nên đoạn B ở giọng {Eb} trưởng, giọng song song trưởng.',
        en: 'The third degree of {C} minor is {Eb}, so B is in {Eb} major, the relative major.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Rondo bảy phần của Beethoven', en: 'A seven-part rondo by Beethoven' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Chương III của sonata Pathétique Op.13 của Beethoven là rondo bảy phần ở giọng {C} thứ. Đoạn B ở {Eb} trưởng (III), đoạn C ở {Ab} trưởng (VI).',
            en: 'The third movement of Beethoven’s Pathétique Sonata, Op.13, is a seven-part rondo in {C} minor. B is in {Eb} major (III), C in {Ab} major (VI).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Lần sau, đoạn B trở lại ở {C} trưởng, giọng chủ trưởng. Đoạn B nghe ngoài giọng chủ rồi về giọng chủ: đó là nguyên tắc sonata.',
            en: 'Later, B returns in {C} major, the tonic major. B heard first outside the tonic and later in tonic is the sonata principle at work.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+Eb4+G4 Eb4+G4+Bb4 C4+Eb4+G4 Ab4+C5+Eb5 C4+Eb4+G4 C4+E4+G4 C4+Eb4+G4',
          labels: ['A\ni', 'B\nIII', 'A\ni', 'C\nVI', 'A\ni', 'B\nI', 'A\ni'],
        },
        { type: 'play', notes: 'C4+Eb4+G4 Eb4+G4+Bb4 C4+Eb4+G4 Ab4+C5+Eb5 C4+Eb4+G4 C4+E4+G4 C4+Eb4+G4', label: { vi: 'Nghe kế hoạch giọng', en: 'Hear the key plan' } },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Đoạn C của Beethoven ở giọng {Ab} trưởng. Đó là bậc nào của {C} thứ?',
        en: 'Beethoven’s C section is in {Ab} major. Which degree of {C} minor is that?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'III', en: 'III' } },
          { text: { vi: 'iv', en: 'iv' } },
          { text: { vi: 'VI', en: 'VI' }, correct: true },
        ],
      },
      reason: {
        vi: 'Đếm từ {C}: {C} {D} {Eb} {F} {G} {Ab}, nên {Ab} là bậc 6, hợp âm VI.',
        en: 'Count up from {C}: {C} {D} {Eb} {F} {G} {Ab}, so {Ab} is the sixth degree, VI.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Sonata-rondo', en: 'Sonata rondo' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hình thức sonata-rondo** (sonata rondo form) là rondo bảy phần có đoạn xen thứ hai (C) được thay bằng phần phát triển: A-B-A-Phát triển-A-B-A.',
            en: '**Sonata rondo form** is a rondo in which the second episode (C) is replaced by a development section: A-B-A-Dev.-A-B-A.',
          },
        },
        {
          type: 'play',
          notes: 'E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q | D5:q B4:8 G4:8 A4:8 F#4:8 G4:q | E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q | E5:8 C5:8 F5:8 D5:8 G5:8 Eb5:8 Ab5:8 F5:8 | G5:8 D5:8 F5:8 B4:8 G4:q R:q | E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q | G4:q E4:8 C4:8 D4:8 B3:8 C4:q | E5:8 C5:8 G5:8 E5:8 D5:8 B4:8 C5:q',
          bpm: 110,
          label: { vi: 'Nghe một sonata-rondo nhỏ', en: 'Hear a tiny sonata rondo' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Sonata-rondo thay đoạn nào bằng phần phát triển?', en: 'Which section does sonata rondo replace with a development?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Đoạn điệp A', en: 'The refrain, A' } },
          { text: { vi: 'Đoạn xen thứ nhất, B', en: 'The first episode, B' } },
          { text: { vi: 'Đoạn xen thứ hai, C', en: 'The second episode, C' }, correct: true },
        ],
      },
      reason: {
        vi: 'A-B-A-C-A-B-A thành A-B-A-Phát triển-A-B-A: chỉ đoạn C đổi.',
        en: 'ABACABA becomes A-B-A-Dev.-A-B-A: only C changes.',
      },
    },
  ],
} satisfies Lesson
