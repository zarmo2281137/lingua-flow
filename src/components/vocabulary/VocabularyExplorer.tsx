'use client';

import React, { useState, useMemo } from 'react';
import { VocabularyWord, VocabularyCategoryInfo } from '@/types/vocabulary';
import { LevelCode } from '@/types/course';
import {
  Search,
  Volume2,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  TrendingUp,
} from 'lucide-react';
import { playHumanAudio, stopSpeech } from '@/utils/speech';
import { getUserStats, toggleLearnedWord } from '@/utils/storage';
import confetti from 'canvas-confetti';

interface VocabularyExplorerProps {
  words: VocabularyWord[];
  categories: VocabularyCategoryInfo[];
}

export const VocabularyExplorer: React.FC<VocabularyExplorerProps> = ({ words, categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<LevelCode | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(() => {
    const stats = getUserStats();
    return new Set(stats.learnedWords || []);
  });
  const [displayLimit, setDisplayLimit] = useState(60);

  // Reset display limit when filtering
  React.useEffect(() => {
    setDisplayLimit(60);
  }, [selectedLevel, selectedCategory, searchQuery]);

  // Filtered words
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchLevel = selectedLevel === 'ALL' || w.level === selectedLevel;
      const matchCategory = selectedCategory === 'ALL' || w.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        w.word.toLowerCase().includes(q) ||
        w.translationUk.toLowerCase().includes(q) ||
        w.exampleEn.toLowerCase().includes(q);

      return matchLevel && matchCategory && matchSearch;
    });
  }, [words, selectedLevel, selectedCategory, searchQuery]);

  const displayedWords = useMemo(() => {
    return filteredWords.slice(0, displayLimit);
  }, [filteredWords, displayLimit]);

  const handleSpeak = (text: string, id: string) => {
    if (playingWordId === id) {
      stopSpeech();
      setPlayingWordId(null);
      return;
    }
    const stats = getUserStats();
    setPlayingWordId(id);
    playHumanAudio(text, {
      voice: stats.preferredVoice || 'Puck',
      rate: stats.voiceSpeed || 1.0,
      onStart: () => setPlayingWordId(id),
      onEnd: () => setPlayingWordId(null),
      onError: () => setPlayingWordId(null),
    });
  };

  const handleToggleLearned = (wordId: string) => {
    const isNowLearned = toggleLearnedWord(wordId);
    setLearnedSet((prev) => {
      const next = new Set(prev);
      if (isNowLearned) {
        next.add(wordId);
        // Small celebratory burst
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.8 },
        });
      } else {
        next.delete(wordId);
      }
      return next;
    });
  };

  const totalLearnedCount = learnedSet.size;
  const percentLearned = Math.round((totalLearnedCount / (words.length || 1)) * 100);

  const levels: (LevelCode | 'ALL')[] = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Learning Progress Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Словниковий трекер</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Вивчено {totalLearnedCount} з {words.length} слів ({percentLearned}%)
          </h3>
          <p className="text-xs text-indigo-200">
            Отримуйте +5 XP за кожне вивчене слово. Прогрес синхронізується з хмарою.
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2">
          <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-indigo-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, Math.min(100, percentLearned))}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-indigo-300">
            <span>Всього: {words.length} слів</span>
            <span>{percentLearned}% завершено</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Шукайте слово англійською або українською..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
            >
              Очистити
            </button>
          )}
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-400 mr-1.5">Рівень:</span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedLevel === lvl
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {lvl === 'ALL' ? 'Всі рівні' : lvl}
            </button>
          ))}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100 dark:border-slate-700/60">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === 'ALL'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            🔥 Всі теми ({words.length})
          </button>
          {categories.map((cat) => {
            const countInCat = words.filter((w) => w.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.nameUk}</span>
                <span className="opacity-60 text-[10px]">({countInCat})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayedWords.map((item) => {
          const isLearned = learnedSet.has(item.id);
          const isPlaying = playingWordId === item.id;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl bg-white dark:bg-slate-800 border transition-all space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md ${
                isLearned
                  ? 'border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/10'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800'
              }`}
            >
              <div className="space-y-2">
                {/* Header: Level + Category + Learn button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {item.level}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {item.categoryUk}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleLearned(item.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                      isLearned
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                    title={isLearned ? 'Позначено як вивчене' : 'Позначити як вивчене (+5 XP)'}
                  >
                    {isLearned ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>Вивчено</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 opacity-50" />
                        <span>Вчу</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Word & Transcription & Speaker */}
                <div className="flex items-start justify-between gap-2 pt-1">
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                      {item.word}
                    </h4>
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                      {item.transcription}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSpeak(item.word, item.id)}
                    className={`p-2 rounded-xl border transition shrink-0 ${
                      isPlaying
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md animate-pulse'
                        : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                    }`}
                    title="Озвучити природним голосом"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Ukrainian Translation */}
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {item.translationUk}
                </p>
              </div>

              {/* Example sentence */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-1">
                <div className="flex items-start justify-between gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <p className="italic">"{item.exampleEn}"</p>
                  <button
                    onClick={() => handleSpeak(item.exampleEn, `${item.id}-ex`)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded transition shrink-0"
                    title="Озвучити приклад"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {item.exampleUk}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button if results exceed displayLimit */}
      {filteredWords.length > displayLimit && (
        <div className="flex flex-col items-center justify-center pt-2 pb-4 gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Показано {displayedWords.length} з {filteredWords.length} слів
          </p>
          <button
            onClick={() => setDisplayLimit((prev) => prev + 60)}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <span>Показати ще 60 слів</span>
            <span className="px-2 py-0.5 rounded-lg bg-white/20 text-[10px]">
              +{Math.min(60, filteredWords.length - displayedWords.length)}
            </span>
          </button>
        </div>
      )}

      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            Слів за вашим запитом не знайдено
          </p>
          <p className="text-xs text-slate-400">
            Спробуйте очистити фільтри або ввести інше пошукове слово.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLevel('ALL');
              setSelectedCategory('ALL');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Скинути фільтри
          </button>
        </div>
      )}
    </div>
  );
};
