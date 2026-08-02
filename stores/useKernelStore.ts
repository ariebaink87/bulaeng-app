import { create } from 'zustand';

export type ScreenState = 'mission-control' | 'ai-home' | 'teaching-mode';

interface KernelStore {
  screenState: ScreenState;
  setScreenState: (screen: ScreenState) => void;
}

export const useKernelStore = create<KernelStore>((set) => ({
  screenState: 'mission-control',
  setScreenState: (screen) => set({ screenState: screen }),
}));