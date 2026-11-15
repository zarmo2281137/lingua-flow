'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Exercise } from '@/types/course';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Zap,
  Sparkles,
  Award,
  Volume2,
  Grid,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { completeTopic, addXp, getUserStats } from '@/utils/storage';
import { playHumanAudio, stopSpeech } from '@/utils/speech';

interface QuizEngineProps {
  topicId: string;
  topicTitleEn: string;
  exercises: Exercise[];
  onRestart: () => void;
}

interface TestResultState {
  answered: boolean;
  selectedAnswer: any;
  isCorrect: boolean;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  topicId,
  topicTitleEn,
  exercises,
  onRestart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillBlankInput, setFillBlankInput] = useState<string>('');
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Track results for each of the 40 tests individually
  const [resultsMap, setResultsMap] = useState<Record<number, TestResultState>>({});
  const [filterMode, setFilterMode] = useState<'all' | 'unsolved' | 'correct' | 'wrong'>('all');
  const [isGridOpen, setIsGridOpen] = useState(true);
  const [jumpInput, setJumpInput] = useState('');
  const [isPlayingQuestion, setIsPlayingQuestion] = useState(false);

  const currentEx = exercises[currentIndex] || exercises[0];

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

  // Sync state when switching to test `idx`
  const switchTest = (idx: number) => {
    if (idx < 0 || idx >= exercises.length) return;
    setCurrentIndex(idx);

    const prevResult = resultsMap[idx];
    if (prevResult && prevResult.answered) {
      if (exercises[idx].type === 'multiple_choice') {
        setSelectedOption(prevResult.selectedAnswer);
      } else if (exercises[idx].type === 'fill_blank') {
        setFillBlankInput(prevResult.selectedAnswer);
      } else if (exercises[idx].type === 'sentence_builder') {
        setSentenceWords(prevResult.selectedAnswer || []);
        setAvailableWords([]);
      }
    } else {
      setSelectedOption(null);
      setFillBlankInput('');
      setSentenceWords([]);
      setAvailableWords(exercises[idx]?.options ? [...exercises[idx].options!] : []);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (resultsMap[currentIndex]?.answered) return;
    setSelectedOption(opt);
  };

  const handleSentenceWordClick = (word: string, index: number) => {
    if (resultsMap[currentIndex]?.answered) return;
    setSentenceWords([...sentenceWords, word]);
    const nextAvail = [...availableWords];
    nextAvail.splice(index, 1);
    setAvailableWords(nextAvail);
  };

  const handleRemoveSentenceWord = (index: number) => {
    if (resultsMap[currentIndex]?.answered) return;
    const removed = sentenceWords[index];
    const nextSent = [...sentenceWords];
    nextSent.splice(index, 1);
    setSentenceWords(nextSent);
    setAvailableWords([...availableWords, removed]);
  };

  const handleCheckAnswer = () => {
    let correct = false;
    let answerValue: any = null;

    if (currentEx.type === 'multiple_choice') {
      correct = selectedOption === currentEx.correctAnswer;
      answerValue = selectedOption;
    } else if (currentEx.type === 'fill_blank') {
      const cleanInput = fillBlankInput.trim().toLowerCase();
      const expected = (currentEx.correctAnswer as string).trim().toLowerCase();
      correct = cleanInput === expected;
      answerValue = fillBlankInput.trim();
    } else if (currentEx.type === 'sentence_builder') {
      const expectedArr = currentEx.correctAnswer as string[];
      correct =
        sentenceWords.length === expectedArr.length &&
        sentenceWords.every((w, i) => w.toLowerCase() === expectedArr[i].toLowerCase());
      answerValue = sentenceWords;
    }

    const updated = {
      ...resultsMap,
      [currentIndex]: {
        answered: true,
        selectedAnswer: answerValue,
        isCorrect: correct,
      },
    };
    setResultsMap(updated);

    if (correct) {
      addXp(10);
    }

    // Check if all 40 tests completed
    const answeredCount = Object.values(updated).filter((r) => r.answered).length;
    if (answeredCount === exercises.length) {
      const correctCount = Object.values(updated).filter((r) => r.isCorrect).length;
      const scorePct = Math.round((correctCount / exercises.length) * 100);
      completeTopic(topicId, scorePct);

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

  // Stats
  const answeredTotal = Object.values(resultsMap).filter((r) => r.answered).length;
  const correctTotal = Object.values(resultsMap).filter((r) => r.isCorrect).length;
  const wrongTotal = Object.values(resultsMap).filter((r) => r.answered && !r.isCorrect).length;

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(jumpInput, 10);
    if (!isNaN(num) && num >= 1 && num <= exercises.length) {
      switchTest(num - 1);
      setJumpInput('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-12">
      {/* Header Info Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-600 text-white">
              Тести теми: {exercises.length} шт
            </span>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
              {topicTitleEn}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Оберіть будь-який номер тесту нижче або проходьте послідовно
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            Пройдено: {answeredTotal}/{exercises.length}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            ✓ {correctTotal}
          </span>
          {wrongTotal > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              ✕ {wrongTotal}
            </span>
          )}
        </div>
      </div>

      {/* Visual Numbered Test Picker Grid (1 to 40) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Швидкий вибір тесту (1–{exercises.length}):
            </span>
          </div>

          {/* Jump to test input */}
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
            <input
              type="number"
              min="1"
              max={exercises.length}
              placeholder="№ тесту"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-20 px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-750 text-center font-bold"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Перейти
            </button>
          </form>
        </div>

        {/* 40 Numbers Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5 max-h-[180px] overflow-y-auto p-1 scrollbar-none">
          {exercises.map((ex, idx) => {
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
                key={ex.id}
                onClick={() => switchTest(idx)}
                className={`h-9 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all ${btnStyle}`}
                title={`Перейти до тесту #${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        {/* Question Header & Nav buttons */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Тест #{currentIndex + 1} з {exercises.length}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => switchTest(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Попередній</span>
            </button>
            <button
              onClick={() => switchTest(currentIndex + 1)}
              disabled={currentIndex + 1 >= exercises.length}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs flex items-center gap-1"
            >
              <span className="hidden sm:inline">Наступний</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question text & Audio */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
              {currentEx.question}
            </h3>
            {currentEx.context && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                💡 {currentEx.context}
              </p>
            )}
          </div>
          <button
            onClick={() => handleSpeakQuestion(currentEx.question)}
            className={`p-2 rounded-xl border transition shrink-0 ${
              isPlayingQuestion
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md animate-pulse'
                : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'
            }`}
            title="Озвучити запитання живим голосом людини"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Multiple Choice Options */}
        {currentEx.type === 'multiple_choice' && currentEx.options && (
          <div className="space-y-2.5">
            {currentEx.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let btnStyle =
                'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 hover:border-indigo-400';

              if (isChecked) {
                if (opt === currentEx.correctAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected && opt !== currentEx.correctAnswer) {
                  btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 dark:border-slate-700';
                }
              } else if (isSelected) {
                btnStyle = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20 font-bold';
              }

              return (
                <button
                  key={i}
                  disabled={isChecked}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isChecked && opt === currentEx.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isChecked && isSelected && opt !== currentEx.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 2. Fill in the Blank Input */}
        {currentEx.type === 'fill_blank' && (
          <div className="space-y-3">
            <input
              type="text"
              disabled={isChecked}
              placeholder="Введіть правильну відповідь англійською..."
              value={fillBlankInput}
              onChange={(e) => setFillBlankInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isChecked && fillBlankInput.trim()) {
                  handleCheckAnswer();
                }
              }}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
            />
          </div>
        )}

        {/* 3. Sentence Builder */}
        {currentEx.type === 'sentence_builder' && (
          <div className="space-y-4">
            <div className="min-h-[64px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-750 border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-wrap gap-2 items-center">
              {sentenceWords.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  Натискайте на слова нижче у правильній послідовності...
                </span>
              ) : (
                sentenceWords.map((word, idx) => (
                  <button
                    key={idx}
                    disabled={isChecked}
                    onClick={() => handleRemoveSentenceWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-sm hover:bg-indigo-700 transition"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  disabled={isChecked}
                  onClick={() => handleSentenceWordClick(word, idx)}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 font-semibold text-xs sm:text-sm hover:border-indigo-500 hover:scale-105 active:scale-95 transition"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Banner */}
        {isChecked && (
          <div
            className={`p-4 rounded-2xl space-y-1.5 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-900 dark:text-emerald-300">
                    Правильно! Бездоганна відповідь! (+10 XP)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span className="text-rose-900 dark:text-rose-300">
                    Помилка. Правильна відповідь: {Array.isArray(currentEx.correctAnswer) ? currentEx.correctAnswer.join(' ') : currentEx.correctAnswer}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {currentEx.explanationUk}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-semibold text-slate-400">
            Оберіть інший тест у таблиці зверху або натисніть далі
          </span>

          {!isChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={
                (currentEx.type === 'multiple_choice' && !selectedOption) ||
                (currentEx.type === 'fill_blank' && !fillBlankInput.trim()) ||
                (currentEx.type === 'sentence_builder' && sentenceWords.length === 0)
              }
              className="py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 disabled:opacity-40 transition"
            >
              Перевірити відповідь
            </button>
          ) : (
            <button
              onClick={() => {
                if (currentIndex + 1 < exercises.length) {
                  switchTest(currentIndex + 1);
                }
              }}
              className="py-3 px-6 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition"
            >
              <span>{currentIndex + 1 < exercises.length ? 'Наступний тест' : 'Усі 40 тестів завершено!'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
