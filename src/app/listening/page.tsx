'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { LISTENING_TRACKS, getListeningTrackById } from '@/data/listening/tracks';
import { ListeningTrack } from '@/types/listening';
import { ListeningPlayer } from '@/components/listening/ListeningPlayer';
import {
  Headphones,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Flame,
  Clock,
  BookOpen,
} from 'lucide-react';
import { getUserStats } from '@/utils/storage';
import { stopHumanAudio } from '@/utils/speech';
import { UserStats } from '@/types/user';

function ListeningContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [activeTrack, setActiveTrack] = useState<ListeningTrack | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(getUserStats());

    const onStorage = () => setStats(getUserStats());
    window.addEventListener('storage', onStorage);
    window.addEventListener('lingua_flow_stats_updated', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('lingua_flow_stats_updated', onStorage);
    };
  }, []);

  // Always stop audio on unmount of the page
  useEffect(() => {
    return () => {
      stopHumanAudio();
    };
  }, []);

  // Sync with searchParams
  useEffect(() => {
    stopHumanAudio();
    const trackId = searchParams.get('track');
    if (trackId) {
      const found = getListeningTrackById(trackId);
      if (found) setActiveTrack(found);
    } else {
      setActiveTrack(null);
    }
  }, [searchParams]);

  const handleSelectTrack = (track: ListeningTrack) => {
    stopHumanAudio();
    setActiveTrack(track);
    router.push(`/listening?track=${track.id}`);
  };

  const handleBackToList = () => {
    stopHumanAudio();
    setActiveTrack(null);
    router.push('/listening');
  };

  const filteredTracks =
    selectedLevel === 'ALL'
      ? LISTENING_TRACKS
      : LISTENING_TRACKS.filter((t) => t.level === selectedLevel);

  const completedCount = (stats?.completedListeningTracks || []).length;
  const listeningScores = stats?.listeningScores || {};
  const avgScore =
    Object.values(listeningScores).length > 0
      ? Math.round(
          Object.values(listeningScores).reduce((a, b) => a + b, 0) /
            Object.values(listeningScores).length
        )
      : 0;

  // If a track is active, render player
  if (activeTrack) {
    return (
      <div className="py-6">
        <ListeningPlayer track={activeTrack} onBack={handleBackToList} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Hero Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700">
            <Headphones className="w-3.5 h-3.5 text-blue-500" />
            <span>Програма сприйняття мови на слух (Listening Hub)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Аудіювання для всіх рівнів (A1–C1)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Покращуйте розуміння живої англійської мови: студійні голоси, британський, американський та австралійський акценти, інтерактивні транскрипти з кліком по реченнях та по 10 завдань до кожної мікротеми (800 завдань: тести, аудіо-диктанти та перевірка фактів).
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-200/80 dark:border-zinc-800 relative z-10">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Усього треків</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-white font-mono">{LISTENING_TRACKS.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Пройдено</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-white font-mono">
              {completedCount} / {LISTENING_TRACKS.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Середній бал</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 font-mono">
              {avgScore > 0 ? `${avgScore}%` : '—'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Вправ у базі</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {LISTENING_TRACKS.reduce((acc, t) => acc + (t.exercises ? t.exercises.length : 0), 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Level Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-zinc-100 dark:bg-zinc-850 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {lvl === 'ALL' ? 'Всі рівні (20)' : `${lvl} (${LISTENING_TRACKS.filter((t) => t.level === lvl).length})`}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-zinc-400 font-mono">
          Показано: {filteredTracks.length} треків
        </span>
      </div>

      {/* Tracks Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {filteredTracks.map((track) => {
          const isCompleted = stats?.completedListeningTracks?.includes(track.id);
          const bestScore = listeningScores[track.id];

          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track)}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-sm transition-all cursor-pointer flex flex-col justify-between gap-4 group"
            >
              <div className="space-y-2.5">
                {/* Meta row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                      {track.level}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      {track.accent}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{track.durationEst}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {track.titleUk}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    «{track.titleEn}»
                  </p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                  {track.scenarioDescriptionUk}
                </p>
              </div>

              {/* Bottom footer */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3 text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">
                  {track.exercises.length} завдань (тести, диктант)
                </span>

                {isCompleted ? (
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Завершено {bestScore ? `(${bestScore}%)` : ''}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-white group-hover:translate-x-0.5 transition-transform">
                    <span>Слухати</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ListeningPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-2 border-zinc-900 border-t-transparent animate-spin mx-auto dark:border-white dark:border-t-transparent" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Завантаження програми аудіювання...</p>
        </div>
      }
    >
      <ListeningContent />
    </Suspense>
  );
}
