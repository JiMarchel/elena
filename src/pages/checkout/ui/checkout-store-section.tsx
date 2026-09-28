import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Checkbox, Separator, Switch } from '@/shared/ui'

import type { CheckoutFlowSearch } from '../model/address'
import { checkoutFlowSearch } from '../model/address'
import type { CheckoutStoreGroup, ShippingOption } from '../model/checkout'
import { formatPlatformSaving } from '../model/platform-voucher'
import { formatStoreVoucherSaving } from '../model/store-voucher'
import type { SelectedStoreVoucher } from '../model/store-voucher'
import { CheckoutShippingOptions } from './checkout-shipping-options'
import { CheckoutStoreVoucherSheet } from './checkout-store-voucher-sheet'

export function CheckoutStoreSection({
  group,
  shippingOptions,
  selectedShippingId,
  onShippingChange,
  useProtection,
  onProtectionChange,
  storeTotal,
  selectedVoucher,
  claimedVoucherIds,
  onVoucherChange,
  onVoucherClaim,
  storeMessage,
  onStoreMessageChange,
}: {
  group: CheckoutStoreGroup
  shippingOptions: ShippingOption[]
  selectedShippingId: string
  onShippingChange: (id: string) => void
  useProtection: boolean
  onProtectionChange: (checked: boolean) => void
  storeTotal: number
  selectedVoucher: SelectedStoreVoucher
  claimedVoucherIds: Set<string>
  onVoucherChange: (selection: SelectedStoreVoucher) => void
  onVoucherClaim: (voucherId: string) => void
  storeMessage: string
  onStoreMessageChange: (message: string) => void
}) {
  const [voucherOpen, setVoucherOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)

  const itemCount = group.items.reduce((sum, item) => sum + item.quantity, 0)
  const orderSubtotal = useMemo(
    () =>
      group.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    [group.items],
  )

  return (
    <>
      <section className="overflow-hidden bg-card ring-1 ring-foreground/10 lg:rounded-xl">
        <div className="flex items-center gap-2 border-b px-3 py-2.5 sm:px-4">
          {group.badge && (
            <Badge className="shrink-0 bg-primary/10 text-primary hover:bg-primary/10">
              {group.badge}
            </Badge>
          )}
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1 text-left text-sm font-medium"
          >
            <span className="truncate">{group.storeName}</span>
            <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </div>

        <ul className="divide-y">
          {group.items.map((item) => (
            <li key={item.id} className="flex gap-3 px-3 py-3 sm:px-4">
              <img
                src={item.img}
                alt={item.title}
                className="size-16 shrink-0 rounded-lg object-cover ring-1 ring-border sm:size-20"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="line-clamp-2 text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.variant}</p>
                <div className="mt-auto flex items-end justify-between gap-2">
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <span className="text-sm font-medium text-primary">
                      {formatIDR(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatIDR(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    x{item.quantity}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t px-3 py-3 sm:px-4">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={useProtection}
              onCheckedChange={(checked) =>
                onProtectionChange(checked === true)
              }
              className="mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">Proteksi Parfum</span>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {formatIDR(10_000)} x1
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Perlindungan botol & kemasan saat pengiriman.{' '}
                <button type="button" className="text-primary">
                  Pelajari
                </button>
              </p>
            </div>
          </label>
        </div>

        <Separator />

        <button
          type="button"
          onClick={() => setVoucherOpen(true)}
          className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm sm:px-4"
        >
          <span className="text-muted-foreground">Voucher Toko</span>
          <span className="flex items-center gap-1">
            {selectedVoucher.discount > 0 ? (
              <Badge variant="outline" className="border-primary text-primary">
                {formatStoreVoucherSaving(selectedVoucher.discount)}
              </Badge>
            ) : (
              <span className="text-muted-foreground">Pilih voucher</span>
            )}
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </span>
        </button>

        <Separator />

        <button
          type="button"
          onClick={() => setMessageOpen(!messageOpen)}
          className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm sm:px-4 hover:bg-muted/50 transition-colors"
        >
          <span className="text-muted-foreground">Pesan untuk Penjual</span>
          <span className="flex items-center gap-1">
            {storeMessage ? (
              <span className="line-clamp-1 max-w-xs text-xs text-foreground">
                {storeMessage}
              </span>
            ) : (
              <span className="text-muted-foreground">Tinggalkan pesan</span>
            )}
            <ChevronDownIcon
              className={`size-4 text-muted-foreground transition-transform ${messageOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>

        {messageOpen && (
          <>
            <Separator />
            <div className="px-3 py-3 sm:px-4">
              <textarea
                value={storeMessage}
                onChange={(e) => onStoreMessageChange(e.target.value.slice(0, 200))}
                placeholder="Tinggalkan pesan untuk penjual (max 200 karakter)"
                className="min-h-20 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {storeMessage.length}/200
                </span>
                <button
                  type="button"
                  onClick={() => setMessageOpen(false)}
                  className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Selesai
                </button>
              </div>
            </div>
          </>
        )}

        <Separator />

        <CheckoutShippingOptions
          options={shippingOptions}
          selectedId={selectedShippingId}
          onSelect={onShippingChange}
        />

        <div className="flex items-center justify-between border-t px-3 py-3 text-sm sm:px-4">
          <span className="text-muted-foreground">
            Total {itemCount} Produk
          </span>
          <span className="font-medium">{formatIDR(storeTotal)}</span>
        </div>
      </section>

      <CheckoutStoreVoucherSheet
        open={voucherOpen}
        onOpenChange={setVoucherOpen}
        storeId={group.storeId}
        storeName={group.storeName}
        storeBadge={group.badge}
        orderSubtotal={orderSubtotal}
        selectedVoucherId={selectedVoucher.voucherId}
        claimedVoucherIds={claimedVoucherIds}
        onConfirm={(voucherId, discount) =>
          onVoucherChange({ voucherId, discount })
        }
        onClaim={onVoucherClaim}
      />
    </>
  )
}

export function CheckoutRewardsRow({
  flowSearch,
  platformDiscount,
  hasFreeShipping,
  useCoins,
  onUseCoinsChange,
}: {
  flowSearch: CheckoutFlowSearch
  platformDiscount: number
  hasFreeShipping: boolean
  useCoins: boolean
  onUseCoinsChange: (checked: boolean) => void
}) {
  const voucherSearch = checkoutFlowSearch(flowSearch)
  const hasSelection = platformDiscount > 0 || hasFreeShipping

  return (
    <section className="divide-y bg-card ring-1 ring-foreground/10 lg:rounded-xl">
      <Link
        to="/checkout/vouchers"
        search={voucherSearch}
        className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm transition-colors hover:bg-muted/50 sm:px-4"
      >
        <span className="font-medium">EnelaVIP Voucher</span>
        <span className="flex items-center gap-1.5">
          {hasSelection ? (
            <>
              {platformDiscount > 0 && (
                <Badge variant="outline" className="border-primary text-primary">
                  {formatPlatformSaving(platformDiscount)}
                </Badge>
              )}
              {hasFreeShipping && (
                <Badge
                  variant="outline"
                  className="border-emerald-500 text-emerald-600"
                >
                  Gratis Ongkir
                </Badge>
              )}
            </>
          ) : (
            <span className="text-muted-foreground">Pilih voucher</span>
          )}
          <ChevronRightIcon className="size-4 text-muted-foreground" />
        </span>
      </Link>
      <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <span className="text-sm">Tukarkan 30 Koin Enela</span>
        <Switch
          checked={useCoins}
          onCheckedChange={onUseCoinsChange}
          aria-label="Tukarkan koin Enela"
        />
      </div>
    </section>
  )
}
