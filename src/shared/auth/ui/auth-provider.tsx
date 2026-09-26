import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'

import type { AuthSession, AuthUser } from '../model/session'
import { readSession, writeSession } from '../lib/auth-storage'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readSession())

  const login = useCallback(async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) return false

    // ponytail: ganti dengan API auth saat backend siap.
    const next: AuthSession = {
      user: {
        id: 'demo-user',
        name: email.split('@')[0] ?? 'Member Enela',
        email: email.trim(),
      },
      token: `demo-${Date.now()}`,
    }
    writeSession(next)
    setSession(next)
    return true
  }, [])

  const logout = useCallback(() => {
    writeSession(null)
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: session !== null,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider')
  }
  return ctx
}
