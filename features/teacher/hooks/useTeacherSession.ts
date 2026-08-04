import { useState, useEffect } from 'react';
import { socket, callBackendApi } from '@/services/backendClient';
import { AiDraftReport, SessionState } from '@/contracts/report.contract';

export function useTeacherSession() {
  const [isMounted, setIsMounted] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState>('STANDBY');
  const [currentScene, setCurrentScene] = useState<string>('Opening / Pembukaan Kelas');
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [draftData, setDraftData] = useState<AiDraftReport | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !socket.on) return;
    if (!socket.connected) socket.connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onSessionUpdate = (data: { scene?: string; status?: SessionState }) => {
      if (data.scene) setCurrentScene(data.scene);
      if (data.status) setSessionState(data.status);
    };
    const onAiDraftReady = (draft: AiDraftReport) => {
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

  const handleStartEpisode = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/classroom/session', {
        classId: 'CLASS_B2',
        teacherId: 'TEACHER_BU_SITI',
        action: 'START_EPISODE',
      });
      setSessionState('ACTIVE');
    } catch {
      setSessionState('ACTIVE');
    } finally {
      setLoading(false);
    }
  };

  const handleFinishEpisode = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/v1/advance', { classId: 'CLASS_B2', step: 'FINISH_LESSON' });
    } catch {
      // Fallback mode saat offline
    } finally {
      // Menyiapkan 5 Elemen Draft AI sesuai Tahap 3
      setDraftData({
        presensi: '15 / 15 Murid Hadir',
        observasi: 'Siswa sangat aktif saat menyanyikan lagu pembuka dan eksplorasi materi.',
        aktivitas: 'Eksplorasi Bentuk & Warna Daun di Halaman Sekolah',
        dokumentasiUrl: '/assets/mock-classroom.jpg',
        worksheetStatus: '15 Lembar Kerja Mewarnai Selesai',
        narasiAi: 'Hari ini anak-anak diajak menjelajah materi Petualangan Daun. Kegiatan berlangsung interaktif dan kondusif.',
        status: 'DRAFT',
      });
      setSessionState('FINISHED');
      setLoading(false);
    }
  };

  const handleApproveDraft = async () => {
    setLoading(true);
    try {
      await callBackendApi('/api/v1/boot', { action: 'APPROVE_BY_TEACHER', payload: draftData });
      setDraftData((prev) => (prev ? { ...prev, status: 'TEACHER_APPROVED' } : null));
    } catch {
      setDraftData((prev) => (prev ? { ...prev, status: 'TEACHER_APPROVED' } : null));
    } finally {
      setLoading(false);
    }
  };

  return {
    isMounted,
    isConnected,
    sessionState,
    currentScene,
    setCurrentScene,
    loading,
    draftData,
    setDraftData,
    handleStartEpisode,
    handleFinishEpisode,
    handleApproveDraft,
  };
}