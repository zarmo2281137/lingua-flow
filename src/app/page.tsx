'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LevelCode } from '@/types/course';
import { TOPICS, LEVELS_CONFIG } from '@/data/courses';
import { getUserStats, setLevel } from '@/utils/storage';
import { UserStats } from '@/types/user';
import { LevelOverview } from '@/components/dashboard/LevelOverview';
import { TopicCard } from '@/components/dashboard/TopicCard';
import {
  Mic,
  Zap,
  Flame,
  Award,
  Sparkles,
  Compass,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LevelCode>('A1');

  useEffect(() => {
    const s = getUserStats();
    setStats(s);
    if (s.currentLevel) {
      setSelectedLevel(s.currentLevel);
    }
  }, []);

  const handleSelectLevel = (lvl: LevelCode) => {
    setSelectedLevel(lvl);
    setLevel(lvl);
    setStats(getUserStats());
  };

  // Group topics by level
  const topicsForCurrentLevel = TOPICS.filter((t) => t.level === selectedLevel);

  // Compute completed counts per level
  const completedTopicsCount: Record<LevelCode, number> = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
  };

  const totalTopicsCount: Record<LevelCode, number> = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
  };

  TOPICS.forEach((t) => {
    totalTopicsCount[t.level] = (totalTopicsCount[t.level] || 0) + 1;
    if (stats?.completedTopics.includes(t.id)) {
      completedTopicsCount[t.level] = (completedTopicsCount[t.level] || 0) + 1;
    }
  });

  const levelInfo = LEVELS_CONFIG[selectedLevel];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Background glow decoration */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-indigo-200 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Інтерактивні конспекти + живий Speaking AI</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Вивчайте англійську легко та впевнено
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              Жодних заплутаних правил! Кожна тема розкладена по поличках українською мовою з наочними формулами, тестами та розмовним AI-тренажером.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
            <Link
              href="/speaking"
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 group"
            >
              <Mic className="w-4 h-4 fill-current" />
              <span>Speaking AI Тьютор</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>

            <Link
              href="/practice"
              className="py-2.5 px-4 rounded-2xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs border border-indigo-400/30 backdrop-blur-md flex items-center justify-center gap-2 transition"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Тренажер тестів (Бліц & Практика)</span>
            </Link>

            <Link
              href="/placement"
              className="py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 backdrop-blur-md flex items-center justify-center gap-2 transition"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>
                {stats?.placementTestDone ? 'Пройти тест рівня знову' : 'Визначити свій рівень (Тест)'}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Level Selection Tabs (A1, A2, B1, B2, C1) */}
      <LevelOverview
        currentLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
        completedTopicsCount={completedTopicsCount}
        totalTopicsCount={totalTopicsCount}
      />

      {/* Active Level Header & Skills */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className={`text-xs font-black px-2.5 py-1 rounded-lg text-white bg-gradient-to-r ${levelInfo.color}`}
              >
                {levelInfo.code}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {levelInfo.nameEn} — {levelInfo.nameUk}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {levelInfo.descriptionUk}
            </p>
          </div>

          <span className="self-start sm:self-auto text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-xl">
            {completedTopicsCount[selectedLevel]} з {totalTopicsCount[selectedLevel]} пройдено
          </span>
        </div>

        {/* Skills pill tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <span className="text-xs font-bold text-slate-400 self-center mr-1">
            Ключові теми рівня:
          </span>
          {levelInfo.targetSkillsUk.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            Теми та конспекти модуля ({topicsForCurrentLevel.length})
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {topicsForCurrentLevel.map((topic) => {
            const isCompleted = stats?.completedTopics.includes(topic.id) || false;
            const score = stats?.quizScores[topic.id];

            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                isCompleted={isCompleted}
                score={score}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
