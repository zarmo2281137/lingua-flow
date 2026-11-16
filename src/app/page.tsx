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
  ArrowRight,
  BookMarked,
  Compass,
  CheckCircle2,
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

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Editorial Welcome Banner */}
      <div className="rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-mono font-medium tracking-wide bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span>Платформа навчання • A1 — C1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Практична англійська мова для реального життя
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Структуровані конспекти граматики, банк на 2 400 слів з природним озвученням та розмовний Speaking AI тренажер для подолання мовного бар&apos;єра.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/speaking"
              className="py-2.5 px-5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
            >
              <Mic className="w-4 h-4" />
              <span>Speaking AI тренажер</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/vocabulary"
              className="py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-[#12141A] dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <BookMarked className="w-4 h-4 text-zinc-500" />
              <span>Словник 2 400 слів</span>
            </Link>

            <Link
              href="/placement"
              className="py-2.5 px-3.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-medium text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Визначити свій рівень</span>
            </Link>
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-850 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-400 block text-[11px]">Рівні CEFR</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">5 рівнів (A1—C1)</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[11px]">Словниковий банк</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">2 400 слів та ідіом</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[11px]">Практичні вправи</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">400+ тестових завдань</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[11px]">Вимова</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">Google Studio TTS</span>
          </div>
        </div>
      </div>

      {/* Level Selection Tabs */}
      <LevelOverview
        currentLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
        completedTopicsCount={completedTopicsCount}
        totalTopicsCount={totalTopicsCount}
      />

      {/* Topics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Модулі рівня {selectedLevel}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {LEVELS_CONFIG[selectedLevel].nameUk} • {topicsForCurrentLevel.length} навчальних тем
            </p>
          </div>

          <span className="text-xs text-zinc-400 font-mono">
            {completedTopicsCount[selectedLevel] || 0} з {topicsForCurrentLevel.length} пройдено
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topicsForCurrentLevel.map((topic) => {
            const isCompleted = Boolean(stats?.completedTopics.includes(topic.id));
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
