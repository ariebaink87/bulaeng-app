import React, { useState } from 'react';
import { Episode, Scene } from '@/types/content';

interface ClassroomModeProps {
  currentEpisode?: Episode;
  currentScene?: Scene;
  onClose?: () => void;
  onNextScene?: () => void;
  onPrevScene?: () => void;
}

export default function ClassroomMode({
  currentEpisode,
  currentScene: initialScene,
  onClose,
  onNextScene: externalNext,
  onPrevScene: externalPrev,
}: ClassroomModeProps) {
  // State untuk melacak scene aktif di dalam komponen
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  // Ambil daftar scenes dari episode
  const scenes = currentEpisode?.scenes || [];
  
  // Tentukan scene aktif (pilih dari array scenes berdasarkan index, atau fallback ke initialScene)
  const activeScene = scenes[activeSceneIndex] || initialScene || scenes[0];

  // Helper fungsi untuk tombol Selanjutnya
  const handleNext = () => {
    if (externalNext) {
      externalNext();
    } else if (activeSceneIndex < scenes.length - 1) {
      setActiveSceneIndex((prev) => prev + 1);
    }
  };

  // Helper fungsi untuk tombol Sebelumnya
  const handlePrev = () => {
    if (externalPrev) {
      externalPrev();
    } else if (activeSceneIndex > 0) {
      setActiveSceneIndex((prev) => prev - 1);
    }
  };

  // 1. Ekstrak URL Video dari moments.assets (jika ada)
  const videoFromMoments = activeScene?.moments
    ?.flatMap((m) => m.assets || [])
    ?.find((a) => a.type === 'video')?.url;

  // 2. Ambil URL video utama (cek scene, moments, atau episode)
  const rawVideoUrl =
    (activeScene as any)?.videoUrl ||
    videoFromMoments ||
    (currentEpisode as any)?.videoUrl;

  // 3. Format URL agar bisa di-embed oleh Google Drive / iframe
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
            {currentEpisode?.title || 'Mode Kelas Interactive'}
          </h1>
          <p className="text-xs text-slate-400">
            {activeScene?.title
              ? `Scene ${activeSceneIndex + 1} dari ${scenes.length || 1}: ${activeScene.title}`
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
          /* TAMPILAN JIKA TIDAK ADA VIDEO */
          <div className="text-center p-8 space-y-3">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center text-2xl mx-auto">
              👀
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Fokuskan pandangan mata ke murid-murid...
            </p>
            <p className="text-xs text-slate-500">
              (Gunakan panduan instruksi di sebelah kanan untuk memandu sesi)
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

        <span className="text-xs text-slate-500 font-medium">
          {scenes.length > 0 ? `${activeSceneIndex + 1} / ${scenes.length}` : ''}
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