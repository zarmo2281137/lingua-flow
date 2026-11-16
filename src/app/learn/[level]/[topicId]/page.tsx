'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TOPICS } from '@/data/courses';
import { getTopicExercises } from '@/data/topicExercises';
import { TheoryNotes } from '@/components/lesson/TheoryNotes';
import { QuizEngine } from '@/components/lesson/QuizEngine';
import { ArrowLeft, BookOpen, HelpCircle } from 'lucide-react';

export default function LessonPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const topicId = params.topicId as string;
  const initialTab = (searchParams.get('tab') as 'notes' | 'quiz') || 'notes';
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'notes' || tabParam === 'quiz') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const topic = TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Тему не знайдено</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Можливо, посилання застаріло або веде на інший модуль.</p>
        <Link
          href="/"
          className="inline-block py-2.5 px-5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm transition"
        >
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  const topicExercises = getTopicExercises(topic.id);
  const activeExercises = topicExercises.length > 0 ? topicExercises : topic.exercises;

  const handleTabChange = (tab: 'notes' | 'quiz') => {
    setActiveTab(tab);
    router.replace(`/learn/${params.level}/${topicId}?tab=${tab}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>До списку тем ({topic.level})</span>
        </Link>
        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          Рівень {topic.level}
        </span>
      </div>

      {/* Tabs Control */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl w-full max-w-sm">
          <button
            onClick={() => handleTabChange('notes')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
              activeTab === 'notes'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Теорія</span>
          </button>

          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
              activeTab === 'quiz'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Практика ({activeExercises.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'notes' ? (
        <TheoryNotes notes={topic.notes} onGoToQuiz={() => handleTabChange('quiz')} />
      ) : (
        <QuizEngine
          topicId={topic.id}
          topicTitleEn={topic.titleEn}
          exercises={activeExercises}
          onRestart={() => handleTabChange('quiz')}
        />
      )}
    </div>
  );
}
