'use client';

import React, { useState } from 'react';
import { VOCABULARY_BANK, VOCABULARY_CATEGORIES } from '@/data/vocabularyBank';
import { VocabularyExplorer } from '@/components/vocabulary/VocabularyExplorer';
import { FlashcardTrainer } from '@/components/vocabulary/FlashcardTrainer';
import { WordQuizTrainer } from '@/components/vocabulary/WordQuizTrainer';
import {
  BookMarked,
  Layers,
  Zap,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

export default function VocabularyPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'flashcards' | 'quiz'>('catalog');

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200 border border-white/10">
              <BookMarked className="w-3.5 h-3.5 text-indigo-300" />
              <span>Лексичний тренажер • Рівні A1 — C1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Словниковий запас & Тренажер слів
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed">
              Вивчайте найуживаніші слова, фразові дієслова та живі ідіоми англійської мови. Кожне слово озвучується природним людським голосом та містить практичні приклади.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 self-start md:self-auto text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>2400+ відібраних слів та виразів</span>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 max-w-md mx-auto border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'catalog'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Каталог слів</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'flashcards'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Флеш-картки</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            activeTab === 'quiz'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Швидкий квіз</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'catalog' && (
        <VocabularyExplorer words={VOCABULARY_BANK} categories={VOCABULARY_CATEGORIES} />
      )}

      {activeTab === 'flashcards' && (
        <FlashcardTrainer words={VOCABULARY_BANK} />
      )}

      {activeTab === 'quiz' && (
        <WordQuizTrainer words={VOCABULARY_BANK} />
      )}
    </div>
  );
}
