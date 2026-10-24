import type { Lesson } from '@/theory/types'

/**
 * Book 29.1: secondary chords follow the rules for seventh chords (the seventh
 * falls by step, complete and incomplete voicings alternate, the raised third
 * falls a half step to the next seventh), secondary vii°7 resolve like vii°7,
 * and the unequal-fifths exception for vii°7/V to V.
 */
export default {
  id: 'secondary-chords',
  title: { vi: 'Hợp âm át phụ và giảm phụ', en: 'Secondary chords' },
  minutes: 5,
  sources: [{ section: '29.1', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceLeadingSecondaryChords.html' }],
  recap: [
    { vi: 'Nốt bảy của hợp âm phụ đi xuống một bậc', en: 'The seventh of a secondary chord falls by step' },
    { vi: 'Hợp âm bảy thế gốc nối nhau: xen kẽ xếp đủ và xếp thiếu', en: 'Successive root-position sevenths alternate complete and incomplete voicings' },
    { vi: 'Nốt ba được nâng có thể đi xuống nửa cung thành nốt bảy của hợp âm sau', en: 'The raised third can fall a half step to the next chord’s seventh' },
    { vi: 'vii°7/V đến V: quãng 5 không bằng nhau tốt hơn nhân đôi cảm âm', en: 'vii°7/V to V: unequal fifths beat a doubled leading tone' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Nốt bảy đi xuống', en: 'The seventh falls' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Dẫn bè** (voice leading) **hợp âm át phụ** (secondary dominant) cũng như hợp âm bảy: nốt bảy đi xuống một bậc. Trong V7/IV ở giọng {C} trưởng, nốt bảy {Bb} đi xuống {A}, còn {E}, cảm âm của {F}, đi lên {F}.',
            en: '**Voice leading** a **secondary dominant** follows the rules for seventh chords: the seventh falls by step. In V7/IV in {C} major, the seventh, {Bb}, falls to {A}, and {E}, the leading tone of {F}, rises to {F}.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'C3+G3+E4+C5:h C3+G3+E4+Bb4:h | F2+F3+F4+A4:w ||', labels: ['I', 'V7/IV', 'IV'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+C5:h C3+G3+E4+Bb4:h F2+F3+F4+A4:w', label: { vi: 'Nghe I–V7/IV–IV', en: 'Hear I–V7/IV–IV' } },
        {
          type: 'tip',
          text: {
            vi: 'Các ví dụ viết bốn bè: **bè soprano** (soprano) và **bè alto** (alto) ở khuông trên, **bè tenor** (tenor) và **bè bass** (bass) ở khuông dưới.',
            en: 'The examples are in four parts: the **soprano** and **alto** on the upper staff, the **tenor** and **bass** on the lower staff.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, V7/IV là {G}–{B}–{D}–{F}. Đến IV, nốt bảy {F} đi đến nốt nào?', en: 'In {G} major, V7/IV is {G}–{B}–{D}–{F}. Going to IV, where does the seventh, {F}, go?' },
      answer: { type: 'key', note: 'E', blackKeys: '#' },
      reason: {
        vi: 'Nốt bảy đi xuống một bậc: {F} xuống {E}, nốt năm của IV ({C}–{E}–{G}).',
        en: 'The seventh falls by step: {F} to {E}, the fifth of IV ({C}–{E}–{G}).',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Xếp đủ và xếp thiếu', en: 'Complete and incomplete voicings' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi các hợp âm bảy thế gốc nối nhau, hãy xen kẽ **xếp đủ** (complete voicing) với **xếp thiếu** (incomplete voicing), tức bỏ nốt năm và **nhân đôi** (doubling) nốt gốc.',
            en: 'When root-position seventh chords follow one another, alternate a **complete voicing** with an **incomplete voicing**, one that drops the fifth and has the root **doubled**.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt ba của hợp âm phụ, thường là nốt được nâng, đi xuống nửa cung thành nốt bảy của hợp âm sau. Ở đây {F#} xuống {F}, xóa dấu hóa vừa có.',
            en: 'The third of a secondary chord, usually a raised note, falls a half step to the seventh of the next chord. Here {F#} falls to {F}, cancelling the chromatic note.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'D3+C4@b+F#4+A4:h G2+B3+F4+G4:h | C3+C4@b+E4+G4:w ||', labels: ['V7/V', 'V7', 'I'], highlight: [0, 1] },
        { type: 'play', notes: 'D3+C4+F#4+A4:h G2+B3+F4+G4:h C3+C4+E4+G4:w', label: { vi: 'Nghe V7/V–V7–I', en: 'Hear V7/V–V7–I' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {C} trưởng, V7/V đi đến V7. Nốt ba {F#} của V7/V đi đến nốt nào?', en: 'In {C} major, V7/V goes to V7. Where does the third of V7/V, {F#}, go?' },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: '{F#} đi xuống nửa cung thành {F}, nốt bảy của V7 ({G}–{B}–{D}–{F}).',
        en: '{F#} falls a half step to {F}, the seventh of V7 ({G}–{B}–{D}–{F}).',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hợp âm giảm phụ', en: 'Secondary leading-tone chords' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hợp âm giảm phụ** (secondary leading-tone chord) vii°7/x và viiø7/x **giải quyết** (resolve) như vii°7: nốt gốc lên nửa cung, nốt bảy đi xuống. Ngoại lệ: vii°7/V đến V, khi giai điệu buộc nốt bảy nằm trên nốt ba.',
            en: 'A **secondary leading-tone chord**, vii°7/x or viiø7/x, **resolves** like vii°7: the root rises a half step and the seventh falls. The exception: vii°7/V to V, when the melody needs the seventh above the third.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Khi đó hãy viết **quãng 5 không bằng nhau** (unequal fifths), quãng 5 giảm sang quãng 5 đúng, thay vì nhân đôi cảm âm. Ở đây {A}–{Eb} đi đến {G}–{D}.',
            en: 'Then write **unequal fifths**, a diminished fifth moving to a perfect fifth, rather than doubling the leading tone. Here {A}–{Eb} moves to {G}–{D}.',
          },
        },
        { type: 'staff', clef: 'grand', key: 'C', time: '4/4', notes: 'F#2+A3+Eb4+C5:h G2+G3+D4+B4:h ||', labels: ['vii°7\n/V', 'V'] },
        { type: 'play', notes: 'F#2+A3+Eb4+C5:h G2+G3+D4+B4:w', label: { vi: 'Nghe vii°7/V–V', en: 'Hear vii°7/V–V' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'vii°7/V đến V, nốt bảy {Eb} nằm trên nốt ba {A}. Nên dẫn {A} thế nào?', en: 'vii°7/V to V, with the seventh, {Eb}, above the third, {A}. How should {A} move?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Xuống {G}, chấp nhận quãng 5 không bằng nhau', en: 'Down to {G}, accepting unequal fifths' }, correct: true },
          { text: { vi: 'Lên {B}, nhân đôi cảm âm', en: 'Up to {B}, doubling the leading tone' } },
          { text: { vi: 'Giữ nguyên {A}', en: 'Hold {A}' } },
        ],
      },
      reason: {
        vi: 'Nhân đôi cảm âm {B} bị coi là kém hơn, nên viết quãng 5 giảm {A}–{Eb} sang quãng 5 đúng {G}–{D}.',
        en: 'A doubled leading tone, {B}, is less acceptable, so write the diminished fifth {A}–{Eb} moving to the perfect fifth {G}–{D}.',
      },
    },
  ],
} satisfies Lesson
