'use client';

import React, { useEffect, useState } from 'react';
import { useKernelStore } from '@/stores/kernel/useKernelStore';
import { useSessionStore } from '@/stores/useSessionStore';
import { APP_CONFIG } from '@/config/constants';
import ClassroomMode from '@/components/ClassroomMode';
import ClassSettingsModal from '@/components/ClassroomMode/ClassSettingsModal';
import OnboardingModal from '@/stores/ui/OnboardingModal';
import { Episode, Scene } from '@/types/content';
import { DailyLessonPackage } from '@/services/aiEngine';

// Import data episode default JSON
import rawEpisodeData from '@/content/universe/dunia-alam/jelajah-alam/episode-001-petualangan-daun/episode.json';

export default function Home(): React.ReactNode {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [dailyAiPackage, setDailyAiPackage] = useState<DailyLessonPackage | null>(null);

  const isBooted = useKernelStore((state) => state.isBooted);
  const { isLiveSession, startSession } = useSessionStore();
  
  const currentEpisode = rawEpisodeData as unknown as Episode;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === APP_CONFIG.COMMAND_PALETTE_HOTKEY) {
        e.preventDefault();
        alert(`🔍 ${APP_CONFIG.NAME}: Cari murid, modul, atau dokumen...`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGoHome = () => {
    // Navigasi langsung keluar dari Vercel menuju Landing Page Cloudflare Workers
    window.location.href = 'https://bulaeng-landing.bulaeng.workers.dev/';
  };

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

  if (isLiveSession) {
    return <ClassroomMode />;
  }

  return (
    <>
      <OnboardingModal />

      <ClassSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveAndActivateAI={(pkg) => setDailyAiPackage(pkg)}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-6 font-sans">
        
        {/* HEADER TOPBAR */}
        <header className="w-full max-w-3xl mx-auto flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <span>←</span> Beranda BULAENG
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              ⚙️ Setup Kelas
            </button>
            <button
              onClick={() => startSession(currentEpisode)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-lg shadow-amber-400/10"
            >
              ▶ Mulai Mengajar
            </button>
          </div>
        </header>

        {/* UTAMA: DASHBOARD RACIKAN OTOMATIS AI */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full space-y-6">
          
          {dailyAiPackage ? (
            /* DASBHOARD SETELAH AI AKTIF */
            <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in duration-300">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    🤖 AI Racikan Hari Ini • {dailyAiPackage.date}
                  </span>
                  <h1 className="text-xl font-bold text-white pt-2">
                    {dailyAiPackage.targetObjective.objective}
                  </h1>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-xl">
                  {dailyAiPackage.targetObjective.group}
                </span>
              </div>

              {/* VIDEO 3D OTOMATIS DARI AI */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center">
                <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  {dailyAiPackage.featured3DVideo.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      🎬 Video Animasi 3D Hari Ini
                    </span>
                    <span className="text-[10px] text-slate-400">⏱️ {dailyAiPackage.featured3DVideo.duration}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">{dailyAiPackage.featured3DVideo.title}</h3>
                  <p className="text-xs text-slate-400 truncate">{dailyAiPackage.featured3DVideo.description}</p>
                </div>
              </div>

              {/* ANALISIS SEGMENTASI MURID OTOMATIS DARI AI */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-amber-400">🟡 Perlu Pendampingan Khusus</p>
                  <div className="space-y-1">
                    {dailyAiPackage.studentSegmentation.needSupport.map((std) => (
                      <div key={std.id} className="text-xs bg-slate-900 p-2 rounded-xl text-slate-300">
                        • {std.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-emerald-500/20 rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-emerald-400">🟢 Pengayaan (Siap Mandiri)</p>
                  <div className="space-y-1">
                    {dailyAiPackage.studentSegmentation.advanced.map((std) => (
                      <div key={std.id} className="text-xs bg-slate-900 p-2 rounded-xl text-slate-300">
                        • {std.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PEMANTIK DISKUSI GURU DARI AI */}
              <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-slate-300">💬 Panduan Pemantik Diskusi Guru:</p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  {dailyAiPackage.teacherPrompts.map((prompt, i) => (
                    <li key={i}>{prompt}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => startSession(currentEpisode)}
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-base font-extrabold rounded-2xl shadow-xl shadow-amber-400/10 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>🟨</span>
                <span>MULAI KELAS DENGAN BAHAN AI HARI INI</span>
              </button>

            </div>
          ) : (
            /* TAMPILAN AWAL SEBELUM AI AKTIF */
            <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                🤖
              </div>
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-white">Selamat Datang di BULAENG Kernel OS</h1>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Setup kelas kamu 1x saja, AI akan meracik seluruh media video 3D, memetakan murid, dan menyiapkan bahan ajar otomatis setiap hari.
                </p>
              </div>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold rounded-2xl shadow-xl transition-all cursor-pointer"
              >
                ⚙️ Buka Setup Kelas & Aktifkan AI
              </button>
            </div>
          )}

        </main>

      </div>
    </>
  );
}