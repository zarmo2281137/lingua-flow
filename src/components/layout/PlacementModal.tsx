'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, X, Compass } from 'lucide-react';
import { getUserStats, updateUserStats } from '@/utils/storage';

export const PlacementModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stats = getUserStats();
    if (!stats.placementTestDone && !stats.dismissedPlacementPrompt) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
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
      <div className="relative w-full max-w-md bg-white dark:bg-[#12141A] rounded-2xl p-6 sm:p-7 shadow-xl border border-zinc-200 dark:border-zinc-800 text-center space-y-5">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          aria-label="Закрити"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mx-auto w-11 h-11 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-sm">
          <Compass className="w-5 h-5" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Визначення рівня
          </span>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Дізнайтеся свій рівень англійської
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Швидкий тест із 15 питань допоможе точно визначити ваш поточний рівень (A1–C1) та налаштувати матеріали під ваші знання.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={handleStartTest}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Пройти тест (3 хвилини)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDismiss}
            className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition"
          >
            Почну з A1 самостійно
          </button>
        </div>
      </div>
    </div>
  );
};
