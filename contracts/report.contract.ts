export interface AiDraftReport {
  presensi: string;
  observasi: string;
  aktivitas: string;
  dokumentasiUrl: string;
  narasiAi: string;
  status: 'DRAFT' | 'TEACHER_APPROVED' | 'PRINCIPAL_APPROVED';
}

export type SessionState = 'STANDBY' | 'ACTIVE' | 'FINISHED';