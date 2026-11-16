'use client';

import React from 'react';
import { LevelCode } from '@/types/course';
import { LEVELS_CONFIG } from '@/data/courses';
import { CheckCircle2 } from 'lucide-react';

interface LevelOverviewProps {
  currentLevel: LevelCode;
  onSelectLevel: (level: LevelCode) => void;
  completedTopicsCount: Record<LevelCode, number>;
  totalTopicsCount: Record<LevelCode, number>;
}

export const LevelOverview: React.FC<LevelOverviewProps> = ({
  currentLevel,
  onSelectLevel,
  completedTopicsCount,
  totalTopicsCount,
}) => {
  const levels: LevelCode[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Рівні навчання
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Оберіть свій поточний рівень або перемикайтеся між модулями у вільному порядку
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {levels.map((lvl) => {
          const info = LEVELS_CONFIG[lvl];
          const isSelected = currentLevel === lvl;
          const completed = completedTopicsCount[lvl] || 0;
          const total = totalTopicsCount[lvl] || 1;
          const percent = Math.round((completed / total) * 100);

          return (
            <button
              key={lvl}
              onClick={() => onSelectLevel(lvl)}
              className={`text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm'
                  : 'bg-white dark:bg-[#12141A] border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono font-bold text-xs px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 dark:bg-zinc-900/15 text-white dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {lvl}
                  </span>
                  {percent === 100 && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-bold text-sm tracking-tight">
                    {info.nameEn}
                  </h3>
                  <p
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    {info.nameUk}
                  </p>
                </div>
              </div>

              {/* Progress mini indicator */}
              <div
                className={`mt-3 pt-2 border-t ${
                  isSelected
                    ? 'border-white/15 dark:border-zinc-900/15'
                    : 'border-zinc-100 dark:border-zinc-850'
                }`}
              >
                <div
                  className={`flex items-center justify-between text-[10px] mb-1 font-medium ${
                    isSelected ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  <span>Прогрес</span>
                  <span className="font-mono">{completed}/{total} ({percent}%)</span>
                </div>
                <div
                  className={`w-full h-1 rounded-full overflow-hidden ${
                    isSelected ? 'bg-white/20 dark:bg-zinc-900/20' : 'bg-zinc-100 dark:bg-zinc-800'
                  }`}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-700 dark:bg-zinc-300'
                    }`}
                    style={{ width: `${Math.max(4, percent)}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
