'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PLACEMENT_QUESTIONS, calculatePlacementLevel } from '@/data/placement';
import { LevelCode } from '@/types/course';
import {
  Compass,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
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
      // Calculate final
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
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
        xp: prev.xp + 100, // +100 XP for completing placement test
      }));
      router.push('/');
    };

    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-center space-y-6 shadow-xl animate-fadeIn">
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
          <Award className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Результат діагностичного тесту
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Ваш орієнтовний рівень:
          </h2>
          <div className="inline-block px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xl shadow-md shadow-indigo-600/20">
            {result.labelUk}
          </div>
        </div>

        {/* Score & XP badge */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
            <span className="text-[11px] text-slate-400">Правильних відповідей</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {score} / {PLACEMENT_QUESTIONS.length}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
            <span className="text-[11px] text-indigo-500">Нагорода</span>
            <p className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-0.5">
              +100 XP
            </p>
          </div>
        </div>

        {/* Personalized description */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 text-left border border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-bold text-slate-900 dark:text-white mb-1">
            Рекомендація нашої системи:
          </p>
          {result.summaryUk}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={handleApplyLevel}
            className="py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
          >
            <span>Встановити цей рівень та почати уроки</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span>Запитання {currentIndex + 1} з {PLACEMENT_QUESTIONS.length}</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            Блок: {currentQ.targetLevel}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 text-slate-800 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-600'
                }`}
              >
                <span>{opt}</span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 disabled:opacity-40 flex items-center gap-2 transition"
          >
            <span>{currentIndex + 1 < PLACEMENT_QUESTIONS.length ? 'Далі' : 'Завершити тест'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
