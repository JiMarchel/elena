import { Link } from '@tanstack/react-router'
import { CoinsIcon, TicketIcon } from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Button, Checkbox, Separator, Switch } from '@/shared/ui'

export function CartCheckoutBar({
  allSelected,
  someSelected,
  selectedCount,
  total,
  useCoins,
  onToggleAll,
  onUseCoinsChange,
}: {
  allSelected: boolean
  someSelected: boolean
  selectedCount: number
  total: number
  useCoins: boolean
  onToggleAll: (checked: boolean) => void
  onUseCoinsChange: (checked: boolean) => void
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 backdrop-blur lg:sticky lg:inset-auto lg:z-10 lg:rounded-xl lg:border lg:bg-card lg:ring-1 lg:ring-foreground/10 lg:backdrop-blur-none">
      <Link
        to="/vouchers"
        className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-muted/40"
      >
        <span className="flex items-center gap-2 font-medium">
          <TicketIcon className="size-4 text-primary" />
          Voucher
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          Gunakan / masukkan kode
          <span aria-hidden>›</span>
        </span>
      </Link>

      <Separator />

      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
          <CoinsIcon className="size-4 shrink-0 text-accent" />
          <span className="truncate">
            {selectedCount > 0
              ? `Pakai koin untuk ${selectedCount} produk`
              : 'Tidak ada produk yang dipilih'}
          </span>
        </div>
        <Switch
          checked={useCoins}
          onCheckedChange={onUseCoinsChange}
          disabled={selectedCount === 0}
          aria-label="Pakai koin Enela"
        />
      </div>

      <Separator />

      <div className="flex items-center gap-3 px-4 py-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onCheckedChange={(checked) => onToggleAll(checked === true)}
          />
          Semua
        </label>
        <div className="ml-auto flex min-w-0 flex-col items-end">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-base font-medium text-primary tabular-nums">
            {formatIDR(total)}
          </span>
        </div>
        <Button
          size="lg"
          disabled={selectedCount === 0}
          className="shrink-0"
          render={<Link to="/checkout" search={{}} />}
        >
          Checkout ({selectedCount})
        </Button>
      </div>
    </div>
  )
}
