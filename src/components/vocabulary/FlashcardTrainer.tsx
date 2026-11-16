'use client';

import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '@/types/vocabulary';
import {
  Volume2,
  ArrowLeft,
  ArrowRight,
  Shuffle,
  RotateCw,
  Check,
} from 'lucide-react';
import { playHumanAudio } from '@/utils/speech';
import { getUserStats, toggleLearnedWord } from '@/utils/storage';
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

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck]);

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
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
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
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 } });
    }
    handleNext();
  };

  if (!currentWord) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#12141A] rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          Слів для тренування не знайдено.
        </p>
      </div>
    );
  }

  const isCurrentLearned = Boolean(learnedMap[currentWord.id]);

  return (
    <div className="max-w-xl mx-auto space-y-5 animate-fadeIn">
      {/* Top Deck Info */}
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900 dark:text-white">
            Картка {currentIndex + 1} з {deck.length}
          </span>
          <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
            {currentWord.level}
          </span>
          <span className="text-xs text-zinc-400">
            • {currentWord.categoryUk}
          </span>
        </div>

        <button
          onClick={handleShuffle}
          className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition font-medium text-xs px-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-850"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Перемішати</span>
        </button>
      </div>

      {/* Clean Progress Meter */}
      <div className="h-1.5 bg-zinc-100 dark:bg-zinc-850 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-200"
          style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Tactile Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer select-none min-h-[320px] rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 p-7 sm:p-8 flex flex-col justify-between transition-all group relative"
      >
        <span className="absolute top-4 right-4 text-[11px] font-medium text-zinc-400 dark:text-zinc-500 flex items-center gap-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition">
          <RotateCw className="w-3 h-3" />
          <span>Пробіл або клік</span>
        </span>

        {/* Card Front: English Headword */}
        {!isFlipped ? (
          <div className="space-y-4 my-auto text-center animate-fadeIn">
            <div className="space-y-1.5">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                {currentWord.partOfSpeech.replace('_', ' ')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {currentWord.word}
              </h2>
              <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
                {currentWord.transcription}
              </p>
            </div>

            <button
              onClick={(e) => handleSpeak(currentWord.word, e)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Прослухати вимову</span>
            </button>
          </div>
        ) : (
          /* Card Back: Ukrainian Translation & Sentence Example */
          <div className="space-y-5 my-auto text-center animate-fadeIn">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Переклад
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                {currentWord.translationUk}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 text-left space-y-1.5">
              <div className="flex items-start justify-between gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                <p>«{currentWord.exampleEn}»</p>
                <button
                  onClick={(e) => handleSpeak(currentWord.exampleEn, e)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded transition shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                {currentWord.exampleUk}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 pt-4 border-t border-zinc-100 dark:border-zinc-850">
          <span>{currentWord.categoryUk}</span>
          <span>{isCurrentLearned ? '✓ Вже у вивчених' : 'Ще в процесі'}</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 transition"
          title="Попередня картка [←]"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex gap-2.5">
          <button
            onClick={handleNext}
            className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-semibold text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition"
          >
            Повторити пізніше
          </button>
          <button
            onClick={handleMarkKnown}
            className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Знаю (+5 XP)</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition shadow-sm"
          title="Наступна картка [→]"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
