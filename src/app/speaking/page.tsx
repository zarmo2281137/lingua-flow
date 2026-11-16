'use client';

import React, { useState } from 'react';
import { ROLEPLAY_SCENARIOS } from '@/data/scenarios';
import { RoleplayScenario } from '@/types/speaking';
import { ScenarioList } from '@/components/speaking/ScenarioList';
import { RoleplayChat } from '@/components/speaking/RoleplayChat';
import { Mic, ArrowLeft } from 'lucide-react';

export default function SpeakingPage() {
  const [activeScenario, setActiveScenario] = useState<RoleplayScenario | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Speaking Header */}
      {!activeScenario && (
        <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 pt-2">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Голосовий діалоговий симулятор</span>
                <span>•</span>
                <span>Speaking AI</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Розмовна практика та діалоги
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Практикуйте реальні життєві ситуації в безпечному середовищі. Говоріть у мікрофон — AI слухає, миттєво відповідає природним людським голосом та надає м&apos;який зворотний зв&apos;язок щодо граматики й лексики.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-850 text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800/60 self-start md:self-auto">
              <Mic className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Voice Ready (Studio Neural)</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {activeScenario ? (
        <RoleplayChat
          scenario={activeScenario}
          onBack={() => setActiveScenario(null)}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Оберіть життєвий сценарій
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Кожен діалог адаптований під рівні володіння та містить опорні підказки
              </p>
            </div>
          </div>

          <ScenarioList onSelectScenario={(sc) => setActiveScenario(sc)} />
        </div>
      )}
    </div>
  );
}
