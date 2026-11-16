'use client';

import React, { useState } from 'react';
import { VocabularyWord } from '@/types/vocabulary';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Check } from 'lucide-react';
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

    setTimeout(() => {
      if (currentIndex + 1 < roundQuestions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
        confetti({ particleCount: 40, spread: 55, origin: { y: 0.6 } });
      }
    }, 1100);
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
      <div className="max-w-md mx-auto p-8 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm text-center space-y-6 animate-fadeIn">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Результат квізу
          </span>
          <h3 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            {percent >= 80 ? 'Чудовий результат!' : 'Тест завершено'}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Ви дали правильну відповідь на {score} з {roundQuestions.length} слів ({percent}% точності).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-around text-xs">
          <div>
            <span className="text-zinc-400 block text-[11px] mb-0.5">Отримано досвіду</span>
            <span className="text-base font-bold text-zinc-900 dark:text-white">
              +{score * 10} XP
            </span>
          </div>
          <div className="h-7 w-px bg-zinc-200 dark:bg-zinc-800" />
          <div>
            <span className="text-zinc-400 block text-[11px] mb-0.5">Точність</span>
            <span className="text-base font-bold text-zinc-900 dark:text-white">
              {percent}%
            </span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs transition flex items-center justify-center gap-2 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Пройти ще раз (новий раунд)</span>
        </button>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-md mx-auto space-y-5 animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
        <span className="font-semibold text-zinc-900 dark:text-white">
          Питання {currentIndex + 1} з {roundQuestions.length}
        </span>
        <span className="font-medium text-zinc-600 dark:text-zinc-300">
          Правильно: {score}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-200"
          style={{ width: `${((currentIndex + 1) / roundQuestions.length) * 100}%` }}
        />
      </div>

      {/* Word Question Card */}
      <div className="p-7 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm text-center space-y-3">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Оберіть правильний переклад
        </span>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {currentQ.word.word}
          </h2>
          <span className="text-xs font-mono text-zinc-400">
            {currentQ.word.transcription}
          </span>
        </div>

        <div>
          <button
            onClick={() => handleSpeak(currentQ.word.word)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-750 transition"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Вимова</span>
          </button>
        </div>
      </div>

      {/* 4 Clean Options */}
      <div className="space-y-2">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correctIndex;

          let btnClass =
            'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12141A] hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-800 dark:text-zinc-200';

          if (selectedOption !== null) {
            if (isCorrect) {
              btnClass =
                'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
            } else if (isSelected && !isCorrect) {
              btnClass =
                'border-rose-400 bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
            } else {
              btnClass = 'opacity-40 border-zinc-200 dark:border-zinc-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={selectedOption !== null}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnClass}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-mono text-xs flex items-center justify-center font-bold">
                  {optionLetters[idx]}
                </span>
                <span>{opt}</span>
              </div>
              {selectedOption !== null && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {selectedOption !== null && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
