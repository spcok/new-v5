import { create } from 'zustand';

export interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  userInitials: string | null;
  login: (userName: string, userInitials: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userName: null,
  userInitials: null,
  login: (userName: string, userInitials: string) => set({ isAuthenticated: true, userName, userInitials }),
  logout: () => set({ isAuthenticated: false, userName: null, userInitials: null }),
}));
