'use client';

import React, { useState } from 'react';
import { VOCABULARY_BANK, VOCABULARY_CATEGORIES } from '@/data/vocabularyBank';
import { VocabularyExplorer } from '@/components/vocabulary/VocabularyExplorer';
import { FlashcardTrainer } from '@/components/vocabulary/FlashcardTrainer';
import { WordQuizTrainer } from '@/components/vocabulary/WordQuizTrainer';
import { BookMarked, Layers, Zap, Sparkles } from 'lucide-react';

export default function VocabularyPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'flashcards' | 'quiz'>('catalog');

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Editorial Header */}
      <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              <span>Лексичний банк</span>
              <span>•</span>
              <span>Рівні A1 — C1</span>
              <span>•</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-bold">2 400 слів</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Словниковий запас та тренажер
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              12 ключових тематичних категорій: від побутової лексики та подорожей до фразових дієслів, ідіом і академічного C1. Кожне слово супроводжується транскрипцією IPA, прикладами та студійним озвученням.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'catalog'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Каталог</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Флеш-картки</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-1.5 px-3.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Квіз</span>
            </button>
          </div>
        </div>
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
