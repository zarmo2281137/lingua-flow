import { ListeningTrack } from '@/types/listening';

export const LISTENING_TRACKS: ListeningTrack[] = [
  {
    "id": "a1-listen-cafe",
    "level": "A1",
    "order": 1,
    "unitTitleUk": "Блок 1: Перші діалоги",
    "titleEn": "At the London Coffee Shop",
    "titleUk": "Замовлення в лондонській кавʼярні",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "1:45",
    "scenarioDescriptionUk": "Ранкова кавʼярня в районі Сохо в Лондоні. Відвідувач замовляє напій та випічку у привітного баристи.",
    "speakers": [
      {
        "name": "Barista (Oliver)",
        "roleUk": "Лондонський бариста"
      },
      {
        "name": "Customer (Anna)",
        "roleUk": "Клієнтка"
      }
    ],
    "dialogue": [
      {
        "speaker": "Oliver",
        "textEn": "Good morning! Welcome to Soho Brews. What can I get for you today?",
        "textUk": "Доброго ранку! Ласкаво просимо до Soho Brews. Що я можу вам запропонувати сьогодні?"
      },
      {
        "speaker": "Anna",
        "textEn": "Hi! Could I have a large cappuccino, please? With oat milk if possible.",
        "textUk": "Привіт! Чи можу я замовити великий капучино, будь ласка? З вівсяним молоком, якщо можливо."
      },
      {
        "speaker": "Oliver",
        "textEn": "Certainly! Large cappuccino with oat milk. Would you like any pastry with that? We have fresh butter croissants.",
        "textUk": "Звісно! Великий капучино з вівсяним молоком. Бажаєте випічку до нього? У нас є свіжі масляні круасани."
      },
      {
        "speaker": "Anna",
        "textEn": "Yes, one croissant, please. That smells wonderful.",
        "textUk": "Так, один круасан, будь ласка. Пахне чудово."
      },
      {
        "speaker": "Oliver",
        "textEn": "Splendid. That will be six pounds fifty in total. Are you paying by cash or card?",
        "textUk": "Чудово. Разом шість фунтів пʼятдесят. Ви платите готівкою чи карткою?"
      },
      {
        "speaker": "Anna",
        "textEn": "By card, please. Here is my contactless card.",
        "textUk": "Карткою, будь ласка. Ось моя безконтактна картка."
      },
      {
        "speaker": "Oliver",
        "textEn": "Perfect! The payment is approved. Please take a seat, and I will call your name when ready.",
        "textUk": "Чудово! Оплата пройшла. Будь ласка, сідайте, я покличу вас на імʼя, коли все буде готове."
      },
      {
        "speaker": "Anna",
        "textEn": "Thank you very much. Have a lovely morning!",
        "textUk": "Дуже дякую. Гарного вам ранку!"
      }
    ],
    "fullAudioText": "Good morning! Welcome to Soho Brews. What can I get for you today? Hi! Could I have a large cappuccino, please? With oat milk if possible. Certainly! Large cappuccino with oat milk. Would you like any pastry with that? We have fresh butter croissants. Yes, one croissant, please. That smells wonderful. Splendid. That will be six pounds fifty in total. Are you paying by cash or card? By card, please. Here is my contactless card. Perfect! The payment is approved. Please take a seat, and I will call your name when ready. Thank you very much. Have a lovely morning!",
    "vocabulary": [
      {
        "word": "cappuccino",
        "transcription": "/ˌkæp.əˈtʃiː.nəʊ/",
        "translationUk": "капучино",
        "contextSentence": "Could I have a large cappuccino, please?"
      },
      {
        "word": "oat milk",
        "transcription": "/əʊt mɪlk/",
        "translationUk": "вівсяне молоко",
        "contextSentence": "With oat milk if possible."
      },
      {
        "word": "pastry",
        "transcription": "/ˈpeɪ.stri/",
        "translationUk": "випічка",
        "contextSentence": "Would you like any pastry with that?"
      },
      {
        "word": "croissant",
        "transcription": "/ˈkwæs.ɒ̃/",
        "translationUk": "круасан",
        "contextSentence": "We have fresh butter croissants."
      },
      {
        "word": "in total",
        "transcription": "/ɪn ˈtəʊ.təl/",
        "translationUk": "загалом, разом",
        "contextSentence": "That will be six pounds fifty in total."
      }
    ],
    "exercises": [
      {
        "id": "a1-c-1",
        "type": "multiple_choice",
        "question": "What size of cappuccino does the customer order?",
        "options": [
          "Large",
          "Medium",
          "Small",
          "Extra small"
        ],
        "correctAnswer": "Large",
        "explanationUk": "Клієнтка чітко каже: \"Could I have a large cappuccino, please?\"."
      },
      {
        "id": "a1-c-2",
        "type": "multiple_choice",
        "question": "What kind of milk does Anna ask for?",
        "options": [
          "Oat milk",
          "Soy milk",
          "Almond milk",
          "Cow milk"
        ],
        "correctAnswer": "Oat milk",
        "explanationUk": "Вона уточнює: \"With oat milk if possible\"."
      },
      {
        "id": "a1-c-3",
        "type": "multiple_choice",
        "question": "What pastry does Anna decide to buy?",
        "options": [
          "A croissant",
          "A chocolate muffin",
          "An apple pie",
          "A blueberry scone"
        ],
        "correctAnswer": "A croissant",
        "explanationUk": "Олівер пропонує круасани, і Анна погоджується: \"Yes, one croissant, please\"."
      },
      {
        "id": "a1-c-4",
        "type": "multiple_choice",
        "question": "How much is the total order?",
        "options": [
          "Six pounds fifty (£6.50)",
          "Five pounds (£5.00)",
          "Seven pounds (£7.00)",
          "Six pounds (£6.00)"
        ],
        "correctAnswer": "Six pounds fifty (£6.50)",
        "explanationUk": "Бариста каже: \"That will be six pounds fifty in total\"."
      },
      {
        "id": "a1-c-5",
        "type": "multiple_choice",
        "question": "How does Anna pay for her order?",
        "options": [
          "By card",
          "In cash",
          "With a mobile voucher",
          "With a gift coupon"
        ],
        "correctAnswer": "By card",
        "explanationUk": "Анна відповідає: \"By card, please. Here is my contactless card\"."
      },
      {
        "id": "a1-c-6",
        "type": "true_false",
        "question": "True or False: The coffee shop does not accept cards.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, бариста приймає безконтактну картку (\"Here is my contactless card\")."
      },
      {
        "id": "a1-c-7",
        "type": "true_false",
        "question": "True or False: Oliver asks Anna to take a seat.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда, бариста каже: \"Please take a seat, and I will call your name when ready\"."
      },
      {
        "id": "a1-c-8",
        "type": "dictation",
        "question": "Впишіть почуте слово з репліки: \"Could I have a large ___, please?\"",
        "correctAnswer": "cappuccino",
        "audioSnippetText": "Could I have a large cappuccino, please?",
        "explanationUk": "Слово з аудіо: cappuccino."
      },
      {
        "id": "a1-c-9",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Are you paying by cash or ___?\"",
        "correctAnswer": "card",
        "audioSnippetText": "Are you paying by cash or card?",
        "explanationUk": "Слово з аудіо: card."
      },
      {
        "id": "a1-c-10",
        "type": "multiple_choice",
        "question": "What is the name of the coffee shop in Soho?",
        "options": [
          "Soho Brews",
          "London Beans",
          "Morning Coffee",
          "Daily Roast"
        ],
        "correctAnswer": "Soho Brews",
        "explanationUk": "Бариста вітає: \"Welcome to Soho Brews\"."
      },
      {
        "id": "a1-c-11",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"Yes, one ___, please.\"",
        "correctAnswer": "croissant",
        "audioSnippetText": "Yes, one croissant, please.",
        "explanationUk": "Слово з аудіо: croissant."
      },
      {
        "id": "a1-c-12",
        "type": "true_false",
        "question": "True or False: The customer orders cold brew coffee.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона замовляє великий капучино."
      }
    ]
  },
  {
    "id": "a1-listen-directions",
    "level": "A1",
    "order": 2,
    "unitTitleUk": "Блок 1: Перші діалоги",
    "titleEn": "Asking for Directions in New York",
    "titleUk": "Орієнтування в місті: Як дійти до метро",
    "accent": "American (US)",
    "preferredVoice": "Puck",
    "durationEst": "1:50",
    "scenarioDescriptionUk": "Турист на вулиці в Мангеттені запитує перехожого, як найшвидше дістатися найближчої станції метро.",
    "speakers": [
      {
        "name": "Tourist (Mark)",
        "roleUk": "Турист"
      },
      {
        "name": "Local Resident (Sarah)",
        "roleUk": "Місцева мешканка"
      }
    ],
    "dialogue": [
      {
        "speaker": "Mark",
        "textEn": "Excuse me! Could you help me? I am looking for the nearest subway station.",
        "textUk": "Перепрошую! Чи не могли б ви мені допомогти? Я шукаю найближчу станцію метро."
      },
      {
        "speaker": "Sarah",
        "textEn": "Sure! Walk straight ahead down this street for two blocks until you reach 5th Avenue.",
        "textUk": "Звісно! Йдіть прямо цією вулицею два квартали, поки не дійдете до 5-ї авеню."
      },
      {
        "speaker": "Mark",
        "textEn": "Okay, two blocks straight to 5th Avenue. And then?",
        "textUk": "Добре, два квартали прямо до 5-ї авеню. А потім?"
      },
      {
        "speaker": "Sarah",
        "textEn": "Turn right at the big pharmacy on the corner. You will see a large blue subway sign right next to the public park.",
        "textUk": "Поверніть праворуч біля великої аптеки на розі. Ви побачите великий синій знак метро прямо біля міського парку."
      },
      {
        "speaker": "Mark",
        "textEn": "Is it far from here? How long does it take to walk?",
        "textUk": "Це далеко звідси? Скільки часу займе пішки?"
      },
      {
        "speaker": "Sarah",
        "textEn": "Not far at all! It takes about five minutes on foot.",
        "textUk": "Зовсім недалеко! Це займає близько пʼяти хвилин пішки."
      },
      {
        "speaker": "Mark",
        "textEn": "That is wonderful news. Thank you for your kindness!",
        "textUk": "Це чудова новина. Дякую за вашу доброту!"
      },
      {
        "speaker": "Sarah",
        "textEn": "You are very welcome! Have a great time in the city.",
        "textUk": "Будь ласка! Гарного вам часу в місті."
      }
    ],
    "fullAudioText": "Excuse me! Could you help me? I am looking for the nearest subway station. Sure! Walk straight ahead down this street for two blocks until you reach 5th Avenue. Okay, two blocks straight to 5th Avenue. And then? Turn right at the big pharmacy on the corner. You will see a large blue subway sign right next to the public park. Is it far from here? How long does it take to walk? Not far at all! It takes about five minutes on foot. That is wonderful news. Thank you for your kindness! You are very welcome! Have a great time in the city.",
    "vocabulary": [
      {
        "word": "subway station",
        "transcription": "/ˈsʌb.weɪ ˈsteɪ.ʃən/",
        "translationUk": "станція метро",
        "contextSentence": "I am looking for the nearest subway station."
      },
      {
        "word": "straight ahead",
        "transcription": "/streɪt əˈhed/",
        "translationUk": "прямо вперед",
        "contextSentence": "Walk straight ahead down this street."
      },
      {
        "word": "blocks",
        "transcription": "/blɒks/",
        "translationUk": "міські квартали",
        "contextSentence": "Walk for two blocks."
      },
      {
        "word": "corner",
        "transcription": "/ˈkɔː.nər/",
        "translationUk": "ріг (вулиці)",
        "contextSentence": "Turn right at the big pharmacy on the corner."
      },
      {
        "word": "on foot",
        "transcription": "/ɒn fʊt/",
        "translationUk": "пішки",
        "contextSentence": "It takes about five minutes on foot."
      }
    ],
    "exercises": [
      {
        "id": "a1-d-1",
        "type": "multiple_choice",
        "question": "What is Mark searching for?",
        "options": [
          "The nearest subway station",
          "A coffee shop",
          "A taxi stand",
          "A hotel lobby"
        ],
        "correctAnswer": "The nearest subway station",
        "explanationUk": "Марк каже: \"I am looking for the nearest subway station\"."
      },
      {
        "id": "a1-d-2",
        "type": "multiple_choice",
        "question": "How many blocks should he walk straight?",
        "options": [
          "Two blocks",
          "Three blocks",
          "One block",
          "Five blocks"
        ],
        "correctAnswer": "Two blocks",
        "explanationUk": "Сара вказує: \"Walk straight ahead down this street for two blocks\"."
      },
      {
        "id": "a1-d-3",
        "type": "multiple_choice",
        "question": "What avenue will he reach after two blocks?",
        "options": [
          "5th Avenue",
          "Broadway",
          "7th Avenue",
          "Lexington Avenue"
        ],
        "correctAnswer": "5th Avenue",
        "explanationUk": "Сара вказує: \"...until you reach 5th Avenue\"."
      },
      {
        "id": "a1-d-4",
        "type": "multiple_choice",
        "question": "Which direction should he turn at the pharmacy on the corner?",
        "options": [
          "Turn right",
          "Turn left",
          "Go backwards",
          "Turn around"
        ],
        "correctAnswer": "Turn right",
        "explanationUk": "Сара каже: \"Turn right at the big pharmacy on the corner\"."
      },
      {
        "id": "a1-d-5",
        "type": "multiple_choice",
        "question": "How long does it take to walk to the station?",
        "options": [
          "About five minutes",
          "About twenty minutes",
          "Ten minutes",
          "Half an hour"
        ],
        "correctAnswer": "About five minutes",
        "explanationUk": "Вона відповідає: \"It takes about five minutes on foot\"."
      },
      {
        "id": "a1-d-6",
        "type": "true_false",
        "question": "True or False: The subway station is very far away.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона каже: \"Not far at all! It takes about five minutes on foot\"."
      },
      {
        "id": "a1-d-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"I am looking for the nearest ___ station.\"",
        "correctAnswer": "subway",
        "audioSnippetText": "I am looking for the nearest subway station.",
        "explanationUk": "Слово: subway."
      },
      {
        "id": "a1-d-8",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"It takes about five minutes on ___.\"",
        "correctAnswer": "foot",
        "audioSnippetText": "It takes about five minutes on foot.",
        "explanationUk": "Слово: foot."
      },
      {
        "id": "a1-d-9",
        "type": "true_false",
        "question": "True or False: The subway sign is blue and next to a public park.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"You will see a large blue subway sign right next to the public park\"."
      },
      {
        "id": "a1-d-10",
        "type": "multiple_choice",
        "question": "What building is on the corner where Mark needs to turn?",
        "options": [
          "A big pharmacy",
          "A supermarket",
          "A bookstore",
          "A bank branch"
        ],
        "correctAnswer": "A big pharmacy",
        "explanationUk": "Вона каже: \"at the big pharmacy on the corner\"."
      },
      {
        "id": "a1-d-11",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Turn ___ at the big pharmacy.\"",
        "correctAnswer": "right",
        "audioSnippetText": "Turn right at the big pharmacy.",
        "explanationUk": "Слово: right."
      },
      {
        "id": "a1-d-12",
        "type": "true_false",
        "question": "True or False: Mark needs to take a bus to get there.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, туди лише 5 хвилин пішки."
      }
    ]
  },
  {
    "id": "a1-listen-routine",
    "level": "A1",
    "order": 3,
    "unitTitleUk": "Блок 2: Щоденні справи",
    "titleEn": "Daily Routine & Evening Hobbies",
    "titleUk": "Щоденний розклад та вечірній відпочинок",
    "accent": "American (US)",
    "preferredVoice": "Kore",
    "durationEst": "1:40",
    "scenarioDescriptionUk": "Колега розповідає про свій звичайний робочий день, корисні звички та вечірні заняття спортом.",
    "speakers": [
      {
        "name": "Emily",
        "roleUk": "Маркетолог"
      }
    ],
    "dialogue": [
      {
        "speaker": "Emily",
        "textEn": "Every weekday morning, my alarm rings at seven o'clock.",
        "textUk": "Кожного буднього ранку мій будильник дзвенить о сьомій годині."
      },
      {
        "speaker": "Emily",
        "textEn": "First, I drink a glass of lemon water and do light morning yoga for fifteen minutes.",
        "textUk": "Спочатку я пʼю склянку води з лимоном і роблю легку ранкову йогу 15 хвилин."
      },
      {
        "speaker": "Emily",
        "textEn": "At eight o'clock, I prepare breakfast: usually oatmeal with fresh berries and green tea.",
        "textUk": "О восьмій я готую сніданок: зазвичай вівсянку зі свіжими ягодами та зелений чай."
      },
      {
        "speaker": "Emily",
        "textEn": "I start working on my laptop at nine AM. I write marketing articles and reply to team emails.",
        "textUk": "Я починаю працювати за ноутбуком о 9-й ранку. Я пишу маркетингові статті та відповідаю на листи команди."
      },
      {
        "speaker": "Emily",
        "textEn": "In the evening, after work finishes at six PM, I go to the local gym or run in the park.",
        "textUk": "Ввечері, після завершення роботи о 18:00, я йду до місцевого залу або бігаю в парку."
      },
      {
        "speaker": "Emily",
        "textEn": "Finally, I read an interesting English book for half an hour before going to bed at eleven.",
        "textUk": "Зрештою, я читаю цікаву англійську книгу пів години перед сном об одинадцятій."
      }
    ],
    "fullAudioText": "Every weekday morning, my alarm rings at seven o'clock. First, I drink a glass of lemon water and do light morning yoga for fifteen minutes. At eight o'clock, I prepare breakfast: usually oatmeal with fresh berries and green tea. I start working on my laptop at nine AM. I write marketing articles and reply to team emails. In the evening, after work finishes at six PM, I go to the local gym or run in the park. Finally, I read an interesting English book for half an hour before going to bed at eleven.",
    "vocabulary": [
      {
        "word": "alarm rings",
        "transcription": "/əˈlɑːm rɪŋz/",
        "translationUk": "будильник дзвенить",
        "contextSentence": "My alarm rings at seven o'clock."
      },
      {
        "word": "oatmeal",
        "transcription": "/ˈəʊt.miːl/",
        "translationUk": "вівсяна каша",
        "contextSentence": "Usually oatmeal with fresh berries."
      },
      {
        "word": "berries",
        "transcription": "/ˈber.iz/",
        "translationUk": "ягоди",
        "contextSentence": "Oatmeal with fresh berries."
      },
      {
        "word": "half an hour",
        "transcription": "/hɑːf ən ˈaʊ.ər/",
        "translationUk": "пів години",
        "contextSentence": "I read an interesting book for half an hour."
      },
      {
        "word": "go to bed",
        "transcription": "/ɡəʊ tə bed/",
        "translationUk": "лягати спати",
        "contextSentence": "Before going to bed at eleven."
      }
    ],
    "exercises": [
      {
        "id": "a1-r-1",
        "type": "multiple_choice",
        "question": "What time does Emily's alarm ring?",
        "options": [
          "At seven o'clock",
          "At six o'clock",
          "At eight o'clock",
          "At nine o'clock"
        ],
        "correctAnswer": "At seven o'clock",
        "explanationUk": "Вона починає: \"my alarm rings at seven o'clock\"."
      },
      {
        "id": "a1-r-2",
        "type": "multiple_choice",
        "question": "How long does Emily do morning yoga?",
        "options": [
          "Fifteen minutes",
          "Thirty minutes",
          "One hour",
          "Five minutes"
        ],
        "correctAnswer": "Fifteen minutes",
        "explanationUk": "Емілі каже: \"do light morning yoga for fifteen minutes\"."
      },
      {
        "id": "a1-r-3",
        "type": "multiple_choice",
        "question": "What does Emily usually have for breakfast?",
        "options": [
          "Oatmeal with berries and green tea",
          "Eggs and bacon with orange juice",
          "A sandwich and coffee",
          "Pancakes with syrup"
        ],
        "correctAnswer": "Oatmeal with berries and green tea",
        "explanationUk": "Вона зазначає: \"usually oatmeal with fresh berries and green tea\"."
      },
      {
        "id": "a1-r-4",
        "type": "multiple_choice",
        "question": "What time does she start working on her laptop?",
        "options": [
          "At nine AM",
          "At eight AM",
          "At ten AM",
          "At seven AM"
        ],
        "correctAnswer": "At nine AM",
        "explanationUk": "Емілі каже: \"I start working on my laptop at nine AM\"."
      },
      {
        "id": "a1-r-5",
        "type": "multiple_choice",
        "question": "What does Emily do after work at six PM?",
        "options": [
          "Goes to the gym or runs in the park",
          "Watches television",
          "Meets friends at a restaurant",
          "Sleeps immediately"
        ],
        "correctAnswer": "Goes to the gym or runs in the park",
        "explanationUk": "Вона каже: \"I go to the local gym or run in the park\"."
      },
      {
        "id": "a1-r-6",
        "type": "true_false",
        "question": "True or False: Emily goes to bed at midnight.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона лягає спати об одинадцятій (\"before going to bed at eleven\")."
      },
      {
        "id": "a1-r-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"My alarm rings at ___ o'clock.\"",
        "correctAnswer": "seven",
        "audioSnippetText": "My alarm rings at seven o'clock.",
        "explanationUk": "Слово: seven."
      },
      {
        "id": "a1-r-8",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Usually oatmeal with fresh ___ and green tea.\"",
        "correctAnswer": "berries",
        "audioSnippetText": "Usually oatmeal with fresh berries and green tea.",
        "explanationUk": "Слово: berries."
      },
      {
        "id": "a1-r-9",
        "type": "true_false",
        "question": "True or False: Emily reads an English book before going to sleep.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"I read an interesting English book for half an hour\"."
      },
      {
        "id": "a1-r-10",
        "type": "multiple_choice",
        "question": "What is Emily's job based on her description?",
        "options": [
          "Marketing specialist / writer",
          "Doctor",
          "Teacher",
          "Chef"
        ],
        "correctAnswer": "Marketing specialist / writer",
        "explanationUk": "Вона пише маркетингові статті (\"I write marketing articles\")."
      },
      {
        "id": "a1-r-11",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"I start working on my ___ at nine AM.\"",
        "correctAnswer": "laptop",
        "audioSnippetText": "I start working on my laptop at nine AM.",
        "explanationUk": "Слово: laptop."
      },
      {
        "id": "a1-r-12",
        "type": "true_false",
        "question": "True or False: Emily drinks black coffee in the morning.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона пʼє воду з лимоном і зелений чай."
      }
    ]
  },
  {
    "id": "a1-listen-supermarket",
    "level": "A1",
    "order": 4,
    "unitTitleUk": "Блок 2: Щоденні справи",
    "titleEn": "Supermarket Shopping & Healthy Groceries",
    "titleUk": "Покупки в супермаркеті: Продукти та ціни",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "1:45",
    "scenarioDescriptionUk": "Покупець у лондонському супермаркеті шукає продукти для здорової вечері та запитує консультанта про відділи.",
    "speakers": [
      {
        "name": "Shopper (David)",
        "roleUk": "Покупець"
      },
      {
        "name": "Assistant (Claire)",
        "roleUk": "Консультант супермаркету"
      }
    ],
    "dialogue": [
      {
        "speaker": "David",
        "textEn": "Excuse me, could you tell me where I can find fresh organic apples and bananas?",
        "textUk": "Перепрошую, чи не могли б ви підказати, де знайти свіжі органічні яблука та банани?"
      },
      {
        "speaker": "Claire",
        "textEn": "Of course! All fresh fruit and vegetables are in aisle one, right near the main entrance.",
        "textUk": "Звісно! Усі свіжі фрукти та овочі знаходяться в ряду номер один, прямо біля головного входу."
      },
      {
        "speaker": "David",
        "textEn": "Great, thank you. And where is the dairy section for yogurt and cheese?",
        "textUk": "Чудово, дякую. А де молочний відділ із йогуртами та сиром?"
      },
      {
        "speaker": "Claire",
        "textEn": "The dairy section is in aisle four, at the back of the store, next to the bakery.",
        "textUk": "Молочний відділ у ряду чотири, в глибині магазину, поруч із пекарнею."
      },
      {
        "speaker": "David",
        "textEn": "Are there any special discounts on Greek yogurt today?",
        "textUk": "Чи є сьогодні якісь знижки на грецький йогурт?"
      },
      {
        "speaker": "Claire",
        "textEn": "Yes! There is a buy-one-get-one-half-price promotion on all Greek yogurts this week.",
        "textUk": "Так! Цього тижня діє акція: купи один і отримай другий за пів ціни на всі грецькі йогурти."
      },
      {
        "speaker": "David",
        "textEn": "That is fantastic! Thank you so much for your assistance.",
        "textUk": "Це фантастично! Дуже дякую за допомогу."
      },
      {
        "speaker": "Claire",
        "textEn": "My pleasure. Have a great shopping experience!",
        "textUk": "Будь ласка. Приємних вам покупок!"
      }
    ],
    "fullAudioText": "Excuse me, could you tell me where I can find fresh organic apples and bananas? Of course! All fresh fruit and vegetables are in aisle one, right near the main entrance. Great, thank you. And where is the dairy section for yogurt and cheese? The dairy section is in aisle four, at the back of the store, next to the bakery. Are there any special discounts on Greek yogurt today? Yes! There is a buy-one-get-one-half-price promotion on all Greek yogurts this week. That is fantastic! Thank you so much for your assistance. My pleasure. Have a great shopping experience!",
    "vocabulary": [
      {
        "word": "aisle",
        "transcription": "/aɪl/",
        "translationUk": "ряд між полицями",
        "contextSentence": "All fresh fruit are in aisle one."
      },
      {
        "word": "dairy section",
        "transcription": "/ˈdeə.ri ˈsek.ʃən/",
        "translationUk": "молочний відділ",
        "contextSentence": "Where is the dairy section for yogurt?"
      },
      {
        "word": "bakery",
        "transcription": "/ˈbeɪ.kər.i/",
        "translationUk": "пекарня, хлібний відділ",
        "contextSentence": "Next to the bakery."
      },
      {
        "word": "discounts",
        "transcription": "/ˈdɪs.kaʊnts/",
        "translationUk": "знижки",
        "contextSentence": "Are there any special discounts on Greek yogurt?"
      },
      {
        "word": "promotion",
        "transcription": "/prəˈməʊ.ʃən/",
        "translationUk": "акція, пропозиція",
        "contextSentence": "There is a buy-one-get-one promotion."
      }
    ],
    "exercises": [
      {
        "id": "a1-s-1",
        "type": "multiple_choice",
        "question": "Which aisle has fresh fruit and vegetables?",
        "options": [
          "Aisle one",
          "Aisle two",
          "Aisle four",
          "Aisle ten"
        ],
        "correctAnswer": "Aisle one",
        "explanationUk": "Консультант каже: \"All fresh fruit and vegetables are in aisle one\"."
      },
      {
        "id": "a1-s-2",
        "type": "multiple_choice",
        "question": "Where is aisle one located in the store?",
        "options": [
          "Right near the main entrance",
          "At the back of the store",
          "On the second floor",
          "Outside the store"
        ],
        "correctAnswer": "Right near the main entrance",
        "explanationUk": "Вона уточнює: \"right near the main entrance\"."
      },
      {
        "id": "a1-s-3",
        "type": "multiple_choice",
        "question": "In which aisle can David find yogurt and cheese?",
        "options": [
          "Aisle four",
          "Aisle one",
          "Aisle three",
          "Aisle seven"
        ],
        "correctAnswer": "Aisle four",
        "explanationUk": "Клер відповідає: \"The dairy section is in aisle four\"."
      },
      {
        "id": "a1-s-4",
        "type": "multiple_choice",
        "question": "What section is next to the dairy department?",
        "options": [
          "The bakery",
          "The pharmacy",
          "The electronics section",
          "The pet food section"
        ],
        "correctAnswer": "The bakery",
        "explanationUk": "Вона пояснює: \"next to the bakery\"."
      },
      {
        "id": "a1-s-5",
        "type": "multiple_choice",
        "question": "What special promotion is active for Greek yogurt this week?",
        "options": [
          "Buy one get one half price",
          "Fifty percent discount on everything",
          "Free delivery",
          "Buy two get three free"
        ],
        "correctAnswer": "Buy one get one half price",
        "explanationUk": "Вона повідомляє: \"There is a buy-one-get-one-half-price promotion\"."
      },
      {
        "id": "a1-s-6",
        "type": "true_false",
        "question": "True or False: The dairy section is near the main entrance.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, молочний відділ знаходиться в глибині магазину (at the back of the store)."
      },
      {
        "id": "a1-s-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"All fresh fruit and vegetables are in ___ one.\"",
        "correctAnswer": "aisle",
        "audioSnippetText": "All fresh fruit and vegetables are in aisle one.",
        "explanationUk": "Слово: aisle."
      },
      {
        "id": "a1-s-8",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"And where is the ___ section for yogurt and cheese?\"",
        "correctAnswer": "dairy",
        "audioSnippetText": "And where is the dairy section for yogurt and cheese?",
        "explanationUk": "Слово: dairy."
      },
      {
        "id": "a1-s-9",
        "type": "true_false",
        "question": "True or False: David is looking for organic apples and bananas.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"where I can find fresh organic apples and bananas\"."
      },
      {
        "id": "a1-s-10",
        "type": "multiple_choice",
        "question": "What adjective does David use for the apples he wants to buy?",
        "options": [
          "Organic",
          "Imported",
          "Frozen",
          "Sweetened"
        ],
        "correctAnswer": "Organic",
        "explanationUk": "Він сказав: \"organic apples\"."
      },
      {
        "id": "a1-s-11",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Are there any special ___ on Greek yogurt today?\"",
        "correctAnswer": "discounts",
        "audioSnippetText": "Are there any special discounts on Greek yogurt today?",
        "explanationUk": "Слово: discounts."
      },
      {
        "id": "a1-s-12",
        "type": "true_false",
        "question": "True or False: There is no promotion on Greek yogurt this week.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, акція діє (\"Yes! There is a buy-one-get-one-half-price promotion\")."
      }
    ]
  },
  {
    "id": "a2-listen-hotel",
    "level": "A2",
    "order": 1,
    "unitTitleUk": "Блок 1: Подорожі та побут",
    "titleEn": "Hotel Check-in & Room Request",
    "titleUk": "Заселення в готель та запит додаткових послуг",
    "accent": "American (US)",
    "preferredVoice": "Puck",
    "durationEst": "2:10",
    "scenarioDescriptionUk": "Гість прибуває до готелю в Бостоні, підтверджує бронь номера та запитує про час сніданку й пароль від Wi-Fi.",
    "speakers": [
      {
        "name": "Receptionist (Michael)",
        "roleUk": "Адміністратор готелю"
      },
      {
        "name": "Guest (Laura)",
        "roleUk": "Гостя готелю"
      }
    ],
    "dialogue": [
      {
        "speaker": "Michael",
        "textEn": "Good afternoon, welcome to the Beacon Grand Hotel. How can I assist you?",
        "textUk": "Доброго дня, ласкаво просимо до Beacon Grand Hotel. Чим можу допомогти?"
      },
      {
        "speaker": "Laura",
        "textEn": "Hello! I have a reservation for two nights under the name Laura Jenkins.",
        "textUk": "Привіт! У мене заброньовано номер на дві ночі на імʼя Лора Дженкінс."
      },
      {
        "speaker": "Michael",
        "textEn": "Let me look that up... Yes, Ms. Jenkins! A deluxe queen room with a city view on the fourth floor.",
        "textUk": "Зараз перевірю... Так, пані Дженкінс! Номер делюкс з ліжком queen-size та видом на місто на четвертому поверсі."
      },
      {
        "speaker": "Laura",
        "textEn": "That sounds delightful. Could you tell me what time breakfast is served tomorrow?",
        "textUk": "Чудово звучить. Підкажіть, о котрій годині подають сніданок завтра?"
      },
      {
        "speaker": "Michael",
        "textEn": "Complimentary buffet breakfast is served in the main dining hall from 6:30 AM to 10:00 AM.",
        "textUk": "Безкоштовний сніданок у форматі шведського столу подається в головній залі з 6:30 до 10:00."
      },
      {
        "speaker": "Laura",
        "textEn": "And what is the Wi-Fi password for guests?",
        "textUk": "А який пароль від Wi-Fi для гостей?"
      },
      {
        "speaker": "Michael",
        "textEn": "The network is BeaconGuest and the password is on this keycard sleeve: Beacon2026.",
        "textUk": "Мережа — BeaconGuest, а пароль надрукований на конверті ключ-картки: Beacon2026."
      },
      {
        "speaker": "Laura",
        "textEn": "Thank you Michael, you have been remarkably helpful.",
        "textUk": "Дякую, Майкле, ви дуже допомогли."
      }
    ],
    "fullAudioText": "Good afternoon, welcome to the Beacon Grand Hotel. How can I assist you? Hello! I have a reservation for two nights under the name Laura Jenkins. Let me look that up... Yes, Ms. Jenkins! A deluxe queen room with a city view on the fourth floor. That sounds delightful. Could you tell me what time breakfast is served tomorrow? Complimentary buffet breakfast is served in the main dining hall from 6:30 AM to 10:00 AM. And what is the Wi-Fi password for guests? The network is BeaconGuest and the password is on this keycard sleeve: Beacon2026. Thank you Michael, you have been remarkably helpful.",
    "vocabulary": [
      {
        "word": "reservation",
        "transcription": "/ˌrez.əˈveɪ.ʃən/",
        "translationUk": "бронювання",
        "contextSentence": "I have a reservation for two nights."
      },
      {
        "word": "complimentary",
        "transcription": "/ˌkɒm.plɪˈmen.tər.i/",
        "translationUk": "безкоштовний, як комплімент",
        "contextSentence": "Complimentary buffet breakfast is served."
      },
      {
        "word": "buffet",
        "transcription": "/ˈbʊf.eɪ/",
        "translationUk": "шведський стіл",
        "contextSentence": "Buffet breakfast in the dining hall."
      },
      {
        "word": "keycard sleeve",
        "transcription": "/ˈkiː.kɑːd sliːv/",
        "translationUk": "конверт для ключ-картки",
        "contextSentence": "The password is on this keycard sleeve."
      }
    ],
    "exercises": [
      {
        "id": "a2-h-1",
        "type": "multiple_choice",
        "question": "How many nights is Laura staying at the hotel?",
        "options": [
          "Two nights",
          "One night",
          "Three nights",
          "A week"
        ],
        "correctAnswer": "Two nights",
        "explanationUk": "Вона зазначає: \"I have a reservation for two nights\"."
      },
      {
        "id": "a2-h-2",
        "type": "multiple_choice",
        "question": "On which floor is Laura's deluxe room located?",
        "options": [
          "Fourth floor",
          "Second floor",
          "Tenth floor",
          "Ground floor"
        ],
        "correctAnswer": "Fourth floor",
        "explanationUk": "Майкл каже: \"on the fourth floor\"."
      },
      {
        "id": "a2-h-3",
        "type": "multiple_choice",
        "question": "What time does the morning breakfast buffet start?",
        "options": [
          "At 6:30 AM",
          "At 7:00 AM",
          "At 8:00 AM",
          "At 6:00 AM"
        ],
        "correctAnswer": "At 6:30 AM",
        "explanationUk": "Майкл вказує: \"from 6:30 AM to 10:00 AM\"."
      },
      {
        "id": "a2-h-4",
        "type": "multiple_choice",
        "question": "What is the guest Wi-Fi password?",
        "options": [
          "Beacon2026",
          "GrandHotel",
          "Jenkins2026",
          "Welcome123"
        ],
        "correctAnswer": "Beacon2026",
        "explanationUk": "Майкл озвучує: \"the password is on this keycard sleeve: Beacon2026\"."
      },
      {
        "id": "a2-h-5",
        "type": "true_false",
        "question": "True or False: Guests have to pay extra money for the breakfast buffet.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, він безкоштовний (complimentary)."
      },
      {
        "id": "a2-h-6",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"I have a ___ for two nights.\"",
        "correctAnswer": "reservation",
        "audioSnippetText": "I have a reservation for two nights.",
        "explanationUk": "Слово: reservation."
      },
      {
        "id": "a2-h-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"___ buffet breakfast is served.\"",
        "correctAnswer": "Complimentary",
        "audioSnippetText": "Complimentary buffet breakfast is served.",
        "explanationUk": "Слово: Complimentary."
      },
      {
        "id": "a2-h-8",
        "type": "true_false",
        "question": "True or False: Laura's room has a garden view.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, номер має вид на місто (with a city view)."
      },
      {
        "id": "a2-h-9",
        "type": "multiple_choice",
        "question": "What view does Laura's room offer?",
        "options": [
          "City view",
          "Ocean view",
          "Mountain view",
          "Courtyard view"
        ],
        "correctAnswer": "City view",
        "explanationUk": "Він сказав: \"with a city view\"."
      },
      {
        "id": "a2-h-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"on the ___ floor\"",
        "correctAnswer": "fourth",
        "audioSnippetText": "on the fourth floor",
        "explanationUk": "Слово: fourth."
      },
      {
        "id": "a2-h-11",
        "type": "true_false",
        "question": "True or False: The hotel name is Beacon Grand Hotel.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"welcome to the Beacon Grand Hotel\"."
      },
      {
        "id": "a2-h-12",
        "type": "multiple_choice",
        "question": "Until what time is breakfast available?",
        "options": [
          "10:00 AM",
          "9:30 AM",
          "11:00 AM",
          "12:00 PM"
        ],
        "correctAnswer": "10:00 AM",
        "explanationUk": "Сніданок подається до 10:00 AM."
      }
    ]
  },
  {
    "id": "a2-listen-train",
    "level": "A2",
    "order": 2,
    "unitTitleUk": "Блок 1: Подорожі та побут",
    "titleEn": "Train Station Announcement & Boarding",
    "titleUk": "Оголошення на залізничному вокзалі та посадка",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:00",
    "scenarioDescriptionUk": "Оголошення диктора на вокзалі Сент-Панкрас у Лондоні про прибуття швидкісного потяга до Единбурга.",
    "speakers": [
      {
        "name": "Station Announcer",
        "roleUk": "Диктор вокзалу"
      }
    ],
    "dialogue": [
      {
        "speaker": "Announcer",
        "textEn": "May I have your attention, please. This is a platform announcement for all passengers travelling on the 10:45 service to Edinburgh Waverley.",
        "textUk": "Прошу вашої уваги, будь ласка. Це оголошення на платформі для всіх пасажирів рейсу о 10:45 до станції Единбург Вейверлі."
      },
      {
        "speaker": "Announcer",
        "textEn": "The train has now arrived at Platform 3. Please mind the gap between the train and the platform edge.",
        "textUk": "Потяг щойно прибув на платформу 3. Будь ласка, звертайте увагу на проміжок між потягом та краєм платформи."
      },
      {
        "speaker": "Announcer",
        "textEn": "First class carriages are located at the front of the train in coaches A and B.",
        "textUk": "Вагони першого класу розташовані в голові потяга — це вагони A та B."
      },
      {
        "speaker": "Announcer",
        "textEn": "Standard class passenger seating is situated in coaches C through H.",
        "textUk": "Місця для пасажирів стандартного класу розташовані у вагонах від C до H."
      },
      {
        "speaker": "Announcer",
        "textEn": "The cafe bar serving warm beverages and fresh snacks is located in coach D.",
        "textUk": "Кафе-бар з гарячими напоями та свіжими перекусами розташований у вагоні D."
      },
      {
        "speaker": "Announcer",
        "textEn": "Please ensure you have all personal luggage with you and have your tickets ready for inspection.",
        "textUk": "Будь ласка, переконайтеся, що ви взяли весь особистий багаж, та приготуйте квитки для перевірки."
      }
    ],
    "fullAudioText": "May I have your attention, please. This is a platform announcement for all passengers travelling on the 10:45 service to Edinburgh Waverley. The train has now arrived at Platform 3. Please mind the gap between the train and the platform edge. First class carriages are located at the front of the train in coaches A and B. Standard class passenger seating is situated in coaches C through H. The cafe bar serving warm beverages and fresh snacks is located in coach D. Please ensure you have all personal luggage with you and have your tickets ready for inspection.",
    "vocabulary": [
      {
        "word": "platform announcement",
        "transcription": "/ˈplæt.fɔːm əˈnaʊns.mənt/",
        "translationUk": "оголошення на платформі",
        "contextSentence": "This is a platform announcement."
      },
      {
        "word": "mind the gap",
        "transcription": "/maɪnd ðə ɡæp/",
        "translationUk": "звертайте увагу на проміжок (культова фраза)",
        "contextSentence": "Please mind the gap between the train and the platform."
      },
      {
        "word": "coach",
        "transcription": "/kəʊtʃ/",
        "translationUk": "вагон потяга",
        "contextSentence": "Coaches A and B."
      },
      {
        "word": "beverages",
        "transcription": "/ˈbev.ər.ɪdʒ.ɪz/",
        "translationUk": "напої",
        "contextSentence": "Serving warm beverages and fresh snacks."
      },
      {
        "word": "inspection",
        "transcription": "/ɪnˈspek.ʃən/",
        "translationUk": "перевірка, контроль",
        "contextSentence": "Have your tickets ready for inspection."
      }
    ],
    "exercises": [
      {
        "id": "a2-t-1",
        "type": "multiple_choice",
        "question": "What is the departure time of the train to Edinburgh?",
        "options": [
          "10:45",
          "11:15",
          "09:45",
          "10:15"
        ],
        "correctAnswer": "10:45",
        "explanationUk": "Диктор оголошує: \"the 10:45 service to Edinburgh Waverley\"."
      },
      {
        "id": "a2-t-2",
        "type": "multiple_choice",
        "question": "Which platform did the train arrive at?",
        "options": [
          "Platform 3",
          "Platform 5",
          "Platform 1",
          "Platform 8"
        ],
        "correctAnswer": "Platform 3",
        "explanationUk": "Диктор каже: \"The train has now arrived at Platform 3\"."
      },
      {
        "id": "a2-t-3",
        "type": "multiple_choice",
        "question": "Where are the First Class coaches located?",
        "options": [
          "Coaches A and B at the front",
          "Coach D in the middle",
          "Coaches G and H at the back",
          "In all coaches"
        ],
        "correctAnswer": "Coaches A and B at the front",
        "explanationUk": "Він чітко зазначає: \"in coaches A and B\"."
      },
      {
        "id": "a2-t-4",
        "type": "multiple_choice",
        "question": "In which coach is the cafe bar situated?",
        "options": [
          "Coach D",
          "Coach A",
          "Coach C",
          "Coach H"
        ],
        "correctAnswer": "Coach D",
        "explanationUk": "Оголошено: \"The cafe bar... is located in coach D\"."
      },
      {
        "id": "a2-t-5",
        "type": "true_false",
        "question": "True or False: Standard class is in coaches A and B.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, там перший клас, а стандартний — у C-H."
      },
      {
        "id": "a2-t-6",
        "type": "dictation",
        "question": "Впишіть відому британську фразу: \"Please mind the ___ between the train and platform.\"",
        "correctAnswer": "gap",
        "audioSnippetText": "Please mind the gap between the train and platform edge.",
        "explanationUk": "Слово: gap."
      },
      {
        "id": "a2-t-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"The train has now arrived at ___ 3.\"",
        "correctAnswer": "Platform",
        "audioSnippetText": "The train has now arrived at Platform 3.",
        "explanationUk": "Слово: Platform."
      },
      {
        "id": "a2-t-8",
        "type": "true_false",
        "question": "True or False: Passengers need their tickets ready for inspection.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"have your tickets ready for inspection\"."
      },
      {
        "id": "a2-t-9",
        "type": "multiple_choice",
        "question": "What destination is the train travelling towards?",
        "options": [
          "Edinburgh Waverley",
          "Glasgow Central",
          "Manchester Piccadilly",
          "Cardiff Central"
        ],
        "correctAnswer": "Edinburgh Waverley",
        "explanationUk": "Диктор сказав: \"to Edinburgh Waverley\"."
      },
      {
        "id": "a2-t-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"Please ensure you have all personal ___ with you.\"",
        "correctAnswer": "luggage",
        "audioSnippetText": "Please ensure you have all personal luggage with you.",
        "explanationUk": "Слово: luggage."
      },
      {
        "id": "a2-t-11",
        "type": "true_false",
        "question": "True or False: The train is cancelled.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, потяг уже прибув на платформу."
      },
      {
        "id": "a2-t-12",
        "type": "multiple_choice",
        "question": "What does the cafe bar serve?",
        "options": [
          "Warm beverages and fresh snacks",
          "Full three-course dinners",
          "Alcohol only",
          "Breakfast cereal only"
        ],
        "correctAnswer": "Warm beverages and fresh snacks",
        "explanationUk": "Оголошено: \"serving warm beverages and fresh snacks\"."
      }
    ]
  },
  {
    "id": "a2-listen-weekend",
    "level": "A2",
    "order": 3,
    "unitTitleUk": "Блок 2: Плани та спогади",
    "titleEn": "Planning a Weekend Road Trip",
    "titleUk": "Планування подорожі на вихідні: Авто чи потяг?",
    "accent": "American (US)",
    "preferredVoice": "Fenrir",
    "durationEst": "2:15",
    "scenarioDescriptionUk": "Двоє друзів обговорюють поїздку на вихідні в національний парк, порівнюють оренду авто та потяг.",
    "speakers": [
      {
        "name": "Tom",
        "roleUk": "Друг"
      },
      {
        "name": "Jessica",
        "roleUk": "Подруга"
      }
    ],
    "dialogue": [
      {
        "speaker": "Tom",
        "textEn": "Hey Jessica! Are we still planning to visit Yosemite National Park this Saturday?",
        "textUk": "Привіт, Джессіко! Ми все ще плануємо поїхати до національного парку Йосеміті цієї суботи?"
      },
      {
        "speaker": "Jessica",
        "textEn": "Definitely! The weather forecast predicts sunshine and seventy degrees all weekend.",
        "textUk": "Безумовно! Прогноз погоди обіцяє сонце та 70 градусів за Фаренгейтом усі вихідні."
      },
      {
        "speaker": "Tom",
        "textEn": "Awesome. Should we rent an electric car or take the scenic regional train?",
        "textUk": "Чудово. Нам орендувати електромобіль чи поїхати мальовничим регіональним потягом?"
      },
      {
        "speaker": "Jessica",
        "textEn": "Renting a car is much more convenient because we can stop at viewpoints along the canyon.",
        "textUk": "Орендувати авто набагато зручніше, тому що ми зможемо зупинятися на оглядових майданчиках вздовж каньйону."
      },
      {
        "speaker": "Tom",
        "textEn": "Good point. I will reserve an SUV online tonight. It costs around eighty dollars per day.",
        "textUk": "Хороша думка. Я забронюю позашляховик онлайн сьогодні ввечері. Це коштує близько вісімдесяти доларів на день."
      },
      {
        "speaker": "Jessica",
        "textEn": "And I will pack hiking boots, warm jackets, and healthy trail snacks for both of us.",
        "textUk": "А я спакую туристичні черевики, теплі куртки та корисні перекуси для нас обох."
      }
    ],
    "fullAudioText": "Hey Jessica! Are we still planning to visit Yosemite National Park this Saturday? Definitely! The weather forecast predicts sunshine and seventy degrees all weekend. Awesome. Should we rent an electric car or take the scenic regional train? Renting a car is much more convenient because we can stop at viewpoints along the canyon. Good point. I will reserve an SUV online tonight. It costs around eighty dollars per day. And I will pack hiking boots, warm jackets, and healthy trail snacks for both of us.",
    "vocabulary": [
      {
        "word": "weather forecast",
        "transcription": "/ˈweð.ər ˈfɔː.kɑːst/",
        "translationUk": "прогноз погоди",
        "contextSentence": "The weather forecast predicts sunshine."
      },
      {
        "word": "scenic",
        "transcription": "/ˈsiː.nɪk/",
        "translationUk": "мальовничий, панорамний",
        "contextSentence": "Take the scenic regional train."
      },
      {
        "word": "viewpoints",
        "transcription": "/ˈvjuː.pɔɪnts/",
        "translationUk": "оглядові майданчики",
        "contextSentence": "Stop at viewpoints along the canyon."
      },
      {
        "word": "hiking boots",
        "transcription": "/ˈhaɪ.kɪŋ buːts/",
        "translationUk": "черевики для походу",
        "contextSentence": "I will pack hiking boots."
      }
    ],
    "exercises": [
      {
        "id": "a2-w-1",
        "type": "multiple_choice",
        "question": "Where are Tom and Jessica planning to travel?",
        "options": [
          "Yosemite National Park",
          "Grand Canyon",
          "Yellowstone",
          "Central Park"
        ],
        "correctAnswer": "Yosemite National Park",
        "explanationUk": "Том питає: \"visit Yosemite National Park this Saturday\"."
      },
      {
        "id": "a2-w-2",
        "type": "multiple_choice",
        "question": "What kind of weather is predicted for Saturday?",
        "options": [
          "Sunshine and warm temperatures",
          "Heavy rain and thunder",
          "Snowstorms",
          "Strong foggy winds"
        ],
        "correctAnswer": "Sunshine and warm temperatures",
        "explanationUk": "Джессіка каже: \"sunshine and seventy degrees\"."
      },
      {
        "id": "a2-w-3",
        "type": "multiple_choice",
        "question": "Why does Jessica prefer renting a car over taking the train?",
        "options": [
          "They can stop at viewpoints along the canyon",
          "It is cheaper than the train",
          "The train is fully booked",
          "She dislikes trains"
        ],
        "correctAnswer": "They can stop at viewpoints along the canyon",
        "explanationUk": "Вона пояснює: \"we can stop at viewpoints along the canyon\"."
      },
      {
        "id": "a2-w-4",
        "type": "multiple_choice",
        "question": "Approximately how much does the SUV rental cost per day?",
        "options": [
          "Around eighty dollars ($80)",
          "Fifty dollars ($50)",
          "One hundred and fifty dollars ($150)",
          "Twenty dollars ($20)"
        ],
        "correctAnswer": "Around eighty dollars ($80)",
        "explanationUk": "Том каже: \"It costs around eighty dollars per day\"."
      },
      {
        "id": "a2-w-5",
        "type": "true_false",
        "question": "True or False: Jessica will pack hiking boots and snacks.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"I will pack hiking boots, warm jackets, and healthy trail snacks\"."
      },
      {
        "id": "a2-w-6",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"The weather ___ predicts sunshine.\"",
        "correctAnswer": "forecast",
        "audioSnippetText": "The weather forecast predicts sunshine.",
        "explanationUk": "Слово: forecast."
      },
      {
        "id": "a2-w-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Take the ___ regional train.\"",
        "correctAnswer": "scenic",
        "audioSnippetText": "Take the scenic regional train.",
        "explanationUk": "Слово: scenic."
      },
      {
        "id": "a2-w-8",
        "type": "true_false",
        "question": "True or False: They decided to take the train.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вони вирішили орендувати авто."
      },
      {
        "id": "a2-w-9",
        "type": "multiple_choice",
        "question": "What type of vehicle does Tom plan to reserve?",
        "options": [
          "An SUV",
          "A compact motorcycle",
          "A camper van",
          "A convertible sedan"
        ],
        "correctAnswer": "An SUV",
        "explanationUk": "Він сказав: \"reserve an SUV online\"."
      },
      {
        "id": "a2-w-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"hiking ___ and warm jackets\"",
        "correctAnswer": "boots",
        "audioSnippetText": "hiking boots and warm jackets",
        "explanationUk": "Слово: boots."
      },
      {
        "id": "a2-w-11",
        "type": "true_false",
        "question": "True or False: The trip is planned for next month.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вони їдуть цієї суботи (this Saturday)."
      },
      {
        "id": "a2-w-12",
        "type": "multiple_choice",
        "question": "Who will book the car online tonight?",
        "options": [
          "Tom",
          "Jessica",
          "Their parents",
          "A travel agent"
        ],
        "correctAnswer": "Tom",
        "explanationUk": "Том бере це на себе: \"I will reserve an SUV online tonight\"."
      }
    ]
  },
  {
    "id": "a2-listen-clinic",
    "level": "A2",
    "order": 4,
    "unitTitleUk": "Блок 2: Плани та спогади",
    "titleEn": "At the Medical Clinic: Doctor Consultation",
    "titleUk": "Візит до лікаря: Скарги на здоровʼя та рецепт",
    "accent": "American (US)",
    "preferredVoice": "Aoede",
    "durationEst": "2:10",
    "scenarioDescriptionUk": "Пацієнтка на прийомі у терапевта описує симптоми застуди та отримує рецепт на ліки й рекомендації щодо відпочинку.",
    "speakers": [
      {
        "name": "Dr. Evans",
        "roleUk": "Лікар-терапевт"
      },
      {
        "name": "Patient (Megan)",
        "roleUk": "Пацієнтка"
      }
    ],
    "dialogue": [
      {
        "speaker": "Dr. Evans",
        "textEn": "Good morning Megan. What symptoms have you been experiencing lately?",
        "textUk": "Доброго ранку, Меган. Які симптоми ви відчуваєте останнім часом?"
      },
      {
        "speaker": "Megan",
        "textEn": "I have had a severe sore throat and a pounding headache for three days, and my temperature was slightly elevated last night.",
        "textUk": "У мене сильний біль у горлі та пульсуючий головний біль уже три дні, а вчора ввечері була підвищена температура."
      },
      {
        "speaker": "Dr. Evans",
        "textEn": "Let me inspect your throat and listen to your breathing with the stethoscope... Take a deep breath in, please.",
        "textUk": "Дозвольте оглянути ваше горло та послухати дихання стетоскопом... Зробіть глибокий вдих, будь ласка."
      },
      {
        "speaker": "Megan",
        "textEn": "Is it something serious, Doctor?",
        "textUk": "Це щось серйозне, лікарю?"
      },
      {
        "speaker": "Dr. Evans",
        "textEn": "Your lungs are completely clear. It appears to be a seasonal viral infection. I am prescribing an anti-inflammatory spray and vitamin C.",
        "textUk": "Ваші легені абсолютно чисті. Схоже на сезонну вірусну інфекцію. Я виписую протизапальний спрей та вітамін C."
      },
      {
        "speaker": "Megan",
        "textEn": "How often should I use the throat spray?",
        "textUk": "Як часто мені використовувати спрей для горла?"
      },
      {
        "speaker": "Dr. Evans",
        "textEn": "Spray it twice daily after meals, drink plenty of warm liquids, and rest in bed for two days.",
        "textUk": "Пирскайте двічі на день після їди, пийте багато теплої рідини та відпочивайте в ліжку два дні."
      }
    ],
    "fullAudioText": "Good morning Megan. What symptoms have you been experiencing lately? I have had a severe sore throat and a pounding headache for three days, and my temperature was slightly elevated last night. Let me inspect your throat and listen to your breathing with the stethoscope... Take a deep breath in, please. Is it something serious, Doctor? Your lungs are completely clear. It appears to be a seasonal viral infection. I am prescribing an anti-inflammatory spray and vitamin C. How often should I use the throat spray? Spray it twice daily after meals, drink plenty of warm liquids, and rest in bed for two days.",
    "vocabulary": [
      {
        "word": "sore throat",
        "transcription": "/sɔː θrəʊt/",
        "translationUk": "біль у горлі",
        "contextSentence": "I have had a severe sore throat."
      },
      {
        "word": "stethoscope",
        "transcription": "/ˈsteθ.ə.skəʊp/",
        "translationUk": "стетоскоп",
        "contextSentence": "Listen to your breathing with the stethoscope."
      },
      {
        "word": "prescribing",
        "transcription": "/prɪˈskraɪ.bɪŋ/",
        "translationUk": "виписувати рецепт",
        "contextSentence": "I am prescribing an anti-inflammatory spray."
      },
      {
        "word": "twice daily",
        "transcription": "/twaɪs ˈdeɪ.li/",
        "translationUk": "двічі на день",
        "contextSentence": "Spray it twice daily after meals."
      }
    ],
    "exercises": [
      {
        "id": "a2-c-1",
        "type": "multiple_choice",
        "question": "How long has Megan had a sore throat and headache?",
        "options": [
          "For three days",
          "For one week",
          "Since this morning",
          "For two weeks"
        ],
        "correctAnswer": "For three days",
        "explanationUk": "Меган відповідає: \"for three days\"."
      },
      {
        "id": "a2-c-2",
        "type": "multiple_choice",
        "question": "What is the doctor's medical diagnosis?",
        "options": [
          "A seasonal viral infection",
          "Bacterial pneumonia",
          "A broken bone",
          "Food poisoning"
        ],
        "correctAnswer": "A seasonal viral infection",
        "explanationUk": "Лікар каже: \"It appears to be a seasonal viral infection\"."
      },
      {
        "id": "a2-c-3",
        "type": "multiple_choice",
        "question": "Are Megan's lungs affected by the illness?",
        "options": [
          "No, her lungs are completely clear",
          "Yes, she has severe bronchitis",
          "She needs an immediate lung surgery",
          "The doctor did not check lungs"
        ],
        "correctAnswer": "No, her lungs are completely clear",
        "explanationUk": "Лікар заспокоює: \"Your lungs are completely clear\"."
      },
      {
        "id": "a2-c-4",
        "type": "multiple_choice",
        "question": "How frequently should she use the prescribed throat spray?",
        "options": [
          "Twice daily after meals",
          "Once a week",
          "Every hour",
          "Four times before breakfast"
        ],
        "correctAnswer": "Twice daily after meals",
        "explanationUk": "Лікар призначає: \"Spray it twice daily after meals\"."
      },
      {
        "id": "a2-c-5",
        "type": "true_false",
        "question": "True or False: The doctor told Megan to go to work tomorrow.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, лікар наказав відпочивати в ліжку два дні (rest in bed for two days)."
      },
      {
        "id": "a2-c-6",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"I have had a severe ___ throat.\"",
        "correctAnswer": "sore",
        "audioSnippetText": "I have had a severe sore throat.",
        "explanationUk": "Слово: sore."
      },
      {
        "id": "a2-c-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Spray it ___ daily after meals.\"",
        "correctAnswer": "twice",
        "audioSnippetText": "Spray it twice daily after meals.",
        "explanationUk": "Слово: twice."
      },
      {
        "id": "a2-c-8",
        "type": "true_false",
        "question": "True or False: The doctor prescribes vitamin C.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"anti-inflammatory spray and vitamin C\"."
      },
      {
        "id": "a2-c-9",
        "type": "multiple_choice",
        "question": "What instrument does Dr. Evans use to listen to breathing?",
        "options": [
          "A stethoscope",
          "An otoscope",
          "A thermometer",
          "A magnifying glass"
        ],
        "correctAnswer": "A stethoscope",
        "explanationUk": "Він сказав: \"with the stethoscope\"."
      },
      {
        "id": "a2-c-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"drink plenty of warm ___\"",
        "correctAnswer": "liquids",
        "audioSnippetText": "drink plenty of warm liquids",
        "explanationUk": "Слово: liquids."
      },
      {
        "id": "a2-c-11",
        "type": "true_false",
        "question": "True or False: Megan needs an immediate hospital admission.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, це звичайна сезонна вірусна інфекція."
      },
      {
        "id": "a2-c-12",
        "type": "multiple_choice",
        "question": "How many days of bed rest did the doctor recommend?",
        "options": [
          "Two days",
          "Five days",
          "One day",
          "Two weeks"
        ],
        "correctAnswer": "Two days",
        "explanationUk": "Лікар призначив: \"rest in bed for two days\"."
      }
    ]
  },
  {
    "id": "b1-listen-interview",
    "level": "B1",
    "order": 1,
    "unitTitleUk": "Блок 1: Карʼєра та бізнес",
    "titleEn": "Software Engineer Job Interview",
    "titleUk": "Співбесіда: Досвід розробника та робота в команді",
    "accent": "American (US)",
    "preferredVoice": "Charon",
    "durationEst": "2:30",
    "scenarioDescriptionUk": "Технічний рекрутер проводить співбесіду з кандидатом на позицію Middle Frontend Engineer у стартап.",
    "speakers": [
      {
        "name": "Interviewer (Robert)",
        "roleUk": "Технічний директор"
      },
      {
        "name": "Candidate (Alex)",
        "roleUk": "Кандидат"
      }
    ],
    "dialogue": [
      {
        "speaker": "Robert",
        "textEn": "Welcome Alex. Thank you for making time today. To start, could you walk us through your most challenging recent project?",
        "textUk": "Вітаю, Алексе. Дякую, що знайшли час. Для початку розкажіть про ваш найскладніший нещодавній проєкт?"
      },
      {
        "speaker": "Alex",
        "textEn": "Certainly. Over the past eight months, I spearheaded the complete redesign of our e-commerce checkout flow.",
        "textUk": "Звісно. Протягом останніх восьми місяців я очолював повний редизайн процесу оформлення замовлення на платформі."
      },
      {
        "speaker": "Robert",
        "textEn": "What specific technical hurdles did your engineering team encounter during this migration?",
        "textUk": "З якими конкретними технічними труднощами зіткнулася ваша інженерна команда під час міграції?"
      },
      {
        "speaker": "Alex",
        "textEn": "We had to maintain backward compatibility with legacy APIs while reducing initial page bundle size by forty percent.",
        "textUk": "Нам довелося підтримувати зворотну сумісність зі застарілими API, одночасно зменшивши розмір бандлу сторінки на 40%."
      },
      {
        "speaker": "Robert",
        "textEn": "Impressive metrics. And how do you personally handle constructive criticism during code reviews?",
        "textUk": "Вражаючі показники. А як ви особисто ставитеся до конструктивної критики під час код-ревʼю?"
      },
      {
        "speaker": "Alex",
        "textEn": "I treat code reviews as shared learning opportunities. If a peer suggests a cleaner architecture, I always welcome the feedback.",
        "textUk": "Я сприймаю код-ревʼю як спільне навчання. Якщо колега пропонує чистішу архітектуру, я завжди вітаю такий відгук."
      },
      {
        "speaker": "Robert",
        "textEn": "That collaborative mindset is precisely what we are seeking for our expanding core team.",
        "textUk": "Таке командне мислення — це саме те, що ми шукаємо для нашої основної команди, яка росте."
      }
    ],
    "fullAudioText": "Welcome Alex. Thank you for making time today. To start, could you walk us through your most challenging recent project? Certainly. Over the past eight months, I spearheaded the complete redesign of our e-commerce checkout flow. What specific technical hurdles did your engineering team encounter during this migration? We had to maintain backward compatibility with legacy APIs while reducing initial page bundle size by forty percent. Impressive metrics. And how do you personally handle constructive criticism during code reviews? I treat code reviews as shared learning opportunities. If a peer suggests a cleaner architecture, I always welcome the feedback. That collaborative mindset is precisely what we are seeking for our expanding core team.",
    "vocabulary": [
      {
        "word": "spearheaded",
        "transcription": "/ˈspɪə.hed.ɪd/",
        "translationUk": "очолював, ініціював",
        "contextSentence": "I spearheaded the complete redesign."
      },
      {
        "word": "technical hurdles",
        "transcription": "/ˈteknɪkəl ˈhɜːdlz/",
        "translationUk": "технічні перешкоди/виклики",
        "contextSentence": "What specific technical hurdles did you encounter?"
      },
      {
        "word": "backward compatibility",
        "transcription": "/ˌbækwəd kəmˌpætəˈbɪləti/",
        "translationUk": "зворотна сумісність",
        "contextSentence": "Maintain backward compatibility with legacy APIs."
      },
      {
        "word": "collaborative mindset",
        "transcription": "/kəˈlæbərətɪv ˈmaɪndset/",
        "translationUk": "командне налаштування мислення",
        "contextSentence": "That collaborative mindset is precisely what we need."
      }
    ],
    "exercises": [
      {
        "id": "b1-i-1",
        "type": "multiple_choice",
        "question": "How long did Alex's checkout flow project take?",
        "options": [
          "Eight months",
          "Three months",
          "Two years",
          "One month"
        ],
        "correctAnswer": "Eight months",
        "explanationUk": "Алекс каже: \"Over the past eight months\"."
      },
      {
        "id": "b1-i-2",
        "type": "multiple_choice",
        "question": "By what percentage did Alex's team reduce page bundle size?",
        "options": [
          "Forty percent (40%)",
          "Twenty percent (20%)",
          "Fifty percent (50%)",
          "Ten percent (10%)"
        ],
        "correctAnswer": "Forty percent (40%)",
        "explanationUk": "Він вказує: \"reducing initial page bundle size by forty percent\"."
      },
      {
        "id": "b1-i-3",
        "type": "multiple_choice",
        "question": "How does Alex view constructive criticism in code reviews?",
        "options": [
          "As shared learning opportunities",
          "As personal insults",
          "As a waste of engineering time",
          "As mandatory punishment"
        ],
        "correctAnswer": "As shared learning opportunities",
        "explanationUk": "Алекс відповідає: \"I treat code reviews as shared learning opportunities\"."
      },
      {
        "id": "b1-i-4",
        "type": "true_false",
        "question": "True or False: Alex refused to support legacy APIs in his project.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, команді довелося підтримувати зворотну сумісність (maintain backward compatibility)."
      },
      {
        "id": "b1-i-5",
        "type": "dictation",
        "question": "Впишіть почуте дієслово: \"I ___ the complete redesign.\"",
        "correctAnswer": "spearheaded",
        "audioSnippetText": "I spearheaded the complete redesign of our flow.",
        "explanationUk": "Слово: spearheaded."
      },
      {
        "id": "b1-i-6",
        "type": "dictation",
        "question": "Впишіть почутий вираз: \"maintain backward ___ with legacy APIs\"",
        "correctAnswer": "compatibility",
        "audioSnippetText": "maintain backward compatibility with legacy APIs",
        "explanationUk": "Слово: compatibility."
      },
      {
        "id": "b1-i-7",
        "type": "true_false",
        "question": "True or False: Robert likes Alex's collaborative mindset.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"That collaborative mindset is precisely what we are seeking\"."
      },
      {
        "id": "b1-i-8",
        "type": "multiple_choice",
        "question": "What part of the e-commerce system did Alex redesign?",
        "options": [
          "Checkout flow",
          "User login page",
          "Product image gallery",
          "Terms and conditions"
        ],
        "correctAnswer": "Checkout flow",
        "explanationUk": "Він сказав: \"redesign of our e-commerce checkout flow\"."
      },
      {
        "id": "b1-i-9",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"What specific technical ___ did your team encounter?\"",
        "correctAnswer": "hurdles",
        "audioSnippetText": "What specific technical hurdles did your team encounter?",
        "explanationUk": "Слово: hurdles."
      },
      {
        "id": "b1-i-10",
        "type": "true_false",
        "question": "True or False: The interview is for an entry-level intern position.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, кандидат очолював складний продакшн-редизайн."
      },
      {
        "id": "b1-i-11",
        "type": "multiple_choice",
        "question": "What role is Robert fulfilling in this dialogue?",
        "options": [
          "Technical director / Interviewer",
          "Customer",
          "Product manager",
          "Junior tester"
        ],
        "correctAnswer": "Technical director / Interviewer",
        "explanationUk": "Роберт проводить технічне інтервʼю."
      },
      {
        "id": "b1-i-12",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"That ___ mindset is precisely what we are seeking.\"",
        "correctAnswer": "collaborative",
        "audioSnippetText": "That collaborative mindset is precisely what we are seeking.",
        "explanationUk": "Слово: collaborative."
      }
    ]
  },
  {
    "id": "b1-listen-podcast",
    "level": "B1",
    "order": 2,
    "unitTitleUk": "Блок 1: Карʼєра та бізнес",
    "titleEn": "Podcast: Remote Work Trends & Digital Nomadism",
    "titleUk": "Подкаст: Тренди віддаленої роботи та життя цифрових кочівників",
    "accent": "American (US)",
    "preferredVoice": "Aoede",
    "durationEst": "2:30",
    "scenarioDescriptionUk": "Ведуча подкасту спілкується з експертом про перехід IT-спеціалістів на асинхронну віддалену комунікацію.",
    "speakers": [
      {
        "name": "Host (Elena)",
        "roleUk": "Ведуча подкасту"
      },
      {
        "name": "Guest (Marcus)",
        "roleUk": "Експерт з менеджменту"
      }
    ],
    "dialogue": [
      {
        "speaker": "Elena",
        "textEn": "Welcome back to Future Workforce. Today we are examining asynchronous collaboration and why modern teams abandon rigid nine-to-five hours.",
        "textUk": "Ласкаво просимо знову на Future Workforce. Сьогодні ми досліджуємо асинхронну співпрацю і чому сучасні команди відмовляються від жорсткого графіка з 9 до 17."
      },
      {
        "speaker": "Marcus",
        "textEn": "Thanks for having me, Elena. The fundamental shift is that productivity is no longer measured by physical seat time, but by deliverable impact.",
        "textUk": "Дякую за запрошення, Олено. Фундаментальне зрушення в тому, що продуктивність більше не вимірюється часом у кріслі, а відчутними результатами."
      },
      {
        "speaker": "Elena",
        "textEn": "Yet, many managers still fear losing control over distributed engineers across multiple time zones. How do high-performing companies overcome that?",
        "textUk": "Проте багато менеджерів усе ще бояться втратити контроль над розподіленими інженерами в різних часових поясах. Як успішні компанії долають це?"
      },
      {
        "speaker": "Marcus",
        "textEn": "By replacing spontaneous verbal meetings with thorough written documentation and clear pull-request guidelines.",
        "textUk": "Шляхом заміни спонтанних усних нарад ґрунтовною письмовою документацією та чіткими інструкціями до pull request."
      },
      {
        "speaker": "Elena",
        "textEn": "Fascinating. So deep work thrives when unnecessary interruptions are systematically removed.",
        "textUk": "Захоплююче. Тобто глибока концентрація процвітає тоді, коли зайві відволікання систематично усуваються."
      },
      {
        "speaker": "Marcus",
        "textEn": "Precisely. Autonomy breeds accountability when expectations are crystal clear from day one.",
        "textUk": "Саме так. Автономія породжує відповідальність, коли очікування кришталево зрозумілі з першого дня."
      }
    ],
    "fullAudioText": "Welcome back to Future Workforce. Today we are examining asynchronous collaboration and why modern teams abandon rigid nine-to-five hours. Thanks for having me, Elena. The fundamental shift is that productivity is no longer measured by physical seat time, but by deliverable impact. Yet, many managers still fear losing control over distributed engineers across multiple time zones. How do high-performing companies overcome that? By replacing spontaneous verbal meetings with thorough written documentation and clear pull-request guidelines. Fascinating. So deep work thrives when unnecessary interruptions are systematically removed. Precisely. Autonomy breeds accountability when expectations are crystal clear from day one.",
    "vocabulary": [
      {
        "word": "asynchronous",
        "transcription": "/eɪˈsɪŋ.krə.nəs/",
        "translationUk": "асинхронний",
        "contextSentence": "Asynchronous collaboration."
      },
      {
        "word": "deliverable impact",
        "transcription": "/dɪˈlɪv.ər.ə.bəl ˈɪm.pækt/",
        "translationUk": "відчутний практичний результат",
        "contextSentence": "Measured by deliverable impact."
      },
      {
        "word": "distributed engineers",
        "transcription": "/dɪˈstrɪb.juː.tɪd/",
        "translationUk": "інженери у віддалених локаціях",
        "contextSentence": "Distributed engineers across time zones."
      },
      {
        "word": "autonomy breeds accountability",
        "transcription": "/ɔːˈtɒn.ə.mi briːdz/",
        "translationUk": "автономія породжує відповідальність",
        "contextSentence": "Autonomy breeds accountability."
      }
    ],
    "exercises": [
      {
        "id": "b1-p-1",
        "type": "multiple_choice",
        "question": "How is modern developer productivity measured according to Marcus?",
        "options": [
          "By deliverable impact",
          "By physical seat time in office",
          "By number of sent emails",
          "By hours spent on calls"
        ],
        "correctAnswer": "By deliverable impact",
        "explanationUk": "Маркус каже: \"measured by deliverable impact\"."
      },
      {
        "id": "b1-p-2",
        "type": "multiple_choice",
        "question": "What do high-performing companies replace spontaneous meetings with?",
        "options": [
          "Thorough written documentation",
          "Longer daily video calls",
          "Overtime weekend shifts",
          "Mandatory office attendance"
        ],
        "correctAnswer": "Thorough written documentation",
        "explanationUk": "Маркус зазначає: \"replacing spontaneous verbal meetings with thorough written documentation\"."
      },
      {
        "id": "b1-p-3",
        "type": "true_false",
        "question": "True or False: According to Marcus, autonomy reduces employee responsibility.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, він стверджує: \"Autonomy breeds accountability\" (породжує відповідальність)."
      },
      {
        "id": "b1-p-4",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Today we are examining ___ collaboration.\"",
        "correctAnswer": "asynchronous",
        "audioSnippetText": "Today we are examining asynchronous collaboration.",
        "explanationUk": "Слово: asynchronous."
      },
      {
        "id": "b1-p-5",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Autonomy breeds ___ when expectations are clear.\"",
        "correctAnswer": "accountability",
        "audioSnippetText": "Autonomy breeds accountability when expectations are crystal clear.",
        "explanationUk": "Слово: accountability."
      },
      {
        "id": "b1-p-6",
        "type": "true_false",
        "question": "True or False: Deep work thrives when interruptions are removed.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"deep work thrives when unnecessary interruptions are systematically removed\"."
      },
      {
        "id": "b1-p-7",
        "type": "multiple_choice",
        "question": "What is the name of Elena's podcast?",
        "options": [
          "Future Workforce",
          "Tech Today",
          "Nomad Life",
          "Coding Daily"
        ],
        "correctAnswer": "Future Workforce",
        "explanationUk": "Олена каже: \"Welcome back to Future Workforce\"."
      },
      {
        "id": "b1-p-8",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"measured by deliverable ___\"",
        "correctAnswer": "impact",
        "audioSnippetText": "measured by deliverable impact",
        "explanationUk": "Слово: impact."
      },
      {
        "id": "b1-p-9",
        "type": "true_false",
        "question": "True or False: Marcus recommends daily 3-hour meetings for all teams.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, він радить замінювати зустрічі документацією."
      },
      {
        "id": "b1-p-10",
        "type": "multiple_choice",
        "question": "What fear do many traditional managers still face?",
        "options": [
          "Losing control over distributed workers",
          "Running out of office chairs",
          "Lack of coffee beans",
          "Too much documentation"
        ],
        "correctAnswer": "Losing control over distributed workers",
        "explanationUk": "Олена каже: \"fear losing control over distributed engineers\"."
      },
      {
        "id": "b1-p-11",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"when expectations are ___ clear\"",
        "correctAnswer": "crystal",
        "audioSnippetText": "when expectations are crystal clear from day one",
        "explanationUk": "Слово: crystal."
      },
      {
        "id": "b1-p-12",
        "type": "true_false",
        "question": "True or False: Elena agrees that interruptions hurt focus.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда, вона наголошує на важливості глибокої концентрації."
      }
    ]
  },
  {
    "id": "b1-listen-support",
    "level": "B1",
    "order": 3,
    "unitTitleUk": "Блок 2: Послуги та комунікація",
    "titleEn": "Airline Customer Service: Flight Rescheduling",
    "titleUk": "Авіаційна підтримка: Перенесення рейсу через конференцію",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:20",
    "scenarioDescriptionUk": "Пасажир звертається до британської авіалінії для перенесення зворотного рейсу через зміну розкладу конференції.",
    "speakers": [
      {
        "name": "Agent (Liam)",
        "roleUk": "Оператор авіакомпанії"
      },
      {
        "name": "Passenger (Chloe)",
        "roleUk": "Пасажирка"
      }
    ],
    "dialogue": [
      {
        "speaker": "Liam",
        "textEn": "Thank you for calling British Skyways customer service. My name is Liam. How may I assist you today?",
        "textUk": "Дякуємо за дзвінок до служби підтримки British Skyways. Мене звати Ліам. Чим можу допомогти?"
      },
      {
        "speaker": "Chloe",
        "textEn": "Hello Liam. I need to reschedule the return leg of my flight from London Heathrow to Frankfurt this Friday.",
        "textUk": "Добрий день, Ліаме. Мені потрібно перенести зворотний рейс із Лондона (Хітроу) до Франкфурта цієї пʼятниці."
      },
      {
        "speaker": "Liam",
        "textEn": "Could you please provide your six-character booking reference code and full passenger name?",
        "textUk": "Чи могли б ви надати ваш шестизначний код бронювання та повне імʼя пасажира?"
      },
      {
        "speaker": "Chloe",
        "textEn": "Yes, the booking code is Bravo-Tango-Seven-Nine-Kilo-X-ray, registered under Chloe Martin.",
        "textUk": "Так, код бронювання — BT79KX, зареєстрований на Хлою Мартін."
      },
      {
        "speaker": "Liam",
        "textEn": "Thank you Ms. Martin. Your original departure is at 2:15 PM. We have seats available on the evening flight at 7:30 PM.",
        "textUk": "Дякую, пані Мартін. Ваш початковий виліт о 14:15. У нас є вільні місця на вечірньому рейсі о 19:30."
      },
      {
        "speaker": "Chloe",
        "textEn": "7:30 PM works conveniently for my schedule. Is there any fare difference or change fee involved?",
        "textUk": "19:30 ідеально підходить для мого розкладу. Чи є доплата за зміну або різниця в тарифах?"
      },
      {
        "speaker": "Liam",
        "textEn": "Since you purchased a Flexible Business ticket, changes made forty-eight hours prior to departure are entirely free of charge.",
        "textUk": "Оскільки ви придбали квиток Flexible Business, зміни за 48 годин до вильоту абсолютно безкоштовні."
      }
    ],
    "fullAudioText": "Thank you for calling British Skyways customer service. My name is Liam. How may I assist you today? Hello Liam. I need to reschedule the return leg of my flight from London Heathrow to Frankfurt this Friday. Could you please provide your six-character booking reference code and full passenger name? Yes, the booking code is Bravo-Tango-Seven-Nine-Kilo-X-ray, registered under Chloe Martin. Thank you Ms. Martin. Your original departure is at 2:15 PM. We have seats available on the evening flight at 7:30 PM. 7:30 PM works conveniently for my schedule. Is there any fare difference or change fee involved? Since you purchased a Flexible Business ticket, changes made forty-eight hours prior to departure are entirely free of charge.",
    "vocabulary": [
      {
        "word": "reschedule",
        "transcription": "/ˌriːˈskedʒ.uːl/",
        "translationUk": "перенести за графіком",
        "contextSentence": "I need to reschedule the return leg."
      },
      {
        "word": "booking reference",
        "transcription": "/ˈbʊk.ɪŋ ˈref.ər.əns/",
        "translationUk": "код бронювання",
        "contextSentence": "Six-character booking reference code."
      },
      {
        "word": "prior to departure",
        "transcription": "/ˈpraɪ.ər/",
        "translationUk": "до вильоту",
        "contextSentence": "Forty-eight hours prior to departure."
      },
      {
        "word": "free of charge",
        "transcription": "/friː əv tʃɑːdʒ/",
        "translationUk": "безкоштовно",
        "contextSentence": "Are entirely free of charge."
      }
    ],
    "exercises": [
      {
        "id": "b1-s-1",
        "type": "multiple_choice",
        "question": "What is Chloe's flight destination?",
        "options": [
          "Frankfurt",
          "Paris",
          "Berlin",
          "Madrid"
        ],
        "correctAnswer": "Frankfurt",
        "explanationUk": "Вона летить: \"from London Heathrow to Frankfurt\"."
      },
      {
        "id": "b1-s-2",
        "type": "multiple_choice",
        "question": "What was Chloe's original departure time?",
        "options": [
          "2:15 PM",
          "7:30 PM",
          "10:00 AM",
          "12:00 PM"
        ],
        "correctAnswer": "2:15 PM",
        "explanationUk": "Ліам каже: \"Your original departure is at 2:15 PM\"."
      },
      {
        "id": "b1-s-3",
        "type": "multiple_choice",
        "question": "What new flight time does Chloe choose?",
        "options": [
          "7:30 PM",
          "6:00 PM",
          "9:15 PM",
          "Next Monday"
        ],
        "correctAnswer": "7:30 PM",
        "explanationUk": "Вона підтверджує: \"7:30 PM works conveniently for my schedule\"."
      },
      {
        "id": "b1-s-4",
        "type": "multiple_choice",
        "question": "Why does Chloe NOT have to pay any change fee?",
        "options": [
          "She has a Flexible Business ticket",
          "The airline made an error",
          "She used promo points",
          "The flight was delayed"
        ],
        "correctAnswer": "She has a Flexible Business ticket",
        "explanationUk": "Ліам пояснює: \"Since you purchased a Flexible Business ticket... free of charge\"."
      },
      {
        "id": "b1-s-5",
        "type": "true_false",
        "question": "True or False: Chloe had to pay £100 penalty fee.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, перенесення безкоштовне."
      },
      {
        "id": "b1-s-6",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"I need to ___ the return leg of my flight.\"",
        "correctAnswer": "reschedule",
        "audioSnippetText": "I need to reschedule the return leg of my flight.",
        "explanationUk": "Слово: reschedule."
      },
      {
        "id": "b1-s-7",
        "type": "dictation",
        "question": "Впишіть почуту фразу: \"are entirely free of ___\"",
        "correctAnswer": "charge",
        "audioSnippetText": "are entirely free of charge",
        "explanationUk": "Слово: charge."
      },
      {
        "id": "b1-s-8",
        "type": "true_false",
        "question": "True or False: The booking code is BT79KX.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: Bravo-Tango-Seven-Nine-Kilo-X-ray."
      },
      {
        "id": "b1-s-9",
        "type": "multiple_choice",
        "question": "From which London airport does the flight originate?",
        "options": [
          "Heathrow",
          "Gatwick",
          "Stansted",
          "Luton"
        ],
        "correctAnswer": "Heathrow",
        "explanationUk": "Вона вказує: \"from London Heathrow\"."
      },
      {
        "id": "b1-s-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"Six-character booking ___ code\"",
        "correctAnswer": "reference",
        "audioSnippetText": "Six-character booking reference code",
        "explanationUk": "Слово: reference."
      },
      {
        "id": "b1-s-11",
        "type": "true_false",
        "question": "True or False: The changes must be made within 48 hours of departure.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"forty-eight hours prior to departure\"."
      },
      {
        "id": "b1-s-12",
        "type": "multiple_choice",
        "question": "What is the airline company named?",
        "options": [
          "British Skyways",
          "Royal Air",
          "London Wings",
          "FlyGlobal"
        ],
        "correctAnswer": "British Skyways",
        "explanationUk": "Оператор вітає: \"Thank you for calling British Skyways\"."
      }
    ]
  },
  {
    "id": "b1-listen-flat",
    "level": "B1",
    "order": 4,
    "unitTitleUk": "Блок 2: Послуги та комунікація",
    "titleEn": "Apartment Viewing & Lease Agreement",
    "titleUk": "Оренда житла: Огляд квартири та умови оренди",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:15",
    "scenarioDescriptionUk": "Орендар оглядає двокімнатну квартиру в Манчестері та уточнює розмір застави, комунальні платежі й термін контракту.",
    "speakers": [
      {
        "name": "Landlord (Arthur)",
        "roleUk": "Власник квартири"
      },
      {
        "name": "Tenant (Sophie)",
        "roleUk": "Потенційна орендарка"
      }
    ],
    "dialogue": [
      {
        "speaker": "Arthur",
        "textEn": "Welcome inside Sophie. As you can see, this two-bedroom flat was thoroughly renovated last winter with double-glazed windows.",
        "textUk": "Ласкаво прошу всередину, Софі. Як бачите, цю двокімнатну квартиру повністю відремонтували минулої зими зі склопакетами."
      },
      {
        "speaker": "Sophie",
        "textEn": "It feels remarkably bright and spacious! Does the monthly rent include utilities like heating and high-speed internet?",
        "textUk": "Вона здається дуже світлою та просторою! Чи включає щомісячна оренда комунальні послуги, такі як опалення та інтернет?"
      },
      {
        "speaker": "Arthur",
        "textEn": "Council tax and water rates are included in the nine hundred and fifty pounds monthly rent. Electricity and gas are billed separately.",
        "textUk": "Муніципальний податок і вода включені в 950 фунтів орендної плати. Електрика та газ оплачуються окремо за лічильником."
      },
      {
        "speaker": "Sophie",
        "textEn": "That sounds completely reasonable. What is the required security deposit, and what is the minimum lease period?",
        "textUk": "Звучить абсолютно розумно. Який розмір застави і який мінімальний термін договору?"
      },
      {
        "speaker": "Arthur",
        "textEn": "We require five weeks of deposit held in a government tenancy protection scheme. The standard lease duration is twelve months.",
        "textUk": "Ми вимагаємо заставу за 5 тижнів, яка зберігається в державній системі захисту депозитів. Стандартний термін — 12 місяців."
      },
      {
        "speaker": "Sophie",
        "textEn": "Splendid. I would love to submit my references and secure this tenancy starting next month.",
        "textUk": "Чудово. Я б хотіла надати рекомендації та оформити оренду з наступного місяця."
      }
    ],
    "fullAudioText": "Welcome inside Sophie. As you can see, this two-bedroom flat was thoroughly renovated last winter with double-glazed windows. It feels remarkably bright and spacious! Does the monthly rent include utilities like heating and high-speed internet? Council tax and water rates are included in the nine hundred and fifty pounds monthly rent. Electricity and gas are billed separately. That sounds completely reasonable. What is the required security deposit, and what is the minimum lease period? We require five weeks of deposit held in a government tenancy protection scheme. The standard lease duration is twelve months. Splendid. I would love to submit my references and secure this tenancy starting next month.",
    "vocabulary": [
      {
        "word": "double-glazed",
        "transcription": "/ˌdʌb.əlˈɡleɪzd/",
        "translationUk": "зі склопакетами",
        "contextSentence": "Renovated with double-glazed windows."
      },
      {
        "word": "council tax",
        "transcription": "/ˈkaʊn.səl tæks/",
        "translationUk": "муніципальний місцевий податок",
        "contextSentence": "Council tax and water rates are included."
      },
      {
        "word": "security deposit",
        "transcription": "/sɪˈkjʊə.rə.ti dɪˌpɒz.ɪt/",
        "translationUk": "гарантійна застава",
        "contextSentence": "What is the required security deposit?"
      },
      {
        "word": "tenancy protection",
        "transcription": "/ˈten.ən.si/",
        "translationUk": "державний захист прав орендаря",
        "contextSentence": "Government tenancy protection scheme."
      }
    ],
    "exercises": [
      {
        "id": "b1-f-1",
        "type": "multiple_choice",
        "question": "How much is the monthly rent for the flat?",
        "options": [
          "£950",
          "£850",
          "£1,100",
          "£750"
        ],
        "correctAnswer": "£950",
        "explanationUk": "Артур каже: \"nine hundred and fifty pounds monthly rent\"."
      },
      {
        "id": "b1-f-2",
        "type": "multiple_choice",
        "question": "Which utilities are already included in the rent?",
        "options": [
          "Council tax and water",
          "Electricity and gas",
          "All utilities including heating",
          "Only internet"
        ],
        "correctAnswer": "Council tax and water",
        "explanationUk": "Артур зазначає: \"Council tax and water rates are included\"."
      },
      {
        "id": "b1-f-3",
        "type": "multiple_choice",
        "question": "How large is the security deposit?",
        "options": [
          "Five weeks of rent",
          "One month of rent",
          "Three months of rent",
          "No deposit required"
        ],
        "correctAnswer": "Five weeks of rent",
        "explanationUk": "Він вказує: \"We require five weeks of deposit\"."
      },
      {
        "id": "b1-f-4",
        "type": "multiple_choice",
        "question": "What is the standard duration of the lease agreement?",
        "options": [
          "Twelve months",
          "Six months",
          "Two years",
          "Three months"
        ],
        "correctAnswer": "Twelve months",
        "explanationUk": "Артур каже: \"The standard lease duration is twelve months\"."
      },
      {
        "id": "b1-f-5",
        "type": "true_false",
        "question": "True or False: Electricity and gas are included in the rent.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда: \"Electricity and gas are billed separately\"."
      },
      {
        "id": "b1-f-6",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"What is the required security ___?\"",
        "correctAnswer": "deposit",
        "audioSnippetText": "What is the required security deposit?",
        "explanationUk": "Слово: deposit."
      },
      {
        "id": "b1-f-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"renovated last winter with double-___ windows\"",
        "correctAnswer": "glazed",
        "audioSnippetText": "with double-glazed windows",
        "explanationUk": "Слово: glazed."
      },
      {
        "id": "b1-f-8",
        "type": "true_false",
        "question": "True or False: The deposit is protected by a government scheme.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"held in a government tenancy protection scheme\"."
      },
      {
        "id": "b1-f-9",
        "type": "multiple_choice",
        "question": "How many bedrooms does the flat have?",
        "options": [
          "Two bedrooms",
          "One bedroom",
          "Three bedrooms",
          "Studio"
        ],
        "correctAnswer": "Two bedrooms",
        "explanationUk": "Артур сказав: \"this two-bedroom flat\"."
      },
      {
        "id": "b1-f-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"submit my ___ and secure this tenancy\"",
        "correctAnswer": "references",
        "audioSnippetText": "submit my references and secure this tenancy",
        "explanationUk": "Слово: references."
      },
      {
        "id": "b1-f-11",
        "type": "true_false",
        "question": "True or False: Sophie decides not to rent the flat.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, Софі хоче подати документи."
      },
      {
        "id": "b1-f-12",
        "type": "multiple_choice",
        "question": "When does Sophie intend to start her tenancy?",
        "options": [
          "Starting next month",
          "Next year",
          "Immediately today",
          "In three months"
        ],
        "correctAnswer": "Starting next month",
        "explanationUk": "Вона сказала: \"secure this tenancy starting next month\"."
      }
    ]
  },
  {
    "id": "b2-listen-strategy",
    "level": "B2",
    "order": 1,
    "unitTitleUk": "Блок 1: Стратегія та аналітика",
    "titleEn": "Quarterly Corporate Strategy Meeting",
    "titleUk": "Квартальна стратегічна нарада: Утримання користувачів",
    "accent": "American (US)",
    "preferredVoice": "Charon",
    "durationEst": "2:40",
    "scenarioDescriptionUk": "Віце-президент з продукту обговорює з керівниками напрямків спад метрик утримання клієнтів та перерозподіл бюджету.",
    "speakers": [
      {
        "name": "VP Product (Victoria)",
        "roleUk": "Віце-президентка"
      },
      {
        "name": "Lead Analyst (Jonathan)",
        "roleUk": "Провідний аналітик"
      }
    ],
    "dialogue": [
      {
        "speaker": "Victoria",
        "textEn": "Let us dive into the Q3 performance metrics. Jonathan, the retention numbers in Europe show an unexpected four percent dip.",
        "textUk": "Перейдімо до показників за 3-й квартал. Джонатане, показники утримання в Європі демонструють неочікуване падіння на 4%."
      },
      {
        "speaker": "Jonathan",
        "textEn": "Indeed Victoria. Our cohort analysis indicates that onboarding friction in the mobile app accounts for sixty percent of drop-offs during week two.",
        "textUk": "Дійсно, Вікторіє. Наш когортний аналіз вказує на те, що тертя при онбордингу в додатку спричиняє 60% відтоку користувачів на 2-му тижні."
      },
      {
        "speaker": "Victoria",
        "textEn": "That is unacceptable given our aggressive expansion targets. Have we evaluated simplifying authentication with biometrics?",
        "textUk": "Це неприйнятно з огляду на наші агресивні цілі розширення. Чи оцінювали ми спрощення автентифікації за біометрією?"
      },
      {
        "speaker": "Jonathan",
        "textEn": "Yes, engineering estimated that implementing biometric FaceID and streamlining identity verification will take three two-week sprints.",
        "textUk": "Так, розробники оцінили, що впровадження FaceID та оптимізація верифікації займе 3 двотижневих спринти."
      },
      {
        "speaker": "Victoria",
        "textEn": "Let us greenlight that immediately. We cannot afford churn when acquisition costs have escalated by twenty-five percent.",
        "textUk": "Давайте негайно дамо зелене світло. Ми не можемо дозволити собі відтік клієнтів, коли вартість залучення зросла на 25%."
      },
      {
        "speaker": "Jonathan",
        "textEn": "Understood. I will coordinate with product design and prepare an updated roadmap for Friday's executive committee.",
        "textUk": "Зрозуміло. Я скоординуюся з відділом дизайну та підготую оновлену дорожню карту до виконкому в пʼятницю."
      }
    ],
    "fullAudioText": "Let us dive into the Q3 performance metrics. Jonathan, the retention numbers in Europe show an unexpected four percent dip. Indeed Victoria. Our cohort analysis indicates that onboarding friction in the mobile app accounts for sixty percent of drop-offs during week two. That is unacceptable given our aggressive expansion targets. Have we evaluated simplifying authentication with biometrics? Yes, engineering estimated that implementing biometric FaceID and streamlining identity verification will take three two-week sprints. Let us greenlight that immediately. We cannot afford churn when acquisition costs have escalated by twenty-five percent. Understood. I will coordinate with product design and prepare an updated roadmap for Friday's executive committee.",
    "vocabulary": [
      {
        "word": "retention numbers",
        "transcription": "/rɪˈten.ʃən/",
        "translationUk": "показники утримання користувачів",
        "contextSentence": "Retention numbers show a dip."
      },
      {
        "word": "cohort analysis",
        "transcription": "/ˈkəʊ.hɔːt/",
        "translationUk": "когортний аналіз",
        "contextSentence": "Our cohort analysis indicates onboarding friction."
      },
      {
        "word": "onboarding friction",
        "transcription": "/ˈɒn.bɔː.dɪŋ ˈfrɪk.ʃən/",
        "translationUk": "труднощі/тертя при знайомстві з продуктом",
        "contextSentence": "Friction in the mobile app."
      },
      {
        "word": "greenlight",
        "transcription": "/ˈɡriːn.laɪt/",
        "translationUk": "схвалити, дати зелене світло",
        "contextSentence": "Let us greenlight that immediately."
      },
      {
        "word": "customer churn",
        "transcription": "/tʃɜːn/",
        "translationUk": "відтік клієнтів",
        "contextSentence": "We cannot afford churn."
      }
    ],
    "exercises": [
      {
        "id": "b2-s-1",
        "type": "multiple_choice",
        "question": "By what percentage did retention dip in Europe during Q3?",
        "options": [
          "Four percent (4%)",
          "Ten percent (10%)",
          "Two percent (2%)",
          "Eight percent (8%)"
        ],
        "correctAnswer": "Four percent (4%)",
        "explanationUk": "Вікторія зазначає: \"an unexpected four percent dip\"."
      },
      {
        "id": "b2-s-2",
        "type": "multiple_choice",
        "question": "What primary cause of user drop-offs did the cohort analysis reveal?",
        "options": [
          "Onboarding friction in the mobile app",
          "Server downtime",
          "High subscription prices",
          "Lack of social sharing"
        ],
        "correctAnswer": "Onboarding friction in the mobile app",
        "explanationUk": "Джонатан пояснює: \"onboarding friction in the mobile app accounts for sixty percent\"."
      },
      {
        "id": "b2-s-3",
        "type": "multiple_choice",
        "question": "How long will engineering take to implement the biometric solution?",
        "options": [
          "Three two-week sprints (6 weeks)",
          "One year",
          "One weekend",
          "Two months and a half"
        ],
        "correctAnswer": "Three two-week sprints (6 weeks)",
        "explanationUk": "Він вказує: \"three two-week sprints\"."
      },
      {
        "id": "b2-s-4",
        "type": "multiple_choice",
        "question": "By what percentage have customer acquisition costs escalated?",
        "options": [
          "Twenty-five percent (25%)",
          "Fifteen percent (15%)",
          "Fifty percent (50%)",
          "Ten percent (10%)"
        ],
        "correctAnswer": "Twenty-five percent (25%)",
        "explanationUk": "Вона наголошує: \"when acquisition costs have escalated by twenty-five percent\"."
      },
      {
        "id": "b2-s-5",
        "type": "true_false",
        "question": "True or False: Victoria delayed the project until next quarter.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона наказала дати зелене світло негайно (greenlight immediately)."
      },
      {
        "id": "b2-s-6",
        "type": "dictation",
        "question": "Впишіть ідіоматичне дієслово: \"Let us ___ that immediately.\"",
        "correctAnswer": "greenlight",
        "audioSnippetText": "Let us greenlight that immediately.",
        "explanationUk": "Слово: greenlight."
      },
      {
        "id": "b2-s-7",
        "type": "dictation",
        "question": "Впишіть термін: \"We cannot afford ___ when acquisition costs rise.\"",
        "correctAnswer": "churn",
        "audioSnippetText": "We cannot afford churn when acquisition costs have escalated.",
        "explanationUk": "Слово: churn."
      },
      {
        "id": "b2-s-8",
        "type": "true_false",
        "question": "True or False: The drop-offs mostly happen during week two.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"accounts for sixty percent of drop-offs during week two\"."
      },
      {
        "id": "b2-s-9",
        "type": "multiple_choice",
        "question": "When is the executive committee meeting taking place?",
        "options": [
          "On Friday",
          "Next Monday",
          "Tomorrow morning",
          "In two weeks"
        ],
        "correctAnswer": "On Friday",
        "explanationUk": "Джонатан каже: \"for Friday's executive committee\"."
      },
      {
        "id": "b2-s-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"Our ___ analysis indicates onboarding friction\"",
        "correctAnswer": "cohort",
        "audioSnippetText": "Our cohort analysis indicates onboarding friction",
        "explanationUk": "Слово: cohort."
      },
      {
        "id": "b2-s-11",
        "type": "true_false",
        "question": "True or False: Customer acquisition costs decreased in Q3.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вони зросли на 25% (escalated by 25%)."
      },
      {
        "id": "b2-s-12",
        "type": "multiple_choice",
        "question": "What specific biometric feature did Jonathan propose?",
        "options": [
          "FaceID and identity verification",
          "Voice recognition only",
          "Retina scan in office",
          "Fingerprint card only"
        ],
        "correctAnswer": "FaceID and identity verification",
        "explanationUk": "Він сказав: \"biometric FaceID and streamlining identity verification\"."
      }
    ]
  },
  {
    "id": "b2-listen-lecture",
    "level": "B2",
    "order": 2,
    "unitTitleUk": "Блок 1: Стратегія та аналітика",
    "titleEn": "University Lecture: Behavioral Economics & Decisions",
    "titleUk": "Академічна лекція: Поведінкова економіка та евристики",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:35",
    "scenarioDescriptionUk": "Професор Оксфордського університету читає лекцію про когнітивні упередження, ефект якоря та уникнення втрат.",
    "speakers": [
      {
        "name": "Professor Vance",
        "roleUk": "Професор економіки"
      }
    ],
    "dialogue": [
      {
        "speaker": "Prof. Vance",
        "textEn": "Classical economic theory long posited that human beings act as entirely rational profit-maximizing agents.",
        "textUk": "Класична економічна теорія довго стверджувала, що люди діють як абсолютно раціональні агенти, що максимізують прибуток."
      },
      {
        "speaker": "Prof. Vance",
        "textEn": "However, empirical behavioral research initiated by Kahneman and Tversky dismantled this foundational assumption.",
        "textUk": "Проте емпіричні поведінкові дослідження Канемана і Тверські зруйнували це фундаментальне припущення."
      },
      {
        "speaker": "Prof. Vance",
        "textEn": "Consider loss aversion: psychologically, the pain of losing one hundred dollars is proven to be twice as intense as the joy of gaining the same sum.",
        "textUk": "Зверніть увагу на уникнення втрат: психологічно біль від втрати 100 доларів удвічі сильніший за радість від отримання тієї ж суми."
      },
      {
        "speaker": "Prof. Vance",
        "textEn": "Furthermore, the anchoring effect demonstrates how an arbitrary initial number heavily distorts subsequent quantitative estimates.",
        "textUk": "Крім того, ефект якоря демонструє, як довільне початкове число суттєво спотворює подальші кількісні оцінки."
      },
      {
        "speaker": "Prof. Vance",
        "textEn": "When retailers display an exaggerated original price next to a discounted figure, consumers subconsciously anchor to the higher benchmark.",
        "textUk": "Коли ритейлери показують завищену початкову ціну біля знижки, покупці підсвідомо привʼязуються до вищого орієнтира."
      }
    ],
    "fullAudioText": "Classical economic theory long posited that human beings act as entirely rational profit-maximizing agents. However, empirical behavioral research initiated by Kahneman and Tversky dismantled this foundational assumption. Consider loss aversion: psychologically, the pain of losing one hundred dollars is proven to be twice as intense as the joy of gaining the same sum. Furthermore, the anchoring effect demonstrates how an arbitrary initial number heavily distorts subsequent quantitative estimates. When retailers display an exaggerated original price next to a discounted figure, consumers subconsciously anchor to the higher benchmark.",
    "vocabulary": [
      {
        "word": "posited",
        "transcription": "/ˈpɒz.ɪ.tɪd/",
        "translationUk": "постулювала, стверджувала",
        "contextSentence": "Classical theory long posited rational agents."
      },
      {
        "word": "loss aversion",
        "transcription": "/lɒs əˈvɜː.ʃən/",
        "translationUk": "уникнення втрат",
        "contextSentence": "Consider loss aversion psychologically."
      },
      {
        "word": "anchoring effect",
        "transcription": "/ˈæŋ.kər.ɪŋ/",
        "translationUk": "ефект якоря (когнітивне упередження)",
        "contextSentence": "The anchoring effect demonstrates distortion."
      },
      {
        "word": "benchmark",
        "transcription": "/ˈbentʃ.mɑːk/",
        "translationUk": "орієнтир, точка відліку",
        "contextSentence": "Subconsciously anchor to the higher benchmark."
      }
    ],
    "exercises": [
      {
        "id": "b2-l-1",
        "type": "multiple_choice",
        "question": "What did classical economic theory assume about humans?",
        "options": [
          "They are entirely rational profit-maximizing agents",
          "They always act emotionally and randomly",
          "They avoid money at all costs",
          "They never make financial transactions"
        ],
        "correctAnswer": "They are entirely rational profit-maximizing agents",
        "explanationUk": "Професор каже: \"posited that human beings act as entirely rational profit-maximizing agents\"."
      },
      {
        "id": "b2-l-2",
        "type": "multiple_choice",
        "question": "According to loss aversion, how much more intense is the pain of losing money compared to gaining it?",
        "options": [
          "Twice as intense (2x)",
          "Three times as intense",
          "Equally intense",
          "Ten times less intense"
        ],
        "correctAnswer": "Twice as intense (2x)",
        "explanationUk": "Він вказує: \"twice as intense as the joy of gaining the same sum\"."
      },
      {
        "id": "b2-l-3",
        "type": "multiple_choice",
        "question": "How do retail stores exploit the anchoring effect?",
        "options": [
          "By displaying an exaggerated original price next to discounts",
          "By giving away all products for free",
          "By turning off music in stores",
          "By hiding all price tags completely"
        ],
        "correctAnswer": "By displaying an exaggerated original price next to discounts",
        "explanationUk": "Він пояснює: \"When retailers display an exaggerated original price next to a discounted figure\"."
      },
      {
        "id": "b2-l-4",
        "type": "true_false",
        "question": "True or False: Kahneman and Tversky supported the classical rationality model.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вони зруйнували цю теорію (dismantled this foundational assumption)."
      },
      {
        "id": "b2-l-5",
        "type": "dictation",
        "question": "Впишіть термін: \"Consider loss ___ in behavioral psychology.\"",
        "correctAnswer": "aversion",
        "audioSnippetText": "Consider loss aversion: psychologically the pain of losing",
        "explanationUk": "Слово: aversion."
      },
      {
        "id": "b2-l-6",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"Furthermore the ___ effect demonstrates distortion\"",
        "correctAnswer": "anchoring",
        "audioSnippetText": "Furthermore, the anchoring effect demonstrates how an arbitrary initial number",
        "explanationUk": "Слово: anchoring."
      },
      {
        "id": "b2-l-7",
        "type": "true_false",
        "question": "True or False: An arbitrary initial number can distort subsequent estimates.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"arbitrary initial number heavily distorts subsequent quantitative estimates\"."
      },
      {
        "id": "b2-l-8",
        "type": "multiple_choice",
        "question": "What psychologists initiated the empirical behavioral research mentioned?",
        "options": [
          "Kahneman and Tversky",
          "Freud and Jung",
          "Pavlov and Skinner",
          "Watson and Crick"
        ],
        "correctAnswer": "Kahneman and Tversky",
        "explanationUk": "Лектор назвав: \"Kahneman and Tversky\"."
      },
      {
        "id": "b2-l-9",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"anchor to the higher ___\"",
        "correctAnswer": "benchmark",
        "audioSnippetText": "anchor to the higher benchmark",
        "explanationUk": "Слово: benchmark."
      },
      {
        "id": "b2-l-10",
        "type": "true_false",
        "question": "True or False: Humans feel more joy when gaining $100 than pain when losing $100.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, біль від втрати удвічі сильніший."
      },
      {
        "id": "b2-l-11",
        "type": "multiple_choice",
        "question": "What word describes the evidence collected by Kahneman and Tversky?",
        "options": [
          "Empirical",
          "Theoretical only",
          "Fictional",
          "Anecdotal"
        ],
        "correctAnswer": "Empirical",
        "explanationUk": "Професор сказав: \"empirical behavioral research\"."
      },
      {
        "id": "b2-l-12",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"dismantled this foundational ___\"",
        "correctAnswer": "assumption",
        "audioSnippetText": "dismantled this foundational assumption",
        "explanationUk": "Слово: assumption."
      }
    ]
  },
  {
    "id": "c1-listen-keynote",
    "level": "C1",
    "order": 1,
    "unitTitleUk": "Блок 1: Високі дебати та риторика",
    "titleEn": "Keynote Address: Algorithmic Governance & Moral Agency",
    "titleUk": "Пленарна доповідь: Алгоритмічне врядування та моральна відповідальність",
    "accent": "American (US)",
    "preferredVoice": "Puck",
    "durationEst": "2:50",
    "scenarioDescriptionUk": "Філософ і дослідник ШІ виступає на міжнародному симпозіумі щодо меж відповідальності автономних агентів та етичного регулювання.",
    "speakers": [
      {
        "name": "Dr. Sterling",
        "roleUk": "Дослідник штучного інтелекту"
      }
    ],
    "dialogue": [
      {
        "speaker": "Dr. Sterling",
        "textEn": "Distinguished colleagues, we stand at a precipice where autonomous mathematical optimization intersects with irreducible human rights.",
        "textUk": "Шановні колеги, ми стоїмо перед прірвою, де автономна математична оптимізація перетинається з невіддільними правами людини."
      },
      {
        "speaker": "Dr. Sterling",
        "textEn": "The pervasive fallacy of our era is attributing moral culpability to algorithmic systems while obfuscating human institutional accountability.",
        "textUk": "Повсюдна омана нашої епохи полягає в приписуванні моральної вини алгоритмічним системам, одночасно затуманюючи відповідальність людських інституцій."
      },
      {
        "speaker": "Dr. Sterling",
        "textEn": "Under no circumstances should the veneer of machine objectivity excuse policymakers from scrutinizing systemic training biases.",
        "textUk": "За жодних обставин фасад машинної обʼєктивності не повинен звільняти регуляторів від ретельного вивчення системних упереджень у даних."
      },
      {
        "speaker": "Dr. Sterling",
        "textEn": "What we require is not perfunctory compliance checklists, but auditable epistemological transparency embedded in every pipeline.",
        "textUk": "Те, що нам потрібно — це не формальні контрольні списки відповідності, а перевірювана гносеологічна прозорість у кожному пайплайні."
      },
      {
        "speaker": "Dr. Sterling",
        "textEn": "Only when stewardship supersedes unfettered velocity will artificial intelligence genuinely augment human flourishing.",
        "textUk": "Лише тоді, коли відповідальне управління переважатиме над нестримною швидкістю, штучний інтелект по-справжньому сприятиме розквіту людства."
      }
    ],
    "fullAudioText": "Distinguished colleagues, we stand at a precipice where autonomous mathematical optimization intersects with irreducible human rights. The pervasive fallacy of our era is attributing moral culpability to algorithmic systems while obfuscating human institutional accountability. Under no circumstances should the veneer of machine objectivity excuse policymakers from scrutinizing systemic training biases. What we require is not perfunctory compliance checklists, but auditable epistemological transparency embedded in every pipeline. Only when stewardship supersedes unfettered velocity will artificial intelligence genuinely augment human flourishing.",
    "vocabulary": [
      {
        "word": "precipice",
        "transcription": "/ˈpres.ɪ.pɪs/",
        "translationUk": "прірва, край обриву",
        "contextSentence": "We stand at a precipice."
      },
      {
        "word": "moral culpability",
        "transcription": "/kʌl.pəˈbɪl.ə.ti/",
        "translationUk": "моральна провина/відповідальність",
        "contextSentence": "Attributing moral culpability to algorithmic systems."
      },
      {
        "word": "obfuscating",
        "transcription": "/ˈɒb.fʌs.keɪ.tɪŋ/",
        "translationUk": "затуманювати, маскувати",
        "contextSentence": "Obfuscating human accountability."
      },
      {
        "word": "perfunctory",
        "transcription": "/pəˈfʌŋk.tər.i/",
        "translationUk": "поверховий, суто формальний",
        "contextSentence": "Not perfunctory compliance checklists."
      },
      {
        "word": "stewardship",
        "transcription": "/ˈstjuː.əd.ʃɪp/",
        "translationUk": "відповідальне керування, кураторство",
        "contextSentence": "When stewardship supersedes unfettered velocity."
      }
    ],
    "exercises": [
      {
        "id": "c1-k-1",
        "type": "multiple_choice",
        "question": "What pervasive fallacy of the modern era does Dr. Sterling highlight?",
        "options": [
          "Attributing moral guilt to algorithms while hiding institutional responsibility",
          "Believing machines cannot compute numbers",
          "Thinking AI will cure all human illnesses",
          "Refusing to use smartphones"
        ],
        "correctAnswer": "Attributing moral guilt to algorithms while hiding institutional responsibility",
        "explanationUk": "Доповідач наголошує: \"attributing moral culpability to algorithmic systems while obfuscating human institutional accountability\"."
      },
      {
        "id": "c1-k-2",
        "type": "multiple_choice",
        "question": "What does Dr. Sterling state about the veneer of machine objectivity?",
        "options": [
          "It should under no circumstances excuse scrutiny of training biases",
          "It guarantees perfect scientific fairness",
          "It makes human audits redundant",
          "It eliminates all bias forever"
        ],
        "correctAnswer": "It should under no circumstances excuse scrutiny of training biases",
        "explanationUk": "Він стверджує: \"Under no circumstances should the veneer of machine objectivity excuse policymakers from scrutinizing systemic training biases\"."
      },
      {
        "id": "c1-k-3",
        "type": "multiple_choice",
        "question": "Instead of perfunctory checklists, what should be embedded in every pipeline?",
        "options": [
          "Auditable epistemological transparency",
          "Secret encrypted passwords",
          "Unrestricted automated speed",
          "Complete unregulated freedom"
        ],
        "correctAnswer": "Auditable epistemological transparency",
        "explanationUk": "Він закликає: \"auditable epistemological transparency embedded in every pipeline\"."
      },
      {
        "id": "c1-k-4",
        "type": "true_false",
        "question": "True or False: Dr. Sterling recommends prioritizing unregulated velocity over stewardship.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда: він закликає, щоб відповідальне кураторство переважало над швидкістю (stewardship supersedes unfettered velocity)."
      },
      {
        "id": "c1-k-5",
        "type": "dictation",
        "question": "Впишіть C1 прикметник: \"What we require is not ___ compliance checklists.\"",
        "correctAnswer": "perfunctory",
        "audioSnippetText": "What we require is not perfunctory compliance checklists",
        "explanationUk": "Слово: perfunctory."
      },
      {
        "id": "c1-k-6",
        "type": "dictation",
        "question": "Впишіть іменник: \"Only when ___ supersedes unfettered velocity\"",
        "correctAnswer": "stewardship",
        "audioSnippetText": "Only when stewardship supersedes unfettered velocity",
        "explanationUk": "Слово: stewardship."
      },
      {
        "id": "c1-k-7",
        "type": "true_false",
        "question": "True or False: The speaker uses negative inversion (\"Under no circumstances should...\").",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"Under no circumstances should the veneer of machine objectivity excuse...\"."
      },
      {
        "id": "c1-k-8",
        "type": "multiple_choice",
        "question": "What rhetorical device is utilized in \"What we require is not...\"?",
        "options": [
          "Wh-cleft sentence",
          "Simple passive voice",
          "Litotes",
          "Metonymy only"
        ],
        "correctAnswer": "Wh-cleft sentence",
        "explanationUk": "Речення \"What we require is...\" є класичним прикладом What-cleft структури."
      },
      {
        "id": "c1-k-9",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"attributing moral ___ to algorithms\"",
        "correctAnswer": "culpability",
        "audioSnippetText": "attributing moral culpability to algorithmic systems",
        "explanationUk": "Слово: culpability."
      },
      {
        "id": "c1-k-10",
        "type": "true_false",
        "question": "True or False: Dr. Sterling argues that machine algorithms are already completely objective.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, він називає машинну обʼєктивність оманливим фасадом (veneer)."
      },
      {
        "id": "c1-k-11",
        "type": "multiple_choice",
        "question": "What does \"unfettered velocity\" mean in this context?",
        "options": [
          "Uncontrolled and reckless rapid development",
          "Slow deliberate research",
          "High-speed internet cables",
          "Physical vehicle acceleration"
        ],
        "correctAnswer": "Uncontrolled and reckless rapid development",
        "explanationUk": "Unfettered velocity означає нестримну, нічим не стримувану швидкість."
      },
      {
        "id": "c1-k-12",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"while ___ human institutional accountability\"",
        "correctAnswer": "obfuscating",
        "audioSnippetText": "while obfuscating human institutional accountability",
        "explanationUk": "Слово: obfuscating."
      }
    ]
  },
  {
    "id": "c1-listen-diplomacy",
    "level": "C1",
    "order": 2,
    "unitTitleUk": "Блок 1: Високі дебати та риторика",
    "titleEn": "Diplomatic Briefing: Subtext & Tactical Understatement",
    "titleUk": "Дипломатичний брифінг: Прихований підтекст та літота",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:45",
    "scenarioDescriptionUk": "Високопосадовець Міністерства закордонних справ Британії проводить закритий брифінг щодо торговельного глухого кута.",
    "speakers": [
      {
        "name": "Ambassador Harrison",
        "roleUk": "Надзвичайний посол"
      }
    ],
    "dialogue": [
      {
        "speaker": "Ambassador",
        "textEn": "Good afternoon, colleagues. Regrettably, to characterize yesterday's ministerial consultation as an unqualified triumph would be somewhat premature.",
        "textUk": "Доброго дня, колеги. На жаль, охарактеризувати вчорашні міністерські консультації як беззаперечний тріумф було б дещо передчасно."
      },
      {
        "speaker": "Ambassador",
        "textEn": "The bilateral delegation expressed what our counterparts diplomatically termed \"vigorous constructive reservations\" regarding quota thresholds.",
        "textUk": "Двостороння делегація висловила те, що наші колеги дипломатично назвали \"рішучими конструктивними застереженнями\" щодо порогів квот."
      },
      {
        "speaker": "Ambassador",
        "textEn": "In plain speech, negotiations have arrived at an acute impasse, difficult though it is to acknowledge publicly.",
        "textUk": "Простою мовою, переговори зайшли в гострий глухий кут, як би важко це не було визнати публічно."
      },
      {
        "speaker": "Ambassador",
        "textEn": "Be that as it may, our mandate is neither to capitulate nor to indulge in futile political recriminations.",
        "textUk": "Як би там не було, наш мандат полягає не в капітуляції і не в безплідних політичних взаємних звинуваченнях."
      },
      {
        "speaker": "Ambassador",
        "textEn": "Should our counterparts signal genuine readiness for compromise on tariff parity, we shall table our revised annex without delay.",
        "textUk": "Якщо наші візаві продемонструють щиру готовність до компромісу щодо тарифного паритету, ми без зволікань представимо наш переглянутий додаток."
      }
    ],
    "fullAudioText": "Good afternoon, colleagues. Regrettably, to characterize yesterday's ministerial consultation as an unqualified triumph would be somewhat premature. The bilateral delegation expressed what our counterparts diplomatically termed \"vigorous constructive reservations\" regarding quota thresholds. In plain speech, negotiations have arrived at an acute impasse, difficult though it is to acknowledge publicly. Be that as it may, our mandate is neither to capitulate nor to indulge in futile political recriminations. Should our counterparts signal genuine readiness for compromise on tariff parity, we shall table our revised annex without delay.",
    "vocabulary": [
      {
        "word": "unqualified triumph",
        "transcription": "/ʌnˈkwɒl.ɪ.faɪd/",
        "translationUk": "беззаперечний, абсолютний тріумф",
        "contextSentence": "As an unqualified triumph."
      },
      {
        "word": "acute impasse",
        "transcription": "/əˈkjuːt ˈæm.pɑːs/",
        "translationUk": "гострий глухий кут",
        "contextSentence": "Negotiations have arrived at an acute impasse."
      },
      {
        "word": "Be that as it may",
        "transcription": "/biː ðæt æz ɪt meɪ/",
        "translationUk": "як би там не було (C1 зворот поступки)",
        "contextSentence": "Be that as it may, our mandate is clear."
      },
      {
        "word": "futile recriminations",
        "transcription": "/ˈfjuː.taɪl rɪˌkrɪm.ɪˈneɪ.ʃənz/",
        "translationUk": "марні взаємні звинувачення",
        "contextSentence": "Indulge in futile political recriminations."
      },
      {
        "word": "tariff parity",
        "transcription": "/ˈpær.ə.ti/",
        "translationUk": "тарифний паритет, рівність",
        "contextSentence": "Compromise on tariff parity."
      }
    ],
    "exercises": [
      {
        "id": "c1-d-1",
        "type": "multiple_choice",
        "question": "What does the diplomatic euphemism \"somewhat premature to characterize as a triumph\" actually mean?",
        "options": [
          "The consultation was largely a failure / deadlock",
          "The meeting went exceptionally well",
          "The treaty has already been signed",
          "The meeting was cancelled"
        ],
        "correctAnswer": "The consultation was largely a failure / deadlock",
        "explanationUk": "Британський understatement означає, що переговори не вдалися."
      },
      {
        "id": "c1-d-2",
        "type": "multiple_choice",
        "question": "What did the negotiation arrive at in plain speech according to Ambassador Harrison?",
        "options": [
          "An acute impasse (deadlock)",
          "A complete breakthrough",
          "A signed commercial agreement",
          "An armed conflict"
        ],
        "correctAnswer": "An acute impasse (deadlock)",
        "explanationUk": "Посол визнає: \"negotiations have arrived at an acute impasse\"."
      },
      {
        "id": "c1-d-3",
        "type": "multiple_choice",
        "question": "Under what condition will the delegation table their revised annex?",
        "options": [
          "Should the counterparts signal readiness on tariff parity",
          "Only after military intervention",
          "Never under any circumstances",
          "If the currency depreciates"
        ],
        "correctAnswer": "Should the counterparts signal readiness on tariff parity",
        "explanationUk": "Він вказує: \"Should our counterparts signal genuine readiness for compromise on tariff parity\"."
      },
      {
        "id": "c1-d-4",
        "type": "true_false",
        "question": "True or False: The Ambassador plans to surrender and capitulate immediately.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда: \"our mandate is neither to capitulate nor to indulge in futile recriminations\"."
      },
      {
        "id": "c1-d-5",
        "type": "dictation",
        "question": "Впишіть C1 зворот поступки: \"___ that as it may, our mandate is clear.\"",
        "correctAnswer": "Be",
        "audioSnippetText": "Be that as it may, our mandate is neither to capitulate",
        "explanationUk": "Слово: Be (фраза: Be that as it may)."
      },
      {
        "id": "c1-d-6",
        "type": "dictation",
        "question": "Впишіть термін: \"negotiations have arrived at an acute ___\"",
        "correctAnswer": "impasse",
        "audioSnippetText": "negotiations have arrived at an acute impasse",
        "explanationUk": "Слово: impasse."
      },
      {
        "id": "c1-d-7",
        "type": "true_false",
        "question": "True or False: The speaker uses inverted conditional structure (\"Should our counterparts signal...\").",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"Should our counterparts signal...\" = \"If our counterparts signal...\"."
      },
      {
        "id": "c1-d-8",
        "type": "multiple_choice",
        "question": "What stylistic device is prominent in Harrison's speech?",
        "options": [
          "British understatement & litotes",
          "Aggressive slang",
          "Casual conversational humor",
          "Childish rhyming"
        ],
        "correctAnswer": "British understatement & litotes",
        "explanationUk": "Витончена дипломатична мова, літота та understatement."
      },
      {
        "id": "c1-d-9",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"nor to indulge in futile political ___\"",
        "correctAnswer": "recriminations",
        "audioSnippetText": "nor to indulge in futile political recriminations",
        "explanationUk": "Слово: recriminations."
      },
      {
        "id": "c1-d-10",
        "type": "true_false",
        "question": "True or False: The dispute relates to quota thresholds and tariff parity.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"regarding quota thresholds\" та \"compromise on tariff parity\"."
      },
      {
        "id": "c1-d-11",
        "type": "multiple_choice",
        "question": "What does Harrison mean by \"table our revised annex\"?",
        "options": [
          "Present their updated proposal formally",
          "Put food on the table",
          "Discard the document",
          "Hide the annex from press"
        ],
        "correctAnswer": "Present their updated proposal formally",
        "explanationUk": "To table a proposal в британській англійській означає офіційно представити її на розгляд."
      },
      {
        "id": "c1-d-12",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"difficult ___ it is to acknowledge publicly\"",
        "correctAnswer": "though",
        "audioSnippetText": "difficult though it is to acknowledge publicly",
        "explanationUk": "Слово: though (конструкція поступки: Adjective + though + subject + verb)."
      }
    ]
  },
  {
    "id": "b2-listen-negotiation",
    "level": "B2",
    "order": 3,
    "unitTitleUk": "Блок 2: Міжнародні переговори",
    "titleEn": "Supplier Contract & SLA Negotiation",
    "titleUk": "Переговори щодо умов постачання та SLA",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:35",
    "scenarioDescriptionUk": "Директор із закупівель обговорює з постачальником хмарних послуг умови 99.9% uptime та штрафні санкції.",
    "speakers": [
      {
        "name": "Procurement Director (Edward)",
        "roleUk": "Директор із закупівель"
      },
      {
        "name": "Vendor Rep (Hannah)",
        "roleUk": "Представниця постачальника"
      }
    ],
    "dialogue": [
      {
        "speaker": "Edward",
        "textEn": "Hannah, we appreciate your presentation, but a ninety-nine point five percent uptime guarantee fails to meet our enterprise standards.",
        "textUk": "Ханно, ми вдячні за презентацію, але гарантія доступності 99.5% не відповідає нашим корпоративним стандартам."
      },
      {
        "speaker": "Hannah",
        "textEn": "We understand your mission-critical requirements Edward. Our Tier-4 data centers can commit to ninety-nine point nine percent uptime if we finalize a three-year commitment.",
        "textUk": "Ми розуміємо ваші критично важливі вимоги, Едварде. Наші дата-центри рівня Tier-4 можуть гарантувати 99.9% аптайму за умови підписання контракту на три роки."
      },
      {
        "speaker": "Edward",
        "textEn": "And what financial penalties apply should downtime exceed the agreed quarterly threshold?",
        "textUk": "А які фінансові штрафи застосовуються, якщо час простою перевищить узгоджений квартальний поріг?"
      },
      {
        "speaker": "Hannah",
        "textEn": "We provide service credits equivalent to fifteen percent of monthly fees for every hour of unscheduled outage.",
        "textUk": "Ми надаємо сервісні кредити в розмірі 15% від щомісячної плати за кожну годину незапланованого простою."
      },
      {
        "speaker": "Edward",
        "textEn": "If you include twenty-four-seven dedicated phone support in that tier, we are prepared to sign.",
        "textUk": "Якщо ви включите цілодобову виділену телефонну підтримку в цей тариф, ми готові підписати."
      }
    ],
    "fullAudioText": "Hannah, we appreciate your presentation, but a ninety-nine point five percent uptime guarantee fails to meet our enterprise standards. We understand your mission-critical requirements Edward. Our Tier-4 data centers can commit to ninety-nine point nine percent uptime if we finalize a three-year commitment. And what financial penalties apply should downtime exceed the agreed quarterly threshold? We provide service credits equivalent to fifteen percent of monthly fees for every hour of unscheduled outage. If you include twenty-four-seven dedicated phone support in that tier, we are prepared to sign.",
    "vocabulary": [
      {
        "word": "uptime guarantee",
        "transcription": "/ˈʌp.taɪm/",
        "translationUk": "гарантія безперебійної роботи",
        "contextSentence": "Uptime guarantee fails to meet standards."
      },
      {
        "word": "mission-critical",
        "transcription": "/ˈmɪʃ.ən ˈkrɪt.ɪ.kəl/",
        "translationUk": "життєво важливий, безвідмовний",
        "contextSentence": "Your mission-critical requirements."
      },
      {
        "word": "service credits",
        "transcription": "/ˈsɜː.vɪs ˈkred.ɪts/",
        "translationUk": "компенсаційні сервісні кредити",
        "contextSentence": "We provide service credits for outage."
      },
      {
        "word": "unscheduled outage",
        "transcription": "/ˌʌnˈskedʒ.uːld ˈaʊ.tɪdʒ/",
        "translationUk": "незапланований збій/простій",
        "contextSentence": "Every hour of unscheduled outage."
      }
    ],
    "exercises": [
      {
        "id": "b2-n-1",
        "type": "multiple_choice",
        "question": "What higher uptime guarantee does Hannah offer for a 3-year deal?",
        "options": [
          "99.9%",
          "99.5%",
          "100%",
          "98.0%"
        ],
        "correctAnswer": "99.9%",
        "explanationUk": "Ханна каже: \"commit to ninety-nine point nine percent uptime\"."
      },
      {
        "id": "b2-n-2",
        "type": "multiple_choice",
        "question": "How much service credit does the vendor provide per hour of outage?",
        "options": [
          "15% of monthly fees",
          "50% of monthly fees",
          "5% of monthly fees",
          "100% refund"
        ],
        "correctAnswer": "15% of monthly fees",
        "explanationUk": "Вона уточнює: \"fifteen percent of monthly fees for every hour of unscheduled outage\"."
      },
      {
        "id": "b2-n-3",
        "type": "multiple_choice",
        "question": "What final condition does Edward insist on before signing?",
        "options": [
          "24/7 dedicated phone support",
          "Free hardware delivery",
          "Office visits every week",
          "Stock options"
        ],
        "correctAnswer": "24/7 dedicated phone support",
        "explanationUk": "Едвард каже: \"include twenty-four-seven dedicated phone support\"."
      },
      {
        "id": "b2-n-4",
        "type": "true_false",
        "question": "True or False: The vendor operates Tier-4 data centers.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"Our Tier-4 data centers can commit...\"."
      },
      {
        "id": "b2-n-5",
        "type": "dictation",
        "question": "Впишіть термін: \"every hour of unscheduled ___\"",
        "correctAnswer": "outage",
        "audioSnippetText": "every hour of unscheduled outage",
        "explanationUk": "Слово: outage."
      },
      {
        "id": "b2-n-6",
        "type": "true_false",
        "question": "True or False: Edward accepted the initial 99.5% uptime offer.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, він сказав: \"fails to meet our enterprise standards\"."
      },
      {
        "id": "b2-n-7",
        "type": "multiple_choice",
        "question": "How long is the proposed contract commitment?",
        "options": [
          "Three years",
          "One year",
          "Five years",
          "Six months"
        ],
        "correctAnswer": "Three years",
        "explanationUk": "Ханна зазначила: \"finalize a three-year commitment\"."
      },
      {
        "id": "b2-n-8",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"understand your mission-___ requirements\"",
        "correctAnswer": "critical",
        "audioSnippetText": "understand your mission-critical requirements",
        "explanationUk": "Слово: critical."
      },
      {
        "id": "b2-n-9",
        "type": "true_false",
        "question": "True or False: The company was prepared to sign without phone support.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, цілодобова підтримка була обовʼязковою умовою."
      },
      {
        "id": "b2-n-10",
        "type": "multiple_choice",
        "question": "What role does Edward have?",
        "options": [
          "Procurement Director",
          "Junior Developer",
          "Marketing intern",
          "Customer support rep"
        ],
        "correctAnswer": "Procurement Director",
        "explanationUk": "Едвард очолює відділ закупівель."
      },
      {
        "id": "b2-n-11",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"a ninety-nine point five percent ___ guarantee\"",
        "correctAnswer": "uptime",
        "audioSnippetText": "ninety-nine point five percent uptime guarantee",
        "explanationUk": "Слово: uptime."
      },
      {
        "id": "b2-n-12",
        "type": "true_false",
        "question": "True or False: Penalties are paid in physical cash bags.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вони надаються як сервісні кредити (service credits)."
      }
    ]
  },
  {
    "id": "b2-listen-renewables",
    "level": "B2",
    "order": 4,
    "unitTitleUk": "Блок 2: Міжнародні переговори",
    "titleEn": "News Special: Offshore Wind & Grid Modernization",
    "titleUk": "Новинний спецвипуск: Вітрова енергетика та модернізація мереж",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:30",
    "scenarioDescriptionUk": "Журналіст BBC розповідає про масштабне розгортання офшорних вітрових електростанцій у Північному морі.",
    "speakers": [
      {
        "name": "Correspondent (Fiona)",
        "roleUk": "Екологічна кореспондентка"
      }
    ],
    "dialogue": [
      {
        "speaker": "Fiona",
        "textEn": "Reporting live from Aberdeen, where Britain's largest offshore wind consortium just connected five gigawatts of clean energy to the national grid.",
        "textUk": "Ведемо прямий репортаж з Абердина, де найбільший у Британії консорціум офшорних вітрових електростанцій щойно підключив 5 гігаватів чистої енергії до національної мережі."
      },
      {
        "speaker": "Fiona",
        "textEn": "While turbine efficiency has quadrupled over the last decade, engineers warn that transmission bottlenecks threaten distribution to southern industrial clusters.",
        "textUk": "Хоча ефективність турбін зросла вчетверо за останнє десятиліття, інженери попереджають, що вузькі місця в мережі передачі загрожують постачанню до південних промислових кластерів."
      },
      {
        "speaker": "Fiona",
        "textEn": "To mitigate curtailment, government ministers unveiled a two-billion-pound infrastructure bond specifically earmarked for high-voltage direct current subsea cables.",
        "textUk": "Щоб запобігти примусовому обмеженню потужності, міністри оприлюднили інфраструктурні облігації на 2 мільярди фунтів, призначені для підводних кабелів постійного струму."
      },
      {
        "speaker": "Fiona",
        "textEn": "If battery storage facilities scale at the projected trajectory, reliance on imported fossil gas could plummet by thirty percent before 2030.",
        "textUk": "Якщо потужності акумуляторних батарей зростатимуть за прогнозованою траєкторією, залежність від імпортованого газу може впасти на 30% до 2030 року."
      }
    ],
    "fullAudioText": "Reporting live from Aberdeen, where Britain's largest offshore wind consortium just connected five gigawatts of clean energy to the national grid. While turbine efficiency has quadrupled over the last decade, engineers warn that transmission bottlenecks threaten distribution to southern industrial clusters. To mitigate curtailment, government ministers unveiled a two-billion-pound infrastructure bond specifically earmarked for high-voltage direct current subsea cables. If battery storage facilities scale at the projected trajectory, reliance on imported fossil gas could plummet by thirty percent before 2030.",
    "vocabulary": [
      {
        "word": "offshore wind",
        "transcription": "/ˌɒf.ʃɔː ˈwɪnd/",
        "translationUk": "офшорна вітрова енергетика",
        "contextSentence": "Largest offshore wind consortium."
      },
      {
        "word": "quadrupled",
        "transcription": "/kwɒdˈruː.pəld/",
        "translationUk": "зросла вчетверо",
        "contextSentence": "Turbine efficiency has quadrupled."
      },
      {
        "word": "transmission bottlenecks",
        "transcription": "/ˈbɒt.əl.neks/",
        "translationUk": "вузькі місця в мережах передачі",
        "contextSentence": "Transmission bottlenecks threaten distribution."
      },
      {
        "word": "plummet",
        "transcription": "/ˈplʌm.ɪt/",
        "translationUk": "стрімко падати",
        "contextSentence": "Reliance on fossil gas could plummet."
      }
    ],
    "exercises": [
      {
        "id": "b2-r-1",
        "type": "multiple_choice",
        "question": "How much clean energy did the offshore consortium connect to the grid?",
        "options": [
          "Five gigawatts (5 GW)",
          "Ten gigawatts",
          "Two gigawatts",
          "Fifty gigawatts"
        ],
        "correctAnswer": "Five gigawatts (5 GW)",
        "explanationUk": "Кореспондентка каже: \"five gigawatts of clean energy\"."
      },
      {
        "id": "b2-r-2",
        "type": "multiple_choice",
        "question": "How much has turbine efficiency increased over the past decade?",
        "options": [
          "It has quadrupled (4x)",
          "It doubled",
          "It remained unchanged",
          "It tripled"
        ],
        "correctAnswer": "It has quadrupled (4x)",
        "explanationUk": "Вона зазначає: \"turbine efficiency has quadrupled\"."
      },
      {
        "id": "b2-r-3",
        "type": "multiple_choice",
        "question": "How large is the infrastructure bond unveiled by government ministers?",
        "options": [
          "Two billion pounds (£2B)",
          "Five billion pounds",
          "One hundred million pounds",
          "Ten billion pounds"
        ],
        "correctAnswer": "Two billion pounds (£2B)",
        "explanationUk": "Вона оголошує: \"a two-billion-pound infrastructure bond\"."
      },
      {
        "id": "b2-r-4",
        "type": "multiple_choice",
        "question": "By what percentage could reliance on imported gas plummet before 2030?",
        "options": [
          "By thirty percent (30%)",
          "By ten percent",
          "By fifty percent",
          "By five percent"
        ],
        "correctAnswer": "By thirty percent (30%)",
        "explanationUk": "Вона вказує: \"could plummet by thirty percent before 2030\"."
      },
      {
        "id": "b2-r-5",
        "type": "true_false",
        "question": "True or False: Transmission bottlenecks are completely resolved.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, інженери попереджають про вузькі місця (engineers warn that transmission bottlenecks threaten distribution)."
      },
      {
        "id": "b2-r-6",
        "type": "dictation",
        "question": "Впишіть дієслово: \"reliance on fossil gas could ___ by thirty percent\"",
        "correctAnswer": "plummet",
        "audioSnippetText": "reliance on imported fossil gas could plummet by thirty percent",
        "explanationUk": "Слово: plummet."
      },
      {
        "id": "b2-r-7",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"warn that transmission ___ threaten distribution\"",
        "correctAnswer": "bottlenecks",
        "audioSnippetText": "warn that transmission bottlenecks threaten distribution",
        "explanationUk": "Слово: bottlenecks."
      },
      {
        "id": "b2-r-8",
        "type": "true_false",
        "question": "True or False: The report is broadcast live from Aberdeen.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"Reporting live from Aberdeen\"."
      },
      {
        "id": "b2-r-9",
        "type": "multiple_choice",
        "question": "What specific technology are the funds earmarked for?",
        "options": [
          "High-voltage subsea cables",
          "Coal mining equipment",
          "Diesel generators",
          "Nuclear rockets"
        ],
        "correctAnswer": "High-voltage subsea cables",
        "explanationUk": "Вона вказує: \"high-voltage direct current subsea cables\"."
      },
      {
        "id": "b2-r-10",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"five ___ of clean energy\"",
        "correctAnswer": "gigawatts",
        "audioSnippetText": "five gigawatts of clean energy",
        "explanationUk": "Слово: gigawatts."
      },
      {
        "id": "b2-r-11",
        "type": "true_false",
        "question": "True or False: Turbine efficiency decreased over the decade.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона зросла вчетверо."
      },
      {
        "id": "b2-r-12",
        "type": "multiple_choice",
        "question": "What problem are ministers trying to mitigate?",
        "options": [
          "Curtailment of wind energy",
          "Lack of wind in Scotland",
          "Overproduction of coal",
          "High worker salaries"
        ],
        "correctAnswer": "Curtailment of wind energy",
        "explanationUk": "Вона сказала: \"To mitigate curtailment\"."
      }
    ]
  },
  {
    "id": "c1-listen-philosophy",
    "level": "C1",
    "order": 3,
    "unitTitleUk": "Блок 2: Академічний дискурс",
    "titleEn": "Philosophical Debate: Consciousness & Computational Models",
    "titleUk": "Філософський диспут: Свідомість та межі обчислювальних систем",
    "accent": "British (UK)",
    "preferredVoice": "Google-UK",
    "durationEst": "2:50",
    "scenarioDescriptionUk": "Дебати в Кембриджському університеті між когнітивним нейробіологом та філософом свідомості щодо \"важкої проблеми свідомості\".",
    "speakers": [
      {
        "name": "Dr. Aris (Neuroscientist)",
        "roleUk": "Когнітивний нейробіолог"
      },
      {
        "name": "Prof. Thorne (Philosopher)",
        "roleUk": "Філософ свідомості"
      }
    ],
    "dialogue": [
      {
        "speaker": "Dr. Aris",
        "textEn": "The functionalist paradigm demonstrates that subjective states correlate unequivocally with thalamocortical recursive feedback loops.",
        "textUk": "Функціоналістська парадигма демонструє, що субʼєктивні стани однозначно корелюють із таламокортикальними рекурсивними петлями зворотного звʼязку."
      },
      {
        "speaker": "Prof. Thorne",
        "textEn": "Yet you conflate neural correlates with subjective phenomenological qualia, a quintessential category mistake that Chalmers dismantled decades ago.",
        "textUk": "Проте ви плутаєте нейронні кореляти із субʼєктивним феноменологічним досвідом (кволіа) — класична категоріальна помилка, яку Чалмерс спростував десятиліття тому."
      },
      {
        "speaker": "Dr. Aris",
        "textEn": "Be that as it may, no non-physicalist explanatory framework has ever generated an empirically falsifiable prediction regarding sensory integration.",
        "textUk": "Як би там не було, жодна нефізикалістська пояснювальна модель досі не згенерувала емпірично спростовного передбачення щодо сенсорної інтеграції."
      },
      {
        "speaker": "Prof. Thorne",
        "textEn": "Were functionalism wholly sufficient to explain experience, a simulated neural model of pain would inherently suffer—a proposition both morally fraught and empirically unprovable.",
        "textUk": "Якби функціоналізму було цілком достатньо для пояснення досвіду, змодельована нейронна модель болю внутрішньо страждала б — твердження як морально тривожне, так і емпірично недоказове."
      }
    ],
    "fullAudioText": "The functionalist paradigm demonstrates that subjective states correlate unequivocally with thalamocortical recursive feedback loops. Yet you conflate neural correlates with subjective phenomenological qualia, a quintessential category mistake that Chalmers dismantled decades ago. Be that as it may, no non-physicalist explanatory framework has ever generated an empirically falsifiable prediction regarding sensory integration. Were functionalism wholly sufficient to explain experience, a simulated neural model of pain would inherently suffer—a proposition both morally fraught and empirically unprovable.",
    "vocabulary": [
      {
        "word": "phenomenological qualia",
        "transcription": "/ˈkwɑː.li.ə/",
        "translationUk": "кволіа, субʼєктивні відчуття",
        "contextSentence": "Subjective phenomenological qualia."
      },
      {
        "word": "category mistake",
        "transcription": "/ˈkæt.ə.ɡri mɪˈsteɪk/",
        "translationUk": "категоріальна помилка (філос.)",
        "contextSentence": "A quintessential category mistake."
      },
      {
        "word": "empirically falsifiable",
        "transcription": "/fɔːl.sɪˈfaɪ.ə.bəl/",
        "translationUk": "емпірично фальсифікований/спростовний",
        "contextSentence": "Empirically falsifiable prediction."
      },
      {
        "word": "morally fraught",
        "transcription": "/frɔːt/",
        "translationUk": "сповнений моральних ризиків",
        "contextSentence": "A proposition morally fraught."
      }
    ],
    "exercises": [
      {
        "id": "c1-p-1",
        "type": "multiple_choice",
        "question": "What fundamental error does Professor Thorne accuse Dr. Aris of making?",
        "options": [
          "Conflating neural correlates with subjective qualia (category mistake)",
          "Miscalculating brain weight",
          "Forgetting Einstein's physics",
          "Denying the existence of neurons"
        ],
        "correctAnswer": "Conflating neural correlates with subjective qualia (category mistake)",
        "explanationUk": "Торн наголошує: \"you conflate neural correlates with subjective phenomenological qualia\"."
      },
      {
        "id": "c1-p-2",
        "type": "multiple_choice",
        "question": "What epistemological critique does Dr. Aris raise against non-physicalist frameworks?",
        "options": [
          "They have never generated an empirically falsifiable prediction",
          "They are too mathematically complex",
          "They require expensive supercomputers",
          "They are published in bad journals"
        ],
        "correctAnswer": "They have never generated an empirically falsifiable prediction",
        "explanationUk": "Аріс каже: \"no non-physicalist framework has ever generated an empirically falsifiable prediction\"."
      },
      {
        "id": "c1-p-3",
        "type": "multiple_choice",
        "question": "What grammatical structure appears in: \"Were functionalism wholly sufficient...\"?",
        "options": [
          "Inverted conditional without if (Type 2)",
          "Past continuous question",
          "Passive participle clause",
          "Negative imperative"
        ],
        "correctAnswer": "Inverted conditional without if (Type 2)",
        "explanationUk": "\"Were functionalism wholly sufficient...\" — це інвертований умовний спосіб (If functionalism were wholly sufficient...)."
      },
      {
        "id": "c1-p-4",
        "type": "true_false",
        "question": "True or False: Dr. Aris supports dualism and rejects functionalism.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, Аріс захищає функціоналізм і нейронні петлі зворотного звʼязку."
      },
      {
        "id": "c1-p-5",
        "type": "dictation",
        "question": "Впишіть філософський термін: \"conflate neural correlates with subjective ___\"",
        "correctAnswer": "qualia",
        "audioSnippetText": "conflate neural correlates with subjective phenomenological qualia",
        "explanationUk": "Слово: qualia."
      },
      {
        "id": "c1-p-6",
        "type": "dictation",
        "question": "Впишіть прикметник: \"an empirically ___ prediction\"",
        "correctAnswer": "falsifiable",
        "audioSnippetText": "generated an empirically falsifiable prediction",
        "explanationUk": "Слово: falsifiable."
      },
      {
        "id": "c1-p-7",
        "type": "true_false",
        "question": "True or False: Thorne mentions philosopher David Chalmers.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"that Chalmers dismantled decades ago\"."
      },
      {
        "id": "c1-p-8",
        "type": "multiple_choice",
        "question": "What does Thorne argue a simulated neural pain model would entail under strict functionalism?",
        "options": [
          "It would inherently suffer",
          "It would turn off instantly",
          "It would demand human wages",
          "It would become a supercomputer"
        ],
        "correctAnswer": "It would inherently suffer",
        "explanationUk": "Він сказав: \"a simulated neural model of pain would inherently suffer\"."
      },
      {
        "id": "c1-p-9",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"a proposition both morally ___ and unprovable\"",
        "correctAnswer": "fraught",
        "audioSnippetText": "a proposition both morally fraught and empirically unprovable",
        "explanationUk": "Слово: fraught."
      },
      {
        "id": "c1-p-10",
        "type": "true_false",
        "question": "True or False: Both speakers agree on the nature of consciousness.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, між ними триває глибокий концептуальний диспут."
      },
      {
        "id": "c1-p-11",
        "type": "multiple_choice",
        "question": "What brain structures did Dr. Aris link to subjective states?",
        "options": [
          "Thalamocortical recursive feedback loops",
          "Cerebellum alone",
          "Spinal cord only",
          "Occipital lobe only"
        ],
        "correctAnswer": "Thalamocortical recursive feedback loops",
        "explanationUk": "Він назвав: \"thalamocortical recursive feedback loops\"."
      },
      {
        "id": "c1-p-12",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"a ___ category mistake\"",
        "correctAnswer": "quintessential",
        "audioSnippetText": "a quintessential category mistake",
        "explanationUk": "Слово: quintessential."
      }
    ]
  },
  {
    "id": "c1-listen-crisis",
    "level": "C1",
    "order": 4,
    "unitTitleUk": "Блок 2: Академічний дискурс",
    "titleEn": "Corporate Crisis Post-Mortem: Legal Liability & Remediation",
    "titleUk": "Кризовий постмортем: Юридична відповідальність та компенсації",
    "accent": "American (US)",
    "preferredVoice": "Charon",
    "durationEst": "2:50",
    "scenarioDescriptionUk": "Головний юрисконсульт корпорації проводить нараду з радою директорів після виявлення критичної вразливості в хмарній безпеці.",
    "speakers": [
      {
        "name": "General Counsel (Warren)",
        "roleUk": "Головний юрисконсульт"
      },
      {
        "name": "Board Chair (Eleanor)",
        "roleUk": "Голова ради директорів"
      }
    ],
    "dialogue": [
      {
        "speaker": "Warren",
        "textEn": "Members of the board, our forensic investigation revealed that unauthorized exfiltration persisted undetected for eighteen consecutive days.",
        "textUk": "Члени ради директорів, наше судово-технічне розслідування виявило, що несанкціоноване викачування даних тривало непоміченим вісімнадцять днів поспіль."
      },
      {
        "speaker": "Eleanor",
        "textEn": "That represents an existential regulatory catastrophe under both GDPR and SEC disclosure imperatives. What is our statutory liability?",
        "textUk": "Це становить екзистенційну регуляторну катастрофу за вимогами розкриття інформації як GDPR, так і SEC. Яка наша встановлена законом відповідальність?"
      },
      {
        "speaker": "Warren",
        "textEn": "Should regulatory authorities determine that internal warnings were willfully ignored, statutory fines could reach four percent of global turnover.",
        "textUk": "Якщо регуляторні органи встановлять, що внутрішні попередження умисно ігнорувалися, передбачені законом штрафи можуть сягнути чотирьох відсотків світового обороту."
      },
      {
        "speaker": "Eleanor",
        "textEn": "Hence, prevarication is untenable. We must issue a full transparent disclosure, initiate remediation protocols, and settle liabilities proactively.",
        "textUk": "Отже, зволікання та ухиляння неприпустимі. Ми повинні опублікувати повне прозоре розкриття, запустити протоколи виправлення та проактивно врегулювати зобовʼязання."
      }
    ],
    "fullAudioText": "Members of the board, our forensic investigation revealed that unauthorized exfiltration persisted undetected for eighteen consecutive days. That represents an existential regulatory catastrophe under both GDPR and SEC disclosure imperatives. What is our statutory liability? Should regulatory authorities determine that internal warnings were willfully ignored, statutory fines could reach four percent of global turnover. Hence, prevarication is untenable. We must issue a full transparent disclosure, initiate remediation protocols, and settle liabilities proactively.",
    "vocabulary": [
      {
        "word": "forensic investigation",
        "transcription": "/fəˈren.zɪk/",
        "translationUk": "судово-технічне розслідування",
        "contextSentence": "Our forensic investigation revealed exfiltration."
      },
      {
        "word": "exfiltration",
        "transcription": "/ˌeks.fɪlˈtreɪ.ʃən/",
        "translationUk": "несанкціоноване викачування даних",
        "contextSentence": "Unauthorized exfiltration persisted."
      },
      {
        "word": "statutory liability",
        "transcription": "/ˈstætʃ.ə.tər.i/",
        "translationUk": "встановлена законом юридична відповідальність",
        "contextSentence": "What is our statutory liability?"
      },
      {
        "word": "prevarication",
        "transcription": "/prɪˌvær.ɪˈkeɪ.ʃən/",
        "translationUk": "ухиляння від правди, лукавство",
        "contextSentence": "Prevarication is untenable."
      },
      {
        "word": "remediation protocols",
        "transcription": "/rɪˌmiː.diˈeɪ.ʃən/",
        "translationUk": "протоколи усунення наслідків/виправлення",
        "contextSentence": "Initiate remediation protocols."
      }
    ],
    "exercises": [
      {
        "id": "c1-c-1",
        "type": "multiple_choice",
        "question": "How long did the unauthorized data exfiltration persist undetected?",
        "options": [
          "Eighteen consecutive days",
          "Two hours",
          "Six months",
          "Over a year"
        ],
        "correctAnswer": "Eighteen consecutive days",
        "explanationUk": "Воррен повідомляє: \"persisted undetected for eighteen consecutive days\"."
      },
      {
        "id": "c1-c-2",
        "type": "multiple_choice",
        "question": "What maximum fine could the company face if warnings were willfully ignored?",
        "options": [
          "Four percent of global turnover (4%)",
          "Ten million dollars flat",
          "One percent of domestic revenue",
          "Fifty percent of all assets"
        ],
        "correctAnswer": "Four percent of global turnover (4%)",
        "explanationUk": "Він попереджає: \"statutory fines could reach four percent of global turnover\"."
      },
      {
        "id": "c1-c-3",
        "type": "multiple_choice",
        "question": "What regulatory frameworks are explicitly cited by Eleanor?",
        "options": [
          "GDPR and SEC disclosure imperatives",
          "Traffic codes and civil courts",
          "Local zoning laws",
          "Copyright trademarks"
        ],
        "correctAnswer": "GDPR and SEC disclosure imperatives",
        "explanationUk": "Вона посилається: \"under both GDPR and SEC disclosure imperatives\"."
      },
      {
        "id": "c1-c-4",
        "type": "true_false",
        "question": "True or False: Eleanor suggests hiding the breach from the public and regulators.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, вона заявляє: \"prevarication is untenable. We must issue a full transparent disclosure\"."
      },
      {
        "id": "c1-c-5",
        "type": "dictation",
        "question": "Впишіть C1 іменник: \"Hence, ___ is completely untenable.\"",
        "correctAnswer": "prevarication",
        "audioSnippetText": "Hence, prevarication is untenable",
        "explanationUk": "Слово: prevarication."
      },
      {
        "id": "c1-c-6",
        "type": "dictation",
        "question": "Впишіть почутий термін: \"unauthorized ___ persisted undetected\"",
        "correctAnswer": "exfiltration",
        "audioSnippetText": "unauthorized exfiltration persisted undetected",
        "explanationUk": "Слово: exfiltration."
      },
      {
        "id": "c1-c-7",
        "type": "true_false",
        "question": "True or False: The board decided to initiate proactive remediation protocols.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "True",
        "explanationUk": "Правда: \"initiate remediation protocols, and settle liabilities proactively\"."
      },
      {
        "id": "c1-c-8",
        "type": "multiple_choice",
        "question": "What does the word \"untenable\" signify in Eleanor's statement?",
        "options": [
          "Incapable of being defended or sustained",
          "Affordable and inexpensive",
          "Exciting and promising",
          "Temporary and easy"
        ],
        "correctAnswer": "Incapable of being defended or sustained",
        "explanationUk": "Untenable означає такий, що не витримує критики, неприпустимий, неможливий для захисту."
      },
      {
        "id": "c1-c-9",
        "type": "dictation",
        "question": "Впишіть пропущене слово: \"What is our ___ liability?\"",
        "correctAnswer": "statutory",
        "audioSnippetText": "What is our statutory liability?",
        "explanationUk": "Слово: statutory."
      },
      {
        "id": "c1-c-10",
        "type": "true_false",
        "question": "True or False: The data breach was discovered within five minutes.",
        "options": [
          "True",
          "False"
        ],
        "correctAnswer": "False",
        "explanationUk": "Неправда, воно тривало 18 днів непоміченим."
      },
      {
        "id": "c1-c-11",
        "type": "multiple_choice",
        "question": "Who conducted the investigation into the breach?",
        "options": [
          "Forensic investigation team",
          "External hackers",
          "Junior interns",
          "Local police patrols"
        ],
        "correctAnswer": "Forensic investigation team",
        "explanationUk": "Воррен сказав: \"our forensic investigation revealed\"."
      },
      {
        "id": "c1-c-12",
        "type": "dictation",
        "question": "Впишіть почуте слово: \"internal warnings were ___ ignored\"",
        "correctAnswer": "willfully",
        "audioSnippetText": "internal warnings were willfully ignored",
        "explanationUk": "Слово: willfully."
      }
    ]
  }
];

export const getListeningTrackById = (id: string): ListeningTrack | undefined => {
  return LISTENING_TRACKS.find((t) => t.id === id);
};

export const getListeningTracksByLevel = (level: string): ListeningTrack[] => {
  if (level === 'ALL') return LISTENING_TRACKS;
  return LISTENING_TRACKS.filter((t) => t.level === level);
};
