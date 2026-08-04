import React from 'react';
import { SetupFormData, StudentInput } from '../../types/setup.contract';

interface Props {
  formData: SetupFormData;
  onAddStudent: () => void;
  onStudentChange: (id: string, field: keyof StudentInput, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const StudentDataForm: React.FC<Props> = ({
  formData,
  onAddStudent,
  onStudentChange,
  onNext,
  onPrev,
}) => (
  <div className="space-y-5">
    <h3 className="font-semibold text-[#111B38] text-base font-poppins">Step 2: Input Data Murid</h3>
    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
      {formData.students.map((student, idx) => (
        <div key={student.id} className="flex gap-2 items-center bg-[#F5F7FA] p-2.5 rounded-xl border border-[#A0A6B1]/20">
          <span className="text-xs text-[#A0A6B1] font-bold w-5">{idx + 1}.</span>
          <input
            type="text"
            placeholder="Nama Murid"
            value={student.name}
            onChange={(e) => onStudentChange(student.id, 'name', e.target.value)}
            className="flex-1 p-2 bg-white border border-[#A0A6B1]/30 rounded-lg text-xs text-[#333333] focus:outline-none focus:border-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="Karakter (cth: Ceria, Pemalu)"
            value={student.characterTrait}
            onChange={(e) => onStudentChange(student.id, 'characterTrait', e.target.value)}
            className="flex-1 p-2 bg-white border border-[#A0A6B1]/30 rounded-lg text-xs text-[#333333] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      ))}
    </div>
    <button onClick={onAddStudent} className="text-xs text-[#D4AF37] font-semibold hover:underline font-inter">
      + Tambah Murid
    </button>
    <div className="flex gap-3 pt-2 font-poppins">
      <button onClick={onPrev} className="w-1/2 py-3 bg-[#F5F7FA] text-[#111B38] font-bold rounded-2xl text-xs hover:bg-[#e2e6ed]">
        ← Kembali
      </button>
      <button onClick={onNext} className="w-1/2 py-3 bg-[#D4AF37] hover:bg-[#c3a030] text-[#111B38] font-bold rounded-2xl text-xs transition shadow-sm">
        Lanjut ke Modul →
      </button>
    </div>
  </div>
);