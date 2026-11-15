'use client';

import React from 'react';
import { LevelCode } from '@/types/course';
import { LEVELS_CONFIG } from '@/data/courses';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Рівні навчання
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Оберіть свій рівень або перемикайтеся між модулями в будь-який час
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
              className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10 scale-[1.02]'
                  : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {/* Header badge */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-lg text-white bg-gradient-to-r ${info.color}`}
                >
                  {lvl}
                </span>
                {percent === 100 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {info.nameEn}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {info.nameUk}
                </p>
              </div>

              {/* Progress mini bar */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>Прогрес</span>
                  <span className="font-bold">{percent}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${info.color} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
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
