import { create } from 'zustand';
import { PriorityMission, TeachingSession, FlowStep } from '@/types/teacher';
import { TeachingEngine } from '@/core/engine/TeachingEngine'; // Import Domain Engine

interface TeacherState {
  missions: PriorityMission[];
  currentSession: TeachingSession | null;
  stepIndex: number;
  flowSteps: FlowStep[];
}

interface TeacherActions {
  toggleMission: (id: string) => void;
  startTeachingSession: (session: TeachingSession) => boolean; // Return boolean status
  endTeachingSession: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setStepIndex: (index: number) => void;
}

type TeacherStore = TeacherState & TeacherActions;

export const useTeachingStore = create<TeacherStore>((set, get) => ({
  missions: [
    {
      id: 'm1',
      title: 'Siapkan Modul Ajar Matematika Kelas 4',
      category: 'teaching',
      deadline: 'Hari ini',
      completed: false,
    },
    {
      id: 'm2',
      title: 'Input Nilai Formatif B. Indonesia',
      category: 'assessment',
      deadline: 'Besok',
      completed: true,
    },
  ],
  currentSession: null,

  stepIndex: 0,
  flowSteps: [
    { id: '1', title: 'Pembuka & Doa', description: 'Menyapa siswa dan berdoa bersama.' },
    { id: '2', title: 'Apersepsi Materi', description: 'Mengenalkan konsep dasar pelajaran.' },
    { id: '3', title: 'Kegiatan Inti', description: 'Diskusi kelompok dan pemahaman konsep.' },
    { id: '4', title: 'Penutup & Refleksi', description: 'Menyimpulkan pembelajaran hari ini.' },
  ],

  toggleMission: (id) =>
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      ),
    })),

  startTeachingSession: (session) => {
    // Memakai validasi murni dari TeachingEngine
    const isValid = TeachingEngine.validateSessionStart(session);
    if (!isValid) {
      console.warn('[TeachingEngine] Gagal memulai sesi: Data sesi tidak valid.');
      return false;
    }

    set({ currentSession: session, stepIndex: 0 });
    return true;
  },

  endTeachingSession: () => set({ currentSession: null, stepIndex: 0 }),

  nextStep: () =>
    set((state) => ({
      stepIndex: Math.min(state.stepIndex + 1, state.flowSteps.length - 1),
    })),

  prevStep: () =>
    set((state) => ({
      stepIndex: Math.max(state.stepIndex - 1, 0),
    })),

  setStepIndex: (index) =>
    set((state) => ({
      stepIndex: Math.max(0, Math.min(index, state.flowSteps.length - 1)),
    })),
}));