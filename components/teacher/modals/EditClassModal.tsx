'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, RotateCcw } from 'lucide-react';
import { useClassStore } from '@/stores/teacher/useClassStore';

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditClassModal({ isOpen, onClose }: EditClassModalProps) {
  const {
    className,
    gradeLevel,
    activeTheme,
    students,
    setClassConfig,
    addStudent,
    removeStudent,
    resetConfig,
  } = useClassStore();

  const [tempClassName, setTempClassName] = useState(className);
  const [tempGradeLevel, setTempGradeLevel] = useState(gradeLevel);
  const [tempActiveTheme, setTempActiveTheme] = useState(activeTheme);
  const [newStudentName, setNewStudentName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    setClassConfig({
      className: tempClassName,
      gradeLevel: tempGradeLevel,
      activeTheme: tempActiveTheme,
    });
    onClose();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim()) {
      addStudent(newStudentName.trim());
      setNewStudentName('');
    }
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin meriset seluruh data kelas? Anda akan kembali ke menu awal.')) {
      resetConfig();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#111B38] border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold">Pengaturan Data Kelas</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Form Kelas & Tema */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Nama Kelas</label>
              <input
                type="text"
                value={tempClassName}
                onChange={(e) => setTempClassName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Jenjang Kelas</label>
              <input
                type="text"
                value={tempGradeLevel}
                onChange={(e) => setTempGradeLevel(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase">Tema Pembelajaran Aktif</label>
              <input
                type="text"
                value={tempActiveTheme}
                onChange={(e) => setTempActiveTheme(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Kelola Murid */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-400 uppercase">Kelola Daftar Murid</label>
            
            <form onSubmit={handleAddStudent} className="flex gap-2">
              <input
                type="text"
                placeholder="Nama murid baru..."
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tambah
              </button>
            </form>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-2 bg-slate-900/60 border border-slate-800 rounded-lg text-sm"
                >
                  <span className="text-slate-200">{student.name}</span>
                  <button
                    onClick={() => removeStudent(student.id)}
                    className="text-slate-500 hover:text-rose-400 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-semibold rounded-xl transition cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold rounded-xl transition cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}