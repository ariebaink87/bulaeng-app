'use client';

import React from 'react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  youtubeId: string;
}

const mockVideos: VideoItem[] = [
  {
    id: '1',
    title: 'Pengenalan Tema Alam Semesta & Benda Langit',
    category: 'Video Pemantik (Kurikulum Merdeka)',
    duration: '03:45',
    youtubeId: 'dQw4w9WgXcQ', // ID Youtube Specimen / Demo
  },
  {
    id: '2',
    title: 'Eksperimen Sederhana: Membuat Pelangi Dalam Gelas',
    category: 'Panduan Kegiatan Praktik',
    duration: '05:20',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Lagu & Gerak Anak: Mengenal Bintang & Planet',
    category: 'Selingan & Refleksi Kelas',
    duration: '02:30',
    youtubeId: 'dQw4w9WgXcQ',
  },
];

export const AiVideoModules: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Header Section Video */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] font-poppins">
              Rekomendasi AI Hari Ini
            </span>
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full font-semibold">
              Kurikulum Merdeka
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-poppins mt-0.5">
            Video Modul Belajar Pembelajaran Hari Ini
          </h2>
        </div>
      </div>

      {/* Grid 3 Kolom Video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <div
            key={video.id}
            className="bg-[#111B38] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col group"
          >
            {/* Embed Video YouTube Specimen */}
            <div className="relative aspect-video bg-slate-900">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Content Video */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#111B38]">
              <div>
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  {video.category}
                </span>
                <h3 className="text-sm font-bold text-white font-poppins mt-1 line-clamp-2 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {video.title}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                <span className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{video.duration}</span>
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                  Siap Diputar
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};