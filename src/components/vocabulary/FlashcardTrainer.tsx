'use client';

import React, { useState } from 'react';
import { VocabularyWord } from '@/types/vocabulary';
import {
  Volume2,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  RotateCw,
  Check,
  X,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { playHumanAudio } from '@/utils/speech';
import { getUserStats, toggleLearnedWord, isWordLearned } from '@/utils/storage';
import confetti from 'canvas-confetti';

interface FlashcardTrainerProps {
  words: VocabularyWord[];
}

export const FlashcardTrainer: React.FC<FlashcardTrainerProps> = ({ words }) => {
  const [deck, setDeck] = useState<VocabularyWord[]>(() => [...words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedMap, setLearnedMap] = useState<Record<string, boolean>>(() => {
    const stats = getUserStats();
    const map: Record<string, boolean> = {};
    (stats.learnedWords || []).forEach((id) => {
      map[id] = true;
    });
    return map;
  });

  const currentWord = deck[currentIndex] || deck[0];

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const stats = getUserStats();
    playHumanAudio(text, {
      voice: stats.preferredVoice || 'Puck',
      rate: stats.voiceSpeed || 1.0,
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed deck!
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleMarkKnown = () => {
    if (!learnedMap[currentWord.id]) {
      toggleLearnedWord(currentWord.id);
      setLearnedMap((prev) => ({ ...prev, [currentWord.id]: true }));
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }
    handleNext();
  };

  if (!currentWord) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
          Слів для тренування не знайдено.
        </p>
      </div>
    );
  }

  const isCurrentLearned = Boolean(learnedMap[currentWord.id]);

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Deck Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 dark:text-white">
            Картка {currentIndex + 1} з {deck.length}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-[10px]">
            {currentWord.level}
          </span>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-semibold"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Перемішати</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-100 dark:bg-slate-750 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer select-none perspective-1000 min-h-[300px] sm:min-h-[340px] rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-xl p-8 flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition relative overflow-hidden group"
      >
        <span className="absolute top-4 right-4 text-[11px] font-semibold text-slate-400 flex items-center gap-1 group-hover:text-indigo-500 transition">
          <RotateCw className="w-3.5 h-3.5" />
          <span>Клікніть, щоб перевернути</span>
        </span>

        {/* Card Front: English */}
        {!isFlipped ? (
          <div className="space-y-6 my-auto text-center animate-fadeIn">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {currentWord.categoryUk}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentWord.word}
              </h2>
              <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
                {currentWord.transcription}
              </p>
            </div>

            <button
              onClick={(e) => handleSpeak(currentWord.word, e)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Прослухати вимову</span>
            </button>
          </div>
        ) : (
          /* Card Back: Ukrainian translation & examples */
          <div className="space-y-6 my-auto text-center animate-fadeIn">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Переклад
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {currentWord.translationUk}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-750/70 border border-slate-100 dark:border-slate-700 text-left space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <p>"{currentWord.exampleEn}"</p>
                <button
                  onClick={(e) => handleSpeak(currentWord.exampleEn, e)}
                  className="p-1 text-slate-400 hover:text-indigo-600 rounded transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentWord.exampleUk}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <span>Рівень: {currentWord.level}</span>
          <span>{isCurrentLearned ? '✅ Вивчено' : '⚪ Ще в процесі'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Попередня картка"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>

        <div className="flex-1 flex gap-2">
          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 transition"
          >
            Повторити пізніше
          </button>
          <button
            onClick={handleMarkKnown}
            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Знаю (+5 XP)</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3.5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
          title="Наступна картка"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
