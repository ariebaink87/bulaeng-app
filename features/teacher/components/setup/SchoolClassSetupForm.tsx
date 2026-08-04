import React from 'react';
import { SetupFormData } from '../../types/setup.contract';

interface Props {
  formData: SetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SetupFormData>>;
  onNext: () => void;
}

export const SchoolClassSetupForm: React.FC<Props> = ({ formData, setFormData, onNext }) => (
  <div className="space-y-5">
    <h3 className="font-semibold text-[#111B38] text-base font-poppins">Step 1: Data Sekolah & Kelas</h3>
    <div className="space-y-4 text-xs font-inter">
      <div>
        <label className="text-[#333333] font-medium block mb-1">Nama Sekolah</label>
        <input
          type="text"
          value={formData.schoolName}
          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          placeholder="Contoh: TK BULAENG Ceria"
          className="w-full p-3 bg-[#F5F7FA] border border-[#A0A6B1]/30 rounded-xl text-[#333333] focus:outline-none focus:border-[#D4AF37]"
        />
      </div>
      <div>
        <label className="text-[#333333] font-medium block mb-1">Nama Kelas</label>
        <input
          type="text"
          value={formData.className}
          onChange={(e) => setFormData({ ...formData, className: e.target.value })}
          placeholder="Contoh: Kelas B2"
          className="w-full p-3 bg-[#F5F7FA] border border-[#A0A6B1]/30 rounded-xl text-[#333333] focus:outline-none focus:border-[#D4AF37]"
        />
      </div>
    </div>
    <button
      onClick={onNext}
      className="w-full py-3 bg-[#D4AF37] hover:bg-[#c3a030] text-[#111B38] font-bold rounded-2xl text-xs font-poppins transition shadow-sm"
    >
      Lanjut ke Data Murid →
    </button>
  </div>
);