import type { ReactNode } from 'react'
import { MapPinIcon, PackageIcon, TruckIcon, WalletIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui'

import type { PaymentBreakdown, ShippingAddress } from '../model/checkout'

type CheckoutConfirmSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  address: ShippingAddress
  breakdown: PaymentBreakdown
  itemCount: number
  shippingLabel: string
  shippingEstimate: string
  paymentLabel: string
  isSubmitting: boolean
  onConfirm: () => void
}

export function CheckoutConfirmSheet({
  open,
  onOpenChange,
  address,
  breakdown,
  itemCount,
  shippingLabel,
  shippingEstimate,
  paymentLabel,
  isSubmitting,
  onConfirm,
}: CheckoutConfirmSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[90vh] flex-col gap-0 p-0 lg:mx-auto lg:max-h-[85vh] lg:max-w-lg lg:rounded-t-xl"
      >
        <SheetHeader className="border-b px-4 py-4 text-left">
          <SheetTitle>Konfirmasi Pesanan</SheetTitle>
          <SheetDescription>
            Pastikan alamat, metode pembayaran, dan total pesanan sudah benar
            sebelum melanjutkan.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <ConfirmRow
              icon={MapPinIcon}
              label="Alamat Pengiriman"
              value={
                <>
                  <span className="font-medium">{address.name}</span>
                  <span className="block text-muted-foreground">
                    {address.line1}, {address.line2}
                  </span>
                </>
              }
            />

            <ConfirmRow
              icon={PackageIcon}
              label="Produk"
              value={`${itemCount} item · ${formatIDR(breakdown.orderSubtotal)}`}
            />

            <ConfirmRow
              icon={TruckIcon}
              label="Pengiriman"
              value={
                <>
                  <span>{shippingLabel}</span>
                  <span className="block text-muted-foreground">
                    Estimasi tiba {shippingEstimate.toLowerCase()}
                  </span>
                </>
              }
            />

            <ConfirmRow
              icon={WalletIcon}
              label="Metode Pembayaran"
              value={paymentLabel}
            />

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Pembayaran</span>
              <span className="text-lg font-semibold text-primary tabular-nums">
                {formatIDR(breakdown.total)}
              </span>
            </div>

            {breakdown.saved > 0 && (
              <p className="text-xs text-destructive">
                Kamu hemat {formatIDR(breakdown.saved)} untuk pesanan ini.
              </p>
            )}
          </div>
        </div>

        <SheetFooter className="border-t px-4 py-4 sm:flex-row">
          <Button
            variant="outline"
            className="w-full sm:flex-1"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
          >
            Periksa Lagi
          </Button>
          <Button
            className="w-full sm:flex-1"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            {isSubmitting ? 'Memproses…' : 'Ya, Buat Pesanan'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function ConfirmRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPinIcon
  label: string
  value: ReactNode
}) {
  return (
    <div className="flex gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm leading-relaxed">{value}</div>
      </div>
    </div>
  )
}
