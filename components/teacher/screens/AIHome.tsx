'use client';

import React from 'react';
import { Sparkles, CheckCircle2, Play, CloudRain, ArrowLeft } from 'lucide-react';
import DashboardHeader from '@/components/navigation/DashboardHeader';
import { useKernelStore } from '@/stores/kernel/useKernelStore';

export default function AIHome() {
  const { setScreen } = useKernelStore();

  return (
    <div className="fixed inset-0 bg-[#111B38] text-white z-50 flex flex-col justify-between">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto w-full my-auto p-6 md:p-12 py-8 space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> BULAENG Teacher OS v3.0 • Ready
        </div>

        <h1 className="text-4xl font-extrabold text-white">AI Assistant Center</h1>
        <p className="text-slate-300 text-base max-w-xl">
          Asisten cerdas berbasis domain untuk membantu menyusun RPP, Modul Ajar, hingga rubrik penilaian otomatis.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setScreen('mission-control')}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-3 rounded-xl border border-slate-700 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Mission Control
          </button>
        </div>
      </main>
    </div>
  );
}