import { create } from 'zustand';

export interface FlowStep {
  id: string;
  title: string;
  subtitle: string;
}

interface TeachingStore {
  stepIndex: number;
  flowSteps: FlowStep[];
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const useTeachingStore = create<TeachingStore>((set) => ({
  stepIndex: 0,
  flowSteps: [
    { id: 'PRESENSI', title: '1. Presensi Kehadiran', subtitle: 'Konfirmasi cepat 26 murid hari ini' },
    { id: 'LAGU', title: '2. Lagu Pembuka', subtitle: '🎵 "Pohon Tiup Angin" (Disiapkan AI)' },
    { id: 'CERITA', title: '3. Cerita Pemantik', subtitle: '📖 "Biji Kecil Yang Hebat"' },
    { id: 'WORKSHEET', title: '4. Aktivitas & Worksheet', subtitle: '🎨 Mewarnai & Mengelompokkan Daun' },
    { id: 'OBSERVASI', title: '5. Quick Observasi', subtitle: '📸 Catat perkembangan Fadil & Aisyah' },
    { id: 'FINISH', title: '6. Sesi Mengajar Selesai', subtitle: '✨ AI merangkum semua aktivitas secara otomatis' },
  ],
  nextStep: () => set((state) => ({ stepIndex: Math.min(state.stepIndex + 1, state.flowSteps.length - 1) })),
  prevStep: () => set((state) => ({ stepIndex: Math.max(state.stepIndex - 1, 0) })),
  resetStep: () => set({ stepIndex: 0 }),
}));