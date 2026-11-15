'use client';

import React, { useState, useEffect } from 'react';
import { X, Volume2, Headphones, CheckCircle2, Database, RefreshCw } from 'lucide-react';
import {
  getUserStats,
  updateUserStats,
  getStudentSyncId,
  setStudentSyncId,
  syncWithCloud,
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

  useEffect(() => {
    if (isOpen) {
      const stats = getUserStats();
      setVoiceSpeed(stats.voiceSpeed || 1.0);
      setSelectedVoice(stats.preferredVoice || 'Puck');
      setStudentId(getStudentSyncId());
      setHasSupabase(isSupabaseConfigured());
      setSyncMsg(null);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Налаштування голосу та хмари</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Студійний звук та синхронізація Supabase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Active AI Status Notice */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Штучний Інтелект та Нейронний Голос активні</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Speaking AI діалоговий симулятор, граматична оцінка та студійні людські голоси підключені автоматично і готові до тренувань.
            </p>
          </div>

          {/* Human Voice Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-indigo-500" />
                <span>Оберіть живий голос людини</span>
              </label>
              <button
                type="button"
                onClick={handleTestVoice}
                className={`text-[11px] font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                  isPlayingTest
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                }`}
              >
                <Volume2 className="w-3 h-3" />
                <span>{isPlayingTest ? 'Зупинити' : 'Тест голосу'}</span>
              </button>
            </div>

            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Швидкість мовлення</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">
                {voiceSpeed}x
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">0.8x (повільно)</span>
              <input
                type="range"
                min="0.7"
                max="1.2"
                step="0.05"
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="flex-1 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-400">1.2x (швидко)</span>
            </div>
          </div>

          {/* Supabase Cloud Sync Section */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-500" />
                <span>Хмарна синхронізація (Supabase)</span>
              </label>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  hasSupabase
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {hasSupabase ? '🟢 Хмара підключена' : '⚪ Локальний режим'}
              </span>
            </div>

            {hasSupabase ? (
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-medium">ID учня для синхронізації:</span>
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isSyncing}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {syncMsg && (
                  <p
                    className={`text-[11px] font-semibold ${
                      syncMsg.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {syncMsg.text}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Прогрес автоматично зберігається у вашому браузері.
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Щоб увімкнути миттєву хмарну синхронізацію між комп'ютером і смартфоном, додайте змінні Supabase у ваш файл <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded">.env.local</code> або налаштування Vercel.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 rounded-xl transition"
          >
            Скасувати
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
};
