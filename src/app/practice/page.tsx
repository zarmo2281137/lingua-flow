'use client';

import React from 'react';
import { PracticeArena } from '@/components/practice/PracticeArena';

export default function PracticePage() {
  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Практикум • Рівні A1 — C1 • 200 завдань
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Тренажер тестів та правил
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          База запитань для всіх рівнів підготовки з детальними поясненнями українською мовою, 
          природною озвучкою та миттєвим закріпленням матеріалу.
        </p>
      </div>

      <PracticeArena />
    </div>
  );
}
