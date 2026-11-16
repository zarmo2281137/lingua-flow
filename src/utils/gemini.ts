import { RoleplayScenario, ChatMessage, FeedbackData, SpeakingEvaluation } from '@/types/speaking';

export interface GeminiResponse {
  aiReplyEn: string;
  feedback: FeedbackData;
}

export const evaluateSpeakingSession = async (
  apiKey: string | undefined,
  scenario: RoleplayScenario,
  history: ChatMessage[]
): Promise<SpeakingEvaluation> => {
  const userMessages = history.filter((m) => m.sender === 'user');
  const messageCount = userMessages.length;

  // 1. Try server route with action: 'evaluate'
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario,
        history,
        clientApiKey: apiKey,
        action: 'evaluate',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.overallScore && data.criteria) {
        return data as SpeakingEvaluation;
      }
    }
  } catch (e) {
    console.warn('Evaluation API call failed, generating calculated evaluation:', e);
  }

  // 2. High-quality rule-based fallback evaluation
  let allWordsCount = 0;
  const collectedMistakes: any[] = [];
  const collectedUpgrades: any[] = [];

  userMessages.forEach((m) => {
    allWordsCount += m.text.trim().split(/\s+/).length;
    if (m.feedback?.corrections) {
      collectedMistakes.push(...m.feedback.corrections);
    }
    if (m.feedback?.vocabularyUpgrades) {
      collectedUpgrades.push(...m.feedback.vocabularyUpgrades);
    }
  });

  const avgWordsPerTurn = messageCount > 0 ? Math.round(allWordsCount / messageCount) : 4;
  const errorCount = collectedMistakes.length;

  // Calculate scores
  const grammarScore = Math.max(5, Math.min(10, 10 - errorCount));
  const vocabScore = Math.max(5, Math.min(10, Math.floor(avgWordsPerTurn / 2) + 4));
  const fluencyScore = Math.max(6, Math.min(10, Math.min(10, 6 + Math.floor(messageCount / 2))));
  const coherenceScore = Math.max(7, Math.min(10, 8 + (errorCount === 0 ? 2 : 0)));

  const overallScore = Math.round(((grammarScore + vocabScore + fluencyScore + coherenceScore) / 40) * 100);

  let estimatedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' = 'A2';
  if (overallScore >= 90) estimatedLevel = 'C1';
  else if (overallScore >= 78) estimatedLevel = 'B2';
  else if (overallScore >= 65) estimatedLevel = 'B1';
  else if (overallScore >= 50) estimatedLevel = 'A2';
  else estimatedLevel = 'A1';

  return {
    overallScore,
    estimatedLevel,
    messageCount,
    xpEarned: Math.min(100, messageCount * 15 + 20),
    criteria: {
      grammar: {
        score: grammarScore,
        titleUk: 'Граматична точність',
        commentUk:
          errorCount === 0
            ? 'Бездоганне дотримання граматичних конструкцій без грубих помилок.'
            : `Виявлено ${errorCount} граматичних неточностей, над якими варто попрацювати.`,
      },
      vocabulary: {
        score: vocabScore,
        titleUk: 'Словниковий запас',
        commentUk:
          avgWordsPerTurn > 8
            ? 'Широкий та виразний словниковий діапазон, вдале використання тематичної лексики.'
            : 'Базовий словниковий запас. Рекомендуємо частіше використовувати фразові дієслова та синоніми.',
      },
      fluency: {
        score: fluencyScore,
        titleUk: 'Плавність та темп мовлення',
        commentUk: `Упевнений темп спілкування, в середньому ${avgWordsPerTurn} слів на репліку.`,
      },
      coherence: {
        score: coherenceScore,
        titleUk: 'Звʼязність та діалог',
        commentUk: 'Логічні та доречні відповіді в контексті обраного сценарію.',
      },
    },
    keyStrengthsUk: [
      'Упевнене підтримання діалогу без тривалих пауз',
      'Правильне розуміння контексту та запитань співрозмовника',
      'Готовність формулювати розгорнуті репліки англійською мовою',
    ],
    mistakesSummary: collectedMistakes.slice(0, 4),
    vocabularyHighlights: collectedUpgrades.slice(0, 3).map((u) => ({
      used: u.original,
      suggestedUpgrade: u.betterOption,
      reasonUk: u.reasonUk,
    })),
    teacherAdviceUk:
      'Чудова розмовна сесія! Продовжуйте тренуватися регулярно, щоб довести використання граматичних конструкцій до автоматизму.',
  };
};

export const testGeminiApiKey = async (apiKey: string): Promise<{ ok: boolean; message: string }> => {
  if (!apiKey || apiKey.trim().length < 15) {
    return {
      ok: false,
      message: 'Ключ занадто короткий або порожній. Вставте валідний ключ Google Gemini API.',
    };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey.trim()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello, respond with: OK' }] }],
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP ${res.status}`;
      return { ok: false, message: `Помилка API: ${errMsg}` };
    }

    return { ok: true, message: 'Google Gemini API ключ успішно підключено та перевірено!' };
  } catch (err: any) {
    return {
      ok: false,
      message: `Мережева помилка: ${err.message || 'Не вдалося зʼєднатися з Google API'}`,
    };
  }
};

export const getGeminiRoleplayResponse = async (
  apiKey: string | undefined,
  scenario: RoleplayScenario,
  history: ChatMessage[],
  userSpeech: string
): Promise<GeminiResponse> => {
  // 1. Try our internal server route /api/gemini
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario,
        history,
        userSpeech,
        clientApiKey: apiKey,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.aiReplyEn && data.feedback) {
        return data;
      }
    }
  } catch (e) {
    console.warn('API route call failed, attempting direct or simulated fallback:', e);
  }

  // 2. Direct client call with key if available
  const effectiveKey = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (effectiveKey && effectiveKey.trim().length > 15) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${effectiveKey.trim()}`;

      const historyFormatted = history.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const systemInstruction = `
You are an expert English tutor and role-playing partner.
SCENARIO: "${scenario.titleEn}" (${scenario.descriptionUk})
YOUR ROLE: "${scenario.aiRoleEn}"
USER'S ROLE: "${scenario.userRoleEn}"
TARGET LEVEL: "${scenario.level}"
SPECIFIC INSTRUCTION: ${scenario.systemPrompt}

The student has spoken or typed: "${userSpeech}".

You MUST reply with STRICT JSON ONLY:
{
  "aiReplyEn": "Your conversational reply in English, in-character, encouraging, friendly, and natural. Keep it 1-3 sentences.",
  "feedback": {
    "corrections": [
      {
        "original": "The exact phrase or word with an error",
        "corrected": "The natural grammatically correct version",
        "explanationUk": "Коротке, зрозуміле пояснення українською мовою, чому саме так"
      }
    ],
    "vocabularyUpgrades": [
      {
        "original": "A basic word or phrase used by user",
        "betterOption": "A more natural or advanced alternative",
        "reasonUk": "Пояснення українською, як це зробить мову багатшою"
      }
    ],
    "pronunciationTipUk": "Порада щодо вимови або наголосу у словах репліки для україномовних учнів",
    "estimatedLevel": "A1" | "A2" | "B1" | "B2" | "C1" | "C2",
    "fluencyScore": 88,
    "positiveCommentUk": "Теплий мотивуючий комплімент або порада українською мовою"
  }
}
If the user's sentence had zero grammar mistakes, leave "corrections" as [].
`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...historyFormatted,
            {
              role: 'user',
              parts: [{ text: userSpeech }, { text: systemInstruction }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          const cleanJson = candidateText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
          const parsed = JSON.parse(cleanJson);
          if (parsed.aiReplyEn && parsed.feedback) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.error('Direct Gemini API call failed:', e);
    }
  }

  // 3. High-Quality Simulated Fallback
  return generateSimulatedResponse(scenario, userSpeech);
};

const generateSimulatedResponse = (
  scenario: RoleplayScenario,
  userSpeech: string
): GeminiResponse => {
  const speechLower = userSpeech.toLowerCase();

  const corrections = [];
  const vocabularyUpgrades = [];
  let pronunciationTip = 'Зверніть увагу на плавне звʼязування слів (linking sounds): приголосна в кінці слова зливається з голосною наступного.';

  if (speechLower.includes('i am agree') || speechLower.includes('i am agreed')) {
    corrections.push({
      original: 'I am agree',
      corrected: 'I agree',
      explanationUk: "В англійській мові 'agree' — це вже дієслово (погоджуватися), тому дієслово-зв'язка 'am' тут зайве.",
    });
  }

  if (speechLower.includes('how it looks like')) {
    corrections.push({
      original: 'How it looks like',
      corrected: 'What it looks like',
      explanationUk: "Або 'What it looks like' (з what), або 'How it looks' (без like). Поєднувати 'how' та 'like' в цьому значенні не можна.",
    });
  }

  if (speechLower.includes('i feel myself')) {
    corrections.push({
      original: 'I feel myself',
      corrected: 'I feel well / good',
      explanationUk: "В англійській не кажуть 'I feel myself' (це звучить як буквальне торкання себе). Кажемо просто 'I feel good/great'.",
    });
  }

  if (speechLower.includes('depends of')) {
    corrections.push({
      original: 'depends of',
      corrected: 'depends on',
      explanationUk: "Дієслово 'depend' завжди вимагає після себе прийменника 'on', а не 'of'.",
    });
  }

  if (speechLower.includes('very good') || speechLower.includes('good')) {
    vocabularyUpgrades.push({
      original: 'good / very good',
      betterOption: 'exceptional / superb / remarkable',
      reasonUk: 'Використання виразніших прикметників значно підсилює звучання мови на рівнях B2–C1.',
    });
  }

  if (speechLower.includes('th') || speechLower.includes('the') || speechLower.includes('think')) {
    pronunciationTip = 'Вимовляючи звук /θ/ (think) або /ð/ (this, the), помістіть кінчик язика між зубами — не підміняйте його на українські [с] або [з]!';
  } else if (speechLower.includes('what') || speechLower.includes('would') || speechLower.includes('very')) {
    pronunciationTip = 'Не плутайте звуки /w/ (губи округлені в трубочку, як при подуві на свічку) та /v/ (верхні зуби торкаються нижньої губи).';
  }

  // Dynamic reply
  let aiReply = '';
  if (scenario.id === 'cafe') {
    if (speechLower.includes('latte') || speechLower.includes('cappuccino') || speechLower.includes('coffee')) {
      aiReply = "Certainly! Would you prefer whole milk, oat milk, or almond milk? And would you like any pastry with your order?";
    } else {
      aiReply = "Welcome! I can prepare that for you right away. What cup size would you prefer — regular or large?";
    }
  } else if (scenario.id === 'interview') {
    aiReply = "That is a well-articulated insight. Could you walk me through a specific challenge you navigated in your recent experience and the outcome you achieved?";
  } else if (scenario.id === 'airport') {
    aiReply = "Thank you. Your boarding pass is verified. What is the duration and primary intention of your stay in the country?";
  } else {
    aiReply = `That is a fascinating perspective! What led you to that conclusion, and how do you envision this evolving moving forward?`;
  }

  const wordsCount = userSpeech.trim().split(/\s+/).length;
  let estimatedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' = 'A2';
  if (wordsCount > 15) estimatedLevel = 'C1';
  else if (wordsCount > 9) estimatedLevel = 'B2';
  else if (wordsCount > 5) estimatedLevel = 'B1';

  return {
    aiReplyEn: aiReply,
    feedback: {
      corrections,
      vocabularyUpgrades,
      pronunciationTipUk: pronunciationTip,
      estimatedLevel,
      fluencyScore: Math.min(98, Math.max(70, wordsCount * 4 + 65)),
      positiveCommentUk: 'Чудова впевненість у відповіді! Продовжуйте розмову.',
    },
  };
};
