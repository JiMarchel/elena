export type AuthUser = {
  id: string
  name: string
  email: string
}

export type AuthSession = {
  user: AuthUser
  token: string
}

export const AUTH_STORAGE_KEY = 'enela.auth.session'
