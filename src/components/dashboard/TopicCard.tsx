'use client';

import React from 'react';
import Link from 'next/link';
import { Topic } from '@/types/course';
import { getTopicExercises } from '@/data/topicExercises';
import {
  Clock,
  History,
  GitCommit,
  ShieldCheck,
  Crown,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  isCompleted: boolean;
  score?: number;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, isCompleted, score }) => {
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
      case 'Zap':
        return Zap;
      default:
        return BookOpen;
    }
  };

  const Icon = getIcon();
  const exercisesCount = topic.exercises?.length || getTopicExercises(topic.id).length || 10;

  return (
    <div className="bg-white dark:bg-[#12141A] rounded-xl p-5 border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition flex flex-col justify-between group">
      <div>
        {/* Top badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                Урок {topic.order}
              </span>
              <span className="text-[10px] text-zinc-400">
                • ~{topic.estimatedMinutes || 10} хв
              </span>
            </div>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{score || 100}%</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800">
              +50 XP
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1 mb-4">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {topic.titleUk}
          </h3>
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
            {topic.titleEn}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1 line-clamp-2">
            {topic.descriptionUk}
          </p>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap gap-1.5 mb-5 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 px-2 py-0.5 rounded-md">
            Конспект
          </span>
          <span className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 px-2 py-0.5 rounded-md font-mono">
            {exercisesCount} вправ
          </span>
          <span className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 px-2 py-0.5 rounded-md">
            Озвучка слів
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-850">
        <Link
          href={`/learn/${topic.level.toLowerCase()}/${topic.id}?tab=notes`}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Теорія</span>
        </Link>
        <Link
          href={`/learn/${topic.level.toLowerCase()}/${topic.id}?tab=quiz`}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 transition shadow-sm"
        >
          <span>Практика</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
