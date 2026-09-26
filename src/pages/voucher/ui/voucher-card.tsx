import { ZapIcon } from 'lucide-react'
import { cn } from 'cn'

import { Badge, Button } from '@/shared/ui'

import { formatMinSpend } from '../model/voucher'
import type { Voucher } from '../model/voucher'

export function VoucherCard({
  voucher,
  onUse,
}: {
  voucher: Voucher
  onUse: (id: string) => void
}) {
  const Icon = voucher.icon
  const actionLabel = voucher.status === 'active' ? 'Pakai' : 'Pakai Nanti'

  return (
    <article className="relative flex overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      {voucher.isNew && (
        <span className="absolute top-0 right-0 z-10 rounded-bl-lg bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          Baru
        </span>
      )}

      {/* Stub kiri — gaya kupon */}
      <div className="relative flex w-[5.5rem] shrink-0 flex-col items-center justify-between bg-primary px-2 py-3 text-primary-foreground sm:w-28">
        <div className="flex flex-col items-center gap-2 pt-1">
          <Icon className="size-7 sm:size-8" strokeWidth={1.5} />
          <span className="text-center text-[10px] leading-tight font-semibold tracking-wide sm:text-xs">
            PROMO XTRA
          </span>
        </div>
        <span className="text-center text-[9px] leading-tight font-medium tracking-wide uppercase sm:text-[10px]">
          {voucher.categoryLabel}
        </span>
        <div
          aria-hidden
          className="absolute top-2 -right-1.5 bottom-2 w-3 bg-[radial-gradient(circle,transparent_55%,var(--card)_56%)] bg-size-[6px_10px] bg-position-[0_0]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {voucher.isLimited && (
            <Badge variant="destructive" className="w-fit gap-1 font-normal">
              <ZapIcon className="size-3" />
              Terbatas
            </Badge>
          )}
          <h3 className="text-sm font-medium leading-snug sm:text-base">
            {voucher.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatMinSpend(voucher.minSpend)}
          </p>
          {voucher.paymentMethods && (
            <div className="flex flex-wrap gap-1">
              {voucher.paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant="outline"
                  className="font-normal text-destructive"
                >
                  {method}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className="text-xs text-muted-foreground">
              {voucher.expiresIn}
            </span>
            <button
              type="button"
              className="text-xs text-primary underline-offset-2 hover:underline"
            >
              S&K
            </button>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            'shrink-0 border-primary text-primary hover:bg-primary/5',
            voucher.status === 'scheduled' && 'opacity-80',
          )}
          onClick={() => onUse(voucher.id)}
        >
          {actionLabel}
        </Button>
      </div>
    </article>
  )
}
