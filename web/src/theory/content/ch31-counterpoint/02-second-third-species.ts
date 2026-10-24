import type { Lesson } from '@/theory/types'

/**
 * Book 30.3-30.4: second species (two half notes per whole note, the passing
 * tone, rules across the bar line, the ending) and third species (four
 * quarters, consonant downbeats, the 4-5-6-7 and cambiata endings).
 *
 * The staves can hold one rhythm per event, so the counterpoint (treble) and
 * the cantus firmus (bass) are drawn as two staves; playback strikes the
 * cantus firmus note again under each counterpoint note.
 */
export default {
  id: 'second-third-species',
  title: { vi: 'Đối âm loài 2 và loài 3', en: 'Second and third species' },
  minutes: 5,
  sources: [
    { section: '30.3', url: 'https://musictheory.pugetsound.edu/mt21c/SecondSpecies.html' },
    { section: '30.4', url: 'https://musictheory.pugetsound.edu/mt21c/ThirdSpecies.html' },
  ],
  practice: { drill: 'intervals', level: 1, durationSec: 120 },
  recap: [
    { vi: 'Loài 2: hai nốt trắng trên mỗi nốt tròn', en: 'Second species: two half notes per whole note' },
    { vi: 'Loài 3: bốn nốt đen, phách 1 luôn là thuận âm', en: 'Third species: four quarters, beat 1 always consonant' },
    { vi: 'Nghịch âm được dùng: nốt lướt và hình cambiata', en: 'Allowed dissonances: passing tones and the cambiata' },
    { vi: 'Qua vạch nhịp, đến quãng 5 và 8 bằng chuyển động ngược chiều', en: 'Across the bar line, reach 5ths and octaves by contrary motion' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đối âm loài 2', en: 'Second species' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **đối âm loài 2** (second species), bè đối âm có hai nốt trắng trên mỗi nốt tròn của giai điệu định sẵn. Bắt đầu bằng quãng 8 hoặc đồng âm, ở phách 1 hoặc phách 3 (khi đó ô đầu mở bằng một lặng trắng).',
            en: 'In **second species** the counterpoint has two half notes against each whole note of the cantus firmus. Begin on an octave or unison, on beat 1 or beat 3 (then the first measure opens with a half rest).',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Nốt trắng thứ nhất luôn là thuận âm. Nốt thứ hai có thể là nghịch âm, nhưng chỉ khi nó là **nốt lướt** (passing tone): đến và rời đi liền bậc, cùng một hướng.',
            en: 'The first half note is always a consonance. The second may be a dissonance, but only as a **passing tone**: approached and left by step in the same direction.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C5:h G4:h | C5:h B4:h | A4:h C5:h | B4:h A4:h | G4:h E4:h | A4:h B4:h | C5:w ||',
          labels: ['8', '5', '6', '5', '3', '5', '3', '2', '3', '8', '5', '6', '8'],
          highlight: [7],
        },
        { type: 'staff', clef: 'bass', notes: 'C3 | E3 | F3 | G3 | E3 | D3 | C3 ||' },
        {
          type: 'play',
          notes: 'C3+C5:h C3+G4:h E3+C5:h E3+B4:h F3+A4:h F3+C5:h G3+B4:h G3+A4:h E3+G4:h E3+E4:h D3+A4:h D3+B4:h C3+C5:w',
          label: { vi: 'Nghe đối âm loài 2', en: 'Hear second species' },
          bpm: 100,
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt {A4} ở đây là gì?', en: 'What is the {A4} here?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'B4:h A4:h | G4:w ||', labels: ['3', '2', '3'], highlight: [1] },
        { type: 'staff', clef: 'bass', notes: 'G3 | E3 ||' },
        { type: 'play', notes: 'G3+B4:h G3+A4:h E3+G4:w' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Một nốt lướt', en: 'A passing tone' }, correct: true },
          { text: { vi: 'Một thuận âm', en: 'A consonance' } },
          { text: { vi: 'Một lỗi: nghịch âm bị cấm', en: 'A mistake: dissonance is forbidden' } },
        ],
      },
      reason: {
        vi: '{A4} cách {G3} quãng 9 (quãng 2), nhưng nó đi liền bậc từ {B4} xuống {G4} ở nốt thứ hai, nên là nốt lướt hợp lệ.',
        en: '{A4} is a 9th (a 2nd) above {G3}, but it is the second note and moves by step from {B4} down to {G4}, so it is a proper passing tone.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Qua vạch nhịp và kết thúc', en: 'Across the bar line, and the ending' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Qua vạch nhịp, thuận âm không hoàn toàn đến cách nào cũng được, còn thuận âm hoàn toàn phải đến bằng chuyển động ngược chiều. Không lặp nốt qua vạch nhịp, và tránh quãng 8 hay quãng 5 ở hai phách mạnh liền nhau.',
            en: 'Across a bar line, imperfect consonances may be approached in any way, but perfect ones only by contrary motion. Do not repeat a note across the bar line, and avoid octaves or 5ths on consecutive downbeats.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Kết thúc bằng một nốt tròn ở quãng 8. Khi giai điệu định sẵn ở bè dưới, ô áp chót đi quãng 5 rồi quãng 6: bậc 6–7 trên bậc 2.',
            en: 'End with a whole note on an octave. With the cantus firmus below, the next-to-last measure goes 5th then 6th: degrees 6–7 over degree 2.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'A4:h B4:h | C5:w ||', labels: ['5', '6', '8'] },
        { type: 'staff', clef: 'bass', notes: 'D3 | C3 ||' },
        { type: 'play', notes: 'D3+A4:h D3+B4:h C3+C5:w', label: { vi: 'Nghe kết loài 2', en: 'Hear the second-species ending' } },
        {
          type: 'tip',
          text: {
            vi: 'Khi giai điệu định sẵn ở bè trên, ô áp chót của bè dưới đi quãng 5 rồi quãng 3: bậc 5–7 dưới bậc 2.',
            en: 'With the cantus firmus on top, the lower voice’s next-to-last measure goes 5th then 3rd: degrees 5–7 under degree 2.',
          },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Đối âm loài 3', en: 'Third species' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở **đối âm loài 3** (third species), bè đối âm có bốn nốt đen trên mỗi nốt tròn, trừ ô cuối. Phách 1 luôn là thuận âm; nốt lướt nằm ở phách 2, 3 hoặc 4, không bao giờ ở phách 1.',
            en: 'In **third species** the counterpoint has four quarter notes against each whole note, except in the last measure. Beat 1 is always a consonance; passing tones fall on beats 2, 3 or 4, never on beat 1.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Với giai điệu định sẵn ở bè dưới, ô áp chót có thể đi bậc 4–5–6–7 rồi lên bậc 8.',
            en: 'With the cantus firmus below, the next-to-last measure can climb degrees 4–5–6–7 to 8.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C5:q D5:q E5:q D5:q | C5:q B4:q A4:q G4:q | F4:q G4:q A4:q B4:q | C5:w ||',
          labels: ['8', '2', '3', '2', '6', '5', '4', '3', '3', '4', '5', '6', '8'],
          highlight: [1, 3, 6, 9],
        },
        { type: 'staff', clef: 'bass', notes: 'C3 | E3 | D3 | C3 ||' },
        {
          type: 'play',
          notes: 'C3+C5:q C3+D5:q C3+E5:q C3+D5:q E3+C5:q E3+B4:q E3+A4:q E3+G4:q D3+F4:q D3+G4:q D3+A4:q D3+B4:q C3+C5:w',
          label: { vi: 'Nghe đối âm loài 3', en: 'Hear third species' },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Theo công thức bậc 4–5–6–7 ở giọng {C} trưởng, ô áp chót của bè trên bắt đầu bằng nốt nào?',
        en: 'Using degrees 4–5–6–7 in {C} major, which note starts the upper voice’s next-to-last measure?',
      },
      answer: { type: 'key', note: 'F', blackKeys: '#' },
      reason: {
        vi: 'Bậc 4 của giọng {C} trưởng là {F}: {F}–{G}–{A}–{B}, rồi lên {C}.',
        en: 'Degree 4 of {C} major is {F}: {F}–{G}–{A}–{B}, then up to {C}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Hình cambiata', en: 'The cambiata' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Hình cambiata** (cambiata) đi liền bậc xuống một nghịch âm ở nốt thứ hai, nhảy xuống quãng 3, rồi đi liền bậc lên. Chỉ nốt thứ hai được là nghịch âm; ở ô áp chót nó cho công thức bậc 2–1–6–7.',
            en: 'The **cambiata** steps down to a dissonance on the second note, leaps down a 3rd, then steps up. Only the second note may be dissonant; in the next-to-last measure it gives the formula 2–1–6–7.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Như ở loài 2, quãng 5 hay quãng 8 ở phách 1 không được đến bằng chuyển động cùng chiều: đó là quãng 5 ẩn, quãng 8 ẩn.',
            en: 'As in second species, a 5th or octave on beat 1 may not be approached in similar motion: that makes direct fifths or octaves.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'D5:q C5:q A4:q B4:q | C5:w ||', labels: ['8', '7', '5', '6', '8'], highlight: [1] },
        { type: 'staff', clef: 'bass', notes: 'D3 | C3 ||' },
        { type: 'play', notes: 'D3+D5:q D3+C5:q D3+A4:q D3+B4:q C3+C5:w', label: { vi: 'Nghe hình cambiata', en: 'Hear the cambiata' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp loài 3 này sai ở đâu?', en: 'What is wrong with this third-species measure?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'A4:q G4:q F4:q E4:q ||', labels: ['2', '8', '7', '6'] },
        { type: 'staff', clef: 'bass', notes: 'G3 ||' },
        { type: 'play', notes: 'G3+A4:q G3+G4:q G3+F4:q G3+E4:q' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Có nghịch âm ở phách 1', en: 'A dissonance on beat 1' }, correct: true },
          { text: { vi: 'Có nốt lướt ở phách 3', en: 'A passing tone on beat 3' } },
          { text: { vi: 'Có quãng 8 ở phách 2', en: 'An octave on beat 2' } },
        ],
      },
      reason: {
        vi: '{A4} trên {G3} là quãng 9 (quãng 2) ở phách 1, mà phách 1 phải là thuận âm; {F4} ở phách 3 là nốt lướt hợp lệ.',
        en: '{A4} over {G3} is a 9th (a 2nd) on beat 1, which must be consonant; the {F4} on beat 3 is a proper passing tone.',
      },
    },
  ],
} satisfies Lesson
