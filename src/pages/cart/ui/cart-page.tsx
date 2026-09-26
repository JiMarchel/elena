import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BrushCleaningIcon } from 'lucide-react'

import { RequireAuth } from '@/shared/auth'
import { Button } from '@/shared/ui'

import {
  countCartItems,
  ensureDemoCart,
  flatCartItems,
  getDemoCartGroups,
} from '../model/cart'
import type { CartStoreGroup } from '../model/cart'
import { CartCheckoutBar } from './cart-checkout-bar'
import { CartHeader, CartStoreCard } from './cart-store-card'

export function CartPage() {
  return (
    <RequireAuth
      title="Masuk untuk melihat keranjang"
      description="Keranjang, voucher, saldo, dan poin hanya tersedia setelah Anda masuk."
    >
      <CartPageContent />
    </RequireAuth>
  )
}

function CartPageContent() {
  const [groups, setGroups] = useState<CartStoreGroup[]>(() =>
    ensureDemoCart(getDemoCartGroups()),
  )
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [editMode, setEditMode] = useState(false)
  const [useCoins, setUseCoins] = useState(false)

  const allItems = useMemo(() => flatCartItems(groups), [groups])
  const itemCount = useMemo(() => countCartItems(groups), [groups])
  const selectedItems = allItems.filter((item) => selectedIds.has(item.id))
  const selectedCount = selectedItems.length
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const allSelected =
    allItems.length > 0 && selectedCount === allItems.length
  const someSelected = selectedCount > 0 && !allSelected

  const toggleItem = (itemId: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(itemId)
      else next.delete(itemId)
      return next
    })
  }

  const toggleStore = (storeId: string, checked: boolean) => {
    const group = groups.find((g) => g.storeId === storeId)
    if (!group) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      for (const item of group.items) {
        if (checked) next.add(item.id)
        else next.delete(item.id)
      }
      return next
    })
  }

  const toggleAll = (checked: boolean) => {
    setSelectedIds(
      checked ? new Set(allItems.map((item) => item.id)) : new Set(),
    )
  }

  const changeQty = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setGroups((prev) =>
        prev
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.id !== itemId),
          }))
          .filter((group) => group.items.length > 0),
      )
      setSelectedIds((prev) => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
      return
    }
    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.min(99, quantity) }
            : item,
        ),
      })),
    )
  }

  const clearUnneeded = () => {
    if (selectedIds.size === 0) return
    setGroups((prev) =>
      prev
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => !selectedIds.has(item.id)),
        }))
        .filter((group) => group.items.length > 0),
    )
    setSelectedIds(new Set())
  }

  const removeStore = (storeId: string) => {
    const group = groups.find((g) => g.storeId === storeId)
    setGroups((prev) => prev.filter((g) => g.storeId !== storeId))
    if (!group) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      for (const item of group.items) next.delete(item.id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 pb-44 lg:pb-4">
      <CartHeader
        itemCount={itemCount}
        editMode={editMode}
        onToggleEdit={() => setEditMode((value) => !value)}
      />

      {selectedCount > 0 && (
        <div className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5 ring-1 ring-foreground/10">
          <BrushCleaningIcon className="size-4 shrink-0 text-accent" />
          <p className="min-w-0 flex-1 text-sm text-muted-foreground">
            Hapus produk yang sudah tidak kamu perlukan.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-destructive"
            onClick={clearUnneeded}
          >
            Hapus
          </Button>
        </div>
      )}

      {groups.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-card px-6 py-12 text-center ring-1 ring-foreground/10">
          <p className="font-medium">Keranjang masih kosong</p>
          <p className="text-sm text-muted-foreground">
            Jelajahi katalog Enela dan tambahkan parfum favorit Anda.
          </p>
          <Button size="sm" className="mt-2" render={<Link to="/" />}>
            Belanja sekarang
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {groups.map((group) => (
            <CartStoreCard
              key={group.storeId}
              group={group}
              selectedIds={selectedIds}
              editMode={editMode}
              onToggleStore={toggleStore}
              onToggleItem={toggleItem}
              onChangeQty={changeQty}
              onRemoveStore={removeStore}
            />
          ))}
        </div>
      )}

      <CartCheckoutBar
        allSelected={allSelected}
        someSelected={someSelected}
        selectedCount={selectedCount}
        total={total}
        useCoins={useCoins}
        onToggleAll={toggleAll}
        onUseCoinsChange={setUseCoins}
      />
    </div>
  )
}
