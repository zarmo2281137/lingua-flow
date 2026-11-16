'use client';

import React from 'react';
import { PlacementQuiz } from '@/components/placement/PlacementQuiz';

export default function PlacementPage() {
  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <div className="space-y-2 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Діагностика • CEFR A1 — C1
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Визначення рівня знань
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          15 адаптивних запитань для оцінки поточної підготовки. За результатами система 
          підбере відповідний навчальний план та початковий модуль.
        </p>
      </div>

      <PlacementQuiz />
    </div>
  );
}
