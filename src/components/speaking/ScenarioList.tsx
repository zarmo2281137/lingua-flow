'use client';

import React, { useState } from 'react';
import { ROLEPLAY_SCENARIOS } from '@/data/scenarios';
import { RoleplayScenario } from '@/types/speaking';
import { CustomTopicModal } from './CustomTopicModal';
import {
  Coffee,
  Plane,
  Briefcase,
  Building2,
  MessageSquareQuote,
  Cpu,
  Sparkles,
  ArrowRight,
  Mic,
  ShoppingBag,
  Utensils,
  Dumbbell,
  UtensilsCrossed,
  Car,
  Stethoscope,
  BadgeDollarSign,
  Terminal,
  GraduationCap,
  PlusCircle,
} from 'lucide-react';

interface ScenarioListProps {
  onSelectScenario: (scenario: RoleplayScenario) => void;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({ onSelectScenario }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Всі сценарії' },
    { id: 'daily', label: 'Повсякденні' },
    { id: 'travel', label: 'Подорожі' },
    { id: 'career', label: 'Карʼєра & IT' },
    { id: 'general', label: 'Вільна розмова' },
  ];

  const filteredScenarios =
    selectedCategory === 'all'
      ? ROLEPLAY_SCENARIOS
      : ROLEPLAY_SCENARIOS.filter((s) => s.category === selectedCategory);

  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return Coffee;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Utensils':
        return Utensils;
      case 'Dumbbell':
        return Dumbbell;
      case 'UtensilsCrossed':
        return UtensilsCrossed;
      case 'Plane':
        return Plane;
      case 'Building2':
        return Building2;
      case 'Car':
        return Car;
      case 'Stethoscope':
        return Stethoscope;
      case 'Briefcase':
        return Briefcase;
      case 'BadgeDollarSign':
        return BadgeDollarSign;
      case 'Terminal':
        return Terminal;
      case 'GraduationCap':
        return GraduationCap;
      case 'Cpu':
        return Cpu;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Pills & Custom Topic Button */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="shrink-0 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-600/20 flex items-center gap-2 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Своя тема</span>
        </button>
      </div>

      {/* Scenarios Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Special Card for Creating Custom Topic */}
        <div
          onClick={() => setIsCustomModalOpen(true)}
          className="bg-gradient-to-br from-indigo-50/90 via-purple-50/60 to-white dark:from-slate-800 dark:via-indigo-950/20 dark:to-slate-800 rounded-3xl p-5 sm:p-6 border-2 border-dashed border-indigo-300 dark:border-indigo-700/60 shadow-sm hover:shadow-lg hover:border-indigo-500 transition flex flex-col justify-between cursor-pointer group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              ✨ Будь-яка ваша тема
            </h3>
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
              Нескінченні можливості AI
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5">
              Вкажіть будь-яку тему чи ситуацію (подорож, співбесіда, хобі, гра), і AI миттєво згенерує інтерактивну рольову гру з оцінюванням.
            </p>
          </div>

          <button className="mt-5 w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-700 border border-indigo-200 dark:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
            <span>Створити тему зараз</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Built-in Scenarios */}
        {filteredScenarios.map((sc) => {
          const Icon = getScenarioIcon(sc.icon);

          return (
            <div
              key={sc.id}
              className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {sc.level}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {sc.titleEn}
                </h3>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {sc.titleUk}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 line-clamp-2">
                  {sc.descriptionUk}
                </p>

                {/* Roles pill */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[150px]">AI: {sc.aiRoleEn}</span>
                  <span>{sc.suggestedPhrases.length} підказки</span>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={() => onSelectScenario(sc)}
                className="mt-5 w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 group-hover:gap-3 transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>Почати бесіду</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      <CustomTopicModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onStartCustomScenario={onSelectScenario}
      />
    </div>
  );
};
