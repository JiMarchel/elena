import { useEffect, useMemo, useState } from 'react'
import { CheckIcon, StoreIcon, XIcon } from 'lucide-react'

import { Button, Input, Sheet, SheetContent } from '@/shared/ui'

import {
  calcStoreVoucherDiscount,
  findStoreVoucherByCode,
  formatStoreMinSpend,
  formatStoreVoucherSaving,
  getStoreVouchers,
  isStoreVoucherUsable,
} from '../model/store-voucher'
import type { StoreVoucher } from '../model/store-voucher'

type CheckoutStoreVoucherSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  storeId: string
  storeName: string
  storeBadge?: string
  orderSubtotal: number
  selectedVoucherId: string | null
  claimedVoucherIds: Set<string>
  onConfirm: (voucherId: string | null, discount: number) => void
  onClaim: (voucherId: string) => void
}

export function CheckoutStoreVoucherSheet({
  open,
  onOpenChange,
  storeId,
  storeName,
  storeBadge,
  orderSubtotal,
  selectedVoucherId,
  claimedVoucherIds,
  onConfirm,
  onClaim,
}: CheckoutStoreVoucherSheetProps) {
  const vouchers = useMemo(() => getStoreVouchers(storeId), [storeId])
  const [pendingId, setPendingId] = useState<string | null>(selectedVoucherId)
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setPendingId(selectedVoucherId)
      setCode('')
      setCodeError(null)
    }
  }, [open, selectedVoucherId])

  const pendingDiscount = useMemo(() => {
    if (!pendingId) return 0
    const voucher = vouchers.find((entry) => entry.id === pendingId)
    if (!voucher) return 0
    if (!isStoreVoucherUsable(voucher, orderSubtotal, claimedVoucherIds)) {
      return 0
    }
    return calcStoreVoucherDiscount(voucher, orderSubtotal)
  }, [claimedVoucherIds, orderSubtotal, pendingId, vouchers])

  const handleApplyCode = () => {
    const voucher = findStoreVoucherByCode(storeId, code)
    if (!voucher) {
      setCodeError('Kode voucher tidak ditemukan.')
      return
    }

    onClaim(voucher.id)
    const nextClaimed = new Set(claimedVoucherIds)
    nextClaimed.add(voucher.id)
    if (isStoreVoucherUsable(voucher, orderSubtotal, nextClaimed)) {
      setPendingId(voucher.id)
    }
    setCodeError(null)
    setCode('')
  }

  const handleConfirm = () => {
    onConfirm(pendingId, pendingDiscount)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex max-h-[90vh] flex-col gap-0 p-0 lg:mx-auto lg:max-h-[85vh] lg:max-w-xl lg:rounded-t-xl"
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="min-w-0 flex-1 truncate pr-3 text-base font-medium">
            Voucher {storeName}
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onOpenChange(false)}
            aria-label="Tutup"
          >
            <XIcon />
          </Button>
        </div>

        <div className="border-b px-4 py-3">
          <div className="flex gap-2">
            <Input
              value={code}
              onChange={(event) => {
                setCode(event.target.value)
                setCodeError(null)
              }}
              placeholder="Masukkan Kode Voucher Toko"
              className="h-10 flex-1"
            />
            <Button
              variant="outline"
              className="shrink-0 px-4"
              disabled={!code.trim()}
              onClick={handleApplyCode}
            >
              Pakai
            </Button>
          </div>
          {codeError && (
            <p className="mt-1.5 text-xs text-destructive">{codeError}</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ul className="flex flex-col gap-3">
            {vouchers.map((voucher) => (
              <StoreVoucherCard
                key={voucher.id}
                voucher={voucher}
                storeBadge={storeBadge}
                selected={pendingId === voucher.id}
                claimedVoucherIds={claimedVoucherIds}
                orderSubtotal={orderSubtotal}
                onSelect={() => setPendingId(voucher.id)}
                onDeselect={() => setPendingId(null)}
                onClaim={() => onClaim(voucher.id)}
              />
            ))}
          </ul>
        </div>

        <div className="border-t bg-background p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Diskon</span>
            <span className="font-medium text-destructive">
              {pendingDiscount > 0
                ? formatStoreVoucherSaving(pendingDiscount)
                : '-Rp0'}
            </span>
          </div>
          <Button size="lg" className="w-full" onClick={handleConfirm}>
            OK
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function StoreVoucherCard({
  voucher,
  storeBadge,
  selected,
  claimedVoucherIds,
  orderSubtotal,
  onSelect,
  onDeselect,
  onClaim,
}: {
  voucher: StoreVoucher
  storeBadge?: string
  selected: boolean
  claimedVoucherIds: Set<string>
  orderSubtotal: number
  onSelect: () => void
  onDeselect: () => void
  onClaim: () => void
}) {
  const claimed = claimedVoucherIds.has(voucher.id)
  const usable = isStoreVoucherUsable(
    voucher,
    orderSubtotal,
    claimedVoucherIds,
  )
  const needsClaim = voucher.requiresClaim && !claimed
  const locked = !needsClaim && orderSubtotal < voucher.minSpend

  const handleClick = () => {
    if (needsClaim) return
    if (!usable) return
    if (selected) onDeselect()
    else onSelect()
  }

  return (
    <li
      className={`relative overflow-hidden rounded-lg border bg-card ${
        selected ? 'border-primary ring-1 ring-primary/30' : 'border-border'
      } ${!needsClaim && usable ? 'cursor-pointer' : ''}`}
    >
      {voucher.recommended && (
        <span className="absolute top-0 right-0 z-10 rounded-bl-lg bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          Rekomendasi
        </span>
      )}

      <div className="flex min-h-[7.5rem]">
        <div className="relative flex w-24 shrink-0 flex-col items-center justify-center gap-1 border-r border-dashed bg-muted/30 px-2 py-3 sm:w-28">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <StoreIcon className="size-6" />
          </div>
          {storeBadge && (
            <span className="rounded bg-destructive px-1.5 py-0.5 text-[10px] font-medium text-white">
              {storeBadge}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 items-stretch">
          <button
            type="button"
            onClick={handleClick}
            disabled={needsClaim || !usable}
            className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 text-left disabled:cursor-default"
          >
            <p className="text-sm font-medium">{voucher.title}</p>
            <p className="text-xs text-muted-foreground">
              {formatStoreMinSpend(voucher.minSpend)}
            </p>

            <div className="h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min(100, voucher.progress ?? (usable ? 100 : 0))}%`,
                }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {voucher.expiresLabel}
              </span>
              <button
                type="button"
                className="text-xs text-primary"
                onClick={(event) => event.stopPropagation()}
              >
                S&K
              </button>
            </div>

            {voucher.shortfall && locked && (
              <p className="text-[11px] text-muted-foreground">
                Tambah {formatShortfall(voucher.shortfall)}, dapat diskon{' '}
                {formatShortfall(voucher.discountAmount)}
              </p>
            )}
          </button>

          <div className="flex shrink-0 items-center pr-3">
            {needsClaim ? (
              <Button size="sm" className="h-8 px-3 text-xs" onClick={onClaim}>
                Klaim
              </Button>
            ) : usable ? (
              <button
                type="button"
                onClick={handleClick}
                className={`flex size-6 items-center justify-center rounded-full border-2 ${
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/30'
                }`}
                aria-label={selected ? 'Batalkan voucher' : 'Pilih voucher'}
              >
                {selected && <CheckIcon className="size-3.5" />}
              </button>
            ) : (
              <span className="size-6 rounded-full border-2 border-muted/80" />
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

function formatShortfall(value: number) {
  if (value >= 1000) {
    const rb = value / 1000
    return `Rp${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(3).replace('.', ',')}RB`
  }
  return `Rp${value.toLocaleString('id-ID')}`
}
