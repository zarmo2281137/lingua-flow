import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { scenario, history, userSpeech, clientApiKey } = body;

    // Collect available keys with priority: clientApiKey > env primary > env backup
    const apiKeys: string[] = [
      clientApiKey?.trim(),
      process.env.GEMINI_API_KEY?.trim(),
      process.env.GEMINI_API_KEY_BACKUP?.trim(),
      process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim(),
    ].filter((k): k is string => Boolean(k && k.length > 10));

    // Remove duplicates
    const uniqueKeys = Array.from(new Set(apiKeys));

    if (uniqueKeys.length === 0) {
      return NextResponse.json(
        { error: 'API_KEY_MISSING', message: 'Ключ Gemini API не знайдено' },
        { status: 400 }
      );
    }

    const historyFormatted = (history || []).slice(-8).map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const systemInstruction = `
You are an elite, warm, encouraging, and pedagogically rigorous English tutor and conversational partner.
SCENARIO: "${scenario?.titleEn || 'General English Practice'}" (${scenario?.descriptionUk || ''})
YOUR PERSONA/ROLE: "${scenario?.aiRoleEn || 'Friendly Native English Speaker'}"
STUDENT'S ROLE: "${scenario?.userRoleEn || 'English Learner'}"
TARGET CEFR LEVEL: "${scenario?.level || 'ALL'}"
CONTEXT / INSTRUCTIONS: ${scenario?.systemPrompt || 'Engage naturally, asking engaging follow-up questions.'}

THE STUDENT JUST SAID: "${userSpeech}"

YOUR TASK:
1. Answer in natural conversational English, in character, in 1-3 engaging sentences. Keep the dialogue flowing realistically.
2. Carefully analyze the student's message with high linguistic accuracy:
   - Grammatical errors (even subtle ones): pinpoint exact error, show correction, and explain WHY in crystal clear Ukrainian.
   - Vocabulary enhancements: suggest 1-2 native-like idioms, phrasal verbs, or higher-level CEFR vocabulary that would make their sentence sound more authentic.
   - Pronunciation & Phonetics advice: based on the transcribed text, give 1 practical tip for Ukrainian speakers on sounds, stress, or linking in the words they used (e.g. distinguishing /v/ and /w/, /θ/, or silent letters).
   - Evaluate exact CEFR level (A1, A2, B1, B2, C1, or C2) of this utterance.
   - Rate fluency & coherence (0-100%).

OUTPUT STRICT JSON ONLY (no markdown formatting, no code backticks, no wrap):
{
  "aiReplyEn": "Your reply in character",
  "feedback": {
    "corrections": [
      {
        "original": "error phrase",
        "corrected": "accurate natural phrase",
        "explanationUk": "Пояснення українською мовою з граматичним правилом"
      }
    ],
    "vocabularyUpgrades": [
      {
        "original": "basic word or phrase",
        "betterOption": "native/advanced alternative",
        "reasonUk": "Чому це звучить краще та природніше"
      }
    ],
    "pronunciationTipUk": "Корисна порада щодо вимови складних звуків або наголосу у використаних словах",
    "estimatedLevel": "A1",
    "fluencyScore": 88,
    "positiveCommentUk": "Теплий мотивуючий комплімент або порада українською мовою"
  }
}
If there are zero grammatical errors, return "corrections": [].
`;

    // Try keys sequentially with models
    const modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
    let lastError: any = null;

    for (const key of uniqueKeys) {
      for (const model of modelsToTry) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

          const res = await fetch(geminiUrl, {
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
                maxOutputTokens: 1200,
                responseMimeType: 'application/json',
              },
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              const cleanJson = rawText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
              const parsed = JSON.parse(cleanJson);
              return NextResponse.json(parsed);
            }
          } else {
            const errJson = await res.json().catch(() => ({}));
            lastError = errJson.error?.message || `HTTP ${res.status}`;
            console.warn(`Key ${key.slice(0, 8)} with model ${model} failed:`, lastError);
          }
        } catch (e: any) {
          lastError = e.message;
        }
      }
    }

    return NextResponse.json(
      { error: 'ALL_KEYS_FAILED', details: lastError || 'Не вдалося отримати відповідь від Gemini API' },
      { status: 502 }
    );
  } catch (err: any) {
    console.error('Error in /api/gemini:', err);
    return NextResponse.json({ error: 'SERVER_ERROR', message: err.message }, { status: 500 });
  }
}
