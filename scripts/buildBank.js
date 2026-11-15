// Generator for 40+ high quality tests per topic and 40+ tests per level
const fs = require('fs');
const path = require('path');

// Helper to create exercises
function generateTopicExercises() {
  const topicsData = {};

  // ==================== 1. A1 TO BE (40 exercises) ====================
  const a1ToBe = [];
  const toBeTemplates = [
    { q: "She ___ an excellent graphic designer.", opt: ["is", "are", "am", "be"], ans: "is", exp: "Для третьої особи однини (she) форма дієслова to be — 'is'." },
    { q: "They ___ not ready for the exam yet.", opt: ["are", "is", "am", "be"], ans: "are", exp: "Для займенника 'they' (вони) форма — 'are'." },
    { q: "___ you from Ukraine?", opt: ["Are", "Is", "Am", "Be"], ans: "Are", exp: "У запитанні з 'you' дієслово 'Are' виноситься на перше місце." },
    { q: "I ___ very happy to see you today.", opt: ["am", "is", "are", "be"], ans: "am", exp: "З займенником 'I' вживається виключно 'am'." },
    { q: "It ___ cold outside today.", opt: ["is", "are", "am", "be"], ans: "is", exp: "З займенником 'it' для опису погоди ставимо 'is'." },
    { q: "My parents ___ currently on vacation.", opt: ["are", "is", "am", "be"], ans: "are", exp: "'My parents' — це множина (they), тому потрібна форма 'are'." },
    { q: "The coffee ___ too hot to drink.", opt: ["is", "are", "am", "be"], ans: "is", exp: "'The coffee' — незлічуваний іменник (it), ставимо 'is'." },
    { q: "We ___ proud of your achievements.", opt: ["are", "is", "am", "be"], ans: "are", exp: "З займенником 'we' (ми) завжди ставимо 'are'." },
    { q: "___ he your older brother?", opt: ["Is", "Are", "Am", "Do"], ans: "Is", exp: "Для 'he' запитання починається з 'Is'." },
    { q: "I ___ not interested in this proposal.", opt: ["am", "is", "are", "be"], ans: "am", exp: "Заперечення для 'I' — 'am not'." },
    { q: "The books ___ on the top shelf.", opt: ["are", "is", "am", "be"], ans: "are", exp: "'The books' — множина, тому вживаємо 'are'." },
    { q: "Where ___ you right now?", opt: ["are", "is", "am", "be"], ans: "are", exp: "Спеціальне запитання з you: Where + are + you?" },
    { q: "Who ___ that tall man over there?", opt: ["is", "are", "am", "be"], ans: "is", exp: "'That man' — однина (he), тому 'is'." },
    { q: "Kyiv ___ the capital of Ukraine.", opt: ["is", "are", "am", "be"], ans: "is", exp: "Назва міста — однина (it), вживаємо 'is'." },
    { q: "These exercises ___ very easy.", opt: ["are", "is", "am", "be"], ans: "are", exp: "'These exercises' — множина, тому 'are'." },
    { q: "This phone ___ brand new.", opt: ["is", "are", "am", "be"], ans: "is", exp: "'This phone' — однина (it), ставимо 'is'." },
    { q: "___ I on the right list?", opt: ["Am", "Is", "Are", "Be"], ans: "Am", exp: "Запитання для першої особи: Am I...?" },
    { q: "You and I ___ a great team.", opt: ["are", "am", "is", "be"], ans: "are", exp: "'You and I' = We (ми), тому використовуємо 'are'." },
    { q: "The weather ___ wonderful this morning.", opt: ["is", "are", "am", "be"], ans: "is", exp: "Weather (погода) — незлічуваний іменник в однині, ставимо 'is'." },
    { q: "The doors ___ closed.", opt: ["are", "is", "am", "be"], ans: "are", exp: "'The doors' — множина, вживаємо 'are'." },
    { q: "___ she at home or at work?", opt: ["Is", "Are", "Am", "Does"], ans: "Is", exp: "Запитання для 'she' — 'Is she...?'" },
    { q: "Tom and Anna ___ married.", opt: ["are", "is", "am", "be"], ans: "are", exp: "Дві особи (they) вимагають 'are'." },
    { q: "I ___ 25 years old.", opt: ["am", "is", "are", "have"], ans: "am", exp: "Вік в англійській виражається дієсловом to be (I am 25), а не have!" },
    { q: "How old ___ your sister?", opt: ["is", "are", "am", "has"], ans: "is", exp: "Ваша сестра = she, тому 'is'." },
    { q: "The museum ___ open today.", opt: ["is", "are", "am", "be"], ans: "is", exp: "'The museum' — однина (it), форма 'is'." },
  ];

  toBeTemplates.forEach((t, i) => {
    a1ToBe.push({
      id: `a1-tb-${i + 1}`,
      type: 'multiple_choice',
      question: `[Тест #${i + 1}] ${t.q}`,
      options: t.opt,
      correctAnswer: t.ans,
      explanationUk: t.exp,
    });
  });

  // Add Fill-in-the-blank (10 tests: 26 to 35)
  const toBeBlanks = [
    { q: "She ___ a doctor at the local hospital.", ans: "is", exp: "Форма дієслова to be для 'she' — is." },
    { q: "I ___ a software developer.", ans: "am", exp: "З займенником I вживається am." },
    { q: "They ___ at home right now.", ans: "are", exp: "З займенником they форма дієслова — are." },
    { q: "The cat ___ sleeping on the chair.", ans: "is", exp: "Cat = it, форма дієслова — is." },
    { q: "We ___ very glad to meet you.", ans: "are", exp: "Для we форма — are." },
    { q: "He ___ not ready to leave.", ans: "is", exp: "Для he форма — is." },
    { q: "You ___ my best friend.", ans: "are", exp: "Для you форма — are." },
    { q: "It ___ ten o'clock now.", ans: "is", exp: "Для часу (it) форма — is." },
    { q: "The children ___ in the garden.", ans: "are", exp: "Children — множина (they), форма are." },
    { q: "Today ___ Monday.", ans: "is", exp: "День тижня — однина, форма is." },
  ];

  toBeBlanks.forEach((b, i) => {
    a1ToBe.push({
      id: `a1-tb-${26 + i}`,
      type: 'fill_blank',
      question: `[Тест #${26 + i}] Вставте правильну форму дієслова to be (am / is / are): ${b.q}`,
      correctAnswer: b.ans,
      explanationUk: b.exp,
    });
  });

  // Add Sentence Builders (5 tests: 36 to 40)
  const toBeBuilders = [
    { words: ["She", "is", "a", "talented", "singer"], ans: ["She", "is", "a", "talented", "singer"], exp: "She (підмет) + is (дієслово) + a talented singer (ознака)." },
    { words: ["They", "are", "at", "the", "office"], ans: ["They", "are", "at", "the", "office"], exp: "They + are + at the office." },
    { words: ["Is", "he", "ready", "for", "school", "?"], ans: ["Is", "he", "ready", "for", "school", "?"], exp: "Питання: Is + he + ready for school?" },
    { words: ["We", "are", "very", "happy", "today"], ans: ["We", "are", "very", "happy", "today"], exp: "We + are + very happy today." },
    { words: ["I", "am", "not", "afraid", "of", "dogs"], ans: ["I", "am", "not", "afraid", "of", "dogs"], exp: "I + am not + afraid of dogs." },
  ];

  toBeBuilders.forEach((b, i) => {
    a1ToBe.push({
      id: `a1-tb-${36 + i}`,
      type: 'sentence_builder',
      question: `[Тест #${36 + i}] Складіть правильне речення зі слів:`,
      options: [...b.words].sort(() => 0.5 - Math.random()),
      correctAnswer: b.ans,
      explanationUk: b.exp,
    });
  });

  topicsData['a1-to-be'] = a1ToBe;

  // Generic generator function for other topics
  function generate40Exercises(topicId, prefix, mcItems, fillItems, buildItems) {
    const list = [];
    mcItems.forEach((m, i) => {
      list.push({
        id: `${prefix}-${i + 1}`,
        type: 'multiple_choice',
        question: `[Тест #${i + 1}] ${m.q}`,
        options: m.opt,
        correctAnswer: m.ans,
        explanationUk: m.exp,
      });
    });
    fillItems.forEach((f, i) => {
      list.push({
        id: `${prefix}-${mcItems.length + i + 1}`,
        type: 'fill_blank',
        question: `[Тест #${mcItems.length + i + 1}] Вставте пропущене слово/форму: ${f.q}`,
        correctAnswer: f.ans,
        explanationUk: f.exp,
      });
    });
    buildItems.forEach((b, i) => {
      list.push({
        id: `${prefix}-${mcItems.length + fillItems.length + i + 1}`,
        type: 'sentence_builder',
        question: `[Тест #${mcItems.length + fillItems.length + i + 1}] Зберіть речення у правильному порядку:`,
        options: [...b.words].sort(() => 0.5 - Math.random()),
        correctAnswer: b.ans,
        explanationUk: b.exp,
      });
    });
    return list;
  }

  return topicsData;
}

console.log('Building full generator...');
