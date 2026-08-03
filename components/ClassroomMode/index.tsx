import React, { useState } from 'react';
import { Episode, Scene } from '@/types/content';
import { useSessionStore } from '@/stores/useSessionStore';

const DEFAULT_EPISODE: Episode = {
  id: 'ep-001',
  episodeNumber: 'EPISODE 01',
  title: 'Petualangan Kebersihan Diri & Lingkungan',
  estimatedDurationMinutes: 35,
  universe: {
    id: 'uni-dunia-alam',
    name: 'Dunia Alam',
    mission: 'Menjaga kebersihan & kesehatan lingkungan kelas',
  },
  story: {
    id: 'story-001',
    title: 'Kebersihan Diri & Lingkungan',
  },
  scenes: [
    {
      id: 'scene-1',
      sceneNumber: 1,
      title: 'Mengenal Kebersihan Diri & Lingkungan',
      type: 'opening',
      videoUrl: 'https://drive.google.com/file/d/1nwskcx-QftlMCueXUIo7YjLcMMhwI1H3/preview',
      moments: [],
    },
    {
      id: 'scene-2',
      sceneNumber: 2,
      title: 'Mencuci Tangan & Membuang Sampah',
      type: 'animation',
      videoUrl: 'https://drive.google.com/file/d/1nwskcx-QftlMCueXUIo7YjLcMMhwI1H3/preview',
      moments: [],
    },
    {
      id: 'scene-3',
      sceneNumber: 3,
      title: 'Refleksi Kebersihan Kelas',
      type: 'closing',
      videoUrl: 'https://drive.google.com/file/d/1nwskcx-QftlMCueXUIo7YjLcMMhwI1H3/preview',
      moments: [],
    },
  ],
};

interface ClassroomModeProps {
  currentEpisode?: Episode;
  currentScene?: Scene;
  onClose?: () => void;
  onNextScene?: () => void;
  onPrevScene?: () => void;
}

export default function ClassroomMode({
  currentEpisode: propEpisode,
  currentScene: propScene,
  onClose,
  onNextScene: externalNext,
  onPrevScene: externalPrev,
}: ClassroomModeProps) {
  const { endSession } = useSessionStore();
  const episode = propEpisode || DEFAULT_EPISODE;
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const scenes = episode?.scenes || [];
  const activeScene = scenes[activeSceneIndex] || propScene || scenes[0];

  // Handler kembali ke Dashboard AI
  const handleBackToAiDashboard = () => {
    if (onClose) {
      onClose();
    } else {
      endSession();
    }
  };

  const handleNext = () => {
    if (externalNext) externalNext();
    if (activeSceneIndex < scenes.length - 1) {
      setActiveSceneIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (externalPrev) externalPrev();
    if (activeSceneIndex > 0) {
      setActiveSceneIndex((prev) => prev - 1);
    }
  };

  const videoFromMoments = activeScene?.moments
    ?.flatMap((m) => m.assets || [])
    ?.find((a) => a.type === 'video')?.url;

  const rawVideoUrl =
    (activeScene as any)?.videoUrl ||
    videoFromMoments ||
    (episode as any)?.videoUrl ||
    'https://drive.google.com/file/d/1nwskcx-QftlMCueXUIo7YjLcMMhwI1H3/preview';

  const activeVideoUrl = rawVideoUrl
    ? rawVideoUrl
        .replace('/view?usp=drive_link', '/preview')
        .replace('/view', '/preview')
    : null;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white p-6 font-sans">
      {/* HEADER / NAVIGATION BAR */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div>
          <h1 className="text-xl font-bold text-amber-400">
            {episode?.title || 'Petualangan Kebersihan Diri & Lingkungan'}
          </h1>
          <p className="text-xs text-slate-400">
            {activeScene?.title
              ? `Adegan ${activeSceneIndex + 1} dari ${scenes.length}: ${activeScene.title}`
              : 'Ruang Belajar BULAENG'}
          </p>
        </div>

        {/* TOMBOL NAVIGASI KEMBALI */}
        <div className="flex items-center gap-2">
          {/* 1. KEMBALI KE AI DASHBOARD */}
          <button
            onClick={handleBackToAiDashboard}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 border border-slate-800"
          >
            ← Dashboard AI
          </button>

          {/* 2. KEMBALI KE LANDING PAGE CLOUDFLARE */}
          <a
            href="https://bulaeng-landing.bulaeng.workers.dev/"
            className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 rounded-xl text-xs font-semibold cursor-pointer transition flex items-center gap-1.5 border border-amber-400/20"
          >
            🏠 Beranda
          </a>
        </div>
      </div>

      {/* PANGGUNG UTAMA / STAGE PLAYER */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center min-h-[400px]">
        {activeVideoUrl ? (
          <iframe
            src={activeVideoUrl}
            className="w-full h-full absolute inset-0 border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Video Animasi 3D BULAENG"
          />
        ) : (
          <div className="text-center p-8 space-y-3">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center text-2xl mx-auto">
              👀
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Fokuskan pandangan mata ke murid-murid...
            </p>
          </div>
        )}
      </div>

      {/* CONTROL BUTTONS (PREV / NEXT SCENE) */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
        <button
          onClick={handlePrev}
          disabled={activeSceneIndex === 0}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs font-semibold cursor-pointer transition"
        >
          ← Adegan Sebelumnya
        </button>

        <span className="text-xs text-slate-400 font-semibold">
          Adegan {activeSceneIndex + 1} / {scenes.length || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={scenes.length > 0 && activeSceneIndex === scenes.length - 1}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-xs cursor-pointer transition shadow-lg shadow-amber-400/10"
        >
          Adegan Selanjutnya →
        </button>
      </div>
    </div>
  );
}