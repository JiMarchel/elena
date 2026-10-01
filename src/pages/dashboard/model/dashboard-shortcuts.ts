import type { LucideIcon } from 'lucide-react'
import {
  GiftIcon,
  HandCoinsIcon,
  NetworkIcon,
  Share2Icon,
  ShoppingBagIcon,
  SparklesIcon,
  StoreIcon,
  TicketIcon,
  WalletIcon,
} from 'lucide-react'

import type { AppRoutePath } from '@/shared/config/app-routes'

export type DashboardShortcut = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  url: AppRoutePath
  badge?: string
}

/** Shortcut beranda — selaras dengan grup navigasi sidebar. */
export const dashboardShortcuts: DashboardShortcut[] = [
  {
    id: 'shop',
    title: 'Belanja',
    description: 'Katalog parfum',
    icon: StoreIcon,
    url: '/shop',
  },
  {
    id: 'network',
    title: 'Jaringan',
    description: 'Binary tree downline',
    icon: NetworkIcon,
    url: '/network',
  },
  {
    id: 'referral',
    title: 'Referral',
    description: 'Referral Center',
    icon: Share2Icon,
    url: '/network/referral',
  },
  {
    id: 'earnings',
    title: 'Bonus',
    description: 'Bonus Center',
    icon: HandCoinsIcon,
    url: '/earnings',
  },
  {
    id: 'pairing',
    title: 'Pairing',
    description: 'PV kiri & kanan',
    icon: SparklesIcon,
    url: '/earnings/pairing',
  },
  {
    id: 'income',
    title: 'Dompet',
    description: 'Saldo & riwayat',
    icon: WalletIcon,
    url: '/wallet',
  },
  {
    id: 'orders',
    title: 'Pesanan',
    description: 'Status belanja',
    icon: ShoppingBagIcon,
    url: '/orders',
  },
  {
    id: 'voucher',
    title: 'Voucher',
    description: 'Promo aktif',
    icon: TicketIcon,
    url: '/vouchers',
  },
  {
    id: 'rewards',
    title: 'Hadiah',
    description: 'Milestone reward',
    icon: GiftIcon,
    url: '/earnings/rewards',
  },
]
