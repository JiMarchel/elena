import type { AuthSession } from '../model/session'
import { AUTH_STORAGE_KEY } from '../model/session'

export function readSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function writeSession(session: AuthSession | null) {
  if (typeof window === 'undefined') return
  if (!session) {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}
