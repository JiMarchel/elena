import { InfoIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge } from '@/shared/ui'

import type { PaymentBreakdown } from '../model/checkout'

function BreakdownRow({
  label,
  value,
  negative = false,
  badge,
}: {
  label: string
  value: number
  negative?: boolean
  badge?: string
}) {
  if (value === 0 && !negative) return null

  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
        {label}
        {badge && (
          <Badge variant="outline" className="px-1 py-0 text-[10px]">
            {badge}
          </Badge>
        )}
      </span>
      <span
        className={`shrink-0 tabular-nums ${
          negative ? 'text-destructive' : 'text-foreground'
        }`}
      >
        {negative ? '-' : ''}
        {formatIDR(value)}
      </span>
    </div>
  )
}

export function CheckoutPaymentDetails({
  breakdown,
}: {
  breakdown: PaymentBreakdown
}) {
  return (
    <section className="bg-card px-3 py-4 ring-1 ring-foreground/10 sm:px-4 lg:rounded-xl">
      <h2 className="mb-3 text-sm font-medium">Rincian Pembayaran</h2>
      <div className="flex flex-col gap-2.5">
        <BreakdownRow label="Subtotal Pesanan" value={breakdown.orderSubtotal} />
        {breakdown.productProtection > 0 && (
          <BreakdownRow
            label="Total Proteksi Produk"
            value={breakdown.productProtection}
          />
        )}
        <BreakdownRow
          label="Subtotal Pengiriman"
          value={breakdown.shippingSubtotal}
        />
        <BreakdownRow
          label="Biaya Layanan"
          value={breakdown.serviceFee}
        />
        {breakdown.productDiscount > 0 && (
          <BreakdownRow
            label="Diskon Produk"
            value={breakdown.productDiscount}
            negative
          />
        )}
        {breakdown.shippingDiscount > 0 && (
          <BreakdownRow
            label="Total Diskon Pengiriman"
            value={breakdown.shippingDiscount}
            negative
            badge="VIP"
          />
        )}
        {breakdown.voucherDiscount > 0 && (
          <BreakdownRow
            label="Voucher Diskon"
            value={breakdown.voucherDiscount}
            negative
            badge="VIP"
          />
        )}
        {breakdown.paymentDiscount > 0 && (
          <BreakdownRow
            label="Diskon Pembayaran"
            value={breakdown.paymentDiscount}
            negative
          />
        )}
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-sm font-medium">Total Pembayaran</span>
        <span className="text-lg font-semibold text-primary tabular-nums">
          {formatIDR(breakdown.total)}
        </span>
      </div>
    </section>
  )
}

export function CheckoutTerms() {
  return (
    <p className="px-1 text-xs leading-relaxed text-muted-foreground">
      Dengan klik &quot;Buat Pesanan&quot;, kamu menyetujui{' '}
      <button type="button" className="text-primary">
        Syarat & Ketentuan
      </button>{' '}
      dan{' '}
      <button type="button" className="text-primary">
        Kebijakan Privasi
      </button>{' '}
      Enela.
      <InfoIcon className="ml-1 inline size-3 align-text-bottom" />
    </p>
  )
}
