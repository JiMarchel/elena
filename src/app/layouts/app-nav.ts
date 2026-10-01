import type { LucideIcon } from 'lucide-react'
import {
  ArrowDownToLineIcon,
  GiftIcon,
  HandCoinsIcon,
  LayoutDashboardIcon,
  NetworkIcon,
  Share2Icon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
  SparklesIcon,
  TicketIcon,
  TreePineIcon,
  UsersIcon,
  WalletIcon,
} from 'lucide-react'

import type { AppRoutePath } from '@/shared/config/app-routes'

export type { AppRoutePath }

export type AppNavItem = {
  title: string
  url: AppRoutePath
  icon: LucideIcon
  badge?: string
}

export type AppNavGroup = {
  id: string
  label: string
  items: AppNavItem[]
}

/** Satu sumber navigasi sidebar — struktur Belanja / Jaringan / Penghasilan. */
export const appNavGroups: AppNavGroup[] = [
  {
    id: 'home',
    label: 'Utama',
    items: [
      { title: 'Beranda', url: '/', icon: LayoutDashboardIcon },
    ],
  },
  {
    id: 'shop',
    label: 'Belanja',
    items: [
      { title: 'Produk', url: '/shop', icon: StoreIcon },
      { title: 'Keranjang', url: '/cart', icon: ShoppingCartIcon },
      { title: 'Pesanan Saya', url: '/orders', icon: ShoppingBagIcon },
      { title: 'Voucher Saya', url: '/vouchers', icon: TicketIcon },
    ],
  },
  {
    id: 'network',
    label: 'Jaringan Saya',
    items: [
      { title: 'Binary Tree', url: '/network', icon: NetworkIcon },
      { title: 'Genealogy', url: '/network/genealogy', icon: TreePineIcon },
      { title: 'Referral Center', url: '/network/referral', icon: Share2Icon },
    ],
  },
  {
    id: 'earnings',
    label: 'Penghasilan Saya',
    items: [
      { title: 'Bonus Center', url: '/earnings', icon: HandCoinsIcon },
      { title: 'Bonus Pairing', url: '/earnings/pairing', icon: SparklesIcon },
      { title: 'Bonus Sponsor', url: '/earnings/sponsor', icon: UsersIcon },
      { title: 'Hadiah', url: '/earnings/rewards', icon: GiftIcon },
      { title: 'Enela Wallet', url: '/wallet', icon: WalletIcon },
      { title: 'Pencairan', url: '/wallet/withdraw', icon: ArrowDownToLineIcon },
    ],
  },
]

export const appNavRoutes: AppRoutePath[] = appNavGroups.flatMap((group) =>
  group.items.map((item) => item.url),
)

export function isAppRoutePath(url: string): url is AppRoutePath {
  return (appNavRoutes as string[]).includes(url)
}

export function isNavActive(pathname: string, url: AppRoutePath) {
  if (url === '/') return pathname === '/'
  return pathname === url || pathname.startsWith(`${url}/`)
}
