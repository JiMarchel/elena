import { CheckIcon, CrownIcon, ZapIcon } from 'lucide-react'
import { cn } from 'cn'

import { Badge } from '@/shared/ui'

import {
  formatPlatformMinSpend,
  isPlatformVoucherUsable,
} from '../model/platform-voucher'
import type { PlatformVoucher } from '../model/platform-voucher'

export function PlatformVoucherCard({
  voucher,
  selected,
  orderSubtotal,
  verified = true,
  onSelect,
  onDeselect,
}: {
  voucher: PlatformVoucher
  selected: boolean
  orderSubtotal: number
  verified?: boolean
  onSelect: () => void
  onDeselect: () => void
}) {
  const usable = isPlatformVoucherUsable(voucher, orderSubtotal, verified)
  const needsVerify = voucher.verifiedOnly && !verified
  const belowMin = orderSubtotal < voucher.minSpend
  const disabled = !usable

  const handleClick = () => {
    if (disabled) return
    if (selected) onDeselect()
    else onSelect()
  }

  const stubClass =
    voucher.kind === 'shipping'
      ? 'bg-teal-600 text-white'
      : 'bg-red-500 text-white'

  const Icon = voucher.icon

  return (
    <li
      className={cn(
        'relative overflow-hidden rounded-lg border bg-card',
        selected && usable && 'border-primary ring-1 ring-primary/30',
        !selected && 'border-border',
        disabled && 'opacity-60',
      )}
    >
      {voucher.recommended && usable && (
        <span className="absolute top-0 right-0 z-10 rounded-bl-lg bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          Rekomendasi
        </span>
      )}

      <div className="flex min-h-[7.5rem]">
        <div
          className={cn(
            'relative flex w-24 shrink-0 flex-col items-center justify-between px-2 py-3 sm:w-28',
            stubClass,
          )}
        >
          <div className="flex flex-col items-center gap-1.5 pt-1">
            {voucher.kind === 'shipping' ? (
              <CrownIcon className="size-7" strokeWidth={1.5} />
            ) : (
              <Icon className="size-7" strokeWidth={1.5} />
            )}
            <span className="text-center text-[10px] font-semibold tracking-wide">
              {voucher.kind === 'shipping' ? 'VIP' : 'PROMO'}
            </span>
          </div>
          <span className="text-center text-[9px] leading-tight font-medium tracking-wide uppercase">
            {voucher.categoryLabel}
          </span>
          <div
            aria-hidden
            className="absolute top-2 -right-1.5 bottom-2 w-3 bg-[radial-gradient(circle,transparent_55%,var(--card)_56%)] bg-size-[6px_10px] bg-position-[0_0]"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-stretch">
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            className={cn(
              'flex min-w-0 flex-1 flex-col gap-1.5 p-3 text-left sm:p-4',
              usable && 'cursor-pointer',
            )}
          >
            {voucher.isLimited && (
              <Badge variant="destructive" className="w-fit gap-1 font-normal">
                <ZapIcon className="size-3" />
                Terbatas
              </Badge>
            )}
            <h3 className="text-sm font-medium leading-snug">{voucher.title}</h3>
            <p className="text-xs text-muted-foreground">
              {formatPlatformMinSpend(voucher.minSpend)}
            </p>
            {voucher.badges && (
              <div className="flex flex-wrap gap-1">
                {voucher.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="outline"
                    className="font-normal text-xs"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            {voucher.isLimited && voucher.progress !== undefined && (
              <div className="mt-1 max-w-[12rem]">
                <div className="h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${voucher.progress}%` }}
                  />
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Sisa {voucher.progress}% voucher
                </p>
              </div>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-0.5">
              <span className="text-xs text-muted-foreground">
                {voucher.expiresLabel}
              </span>
              <span className="text-xs text-primary">S&K</span>
            </div>
          </button>

          <div className="flex shrink-0 items-center pr-3 sm:pr-4">
            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
              aria-label={selected ? 'Batalkan pilihan voucher' : 'Pilih voucher'}
              className={cn(
                'flex size-5 items-center justify-center rounded-full border-2 transition-colors',
                selected && usable
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/40 bg-background',
                usable && 'cursor-pointer',
              )}
            >
              {selected && usable && <CheckIcon className="size-3" strokeWidth={3} />}
            </button>
          </div>
        </div>
      </div>

      {needsVerify && (
        <div className="border-t bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          Verifikasi akun Anda untuk klaim voucher ini.{' '}
          <button type="button" className="text-primary">
            Verifikasi sekarang
          </button>
        </div>
      )}

      {belowMin && !needsVerify && (
        <div className="border-t bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          Belum memenuhi minimum belanja untuk voucher ini.
        </div>
      )}
    </li>
  )
}
