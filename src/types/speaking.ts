export type ScenarioCategory = 'daily' | 'travel' | 'career' | 'general';

export interface RoleplayScenario {
  id: string;
  titleEn: string;
  titleUk: string;
  category: ScenarioCategory;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'ALL';
  icon: string;
  descriptionUk: string;
  aiRoleEn: string; // e.g. "Friendly London Barista"
  userRoleEn: string; // e.g. "Customer ordering morning coffee"
  initialAiMessageEn: string;
  suggestedPhrases: {
    en: string;
    uk: string;
  }[];
  systemPrompt: string;
}

export interface GrammarCorrection {
  original: string;
  corrected: string;
  explanationUk: string;
}

export interface FeedbackData {
  corrections: GrammarCorrection[];
  vocabularyUpgrades: {
    original: string;
    betterOption: string;
    reasonUk: string;
  }[];
  pronunciationTipUk?: string;
  estimatedLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  fluencyScore: number; // 0-100
  positiveCommentUk: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: number;
  feedback?: FeedbackData;
  audioPlaying?: boolean;
}
