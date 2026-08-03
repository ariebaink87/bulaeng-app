'use client';

import React from 'react';
import { useSessionStore } from '@/stores/useSessionStore';

export default function BottomControls() {
  const { episode, currentSceneIndex, nextScene, prevScene } = useSessionStore();

  if (!episode) return null;

  const totalScenes = episode.scenes.length;
  const isFirst = currentSceneIndex === 0;
  const isLast = currentSceneIndex === totalScenes - 1;

  return (
    <footer className="h-20 bg-slate-900 border-t border-slate-800 px-8 flex items-center justify-between font-sans">
      {/* Indicator Scene */}
      <div className="text-xs font-mono text-slate-400">
        Scene <span className="text-amber-400 font-bold">{currentSceneIndex + 1}</span> dari <span className="text-slate-200">{totalScenes}</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={prevScene}
          disabled={isFirst}
          className={`px-6 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            isFirst
              ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 active:scale-95'
          }`}
        >
          ← Scene Sebelumnya
        </button>

        <button
          onClick={nextScene}
          disabled={isLast}
          className={`px-8 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
            isLast
              ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 active:scale-95'
          }`}
        >
          {isLast ? 'Selesai Episode' : 'Lanjut Scene Berikutnya →'}
        </button>
      </div>
    </footer>
  );
}