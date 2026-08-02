'use client';

import React from 'react';
import { Sparkles, CheckCircle2, Play, CloudRain } from 'lucide-react';
import DashboardHeader from '@/components/navigation/DashboardHeader';
import { useKernelStore } from '@/stores/useKernelStore';

export default function AIHome() {
  const { setScreenState } = useKernelStore();

  return (
    <div className="fixed inset-0 bg-[#111B38] text-white z-50 flex flex-col justify-between overflow-y-auto">
      <DashboardHeader />

      <div className="max-w-4xl mx-auto w-full my-auto p-6 md:p-12 py-8">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4" /> BULAENG Teacher OS v3.0 • Ready
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
          Selamat pagi, <br />
          <span className="text-[#D4AF37]">Pak Bustanil 😊</span>
        </h1>

        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
          Semoga minggu ini menyenangkan. Hari ini ada <strong className="text-white">26 murid</strong> dengan tema <strong className="text-[#D4AF37]">Tanaman</strong>. 
          <span className="inline-flex items-center gap-1 text-sky-300 ml-2"><CloudRain className="w-4 h-4 inline" /> Cuaca hujan</span> — aktivitas outdoor telah saya sesuaikan ke dalam kelas.
        </p>

        <div className="bg-[#1a264a] border border-slate-700/60 rounded-[20px] p-6 md:p-8 mb-8 space-y-3 shadow-2xl">
          <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Seluruh Perangkat Siap:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Lagu Pembuka: Pohon Tiup Angin</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Cerita Pemantik: Biji Kecil</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Worksheet Siap Cetak</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Instrumen Observasi Motorik</div>
          </div>
        </div>

        <button
          onClick={() => setScreenState('teaching-mode')}
          className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-[#111B38] font-black text-2xl md:text-3xl py-7 rounded-[14px] shadow-2xl shadow-[#D4AF37]/20 transition transform hover:scale-[1.01] flex items-center justify-center gap-4 mb-4 cursor-pointer"
        >
          <Play className="w-8 h-8 fill-[#111B38]" /> MULAI MENGAJAR
        </button>

        <div className="text-center">
          <button 
            onClick={() => setScreenState('mission-control')}
            className="text-slate-400 hover:text-white text-sm font-semibold underline underline-offset-4 transition cursor-pointer"
          >
            Lanjutkan ke Mission Control Workspace ➔
          </button>
        </div>
      </div>
    </div>
  );
}