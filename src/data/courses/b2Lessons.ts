import { Topic } from '@/types/course';

export const B2_LESSONS: Topic[] = [
  // ==========================================
  // UNIT 1: СКЛАДНІ ЧАСИ ТА ПАСИВНІ КОНСТРУКЦІЇ
  // ==========================================
  {
    id: 'b2-future-continuous-perfect',
    level: 'B2',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Складні часові аспекти та пасив',
    unitTitleEn: 'Unit 1: Advanced Aspects & Passive',
    lessonNumber: 1,
    estimatedMinutes: 10,
    titleEn: 'Future Continuous & Future Perfect',
    titleUk: 'Future Continuous та Future Perfect (will be doing, will have done)',
    descriptionUk: 'Як сказати "Завтра в цей час я буду летіти над океаном" та "До 2030 року компанія побудує 10 нових офісів".',
    iconName: 'Clock',
    order: 1,
    notes: {
      title: 'Future Continuous проти Future Perfect',
      summaryUk: 'Future Continuous (will be + V-ing) описує дію, яка БУДЕ ТРИВАТИ в конкретний момент у майбутньому. Future Perfect (will have + V3) описує дію, яка ЗАВЕРШИТЬСЯ ДО певного моменту в майбутньому (маркер: BY + час).',
      formula: 'Future Continuous: WILL BE + V-ING | Future Perfect: WILL HAVE + V3',
      explanationSections: [
        {
          heading: 'Контраст тривалості та завершеності',
          contentUk: 'Порівняйте два погляди в майбутнє:',
          examples: [
            { en: 'This time tomorrow, I will be flying to New York.', uk: 'Завтра в цей час я летітиму в Нью-Йорк (буду знаходитися в процесі польоту).' },
            { en: 'By 5 PM, I will have finished this report.', uk: 'До 17:00 я вже закінчу цей звіт (дія буде завершена до дедлайну).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'By tomorrow I will finish.', right: 'By tomorrow I will have finished.', reasonUk: 'Прийменник BY вказує на дедлайн і вимагає Future Perfect!' },
      ],
      vocabulary: [
        { word: 'deadline', transcription: '/ˈdedlaɪn/', translationUk: 'дедлайн, крайній термін', exampleEn: 'Meet the deadline.', exampleUk: 'Вкластися в дедлайн.' },
        { word: 'by the time', transcription: '/baɪ ðə taɪm/', translationUk: 'до того часу як', exampleEn: 'By the time you arrive.', exampleUk: 'До того часу як ти приїдеш.' },
      ],
      proTipUk: 'Формула памʼяті: "By 2026 = will have done", "At 3 PM tomorrow = will be doing".',
    },
    exercises: [
      {
        id: 'b2-fcp-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму: By next December, they ___ the new bridge.',
        options: ['will have completed', 'will be completing', 'will complete', 'complete'],
        correctAnswer: 'will have completed',
        explanationUk: 'Маркер By next December вимагає Future Perfect (will have completed).',
      },
    ],
  },
  {
    id: 'b2-passive-all-tenses',
    level: 'B2',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Складні часові аспекти та пасив',
    unitTitleEn: 'Unit 1: Advanced Aspects & Passive',
    lessonNumber: 2,
    estimatedMinutes: 10,
    titleEn: 'Passive Voice in Continuous & Perfect Aspects',
    titleUk: 'Пасивний стан у всіх часах (is being done, has been done)',
    descriptionUk: 'Як коректно говорити в пасиві: "Зараз готується новий контракт", "Сервер уже оновлено".',
    iconName: 'ShieldCheck',
    order: 2,
    notes: {
      title: 'Пасивний стан у тривалих та доконаних часах',
      summaryUk: 'На рівні B2 пасив виходить за межі простих часів: Present Continuous Passive (is being done — прямо зараз робиться) та Present Perfect Passive (has been done — вже зроблено).',
      formula: 'Continuous Passive: am/is/are + BEING + V3 | Perfect Passive: have/has + BEEN + V3',
      explanationSections: [
        {
          heading: 'Зведена таблиця складного пасиву',
          contentUk: 'Приклади професійного використання:',
          tableData: {
            headers: ['Час', 'Пасивна формула', 'Приклад'],
            rows: [
              ['Present Continuous', 'is/are being + V3', 'The road is being repaired now.'],
              ['Present Perfect', 'has/have been + V3', 'All files have been deleted.'],
              ['Modals (can/should)', 'modal + be + V3', 'This issue must be resolved immediately.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'The car is repairing now.', right: 'The car is being repaired now.', reasonUk: 'Машина не сама себе ремонтує! Потрібно: is being repaired.' },
      ],
      vocabulary: [
        { word: 'resolve', transcription: '/rɪˈzɒlv/', translationUk: 'вирішувати (проблему)', exampleEn: 'Resolve an issue.', exampleUk: 'Вирішити проблему.' },
      ],
      proTipUk: 'У бізнес-звітах та технічній документації понад 40% дієслів вживаються саме в пасивному стані.',
    },
    exercises: [
      {
        id: 'b2-pvat-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: Please wait, your application ___ at the moment.',
        options: ['is being processed', 'is processing', 'has been processed', 'was processed'],
        correctAnswer: 'is being processed',
        explanationUk: 'Дія триває в цей момент над обʼєктом -> Present Continuous Passive: is being processed.',
      },
    ],
  },
  {
    id: 'b2-causative-have-get',
    level: 'B2',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Складні часові аспекти та пасив',
    unitTitleEn: 'Unit 1: Advanced Aspects & Passive',
    lessonNumber: 3,
    estimatedMinutes: 10,
    titleEn: 'Causative: Have / Get Something Done',
    titleUk: 'Каузативні конструкції: Have / Get something done',
    descriptionUk: 'Як сказати "Я підстригся" або "Мені полагодили авто", щоб не здавалося, що ви самі собі стригли волосся ножицями.',
    iconName: 'Sparkles',
    order: 3,
    notes: {
      title: 'Каузатив (Causative): Have / Get something done',
      summaryUk: 'Якщо ви скажете "I cut my hair", це буквально означає, що ви взяли ножиці і самі собі відрізали волосся. Коли послугу для нас робить фахівець (перукар, механік, лікар), ми використовуємо каузатив:',
      formula: 'Підмет + HAVE / GET + Що зробили + V3',
      explanationSections: [
        {
          heading: 'Приклади делегування роботи',
          contentUk: 'Порівняйте значення:',
          examples: [
            { en: 'I had my hair cut yesterday.', uk: 'Я підстригся вчора (мені підстриг волосся перукар).' },
            { en: 'We need to have our car repaired.', uk: 'Нам потрібно віддати авто в ремонт.' },
            { en: 'Where did you get your nails done?', uk: 'Де ти робила манікюр?' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I repaired my car (коли ремонтувало СТО).', right: 'I had my car repaired.', reasonUk: 'Щоб показати замовлення послуги, вживається have something done.' },
      ],
      vocabulary: [
        { word: 'repair', transcription: '/rɪˈpeə(r)/', translationUk: 'ремонтувати', exampleEn: 'Car repair.', exampleUk: 'Ремонт авто.' },
      ],
      proTipUk: 'GET звучить трохи більш неформально, ніж HAVE: "I got my phone fixed" = "I had my phone fixed".',
    },
    exercises: [
      {
        id: 'b2-cau-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант: "I need to ___ before the wedding."',
        options: ['have my suit cleaned', 'clean my suit myself', 'have clean my suit', 'get my suit clean'],
        correctAnswer: 'have my suit cleaned',
        explanationUk: 'Конструкція: have + my suit (предмет) + cleaned (V3).',
      },
    ],
  },
  {
    id: 'b2-passive-reporting-verbs',
    level: 'B2',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Складні часові аспекти та пасив',
    unitTitleEn: 'Unit 1: Advanced Aspects & Passive',
    lessonNumber: 4,
    estimatedMinutes: 10,
    titleEn: 'Passive with Reporting Verbs: It is said that...',
    titleUk: 'Безособовий пасив: It is said that... / He is believed to be...',
    descriptionUk: 'Мова якісної журналістики (BBC, The Economist): "Кажуть, що...", "Вважається, що цей винахід змінить світ".',
    iconName: 'BookOpen',
    order: 4,
    notes: {
      title: 'Звітні пасивні структури (Passive Reporting Verbs)',
      summaryUk: 'Ці конструкції використовуються для передачі чуток, загальної думки чи експертних оцінок без посилання на конкретну особу: it is said (кажуть), it is believed (вважається), it is thought (думають), it is claimed (стверджують).',
      formula: '1) It is said that + речення | 2) Підмет + is said TO + інфінітив',
      explanationSections: [
        {
          heading: 'Дві форми одного твердження',
          contentUk: 'Обидва варіанти мають однаковий зміст:',
          examples: [
            { en: 'It is believed that the company is losing money.', uk: 'Вважається, що компанія зазнає збитків.' },
            { en: 'The company is believed to be losing money.', uk: 'Компанія, як вважається, зазнає збитків (більш просунута структура).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'People say that he is genius (у науковій чи діловій статті).', right: 'He is said to be a genius.', reasonUk: 'Пасивна форма надає мові академічності та обʼєктивності.' },
      ],
      vocabulary: [
        { word: 'claim', transcription: '/kleɪm/', translationUk: 'стверджувати', exampleEn: 'Claim responsibility.', exampleUk: 'Взяти відповідальність.' },
      ],
      proTipUk: 'Використовуйте цю структуру на письмі (в есеях та листах), щоб звучати професійно й дипломатично.',
    },
    exercises: [
      {
        id: 'b2-prv-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: The criminal is believed ___ abroad.',
        options: ['to be living', 'living', 'that lives', 'is live'],
        correctAnswer: 'to be living',
        explanationUk: 'Після конструкції is believed вживається інфінітив: to be living.',
      },
    ],
  },

  // ==========================================
  // UNIT 2: МИНУЛІ ГІПОТЕЗИ ТА ЖАЛІ
  // ==========================================
  {
    id: 'b2-third-conditional',
    level: 'B2',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Минулі гіпотези та жалі',
    unitTitleEn: 'Unit 2: Past Hypotheses & Regrets',
    lessonNumber: 5,
    estimatedMinutes: 10,
    titleEn: 'Third Conditional — Regrets About the Past',
    titleUk: 'Third Conditional — Нереальні умови в минулому та жалі',
    descriptionUk: 'Як сказати "Якби я вчора знав про затор, я б поїхав на метро", "Якби ти мені сказав, я б допоміг".',
    iconName: 'History',
    order: 5,
    notes: {
      title: 'Third Conditional: Події, які вже неможливо змінити',
      summaryUk: 'Third Conditional описує повністю нереальні ситуації в минулому: час минув, поїзд пішов, дію змінити неможливо. Ми лише шкодуємо або фантазуємо про те, як усе могло б скластися інакше.',
      formula: 'IF + Past Perfect (had + V3), WOULD HAVE + V3',
      explanationSections: [
        {
          heading: 'Формула та приклади',
          contentUk: 'Зверніть увагу на складну структуру обох частин:',
          examples: [
            { en: 'If I had studied harder, I would have passed the exam.', uk: 'Якби я вчився наполегливіше (в минулому), я б склав іспит (але я не вчився і завалив).' },
            { en: 'If we had taken a taxi, we wouldn\'t have missed the flight.', uk: 'Якби ми взяли таксі, ми б не запізнилися на рейс.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'If I would have known, I would have told.', right: 'If I had known, I would have told you.', reasonUk: 'У частині з IF слово would категорично заборонене! Тільки had + V3.' },
      ],
      vocabulary: [
        { word: 'regret', transcription: '/rɪˈɡret/', translationUk: 'жаль, шкодувати', exampleEn: 'Past regrets.', exampleUk: 'Минулі жалі.' },
      ],
      proTipUk: 'У розмовній мові "would have" скорочують як "would\'ve" [wʊdəv].',
    },
    exercises: [
      {
        id: 'b2-tc-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: If you ___ me earlier, I could have helped you.',
        options: ['had called', 'called', 'would have called', 'have called'],
        correctAnswer: 'had called',
        explanationUk: 'Умовна частина Third Conditional вимагає Past Perfect: had called.',
      },
    ],
  },
  {
    id: 'b2-mixed-conditionals',
    level: 'B2',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Минулі гіпотези та жалі',
    unitTitleEn: 'Unit 2: Past Hypotheses & Regrets',
    lessonNumber: 6,
    estimatedMinutes: 10,
    titleEn: 'Mixed Conditionals — Past Cause, Present Result',
    titleUk: 'Змішані умовні речення: Минула причина — теперішній наслідок',
    descriptionUk: 'Як поєднати минуле з сьогоденням: "Якби я народився в Лондоні (минуле), я б зараз говорив англійською ідеально (теперішнє)".',
    iconName: 'Compass',
    order: 6,
    notes: {
      title: 'Змішані умовні речення (Mixed Conditionals)',
      summaryUk: 'Найчастіший тип Mixed Conditional змішує Third (минула дія) та Second (теперішній наслідок). Тобто: щось сталося в минулому, і це безпосередньо впливає на наш поточний стан прямо зараз!',
      formula: 'IF + Past Perfect (минула причина), WOULD + V1 (теперішній наслідок)',
      explanationSections: [
        {
          heading: 'Логічний місток між минулим і теперішнім',
          contentUk: 'Приклади:',
          examples: [
            { en: 'If I had won that grant last year, I would live in Canada NOW.', uk: 'Якби я виграв той грант торік (минуле), я б зараз жив у Канаді (теперішнє).' },
            { en: 'If I were more ambitious, I would have applied for that job.', uk: 'Якби я був більш амбітним взагалі (стан), я б подався на ту вакансію торік (минула дія).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Using standard Third conditional when the result is right now.', right: 'Check if there is a word "now" or "today" in the result clause.', reasonUk: 'Якщо наслідок стосується теперішнього часу — вживаємо would + V1, а не would have + V3.' },
      ],
      vocabulary: [
        { word: 'grant', transcription: '/ɡrɑːnt/', translationUk: 'грант, стипендія', exampleEn: 'Win a grant.', exampleUk: 'Виграти грант.' },
      ],
      proTipUk: 'Шукайте маркери теперішнього часу (now, today, currently) у головній частині речення.',
    },
    exercises: [
      {
        id: 'b2-mc-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: If I had taken that medicine yesterday, I ___ healthy today.',
        options: ['would feel', 'would have felt', 'felt', 'will feel'],
        correctAnswer: 'would feel',
        explanationUk: 'Дія в минулому (yesterday), але наслідок сьогодні (today) -> would feel.',
      },
    ],
  },
  {
    id: 'b2-wishes-regrets',
    level: 'B2',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Минулі гіпотези та жалі',
    unitTitleEn: 'Unit 2: Past Hypotheses & Regrets',
    lessonNumber: 7,
    estimatedMinutes: 10,
    titleEn: 'Wish & If Only: Present and Past Regrets',
    titleUk: 'Конструкції Wish та If Only: Як висловити жаль',
    descriptionUk: 'Як сказати "Шкода, що я не знаю відповіді" (I wish I knew) або "Якби ж я тільки прийшов вчасно!" (If only I had come).',
    iconName: 'Sparkles',
    order: 7,
    notes: {
      title: 'Конструкції I WISH та IF ONLY (шкода, що... / якби ж то...)',
      summaryUk: 'В українській мові ми кажемо "Шкода, що я не маю машини" (через заперечення). В англійській мові WISH перекладається ствердно: "Я бажаю, щоб у мене була машина" (I wish I had a car). Дієслово завжди робить крок назад у часі!',
      formula: 'Жаль про теперішнє: I wish + Past Simple | Жаль про минуле: I wish + Past Perfect',
      explanationSections: [
        {
          heading: 'Два рівні жалю',
          contentUk: 'Порівняйте часи:',
          examples: [
            { en: 'I wish I spoke German. (I don\'t speak it now).', uk: 'Шкода, що я не розмовляю німецькою зараз.' },
            { en: 'I wish I hadn\'t bought this coat. (I bought it yesterday and regret it).', uk: 'Шкода, що я купив це пальто вчора.' },
            { en: 'If only you were here with me!', uk: 'Якби ж ти тільки був тут зі мною!' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I wish I know the answer.', right: 'I wish I knew the answer.', reasonUk: 'Після wish обовʼязковий зсув у минулий час (Past Simple)!' },
      ],
      vocabulary: [
        { word: 'wish', transcription: '/wɪʃ/', translationUk: 'бажання, шкодувати', exampleEn: 'Make a wish.', exampleUk: 'Загадати бажання.' },
      ],
      proTipUk: 'Конструкція "I wish you would stop doing that!" виражає роздратування поведінкою іншої людини ("Та припини вже це робити!").',
    },
    exercises: [
      {
        id: 'b2-wsh-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: I am so tired. I wish I ___ on vacation right now.',
        options: ['were', 'am', 'will be', 'have been'],
        correctAnswer: 'were',
        explanationUk: 'Жаль про теперішній стан вимагає форми минулого часу (were).',
      },
    ],
  },
  {
    id: 'b2-modals-past-deduction',
    level: 'B2',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Минулі гіпотези та жалі',
    unitTitleEn: 'Unit 2: Past Hypotheses & Regrets',
    lessonNumber: 8,
    estimatedMinutes: 10,
    titleEn: 'Past Modals of Deduction: Must have, Can\'t have',
    titleUk: 'Здогадки про минуле: Must have done, Can\'t have done',
    descriptionUk: 'Як розслідувати минулі події: "Він, мабуть, забув ключі", "Вона не могла цього зробити!".',
    iconName: 'Zap',
    order: 8,
    notes: {
      title: 'Модальні дієслова здогадки про минуле (Modal + Have + V3)',
      summaryUk: 'Щоб висловити логічний висновок про те, що сталося в минулому, ми додаємо "HAVE + V3" після модального дієслова: MUST HAVE (точно так і було), CAN\'T HAVE (цього точно не могло статися), MIGHT/COULD HAVE (можливо сталося).',
      formula: 'Модальне дієслово + HAVE + V3',
      explanationSections: [
        {
          heading: 'Приклади ретроспективного аналізу',
          contentUk: 'Зверніть увагу на логіку висновків:',
          examples: [
            { en: 'The streets are wet. It MUST HAVE rained during the night.', uk: 'Вулиці мокрі. Вночі точно йшов дощ (залізний висновок).' },
            { en: 'John CAN\'T HAVE committed the crime; he was in Paris!', uk: 'Джон не міг скоїти цей злочин — він був у Парижі!' },
            { en: 'I can\'t find my wallet. I MIGHT HAVE left it in the taxi.', uk: 'Не можу знайти гаманець. Можливо, я залишив його в таксі (50/50).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'He must forgot his keys.', right: 'He must have forgotten his keys.', reasonUk: 'Для минулого обовʼязкова перфектна форма: have + V3.' },
      ],
      vocabulary: [
        { word: 'wallet', transcription: '/ˈwɒlɪt/', translationUk: 'гаманець', exampleEn: 'Lost wallet.', exampleUk: 'Загублений гаманець.' },
      ],
      proTipUk: 'Запамʼятайте: "SHOULD HAVE + V3" означає "треба було зробити (але ти не зробив)": "You should have listened to me!".',
    },
    exercises: [
      {
        id: 'b2-mpd-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: The lights were completely off. They ___ gone to bed.',
        options: ['must have', 'must to', 'can have', 'should to'],
        correctAnswer: 'must have',
        explanationUk: 'Впевнений логічний висновок про минулу дію: must have + gone.',
      },
    ],
  },

  // ==========================================
  // UNIT 3: ГЕРУНДІЙ, ІНФІНІТИВ ТА ЗВʼЯЗКИ
  // ==========================================
  {
    id: 'b2-gerund-infinitive-nuances',
    level: 'B2',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Синтаксис та звʼязуючі елементи',
    unitTitleEn: 'Unit 3: Syntax & Linkers',
    lessonNumber: 9,
    estimatedMinutes: 10,
    titleEn: 'Gerund vs Infinitive: Meaning Shifts',
    titleUk: 'Герундій чи інфінітив: Зміна значення дієслів',
    descriptionUk: 'Чому "remember to lock" — це не забути зачинити двері, а "remember locking" — згадати спогад про те, як зачиняв двері. Дієслова-перевертні: stop, try, forget, regret.',
    iconName: 'BookMarked',
    order: 9,
    notes: {
      title: 'Герундій проти інфінітива: Дієслова зі зміною значення',
      summaryUk: 'Деякі дієслова можуть вживатися як з герундієм (-ing), так і з інфінітивом (to), але значення речення змінюється кардинально!',
      formula: 'STOP / REMEMBER / FORGET / TRY / REGRET + TO vs -ING',
      explanationSections: [
        {
          heading: 'Топ-4 найважливіші дієслова',
          contentUk: 'Порівняйте значення:',
          tableData: {
            headers: ['Дієслово', '+ TO (Інфінітив)', '+ -ING (Герундій)'],
            rows: [
              ['REMEMBER', 'памʼятати зробити в майбутньому ("Remember to buy milk")', 'згадувати спогад про минуле ("I remember buying this")'],
              ['STOP', 'зупинитися, щоб зробити щось інше ("He stopped to smoke")', 'повністю припинити якусь звичку ("He stopped smoking")'],
              ['FORGET', 'забути виконати дію ("Don\'t forget to call")', 'ніколи не забути спогад ("I will never forget visiting Rome")'],
              ['TRY', 'докладати великих зусиль ("Try to lift it")', 'експериментувати як спроба ("Try adding some salt")'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'I stopped to eat meat (коли кинув їсти мʼясо).', right: 'I stopped eating meat.', reasonUk: 'Stop doing = кинути звичку. Stop to do = зупинитися дорогою, щоб поїсти.' },
      ],
      vocabulary: [
        { word: 'shift', transcription: '/ʃɪft/', translationUk: 'зсув, зміна', exampleEn: 'Meaning shift.', exampleUk: 'Зміна значення.' },
      ],
      proTipUk: 'Запамʼятайте: інфінітив (to) дивиться ВПЕРЕД (що треба зробити), а герундій (-ing) — НАЗАД (на вже пережитий досвід).',
    },
    exercises: [
      {
        id: 'b2-gin-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: Please remember ___ off the oven before you leave.',
        options: ['to turn', 'turning', 'turn', 'turned'],
        correctAnswer: 'to turn',
        explanationUk: 'Не забудь зробити дію в майбутньому -> remember to turn.',
      },
    ],
  },
  {
    id: 'b2-advanced-linkers',
    level: 'B2',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Синтаксис та звʼязуючі елементи',
    unitTitleEn: 'Unit 3: Syntax & Linkers',
    lessonNumber: 10,
    estimatedMinutes: 10,
    titleEn: 'Advanced Discourse Markers & Concession',
    titleUk: 'Звʼязуючі слова: Although, Despite, Whereas, Furthermore',
    descriptionUk: 'Як звʼязувати думки як досвідчений спікер: протиставлення, додавання аргументів та логічні переходи.',
    iconName: 'Compass',
    order: 10,
    notes: {
      title: 'Слова-звʼязки контрасту та додавання (Discourse Markers)',
      summaryUk: 'Слова-звʼязки роблять мову вишуканою та структурованою. Головна граматична різниця: ALTHOUGH / EVEN THOUGH вимагають після себе повноцінного речення (підмет + дієслово). DESPITE / IN SPITE OF вимагають іменника або форми з -ing.',
      formula: 'ALTHOUGH + Підмет + Дієслово | DESPITE + Іменник / V-ing',
      explanationSections: [
        {
          heading: 'Приклади контрасту',
          contentUk: 'Порівняйте структури:',
          examples: [
            { en: 'ALTHOUGH it was raining, we enjoyed our walk.', uk: 'Хоча йшов дощ, ми насолодилися прогулянкою.' },
            { en: 'DESPITE the heavy rain, we enjoyed our walk.', uk: 'Незважаючи на сильний дощ (після despite стоїть іменник rain).' },
            { en: 'He loves sports, WHEREAS his brother prefers reading.', uk: 'Він любить спорт, у той час як його брат віддає перевагу читанню.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Despite of the rain.', right: 'Despite the rain. / In spite of the rain.', reasonUk: 'Слово despite ніколи не вживається з прийменником of!' },
      ],
      vocabulary: [
        { word: 'despite', transcription: '/dɪˈspaɪt/', translationUk: 'незважаючи на', exampleEn: 'Despite difficulties.', exampleUk: 'Незважаючи на труднощі.' },
        { word: 'furthermore', transcription: '/ˌfɜːðəˈmɔː(r)/', translationUk: 'крім того, більше того', exampleEn: 'Furthermore, it is cheap.', exampleUk: 'Більше того, це дешево.' },
      ],
      proTipUk: 'Для есеїв рівня B2/C1 використовуйте звʼязки: "On the one hand... On the other hand", "Furthermore", "Nevertheless".',
    },
    exercises: [
      {
        id: 'b2-adl-1',
        type: 'multiple_choice',
        question: 'Оберіть слово-звʼязку: ___ having a degree, he couldn\'t find a job.',
        options: ['Despite', 'Although', 'Even though', 'Whereas'],
        correctAnswer: 'Despite',
        explanationUk: 'Перед формою з закінченням -ing (having) ставиться Despite.',
      },
    ],
  },
  {
    id: 'b2-non-defining-relative',
    level: 'B2',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Синтаксис та звʼязуючі елементи',
    unitTitleEn: 'Unit 3: Syntax & Linkers',
    lessonNumber: 11,
    estimatedMinutes: 10,
    titleEn: 'Non-Defining Relative Clauses (With Commas)',
    titleUk: 'Неозначальні підрядні речення: Правило ком в англійській мові',
    descriptionUk: 'Коли в англійській ставляться коми: додаткова інформація про відомі обʼєкти. Чому тут не можна писати "that".',
    iconName: 'BookOpen',
    order: 11,
    notes: {
      title: 'Неозначальні підрядні речення (Non-Defining Relative Clauses)',
      summaryUk: 'Коли підрядне речення додає просто цікаву, але НЕ обовʼязкову додаткову інформацію про вже відому людину чи предмет, воно обовʼязково виділяється КОМАМИ з обох боків. У таких реченнях ЗАБОРОНЕНО використовувати слово THAT (тільки who або which)!',
      formula: 'Відомий обʼєкт, WHO / WHICH + додатковий факт, головне речення',
      explanationSections: [
        {
          heading: 'Приклади з комами',
          contentUk: 'Якщо видалити частину в комах, головний зміст не втрачається:',
          examples: [
            { en: 'My mother, who is 60, runs every morning.', uk: 'Моя мама, якій 60 років, бігає щоранку (мама в мене одна, вік — це додатковий факт).' },
            { en: 'London, which is the capital of the UK, attracts millions of tourists.', uk: 'Лондон, який є столицею Великої Британії, приваблює мільйони туристів.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'My brother, that lives in Kyiv, is an engineer.', right: 'My brother, who lives in Kyiv, is an engineer.', reasonUk: 'Між комами слово that використовувати суворо заборонено!' },
      ],
      vocabulary: [
        { word: 'capital', transcription: '/ˈkæpɪtl/', translationUk: 'столиця, капітал', exampleEn: 'Capital city.', exampleUk: 'Столиця.' },
      ],
      proTipUk: 'На відміну від української мови, де коми ставляться майже перед кожним "який/що", в англійській коми ставляться РІДКО — лише коли інформація факультативна.',
    },
    exercises: [
      {
        id: 'b2-ndr-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант: "Steve Jobs, ___ co-founded Apple, was a visionary."',
        options: ['who', 'that', 'which', 'whom'],
        correctAnswer: 'who',
        explanationUk: 'Між комами для особи вживається виключно who.',
      },
    ],
  },
  {
    id: 'b2-reported-speech-patterns',
    level: 'B2',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Синтаксис та звʼязуючі елементи',
    unitTitleEn: 'Unit 3: Syntax & Linkers',
    lessonNumber: 12,
    estimatedMinutes: 10,
    titleEn: 'Advanced Reporting Verbs: Warn, Accuse, Insist',
    titleUk: 'Складні звітні дієслова: Warn, Accuse, Remind, Apologise',
    descriptionUk: 'Як не повторювати постійно "he said / she said": 15 сильних дієслів передачі чужої мови (threaten to do, accuse of doing).',
    iconName: 'History',
    order: 12,
    notes: {
      title: 'Просунуті звітні дієслова (Reporting Verbs)',
      summaryUk: 'Замість нудного "He said that I should not touch it", доросла англійська мова використовує специфічні звітні дієслова: "He warned me not to touch it".',
      formula: 'Дієслово + хто + інфінітив (warn someone to do) | Дієслово + прийменник + V-ing (apologise for doing)',
      explanationSections: [
        {
          heading: 'Шаблони синтаксису звітних дієслів',
          contentUk: 'Вивчіть ці структури:',
          tableData: {
            headers: ['Шаблон', 'Дієслова', 'Приклад'],
            rows: [
              ['verb + to + V1', 'offer, refuse, promise, threaten', 'He promised to call back.'],
              ['verb + someone + to + V1', 'advise, invite, remind, warn', 'She warned me not to drive fast.'],
              ['verb + preposition + V-ing', 'apologise for, insist on, accuse of', 'He apologised for being late.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'He insisted to pay.', right: 'He insisted on paying.', reasonUk: 'Insist вимагає прийменника on та герундія: insisted on paying.' },
      ],
      vocabulary: [
        { word: 'warn', transcription: '/wɔːn/', translationUk: 'попереджати', exampleEn: 'Warn about risks.', exampleUk: 'Попереджати про ризики.' },
        { word: 'apologise', transcription: '/əˈpɒlədʒaɪz/', translationUk: 'вибачатися', exampleEn: 'Apologise for delay.', exampleUk: 'Вибачитися за затримку.' },
      ],
      proTipUk: 'Використання дієслів як "refuse", "encourage", "deny" скорочує довгі речення вдвічі.',
    },
    exercises: [
      {
        id: 'b2-rsp-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: The police officer warned the driver ___ so fast.',
        options: ['not to drive', 'don\'t drive', 'not driving', 'not to driving'],
        correctAnswer: 'not to drive',
        explanationUk: 'Шаблон warn someone: not to drive.',
      },
    ],
  },

  // ==========================================
  // UNIT 4: ПРОФЕСІЙНЕ МОВЛЕННЯ ТА ІДІОМАТИКА
  // ==========================================
  {
    id: 'b2-business-correspondence',
    level: 'B2',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Професійне та ідіоматичне мовлення',
    unitTitleEn: 'Unit 4: Professional & Idiomatic Mastery',
    lessonNumber: 13,
    estimatedMinutes: 10,
    titleEn: 'Formal & Professional Business Correspondence',
    titleUk: 'Ділове листування: Етикет, шаблони та тон комунікації',
    descriptionUk: 'Як писати листи клієнтам та партнерам: "I am writing to inquire regarding...", "Please find attached", "I look forward to hearing from you".',
    iconName: 'ShieldCheck',
    order: 13,
    notes: {
      title: 'Стандарти ділового та формального листування (Business English)',
      summaryUk: 'У професійному листуванні слід уникати скорочень (I\'m, don\'t -> I am, do not), розмовних слів (get -> receive, ask -> inquire) та знаків оклику.',
      formula: 'Формальне звертання -> Суть запиту -> Додані матеріали -> Наступні кроки -> Ввічливе завершення',
      explanationSections: [
        {
          heading: 'Топ фраз для кожного блоку листа',
          contentUk: 'Золоті шаблони ділового листування:',
          tableData: {
            headers: ['Етап листа', 'Неформально (з друзями)', 'Професійно (в бізнесі)'],
            rows: [
              ['Причина звернення', 'Just wanted to ask...', 'I am writing with reference to...'],
              ['Прикріплені файли', 'Here is the file.', 'Please find attached the requested document.'],
              ['Очікування відповіді', 'Write me back soon!', 'I look forward to hearing from you at your earliest convenience.'],
              ['Підпис', 'Cheers / Bye', 'Yours sincerely / Kind regards'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'I look forward to hear from you.', right: 'I look forward to hearing from you.', reasonUk: 'Після стійкого виразу look forward to дієслово ЗАВЖДИ має закінчення -ing!' },
      ],
      vocabulary: [
        { word: 'inquire', transcription: '/ɪnˈkwaɪə(r)/', translationUk: 'запитувати, довідуватися', exampleEn: 'Inquire about prices.', exampleUk: 'Запитувати про ціни.' },
        { word: 'attached', transcription: '/əˈtætʃt/', translationUk: 'прикріплений (файл)', exampleEn: 'Attached document.', exampleUk: 'Прикріплений документ.' },
      ],
      proTipUk: 'Якщо ви знаєте імʼя адресата (Dear Mr. Smith) -> завершуйте "Yours sincerely". Якщо імʼя невідоме (Dear Sir/Madam) -> завершуйте "Yours faithfully".',
    },
    exercises: [
      {
        id: 'b2-bc-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму завершення ділового листа: "I look forward to ___ from you."',
        options: ['hearing', 'hear', 'have heard', 'heard'],
        correctAnswer: 'hearing',
        explanationUk: 'Після фрази look forward to завжди йде герундій hearing.',
      },
    ],
  },
  {
    id: 'b2-essential-idioms-b2',
    level: 'B2',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Професійне та ідіоматичне мовлення',
    unitTitleEn: 'Unit 4: Professional & Idiomatic Mastery',
    lessonNumber: 14,
    estimatedMinutes: 10,
    titleEn: 'Essential Idioms for Discussions & Negotiations',
    titleUk: 'Ключові ідіоми для дискусій: Cut corners, Hit the nail, Play devil\'s advocate',
    descriptionUk: 'Як розуміти метафоричну мову колег на зустрічах та під час переговорів без буквального перекладу.',
    iconName: 'Sparkles',
    order: 14,
    notes: {
      title: 'Топ-10 бізнес-ідіом рівня Upper-Intermediate',
      summaryUk: 'Ідіоми — це готові образні вирази, які не перекладаються дослівно. Їх використання робить вас схожим на впевненого білінгва.',
      formula: 'Ідіома = Образне переносне значення',
      explanationSections: [
        {
          heading: 'Найпопулярніші метафори робочого середовища',
          contentUk: 'Вивчіть ці вирази:',
          tableData: {
            headers: ['Ідіома', 'Дослівний переклад', 'Справжній сенс'],
            rows: [
              ['cut corners', 'зрізати кути', 'халтурити, економити на шкоду якості'],
              ['hit the nail on the head', 'влучити цвяхом по голові', 'потрапити в саму точку, сказати абсолютно точно'],
              ['play devil\'s advocate', 'грати адвоката диявола', 'висувати контраргументи заради перевірки ідеї'],
              ['see eye to eye', 'бачити око в око', 'повністю погоджуватися один з одним'],
              ['think outside the box', 'думати поза коробкою', 'мислити креативно та нестандартно'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Translating idioms word-by-word into Ukrainian.', right: 'Remembering the figurative situational meaning.', reasonUk: 'Ідіоми сприймаються лише цілісно.' },
      ],
      vocabulary: [
        { word: 'advocate', transcription: '/ˈædvəkət/', translationUk: 'захисник, прихильник', exampleEn: 'Devil\'s advocate.', exampleUk: 'Адвокат диявола.' },
      ],
      proTipUk: 'Не перевантажуйте одне речення трьома ідіомами: однієї доречної фрази на діалог цілком достатньо.',
    },
    exercises: [
      {
        id: 'b2-idm-1',
        type: 'multiple_choice',
        question: 'Що означає вираз "You hit the nail on the head"?',
        options: ['You are exactly right.', 'You made a painful mistake.', 'You damaged the furniture.', 'You need to be quiet.'],
        correctAnswer: 'You are exactly right.',
        explanationUk: 'Hit the nail on the head = влучити в саму точку, бути абсолютно правим.',
      },
    ],
  },
  {
    id: 'b2-hedging-politeness',
    level: 'B2',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Професійне та ідіоматичне мовлення',
    unitTitleEn: 'Unit 4: Professional & Idiomatic Mastery',
    lessonNumber: 15,
    estimatedMinutes: 10,
    titleEn: 'Hedging & Softening: Diplomatic Disagreement',
    titleUk: 'Хеджування: Мистецтво ввічливої та делікатної незгоди',
    descriptionUk: 'Чому в англомовному світі непристойно казати прямо "You are wrong". Вчимося помʼякшувати критику та висловлювати думку делікатно.',
    iconName: 'Compass',
    order: 15,
    notes: {
      title: 'Хеджування (Hedging): Мовна дипломатія',
      summaryUk: 'В англомовній культурі пряма категоричність вважається грубістю. Hedging (помʼякшення) допомагає висловити незгоду тактовно й зберегти гарні стосунки з колегами.',
      formula: 'Категоричне ствердження -> Ввічливе помʼякшення',
      explanationSections: [
        {
          heading: 'Прийоми помʼякшення тону',
          contentUk: 'Порівняйте дві манери спілкування:',
          tableData: {
            headers: ['Грубо / Категорично', 'Дипломатично (Hedging)'],
            rows: [
              ['This plan is bad.', 'It seems to me that this plan might need some adjustments.'],
              ['I disagree.', 'I see your point, however, I am inclined to think slightly differently.'],
              ['You made a mistake.', 'There appears to be a minor discrepancy in these numbers.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'Saying "I disagree with you" directly to a client.', right: 'Saying "I see what you mean, but have we considered...?"', reasonUk: 'Дипломатична англійська цінує взаємоповагу.' },
      ],
      vocabulary: [
        { word: 'discrepancy', transcription: '/dɪˈskrepənsi/', translationUk: 'розбіжність, невідповідність', exampleEn: 'Minor discrepancy.', exampleUk: 'Невелика розбіжність.' },
        { word: 'inclined', transcription: '/ɪnˈklaɪnd/', translationUk: 'схильний (думати)', exampleEn: 'I am inclined to agree.', exampleUk: 'Я схильний погодитися.' },
      ],
      proTipUk: 'Ключові слова хеджування: It appears that..., It seems to me..., I tend to believe..., slightly, somewhat.',
    },
    exercises: [
      {
        id: 'b2-hdg-1',
        type: 'multiple_choice',
        question: 'Оберіть найбільш дипломатичний варіант висловлення зауваження:',
        options: ['There seems to be a slight misunderstanding.', 'You don\'t understand anything.', 'Your report is completely wrong.', 'Fix this error immediately.'],
        correctAnswer: 'There seems to be a slight misunderstanding.',
        explanationUk: 'Фраза "There seems to be a slight misunderstanding" — класичний зразок хеджування.',
      },
    ],
  },
  {
    id: 'b2-b2-mastery',
    level: 'B2',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Професійне та ідіоматичне мовлення',
    unitTitleEn: 'Unit 4: Professional & Idiomatic Mastery',
    lessonNumber: 16,
    estimatedMinutes: 12,
    titleEn: 'Level B2 Capstone & Exam Readiness',
    titleUk: 'Підсумковий практикум B2: Готовність до міжнародних іспитів (IELTS / FCE)',
    descriptionUk: 'Фінальна перевірка знань рівня Upper-Intermediate перед переходом до елітного рівня Advanced (C1).',
    iconName: 'Crown',
    order: 16,
    notes: {
      title: 'Фініш рівня B2 (Upper-Intermediate)',
      summaryUk: 'Вітаємо! Рівень B2 — це офіційний "золотий стандарт" для роботи в міжнародних IT-компаніях, навчання в закордонних університетах та імміграції. Ви володієте гнучкою граматикою та багатою палітрою виразів.',
      explanationSections: [
        {
          heading: 'Чим вражає рівень C1?',
          contentUk: 'На рівні C1 ви опануєте інверсію (Never have I seen), акцентні розщеплені речення (Cleft sentences), дієприкметникові звороти та віртуозний стилістичний регістр.',
        },
      ],
      commonMistakes: [
        { wrong: 'Settling on B2 without aiming for C1.', right: 'Moving to C1 to sound sophisticated and truly bilingual.', reasonUk: 'Рівень C1 виділяє вас з-поміж 95% інших кандидатів.' },
      ],
      vocabulary: [
        { word: 'capstone', transcription: '/ˈkæpstəʊn/', translationUk: 'вершина, кульмінація', exampleEn: 'Capstone project.', exampleUk: 'Підсумковий проєкт.' },
      ],
      proTipUk: 'Складіть фінальний тест рівня B2 і відкривайте двері до експертного рівня C1!',
    },
    exercises: [
      {
        id: 'b2-cap-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: If they had listened to our advice, they ___ in trouble now.',
        options: ['wouldn\'t be', 'wouldn\'t have been', 'won\'t be', 'weren\'t'],
        correctAnswer: "wouldn't be",
        explanationUk: 'Змішаний тип: минула причина (had listened), теперішній наслідок (now) -> wouldn\'t be.',
      },
    ],
  },
];
