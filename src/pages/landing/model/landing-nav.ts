import type { AppRoutePath } from '@/shared/config/app-routes'

export type LandingNavItem = {
  label: string
  to: AppRoutePath | '/'
  hash?: string
}

/** Nav header landing — arahkan ke tab aplikasi yang sudah ada. */
export const landingNavItems: LandingNavItem[] = [
  { label: 'Beranda', to: '/' },
  { label: 'Produk', to: '/shop' },
  { label: 'Pesanan', to: '/orders' },
  { label: 'Penghasilan', to: '/earnings' },
  { label: 'Kontak', to: '/settings' },
]

export const landingFooterLinks: LandingNavItem[] = [
  { label: 'Produk', to: '/shop' },
  { label: 'Keranjang', to: '/cart' },
  { label: 'Jaringan', to: '/network' },
  { label: 'Wallet', to: '/wallet' },
  { label: 'Pengaturan', to: '/settings' },
]
