export type ScreenState = 'mission-control' | 'ai-home' | 'teaching-player' | 'settings';

export type UserRole = 'teacher' | 'parent' | 'headmaster' | 'admin';

export interface UserSession {
  id: string;
  name: string;
  role: UserRole;
  schoolId: string;
  avatarUrl?: string;
}

export interface KernelState {
  isBooted: boolean;
  isOffline: boolean;
  activeScreen: ScreenState;
  currentUser: UserSession | null;
  activeWorkspaceId: string | null;
}