'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RoleplayScenario, ChatMessage } from '@/types/speaking';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  BookOpen,
  Headphones,
} from 'lucide-react';
import {
  SpeechRecognizer,
  playHumanAudio,
  stopSpeech,
  isSpeechRecognitionSupported,
  HUMAN_VOICES,
} from '@/utils/speech';
import { getGeminiRoleplayResponse } from '@/utils/gemini';
import { getUserStats, updateUserStats } from '@/utils/storage';

interface RoleplayChatProps {
  scenario: RoleplayScenario;
  onBack: () => void;
}

export const RoleplayChat: React.FC<RoleplayChatProps> = ({ scenario, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [showPhrases, setShowPhrases] = useState(false);
  const [selectedMessageFeedback, setSelectedMessageFeedback] = useState<ChatMessage | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // High-fidelity human studio voices
  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);

  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stats = getUserStats();
    const initialVoice = stats.preferredVoice || 'Puck';
    setSelectedVoice(initialVoice);

    const initialMsg: ChatMessage = {
      id: 'init-1',
      sender: 'ai',
      text: scenario.initialAiMessageEn,
      timestamp: Date.now(),
    };
    setMessages([initialMsg]);

    if (autoSpeak) {
      playHumanAudio(scenario.initialAiMessageEn, {
        voice: initialVoice,
        rate: stats.voiceSpeed || 1.0,
        onStart: () => setPlayingMsgId('init-1'),
        onEnd: () => setPlayingMsgId(null),
      });
    }

    return () => {
      stopSpeech();
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
    };
  }, [scenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingAi]);

  const handleVoiceChange = (voiceId: string) => {
    setSelectedVoice(voiceId);
    updateUserStats((prev) => ({ ...prev, preferredVoice: voiceId }));
    // Quick pleasant human voice preview
    setPlayingMsgId('sample');
    playHumanAudio("Hello! I am your AI speaking partner.", {
      voice: voiceId,
      onStart: () => setPlayingMsgId('sample'),
      onEnd: () => setPlayingMsgId(null),
    });
  };

  // Handle Speech Recognition
  const toggleRecording = () => {
    if (isRecording) {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    setErrorMessage(null);

    if (!isSpeechRecognitionSupported()) {
      setErrorMessage(
        'Ваш браузер не підтримує розпізнавання голосу. Ви можете вводити відповіді текстом нижче (рекомендуємо Google Chrome або Edge).'
      );
      return;
    }

    recognizerRef.current = new SpeechRecognizer({
      onResult: (text) => {
        setTranscript(text);
      },
      onError: (err) => {
        setErrorMessage(err);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      },
      language: 'en-US',
    });

    recognizerRef.current.start();
    setIsRecording(true);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || transcript).trim();
    if (!text || isLoadingAi) return;

    if (isRecording && recognizerRef.current) {
      recognizerRef.current.stop();
      setIsRecording(false);
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setTranscript('');
    setIsLoadingAi(true);
    setErrorMessage(null);

    try {
      const stats = getUserStats();
      const response = await getGeminiRoleplayResponse(
        stats.geminiApiKey,
        scenario,
        nextMessages,
        text
      );

      // Attach feedback to user message
      userMsg.feedback = response.feedback;
      setSelectedMessageFeedback(userMsg);

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: response.aiReplyEn,
        timestamp: Date.now(),
      };

      setMessages([...nextMessages, aiMsg]);

      if (autoSpeak) {
        playHumanAudio(response.aiReplyEn, {
          voice: selectedVoice,
          rate: stats.voiceSpeed || 1.0,
          onStart: () => setPlayingMsgId(aiMsg.id),
          onEnd: () => setPlayingMsgId(null),
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Не вдалося отримати відповідь від AI. Спробуйте ще раз.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handlePlayMessageAudio = (text: string, msgId?: string) => {
    const targetId = msgId || text;
    if (playingMsgId === targetId) {
      stopSpeech();
      setPlayingMsgId(null);
      return;
    }
    const stats = getUserStats();
    setPlayingMsgId(targetId);
    playHumanAudio(text, {
      voice: selectedVoice,
      rate: stats.voiceSpeed || 1.0,
      onStart: () => setPlayingMsgId(targetId),
      onEnd: () => setPlayingMsgId(null),
    });
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto animate-fadeIn pb-16">
      {/* Top Bar with Voice Picker */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Назад до списку сценаріїв"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                {scenario.titleEn}
              </h2>
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                {scenario.level}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI: <span className="font-semibold">{scenario.aiRoleEn}</span> • Ви: <span className="font-semibold">{scenario.userRoleEn}</span>
            </p>
          </div>
        </div>

        {/* Controls: Human Voice selection + Audio toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Studio Neural Voice Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-700/60 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-600 text-xs">
            <Headphones className="w-3.5 h-3.5 text-indigo-500" />
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer max-w-[150px] sm:max-w-[210px] truncate"
              title="Оберіть живий голос людини для озвучування"
            >
              <optgroup label="Studio Neural (Людиноподібні)">
                {HUMAN_VOICES.filter((v) => v.isStudio).map((v) => (
                  <option key={v.id} value={v.id} className="dark:bg-slate-800 text-slate-900 dark:text-white">
                    {v.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Natural Accents">
                {HUMAN_VOICES.filter((v) => !v.isStudio).map((v) => (
                  <option key={v.id} value={v.id} className="dark:bg-slate-800 text-slate-900 dark:text-white">
                    {v.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              autoSpeak
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-300'
                : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-700 dark:border-slate-600'
            }`}
            title="Автоматичне озвучування реплік AI"
          >
            {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">Озвучка</span>
          </button>

          <button
            onClick={() => setShowPhrases(!showPhrases)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Підказки фраз</span>
            {showPhrases ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Suggested Phrases Drawer */}
      {showPhrases && (
        <div className="p-4 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/60 space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Корисні фрази для цього діалогу (натисніть, щоб промовити або прослухати):</span>
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {scenario.suggestedPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/40 flex items-start justify-between gap-2 shadow-sm"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => handleSendMessage(phrase.en)}
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                    "{phrase.en}"
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {phrase.uk}
                  </p>
                </div>
                <button
                  onClick={() => handlePlayMessageAudio(phrase.en, `phrase-${idx}`)}
                  className={`p-1.5 rounded-lg transition shrink-0 ${
                    playingMsgId === `phrase-${idx}`
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                      : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  title="Прослухати вимову природним голосом"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="min-h-[340px] max-h-[500px] overflow-y-auto p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          const isPlaying = playingMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1.5`}
            >
              <div className="flex items-center gap-2 px-1 text-[11px] font-bold text-slate-400">
                <span>{isAi ? scenario.aiRoleEn : 'Ви'}</span>
              </div>

              <div
                className={`group relative max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl text-sm leading-relaxed transition ${
                  isAi
                    ? 'bg-slate-100 dark:bg-slate-700/60 text-slate-900 dark:text-white rounded-tl-sm'
                    : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/10'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Speaker button on AI messages */}
                {isAi && (
                  <button
                    onClick={() => handlePlayMessageAudio(msg.text, msg.id)}
                    className={`absolute -right-9 top-3 p-1.5 rounded-xl border transition ${
                      isPlaying
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md animate-pulse'
                        : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                    }`}
                    title={isPlaying ? 'Зупинити аудіо' : 'Озвучити природним голосом людини'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Feedback Pill on user messages */}
              {!isAi && msg.feedback && (
                <button
                  onClick={() => setSelectedMessageFeedback(msg)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>
                    Оцінка: {msg.feedback.estimatedLevel} • Fluency {msg.feedback.fluencyScore}%
                  </span>
                  {msg.feedback.corrections.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </button>
              )}
            </div>
          );
        })}

        {isLoadingAi && (
          <div className="flex items-center gap-2.5 text-xs text-indigo-600 dark:text-indigo-400 p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI уважно аналізує вашу мову та формує природну відповідь...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Selected Message AI Linguistic Feedback Drawer / Card */}
      {selectedMessageFeedback?.feedback && (
        <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-850 border border-indigo-200/80 dark:border-indigo-900/60 space-y-4 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-slate-700/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-600 text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Детальний мовний аналіз вашої репліки
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  "{selectedMessageFeedback.text}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-indigo-600 text-white shadow-sm">
                CEFR: {selectedMessageFeedback.feedback.estimatedLevel}
              </span>
              <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                {selectedMessageFeedback.feedback.fluencyScore}% Fluency
              </span>
            </div>
          </div>

          {/* Grammar Corrections */}
          {selectedMessageFeedback.feedback.corrections.length > 0 ? (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Граматичні виправлення:</span>
              </span>
              <div className="space-y-2">
                {selectedMessageFeedback.feedback.corrections.map((corr, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-rose-200/60 dark:border-rose-900/40 text-xs space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="line-through text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                        {corr.original}
                      </span>
                      <span>→</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        {corr.corrected}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed pt-1">
                      {corr.explanationUk}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Граматичних помилок не виявлено! Конструкція сформульована бездоганно.</span>
            </div>
          )}

          {/* Pronunciation & Phonetics Tip */}
          {selectedMessageFeedback.feedback.pronunciationTipUk && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-xs space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Порада щодо вимови та звуків:</span>
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {selectedMessageFeedback.feedback.pronunciationTipUk}
              </p>
            </div>
          )}

          {/* Vocabulary Upgrades */}
          {selectedMessageFeedback.feedback.vocabularyUpgrades.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Як сказати природніше (Native speaker style):</span>
              </span>
              <div className="space-y-2">
                {selectedMessageFeedback.feedback.vocabularyUpgrades.map((upg, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">{upg.original}</span>
                      <span>→</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{upg.betterOption}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                      {upg.reasonUk}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI positive comment */}
          {selectedMessageFeedback.feedback.positiveCommentUk && (
            <p className="text-xs text-indigo-900 dark:text-indigo-200 font-medium bg-white/70 dark:bg-slate-800/70 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
              💬 {selectedMessageFeedback.feedback.positiveCommentUk}
            </p>
          )}
        </div>
      )}

      {/* Voice Input & Transcript Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-3">
        {/* Animated Sound Wave when recording */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 py-1 text-indigo-600 dark:text-indigo-400">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-10 bg-indigo-600 rounded-full animate-bounce" />
            <span className="w-1.5 h-8 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="ml-3 text-xs font-bold text-slate-700 dark:text-slate-300">
              Слухаю... Говоріть англійською
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Big Microphone Toggle Button */}
          <button
            onClick={toggleRecording}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg transition-all ${
              isRecording
                ? 'bg-rose-600 ring-4 ring-rose-200 dark:ring-rose-950 scale-105'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
            }`}
            title={isRecording ? 'Зупинити запис' : 'Почати говорити англійською'}
          >
            {isRecording ? <MicOff className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Editable speech text input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isRecording ? 'Розпізнаємо вашу мову...' : 'Говоріть у мікрофон або пишіть сюди...'}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!transcript.trim() || isLoadingAi}
            className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20 transition"
            title="Надіслати відповідь"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-1">
          <span>🎯 Ви можете відредагувати текст перед відправкою для максимальної точності</span>
          <span>🎙️ Web Speech API + Gemini AI Voice</span>
        </div>
      </div>
    </div>
  );
};
