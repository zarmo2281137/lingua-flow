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
  BookMarked,
  CheckCircle2,
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
    { href: '/', label: 'Конспекти', icon: BookOpen },
    { href: '/vocabulary', label: 'Словник', icon: BookMarked },
    { href: '/practice', label: 'Практика', icon: Zap },
    { href: '/speaking', label: 'Speaking AI', icon: Mic, badge: 'Voice' },
    { href: '/placement', label: 'Тест рівня', icon: Compass },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#090A0D]/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 transition-transform group-hover:scale-[1.02]">
              <span className="font-mono font-bold text-base tracking-tighter">LF</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                LinguaFlow
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              </span>
              <span className="hidden sm:block text-[11px] text-zinc-500 dark:text-zinc-400 font-medium tracking-normal -mt-0.5">
                English Study Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/70 dark:bg-zinc-900/70 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold tracking-wide bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Stats & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            {stats && (
              <div className="flex items-center gap-2 bg-zinc-100/70 dark:bg-zinc-900/70 px-2.5 py-1.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 text-xs">
                {/* Level Tag */}
                <span className="px-1.5 py-0.5 rounded-md font-bold text-[10px] tracking-wide bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  {stats.currentLevel || 'A1'}
                </span>

                {/* Streak */}
                <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-semibold" title="Днів навчання поспіль">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>{stats.streakDays}</span>
                </div>

                <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />

                {/* XP */}
                <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-semibold" title="Бали досвіду">
                  <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
                  <span>{stats.xp} <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-normal">XP</span></span>
                </div>
              </div>
            )}

            {/* Settings button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100/70 dark:bg-zinc-900/70 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70 border border-zinc-200/70 dark:border-zinc-800/70 transition"
              title="Налаштування голосу та прогресу"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 md:hidden bg-zinc-100/70 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800/70"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#090A0D]/95 backdrop-blur-md px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Settings Modal */}
      <ApiKeyModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
