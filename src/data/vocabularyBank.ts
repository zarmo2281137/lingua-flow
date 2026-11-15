import { VocabularyWord, VocabularyCategoryInfo } from '@/types/vocabulary';
import rawWords from './vocabularyWords.json';

export const VOCABULARY_CATEGORIES: VocabularyCategoryInfo[] = [
  {
    "id": "daily",
    "nameUk": "Повсякдення & Дім",
    "nameEn": "Daily Life & Home",
    "emoji": "☕",
    "descriptionUk": "Розпорядок дня, оселя, базові дії, час та щоденні звички"
  },
  {
    "id": "travel",
    "nameUk": "Подорожі & Транспорт",
    "nameEn": "Travel & Transport",
    "emoji": "✈️",
    "descriptionUk": "Аеропорт, вокзал, готелі, квитки, орієнтування у місті"
  },
  {
    "id": "food",
    "nameUk": "Їжа, Напої & Ресторани",
    "nameEn": "Food & Dining",
    "emoji": "🍕",
    "descriptionUk": "Продукти, ресторанне меню, приготування страв та смаки"
  },
  {
    "id": "career",
    "nameUk": "Робота, Бізнес & Кар'єра",
    "nameEn": "Work & Business",
    "emoji": "💼",
    "descriptionUk": "Офіс, співбесіда, дедлайни, переговори, фінанси та проєкти"
  },
  {
    "id": "emotions",
    "nameUk": "Емоції & Характер",
    "nameEn": "Emotions & People",
    "emoji": "🧠",
    "descriptionUk": "Почуття, психологія, риси особистості та стосунки"
  },
  {
    "id": "tech",
    "nameUk": "Технології & IT",
    "nameEn": "Technology & Science",
    "emoji": "💻",
    "descriptionUk": "Інтернет, безпека, штучний інтелект, ґаджети та розробка"
  },
  {
    "id": "health",
    "nameUk": "Здоров'я & Тіло",
    "nameEn": "Health & Body",
    "emoji": "🏥",
    "descriptionUk": "Медицина, самопочуття, спорт, симптоми та візит до лікаря"
  },
  {
    "id": "education",
    "nameUk": "Освіта & Мова",
    "nameEn": "Education & Learning",
    "emoji": "📚",
    "descriptionUk": "Школа, університет, вивчення мови, іспити та навички"
  },
  {
    "id": "phrasal",
    "nameUk": "Фразові дієслова",
    "nameEn": "Phrasal Verbs Essentials",
    "emoji": "🚀",
    "descriptionUk": "Найважливіші фразові дієслова для щоденного вільного мовлення"
  },
  {
    "id": "idioms",
    "nameUk": "Ідіоми & Розмовна мова",
    "nameEn": "Idioms & Spoken Expressions",
    "emoji": "💬",
    "descriptionUk": "Стійкі образні вирази, метафори та жива мова носіїв"
  },
  {
    "id": "society",
    "nameUk": "Суспільство & Екологія",
    "nameEn": "Society & Environment",
    "emoji": "🌍",
    "descriptionUk": "Соціальні явища, клімат, природа, культура та право"
  },
  {
    "id": "academic",
    "nameUk": "C1 Академічна лексика & Дебати",
    "nameEn": "C1 Advanced & Discourse",
    "emoji": "🎓",
    "descriptionUk": "Високий рівень C1: академічне письмо, аргументація та науковий стиль"
  }
];

export const VOCABULARY_BANK: VocabularyWord[] = (rawWords as unknown) as VocabularyWord[];
