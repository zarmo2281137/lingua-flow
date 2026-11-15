# -*- coding: utf-8 -*-
import json
import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

categories = [
    {"id": "daily", "nameUk": "Повсякдення & Дім", "nameEn": "Daily Life & Home", "emoji": "☕", "descriptionUk": "Розпорядок дня, оселя, базові дії, час та щоденні звички"},
    {"id": "travel", "nameUk": "Подорожі & Транспорт", "nameEn": "Travel & Transport", "emoji": "✈️", "descriptionUk": "Аеропорт, вокзал, готелі, квитки, орієнтування у місті"},
    {"id": "food", "nameUk": "Їжа, Напої & Ресторани", "nameEn": "Food & Dining", "emoji": "🍕", "descriptionUk": "Продукти, ресторанне меню, приготування страв та смаки"},
    {"id": "career", "nameUk": "Робота, Бізнес & Кар'єра", "nameEn": "Work & Business", "emoji": "💼", "descriptionUk": "Офіс, співбесіда, дедлайни, переговори, фінанси та проекти"},
    {"id": "emotions", "nameUk": "Емоції & Характер", "nameEn": "Emotions & People", "emoji": "🧠", "descriptionUk": "Почуття, психологія, риси особистості та стосунки"},
    {"id": "tech", "nameUk": "Технології & IT", "nameEn": "Technology & Science", "emoji": "💻", "descriptionUk": "Інтернет, безпека, штучний інтелект, ґаджети та розробка"},
    {"id": "health", "nameUk": "Здоров'я & Тіло", "nameEn": "Health & Body", "emoji": "🏥", "descriptionUk": "Медицина, самопочуття, спорт, симптоми та візит до лікаря"},
    {"id": "education", "nameUk": "Освіта & Мова", "nameEn": "Education & Learning", "emoji": "📚", "descriptionUk": "Школа, університет, вивчення мови, іспити та навички"},
    {"id": "phrasal", "nameUk": "Фразові дієслова", "nameEn": "Phrasal Verbs Essentials", "emoji": "🚀", "descriptionUk": "Найважливіші фразові дієслова для щоденного вільного мовлення"},
    {"id": "idioms", "nameUk": "Ідіоми & Розмовна мова", "nameEn": "Idioms & Spoken Expressions", "emoji": "💬", "descriptionUk": "Стійкі образні вирази, метафори та жива мова носіїв"},
    {"id": "society", "nameUk": "Суспільство & Екологія", "nameEn": "Society & Environment", "emoji": "🌍", "descriptionUk": "Соціальні явища, клімат, природа, культура та право"},
    {"id": "academic", "nameUk": "C1 Академічна лексика & Дебати", "nameEn": "C1 Advanced & Discourse", "emoji": "🎓", "descriptionUk": "Високий рівень C1: академічне письмо, аргументація та науковий стиль"}
]

# Import base 281 words
sys.path.append(r"C:\Users\user\Desktop\lingua-flow\scripts")
from build_massive_vocabulary import words_data as base_words

# Additional ~280 curated educational words
more_words = [
    # ==================== A2 ADDITIONS (~50 words) ====================
    ("receipt", "/rɪˈsiːt/", "чек, квитанція", "noun", "A2", "daily", "Повсякдення & Дім", "Keep the receipt in case you want to return the shirt.", "Збережіть чек, якщо захочете повернути сорочку."),
    ("discount", "/ˈdɪs.kaʊnt/", "знижка", "noun", "A2", "daily", "Повсякдення & Дім", "There is a twenty percent discount on all shoes today.", "Сьогодні діє знижка двадцять відсотків на все взуття."),
    ("size", "/saɪz/", "розмір", "noun", "A2", "daily", "Повсякдення & Дім", "What size shoes do you wear?", "Який розмір взуття ви носите?"),
    ("cashier", "/kæʃˈɪər/", "касир", "noun", "A2", "daily", "Повсякдення & Дім", "Pay the cashier at counter number two.", "Оплатіть касиру на касі номер два."),
    ("wardrobe", "/ˈwɔː.drəʊb/", "гардероб, шафа для одягу", "noun", "A2", "daily", "Повсякдення & Дім", "She hung her winter coat in the wardrobe.", "Вона повісила зимове пальто в гардероб."),
    ("mirror", "/ˈmɪr.ər/", "дзеркало", "noun", "A2", "daily", "Повсякдення & Дім", "Look in the mirror before leaving the house.", "Подивись у дзеркало перед виходом з дому."),
    ("blanket", "/ˈblæŋ.kɪt/", "ковдра, покривало", "noun", "A2", "daily", "Повсякдення & Дім", "Wrap yourself in a warm blanket when it gets cold.", "Загорнись у теплу ковдру, коли стане холодно."),
    ("pillow", "/ˈpɪl.əʊ/", "подушка", "noun", "A2", "daily", "Повсякдення & Дім", "I need a soft pillow for a good night's rest.", "Мені потрібна м'яка подушка для гарного нічного відпочинку."),
    ("borrow", "/ˈbɒr.əʊ/", "позичати (в когось)", "verb", "A2", "daily", "Повсякдення & Дім", "Can I borrow your umbrella for an hour?", "Можна позичити твою парасольку на годину?"),
    ("lend", "/lend/", "позичати (комусь)", "verb", "A2", "daily", "Повсякдення & Дім", "He offered to lend me his laptop.", "Він запропонував позичити мені свій ноутбук."),
    ("platform", "/ˈplæt.fɔːm/", "платформа, перон", "noun", "A2", "travel", "Подорожі & Транспорт", "The train to London departs from platform four.", "Потяг до Лондона відправляється з четвертої платформи."),
    ("luggage", "/ˈlʌɡ.ɪdʒ/", "багаж", "noun", "A2", "travel", "Подорожі & Транспорт", "You can drop your luggage at the check-in desk.", "Ви можете здати багаж на стійці реєстрації."),
    ("reservation", "/ˌrez.əˈveɪ.ʃən/", "бронювання", "noun", "A2", "travel", "Подорожі & Транспорт", "We made a hotel reservation two weeks ago.", "Ми забронювали номер у готелі два тижні тому."),
    ("passenger", "/ˈpæs.ən.dʒər/", "пасажир", "noun", "A2", "travel", "Подорожі & Транспорт", "All passengers must fasten their seat belts.", "Усі пасажири повинні пристебнути ремені безпеки."),
    ("timetable", "/ˈtaɪmˌteɪ.bəl/", "розклад", "noun", "A2", "travel", "Подорожі & Транспорт", "Check the bus timetable on your smartphone.", "Перевір розклад руху автобусів у своєму смартфоні."),
    ("delay", "/dɪˈleɪ/", "затримка, затримувати", "noun", "A2", "travel", "Подорожі & Транспорт", "There was a short delay due to heavy snow.", "Була невелика затримка через сильний снігопад."),
    ("passport control", "/ˈpɑːs.pɔːt kənˈtrəʊl/", "паспортний контроль", "noun", "A2", "travel", "Подорожі & Транспорт", "Have your documents ready for passport control.", "Підготуйте документи для проходження паспортного контролю."),
    ("flight", "/flaɪt/", "рейс, переліт", "noun", "A2", "travel", "Подорожі & Транспорт", "Our flight arrives in Paris at noon.", "Наш рейс прибуває до Парижа опівдні."),
    ("ingredient", "/ɪnˈɡriː.di.ənt/", "інгредієнт, складник", "noun", "A2", "food", "Їжа, Напої & Ресторани", "Fresh tomatoes are the key ingredient for this sauce.", "Свіжі томати є головним інгредієнтом цього соусу."),
    ("spicy", "/ˈspaɪ.si/", "гострий, пряний", "adjective", "A2", "food", "Їжа, Напої & Ресторани", "This curry is quite spicy, so order extra water.", "Це карі досить гостре, тому замовте додаткову воду."),
    ("sweet", "/swiːt/", "солодкий", "adjective", "A2", "food", "Їжа, Напої & Ресторани", "I prefer fresh fruit over sweet candy.", "Я віддаю перевагу свіжим фруктам перед солодкими цукерками."),
    ("boil", "/bɔɪl/", "варити, кипіти", "verb", "A2", "food", "Їжа, Напої & Ресторани", "Boil water in the kettle before making tea.", "Закип'ятіть воду в чайнику перед заварюванням чаю."),
    ("bake", "/beɪk/", "випікати", "verb", "A2", "food", "Їжа, Напої & Ресторани", "My grandmother loves to bake apple pies.", "Моя бабуся любить випікати яблучні пироги."),
    ("fry", "/fraɪ/", "смажити", "verb", "A2", "food", "Їжа, Напої & Ресторани", "Fry the onions in olive oil until golden brown.", "Обсмажте цибулю на оливковій олії до золотистого кольору."),
    ("bill", "/bɪl/", "рахунок (у закладі)", "noun", "A2", "food", "Їжа, Напої & Ресторани", "Excuse me, could we please have the bill?", "Перепрошую, чи могли б ми отримати рахунок?"),
    ("tip", "/tɪp/", "чайові", "noun", "A2", "food", "Їжа, Напої & Ресторани", "We left a generous tip for our friendly waiter.", "Ми залишили щедрі чайові нашому привітному офіціантові."),
    ("appointment", "/əˈpɔɪnt.mənt/", "запис на прийом, візит", "noun", "A2", "health", "Здоров'я & Тіло", "I have a dentist appointment tomorrow at 10 AM.", "У мене запис до стоматолога завтра о 10 ранку."),
    ("pain", "/peɪn/", "біль", "noun", "A2", "health", "Здоров'я & Тіло", "Tell the doctor where the pain is located.", "Скажіть лікарю, де саме відчувається біль."),
    ("fever", "/ˈfiː.vər/", "жар, підвищена температура", "noun", "A2", "health", "Здоров'я & Тіло", "Take paracetamol if you have a high fever.", "Прийміть парацетамол, якщо у вас висока температура."),
    ("cough", "/kɒf/", "кашель, кашляти", "noun", "A2", "health", "Здоров'я & Тіло", "She has had a dry cough for three days.", "У неї сухий кашель уже три дні."),
    ("bandage", "/ˈbæn.dɪdʒ/", "бинт, пов'язка", "noun", "A2", "health", "Здоров'я & Тіло", "The nurse put a clean bandage on his arm.", "Медсестра наклала чисту пов'язку на його руку."),
    ("pill", "/pɪl/", "таблетка, пігулка", "noun", "A2", "health", "Здоров'я & Тіло", "Swallow one pill with a glass of water.", "Ковтніть одну пігулку, запиваючи склянкою води."),
    ("proud", "/praʊd/", "гордий", "adjective", "A2", "emotions", "Емоції & Характер", "Her parents were proud of her graduation.", "Її батьки пишалися тим, що вона закінчила навчання."),
    ("nervous", "/ˈnɜː.vəs/", "нервовий, схвильований", "adjective", "A2", "emotions", "Емоції & Характер", "He felt nervous before speaking on stage.", "Він нервував перед виступом на сцені."),
    ("calm", "/kɑːm/", "спокійний", "adjective", "A2", "emotions", "Емоції & Характер", "Deep breathing helps you stay calm under pressure.", "Глибоке дихання допомагає залишатися спокійним під тиском."),
    ("curious", "/ˈkjʊə.ri.əs/", "допитливий, цікавий", "adjective", "A2", "emotions", "Емоції & Характер", "Children are naturally curious about the world.", "Діти від природи допитливі до навколишнього світу."),
    ("jealous", "/ˈdʒel.əs/", "заздрісний, ревнивий", "adjective", "A2", "emotions", "Емоції & Характер", "Try not to feel jealous of other people's success.", "Намагайтеся не заздрити успіхам інших людей."),
    ("lonely", "/ˈləʊn.li/", "самотній", "adjective", "A2", "emotions", "Емоції & Характер", "Moving to a new city can feel lonely at first.", "Переїзд до нового міста спочатку може здатися самотнім."),
    ("charger", "/ˈtʃɑː.dʒər/", "зарядний пристрій", "noun", "A2", "tech", "Технології & IT", "Did you pack your phone charger in your backpack?", "Ти поклав зарядний пристрій для телефона в рюкзак?"),
    ("battery", "/ˈbæt.ər.i/", "акумулятор, батарея", "noun", "A2", "tech", "Технології & IT", "My laptop battery lasts for eight hours.", "Батарея мого ноутбука тримає вісім годин."),
    ("screen", "/skriːn/", "екран, дисплей", "noun", "A2", "tech", "Технології & IT", "Don't stare at the bright screen in the dark.", "Не дивіться на яскравий екран у темряві."),
    ("download", "/ˌdaʊnˈləʊd/", "завантажувати (з інтернету)", "verb", "A2", "tech", "Технології & IT", "You can download the course materials for free.", "Ви можете завантажити матеріали курсу безкоштовно."),
    ("upload", "/ʌpˈləʊd/", "вивантажувати (в інтернет)", "verb", "A2", "tech", "Технології & IT", "Upload your homework assignment as a PDF file.", "Вивантажте домашнє завдання у форматі PDF."),
    ("folder", "/ˈfəʊl.dər/", "папка", "noun", "A2", "tech", "Технології & IT", "Save all project files inside this folder.", "Збережіть усі файли проєкту всередині цієї папки."),
    ("customer", "/ˈkʌs.tə.mər/", "клієнт, покупець", "noun", "A2", "career", "Робота, Бізнес & Кар'єра", "Always greet every customer with a warm smile.", "Завжди вітайте кожного клієнта теплою посмішкою."),
    ("colleague", "/ˈkɒl.iːɡ/", "колега", "noun", "A2", "career", "Робота, Бізнес & Кар'єра", "I discussed the quarterly report with my colleague.", "Я обговорив квартальний звіт зі своїм колегою."),
    ("uniform", "/ˈjuː.nɪ.fɔːm/", "уніформа, формений одяг", "noun", "A2", "career", "Робота, Бізнес & Кар'єра", "Flight attendants wear a distinctive dark uniform.", "Бортпровідники носять характерну темну уніформу."),
    ("factory", "/ˈfæk.tər.i/", "завод, фабрика", "noun", "A2", "career", "Робота, Бізнес & Кар'єра", "The automobile factory employs two thousand workers.", "Автомобільний завод працевлаштовує дві тисячі робітників."),
    ("shift", "/ʃɪft/", "зміна (робоча)", "noun", "A2", "career", "Робота, Бізнес & Кар'єра", "She works the night shift at the logistics center.", "Вона працює в нічну зміну в логістичному центрі."),
    ("salary", "/ˈsæl.ər.i/", "заробітна плата", "noun", "A2", "career", "Робота, Бізнес & Кар'єра", "They offered him a competitive starting salary.", "Йому запропонували конкурентну стартову зарплату."),

    # ==================== B1 ADDITIONS (~75 words) ====================
    ("opportunity", "/ˌɒp.əˈtjuː.nə.ti/", "можливість, нагода", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Studying abroad opens up a life-changing opportunity.", "Навчання за кордоном відкриває нагоду, що змінює життя."),
    ("ambition", "/æmˈbɪʃ.ən/", "амбіція, прагнення", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Her chief ambition is to lead an international startup.", "Її головна амбіція — очолити міжнародний стартап."),
    ("achievement", "/əˈtʃiːv.mənt/", "досягнення, успіх", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Winning the tournament was an outstanding achievement.", "Перемога в турнірі була видатним досягненням."),
    ("promotion", "/prəˈməʊ.ʃən/", "підвищення на посаді", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Hard work earned him a promotion to department head.", "Наполеглива праця принесла йому підвищення до керівника відділу."),
    ("candidate", "/ˈkæn.dɪ.dət/", "кандидат, претендент", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "The candidate impressed the interview panel with clear answers.", "Кандидат вразив комісію чіткими відповідями."),
    ("contract", "/ˈkɒn.trækt/", "договір, контракт", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Carefully read all terms before signing the contract.", "Уважно прочитайте всі умови перед підписанням контракту."),
    ("qualification", "/ˌkwɒl.ɪ.fɪˈkeɪ.ʃən/", "кваліфікація, фах", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Do you have the necessary qualifications for this role?", "Чи маєте ви необхідну кваліфікацію для цієї посади?"),
    ("feedback", "/ˈfiːd.bæk/", "зворотний зв'язок, відгук", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Constructive feedback helps our team improve each sprint.", "Конструктивний зворотний зв'язок допомагає команді вдосконалюватися в кожному спринті."),
    ("negotiate", "/nəˈɡəʊ.ʃi.eɪt/", "вести переговори, домовлятися", "verb", "B1", "career", "Робота, Бізнес & Кар'єра", "Both companies agreed to negotiate a fair partnership.", "Обидві компанії погодилися провести переговори щодо чесного партнерства."),
    ("responsibility", "/rɪˌspɒn.sɪˈbɪl.ə.ti/", "відповідальність, обов'язок", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Taking responsibility is the first step toward leadership.", "Взяття на себе відповідальності — це перший крок до лідерства."),
    ("artificial intelligence", "/ˌɑː.tɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/", "штучний інтелект", "noun", "B1", "tech", "Технології & IT", "Artificial intelligence assists doctors in analyzing scans.", "Штучний інтелект допомагає лікарям аналізувати знімки."),
    ("cybersecurity", "/ˌsaɪ.bə.sɪˈkjʊə.rə.ti/", "кібербезпека", "noun", "B1", "tech", "Технології & IT", "Banks invest heavily in cybersecurity to safeguard customer data.", "Банки інвестують значні кошти в кібербезпеку для захисту даних клієнтів."),
    ("database", "/ˈdeɪ.tə.beɪs/", "база даних", "noun", "B1", "tech", "Технології & IT", "All user profiles are indexed in a secure database.", "Усі профілі користувачів проіндексовані в захищеній базі даних."),
    ("algorithm", "/ˈæl.ɡə.rɪ.ðəm/", "алгоритм", "noun", "B1", "tech", "Технології & IT", "Search algorithms rank web pages based on relevance.", "Пошукові алгоритми ранжують веб-сторінки на основі релевантності."),
    ("privacy", "/ˈprɪv.ə.si/", "конфіденційність, приватність", "noun", "B1", "tech", "Технології & IT", "Review your privacy settings on social media regularly.", "Регулярно перевіряйте налаштування конфіденційності в соціальних мережах."),
    ("software", "/ˈsɒft.weər/", "програмне забезпечення", "noun", "B1", "tech", "Технології & IT", "We use modern software to edit high-definition video.", "Ми використовуємо сучасне програмне забезпечення для монтажу відео високої чіткості."),
    ("hardware", "/ˈhɑːd.weər/", "апаратне забезпечення, залізо", "noun", "B1", "tech", "Технології & IT", "Upgrading hardware speeds up gaming performance significantly.", "Оновлення апаратного забезпечення значно прискорює продуктивність в іграх."),
    ("environment", "/ɪnˈvaɪ.rən.mənt/", "довкілля, навколишнє середовище", "noun", "B1", "society", "Суспільство & Екологія", "Plastic waste causes severe harm to the marine environment.", "Пластикові відходи завдають серйозної шкоди морському довкіллю."),
    ("pollution", "/pəˈluː.ʃən/", "забруднення", "noun", "B1", "society", "Суспільство & Екологія", "Air pollution in major capitals has reached alarming levels.", "Забруднення повітря у великих столицях досягло тривожного рівня."),
    ("recycling", "/ˌriːˈsaɪ.klɪŋ/", "переробка відходів", "noun", "B1", "society", "Суспільство & Екологія", "Recycling glass and paper conserves natural resources.", "Переробка скла та паперу зберігає природні ресурси."),
    ("climate", "/ˈklaɪ.mət/", "клімат", "noun", "B1", "society", "Суспільство & Екологія", "Global leaders debated urgent measures against climate change.", "Світові лідери обговорили невідкладні заходи проти зміни клімату."),
    ("renewable", "/rɪˈnjuː.ə.bəl/", "відновлюваний", "adjective", "B1", "society", "Суспільство & Екологія", "Solar and wind energy are prime sources of renewable power.", "Сонячна та вітрова енергія є головними джерелами відновлюваного живлення."),
    ("volunteer", "/ˌvɒl.ənˈtɪər/", "волонтер; бути волонтером", "noun", "B1", "society", "Суспільство & Екологія", "She works as a volunteer at an animal shelter on Saturdays.", "Щосуботи вона працює волонтером у притулку для тварин."),
    ("charity", "/ˈtʃær.ə.ti/", "благодійність, благодійна організація", "noun", "B1", "society", "Суспільство & Екологія", "All proceeds from the concert went to a local charity.", "Усі виручені з концерту кошти пішли до місцевої благодійної організації."),
    ("community", "/kəˈmjuː.nə.ti/", "спільнота, громада", "noun", "B1", "society", "Суспільство & Екологія", "Our neighborhood community organized a park clean-up day.", "Наша мікрорайонна громада організувала день прибирання парку."),
    ("citizen", "/ˈsɪt.ɪ.zən/", "громадянин", "noun", "B1", "society", "Суспільство & Екологія", "Every responsible citizen exercises the democratic right to vote.", "Кожен свідомий громадянин користується демократичним правом голосу."),
    ("destination", "/ˌdes.tɪˈneɪ.ʃən/", "пункт призначення", "noun", "B1", "travel", "Подорожі & Транспорт", "Kyoto is one of the most scenic destinations in Japan.", "Кіото є одним з наймальовничіших пунктів призначення в Японії."),
    ("accommodation", "/əˌkɒm.əˈdeɪ.ʃən/", "проживання, житло", "noun", "B1", "travel", "Подорожі & Транспорт", "The tour price includes both flights and hotel accommodation.", "Вартість туру включає як переліт, так і проживання в готелі."),
    ("itinerary", "/aɪˈtɪn.ər.ər.i/", "маршрут подорожі", "noun", "B1", "travel", "Подорожі & Транспорт", "We planned an intensive four-day sightseeing itinerary.", "Ми спланували насичений чотириденний екскурсійний маршрут."),
    ("insurance", "/ɪnˈʃɔː.rəns/", "страхування, поліс", "noun", "B1", "travel", "Подорожі & Транспорт", "Travel insurance covers medical emergencies abroad.", "Туристичне страхування покриває невідкладні медичні випадки за кордоном."),
    ("sightseeing", "/ˈsaɪtˌsiː.ɪŋ/", "огляд визначних пам'яток", "noun", "B1", "travel", "Подорожі & Транспорт", "We spent the entire afternoon sightseeing in historic Rome.", "Ми провели весь день, оглядаючи визначні пам'ятки історичного Риму."),
    ("explore", "/ɪkˈsplɔːr/", "досліджувати, розвідувати", "verb", "B1", "travel", "Подорожі & Транспорт", "Hikers love to explore hidden trails in the mountains.", "Мандрівники обожнюють досліджувати приховані гірські стежки."),
    ("fluent", "/ˈfluː.ənt/", "вільний у мовленні", "adjective", "B1", "education", "Освіта & Мова", "She is fluent in three European languages.", "Вона вільно володіє трьома європейськими мовами."),
    ("bilingual", "/baɪˈlɪŋ.ɡwəl/", "двомовний", "adjective", "B1", "education", "Освіта & Мова", "Growing up in a bilingual home brings lifelong cognitive benefits.", "Зростання у двомовній сім'ї приносить тривалі когнітивні переваги."),
    ("pronunciation", "/prəˌnʌn.siˈeɪ.ʃən/", "вимова", "noun", "B1", "education", "Освіта & Мова", "Clear pronunciation makes conversations much easier to follow.", "Чітка вимова робить розмови набагато легшими для сприйняття."),
    ("assignment", "/əˈsaɪn.mənt/", "завдання, навчальна робота", "noun", "B1", "education", "Освіта & Мова", "Submit your essay assignment through the online portal.", "Здайте своє письмове есе через онлайн-портал."),
    ("lecture", "/ˈlek.tʃər/", "лекція; читати лекцію", "noun", "B1", "education", "Освіта & Мова", "The visiting professor gave a lecture on modern architecture.", "Запрошений професор прочитав лекцію про сучасну архітектуру."),
    ("evaluate", "/ɪˈvæl.ju.eɪt/", "оцінювати, аналізувати", "verb", "B1", "education", "Освіта & Мова", "Teachers evaluate creative thinking as well as factual recall.", "Вчителі оцінюють креативне мислення так само, як і знання фактів."),
    ("nutrition", "/njuːˈtrɪʃ.ən/", "харчування, нутриціологія", "noun", "B1", "health", "Здоров'я & Тіло", "Balanced nutrition fuels peak athletic performance.", "Збалансоване харчування забезпечує максимальну спортивну форму."),
    ("treatment", "/ˈtriːt.mənt/", "лікування, терапія", "noun", "B1", "health", "Здоров'я & Тіло", "Early medical treatment speeds up recovery from illness.", "Раннє медичне лікування прискорює одужання від хвороби."),
    ("symptom", "/ˈsɪmp.təm/", "симптом", "noun", "B1", "health", "Здоров'я & Тіло", "Fatigue and headache are common symptoms of dehydration.", "Втома й головний біль є поширеними симптомами зневоднення."),
    ("prescription", "/prɪˈskrɪp.ʃən/", "рецепт лікаря", "noun", "B1", "health", "Здоров'я & Тіло", "You need a doctor's prescription for these antibiotics.", "Вам потрібен рецепт лікаря для придбання цих антибіотиків."),
    ("recovery", "/rɪˈkʌv.ər.i/", "відновлення, одужання", "noun", "B1", "health", "Здоров'я & Тіло", "Adequate rest is crucial for full physical recovery.", "Належний відпочинок має вирішальне значення для повного фізичного відновлення."),
    ("confident", "/ˈkɒn.fɪ.dənt/", "впевнений у собі", "adjective", "B1", "emotions", "Емоції & Характер", "Practicing in advance helps you feel confident on stage.", "Попередня практика допомагає почуватися впевнено на сцені."),
    ("grateful", "/ˈɡreɪt.fəl/", "вдячний", "adjective", "B1", "emotions", "Емоції & Характер", "I am truly grateful for your helpful mentorship.", "Я щиро вдячний за ваше корисне наставництво."),
    ("anxious", "/ˈæŋk.ʃəs/", "тривожний, стурбований", "adjective", "B1", "emotions", "Емоції & Характер", "It is normal to feel anxious before a major job interview.", "Це цілком природно — почуватися тривожно перед важливою співбесідою."),
    ("frustrated", "/frʌsˈtreɪ.tɪd/", "розчарований, пригнічений", "adjective", "B1", "emotions", "Емоції & Характер", "Users get frustrated when an application crashes repeatedly.", "Користувачі дратуються, коли додаток постійно вилітає."),
    ("enthusiastic", "/ɪnˌθjuː.ziˈæs.tɪk/", "сповнений ентузіазму, захоплений", "adjective", "B1", "emotions", "Емоції & Характер", "Our volunteers are enthusiastic about protecting wildlife.", "Наші волонтери сповнені ентузіазму щодо захисту дикої природи."),
    ("empathetic", "/ˌem.pəˈθet.ɪk/", "чуйний, емпатичний", "adjective", "B1", "emotions", "Емоції & Характер", "An empathetic listener creates trust in any relationship.", "Емпатичний слухач викликає довіру в будь-яких стосунках."),
    ("determined", "/dɪˈtɜː.mɪnd/", "рішучий, цілеспрямований", "adjective", "B1", "emotions", "Емоції & Характер", "She is determined to finish the marathon despite rainy weather.", "Вона налаштована рішуче пробігти марафон попри дощову погоду."),
    ("patient", "/ˈpeɪ.ʃənt/", "терплячий", "adjective", "B1", "emotions", "Емоції & Характер", "Be patient with yourself while learning a challenging language.", "Будьте терплячими до себе під час вивчення складної мови."),
    ("reliable", "/rɪˈlaɪ.ə.bəl/", "надійний", "adjective", "B1", "emotions", "Емоції & Характер", "A reliable partner always keeps promises and meets commitments.", "Надійний партнер завжди дотримується обіцянок і виконує зобов'язання."),
    ("figure out", "/ˈfɪɡ.ər aʊt/", "з'ясувати, розібратися", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Let's work together to figure out the solution.", "Давайте співпрацювати разом, щоб розібратися з цим рішенням."),
    ("bring up", "/brɪŋ ʌp/", "порушувати питання, згадувати", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "She decided to bring up the budget concerns during the meeting.", "Вона вирішила порушити питання бюджету під час зустрічі."),
    ("look forward to", "/lʊk ˈfɔː.wəd tuː/", "з нетерпінням чекати на", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "I look forward to hearing your fresh ideas.", "Я з нетерпінням чекаю почути ваші свіжі ідеї."),
    ("run into", "/rʌn ˈɪn.tuː/", "випадково зустріти", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "I didn't expect to run into my old classmate at the mall.", "Я не очікував випадково зустріти свого однокласника в торговому центрі."),
    ("set off", "/set ɒf/", "вирушати в дорогу", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "We must set off before sunrise to beat the rush hour.", "Ми повинні вирушити в дорогу до сходу сонця, щоб уникнути години пік."),
    ("hold on", "/həʊld ɒn/", "зачекати (секундочку)", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Hold on for a second while I grab a notepad.", "Зачекайте секундочку, поки я візьму блокнот."),
    ("carry on", "/ˈkær.i ɒn/", "продовжувати", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Carry on with your assignment while I check your drafts.", "Продовжуйте виконувати завдання, поки я перевіряю ваші чернетки."),
    ("get along", "/ɡet əˈlɒŋ/", "ладнати, мати хороші стосунки", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "The two teammates get along remarkably well.", "Двоє членів команди напрочуд добре ладнають між собою."),
    ("turn out", "/tɜːn aʊt/", "виявитися в результаті", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "The test turned out to be much easier than anticipated.", "Тест виявився набагато легшим, ніж передбачалося."),
    ("count on", "/kaʊnt ɒn/", "розраховувати на когось", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "You can always count on Maria in critical moments.", "Ви завжди можете розраховувати на Марію в критичні моменти."),
    ("put off", "/pʊt ɒf/", "відкладати на потім", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Never put off until tomorrow what you can achieve today.", "Ніколи не відкладай на завтра те, що можеш досягти сьогодні."),
    ("check out", "/tʃek aʊt/", "перевіряти; виселятися з готелю", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "We need to check out of our hotel room by 11 AM.", "Нам потрібно виселитися з готельного номера до 11 ранку."),
    ("give up", "/ɡɪv ʌp/", "здаватися, кидати звичку", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Never give up when facing early obstacles in learning.", "Ніколи не здавайся перед першими труднощами у навчанні."),
    ("break down", "/breɪk daʊn/", "ламатися; розбирати на частини", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Our car broke down halfway through the mountain trip.", "Наша машина зламалася на півдорозі гірської мандрівки."),
    ("pick up", "/pɪk ʌp/", "підбирати; схоплювати на льоту", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Kids pick up foreign languages remarkably fast.", "Діти схоплюють іноземні мови напрочуд швидко."),
    ("call off", "/kɔːl ɒf/", "скасовувати (захід чи зустріч)", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "The match was called off because of severe lightning.", "Матч скасували через сильну грозу."),
    ("catch up", "/kætʃ ʌp/", "наздоганяти, надолужувати", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Let's grab a coffee and catch up on everything.", "Давай візьмемо каву й надолужимо всі новини."),
    ("find out", "/faɪnd aʊt/", "дізнатися, виявити", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "I need to find out what time the museum opens.", "Мені потрібно дізнатися, о котрій годині відкривається музей."),
    ("grow up", "/ɡrəʊ ʌp/", "виростати, дорослішати", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "She grew up in a quiet village near the mountains.", "Вона виросла в тихому селі поблизу гір."),
    ("keep on", "/kiːp ɒn/", "продовжувати невпинно діяти", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Keep on practicing every single day to see real progress.", "Продовжуй практикуватися щодня, щоб побачити справжній прогрес."),
    ("show up", "/ʃəʊ ʌp/", "з'являтися, приходити", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Over fifty eager developers showed up for the workshop.", "Понад п'ятдесят охочих розробників прийшли на воркшоп."),

    # ==================== B2 ADDITIONS (~80 words) ====================
    ("entrepreneur", "/ˌɒn.trə.prəˈnɜːr/", "підприємець", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "A visionary entrepreneur identifies unmet market demands.", "Далекоглядний підприємець помічає незадоволені потреби ринку."),
    ("negotiation", "/nəˌɡəʊ.ʃiˈeɪ.ʃən/", "переговори, перемовини", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "The wage negotiation reached a mutually beneficial agreement.", "Переговори щодо заробітної плати завершилися взаємовигідною домовленістю."),
    ("revenue", "/ˈrev.ən.juː/", "виручка, дохід", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Subscription services generate dependable recurring revenue.", "Підписні сервіси генерують надійний регулярний дохід."),
    ("investment", "/ɪnˈvest.mənt/", "інвестиція, вкладення", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Investing in renewable infrastructure pays long-term dividends.", "Інвестування у відновлювану інфраструктуру приносить довгострокові дивіденди."),
    ("stakeholder", "/ˈsteɪkˌhəʊl.dər/", "зацікавлена сторона, стейкхолдер", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "We consulted key stakeholders before enacting the corporate policy.", "Ми проконсультувалися з ключовими стейкхолдерами перед запровадженням політики."),
    ("benchmark", "/ˈbentʃ.mɑːk/", "еталон, стандарт порівняння", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Our customer satisfaction rating sets an industry benchmark.", "Наш рейтинг задоволеності клієнтів встановлює орієнтир для всієї галузі."),
    ("liability", "/ˌlaɪ.əˈbɪl.ə.ti/", "зобов'язання, юридична відповідальність", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "The insurance policy shields the firm against financial liability.", "Страховий поліс захищає фірму від фінансової відповідальності."),
    ("monopoly", "/məˈnɒp.əl.i/", "монополія", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Antitrust regulations prevent any single supplier from establishing a monopoly.", "Антимонопольне регулювання запобігає встановленню монополії одним постачальником."),
    ("diversification", "/daɪˌvɜː.sɪ.fɪˈkeɪ.ʃən/", "диверсифікація", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Portfolio diversification reduces exposure to stock market volatility.", "Диверсифікація портфеля зменшує ризик від коливань на фондовому ринку."),
    ("acquisition", "/ˌæk.wɪˈzɪʃ.ən/", "поглинання компанії, придбання", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "The tech giant announced the strategic acquisition of an AI lab.", "Технологічний гігант оголосив про стратегічне придбання лабораторії ШІ."),
    ("breakthrough", "/ˈbreɪk.θruː/", "прорив, революційне відкриття", "noun", "B2", "tech", "Технології & IT", "Quantum computing represents a monumental scientific breakthrough.", "Квантові обчислення становлять колосальний науковий прорив."),
    ("implementation", "/ˌɪm.plɪ.menˈteɪ.ʃən/", "впровадження, реалізація", "noun", "B2", "tech", "Технології & IT", "Successful implementation requires rigorous automated testing.", "Успішне впровадження вимагає ретельного автоматизованого тестування."),
    ("automation", "/ˌɔː.təˈmeɪ.ʃən/", "автоматизація", "noun", "B2", "tech", "Технології & IT", "Industrial automation eliminates repetitive manual tasks.", "Промислова автоматизація ліквідує монотонні ручні завдання."),
    ("cutting-edge", "/ˌkʌt.ɪŋ ˈedʒ/", "найсучасніший, передовий", "adjective", "B2", "tech", "Технології & IT", "The clinic employs cutting-edge robotic surgical equipment.", "Клініка використовує найсучасніше роботизоване хірургічне обладнання."),
    ("encryption", "/ɪnˈkrɪp.ʃən/", "шифрування", "noun", "B2", "tech", "Технології & IT", "End-to-end encryption ensures only intended recipients read communications.", "Наскрізне шифрування гарантує, що лише адресат прочитає повідомлення."),
    ("analytics", "/ˌæn.əlˈɪt.ɪks/", "аналітика даних", "noun", "B2", "tech", "Технології & IT", "Web analytics guide data-driven marketing decisions.", "Веб-аналітика скеровує маркетингові рішення на основі даних."),
    ("optimization", "/ˌɒp.tɪ.maɪˈzeɪ.ʃən/", "оптимізація", "noun", "B2", "tech", "Технології & IT", "Code optimization reduced page load times by half.", "Оптимізація коду скоротила час завантаження сторінки вдвічі."),
    ("scalable", "/ˈskeɪ.lə.bəl/", "масштабований", "adjective", "B2", "tech", "Технології & IT", "Cloud infrastructure provides a highly scalable framework for growth.", "Хмарна інфраструктура забезпечує високомасштабовану основу для зростання."),
    ("sustainability", "/səˌsteɪ.nəˈbɪl.ə.ti/", "сталий розвиток, екологічність", "noun", "B2", "society", "Суспільство & Екологія", "Corporate sustainability commitments cut carbon emissions in manufacturing.", "Зобов'язання щодо сталого розвитку зменшують викиди вуглецю у виробництві."),
    ("biodiversity", "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/", "біорізноманіття", "noun", "B2", "society", "Суспільство & Екологія", "Protecting rainforests preserves irreplaceable global biodiversity.", "Захист тропічних лісів зберігає неповторне світове біорізноманіття."),
    ("carbon footprint", "/ˌkɑː.bən ˈfʊt.prɪnt/", "вуглецевий слід", "noun", "B2", "society", "Суспільство & Екологія", "Flying less is an effective way to lower your personal carbon footprint.", "Зменшення авіаперельотів — дієвий спосіб зменшити особистий вуглецевий слід."),
    ("deforestation", "/diːˌfɒr.ɪˈsteɪ.ʃən/", "вирубка лісів, знеліснення", "noun", "B2", "society", "Суспільство & Екологія", "Satellite monitoring combats illegal deforestation across the Amazon.", "Супутниковий моніторинг протидіє нелегальній вирубці лісів в Амазонії."),
    ("conservation", "/ˌkɒn.səˈveɪ.ʃən/", "збереження природи, охорона довкілля", "noun", "B2", "society", "Суспільство & Екологія", "Wildlife conservation requires global treaties and local community backing.", "Охорона дикої природи вимагає міжнародних договорів та підтримки громад."),
    ("inequality", "/ˌɪn.ɪˈkwɒl.ə.ti/", "нерівність", "noun", "B2", "society", "Суспільство & Екологія", "Equal access to high-quality schooling helps eradicate income inequality.", "Рівний доступ до якісної освіти допомагає подолати нерівність у доходах."),
    ("legislation", "/ˌledʒ.ɪˈsleɪ.ʃən/", "законодавство, нормативний акт", "noun", "B2", "society", "Суспільство & Екологія", "The parliament approved landmark data protection legislation.", "Парламент ухвалив знаменне законодавство про захист даних."),
    ("reform", "/rɪˈfɔːm/", "реформа; реформувати", "noun", "B2", "society", "Суспільство & Екологія", "Judicial reform reinforces public trust in legal institutions.", "Судова реформа зміцнює довіру суспільства до правових інституцій."),
    ("comprehensive", "/ˌkɒm.prɪˈhen.sɪv/", "всеосяжний, комплексний", "adjective", "B2", "education", "Освіта & Мова", "The guide provides a comprehensive overview of English syntax.", "Посібник містить всеосяжний огляд англійського синтаксису."),
    ("plausible", "/ˈplɔː.zə.bəl/", "правдоподібний, імовірний", "adjective", "B2", "education", "Освіта & Мова", "The detective presented a plausible explanation for the crime.", "Детектив представив правдоподібне пояснення злочину."),
    ("substantial", "/səbˈstæn.ʃəl/", "суттєвий, значний", "adjective", "B2", "education", "Освіта & Мова", "They made substantial progress on the infrastructure project.", "Вони досягли суттєвого прогресу в інфраструктурному проєкті."),
    ("subtle", "/ˈsʌt.əl/", "тонкий, ледь помітний", "adjective", "B2", "emotions", "Емоції & Характер", "There was a subtle difference in the tones of their voices.", "У тоні їхніх голосів була ледь помітна тонка відмінність."),
    ("consistent", "/kənˈsɪs.tənt/", "послідовний, узгоджений", "adjective", "B2", "education", "Освіта & Мова", "Consistent daily practice is the secret to mastering any craft.", "Послідовна щоденна практика — це секрет опанування будь-якої майстерності."),
    ("coherent", "/kəʊˈhɪə.rənt/", "зв'язний, логічно побудований", "adjective", "B2", "education", "Освіта & Мова", "She articulated a coherent strategy for brand internationalization.", "Вона сформулювала зв'язну стратегію інтернаціоналізації бренду."),
    ("versatile", "/ˈvɜː.sə.taɪl/", "універсальний, різнобічний", "adjective", "B2", "career", "Робота, Бізнес & Кар'єра", "A versatile software engineer adapts quickly to new frameworks.", "Універсальний інженер-програміст швидко адаптується до нових фреймворків."),
    ("ambiguous", "/æmˈbɪɡ.ju.əs/", "неоднозначний, двозначний", "adjective", "B2", "education", "Освіта & Мова", "Avoid ambiguous instructions when assigning critical milestones.", "Уникайте неоднозначних інструкцій, призначаючи критичні контрольні точки."),
    ("resilient", "/rɪˈzɪl.jənt/", "стійкий, життєздатний", "adjective", "B2", "emotions", "Емоції & Характер", "Resilient individuals emerge stronger from career setbacks.", "Стійкі люди виходять сильнішими з професійних невдач."),
    ("assertive", "/əˈsɜː.tɪv/", "впевнений, наполегливий, асертивний", "adjective", "B2", "emotions", "Емоції & Характер", "Assertive communication allows you to state boundaries with dignity.", "Асертивне спілкування дозволяє з гідністю відстоювати власні межі."),
    ("cynical", "/ˈsɪn.ɪ.kəl/", "цинічний, недовірливий", "adjective", "B2", "emotions", "Емоції & Характер", "Constant disillusionment made him cynical about public promises.", "Постійне розчарування зробило його цинічним щодо обіцянок."),
    ("rational", "/ˈræʃ.ən.əl/", "раціональний, розсудливий", "adjective", "B2", "emotions", "Емоції & Характер", "Maintain a rational perspective even in high-stress crisis meetings.", "Зберігайте раціональний погляд навіть на кризових зустрічах у стані стресу."),
    ("charismatic", "/ˌkær.ɪzˈmæt.ɪk/", "харизматичний", "adjective", "B2", "emotions", "Емоції & Характер", "The charismatic keynote speaker captivated the auditorium.", "Харизматичний ключовий спікер зачарував усю аудиторію."),
    ("diplomatic", "/ˌdɪp.ləˈmæt.ɪk/", "дипломатичний, тактовний", "adjective", "B2", "career", "Робота, Бізнес & Кар'єра", "She gave a diplomatic response that calmed both disagreeing sides.", "Вона дала тактовну відповідь, яка заспокоїла обидві конфліктуючі сторони."),
    ("conscientious", "/ˌkɒn.ʃiˈen.ʃəs/", "сумлінний, добросовісний", "adjective", "B2", "career", "Робота, Бізнес & Кар'єра", "A conscientious auditor thoroughly reviews every receipt and invoice.", "Сумлінний аудитор ретельно перевіряє кожен чек і накладну."),
    ("see eye to eye", "/siː aɪ tuː aɪ/", "сходитися в поглядах", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "My co-founder and I do not always see eye to eye on design.", "Ми з співзасновником не завжди повністю сходимося в поглядах щодо дизайну."),
    ("bite the bullet", "/baɪt ðə ˈbʊl.ɪt/", "зціпити зуби, наважитися на важке", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "We decided to bite the bullet and rewrite the legacy backend.", "Ми вирішили зціпити зуби й переписати застарілу серверну частину."),
    ("hit the nail on the head", "/hɪt ðə neɪl ɒn ðə hed/", "влучити в яблучко, точно вгадати", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Her analysis of market churn hit the nail on the head.", "Її аналіз відтоку клієнтів влучив прямо в яблучко."),
    ("through thick and thin", "/θruː θɪk ænd θɪn/", "крізь вогонь і воду", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "True friends stand by one another through thick and thin.", "Справжні друзі підтримують одне одного у радості та горі."),
    ("under the weather", "/ˈʌn.dər ðə ˈweð.ər/", "нездужати, почуватися кепсько", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "I am feeling a bit under the weather today, so I will rest.", "Сьогодні я трохи нездужаю, тому залишуся відпочити."),
    ("burn the midnight oil", "/bɜːn ðə ˈmɪd.naɪt ɔɪl/", "працювати допізна", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Law students burn the midnight oil before the bar exam.", "Студенти-правники засиджуються допізна перед адвокатським іспитом."),
    ("cut corners", "/kʌt ˈkɔː.nəz/", "халтурити, економити на якості", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Never cut corners on security testing when building financial tools.", "Ніколи не економте на якості безпекових тестів у фінансових сервісах."),
    ("think outside the box", "/θɪŋk aʊtˈsaɪd ðə bɒks/", "мислити нестандартно", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Creative engineers think outside the box to bypass technical hurdles.", "Креативні інженери мислять нестандартно, долаючи технічні перешкоди."),
    ("blessing in disguise", "/ˌbles.ɪŋ ɪn dɪsˈɡaɪz/", "нема лиха без добра", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Losing that client was a blessing in disguise as it sparked innovation.", "Втрата того клієнта виявилася благом, адже спонукала нас до інновацій."),
    ("actions speak louder than words", "/ˈæk.ʃənz spiːk ˈlaʊ.dər ðæn wɜːdz/", "вчинки говорять гучніше за слова", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Promises mean nothing when actions speak louder than words.", "Обіцянки нічого не варті, коли вчинки говорять голосніше за будь-які слова."),
    ("fall through", "/fɔːl θruː/", "зірватися (про плани)", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "The property purchase fell through because financing was denied.", "Купівля нерухомості зірвалася, оскільки було відмовлено у кредитуванні."),
    ("boil down to", "/bɔɪl daʊn tuː/", "зводитися до (суті)", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "Every business negotiation boils down to trust and shared value.", "Будь-які ділові переговори зводяться до довіри та спільної цінності."),
    ("account for", "/əˈkaʊnt fɔːr/", "становити частку; пояснювати", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "Online orders account for sixty percent of our overall sales.", "Онлайн-замовлення становлять шістдесят відсотків наших загальних продажів."),
    ("back up", "/bæk ʌp/", "підтверджувати фактами; бекапити", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "Back up your claims with verifiable empirical evidence.", "Підтверджуйте свої твердження перевіреними емпіричними доказами."),
    ("phase out", "/feɪz aʊt/", "поступово згортати, виводити", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "The city council plans to phase out diesel buses by 2030.", "Міська рада планує поступово вивести з експлуатації дизельні автобуси до 2030 року."),
    ("brush up on", "/brʌʃ ʌp ɒn/", "освіжити в пам'яті", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "I must brush up on my Spanish before travelling to Madrid.", "Я мушу освіжити в пам'яті іспанську мову перед поїздкою до Мадрида."),
    ("narrow down", "/ˈnær.əʊ daʊn/", "звужувати вибір", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "We narrowed down the list of candidates to three finalists.", "Ми звузили перелік кандидатів до трьох фіналістів."),
    ("stand out", "/stænd aʊt/", "вирізнятися", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "Her innovative design stands out from competing submissions.", "Її інноваційний дизайн яскраво вирізняється серед робіт конкурентів."),
    ("pull off", "/pʊl ɒf/", "успішно здійснити", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "It was a daring strategy, but they managed to pull it off.", "Це була зухвала стратегія, проте їм вдалося успішно її втілити."),
    ("bridge the gap", "/brɪdʒ ðə ɡæp/", "подолати розрив", "phrase", "B2", "career", "Робота, Бізнес & Кар'єра", "Internship programs help students bridge the gap into professional work.", "Програми стажування допомагають студентам подолати розрив із роботою."),
    ("burnout", "/ˈbɜːn.aʊt/", "професійне вигорання", "noun", "B2", "health", "Здоров'я & Тіло", "Regular breaks prevent severe emotional burnout at work.", "Регулярні перерви запобігають серйозному емоційному вигоранню на роботі."),
    ("wellbeing", "/ˌwelˈbiː.ɪŋ/", "благополуччя, добробут", "noun", "B2", "health", "Здоров'я & Тіло", "Workplace ergonomics contribute directly to physical wellbeing.", "Ергономіка робочого місця безпосередньо впливає на фізичне благополуччя."),
    ("overwhelmed", "/ˌəʊ.vəˈwelmd/", "перевантажений емоційно", "adjective", "B2", "emotions", "Емоції & Характер", "I felt overwhelmed by the sudden flood of emails.", "Я відчув себе перевантаженим раптовим потоком електронних листів."),
    ("spontaneous", "/spɒnˈteɪ.ni.əs/", "спонтанний, невимушений", "adjective", "B2", "emotions", "Емоції & Характер", "A spontaneous road trip can create unforgettable memories.", "Спонтанна автомобільна мандрівка може створити незабутні спогади."),
    ("pragmatic", "/præɡˈmæt.ɪk/", "прагматичний, практичний", "adjective", "B2", "career", "Робота, Бізнес & Кар'єра", "A pragmatic leader balances bold vision with grounded execution.", "Прагматичний лідер поєднує сміливе бачення з практичним виконанням."),

    # ==================== C1 ADDITIONS (~70 words) ====================
    ("juxtaposition", "/ˌdʒʌk.stə.pəˈzɪʃ.ən/", "зіставлення контрастів", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "The juxtaposition of traditional architecture with glass skyscrapers creates aesthetic tension.", "Зіставлення традиційної архітектури зі скляними хмарочосами створює естетичну напругу."),
    ("paradigm", "/ˈpær.ə.daɪm/", "парадигма, система поглядів", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Quantum physics introduced a radical shift in scientific paradigm.", "Квантова фізика запровадила радикальний зсув у науковій парадигмі."),
    ("dichotomy", "/daɪˈkɒt.ə.mi/", "дихотомія, поділ на дві протилежності", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Scholars question the rigid dichotomy between mind and body.", "Вчені ставлять під сумнів жорстку дихотомію між розумом і тілом."),
    ("ephemeral", "/ɪˈfem.ər.əl/", "ефемерний, швидкоплинний", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Trends on social platforms are notoriously ephemeral.", "Тренди на соціальних платформах є надзвичайно швидкоплинними."),
    ("nuance", "/ˈnjuː.ɑːns/", "нюанс, тонкий відтінок", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "A skilled translator captures every delicate cultural nuance.", "Вправний перекладач вловлює кожен тонкий культурний нюанс."),
    ("quintessential", "/ˌkwɪn.tɪˈsen.ʃəl/", "найхарактерніший, квінтесенційний", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Afternoon tea remains a quintessential British tradition.", "Післяобідній чай залишається найхарактернішою британською традицією."),
    ("esoteric", "/ˌes.əˈter.ɪk/", "езотеричний, доступний небагатьом", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "The paper explored esoteric mathematical topology formulas.", "Стаття досліджувала вузькоспеціалізовані топологічні математичні формули."),
    ("intrinsic", "/ɪnˈtrɪn.zɪk/", "притаманний, внутрішній", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Curiosity possesses an intrinsic value in scientific discovery.", "Допитливість має невіддільну внутрішню цінність для наукових відкриттів."),
    ("extrapolate", "/ɪkˈstræp.ə.leɪt/", "екстраполювати, проектувати", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "Economists extrapolate future GDP figures from current production trends.", "Економісти екстраполюють майбутні показники ВВП на основі поточних виробничих тенденцій."),
    ("substantiate", "/səbˈstæn.ʃi.eɪt/", "обґрунтовувати доказами", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "The defense attorney failed to substantiate the witness's claims.", "Адвокат захисту не зміг обґрунтувати заяви свідка доказами."),
    ("delineate", "/dɪˈlɪn.i.eɪt/", "окреслювати, демаркувати межі", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "The contractual terms clearly delineate the responsibilities of each partner.", "Умови контракту чітко окреслюють обов'язки кожного партнера."),
    ("articulate", "/ɑːˈtɪk.jə.lət/", "чітко формулювати; красномовний", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "She can articulate complex technical ideas in plain terms.", "Вона вміє чітко формулювати складні технічні ідеї простими словами."),
    ("circumvent", "/ˌsɜː.kəmˈvent/", "обійти, перехитрити перешкоду", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "Sophisticated hackers attempted to circumvent two-factor authentication.", "Досвідчені хакери спробували обійти двофакторну автентифікацію."),
    ("elucidate", "/iˈluː.sɪ.deɪt/", "роз'яснювати, висвітлювати", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "The diagram elucidates the neural network architecture.", "Діаграма роз'яснює архітектуру нейронної мережі."),
    ("repudiate", "/rɪˈpjuː.di.eɪt/", "відкидати, спростовувати", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "The author repudiated unfounded accusations of intellectual plagiarism.", "Автор рішуче відкинув безпідставні звинувачення в інтелектуальному плагіаті."),
    ("scrutinize", "/ˈskruː.tɪ.naɪz/", "пильно вивчати, інспектувати", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "Regulators closely scrutinize cross-border financial transactions.", "Регулятори прискіпливо вивчають транскордонні фінансові операції."),
    ("consolidate", "/kənˈsɒl.ɪ.deɪt/", "зміцнювати, об'єднувати", "verb", "C1", "career", "Робота, Бізнес & Кар'єра", "The merger allowed both brands to consolidate their European presence.", "Злиття дозволило обом брендам зміцнити свої позиції в Європі."),
    ("proliferate", "/prəˈlɪf.ər.eɪt/", "стрімко поширюватися", "verb", "C1", "society", "Суспільство & Екологія", "Smart home devices have proliferated across urban households.", "Пристрої розумного дому стрімко поширилися в міських оселях."),
    ("eloquent", "/ˈel.ə.kwənt/", "красномовний, переконливий", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "His eloquent oration moved the delegates to standing applause.", "Його переконлива красномовна промова спонукала делегатів аплодувати стоячи."),
    ("meticulous", "/məˈtɪk.jə.ləs/", "педантичний, надретельний", "adjective", "C1", "career", "Робота, Бізнес & Кар'єра", "Meticulous quality assurance prevents catastrophic software outages.", "Педантичний контроль якості запобігає катастрофічним збоям у ПЗ."),
    ("unprecedented", "/ʌnˈpres.ɪ.den.tɪd/", "безпрецедентний", "adjective", "C1", "society", "Суспільство & Екологія", "The global economy faced unprecedented disruption during the pandemic.", "Світова економіка зіткнулася з небаченим раніше збоєм під час пандемії."),
    ("infallible", "/ɪnˈfæl.ə.bəl/", "безпомилковий", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "No automated translation engine is completely infallible.", "Жоден автоматизований рушій перекладу не є абсолютно безпомилковим."),
    ("precarious", "/prɪˈkeə.ri.əs/", "хиткий, ненадійний", "adjective", "C1", "career", "Робота, Бізнес & Кар'єра", "Relying on a single revenue stream leaves any venture in a precarious state.", "Залежність від єдиного джерела доходу залишає будь-яке підприємство в хиткому становищі."),
    ("profound", "/prəˈfaʊnd/", "глибокий, фундаментальний", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Generative AI exerts a profound influence on intellectual workflows.", "Генеративний штучний інтелект чинить глибокий вплив на інтелектуальні робочі процеси."),
    ("tenacious", "/təˈneɪ.ʃəs/", "наполегливий, незламний", "adjective", "C1", "emotions", "Емоції & Характер", "Tenacious research teams crack problems that baffle others.", "Наполегливі дослідницькі команди розв'язують задачі, які ставлять інших у глухий кут."),
    ("formidable", "/fɔːˈmɪd.ə.bəl/", "грізний, гігантський", "adjective", "C1", "career", "Робота, Бізнес & Кар'єра", "The new entrant poses a formidable competitive challenge.", "Новий гравець на ринку становить грізний конкурентний виклик."),
    ("obsolete", "/ˌɒb.səˈliːt/", "застарілий, віджилий", "adjective", "C1", "tech", "Технології & IT", "Legacy disk drives quickly became obsolete with the advent of cloud drives.", "Традиційні дисководи швидко застаріли з появою хмарних сховищ."),
    ("viable", "/ˈvaɪ.ə.bəl/", "життєздатний, практичний", "adjective", "C1", "career", "Робота, Бізнес & Кар'єра", "Is this monetization model economically viable in the long run?", "Чи є ця модель монетизації економічно життєздатною в довгостроковій перспективі?"),
    ("prerequisite", "/ˌpriːˈrek.wɪ.zɪt/", "передумова, попередня вимога", "noun", "C1", "education", "Освіта & Мова", "Discrete mathematics is a prerequisite for advanced machine learning.", "Дискретна математика є обов'язковою передумовою для поглибленого машинного навчання."),
    ("disparity", "/dɪˈspær.ə.ti/", "диспропорція, різка різниця", "noun", "C1", "society", "Суспільство & Екологія", "Regional economic disparities require targeted regional development programs.", "Регіональні економічні диспропорції вимагають цільових програм розвитку."),
    ("anomaly", "/əˈnɒm.ə.li/", "аномалія, відхилення", "noun", "C1", "tech", "Технології & IT", "Telemetry alerts flagged a sharp traffic anomaly at midnight.", "Система телеметрії зафіксувала різку аномалію мережевого трафіку опівночі."),
    ("culmination", "/ˌkʌl.mɪˈneɪ.ʃən/", "кульмінація, вершина досягнень", "noun", "C1", "career", "Робота, Бізнес & Кар'єра", "This product launch is the culmination of three years of engineering.", "Цей запуск продукту є кульмінацією трьох років інженерної праці."),
    ("propensity", "/prəˈpen.sə.ti/", "схильність, нахил", "noun", "C1", "emotions", "Емоції & Характер", "Humans possess an innate propensity for storytelling and community.", "Люди мають вроджену схильність до оповідання історій та об'єднання у спільноти."),
    ("mitigation", "/ˌmɪt.ɪˈɡeɪ.ʃən/", "пом'якшення наслідків", "noun", "C1", "society", "Суспільство & Екологія", "Climate mitigation requires transitioning energy grids to zero carbon.", "Пом'якшення наслідків зміни клімату вимагає переходу енергосистем на нульові викиди."),
    ("repercussion", "/ˌriː.pəˈkʌʃ.ən/", "негативні наслідки, відгомін", "noun", "C1", "society", "Суспільство & Екологія", "Geopolitical tensions trigger serious economic repercussions globally.", "Геополітична напруга спричиняє серйозні економічні наслідки по всьому світу."),
    ("hierarchy", "/ˈhaɪə.rɑː.ki/", "ієрархія", "noun", "C1", "career", "Робота, Бізнес & Кар'єра", "Agile companies often replace rigid corporate hierarchy with fluid squads.", "Гнучкі компанії часто замінюють жорстку корпоративну ієрархію динамічними командами."),
    ("coalition", "/ˌkəʊ.əˈlɪʃ.ən/", "коаліція, союз", "noun", "C1", "society", "Суспільство & Екологія", "A coalition of environmental NGOs submitted a joint declaration.", "Коаліція екологічних громадських організацій подала спільну декларацію."),
    ("notwithstanding", "/ˌnɒt.wɪðˈstæn.dɪŋ/", "незважаючи на, всупереч", "preposition", "C1", "academic", "C1 Академічна лексика & Дебати", "Notwithstanding recent setbacks, venture capital investment remains robust.", "Незважаючи на нещодавні труднощі, венчурне інвестування залишається потужним."),
    ("conversely", "/ˈkɒn.vɜːs.li/", "навпаки, на противагу", "adverb", "C1", "academic", "C1 Академічна лексика & Дебати", "Exercise lowers stress; conversely, sedentary habits amplify fatigue.", "Фізичні вправи знижують стрес; навпаки, малорухливий спосіб життя посилює втому."),
    ("ostensibly", "/ɒsˈten.sɪ.bli/", "нібито, на перший погляд", "adverb", "C1", "academic", "C1 Академічна лексика & Дебати", "The measures were ostensibly aimed at reducing administrative costs.", "Заходи нібито мали на меті скорочення адміністративних витрат."),
    ("invariably", "/ɪnˈveə.ri.ə.bli/", "незмінно, обов'язково", "adverb", "C1", "academic", "C1 Академічна лексика & Дебати", "Cutting corners on testing invariably leads to production bugs.", "Економія на тестуванні незмінно призводить до помилок на продакшені."),
    ("consequently", "/ˈkɒn.sɪ.kwənt.li/", "як наслідок, відповідно", "adverb", "C1", "academic", "C1 Академічна лексика & Дебати", "The data pipeline failed; consequently, dashboard statistics paused.", "Конвеєр даних дав збій; як наслідок, оновлення аналітичної панелі призупинилося."),
    ("albeit", "/ɔːlˈbiː.ɪt/", "хоча й, нехай навіть", "conjunction", "C1", "academic", "C1 Академічна лексика & Дебати", "They completed the migration on time, albeit with significant overtime.", "Вони завершили міграцію вчасно, хоча й зі значними перепрацюваннями."),
    ("inadvertently", "/ˌɪn.ədˈvɜː.tənt.li/", "ненавмисно, ненароком", "adverb", "C1", "academic", "C1 Академічна лексика & Дебати", "He inadvertently deleted an uncommitted configuration branch.", "Він ненавмисно видалив гілку конфігурації, яка не була зафіксована."),
    ("touch upon", "/tʌtʃ əˈpɒn/", "побіжно торкатися теми", "phrasal_verb", "C1", "academic", "C1 Академічна лексика & Дебати", "The keynote only touched upon the ethical implications of autonomous robotics.", "Доповідач лише побіжно торкнувся етичних наслідків автономної робототехніки."),
    ("shed light on", "/ʃed laɪt ɒn/", "пролити світло на", "phrase", "C1", "academic", "C1 Академічна лексика & Дебати", "Recent archaeological excavations shed light on Bronze Age trade networks.", "Нещодавні археологічні розкопки пролили світло на торговельні мережі бронзової доби."),
    ("take with a grain of salt", "/teɪk wɪð ə ɡreɪn ɒv sɒlt/", "сприймати зі скепсисом", "idiom", "C1", "idioms", "Ідіоми & Розмовна мова", "Take online rumors with a grain of salt until verified by primary sources.", "Сприймайте чутки з інтернету зі скепсисом, доки вони не підтверджені першоджерелами."),
    ("leave no stone unturned", "/liːv nəʊ stəʊn ʌnˈtɜːnd/", "перевірити все до дрібниць", "idiom", "C1", "idioms", "Ідіоми & Розмовна мова", "Forensic auditors left no stone unturned during the inquiry.", "Судові аудитори перевірили все до найменших дрібниць під час розслідування."),
    ("come to terms with", "/kʌm tuː tɜːmz wɪð/", "змиритися з реальністю", "phrase", "C1", "emotions", "Емоції & Характер", "It took months to come to terms with the unexpected project cancellation.", "Знадобилися місяці, щоб змиритися з несподіваним скасуванням проєкту."),
    ("a moot point", "/ə muːt pɔɪnt/", "спірне, неактуальне питання", "idiom", "C1", "academic", "C1 Академічна лексика & Дебати", "Whether we could have launched sooner is now a moot point.", "Чи могли ми запуститися раніше — зараз уже суто академічне й неактуальне питання."),

    # Extra A2 additions (+10)
    ("journey", "/ˈdʒɜː.ni/", "подорож, поїздка", "noun", "A2", "travel", "Подорожі & Транспорт", "They went on a long train journey through Europe.", "Вони вирушили в довгу подорож поїздом Європою."),
    ("guidebook", "/ˈɡaɪd.bʊk/", "путівник", "noun", "A2", "travel", "Подорожі & Транспорт", "The guidebook recommends the best museums in town.", "Путівник рекомендує найкращі музеї в місті."),
    ("souvenir", "/ˌsuː.vənˈɪər/", "сувенір", "noun", "A2", "travel", "Подорожі & Транспорт", "I bought a handcrafted magnet as a souvenir.", "Я купив магніт ручної роботи як сувенір."),
    ("guest", "/ɡest/", "гість", "noun", "A2", "daily", "Повсякдення & Дім", "We invited five guests for dinner tonight.", "Ми запросили п'ятьох гостей на вечерю сьогодні ввечері."),
    ("neighbor", "/ˈneɪ.bər/", "сусід", "noun", "A2", "daily", "Повсякдення & Дім", "Our neighbor is always polite and helpful.", "Наш сусід завжди ввічливий і готовий допомогти."),
    ("kitchenware", "/ˈkɪtʃ.ɪn.weər/", "кухонне начиння, посуд", "noun", "A2", "food", "Їжа, Напої & Ресторани", "Store the kitchenware neatly in the wooden cabinet.", "Зберігайте кухонне начиння охайно в дерев'яній шафі."),
    ("dessert", "/dɪˈzɜːt/", "десерт", "noun", "A2", "food", "Їжа, Напої & Ресторани", "Would you like chocolate mousse for dessert?", "Бажаєте шоколадний мус на десерт?"),
    ("snack", "/snæk/", "перекус, легка закуска", "noun", "A2", "food", "Їжа, Напої & Ресторани", "Apples and nuts make a nutritious snack.", "Яблука та горіхи — поживний перекус."),
    ("gym", "/dʒɪm/", "спортзал, тренажерний зал", "noun", "A2", "health", "Здоров'я & Тіло", "He goes to the local gym three times a week.", "Він ходить до місцевого спортзалу тричі на тиждень."),
    ("stomach", "/ˈstʌm.ək/", "шлунок, живіт", "noun", "A2", "health", "Здоров'я & Тіло", "Drink warm chamomile tea if your stomach hurts.", "Випий теплого ромашкового чаю, якщо болить живіт."),

    # Extra B1 additions (+15)
    ("collocation", "/ˌkɒl.əˈkeɪ.ʃən/", "стале словосполучення", "noun", "B1", "education", "Освіта & Мова", "Learning natural collocations improves speaking fluency.", "Вивчення природних словосполучень покращує плавність мовлення."),
    ("deadline", "/ˈded.laɪn/", "крайній термін, дедлайн", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "We must finalize all slides before Friday's deadline.", "Ми повинні завершити всі слайди до дедлайну в п'ятницю."),
    ("presentation", "/ˌprez.ənˈteɪ.ʃən/", "презентація, виступ", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "She delivered an engaging presentation on AI trends.", "Вона виступила із захопливою презентацією про тренди ШІ."),
    ("strategy", "/ˈstræt.ə.dʒi/", "стратегія, план дій", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "A clear digital strategy drives sustainable growth.", "Чітка цифрова стратегія забезпечує стале зростання."),
    ("budget", "/ˈbʌdʒ.ɪt/", "бюджет", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "The department managed to complete work within budget.", "Відділу вдалося завершити роботу в межах бюджету."),
    ("efficiency", "/ɪˈfɪʃ.ən.si/", "ефективність, продуктивність", "noun", "B1", "career", "Робота, Бізнес & Кар'єра", "Automation software increases overall team efficiency.", "Програмне забезпечення для автоматизації підвищує ефективність команди."),
    ("innovation", "/ˌɪn.əˈveɪ.ʃən/", "інновація, нововведення", "noun", "B1", "tech", "Технології & IT", "Technological innovation revolutionizes modern healthcare.", "Технологічні інновації революціонізують сучасну охорону здоров'я."),
    ("network", "/ˈnet.wɜːk/", "мережа, зв'язок", "noun", "B1", "tech", "Технології & IT", "The local Wi-Fi network requires a secure password.", "Локальна мережа Wi-Fi вимагає надійного пароля."),
    ("security", "/sɪˈkjʊə.rə.ti/", "безпека, захист", "noun", "B1", "tech", "Технології & IT", "Always enable multi-factor security on your accounts.", "Завжди вмикайте багатофакторну безпеку у своїх акаунтах."),
    ("generation", "/ˌdʒen.əˈreɪ.ʃən/", "покоління", "noun", "B1", "society", "Суспільство & Екологія", "The younger generation is passionate about climate solutions.", "Молодше покоління пристрасно виступає за кліматичні рішення."),
    ("tradition", "/trəˈdɪʃ.ən/", "традиція, звичай", "noun", "B1", "society", "Суспільство & Екологія", "Baking festive bread is an ancient family tradition.", "Випікання святкового хліба — давня сімейна традиція."),
    ("heritage", "/ˈher.ɪ.tɪdʒ/", "спадщина, культурне надбання", "noun", "B1", "society", "Суспільство & Екологія", "Preserving national cultural heritage is a national priority.", "Збереження національної культурної спадщини є державним пріоритетом."),
    ("settle down", "/ˈset.əl daʊn/", "осісти, заспокоїтися", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "After years of travel, they settled down in a quiet coastal town.", "Після років мандрів вони осіли в тихому прибережному містечку."),
    ("work out", "/wɜːk aʊt/", "тренуватися; вдаватися, вирішуватися", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "Everything will work out if we stay calm and persistent.", "Усе вирішиться на краще, якщо ми зберігатимемо спокій і наполегливість."),
    ("pass by", "/pɑːs baɪ/", "проходити повз", "phrasal_verb", "B1", "phrasal", "Фразові дієслова", "A friendly stranger smiled as she passed by on the street.", "Привітний незнайомець посміхнувся, проходячи повз на вулиці."),

    # Extra B2 additions (+25)
    ("fluctuation", "/ˌflʌk.tʃuˈeɪ.ʃən/", "коливання, нестійкість", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Currency fluctuations impact international shipping rates.", "Коливання курсів валют впливають на тарифи міжнародних перевезень."),
    ("incentive", "/ɪnˈsen.tɪv/", "стимул, заохочення", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Performance bonuses act as a motivating incentive for teams.", "Бонуси за результативність слугують мотивуючим стимулом для команд."),
    ("outsource", "/ˈaʊt.sɔːs/", "передавати на аутсорсинг", "verb", "B2", "career", "Робота, Бізнес & Кар'єра", "Many tech firms outsource server monitoring to specialists.", "Багато технологічних компаній віддають моніторинг серверів на аутсорсинг фахівцям."),
    ("leverage", "/ˈliː.vər.ɪdʒ/", "ефективно використовувати важіль", "verb", "B2", "career", "Робота, Бізнес & Кар'єра", "We must leverage customer data to tailor personalized services.", "Ми повинні використати дані клієнтів для надання персоналізованих послуг."),
    ("synergy", "/ˈsɪn.ə.dʒi/", "синергія, спільний ефект", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "The synergy between design and engineering sped up deployment.", "Синергія між дизайном та інженерією прискорила запуск."),
    ("paradoxical", "/ˌpær.əˈdɒk.sɪ.kəl/", "парадоксальний", "adjective", "B2", "education", "Освіта & Мова", "It sounds paradoxical, but slowing down can increase productivity.", "Це звучить парадоксально, але сповільнення темпу може підвищити продуктивність."),
    ("proactive", "/prəʊˈæk.tɪv/", "проактивний, ініціативний", "adjective", "B2", "career", "Робота, Бізнес & Кар'єра", "A proactive approach solves potential system bugs before launch.", "Проактивний підхід усуває потенційні баги системи ще до запуску."),
    ("receptive", "/rɪˈsep.tɪv/", "відкритий до нового, сприйнятливий", "adjective", "B2", "emotions", "Емоції & Характер", "Great managers remain receptive to constructive peer suggestions.", "Чудові керівники залишаються відкритими до конструктивних пропозицій колег."),
    ("sustainable", "/səˈsteɪ.nə.bəl/", "сталий, екологічно безпечний", "adjective", "B2", "society", "Суспільство & Екологія", "We need sustainable farming practices to conserve freshwater.", "Нам потрібні сталі методи землеробства для збереження прісної води."),
    ("empathy", "/ˈem.pə.θi/", "емпатія, співпереживання", "noun", "B2", "emotions", "Емоції & Характер", "Empathy enables designers to build truly human-centered apps.", "Емпатія дозволяє дизайнерам створювати по-справжньому людиноорієнтовані додатки."),
    ("integrity", "/ɪnˈteɡ.rə.ti/", "чесність, порядність, доброчесність", "noun", "B2", "career", "Робота, Бізнес & Кар'єра", "Personal integrity is the bedrock of trustworthy leadership.", "Особиста доброчесність є наріжним каменем лідерства, що викликає довіру."),
    ("resilience", "/rɪˈzɪl.jəns/", "стійкість, здатність відновлюватися", "noun", "B2", "emotions", "Емоції & Характер", "Mental resilience helps professionals navigate economic downturns.", "Психологічна стійкість допомагає фахівцям долати економічні спади."),
    ("vulnerable", "/ˈvʌl.nər.ə.bəl/", "вразливий", "adjective", "B2", "emotions", "Емоції & Характер", "Admitting mistakes makes you human rather than vulnerable.", "Визнання помилок робить вас людяним, а не вразливим."),
    ("skeptical", "/ˈskep.tɪ.kəl/", "скептичний", "adjective", "B2", "emotions", "Емоції & Характер", "Engineers are skeptical of unmeasured performance claims.", "Інженери скептично ставляться до заяв про продуктивність без вимірювань."),
    ("spill the beans", "/spɪl ðə biːnz/", "виказати таємницю, проговоритися", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Do not spill the beans about the surprise anniversary celebration.", "Не проговорися про сюрприз до святкування річниці."),
    ("piece of cake", "/piːs ɒv keɪk/", "простіше простого, пара дрібниць", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Once you grasp the logic, passing the exam is a piece of cake.", "Щойно ти зрозумієш логіку, скласти іспит буде простіше простого."),
    ("cost an arm and a leg", "/kɒst ən ɑːm ænd ə leɡ/", "коштувати шалених грошей", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Organic groceries do not need to cost an arm and a leg.", "Органічні продукти не обов'язково мають коштувати шалених грошей."),
    ("barking up the wrong tree", "/ˈbɑː.kɪŋ ʌp ðə rɒŋ triː/", "шукати не там, помилятися з адресатом", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "If you think I approved this bug, you are barking up the wrong tree.", "Якщо ти вважаєш, що я схвалив цей баг, ти шукаєш винного не там."),
    ("let the cat out of the bag", "/let ðə kæt aʊt ɒv ðə bæɡ/", "видати секрет випадково", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Someone let the cat out of the bag before the press release.", "Хтось випадково видав секрет ще до публікації пресрелізу."),
    ("once in a blue moon", "/wʌns ɪn ə bluː muːn/", "дуже рідко, раз на сто років", "idiom", "B2", "idioms", "Ідіоми & Розмовна мова", "Snow falls in this valley only once in a blue moon.", "Сніг випадає в цій долині лише раз на сто років."),
    ("take for granted", "/teɪk fɔːr ˈɡrɑːn.tɪd/", "сприймати як належне", "phrase", "B2", "emotions", "Емоції & Характер", "Never take good health or trusted friends for granted.", "Ніколи не сприймайте міцне здоров'я чи вірних друзів як належне."),
    ("wrap up", "/ræp ʌp/", "завершувати (зустріч чи проект)", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "Let's wrap up this meeting and summarize our action items.", "Давайте завершимо цю зустріч і підсумуємо пункти дій."),
    ("opt out", "/ɒpt aʊt/", "відмовлятися від участі, відписуватися", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "Subscribers can easily opt out of promotional newsletters.", "Підписники можуть легко відмовитися від рекламних розсилок."),
    ("run out of", "/rʌn aʊt ɒv/", "закінчуватися (про запаси, час)", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "We are running out of time to submit the grant application.", "У нас закінчується час для подання заявки на грант."),
    ("take over", "/teɪk ˈəʊ.vər/", "переймати контроль або управління", "phrasal_verb", "B2", "phrasal", "Фразові дієслова", "She will take over management of the international branch next month.", "Вона перейме управління міжнародним філіалом наступного місяця."),

    # Extra C1 additions (+30)
    ("cognitive", "/ˈkɒɡ.nə.tɪv/", "когнітивний, розумовий", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Learning musical instruments enhances child cognitive development.", "Гра на музичних інструментах покращує когнітивний розвиток дитини."),
    ("epistemology", "/ɪˌpɪs.tɪˈmɒl.ə.dʒi/", "епістемологія, теорія пізнання", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Epistemology investigates the origins and limitations of human knowledge.", "Епістемологія досліджує походження та межі людського знання."),
    ("hermeneutics", "/ˌhɜː.mɪˈnjuː.tɪks/", "герменевтика, теорія тлумачення", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Literary hermeneutics explores diverse contextual readings of classic poetry.", "Літературна герменевтика досліджує різноманітні контекстуальні прочитання класичної поезії."),
    ("salient", "/ˈseɪ.li.ənt/", "найпомітніший, визначальний, суттєвий", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "The summary highlights the most salient points of the doctoral thesis.", "Анотація висвітлює найбільш суттєві положення докторської дисертації."),
    ("anachronistic", "/əˌnæk.rəˈnɪs.tɪк/", "анахронічний, застарілий для епохи", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Monarchic absolute privileges feel utterly anachronistic in a modern democracy.", "Абсолютні монархічні привілеї виглядають цілковито анахронічними в сучасній демократії."),
    ("unequivocal", "/ˌʌn.ɪˈkwɪv.ə.kəl/", "однозначний, беззаперечний", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "The experimental findings provide unequivocal proof of the hypothesis.", "Результати експерименту надають однозначний доказ гіпотези."),
    ("concomitant", "/kənˈkɒm.ɪ.tənt/", "супутній, супровідний", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "Rapid economic industrialization brought concomitant social dislocations.", "Стрімка економічна індустріалізація спричинила супутні соціальні зрушення."),
    ("hegemony", "/hɪˈɡem.ən.i/", "гегемонія, верховенство, домінування", "noun", "C1", "society", "Суспільство & Екологія", "The essay critiques linguistic hegemony in international publication outlets.", "Есе критикує мовну гегемонію в міжнародних наукових виданнях."),
    ("pragmatism", "/ˈpræɡ.mə.tɪ.zəm/", "прагматизм", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Diplomats favored hardheaded pragmatism over dogmatic theoretical ideology.", "Дипломати надали перевагу тверезому прагматизму над догматичною theoretical ідеологією."),
    ("circumlocution", "/ˌsɜː.kəm.ləˈkjuː.ʃən/", "багатослів'я, манівці у мовленні", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Get to the thesis statement directly without unnecessary circumlocution.", "Переходьте до тези безпосередньо, уникаючи зайвого багатослів'я."),
    ("disillusionment", "/ˌdɪs.ɪˈluː.ʒən.mənt/", "розчарування, втрата ілюзій", "noun", "C1", "emotions", "Емоції & Характер", "Widespread disillusionment with public figures fueled grassroots activism.", "Масове розчарування в публічних діячах підживило низовий громадянський активізм."),
    ("equivocal", "/ɪˈkwɪv.ə.kəl/", "двозначний, непевний", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "His equivocal remarks left both political factions uncertain of his stance.", "Його двозначні зауваження залишили обидві фракції в невідомості щодо його позиції."),
    ("idiosyncrasy", "/ˌɪd.i.əˈsɪŋ.krə.si/", "індивідуальна особливість, специфіка", "noun", "C1", "emotions", "Емоції & Характер", "Every natural language has grammatical idiosyncrasies that defy simple rules.", "Кожна природна мова має граматичні особливості, що суперечать простим правилам."),
    ("inexorable", "/ɪnˈek.sər.ə.bəl/", "невблаганний, невідворотний", "adjective", "C1", "society", "Суспільство & Екологія", "The inexorable march of technological progress reshapes every industry.", "Невблаганна хода технологічного прогресу змінює кожну галузь."),
    ("lucid", "/ˈluː.sɪd/", "ясний, чіткий, зрозумілий", "adjective", "C1", "academic", "C1 Академічна лексика & Дебати", "The mathematician gave a remarkably lucid proof of the theorem.", "Математик надав напрочуд ясний і зрозумілий доказ теореми."),
    ("myriad", "/ˈmɪr.i.əd/", "незліченна кількість, міріади", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "A myriad of variables influence consumer purchasing choices.", "Незліченна кількість змінних впливає на вибір споживачів."),
    ("pervasive", "/pəˈveɪ.sɪv/", "всюдисущий, всепроникний", "adjective", "C1", "society", "Суспільство & Екологія", "Smartphones have exerted a pervasive influence on daily modern routines.", "Смартфони справили всепроникний вплив на щоденний сучасний розпорядок."),
    ("reciprocal", "/rɪˈsɪp.rə.kəl/", "взаємний, зворотний", "adjective", "C1", "career", "Робота, Бізнес & Кар'єра", "Healthy international alliances rest upon reciprocal commitments.", "Міцні міжнародні альянси ґрунтуються на взаємних зобов'язаннях."),
    ("scrutiny", "/ˈskruː.tɪ.ni/", "ретельний огляд, пильний контроль", "noun", "C1", "career", "Робота, Бізнес & Кар'єра", "Financial audits subject corporate spending to public scrutiny.", "Фінансовий аудит піддає корпоративні витрати пильному громадському контролю."),
    ("tangible", "/ˈtæn.dʒə.bəl/", "відчутний, матеріальний, реальний", "adjective", "C1", "career", "Робота, Бізнес & Кар'єра", "The new workflow produced tangible improvements in engineering speed.", "Новий робочий процес приніс відчутне покращення швидкості інженерної розробки."),
    ("veracity", "/vəˈræs.ə.ti/", "правдивість, достовірність", "noun", "C1", "academic", "C1 Академічна лексика & Дебати", "Fact-checkers verify the veracity of viral multimedia reports.", "Фактчекери перевіряють правдивість вірусних мультимедійних повідомлень."),
    ("zealous", "/ˈzel.əs/", "завзятий, палкий, ревний", "adjective", "C1", "emotions", "Емоції & Характер", "Zealous advocates for digital privacy lobbied the parliament.", "Завзяті захисники цифрової приватності лобіювали свої інтереси в парламенті."),
    ("acumen", "/ˈæk.jə.mən/", "проникливість, кмітливість, ділова хватка", "noun", "C1", "career", "Робота, Бізнес & Кар'єра", "Her keen financial acumen guided the venture to sustained profitability.", "Її гостра фінансова проникливість привела стартап до стабільної прибутковості."),
    ("bolster", "/ˈbəʊl.stər/", "зміцнювати, підтримувати", "verb", "C1", "career", "Робота, Бізнес & Кар'єра", "Additional venture funding bolstered the company's research division.", "Додаткове венчурне фінансування зміцнило дослідницький підрозділ компанії."),
    ("debunk", "/diːˈbʌŋk/", "розвінчувати, викривати міфи", "verb", "C1", "academic", "C1 Академічна лексика & Дебати", "The paper thoroughly debunks common misconceptions about clean energy.", "Наукова праця ґрунтовно розвінчує поширені міфи про чисту енергетику."),
    ("expedite", "/ˈek.spə.daɪt/", "прискорювати виконання процесу", "verb", "C1", "career", "Робота, Бізнес & Кар'єра", "Automated visa processing expedites travel clearance for delegates.", "Автоматизована обробка віз прискорює оформлення поїздок для делегатів."),
    ("foster", "/ˈfɒs.tər/", "сприяти розвитку, виховувати", "verb", "C1", "education", "Освіта & Мова", "Inclusive classrooms foster collaborative and creative curiosity.", "Інклюзивні класи сприяють розвитку спільної та творчої допитливості."),
    ("galvanize", "/ˈɡæl.və.naɪz/", "активізувати, спонукати до дій", "verb", "C1", "society", "Суспільство & Екологія", "The documentary galvanized worldwide action on climate justice.", "Документальний фільм спонукав світову спільноту до рішучих дій щодо кліматичної справедливості.")
]

def build_all():
    seen_words = set()
    combined = []
    
    # Process base
    for item in base_words:
        word_key = item[0].strip().lower()
        if word_key not in seen_words:
            seen_words.add(word_key)
            combined.append({
                "word": item[0],
                "transcription": item[1],
                "translationUk": item[2],
                "partOfSpeech": item[3],
                "level": item[4],
                "category": item[5],
                "categoryUk": item[6],
                "exampleEn": item[7],
                "exampleUk": item[8]
            })
            
    # Process more
    added_count = 0
    for item in more_words:
        word_key = item[0].strip().lower()
        if word_key not in seen_words:
            seen_words.add(word_key)
            combined.append({
                "word": item[0],
                "transcription": item[1],
                "translationUk": item[2],
                "partOfSpeech": item[3],
                "level": item[4],
                "category": item[5],
                "categoryUk": item[6],
                "exampleEn": item[7],
                "exampleUk": item[8]
            })
            added_count += 1
            
    print(f"Total unique words: {len(combined)} (Base: {len(base_words)}, Newly added: {added_count})")
    
    # Assign ids
    formatted = []
    for idx, w in enumerate(combined):
        formatted.append({
            "id": f"vocab-{idx + 1}",
            **w
        })
        
    out_dir = r"C:\Users\user\Desktop\lingua-flow\src\data"
    out_file = os.path.join(out_dir, "vocabularyBank.ts")
    
    content = f"""import {{ VocabularyWord, VocabularyCategoryInfo }} from '@/types/vocabulary';

export const VOCABULARY_CATEGORIES: VocabularyCategoryInfo[] = {json.dumps(categories, ensure_ascii=False, indent=2)};

export const VOCABULARY_BANK: VocabularyWord[] = {json.dumps(formatted, ensure_ascii=False, indent=2)};
"""
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    # Also write to scratch
    scratch_file = r"C:\Users\user\.gemini\antigravity\scratch\lingua-flow\src\data\vocabularyBank.ts"
    with open(scratch_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Successfully written {len(formatted)} words to {out_file} and scratch!")

if __name__ == "__main__":
    build_all()
