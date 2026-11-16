const fs = require('fs');
const path = require('path');

const examsPath = path.join(__dirname, '../src/data/allTopicExams.json');
const exams = JSON.parse(fs.readFileSync(examsPath, 'utf8'));
const topics = JSON.parse(fs.readFileSync('./scripts/all80Topics.json', 'utf8'));

const topicMap = new Map();
for (const t of topics) {
  topicMap.set(t.id, t);
}

const VOICES = [
  { voice: 'Google-UK', speaker: 'British English (Sonia)' },
  { voice: 'Puck', speaker: 'American English (Puck)' },
  { voice: 'British-Male', speaker: 'British English (Ryan)' },
  { voice: 'Kore', speaker: 'American English (Kore)' },
  { voice: 'Google-AU', speaker: 'Australian English (Natasha)' },
];

let updatedCount = 0;

for (const [topicId, questions] of Object.entries(exams)) {
  const baseId = topicId.replace('-listen', '');
  const topic = topicMap.get(baseId) || {
    id: topicId,
    level: 'B1',
    titleEn: 'English Communication Practice',
    titleUk: 'Практика спілкування',
  };

  const lvl = topic.level;
  const tEn = topic.titleEn;
  const tUk = topic.titleUk;

  // Generate 5 listening questions
  const q11Audio = `In today's lesson, we are focusing on ${tEn}. Everything is clear and structured.`;
  const q11 = {
    id: `${topicId}-exam-11`,
    type: 'multiple_choice',
    question: `🎧 [Аудіювання #1] Прослухайте аудіозапис носія мови та виберіть точний зміст почутого повідомлення:`,
    audioText: q11Audio,
    audioSpeaker: 'British English (Sonia)',
    audioVoice: 'Google-UK',
    options: [
      `Спікер стверджує, що все зрозуміло і структуровано в темі «${tUk}»`,
      `Спікер скаржиться на складність матеріалу та нестачу часу`,
      `Спікер пропонує відкласти вивчення теми на наступний місяць`,
      `Спікер повідомляє про технічні негаразди під час запису`
    ],
    correctAnswer: `Спікер стверджує, що все зрозуміло і структуровано в темі «${tUk}»`,
    explanationUk: `У записі чітко звучить: «${q11Audio}». Носій мови зазначає, що все зрозуміло та впорядковано.`
  };

  const q12Audio = `Could you please confirm if this rule applies to all standard cases?`;
  const q12 = {
    id: `${topicId}-exam-12`,
    type: 'multiple_choice',
    question: `🎧 [Аудіювання #2] Послухайте питання носія мови та виберіть найбільш природну відповідь:`,
    audioText: q12Audio,
    audioSpeaker: 'American English (Puck)',
    audioVoice: 'Puck',
    options: [
      `Yes, absolutely! It is standard practice in almost every context.`,
      `Yesterday I went to the supermarket by bicycle.`,
      `No, I do not like drinking cold water in winter.`,
      `Because my train was delayed by forty minutes.`
    ],
    correctAnswer: `Yes, absolutely! It is standard practice in almost every context.`,
    explanationUk: `Носій мови запитує: «${q12Audio}» (Чи підтверджуєте ви, що це правило діє для всіх стандартних випадків?). Логічна відповідь: «Yes, absolutely!...».`
  };

  const q13Audio = `Practice is essential because mastering ${tEn} requires consistent repetition.`;
  const q13 = {
    id: `${topicId}-exam-13`,
    type: 'multiple_choice',
    question: `🎧 [Аудіювання #3] Прослухайте репліку викладача та вкажіть, що є обов'язковим для опанування теми:`,
    audioText: q13Audio,
    audioSpeaker: 'British English (Ryan)',
    audioVoice: 'British-Male',
    options: [
      `Регулярне та послідовне повторення матеріалу (consistent repetition)`,
      `Вивчення правил виключно перед сном`,
      `Повна відмова від будь-яких практичних вправ`,
      `Механічне зазубрювання без розуміння логіки`
    ],
    correctAnswer: `Регулярне та послідовне повторення матеріалу (consistent repetition)`,
    explanationUk: `У репліці звучить: «${q13Audio}». Ключовий фактор успіху — consistent repetition (послідовне повторення).`
  };

  const q14Audio = `Look at these examples! Which sentence sounds most natural to you right now?`;
  const q14 = {
    id: `${topicId}-exam-14`,
    type: 'multiple_choice',
    question: `🎧 [Аудіювання #4] Послухайте звернення та оберіть, до чого закликає співрозмовник:`,
    audioText: q14Audio,
    audioSpeaker: 'American English (Kore)',
    audioVoice: 'Kore',
    options: [
      `Поглянути на приклади та визначити найбільш природний варіант`,
      `Закрити підручник і завершити заняття`,
      `Негайно зателефонувати в службу підтримки`,
      `Перевірити баланс банківського рахунку`
    ],
    correctAnswer: `Поглянути на приклади та визначити найбільш природний варіант`,
    explanationUk: `Фраза: «${q14Audio}» перекладається як: «Поглянь на ці приклади! Яке речення звучить для тебе найбільш природно просто зараз?».`
  };

  const q15Audio = `Congratulations on completing this section! Your dedication to learning English is remarkable.`;
  const q15 = {
    id: `${topicId}-exam-15`,
    type: 'multiple_choice',
    question: `🎧 [Аудіювання #5] Фінальне аудіозавдання: прослухайте підсумок носія мови та оберіть головну думку:`,
    audioText: q15Audio,
    audioSpeaker: 'Australian English (Natasha)',
    audioVoice: 'Google-AU',
    options: [
      `Привітання із завершенням розділу та висока оцінка старанності учня`,
      `Повідомлення про необхідність перескласти весь рівень з початку`,
      `Попередження про скасування сертифікату про проходження`,
      `Вибачення за складність тестових питань`
    ],
    correctAnswer: `Привітання із завершенням розділу та висока оцінка старанності учня`,
    explanationUk: `Фінальне повідомлення носія мови: «${q15Audio}» (Вітаємо із завершенням цього розділу! Ваша відданість вивченню англійської чудова!).`
  };

  // Keep first 10 questions and append the 5 listening questions
  const baseQuestions = questions.slice(0, 10);
  exams[topicId] = [...baseQuestions, q11, q12, q13, q14, q15];
  updatedCount++;
}

fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2));
console.log(`Successfully updated ${updatedCount} topic exams with listening comprehension questions!`);
console.log('Sample exam question 11:', exams[Object.keys(exams)[0]][10]);
