import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  ClockIcon,
  NetworkIcon,
  PlusIcon,
  ShoppingBagIcon,
  WalletIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from 'cn'

import { formatIDR } from '@/shared/lib'
import { Badge } from '@/shared/ui'

import type { WalletTransaction } from '../model/wallet'

const typeIcons: Record<WalletTransaction['type'], LucideIcon> = {
  deposit: PlusIcon,
  withdraw: ArrowUpRightIcon,
  transfer_in: ArrowDownLeftIcon,
  transfer_out: ArrowUpRightIcon,
  sales_commission: ShoppingBagIcon,
  referral_commission: NetworkIcon,
  payment: WalletIcon,
}

export function WalletTransactionList({
  transactions,
}: {
  transactions: WalletTransaction[]
}) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl bg-card px-6 py-12 text-center ring-1 ring-foreground/10">
        <ClockIcon className="size-8 text-muted-foreground" />
        <p className="font-medium">Belum ada riwayat transaksi</p>
        <p className="text-sm text-muted-foreground">
          Transaksi dompet Anda akan muncul di sini.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {transactions.map((tx) => (
        <WalletTransactionItem key={tx.id} transaction={tx} />
      ))}
    </ul>
  )
}

function WalletTransactionItem({
  transaction,
}: {
  transaction: WalletTransaction
}) {
  const Icon = typeIcons[transaction.type]
  const isIn = transaction.direction === 'in'

  return (
    <li className="flex items-center gap-3 rounded-xl bg-card px-3 py-3 ring-1 ring-foreground/10 sm:px-4">
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full',
          isIn ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground',
        )}
      >
        <Icon className="size-4" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-medium">{transaction.title}</p>
          <p
            className={cn(
              'shrink-0 text-sm font-medium tabular-nums',
              isIn ? 'text-emerald-600' : 'text-foreground',
            )}
          >
            {isIn ? '+' : '-'}
            {formatIDR(transaction.amount)}
          </p>
        </div>
        {transaction.subtitle && (
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {transaction.subtitle}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-muted-foreground">
            {transaction.createdAt}
          </span>
          {transaction.status === 'pending' && (
            <Badge variant="outline" className="text-[10px]">
              Menunggu
            </Badge>
          )}
          {transaction.status === 'failed' && (
            <Badge variant="destructive" className="text-[10px]">
              Gagal
            </Badge>
          )}
        </div>
      </div>
    </li>
  )
}
