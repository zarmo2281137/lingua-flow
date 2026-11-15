'use client';

import React, { useState, useMemo } from 'react';
import { VocabularyWord } from '@/types/vocabulary';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';
import { playHumanAudio } from '@/utils/speech';
import { addXp, getUserStats } from '@/utils/storage';
import confetti from 'canvas-confetti';

interface WordQuizTrainerProps {
  words: VocabularyWord[];
}

export const WordQuizTrainer: React.FC<WordQuizTrainerProps> = ({ words }) => {
  const [roundQuestions, setRoundQuestions] = useState<
    { word: VocabularyWord; options: string[]; correctIndex: number }[]
  >(() => generateQuestions(words));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function generateQuestions(allWords: VocabularyWord[]) {
    if (allWords.length < 4) return [];
    const shuffled = [...allWords].sort(() => Math.random() - 0.5).slice(0, 10);

    return shuffled.map((current) => {
      // Pick 3 wrong options
      const otherWords = allWords.filter((w) => w.id !== current.id);
      const wrong = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [current.translationUk, ...wrong.map((w) => w.translationUk)].sort(
        () => Math.random() - 0.5
      );
      const correctIndex = options.indexOf(current.translationUk);

      return { word: current, options, correctIndex };
    });
  }

  const currentQ = roundQuestions[currentIndex];

  const handleSpeak = (text: string) => {
    const stats = getUserStats();
    playHumanAudio(text, {
      voice: stats.preferredVoice || 'Puck',
      rate: stats.voiceSpeed || 1.0,
    });
  };

  const handleSelect = (idx: number) => {
    if (selectedOption !== null || !currentQ) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      addXp(10);
    }

    // Auto-advance after 1.2s
    setTimeout(() => {
      if (currentIndex + 1 < roundQuestions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }, 1200);
  };

  const handleRestart = () => {
    setRoundQuestions(generateQuestions(words));
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  if (!currentQ && !isFinished) {
    return null;
  }

  if (isFinished) {
    const percent = Math.round((score / roundQuestions.length) * 100);
    return (
      <div className="max-w-lg mx-auto p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-xl text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-lg">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Тест завершено!
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ви дали правильну відповідь на {score} з {roundQuestions.length} слів ({percent}%)
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-around text-xs">
          <div>
            <span className="text-slate-400 block">Зароблено</span>
            <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
              +{score * 10} XP
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-slate-400 block">Точність</span>
            <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
              {percent}%
            </span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Пройти ще раз (новий раунд)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span className="font-bold text-slate-900 dark:text-white">
          Питання {currentIndex + 1} з {roundQuestions.length}
        </span>
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          Правильно: {score}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-100 dark:bg-slate-750 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / roundQuestions.length) * 100}%` }}
        />
      </div>

      {/* Word Question Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-xl text-center space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Оберіть правильний переклад
        </span>

        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {currentQ.word.word}
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {currentQ.word.transcription}
          </span>
        </div>

        <button
          onClick={() => handleSpeak(currentQ.word.word)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs font-semibold border border-slate-200 dark:border-slate-600 transition"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Послухати</span>
        </button>
      </div>

      {/* 4 Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctIndex;

          let btnStyle =
            'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 text-slate-900 dark:text-white';

          if (selectedOption !== null) {
            if (isCorrect) {
              btnStyle =
                'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
            } else if (isSelected && !isCorrect) {
              btnStyle =
                'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
            } else {
              btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selectedOption !== null}
              className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between shadow-sm ${btnStyle}`}
            >
              <span>{opt}</span>
              {selectedOption !== null && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              )}
              {selectedOption !== null && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
