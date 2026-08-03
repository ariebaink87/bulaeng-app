import { create } from 'zustand';
import { Episode, Scene } from '../types/content';

interface SessionState {
  isLiveSession: boolean;
  episode: Episode | null;
  currentSceneIndex: number;
  
  // Actions
  startSession: (episode: Episode) => void;
  endSession: () => void;
  nextScene: () => void;
  prevScene: () => void;
  jumpToScene: (index: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isLiveSession: false,
  episode: null,
  currentSceneIndex: 0,

  startSession: (episode: Episode) =>
    set({
      isLiveSession: true,
      episode,
      currentSceneIndex: 0,
    }),

  endSession: () =>
    set({
      isLiveSession: false,
      episode: null,
      currentSceneIndex: 0,
    }),

  nextScene: () =>
    set((state) => {
      if (!state.episode) return state;
      const maxIndex = state.episode.scenes.length - 1;
      return {
        currentSceneIndex: Math.min(state.currentSceneIndex + 1, maxIndex),
      };
    }),

  prevScene: () =>
    set((state) => ({
      currentSceneIndex: Math.max(state.currentSceneIndex - 1, 0),
    })),

  jumpToScene: (index: number) =>
    set((state) => {
      if (!state.episode) return state;
      const validIndex = Math.max(0, Math.min(index, state.episode.scenes.length - 1));
      return { currentSceneIndex: validIndex };
    }),
}));