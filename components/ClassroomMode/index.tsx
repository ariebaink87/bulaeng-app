import React, { useState } from 'react';
import { Episode, Scene } from '@/types/content';

// Data Episode Default jika parent component tidak mengirim props currentEpisode
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
  // Gunakan propEpisode dari luar jika ada, jika tidak pakai DEFAULT_EPISODE
  const episode = propEpisode || DEFAULT_EPISODE;

  // State untuk melacak scene aktif di dalam komponen
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Ambil daftar scenes dari episode
  const scenes = episode?.scenes || [];

  // Tentukan scene yang sedang aktif
  const activeScene = scenes[activeSceneIndex] || propScene || scenes[0];

  // Handle tombol selanjutnya
  const handleNext = () => {
    if (externalNext) externalNext();
    if (activeSceneIndex < scenes.length - 1) {
      setActiveSceneIndex((prev) => prev + 1);
    }
  };

  // Handle tombol sebelumnya
  const handlePrev = () => {
    if (externalPrev) externalPrev();
    if (activeSceneIndex > 0) {
      setActiveSceneIndex((prev) => prev - 1);
    }
  };

  // Ambil URL Video dari moments jika ada
  const videoFromMoments = activeScene?.moments
    ?.flatMap((m) => m.assets || [])
    ?.find((a) => a.type === 'video')?.url;

  // Sumber URL video utama
  const rawVideoUrl =
    (activeScene as any)?.videoUrl ||
    videoFromMoments ||
    (episode as any)?.videoUrl ||
    'https://drive.google.com/file/d/1nwskcx-QftlMCueXUIo7YjLcMMhwI1H3/preview';

  // Format URL agar siap diputar di iframe
  const activeVideoUrl = rawVideoUrl
    ? rawVideoUrl
        .replace('/view?usp=drive_link', '/preview')
        .replace('/view', '/preview')
    : null;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white p-6">
      {/* HEADER / NAVIGATION BAR */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div>
          <h1 className="text-xl font-bold text-amber-400">
            {episode?.title || 'Petualangan Kebersihan Diri & Lingkungan'}
          </h1>
          <p className="text-xs text-slate-400">
            {activeScene?.title
              ? `Scene ${activeSceneIndex + 1} dari ${scenes.length}: ${activeScene.title}`
              : 'Ruang Belajar BULAENG'}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition"
          >
            Selesai Mengajar ✕
          </button>
        )}
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
          /* TAMPILAN FALLBACK JIKA SAMA SEKALI TIDAK ADA VIDEO */
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
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-xs font-semibold cursor-pointer transition"
        >
          ← Scene Sebelumnya
        </button>

        <span className="text-xs text-slate-400 font-semibold">
          Scene {activeSceneIndex + 1} / {scenes.length || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={scenes.length > 0 && activeSceneIndex === scenes.length - 1}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-slate-950 font-bold rounded-xl text-xs cursor-pointer transition"
        >
          Scene Selanjutnya →
        </button>
      </div>
    </div>
  );
}