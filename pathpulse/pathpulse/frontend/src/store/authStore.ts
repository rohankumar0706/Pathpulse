import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id:         string
  username:   string
  email:      string
  fullName?:  string
  avatarUrl?: string
  bio?:       string
}

interface AuthState {
  user:            User | null
  accessToken:     string | null
  refreshToken:    string | null
  isAuthenticated: boolean
  setAuth:  (user: User, accessToken: string, refreshToken: string) => void
  clearAuth: () => void
  updateUser: (partial: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      accessToken:     null,
      refreshToken:    null,
      isAuthenticated: false,

      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),

      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
    }),
    { name: 'pathpulse-auth', partialize: (s) => ({
        user: s.user, accessToken: s.accessToken,
        refreshToken: s.refreshToken, isAuthenticated: s.isAuthenticated
    }) }
  )
)
