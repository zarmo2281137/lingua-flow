'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle2, ArrowRight, X, Compass } from 'lucide-react';
import { getUserStats, updateUserStats } from '@/utils/storage';

export const PlacementModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stats = getUserStats();
    if (!stats.placementTestDone && !stats.dismissedPlacementPrompt) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  const handleDismiss = () => {
    updateUserStats((prev) => ({
      ...prev,
      dismissedPlacementPrompt: true,
    }));
    setIsOpen(false);
  };

  const handleStartTest = () => {
    updateUserStats((prev) => ({
      ...prev,
      dismissedPlacementPrompt: true,
    }));
    setIsOpen(false);
    router.push('/placement');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-6">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Швидкий старт</span>
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Визначте свій рівень англійської
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Бажаєте пройти експрес-тест (15 запитань від A1 до C1), щоб платформа підібрала ідеальний старт під ваші знання?
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={handleStartTest}
            className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group transition"
          >
            <span>Пройти тест (3 хвилини)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>

          <button
            onClick={handleDismiss}
            className="w-full py-3 px-5 rounded-2xl font-semibold text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Обрати рівень самостійно (більше не показувати)
          </button>
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/80 pt-3">
          💡 Ви завжди зможете знайти та пройти цей тест у будь-який момент у верхньому меню сайту.
        </p>
      </div>
    </div>
  );
};
