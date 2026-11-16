export type LevelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'sentence_builder';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  questionAudio?: string;
  context?: string; // Additional context or scenario in Ukrainian
  options?: string[]; // For multiple choice & sentence builder words
  correctAnswer: string | string[]; // string for choice/blank, array of words for builder
  explanationUk: string; // Crystal clear explanation in Ukrainian of why this is correct
  tipUk?: string; // Helpful mnemonic or rule hint
  audioText?: string; // Spoken audio text for listening questions
  audioSpeaker?: string; // e.g. "British English • Sonia"
  audioVoice?: string; // Specific studio voice
}

export interface VocabularyItem {
  word: string;
  transcription: string;
  translationUk: string;
  exampleEn: string;
  exampleUk: string;
  audioText?: string;
}

export interface LessonNote {
  title: string;
  summaryUk: string;
  formula?: string; // E.g., "Subject + V1 (s/es)"
  explanationSections: {
    heading: string;
    contentUk: string;
    examples?: {
      en: string;
      uk: string;
      note?: string;
    }[];
    tableData?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  commonMistakes: {
    wrong: string;
    right: string;
    reasonUk: string;
  }[];
  vocabulary: VocabularyItem[];
  proTipUk: string;
}

export interface Topic {
  id: string;
  level: LevelCode;
  unitNumber?: number; // 1 to 4
  unitTitleUk?: string;
  unitTitleEn?: string;
  lessonNumber?: number; // 1 to 16
  estimatedMinutes?: number; // e.g. 10
  titleEn: string;
  titleUk: string;
  descriptionUk: string;
  iconName: string; // Lucide icon identifier
  order: number;
  notes: LessonNote;
  exercises: Exercise[];
}

export interface LevelInfo {
  code: LevelCode;
  nameEn: string;
  nameUk: string;
  badge: string;
  color: string;
  bgGradient: string;
  descriptionUk: string;
  targetSkillsUk: string[];
}
