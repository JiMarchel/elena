import { getDefaultProfile } from './profile'
import type { UserProfile } from './profile'

const STORAGE_KEY = 'enela.user.profile'

export function readUserProfile(): UserProfile {
  if (typeof localStorage === 'undefined') return getDefaultProfile()

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultProfile()
    return { ...getDefaultProfile(), ...JSON.parse(raw) } as UserProfile
  } catch {
    return getDefaultProfile()
  }
}

export function writeUserProfile(profile: UserProfile) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function updateUserProfile(patch: Partial<UserProfile>) {
  const next = { ...readUserProfile(), ...patch }
  writeUserProfile(next)
  return next
}
