'use client';

import React, { useState } from 'react';
import { CURRICULUM_PRESET, VIDEO_STORE_DATA } from '../../content';
import { generateDailyPackage, DailyLessonPackage } from '../../services/aiEngine';

interface ClassSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndActivateAI?: (dailyPackage: DailyLessonPackage) => void;
}

export default function ClassSettingsModal({ isOpen, onClose, onSaveAndActivateAI }: ClassSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'modules' | 'videos' | 'students'>('modules');

  const [selectedGroup, setSelectedGroup] = useState<'Kelompok A (4-5 tahun)' | 'Kelompok B (5-6 tahun)'>('Kelompok A (4-5 tahun)');
  const [selectedSemester, setSelectedSemester] = useState<'Semester 1' | 'Semester 2'>('Semester 1');

  const [students, setStudents] = useState<string[]>(['Ahmad Fauzi', 'Siti Nurhaliza', 'Budi Santoso']);
  const [newStudentName, setNewStudentName] = useState('');

  if (!isOpen) return null;

  const activeCurriculum = CURRICULUM_PRESET.filter(
    (item: any) => item.group === selectedGroup && item.semester === selectedSemester
  );

  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    setStudents([...students, newStudentName.trim()]);
    setNewStudentName('');
  };

  const handleActivateAI = () => {
    try {
      // 1. Dapatkan racikan materi dari AI Engine
      const dailyPackage = generateDailyPackage(selectedGroup, selectedSemester, students);
      
      if (onSaveAndActivateAI) {
        onSaveAndActivateAI(dailyPackage);
      }

      // 2. Simpan status onboarding di browser agar tidak kembali ke wizard
      localStorage.setItem('bulaeng_setup_completed', 'true');

    } catch (err) {
      console.error("AI Engine generation error:", err);
    } finally {
      onClose();
      // 3. Navigasi langsung ke Bulaeng Classroom Dashboard
      window.location.href = '/teacher/classroom';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 shadow-2xl space-y-6 text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              🤖 Konfigurasi Awal Kelas BULAENG
            </h2>
            <p className="text-xs text-slate-400">Setup 1x saja, AI akan otomatis menyiapkan seluruh bahan ajar & video harian.</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tab Setup Sederhana */}
        <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 gap-1">
          <button
            onClick={() => setActiveTab('modules')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'modules' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📚 1. Target Kurikulum
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'students' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            👨‍🎓 2. Data Murid ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'videos' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎬 3. Pustaka 3D (Pilot Access)
          </button>
        </div>

        {/* Isi Tab */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 min-h-[260px]">
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Kelompok Usia</label>
                  <select 
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none"
                  >
                    <option value="Kelompok A (4-5 tahun)">Kelompok A (4-5 tahun)</option>
                    <option value="Kelompok B (5-6 tahun)">Kelompok B (5-6 tahun)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Semester</label>
                  <select 
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none"
                  >
                    <option value="Semester 1">Semester 1 (Ganjil)</option>
                    <option value="Semester 2">Semester 2 (Genap)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {activeCurriculum.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md mr-2">
                        {item.category}
                      </span>
                      <span className="text-slate-200">{item.objective}</span>
                    </div>
                    <span className="text-emerald-400 text-[11px]">✓ Ready AI</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik nama murid..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddStudent()}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  + Tambah
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                {students.map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950/80 border border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-200">
                    <span>{idx + 1}. {student}</span>
                    <button 
                      onClick={() => setStudents(students.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-red-400 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {VIDEO_STORE_DATA.map((vid: any) => (
                <div key={vid.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex gap-3 items-center">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {vid.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{vid.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate">{vid.description}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                    ✨ Pilot Unlocked
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400">
            🤖 AI akan otomatis meracik bahan harian.
          </span>
          <button
            onClick={handleActivateAI}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-400/10"
          >
            🚀 Simpan & Aktifkan AI Engine
          </button>
        </div>

      </div>
    </div>
  );
}