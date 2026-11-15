'use client';

import React from 'react';
import Link from 'next/link';
import { Topic } from '@/types/course';
import { getTopicExercises } from '@/data/topicExercises';
import {
  Sparkles,
  Clock,
  History,
  GitCommit,
  ShieldCheck,
  Crown,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  isCompleted: boolean;
  score?: number;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, isCompleted, score }) => {
  // Map icon name to Lucide Icon
  const getIcon = () => {
    switch (topic.iconName) {
      case 'Clock':
        return Clock;
      case 'History':
        return History;
      case 'GitCommit':
        return GitCommit;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Crown':
        return Crown;
      default:
        return Sparkles;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between">
      <div>
        {/* Top badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Модуль #{topic.order}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Тест: {score || 100}%</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>+50 XP</span>
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 mb-4">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            {topic.titleEn}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            {topic.titleUk}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {topic.descriptionUk}
          </p>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-5 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-lg">
            📖 Конспект з прикладами
          </span>
          <span className="bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-lg font-bold text-indigo-600 dark:text-indigo-400">
            🎯 {getTopicExercises(topic.id).length || 40} тестів (з вибором №)
          </span>
          <span className="bg-slate-100 dark:bg-slate-700/50 px-2.5 py-1 rounded-lg">
            🔊 Озвучка слів
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        <Link
          href={`/learn/${topic.level.toLowerCase()}/${topic.id}?tab=notes`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Конспект</span>
        </Link>
        <Link
          href={`/learn/${topic.level.toLowerCase()}/${topic.id}?tab=quiz`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition"
        >
          <span>Тест</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
