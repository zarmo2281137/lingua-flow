'use client';

import React, { useState } from 'react';
import { ROLEPLAY_SCENARIOS } from '@/data/scenarios';
import { RoleplayScenario } from '@/types/speaking';
import { ScenarioList } from '@/components/speaking/ScenarioList';
import { RoleplayChat } from '@/components/speaking/RoleplayChat';
import {
  Mic,
  Sparkles,
  HelpCircle,
  Volume2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function SpeakingPage() {
  const [activeScenario, setActiveScenario] = useState<RoleplayScenario | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Speaking Banner */}
      {!activeScenario && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200 border border-white/10">
                <Mic className="w-3.5 h-3.5 text-purple-300" />
                <span>Голосовий діалоговий симулятор (Role-play)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Speaking AI Тренажер
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
                Практикуйте реальні розмовні діалоги в безпечному середовищі. Говоріть у мікрофон — AI слухає кожне слово, відповідає вголос людським тембром та аналізує вашу граматику й лексику.
              </p>
            </div>

            <div className="py-2.5 px-4 rounded-2xl bg-white/10 border border-white/15 text-purple-100 font-bold text-xs sm:text-sm backdrop-blur-md flex items-center justify-center gap-2 self-start md:self-auto shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Тьютор готовий до розмови</span>
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Оберіть життєвий сценарій для розмови
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Кожен діалог адаптований під рівні володіння та містить підказки фраз
              </p>
            </div>
          </div>

          <ScenarioList onSelectScenario={(sc) => setActiveScenario(sc)} />
        </div>
      )}
    </div>
  );
}
