'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  X,
  AlertCircle,
  Clock,
  Heart,
  Smile,
  Zap,
  Target,
  CloudRain
} from 'lucide-react';

export default function TeacherOS(): React.ReactNode {
  // Screen States: 'ai-home' | 'mission-control' | 'teaching-mode'
  const [screenState, setScreenState] = useState<'ai-home' | 'mission-control' | 'teaching-mode'>('ai-home');
  const [activeTab, setActiveTab] = useState<'today' | 'teaching' | 'students' | 'ai'>('today');
  const [stepIndex, setStepIndex] = useState(0);

  // Teaching Slide Flow Steps
  const flowSteps = [
    { id: 'PRESENSI', title: '1. Presensi Kehadiran', subtitle: 'Konfirmasi cepat 26 murid hari ini' },
    { id: 'LAGU', title: '2. Lagu Pembuka', subtitle: '🎵 "Pohon Tiup Angin" (Disiapkan AI)' },
    { id: 'CERITA', title: '3. Cerita Pemantik', subtitle: '📖 "Biji Kecil Yang Hebat"' },
    { id: 'WORKSHEET', title: '4. Aktivitas & Worksheet', subtitle: '🎨 Mewarnai & Mengelompokkan Daun' },
    { id: 'OBSERVASI', title: '5. Quick Observasi', subtitle: '📸 Catat perkembangan Fadil & Aisyah' },
    { id: 'FINISH', title: '6. Sesi Mengajar Selesai', subtitle: '✨ AI merangkum semua aktivitas secara otomatis' },
  ];

  // Shortcut Ctrl + K
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

  // --- 1. ENTRY POINT: AI HOME SCREEN (ZERO-DASHBOARD ONBOARDING) ---
  if (screenState === 'ai-home') {
    return (
      <div className="fixed inset-0 bg-[#111B38] text-white z-50 flex flex-col justify-between p-6 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full my-auto py-8">
          
          {/* Badge & Mood */}
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

          {/* AI Readiness Card */}
          <div className="bg-[#1a264a] border border-slate-700/60 rounded-[20px] p-6 md:p-8 mb-8 space-y-3 shadow-2xl">
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Seluruh Perangkat Siap:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Lagu Pembuka: Pohon Tiup Angin</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Cerita Pemantik: Biji Kecil</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Worksheet Siap Cetak</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#2ECC71]" /> Instrumen Observasi Motorik</div>
            </div>
          </div>

          {/* GIANT ACTION BUTTON */}
          <button
            onClick={() => {
              setScreenState('teaching-mode');
              setStepIndex(0);
            }}
            className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-[#111B38] font-black text-2xl md:text-3xl py-7 rounded-[14px] shadow-2xl shadow-[#D4AF37]/20 transition transform hover:scale-[1.02] flex items-center justify-center gap-4 mb-4"
          >
            <Play className="w-8 h-8 fill-[#111B38]" /> MULAI MENGAJAR
          </button>

          <div className="text-center">
            <button 
              onClick={() => setScreenState('mission-control')}
              className="text-slate-400 hover:text-white text-sm font-semibold underline underline-offset-4 transition"
            >
              Lanjutkan ke Mission Control Workspace ➔
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- 2. ONE-CLICK TEACHING MODE (SLIDE PLAYER) ---
  if (screenState === 'teaching-mode') {
    const activeStep = flowSteps[stepIndex];

    return (
      <div className="fixed inset-0 bg-[#111B38] text-white z-50 flex flex-col justify-between p-6 md:p-12">
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <span className="bg-[#D4AF37] text-[#111B38] font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              Step {stepIndex + 1} / {flowSteps.length}
            </span>
            <span className="text-slate-300 text-sm font-semibold">KELAS B2 — TEMA: TANAMAN</span>
          </div>
          <button 
            onClick={() => setScreenState('mission-control')}
            className="flex items-center gap-2 text-slate-400 hover:text-white bg-[#1a264a] px-4 py-2 rounded-[14px] text-sm transition"
          >
            <X className="w-4 h-4" /> Keluar
          </button>
        </div>

        <div className="max-w-3xl mx-auto w-full text-center py-8 my-auto">
          <h1 className="text-4xl md:text-6xl font-black text-[#D4AF37] mb-4">{activeStep.title}</h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">{activeStep.subtitle}</p>

          <div className="bg-[#1a264a] border border-slate-700/60 rounded-[20px] p-8 md:p-12 shadow-2xl">
            {activeStep.id === 'PRESENSI' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
                {['Andi', 'Budi', 'Citra', 'Dina', 'Eko', 'Fadil 🎉', 'Gita', 'Hana'].map((name, i) => (
                  <button key={i} className="bg-[#111B38] hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 p-4 rounded-[14px] flex items-center justify-between transition">
                    <span className="font-semibold text-slate-200">{name}</span>
                    <span className="w-3 h-3 rounded-full bg-[#2ECC71]"></span>
                  </button>
                ))}
              </div>
            )}

            {activeStep.id !== 'PRESENSI' && (
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
            onClick={() => setStepIndex(prev => prev - 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-[14px] bg-[#1a264a] border border-slate-700 disabled:opacity-30 hover:bg-slate-800 transition"
          >
            <ChevronLeft className="w-5 h-5" /> Sebelumnya
          </button>

          {stepIndex < flowSteps.length - 1 ? (
            <button 
              onClick={() => setStepIndex(prev => prev + 1)}
              className="flex items-center gap-2 px-8 py-4 rounded-[14px] bg-[#D4AF37] hover:bg-[#c29f2e] text-[#111B38] font-black text-lg transition transform hover:scale-105"
            >
              LANJUT (NEXT) <ChevronRight className="w-6 h-6" />
            </button>
          ) : (
            <button 
              onClick={() => setScreenState('mission-control')}
              className="flex items-center gap-2 px-8 py-4 rounded-[14px] bg-[#2ECC71] hover:bg-emerald-600 text-white font-black text-lg transition"
            >
              SELESAI MENGAJAR <CheckCircle2 className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- 3. TEACHER MISSION CONTROL WORKSPACE ---
  return (
    <div className="min-h-screen bg-[#111B38] text-slate-100 font-sans p-4 md:p-10 max-w-4xl mx-auto">
      
      {/* TOP NAVIGATION */}
      <nav className="flex items-center justify-between bg-[#1a264a] border border-slate-700/60 rounded-[14px] p-2 mb-8">
        <div className="flex gap-1">
          {[
            { id: 'today', label: 'Hari Ini' },
            { id: 'teaching', label: 'Mengajar' },
            { id: 'students', label: 'Murid' },
            { id: 'ai', label: 'AI Assistant' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-[10px] font-bold text-sm transition ${
                activeTab === tab.id 
                  ? 'bg-[#D4AF37] text-[#111B38] shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-[#111B38]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-[#111B38] px-3 py-2 rounded-[10px] border border-slate-700">
          <Search className="w-3.5 h-3.5" />
          <span><kbd className="font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Ctrl + K</kbd></span>
        </div>
      </nav>

      {/* HEADER BRIEFING */}
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
          Mission Control — <span className="text-[#D4AF37]">Pak Bustanil</span>
        </h1>
        <p className="text-slate-400 text-sm">26 Murid Terdaftar • Tema: Tanaman • Cuaca: ☔ Hujan Indoor</p>
      </header>

      {/* GIANT ACTION BUTTON */}
      <section className="mb-8">
        <button
          onClick={() => {
            setScreenState('teaching-mode');
            setStepIndex(0);
          }}
          className="w-full bg-[#D4AF37] hover:bg-[#c29f2e] text-[#111B38] font-black text-2xl md:text-3xl py-7 rounded-[14px] shadow-2xl shadow-[#D4AF37]/10 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-4"
        >
          <Play className="w-8 h-8 fill-[#111B38]" /> MULAI MENGAJAR
        </button>
      </section>

      {/* NEW MODUL: CLASSROOM HEALTH */}
      <section className="bg-[#1a264a] border border-slate-700/60 rounded-[20px] p-6 md:p-8 mb-8">
        <div className="flex items-center justify-between mb-6 border-b border-slate-700/80 pb-4">
          <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-400" /> Classroom Health
          </div>
          <span className="text-xs bg-[#2ECC71]/20 text-[#2ECC71] border border-[#2ECC71]/30 font-bold px-3 py-1 rounded-full">
            🟢 Siap Belajar
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-[#111B38] p-4 rounded-[14px] border border-slate-700/80">
            <Smile className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
            <span className="text-xs text-slate-400 font-semibold block">Mood Kelas</span>
            <span className="text-sm font-bold text-slate-200">😊 Antusias</span>
          </div>
          <div className="bg-[#111B38] p-4 rounded-[14px] border border-slate-700/80">
            <Zap className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
            <span className="text-xs text-slate-400 font-semibold block">Energi</span>
            <span className="text-sm font-bold text-slate-200">⚡ Sangat Aktif</span>
          </div>
          <div className="bg-[#111B38] p-4 rounded-[14px] border border-slate-700/80">
            <Target className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
            <span className="text-xs text-slate-400 font-semibold block">Fokus</span>
            <span className="text-sm font-bold text-slate-200">🎯 Optimal</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 bg-[#111B38] p-4 rounded-[14px] border border-slate-700/80 leading-relaxed">
          💡 <strong className="text-[#D4AF37]">AI Recommendation:</strong> Mood & energi kelas sangat tinggi. Disarankan melakukan aktivitas fisik bergerak maksimal 15 menit sebelum masuk ke cerita pemantik.
        </p>
      </section>

      {/* PRIORITY CARDS */}
      <section className="space-y-3 mb-10">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Prioritas Hari Ini</h2>

        <div className="bg-[#E74C3C]/10 border border-[#E74C3C]/30 p-4 rounded-[14px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-[#E74C3C]" />
            <span className="font-bold text-rose-200 text-sm">Presensi Kehadiran Belum Dikonfirmasi</span>
          </div>
          <span className="text-xs bg-[#E74C3C]/20 text-rose-300 px-3 py-1 rounded-full font-bold">🔴 Urgen</span>
        </div>

        <div className="bg-[#F39C12]/10 border border-[#F39C12]/30 p-4 rounded-[14px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#F39C12]" />
            <span className="font-semibold text-amber-200 text-sm">Observasi Motorik Kasar (Fadil & Aisyah)</span>
          </div>
          <span className="text-xs bg-[#F39C12]/20 text-amber-300 px-3 py-1 rounded-full font-bold">🟡 Pending</span>
        </div>
      </section>

    </div>
  );
}