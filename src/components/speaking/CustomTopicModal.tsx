'use client';

import React, { useState } from 'react';
import { RoleplayScenario } from '@/types/speaking';
import { Sparkles, X, ArrowRight, MessageSquarePlus } from 'lucide-react';

interface CustomTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomScenario: (scenario: RoleplayScenario) => void;
}

export const CustomTopicModal: React.FC<CustomTopicModalProps> = ({
  isOpen,
  onClose,
  onStartCustomScenario,
}) => {
  const [topicName, setTopicName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [aiRole, setAiRole] = useState('');
  const [level, setLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'ALL'>('B1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) return;

    const customScenario: RoleplayScenario = {
      id: `custom-${Date.now()}`,
      titleEn: topicName.trim(),
      titleUk: `Власна тема: ${topicName.trim()}`,
      category: 'general',
      level,
      icon: 'Sparkles',
      descriptionUk: `Індивідуальна розмовна сесія на тему: "${topicName.trim()}". AI адаптується під вашу ситуацію.`,
      aiRoleEn: aiRole.trim() || 'Knowledgeable Conversational Partner',
      userRoleEn: userRole.trim() || 'English Speaker exploring this topic',
      initialAiMessageEn: `Hello! I am delighted to discuss "${topicName.trim()}" with you today. To kick things off, what sparked your interest in this topic, or where would you like us to start?`,
      suggestedPhrases: [
        { en: `I've always found this particular subject genuinely fascinating.`, uk: 'Мене завжди щиро захоплювала ця конкретна тема.' },
        { en: `From my perspective, there are several key angles to consider.`, uk: 'З моєї точки зору, тут є кілька важливих аспектів.' },
        { en: `Could you share your insights on this matter?`, uk: 'Чи могли б ви поділитися своїми думками з цього приводу?' },
      ],
      systemPrompt: `You are in a custom role-play scenario discussing "${topicName}". Your role: "${aiRole || 'Expert Conversational Partner'}". The user role: "${userRole || 'Enthusiastic Learner'}". Target level: ${level}. Keep dialogue engaging, lively, and provide detailed linguistic feedback.`,
    };

    onStartCustomScenario(customScenario);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
            <MessageSquarePlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Створити власну тему для розмови
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Вкажіть будь-яку тему, і AI миттєво підлаштує рольову гру
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Тема бесіди (англійською або українською) *
            </label>
            <input
              type="text"
              required
              placeholder="Наприклад: Підготовка до співбесіди на QA, Купівля авто, Обговорення серіалу..."
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Ваша роль (опціонально)
              </label>
              <input
                type="text"
                placeholder="Кандидат / Покупець / Друг"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Роль AI-співрозмовника
              </label>
              <input
                type="text"
                placeholder="Рекрутер / Продавець / Експерт"
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Бажаний рівень складності
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    level === lvl
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!topicName.trim()}
              className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Почати бесіду за власною темою</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
