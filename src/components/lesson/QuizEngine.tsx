'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types/course';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Grid,
} from 'lucide-react';
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

  // Track results for each of the tests individually
  const [resultsMap, setResultsMap] = useState<Record<number, TestResultState>>({});
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

    const answeredCount = Object.values(updated).filter((r) => r.answered).length;
    if (answeredCount === exercises.length) {
      const correctCount = Object.values(updated).filter((r) => r.isCorrect).length;
      const scorePct = Math.round((correctCount / exercises.length) * 100);
      completeTopic(topicId, scorePct);
    }
  };

  const currentResult = resultsMap[currentIndex];
  const isChecked = currentResult?.answered || false;
  const isCorrect = currentResult?.isCorrect || false;

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
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-5 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              {exercises.length} завдань
            </span>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
              {topicTitleEn}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Оберіть будь-який номер або проходьте завдання послідовно
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
            Пройдено: {answeredTotal}/{exercises.length}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
            ✓ {correctTotal}
          </span>
          {wrongTotal > 0 && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-medium">
              ✕ {wrongTotal}
            </span>
          )}
        </div>
      </div>

      {/* Visual Numbered Test Picker Grid */}
      <div className="bg-white dark:bg-zinc-900/60 rounded-2xl p-5 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Grid className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Вибір завдання (1–{exercises.length}):
            </span>
          </div>

          {/* Jump to test input */}
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5">
            <input
              type="number"
              min="1"
              max={exercises.length}
              placeholder="№"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-16 px-2 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 text-center font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            >
              Перейти
            </button>
          </form>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1.5 max-h-[160px] overflow-y-auto p-0.5">
          {exercises.map((ex, idx) => {
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
                key={ex.id}
                onClick={() => switchTest(idx)}
                className={`h-8 rounded-lg text-xs border flex items-center justify-center transition ${btnStyle}`}
                title={`Перейти до тесту #${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
        {/* Header & Nav */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Завдання #{currentIndex + 1} з {exercises.length}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => switchTest(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Попереднє</span>
            </button>
            <button
              onClick={() => switchTest(currentIndex + 1)}
              disabled={currentIndex + 1 >= exercises.length}
              className="px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1 transition"
            >
              <span className="hidden sm:inline">Наступне</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Text & Audio */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
              {currentEx.question}
            </h3>
            {currentEx.context && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {currentEx.context}
              </p>
            )}
          </div>
          <button
            onClick={() => handleSpeakQuestion(currentEx.question)}
            className={`p-2 rounded-lg border transition shrink-0 ${
              isPlayingQuestion
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800'
            }`}
            title="Озвучити природним голосом"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Multiple Choice */}
        {currentEx.type === 'multiple_choice' && currentEx.options && (
          <div className="space-y-2.5">
            {currentEx.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              let btnStyle =
                'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200';

              if (isChecked) {
                if (opt === currentEx.correctAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 font-medium';
                } else if (isSelected && opt !== currentEx.correctAnswer) {
                  btnStyle = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100';
                } else {
                  btnStyle = 'opacity-40 border-zinc-200 dark:border-zinc-800';
                }
              } else if (isSelected) {
                btnStyle = 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 ring-1 ring-zinc-900 dark:ring-white font-medium';
              }

              return (
                <button
                  key={i}
                  disabled={isChecked}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-500 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isChecked && opt === currentEx.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {isChecked && isSelected && opt !== currentEx.correctAnswer && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
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
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 font-medium"
            />
          </div>
        )}

        {/* 3. Sentence Builder */}
        {currentEx.type === 'sentence_builder' && (
          <div className="space-y-3">
            <div className="min-h-[56px] p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-dashed border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-2 items-center">
              {sentenceWords.length === 0 ? (
                <span className="text-xs text-zinc-400">
                  Натискайте на слова нижче у правильній послідовності
                </span>
              ) : (
                sentenceWords.map((word, idx) => (
                  <button
                    key={idx}
                    disabled={isChecked}
                    onClick={() => handleRemoveSentenceWord(idx)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-xs shadow-sm hover:opacity-90 transition"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  disabled={isChecked}
                  onClick={() => handleSentenceWordClick(word, idx)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium hover:border-zinc-400 transition"
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
            className={`p-4 rounded-xl border space-y-1 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
            }`}
          >
            <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
              {isCorrect ? (
                <span className="text-emerald-900 dark:text-emerald-300">
                  Правильно (+10 XP)
                </span>
              ) : (
                <span className="text-rose-900 dark:text-rose-300">
                  Помилка. Правильна відповідь: {Array.isArray(currentEx.correctAnswer) ? currentEx.correctAnswer.join(' ') : currentEx.correctAnswer}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {currentEx.explanationUk}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-zinc-400">
            Оберіть інше завдання у сітці або перейдіть далі
          </span>

          {!isChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={
                (currentEx.type === 'multiple_choice' && !selectedOption) ||
                (currentEx.type === 'fill_blank' && !fillBlankInput.trim()) ||
                (currentEx.type === 'sentence_builder' && sentenceWords.length === 0)
              }
              className="py-2.5 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 disabled:opacity-40 transition"
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
              className="py-2.5 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 inline-flex items-center gap-1.5 transition"
            >
              <span>{currentIndex + 1 < exercises.length ? 'Наступне завдання' : 'Розділ завершено'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Finished All Tests Celebration & Homework Next Steps */}
      {answeredTotal === exercises.length && (
        <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  Всі 40 тестів розділу пройдено!
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Результат: {correctTotal}/{exercises.length} правильних ({Math.round((correctTotal / exercises.length) * 100)}%). Наступний крок ДЗ — розмовна практика.
                </p>
              </div>
            </div>
            <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              +{correctTotal * 10} XP зароблено
            </span>
          </div>

          <div className="pt-2 grid gap-3 sm:grid-cols-2">
            <a
              href="/speaking"
              className="p-4 rounded-xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-400 transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  ДЗ: Крок 2 • Speaking AI
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                Попрактикувати знання в розмові з ШІ
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Закріпіть конструкції у діалозі з реалістичними персонажами та отримайте оцінку вимови, граматики й вільного мовлення.
              </p>
            </a>

            <a
              href="/vocabulary"
              className="p-4 rounded-xl bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-400 transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  ДЗ: Крок 3 • Словник
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                Повторити активний вокабуляр
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Вивчіть нові слова та сталі вирази розділу з аудіовимовою та картками для довготривалого закріплення.
              </p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
