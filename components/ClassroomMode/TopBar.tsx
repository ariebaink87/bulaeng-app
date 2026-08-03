'use client';

import React from 'react';
import { useSessionStore } from '@/stores/useSessionStore';
import { Scene } from '../../types/content';

export default function TopBar() {
  const { episode, currentSceneIndex, jumpToScene, endSession } = useSessionStore();

  if (!episode) return null;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between font-sans">
      {/* Title & Info */}
      <div className="flex items-center space-x-4">
        <span className="text-amber-400 font-extrabold text-lg tracking-wide">
          BULAENG
        </span>
        <span className="text-slate-600">|</span>
        <h1 className="text-sm font-bold text-slate-200">
          {episode.title}
        </h1>
      </div>

      {/* Navigation Dots / Scene Selector */}
      <div className="flex items-center space-x-2">
        {episode.scenes.map((scene: Scene, idx: number) => {
          const isActive = idx === currentSceneIndex;
          return (
            <button
              key={scene.id}
              onClick={() => jumpToScene(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {idx + 1}. {scene.title}
            </button>
          );
        })}
      </div>

      {/* End Session Button */}
      <button
        onClick={endSession}
        className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
      >
        Akhiri Kelas
      </button>
    </header>
  );
}