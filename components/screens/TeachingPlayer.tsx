'use client';

import React from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import DashboardHeader from '@/components/navigation/DashboardHeader';
import { useKernelStore } from '@/stores/useKernelStore';
import { useTeachingStore } from '@/stores/useTeachingStore';

export default function TeachingPlayer() {
  const { setScreenState } = useKernelStore();
  const { stepIndex, flowSteps, nextStep, prevStep } = useTeachingStore();

  const activeStep = flowSteps[stepIndex];

  return (
    <div className="fixed inset-0 bg-[#111B38] text-white z-50 flex flex-col justify-between">
      <DashboardHeader />

      <div className="p-6 md:p-12 flex flex-col justify-between h-full overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#D4AF37] text-[#111B38] font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              Step {stepIndex + 1} / {flowSteps.length}
            </span>
            <span className="text-slate-300 text-sm font-semibold">KELAS B2 — TEMA: TANAMAN</span>
          </div>
          <button 
            onClick={() => setScreenState('mission-control')}
            className="flex items-center gap-2 text-slate-400 hover:text-white bg-[#1a264a] px-4 py-2 rounded-[14px] text-sm transition cursor-pointer"
          >
            <X className="w-4 h-4" /> Keluar
          </button>
        </div>

        <div className="max-w-5xl mx-auto w-full text-center py-8 my-auto">
          <h1 className="text-4xl md:text-6xl font-black text-[#D4AF37] mb-4">{activeStep.title}</h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">{activeStep.subtitle}</p>

          <div className="bg-[#1a264a] border border-slate-700/60 rounded-[20px] p-8 md:p-12 shadow-2xl">
            {activeStep.id === 'PRESENSI' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {['Andi', 'Budi', 'Citra', 'Dina', 'Eko', 'Fadil 🎉', 'Gita', 'Hana'].map((name, i) => (
                  <button key={i} className="bg-[#111B38] hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 p-4 rounded-[14px] flex items-center justify-between transition cursor-pointer">
                    <span className="font-semibold text-slate-200">{name}</span>
                    <span className="w-3 h-3 rounded-full bg-[#2ECC71]"></span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-6 text-slate-400">
                <Sparkles className="w-10 h-10 text-[#D4AF37] mx-auto mb-3 animate-pulse" />
                <p className="text-slate-200">AI telah menyiapkan materi & instrumen otomatis untuk tahap ini.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          <button 
            disabled={stepIndex === 0}
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#1a264a] border border-slate-700 disabled:opacity-30 hover:bg-slate-800 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" /> Sebelumnya
          </button>

          {stepIndex < flowSteps.length - 1 ? (
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-4 rounded-[14px] bg-[#D4AF37] hover:bg-[#c29f2e] text-[#111B38] font-black text-lg transition transform hover:scale-105 cursor-pointer"
            >
              LANJUT (NEXT) <ChevronRight className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={() => setScreenState('mission-control')}
              className="flex items-center gap-2 px-8 py-4 rounded-[14px] bg-[#2ECC71] hover:bg-emerald-600 text-white font-black text-lg transition cursor-pointer"
            >
              SELESAI MENGAJAR <CheckCircle2 className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}