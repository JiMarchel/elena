import {
  ArrowDownLeftIcon,
  NetworkIcon,
  ShoppingBagIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'

import {
  getSourceAmount,
  walletIncomeSources,
} from '../model/wallet'
import type { WalletBalanceBreakdown, WalletIncomeSource } from '../model/wallet'

const sourceIcons: Record<WalletIncomeSource, LucideIcon> = {
  deposit: ArrowDownLeftIcon,
  sales: ShoppingBagIcon,
  referral: NetworkIcon,
}

export function WalletSourceCards({
  balance,
}: {
  balance: WalletBalanceBreakdown
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Sumber Saldo</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {walletIncomeSources.map((source) => {
          const Icon = sourceIcons[source.id]
          const amount = getSourceAmount(balance, source.id)

          return (
            <article
              key={source.id}
              className="rounded-xl bg-card p-4 ring-1 ring-foreground/10"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <p className="text-sm font-medium">{source.label}</p>
              </div>
              <p className="mt-3 text-lg font-semibold tabular-nums">
                {formatIDR(amount)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {source.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
