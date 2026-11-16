'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TOPICS, findTopicById } from '@/data/courses';
import { getTopicExercises } from '@/data/topicExercises';
import { TheoryNotes } from '@/components/lesson/TheoryNotes';
import { QuizEngine } from '@/components/lesson/QuizEngine';
import { TopicExam } from '@/components/lesson/TopicExam';
import { ListeningPlayer } from '@/components/listening/ListeningPlayer';
import { getListeningTrackByTopicId } from '@/data/listening/tracks';
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle, FileCheck, Headphones } from 'lucide-react';

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const topicId = params.topicId as string;
  const initialTab = (searchParams.get('tab') as 'notes' | 'quiz' | 'listening' | 'exam') || 'notes';
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz' | 'listening' | 'exam'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'notes' || tabParam === 'quiz' || tabParam === 'listening' || tabParam === 'exam') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const topic = findTopicById(topicId);
  const listeningTrack = topic ? getListeningTrackByTopicId(topic.id) : undefined;

  if (!topic) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Урок не знайдено</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Можливо, посилання застаріло або веде на інший модуль.</p>
        <Link
          href="/"
          className="inline-block py-2.5 px-5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm transition"
        >
          Повернутися до навчальної програми
        </Link>
      </div>
    );
  }

  // Find previous and next lessons in this level
  const levelLessons = TOPICS.filter((t) => t.level === topic.level).sort((a, b) => a.order - b.order);
  const currentIdx = levelLessons.findIndex((t) => t.id === topic.id);
  const prevLesson = currentIdx > 0 ? levelLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < levelLessons.length - 1 ? levelLessons[currentIdx + 1] : null;

  const topicExercises = getTopicExercises(topic.id);
  const activeExercises = topicExercises.length > 0 ? topicExercises : topic.exercises;

  const handleTabChange = (tab: 'notes' | 'quiz' | 'listening' | 'exam') => {
    setActiveTab(tab);
    router.replace(`/learn/${params.level}/${topic.id}?tab=${tab}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>До програми рівня {topic.level}</span>
        </Link>

        <div className="flex items-center gap-2">
          {topic.unitTitleUk && (
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate max-w-[240px]">
              {topic.unitTitleUk}
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            Урок {topic.order} з {levelLessons.length}
          </span>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl w-full max-w-xl">
          <button
            onClick={() => handleTabChange('notes')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
              activeTab === 'notes'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="truncate">Теорія</span>
          </button>

          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
              activeTab === 'quiz'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="truncate">Тести ({activeExercises.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('listening')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
              activeTab === 'listening'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate">Аудіювання (10)</span>
          </button>

          <button
            onClick={() => handleTabChange('exam')}
            className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition ${
              activeTab === 'exam'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-500" />
            <span className="truncate">Контрольна (КР)</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'notes' ? (
        <TheoryNotes
          notes={topic.notes}
          onGoToQuiz={() => handleTabChange('quiz')}
          onGoToExam={() => handleTabChange('exam')}
          onGoToListening={() => handleTabChange('listening')}
        />
      ) : activeTab === 'quiz' ? (
        <QuizEngine
          topicId={topic.id}
          topicTitleEn={topic.titleEn}
          exercises={activeExercises}
          onRestart={() => handleTabChange('quiz')}
          onGoToExam={() => handleTabChange('exam')}
        />
      ) : activeTab === 'listening' && listeningTrack ? (
        <ListeningPlayer
          track={listeningTrack}
          onBack={() => handleTabChange('notes')}
        />
      ) : (
        <TopicExam
          topic={topic}
          onBackToPractice={() => handleTabChange('quiz')}
          onBackToTheory={() => handleTabChange('notes')}
          onNextLesson={
            nextLesson
              ? () => {
                  router.push(`/learn/${nextLesson.level.toLowerCase()}/${nextLesson.id}?tab=notes`);
                }
              : undefined
          }
        />
      )}

      {/* Previous / Next Lesson Footer Navigation */}
      <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between gap-4">
        {prevLesson ? (
          <Link
            href={`/learn/${prevLesson.level.toLowerCase()}/${prevLesson.id}?tab=notes`}
            className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <div className="text-left">
              <span className="text-[10px] text-zinc-400 block">Попередній урок</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate block max-w-[140px] sm:max-w-[220px]">
                {prevLesson.titleUk}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson && (
          <Link
            href={`/learn/${nextLesson.level.toLowerCase()}/${nextLesson.id}?tab=notes`}
            className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition group text-right"
          >
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block">Наступний урок</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 truncate block max-w-[140px] sm:max-w-[220px]">
                {nextLesson.titleUk}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
