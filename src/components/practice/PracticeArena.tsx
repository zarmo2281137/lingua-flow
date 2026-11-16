'use client';

import React, { useState, useMemo } from 'react';
import { PRACTICE_QUESTIONS_BANK, PracticeQuestion } from '@/data/practiceBank';
import { LevelCode } from '@/types/course';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Volume2,
} from 'lucide-react';
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
  };

  const currentResult = resultsMap[currentIndex];
  const isChecked = currentResult?.answered || false;
  const isCorrect = currentResult?.isCorrect || false;

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
      <div className="space-y-6">
        <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-6 sm:p-8 border border-zinc-200/90 dark:border-zinc-800 space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
            <div>
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Каталог завдань
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                200 практичних завдань — по 40 тестів на кожен рівень складності.
              </p>
            </div>
            <button
              onClick={startAllLevelTests}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition self-start sm:self-auto"
            >
              <span>Пройти всі 40 завдань рівня {selectedLevel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Level Switcher (A1 to C1) */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Рівень складності:
            </label>
            <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl w-full sm:w-auto">
              {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setResultsMap({});
                  }}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-medium transition ${
                    selectedLevel === lvl
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  Рівень {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Категорія:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Всі категорії' },
                { id: 'grammar', label: 'Граматика' },
                { id: 'vocabulary', label: 'Лексика' },
                { id: 'prepositions', label: 'Прийменники' },
                { id: 'idioms', label: 'Ідіоми' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    selectedCategory === cat.id
                      ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white'
                      : 'bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Numbered Tests Grid */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Доступно завдань: {levelQuestions.length}</span>
              <span>Натисніть на номер для переходу</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {levelQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => startSpecificTest(idx)}
                  className="h-11 rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition flex flex-col items-center justify-center group"
                >
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-white">
                    #{idx + 1}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-normal capitalize">
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

  // 2. ACTIVE TEST RUNNER
  return (
    <div className="space-y-6">
      {/* Top Bar with Number Selector Grid */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-5 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              {selectedLevel}
            </span>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Завдання {currentIndex + 1} з {sessionQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick jump */}
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
              <input
                type="number"
                min="1"
                max={sessionQuestions.length}
                placeholder="№"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 text-center font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              >
                Go
              </button>
            </form>

            <button
              onClick={() => setIsTestStarted(false)}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition"
            >
              До каталогу
            </button>
          </div>
        </div>

        {/* 40 Numbers Grid Strip */}
        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-20 gap-1.5 max-h-[140px] overflow-y-auto p-0.5">
          {sessionQuestions.map((q, idx) => {
            const res = resultsMap[idx];
            const isCurrent = currentIndex === idx;

            let btnStyle = 'bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700';

            if (res?.answered) {
              if (res.isCorrect) {
                btnStyle = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-medium';
              } else {
                btnStyle = 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-medium';
              }
            }

            if (isCurrent) {
              btnStyle += ' ring-2 ring-zinc-900 dark:ring-white ring-offset-2 dark:ring-offset-zinc-900 font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => switchQuestion(idx)}
                className={`h-8 rounded-lg text-xs border flex items-center justify-center transition ${btnStyle}`}
                title={`Перейти до тесту #${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Завдання #{currentIndex + 1} • {currentQ.category}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => switchQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Попередній</span>
            </button>
            <button
              onClick={() => switchQuestion(currentIndex + 1)}
              disabled={currentIndex + 1 >= sessionQuestions.length}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 transition"
            >
              <span className="hidden sm:inline">Наступний</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
            {currentQ.question}
          </h3>
          <button
            onClick={() => handleSpeakQuestion(currentQ.question)}
            className={`p-2 rounded-lg border transition shrink-0 ${
              isPlayingQuestion
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800'
            }`}
            title="Озвучити природним голосом людини"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let style =
              'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200';

            if (isChecked) {
              if (idx === currentQ.correctIndex) {
                style = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 font-medium';
              } else if (isSelected && idx !== currentQ.correctIndex) {
                style = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100';
              } else {
                style = 'opacity-40 border-zinc-200 dark:border-zinc-800';
              }
            } else if (isSelected) {
              style = 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900 dark:ring-white font-medium';
            }

            return (
              <button
                key={idx}
                disabled={isChecked}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition flex items-center justify-between gap-3 ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-500 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {isChecked && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {isChecked && isSelected && idx !== currentQ.correctIndex && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {isChecked && (
          <div
            className={`p-4 rounded-xl border space-y-1 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
            }`}
          >
            <p className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
              {isCorrect ? 'Правильно (+10 XP)' : 'Помилка'}
            </p>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {currentQ.explanationUk}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-zinc-400">
            Оберіть інший номер зверху або перейдіть далі
          </span>

          {!isChecked ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="py-2.5 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 disabled:opacity-40 transition"
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
              className="py-2.5 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 inline-flex items-center gap-1.5 transition"
            >
              <span>{currentIndex + 1 < sessionQuestions.length ? 'Наступне завдання' : 'Завершено'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
