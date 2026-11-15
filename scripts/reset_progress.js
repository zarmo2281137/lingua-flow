const fs = require('fs');
const content = fs.readFileSync('.env.local', 'utf-8');
const env = {};
content.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    env[key] = val;
  }
});

const { createClient } = require('@supabase/supabase-js');
const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function main() {
  const resetStats = {
    xp: 0,
    streakDays: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    currentLevel: 'A1',
    placementTestDone: false,
    dismissedPlacementPrompt: false,
    completedTopics: [],
    quizScores: {},
    completedScenarios: [],
    learnedWords: [],
    geminiApiKey: '',
    voiceSpeed: 1.0,
    preferredVoice: 'Puck'
  };

  const { data, error } = await client.from('user_progress').upsert(
    {
      id: 'default_student',
      data: resetStats,
      updated_at: new Date().toISOString()
    },
    { onConflict: 'id' }
  );

  console.log('Reset Supabase result - Error:', error);

  const check = await client.from('user_progress').select('*');
  console.log('Current rows after reset:', JSON.stringify(check.data, null, 2));
}

main();
