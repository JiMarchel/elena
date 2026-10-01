import { useState } from 'react'
import { EyeIcon, EyeOffIcon, WalletIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Button } from '@/shared/ui'

import type { WalletBalanceBreakdown } from '../model/wallet'

export function WalletBalanceHero({
  ownerName,
  walletId,
  balance,
}: {
  ownerName: string
  walletId: string
  balance: WalletBalanceBreakdown
}) {
  const [visible, setVisible] = useState(true)

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary/90 to-emerald-700 p-5 text-primary-foreground shadow-lg sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-6 size-40 rounded-full bg-white/5"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/15">
            <WalletIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm text-primary-foreground/80">Enela Wallet</p>
            <p className="font-medium">{ownerName}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-primary-foreground hover:bg-white/10"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Sembunyikan saldo' : 'Tampilkan saldo'}
        >
          {visible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>

      <div className="relative mt-6">
        <p className="text-sm text-primary-foreground/80">Saldo Tersedia</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
          {visible ? formatIDR(balance.total) : 'Rp •••••••'}
        </p>
        {balance.pendingWithdraw > 0 && (
          <p className="mt-2 text-xs text-primary-foreground/75">
            {visible
              ? `${formatIDR(balance.pendingWithdraw)} menunggu pencairan`
              : 'Ada saldo menunggu pencairan'}
          </p>
        )}
      </div>

      <p className="relative mt-4 text-xs text-primary-foreground/70">
        ID Dompet: {walletId}
      </p>
    </section>
  )
}
