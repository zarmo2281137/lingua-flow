'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { LevelCode, Topic } from '@/types/course';
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
  BookOpen,
  Layers,
  Headphones,
} from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LevelCode>('A1');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    const s = getUserStats();
    setStats(s);
    if (s.currentLevel) {
      setSelectedLevel(s.currentLevel);
    }
  }, []);

  const handleSelectLevel = (lvl: LevelCode) => {
    setSelectedLevel(lvl);
    setSelectedUnitFilter('all');
    setLevel(lvl);
    setStats(getUserStats());
  };

  // Group topics by level
  const lessonsForCurrentLevel = useMemo(() => {
    return TOPICS.filter((t) => t.level === selectedLevel).sort((a, b) => a.order - b.order);
  }, [selectedLevel]);

  // Calculate completed and total topics per level
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

  // Group lessons by unit
  const unitsGrouped = useMemo(() => {
    const groups: { unitNumber: number; unitTitleUk: string; unitTitleEn: string; lessons: Topic[] }[] = [];
    const map = new Map<number, { unitTitleUk: string; unitTitleEn: string; lessons: Topic[] }>();

    lessonsForCurrentLevel.forEach((lesson) => {
      const uNum = lesson.unitNumber || 1;
      if (!map.has(uNum)) {
        map.set(uNum, {
          unitTitleUk: lesson.unitTitleUk || `Блок ${uNum}`,
          unitTitleEn: lesson.unitTitleEn || `Unit ${uNum}`,
          lessons: [],
        });
      }
      map.get(uNum)!.lessons.push(lesson);
    });

    map.forEach((val, key) => {
      groups.push({
        unitNumber: key,
        unitTitleUk: val.unitTitleUk,
        unitTitleEn: val.unitTitleEn,
        lessons: val.lessons,
      });
    });

    return groups.sort((a, b) => a.unitNumber - b.unitNumber);
  }, [lessonsForCurrentLevel]);

  const displayedUnits = useMemo(() => {
    if (selectedUnitFilter === 'all') return unitsGrouped;
    return unitsGrouped.filter((u) => u.unitNumber === selectedUnitFilter);
  }, [unitsGrouped, selectedUnitFilter]);

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Editorial Hero Section */}
      <div className="relative rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#12141A] p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span>Навчальна програма • 5 рівнів • 80 уроків</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Покроковий курс англійської мови з розмовним AI
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            80 структурованих уроків за міжнародним стандартом CEFR (A1–C1). Конспекти правил українською мовою, 
            словниковий банк на 2 400 слів, озвучка Google Studio TTS та персональний тренажер Speaking AI.
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
              href="/listening"
              className="py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white hover:bg-zinc-50 dark:bg-[#12141A] dark:hover:bg-zinc-850 text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Headphones className="w-4 h-4 text-blue-500" />
              <span>Аудіювання (20 треків)</span>
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
              <span>Діагностика рівня</span>
            </Link>
          </div>
        </div>

        {/* Quick stats strip */}
        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-850 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-400 block text-[11px]">Повна програма</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">80 уроків + 80 КР</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[11px]">Словниковий банк</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">2 400 слів та ідіом</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[11px]">Практикум тестів</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">3 200 практичних тестів</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[11px]">Аудіювання</span>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">20 треків • 240+ вправ</span>
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

      {/* Course Roadmap / Syllabus */}
      <div className="space-y-8">
        {/* Level Roadmap Header & Unit Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                {selectedLevel}
              </span>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Програма курсу: {LEVELS_CONFIG[selectedLevel].nameUk}
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              4 тематичні блоки • 16 покрокових уроків • {completedTopicsCount[selectedLevel] || 0} з {lessonsForCurrentLevel.length} пройдено
            </p>
          </div>

          {/* Unit Filter Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setSelectedUnitFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                selectedUnitFilter === 'all'
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              Всі 4 блоки
            </button>
            {unitsGrouped.map((u) => (
              <button
                key={u.unitNumber}
                onClick={() => setSelectedUnitFilter(u.unitNumber)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  selectedUnitFilter === u.unitNumber
                    ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                Блок {u.unitNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Units Roadmap */}
        <div className="space-y-10">
          {displayedUnits.map((unit) => {
            const unitCompletedCount = unit.lessons.filter((l) =>
              stats?.completedTopics.includes(l.id)
            ).length;

            return (
              <div key={unit.unitNumber} className="space-y-4">
                {/* Unit Section Title */}
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-850">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      {unit.unitNumber}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {unit.unitTitleUk}
                      </h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {unit.unitTitleEn} • 4 уроки
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {unitCompletedCount} / {unit.lessons.length} пройдено
                  </span>
                </div>

                {/* 4 Lessons Grid in this Unit */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {unit.lessons.map((topic) => {
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
