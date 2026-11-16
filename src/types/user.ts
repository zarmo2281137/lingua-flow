import { LevelCode } from './course';

export interface UserStats {
  xp: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  currentLevel: LevelCode;
  placementTestDone: boolean;
  dismissedPlacementPrompt: boolean;
  placementScore?: {
    estimatedLevel: LevelCode;
    score: number;
    total: number;
    date: string;
  };
  completedTopics: string[]; // Topic IDs
  quizScores: Record<string, number>; // topicId -> best percentage (0-100)
  completedScenarios: string[]; // Scenario IDs practiced
  learnedWords?: string[]; // Word IDs marked as learned
  topicExamScores?: Record<
    string,
    {
      score: number;
      total: number;
      percentage: number;
      passed: boolean;
      date: string;
    }
  >; // topicId -> exam result
  completedListeningTracks?: string[]; // Listening track IDs
  listeningScores?: Record<string, number>; // trackId -> percentage
  geminiApiKey?: string;
  preferredVoice?: string;
  voiceSpeed: number; // 0.8, 1.0, 1.2
}
