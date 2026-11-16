'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Mic, Compass, Zap, BookMarked } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { href: '/', label: 'Конспекти', icon: BookOpen },
    { href: '/vocabulary', label: 'Словник', icon: BookMarked },
    { href: '/speaking', label: 'Speaking', icon: Mic },
    { href: '/practice', label: 'Тести', icon: Zap },
    { href: '/placement', label: 'Рівень', icon: Compass },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#090A0D]/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 py-2 px-3 flex items-center justify-around safe-area-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              isActive
                ? 'text-zinc-900 dark:text-white font-semibold'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
            <span className="text-[11px] tracking-tight">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
