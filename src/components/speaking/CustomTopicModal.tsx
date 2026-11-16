'use client';

import React, { useState } from 'react';
import { RoleplayScenario } from '@/types/speaking';
import { X, ArrowRight, MessageSquarePlus } from 'lucide-react';

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
      icon: 'Mic',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#12141A] rounded-2xl p-6 sm:p-7 shadow-xl border border-zinc-200 dark:border-zinc-800 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
            <MessageSquarePlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Створити власну тему бесіди
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Вкажіть будь-яку тему, і AI згенерує персональний діалог
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Тема бесіди *
            </label>
            <input
              type="text"
              required
              placeholder="Наприклад: Співбесіда на React розробника, Оренда житла у Лондоні..."
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                Ваша роль (опційно)
              </label>
              <input
                type="text"
                placeholder="Кандидат / Покупець / Друг"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                Роль AI (опційно)
              </label>
              <input
                type="text"
                placeholder="Інтерв'юер / Рієлтор / Бармен"
                value={aiRole}
                onChange={(e) => setAiRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Бажаний рівень складності
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                    level === lvl
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-lg transition shadow-sm flex items-center gap-1.5"
            >
              <span>Почати розмову</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
