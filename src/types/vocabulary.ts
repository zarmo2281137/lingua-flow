import { LevelCode } from './course';

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'phrasal_verb'
  | 'idiom'
  | 'phrase';

export interface VocabularyWord {
  id: string;
  word: string;
  transcription: string;
  translationUk: string;
  partOfSpeech: PartOfSpeech;
  level: LevelCode;
  category: string;
  categoryUk: string;
  exampleEn: string;
  exampleUk: string;
  collocations?: string[];
  synonyms?: string[];
}

export interface VocabularyCategoryInfo {
  id: string;
  nameUk: string;
  nameEn: string;
  emoji: string;
  descriptionUk: string;
}
