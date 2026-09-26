import { Link } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  StoreIcon,
} from 'lucide-react'

import { formatIDR } from '@/shared/lib'
import { Badge, Button, Checkbox } from '@/shared/ui'

import type { CartItem, CartStoreGroup } from '../model/cart'

export function CartStoreCard({
  group,
  selectedIds,
  editMode,
  onToggleStore,
  onToggleItem,
  onChangeQty,
  onRemoveStore,
}: {
  group: CartStoreGroup
  selectedIds: Set<string>
  editMode: boolean
  onToggleStore: (storeId: string, checked: boolean) => void
  onToggleItem: (itemId: string, checked: boolean) => void
  onChangeQty: (itemId: string, quantity: number) => void
  onRemoveStore: (storeId: string) => void
}) {
  const itemIds = group.items.map((item) => item.id)
  const selectedCount = itemIds.filter((id) => selectedIds.has(id)).length
  const allSelected =
    itemIds.length > 0 && selectedCount === itemIds.length
  const someSelected = selectedCount > 0 && !allSelected

  return (
    <section className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="flex items-center gap-2 border-b px-3 py-2.5">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onCheckedChange={(checked) =>
            onToggleStore(group.storeId, checked === true)
          }
          aria-label={`Pilih semua dari ${group.storeName}`}
        />
        <StoreIcon className="size-4 text-muted-foreground" />
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-1 text-left text-sm font-medium"
        >
          <span className="truncate">{group.storeName}</span>
          {group.badge && (
            <Badge variant="secondary" className="shrink-0">
              {group.badge}
            </Badge>
          )}
          <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
        {editMode && (
          <Button
            variant="ghost"
            size="xs"
            className="text-destructive"
            onClick={() => onRemoveStore(group.storeId)}
          >
            Hapus
          </Button>
        )}
      </div>

      <ul className="flex flex-col divide-y">
        {group.items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            selected={selectedIds.has(item.id)}
            editMode={editMode}
            onToggle={(checked) => onToggleItem(item.id, checked)}
            onChangeQty={(qty) => onChangeQty(item.id, qty)}
          />
        ))}
      </ul>

      <button
        type="button"
        className="flex w-full items-center gap-2 border-t px-3 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted/40"
      >
        <Badge variant="outline" className="font-normal">
          Voucher
        </Badge>
        <span className="min-w-0 flex-1 truncate">{group.voucherLabel}</span>
        <ChevronRightIcon className="size-4 shrink-0" />
      </button>
    </section>
  )
}

function CartItemRow({
  item,
  selected,
  editMode,
  onToggle,
  onChangeQty,
}: {
  item: CartItem
  selected: boolean
  editMode: boolean
  onToggle: (checked: boolean) => void
  onChangeQty: (quantity: number) => void
}) {
  return (
    <li className="flex gap-2.5 px-3 py-3">
      <Checkbox
        checked={selected}
        onCheckedChange={(checked) => onToggle(checked === true)}
        aria-label={`Pilih ${item.title}`}
        className="mt-8"
      />
      <Link
        to="/products/$productId"
        params={{ productId: String(item.productId) }}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/40"
      >
        <img
          src={item.img}
          alt=""
          className="size-full object-cover"
          loading="lazy"
        />
        {item.stockLeft != null && (
          <span className="absolute inset-x-0 bottom-0 bg-foreground/70 py-0.5 text-center text-[10px] text-background">
            Tersisa {item.stockLeft}
          </span>
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Link
          to="/products/$productId"
          params={{ productId: String(item.productId) }}
          className="line-clamp-2 text-sm leading-snug font-medium hover:underline"
        >
          {item.title}
        </Link>
        <button
          type="button"
          className="flex w-fit max-w-full items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
        >
          <span className="truncate">{item.variant}</span>
          <ChevronDownIcon className="size-3 shrink-0" />
        </button>
        {item.promo && (
          <Badge variant="secondary" className="w-fit font-normal">
            {item.promo}
          </Badge>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-base font-medium text-primary">
              {formatIDR(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatIDR(item.originalPrice)}
              </span>
            )}
          </div>
          {editMode ? (
            <Button
              variant="outline"
              size="xs"
              className="text-destructive"
              onClick={() => onChangeQty(0)}
            >
              Hapus
            </Button>
          ) : (
            <div className="flex items-center gap-0.5 rounded-lg border p-0.5">
              <Button
                variant="ghost"
                size="icon-xs"
                disabled={item.quantity <= 1}
                onClick={() => onChangeQty(item.quantity - 1)}
                aria-label="Kurangi jumlah"
              >
                −
              </Button>
              <span className="w-7 text-center text-sm tabular-nums">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onChangeQty(item.quantity + 1)}
                aria-label="Tambah jumlah"
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export function CartHeader({
  itemCount,
  editMode,
  onToggleEdit,
}: {
  itemCount: number
  editMode: boolean
  onToggleEdit: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        className="-ml-2"
        render={<Link to="/" />}
        aria-label="Kembali"
      >
        <ArrowLeftIcon />
      </Button>
      <h1 className="min-w-0 flex-1 truncate text-lg font-medium">
        Keranjang Saya{' '}
        <span className="text-muted-foreground">({itemCount})</span>
      </h1>
      <Button variant="ghost" size="sm" onClick={onToggleEdit}>
        {editMode ? 'Selesai' : 'Ubah'}
      </Button>
    </div>
  )
}
