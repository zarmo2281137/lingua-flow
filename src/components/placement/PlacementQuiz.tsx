'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PLACEMENT_QUESTIONS, calculatePlacementLevel } from '@/data/placement';
import { ArrowRight, Check } from 'lucide-react';
import { updateUserStats } from '@/utils/storage';

export const PlacementQuiz: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = PLACEMENT_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const nextAnswers = [...answers, selectedOption];
    setAnswers(nextAnswers);
    setSelectedOption(null);

    if (currentIndex + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    let score = 0;
    answers.forEach((ans, i) => {
      if (ans === PLACEMENT_QUESTIONS[i].correctIndex) {
        score++;
      }
    });

    const result = calculatePlacementLevel(score);

    const handleApplyLevel = () => {
      updateUserStats((prev) => ({
        ...prev,
        currentLevel: result.level,
        placementTestDone: true,
        dismissedPlacementPrompt: true,
        placementScore: {
          estimatedLevel: result.level,
          score,
          total: PLACEMENT_QUESTIONS.length,
          date: new Date().toISOString(),
        },
        xp: prev.xp + 100,
      }));
      router.push('/');
    };

    return (
      <div className="max-w-xl mx-auto p-6 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-6 text-center shadow-sm animate-fadeIn">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Результат тестування
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Рекомендований рівень
          </h2>
        </div>

        <div className="py-2">
          <div className="inline-block px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-lg sm:text-xl shadow-sm">
            {result.labelUk}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-center">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Точність</span>
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {score} / {PLACEMENT_QUESTIONS.length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-center">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Нагорода</span>
            <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              +100 XP
            </p>
          </div>
        </div>

        {/* Recommendation Text */}
        <div className="p-5 rounded-xl bg-zinc-50/60 dark:bg-zinc-800/30 text-left border border-zinc-200/80 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            Коментар методиста:
          </p>
          {result.summaryUk}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleApplyLevel}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 inline-flex items-center justify-center gap-2 transition"
          >
            <span>Встановити рівень та перейти до тем</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header & Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>Запитання {currentIndex + 1} з {PLACEMENT_QUESTIONS.length}</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
            Секція {currentQ.targetLevel}
          </span>
        </div>
        <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
        <h3 className="text-base sm:text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900 dark:ring-white font-medium'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-zinc-800 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-500 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 disabled:opacity-40 inline-flex items-center gap-1.5 transition"
          >
            <span>{currentIndex + 1 < PLACEMENT_QUESTIONS.length ? 'Далі' : 'Завершити тест'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
