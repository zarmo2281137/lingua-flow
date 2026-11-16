'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Topic, Exercise } from '@/types/course';
import { getTopicExamQuestions } from '@/data/topicExams';
import {
  Award,
  Timer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  FileCheck,
  Check,
  X,
  Sparkles,
  Headphones,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';
import { getUserStats, saveTopicExamScore } from '@/utils/storage';
import { playHumanAudio, stopHumanAudio } from '@/utils/speech';

interface TopicExamProps {
  topic: Topic;
  onBackToPractice: () => void;
  onBackToTheory: () => void;
  onNextLesson?: () => void;
}

export const TopicExam: React.FC<TopicExamProps> = ({
  topic,
  onBackToPractice,
  onBackToTheory,
  onNextLesson,
}) => {
  const questions = getTopicExamQuestions(topic.id);
  const [phase, setPhase] = useState<'intro' | 'exam' | 'results'>('intro');

  // Answers map: index -> answer value
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer: 15 minutes (900 seconds)
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Builder state for current question
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [fillBlankInput, setFillBlankInput] = useState('');

  // Previous attempt info
  const [previousResult, setPreviousResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    date: string;
  } | null>(null);

  useEffect(() => {
    const stats = getUserStats();
    if (stats.topicExamScores && stats.topicExamScores[topic.id]) {
      setPreviousResult(stats.topicExamScores[topic.id]);
    }
  }, [topic.id]);

  // Audio listening state
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);

  // Clean timer & audio on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopHumanAudio();
    };
  }, []);

  const handleToggleExamAudio = (text: string, voice?: string) => {
    if (playingAudioIndex === currentIndex) {
      stopHumanAudio();
      setPlayingAudioIndex(null);
      return;
    }

    stopHumanAudio();
    setPlayingAudioIndex(currentIndex);

    playHumanAudio(text, {
      voice: voice || 'Google-UK',
      onStart: () => setPlayingAudioIndex(currentIndex),
      onEnd: () => setPlayingAudioIndex(null),
      onError: () => setPlayingAudioIndex(null),
    });
  };

  // Sync inputs when switching questions
  useEffect(() => {
    stopHumanAudio();
    setPlayingAudioIndex(null);

    const curr = questions[currentIndex];
    if (!curr) return;

    if (curr.type === 'sentence_builder') {
      const saved = answers[currentIndex] as string[] | undefined;
      if (saved) {
        setSentenceWords(saved);
        const remaining = [...(curr.options || [])];
        for (const w of saved) {
          const idx = remaining.indexOf(w);
          if (idx !== -1) remaining.splice(idx, 1);
        }
        setAvailableWords(remaining);
      } else {
        setSentenceWords([]);
        setAvailableWords(curr.options || []);
      }
    } else if (curr.type === 'fill_blank') {
      setFillBlankInput(answers[currentIndex] || '');
    }
  }, [currentIndex, questions]);

  const startExam = () => {
    setAnswers({});
    setCurrentIndex(0);
    setTimeLeft(15 * 60);
    setPhase('exam');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSelectOption = (opt: string) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
  };

  const handleFillBlankChange = (text: string) => {
    setFillBlankInput(text);
    setAnswers((prev) => ({ ...prev, [currentIndex]: text }));
  };

  const handleSentenceWordClick = (word: string, index: number) => {
    const nextSent = [...sentenceWords, word];
    setSentenceWords(nextSent);
    const nextAvail = [...availableWords];
    nextAvail.splice(index, 1);
    setAvailableWords(nextAvail);
    setAnswers((prev) => ({ ...prev, [currentIndex]: nextSent }));
  };

  const handleRemoveSentenceWord = (index: number) => {
    const removed = sentenceWords[index];
    const nextSent = [...sentenceWords];
    nextSent.splice(index, 1);
    setSentenceWords(nextSent);
    setAvailableWords((prev) => [...prev, removed]);
    setAnswers((prev) => ({ ...prev, [currentIndex]: nextSent }));
  };

  const handleFinishExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (q.type === 'multiple_choice') {
        if (userAns === q.correctAnswer) correctCount++;
      } else if (q.type === 'fill_blank') {
        const cleanUser = String(userAns || '').trim().toLowerCase();
        const expected = String(q.correctAnswer || '').trim().toLowerCase();
        if (cleanUser === expected) correctCount++;
      } else if (q.type === 'sentence_builder') {
        const expectedArr = q.correctAnswer as string[];
        const userArr = userAns as string[] | undefined;
        if (
          userArr &&
          userArr.length === expectedArr.length &&
          userArr.every((w, i) => w.toLowerCase() === expectedArr[i].toLowerCase())
        ) {
          correctCount++;
        }
      }
    });

    const total = questions.length;
    const pct = Math.round((correctCount / total) * 100);
    const passed = pct >= 80;

    // Save to storage
    saveTopicExamScore(topic.id, correctCount, total, passed);
    setPreviousResult({
      score: correctCount,
      total,
      percentage: pct,
      passed,
      date: new Date().toISOString().split('T')[0],
    });

    setPhase('results');
  };

  const currentQ = questions[currentIndex];
  const answeredTotal = Object.keys(answers).length;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateGradeLabel = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct === 100) return { grade: '12 / 12', desc: 'Відмінно (Mastery)', color: 'text-emerald-600 dark:text-emerald-400' };
    if (pct >= 90) return { grade: '11 / 12', desc: 'Відмінно', color: 'text-emerald-600 dark:text-emerald-400' };
    if (pct >= 85) return { grade: '10 / 12', desc: 'Дуже добре', color: 'text-blue-600 dark:text-blue-400' };
    if (pct >= 80) return { grade: '9 / 12', desc: 'Добре (Зараховано)', color: 'text-blue-600 dark:text-blue-400' };
    if (pct >= 70) return { grade: '7 / 12', desc: 'Задовільно (Потрібно 80%+)', color: 'text-amber-600 dark:text-amber-400' };
    return { grade: '4 / 12', desc: 'Не складено', color: 'text-rose-600 dark:text-rose-400' };
  };

  // -------------------------------------------------------------
  // PHASE 1: INTRO
  // -------------------------------------------------------------
  if (phase === 'intro') {
    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn pb-12">
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  {topic.level} • Урок {topic.order}
                </span>
                <span className="text-xs text-zinc-500 font-medium">Офіційна атестація теми</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Контрольна робота: {topic.titleUk}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Тема: «{topic.titleEn}»
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
          </div>

          {/* Exam Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Запитань</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-white font-mono">15</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Час</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-white font-mono">15 хв</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Прохідний бал</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-white font-mono">80% (12/15)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Винагорода</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">+100 XP</span>
            </div>
          </div>

          {/* Rules & Structure */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Правила складання контрольної роботи:</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <li>Тест містить 10 граматичних питань та 5 завдань на <strong>аудіювання (Listening Comprehension)</strong> із живими записами носіїв мови.</li>
              <li>Для завдань з аудіювання натискайте кнопку «Слухати аудіо» поруч із запитанням.</li>
              <li>Підказки під час проходження вимкнено — повний розбір з поясненнями буде доступний після здачі.</li>
              <li>Ви можете повертатися до будь-якого запитання через навігаційну панель до закінчення часу.</li>
              <li>Для зарахування теми в профіль необхідно набрати щонайменше 80% правильних відповідей.</li>
            </ul>
          </div>

          {/* Previous Attempt Banner */}
          {previousResult && (
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12141A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                    previousResult.passed
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}
                >
                  {previousResult.passed ? '✓' : '✕'}
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Попередній результат ({previousResult.date}):</span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    {previousResult.score} з {previousResult.total} ({previousResult.percentage}%) —{' '}
                    <span className={previousResult.passed ? 'text-emerald-600' : 'text-rose-500'}>
                      {previousResult.passed ? 'Зараховано' : 'Не зараховано'}
                    </span>
                  </span>
                </div>
              </div>
              <span className="text-xs text-zinc-400">Ви можете перескласти для покращення балу</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onBackToTheory}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Повторити конспект теорії</span>
            </button>

            <button
              onClick={startExam}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>{previousResult ? 'Перескласти контрольну' : 'Почати контрольну роботу'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PHASE 2: EXAM IN PROGRESS
  // -------------------------------------------------------------
  if (phase === 'exam' && currentQ) {
    const isAnswered = answers[currentIndex] !== undefined;

    return (
      <div className="space-y-5 max-w-3xl mx-auto animate-fadeIn pb-16">
        {/* Sticky Exam Top Bar */}
        <div className="sticky top-20 z-30 p-4 rounded-2xl bg-white/90 dark:bg-[#12141A]/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              КР
            </span>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate max-w-[150px] sm:max-w-[260px]">
              {topic.titleUk}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold border transition ${
                timeLeft < 180
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 animate-pulse'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button
              onClick={handleFinishExam}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 text-xs font-semibold transition"
            >
              Здати КР ({answeredTotal}/15)
            </button>
          </div>
        </div>

        {/* Question Selector Numbers (1 to 15) */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 flex items-center justify-between gap-1 overflow-x-auto shadow-sm">
          {questions.map((_, idx) => {
            const hasAns = answers[idx] !== undefined;
            const isCurr = currentIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-medium flex items-center justify-center transition shrink-0 ${
                  isCurr
                    ? 'ring-2 ring-zinc-900 dark:ring-white bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold'
                    : hasAns
                    ? 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                    : 'bg-zinc-50 text-zinc-400 dark:bg-zinc-850 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800'
                }`}
                title={`Питання #${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Завдання {currentIndex + 1} з {questions.length}
            </span>
            <span className="text-xs font-medium text-zinc-500">
              {currentQ.type === 'multiple_choice'
                ? 'Вибір правильної відповіді'
                : currentQ.type === 'fill_blank'
                ? 'Вставка слова'
                : 'Складання речення'}
            </span>
          </div>

          {/* Listening Comprehension Audio Card */}
          {currentQ.audioText && (
            <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold font-mono uppercase text-blue-600 dark:text-blue-400">
                      Аудіозапис носія мови
                    </span>
                    {currentQ.audioSpeaker && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-blue-200 dark:border-blue-800">
                        {currentQ.audioSpeaker}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {playingAudioIndex === currentIndex
                      ? 'Відтворюється аудіо... Слухайте уважно!'
                      : 'Натисніть кнопку, щоб прослухати запис до запитання'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleToggleExamAudio(currentQ.audioText!, currentQ.audioVoice)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition shrink-0 shadow-sm ${
                  playingAudioIndex === currentIndex
                    ? 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-200 dark:ring-rose-950'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {playingAudioIndex === currentIndex ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Зупинити аудіо</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    <span>Слухати аудіо</span>
                  </>
                )}
              </button>
            </div>
          )}

          <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* 1. Multiple Choice */}
          {currentQ.type === 'multiple_choice' && (
            <div className="space-y-2.5">
              {(currentQ.options || []).map((opt, oIdx) => {
                const isSelected = answers[currentIndex] === opt;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 border ${
                      isSelected
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                    }`}
                  >
                    <span>{opt}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs ${
                        isSelected
                          ? 'border-white text-zinc-900 bg-white dark:border-zinc-900 dark:text-white dark:bg-zinc-900 font-bold'
                          : 'border-zinc-300 dark:border-zinc-600'
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Fill in the Blank */}
          {currentQ.type === 'fill_blank' && (
            <div className="space-y-2">
              <input
                type="text"
                value={fillBlankInput}
                onChange={(e) => handleFillBlankChange(e.target.value)}
                placeholder="Введіть правильну відповідь англійською..."
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white"
              />
              <span className="text-[11px] text-zinc-400 block">
                Відповідь зберігається автоматично. Враховуйте правильний правопис слів.
              </span>
            </div>
          )}

          {/* 3. Sentence Builder */}
          {currentQ.type === 'sentence_builder' && (
            <div className="space-y-3">
              <div className="min-h-[60px] p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/30 border border-dashed border-zinc-300 dark:border-zinc-700 flex flex-wrap gap-2 items-center">
                {sentenceWords.length === 0 ? (
                  <span className="text-xs text-zinc-400">
                    Натискайте на слова нижче в правильній послідовності
                  </span>
                ) : (
                  sentenceWords.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemoveSentenceWord(idx)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-xs shadow-sm hover:opacity-85 transition"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {availableWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSentenceWordClick(word, idx)}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium hover:border-zinc-400 transition"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition disabled:opacity-30 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Попереднє</span>
            </button>

            {currentIndex + 1 < questions.length ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <span>Наступне</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Завершити і здати роботу</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // PHASE 3: RESULTS & FULL REVIEW
  // -------------------------------------------------------------
  if (phase === 'results' && previousResult) {
    const isPassed = previousResult.passed;
    const gradeInfo = calculateGradeLabel(previousResult.score, previousResult.total);

    return (
      <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn pb-16">
        {/* Grade Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                    isPassed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}
                >
                  {isPassed ? 'Контрольну зараховано ✓' : 'Контрольну не зараховано ✕'}
                </span>
                <span className="text-xs text-zinc-400 font-mono">15 із 15 перевірено</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                Результати контрольної роботи
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Тема: «{topic.titleUk}» ({topic.titleEn})
              </p>
            </div>

            {/* Big Grade Box */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-center shrink-0">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 block">Оцінка</span>
              <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                {previousResult.percentage}% правильних
              </span>
            </div>
          </div>

          {/* Reward & Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
              isPassed
                ? 'bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50/60 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800/60 text-rose-900 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isPassed ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
              >
                {isPassed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm">
                  {isPassed ? 'Тему офіційно зараховано у ваш навчальний профіль!' : 'Необхідно набрати 80% (12/15) для зарахування'}
                </h4>
                <p className="text-[11px] opacity-80">
                  {isPassed
                    ? `Ви заробили +100 XP за успішне проходження контрольної роботи.`
                    : 'Повторіть складні моменти в конспекті теорії та спробуйте ще раз.'}
                </p>
              </div>
            </div>

            {isPassed && (
              <span className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold shrink-0">
                +100 XP
              </span>
            )}
          </div>

          {/* Questions Review Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Детальний розбір усіх 15 завдань
            </h3>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const userAns = answers[idx];
                let isQCorrect = false;

                if (q.type === 'multiple_choice') {
                  isQCorrect = userAns === q.correctAnswer;
                } else if (q.type === 'fill_blank') {
                  isQCorrect =
                    String(userAns || '').trim().toLowerCase() ===
                    String(q.correctAnswer || '').trim().toLowerCase();
                } else if (q.type === 'sentence_builder') {
                  const expected = q.correctAnswer as string[];
                  const userArr = userAns as string[] | undefined;
                  isQCorrect = Boolean(
                    userArr &&
                      userArr.length === expected.length &&
                      userArr.every((w, i) => w.toLowerCase() === expected[i].toLowerCase())
                  );
                }

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      isQCorrect
                        ? 'bg-zinc-50/70 dark:bg-zinc-850/40 border-zinc-200 dark:border-zinc-800'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        #{idx + 1}. {q.question.replace(/^\[Контрольна\s*#\d+\]\s*/i, '')}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold shrink-0 ${
                          isQCorrect
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {isQCorrect ? 'Правильно' : 'Помилка'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 pt-1 border-t border-zinc-200/60 dark:border-zinc-800 text-[11px]">
                      {q.audioText && (
                        <div className="flex items-center gap-2 pb-1">
                          <button
                            onClick={() => handleToggleExamAudio(q.audioText!, q.audioVoice)}
                            className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:bg-blue-100 transition"
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>Прослухати аудіо ({q.audioSpeaker || 'Аудіозапис'})</span>
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400">Ваша відповідь:</span>
                        <span className={isQCorrect ? 'text-emerald-600 font-medium' : 'text-rose-500 font-medium line-through'}>
                          {Array.isArray(userAns) ? userAns.join(' ') : String(userAns || '— (немає відповіді)')}
                        </span>
                      </div>

                      {!isQCorrect && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400">Правильно:</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' ') : q.correctAnswer}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed italic">
                      Пояснення: {q.explanationUk}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={startExam}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Перескласти КР</span>
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onBackToPractice}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                До практики
              </button>

              {onNextLesson && (
                <button
                  onClick={onNextLesson}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Наступний урок</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
