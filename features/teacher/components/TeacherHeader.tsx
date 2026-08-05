'use client';

import React from 'react';

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
  // Cek apakah status sesi benar-benar 'ACTIVE'
  const isActive = sessionState === 'ACTIVE';

  return (
    <div className="bg-[#111B38] border border-[#D4AF37]/30 rounded-[20px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase text-[#D4AF37] font-extrabold tracking-widest font-poppins">
            BULAENG CLASSROOM OS
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-inter ${
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
        <p className="text-xs text-[#A0A6B1] font-inter mt-1">
          Universe: <span className="text-[#D4AF37] font-semibold">{universeName || 'Alam Semesta'}</span> | Kelas: <span className="text-[#D4AF37] font-semibold">{className || 'B2'}</span>
        </p>
      </div>

      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
        {/* Tombol Home / Beranda ke Landing Page Eksternal */}
        <a
          href="https://bulaeng-landing.bulaeng.workers.dev/"
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#111B38] hover:bg-[#111B38]/80 border border-[#D4AF37]/40 text-white text-xs font-semibold rounded-[14px] transition-all shadow-md group font-poppins"
        >
          <span className="text-base group-hover:-translate-x-0.5 transition-transform">🏠</span>
          <span>Beranda</span>
        </a>

        {/* Status Sesi Dinamis Sesuai sessionState */}
        <div className="bg-[#111B38] border border-[#D4AF37]/30 rounded-[14px] px-4 py-2.5 text-right min-w-[120px]">
          <span className="text-[10px] text-[#A0A6B1] uppercase font-semibold block font-inter">
            Status Sesi
          </span>
          <span
            className={`text-xs font-bold font-poppins flex items-center justify-end space-x-1.5 mt-0.5 ${
              isActive ? 'text-[#D4AF37]' : 'text-[#A0A6B1]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isActive ? 'bg-[#D4AF37] animate-pulse' : 'bg-gray-500'
              }`}
            ></span>
            <span>{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};