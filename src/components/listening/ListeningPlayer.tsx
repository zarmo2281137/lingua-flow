'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ListeningTrack, ListeningExercise } from '@/types/listening';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Headphones,
  Sparkles,
  Award,
  Check,
  X,
  Gauge,
  User,
  Loader2,
} from 'lucide-react';
import { playHumanAudio, stopHumanAudio, HUMAN_VOICES } from '@/utils/speech';
import { getUserStats, saveListeningProgress, addXp } from '@/utils/storage';

interface ListeningPlayerProps {
  track: ListeningTrack;
  onBack: () => void;
}

export const ListeningPlayer: React.FC<ListeningPlayerProps> = ({ track, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [playingSentenceIndex, setPlayingSentenceIndex] = useState<number | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [selectedVoice, setSelectedVoice] = useState<string>(track.preferredVoice || 'Puck');
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'audio' | 'exercises'>('audio');

  // Exercise state
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<
    Record<
      number,
      {
        answered: boolean;
        userAnswer: string;
        isCorrect: boolean;
      }
    >
  >({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dictationInput, setDictationInput] = useState<string>('');
  const [isPlayingSnippet, setIsPlayingSnippet] = useState(false);

  useEffect(() => {
    const stats = getUserStats();
    if (stats.voiceSpeed) setPlaybackSpeed(stats.voiceSpeed);
    return () => {
      stopHumanAudio();
      setIsPlaying(false);
      setIsLoadingAudio(false);
      setPlayingSentenceIndex(null);
      setIsPlayingSnippet(false);
    };
  }, [track.id]);

  const handleBack = () => {
    stopHumanAudio();
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setPlayingSentenceIndex(null);
    setIsPlayingSnippet(false);
    onBack();
  };

  const handleTabSwitch = (tab: 'audio' | 'exercises') => {
    if (tab !== activeTab) {
      stopHumanAudio();
      setIsPlaying(false);
      setIsLoadingAudio(false);
      setPlayingSentenceIndex(null);
      setIsPlayingSnippet(false);
      setActiveTab(tab);
    }
  };

  // Silently prime server and browser cache for instant playback on first click
  useEffect(() => {
    const clean = track.fullAudioText?.replace(/[*_#`~\[\]()]/g, '').trim();
    if (clean) {
      const url = `/api/tts?text=${encodeURIComponent(clean)}&voice=${encodeURIComponent(selectedVoice)}`;
      fetch(url, { priority: 'low' }).catch(() => {});
    }
  }, [track.id, track.fullAudioText, selectedVoice]);

  const toggleFullAudio = () => {
    if (isPlaying) {
      stopHumanAudio();
      setIsPlaying(false);
      setIsLoadingAudio(false);
      setPlayingSentenceIndex(null);
      return;
    }

    if (isLoadingAudio) {
      // Prevent accidental double clicks from aborting current loading request
      return;
    }

    setIsLoadingAudio(true);
    setPlayingSentenceIndex(null);

    playHumanAudio(track.fullAudioText, {
      audioUrl: track.audioUrl,
      voice: selectedVoice,
      rate: playbackSpeed,
      onStart: () => {
        setIsLoadingAudio(false);
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsLoadingAudio(false);
        setIsPlaying(false);
        setPlayingSentenceIndex(null);
      },
      onError: () => {
        setIsLoadingAudio(false);
        setIsPlaying(false);
        setPlayingSentenceIndex(null);
      },
    });
  };

  const handleVoiceChange = (newVoice: string) => {
    setSelectedVoice(newVoice);
    if (isPlaying || isLoadingAudio) {
      stopHumanAudio();
      setIsPlaying(false);
      setIsLoadingAudio(true);
      playHumanAudio(track.fullAudioText, {
        voice: newVoice,
        rate: playbackSpeed,
        onStart: () => {
          setIsLoadingAudio(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsLoadingAudio(false);
          setIsPlaying(false);
          setPlayingSentenceIndex(null);
        },
        onError: () => {
          setIsLoadingAudio(false);
          setIsPlaying(false);
          setPlayingSentenceIndex(null);
        },
      });
    }
  };

  const playSentence = (text: string, idx: number) => {
    stopHumanAudio();
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setPlayingSentenceIndex(idx);

    playHumanAudio(text, {
      voice: selectedVoice,
      rate: playbackSpeed,
      onStart: () => setPlayingSentenceIndex(idx),
      onEnd: () => setPlayingSentenceIndex(null),
      onError: () => setPlayingSentenceIndex(null),
    });
  };

  const playSnippetAudio = (snippet: string) => {
    stopHumanAudio();
    setIsPlayingSnippet(true);
    playHumanAudio(snippet, {
      voice: selectedVoice,
      rate: playbackSpeed,
      onStart: () => setIsPlayingSnippet(true),
      onEnd: () => setIsPlayingSnippet(false),
      onError: () => setIsPlayingSnippet(false),
    });
  };

  const currentExercise = track.exercises[currentExerciseIdx];

  const handleCheckExercise = () => {
    if (!currentExercise) return;
    let isCorrect = false;
    let answerVal = '';

    if (currentExercise.type === 'multiple_choice' || currentExercise.type === 'true_false') {
      if (!selectedOption) return;
      isCorrect = selectedOption.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase();
      answerVal = selectedOption;
    } else if (currentExercise.type === 'dictation') {
      if (!dictationInput.trim()) return;
      const cleanUser = dictationInput.trim().toLowerCase().replace(/[.,!?'"]/g, '');
      const cleanTarget = currentExercise.correctAnswer.trim().toLowerCase().replace(/[.,!?'"]/g, '');
      isCorrect = cleanUser === cleanTarget;
      answerVal = dictationInput.trim();
    }

    const updated = {
      ...exerciseResults,
      [currentExerciseIdx]: {
        answered: true,
        userAnswer: answerVal,
        isCorrect,
      },
    };
    setExerciseResults(updated);

    if (isCorrect) {
      addXp(15);
    }

    // Check if finished all
    const answeredCount = Object.keys(updated).length;
    if (answeredCount === track.exercises.length) {
      const correctCount = Object.values(updated).filter((r) => r.isCorrect).length;
      const scorePct = Math.round((correctCount / track.exercises.length) * 100);
      saveListeningProgress(track.id, scorePct);
    }
  };

  const switchExercise = (idx: number) => {
    stopHumanAudio();
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setPlayingSentenceIndex(null);
    setIsPlayingSnippet(false);
    setCurrentExerciseIdx(idx);
    setSelectedOption(null);
    setDictationInput('');
  };

  const answeredTotal = Object.keys(exerciseResults).length;
  const correctTotal = Object.values(exerciseResults).filter((r) => r.isCorrect).length;
  const currResult = exerciseResults[currentExerciseIdx];
  const isChecked = Boolean(currResult?.answered);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-16">
      {/* Top Header Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition shrink-0"
            title="Назад до списку треків"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                {track.level}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                {track.accent}
              </span>
              <span className="text-xs text-zinc-400 font-mono">~{track.durationEst}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mt-1">
              {track.titleUk}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              «{track.titleEn}» • {track.scenarioDescriptionUk}
            </p>
          </div>
        </div>

        {/* Audio Controls (Voice & Speed) */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Voice selector */}
          <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
            <Headphones className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="bg-transparent text-zinc-700 dark:text-zinc-200 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {HUMAN_VOICES.map((v) => (
                <option key={v.id} value={v.id} className="dark:bg-[#12141A] text-zinc-900 dark:text-white">
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Speed Toggle */}
          <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
            {[0.8, 1.0, 1.2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-1 rounded text-[11px] font-mono transition ${
                  playbackSpeed === spd
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Main Play Audio Button */}
          <button
            onClick={toggleFullAudio}
            disabled={isLoadingAudio}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-sm ${
              isPlaying
                ? 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-200 dark:ring-rose-950'
                : isLoadingAudio
                ? 'bg-zinc-700 text-white cursor-wait opacity-90'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'
            }`}
          >
            {isLoadingAudio ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>
              {isLoadingAudio
                ? 'Завантаження...'
                : isPlaying
                ? 'Зупинити аудіо'
                : 'Слухати весь запис'}
            </span>
          </button>
        </div>
      </div>

      {/* Tabs: Audio & Transcript vs Practice Exercises */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl w-full max-w-sm">
          <button
            onClick={() => handleTabSwitch('audio')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
              activeTab === 'audio'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Аудіо та діалог</span>
          </button>

          <button
            onClick={() => handleTabSwitch('exercises')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
              activeTab === 'exercises'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Завдання ({answeredTotal}/{track.exercises.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: AUDIO PLAYER & INTERACTIVE TRANSCRIPT */}
      {/* ========================================================= */}
      {activeTab === 'audio' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Audio Player Bar */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleFullAudio}
                disabled={isLoadingAudio}
                className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shadow-md hover:scale-105 transition disabled:opacity-80"
              >
                {isLoadingAudio ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>
              <div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  {isLoadingAudio
                    ? 'Підготовка студійного аудіо...'
                    : isPlaying
                    ? `Відтворюється аудіозапис (${selectedVoice})...`
                    : 'Натисніть для запуску повного аудіо'}
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Ви також можете натиснути на будь-яку репліку нижче, щоб почути конкретне речення.
                </span>
              </div>
            </div>

            {/* Toggle Transcript Visibility */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition self-start sm:self-center"
            >
              {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showTranscript ? 'Сховати транскрипт' : 'Показати транскрипт'}</span>
            </button>
          </div>

          {/* Dialogue / Transcript Block */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-zinc-400" />
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                  Діалог треку (Click-to-Listen)
                </h3>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                {track.dialogue.length} реплік
              </span>
            </div>

            {!showTranscript ? (
              <div className="p-8 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-dashed border-zinc-300 dark:border-zinc-700 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-600 dark:text-zinc-400">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                    Транскрипт приховано для чистого тренування сприйняття на слух
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
                    Спробуйте спочатку прослухати аудіо без підказки та перейти до завдань. Якщо виникнуть труднощі, ви завжди можете увімкнути текст.
                  </p>
                </div>
                <button
                  onClick={() => setShowTranscript(true)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition"
                >
                  Показати текст діалогу
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {track.dialogue.map((line, idx) => {
                  const isCurrent = playingSentenceIndex === idx;

                  return (
                    <div
                      key={idx}
                      onClick={() => playSentence(line.textEn, idx)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                        isCurrent
                          ? 'bg-blue-50/70 border-blue-300 dark:bg-blue-950/40 dark:border-blue-800'
                          : 'bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-zinc-900 dark:text-white font-mono">
                            {line.speaker}:
                          </span>
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                          «{line.textEn}»
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {line.textUk}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playSentence(line.textEn, idx);
                        }}
                        className={`p-2 rounded-lg border transition shrink-0 ${
                          isCurrent
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border-zinc-200 dark:border-zinc-700'
                        }`}
                        title="Прослухати репліку"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Key Vocabulary in Context */}
          {track.vocabulary && track.vocabulary.length > 0 && (
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                Ключова лексика з аудіозапису
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {track.vocabulary.map((vocab, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        {vocab.word}
                      </span>
                      <span className="font-mono text-xs text-zinc-400">
                        {vocab.transcription}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                      {vocab.translationUk}
                    </p>
                    <p className="text-[11px] text-zinc-400 italic">
                      "{vocab.contextSentence}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA to Practice Tab */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleTabSwitch('exercises')}
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-semibold text-xs sm:text-sm flex items-center gap-2 transition shadow-sm"
            >
              <span>Перейти до завдань на розуміння</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: EXERCISES (COMPREHENSION, DICTATION, TRUE/FALSE) */}
      {/* ========================================================= */}
      {activeTab === 'exercises' && currentExercise && (
        <div className="space-y-6 animate-fadeIn">
          {/* Progress Header & Exercise Grid */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  Завдання {currentExerciseIdx + 1} з {track.exercises.length}
                </span>
                <h3 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">
                  {currentExercise.type === 'multiple_choice'
                    ? 'Тест на розуміння почутого'
                    : currentExercise.type === 'dictation'
                    ? 'Аудіо-диктант (впишіть слово)'
                    : 'Правда чи неправда (True / False)'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Пройдено: {answeredTotal}/{track.exercises.length}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium">
                  ✓ {correctTotal}
                </span>
              </div>
            </div>

            {/* Exercise Selector Grid (1 to N) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {track.exercises.map((_, idx) => {
                const res = exerciseResults[idx];
                const isCurr = currentExerciseIdx === idx;

                let style = 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
                if (res?.answered) {
                  style = res.isCorrect
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-bold';
                }
                if (isCurr) {
                  style += ' ring-2 ring-zinc-900 dark:ring-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => switchExercise(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono border flex items-center justify-center shrink-0 transition ${style}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {currentExercise.question}
              </h4>

              {/* Dictation Replay Snippet Button */}
              {currentExercise.type === 'dictation' && currentExercise.audioSnippetText && (
                <button
                  onClick={() => playSnippetAudio(currentExercise.audioSnippetText!)}
                  disabled={isPlayingSnippet}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingSnippet ? 'Відтворюємо...' : 'Прослухати фразу'}</span>
                </button>
              )}
            </div>

            {/* 1. Multiple Choice & True/False */}
            {(currentExercise.type === 'multiple_choice' || currentExercise.type === 'true_false') && (
              <div className="space-y-2.5">
                {(currentExercise.options || []).map((opt, oIdx) => {
                  const isSelected = selectedOption === opt;
                  let btnStyle = 'bg-zinc-50 dark:bg-zinc-850 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400';

                  if (isChecked) {
                    if (opt.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase()) {
                      btnStyle = 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold';
                    } else if (isSelected && !currResult?.isCorrect) {
                      btnStyle = 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-300 dark:border-rose-800 line-through';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isChecked}
                      onClick={() => setSelectedOption(opt)}
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 border ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      <span className="w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-600 flex items-center justify-center shrink-0 text-xs">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 2. Dictation Audio Gap-fill */}
            {currentExercise.type === 'dictation' && (
              <div className="space-y-3">
                <input
                  type="text"
                  disabled={isChecked}
                  value={dictationInput}
                  onChange={(e) => setDictationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isChecked) handleCheckExercise();
                  }}
                  placeholder="Введіть почуте слово англійською..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
                />
                <span className="text-[11px] text-zinc-400 block">
                  Підказка: якщо не розчули, натисніть кнопку «Прослухати фразу» вгорі праворуч.
                </span>
              </div>
            )}

            {/* Feedback Banner */}
            {isChecked && (
              <div
                className={`p-4 rounded-xl border space-y-1 animate-fadeIn ${
                  currResult?.isCorrect
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  {currResult?.isCorrect ? (
                    <span className="text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Правильно! (+15 XP)</span>
                    </span>
                  ) : (
                    <span className="text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Помилка. Правильна відповідь: {currentExercise.correctAnswer}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {currentExercise.explanationUk}
                </p>
              </div>
            )}

            {/* Nav & Check Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-200/80 dark:border-zinc-800">
              <button
                onClick={() => switchExercise(Math.max(0, currentExerciseIdx - 1))}
                disabled={currentExerciseIdx === 0}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-30 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Попереднє</span>
              </button>

              {!isChecked ? (
                <button
                  onClick={handleCheckExercise}
                  disabled={
                    (currentExercise.type !== 'dictation' && !selectedOption) ||
                    (currentExercise.type === 'dictation' && !dictationInput.trim())
                  }
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-semibold text-xs sm:text-sm disabled:opacity-40 transition shadow-sm"
                >
                  Перевірити відповідь
                </button>
              ) : currentExerciseIdx + 1 < track.exercises.length ? (
                <button
                  onClick={() => switchExercise(currentExerciseIdx + 1)}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Наступне завдання</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Всі завдання треку завершено!
                </span>
              )}
            </div>
          </div>

          {/* Finished All Celebration Card */}
          {answeredTotal === track.exercises.length && (
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      Аудіотрек повністю завершено!
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Ваш результат: {correctTotal} з {track.exercises.length} правильних ({Math.round((correctTotal / track.exercises.length) * 100)}%).
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  +50 XP за завершення треку
                </span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-xs transition"
                >
                  Повернутися до програми аудіювання
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
