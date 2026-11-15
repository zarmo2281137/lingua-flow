import { UserStats } from '@/types/user';
import { LevelCode } from '@/types/course';
import {
  isSupabaseConfigured,
  fetchCloudProgress,
  saveCloudProgress,
  DEFAULT_STUDENT_ID,
} from './supabase';

const STORAGE_KEY = 'lingua_flow_user_data_v1';
const STUDENT_ID_KEY = 'lingua_flow_student_id';

export const DEFAULT_USER_STATS: UserStats = {
  xp: 120,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentLevel: 'A1',
  placementTestDone: false,
  dismissedPlacementPrompt: false,
  completedTopics: [],
  quizScores: {},
  completedScenarios: [],
  geminiApiKey: '',
  voiceSpeed: 1.0,
  preferredVoice: 'Puck',
};

export const getStudentSyncId = (): string => {
  if (typeof window === 'undefined') return DEFAULT_STUDENT_ID;
  return localStorage.getItem(STUDENT_ID_KEY) || DEFAULT_STUDENT_ID;
};

export const setStudentSyncId = (id: string): void => {
  if (typeof window === 'undefined') return;
  const cleanId = id.trim() || DEFAULT_STUDENT_ID;
  localStorage.setItem(STUDENT_ID_KEY, cleanId);
};

export const getUserStats = (): UserStats => {
  if (typeof window === 'undefined') return DEFAULT_USER_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserStats(DEFAULT_USER_STATS);
      return DEFAULT_USER_STATS;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_USER_STATS, ...parsed };
  } catch (e) {
    console.error('Failed to parse user stats from localStorage:', e);
    return DEFAULT_USER_STATS;
  }
};

let cloudSaveTimeout: any = null;

export const saveUserStats = (stats: UserStats): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

    // Notify any listening components
    window.dispatchEvent(new CustomEvent('lingua_flow_stats_updated', { detail: stats }));

    // Debounced automatic background sync to Supabase if configured
    if (isSupabaseConfigured()) {
      if (cloudSaveTimeout) clearTimeout(cloudSaveTimeout);
      cloudSaveTimeout = setTimeout(() => {
        const studentId = getStudentSyncId();
        saveCloudProgress(stats, studentId).catch((err) => {
          console.warn('Auto-save to cloud failed:', err);
        });
      }, 1500);
    }
  } catch (e) {
    console.error('Failed to save user stats to localStorage:', e);
  }
};

// Merge cloud and local data (preserving the highest progress)
export const mergeStats = (local: UserStats, cloud: UserStats): UserStats => {
  const allCompletedTopics = Array.from(
    new Set([...(local.completedTopics || []), ...(cloud.completedTopics || [])])
  );

  const mergedScores: Record<string, number> = { ...(local.quizScores || {}) };
  for (const [topicId, score] of Object.entries(cloud.quizScores || {})) {
    mergedScores[topicId] = Math.max(mergedScores[topicId] || 0, score);
  }

  const allScenarios = Array.from(
    new Set([...(local.completedScenarios || []), ...(cloud.completedScenarios || [])])
  );

  return {
    ...local,
    xp: Math.max(local.xp || 0, cloud.xp || 0),
    streakDays: Math.max(local.streakDays || 1, cloud.streakDays || 1),
    currentLevel: cloud.currentLevel || local.currentLevel || 'A1',
    placementTestDone: local.placementTestDone || cloud.placementTestDone || false,
    dismissedPlacementPrompt: local.dismissedPlacementPrompt || cloud.dismissedPlacementPrompt || false,
    completedTopics: allCompletedTopics,
    quizScores: mergedScores,
    completedScenarios: allScenarios,
    voiceSpeed: cloud.voiceSpeed || local.voiceSpeed || 1.0,
    preferredVoice: cloud.preferredVoice || local.preferredVoice || 'Puck',
  };
};

// Manually or on app-init sync with Supabase
export const syncWithCloud = async (customId?: string): Promise<{ ok: boolean; message: string; stats?: UserStats }> => {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: 'Supabase не налаштовано (відсутній URL або Anon Key).' };
  }

  const targetId = customId || getStudentSyncId();
  try {
    const cloudStats = await fetchCloudProgress(targetId);
    const localStats = getUserStats();

    if (!cloudStats) {
      // If cloud is empty for this student, upload local data to cloud
      await saveCloudProgress(localStats, targetId);
      return { ok: true, message: 'Локальний прогрес успішно завантажено в хмару!', stats: localStats };
    }

    // Merge cloud with local
    const merged = mergeStats(localStats, cloudStats);
    saveUserStats(merged);
    await saveCloudProgress(merged, targetId);

    return { ok: true, message: 'Прогрес успішно синхронізовано з хмарою!', stats: merged };
  } catch (err: any) {
    return { ok: false, message: `Помилка синхронізації: ${err.message || 'Збій зʼєднання'}` };
  }
};

export const updateUserStats = (updater: (prev: UserStats) => UserStats): UserStats => {
  const current = getUserStats();
  const today = new Date().toISOString().split('T')[0];

  // Calculate streak
  let newStreak = current.streakDays;
  if (current.lastActiveDate !== today) {
    const lastDate = new Date(current.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const updated = updater({
    ...current,
    streakDays: newStreak,
    lastActiveDate: today,
  });

  saveUserStats(updated);
  return updated;
};

export const addXp = (amount: number): number => {
  let newTotal = 0;
  updateUserStats((prev) => {
    newTotal = prev.xp + amount;
    return { ...prev, xp: newTotal };
  });
  return newTotal;
};

export const completeTopic = (topicId: string, scorePercent: number): void => {
  updateUserStats((prev) => {
    const completed = new Set(prev.completedTopics);
    completed.add(topicId);
    return {
      ...prev,
      completedTopics: Array.from(completed),
      quizScores: {
        ...prev.quizScores,
        [topicId]: Math.max(prev.quizScores[topicId] || 0, scorePercent),
      },
      xp: prev.xp + (scorePercent >= 80 ? 50 : 25),
    };
  });
};

export const setLevel = (level: LevelCode): void => {
  updateUserStats((prev) => ({ ...prev, currentLevel: level }));
};
