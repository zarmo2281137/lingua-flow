import { Exercise } from '@/types/course';
import allTopicExams from './allTopicExams.json';

const ALL_TOPIC_EXAMS: Record<string, Exercise[]> = allTopicExams as any;

export const getTopicExamQuestions = (topicId: string): Exercise[] => {
  return ALL_TOPIC_EXAMS[topicId] || [];
};
