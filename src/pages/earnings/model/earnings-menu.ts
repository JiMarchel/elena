import type { LucideIcon } from 'lucide-react'
import {
  GiftIcon,
  HistoryIcon,
  SparklesIcon,
  UsersIcon,
} from 'lucide-react'

import type { AppRoutePath } from '@/shared/config/app-routes'

export type EarningsMenuItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  to: AppRoutePath
}

export const earningsMenuItems: EarningsMenuItem[] = [
  {
    id: 'sponsor',
    title: 'Bonus Sponsor',
    description: 'Komisi penjualan langsung dari downline sponsor',
    icon: UsersIcon,
    to: '/earnings/sponsor',
  },
  {
    id: 'pairing',
    title: 'Pairing Dashboard',
    description: 'PV kiri/kanan, pair qualified, carry forward',
    icon: SparklesIcon,
    to: '/earnings/pairing',
  },
  {
    id: 'rewards',
    title: 'Bonus Reward',
    description: 'Pencapaian milestone untuk Distributor',
    icon: GiftIcon,
    to: '/earnings/rewards',
  },
  {
    id: 'history',
    title: 'Riwayat Bonus',
    description: 'Semua kredit bonus yang pernah diterima',
    icon: HistoryIcon,
    to: '/wallet',
  },
]
