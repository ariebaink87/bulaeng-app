import React from 'react';
import { AiDraftReport } from '@/contracts/report.contract';

interface Props {
  draftData: AiDraftReport | null;
  loading: boolean;
  onUpdateDraft: (updated: AiDraftReport) => void;
  onApprove: () => void;
}

export const AiDraftGovernance: React.FC<Props> = ({
  draftData,
  loading,
  onUpdateDraft,
  onApprove,
}) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
    <div className="flex items-center justify-between border-b pb-3 border-slate-800">
      <h2 className="font-bold text-slate-100 text-lg">2. Review Draft AI & Governance</h2>
      <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
        Tahap 3 & 4
      </span>
    </div>

    {!draftData ? (
      <div className="p-6 bg-slate-800/30 border border-dashed border-slate-800 rounded-xl text-center">
        <p className="text-xs text-slate-500">Draft otomatis akan muncul di sini setelah sesi selesai.</p>
      </div>
    ) : (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-400">Status Governance:</span>
          <span className={`text-xs px-2.5 py-0.5 rounded font-bold border ${
            draftData.status === 'DRAFT'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}>
            {draftData.status}
          </span>
        </div>

        <div className="space-y-3 text-xs text-slate-300 bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
          <div>
            <span className="text-slate-400 font-medium block mb-0.5">Presensi:</span>
            <input
              type="text"
              value={draftData.presensi}
              onChange={(e) => onUpdateDraft({ ...draftData, presensi: e.target.value })}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
            />
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-0.5">Observasi Real-time:</span>
            <input
              type="text"
              value={draftData.observasi}
              onChange={(e) => onUpdateDraft({ ...draftData, observasi: e.target.value })}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
            />
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Draft Narasi AI (Dapat Diedit Guru):</span>
            <textarea
              value={draftData.narasiAi}
              onChange={(e) => onUpdateDraft({ ...draftData, narasiAi: e.target.value })}
              className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              rows={3}
            />
          </div>
        </div>

        {draftData.status === 'DRAFT' ? (
          <button
            onClick={onApprove}
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Setujui & Kirim ke Kepsek'}
          </button>
        ) : (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-xl text-center">
            ✓ Disetujui Guru & Diteruskan ke Kepsek
          </div>
        )}
      </div>
    )}
  </div>
);