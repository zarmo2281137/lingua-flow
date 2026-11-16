'use client';

import React, { useState, useEffect } from 'react';
import { X, Volume2, Headphones, CheckCircle2, Database, RefreshCw, RotateCcw } from 'lucide-react';
import {
  getUserStats,
  updateUserStats,
  getStudentSyncId,
  setStudentSyncId,
  syncWithCloud,
  resetUserProgress,
} from '@/utils/storage';
import { HUMAN_VOICES, playHumanAudio, stopSpeech } from '@/utils/speech';
import { isSupabaseConfigured } from '@/utils/supabase';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  // Supabase sync states
  const [studentId, setStudentId] = useState('default_student');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [hasSupabase, setHasSupabase] = useState(false);

  // Reset progress state
  const [isResetting, setIsResetting] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const stats = getUserStats();
      setVoiceSpeed(stats.voiceSpeed || 1.0);
      setSelectedVoice(stats.preferredVoice || 'Puck');
      setStudentId(getStudentSyncId());
      setHasSupabase(isSupabaseConfigured());
      setSyncMsg(null);
      setResetConfirm(false);
      setResetMsg(null);
    }
    return () => {
      stopSpeech();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMsg(null);
    setStudentSyncId(studentId);
    const res = await syncWithCloud(studentId);
    setSyncMsg({ ok: res.ok, text: res.message });
    setIsSyncing(false);
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await resetUserProgress(true);
      setResetMsg('Прогрес успішно анульовано (0 XP, 0 слів, A1)');
      setResetConfirm(false);
    } catch (e: any) {
      setResetMsg('Помилка при анулюванні');
    } finally {
      setIsResetting(false);
    }
  };

  const handleTestVoice = () => {
    if (isPlayingTest) {
      stopSpeech();
      setIsPlayingTest(false);
      return;
    }
    setIsPlayingTest(true);
    playHumanAudio(
      'Hello! This is your natural speaking partner voice for English learning. How does it sound?',
      {
        voice: selectedVoice,
        rate: voiceSpeed,
        onStart: () => setIsPlayingTest(true),
        onEnd: () => setIsPlayingTest(false),
        onError: () => setIsPlayingTest(false),
      }
    );
  };

  const handleSave = () => {
    setStudentSyncId(studentId);
    updateUserStats((prev) => ({
      ...prev,
      voiceSpeed,
      preferredVoice: selectedVoice,
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#12141A] rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                Налаштування платформи
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Студійний звук та синхронізація
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Studio Voice Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Голос співрозмовника
              </label>
              <button
                type="button"
                onClick={handleTestVoice}
                className={`text-xs font-medium flex items-center gap-1.5 px-2 py-1 rounded-md transition ${
                  isPlayingTest
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingTest ? 'Зупинити' : 'Тест голосу'}</span>
              </button>
            </div>

            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <optgroup label="Studio Neural Voices (Людиноподібні)">
                {HUMAN_VOICES.filter((v) => v.isStudio).map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.description}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Natural Native Accents">
                {HUMAN_VOICES.filter((v) => !v.isStudio).map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.description}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Voice Speed Slider */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Швидкість мовлення
              </label>
              <span className="text-xs font-mono font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {voiceSpeed}x
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-zinc-400 font-mono">0.8x</span>
              <input
                type="range"
                min="0.7"
                max="1.2"
                step="0.05"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-zinc-900 dark:accent-white cursor-pointer"
              />
              <span className="text-xs text-zinc-400 font-mono">1.2x</span>
            </div>
          </div>

          {/* Supabase Cloud Sync Section */}
          <div className="space-y-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-850">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Хмарне збереження (Supabase)
              </label>
              <span
                className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  hasSupabase
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                }`}
              >
                {hasSupabase ? '● Підключено' : '○ Локальний режим'}
              </span>
            </div>

            {hasSupabase && (
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">ID учня:</span>
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 flex items-center gap-1 bg-white dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 transition"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Синхронізація...' : 'Синхронізувати'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="default_student"
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
                />
                {syncMsg && (
                  <p
                    className={`text-[11px] font-medium ${
                      syncMsg.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {syncMsg.text}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Reset Progress Section */}
          <div className="space-y-2.5 pt-3 border-t border-zinc-100 dark:border-zinc-850">
            <label className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Скидання прогресу
            </label>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 text-xs space-y-2.5">
              <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                Скидає всі вивчені слова, бали XP, виконані тести та сценарії до початкового стану (0 XP, рівень A1) як локально, так і в хмарі.
              </p>

              {resetMsg && (
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-md">
                  {resetMsg}
                </p>
              )}

              {!resetConfirm ? (
                <button
                  type="button"
                  onClick={() => setResetConfirm(true)}
                  className="w-full py-2 px-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-rose-600 dark:text-rose-400 font-semibold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/30 transition flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Анулювати прогрес...</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isResetting}
                    className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
                    <span>{isResetting ? 'Скидання...' : 'Так, підтверджую'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetConfirm(false)}
                    className="py-2 px-3 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
                  >
                    Скасувати
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-100 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
          >
            Закрити
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-lg transition shadow-sm"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};
