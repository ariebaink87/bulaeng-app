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
  // Validasi sederhana agar tombol "Lanjut" aktif hanya jika field wajib terisi
  const isValid =
    Boolean(formData.teacherName) &&
    Boolean(formData.email) &&
    Boolean(formData.password) &&
    Boolean(formData.schoolName) &&
    Boolean(formData.className);

  return (
    <div className="space-y-6 font-poppins">
      <h3 className="text-xl font-bold text-white mb-4">
        Step 1: Akun Guru, Sekolah & Kelas
      </h3>

      {/* --- SEKSI 1: KREDENSIAL AKUN GURU --- */}
      <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
          Akun Guru
        </h4>

        {/* Input 1: Profil / Nama Guru */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white tracking-wide">
            Nama Lengkap Guru <span className="text-[#D4AF37]">*</span>
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

        {/* Input 2: Email Guru */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white tracking-wide">
            Email Login <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="rosiana@sekolah.sch.id"
            className="w-full px-4 py-3.5 bg-white border border-slate-300 focus:border-[#D4AF37] rounded-xl text-slate-900 placeholder-slate-400 font-medium text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Input 3: Password */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white tracking-wide">
            Password <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="password"
            value={formData.password || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Buat password akun Anda"
            className="w-full px-4 py-3.5 bg-white border border-slate-300 focus:border-[#D4AF37] rounded-xl text-slate-900 placeholder-slate-400 font-medium text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        {/* Input 4: NIP (Opsional) */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white tracking-wide">
            NIP <span className="text-slate-400 font-normal">(Opsional)</span>
          </label>
          <input
            type="text"
            value={formData.nip || ''}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, nip: e.target.value }))
            }
            placeholder="1985xxxxxxxxxxxx"
            className="w-full px-4 py-3.5 bg-white border border-slate-300 focus:border-[#D4AF37] rounded-xl text-slate-900 placeholder-slate-400 font-medium text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>
      </div>

      {/* --- SEKSI 2: INFORMASI SEKOLAH & KELAS --- */}
      <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <h4 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">
          Informasi Kelas
        </h4>

        {/* Input 5: Nama Sekolah */}
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

        {/* Input 6: Nama Kelas */}
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
      </div>

      {/* Tombol Lanjut */}
      <button
        type="button"
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-4 mt-6 bg-[#D4AF37] hover:bg-[#c3a030] active:scale-[0.99] disabled:opacity-60 text-[#111B38] font-extrabold text-base rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
      >
        <span>Lanjut ke Data Murid</span>
        <span className="text-lg">→</span>
      </button>
    </div>
  );
};