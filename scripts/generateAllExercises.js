const fs = require('fs');
const path = require('path');

// Helper to construct 40 rich exercises per topic
function buildTopicData(topicId, prefix, topicTitle, questionsData) {
  const list = [];
  questionsData.forEach((q, idx) => {
    const num = idx + 1;
    list.push({
      id: `${prefix}-${num}`,
      type: q.type || 'multiple_choice',
      question: `[Тест #${num}] ${q.question}`,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanationUk: q.explanationUk,
      context: q.context,
    });
  });
  return list;
}

// Generate script to write src/data/topicExercises.ts and src/data/practiceBank.ts
console.log('Script initialized');
