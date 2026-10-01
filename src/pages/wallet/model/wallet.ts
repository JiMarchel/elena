export type WalletIncomeSource = 'deposit' | 'sales' | 'referral'

export type WalletTransactionType =
  | 'deposit'
  | 'withdraw'
  | 'transfer_in'
  | 'transfer_out'
  | 'sales_commission'
  | 'referral_commission'
  | 'payment'

export type WalletTransactionStatus = 'success' | 'pending' | 'failed'

export type WalletTransaction = {
  id: string
  type: WalletTransactionType
  direction: 'in' | 'out'
  title: string
  subtitle?: string
  amount: number
  createdAt: string
  status: WalletTransactionStatus
  source?: WalletIncomeSource
}

export type WalletBalanceBreakdown = {
  total: number
  deposit: number
  salesCommission: number
  referralCommission: number
  pendingWithdraw: number
}

export type WalletSnapshot = {
  walletId: string
  ownerName: string
  balance: WalletBalanceBreakdown
}

export type WalletHistoryTab = 'all' | 'in' | 'out'

export const walletHistoryTabs: { id: WalletHistoryTab; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'in', label: 'Masuk' },
  { id: 'out', label: 'Keluar' },
]

export const walletIncomeSources: {
  id: WalletIncomeSource
  label: string
  description: string
}[] = [
  {
    id: 'deposit',
    label: 'Deposit',
    description: 'Top up saldo ke dompet Enela',
  },
  {
    id: 'sales',
    label: 'Komisi Penjualan',
    description: 'Pendapatan dari penjualan produk',
  },
  {
    id: 'referral',
    label: 'Komisi Referral',
    description: 'Bonus dari jaringan downline',
  },
]

/** Dummy wallet — ganti dengan API saat backend siap. */
export const demoWalletSnapshot: WalletSnapshot = {
  walletId: 'ENELA-882910',
  ownerName: 'SAPUTRA',
  balance: {
    total: 1_783_000,
    deposit: 950_000,
    salesCommission: 533_000,
    referralCommission: 300_000,
    pendingWithdraw: 0,
  },
}

const demoTransactions: WalletTransaction[] = [
  {
    id: 'tx-1',
    type: 'referral_commission',
    direction: 'in',
    title: 'Komisi Referral',
    subtitle: 'Dari downline: Budi Santoso',
    amount: 45_000,
    createdAt: '29 Sep 2026, 09:14',
    status: 'success',
    source: 'referral',
  },
  {
    id: 'tx-2',
    type: 'sales_commission',
    direction: 'in',
    title: 'Komisi Penjualan',
    subtitle: 'Pesanan ENL-20260928-412',
    amount: 128_000,
    createdAt: '28 Sep 2026, 20:32',
    status: 'success',
    source: 'sales',
  },
  {
    id: 'tx-3',
    type: 'transfer_out',
    direction: 'out',
    title: 'Kirim ke Teman',
    subtitle: 'Ke: @ratna_enela',
    amount: 75_000,
    createdAt: '28 Sep 2026, 14:05',
    status: 'success',
  },
  {
    id: 'tx-4',
    type: 'deposit',
    direction: 'in',
    title: 'Top Up Saldo',
    subtitle: 'Transfer Bank · BCA',
    amount: 500_000,
    createdAt: '27 Sep 2026, 11:20',
    status: 'success',
    source: 'deposit',
  },
  {
    id: 'tx-5',
    type: 'withdraw',
    direction: 'out',
    title: 'Tarik Saldo',
    subtitle: 'Ke rekening BCA ****4521',
    amount: 200_000,
    createdAt: '26 Sep 2026, 16:48',
    status: 'success',
  },
  {
    id: 'tx-6',
    type: 'transfer_in',
    direction: 'in',
    title: 'Terima dari Teman',
    subtitle: 'Dari: @toni_marketing',
    amount: 50_000,
    createdAt: '25 Sep 2026, 08:30',
    status: 'success',
  },
  {
    id: 'tx-7',
    type: 'payment',
    direction: 'out',
    title: 'Pembayaran Pesanan',
    subtitle: 'Checkout · Enela Signature',
    amount: 189_000,
    createdAt: '24 Sep 2026, 19:12',
    status: 'success',
  },
  {
    id: 'tx-8',
    type: 'withdraw',
    direction: 'out',
    title: 'Tarik Saldo',
    subtitle: 'Ke rekening Mandiri ****8832',
    amount: 150_000,
    createdAt: '23 Sep 2026, 10:00',
    status: 'pending',
  },
]

export function getWalletSnapshot(): WalletSnapshot {
  return demoWalletSnapshot
}

export function getWalletTransactions(): WalletTransaction[] {
  return demoTransactions
}

export function filterWalletTransactions(
  tab: WalletHistoryTab,
): WalletTransaction[] {
  const list = getWalletTransactions()
  if (tab === 'in') return list.filter((tx) => tx.direction === 'in')
  if (tab === 'out') return list.filter((tx) => tx.direction === 'out')
  return list
}

export function getSourceAmount(
  balance: WalletBalanceBreakdown,
  source: WalletIncomeSource,
) {
  if (source === 'deposit') return balance.deposit
  if (source === 'sales') return balance.salesCommission
  return balance.referralCommission
}

export function validateWalletSearch(
  search: Record<string, unknown>,
): { tab?: WalletHistoryTab } {
  const tab = search.tab
  if (tab === 'in' || tab === 'out') return { tab }
  return {}
}
