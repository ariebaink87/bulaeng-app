import { create } from 'zustand';
import { KernelState, ScreenState, UserSession } from '@/types/kernel';
import { KernelBoot } from '@/core/kernel/KernelBoot';

interface KernelActions {
  boot: () => Promise<void>;
  setScreen: (screen: ScreenState) => void;
  setUser: (user: UserSession | null) => void;
  setOfflineStatus: (isOffline: boolean) => void;
}

type KernelStore = KernelState & KernelActions;

export const useKernelStore = create<KernelStore>((set) => ({
  isBooted: false,
  isOffline: false,
  activeScreen: 'mission-control',
  currentUser: null,
  activeWorkspaceId: null,

  boot: async () => {
    const initialState = await KernelBoot.bootSystem();
    set({ ...initialState });
  },

  setScreen: (screen) => set({ activeScreen: screen }),
  setUser: (user) => set({ currentUser: user }),
  setOfflineStatus: (isOffline) => set({ isOffline }),
}));