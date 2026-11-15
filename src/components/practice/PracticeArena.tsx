'use client';

import React, { useState, useMemo } from 'react';
import { PRACTICE_QUESTIONS_BANK, PracticeQuestion } from '@/data/practiceBank';
import { LevelCode } from '@/types/course';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Zap,
  Volume2,
  Grid,
  Filter,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { addXp, getUserStats } from '@/utils/storage';
import { playHumanAudio, stopSpeech } from '@/utils/speech';

export const PracticeArena: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<LevelCode>('A1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);

  // Track results for each question
  const [resultsMap, setResultsMap] = useState<Record<number, { answered: boolean; selectedIndex: number; isCorrect: boolean }>>({});
  const [jumpInput, setJumpInput] = useState('');

  // Questions for current level & category
  const levelQuestions = useMemo(() => {
    return PRACTICE_QUESTIONS_BANK.filter((q) => {
      const matchLvl = q.level === selectedLevel;
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      return matchLvl && matchCat;
    });
  }, [selectedLevel, selectedCategory]);

  const startSpecificTest = (indexInLevel: number) => {
    const list = [...levelQuestions];
    setSessionQuestions(list);
    setCurrentIndex(indexInLevel);
    setSelectedOption(null);
    setIsTestStarted(true);
  };

  const startAllLevelTests = () => {
    setSessionQuestions([...levelQuestions]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsTestStarted(true);
  };

  const currentQ = sessionQuestions[currentIndex] || levelQuestions[0];

  const switchQuestion = (idx: number) => {
    if (idx < 0 || idx >= sessionQuestions.length) return;
    setCurrentIndex(idx);
    const prev = resultsMap[idx];
    if (prev?.answered) {
      setSelectedOption(prev.selectedIndex);
    } else {
      setSelectedOption(null);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (resultsMap[currentIndex]?.answered) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null || resultsMap[currentIndex]?.answered) return;
    const correct = selectedOption === currentQ.correctIndex;

    const updated = {
      ...resultsMap,
      [currentIndex]: {
        answered: true,
        selectedIndex: selectedOption,
        isCorrect: correct,
      },
    };
    setResultsMap(updated);

    if (correct) {
      addXp(10);
    }

    const answeredCount = Object.values(updated).filter((r) => r.answered).length;
    if (answeredCount === sessionQuestions.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const currentResult = resultsMap[currentIndex];
  const isChecked = currentResult?.answered || false;
  const isCorrect = currentResult?.isCorrect || false;

  const answeredTotal = Object.values(resultsMap).filter((r) => r.answered).length;
  const correctTotal = Object.values(resultsMap).filter((r) => r.isCorrect).length;
  const wrongTotal = Object.values(resultsMap).filter((r) => r.answered && !r.isCorrect).length;

  const handleSpeakQuestion = (text: string) => {
    if (isPlayingQuestion) {
      stopSpeech();
      setIsPlayingQuestion(false);
      return;
    }
    const stats = getUserStats();
    setIsPlayingQuestion(true);
    playHumanAudio(text, {
      voice: stats.preferredVoice || 'Puck',
      rate: stats.voiceSpeed || 1.0,
      onStart: () => setIsPlayingQuestion(true),
      onEnd: () => setIsPlayingQuestion(false),
      onError: () => setIsPlayingQuestion(false),
    });
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= sessionQuestions.length) {
      switchQuestion(num - 1);
      setJumpInput('');
    }
  };

  // 1. LOBBY VIEW: DIRECT TEST NUMBER PICKER
  if (!isTestStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600 fill-current" />
              <span>Каталог з 200 пронумерованих тестів (по 40 на кожен рівень)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Оберіть рівень знань та натисніть на будь-який номер тесту (1–40), щоб скласти його індивідуально
            </p>
          </div>

          {/* Level Switcher (A1 to C1) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Оберіть рівень складності (40 тестів на кожен рівень):
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setResultsMap({});
                  }}
                  className={`py-3 rounded-2xl text-xs sm:text-sm font-black border transition ${
                    selectedLevel === lvl
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 scale-105'
                      : 'bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-400'
                  }`}
                >
                  Рівень {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Фільтр за темою (опціонально):
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'Всі категорії' },
                { id: 'grammar', label: 'Граматика' },
                { id: 'vocabulary', label: 'Словниковий запас' },
                { id: 'prepositions', label: 'Прийменники' },
                { id: 'idioms', label: 'Ідіоми' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 40 Numbered Tests Grid for Selected Level */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-750 border border-slate-200/80 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Grid className="w-4 h-4 text-indigo-600" />
                <span>Оберіть номер тесту рівня {selectedLevel} (1–{levelQuestions.length}):</span>
              </span>
              <button
                onClick={startAllLevelTests}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 underline"
              >
                Пройти всі {levelQuestions.length} підряд $\rightarrow$
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {levelQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => startSpecificTest(idx)}
                  className="h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:scale-105 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 shadow-sm transition flex flex-col items-center justify-center group"
                >
                  <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    #{idx + 1}
                  </span>
                  <span className="text-[9px] text-slate-400 -mt-1 font-normal capitalize">
                    {q.category.slice(0, 4)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE TEST RUNNER WITH NUMERIC SELECTOR
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Bar with Number Selector Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs">
              {selectedLevel}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Вибір тесту ({currentIndex + 1} з {sessionQuestions.length}):
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick jump input */}
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
              <input
                type="number"
                min="1"
                max={sessionQuestions.length}
                placeholder="№"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-center font-bold"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white"
              >
                Go
              </button>
            </form>

            <button
              onClick={() => setIsTestStarted(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              До каталогу
            </button>
          </div>
        </div>

        {/* 40 Numbers Grid */}
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-20 gap-1.5 max-h-[140px] overflow-y-auto p-1 scrollbar-none">
          {sessionQuestions.map((q, idx) => {
            const res = resultsMap[idx];
            const isCurrent = currentIndex === idx;

            let btnStyle = 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-indigo-400';

            if (res?.answered) {
              if (res.isCorrect) {
                btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
              } else {
                btnStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
              }
            }

            if (isCurrent) {
              btnStyle += ' ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-800 scale-105 z-10 font-black';
            }

            return (
              <button
                key={q.id}
                onClick={() => switchQuestion(idx)}
                className={`h-8 rounded-lg text-xs font-semibold border flex items-center justify-center transition-all ${btnStyle}`}
                title={`Перейти до тесту #${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              Тест #{currentIndex + 1} • {currentQ.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => switchQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Попередній</span>
            </button>
            <button
              onClick={() => switchQuestion(currentIndex + 1)}
              disabled={currentIndex + 1 >= sessionQuestions.length}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 text-xs flex items-center gap-1"
            >
              <span className="hidden sm:inline">Наступний</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>
          <button
            onClick={() => handleSpeakQuestion(currentQ.question)}
            className={`p-2 rounded-xl border transition shrink-0 ${
              isPlayingQuestion
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md animate-pulse'
                : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'
            }`}
            title="Озвучити природним голосом людини"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let style =
              'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 hover:border-indigo-400 text-slate-800 dark:text-slate-200';

            if (isChecked) {
              if (idx === currentQ.correctIndex) {
                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isSelected && idx !== currentQ.correctIndex) {
                style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
              } else {
                style = 'opacity-40 border-slate-200 dark:border-slate-700';
              }
            } else if (isSelected) {
              style = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20 font-bold';
            }

            return (
              <button
                key={idx}
                disabled={isChecked}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm transition flex items-center justify-between ${style}`}
              >
                <span>{opt}</span>
                {isChecked && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isChecked && isSelected && idx !== currentQ.correctIndex && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {isChecked && (
          <div
            className={`p-4 rounded-2xl space-y-1 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800'
            }`}
          >
            <p className="font-bold text-xs sm:text-sm">
              {isCorrect ? '✅ Правильно! (+10 XP)' : '❌ Помилка:'}
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {currentQ.explanationUk}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-400">
            Оберіть інший тест у сітці вгорі або натисніть далі
          </span>

          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 disabled:opacity-40 transition"
            >
              Перевірити відповідь
            </button>
          ) : (
            <button
              onClick={() => {
                if (currentIndex + 1 < sessionQuestions.length) {
                  switchQuestion(currentIndex + 1);
                }
              }}
              className="py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
            >
              <span>{currentIndex + 1 < sessionQuestions.length ? 'Наступний тест' : 'Завершено!'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
