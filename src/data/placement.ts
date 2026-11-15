import { LevelCode } from '@/types/course';

export interface PlacementQuestion {
  id: number;
  targetLevel: LevelCode;
  question: string;
  options: string[];
  correctIndex: number;
  explanationUk: string;
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // --- A1 Questions (1-3) ---
  {
    id: 1,
    targetLevel: 'A1',
    question: 'Where ___ you from?',
    options: ['is', 'are', 'am', 'be'],
    correctIndex: 1,
    explanationUk: 'З займенником "you" вживається форма дієслова to be — "are".',
  },
  {
    id: 2,
    targetLevel: 'A1',
    question: 'He ___ work on Sundays.',
    options: ["doesn't", "don't", 'not', "isn't"],
    correctIndex: 0,
    explanationUk: 'Для he/she/it заперечення у Present Simple — "doesn\'t".',
  },
  {
    id: 3,
    targetLevel: 'A1',
    question: 'I have two ___.',
    options: ['childs', 'children', 'childes', 'childrens'],
    correctIndex: 1,
    explanationUk: '"Children" — виняток множини від слова "child".',
  },

  // --- A2 Questions (4-6) ---
  {
    id: 4,
    targetLevel: 'A2',
    question: 'Yesterday, she ___ a delicious apple pie.',
    options: ['bake', 'bakes', 'baked', 'has baked'],
    correctIndex: 2,
    explanationUk: 'Слово "yesterday" вказує на конкретний минулий час (Past Simple) — "baked".',
  },
  {
    id: 5,
    targetLevel: 'A2',
    question: 'If it rains tomorrow, we ___ at home.',
    options: ['stay', 'will stay', 'stayed', 'would stay'],
    correctIndex: 1,
    explanationUk: 'First Conditional: If + Present Simple, Future Simple (will stay).',
  },
  {
    id: 6,
    targetLevel: 'A2',
    question: 'You ___ wear a helmet when riding a motorbike. It is the law.',
    options: ['must', 'might', 'could', 'may'],
    correctIndex: 0,
    explanationUk: '"Must" вказує на суворе правило або вимогу закону.',
  },

  // --- B1 Questions (7-9) ---
  {
    id: 7,
    targetLevel: 'B1',
    question: 'I ___ in this company for five years and I still love it.',
    options: ['work', 'worked', 'have worked', 'am working'],
    correctIndex: 2,
    explanationUk: 'Дія почалася в минулому і триває досі (for five years) — вживається Present Perfect.',
  },
  {
    id: 8,
    targetLevel: 'B1',
    question: 'If I ___ more free time, I would travel around Europe.',
    options: ['have', 'had', 'would have', 'will have'],
    correctIndex: 1,
    explanationUk: 'Second Conditional (уявна теперішня ситуація): If + Past Simple (had), would + V1.',
  },
  {
    id: 9,
    targetLevel: 'B1',
    question: 'Could you please ___ down the music? I am trying to focus.',
    options: ['turn', 'make', 'put', 'switch off'],
    correctIndex: 0,
    explanationUk: 'Фразове дієслово "turn down" означає зробити звук тихішим.',
  },

  // --- B2 Questions (10-12) ---
  {
    id: 10,
    targetLevel: 'B2',
    question: 'The new product ___ by the marketing team next Monday.',
    options: ['will launch', 'will be launched', 'is launching', 'launches'],
    correctIndex: 1,
    explanationUk: 'Future Passive: обʼєкт не запускає сам себе, його запустять (will be launched).',
  },
  {
    id: 11,
    targetLevel: 'B2',
    question: 'I regret ___ to his advice earlier.',
    options: ['not listening', 'not to listen', 'to not listen', 'did not listen'],
    correctIndex: 0,
    explanationUk: 'Після "regret" про минулу дію вживається герундій (gerund) — "not listening".',
  },
  {
    id: 12,
    targetLevel: 'B2',
    question: 'By the time the train arrived, we ___ on the platform for an hour.',
    options: ['waited', 'have waited', 'had been waiting', 'are waiting'],
    correctIndex: 2,
    explanationUk: 'Дія тривала до певного моменту в минулому — Past Perfect Continuous (had been waiting).',
  },

  // --- C1 Questions (13-15) ---
  {
    id: 13,
    targetLevel: 'C1',
    question: 'Seldom ___ such an inspiring speech in my entire life.',
    options: ['I have heard', 'have I heard', 'I heard', 'did I heard'],
    correctIndex: 1,
    explanationUk: 'Інверсія: після заперечного слова "Seldom" порядок слів як у запитанні (have I heard).',
  },
  {
    id: 14,
    targetLevel: 'C1',
    question: 'The CEO insisted that the audit ___ conducted immediately.',
    options: ['be', 'is', 'was', 'would be'],
    correctIndex: 0,
    explanationUk: 'Subjunctive mood: після дієслів вимоги (insist, demand) використовується базова форма (be).',
  },
  {
    id: 15,
    targetLevel: 'C1',
    question: 'Had it not been for your prompt assistance, we ___ into insolvency.',
    options: ['would fall', 'will fall', 'would have fallen', 'fell'],
    correctIndex: 2,
    explanationUk: 'Inverted Third Conditional: Had it not been... would have fallen.',
  },
];

export const calculatePlacementLevel = (score: number): { level: LevelCode; labelUk: string; summaryUk: string } => {
  if (score <= 3) {
    return {
      level: 'A1',
      labelUk: 'Рівень A1 (Beginner)',
      summaryUk: 'Рекомендуємо почати з вивчення базових конструкцій: дієслово to be, Present Simple та формування повсякденного словникового запасу.',
    };
  } else if (score <= 6) {
    return {
      level: 'A2',
      labelUk: 'Рівень A2 (Elementary)',
      summaryUk: 'Ви вже володієте базовими фразами! Настав час опанувати минулий час (Past Simple), розповіді про плани та модальні дієслова.',
    };
  } else if (score <= 9) {
    return {
      level: 'B1',
      labelUk: 'Рівень B1 (Intermediate)',
      summaryUk: 'Міцний фундамент! Сфокусуйтеся на Present Perfect, умовних реченнях та регулярній практиці живого мовлення в Speaking AI.',
    };
  } else if (score <= 12) {
    return {
      level: 'B2',
      labelUk: 'Рівень B2 (Upper-Intermediate)',
      summaryUk: 'Високий рівень знань! Вам під силу складні тексти, пасивний стан, ідіоматичні вирази та вільні дискусії.',
    };
  } else {
    return {
      level: 'C1',
      labelUk: 'Рівень C1 (Advanced)',
      summaryUk: 'Майстерне володіння англійською! Практикуйте інверсії, тонкі стилістичні нюанси та участь у глибоких дебатах.',
    };
  }
};
