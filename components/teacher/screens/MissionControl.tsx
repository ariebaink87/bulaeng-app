'use client';

import React, { useState } from 'react';
import { Settings, ArrowLeft, Users, Play, UserCheck, UserX } from 'lucide-react';
import { useClassStore } from '@/stores/teacher/useClassStore';
import { useKernelStore } from '@/stores/kernel/useKernelStore';
import EditClassModal from '@/components/teacher/modals/EditClassModal';

export default function MissionControl() {
  const {
    className,
    gradeLevel,
    activeTheme,
    students,
    toggleAttendance,
  } = useClassStore();

  // Mengambil action setScreen langsung dari Kernel Store
  const setScreen = useKernelStore((state) => state.setScreen);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const presentCount = students.filter((s) => s.isPresent).length;
  const totalStudents = students.length;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setScreen('ai-home')}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Kelas</span>
          </button>

          <button
            onClick={() => setScreen('teaching-player')}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mulai Mengajar</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Header */}
      <div className="bg-[#111B38] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase mb-1">
            <span>Mission Control Workspace</span>
            <span className="text-slate-600">•</span>
            <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
              {gradeLevel || 'Belum diatur'}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {className || 'Kelas Belum Dinamai'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Topik Pembelajaran Saat Ini:{' '}
            <span className="text-slate-200 font-semibold">
              {activeTheme || 'Belum ditentukan'}
            </span>
          </p>
        </div>

        {/* Counter Badge */}
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Kehadiran Hari Ini</div>
            <div className="text-xl font-bold text-emerald-400">
              {presentCount} / {totalStudents}{' '}
              <span className="text-xs font-normal text-slate-400">Anak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="bg-[#111B38] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-1">Presensi & Kehadiran Murid</h2>
        <p className="text-xs text-slate-400 mb-4">
          Klik nama murid untuk mengubah status hadir / absen
        </p>

        {students.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            Belum ada data murid. Klik <span className="text-amber-400">Pengaturan Kelas</span> untuk menambahkan murid.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => toggleAttendance(student.id)}
                className={`p-3 rounded-xl border flex items-center justify-between text-left transition cursor-pointer ${
                  student.isPresent
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300 hover:border-emerald-500/60'
                    : 'bg-rose-950/20 border-rose-500/30 text-rose-300 hover:border-rose-500/60'
                }`}
              >
                <span className="font-medium text-sm truncate">{student.name}</span>
                <span className="text-xs font-semibold ml-2">
                  {student.isPresent ? (
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <UserX className="w-4 h-4 text-rose-400" />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Edit Class Modal Component */}
      <EditClassModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}