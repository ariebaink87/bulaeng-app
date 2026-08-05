'use client';

import React from 'react';
import Link from 'next/link';

interface TeacherHeaderProps {
  isConnected: boolean;
  sessionState: string;
  universeName: string;
  className: string;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  isConnected,
  sessionState,
  universeName,
  className,
}) => {
  return (
    <div className="bg-[#111B38] border border-[#D4AF37]/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase text-[#D4AF37] font-bold tracking-widest font-poppins">
            BULAENG CLASSROOM OS
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              isConnected
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isConnected ? '● Online' : '○ Offline / Mock'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins mt-1">
          Dashboard Guru
        </h1>
        <p className="text-xs text-slate-300 font-inter mt-1">
          Universe: <span className="text-[#D4AF37] font-semibold">{universeName || 'Alam Semesta'}</span> | Kelas: <span className="text-[#D4AF37] font-semibold">{className || 'B2'}</span>
        </p>
      </div>

      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
        {/* Tombol Home / Beranda */}
        <Link
          href="/"
          className="flex items-center space-x-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-[#D4AF37]/40 text-white text-xs font-semibold rounded-xl transition-all shadow-md group"
        >
          <span className="text-base group-hover:-translate-x-0.5 transition-transform">🏠</span>
          <span>Beranda</span>
        </Link>

        {/* Status Sesi */}
        <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-right">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Status Sesi</span>
          <span className="text-xs font-bold text-[#D4AF37] flex items-center justify-end space-x-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span>{sessionState || 'Sesi Mengajar Aktif'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};