'use client';

import React, { useEffect } from 'react';
import { useKernelStore } from '@/stores/kernel/useKernelStore';
import { APP_CONFIG } from '@/config/constants';
import MissionControl from '@/components/teacher/screens/MissionControl';
import AIHome from '@/components/teacher/screens/AIHome';
import TeachingPlayer from '@/components/teacher/screens/TeachingPlayer';
import OnboardingModal from '@/stores/ui/OnboardingModal';

export default function Home(): React.ReactNode {
  // Selektor terpisah agar re-render lebih efisien
  const isBooted = useKernelStore((state) => state.isBooted);
  const activeScreen = useKernelStore((state) => state.activeScreen);

  useEffect(() => {
    // Command Palette Hotkey Listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === APP_CONFIG.COMMAND_PALETTE_HOTKEY) {
        e.preventDefault();
        alert(`🔍 ${APP_CONFIG.NAME}: Cari murid, modul, atau dokumen...`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Visual Loading saat Kernel sedang dalam proses boot
  if (!isBooted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
          <p className="font-mono text-sm text-slate-400">Booting BULAENG Kernel OS...</p>
        </div>
      </div>
    );
  }

  // Screen Switcher
  const renderScreen = () => {
    switch (activeScreen) {
      case 'ai-home':
        return <AIHome />;
      case 'teaching-player':
        return <TeachingPlayer />;
      case 'mission-control':
      default:
        return <MissionControl />;
    }
  };

  return (
    <>
      {/* Onboarding Modal (Otomatis muncul jika kelas belum disetup) */}
      <OnboardingModal />

      {/* Tampilan Screen Aktif */}
      {renderScreen()}
    </>
  );
}