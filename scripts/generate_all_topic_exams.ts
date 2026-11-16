import * as fs from 'fs';
import * as path from 'path';
import { TOPICS, LEGACY_TOPIC_ALIASES } from '../src/data/courses';
import { Exercise, Topic } from '../src/types/course';

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const legacyToNew: Record<string, string> = { ...LEGACY_TOPIC_ALIASES, 'a2-future-plans': 'a2-future-be-going-to' };
const newToLegacy: Record<string, string> = {};
for (const [leg, nw] of Object.entries(legacyToNew)) {
  newToLegacy[nw] = leg;
}

function buildExamQuestionsForTopic(topic: Topic): Exercise[] {
  const questions: Exercise[] = [];
  const id = topic.id;
  const level = topic.level;
  const formula = topic.notes?.formula || '';
  const summary = topic.notes?.summaryUk || '';
  const mistakes = topic.notes?.commonMistakes || [];
  const vocabulary = topic.notes?.vocabulary || [];

  // 1. Formula & Core Rule Questions (Questions 1 - 4)
  if (topic.notes?.explanationSections && topic.notes.explanationSections.length > 0) {
    const sec1 = topic.notes.explanationSections[0];
    const sec2 = topic.notes.explanationSections[1] || sec1;

    questions.push({
      id: `${id}-exam-1`,
      type: 'multiple_choice',
      question: `[Контрольна #1] Яка граматична формула є правильною для теми "${topic.titleEn}"?`,
      options: formula
        ? shuffle([
            formula,
            formula.replace(/\+/g, '-').replace(/is|are/g, 'be'),
            'Subject + Verb (no rules)',
            'Subject + V-ing directly without auxiliary',
          ])
        : [
            `Стандартна синтаксична модель теми ${topic.titleEn}`,
            'Довільний порядок слів',
            'Вживання без допоміжних дієслів',
            'Інверсія без причини',
          ],
      correctAnswer: formula || `Стандартна синтаксична модель теми ${topic.titleEn}`,
      explanationUk: `Формула теми: "${formula || summary}". Вона чітко визначає порядок слів та допоміжні елементи.`,
    });

    questions.push({
      id: `${id}-exam-2`,
      type: 'multiple_choice',
      question: `[Контрольна #2] ${sec1.heading}: яке правило застосовується насамперед?`,
      options: [
        sec1.contentUk.slice(0, 85) + '...',
        'Правило діє лише в розмовній мові і є необовʼязковим.',
        'Форма дієслова ніколи не змінюється за особами.',
        'Правило застосовується тільки у заперечних реченнях.',
      ],
      correctAnswer: sec1.contentUk.slice(0, 85) + '...',
      explanationUk: `Теоретичне обґрунтування: ${sec1.contentUk.slice(0, 160)}...`,
    });
  }

  // 2. Common Mistakes Discrimination (Questions 3 - 6)
  if (mistakes.length > 0) {
    for (let mIdx = 0; mIdx < Math.min(mistakes.length, 3); mIdx++) {
      const cm = mistakes[mIdx];
      const qNum = questions.length + 1;
      questions.push({
        id: `${id}-exam-${qNum}`,
        type: 'multiple_choice',
        question: `[Контрольна #${qNum}] Оберіть речення БЕЗ граматичної помилки:`,
        options: shuffle([cm.right, cm.wrong, cm.wrong.replace(/s\b/g, ''), cm.wrong + ' always']),
        correctAnswer: cm.right,
        explanationUk: `Правильно: "${cm.right}". Пояснення: ${cm.reasonUk}`,
      });
    }
  }

  // 3. Fill-in-the-blank Target Rules (Questions 7 - 10)
  const blanks = getLevelExamBlanks(topic);
  for (const b of blanks) {
    if (questions.length >= 10) break;
    const qNum = questions.length + 1;
    questions.push({
      id: `${id}-exam-${qNum}`,
      type: 'fill_blank',
      question: `[Контрольна #${qNum}] ${b.question}`,
      correctAnswer: b.correctAnswer,
      explanationUk: b.explanationUk,
    });
  }

  // 4. Sentence Builder (Questions 11 - 12)
  const builders = getLevelExamBuilders(topic);
  for (const sb of builders) {
    if (questions.length >= 12) break;
    const qNum = questions.length + 1;
    questions.push({
      id: `${id}-exam-${qNum}`,
      type: 'sentence_builder',
      question: `[Контрольна #${qNum}] ${sb.question}`,
      options: shuffle([...sb.words]),
      correctAnswer: sb.words,
      explanationUk: sb.explanationUk,
    });
  }

  // 5. Contextual Application & Vocabulary (Questions 13 - 15)
  if (vocabulary.length > 0) {
    for (let vIdx = 0; vIdx < Math.min(vocabulary.length, 3); vIdx++) {
      if (questions.length >= 15) break;
      const v = vocabulary[vIdx];
      const qNum = questions.length + 1;
      const blanked = (v.exampleEn || '').replace(new RegExp(`\\b${v.word}\\b`, 'i'), '___');
      questions.push({
        id: `${id}-exam-${qNum}`,
        type: 'multiple_choice',
        question: `[Контрольна #${qNum}] Вставте правильне слово у контексті: "${blanked || '___'}"`,
        options: shuffle([v.word, v.word + 'ing', 'un' + v.word, 'pre' + v.word]),
        correctAnswer: v.word,
        explanationUk: `Слово "${v.word}" (${v.translationUk}) доречно вживається у цьому реченні.`,
      });
    }
  }

  // Pad to exact 15 questions if needed
  while (questions.length < 15) {
    const qNum = questions.length + 1;
    const padItem = getExamPaddingQuestion(topic, qNum);
    questions.push({
      id: `${id}-exam-${qNum}`,
      type: padItem.type,
      question: `[Контрольна #${qNum}] ${padItem.question}`,
      options: padItem.options,
      correctAnswer: padItem.correctAnswer,
      explanationUk: padItem.explanationUk,
    });
  }

  return questions.slice(0, 15);
}

function getLevelExamBlanks(topic: Topic): { question: string; correctAnswer: string; explanationUk: string }[] {
  const lvl = topic.level;
  if (lvl === 'A1') {
    return [
      { question: "Доповніть речення правильною формою to be: She ___ at the library right now.", correctAnswer: "is", explanationUk: "З третьою особою (she) вживається 'is'." },
      { question: "Вставте допоміжне дієслово для запитання: ___ you live in this apartment?", correctAnswer: "Do", explanationUk: "Питання з you в Present Simple потребує 'Do'." },
      { question: "Вставте правильний прийменник часу: The lesson starts ___ 9:00 AM.", correctAnswer: "at", explanationUk: "З точним часом використовується прийменник 'at'." },
    ];
  } else if (lvl === 'A2') {
    return [
      { question: "Поставте дієслово у форму Past Simple: Yesterday we ___ (see) an amazing movie.", correctAnswer: "saw", explanationUk: "Форма минулого часу від see — saw." },
      { question: "Вставте сполучник порівняння: This task is easier ___ the previous one.", correctAnswer: "than", explanationUk: "У порівняннях використовується 'than' (ніж)." },
      { question: "Доповніть модальне дієслово обов'язку: Drivers ___ stop at the red traffic light.", correctAnswer: "must", explanationUk: "Закон чи суворе правило позначається модальним 'must'." },
    ];
  } else if (lvl === 'B1') {
    return [
      { question: "Вставте маркер тривалості: She has lived in Canada ___ 2018.", correctAnswer: "since", explanationUk: "Точка початку в минулому позначається 'since'." },
      { question: "Second Conditional: If I had more time, I ___ study Italian.", correctAnswer: "would", explanationUk: "Головна частина Second Conditional використовує would + infinitive." },
      { question: "Пасивний стан: The document was ___ (sign) yesterday.", correctAnswer: "signed", explanationUk: "Past Simple Passive: was + V3 (signed)." },
    ];
  } else if (lvl === 'B2') {
    return [
      { question: "Future Perfect: By Friday, we will have ___ (finish) the audit.", correctAnswer: "finished", explanationUk: "Future Perfect утворюється: will have + V3." },
      { question: "Каузатив: I need to have my hair ___ (cut) this afternoon.", correctAnswer: "cut", explanationUk: "Have something done: have + object + V3 (cut)." },
      { question: "Жаль про минуле: I wish I had ___ (listen) to your advice.", correctAnswer: "listened", explanationUk: "Wish щодо минулого вимагає Past Perfect (had listened)." },
    ];
  } else {
    // C1
    return [
      { question: "Негативна інверсія: Seldom ___ we encountered such professional dedication.", correctAnswer: "have", explanationUk: "Інверсія після Seldom: Seldom + have + subject + V3." },
      { question: "Інвертований Conditional: ___ I known earlier, I would have intervened.", correctAnswer: "Had", explanationUk: "Had I known = If I had known." },
      { question: "Subjunctive: It is essential that he ___ (be) notified immediately.", correctAnswer: "be", explanationUk: "Subjunctive Mood вживає чисту базову форму 'be'." },
    ];
  }
}

function getLevelExamBuilders(topic: Topic): { question: string; words: string[]; explanationUk: string }[] {
  const lvl = topic.level;
  if (lvl === 'A1') {
    return [
      { question: "Складіть правильне речення (ствердження):", words: ["She", "works", "in", "a", "hospital"], explanationUk: "She works in a hospital." },
      { question: "Складіть питальне речення:", words: ["Do", "they", "speak", "English", "daily"], explanationUk: "Do they speak English daily?" },
    ];
  } else if (lvl === 'A2') {
    return [
      { question: "Складіть речення з Past Continuous:", words: ["I", "was", "working", "when", "he", "called"], explanationUk: "I was working when he called." },
      { question: "Складіть речення з Used to:", words: ["She", "used", "to", "live", "in", "Berlin"], explanationUk: "She used to live in Berlin." },
    ];
  } else if (lvl === 'B1') {
    return [
      { question: "Складіть речення у Present Perfect:", words: ["I", "have", "already", "sent", "the", "email"], explanationUk: "I have already sent the email." },
      { question: "Складіть речення умовного способу:", words: ["If", "I", "were", "you", "would", "apply"], explanationUk: "If I were you I would apply." },
    ];
  } else if (lvl === 'B2') {
    return [
      { question: "Складіть речення з пасивною конструкцією:", words: ["The", "project", "is", "being", "tested", "now"], explanationUk: "The project is being tested now." },
      { question: "Складіть речення Third Conditional:", words: ["If", "you", "had", "asked", "would", "helped"], explanationUk: "If you had asked would helped." },
    ];
  } else {
    return [
      { question: "Складіть речення з негативною інверсією:", words: ["Never", "have", "I", "seen", "such", "results"], explanationUk: "Never have I seen such results." },
      { question: "Складіть розщеплене речення (What-cleft):", words: ["What", "we", "need", "is", "clear", "focus"], explanationUk: "What we need is clear focus." },
    ];
  }
}

function getExamPaddingQuestion(topic: Topic, num: number): { type: Exercise['type']; question: string; options?: string[]; correctAnswer: string; explanationUk: string } {
  return {
    type: 'multiple_choice',
    question: `Оцініть граматичну структуру теми "${topic.titleEn}": яке твердження є істинним?`,
    options: shuffle([
      `Правильне використання теми базується на правилах рівня ${topic.level}.`,
      'Ця граматична конструкція взагалі не використовується носіями мови.',
      'Порядок слів у цій конструкції може бути довільним.',
      'Форма дієслова в реченні обирається навмання.',
    ]),
    correctAnswer: `Правильне використання теми базується на правилах рівня ${topic.level}.`,
    explanationUk: `Тема "${topic.titleEn}" (${topic.titleUk}) є обов'язковим стандартом CEFR для рівня ${topic.level}.`,
  };
}

export function generateAllTopicExams() {
  console.log(`Generating Topic Exams (КР) for ${TOPICS.length} curriculum lessons...`);
  const result: Record<string, Exercise[]> = {};

  let totalQuestions = 0;
  for (const topic of TOPICS) {
    const examQuestions = buildExamQuestionsForTopic(topic);
    result[topic.id] = examQuestions;
    totalQuestions += examQuestions.length;

    // Legacy aliases
    const legacyKey = newToLegacy[topic.id];
    if (legacyKey && !result[legacyKey]) {
      result[legacyKey] = examQuestions;
    }
  }

  let valid = 0;
  for (const topic of TOPICS) {
    if (result[topic.id]?.length === 15) {
      valid++;
    } else {
      console.warn(`Topic ${topic.id} has ${result[topic.id]?.length} exam questions instead of 15!`);
    }
  }

  console.log(`Verified ${valid}/${TOPICS.length} topics have exactly 15 exam questions.`);
  console.log(`Total exam questions generated: ${totalQuestions}`);

  const outputPath = path.resolve(__dirname, '../src/data/allTopicExams.json');
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Written exams to: ${outputPath}`);
}

generateAllTopicExams();
