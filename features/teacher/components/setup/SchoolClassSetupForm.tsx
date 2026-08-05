'use client';

import React from 'react';
import { SetupFormData } from '@/features/teacher/types/setup.contract';

interface Props {
  formData: SetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SetupFormData>>;
  onNext: () => void;
}

export const SchoolClassSetupForm: React.FC<Props> = ({
  formData,
  setFormData,
  onNext,
}) => {
  return (
    <div className="space-y-6 font-poppins">
      <h3 className="text-xl font-bold text-white mb-4">
        Step 1: Data Guru, Sekolah & Kelas
      </h3>

      {/* Input 1: Profil / Nama Guru */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white tracking-wide">
          Profil / Nama Guru <span className="text-[#D4AF37]">*</span>
        </label>
        <input
          type="text"
          value={formData.teacherName || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, teacherName: e.target.value }))
          }
          placeholder="Contoh: Bu Rosiana, S.Pd."
          className="w-full px-4 py-3.5 bg-white border border-slate-300 focus:border-[#D4AF37] rounded-xl text-slate-900 placeholder-slate-400 font-medium text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      {/* Input 2: Nama Sekolah */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white tracking-wide">
          Nama Sekolah <span className="text-[#D4AF37]">*</span>
        </label>
        <input
          type="text"
          value={formData.schoolName || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, schoolName: e.target.value }))
          }
          placeholder="Contoh: TK BULAENG Ceria"
          className="w-full px-4 py-3.5 bg-white border border-slate-300 focus:border-[#D4AF37] rounded-xl text-slate-900 placeholder-slate-400 font-medium text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      {/* Input 3: Nama Kelas */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white tracking-wide">
          Nama Kelas <span className="text-[#D4AF37]">*</span>
        </label>
        <input
          type="text"
          value={formData.className || ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, className: e.target.value }))
          }
          placeholder="Contoh: Kelas B2"
          className="w-full px-4 py-3.5 bg-white border border-slate-300 focus:border-[#D4AF37] rounded-xl text-slate-900 placeholder-slate-400 font-medium text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37]"
        />
      </div>

      {/* Tombol Lanjut */}
      <button
        type="button"
        onClick={onNext}
        disabled={!formData.schoolName || !formData.className}
        className="w-full py-4 mt-6 bg-[#D4AF37] hover:bg-[#c3a030] active:scale-[0.99] disabled:opacity-60 text-[#111B38] font-extrabold text-base rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
      >
        <span>Lanjut ke Data Murid</span>
        <span className="text-lg">→</span>
      </button>
    </div>
  );
};