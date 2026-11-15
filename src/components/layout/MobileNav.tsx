'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Mic, Compass, Zap, BookMarked } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/', label: 'Уроки', icon: BookOpen },
    { href: '/vocabulary', label: 'Словник', icon: BookMarked },
    { href: '/speaking', label: 'Speaking', icon: Mic, special: true },
    { href: '/practice', label: 'Тести', icon: Zap },
    { href: '/placement', label: 'Рівень', icon: Compass },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 py-1.5 px-4 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        if (tab.special) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center group -mt-5"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 ring-4 ring-indigo-200 dark:ring-indigo-950'
                    : 'bg-indigo-600'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                {tab.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[11px]">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
