import { Topic } from '@/types/course';

export const C1_LESSONS: Topic[] = [
  // ==========================================
  // UNIT 1: ЕМФАТИЧНІ КОНСТРУКЦІЇ ТА ІНВЕРСІЯ
  // ==========================================
  {
    id: 'c1-negative-inversion',
    level: 'C1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Емфаза та інверсія',
    unitTitleEn: 'Unit 1: Emphasis & Inversion',
    lessonNumber: 1,
    estimatedMinutes: 10,
    titleEn: 'Negative Inversion: Never, Seldom, Under No Circumstances',
    titleUk: 'Негативна інверсія: Зворотний порядок слів для підсилення',
    descriptionUk: 'Як розмовляти мовою Черчилля та Обами: винос заперечних прислівників на перше місце з перестановкою дієслова та підмета.',
    iconName: 'Crown',
    order: 1,
    notes: {
      title: 'Негативна інверсія (Negative Inversion)',
      summaryUk: 'Коли речення починається з заперечного або обмежувального слова чи фрази (Never, Rarely, Seldom, Hardly, Under no circumstances, Not only), порядок слів змінюється на питальний: спочатку йде допоміжне дієслово, а потім підмет!',
      formula: 'Заперечний маркер + Допоміжне дієслово + Підмет + Смислове дієслово',
      explanationSections: [
        {
          heading: 'Топ фраз, які викликають інверсію',
          contentUk: 'Приклади вражаючих конструкцій:',
          tableData: {
            headers: ['Маркер на початку', 'Звичайний порядок слів', 'Інвертований емфатичний порядок'],
            rows: [
              ['Never', 'I have never seen such beauty.', 'NEVER HAVE I SEEN such beauty.'],
              ['Rarely', 'We rarely encounter this problem.', 'RARELY DO WE ENCOUNTER this problem.'],
              ['Under no circumstances', 'You must not sign this.', 'UNDER NO CIRCUMSTANCES MUST YOU SIGN this.'],
              ['Not only ... but also', 'He helped and he also paid.', 'NOT ONLY DID HE HELP, but he also paid.'],
              ['Hardly ... when', 'I had hardly sat down when...', 'HARDLY HAD I SAT DOWN when the bell rang.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Never I have seen.', right: 'Never have I seen.', reasonUk: 'Після заперечного слова на початку порядок слів ОБОВʼЯЗКОВО інвертується!' },
      ],
      vocabulary: [
        { word: 'circumstance', transcription: '/ˈsɜːkəmstəns/', translationUk: 'обставина', exampleEn: 'Under no circumstances.', exampleUk: 'За жодних обставин.' },
        { word: 'seldom', transcription: '/ˈseldəm/', translationUk: 'вкрай рідко', exampleEn: 'Seldom seen.', exampleUk: 'Рідко можна побачити.' },
      ],
      proTipUk: 'Використовуйте інверсію на співбесідах чи публічних виступах: "Not only do I have 5 years of experience, but I also possess strong leadership skills".',
    },
    exercises: [
      {
        id: 'c1-ni-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант інверсії: "Rarely ___ such dedication to work."',
        options: ['do we witness', 'we witness', 'we do witness', 'are we witness'],
        correctAnswer: 'do we witness',
        explanationUk: 'Після Rarely порядок слів питальний: do + we + witness.',
      },
    ],
  },
  {
    id: 'c1-cleft-sentences-what',
    level: 'C1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Емфаза та інверсія',
    unitTitleEn: 'Unit 1: Emphasis & Inversion',
    lessonNumber: 2,
    estimatedMinutes: 10,
    titleEn: 'Cleft Sentences with WHAT and ALL',
    titleUk: 'Розщеплені речення (Cleft Sentences) з What та All',
    descriptionUk: 'Як виділити найголовніше: "Те, що мене здивувало — це його спокій", "Все, що мені потрібно — це чашка чаю".',
    iconName: 'Sparkles',
    order: 2,
    notes: {
      title: 'Розщеплені речення з What та All (Wh- Clefts)',
      summaryUk: 'Cleft sentences дозволяють "розщепити" звичайне речення на дві частини, щоб привернути увагу слухача до найважливішої думки. Замість "I need sleep" ми кажемо: "What I need is sleep".',
      formula: 'WHAT + підмет + дієслово + IS / WAS + акцентний елемент',
      explanationSections: [
        {
          heading: 'Приклади фокусування уваги',
          contentUk: 'Порівняйте звичайне і розщеплене речення:',
          examples: [
            { en: 'I really enjoyed the atmosphere. -> WHAT I REALLY ENJOYED WAS the atmosphere.', uk: 'Те, що мені дійсно сподобалося — це атмосфера.' },
            { en: 'I only want an honest answer. -> ALL I WANT IS an honest answer.', uk: 'Все, чого я хочу — це чесна відповідь.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'That I need is rest.', right: 'What I need is rest.', reasonUk: 'Для такого типу речень використовується WHAT або ALL (не that!).' },
      ],
      vocabulary: [
        { word: 'cleft', transcription: '/kleft/', translationUk: 'розщеплений', exampleEn: 'Cleft structure.', exampleUk: 'Розщеплена структура.' },
      ],
      proTipUk: 'Це улюблений інструмент Стіва Джобса на презентаціях: "What we want to do is make a leapfrog product".',
    },
    exercises: [
      {
        id: 'c1-csw-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: "___ surprised me the most was his total honesty."',
        options: ['What', 'That', 'Which', 'It'],
        correctAnswer: 'What',
        explanationUk: 'Конструкція: What + підмет + дієслово + was.',
      },
    ],
  },
  {
    id: 'c1-cleft-sentences-it',
    level: 'C1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Емфаза та інверсія',
    unitTitleEn: 'Unit 1: Emphasis & Inversion',
    lessonNumber: 3,
    estimatedMinutes: 10,
    titleEn: 'It-Cleft Sentences: It was John who...',
    titleUk: 'Конструкція It-Cleft: It was John who solved the problem',
    descriptionUk: 'Як зняти сумніви і вказати конкретного винуватця чи час: "Це саме Джон зробив це, а не Том", "Це саме вчора ми підписали угоду".',
    iconName: 'Compass',
    order: 3,
    notes: {
      title: 'It-Cleft Sentences (Саме він, саме тоді)',
      summaryUk: 'Ця структура фокусує увагу на конкретній людині, предметі чи часі, відкидаючи інші варіанти. Формула: "IT IS / IT WAS + акцентне слово + THAT / WHO...".',
      formula: 'IT IS / WAS + акцентний елемент + THAT / WHO + решта речення',
      explanationSections: [
        {
          heading: 'Приклади акцентування',
          contentUk: 'Порівняйте зміст:',
          examples: [
            { en: 'John solved the problem. -> IT WAS JOHN WHO solved the problem (not Peter!).', uk: 'Це саме Джон розвʼязав проблему (підкреслюємо персону).' },
            { en: 'We signed the contract yesterday. -> IT WAS YESTERDAY THAT we signed the contract.', uk: 'Саме вчора ми підписали договір (підкреслюємо дату).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'It was John which did it.', right: 'It was John who did it.', reasonUk: 'Для людей використовуємо who або that.' },
      ],
      vocabulary: [
        { word: 'emphasis', transcription: '/ˈemfəsɪs/', translationUk: 'наголос, емфаза', exampleEn: 'Add emphasis.', exampleUk: 'Додати емфази.' },
      ],
      proTipUk: 'Використовуйте It-Cleft, щоб спростувати хибну інформацію: "It was not me who made that statement!".',
    },
    exercises: [
      {
        id: 'c1-csi-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: It was in Paris ___ they first met.',
        options: ['that', 'which', 'what', 'whose'],
        correctAnswer: 'that',
        explanationUk: 'У конструкції It was [обставина] звʼязка — that.',
      },
    ],
  },
  {
    id: 'c1-fronting-adverbials',
    level: 'C1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Емфаза та інверсія',
    unitTitleEn: 'Unit 1: Emphasis & Inversion',
    lessonNumber: 4,
    estimatedMinutes: 10,
    titleEn: 'Fronting & Locative Inversion',
    titleUk: 'Фронтинг та просторова інверсія: Up went the prices',
    descriptionUk: 'Художній та літературний синтаксис: винос обставини місця та напрямку на початок речення (Into the room walked the CEO).',
    iconName: 'BookOpen',
    order: 4,
    notes: {
      title: 'Фронтинг (Fronting) та просторова інверсія',
      summaryUk: 'Фронтинг — це стилістичний прийом, коли обставина місця чи напрямку руху виноситься на початок речення, а підмет і дієслово міняються місцями (без допоміжних слів do/does!).',
      formula: 'Обставина місця / напрямку + Дієслово руху + Підмет',
      explanationSections: [
        {
          heading: 'Художні приклади',
          contentUk: 'Зверніть увагу на порядок слів:',
          examples: [
            { en: 'The CEO walked into the room. -> INTO THE ROOM WALKED the CEO.', uk: 'До кімнати ввійшов генеральний директор (більш драматично).' },
            { en: 'The prices went up. -> UP WENT the prices.', uk: 'Вгору злетіли ціни.' },
            { en: 'At the top of the hill stood an old castle.', uk: 'На вершині пагорба височів старий замок.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Into the room he walked (з займенником).', right: 'Into the room he walked.', reasonUk: 'Якщо підметом є займенник (he/she/they), інверсія дієслова НЕ відбувається!' },
      ],
      vocabulary: [
        { word: 'dramatic', transcription: '/drəˈmætɪk/', translationUk: 'драматичний, виразний', exampleEn: 'Dramatic effect.', exampleUk: 'Драматичний ефект.' },
      ],
      proTipUk: 'Чудовий інструмент для створення кінематографічного ефекту в розповідях та есеях.',
    },
    exercises: [
      {
        id: 'c1-fa-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний порядок: "Down the street ___."',
        options: ['ran the frightened dog', 'the frightened dog ran', 'did run the dog', 'was running the dog'],
        correctAnswer: 'ran the frightened dog',
        explanationUk: 'Просторова інверсія: напрямок + дієслово (ran) + підмет (the dog).',
      },
    ],
  },

  // ==========================================
  // UNIT 2: ДІЄПРИКМЕТНИКОВІ ЗВОРОТИ ТА УМОВНІ ІНВЕРСІЇ
  // ==========================================
  {
    id: 'c1-participle-clauses-active',
    level: 'C1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Дієприкметникові звороти та сослагання',
    unitTitleEn: 'Unit 2: Participles & Subjunctive',
    lessonNumber: 5,
    estimatedMinutes: 10,
    titleEn: 'Active Participle Clauses: Having done, Doing',
    titleUk: 'Активні дієприкметникові звороти: Having finished, Feeling tired',
    descriptionUk: 'Як скорочувати складні речення: замість "Because he felt tired, he left" сказати "Feeling tired, he left". Перфектні дієприкметники.',
    iconName: 'History',
    order: 5,
    notes: {
      title: 'Активні дієприкметникові звороти (Participle Clauses)',
      summaryUk: 'Дієприкметникові звороти дозволяють обʼєднати причину, час чи умову в один лаконічний зворот: 1) Одночасні дії: V-ING (Walking down the street, I met him); 2) Послідовні дії (одна дія раніше іншої): HAVING + V3 (Having finished his work, he went to bed).',
      formula: 'HAVING + V3 (дія раніше) | V-ING (дія одночасно)',
      explanationSections: [
        {
          heading: 'Економія слів та вишуканість мови',
          contentUk: 'Приклади трансформації:',
          examples: [
            { en: 'After he had passed the exam, he celebrated. -> HAVING PASSED the exam, he celebrated.', uk: 'Склавши іспит (перфектний дієприкметник), він святкував.' },
            { en: 'Because I didn\'t know what to say, I stayed silent. -> NOT KNOWING what to say, I stayed silent.', uk: 'Не знаючи, що сказати, я промовчав.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Walking down the street, my hat blew off (Dangling participle!).', right: 'Walking down the street, I lost my hat.', reasonUk: 'Підмет головного речення (I) має бути тим, хто виконує дію в дієприкметниковому звороті!' },
      ],
      vocabulary: [
        { word: 'concise', transcription: '/kənˈsaɪs/', translationUk: 'стислий, лаконічний', exampleEn: 'Concise speech.', exampleUk: 'Лаконічна мова.' },
      ],
      proTipUk: 'Один такий зворот у супровідному листі (Cover Letter) чи резюме одразу підвищує оцінку вашого англійського профілю до рівня C1.',
    },
    exercises: [
      {
        id: 'c1-pca-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму: "___ the contract, she forwarded it to the legal team."',
        options: ['Having signed', 'Signed', 'To sign', 'Have signed'],
        correctAnswer: 'Having signed',
        explanationUk: 'Дія підписання відбулася раніше за пересилання -> Having signed.',
      },
    ],
  },
  {
    id: 'c1-participle-clauses-passive',
    level: 'C1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Дієприкметникові звороти та сослагання',
    unitTitleEn: 'Unit 2: Participles & Subjunctive',
    lessonNumber: 6,
    estimatedMinutes: 10,
    titleEn: 'Passive Participle Clauses: Seen from above...',
    titleUk: 'Пасивні дієприкметникові звороти: Rejected by the board...',
    descriptionUk: 'Пасивні конструкції з третьою формою (V3) або Having been done: "Відхилений радою директорів, проєкт був закритий".',
    iconName: 'ShieldCheck',
    order: 6,
    notes: {
      title: 'Пасивні дієприкметникові звороти (V3 та Having been + V3)',
      summaryUk: 'Коли дія над підметом виконується іншими, ми використовуємо або чисте V3 (Past Participle), або Having been + V3 для підкреслення закінченості.',
      formula: 'V3 / HAVING BEEN + V3, підмет + дія',
      explanationSections: [
        {
          heading: 'Приклади пасивних зворотів',
          contentUk: 'Зверніть увагу на пасивне значення:',
          examples: [
            { en: 'Seen from a distance, the island looks like a dolphin.', uk: 'Якщо дивитися здалеку (будучи побаченим), острів схожий на дельфіна.' },
            { en: 'Having been warned of the storm, the sailors stayed in port.', uk: 'Будучи попередженими про шторм, моряки залишилися в порту.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Warning of the storm, they stayed (активне значення замість пасивного).', right: 'Warned of the storm, they stayed.', reasonUk: 'Моряків попередили (пасив), тому форма — Warned.' },
      ],
      vocabulary: [
        { word: 'sailor', transcription: '/ˈseɪlə(r)/', translationUk: 'моряк', exampleEn: 'Brave sailor.', exampleUk: 'Хоробрий моряк.' },
      ],
      proTipUk: 'Ідеально підходить для опису архітектури, географії та історичних подій.',
    },
    exercises: [
      {
        id: 'c1-pcp-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: "___ in 1920, the building requires thorough renovation."',
        options: ['Built', 'Building', 'Having built', 'To build'],
        correctAnswer: 'Built',
        explanationUk: 'Будівля була збудована (пасивний стан) -> Built in 1920.',
      },
    ],
  },
  {
    id: 'c1-inverted-conditionals',
    level: 'C1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Дієприкметникові звороти та сослагання',
    unitTitleEn: 'Unit 2: Participles & Subjunctive',
    lessonNumber: 7,
    estimatedMinutes: 10,
    titleEn: 'Inverted Conditionals: Had I known, Were you to ask',
    titleUk: 'Інвертовані умовні речення без IF: Had I known, Should you need',
    descriptionUk: 'Як звучати максимально дипломатично й авторитетно, викинувши слово "IF" із речення взагалі.',
    iconName: 'Crown',
    order: 7,
    notes: {
      title: 'Умовні речення з інверсією (Omitting IF)',
      summaryUk: 'У formal та академічній англійській слово IF можна викинути, замінивши його інверсією дієслів: 1) SHOULD замість If you need (Should you need assistance...); 2) WERE замість If I were (Were I in your shoes...); 3) HAD замість If I had known (Had I known the truth...).',
      formula: 'HAD + підмет + V3 | SHOULD + підмет + V1 | WERE + підмет + TO V1',
      explanationSections: [
        {
          heading: 'Три типи безсполучникових умов',
          contentUk: 'Порівняйте класичну та елітну форми:',
          tableData: {
            headers: ['Тип', 'Зі словом IF (B1-B2)', 'Інвертована форма C1 (Advanced)'],
            rows: [
              ['First', 'If you require further info...', 'SHOULD YOU REQUIRE further information, please contact us.'],
              ['Second', 'If they were to offer me...', 'WERE THEY TO OFFER me the position, I would decline.'],
              ['Third', 'If I had realized the risk...', 'HAD I REALIZED the risk, I would never have invested.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'If had I known.', right: 'Had I known.', reasonUk: 'Коли використовується інверсія, слово IF зникає!' },
      ],
      vocabulary: [
        { word: 'decline', transcription: '/dɪˈklaɪn/', translationUk: 'відхиляти (пропозицію)', exampleEn: 'Decline an offer.', exampleUk: 'Відхилити пропозицію.' },
      ],
      proTipUk: 'Конструкція "Should you have any questions, do not hesitate to contact me" — золотий стандарт завершення будь-якого ділового листа.',
    },
    exercises: [
      {
        id: 'c1-ic-1',
        type: 'multiple_choice',
        question: 'Перетворіть у форму без IF: "If we had arrived five minutes earlier, we would have caught the train."',
        options: ['Had we arrived five minutes earlier', 'Should we arrive five minutes earlier', 'Were we to arrive five minutes earlier', 'Did we arrive five minutes earlier'],
        correctAnswer: 'Had we arrived five minutes earlier',
        explanationUk: 'Інверсія Third conditional без IF утворюється виносом Had на перше місце.',
      },
    ],
  },
  {
    id: 'c1-subjunctive-mood',
    level: 'C1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Дієприкметникові звороти та сослагання',
    unitTitleEn: 'Unit 2: Participles & Subjunctive',
    lessonNumber: 8,
    estimatedMinutes: 10,
    titleEn: 'The Subjunctive Mood: I insist that he BE present',
    titleUk: 'Англійський сослагальний нахил (Subjunctive): It is vital that she study',
    descriptionUk: 'Чому після слів insist, demand, recommend дієслово втрачає літеру -s навіть для he/she: "I demand that he BE fired".',
    iconName: 'ShieldCheck',
    order: 8,
    notes: {
      title: 'Англійський конʼюнктив (Subjunctive Mood)',
      summaryUk: 'Subjunctive використовується в офіційній мові після дієслів та прикметників вимоги, наказу або крайньої важливості (demand, insist, recommend, suggest, vital, crucial, essential). У підрядному реченні дієслово залишається в чистій базовій формі (BE, do, go) БЕЗ літери -s для he/she/it!',
      formula: 'insist / demand / vital that + Хто + БАЗОВА ФОРМА (be, study, attend)',
      explanationSections: [
        {
          heading: 'Приклади незмінної форми дієслова',
          contentUk: 'Зверніть увагу: жодних -s, -ed чи is/are:',
          examples: [
            { en: 'The judge insisted that the witness BE present.', uk: 'Суддя наполягав, щоб свідок був присутній (саме BE, а не was/is!).' },
            { en: 'It is essential that she SUBMIT the report today.', uk: 'Вкрай важливо, щоб вона подала звіт сьогодні (submit БЕЗ -s).' },
            { en: 'I recommend that he NOT DO this.', uk: 'Я рекомендую, щоб він цього не робив (частка NOT без do/does).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'It is vital that he is on time.', right: 'It is vital that he BE on time.', reasonUk: 'У конструкції Subjunctive використовується базова форма BE.' },
      ],
      vocabulary: [
        { word: 'vital', transcription: '/ˈvaɪtl/', translationUk: 'життєво важливий', exampleEn: 'Vital issue.', exampleUk: 'Життєво важливе питання.' },
        { word: 'witness', transcription: '/ˈwɪtnəs/', translationUk: 'свідок', exampleEn: 'Key witness.', exampleUk: 'Ключовий свідок.' },
      ],
      proTipUk: 'У британській англійській замість Subjunctive часто використовують SHOULD: "It is vital that he should be on time", обидва варіанти визнані міжнародними тестами.',
    },
    exercises: [
      {
        id: 'c1-sm-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму Subjunctive: "The doctor recommended that he ___ smoking immediately."',
        options: ['quit', 'quits', 'quitted', 'is quitting'],
        correctAnswer: 'quit',
        explanationUk: 'Після recommend that дієслово вживається у чистій базовій формі без -s: quit.',
      },
    ],
  },

  // ==========================================
  // UNIT 3: ТОНКІ ВІДТІНКИ МОДАЛЬНОСТІ ТА СТИЛІСТИКИ
  // ==========================================
  {
    id: 'c1-advanced-modal-idioms',
    level: 'C1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Нюанси стилістики та модальності',
    unitTitleEn: 'Unit 3: Nuance & Register',
    lessonNumber: 9,
    estimatedMinutes: 10,
    titleEn: 'Nuanced Modal Idioms: Might as well, Needn\'t have',
    titleUk: 'Рідкісні модальні конструкції: Might as well, Needn\'t have vs Didn\'t need to',
    descriptionUk: 'Тонкі смислові відмінності: "Ми з тим же успіхом можемо піти пішки (might as well)", та різниця між "даремно зробив" і "не було потреби робити".',
    iconName: 'Zap',
    order: 9,
    notes: {
      title: 'Тонка модальність: Might as well, Needn\'t have',
      summaryUk: '1) MIGHT AS WELL = "немає кращої альтернативи, тож чому б і ні". 2) NEEDN\'T HAVE DONE = ви зробили дію, але потім зʼясувалося, що це було даремно (помилково витратили час/гроші). 3) DIDN\'T NEED TO DO = не було потреби, тому ви цього й не робили.',
      formula: 'MIGHT AS WELL + V1 | NEEDN\'T HAVE + V3 (даремно зробив)',
      explanationSections: [
        {
          heading: 'Контраст: Needn\'t have проти Didn\'t need to',
          contentUk: 'Порівняйте дві ситуації в минулому:',
          examples: [
            { en: 'We might as well walk; the bus isn\'t coming.', uk: 'Ми з таким же успіхом можемо піти пішки — автобус все одно не приїде.' },
            { en: 'I needn\'t have brought the umbrella; the sun was shining all day.', uk: 'Я даремно взяв парасольку (я тягав її весь день, а дощу не було).' },
            { en: 'I didn\'t need to wake up early, so I stayed in bed until 10.', uk: 'Мені не потрібно було прокидатися рано, тому я й спав до 10 (дію не робив).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Using "needn\'t have" when the action was not done.', right: 'Use "didn\'t need to" when you chose not to do it.', reasonUk: 'Needn\'t have означає, що дію було виконано даремно.' },
      ],
      vocabulary: [
        { word: 'alternative', transcription: '/ɔːlˈtɜːnətɪv/', translationUk: 'альтернатива', exampleEn: 'Viable alternative.', exampleUk: 'Життєздатна альтернатива.' },
      ],
      proTipUk: 'Фраза "We might as well pack up and leave" звучить природно, коли проєкт скасовано.',
    },
    exercises: [
      {
        id: 'c1-ami-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант: "You bought so much bread, but we already have three loaves! You ___ bought any."',
        options: ["needn't have", "didn't need to", "mustn't have", "couldn't"],
        correctAnswer: "needn't have",
        explanationUk: 'Людина вже купила хліб, але це було даремно -> needn\'t have bought.',
      },
    ],
  },
  {
    id: 'c1-advanced-collocations',
    level: 'C1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Нюанси стилістики та модальності',
    unitTitleEn: 'Unit 3: Nuance & Register',
    lessonNumber: 10,
    estimatedMinutes: 10,
    titleEn: 'Academic & C1 Collocations: Blatantly obvious, Utterly devastated',
    titleUk: 'Вишукані колокації рівня C1: Blatantly obvious, Heavily influenced',
    descriptionUk: 'Стійкі поєднання прислівників та прикметників, які відрізняють рідного мовця від іноземця. Чому не можна казати "strongly cold" або "deeply dead".',
    iconName: 'BookMarked',
    order: 10,
    notes: {
      title: 'Стійкі колокації рівня C1 (Advanced Collocations)',
      summaryUk: 'Колокації — це природні комбінації слів, які носії мови завжди вживають разом. Використання неправильних звʼязок одразу видає неприродний переклад з рідної мови.',
      formula: 'Прислівник підсилення + Прикметник / Дієслово',
      explanationSections: [
        {
          heading: 'Топ-10 колокацій високого регістра',
          contentUk: 'Запамʼятайте ці звʼязки:',
          tableData: {
            headers: ['Колокація', 'Переклад', 'Приклад у реченні'],
            rows: [
              ['blatantly obvious', 'абсолютно очевидний', 'It is blatantly obvious that we need change.'],
              ['utterly devastated', 'вкрай спустошений, розчавлений', 'She was utterly devastated by the news.'],
              ['heavily influenced', 'під сильним впливом', 'He was heavily influenced by Hemingway.'],
              ['painfully slow', 'нестерпно повільний', 'Progress has been painfully slow.'],
              ['bitterly disappointed', 'гірко розчарований', 'I was bitterly disappointed with the score.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Strongly disappointed.', right: 'Bitterly disappointed.', reasonUk: 'З словом disappointed стійка колокація — тільки BITTERLY.' },
      ],
      vocabulary: [
        { word: 'blatantly', transcription: '/ˈbleɪtəntli/', translationUk: 'кричуще, абсолютно', exampleEn: 'Blatantly obvious.', exampleUk: 'Кричуще очевидно.' },
        { word: 'utterly', transcription: '/ˈʌtəli/', translationUk: 'цілковито, абсолютно', exampleEn: 'Utterly impossible.', exampleUk: 'Цілком неможливо.' },
      ],
      proTipUk: 'На іспитах C1 Advanced (CAE) колокації дають найбільшу кількість балів у секції Writing та Use of English.',
    },
    exercises: [
      {
        id: 'c1-ac-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну колокацію: "I was ___ disappointed when our flight was cancelled."',
        options: ['bitterly', 'strongly', 'heavily', 'blatantly'],
        correctAnswer: 'bitterly',
        explanationUk: 'Стійка колокація зі словом disappointed — bitterly disappointed.',
      },
    ],
  },
  {
    id: 'c1-nuanced-concession',
    level: 'C1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Нюанси стилістики та модальності',
    unitTitleEn: 'Unit 3: Nuance & Register',
    lessonNumber: 11,
    estimatedMinutes: 10,
    titleEn: 'Nuanced Concession: Be that as it may, Much as I...',
    titleUk: 'Тонкі звороти поступки: Difficult though it is, Be that as it may',
    descriptionUk: 'Як погодитися з аргументом опонента і водночас витончено його спростувати: "Як би мені це не подобалося...", "Хоч це й важко...".',
    iconName: 'Compass',
    order: 11,
    notes: {
      title: 'Витончені звороти поступки (Nuanced Concession)',
      summaryUk: 'Замість банального "Although it is difficult", рівень C1 використовує синтаксичні інверсії поступки: "Difficult though it may be...", "Much as I respect his opinion...", "Be that as it may...".',
      formula: 'Прикметник + THOUGH / AS + підмет + дієслово',
      explanationSections: [
        {
          heading: 'Приклади інтелектуальної суперечки',
          contentUk: 'Порівняйте форми:',
          examples: [
            { en: 'Difficult THOUGH it is, we must find a compromise.', uk: 'Хоч це й важко (інверсія з though), ми повинні знайти компроміс.' },
            { en: 'MUCH AS I admire your work, I cannot approve this budget.', uk: 'Як би сильно я не захоплювався вашою роботою, я не можу затвердити цей кошторис.' },
            { en: 'BE THAT AS IT MAY, safety remains our top priority.', uk: 'Як би там не було (стійкий ідіоматичний оборот), безпека залишається пріоритетом.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Though difficult it is.', right: 'Difficult though it is.', reasonUk: 'Прикметник (difficult) обовʼязково виноситься ПЕРЕД словом though!' },
      ],
      vocabulary: [
        { word: 'compromise', transcription: '/ˈkɒmprəmaɪz/', translationUk: 'компроміс', exampleEn: 'Reach a compromise.', exampleUk: 'Дійти компромісу.' },
      ],
      proTipUk: 'Фраза "Be that as it may" — універсальний прийом у дебатах, щоб не сперечатися з фактом, але перевести увагу на свій головний аргумент.',
    },
    exercises: [
      {
        id: 'c1-nc-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний порядок: "___, we have to finish the project on time."',
        options: ['Tired though we were', 'Though tired we were', 'Tired as were we', 'Tired although we were'],
        correctAnswer: 'Tired though we were',
        explanationUk: 'Конструкція поступки: Прикметник (Tired) + though + підмет + дієслово.',
      },
    ],
  },
  {
    id: 'c1-nominalization',
    level: 'C1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Нюанси стилістики та модальності',
    unitTitleEn: 'Unit 3: Nuance & Register',
    lessonNumber: 12,
    estimatedMinutes: 10,
    titleEn: 'Nominalization in Academic & Executive Style',
    titleUk: 'Номіналізація: Перетворення дієслів на іменники',
    descriptionUk: 'Головна таємниця академічного та аналітичного стилю: чому "We analyzed the data and discovered..." перетворюється на "Our analysis of the data led to the discovery of...".',
    iconName: 'BookOpen',
    order: 12,
    notes: {
      title: 'Номіналізація (Nominalization): Академічна щільність',
      summaryUk: 'Номіналізація — це процес перетворення дієслів та прикметників на іменники (analyze -> analysis, discover -> discovery, fail -> failure). Це робить текст більш обʼєктивним, вагомим та позбавленим зайвих займенників (I, we).',
      formula: 'Дієслово -> Іменник (The implementation of policy instead of We implemented the policy)',
      explanationSections: [
        {
          heading: 'Порівняння розмовного та аналітичного стилю',
          contentUk: 'Як змінюється сприйняття тексту:',
          tableData: {
            headers: ['Розмовний стиль (Verbs)', 'Академічний/Executive стиль (Nominalization)'],
            rows: [
              ['Because they delivered the goods late, we lost money.', 'The delayed delivery of goods resulted in substantial financial losses.'],
              ['We investigated how the system failed.', 'An investigation into the system failure was launched.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Overusing personal pronouns "I think we should investigate..." in whitepapers.', right: 'Using "An investigation is strongly recommended..."', reasonUk: 'Номіналізація робить висновки науковими та безапеляційними.' },
      ],
      vocabulary: [
        { word: 'substantial', transcription: '/səbˈstænʃl/', translationUk: 'значний, суттєвий', exampleEn: 'Substantial growth.', exampleUk: 'Суттєве зростання.' },
      ],
      proTipUk: 'Не зловживайте номіналізацією в розмові, але обовʼязково використовуйте її в резюме та офіційних звітах.',
    },
    exercises: [
      {
        id: 'c1-nom-1',
        type: 'multiple_choice',
        question: 'Оберіть найбільш академічне перефразування: "Because the government reacted quickly, the crisis was averted."',
        options: ['The government\'s swift reaction averted the crisis.', 'The government reacted swiftly so the crisis was averted.', 'Quickly reacting, the government averted crisis.', 'Because of quick reaction government stopped crisis.'],
        correctAnswer: "The government's swift reaction averted the crisis.",
        explanationUk: 'Номіналізація: дієслово reacted замінено на іменник reaction з якісним прикметником swift.',
      },
    ],
  },

  // ==========================================
  // UNIT 4: РИТОРИКА, ДИПЛОМАТІЯ ТА МАЙСТЕРНІСТЬ
  // ==========================================
  {
    id: 'c1-diplomatic-language',
    level: 'C1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Риторика та дипломатична майстерність',
    unitTitleEn: 'Unit 4: Rhetoric & Fluency',
    lessonNumber: 13,
    estimatedMinutes: 10,
    titleEn: 'Diplomatic & High-Level Negotiation Language',
    titleUk: 'Дипломатичний регістр та ведення високих перемовин',
    descriptionUk: 'Як вести переговори на рівні рад директорів та міністерств: "With all due respect", "I am hesitant to commit", "We would appreciate clarification".',
    iconName: 'ShieldCheck',
    order: 13,
    notes: {
      title: 'Мистецтво високої дипломатії (Diplomatic Language)',
      summaryUk: 'На рівні C1 ви маєте вміти захищати позицію компанії без жодної прямої агресії, використовуючи негативні питання, умовні конструкції та пасивні звороти.',
      formula: 'Пряма вимога -> Ввічлива умовна пропозиція',
      explanationSections: [
        {
          heading: 'Еталони дипломатичних фраз',
          contentUk: 'Золотий фонд міжнародних переговорів:',
          tableData: {
            headers: ['Пряма вимога', 'Дипломатичний еквівалент'],
            rows: [
              ['Explain this clause.', 'We would welcome further clarification on this particular clause.'],
              ['We reject this offer.', 'At this juncture, we are not in a position to accept this proposal.'],
              ['You are too late.', 'Time is of the essence, and we have concerns regarding the current timeline.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Using blunt negatives like "No, impossible".', right: 'Using "That might prove somewhat problematic from our perspective".', reasonUk: 'Дипломатія завжди залишає простір для продовження діалогу.' },
      ],
      vocabulary: [
        { word: 'juncture', transcription: '/ˈdʒʌŋktʃə(r)/', translationUk: 'етап, момент (часу)', exampleEn: 'At this critical juncture.', exampleUk: 'На цьому критичному етапі.' },
        { word: 'clarification', transcription: '/ˌklærəfɪˈkeɪʃn/', translationUk: 'розʼяснення', exampleEn: 'Seek clarification.', exampleUk: 'Шукати розʼяснення.' },
      ],
      proTipUk: 'Фраза "Time is of the essence" — юридичний та дипломатичний термін, що означає "час критично важливий, зволікання неприпустиме".',
    },
    exercises: [
      {
        id: 'c1-dl-1',
        type: 'multiple_choice',
        question: 'Оберіть найбільш дипломатичну відмову в бізнесі:',
        options: ['We are currently not in a position to pursue this opportunity.', 'We completely refuse your bad offer.', 'No way we can agree to this.', 'Your offer makes no sense to us.'],
        correctAnswer: 'We are currently not in a position to pursue this opportunity.',
        explanationUk: '"We are currently not in a position to..." — найвищий стандарт ділової відмови.',
      },
    ],
  },
  {
    id: 'c1-advanced-metaphors-idioms',
    level: 'C1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Риторика та дипломатична майстерність',
    unitTitleEn: 'Unit 4: Rhetoric & Fluency',
    lessonNumber: 14,
    estimatedMinutes: 10,
    titleEn: 'Sophisticated Idioms, Euphemisms & Metaphors',
    titleUk: 'Евфемізми та рідкісні метафори: Bite the bullet, Elephant in the room',
    descriptionUk: 'Як помʼякшувати неприємні новини (економічний спад, скорочення штату) за допомогою евфемізмів та образних зворотів.',
    iconName: 'Sparkles',
    order: 14,
    notes: {
      title: 'Евфемізми та витончені метафори (Euphemisms & Idioms)',
      summaryUk: 'Евфемізм — це помʼякшене слово, яке замінює грубе або лякаюче поняття (наприклад, замість "fire workers" кажуть "downsize the workforce" або "let staff go").',
      formula: 'Неприємна правда -> Витончений евфемізм',
      explanationSections: [
        {
          heading: 'Топ евфемізмів ділового світу',
          contentUk: 'Приклади:',
          tableData: {
            headers: ['Грубе поняття', 'Корпоративний евфемізм', 'Значення'],
            rows: [
              ['Fire people', 'Streamline / Downsize', 'Скорочувати персонал'],
              ['The company is broke', 'Experiencing negative cashflow', 'Мати фінансові проблеми'],
              ['The elephant in the room', 'An obvious problem no one wants to discuss', 'Очевидна проблема, яку всі бояться озвучити'],
              ['Bite the bullet', 'Face a difficult situation with courage', 'Зціпити зуби та зробити важку справу'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Using harsh literal words in executive communication.', right: 'Using appropriate professional euphemisms.', reasonUk: 'Евфемізми захищають бренд компанії від паніки на ринку.' },
      ],
      vocabulary: [
        { word: 'euphemism', transcription: '/ˈjuːfəmɪzəm/', translationUk: 'евфемізм', exampleEn: 'Use of euphemism.', exampleUk: 'Використання евфемізму.' },
      ],
      proTipUk: '"Bite the bullet" походить з часів війни, коли пораненим солдатам давали закусити свинцеву кулю перед операцією без анестезії.',
    },
    exercises: [
      {
        id: 'c1-ami-1b',
        type: 'multiple_choice',
        question: 'Що означає вираз "address the elephant in the room"?',
        options: ['Discuss an obvious problem that everyone is avoiding.', 'Clean up a large mess in the office.', 'Purchase exotic animals for marketing.', 'Delay a difficult project.'],
        correctAnswer: 'Discuss an obvious problem that everyone is avoiding.',
        explanationUk: 'Elephant in the room — очевидна проблема, про яку всі мовчать.',
      },
    ],
  },
  {
    id: 'c1-stylistic-devices',
    level: 'C1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Риторика та дипломатична майстерність',
    unitTitleEn: 'Unit 4: Rhetoric & Fluency',
    lessonNumber: 15,
    estimatedMinutes: 10,
    titleEn: 'Stylistic Devices: Litotes, Chiasmus & Understatement',
    titleUk: 'Стилістичні фігури: Літота, Хіазм та Британський Understatement',
    descriptionUk: 'Як жартувати та висловлювати думки з легендарною британською стриманістю ("Not bad" = приголомшливо, "A bit of a problem" = катастрофа).',
    iconName: 'Crown',
    order: 15,
    notes: {
      title: 'Риторичні прийоми: Літота та Understatement',
      summaryUk: 'Understatement (заниження масштабу) — це душа британського гумору та культури. Замість емоційного захоплення чи паніки носії мови свідомо применшують масштаби події через подвійне заперечення (Litotes).',
      formula: 'NOT + негативне слово = Стримане позитивне твердження',
      explanationSections: [
        {
          heading: 'Приклади британського Understatement',
          contentUk: 'Що насправді має на увазі британець:',
          tableData: {
            headers: ['Що сказано (Understatement)', 'Що це насправді означає'],
            rows: [
              ['"It\'s not uncommon..."', 'Це трапляється дуже часто.'],
              ['"I\'m not unhappy with the result."', 'Я надзвичайно задоволений результатом.'],
              ['"We have a bit of a situation here."', 'У нас масштабна катастрофа.'],
              ['"The weather is rather fresh."', 'На вулиці лютий мороз.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Taking British understatement literally.', right: 'Recognizing that "not bad at all" actually means "splendid".', reasonUk: 'Культурний контекст вимагає розуміння підтексту.' },
      ],
      vocabulary: [
        { word: 'understatement', transcription: '/ˈʌndəsteɪtmənt/', translationUk: 'заниження, применшення', exampleEn: 'Typical understatement.', exampleUk: 'Типове применшення.' },
      ],
      proTipUk: 'Використовуйте "not uncommon", "not inaccurate" в аналітичних висновках — це звучить стримано й обʼєктивно.',
    },
    exercises: [
      {
        id: 'c1-sd-1',
        type: 'multiple_choice',
        question: 'Що має на увазі носій мови, коли каже: "This strategy is not without merit"?',
        options: ['The strategy has significant positive advantages.', 'The strategy is completely useless.', 'The strategy has failed.', 'The strategy is too expensive.'],
        correctAnswer: 'The strategy has significant positive advantages.',
        explanationUk: 'Litotes: "not without merit" означає "має суттєві переваги та цінність".',
      },
    ],
  },
  {
    id: 'c1-capstone',
    level: 'C1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Риторика та дипломатична майстерність',
    unitTitleEn: 'Unit 4: Rhetoric & Fluency',
    lessonNumber: 16,
    estimatedMinutes: 15,
    titleEn: 'Level C1 Capstone: Executive English Mastery',
    titleUk: 'Фінальний майстер-клас C1: Досконале володіння англійською мовою',
    descriptionUk: 'Кульмінація курсу LinguaFlow: інтеграція всіх 80 уроків програми. Ви готові до дебатів на будь-яку тему та міжнародної карʼєри.',
    iconName: 'Crown',
    order: 16,
    notes: {
      title: 'Вітаємо! Ви досягли вершини володіння мовою — Рівень C1',
      summaryUk: 'Пройшовши всі 80 уроків платформи LinguaFlow від A1 до C1, ви опанували повну граматичну систему англійської мови: від простого "I am" до віртуозної інверсії "Hardly had I known". Ваша англійська — точна, багата, виразна та переконлива.',
      explanationSections: [
        {
          heading: 'Ваш новий статус у мові',
          contentUk: 'Ви можете: 1) Брати участь у складних наукових та бізнес-дискусіях; 2) Розуміти підтекст, евфемізми та тонкий гумор; 3) Складати іспити Cambridge C1 Advanced або IELTS на найвищий бал 7.5–8.5.',
        },
      ],
      commonMistakes: [
        { wrong: 'Thinking you know everything.', right: 'Continuing regular practice with our Speaking AI simulator and 2,400 vocabulary bank.', reasonUk: 'Мова жива — говоріть щодня!' },
      ],
      vocabulary: [
        { word: 'mastery', transcription: '/ˈmɑːstəri/', translationUk: 'майстерність, досконале володіння', exampleEn: 'Language mastery.', exampleUk: 'Мовна майстерність.' },
      ],
      proTipUk: 'Закріплюйте знання, спілкуючись із нашим голосовим Speaking AI на реальні сценарії (співбесіди, дебати, переговори). Успіхів!',
    },
    exercises: [
      {
        id: 'c1-cap-1',
        type: 'multiple_choice',
        question: 'Оберіть найбільш граматично бездоганне речення рівня C1:',
        options: [
          'Under no circumstances should you disclose this confidential information.',
          'Under no circumstances you should disclose this confidential information.',
          'Never you disclose this confidential information.',
          'Not only you disclose this information but also share it.',
        ],
        correctAnswer: 'Under no circumstances should you disclose this confidential information.',
        explanationUk: 'Ідеальна негативна інверсія: Under no circumstances + should + you + disclose.',
      },
    ],
  },
];
