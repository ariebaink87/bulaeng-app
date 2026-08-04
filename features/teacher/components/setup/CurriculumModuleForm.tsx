import React from 'react';
import { SetupFormData } from '../../types/setup.contract';

interface Props {
  formData: SetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<SetupFormData>>;
  loading: boolean;
  onSubmit: () => void;
  onPrev: () => void;
}

export const CurriculumModuleForm: React.FC<Props> = ({
  formData,
  setFormData,
  loading,
  onSubmit,
  onPrev,
}) => (
  <div className="space-y-5">
    <h3 className="font-semibold text-[#111B38] text-base font-poppins">Step 3: Modul Kurikulum & Animasi 3D</h3>
    <div className="space-y-4 text-xs font-inter">
      <div>
        <label className="text-[#333333] font-medium block mb-1">Pilih Universe / Tema</label>
        <select
          value={formData.selectedUniverse}
          onChange={(e) => setFormData({ ...formData, selectedUniverse: e.target.value })}
          className="w-full p-3 bg-[#F5F7FA] border border-[#A0A6B1]/30 rounded-xl text-[#333333] focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="Alam Semesta">Alam Semesta</option>
          <option value="Dunia Hewan">Dunia Hewan</option>
        </select>
      </div>
      <div className="flex items-center gap-3 bg-[#F5F7FA] p-3.5 rounded-xl border border-[#A0A6B1]/20">
        <input
          type="checkbox"
          checked={formData.has3dAnimationAssets}
          onChange={(e) => setFormData({ ...formData, has3dAnimationAssets: e.target.checked })}
          className="rounded border-[#A0A6B1] text-[#D4AF37] focus:ring-[#D4AF37]"
        />
        <span className="text-xs text-[#333333]">Aktifkan Aset Animasi 3D & Video Interactive</span>
      </div>
    </div>
    <div className="flex gap-3 pt-2 font-poppins">
      <button onClick={onPrev} className="w-1/2 py-3 bg-[#F5F7FA] text-[#111B38] font-bold rounded-2xl text-xs hover:bg-[#e2e6ed]">
        ← Kembali
      </button>
      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-1/2 py-3 bg-[#D4AF37] hover:bg-[#c3a030] text-[#111B38] font-bold rounded-2xl text-xs transition shadow-sm disabled:opacity-50"
      >
        {loading ? 'Menyimpan...' : '🚀 Simpan & Aktifkan AI'}
      </button>
    </div>
  </div>
);