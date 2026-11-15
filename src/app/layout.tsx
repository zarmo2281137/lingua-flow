import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { PlacementModal } from '@/components/layout/PlacementModal';

export const metadata: Metadata = {
  title: 'LinguaFlow — Платформа вивчення англійської з Speaking AI',
  description:
    'Інтерактивна платформа для вивчення англійської мови для рівнів A1–C1 зі зрозумілими конспектами, тестами та голосовим AI-тренажером для живої розмовної практики.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className="h-full">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-12">
          {children}
        </main>
        <MobileNav />
        <PlacementModal />
      </body>
    </html>
  );
}
