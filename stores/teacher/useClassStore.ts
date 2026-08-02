import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Student {
  id: string;
  name: string;
  isPresent: boolean;
}

export interface ClassConfig {
  className: string;
  gradeLevel: string;
  activeTheme: string;
  students: Student[];
  isConfigured: boolean;
}

interface ClassState extends ClassConfig {
  // Actions
  setClassConfig: (config: Partial<ClassConfig>) => void;
  addStudent: (name: string) => void;
  removeStudent: (id: string) => void;
  toggleAttendance: (id: string) => void;
  loadDemoData: () => void;
  resetConfig: () => void;
}

const DEFAULT_DEMO_STUDENTS: Student[] = [
  { id: '1', name: 'Andi', isPresent: true },
  { id: '2', name: 'Budi', isPresent: true },
  { id: '3', name: 'Citra', isPresent: true },
  { id: '4', name: 'Dina', isPresent: true },
  { id: '5', name: 'Eko', isPresent: true },
  { id: '6', name: 'Fadil', isPresent: true },
  { id: '7', name: 'Gita', isPresent: true },
  { id: '8', name: 'Hana', isPresent: true },
];

export const useClassStore = create<ClassState>()(
  persist(
    (set) => ({
      className: '',
      gradeLevel: '',
      activeTheme: '',
      students: [],
      isConfigured: false,

      setClassConfig: (config) =>
        set((state) => ({ ...state, ...config, isConfigured: true })),

      addStudent: (name) =>
        set((state) => ({
          students: [
            ...state.students,
            { id: Date.now().toString(), name, isPresent: true },
          ],
        })),

      removeStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),

      toggleAttendance: (id) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, isPresent: !s.isPresent } : s
          ),
        })),

      loadDemoData: () =>
        set({
          className: 'Kelas B2',
          gradeLevel: 'PAUD / TK-B',
          activeTheme: 'Tanaman & Alam',
          students: DEFAULT_DEMO_STUDENTS,
          isConfigured: true,
        }),

      resetConfig: () =>
        set({
          className: '',
          gradeLevel: '',
          activeTheme: '',
          students: [],
          isConfigured: false,
        }),
    }),
    {
      name: 'bulaeng_class_data', // disimpan di localStorage
    }
  )
);