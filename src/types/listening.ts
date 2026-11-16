import { LevelCode } from './course';

export type ListeningExerciseType = 'multiple_choice' | 'dictation' | 'true_false';

export interface ListeningExercise {
  id: string;
  type: ListeningExerciseType;
  question: string;
  questionUk?: string;
  options?: string[]; // for multiple_choice & true_false
  correctAnswer: string;
  audioSnippetText?: string; // Short snippet for dictation replays
  audioSnippet?: string;
  explanationUk: string; // Ukrainian explanation of why this answer is correct based on the audio
}

export interface DialogueLine {
  speaker: string; // e.g. "Barista", "Alex", "Interviewer"
  voiceName?: string; // Specific studio voice
  textEn: string;
  textUk: string;
}

export interface ListeningVocabItem {
  word: string;
  transcription: string;
  translationUk: string;
  contextSentence: string;
}

export interface ListeningTrack {
  id: string;
  topicId?: string;
  audioUrl?: string;
  level: LevelCode;
  order: number;
  unitTitleUk: string;
  titleEn: string;
  titleUk: string;
  accent: string;
  preferredVoice: string; // 'Puck' | 'Kore' | 'Aoede' | 'Charon' | 'Google-UK'
  durationEst: string; // e.g. "2:30"
  scenarioDescriptionUk: string;
  speakers: {
    name: string;
    roleUk: string;
  }[];
  dialogue: DialogueLine[];
  fullAudioText: string;
  vocabulary: ListeningVocabItem[];
  exercises: ListeningExercise[];
}
