import type { LucideIcon } from 'lucide-react'
import {
  CrownIcon,
  ShirtIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StoreIcon,
} from 'lucide-react'

export type VoucherTab = 'all' | 'enela' | 'vip' | 'store'

export type VoucherCategory =
  | 'all'
  | 'fashion'
  | 'store'
  | 'new-member'
  | 'vip'

export type VoucherStatus = 'active' | 'scheduled'

export type Voucher = {
  id: string
  tab: Exclude<VoucherTab, 'all'>
  category: VoucherCategory
  categoryLabel: string
  icon: LucideIcon
  title: string
  minSpend: number
  maxDiscount?: number
  paymentMethods?: string[]
  expiresIn: string
  isNew: boolean
  isLimited?: boolean
  status: VoucherStatus
}

export const voucherTabs: {
  id: VoucherTab
  label: string
  count: number
  hasDot?: boolean
}[] = [
  { id: 'all', label: 'Semua', count: 12, hasDot: true },
  { id: 'enela', label: 'Enela', count: 5 },
  { id: 'vip', label: 'EnelaVIP', count: 4, hasDot: true },
  { id: 'store', label: 'Toko', count: 3 },
]

export const vouchers: Voucher[] = [
  {
    id: 'v1',
    tab: 'enela',
    category: 'all',
    categoryLabel: 'SEMUA KATEGORI',
    icon: ShoppingBagIcon,
    title: 'Diskon 5% s.d. Rp100RB',
    minSpend: 30000,
    maxDiscount: 100000,
    expiresIn: 'sisa: 15 jam',
    isNew: true,
    status: 'active',
  },
  {
    id: 'v2',
    tab: 'enela',
    category: 'fashion',
    categoryLabel: 'FASHION',
    icon: ShirtIcon,
    title: 'Diskon 7% s.d. Rp500RB',
    minSpend: 150000,
    maxDiscount: 500000,
    paymentMethods: ['EnelaPay / QRIS'],
    expiresIn: 'Berlaku dalam: 1 hari',
    isNew: true,
    isLimited: true,
    status: 'scheduled',
  },
  {
    id: 'v3',
    tab: 'store',
    category: 'store',
    categoryLabel: 'TOKO PILIHAN',
    icon: StoreIcon,
    title: 'Diskon 4% s.d. Rp100RB',
    minSpend: 50000,
    maxDiscount: 100000,
    expiresIn: 'sisa: 2 hari',
    isNew: true,
    status: 'active',
  },
  {
    id: 'v4',
    tab: 'vip',
    category: 'vip',
    categoryLabel: 'VIP MEMBER',
    icon: CrownIcon,
    title: 'Diskon 10% s.d. Rp250RB',
    minSpend: 200000,
    maxDiscount: 250000,
    expiresIn: 'sisa: 5 hari',
    isNew: false,
    status: 'active',
  },
  {
    id: 'v5',
    tab: 'enela',
    category: 'new-member',
    categoryLabel: 'MEMBER BARU',
    icon: SparklesIcon,
    title: 'Diskon 15% s.d. Rp75RB',
    minSpend: 100000,
    maxDiscount: 75000,
    expiresIn: 'Berlaku dalam: 3 hari',
    isNew: true,
    isLimited: true,
    status: 'scheduled',
  },
  {
    id: 'v6',
    tab: 'store',
    category: 'store',
    categoryLabel: 'ENELA SIGNATURE',
    icon: StoreIcon,
    title: 'Gratis Ongkir s.d. Rp20RB',
    minSpend: 75000,
    maxDiscount: 20000,
    paymentMethods: ['Transfer / E-Wallet'],
    expiresIn: 'sisa: 6 jam',
    isNew: false,
    status: 'active',
  },
]

export function filterVouchers(tab: VoucherTab) {
  if (tab === 'all') return vouchers
  return vouchers.filter((voucher) => voucher.tab === tab)
}

export function formatMinSpend(value: number) {
  if (value >= 1000) {
    const rb = value / 1000
    return `Min. Blj Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1).replace('.', ',')}RB`
  }
  return `Min. Blj Rp${value.toLocaleString('id-ID')}`
}
