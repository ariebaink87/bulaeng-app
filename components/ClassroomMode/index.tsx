'use client';

import React from 'react';
import { useSessionStore } from '@/stores/useSessionStore';
import TopBar from './TopBar';
import Stage from './Stage';
import CueCard from './CueCard';
import BottomControls from './BottomControls';

export default function ClassroomMode() {
  // ✅ Menggunakan 'episode' sesuai definisi SessionState
  const { episode, currentSceneIndex } = useSessionStore();

  // ✅ Guard jika belum ada episode aktif
  if (!episode) return null;

  // ✅ Safe indexing untuk mencegah error jika scenes belum siap
  const currentScene = episode.scenes?.[currentSceneIndex];

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Header / TopBar */}
      <TopBar />

      {/* 2. Utama: Stage Panggung Kelas & CueCard Guru */}
      <main className="flex-1 p-6 flex space-x-6 min-h-0">
        {/* Panggung Visual Kelas */}
        <Stage currentScene={currentScene} />

        {/* Kartu Panduan/Cue untuk Guru */}
        <CueCard currentScene={currentScene} />
      </main>

      {/* 3. Footer / Bottom Controls */}
      <BottomControls />
    </div>
  );
}