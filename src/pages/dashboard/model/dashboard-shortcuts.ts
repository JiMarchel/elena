import type { LucideIcon } from 'lucide-react'
import {
  ChartBarIcon,
  CoinsIcon,
  GiftIcon,
  NetworkIcon,
  Share2Icon,
  ShoppingBagIcon,
  TicketIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'

export type DashboardShortcut = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  /** Route nyata atau '#' kalau belum ada halaman. */
  url: string
  badge?: string
}

export const dashboardShortcuts: DashboardShortcut[] = [
  {
    id: 'stats',
    title: 'Statistik',
    description: 'Ringkasan performa Anda',
    icon: ChartBarIcon,
    url: '#',
  },
  {
    id: 'network',
    title: 'Jaringan',
    description: 'Downline & referral',
    icon: NetworkIcon,
    url: '/network',
  },
  {
    id: 'points',
    title: 'Poin',
    description: 'Tukar reward Enela',
    icon: CoinsIcon,
    url: '#',
    badge: 'Baru',
  },
  {
    id: 'analytics',
    title: 'Analitik',
    description: 'Trend penjualan',
    icon: TrendingUpIcon,
    url: '#',
  },
  {
    id: 'income',
    title: 'Pendapatan',
    description: 'Komisi marketing',
    icon: WalletIcon,
    url: '#',
  },
  {
    id: 'referral',
    title: 'Referral',
    description: 'Bagikan kode Anda',
    icon: Share2Icon,
    url: '#',
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
    description: 'Mission & bonus',
    icon: GiftIcon,
    url: '#',
  },
]
