'use client';

import React from 'react';
import { PracticeArena } from '@/components/practice/PracticeArena';
import { Zap, Sparkles } from 'lucide-react';

export default function PracticePage() {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <Zap className="w-3.5 h-3.5" />
          <span>Банк тренувальних тестів</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Тренажер тестів та правил
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Велика база запитань за всіма рівнями (A1–C1) з поясненнями, озвучкою та режимом опрацювання помилок.
        </p>
      </div>

      <PracticeArena />
    </div>
  );
}
