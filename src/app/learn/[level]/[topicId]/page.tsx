'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { TOPICS } from '@/data/courses';
import { getTopicExercises } from '@/data/topicExercises';
import { TheoryNotes } from '@/components/lesson/TheoryNotes';
import { QuizEngine } from '@/components/lesson/QuizEngine';
import {
  ArrowLeft,
  BookOpen,
  HelpCircle,
  Sparkles,
  Share2,
} from 'lucide-react';

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
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Тему не знайдено</h2>
        <p className="text-slate-500">Можливо, посилання застаріло або веде на інший модуль.</p>
        <Link
          href="/"
          className="inline-block py-2.5 px-5 rounded-2xl bg-indigo-600 text-white font-bold text-sm"
        >
          Повернутися до головного каталогу
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
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до списку тем ({topic.level})</span>
        </Link>
        <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Рівень {topic.level}
        </span>
      </div>

      {/* Tabs Control */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto">
        <button
          onClick={() => handleTabChange('notes')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'notes'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Конспект (Теорія)</span>
        </button>

        <button
          onClick={() => handleTabChange('quiz')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
            activeTab === 'quiz'
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Тест (Практика)</span>
          <span className="px-1.5 py-0.2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] rounded-md font-extrabold">
            {activeExercises.length} тестів
          </span>
        </button>
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
