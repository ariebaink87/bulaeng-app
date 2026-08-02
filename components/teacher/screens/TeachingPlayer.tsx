'use client';

import React from 'react';
import { X, ChevronLeft, ChevronRight, Users, BookOpen } from 'lucide-react';
import DashboardHeader from '@/components/navigation/DashboardHeader';
import { useKernelStore } from '@/stores/kernel/useKernelStore';
import { useTeachingStore } from '@/stores/teacher/useTeachingStore';
import { useClassStore } from '@/stores/teacher/useClassStore';

export default function TeachingPlayer() {
  const { setScreen } = useKernelStore();
  const { stepIndex, flowSteps, nextStep, prevStep } = useTeachingStore();
  
  // 1. Konsumsi data dari useClassStore
  const { className, activeTheme, students } = useClassStore();

  // 2. Filter murid yang statusnya hadir
  const presentStudents = students.filter((s) => s.isPresent);

  const activeStep = flowSteps ? flowSteps[stepIndex] : null;

  return (
    <div className="fixed inset-0 bg-[#111B38] text-white z-50 flex flex-col justify-between">
      <DashboardHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 flex flex-col justify-center items-center text-center space-y-6">
        
        {/* CONTEXT BAR: Informasi Tema, Kelas & Murid Hadir */}
        <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                {className || 'Kelas'}
              </p>
              <h3 className="text-sm font-bold text-slate-200">
                {activeTheme || 'Belum Ada Tema'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300">
              {presentStudents.length} / {students.length} Hadir
            </span>
          </div>
        </div>

        {/* STEP CONTENT */}
        {activeStep ? (
          <div className="space-y-6 max-w-2xl">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
              Langkah {stepIndex + 1} dari {flowSteps.length}
            </span>
            <h2 className="text-3xl font-bold leading-tight">{activeStep.title}</h2>
            <p className="text-slate-300 text-lg">{activeStep.description}</p>

            {/* CHIP MURID HADIR: Menampilkan siswa yang aktif dalam pembelajaran */}
            {presentStudents.length > 0 && (
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs text-slate-400 mb-2 font-medium">
                  Siswa Aktif:
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {presentStudents.map((student) => (
                    <span
                      key={student.id}
                      className="bg-slate-800 border border-slate-700 text-slate-300 text-xs px-2.5 py-0.5 rounded-full"
                    >
                      {student.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400">Tidak ada sesi mengajar aktif.</p>
        )}
      </main>

      {/* FOOTER CONTROLS */}
      <footer className="p-6 border-t border-slate-800 bg-[#0d1427]/80 backdrop-blur flex justify-between items-center max-w-4xl mx-auto w-full">
        <button
          onClick={() => setScreen('mission-control')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" /> Keluar Mode Mengajar
        </button>

        <div className="flex gap-3">
          <button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="p-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextStep}
            disabled={!flowSteps || stepIndex === flowSteps.length - 1}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl transition cursor-pointer disabled:opacity-40"
          >
            Lanjut <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}