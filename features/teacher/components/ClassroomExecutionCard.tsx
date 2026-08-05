'use client';

import React, { useState, useEffect } from 'react';

interface ClassroomExecutionCardProps {
  sessionState?: string;
  loading?: boolean;
  onStartEpisode?: () => void;
  onEndEpisode?: () => void;
}

export const ClassroomExecutionCard: React.FC<ClassroomExecutionCardProps> = ({
  sessionState,
  loading = false,
  onStartEpisode,
  onEndEpisode,
}) => {
  // Menggunakan state lokal yang disinkronkan dengan sessionState, default: false (Inaktif/Mulai)
  const [isClassActive, setIsClassActive] = useState<boolean>(false);

  // Efek untuk menyinkronkan dengan sessionState jika ada dari backend
  useEffect(() => {
    if (sessionState !== undefined) {
      setIsClassActive(sessionState === 'ACTIVE');
    }
  }, [sessionState]);

  const handleToggleClass = () => {
    if (isClassActive) {
      // Jika kelas sedang aktif -> Akhiri Kelas (Ubah ke Merah -> Gold)
      if (onEndEpisode) onEndEpisode();
      setIsClassActive(false);
    } else {
      // Jika kelas belum mulai -> Mulai Kelas (Ubah ke Gold -> Merah)
      if (onStartEpisode) onStartEpisode();
      setIsClassActive(true);
    }
  };

  return (
    <div className="bg-[#111B38]/95 backdrop-blur-md border border-[#D4AF37]/30 p-6 rounded-[20px] space-y-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
      <h2 className="font-poppins font-semibold text-white text-lg tracking-tight">
        1. Eksekusi Kelas (Classroom Mode)
      </h2>

      {/* Tombol Eksekusi sesuai BLG-DS-001 (Radius 14px) */}
      <button
        onClick={handleToggleClass}
        disabled={loading}
        className={`w-full py-4 font-poppins font-extrabold text-base rounded-[14px] transition-all duration-300 shadow-md active:scale-[0.99] disabled:opacity-50 cursor-pointer ${
          isClassActive
            ? 'bg-[#E74C3C] hover:bg-[#c0392b] text-white shadow-[#E74C3C]/20' // Danger Red (Akhiri Kelas)
            : 'bg-[#D4AF37] hover:bg-[#c3a030] text-[#111B38] shadow-[#D4AF37]/20' // Primary Gold (Mulai Kelas)
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2 font-inter">
            <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            MEMPROSES...
          </span>
        ) : isClassActive ? (
          'AKHIRI KELAS'
        ) : (
          'MULAI KELAS'
        )}
      </button>
    </div>
  );
};