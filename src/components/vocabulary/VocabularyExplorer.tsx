'use client';

import React, { useState, useMemo } from 'react';
import { VocabularyWord, VocabularyCategoryInfo } from '@/types/vocabulary';
import { LevelCode } from '@/types/course';
import {
  Search,
  Volume2,
  Check,
  Circle,
  X,
  SlidersHorizontal,
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
  const [filterLearned, setFilterLearned] = useState<'ALL' | 'LEARNED' | 'UNLEARNED'>('ALL');
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);
  const [learnedSet, setLearnedSet] = useState<Set<string>>(() => {
    const stats = getUserStats();
    return new Set(stats.learnedWords || []);
  });
  const [displayLimit, setDisplayLimit] = useState(60);

  // Reset display limit when filtering
  React.useEffect(() => {
    setDisplayLimit(60);
  }, [selectedLevel, selectedCategory, searchQuery, filterLearned]);

  // Filtered words
  const filteredWords = useMemo(() => {
    return words.filter((w) => {
      const matchLevel = selectedLevel === 'ALL' || w.level === selectedLevel;
      const matchCategory = selectedCategory === 'ALL' || w.category === selectedCategory;
      const isLearned = learnedSet.has(w.id);
      const matchLearned =
        filterLearned === 'ALL' ||
        (filterLearned === 'LEARNED' && isLearned) ||
        (filterLearned === 'UNLEARNED' && !isLearned);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        w.word.toLowerCase().includes(q) ||
        w.translationUk.toLowerCase().includes(q) ||
        w.exampleEn.toLowerCase().includes(q);

      return matchLevel && matchCategory && matchLearned && matchSearch;
    });
  }, [words, selectedLevel, selectedCategory, filterLearned, searchQuery, learnedSet]);

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
        confetti({
          particleCount: 20,
          spread: 35,
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
      {/* Sleek Progress Indicator */}
      <div className="bg-white dark:bg-[#12141A] rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Ваш прогрес
            </span>
            <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
              {totalLearnedCount} / {words.length} слів
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            За кожне відмічене слово нараховується +5 XP. Дані надійно синхронізуються.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
            <span>{percentLearned}% вивчено</span>
            <span>Залишилось {words.length - totalLearnedCount}</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-300"
              style={{ width: `${Math.max(1, Math.min(100, percentLearned))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#12141A] rounded-2xl p-4 sm:p-5 border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
        {/* Search input & Status filter */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Пошук слова чи перекладу (англійською або українською)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/70 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status filter: All / Studying / Learned */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 self-start sm:self-auto shrink-0">
            <button
              onClick={() => setFilterLearned('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterLearned === 'ALL'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Всі
            </button>
            <button
              onClick={() => setFilterLearned('UNLEARNED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterLearned === 'UNLEARNED'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              В процесі
            </button>
            <button
              onClick={() => setFilterLearned('LEARNED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterLearned === 'LEARNED'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Вивчені ({totalLearnedCount})
            </button>
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-zinc-100 dark:border-zinc-850">
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mr-1.5">
            Рівень:
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                selectedLevel === lvl
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {lvl === 'ALL' ? 'Всі рівні' : lvl}
            </button>
          ))}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-zinc-100 dark:border-zinc-850">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition shrink-0 ${
              selectedCategory === 'ALL'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-850 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-800'
            }`}
          >
            Всі категорії ({words.length})
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const countInCat = words.filter((w) => w.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-850 dark:text-zinc-400 hover:bg-zinc-200/70 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{cat.nameUk}</span>
                <span className="text-[10px] opacity-60 font-mono">({countInCat})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Words Grid: Clean, Editorial Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {displayedWords.map((item) => {
          const isLearned = learnedSet.has(item.id);
          const isPlayingWord = playingWordId === item.id;
          const isPlayingExample = playingWordId === `${item.id}-ex`;

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-xl bg-white dark:bg-[#12141A] border transition-all duration-150 flex flex-col justify-between gap-3 group ${
                isLearned
                  ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                  : 'border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="space-y-2.5">
                {/* Header: Meta tags + Learning check */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                      {item.level}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 italic">
                      {item.partOfSpeech.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleLearned(item.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      isLearned
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                    title={isLearned ? 'Вивчено (+5 XP)' : 'Позначити як вивчене (+5 XP)'}
                  >
                    {isLearned ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Вивчено</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3 h-3 stroke-[2] opacity-40 group-hover:opacity-80" />
                        <span>Вчу</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Headword & Audio */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-white leading-snug">
                      {item.word}
                    </h3>
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {item.transcription}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSpeak(item.word, item.id)}
                    className={`p-2 rounded-lg transition shrink-0 ${
                      isPlayingWord
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                    title="Прослухати вимову"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingWord ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                {/* Ukrainian Translation */}
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-snug">
                  {item.translationUk}
                </p>
              </div>

              {/* Context Example Quote */}
              <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-850 space-y-1">
                <div className="flex items-start justify-between gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                  <p className="leading-relaxed font-normal">
                    «{item.exampleEn}»
                  </p>
                  <button
                    onClick={() => handleSpeak(item.exampleEn, `${item.id}-ex`)}
                    className={`p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition shrink-0 ${
                      isPlayingExample ? 'text-blue-600 dark:text-blue-400' : ''
                    }`}
                    title="Прослухати речення"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
                  {item.exampleUk}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Load More */}
      {filteredWords.length > displayLimit && (
        <div className="flex flex-col items-center justify-center pt-4 pb-6 gap-2">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Показано {displayedWords.length} із {filteredWords.length} слів
          </p>
          <button
            onClick={() => setDisplayLimit((prev) => prev + 60)}
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs transition flex items-center gap-2 shadow-sm"
          >
            <span>Показати ще 60 слів</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 dark:bg-zinc-900/10">
              +{Math.min(60, filteredWords.length - displayedWords.length)}
            </span>
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredWords.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-[#12141A] rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-3">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Слів за вашим запитом не знайдено
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Спробуйте змінити фільтри за рівнем чи категорією або очистити пошуковий рядок.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLevel('ALL');
              setSelectedCategory('ALL');
              setFilterLearned('ALL');
            }}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 text-xs font-semibold rounded-lg transition"
          >
            Скинути фільтри
          </button>
        </div>
      )}
    </div>
  );
};
