'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RoleplayScenario, ChatMessage, SpeakingEvaluation } from '@/types/speaking';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  BookOpen,
  Headphones,
  Sparkles,
  Award,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';
import {
  SpeechRecognizer,
  playHumanAudio,
  stopSpeech,
  isSpeechRecognitionSupported,
  HUMAN_VOICES,
} from '@/utils/speech';
import { getGeminiRoleplayResponse, evaluateSpeakingSession } from '@/utils/gemini';
import { getUserStats, updateUserStats, addXp } from '@/utils/storage';

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

  const [selectedVoice, setSelectedVoice] = useState<string>('Puck');
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null);

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<SpeakingEvaluation | null>(null);

  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const userMessagesCount = messages.filter((m) => m.sender === 'user').length;

  const handleEvaluate = async () => {
    if (isEvaluating || userMessagesCount === 0) return;
    setIsEvaluating(true);
    setErrorMessage(null);
    try {
      const stats = getUserStats();
      const result = await evaluateSpeakingSession(stats.geminiApiKey, scenario, messages);
      setEvaluation(result);
      if (result.xpEarned) {
        addXp(result.xpEarned);
      }
    } catch (e: any) {
      setErrorMessage('Не вдалося сформувати оцінку. Спробуйте ще раз.');
    } finally {
      setIsEvaluating(false);
    }
  };

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
    setPlayingMsgId('sample');
    playHumanAudio("Hello! I am your AI speaking partner.", {
      voice: voiceId,
      onStart: () => setPlayingMsgId('sample'),
      onEnd: () => setPlayingMsgId(null),
    });
  };

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
      {/* Top Bar with Voice Picker & Scenario Info */}
      <div className="bg-white dark:bg-[#12141A] rounded-2xl p-4 sm:p-5 border border-zinc-200/90 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            title="Назад до списку сценаріїв"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-zinc-900 dark:text-white text-base">
                {scenario.titleEn}
              </h2>
              <span className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                {scenario.level}
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              AI: <span className="font-medium text-zinc-700 dark:text-zinc-300">{scenario.aiRoleEn}</span> • Ви: <span className="font-medium text-zinc-700 dark:text-zinc-300">{scenario.userRoleEn}</span>
            </p>
          </div>
        </div>

        {/* Controls: Voice selector + Audio toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Studio Voice Selector */}
          <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs">
            <Headphones className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={selectedVoice}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className="bg-transparent text-zinc-700 dark:text-zinc-200 font-medium focus:outline-none cursor-pointer max-w-[150px] sm:max-w-[200px] truncate"
              title="Оберіть голос співрозмовника"
            >
              <optgroup label="Studio Neural Voices">
                {HUMAN_VOICES.filter((v) => v.isStudio).map((v) => (
                  <option key={v.id} value={v.id} className="dark:bg-[#12141A] text-zinc-900 dark:text-white">
                    {v.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Natural Accents">
                {HUMAN_VOICES.filter((v) => !v.isStudio).map((v) => (
                  <option key={v.id} value={v.id} className="dark:bg-[#12141A] text-zinc-900 dark:text-white">
                    {v.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              autoSpeak
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white'
                : 'bg-zinc-50 border-zinc-200 text-zinc-500 dark:bg-zinc-900 dark:border-zinc-800'
            }`}
            title="Автоматичне озвучування реплік AI"
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Озвучка</span>
          </button>

          <button
            onClick={() => setShowPhrases(!showPhrases)}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
            <span>Підказки</span>
            {showPhrases ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Evaluate Conversation Button */}
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || userMessagesCount === 0}
            className="p-2 px-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-40 shadow-sm"
            title={userMessagesCount === 0 ? 'Спочатку скажіть щось англійською' : 'Завершити та отримати повну оцінку розмови'}
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Оцінюємо...</span>
              </>
            ) : (
              <>
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Оцінити розмову</span>
                {userMessagesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/20 dark:bg-zinc-900/20 font-mono">
                    {userMessagesCount}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggested Phrases Drawer */}
      {showPhrases && (
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <span>Корисні фрази для цього діалогу (клікніть, щоб вимовити або прослухати):</span>
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {scenario.suggestedPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white dark:bg-[#12141A] border border-zinc-200/80 dark:border-zinc-800 flex items-start justify-between gap-2 shadow-sm"
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => handleSendMessage(phrase.en)}
                >
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
                    «{phrase.en}»
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {phrase.uk}
                  </p>
                </div>
                <button
                  onClick={() => handlePlayMessageAudio(phrase.en, `phrase-${idx}`)}
                  className={`p-1.5 rounded-md transition shrink-0 ${
                    playingMsgId === `phrase-${idx}`
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                      : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
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

      {/* Error alert if any */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="min-h-[340px] max-h-[500px] overflow-y-auto p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 space-y-4 shadow-sm">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          const isPlaying = playingMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1`}
            >
              <div className="flex items-center gap-2 px-1 text-[11px] font-medium text-zinc-400">
                <span>{isAi ? scenario.aiRoleEn : 'Ви'}</span>
              </div>

              <div className="relative group max-w-[85%] sm:max-w-[75%]">
                <div
                  className={`p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm leading-relaxed transition ${
                    isAi
                      ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white'
                      : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Speaker button on AI messages */}
                {isAi && (
                  <button
                    onClick={() => handlePlayMessageAudio(msg.text, msg.id)}
                    className={`absolute -right-8 top-2.5 p-1.5 rounded-lg border transition ${
                      isPlaying
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                    }`}
                    title="Прослухати репліку"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View Feedback Pill on user messages */}
              {!isAi && msg.feedback && (
                <button
                  onClick={() => setSelectedMessageFeedback(msg)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-750 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition"
                >
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">{msg.feedback.estimatedLevel}</span>
                  <span className="text-zinc-400">•</span>
                  <span>Fluency {msg.feedback.fluencyScore}%</span>
                  {msg.feedback.corrections.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              )}
            </div>
          );
        })}

        {isLoadingAi && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 p-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>AI формує природну відповідь...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Selected Message AI Linguistic Feedback Drawer */}
      {selectedMessageFeedback?.feedback && (
        <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3.5 shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Мовний аналіз вашої репліки
              </h4>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium italic">
                «{selectedMessageFeedback.text}»
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                CEFR: {selectedMessageFeedback.feedback.estimatedLevel}
              </span>
              <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                {selectedMessageFeedback.feedback.fluencyScore}% Fluency
              </span>
            </div>
          </div>

          {/* Grammar Corrections */}
          {selectedMessageFeedback.feedback.corrections.length > 0 ? (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Граматичні виправлення:</span>
              </span>
              <div className="space-y-2">
                {selectedMessageFeedback.feedback.corrections.map((corr, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white dark:bg-[#12141A] border border-zinc-200 dark:border-zinc-800 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="line-through text-rose-500 font-mono">
                        {corr.original}
                      </span>
                      <span className="text-zinc-400">→</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                        {corr.corrected}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                      {corr.explanationUk}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Граматичних помилок не виявлено! Відмінна конструкція речення.</span>
            </div>
          )}

          {/* Pronunciation & Phonetics Tip */}
          {selectedMessageFeedback.feedback.pronunciationTipUk && (
            <div className="p-3 rounded-lg bg-white dark:bg-[#12141A] border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-zinc-500" />
                <span>Порада щодо вимови:</span>
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                {selectedMessageFeedback.feedback.pronunciationTipUk}
              </p>
            </div>
          )}

          {/* Vocabulary Upgrades */}
          {selectedMessageFeedback.feedback.vocabularyUpgrades.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-zinc-500" />
                <span>Як сказати природніше (Native speaker style):</span>
              </span>
              <div className="space-y-1.5">
                {selectedMessageFeedback.feedback.vocabularyUpgrades.map((upg, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white dark:bg-[#12141A] border border-zinc-200 dark:border-zinc-800 text-xs space-y-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">{upg.original}</span>
                      <span className="text-zinc-400">→</span>
                      <span className="font-semibold text-zinc-900 dark:text-white">{upg.betterOption}</span>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                      {upg.reasonUk}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Voice Input & Transcript Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#12141A] border border-zinc-200/90 dark:border-zinc-800 shadow-sm space-y-3">
        {/* Animated Recording Indicator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-2 py-1 text-rose-600 dark:text-rose-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span>Слухаю... Говоріть англійською</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Microphone Toggle Button */}
          <button
            onClick={toggleRecording}
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 transition-all ${
              isRecording
                ? 'bg-rose-600 ring-2 ring-rose-200 dark:ring-rose-950 scale-105'
                : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900'
            }`}
            title={isRecording ? 'Зупинити запис' : 'Почати говорити англійською'}
          >
            {isRecording ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Speech text input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isRecording ? 'Розпізнаємо вашу мову...' : 'Говоріть у мікрофон або пишіть сюди...'}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/70 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white pr-9"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!transcript.trim() || isLoadingAi}
            className="w-11 h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 disabled:opacity-30 text-white flex items-center justify-center shrink-0 transition shadow-sm"
            title="Надіслати відповідь"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 font-mono">
          <span>Web Speech API • Real-time Feedback</span>
          <span>Enter для надсилання</span>
        </div>
      </div>

      {/* Speaking Evaluation Results Modal */}
      {evaluation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white dark:bg-[#12141A] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 space-y-6 animate-scaleIn">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    CEFR: {evaluation.estimatedLevel}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    {evaluation.messageCount} ваших реплік
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-1">
                  Оцінка розмовної сесії
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Сценарій: «{scenario.titleUk}» ({scenario.titleEn})
                </p>
              </div>

              {/* Overall Score Badge */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Загальний бал</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-mono">
                  {evaluation.overallScore}
                  <span className="text-xs font-normal text-zinc-400">/100</span>
                </span>
                <span className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  +{evaluation.xpEarned} XP
                </span>
              </div>
            </div>

            {/* Criteria Grid (4 Dimensions) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Критерії оцінювання (шкала 1–10)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Grammar */}
                <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      {evaluation.criteria.grammar.titleUk || 'Граматична точність'}
                    </span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {evaluation.criteria.grammar.score}/10
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all"
                      style={{ width: `${evaluation.criteria.grammar.score * 10}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {evaluation.criteria.grammar.commentUk}
                  </p>
                </div>

                {/* 2. Vocabulary */}
                <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      {evaluation.criteria.vocabulary.titleUk || 'Словниковий запас'}
                    </span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {evaluation.criteria.vocabulary.score}/10
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all"
                      style={{ width: `${evaluation.criteria.vocabulary.score * 10}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {evaluation.criteria.vocabulary.commentUk}
                  </p>
                </div>

                {/* 3. Fluency */}
                <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      {evaluation.criteria.fluency.titleUk || 'Плинність та темп'}
                    </span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {evaluation.criteria.fluency.score}/10
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all"
                      style={{ width: `${evaluation.criteria.fluency.score * 10}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {evaluation.criteria.fluency.commentUk}
                  </p>
                </div>

                {/* 4. Coherence */}
                <div className="p-3.5 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      {evaluation.criteria.coherence.titleUk || 'Звʼязність та доречність'}
                    </span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      {evaluation.criteria.coherence.score}/10
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all"
                      style={{ width: `${evaluation.criteria.coherence.score * 10}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {evaluation.criteria.coherence.commentUk}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Strengths */}
            {evaluation.keyStrengthsUk && evaluation.keyStrengthsUk.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Сильні сторони вашого мовлення</span>
                </span>
                <div className="space-y-1.5">
                  {evaluation.keyStrengthsUk.map((strength, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mistakes & Corrections */}
            {evaluation.mistakesSummary && evaluation.mistakesSummary.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Розбір неточностей ({evaluation.mistakesSummary.length})</span>
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {evaluation.mistakesSummary.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1"
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="line-through text-rose-500 font-mono">{m.original}</span>
                        <span className="text-zinc-400">→</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                          {m.corrected}
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">
                        {m.explanationUk}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vocabulary Upgrades */}
            {evaluation.vocabularyHighlights && evaluation.vocabularyHighlights.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Як прокачати фрази до рівня носія</span>
                </span>
                <div className="space-y-1.5">
                  {evaluation.vocabularyHighlights.map((v, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500">{v.used}</span>
                        <span className="text-zinc-400">→</span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {v.suggestedUpgrade}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {v.reasonUk}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Advice */}
            {evaluation.teacherAdviceUk && (
              <div className="p-4 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Порада викладача:
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {evaluation.teacherAdviceUk}
                </p>
              </div>
            )}

            {/* Actions: Resume or Finish */}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                onClick={() => setEvaluation(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-semibold transition"
              >
                Продовжити розмову
              </button>
              <button
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-xs sm:text-sm font-semibold transition shadow-sm"
              >
                Завершити діалог
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
