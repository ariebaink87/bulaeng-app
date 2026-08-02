'use client';

import React from 'react';
import { Sparkles, Play, ShieldAlert, Cpu, Bot, Flame, BookOpen, Layers } from 'lucide-react';
import DashboardHeader from '@/components/navigation/DashboardHeader';
import { useKernelStore } from '@/stores/useKernelStore';

export default function MissionControl() {
  const { setScreenState } = useKernelStore();

  return (
    <div className="min-h-screen bg-[#0d1427] text-slate-100 flex flex-col font-sans antialiased">
      <DashboardHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* HERO BANNER */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#111B38] via-[#1a264a] to-[#111B38] p-6 sm:p-8 border border-amber-500/20 shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Mission Control Workspace
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pusat Kendali Pengajaran
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                Kelola 50+ engine modular, otomatisasi dokumen Kurikulum Merdeka, dan analisis performa murid secara realtime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setScreenState('ai-home')}
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3 rounded-xl border border-slate-700 transition cursor-pointer"
              >
                <Bot className="w-5 h-5 text-amber-400" /> AI-Assistant Home
              </button>
              <button
                onClick={() => setScreenState('teaching-mode')}
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:scale-105 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-slate-950" /> Mulai Mengajar
              </button>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111B38]/60 border border-slate-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400">BULAENG Kernel Status</h4>
              <p className="text-2xl font-bold text-white mt-1">Active & Ready</p>
              <span className="text-xs text-emerald-400 font-medium">9 Services Loaded</span>
            </div>
          </div>

          <div className="bg-[#111B38]/60 border border-slate-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400">Teaching Engine</h4>
              <p className="text-2xl font-bold text-white mt-1">Tema: Tanaman</p>
              <span className="text-xs text-amber-400 font-medium">6 Flow Steps Configured</span>
            </div>
          </div>

          <div className="bg-[#111B38]/60 border border-slate-800 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400">Active Modules</h4>
              <p className="text-2xl font-bold text-white mt-1">12 Enabled</p>
              <span className="text-xs text-sky-400 font-medium">Offline Engine Standby</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}