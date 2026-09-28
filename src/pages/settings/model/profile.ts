export type Gender = 'male' | 'female' | 'other'

export type UserProfile = {
  name: string
  username: string
  bio: string
  gender: Gender
  birthDate: string
  phone: string
  email: string
  avatarUrl?: string
}

export const genderOptions: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Pria' },
  { value: 'female', label: 'Wanita' },
  { value: 'other', label: 'Lainnya' },
]

export function getGenderLabel(gender: Gender) {
  return genderOptions.find((option) => option.value === gender)?.label ?? 'Lainnya'
}

export function getDefaultProfile(): UserProfile {
  return {
    name: 'SAPUTRA',
    username: 'saputrabudi',
    bio: 'Pecinta parfum premium Enela. Kolektor fragrance unisex & woody notes.',
    gender: 'other',
    birthDate: '1999-05-15',
    phone: '6281803648285',
    email: 'saputra.budi@gmail.com',
    avatarUrl: undefined,
  }
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return phone
  return `${'*'.repeat(Math.max(0, digits.length - 2))}${digits.slice(-2)}`
}

export function maskEmail(email: string) {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const visible = local.slice(0, 1)
  return `${visible}${'*'.repeat(Math.max(3, local.length - 1))}@${domain}`
}

export function maskBirthDate(date: string) {
  const [, month, year] = date.split('-')
  if (!month || !year) return '**/**/****'
  return `**/${month}/${year}`
}

export function truncateBio(bio: string, max = 42) {
  if (bio.length <= max) return bio
  return `${bio.slice(0, max).trimEnd()}…`
}
