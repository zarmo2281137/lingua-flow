'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  Zap,
  Settings,
  BookOpen,
  Mic,
  Compass,
  Menu,
  X,
  Volume2,
  BookMarked,
} from 'lucide-react';
import { getUserStats, syncWithCloud } from '@/utils/storage';
import { isSupabaseConfigured } from '@/utils/supabase';
import { ApiKeyModal } from '../speaking/ApiKeyModal';
import { UserStats } from '@/types/user';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setStats(getUserStats());

    // Auto-sync with cloud on mount if Supabase configured
    if (isSupabaseConfigured()) {
      syncWithCloud().then((res) => {
        if (res.ok && res.stats) {
          setStats(res.stats);
        }
      });
    }

    // Listen for storage and custom event updates
    const onStorage = () => setStats(getUserStats());
    window.addEventListener('storage', onStorage);
    window.addEventListener('lingua_flow_stats_updated', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('lingua_flow_stats_updated', onStorage);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Уроки & Конспекти', icon: BookOpen },
    { href: '/vocabulary', label: 'Словник', icon: BookMarked },
    { href: '/practice', label: 'Тренажер тестів', icon: Zap },
    { href: '/speaking', label: 'Speaking AI', icon: Mic, highlight: true },
    { href: '/placement', label: 'Тест рівня', icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Lingua<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium">
                English Learning & Speaking AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  } ${link.highlight && !isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${link.highlight ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-indigo-600 text-white rounded-md">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Stats & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gamification Streak & XP */}
            {stats && (
              <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-xs font-bold">
                <div className="flex items-center gap-1 text-amber-500" title="Днів поспіль на платформі">
                  <Flame className="w-4 h-4 fill-amber-500 animate-pulse" />
                  <span>{stats.streakDays}</span>
                </div>
                <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400" title="Очки досвіду (XP)">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{stats.xp} XP</span>
                </div>
              </div>
            )}

            {/* Current Level Pill */}
            {stats && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-extrabold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200">
                {stats.currentLevel}
              </span>
            )}

            {/* Settings button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Налаштування озвучки та голосу"
              aria-label="Налаштування"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-4 space-y-1.5 shadow-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.highlight && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-indigo-600 text-white rounded-md">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Settings Modal */}
      <ApiKeyModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
