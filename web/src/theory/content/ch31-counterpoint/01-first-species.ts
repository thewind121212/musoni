import type { Lesson } from '@/theory/types'

/**
 * Book 30.1-30.2: counterpoint and species counterpoint (Fux), the cantus
 * firmus, first species note against note, consonance and dissonance, the
 * beginning and ending, and perfect consonances approached by contrary motion.
 */
export default {
  id: 'first-species',
  title: { vi: 'Đối âm và đối âm loài 1', en: 'Counterpoint and first species' },
  minutes: 5,
  sources: [
    { section: '30.1', url: 'https://musictheory.pugetsound.edu/mt21c/SpeciesCounterpoint.html' },
    { section: '30.2', url: 'https://musictheory.pugetsound.edu/mt21c/FirstSpecies.html' },
  ],
  practice: { drill: 'intervals', level: 1, durationSec: 60 },
  recap: [
    { vi: 'Đối âm là nhiều giai điệu vang lên cùng lúc', en: 'Counterpoint is several melodic lines sounding at once' },
    { vi: 'Loài 1: nốt chọi nốt trên giai điệu định sẵn', en: 'First species: note against note over a cantus firmus' },
    { vi: 'Chỉ dùng thuận âm; bắt đầu và kết thúc bằng quãng 8', en: 'Consonances only; begin and end on an octave' },
    { vi: 'Đến quãng 5 và 8 bằng chuyển động ngược chiều', en: 'Approach 5ths and octaves by contrary motion' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Đối âm là gì', en: 'What counterpoint is' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Đối âm** (counterpoint) là hai hay nhiều giai điệu vang lên cùng lúc, mỗi bè đi theo đường riêng. Kết cấu làm bằng đối âm là **kết cấu đối âm** (contrapuntal texture), khác với **kết cấu chủ điệu** (homophonic texture): một giai điệu với phần đệm.',
            en: '**Counterpoint** is two or more melodic lines sounding at the same time, each going its own way. A texture made of counterpoint is **contrapuntal**, in contrast to a **homophonic** texture: a melody with accompaniment.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Sách Gradus ad Parnassum (1725) của Fux dạy đối âm qua **đối âm loài** (species counterpoint): viết một, hai, ba hay bốn nốt trên mỗi nốt tròn của một giai điệu cho sẵn. Chương này viết cho hai bè.',
            en: 'Fux’s Gradus ad Parnassum (1725) teaches counterpoint through **species counterpoint**: writing one, two, three or four notes against each whole note of a given melody. This chapter writes for two voices.',
          },
        },
        { type: 'staff', clef: 'grand', time: '4/4', notes: 'C3+C5:q D3+B4:q E3+C5:q F3+A4:q | G3+B4:h C3+C5:h ||' },
        { type: 'play', notes: 'C3+C5:q D3+B4:q E3+C5:q F3+A4:q G3+B4:h C3+C5:h', label: { vi: 'Nghe hai bè', en: 'Hear two voices' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Giai điệu định sẵn và loài 1', en: 'The cantus firmus and first species' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bạn được cho một giai điệu bằng nốt tròn, gọi là **giai điệu định sẵn** (cantus firmus), rồi viết một bè đối âm cho nó. **Đối âm loài 1** (first species) là nốt chọi nốt: mỗi ô nhịp một nốt tròn ở mỗi bè.',
            en: 'You are given a melody in whole notes, the **cantus firmus**, and write a counterpoint against it. **First species** is note against note: one whole note in each voice in each measure.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Số dưới mỗi nốt là quãng giữa hai bè, đếm từ bè dưới, quãng kép rút gọn (quãng 15 ghi là 8). Bè đối âm chỉ nhảy quãng 3, 4, 5, 8 hoặc quãng 6 thứ đi lên, và tránh lặp nốt.',
            en: 'The number under each note is the interval between the voices, counted from the lower one, with compounds reduced (a 15th is written 8). The counterpoint leaps only by 3rds, 4ths, 5ths, octaves or a rising minor 6th, and avoids repeated notes.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C3+C5 | E3+B4 | F3+A4 | G3+G4 | E3+C5 | D3+B4 | C3+C5 ||',
          labels: ['8', '5', '3', '8', '6', '6', '8'],
        },
        {
          type: 'play',
          notes: 'C3+C5:h E3+B4:h F3+A4:h G3+G4:h E3+C5:h D3+B4:h C3+C5:w',
          label: { vi: 'Nghe đối âm loài 1', en: 'Hear first species' },
        },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Thuận âm và nghịch âm', en: 'Consonance and dissonance' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ở loài 1, mọi quãng giữa hai bè phải là **thuận âm** (consonance): quãng đồng âm, 3, 5, 6, 8 và quãng kép của chúng (10, 12, 13). Quãng 2, 4 và 7 là **nghịch âm** (dissonance), không được dùng.',
            en: 'In first species every interval between the voices must be a **consonance**: unisons, 3rds, 5ths, 6ths, octaves and their compounds (10ths, 12ths, 13ths). 2nds, 4ths and 7ths are **dissonances** and are not allowed.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Quãng đồng âm, 5 và 8 là **thuận âm hoàn toàn** (perfect consonance); quãng 3 và 6 là **thuận âm không hoàn toàn** (imperfect consonance). Đừng dùng quá ba quãng 3 hay ba quãng 6 liền nhau.',
            en: 'Unisons, 5ths and octaves are **perfect consonances**; 3rds and 6ths are **imperfect consonances**. Do not use more than three 3rds or three 6ths in a row.',
          },
        },
        {
          type: 'staff',
          clef: 'treble',
          notes: 'C4+E4 C4+G4 C4+A4 C4+C5 || C4+D4 C4+F4 C4+B4 ||',
          labels: ['3', '5', '6', '8', '2', '4', '7'],
          highlight: [4, 5, 6],
        },
        { type: 'play', notes: 'C4+E4 C4+G4 C4+A4 C4+C5 C4+D4 C4+F4 C4+B4', label: { vi: 'Nghe thuận âm rồi nghịch âm', en: 'Hear consonances, then dissonances' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Quãng giữa hai bè là quãng mấy (rút gọn)?', en: 'What is the interval between the voices (reduced)?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'D3+B4' },
        { type: 'play', notes: 'D3+B4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5', en: 'A 5th' } },
          { text: { vi: 'Quãng 6', en: 'A 6th' }, correct: true },
          { text: { vi: 'Quãng 7', en: 'A 7th' } },
        ],
      },
      reason: {
        vi: '{D} lên {B} là quãng 6 (quãng 13 rút gọn), một thuận âm không hoàn toàn.',
        en: '{D} up to {B} is a 6th (a 13th reduced), an imperfect consonance.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Bắt đầu, kết thúc, chuyển động', en: 'Beginning, ending and motion' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Bắt đầu và kết thúc bằng quãng 8 hoặc đồng âm. Ở hai ô cuối, một bè đi bậc 7–8, bè kia đi bậc 2–1, theo **chuyển động ngược chiều** (contrary motion): một bè lên, một bè xuống.',
            en: 'Begin and end on an octave or unison. Over the last two measures one voice moves from degree 7 to 8 and the other from 2 to 1, in **contrary motion**: one voice up, the other down.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Chỉ đến thuận âm hoàn toàn bằng chuyển động ngược chiều. Hai quãng 5 liền nhau là **quãng 5 song song** (parallel fifths); đi **cùng chiều** (similar motion) vào quãng 5 hay 8 là **quãng 5 ẩn, quãng 8 ẩn** (direct fifths, octaves), đều bị cấm.',
            en: 'Approach a perfect consonance only by contrary motion. Two 5ths in a row are **parallel fifths**; moving in **similar motion** into a 5th or octave makes **direct fifths or octaves**, and all are forbidden.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'D3+A4 E3+B4 || E3+B4 D3+D5 ||', labels: ['5', '5', '5', '8'], highlight: [1] },
        { type: 'play', notes: 'D3+A4:h E3+B4:h R:h E3+B4:h D3+D5:h', label: { vi: 'Nghe sai rồi đúng', en: 'Hear wrong, then right' } },
        {
          type: 'tip',
          text: {
            vi: 'Khi giai điệu định sẵn ở bè trên, viết bè dưới cách nó quãng đồng âm, 3, 5 hoặc 6. Ở giọng {A} thứ, thêm dấu thăng cho bậc 7 ({G#}) để có cảm âm.',
            en: 'With the cantus firmus on top, write the lower voice a unison, 3rd, 5th or 6th below it. In {A} minor, sharpen degree 7 ({G#}) to make a leading tone.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Giai điệu định sẵn ở giọng {C} trưởng kết thúc {D3}–{C3}. Bè trên ở ô áp chót là nốt nào?',
        en: 'A cantus firmus in {C} major ends {D3}–{C3}. Which note does the upper voice take in the next-to-last measure?',
      },
      blocks: [{ type: 'staff', clef: 'grand', notes: 'D3 | C3+C5 ||' }],
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Bè dưới đi bậc 2–1, nên bè trên đi bậc 7–8: {B4} lên {C5}, ngược chiều với bè dưới.',
        en: 'The lower voice moves 2–1, so the upper voice moves 7–8: {B4} up to {C5}, in contrary motion.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai ô nhịp này phạm luật nào?', en: 'Which rule do these two measures break?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'F3+A4 | G3+D5 ||', labels: ['3', '5'] },
        { type: 'play', notes: 'F3+A4:h G3+D5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 5 ẩn: vào quãng 5 bằng chuyển động cùng chiều', en: 'A direct fifth: a 5th reached in similar motion' }, correct: true },
          { text: { vi: 'Quãng 5 song song', en: 'Parallel fifths' } },
          { text: { vi: 'Có một nghịch âm', en: 'It uses a dissonance' } },
        ],
      },
      reason: {
        vi: 'Cả hai bè cùng đi lên vào quãng 5, mà thuận âm hoàn toàn chỉ được đến bằng chuyển động ngược chiều.',
        en: 'Both voices rise into a 5th, but a perfect consonance may only be approached by contrary motion.',
      },
    },
  ],
} satisfies Lesson
