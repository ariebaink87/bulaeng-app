'use client';

import React from 'react';
import { Scene } from '../../types/content';

interface StageProps {
  currentScene?: Scene;
}

export default function Stage({ currentScene }: StageProps) {
  if (!currentScene) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950 text-slate-500">
        <p className="text-sm">Panggung Kelas Siap...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-inner transition-all">
      {/* Visual Content Stage */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Scene {currentScene.sceneNumber} • {currentScene.type}
          </span>
        </div>

        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          {currentScene.title}
        </h2>
      </div>

      {/* Dynamic Cue & Visual Space */}
      <div className="my-8 py-12 px-6 bg-slate-950/50 border border-slate-800/60 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 text-xl font-bold">
          🎭
        </div>
        <p className="text-slate-300 font-medium max-w-md">
          {currentScene.moments?.[0]?.cueText || 'Fokuskan pandangan mata ke murid-murid...'}
        </p>
      </div>

      <div className="text-right text-xs text-slate-500 font-mono">
        BULAENG Classroom OS Stage
      </div>
    </div>
  );
}