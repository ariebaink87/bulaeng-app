import React from 'react';
import { SessionState } from '@/contracts/report.contract';

interface Props {
  isConnected: boolean;
  sessionState: SessionState;
  universeName?: string;
  className?: string;
}

export const TeacherHeader: React.FC<Props> = ({
  isConnected,
  sessionState,
  universeName = 'Alam Semesta',
  className = 'Kelas Baru',
}) => {
  return (
    <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            BULAENG CLASSROOM OS
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              isConnected
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-700 text-slate-400'
            }`}
          >
            {isConnected ? '⚡ Realtime Connected' : '○ Offline / Mock'}
          </span>
        </div>
        <h1 className="text-2xl font-bold mt-1">Dashboard Guru</h1>
        <p className="text-sm text-slate-400">
          Universe: <span className="text-slate-200 font-medium">{universeName}</span> | Kelas: <span className="text-slate-200 font-medium">{className}</span>
        </p>
      </div>

      <div className="bg-slate-800 px-4 py-2 rounded-xl text-right border border-slate-700">
        <p className="text-xs text-slate-400">Status Sesi</p>
        <p
          className={`text-sm font-semibold ${
            sessionState === 'ACTIVE'
              ? 'text-amber-400 animate-pulse'
              : sessionState === 'FINISHED'
              ? 'text-emerald-400'
              : 'text-blue-400'
          }`}
        >
          ● {sessionState === 'ACTIVE' ? 'Sesi Mengajar Aktif' : sessionState === 'FINISHED' ? 'Sesi Selesai' : 'Standby / Siap'}
        </p>
      </div>
    </div>
  );
};