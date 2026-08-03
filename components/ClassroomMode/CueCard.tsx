'use client';

import React from 'react';
import { Scene } from '../../types/content';

interface CueCardProps {
  currentScene?: Scene;
}

export default function CueCard({ currentScene }: CueCardProps) {
  const moments = currentScene?.moments || [];

  return (
    <aside className="w-96 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            💡 Panduan Guru
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {moments.length} Momen
          </span>
        </div>

        {/* Prompt / Script Aksi Guru */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {moments.length > 0 ? (
            moments.map((moment, idx) => (
              <div
                key={moment.id || idx}
                className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-2xl space-y-2"
              >
                <div className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-widest">
                  Momen {idx + 1} • {moment.type}
                </div>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">
                  {moment.cueText || 'Fokus ke anak-anak, berikan gestur hangat.'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic">
              Tidak ada petunjuk khusus untuk scene ini.
            </p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center italic">
        "Tatap mata murid, teknologi menyertai di latar."
      </div>
    </aside>
  );
}