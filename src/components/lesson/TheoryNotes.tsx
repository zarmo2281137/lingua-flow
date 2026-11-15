'use client';

import React, { useState } from 'react';
import { LessonNote } from '@/types/course';
import {
  Volume2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { playHumanAudio, stopSpeech } from '@/utils/speech';
import { getUserStats } from '@/utils/storage';

interface TheoryNotesProps {
  notes: LessonNote;
  onGoToQuiz: () => void;
}

export const TheoryNotes: React.FC<TheoryNotesProps> = ({ notes, onGoToQuiz }) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const handleSpeak = (text: string) => {
    if (playingWord === text) {
      stopSpeech();
      setPlayingWord(null);
      return;
    }
    setPlayingWord(text);
    const stats = getUserStats();
    playHumanAudio(text, {
      voice: stats.preferredVoice || 'Puck',
      rate: stats.voiceSpeed || 1.0,
      onStart: () => setPlayingWord(text),
      onEnd: () => setPlayingWord(null),
      onError: () => setPlayingWord(null),
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-200/60 dark:border-indigo-900/50 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Конспект простою мовою</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          {notes.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {notes.summaryUk}
        </p>

        {/* Formula Card if available */}
        {notes.formula && (
          <div className="mt-4 p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                Головна формула теми
              </span>
              <p className="text-base sm:text-lg font-mono font-bold tracking-wide mt-0.5">
                {notes.formula}
              </p>
            </div>
            <span className="self-start sm:self-center px-3 py-1 bg-white/20 rounded-xl text-xs font-semibold backdrop-blur-sm">
              Запамʼятати 🧠
            </span>
          </div>
        )}
      </div>

      {/* Explanation Sections */}
      <div className="space-y-6">
        {notes.explanationSections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm"
          >
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center">
                {idx + 1}
              </span>
              <span>{sec.heading}</span>
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {sec.contentUk}
            </p>

            {/* Table if present */}
            {sec.tableData && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 mt-3">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                    <tr>
                      {sec.tableData.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {sec.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Examples with Audio */}
            {sec.examples && sec.examples.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Живі приклади:
                </span>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {sec.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {ex.en}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {ex.uk}
                        </p>
                        {ex.note && (
                          <span className="inline-block text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md font-semibold">
                            {ex.note}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleSpeak(ex.en)}
                        className={`p-2 rounded-xl border transition shrink-0 ${
                          playingWord === ex.en
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400'
                        }`}
                        title="Прослухати вимову"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Common Mistakes */}
      {notes.commonMistakes && notes.commonMistakes.length > 0 && (
        <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-4">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>Типові помилки, яких слід уникати</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {notes.commonMistakes.map((mistake, mIdx) => (
              <div
                key={mIdx}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/60 dark:border-amber-900/40 space-y-2 shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span className="line-through">{mistake.wrong}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{mistake.right}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-700/60 leading-relaxed">
                  {mistake.reasonUk}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vocabulary List */}
      {notes.vocabulary && notes.vocabulary.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Словничок теми з вимовою</span>
            </h3>
            <span className="text-xs text-slate-400">Натисніть на звук, щоб почути</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {notes.vocabulary.map((vocab, vIdx) => (
              <div
                key={vIdx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between gap-3 hover:border-indigo-300 dark:hover:border-indigo-800 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                      {vocab.word}
                    </span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
                      {vocab.transcription}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {vocab.translationUk}
                  </p>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">
                    "{vocab.exampleEn}"
                  </p>
                </div>
                <button
                  onClick={() => handleSpeak(vocab.word)}
                  className={`p-2.5 rounded-xl border transition shrink-0 ${
                    playingWord === vocab.word
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  title="Озвучити слово"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro-Tip Box */}
      {notes.proTipUk && (
        <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
              Порада від викладача
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
              {notes.proTipUk}
            </p>
          </div>
        </div>
      )}

      {/* Bottom CTA to Test */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={onGoToQuiz}
          className="w-full sm:w-auto py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
        >
          <span>Закріпити знання на тестах (+50 XP)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
