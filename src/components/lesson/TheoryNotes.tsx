'use client';

import React, { useState, useEffect } from 'react';
import { LessonNote } from '@/types/course';
import {
  Volume2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  Check,
  X,
  Headphones,
} from 'lucide-react';
import { playHumanAudio, stopSpeech } from '@/utils/speech';
import { getUserStats } from '@/utils/storage';

interface TheoryNotesProps {
  notes: LessonNote;
  onGoToQuiz: () => void;
  onGoToExam?: () => void;
  onGoToListening?: () => void;
}

export const TheoryNotes: React.FC<TheoryNotesProps> = ({ notes, onGoToQuiz, onGoToExam, onGoToListening }) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

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
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Summary */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Теоретичний конспект
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {notes.title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {notes.summaryUk}
        </p>

        {/* Formula Card if available */}
        {notes.formula && (
          <div className="mt-4 p-4 rounded-xl bg-zinc-900 text-white dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                Синтаксична формула
              </span>
              <p className="text-sm sm:text-base font-mono font-medium tracking-wide mt-0.5">
                {notes.formula}
              </p>
            </div>
            <span className="self-start sm:self-center px-2.5 py-1 bg-white/10 rounded-md text-xs font-medium text-zinc-300">
              Базова схема
            </span>
          </div>
        )}
      </div>

      {/* Explanation Sections */}
      <div className="space-y-6">
        {notes.explanationSections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center justify-center">
                {idx + 1}
              </span>
              <span>{sec.heading}</span>
            </h3>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {sec.contentUk}
            </p>

            {/* Table if present */}
            {sec.tableData && (
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 mt-3">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                    <tr>
                      {sec.tableData.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {sec.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
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
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Приклади в контексті:
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  {sec.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {ex.en}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {ex.uk}
                        </p>
                        {ex.note && (
                          <span className="inline-block text-[10px] text-zinc-600 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded font-medium">
                            {ex.note}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleSpeak(ex.en)}
                        className={`p-2 rounded-lg border transition shrink-0 ${
                          playingWord === ex.en
                            ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900'
                            : 'bg-white dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750'
                        }`}
                        title="Прослухати вимову"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
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
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span>Типові помилки та винятки</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {notes.commonMistakes.map((mistake, mIdx) => (
              <div
                key={mIdx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400">
                  <X className="w-3.5 h-3.5 shrink-0" />
                  <span className="line-through">{mistake.wrong}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{mistake.right}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1.5 border-t border-zinc-200/80 dark:border-zinc-800 leading-relaxed">
                  {mistake.reasonUk}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vocabulary List */}
      {notes.vocabulary && notes.vocabulary.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Лексика розділу
            </h3>
            <span className="text-xs text-zinc-400">З озвучкою та транскрипцією</span>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {notes.vocabulary.map((vocab, vIdx) => (
              <div
                key={vIdx}
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                      {vocab.word}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {vocab.transcription}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">
                    {vocab.translationUk}
                  </p>
                  <p className="text-[11px] text-zinc-400 italic">
                    "{vocab.exampleEn}"
                  </p>
                </div>
                <button
                  onClick={() => handleSpeak(vocab.word)}
                  className={`p-2 rounded-lg border transition shrink-0 ${
                    playingWord === vocab.word
                      ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900'
                      : 'bg-white dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750'
                  }`}
                  title="Озвучити слово"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro-Tip Box */}
      {notes.proTipUk && (
        <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Порада від викладача
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
              {notes.proTipUk}
            </p>
          </div>
        </div>
      )}

      {/* Homework (ДЗ) Section */}
      <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs tracking-wider">
              ДЗ
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Домашнє завдання для закріплення теми
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Виконайте 5 послідовних кроків для повного опанування граматичного матеріалу
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-zinc-200/80 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Обовʼязкова практика
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-1">
          {/* Step 1: Practice Tests */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Крок 1</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                40 практичних тестів
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Пройдіть 40 різнопланових тестів (тест, пропуски, порядок слів) для первинного закріплення.
              </p>
            </div>
            <button
              onClick={onGoToQuiz}
              className="w-full py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Почати тести</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Step 2: Listening Hub (Аудіювання) */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-blue-300 dark:border-blue-900/60 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500 font-mono">Крок 2</span>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                Аудіювання теми
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Послухайте живий багатоголосий діалог та виконайте 10 завдань на сприйняття (+30 XP).
              </p>
            </div>
            <button
              onClick={onGoToListening || onGoToQuiz}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Headphones className="w-3 h-3" />
              <span>Слухати аудіо</span>
            </button>
          </div>

          {/* Step 3: Topic Exam (КР) */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-amber-300 dark:border-amber-900/60 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 font-mono">Крок 3</span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                Контрольна (КР + аудіо)
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Складіть контрольну з 15 завдань (включно з аудіюванням) на 80%+ для зарахування (+100 XP).
              </p>
            </div>
            <button
              onClick={onGoToExam || onGoToQuiz}
              className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <span>Скласти КР</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Step 4: Speaking AI */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Крок 4</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                Speaking AI практика
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Потренуйте живий діалог з голосовим ШІ та отримайте оцінку вимови, граматики й плинності.
              </p>
            </div>
            <a
              href="/speaking"
              className="w-full py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Speaking тренажер</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Step 5: Vocabulary */}
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Крок 5</span>
                <span className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                Лексика та флеш-картки
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Повторіть слова у Словнику з аудіоозвучкою для довготривалого закріплення.
              </p>
            </div>
            <a
              href="/vocabulary"
              className="w-full py-2 px-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <span>Відкрити словник</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Test */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onGoToQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 inline-flex items-center justify-center gap-2 transition"
        >
          <span>Перейти до практичних завдань</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
