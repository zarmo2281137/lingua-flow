import { LevelCode, LevelInfo, Topic } from '@/types/course';
import { getTopicExercises } from './topicExercises';

export const LEVELS_CONFIG: Record<LevelCode, LevelInfo> = {
  A1: {
    code: 'A1',
    nameEn: 'Beginner',
    nameUk: 'Початковий рівень',
    badge: '🌱 Старт з нуля',
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
    descriptionUk: 'Базова граматика, знайомство, замовлення кави та прості щоденні фрази.',
    targetSkillsUk: ['Дієслово to be', 'Present Simple', 'Артиклі a/an/the', 'There is / are', 'Щоденна рутина'],
  },
  A2: {
    code: 'A2',
    nameEn: 'Elementary',
    nameUk: 'Базовий побутовий',
    badge: '🌿 Впевнений початок',
    color: 'from-blue-500 to-cyan-600',
    bgGradient: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
    descriptionUk: 'Минулий і майбутній час, подорожі, розповідь про свій день та плани.',
    targetSkillsUk: ['Past Simple', 'Past Continuous', 'Future (will vs going to)', 'Модальні дієслова', 'Ступені порівняння'],
  },
  B1: {
    code: 'B1',
    nameEn: 'Intermediate',
    nameUk: 'Середній розмовний',
    badge: '🚀 Вільне спілкування',
    color: 'from-indigo-500 to-purple-600',
    bgGradient: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800',
    descriptionUk: 'Present Perfect, умовні речення, перегляд фільмів із субтитрами, робоче листування.',
    targetSkillsUk: ['Present Perfect vs Past Simple', 'Conditionals 1 & 2', 'Фразові дієслова', 'Relative Clauses', 'Modals of Deduction'],
  },
  B2: {
    code: 'B2',
    nameEn: 'Upper-Intermediate',
    nameUk: 'Вище середнього',
    badge: '⚡ Професійний рівень',
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
    descriptionUk: 'Пасивний стан, складна аргументація, ідіоми, вільна участь у дебатах та співбесідах.',
    targetSkillsUk: ['Passive Voice', 'Reported Speech', 'Mixed Conditionals', 'Герундій чи інфінітив', 'Ідіоми'],
  },
  C1: {
    code: 'C1',
    nameEn: 'Advanced',
    nameUk: 'Просунутий експерт',
    badge: '👑 Рівень майстра',
    color: 'from-rose-500 to-pink-600',
    bgGradient: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800',
    descriptionUk: 'Інверсія, тонкі нюанси стилістики, сорбінг рідкісних виразів, академічне мовлення.',
    targetSkillsUk: ['Inversion & Negative Adverbials', 'Cleft Sentences', 'Subjunctive Mood', 'Participle Clauses', 'Дипломатичний регістр'],
  },
};

export const TOPICS: Topic[] = [
  // ==========================================
  // LEVEL A1
  // ==========================================
  {
    id: 'a1-to-be',
    level: 'A1',
    titleEn: 'Verb "To Be" — The Foundation',
    titleUk: 'Дієслово "To Be" — Головна цеглина англійської',
    descriptionUk: 'Як сказати "Я є лікар", "Вона вдома", "Ми щасливі" без помилок.',
    iconName: 'Sparkles',
    order: 1,
    notes: {
      title: 'Дієслово "To Be" (бути, існувати, знаходитися)',
      summaryUk: 'В українській мові ми кажемо "Я вдома" або "Він студент", опускаючи слово "є". В англійській мові речення без дієслова — груба помилка! "To be" — це обовʼязковий місток між підметом та його ознакою.',
      formula: 'I + AM | He/She/It + IS | You/We/They + ARE',
      explanationSections: [
        {
          heading: 'Три форми в теперішньому часі (Present)',
          contentUk: 'Залежно від особи, дієслово "to be" перевдягається у три форми:',
          tableData: {
            headers: ['Особа', 'Форма', 'Скорочення', 'Приклад'],
            rows: [
              ['I (Я)', 'am', "I'm", "I am ready. (Я готовий)"],
              ['He / She / It', 'is', "He's / She's / It's", "She is a doctor. (Вона лікар)"],
              ['You / We / They', 'are', "You're / We're / They're", "They are in Kyiv. (Вони в Києві)"],
            ],
          },
        },
        {
          heading: 'Питання та заперечення',
          contentUk: 'Для заперечення ставимо NOT після am/is/are. Для запитання — виносимо дієслово на самий початок!',
          examples: [
            { en: 'I am not tired.', uk: 'Я не втомлений.' },
            { en: 'Are you from Ukraine?', uk: 'Ти з України? (Are на першому місці)' },
            { en: 'Is she ready?', uk: 'Вона готова?' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I student.', right: 'I am a student.', reasonUk: 'В англійській речення завжди вимагає дієслова-звʼязки AM!' },
        { wrong: 'She are smart.', right: 'She is smart.', reasonUk: 'З he/she/it завжди вживається IS.' },
      ],
      vocabulary: [
        { word: 'Ready', transcription: '[ˈrɛdi]', translationUk: 'Готовий', exampleEn: 'I am ready to learn.', exampleUk: 'Я готовий вчитися.' },
        { word: 'Busy', transcription: '[ˈbɪzi]', translationUk: 'Зайнятий', exampleEn: 'She is very busy today.', exampleUk: 'Вона дуже зайнята сьогодні.' },
        { word: 'Tired', transcription: '[ˈtaɪəd]', translationUk: 'Втомлений', exampleEn: 'We are tired after work.', exampleUk: 'Ми втомлені після роботи.' },
        { word: 'Happy', transcription: '[ˈhæpi]', translationUk: 'Щасливий', exampleEn: 'They are very happy.', exampleUk: 'Вони дуже щасливі.' },
      ],
      proTipUk: 'Лайфхак: Якщо подумки можна вставити слово "є" ("Я [є] вдома", "Він [є] веселий") — в англійській обовʼязково ставимо to be!',
    },
    exercises: [
      {
        id: 'a1-tb-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму: She ___ my best friend.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 'is',
        explanationUk: 'Для третьої особи однини (she) форма дієслова — "is".',
      },
      {
        id: 'a1-tb-2',
        type: 'multiple_choice',
        question: 'Як правильно запитати: "Ти вільний сьогодні ввечері?"',
        options: ['You are free tonight?', 'Are you free tonight?', 'Is you free tonight?', 'Am you free tonight?'],
        correctAnswer: 'Are you free tonight?',
        explanationUk: 'У запитанні "Are" виноситься на перше місце перед підметом "you".',
      },
      {
        id: 'a1-tb-3',
        type: 'fill_blank',
        question: 'Вставте правильну форму to be: I ___ not hungry right now.',
        correctAnswer: 'am',
        explanationUk: 'З займенником "I" вживається форма "am".',
      },
      {
        id: 'a1-tb-4',
        type: 'sentence_builder',
        question: 'Складіть правильне речення зі слів:',
        options: ['We', 'in', 'are', 'Kyiv', 'now'],
        correctAnswer: ['We', 'are', 'in', 'Kyiv', 'now'],
        explanationUk: 'Прямий порядок слів: Підмет (We) + Дієслово (are) + Де (in Kyiv) + Коли (now).',
      },
      {
        id: 'a1-tb-5',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму для множини: The students ___ in the classroom.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'are',
        explanationUk: 'Слово "students" (студенти) — це множина (they), тому потрібна форма "are".',
      },
    ],
  },
  {
    id: 'a1-present-simple',
    level: 'A1',
    titleEn: 'Present Simple — Daily Habits',
    titleUk: 'Present Simple — Щоденні звички та факти',
    descriptionUk: 'Як розповідати про свій звичайний день, роботу та хобі.',
    iconName: 'Clock',
    order: 2,
    notes: {
      title: 'Present Simple (Простий теперішній час)',
      summaryUk: 'Вживається для регулярних дій, звичок, повторюваних подій (щодня, щовихідних) та загальновідомих законів природи.',
      formula: 'I/You/We/They + V1 | He/She/It + V1(-s / -es)',
      explanationSections: [
        {
          heading: 'Закінчення -s для he/she/it',
          contentUk: 'У стверджувальних реченнях до дієслова з he, she, it додається -s або -es:',
          examples: [
            { en: 'I drink coffee every morning.', uk: 'Я пʼю каву щоранку.' },
            { en: 'He drinks tea in the evening.', uk: 'Він пʼє чай увечері. (Додано -s)' },
          ],
        },
        {
          heading: 'Помічники Do та Does',
          contentUk: 'Для заперечення використовуємо don\'t або doesn\'t. Для запитання ставимо Do або Does наперед.',
          examples: [
            { en: "I don't like cold weather.", uk: 'Я не люблю холодну погоду.' },
            { en: "She doesn't eat meat.", uk: 'Вона не їсть мʼясо (does забрав закінчення -s).' },
            { en: 'Do you speak English?', uk: 'Ти розмовляєш англійською?' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'He live in London.', right: 'He lives in London.', reasonUk: 'Не забувайте додавати -s до дієслова з he/she/it!' },
        { wrong: "She doesn't likes coffee.", right: "She doesn't like coffee.", reasonUk: 'Помічник doesn\'t уже містить -s, тому в основному дієслові like закінчення зникає.' },
      ],
      vocabulary: [
        { word: 'Every day', transcription: '[ˈɛvri deɪ]', translationUk: 'Щодня', exampleEn: 'I wake up at 7 every day.', exampleUk: 'Я прокидаюся о 7 щодня.' },
        { word: 'Always', transcription: '[ˈɔːlweɪz]', translationUk: 'Завжди', exampleEn: 'He always helps me.', exampleUk: 'Він завжди допомагає мені.' },
        { word: 'Usually', transcription: '[ˈjuːʒuəli]', translationUk: 'Зазвичай', exampleEn: 'We usually cook dinner at home.', exampleUk: 'Ми зазвичай готуємо вечерю вдома.' },
      ],
      proTipUk: 'Слова-підказки: always, usually, often, sometimes, never. Вони ставляться перед основним дієсловом!',
    },
    exercises: [
      {
        id: 'a1-ps-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант: My brother ___ in an IT company.',
        options: ['work', 'works', 'working', 'is work'],
        correctAnswer: 'works',
        explanationUk: 'My brother = he, тому у Present Simple додаємо -s (works).',
      },
      {
        id: 'a1-ps-2',
        type: 'multiple_choice',
        question: 'Як правильно сказати: "Вона не пʼє каву"?',
        options: ['She not drink coffee.', "She doesn't drink coffee.", "She doesn't drinks coffee.", "She don't drink coffee."],
        correctAnswer: "She doesn't drink coffee.",
        explanationUk: 'Для he/she/it заперечення: doesn\'t + V1 (без -s).',
      },
      {
        id: 'a1-ps-3',
        type: 'sentence_builder',
        question: 'Складіть запитання:',
        options: ['Do', 'you', 'live', 'in', 'Kyiv', '?'],
        correctAnswer: ['Do', 'you', 'live', 'in', 'Kyiv', '?'],
        explanationUk: 'Запитання: Do + you + live + in Kyiv?',
      },
      {
        id: 'a1-ps-4',
        type: 'fill_blank',
        question: 'Вставте допоміжне дієслово заперечення: They ___ not play football on Mondays.',
        correctAnswer: 'do',
        explanationUk: 'Для "they" допоміжне дієслово — "do" (do not / don\'t).',
      },
    ],
  },
  {
    id: 'a1-articles',
    level: 'A1',
    titleEn: 'Articles: A, An, The & Zero Article',
    titleUk: 'Артиклі A, An, The: Як перестати їх боятися',
    descriptionUk: 'Коли ставити "a", коли "an", коли "the", а коли взагалі нічого.',
    iconName: 'Sparkles',
    order: 3,
    notes: {
      title: 'Артиклі в англійській мові (Articles)',
      summaryUk: 'В українській мові артиклів немає, тому для нас це незвично. Але суть проста: A/An означає "якийсь один із багатьох", а The означає "саме цей конкретний, про якого ми знаємо".',
      formula: 'A + приголосний звук | AN + голосний звук | THE + конкретний предмет',
      explanationSections: [
        {
          heading: 'Різниця між A та AN',
          contentUk: 'Ми орієнтуємося не на букву, а на ЗВУК: якщо слово починається з голосного звуку — ставимо AN (для милозвучності): an apple, an hour (h не читається).',
          examples: [
            { en: 'I have a car.', uk: 'У мене є машина (якась одна).' },
            { en: 'She is eating an apple.', uk: 'Вона їсть яблуко (звук [æ]).' },
            { en: 'Give me the red pen.', uk: 'Дай мені ту саму червону ручку (конкретну).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I saw a big dogs.', right: 'I saw big dogs.', reasonUk: 'A/An вживається ТІЛЬКИ в однині! З множиною a/an не ставиться.' },
        { wrong: 'She is doctor.', right: 'She is a doctor.', reasonUk: 'Перед професіями в однині обовʼязково ставиться артикль A/An.' },
      ],
      vocabulary: [
        { word: 'Apple', transcription: '[ˈæpl]', translationUk: 'Яблуко', exampleEn: 'An apple a day.', exampleUk: 'Одне яблуко на день.' },
        { word: 'Umbrella', transcription: '[ʌmˈbrɛlə]', translationUk: 'Парасоля', exampleEn: 'Take an umbrella.', exampleUk: 'Візьми парасолю.' },
      ],
      proTipUk: 'Золоте правило: Запитайте себе: я кажу про це вперше (якийсь один) чи співрозмовник уже точно знає, про що мова (той самий конкретний)?',
    },
    exercises: [
      {
        id: 'a1-art-1',
        type: 'multiple_choice',
        question: 'Оберіть артикль: He waited for ___ hour at the bus station.',
        options: ['a', 'an', 'the', '—'],
        correctAnswer: 'an',
        explanationUk: 'Слово "hour" починається з голосного звуку [aʊər] (літера h німа), тому ставимо "an".',
      },
      {
        id: 'a1-art-2',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант: My mother is ___ teacher.',
        options: ['a', 'an', 'the', '—'],
        correctAnswer: 'a',
        explanationUk: 'Перед назвами професій в однині ставимо "a" (teacher починається з приголосного [t]).',
      },
      {
        id: 'a1-art-3',
        type: 'fill_blank',
        question: 'Вставте артикль: I bought a book. ___ book was very interesting.',
        correctAnswer: 'The',
        explanationUk: 'Оскільки книга вже згадувалася в першому реченні, у другому вона стає конкретною — ставимо "The".',
      },
    ],
  },
  {
    id: 'a1-there-is-are',
    level: 'A1',
    titleEn: 'There is / There are & Location',
    titleUk: 'Конструкція There is / There are — Опис кімнати та міста',
    descriptionUk: 'Як сказати "На столі стоїть чашка" або "У місті є два парки".',
    iconName: 'Building2',
    order: 4,
    notes: {
      title: 'There is / There are (Там є / Знаходиться)',
      summaryUk: 'Коли ми починаємо речення не з людини чи предмета, а з МІСЦЯ, де щось знаходиться (наприклад: "У кімнаті є диван"), в англійській мові завжди вживається конструкція There is (для одного) або There are (для кількох).',
      formula: 'There is + однина | There are + множина',
      explanationSections: [
        {
          heading: 'Приклади вживання',
          contentUk: 'Зверніть увагу: переклад таких речень на українську ми завжди починаємо з кінця (з місця):',
          examples: [
            { en: 'There is a laptop on the desk.', uk: 'На робочому столі стоїть ноутбук.' },
            { en: 'There are many cafes in this street.', uk: 'На цій вулиці є багато кавʼярень.' },
            { en: 'Is there a pharmacy nearby?', uk: 'Чи є поблизу аптека? (Is винесли наперед)' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'In room have a table.', right: 'There is a table in the room.', reasonUk: 'Дієслово have означає "володіти". Для наявності предмета в просторі вживається тільки There is!' },
      ],
      vocabulary: [
        { word: 'Nearby', transcription: '[ˌnɪəˈbaɪ]', translationUk: 'Поблизу', exampleEn: 'Is there a park nearby?', exampleUk: 'Чи є поблизу парк?' },
        { word: 'Between', transcription: '[bɪˈtwiːn]', translationUk: 'Між', exampleEn: 'Between two buildings.', exampleUk: 'Між двома будинками.' },
      ],
      proTipUk: 'Шпаргалка: Якщо після There йде незлічуваний іменник (вода, сир, цукор, гроші) — завжди ставимо однину: There is some milk.',
    },
    exercises: [
      {
        id: 'a1-th-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: ___ three apples in the fridge.',
        options: ['There is', 'There are', 'There be', 'It is'],
        correctAnswer: 'There are',
        explanationUk: '"Three apples" — це множина, тому вживаємо "There are".',
      },
      {
        id: 'a1-th-2',
        type: 'sentence_builder',
        question: 'Складіть речення про кімнату:',
        options: ['There', 'is', 'a', 'lamp', 'on', 'the', 'table'],
        correctAnswer: ['There', 'is', 'a', 'lamp', 'on', 'the', 'table'],
        explanationUk: 'There is + a lamp + on the table.',
      },
      {
        id: 'a1-th-3',
        type: 'fill_blank',
        question: 'Вставте пропущене слово: There ___ some coffee in the cup.',
        correctAnswer: 'is',
        explanationUk: 'Coffee — незлічуваний іменник, тому використовується форма однини "is".',
      },
    ],
  },

  // ==========================================
  // LEVEL A2
  // ==========================================
  {
    id: 'a2-past-simple',
    level: 'A2',
    titleEn: 'Past Simple — Regular & Irregular Verbs',
    titleUk: 'Past Simple — Розповідаємо про минулі події',
    descriptionUk: 'Правильні дієслова з -ed та секрети неправильних дієслів.',
    iconName: 'History',
    order: 5,
    notes: {
      title: 'Past Simple (Минулий простий час)',
      summaryUk: 'Використовується для дій, які завершилися в минулому в конкретно вказаний час (вчора, торік, 5 хвилин тому).',
      formula: 'Subject + V2 (Regular: -ed / Irregular: 2-га колонка)',
      explanationSections: [
        {
          heading: 'Правильні та неправильні дієслова',
          contentUk: 'Більшість дієслів додають -ed: worked, watched. Неправильні дієслова повністю змінюють форму: go -> went, buy -> bought, have -> had.',
          examples: [
            { en: 'I watched a thrilling movie yesterday.', uk: 'Я дивився захопливий фільм учора.' },
            { en: 'We went to the beach last Sunday.', uk: 'Ми їздили на пляж минулої неділі.' },
          ],
        },
        {
          heading: 'Помічник DID для заперечень і питань',
          contentUk: 'DID приходить у запитаннях і запереченнях і забирає минулий час на себе — основне дієслово повертається в початкову форму!',
          examples: [
            { en: "I didn't buy that shirt.", uk: 'Я не купив ту сорочку (не didn\'t bought!).' },
            { en: 'Did you see that?', uk: 'Ти бачив це?' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: "I didn't went.", right: "I didn't go.", reasonUk: 'Після didn\'t дієслово завжди стоїть у початковій формі!' },
      ],
      vocabulary: [
        { word: 'Yesterday', transcription: '[ˈjɛstədeɪ]', translationUk: 'Вчора', exampleEn: 'I saw him yesterday.', exampleUk: 'Я бачив його вчора.' },
        { word: 'Ago', transcription: '[əˈɡəʊ]', translationUk: 'Тому', exampleEn: 'Two weeks ago.', exampleUk: 'Два тижні тому.' },
      ],
      proTipUk: 'Якщо в реченні є: yesterday, last year, ago, in 2018 — це 100% Past Simple.',
    },
    exercises: [
      {
        id: 'a2-ps-1',
        type: 'multiple_choice',
        question: 'Оберіть минулу форму buy: We ___ a new laptop yesterday.',
        options: ['buyed', 'bought', 'buys', 'was buy'],
        correctAnswer: 'bought',
        explanationUk: '"Buy" — неправильне дієслово (buy -> bought -> bought).',
      },
      {
        id: 'a2-ps-2',
        type: 'multiple_choice',
        question: 'Виправте помилку: "Did you saw the news?"',
        options: ['Did you see the news?', 'Did you seen the news?', 'Were you saw the news?', 'Did you sees the news?'],
        correctAnswer: 'Did you see the news?',
        explanationUk: 'Після допоміжного "Did" дієслово має бути у початковій формі (see).',
      },
      {
        id: 'a2-ps-3',
        type: 'fill_blank',
        question: 'Вставте допоміжне дієслово заперечення: She ___ not answer my call yesterday.',
        correctAnswer: 'did',
        explanationUk: 'У Past Simple заперечення утворюється за допомогою "did not".',
      },
    ],
  },
  {
    id: 'a2-past-continuous',
    level: 'A2',
    titleEn: 'Past Continuous vs Past Simple',
    titleUk: 'Past Continuous — Дія в процесі в минулому',
    descriptionUk: 'Як описати те, що тривало в певний момент: "Я читав книгу, коли задзвонив телефон".',
    iconName: 'Clock',
    order: 6,
    notes: {
      title: 'Past Continuous (Минулий тривалий час)',
      summaryUk: 'Показує процес у минулому (що робив тривалий час о 18:00 або коли сталася інша коротка подія).',
      formula: 'WAS / WERE + V-ing',
      explanationSections: [
        {
          heading: 'Поєднання Past Continuous та Past Simple через WHEN та WHILE',
          contentUk: 'Довга тривала дія (фон) передається через Past Continuous, а коротка дія, яка її перервала — через Past Simple.',
          examples: [
            { en: 'I was cooking dinner when the lights went out.', uk: 'Я готував вечерю (довга дія), коли згасло світло (коротка дія).' },
            { en: 'While she was working, he was watching TV.', uk: 'Поки вона працювала, він дивився телевізор (дві паралельні тривалі дії).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I was cook dinner.', right: 'I was cooking dinner.', reasonUk: 'Обовʼязково закінчення -ing після was/were!' },
      ],
      vocabulary: [
        { word: 'While', transcription: '[waɪl]', translationUk: 'Поки / в той час як', exampleEn: 'While I was studying.', exampleUk: 'Поки я вчився.' },
        { word: 'Suddenly', transcription: '[ˈsʌdənli]', translationUk: 'Раптом', exampleEn: 'Suddenly the door opened.', exampleUk: 'Раптом двері відчинилися.' },
      ],
      proTipUk: 'Шпаргалка: Якщо відповідь на питання "Що робив?" (тривалий процес) -> was/were + ing. Якщо "Що зробив?" (результат/факт) -> Past Simple.',
    },
    exercises: [
      {
        id: 'a2-pc-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний час: At 8 PM yesterday, I ___ my favorite TV show.',
        options: ['watched', 'was watching', 'am watching', 'have watched'],
        correctAnswer: 'was watching',
        explanationUk: 'Вказано точний момент тривання дії в минулому (at 8 PM yesterday), тому Past Continuous (was watching).',
      },
      {
        id: 'a2-pc-2',
        type: 'multiple_choice',
        question: 'Заповніть пропуск: We were walking in the park when it ___ to rain.',
        options: ['started', 'was starting', 'starts', 'has started'],
        correctAnswer: 'started',
        explanationUk: 'Коротка дія, що перервала тривалу прогулянку, передається через Past Simple (started).',
      },
      {
        id: 'a2-pc-3',
        type: 'fill_blank',
        question: 'Вставте допоміжне дієслово: They ___ sleeping when the alarm went off.',
        correctAnswer: 'were',
        explanationUk: 'Для "they" форма дієслова to be в минулому — "were".',
      },
    ],
  },
  {
    id: 'a2-future-plans',
    level: 'A2',
    titleEn: 'Future: Will vs Going To',
    titleUk: 'Майбутній час: Спонтанне Will чи заплановане Going To',
    descriptionUk: 'Як не плутати спонтанні обіцянки зі спланованими наперед намірами.',
    iconName: 'Sparkles',
    order: 7,
    notes: {
      title: 'Способи вираження майбутнього часу',
      summaryUk: 'В англійській мові для майбутнього є два головних інструменти: WILL — для спонтанних рішень, прийнятих прямо зараз ("О, я допоможу тобі!"), та BE GOING TO — для планів, які ви вже обдумали заздалегідь ("Я збираюся купити авто наступного місяця").',
      formula: 'Will + V1 (спонтанно) | am/is/are + going to + V1 (плани)',
      explanationSections: [
        {
          heading: 'Порівняння ситуацій',
          contentUk: 'Відчуйте різницю між моментальним поривом та наміром:',
          examples: [
            { en: 'The phone is ringing. — I will answer it!', uk: 'Телефон дзвонить. — Я відповім! (Спонтанне рішення прямо зараз)' },
            { en: "I'm going to travel to Spain this summer.", uk: 'Я збираюся поїхати до Іспанії цього літа (Заплановано).' },
            { en: 'Look at those dark clouds! It is going to rain.', uk: 'Поглянь на хмари! Піде дощ (Очевидний прогноз на основі фактів).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I will going to sleep.', right: 'I am going to sleep.', reasonUk: 'Формула: am/is/are + going to, слово will тут зайве!' },
      ],
      vocabulary: [
        { word: 'Promise', transcription: '[ˈprɒmɪs]', translationUk: 'Обіцяти', exampleEn: 'I promise I will call you.', exampleUk: 'Обіцяю, я зателефоную.' },
        { word: 'Intend', transcription: '[ɪnˈtɛnd]', translationUk: 'Мати намір', exampleEn: 'I intend to start tomorrow.', exampleUk: 'Я маю намір почати завтра.' },
      ],
      proTipUk: 'Обіцянки (I promise...), спонтанні пропозиції (I will help you) та субʼєктивні думки (I think he will win) — завжди з WILL!',
    },
    exercises: [
      {
        id: 'a2-fut-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: It is very hot here. — I ___ open the window.',
        options: ['will', 'am going to', 'am opening', 'opened'],
        correctAnswer: 'will',
        explanationUk: 'Спонтанне рішення, прийняте в момент розмови, виражається за допомогою "will".',
      },
      {
        id: 'a2-fut-2',
        type: 'multiple_choice',
        question: 'Заповніть пропуск для запланованої дії: We ___ visit our grandparents this Saturday.',
        options: ['are going to', 'will', 'going to', 'shall'],
        correctAnswer: 'are going to',
        explanationUk: 'Для заздалегідь запланованих намірів вживається конструкція "be going to" (are going to).',
      },
      {
        id: 'a2-fut-3',
        type: 'sentence_builder',
        question: 'Складіть речення про намір:',
        options: ['I', 'am', 'going', 'to', 'learn', 'English'],
        correctAnswer: ['I', 'am', 'going', 'to', 'learn', 'English'],
        explanationUk: 'I + am + going to + learn English.',
      },
    ],
  },

  // ==========================================
  // LEVEL B1
  // ==========================================
  {
    id: 'b1-present-perfect',
    level: 'B1',
    titleEn: 'Present Perfect vs Past Simple',
    titleUk: 'Present Perfect чи Past Simple: Вічна дилема вирішена',
    descriptionUk: 'Як зрозуміти різницю між "вчорашнім фактом" та "живим результатом зараз".',
    iconName: 'GitCommit',
    order: 8,
    notes: {
      title: 'Present Perfect (Теперішній доконаний час)',
      summaryUk: 'Головна біль усіх учнів! Але секрет дуже простий: якщо нам важливий РЕЗУЛЬТАТ прямо зараз або життєвий досвід (і точний час НЕ названо) — це Present Perfect. Якщо вказано конкретний час у минулому (вчора, о 3:00, торік) — це Past Simple.',
      formula: 'Subject + HAVE / HAS + V3 (ed / 3-тя колонка)',
      explanationSections: [
        {
          heading: 'Порівняння сенсу',
          contentUk: 'Одне й те саме речення звучить по-різному:',
          tableData: {
            headers: ['Час', 'Речення', 'Реальний сенс'],
            rows: [
              ['Past Simple', 'I lost my keys yesterday.', 'Факт у минулому. Можливо, я їх уже знайшов.'],
              ['Present Perfect', 'I have lost my keys!', 'РЕЗУЛЬТАТ ЗАРАЗ: Я стою перед зачиненими дверима прямо цієї секунди!'],
            ],
          },
        },
        {
          heading: 'Слова-маркери',
          contentUk: 'Already (вже), Yet (ще не / вже), Just (щойно), Ever (коли-небудь), Never (ніколи).',
          examples: [
            { en: 'Have you ever been to London?', uk: 'Ти коли-небудь бував у Лондоні?' },
            { en: "She hasn't received the email yet.", uk: 'Вона ще не отримала листа.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'I have seen him yesterday.', right: 'I saw him yesterday.', reasonUk: 'Зі словом yesterday ніколи не вживається Present Perfect!' },
      ],
      vocabulary: [
        { word: 'Already', transcription: '[ɔːlˈrɛdi]', translationUk: 'Вже', exampleEn: 'I have already finished.', exampleUk: 'Я вже закінчив.' },
        { word: 'Recently', transcription: '[ˈriːsntli]', translationUk: 'Нещодавно', exampleEn: 'I have seen him recently.', exampleUk: 'Я бачив його нещодавно.' },
      ],
      proTipUk: 'Є конкретний час (yesterday, in 2020, ago) -> Past Simple. Немає часу, але є результат зараз -> Present Perfect!',
    },
    exercises: [
      {
        id: 'b1-pp-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний час: Look! Someone ___ coffee on the carpet.',
        options: ['spilled', 'has spilled', 'spills', 'was spilling'],
        correctAnswer: 'has spilled',
        explanationUk: 'Слово "Look!" вказує на очевидний результат перед очима зараз — Present Perfect (has spilled).',
      },
      {
        id: 'b1-pp-2',
        type: 'multiple_choice',
        question: 'Чому речення "I have seen that movie yesterday" неправильне?',
        options: [
          'Тому що зі словом "yesterday" потрібен Past Simple (I saw)',
          'Тому що треба сказати "I seen"',
          'Тому що yesterday ставиться на початку',
          'Воно повністю правильне',
        ],
        correctAnswer: 'Тому що зі словом "yesterday" потрібен Past Simple (I saw)',
        explanationUk: 'З точними часовими маркерами минулого (yesterday, ago, last) вживається тільки Past Simple.',
      },
      {
        id: 'b1-pp-3',
        type: 'sentence_builder',
        question: 'Складіть запитання про досвід:',
        options: ['Have', 'you', 'ever', 'tried', 'sushi', '?'],
        correctAnswer: ['Have', 'you', 'ever', 'tried', 'sushi', '?'],
        explanationUk: 'Have you ever + V3 (tried) + sushi?',
      },
    ],
  },
  {
    id: 'b1-conditionals',
    level: 'B1',
    titleEn: 'First & Second Conditionals',
    titleUk: 'Умовні речення: Реальні та уявні умови',
    descriptionUk: 'Як сказати "Якщо піде дощ, я залишуся вдома" та "Якби я мав мільйон, я б подорожував".',
    iconName: 'Sparkles',
    order: 9,
    notes: {
      title: 'First & Second Conditionals (Умовні речення)',
      summaryUk: 'First Conditional — це реальне майбутнє ("Якщо я встигну, я зателефоную"). Second Conditional — це уявні мрії в теперішньому часі ("Якби я мав крила, я б полетів").',
      formula: '1st: If + Present Simple, WILL + V1 | 2nd: If + Past Simple, WOULD + V1',
      explanationSections: [
        {
          heading: 'Порівняння двох типів',
          contentUk: 'Зверніть увагу, що після IF ніколи не ставиться WILL чи WOULD:',
          examples: [
            { en: 'If it rains tomorrow, we will stay at home.', uk: 'Якщо завтра піде дощ, ми залишимося вдома (Реальний First Cond).' },
            { en: 'If I had more money, I would buy a sports car.', uk: 'Якби в мене було більше грошей зараз, я б купив спорткар (Мрія Second Cond).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'If it will rain, I will stay.', right: 'If it rains, I will stay.', reasonUk: 'У частині з IF майбутній час заборонений! Ставимо Present Simple.' },
      ],
      vocabulary: [
        { word: 'Unless', transcription: '[ənˈlɛs]', translationUk: 'Якщо не', exampleEn: 'Unless you hurry, we will be late.', exampleUk: 'Якщо ти не поквапишся, ми запізнимося.' },
      ],
      proTipUk: 'У Second Conditional з дієсловом to be для всіх осіб часто вживається форма WERE: If I were you (Якби я був на твоєму місці).',
    },
    exercises: [
      {
        id: 'b1-cond-1',
        type: 'multiple_choice',
        question: 'Оберіть форму: If she ___ hard, she will pass the exam.',
        options: ['studies', 'will study', 'studied', 'study'],
        correctAnswer: 'studies',
        explanationUk: 'У First Conditional у підрядній частині після IF вживається Present Simple (studies).',
      },
      {
        id: 'b1-cond-2',
        type: 'multiple_choice',
        question: 'Оберіть форму Second Conditional: If I ___ a bird, I would fly around the world.',
        options: ['were', 'am', 'will be', 'have been'],
        correctAnswer: 'were',
        explanationUk: 'У нереальній умові (Second Conditional) традиційно вживається форма "were" для всіх осіб.',
      },
      {
        id: 'b1-cond-3',
        type: 'fill_blank',
        question: 'Вставте допоміжне дієслово: If you won the lottery, what ___ you buy first?',
        correctAnswer: 'would',
        explanationUk: 'У головній частині Second Conditional використовується "would + V1".',
      },
    ],
  },
  {
    id: 'b1-phrasal-verbs',
    level: 'B1',
    titleEn: 'Essential Phrasal Verbs',
    titleUk: 'Топ фразових дієслів для природної мови',
    descriptionUk: 'Чому get along — це не "отримати вздовж", а "ладнати з людьми".',
    iconName: 'Sparkles',
    order: 10,
    notes: {
      title: 'Фразові дієслова (Phrasal Verbs)',
      summaryUk: 'Фразове дієслово — це дієслово + прийменник, які разом утворюють зовсім нове значення. Носії мови використовують їх у 80% повсякденних розмов!',
      formula: 'Verb + Preposition/Adverb = New Idiomatic Meaning',
      explanationSections: [
        {
          heading: 'Найважливіші фразові дієслова рівня B1',
          contentUk: 'Запамʼятайте ці конструкції як цілісні слова:',
          tableData: {
            headers: ['Фразове дієслово', 'Значення', 'Приклад'],
            rows: [
              ['Give up', 'Здаватися, кидати звичку', "Don't give up on your dreams."],
              ['Look forward to', 'З нетерпінням чекати', 'I look forward to hearing from you.'],
              ['Turn down', 'Зменшити гучність / відхилити', 'She turned down the job offer.'],
              ['Find out', 'Дізнатися, зʼясувати', 'I need to find out the truth.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'I look forward to see you.', right: 'I look forward to seeing you.', reasonUk: 'Після виразу look forward to завжди вживається форма з -ing!' },
      ],
      vocabulary: [
        { word: 'Give up', transcription: '[ɡɪv ʌp]', translationUk: 'Здаватися', exampleEn: 'Never give up.', exampleUk: 'Ніколи не здавайся.' },
        { word: 'Carry on', transcription: '[ˈkæri ɒn]', translationUk: 'Продовжувати', exampleEn: 'Carry on with your work.', exampleUk: 'Продовжуй свою роботу.' },
      ],
      proTipUk: 'Не намагайтеся перекладати прийменники дослівно — сприймайте фразове дієслово як єдине ціле слово!',
    },
    exercises: [
      {
        id: 'b1-pv-1',
        type: 'multiple_choice',
        question: 'Оберіть правильне дієслово: Could you please ___ down the music? It is too loud.',
        options: ['turn', 'make', 'put', 'drop'],
        correctAnswer: 'turn',
        explanationUk: '"Turn down" означає зменшити звук або інтенсивність.',
      },
      {
        id: 'b1-pv-2',
        type: 'multiple_choice',
        question: 'Заповніть пропуск: He decided to ___ smoking last year.',
        options: ['give up', 'give in', 'give away', 'give back'],
        correctAnswer: 'give up',
        explanationUk: '"Give up" означає відмовитися від звички або припинити робити щось.',
      },
      {
        id: 'b1-pv-3',
        type: 'fill_blank',
        question: 'Вставте правильний прийменник: I look forward ___ meeting your team.',
        correctAnswer: 'to',
        explanationUk: 'Стала конструкція: look forward to + V-ing.',
      },
    ],
  },

  // ==========================================
  // LEVEL B2
  // ==========================================
  {
    id: 'b2-passive-voice',
    level: 'B2',
    titleEn: 'Passive Voice in Professional English',
    titleUk: 'Пасивний стан (Passive Voice) у діловому спілкуванні',
    descriptionUk: 'Як звучати дипломатично, професійно та зміщувати фокус на результат.',
    iconName: 'ShieldCheck',
    order: 11,
    notes: {
      title: 'Пасивний стан (Passive Voice)',
      summaryUk: 'В активному стані важливий виконавець ("Ми запустили оновлення"). У пасивному стані фокус зміщується на результат ("Оновлення було успішно запущено"). Це золотий стандарт ділового листування та новин.',
      formula: 'Subject + TO BE (у потрібному часі) + V3 (Past Participle)',
      explanationSections: [
        {
          heading: 'Пасив у різних часах',
          contentUk: 'Ми змінюємо тільки дієслово to be, третя форма (V3) завжди лишається незмінною:',
          examples: [
            { en: 'The contract was signed yesterday.', uk: 'Контракт було підписано вчора (Past Simple Passive).' },
            { en: 'A new feature is being developed.', uk: 'Нова фіча зараз розробляється (Present Continuous Passive).' },
            { en: 'All tickets have been sold.', uk: 'Усі квитки вже продано (Present Perfect Passive).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'The project delivered on time.', right: 'The project was delivered on time.', reasonUk: 'Проєкт не міг здати себе сам! Потрібна форма to be (was delivered).' },
      ],
      vocabulary: [
        { word: 'Implement', transcription: '[ˈɪmplɪmɛnt]', translationUk: 'Впроваджувати', exampleEn: 'The changes were implemented.', exampleUk: 'Зміни було впроваджено.' },
        { word: 'Approve', transcription: '[əˈpruːv]', translationUk: 'Затверджувати', exampleEn: 'Budget was approved.', exampleUk: 'Бюджет затвердили.' },
      ],
      proTipUk: 'Дипломатичний лайфхак: Замість "You made a mistake" (звинувачення) скажіть "A mistake has been made" (дипломатично).',
    },
    exercises: [
      {
        id: 'b2-pv-1',
        type: 'multiple_choice',
        question: 'Перетворіть в Passive: "They built this bridge in 2020."',
        options: ['This bridge was built in 2020.', 'This bridge built in 2020.', 'This bridge has been built in 2020.', 'This bridge is built in 2020.'],
        correctAnswer: 'This bridge was built in 2020.',
        explanationUk: 'Минулий час: was + built.',
      },
      {
        id: 'b2-pv-2',
        type: 'fill_blank',
        question: 'Вставте допоміжне дієслово: The email has already ___ sent to the client.',
        correctAnswer: 'been',
        explanationUk: 'Формула Present Perfect Passive: has been + V3.',
      },
      {
        id: 'b2-pv-3',
        type: 'sentence_builder',
        question: 'Складіть пасивне речення:',
        options: ['The', 'software', 'is', 'being', 'tested', 'now'],
        correctAnswer: ['The', 'software', 'is', 'being', 'tested', 'now'],
        explanationUk: 'The software + is being tested + now.',
      },
    ],
  },
  {
    id: 'b2-reported-speech',
    level: 'B2',
    titleEn: 'Reported Speech & Backshift',
    titleUk: 'Непряма мова: Передаємо слова інших людей',
    descriptionUk: 'Як переказати чужі слова: правило кроку назад у часі (Backshift of Tenses).',
    iconName: 'MessageSquareQuote',
    order: 12,
    notes: {
      title: 'Непряма мова (Reported Speech)',
      summaryUk: 'Коли ми передаємо слова, сказані кимось у минулому ("Він сказав, що..."), в англійській мові спрацьовує правило кроку назад: Present стає Past, Past стає Past Perfect, will стає would.',
      formula: 'Direct: Present Simple -> Reported: Past Simple | will -> would | can -> could',
      explanationSections: [
        {
          heading: 'Таблиця кроку назад',
          contentUk: 'Як змінюються часи:',
          tableData: {
            headers: ['Пряма мова', 'Непряма мова'],
            rows: [
              ['"I am tired."', 'He said that he WAS tired.'],
              ['"I will help you."', 'She promised that she WOULD help me.'],
              ['"I bought a car."', 'He told me that he HAD BOUGHT a car.'],
            ],
          },
        },
      ],
      commonMistakes: [
        { wrong: 'He said me that he is busy.', right: 'He told me that he was busy.', reasonUk: 'Після said не ставиться займенник без to! Кажемо "He told me" або "He said that...".' },
      ],
      vocabulary: [
        { word: 'Admit', transcription: '[ədˈmɪt]', translationUk: 'Визнавати', exampleEn: 'He admitted that he had lied.', exampleUk: 'Він визнав, що збрехав.' },
        { word: 'Claim', transcription: '[kleɪm]', translationUk: 'Стверджувати', exampleEn: 'She claimed she was innocent.', exampleUk: 'Вона стверджувала, що невинна.' },
      ],
      proTipUk: 'Запамʼятайте різницю: SAY SOMETHING, але TELL SOMEBODY SOMETHING.',
    },
    exercises: [
      {
        id: 'b2-rs-1',
        type: 'multiple_choice',
        question: 'Перетворіть у непряму мову: "I will call you tomorrow." -> She said that she ___ me the next day.',
        options: ['would call', 'will call', 'called', 'had called'],
        correctAnswer: 'would call',
        explanationUk: 'За правилом кроку назад (backshift) "will" перетворюється на "would".',
      },
      {
        id: 'b2-rs-2',
        type: 'multiple_choice',
        question: 'Оберіть правильне дієслово: He ___ me that the meeting was postponed.',
        options: ['told', 'said', 'spoke', 'talked'],
        correctAnswer: 'told',
        explanationUk: 'З особою-адресатом (me) вживається "told" (told me), а не said.',
      },
      {
        id: 'b2-rs-3',
        type: 'fill_blank',
        question: 'Вставте форму минулого часу: "I live in Kyiv." -> He told us he ___ in Kyiv.',
        correctAnswer: 'lived',
        explanationUk: 'Present Simple (live) перетворюється на Past Simple (lived).',
      },
    ],
  },
  {
    id: 'b2-mixed-conditionals',
    level: 'B2',
    titleEn: 'Third & Mixed Conditionals',
    titleUk: 'Третій та змішані умовні: Жаль про минуле',
    descriptionUk: 'Як висловити жаль про зроблене в минулому та його вплив на сьогодення.',
    iconName: 'Sparkles',
    order: 13,
    notes: {
      title: 'Third & Mixed Conditionals',
      summaryUk: 'Third Conditional — це 100% минуле, яке вже не змінити ("Якби я вчора встав раніше, я б не запізнився на потяг"). Mixed Conditionals поєднують минулу причину з теперішнім наслідком ("Якби я вчора здав тест, я був би спокійний зараз").',
      formula: '3rd: If + Past Perfect, WOULD HAVE + V3 | Mixed: If + Past Perfect, WOULD + V1 (now)',
      explanationSections: [
        {
          heading: 'Приклади',
          contentUk: 'Відчуйте гру часових планів:',
          examples: [
            { en: 'If I had studied harder, I would have passed the exam.', uk: 'Якби я вчився старанніше тоді, я б склав той іспит (Third Conditional — все в минулому).' },
            { en: "If I hadn't missed the flight, I would be in London right now.", uk: 'Якби я не спізнився на літак вчора, я був би в Лондоні просто зараз (Mixed Conditional).' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'If I would have known...', right: 'If I had known...', reasonUk: 'У частині з IF ніколи не вживається WOULD HAVE!' },
      ],
      vocabulary: [
        { word: 'Regret', transcription: '[rɪˈɡrɛt]', translationUk: 'Шкодувати', exampleEn: 'I regret my decision.', exampleUk: 'Я шкодую про своє рішення.' },
      ],
      proTipUk: 'Формула Third Conditional — це класичний "синдром втраченої вигоди". Усе вже сталося, залишається лише аналізувати.',
    },
    exercises: [
      {
        id: 'b2-mc-1',
        type: 'multiple_choice',
        question: 'Оберіть форму Third Conditional: If we ___ earlier, we would have caught the train.',
        options: ['had left', 'left', 'would leave', 'have left'],
        correctAnswer: 'had left',
        explanationUk: 'У частині IF для Third Conditional ставиться Past Perfect (had left).',
      },
      {
        id: 'b2-mc-2',
        type: 'fill_blank',
        question: 'Вставте допоміжне дієслово: She would ___ answered your call if she had heard the phone.',
        correctAnswer: 'have',
        explanationUk: 'Формула головної частини Third Conditional: would have + V3.',
      },
    ],
  },

  // ==========================================
  // LEVEL C1
  // ==========================================
  {
    id: 'c1-inversion',
    level: 'C1',
    titleEn: 'Inversion & Emphatic Structures',
    titleUk: 'Інверсія та емфатичні конструкції',
    descriptionUk: 'Як говорити як дипломат, письменник чи топовий спікер на TED Talks.',
    iconName: 'Crown',
    order: 14,
    notes: {
      title: 'Інверсія в англійській мові (Inversion)',
      summaryUk: 'В англійській мові зазвичай прямий порядок слів. Але на рівні C1 для особливої сили висловлювання, драматизму чи урочистості ми виносимо заперечні або обмежувальні слова наперед, а порядок слів змінюємо на запитальний!',
      formula: 'Negative Word + Auxiliary Verb + Subject + Main Verb',
      explanationSections: [
        {
          heading: 'Слова, що викликають інверсію',
          contentUk: 'Seldom, Rarely, Never, Under no circumstances, Hardly ... when, Not only ... but also.',
          examples: [
            { en: 'Rarely have I witnessed such dedication.', uk: 'Рідко коли мені доводилося бачити таку відданість.' },
            { en: 'Under no circumstances should you press this button.', uk: 'За жодних обставин вам не слід натискати цю кнопку.' },
            { en: 'Not only did he complete the project, but he also exceeded all expectations.', uk: 'Він не лише завершив проєкт, а й перевершив усі очікування.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'Never I have heard that.', right: 'Never have I heard that.', reasonUk: 'Після Never на початку речення порядок слів змінюється на запитальний: have виноситься перед I!' },
      ],
      vocabulary: [
        { word: 'Seldom', transcription: '[ˈsɛldəm]', translationUk: 'Вкрай рідко', exampleEn: 'Seldom do we see this.', exampleUk: 'Рідко ми бачимо подібне.' },
        { word: 'Pivotal', transcription: '[ˈpɪvətl]', translationUk: 'Ключовий / переломний', exampleEn: 'A pivotal moment.', exampleUk: 'Переломний момент.' },
      ],
      proTipUk: 'Інверсія в діловій презентації миттєво підкреслює експертність: "Not only will this cut costs, but it will also double speed".',
    },
    exercises: [
      {
        id: 'c1-inv-1',
        type: 'multiple_choice',
        question: 'Оберіть правильний варіант інверсії: "___ so many brilliant minds in one room."',
        options: ['Rarely have I seen', 'Rarely I have seen', 'Rarely did I saw', 'Rarely I saw'],
        correctAnswer: 'Rarely have I seen',
        explanationUk: 'Після Rarely порядок слів інвертується: допоміжне дієслово (have) + підмет (I).',
      },
      {
        id: 'c1-inv-2',
        type: 'sentence_builder',
        question: 'Складіть C1 фразу з інверсією:',
        options: ['Never', 'have', 'I', 'felt', 'more', 'confident'],
        correctAnswer: ['Never', 'have', 'I', 'felt', 'more', 'confident'],
        explanationUk: 'Never + have + I + felt more confident.',
      },
    ],
  },
  {
    id: 'c1-cleft-sentences',
    level: 'C1',
    titleEn: 'Cleft Sentences & Focusing',
    titleUk: 'Розщеплені речення: Сфокусуйте увагу на головному',
    descriptionUk: 'Як за допомогою "What I really need is..." розставити потужні акценти в розмові.',
    iconName: 'Sparkles',
    order: 15,
    notes: {
      title: 'Cleft Sentences (Розщеплені речення)',
      summaryUk: 'Cleft sentences розщеплюють просте речення на дві частини за допомогою "What..." або "It is/was... that...", щоб сфокусувати увагу слухача на одній конкретній деталі.',
      formula: 'What + Subject + Verb + IS/WAS + Emphasis | It is/was + Emphasis + THAT + Rest',
      explanationSections: [
        {
          heading: 'Приклади порівняння',
          contentUk: 'Подивіться, як зростає виразність думки:',
          examples: [
            { en: 'I need a clear strategy. -> What I really need is a clear strategy.', uk: 'Те, що мені дійсно потрібно — це чітка стратегія.' },
            { en: 'His attitude annoyed me. -> It was his attitude that annoyed me the most.', uk: 'Саме його ставлення дратувало мене найбільше.' },
          ],
        },
      ],
      commonMistakes: [
        { wrong: 'What I want is go home.', right: 'What I want is to go home.', reasonUk: 'Не забувайте частку to перед інфінітивом у другій частині!' },
      ],
      vocabulary: [
        { word: 'Unprecedented', transcription: '[ʌnˈprɛsɪdɛntɪd]', translationUk: 'Безпрецедентний', exampleEn: 'Unprecedented challenge.', exampleUk: 'Безпрецедентний виклик.' },
      ],
      proTipUk: 'Використовуйте "What strikes me as crucial is..." у переговорах — це звучить максимально переконливо.',
    },
    exercises: [
      {
        id: 'c1-cl-1',
        type: 'multiple_choice',
        question: 'Оберіть правильну форму cleft sentence: "___ inspired the entire engineering department."',
        options: [
          'It was her leadership that',
          'What was her leadership that',
          'It had her leadership',
          'Her leadership what',
        ],
        correctAnswer: 'It was her leadership that',
        explanationUk: 'Конструкція фокусування: It was [обʼєкт фокусу] that [решта речення].',
      },
      {
        id: 'c1-cl-2',
        type: 'fill_blank',
        question: 'Вставте початкове слово: ___ surprised me the most was his total composure under pressure.',
        correctAnswer: 'What',
        explanationUk: 'Wh-cleft sentence починається зі слова "What" (Те, що здивувало мене...).',
      },
    ],
  },
];

// Ensure all 40 exercises per micro-topic are mapped
TOPICS.forEach((t) => {
  const loaded = getTopicExercises(t.id);
  if (loaded && loaded.length > 0) {
    t.exercises = loaded;
  }
});

