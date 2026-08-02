'use client';

import React from 'react';
import { Home } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full px-6 py-3.5 flex items-center justify-between border-b border-[#D4AF37]/20 bg-[#111B38]/90 backdrop-blur-md sticky top-0 z-50">
      {/* Tombol Kembali ke Landing Page */}
      <a
        href="https://bulaeng-landing.bulaeng.workers.dev"
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1a264a] border border-[#D4AF37]/30 text-white text-xs font-bold hover:border-[#D4AF37] hover:bg-[#233363] transition-all duration-200 shadow-md group"
      >
        <Home className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-0.5 transition-transform duration-200" />
        <span>Kembali ke Beranda</span>
      </a>

      {/* Indikator Status & Versi */}
      <div className="flex items-center gap-2.5 bg-[#1a264a]/80 px-3.5 py-1.5 rounded-full border border-slate-700/60">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] text-slate-300 font-mono tracking-wider font-semibold">
          TEACHER OS v3.0
        </span>
      </div>
    </header>
  );
};

export default DashboardHeader;