import React from 'react';

interface Props {
  sessionState: string;
  currentScene: string;
  loading: boolean;
  onStart: () => void;
  onFinish: () => void;
  onSceneChange: (scene: string) => void;
}

export const ClassroomExecution: React.FC<Props> = ({
  sessionState,
  currentScene,
  loading,
  onStart,
  onFinish,
  onSceneChange,
}) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
    <div className="flex items-center justify-between border-b pb-3 border-slate-800">
      <h2 className="font-bold text-slate-100 text-lg">1. Eksekusi Kelas (Classroom Mode)</h2>
      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
        Tahap 2
      </span>
    </div>

    {sessionState === 'STANDBY' && (
      <div className="space-y-4">
        <p className="text-sm text-slate-400">
          Mulai sesi pembelajaran. AI akan memantau dan menyiapkan draft observasi secara otomatis.
        </p>
        <button
          onClick={onStart}
          disabled={loading}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-lg disabled:opacity-50"
        >
          {loading ? 'Menghubungkan...' : '🟨 MULAI EPISODE'}
        </button>
      </div>
    )}

    {sessionState === 'ACTIVE' && (
      <div className="space-y-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase">Adegan Aktif:</span>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded font-semibold border border-amber-500/30">
            {currentScene}
          </span>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onSceneChange('Aktivitas Utama: Eksplorasi Daun')}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-600 transition"
          >
            Lanjut Adegan
          </button>
          <button
            onClick={onFinish}
            disabled={loading}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Selesai Mengajar'}
          </button>
        </div>
      </div>
    )}

    {sessionState === 'FINISHED' && (
      <div className="p-6 bg-slate-800/40 border border-slate-800 rounded-xl text-center space-y-1">
        <p className="text-sm font-semibold text-emerald-400">Sesi Mengajar Selesai 🎉</p>
        <p className="text-xs text-slate-400">Periksa dan evaluasi hasil draft AI pada panel Governance.</p>
      </div>
    )}
  </div>
);