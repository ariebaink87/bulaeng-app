'use client';

import React, { useState, useEffect } from 'react';
import { socket, callBackendApi } from '@/services/backendClient';

export default function TeacherDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sessionState, setSessionState] = useState<'STANDBY' | 'ACTIVE' | 'FINISHED'>('STANDBY');
  const [currentScene, setCurrentScene] = useState<string>('Opening / Pembukaan Kelas');
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [draftData, setDraftData] = useState<{
    presensi: string;
    observasi: string;
    narasiAi: string;
    status: string;
  } | null>(null);

  // 1. Perlindungan SSR (Hanya berjalan di Client)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Setup WebSocket hanya setelah mounted
  useEffect(() => {
    if (!isMounted || !socket.on) return;

    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onSessionUpdate = (data: { scene?: string; status?: 'STANDBY' | 'ACTIVE' | 'FINISHED' }) => {
      if (data.scene) setCurrentScene(data.scene);
      if (data.status) setSessionState(data.status);
    };

    const onAiDraftReady = (draft: { presensi: string; observasi: string; narasiAi: string; status: string }) => {
      setDraftData(draft);
      setSessionState('FINISHED');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('SESSION_UPDATE', onSessionUpdate);
    socket.on('AI_DRAFT_READY', onAiDraftReady);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('SESSION_UPDATE', onSessionUpdate);
      socket.off('AI_DRAFT_READY', onAiDraftReady);
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="p-6 text-slate-400 font-sans">
        Memuat Dashboard Guru BULAENG OS...
      </div>
    );
  }

  // Tahap 2: Mulai Episode Mengajar
  const handleStartEpisode = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/classroom/session', {
        classId: 'CLASS_B2',
        teacherId: 'TEACHER_BU_SITI',
        action: 'START_EPISODE'
      });
      setSessionState('ACTIVE');
    } catch (error) {
      console.warn('Backend offline/mock mode aktif:', error);
      setSessionState('ACTIVE');
    } finally {
      setLoading(false);
    }
  };

  // Selesai Mengajar -> Pemicu AI Pembuat Draft (Tahap 3)
  const handleFinishEpisode = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/v1/advance', {
        classId: 'CLASS_B2',
        step: 'FINISH_LESSON'
      });
    } catch (error) {
      console.warn('Advance trigger mock mode:', error);
    } finally {
      setDraftData({
        presensi: '15 / 15 Murid Hadir',
        observasi: 'Siswa sangat aktif saat menyanyikan lagu pembuka dan eksplorasi materi.',
        narasiAi: 'Hari ini anak-anak diajak menjelajah materi Petualangan Daun. Kegiatan berlangsung interaktif dan kondusif.',
        status: 'DRAFT'
      });
      setSessionState('FINISHED');
      setLoading(false);
    }
  };

  // Tahap 4: Governance & Approval Guru
  const handleApproveDraft = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/v1/boot', {
        action: 'APPROVE_BY_TEACHER',
        payload: draftData
      });
      setDraftData((prev) => (prev ? { ...prev, status: 'TEACHER_APPROVED' } : null));
    } catch (error) {
      setDraftData((prev) => (prev ? { ...prev, status: 'TEACHER_APPROVED' } : null));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Context Bar */}
      <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              BULAENG Classroom OS
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              isConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'
            }`}>
              {isConnected ? '⚡ Realtime Connected' : '○ Offline / Mock'}
            </span>
          </div>
          <h1 className="text-2xl font-bold mt-1">Dashboard Guru</h1>
          <p className="text-sm text-slate-400">
            Kelas B2 — Bu Siti | Moda Eksekusi Pembelajaran
          </p>
        </div>
        <div className="bg-slate-800 px-4 py-2 rounded-xl text-right border border-slate-700">
          <p className="text-xs text-slate-400">Status Sesi</p>
          <p className={`text-sm font-semibold ${
            sessionState === 'ACTIVE' ? 'text-amber-400 animate-pulse' : 
            sessionState === 'FINISHED' ? 'text-blue-400' : 'text-emerald-400'
          }`}>
            {sessionState === 'STANDBY' && '● Standby / Siap'}
            {sessionState === 'ACTIVE' && '● Episode Berjalan'}
            {sessionState === 'FINISHED' && '● Menunggu Review Guru'}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card Tahap 2: Eksekusi Classroom */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-800">
            <h2 className="font-bold text-slate-100 text-lg">
              1. Sesi Mengajar (Classroom Mode)
            </h2>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
              Tahap 2
            </span>
          </div>

          {sessionState === 'STANDBY' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                Mulai sesi pembelajaran interaktif. AI akan membantu merekam presensi dan poin observasi kelas secara terstruktur.
              </p>
              <button
                onClick={handleStartEpisode}
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
              <p className="text-sm text-slate-300">
                Sesi sedang berlangsung. Kontrol alur mengajar dan selesaikan sesi untuk memicu penyusunan draft oleh AI.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setCurrentScene('Aktivitas Utama: Eksplorasi Daun')}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl border border-slate-600 transition"
                >
                  Lanjut Adegan
                </button>
                <button
                  onClick={handleFinishEpisode}
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
              <p className="text-sm font-semibold text-emerald-400">Sesi Mengajar Hari Ini Selesai 🎉</p>
              <p className="text-xs text-slate-400">Silahkan periksa dan evaluasi hasil draft AI pada panel di sebelah kanan.</p>
            </div>
          )}
        </div>

        {/* Card Tahap 3 & 4: Review & Governance */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-800">
            <h2 className="font-bold text-slate-100 text-lg">
              2. Draft AI & Governance
            </h2>
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
              Tahap 3 & 4
            </span>
          </div>

          {!draftData ? (
            <div className="p-6 bg-slate-800/30 border border-dashed border-slate-800 rounded-xl text-center">
              <p className="text-xs text-slate-500">
                Draft otomatis akan muncul di sini setelah sesi mengajar diselesaikan.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-400">Status AI Draft:</span>
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
                  <span className="font-semibold text-slate-200">{draftData.presensi}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block mb-0.5">Observasi Real-time:</span>
                  <span className="text-slate-200">{draftData.observasi}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block mb-1">Draft Narasi AI (Dapat Diedit):</span>
                  <textarea
                    value={draftData.narasiAi}
                    onChange={(e) => setDraftData({ ...draftData, narasiAi: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                    rows={3}
                  />
                </div>
              </div>

              {draftData.status === 'DRAFT' ? (
                <button
                  onClick={handleApproveDraft}
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

      </div>
    </div>
  );
}