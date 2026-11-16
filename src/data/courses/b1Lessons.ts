import { Topic } from '@/types/course';

export const B1_LESSONS: Topic[] = [
  // ==========================================
  // UNIT 1: ЗВʼЯЗОК МИНУЛОГО З ТЕПЕРІШНІМ (Present Perfect)
  // ==========================================
  {
    id: 'b1-present-perfect-intro',
    level: 'B1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Системи Present Perfect',
    unitTitleEn: 'Unit 1: Present Perfect Systems',
    lessonNumber: 1,
    estimatedMinutes: 10,
    titleEn: 'Present Perfect — Experience & Life Results',
    titleUk: 'Present Perfect — Життєвий досвід та результат (have/has + V3)',
    descriptionUk: 'Місток між минулим і теперішнім: чому нам важливий результат прямо зараз, а не час, коли це сталося.',
    iconName: 'Sparkles',
    order: 1,
    notes: {
      title: 'Present Perfect: Досвід та звʼязок з теперішнім',
      summaryUk: 'Present Perfect використовується, коли дія відбулася в минулому, але її РЕЗУЛЬТАТ чи наслідки ми бачимо прямо зараз, або коли ми говоримо про свій життєвий досвід ("Я бував у Парижі"). Точний час у цьому випадку НЕ називається!',
      formula: 'I/You/We/They + HAVE + V3 | He/She/It + HAS + V3',
      explanationSections: [
        {
          heading: 'Складові частини: Have / Has + Третя форма дієслова',
          contentUk: 'Для правильних дієслів V3 закінчується на -ed (worked). Для неправильних — це третя колонка таблиці (gone, seen, done):',
          examples: [
            { en: 'I have lost my passport. (Now I can\'t find it!)', uk: 'Я загубив паспорт (і прямо зараз я без нього — є видимий результат).' },
            { en: 'She has visited six European countries.', uk: 'Вона відвідала шість європейських країн (це її життєвий досвід).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', reasonUk: 'Якщо є точне слово часу в минулому (yesterday, in 2021) — вживаємо Past Simple, а не Present Perfect!' },
      ],
      vocabulary: [
        { word: 'experience', transcription: '/ɪkˈspɪəriəns/', translationUk: 'досвід', exampleEn: 'Great experience.', exampleUk: 'Чудовий досвід.' },
        { word: 'result', transcription: '/rɪˈzʌlt/', translationUk: 'результат', exampleEn: 'Noticeable result.', exampleUk: 'Помітний результат.' },
      ],
      proTipUk: 'Формула: Present Perfect = Минула дія + Теперішній наслідок.',
    },
    exercises: [
      {
        id: 'b1-ppi-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму: She ___ her project, so now she can rest.',
        options: ['has finished', 'finished', 'have finished', 'is finishing'],
        correctAnswer: 'has finished',
        explanationUk: 'Результат дії впливає на теперішнє (вона може відпочити), підмет she -> has finished.',
      },
    ],
  },
  {
    id: 'b1-present-perfect-markers',
    level: 'B1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Системи Present Perfect',
    unitTitleEn: 'Unit 1: Present Perfect Systems',
    lessonNumber: 2,
    estimatedMinutes: 10,
    titleEn: 'Markers: Already, Yet, Just, Ever, Never',
    titleUk: 'Слова-маркери: Already, Yet, Just, Ever, Never',
    descriptionUk: 'Як розставити слова-підказки: "Я щойно закінчив", "Ти вже пообідав?", "Я ще не отримав відповіді".',
    iconName: 'History',
    order: 2,
    notes: {
      title: 'Маркери Present Perfect: Just, Already, Yet, Ever, Never',
      summaryUk: 'Ці слова мають строгі позиції в реченні: JUST (щойно) та ALREADY (вже) ставляться між have/has та V3 у ствердженнях. YET (ще ні, вже?) ставиться на САМИЙ КІНЕЦЬ у запереченнях та запитаннях. EVER ставиться в запитаннях про досвід ("Чи доводилося тобі колись?").',
      formula: 'have/has + JUST/ALREADY + V3 | have/has not + V3 ... YET',
      explanationSections: [
        {
          heading: 'Місце кожного маркера в реченні',
          contentUk: 'Приклади вживання:',
          examples: [
            { en: 'I have just arrived at the station.', uk: 'Я щойно прибув на вокзал (буквально хвилину тому).' },
            { en: 'I have already sent the email.', uk: 'Я вже відправив лист (раніше, ніж очікувалося).' },
            { en: 'Have you seen the new movie yet?', uk: 'Ти вже бачив новий фільм?' },
            { en: 'I haven\'t received the reply yet.', uk: 'Я ще не отримав відповіді (ставиться в кінці).' },
            { en: 'Have you ever been to London?', uk: 'Ти коли-небудь бував у Лондоні?' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I have yet not done.', right: 'I haven\'t done it yet.', reasonUk: 'Слово yet ставиться наприкінці речення!' },
      ],
      vocabulary: [
        { word: 'already', transcription: '/ɔːlˈredi/', translationUk: 'вже', exampleEn: 'Already done.', exampleUk: 'Вже зроблено.' },
        { word: 'yet', transcription: '/jet/', translationUk: 'ще (не), вже', exampleEn: 'Not yet.', exampleUk: 'Ще ні.' },
      ],
      proTipUk: 'На запитання "Are you ready?" часто відповідають: "Not yet" (Ще ні) — коротка ідеальна фраза.',
    },
    exercises: [
      {
        id: 'b1-ppm-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант: "Have you ___ eaten sushi?"',
        options: ['ever', 'yet', 'already', 'never'],
        correctAnswer: 'ever',
        explanationUk: 'У питаннях про життєвий досвід вживається ever (коли-небудь).',
      },
      {
        id: 'b1-ppm-2',
        type: 'fill_blank',
        question: 'Вставте слово "yet": They haven\'t finished the renovation ___.',
        correctAnswer: 'yet',
        explanationUk: 'У кінці заперечного речення в Present Perfect вживаємо yet.',
      },
    ],
  },
  {
    id: 'b1-for-since',
    level: 'B1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Системи Present Perfect',
    unitTitleEn: 'Unit 1: Present Perfect Systems',
    lessonNumber: 3,
    estimatedMinutes: 10,
    titleEn: 'Duration: For vs Since',
    titleUk: 'Тривалість стану: For проти Since',
    descriptionUk: 'Як сказати "Я живу тут уже 5 років" або "Ми знайомі з 2018 року". Точка відліку (since) проти проміжку часу (for).',
    iconName: 'Clock',
    order: 3,
    notes: {
      title: 'Тривалість у Present Perfect: FOR та SINCE',
      summaryUk: 'Коли стан почався в минулому і ТРИВАЄ ДОСІ: FOR вказує на період або тривалість (скільки часу: for 3 years, for two weeks). SINCE вказує на конкретну точку старту (відколи: since 2019, since Monday, since I was a child).',
      formula: 'FOR + період (for 5 days) | SINCE + початкова дата (since 2020)',
      explanationSections: [
        {
          heading: 'Таблиця вибору між FOR та SINCE',
          contentUk: 'Порівняйте приклади:',
          tableData: {
            headers: ['Маркер', 'Значення', 'Приклади'],
            rows: [
              ['FOR', 'тривалість (проміжок)', 'for 10 minutes, for 2 hours, for a long time, for 5 years'],
              ['SINCE', 'точка початку в часі', 'since 8 o\'clock, since yesterday, since May, since last year'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'I know him since 3 years.', right: 'I have known him for 3 years.', reasonUk: 'Для періоду "3 роки" вживається FOR, а час має бути Present Perfect.' },
      ],
      vocabulary: [
        { word: 'since', transcription: '/sɪns/', translationUk: 'з, від (певного часу)', exampleEn: 'Since childhood.', exampleUk: 'З дитинства.' },
        { word: 'decade', transcription: '/ˈdekeɪd/', translationUk: 'десятиліття', exampleEn: 'For a decade.', exampleUk: 'Протягом десятиліття.' },
      ],
      proTipUk: 'Запитання про тривалість завжди починається з "How long have you...?": "How long have you lived here?".',
    },
    exercises: [
      {
        id: 'b1-fs-1',
        type: 'multiple_choice',
        question: 'Оберіть прийменник: We have worked together ___ 2018.',
        options: ['since', 'for', 'from', 'in'],
        correctAnswer: 'since',
        explanationUk: '2018 — це конкретна точка старту, тому since.',
      },
      {
        id: 'b1-fs-2',
        type: 'multiple_choice',
        question: 'Оберіть прийменник: She has studied English ___ six months.',
        options: ['for', 'since', 'during', 'from'],
        correctAnswer: 'for',
        explanationUk: 'Six months — це проміжок часу (період), тому for.',
      },
    ],
  },
  {
    id: 'b1-present-perfect-vs-past-simple',
    level: 'B1',
    unitNumber: 1,
    unitTitleUk: 'Блок 1: Системи Present Perfect',
    unitTitleEn: 'Unit 1: Present Perfect Systems',
    lessonNumber: 4,
    estimatedMinutes: 10,
    titleEn: 'Present Perfect vs Past Simple',
    titleUk: 'Present Perfect проти Past Simple: Головна битва часів',
    descriptionUk: 'Як не плутати: "Я розбив чашку (факт у минулому)" чи "Я розбив чашку (і ось осколки на підлозі зараз)".',
    iconName: 'Compass',
    order: 4,
    notes: {
      title: 'Контраст: Present Perfect vs Past Simple',
      summaryUk: 'Past Simple = дія завершилася в конкретний час у минулому (час названо або він минув: yesterday, last year). Present Perfect = час НЕ названо, або період ще триває (today, this week), або важливий видимий результат прямо зараз.',
      formula: 'PAST SIMPLE = точний час у минулому | PRESENT PERFECT = результат для теперішнього',
      explanationSections: [
        {
          heading: 'Зведена таблиця контрасту',
          contentUk: 'Порівняйте речення:',
          examples: [
            { en: 'I lived in Berlin for 2 years (in 2018). — Past Simple (I don\'t live there anymore).', uk: 'Я жив у Берліні 2 роки (дія повністю завершилася в минулому, зараз я живу в іншому місті).' },
            { en: 'I have lived in Berlin for 2 years. — Present Perfect (I still live there today).', uk: 'Я живу в Берліні вже 2 роки (і досі продовжую там жити).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I have arrived yesterday.', right: 'I arrived yesterday.', reasonUk: 'Слово yesterday вимагає Past Simple!' },
      ],
      vocabulary: [
        { word: 'contrast', transcription: '/ˈkɒntrɑːst/', translationUk: 'контраст', exampleEn: 'Notice the contrast.', exampleUk: 'Помітьте контраст.' },
      ],
      proTipUk: 'Діалог завжди починається з Present Perfect (запитання про досвід), а деталі уточнюються в Past Simple: "Have you ever been to Paris?" — "Yes, I went there last summer".',
    },
    exercises: [
      {
        id: 'b1-ppvs-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний час: Leonardo da Vinci ___ the Mona Lisa.',
        options: ['painted', 'has painted', 'was painted', 'had painted'],
        correctAnswer: 'painted',
        explanationUk: 'Да Вінчі жив у минулому, період його життя закінчився, тому Past Simple: painted.',
      },
    ],
  },

  // ==========================================
  // UNIT 2: ТРИВАЛІСТЬ ТА ПЕРЕДМИНУЛИЙ ЧАС
  // ==========================================
  {
    id: 'b1-present-perfect-continuous',
    level: 'B1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Тривалість та минулий час',
    unitTitleEn: 'Unit 2: Continuity & Past Sequences',
    lessonNumber: 5,
    estimatedMinutes: 10,
    titleEn: 'Present Perfect Continuous — Duration of Actions',
    titleUk: 'Present Perfect Continuous — Тривалість дії (have been doing)',
    descriptionUk: 'Як підкреслити сам процес: "Я чекаю на тебе вже дві години!", "Чому твої руки брудні? — Я ремонтував авто".',
    iconName: 'Clock',
    order: 5,
    notes: {
      title: 'Present Perfect Continuous (have/has been + V-ing)',
      summaryUk: 'Цей час використовується: 1) Щоб підкреслити ТРИВАЛІСТЬ процесу, який триває досі (I have been waiting for two hours); 2) Коли дія щойно закінчилася, і ми бачимо її прямий фізичний слід (He is tired because he has been running).',
      formula: 'have / has + BEEN + V-ING',
      explanationSections: [
        {
          heading: 'Ствердження та приклади',
          contentUk: 'Приклади вживання:',
          examples: [
            { en: 'I have been learning English for three months.', uk: 'Я вчу англійську вже три місяці (процес триває).' },
            { en: 'It has been raining all morning.', uk: 'Дощ ішов увесь ранок (земля мокра).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I am knowing him for years.', right: 'I have known him for years.', reasonUk: 'Дієслова стану (know, like, have) вживаються в Present Perfect Simple, а не Continuous!' },
      ],
      vocabulary: [
        { word: 'tired', transcription: '/ˈtaɪəd/', translationUk: 'втомлений', exampleEn: 'I have been working.', exampleUk: 'Я працював (і втомився).' },
      ],
      proTipUk: 'Запитання: "What have you been doing?" — чудовий спосіб запитати "Чим ти займався останнім часом?".',
    },
    exercises: [
      {
        id: 'b1-ppc-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: Your eyes are red. ___ you been crying?',
        options: ['Have', 'Has', 'Are', 'Did'],
        correctAnswer: 'Have',
        explanationUk: 'Для you в Present Perfect Continuous допоміжне дієслово — Have.',
      },
    ],
  },
  {
    id: 'b1-past-perfect',
    level: 'B1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Тривалість та минулий час',
    unitTitleEn: 'Unit 2: Continuity & Past Sequences',
    lessonNumber: 6,
    estimatedMinutes: 10,
    titleEn: 'Past Perfect — Action Before Another Past Action',
    titleUk: 'Past Perfect — Передминулий час (had + V3)',
    descriptionUk: 'Дія, яка сталася РАНІШЕ за іншу подію в минулому: "Коли я прийшов на вокзал, потяг ВЖЕ поїхав".',
    iconName: 'History',
    order: 6,
    notes: {
      title: 'Past Perfect: Подія перед подією (Had + V3)',
      summaryUk: 'Past Perfect називають "передминулим" часом. Він потрібен, коли в минулому відбулися дві дії, і нам треба чітко показати, яка з них сталася ПЕРШОЮ. Та дія, що була першою — це Past Perfect (had + V3). Та, що другою — Past Simple.',
      formula: 'HAD + V3 (однаково для всіх осіб)',
      explanationSections: [
        {
          heading: 'Хронологія двох подій',
          contentUk: 'Подія 1 (раніше): Потяг поїхав (had left). Подія 2 (пізніше): Я прибув на вокзал (arrived):',
          examples: [
            { en: 'When I arrived at the station, the train had already left.', uk: 'Коли я прибув на вокзал, потяг уже поїхав.' },
            { en: 'She had finished her dinner before he came.', uk: 'Вона закінчила вечерю до того, як він прийшов.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'When I arrived, the train left.', right: 'When I arrived, the train had left.', reasonUk: 'Щоб показати, що потяг пішов ДО мого приходу, потрібен Past Perfect.' },
      ],
      vocabulary: [
        { word: 'already', transcription: '/ɔːlˈredi/', translationUk: 'вже', exampleEn: 'Had already started.', exampleUk: 'Вже почалося.' },
        { word: 'before', transcription: '/bɪˈfɔː(r)/', translationUk: 'до того як', exampleEn: 'Before I arrived.', exampleUk: 'До того як я прибув.' },
      ],
      proTipUk: 'Past Perfect рідко вживається сам по собі — йому завжди потрібна "друга подія" в минулому для порівняння.',
    },
    exercises: [
      {
        id: 'b1-pap-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: When we got to the cinema, the film ___ already started.',
        options: ['had', 'has', 'was', 'did'],
        correctAnswer: 'had',
        explanationUk: 'Фільм почався раніше, ніж ми дійшли до кінотеатру -> Past Perfect: had started.',
      },
    ],
  },
  {
    id: 'b1-narrative-tenses',
    level: 'B1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Тривалість та минулий час',
    unitTitleEn: 'Unit 2: Continuity & Past Sequences',
    lessonNumber: 7,
    estimatedMinutes: 10,
    titleEn: 'Narrative Tenses: Storytelling Masterclass',
    titleUk: 'Звʼязні розповіді історій: Поєднання Past Simple, Continuous & Perfect',
    descriptionUk: 'Як розповідати захоплюючі історії англійською мовою, легко комбінуючи три минулі часи в одному контексті.',
    iconName: 'BookOpen',
    order: 7,
    notes: {
      title: 'Майстерність сторітелінгу (Narrative Tenses)',
      summaryUk: 'Гарна історія складається з трьох елементів: 1) Головні послідовні події (Past Simple); 2) Опис фонової атмосфери (Past Continuous); 3) Передісторія та причини того, що сталося (Past Perfect).',
      formula: 'Фон (was doing) + Головна дія (did) + Передісторія (had done)',
      explanationSections: [
        {
          heading: 'Приклад живої розповіді',
          contentUk: 'Зверніть увагу на зміну часів:',
          examples: [
            { en: 'It was raining heavily (Continuous = фон). Suddenly, the car broke down (Simple = головна подія). The driver realised that he had forgotten to fill the tank (Perfect = передісторія/причина).', uk: 'Йшов сильний дощ. Раптом машина зламалася. Водій зрозумів, що забув заправити бак.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Telling whole story in one tense.', right: 'Using Continuous for background and Perfect for causes.', reasonUk: 'Використання трьох часів робить вашу мову природною та живою.' },
      ],
      vocabulary: [
        { word: 'suddenly', transcription: '/ˈsʌdənli/', translationUk: 'раптом', exampleEn: 'Suddenly the door opened.', exampleUk: 'Раптом двері відчинилися.' },
        { word: 'realise', transcription: '/ˈrɪəlaɪz/', translationUk: 'усвідомлювати', exampleEn: 'He realised his mistake.', exampleUk: 'Він усвідомив помилку.' },
      ],
      proTipUk: 'Слова-звʼязки для історій: At first, suddenly, meanwhile, in the end, as soon as.',
    },
    exercises: [
      {
        id: 'b1-nt-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: While the birds ___ in the garden, the bell rang.',
        options: ['were singing', 'sang', 'had sung', 'have sung'],
        correctAnswer: 'were singing',
        explanationUk: 'Фонова дія в момент дзвінка — Past Continuous: were singing.',
      },
    ],
  },
  {
    id: 'b1-defining-relative-clauses',
    level: 'B1',
    unitNumber: 2,
    unitTitleUk: 'Блок 2: Тривалість та минулий час',
    unitTitleEn: 'Unit 2: Continuity & Past Sequences',
    lessonNumber: 8,
    estimatedMinutes: 10,
    titleEn: 'Defining Relative Clauses: Who, Which, That, Where',
    titleUk: 'Означальні підрядні речення: Who, Which, That, Where',
    descriptionUk: 'Як обʼєднати два речення в одне елегантне: "Це людина, яка мені допомогла", "Це книга, яку я шукав".',
    iconName: 'Compass',
    order: 8,
    notes: {
      title: 'Підрядні речення (Relative Clauses): Who, Which, That, Where',
      summaryUk: 'Замість двох простих речень ("I met a woman. She speaks 5 languages"), ми обʼєднуємо їх за допомогою слів: WHO (для людей), WHICH (для речей/тварин), THAT (універсальне для людей і речей), WHERE (для місць).',
      formula: 'Людина + WHO/THAT | Предмет + WHICH/THAT | Місце + WHERE',
      explanationSections: [
        {
          heading: 'Таблиця вибору сполучного слова',
          contentUk: 'Приклади:',
          examples: [
            { en: 'A doctor is a person WHO treats sick people.', uk: 'Лікар — це людина, яка лікує хворих людей.' },
            { en: 'This is the laptop WHICH I bought yesterday.', uk: 'Це ноутбук, який я купив учора.' },
            { en: 'That is the hotel WHERE we stayed in Rome.', uk: 'Той готель, де ми зупинялися в Римі.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'The man which helped me.', right: 'The man who helped me.', reasonUk: 'Для людей вживаємо WHO або THAT (не which!).' },
      ],
      vocabulary: [
        { word: 'treat', transcription: '/triːt/', translationUk: 'лікувати, ставитися', exampleEn: 'Treat people with respect.', exampleUk: 'Ставтеся до людей з повагою.' },
      ],
      proTipUk: 'Якщо після who/which/that іде новий підмет, слово можна взагалі опустити: "The book (which) I read" = "The book I read".',
    },
    exercises: [
      {
        id: 'b1-drc-1',
        type: 'multiple_choice',
        question: 'Оберіть займенник: I like people ___ have a good sense of humor.',
        options: ['who', 'which', 'where', 'whose'],
        correctAnswer: 'who',
        explanationUk: 'Для людей використовуємо who.',
      },
    ],
  },

  // ==========================================
  // UNIT 3: ГІПОТЕЗИ, УМОВИ ТА ПАСИВ
  // ==========================================
  {
    id: 'b1-second-conditional',
    level: 'B1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Гіпотези та пасив',
    unitTitleEn: 'Unit 3: Hypotheses & Passive Voice',
    lessonNumber: 9,
    estimatedMinutes: 10,
    titleEn: 'Second Conditional — Imaginary Situations & Dreams',
    titleUk: 'Second Conditional — Нереальні мрії та гіпотези (If I had money...)',
    descriptionUk: 'Як помріяти: "Якби я виграв мільйон доларів...", "Якби я був на твоєму місці (If I were you)".',
    iconName: 'Sparkles',
    order: 9,
    notes: {
      title: 'Second Conditional: Нереальне теперішнє та мрії',
      summaryUk: 'Second Conditional використовується для нереальних, уявних або малоймовірних ситуацій у теперішньому чи майбутньому. У частині з IF вживається Past Simple, а в головній частині — WOULD + дієслово.',
      formula: 'IF + Past Simple, WOULD + V1',
      explanationSections: [
        {
          heading: 'Спеціальна форма "If I were you"',
          contentUk: 'У formal англійській з дієсловом to be для всіх осіб вживається WERE (хоча в розмовній мові зустрічається was):',
          examples: [
            { en: 'If I won the lottery, I would travel the world.', uk: 'Якби я виграв у лотерею (малоймовірно), я б подорожував світом.' },
            { en: 'If I were you, I would accept this job offer.', uk: 'Якби я був на твоєму місці, я б прийняв цю пропозицію.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'If I would have money, I would buy.', right: 'If I had money, I would buy.', reasonUk: 'У частині з IF слово WOULD заборонене!' },
      ],
      vocabulary: [
        { word: 'accept', transcription: '/əkˈsept/', translationUk: 'приймати', exampleEn: 'Accept an offer.', exampleUk: 'Прийняти пропозицію.' },
        { word: 'lottery', transcription: '/ˈlɒtəri/', translationUk: 'лотерея', exampleEn: 'Win the lottery.', exampleUk: 'Виграти в лотерею.' },
      ],
      proTipUk: 'Фраза "If I were you, I would..." — найввічливіший спосіб дати пораду другові чи колезі.',
    },
    exercises: [
      {
        id: 'b1-sc-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: If I ___ more free time, I would learn Spanish.',
        options: ['had', 'have', 'would have', 'will have'],
        correctAnswer: 'had',
        explanationUk: 'У частині з IF в Second Conditional вживається Past Simple: had.',
      },
    ],
  },
  {
    id: 'b1-passive-voice-simple',
    level: 'B1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Гіпотези та пасив',
    unitTitleEn: 'Unit 3: Hypotheses & Passive Voice',
    lessonNumber: 10,
    estimatedMinutes: 10,
    titleEn: 'Passive Voice — Present & Past Simple',
    titleUk: 'Passive Voice — Пасивний стан (is made, was built)',
    descriptionUk: 'Коли важлива сама дія, а не виконавець: "iPhone виготовляють у Каліфорнії", "Цей міст збудували 100 років тому".',
    iconName: 'ShieldCheck',
    order: 10,
    notes: {
      title: 'Пасивний стан (Passive Voice) у Present та Past Simple',
      summaryUk: 'Пасивний стан використовується, коли обʼєкт дії важливіший за того, хто її виконав, або виконавець невідомий. Утворюється дієсловом TO BE (у потрібному часі) та третьою формою дієслова (V3).',
      formula: 'Present: am/is/are + V3 | Past: was/were + V3',
      explanationSections: [
        {
          heading: 'Як перетворити активне речення на пасивне',
          contentUk: 'Обʼєкт стає новим підметом:',
          examples: [
            { en: 'English is spoken all over the world.', uk: 'Англійською говорять у всьому світі (не важливо хто, важливий факт).' },
            { en: 'This cathedral was built in 1890.', uk: 'Цей собор збудували у 1890 році.' },
            { en: 'The novel was written BY George Orwell.', uk: 'Роман був написаний Джорджем Орвеллом (прийменник BY вказує автора).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'The bridge built in 1900.', right: 'The bridge was built in 1900.', reasonUk: 'Міст не сам себе збудував! Обовʼязкова форма was built.' },
      ],
      vocabulary: [
        { word: 'cathedral', transcription: '/kəˈθiːdrəl/', translationUk: 'собор', exampleEn: 'Ancient cathedral.', exampleUk: 'Старовинний собор.' },
        { word: 'build', transcription: '/bɪld/', translationUk: 'будувати', exampleEn: 'Build a bridge.', exampleUk: 'Будувати міст.' },
      ],
      proTipUk: 'Якщо потрібно вказати виконавця у пасивному стані — використовуйте прийменник BY: "created by Steve Jobs".',
    },
    exercises: [
      {
        id: 'b1-pv-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: Millions of cars ___ every year in this factory.',
        options: ['are produced', 'produce', 'is produced', 'produced'],
        correctAnswer: 'are produced',
        explanationUk: 'Cars — множина у теперішньому часі: are produced.',
      },
    ],
  },
  {
    id: 'b1-modal-deduction-present',
    level: 'B1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Гіпотези та пасив',
    unitTitleEn: 'Unit 3: Hypotheses & Passive Voice',
    lessonNumber: 11,
    estimatedMinutes: 10,
    titleEn: 'Modals of Deduction: Must, Might, Can\'t',
    titleUk: 'Модальні дієслова здогадки: Must, Might, Can\'t be true',
    descriptionUk: 'Як висловити впевненість чи сумнів: "Він, мабуть, спить (must be)", "Це точно неправда! (can\'t be)".',
    iconName: 'Zap',
    order: 11,
    notes: {
      title: 'Модальні дієслова логічної здогадки (Modals of Deduction)',
      summaryUk: 'Коли ми робимо висновок на основі фактів: MUST = 95% впевненість у ствердженні ("це точно так"). CAN\'T = 95% впевненість у неможливості ("цього не може бути!"). MIGHT / COULD = 50% вірогідність ("можливо так, а можливо ні").',
      formula: 'MUST (точно так) | MIGHT/COULD (можливо) | CAN\'T (неможливо)',
      explanationSections: [
        {
          heading: 'Шкала логічної впевненості',
          contentUk: 'Приклади здогадок у теперішньому часі:',
          examples: [
            { en: 'He has three Ferraris. He MUST be rich.', uk: 'У нього три феррарі. Він точно багатий (залізна логіка).' },
            { en: 'It CAN\'T be true! I don\'t believe it.', uk: 'Це не може бути правдою! Я не вірю.' },
            { en: 'Take an umbrella, it MIGHT rain later.', uk: 'Візьми парасольку, пізніше може піти дощ (50/50).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'It mustn\'t be true (коли маємо на увазі "цього не може бути").', right: 'It can\'t be true.', reasonUk: 'Для неможливості в англійській вживається CAN\'T, а не mustn\'t!' },
      ],
      vocabulary: [
        { word: 'deduction', transcription: '/dɪˈdʌkʃn/', translationUk: 'дедукція, логічний висновок', exampleEn: 'Logical deduction.', exampleUk: 'Логічний висновок.' },
      ],
      proTipUk: 'Ніколи не кажіть "mustn\'t be", коли хочете сказати "не може бути". Завжди використовуйте "can\'t be"!',
    },
    exercises: [
      {
        id: 'b1-md-1',
        type: 'multiple_choice',
        question: 'Оберіть модальне дієслово: The lights are off and no one answers the door. They ___ be home.',
        options: ["can't", "mustn't", 'might not to', 'couldn\'t to'],
        correctAnswer: "can't",
        explanationUk: 'Світло вимкнено, дверей не відчиняють — їх точно немає вдома (can\'t be).',
      },
    ],
  },
  {
    id: 'b1-too-enough',
    level: 'B1',
    unitNumber: 3,
    unitTitleUk: 'Блок 3: Гіпотези та пасив',
    unitTitleEn: 'Unit 3: Hypotheses & Passive Voice',
    lessonNumber: 12,
    estimatedMinutes: 10,
    titleEn: 'Too vs Enough: Degrees & Modifiers',
    titleUk: 'Конструкції Too та Enough (too late, strong enough)',
    descriptionUk: 'Як описати надлишок чи нестачу: "Це занадто дорого", "Він недостатньо дорослий, щоб водити авто". Позиція слова enough.',
    iconName: 'Compass',
    order: 12,
    notes: {
      title: 'Конструкції TOO та ENOUGH',
      summaryUk: 'TOO означає надлишок з негативним відтінком ("занадто"). Ставиться ПЕРЕД прикметником (too expensive). ENOUGH означає "достатньо" і ставиться ПІСЛЯ прикметника (warm enough), але ПЕРЕД іменником (enough money).',
      formula: 'TOO + прикметник | прикметник + ENOUGH | ENOUGH + іменник',
      explanationSections: [
        {
          heading: 'Позиція слів у реченні',
          contentUk: 'Порівняйте позиції:',
          examples: [
            { en: 'This coffee is too hot to drink.', uk: 'Ця кава занадто гаряча, щоб її пити.' },
            { en: 'He is strong enough to lift this box.', uk: 'Він достатньо сильний, щоб підняти цю коробку.' },
            { en: 'We don\'t have enough time.', uk: 'У нас недостатньо часу (перед іменником time).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Enough warm.', right: 'Warm enough.', reasonUk: 'З прикметниками слово enough ставиться ПІСЛЯ них!' },
      ],
      vocabulary: [
        { word: 'enough', transcription: '/ɪˈnʌf/', translationUk: 'достатньо', exampleEn: 'Good enough.', exampleUk: 'Достатньо добре.' },
      ],
      proTipUk: 'Слово enough вимовляється як [ɪˈnʌf], де літери gh звучать як звук [f].',
    },
    exercises: [
      {
        id: 'b1-te-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний порядок: Is your room ___ for you?',
        options: ['warm enough', 'enough warm', 'too much warm', 'warmly enough'],
        correctAnswer: 'warm enough',
        explanationUk: 'Enough ставиться після прикметника: warm enough.',
      },
    ],
  },

  // ==========================================
  // UNIT 4: ФРАЗОВІ ДІЄСЛОВА ТА РОЗМОВНІ ЗВОРОТИ
  // ==========================================
  {
    id: 'b1-phrasal-verbs-daily',
    level: 'B1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Фразові дієслова та розмовна вільність',
    unitTitleEn: 'Unit 4: Fluency & Phrasals',
    lessonNumber: 13,
    estimatedMinutes: 10,
    titleEn: 'Top Daily Phrasal Verbs',
    titleUk: 'Топ фразових дієслів на щодень: Give up, Look for, Turn on',
    descriptionUk: 'Секрет живої англійської мови: чому носії замість "search" кажуть "look for", а замість "quit" — "give up".',
    iconName: 'BookMarked',
    order: 13,
    notes: {
      title: 'Фразові дієслова (Phrasal Verbs) на щодень',
      summaryUk: 'Фразове дієслово — це дієслово + прийменник/прислівник, які разом створюють абсолютно нове ідіоматичне значення, не схоже на оригінальне дієслово.',
      formula: 'Дієслово + Прийменник = Нове значення',
      explanationSections: [
        {
          heading: 'Топ-10 незамінних фразових дієслів B1',
          contentUk: 'Ось найважливіші дієслова:',
          tableData: {
            headers: ['Фразове дієслово', 'Значення', 'Приклад'],
            rows: [
              ['give up', 'здаватися, кидати звичку', 'Never give up! / He gave up smoking.'],
              ['look for', 'шукати', 'I am looking for my keys.'],
              ['find out', 'зʼясовувати, дізнаватися', 'I need to find out the truth.'],
              ['get along with', 'ладнати з кимось', 'I get along well with my colleagues.'],
              ['turn on / off', 'вмикати / вимикати', 'Turn on the lights, please.'],
              ['carry on', 'продовжувати', 'Carry on with your work.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'I search my keys.', right: 'I am looking for my keys.', reasonUk: 'У розмовній мові шукати предмет — це look for.' },
      ],
      vocabulary: [
        { word: 'give up', transcription: '/ɡɪv ʌp/', translationUk: 'здаватися, кидати', exampleEn: 'Don\'t give up.', exampleUk: 'Не здавайся.' },
        { word: 'look for', transcription: '/lʊk fɔː(r)/', translationUk: 'шукати', exampleEn: 'Looking for a job.', exampleUk: 'Шукаю роботу.' },
      ],
      proTipUk: 'Вчіть фразові дієслова завжди в контексті цілих речень, а не окремими шматками.',
    },
    exercises: [
      {
        id: 'b1-pvb-1',
        type: 'multiple_choice',
        question: 'Оберіть фразове дієслово: "I am trying to ___ smoking."',
        options: ['give up', 'give in', 'give away', 'give out'],
        correctAnswer: 'give up',
        explanationUk: 'Кинути звичку — це give up.',
      },
    ],
  },
  {
    id: 'b1-reported-speech-intro',
    level: 'B1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Фразові дієслова та розмовна вільність',
    unitTitleEn: 'Unit 4: Fluency & Phrasals',
    lessonNumber: 14,
    estimatedMinutes: 10,
    titleEn: 'Reported Speech: Shifting Tenses',
    titleUk: 'Непряма мова — Як переказати чужі слова (Backshift)',
    descriptionUk: 'Як переказати діалог: "Він сказав, що втомився", "Вона відповіла, що не прийде". Правило кроку назад у часі.',
    iconName: 'History',
    order: 14,
    notes: {
      title: 'Непряма мова (Reported Speech): Зсув часів (Backshift)',
      summaryUk: 'Коли ми переказуємо слова іншої людини зі словами "He said that...", дієслова роблять один крок назад у минуле (Backshift): Present Simple стає Past Simple, will стає would, am/is/are стає was/were.',
      formula: 'Пряма мова -> Непряма мова: Present -> Past | Will -> Would',
      explanationSections: [
        {
          heading: 'Таблиця зсуву часів',
          contentUk: 'Приклади:',
          examples: [
            { en: 'Tom: "I am tired." -> Tom said that he WAS tired.', uk: 'Том: "Я втомлений" -> Том сказав, що він втомлений.' },
            { en: 'Anna: "I will call you." -> Anna said that she WOULD call me.', uk: 'Анна: "Я зателефоную" -> Анна сказала, що зателефонує.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'He said me that.', right: 'He told me that. / He said that.', reasonUk: 'Say не вживається з займенником без to. Вживайте TOLD ME або SAID THAT.' },
      ],
      vocabulary: [
        { word: 'report', transcription: '/rɪˈpɔːt/', translationUk: 'повідомляти', exampleEn: 'Report the news.', exampleUk: 'Повідомляти новини.' },
      ],
      proTipUk: 'Запамʼятайте різницю: SAY SOMETHING, але TELL SOMEONE SOMETHING.',
    },
    exercises: [
      {
        id: 'b1-rs-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: John: "I live in Kyiv." -> John said that he ___ in Kyiv.',
        options: ['lived', 'lives', 'is living', 'will live'],
        correctAnswer: 'lived',
        explanationUk: 'У непрямій мові Present Simple робить крок назад у Past Simple: lived.',
      },
    ],
  },
  {
    id: 'b1-question-tags',
    level: 'B1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Фразові дієслова та розмовна вільність',
    unitTitleEn: 'Unit 4: Fluency & Phrasals',
    lessonNumber: 15,
    estimatedMinutes: 10,
    titleEn: 'Question Tags: Aren\'t You? Didn\'t He?',
    titleUk: 'Розділові запитання: Isn\'t it? Aren\'t you? Didn\'t he?',
    descriptionUk: 'Як запитати "Чи не так?": британський хвостик запитань для підтримки живої бесіди.',
    iconName: 'HelpCircle',
    order: 15,
    notes: {
      title: 'Розділові запитання (Question Tags)',
      summaryUk: 'Question Tags використовуються для підтвердження інформації ("Гарна погода, чи не так?"). Правило протилежності: якщо перша частина ствердна, хвостик заперечний. Якщо перша заперечна — хвостик ствердний.',
      formula: 'Ствердження (+), заперечний хвостик (-) | Заперечення (-), ствердний хвостик (+)',
      explanationSections: [
        {
          heading: 'Приклади розділових запитань',
          contentUk: 'Хвостик будується за допомогою допоміжного дієслова:',
          examples: [
            { en: 'You are from Ukraine, aren\'t you?', uk: 'Ти з України, чи не так?' },
            { en: 'He doesn\'t smoke, does he?', uk: 'Він не курить, правда?' },
            { en: 'You saw that movie, didn\'t you?', uk: 'Ти бачив той фільм, чи не так?' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'You are ready, yes?', right: 'You are ready, aren\'t you?', reasonUk: 'В англійській замість "yes?" чи "no?" вживаються повноцінні question tags.' },
      ],
      vocabulary: [
        { word: 'confirm', transcription: '/kənˈfɜːm/', translationUk: 'підтверджувати', exampleEn: 'Confirm information.', exampleUk: 'Підтвердити інформацію.' },
      ],
      proTipUk: 'Виняток: для "I am" хвостик завжди "aren\'t I?": "I am right, aren\'t I?".',
    },
    exercises: [
      {
        id: 'b1-qt-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний хвостик: "Sarah works at a bank, ___?"',
        options: ["doesn't she", "isn't she", "don't she", "does she"],
        correctAnswer: "doesn't she",
        explanationUk: 'Ствердження в Present Simple з Sarah -> заперечний хвостик doesn\'t she.',
      },
    ],
  },
  {
    id: 'b1-mastery',
    level: 'B1',
    unitNumber: 4,
    unitTitleUk: 'Блок 4: Фразові дієслова та розмовна вільність',
    unitTitleEn: 'Unit 4: Fluency & Phrasals',
    lessonNumber: 16,
    estimatedMinutes: 12,
    titleEn: 'Level B1 Review & Fluency Checkpoint',
    titleUk: 'Підсумковий практикум рівня B1: Вільне спілкування',
    descriptionUk: 'Закріплення всіх граматичних систем середнього рівня перед переходом до Upper-Intermediate (B2).',
    iconName: 'Crown',
    order: 16,
    notes: {
      title: 'Фініш рівня B1: Ви — незалежний користувач мови!',
      summaryUk: 'Рівень B1 — це переломний момент у вивченні англійської. Тепер ви можете вільно висловлювати думки, ділитися досвідом у Present Perfect, будувати гіпотези в Second Conditional та легко розуміти англійську мову на слух.',
      explanationSections: [
        {
          heading: 'Що далі на рівні B2?',
          contentUk: 'На рівні B2 на вас чекають: пасивний стан у всіх складних часах, Mixed Conditionals, непрямі питання, ідіоми та професійна ділова англійська.',
        },
      ],
      commonMistakes: [
        { wrong: 'Stopping practice after B1.', right: 'Transitioning directly to B2 to cement fluency.', reasonUk: 'Регулярність — ключ до вільного володіння.' },
      ],
      vocabulary: [
        { word: 'fluency', transcription: '/ˈfluːənsi/', translationUk: 'вільне володіння', exampleEn: 'Achieve fluency.', exampleUk: 'Досягти вільного володіння.' },
      ],
      proTipUk: 'Вітаємо з досягненням рівня B1! Пройдіть фінальні тести та переходьте до рівня B2.',
    },
    exercises: [
      {
        id: 'b1-mst-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: If I had more time, I ___ travel more often.',
        options: ['would', 'will', 'had', 'am'],
        correctAnswer: 'would',
        explanationUk: 'Second Conditional вимагає would у головній частині.',
      },
    ],
  },
];
