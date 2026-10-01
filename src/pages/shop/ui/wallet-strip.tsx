import { Link } from '@tanstack/react-router'
import { CoinsIcon, QrCodeIcon, SparklesIcon } from 'lucide-react'

import { useAuth } from '@/shared/auth'
import { formatIDR } from '@/shared/lib'
import { Button, Separator } from '@/shared/ui'

import type { WalletSnapshot } from '../model/shop-wallet'

export function WalletStrip({ wallet }: { wallet: WalletSnapshot }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <section className="min-w-0 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
        <div className="grid min-w-0 grid-cols-3 divide-x divide-border">
          {[
            { label: 'Saldo', icon: QrCodeIcon },
            { label: 'Klaim Koin', icon: CoinsIcon },
            { label: 'Poin Enela', icon: SparklesIcon },
          ].map((item) => (
            <div
              key={item.label}
              className="flex min-w-0 flex-col gap-1 px-2 py-2.5 sm:px-4 sm:py-3"
            >
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <item.icon className="size-3.5" />
                <span className="text-[11px] sm:text-xs">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground sm:text-base">
                ••••••
              </span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <p className="text-xs text-muted-foreground">
            Masuk untuk melihat saldo, koin, dan poin Anda.
          </p>
          <Button size="xs" variant="outline" render={<Link to="/login" />}>
            Masuk
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="min-w-0 overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="grid min-w-0 grid-cols-3 divide-x divide-border">
        <Link
          to="/wallet"
          className="flex min-w-0 flex-col gap-1 px-2 py-2.5 transition-colors hover:bg-muted/50 sm:px-4 sm:py-3"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <QrCodeIcon className="size-3.5" />
            <span className="text-[11px] sm:text-xs">Saldo</span>
          </div>
          <span className="truncate text-sm font-medium tabular-nums sm:text-base">
            {formatIDR(wallet.balance)}
          </span>
          <span className="text-[11px] text-primary">Lihat dompet</span>
        </Link>

        <button
          type="button"
          className="flex min-w-0 flex-col gap-1 px-2 py-2.5 text-left transition-colors hover:bg-muted/50 sm:px-4 sm:py-3"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CoinsIcon className="size-3.5 text-accent" />
            <span className="text-[11px] sm:text-xs">Klaim Koin</span>
          </div>
          <span className="truncate text-sm font-medium tabular-nums sm:text-base">
            {wallet.claimableCoins.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-primary">
            Hingga {wallet.claimableCoins.toLocaleString('id-ID')} koin
          </span>
        </button>

        <Link
          to="/vouchers"
          className="flex min-w-0 flex-col gap-1 px-2 py-2.5 transition-colors hover:bg-muted/50 sm:px-4 sm:py-3"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <SparklesIcon className="size-3.5" />
            <span className="text-[11px] sm:text-xs">Poin Enela</span>
          </div>
          <span className="truncate text-sm font-medium tabular-nums sm:text-base">
            {wallet.points.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-primary">Tukar reward</span>
        </Link>
      </div>
    </section>
  )
}
