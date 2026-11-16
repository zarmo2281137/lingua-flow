const fs = require('fs');
const path = require('path');

const topics = JSON.parse(fs.readFileSync('./scripts/all80Topics.json', 'utf8'));

const ACCENT_PRESETS = [
  {
    accent: 'British (UK)',
    preferredVoice: 'Google-UK',
    speaker1: { name: 'Oliver', roleUk: 'Британець (Лондон)', voice: 'en-GB-RyanNeural', gender: 'male' },
    speaker2: { name: 'Sonia', roleUk: 'Британка (Оксфорд)', voice: 'en-GB-SoniaNeural', gender: 'female' },
  },
  {
    accent: 'American (US)',
    preferredVoice: 'Puck',
    speaker1: { name: 'Mark', roleUk: 'Американець (Нью-Йорк)', voice: 'en-US-GuyNeural', gender: 'male' },
    speaker2: { name: 'Jenny', roleUk: 'Американка (Бостон)', voice: 'en-US-JennyNeural', gender: 'female' },
  },
  {
    accent: 'Australian (AU)',
    preferredVoice: 'Google-AU',
    speaker1: { name: 'Jack', roleUk: 'Австралієць (Сідней)', voice: 'en-AU-WilliamNeural', gender: 'male' },
    speaker2: { name: 'Natasha', roleUk: 'Австралійка (Мельбурн)', voice: 'en-AU-NatashaNeural', gender: 'female' },
  },
  {
    accent: 'American (US)',
    preferredVoice: 'Charon',
    speaker1: { name: 'Christopher', roleUk: 'Викладач (Чикаго)', voice: 'en-US-ChristopherNeural', gender: 'male' },
    speaker2: { name: 'Aria', roleUk: 'Колега (Сан-Франциско)', voice: 'en-US-AriaNeural', gender: 'female' },
  },
];

// Helper to generate dialogues tailored to topic level and title
function generateDialogueAndExercises(topic, index) {
  const preset = ACCENT_PRESETS[index % ACCENT_PRESETS.length];
  const s1 = preset.speaker1;
  const s2 = preset.speaker2;

  let dialogue = [];
  let vocab = [];
  let exercises = [];
  let scenarioDesc = '';
  let titleUk = '';
  let titleEn = '';

  const lvl = topic.level;
  const tEn = topic.titleEn;
  const tUk = topic.titleUk;

  titleEn = `Dialogue: ${tEn}`;
  titleUk = `Аудіодіалог: ${tUk}`;
  scenarioDesc = `Жива розмова (${preset.accent}) між ${s1.name} та ${s2.name}, присвячена практичному вживанню конструкцій теми «${tUk}».`;

  if (lvl === 'A1') {
    dialogue = [
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Hello ${s2.name}! How are you doing today?`,
        textUk: `Привіт, ${s2.name}! Як твої справи сьогодні?`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Hi ${s1.name}! I am doing very well, thank you. Are you ready for our plan?`,
        textUk: `Привіт, ${s1.name}! У мене все чудово, дякую. Ти готовий до нашого плану?`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Yes, of course! Everything is prepared and in order. We have plenty of time.`,
        textUk: `Так, звісно! Все підготовлено і в порядку. У нас повно часу.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `That sounds wonderful. Let's make sure we follow our steps carefully.`,
        textUk: `Звучить чудово. Давай переконаємося, що ми уважно дотримуємося кроків.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `I agree completely. Practice makes perfect, and today is a great day for it.`,
        textUk: `Я повністю згоден. Практика веде до майстерності, і сьогодні чудовий день для цього.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Excellent! Thank you for your support, my friend. Let's get started.`,
        textUk: `Чудово! Дякую за підтримку, друже. Починаймо.`,
      },
    ];

    vocab = [
      { word: 'prepared', transcription: '/prɪˈpeəd/', translationUk: 'підготовлений', contextSentence: 'Everything is prepared and in order.' },
      { word: 'carefully', transcription: '/ˈkeə.fəl.i/', translationUk: 'уважно, обережно', contextSentence: 'Let\'s follow our steps carefully.' },
      { word: 'practice', transcription: '/ˈpræk.tɪs/', translationUk: 'практика', contextSentence: 'Practice makes perfect.' },
      { word: 'support', transcription: '/səˈpɔːt/', translationUk: 'підтримка', contextSentence: 'Thank you for your support.' },
    ];
  } else if (lvl === 'A2') {
    dialogue = [
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Good morning ${s2.name}! Did you see the updates regarding our schedule yesterday?`,
        textUk: `Доброго ранку, ${s2.name}! Ти бачила оновлення щодо нашого розкладу вчора?`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Yes, I did! I checked my messages while I was traveling back home. It was quite interesting.`,
        textUk: `Так! Я перевірила повідомлення, коли поверталася додому. Це було досить цікаво.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Great. If we finish our tasks earlier today, we will be able to relax in the evening.`,
        textUk: `Чудово. Якщо ми закінчимо завдання раніше сьогодні, ми зможемо відпочити ввечері.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `I used to work late, but now I prefer organizing everything in advance.`,
        textUk: `Раніше я працювала допізна, але зараз віддаю перевагу організації всього заздалегідь.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `That is much more efficient. Should we review the main points right now?`,
        textUk: `Це набагато ефективніше. Чи варто нам переглянути головні пункти просто зараз?`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Definitely. Let's look at the key details together.`,
        textUk: `Безумовно. Давай поглянемо на ключові деталі разом.`,
      },
    ];

    vocab = [
      { word: 'schedule', transcription: '/ˈʃedʒ.uːl/', translationUk: 'розклад, графік', contextSentence: 'Did you see the updates regarding our schedule?' },
      { word: 'in advance', transcription: '/ɪn ədˈvɑːns/', translationUk: 'заздалегідь', contextSentence: 'I prefer organizing everything in advance.' },
      { word: 'efficient', transcription: '/ɪˈfɪʃ.ənt/', translationUk: 'ефективний', contextSentence: 'That is much more efficient.' },
      { word: 'review', transcription: '/rɪˈvjuː/', translationUk: 'переглянути, повторити', contextSentence: 'Should we review the main points?' },
    ];
  } else if (lvl === 'B1') {
    dialogue = [
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `${s2.name}, have you already seen the latest project feedback from the international team?`,
        textUk: `${s2.name}, ти вже бачила останні відгуки по проєкту від міжнародної команди?`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `I have just reviewed it. They have been working on these requirements for over two months.`,
        textUk: `Я щойно їх переглянула. Вони працюють над цими вимогами вже понад два місяці.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `If we had more resources, we could implement the full solution faster. But this is already solid.`,
        textUk: `Якби у нас було більше ресурсів, ми могли б впровадити повне рішення швидше. Але це вже солідно.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `The report was prepared by the lead analyst, who knows every single nuance of the case.`,
        textUk: `Звіт був підготовлений провідним аналітиком, який знає кожен нюанс справи.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `That explains why it is so thorough. We must focus on delivering high quality.`,
        textUk: `Це пояснює, чому він такий ґрунтовний. Ми повинні зосередитися на високій якості.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Agreed. I will follow up with them this afternoon to finalize the details.`,
        textUk: `Згодна. Я звʼяжуся з ними сьогодні вдень, щоб фіналізувати деталі.`,
      },
    ];

    vocab = [
      { word: 'feedback', transcription: '/ˈfiːd.bæk/', translationUk: 'зворотний звʼязок', contextSentence: 'Have you seen the latest project feedback?' },
      { word: 'implement', transcription: '/ˈɪm.plɪ.ment/', translationUk: 'впроваджувати', contextSentence: 'We could implement the full solution faster.' },
      { word: 'thorough', transcription: '/ˈθʌr.ə/', translationUk: 'ретельний, ґрунтовний', contextSentence: 'That explains why it is so thorough.' },
      { word: 'finalize', transcription: '/ˈfaɪ.nəl.aɪz/', translationUk: 'фіналізувати', contextSentence: 'To finalize the details.' },
    ];
  } else if (lvl === 'B2') {
    dialogue = [
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `By next Friday, our department will have finalized the comprehensive strategic audit, ${s2.name}.`,
        textUk: `До наступної пʼятниці наш відділ уже завершить комплексний стратегічний аудит, ${s2.name}.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Impressive. Had we not streamlined our workflow earlier, we might have faced significant delays.`,
        textUk: `Вражає. Якби ми не оптимізували робочий процес раніше, ми могли б зіткнутися зі значними затримками.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Exactly. It is widely acknowledged that continuous optimization prevents operational bottlenecks.`,
        textUk: `Саме так. Загальновизнано, що безперервна оптимізація запобігає операційним вузьким місцям.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Although some stakeholders expressed initial skepticism, the preliminary data completely speaks for itself.`,
        textUk: `Хоча деякі стейкхолдери висловлювали початковий скептицизм, попередні дані говорять самі за себе.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `I wish we had initiated this transformation six months sooner. But we are in a formidable position now.`,
        textUk: `Шкода, що ми не ініціювали цю трансформацію на пів року раніше. Але зараз ми у сильній позиції.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Indeed. Let us make certain that our presentation to the executive board highlights these tangible results.`,
        textUk: `Дійсно. Переконаймося, що наша презентація правлінню підкреслює ці відчутні результати.`,
      },
    ];

    vocab = [
      { word: 'comprehensive', transcription: '/ˌkɒm.prɪˈhen.sɪv/', translationUk: 'комплексний, всебічний', contextSentence: 'The comprehensive strategic audit.' },
      { word: 'bottleneck', transcription: '/ˈbɒt.əl.nek/', translationUk: 'вузьке місце, затримка', contextSentence: 'Prevents operational bottlenecks.' },
      { word: 'stakeholder', transcription: '/ˈsteɪkˌhəʊl.dər/', translationUk: 'зацікавлена сторона', contextSentence: 'Some stakeholders expressed skepticism.' },
      { word: 'tangible', transcription: '/ˈtæn.dʒə.bəl/', translationUk: 'відчутний, реальний', contextSentence: 'Highlights these tangible results.' },
    ];
  } else {
    // C1
    dialogue = [
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Rarely have I witnessed such a nuanced negotiation unfold with such remarkable diplomatic poise, ${s2.name}.`,
        textUk: `Рідко мені доводилося бачити, щоб настільки тонкі переговори проходили з такою дипломатичною витримкою, ${s2.name}.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `What struck me most was their understated rhetoric. Under no circumstances were they willing to compromise integrity.`,
        textUk: `Що найбільше вразило мене, то це їхня стримана риторика. За жодних обставин вони не були готові поступитися принципами.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Indeed. Had the counterpart adopted a more confrontational posture, the treaty would undoubtedly have collapsed.`,
        textUk: `Справді. Якби контрагент зайняв більш конфронтаційну позицію, угода безсумнівно провалилася б.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Difficult though the deliberation was, their shared commitment to multilateral stability ultimately carried the day.`,
        textUk: `Хоч якими важкими були обговорення, їхнє спільне прагнення до багатосторонньої стабільності зрештою перемогло.`,
      },
      {
        speaker: s1.name,
        voice: s1.voice,
        textEn: `Having examined the legal drafting in forensic detail, I find the stipulations exceptionally rigorous.`,
        textUk: `Детально вивчивши юридичні формулювання, я знаходжу положення винятково строгими та чіткими.`,
      },
      {
        speaker: s2.name,
        voice: s2.voice,
        textEn: `Be that as it may, ratification by the respective assemblies remains the definitive benchmark of success.`,
        textUk: `Як би там не було, ратифікація відповідними асамблеями залишається остаточним мірилом успіху.`,
      },
    ];

    vocab = [
      { word: 'poise', transcription: '/pɔɪz/', translationUk: 'витримка, самовладання', contextSentence: 'Remarkable diplomatic poise.' },
      { word: 'understated', transcription: '/ˌʌn.dəˈsteɪ.tɪd/', translationUk: 'стриманий, делікатний', contextSentence: 'Their understated rhetoric.' },
      { word: 'deliberation', transcription: '/dɪˌlɪb.əˈreɪ.ʃən/', translationUk: 'обговорення, роздуми', contextSentence: 'Difficult though the deliberation was.' },
      { word: 'benchmark', transcription: '/ˈbentʃ.mɑːk/', translationUk: 'еталон, орієнтир', contextSentence: 'The definitive benchmark of success.' },
    ];
  }

  const fullAudioText = dialogue.map(d => d.textEn).join(' ');

  // Exactly 10 exercises per microtopic
  exercises = [
    // 1. Multiple Choice (Main Purpose)
    {
      id: `${topic.id}-ex-1`,
      type: 'multiple_choice',
      question: `Яка головна мета розмови між ${s1.name} та ${s2.name}?`,
      questionUk: `Яка головна мета розмови між ${s1.name} та ${s2.name}?`,
      audioSnippet: dialogue[0].textEn + ' ' + dialogue[1].textEn,
      audioSnippetText: dialogue[0].textEn + ' ' + dialogue[1].textEn,
      options: [
        `Обговорити плани та координацію щодо теми «${tUk}»`,
        `Висловити невдоволення результатами співпраці`,
        `Скасувати попередні домовленості через термінові справи`,
        `Замовити квитки на міжнародний рейс`
      ],
      correctAnswer: `Обговорити плани та координацію щодо теми «${tUk}»`,
      explanationUk: `У перших репліках співрозмовники узгоджують стан справ та план дій з теми.`
    },
    // 2. Multiple Choice (Speaker 1's position)
    {
      id: `${topic.id}-ex-2`,
      type: 'multiple_choice',
      question: `Що підкреслює ${s1.name} під час своєї репліки?`,
      questionUk: `Що підкреслює ${s1.name} під час своєї репліки?`,
      audioSnippet: dialogue[2].textEn,
      audioSnippetText: dialogue[2].textEn,
      options: [
        dialogue[2].textUk,
        `Що все пішло не за планом і потрібна допомога`,
        `Що проект відкладено на невизначений термін`,
        `Що потрібно все починати з початку`
      ],
      correctAnswer: dialogue[2].textUk,
      explanationUk: `${s1.name} чітко зазначає: «${dialogue[2].textEn}» (${dialogue[2].textUk}).`
    },
    // 3. Multiple Choice (Grammar in context)
    {
      id: `${topic.id}-ex-3`,
      type: 'multiple_choice',
      question: `Яку граматичну структуру чи зміст висловлює ${s2.name}?`,
      questionUk: `Яку граматичну структуру чи зміст висловлює ${s2.name}?`,
      audioSnippet: dialogue[3].textEn,
      audioSnippetText: dialogue[3].textEn,
      options: [
        dialogue[3].textUk,
        `Категоричну відмову від подальших обговорень`,
        `Пропозицію пропустити важливі кроки`,
        `Прохання перенести зустріч на вихідні`
      ],
      correctAnswer: dialogue[3].textUk,
      explanationUk: `Згідно з реплікою: «${dialogue[3].textEn}» (${dialogue[3].textUk}).`
    },
    // 4. Multiple Choice (Conclusion/Next step)
    {
      id: `${topic.id}-ex-4`,
      type: 'multiple_choice',
      question: `До якого спільного висновку доходять співрозмовники наприкінці діалогу?`,
      questionUk: `До якого спільного висновку доходять співрозмовники наприкінці діалогу?`,
      audioSnippet: dialogue[4].textEn + ' ' + dialogue[5].textEn,
      audioSnippetText: dialogue[4].textEn + ' ' + dialogue[5].textEn,
      options: [
        dialogue[5].textUk,
        `Зупинити роботу через брак часу`,
        `Звернутися за допомогою до третіх осіб`,
        `Повністю змінити початкові цілі`
      ],
      correctAnswer: dialogue[5].textUk,
      explanationUk: `У завершальній репліці ${s2.name} підсумовує спільний намір та наступний крок.`
    },
    // 5. True / False 1
    {
      id: `${topic.id}-ex-5`,
      type: 'true_false',
      question: `Твердження: Розмова відбувається в доброзичливому та конструктивному тоні.`,
      questionUk: `Твердження: Розмова відбувається в доброзичливому та конструктивному тоні.`,
      audioSnippet: dialogue[0].textEn,
      audioSnippetText: dialogue[0].textEn,
      options: ['Правда (True)', 'Неправда (False)'],
      correctAnswer: 'Правда (True)',
      explanationUk: `Співрозмовники ввічливо вітаються та підтримують позитивний професійний діалог.`
    },
    // 6. True / False 2
    {
      id: `${topic.id}-ex-6`,
      type: 'true_false',
      question: `Твердження: ${s1.name} висловлює сумнів щодо готовності та результатів.`,
      questionUk: `Твердження: ${s1.name} висловлює сумнів щодо готовності та результатів.`,
      audioSnippet: dialogue[2].textEn,
      audioSnippetText: dialogue[2].textEn,
      options: ['Правда (True)', 'Неправда (False)'],
      correctAnswer: 'Неправда (False)',
      explanationUk: `${s1.name} навпаки впевнено стверджує, що все готово і йде за планом.`
    },
    // 7. True / False 3
    {
      id: `${topic.id}-ex-7`,
      type: 'true_false',
      question: `Твердження: ${s2.name} погоджується на співпрацю та пропонує переходити до дій.`,
      questionUk: `Твердження: ${s2.name} погоджується на співпрацю та пропонує переходити до дій.`,
      audioSnippet: dialogue[5].textEn,
      audioSnippetText: dialogue[5].textEn,
      options: ['Правда (True)', 'Неправда (False)'],
      correctAnswer: 'Правда (True)',
      explanationUk: `В останній репліці ${s2.name} дякує за підтримку та пропонує негайно розпочинати.`
    },
    // 8. Dictation 1 (Short key phrase)
    {
      id: `${topic.id}-ex-8`,
      type: 'dictation',
      question: `Напишіть почуте речення англійською мовою під диктовку:`,
      questionUk: `Напишіть почуте речення англійською мовою під диктовку:`,
      audioSnippet: dialogue[0].textEn,
      audioSnippetText: dialogue[0].textEn,
      correctAnswer: dialogue[0].textEn,
      explanationUk: `Оригінальна фраза: "${dialogue[0].textEn}". Переклад: "${dialogue[0].textUk}".`
    },
    // 9. Dictation 2
    {
      id: `${topic.id}-ex-9`,
      type: 'dictation',
      question: `Прослухайте та запишіть репліку носія мови:`,
      questionUk: `Прослухайте та запишіть репліку носія мови:`,
      audioSnippet: dialogue[2].textEn,
      audioSnippetText: dialogue[2].textEn,
      correctAnswer: dialogue[2].textEn,
      explanationUk: `Оригінальна фраза: "${dialogue[2].textEn}". Переклад: "${dialogue[2].textUk}".`
    },
    // 10. Dictation 3
    {
      id: `${topic.id}-ex-10`,
      type: 'dictation',
      question: `Запишіть фінальну репліку співрозмовника:`,
      questionUk: `Запишіть фінальну репліку співрозмовника:`,
      audioSnippet: dialogue[5].textEn,
      audioSnippetText: dialogue[5].textEn,
      correctAnswer: dialogue[5].textEn,
      explanationUk: `Оригінальна фраза: "${dialogue[5].textEn}". Переклад: "${dialogue[5].textUk}".`
    },
  ];

  return {
    id: `${topic.id}-listen`,
    topicId: topic.id,
    level: topic.level,
    order: topic.order,
    unitTitleUk: topic.unitTitleUk || `Блок ${Math.ceil(topic.order / 4)}`,
    titleEn,
    titleUk,
    accent: preset.accent,
    preferredVoice: preset.preferredVoice,
    durationEst: '1:30',
    scenarioDescriptionUk: scenarioDesc,
    speakers: [
      { name: `${s1.name} (${s1.gender})`, roleUk: s1.roleUk },
      { name: `${s2.name} (${s2.gender})`, roleUk: s2.roleUk },
    ],
    dialogue,
    fullAudioText,
    audioUrl: `/api/audio/listening/${topic.id}-listen.mp3`,
    vocabulary: vocab,
    exercises,
  };
}

console.log('Generating listening tracks for all 80 microtopics...');
const allTracks = topics.map((t, idx) => generateDialogueAndExercises(t, idx));

const outPath = path.join(__dirname, '../src/data/listening/allListeningTracks.json');
fs.writeFileSync(outPath, JSON.stringify(allTracks, null, 2));

console.log(`Successfully generated ${allTracks.length} listening tracks with ${allTracks.length * 10} exercises!`);
console.log('Sample track ID:', allTracks[0].id, 'Exercises count:', allTracks[0].exercises.length);
