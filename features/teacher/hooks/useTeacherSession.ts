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

  // Store Session ID agar konsisten selama sesi berjalan
  const [sessionId, setSessionId] = useState<string>('SES-CLASS-B2');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !socket.on) return;
    if (!socket.connected) socket.connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onStateChanged = (data: any) => {
      if (data.current_moment) setCurrentScene(data.current_moment);
      if (data.system_status) {
        if (data.system_status === 'RUNNING') setSessionState('ACTIVE');
        if (data.system_status === 'ENDED') setSessionState('FINISHED');
      }
    };
    const onAiDraftReady = (draft: AiDraftReport) => {
      setDraftData(draft);
      setSessionState('FINISHED');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('state_changed', onStateChanged);
    socket.on('AI_DRAFT_READY', onAiDraftReady);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('state_changed', onStateChanged);
      socket.off('AI_DRAFT_READY', onAiDraftReady);
    };
  }, [isMounted]);

  const handleStartEpisode = async () => {
    setLoading(true);
    const newSessionId = `SES-${Math.floor(1000 + Math.random() * 9000)}`;
    setSessionId(newSessionId);

    try {
      // ✅ Sesuai kontrak Backend (action: 'BOOT', sessionId, classId, teacherId)
      await callBackendApi('/api/classroom/session', {
        action: 'BOOT',
        sessionId: newSessionId,
        classId: 'CLASS_B2',
        teacherId: 'TEACHER_BU_SITI'
      });
      setSessionState('ACTIVE');
    } catch (error) {
      console.warn('Backend offline/error, falling back to ACTIVE local state', error);
      setSessionState('ACTIVE');
    } finally {
      setLoading(false);
    }
  };

  const handleFinishEpisode = async () => {
    setLoading(true);
    try {
      // ✅ Menggunakan action 'SHUTDOWN' ke endpoint classroom/session
      await callBackendApi('/api/classroom/session', {
        action: 'SHUTDOWN',
        sessionId: sessionId
      });
    } catch {
      // Fallback mode saat offline
    } finally {
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