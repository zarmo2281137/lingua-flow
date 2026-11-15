'use client';

import React from 'react';
import { PlacementQuiz } from '@/components/placement/PlacementQuiz';
import { Compass, Sparkles } from 'lucide-react';

export default function PlacementPage() {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
          <Compass className="w-3.5 h-3.5" />
          <span>Placement Test</span>
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Визначення вашого рівня англійської
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          15 адаптивних запитань (від A1 до C1). Тест оцінить ваші знання граматики, лексики та фразеології й підкаже, з якого модуля стартувати.
        </p>
      </div>

      <PlacementQuiz />
    </div>
  );
}
