'use client';

import React, { useEffect } from 'react';
import { useKernelStore } from '@/stores/useKernelStore';
import MissionControl from '@/components/screens/MissionControl';
import AIHome from '@/components/screens/AIHome';
import TeachingPlayer from '@/components/screens/TeachingPlayer';

export default function TeacherOS(): React.ReactNode {
  const { screenState } = useKernelStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        alert('🔍 BULAENG Command Palette: Cari murid, modul, atau dokumen...');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  switch (screenState) {
    case 'ai-home':
      return <AIHome />;
    case 'teaching-mode':
      return <TeachingPlayer />;
    case 'mission-control':
    default:
      return <MissionControl />;
  }
}