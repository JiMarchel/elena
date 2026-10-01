import type { AuthUser } from '@/shared/auth'

/** TODO(SEO): ganti saat domain produksi tersedia. */
export const REFERRAL_SITE_ORIGIN = 'https://enela.example'

export type ReferralProfile = {
  memberId: string
  username: string
  displayName: string
  code: string
  registerUrl: string
  landingUrl: string
  directReferrals: number
  totalInvites: number
}

export type ReferralShareChannel = {
  id: string
  label: string
  href: string
}

/** Dummy profil referral — ganti dengan API saat backend siap. */
export function getReferralProfile(user: AuthUser | null): ReferralProfile {
  const username = 'saputrabudi'
  const code = 'ANDI123'
  const registerPath = `/register?ref=${code}`

  return {
    memberId: 'ENL0001',
    username,
    displayName: (user?.name ?? 'Member Enela').toUpperCase(),
    code,
    registerUrl: `${REFERRAL_SITE_ORIGIN}${registerPath}`,
    landingUrl: `${REFERRAL_SITE_ORIGIN}/r/${username}`,
    directReferrals: 12,
    totalInvites: 48,
  }
}

export function buildReferralShareMessage(profile: ReferralProfile) {
  return `Halo! Gabung ENELA Affiliate Program lewat link referral saya. Daftar sekarang: ${profile.registerUrl}`
}

export function buildReferralShareLinks(
  profile: ReferralProfile,
): ReferralShareChannel[] {
  const message = buildReferralShareMessage(profile)
  const url = profile.registerUrl
  const encodedUrl = encodeURIComponent(url)
  const encodedMessage = encodeURIComponent(message)

  return [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedMessage}`,
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: 'x',
      label: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
    },
  ]
}

/** QR image via public API — ganti generator internal saat backend siap. */
export function buildReferralQrImageUrl(data: string, size = 240) {
  const params = new URLSearchParams({
    size: `${size}x${size}`,
    data,
    margin: '8',
  })
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`
}
