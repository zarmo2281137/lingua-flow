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
  Cpu,
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
  Plus,
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
    { id: 'career', label: 'Кар’єра & IT' },
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
        return Mic;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Pills & Custom Topic Button */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold shadow-sm'
                  : 'bg-white dark:bg-[#12141A] text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsCustomModalOpen(true)}
          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 flex items-center gap-1.5 transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Своя тема</span>
        </button>
      </div>

      {/* Scenarios Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card for Custom Topic */}
        <div
          onClick={() => setIsCustomModalOpen(true)}
          className="bg-white dark:bg-[#12141A] rounded-xl p-5 border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-300 transition flex flex-col justify-between cursor-pointer group"
        >
          <div>
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center mb-3">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Довільна тема
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Створіть свій власний діалог
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2.5">
              Опишіть будь-яку життєву або професійну ситуацію (співбесіда, подорож, оренда житла, хобі), і AI згенерує персональний діалог з ролями.
            </p>
          </div>

          <div className="mt-5 w-full py-2 px-3 rounded-lg font-semibold text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition flex items-center justify-center gap-1.5">
            <span>Створити сценарій</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Built-in Scenarios */}
        {filteredScenarios.map((sc) => {
          const Icon = getScenarioIcon(sc.icon);

          return (
            <div
              key={sc.id}
              className="bg-white dark:bg-[#12141A] rounded-xl p-5 border border-zinc-200/90 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    {sc.level}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {sc.titleEn}
                </h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {sc.titleUk}
                </p>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2.5 line-clamp-2">
                  {sc.descriptionUk}
                </p>

                {/* Roles pill */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                  <span className="truncate max-w-[150px]">Роль AI: {sc.aiRoleEn}</span>
                  <span>{sc.suggestedPhrases.length} підказок</span>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={() => onSelectScenario(sc)}
                className="mt-5 w-full py-2 px-3 rounded-lg font-semibold text-xs text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Почати розмову</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
