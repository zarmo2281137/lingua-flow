import { LevelCode, LevelInfo, Topic } from '@/types/course';
import { A1_LESSONS } from './courses/a1Lessons';
import { A2_LESSONS } from './courses/a2Lessons';
import { B1_LESSONS } from './courses/b1Lessons';
import { B2_LESSONS } from './courses/b2Lessons';
import { C1_LESSONS } from './courses/c1Lessons';

export const LEVELS_CONFIG: Record<LevelCode, LevelInfo> = {
  A1: {
    code: 'A1',
    nameEn: 'Beginner',
    nameUk: 'Початковий рівень',
    badge: '🌱 Старт з нуля',
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800',
    descriptionUk: 'Фундамент англійської: 4 блоки, 16 структурованих уроків від дієслова To Be до перших розмовних конструкцій.',
    targetSkillsUk: [
      'Дієслово To Be (ствердження, заперечення, питання)',
      'Вказівні та присвійні займенники (this, that, my, your)',
      'Артиклі a/an та There is / There are',
      'Present Simple для щоденної рутини та звичок',
      'Модальне дієслово CAN та прийменники часу/місця',
      'Present Continuous для дій прямо зараз',
    ],
  },
  A2: {
    code: 'A2',
    nameEn: 'Elementary',
    nameUk: 'Базовий побутовий',
    badge: '🌿 Впевнений початок',
    color: 'from-blue-500 to-cyan-600',
    bgGradient: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
    descriptionUk: 'Минулий і майбутній час: 16 уроків про подорожі, спогади, плани та модальні дієслова.',
    targetSkillsUk: [
      'Past Simple (правильні та 30 найважливіших неправильних дієслів)',
      'Past Continuous та перервані дії (When & While)',
      'Конструкція Used To для минулих звичок',
      'Ступені порівняння прикметників (bigger, more expensive, the best)',
      'Способи вираження майбутнього: Will vs Going To vs Continuous',
      'Модальні дієслова обовʼязку: Must, Have to, Should',
      'Zero та First Conditionals (реальні життєві умови)',
    ],
  },
  B1: {
    code: 'B1',
    nameEn: 'Intermediate',
    nameUk: 'Середній розмовний',
    badge: '🚀 Вільне спілкування',
    color: 'from-indigo-500 to-purple-600',
    bgGradient: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800',
    descriptionUk: 'Справжній прорив до вільного мовлення: 16 уроків із системою Present Perfect, Second Conditional та фразовими дієсловами.',
    targetSkillsUk: [
      'Present Perfect (досвід, результат, маркери already, yet, for, since)',
      'Present Perfect Continuous та тривалість дій',
      'Past Perfect та техніка сторітелінгу (Narrative Tenses)',
      'Означальні підрядні речення (Who, Which, That, Where)',
      'Second Conditional (нереальні мрії та поради If I were you)',
      'Пасивний стан (Passive Voice) у Present та Past Simple',
      'Модальні дієслова здогадки: Must, Might, Can\'t be true',
      'Топ щоденних фразових дієслів та Question Tags',
    ],
  },
  B2: {
    code: 'B2',
    nameEn: 'Upper-Intermediate',
    nameUk: 'Вище середнього',
    badge: '⚡ Професійний рівень',
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
    descriptionUk: 'Золотий стандарт для роботи та імміграції: 16 уроків ділової англійської, пасиву у всіх часах та змішаних умов.',
    targetSkillsUk: [
      'Future Continuous та Future Perfect для дедлайнів',
      'Пасивний стан у тривалих та доконаних часах (is being done, has been done)',
      'Каузативні конструкції (Have/Get something done)',
      'Безособовий пасив (It is said that..., He is believed to be...)',
      'Third Conditional (минулі жалі) та Mixed Conditionals',
      'Конструкції Wish та If Only',
      'Здогадки про минуле (Must have done, Can\'t have done)',
      'Слова-звʼязки контрасту (Although, Despite, Whereas) та діловий етикет',
    ],
  },
  C1: {
    code: 'C1',
    nameEn: 'Advanced',
    nameUk: 'Просунутий експерт',
    badge: '👑 Рівень майстра',
    color: 'from-rose-500 to-pink-600',
    bgGradient: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800',
    descriptionUk: 'Елітна майстерність та риторика: 16 уроків інверсії, сослагального нахилу, дієприкметникових зворотів та дипломатії.',
    targetSkillsUk: [
      'Негативна інверсія (Never have I seen, Under no circumstances)',
      'Розщеплені речення (Cleft Sentences з What, All, It-cleft)',
      'Просторова інверсія та фронтинг (Into the room walked...)',
      'Активні та пасивні дієприкметникові звороти (Having finished, Seen from above)',
      'Інвертовані умовні речення без IF (Had I known, Should you need)',
      'Сослагальний нахил (Subjunctive: I insist that he BE present)',
      'Тонкі звороти поступки (Difficult though it is, Be that as it may)',
      'Дипломатичний регістр переговорів, літота та британський understatement',
    ],
  },
};

// Aliases mapping old IDs to new lesson IDs for 100% backwards compatibility
export const LEGACY_TOPIC_ALIASES: Record<string, string> = {
  'a1-to-be': 'a1-to-be-present',
  'a1-present-simple': 'a1-present-simple-positive',
  'a1-articles': 'a1-articles-a-an',
  'a1-there-is-are': 'a1-there-is-are',
  'a2-past-simple': 'a2-past-simple-regular',
  'a2-past-continuous': 'a2-past-continuous',
  'a2-future-will-going-to': 'a2-future-be-going-to',
  'b1-present-perfect': 'b1-present-perfect-intro',
  'b1-conditionals': 'b1-second-conditional',
  'b1-phrasal-verbs': 'b1-phrasal-verbs-daily',
  'b2-passive-voice': 'b2-passive-all-tenses',
  'b2-reported-speech': 'b2-reported-speech-patterns',
  'b2-mixed-conditionals': 'b2-mixed-conditionals',
  'c1-inversion': 'c1-negative-inversion',
  'c1-cleft-sentences': 'c1-cleft-sentences-what',
};

// Combined 80 lessons across all 5 CEFR levels
export const TOPICS: Topic[] = [
  ...A1_LESSONS,
  ...A2_LESSONS,
  ...B1_LESSONS,
  ...B2_LESSONS,
  ...C1_LESSONS,
];

// Helper to look up a topic by ID (resolving legacy aliases if needed)
export function findTopicById(id: string): Topic | undefined {
  const resolvedId = LEGACY_TOPIC_ALIASES[id] || id;
  return TOPICS.find((t) => t.id === resolvedId);
}
